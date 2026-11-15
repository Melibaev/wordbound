// Content loading + word lookup + tokenizer. Tolerant to missing/malformed data.
export const db = {
  story: null, // { title, characters, episodes }
  chars: new Map(),
  words: [],
  byId: new Map(),
  lookup: new Map(), // lowercase form -> word
  wordsLoaded: false,
};

const cache = new Map();

async function getJSON(path) {
  if (cache.has(path)) return cache.get(path);
  const r = await fetch(path);
  if (!r.ok) throw new Error(path + ' ' + r.status);
  const j = await r.json();
  cache.set(path, j);
  return j;
}

const asArr = (x) => (Array.isArray(x) ? x : []);

function normStory(j) {
  const eps = asArr(j && j.episodes)
    .filter((e) => e && e.id && e.file)
    .map((e, i) => ({ ...e, season: e.season || 1, n: e.n || i + 1 }));
  eps.sort((a, b) => a.season - b.season || a.n - b.n);
  return { title: (j && j.title) || 'WORDBOUND', characters: asArr(j && j.characters), episodes: eps };
}

function buildWords(list) {
  db.words = [];
  db.byId = new Map();
  db.lookup = new Map();
  for (const w of asArr(list)) {
    if (!w || !w.id || !w.w) continue;
    db.words.push(w);
    db.byId.set(w.id, w);
  }
  // exact headwords win over inflected forms
  for (const w of db.words) db.lookup.set(String(w.w).toLowerCase(), w);
  for (const w of db.words) {
    for (const f of asArr(w.forms)) {
      const k = String(f).toLowerCase().replace(/’/g, "'");
      if (!db.lookup.has(k)) db.lookup.set(k, w);
    }
  }
  db.wordsLoaded = true;
}

// Never throws. Returns { story: bool, words: bool }.
export async function initData() {
  if (!db.story) {
    try {
      db.story = normStory(await getJSON('data/story.json'));
      db.chars = new Map(db.story.characters.map((c) => [c.id, c]));
    } catch (e) {
      db.story = null;
    }
  }
  if (!db.wordsLoaded) {
    try {
      buildWords(await getJSON('data/words.json'));
    } catch (e) {
      /* leave empty; words just won't be tappable */
    }
  }
  return { story: !!db.story, words: db.wordsLoaded };
}

export async function loadPlacement() {
  const j = await getJSON('data/placement.json');
  if (!j || typeof j !== 'object') throw new Error('placement');
  return {
    levels: asArr(j.levels).length ? j.levels : ['A1', 'A2', 'B1', 'B2', 'C1'],
    vocab: asArr(j.vocab).filter(validQ),
    reading: asArr(j.reading).filter(validQ),
    listening: asArr(j.listening).filter(validQ),
  };
}

function validQ(q) {
  return q && Array.isArray(q.options) && q.options.length >= 2 && Number.isInteger(q.answer) && q.options[q.answer] != null;
}

function normEpisode(j, meta) {
  const panels = asArr(j.panels)
    .filter((p) => p && typeof p === 'object')
    .map((p) => ({
      bg: p.bg || 'black',
      mood: p.mood || 'calm',
      sfx: p.sfx || null,
      cast: asArr(p.cast).filter((c) => c && c.id),
      lines: asArr(p.lines).filter((l) => l && typeof l === 'object'),
    }));
  return {
    id: j.id || meta.id,
    title: j.title || meta.title || '',
    titleRu: j.titleRu || meta.titleRu || '',
    level: j.level || meta.level || '',
    season: meta.season,
    n: meta.n,
    newWords: asArr(j.newWords),
    panels,
    grammarNote: j.grammarNote && typeof j.grammarNote === 'object' ? j.grammarNote : null,
    quiz: asArr(j.quiz).filter(validQ2),
  };
}

function validQ2(q) {
  return q && q.q && Array.isArray(q.options) && q.options.length >= 2 && Number.isInteger(q.answer) && q.options[q.answer] != null;
}

export async function loadEpisode(meta) {
  let j;
  try {
    j = await getJSON('data/' + meta.file);
  } catch (e) {
    j = await getJSON('data/episodes/' + meta.id + '.json');
  }
  if (!j || typeof j !== 'object') throw new Error('episode');
  return normEpisode(j, meta);
}

export function sortedEpisodes() {
  return db.story ? db.story.episodes : [];
}

export function nextEpisode(state) {
  return sortedEpisodes().find((e) => !(state.episodes[e.id] && state.episodes[e.id].done)) || null;
}

export function episodeAfter(id) {
  const eps = sortedEpisodes();
  const i = eps.findIndex((e) => e.id === id);
  return i >= 0 && i + 1 < eps.length ? eps[i + 1] : null;
}

// ---- tokenizer ----
const WORD_RE = /[A-Za-z]+(?:['’][A-Za-z]+)*/g;

export function findWord(tok) {
  const k = String(tok).toLowerCase().replace(/’/g, "'");
  let w = db.lookup.get(k);
  if (!w && k.endsWith("'s")) w = db.lookup.get(k.slice(0, -2));
  return w || null;
}

// -> [{ t: 'text', w: wordObj|null, isWord: bool }]
export function tokenize(text) {
  const s = String(text == null ? '' : text);
  const out = [];
  let last = 0;
  for (const m of s.matchAll(WORD_RE)) {
    if (m.index > last) out.push({ t: s.slice(last, m.index), isWord: false, w: null });
    out.push({ t: m[0], isWord: true, w: findWord(m[0]) });
    last = m.index + m[0].length;
  }
  if (last < s.length) out.push({ t: s.slice(last), isWord: false, w: null });
  return out;
}

export function shortRu(ru) {
  return String(ru || '').split(';')[0].trim();
}
