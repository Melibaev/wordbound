// How a line is shown: full English, full Russian, or a mix that grows with the placement level.
import { db, findWord, shortRu } from './data.js';
import { rank, placementRank } from './levels.js';
import * as store from './store.js';
import { tokensHTML } from './sysmsg.js';
import { esc } from './util.js';

// Whole-sentence English at this placement rank. ru->en stays in Russian longer.
const CAP = {
  'ru-en': [4, 6, 9, 12, 18, 99],
  'en-ru': [10, 14, 18, 24, 40, 99],
};

export function readPrefs() {
  const set = (store.get().settings) || {};
  const way = set.learnWay === 'en-ru' ? 'en-ru' : 'ru-en';
  const mode = set.read === 'en' || set.read === 'ru' ? set.read : 'learn';
  const grain = set.learnGrain === 'word' ? 'word' : 'sentence';
  return { mode, way, grain, rank: placementRank(store.get()) };
}

function wordCount(en) {
  return String(en || '').trim().split(/\s+/).filter(Boolean).length;
}

export function englishPrimary(en, p) {
  if (p.mode === 'en') return true;
  if (p.mode === 'ru') return false;
  const cap = (CAP[p.way] || CAP['ru-en'])[p.rank] ?? 4;
  const n = wordCount(en);
  return n > 0 && n <= cap;
}

export function otherLang(en, ru, p) {
  return englishPrimary(en, p) ? String(ru || '') : String(en || '');
}

function bitPrimary(bit, p) {
  if (!bit.en) return false;
  if (p.mode === 'en') return true;
  if (p.mode === 'ru') return false;
  const need = rank(bit.lvl || 'A2');
  const have = p.way === 'en-ru' ? p.rank + 1 : p.rank;
  return have >= need;
}

function escRe(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function glossList(w) {
  return String(w.ru || '')
    .split(';')
    .map((s) => s.trim())
    .filter((g) => g.length >= 4);
}

// Russian sentence with a few known words swapped to English. Short glosses are skipped.
function mixIntoRussian(ru, p) {
  if (p.mode !== 'learn' || p.grain !== 'word' || p.way !== 'ru-en') return null;
  const hits = [];
  db.byId.forEach((w) => {
    if (rank(w.lvl) > p.rank) return;
    for (const g of glossList(w)) {
      const re = new RegExp('(^|[^А-Яа-яЁёA-Za-z])(' + escRe(g) + ')(?=$|[^А-Яа-яЁёA-Za-z])', 'i');
      const m = re.exec(ru);
      if (!m) continue;
      hits.push({ i: m.index + m[1].length, n: m[2].length, en: w.w, ru: m[2] });
      break;
    }
  });
  hits.sort((a, b) => a.i - b.i || b.n - a.n);
  const take = [];
  let end = -1;
  for (const h of hits) {
    if (h.i < end) continue;
    take.push(h);
    end = h.i + h.n;
    if (take.length >= 4) break;
  }
  if (!take.length) return null;
  let html = '';
  let i = 0;
  for (const h of take) {
    html += esc(ru.slice(i, h.i));
    html += `<span class="mix" data-flip data-cur="en" data-en="${esc(h.en)}" data-ru="${esc(h.ru)}">${esc(h.en)}</span>`;
    i = h.i + h.n;
  }
  html += esc(ru.slice(i));
  return html;
}

function mixIntoEnglish(en, p, newSet) {
  if (p.mode !== 'learn' || p.grain !== 'word' || p.way !== 'en-ru') return null;
  const parts = [];
  const re = /([A-Za-z][A-Za-z']*)|([^A-Za-z]+)/g;
  let m;
  let swapped = 0;
  while ((m = re.exec(en))) {
    const word = m[1];
    if (!word) {
      parts.push(esc(m[2]));
      continue;
    }
    const rec = findWord(word);
    const g = rec ? shortRu(rec.ru) : '';
    if (rec && rank(rec.lvl) > p.rank && g.length >= 4 && swapped < 4) {
      swapped++;
      parts.push(`<span class="mix" data-flip data-cur="ru" data-en="${esc(word)}" data-ru="${esc(g)}">${esc(g)}</span>`);
    } else {
      parts.push(tokensHTML(word, newSet));
    }
  }
  return swapped ? parts.join('') : null;
}

export function showHTML(en, ru, p, newSet) {
  const showEn = englishPrimary(en, p);
  const mixed = showEn ? mixIntoEnglish(en, p, newSet) : mixIntoRussian(ru, p);
  const inner = mixed != null ? mixed : showEn ? tokensHTML(en, newSet) : esc(ru || '');
  return `<p class="en" data-say-en="${esc(en || '')}" data-flip-line data-cur="${showEn ? 'en' : 'ru'}" data-en="${esc(en || '')}" data-ru="${esc(ru || '')}">${inner}</p>`;
}

export function narrationBitsHTML(line, p) {
  const bits = Array.isArray(line.bits) && line.bits.length ? line.bits : null;
  if (!bits) return `<p>${esc(line.ru || '')}</p>`;
  const html = bits
    .map((b) => {
      if (!b || !b.ru) return '';
      if (!b.en) return `<span class="bit">${esc(b.ru)}</span>`;
      let showEn;
      if (p.mode === 'en') showEn = true;
      else if (p.mode === 'ru') showEn = false;
      else showEn = bitPrimary(b, p);
      const cur = showEn ? 'en' : 'ru';
      return `<span class="bit" data-flip data-cur="${cur}" data-en="${esc(b.en)}" data-ru="${esc(b.ru)}">${esc(showEn ? b.en : b.ru)}</span>`;
    })
    .filter(Boolean)
    .join('');
  return `<p>${html}</p>`;
}

export function flipEl(el) {
  if (!el || el.dataset.en == null) return;
  const toEn = el.dataset.cur !== 'en';
  el.dataset.cur = toEn ? 'en' : 'ru';
  if (el.hasAttribute('data-flip-line')) {
    el.innerHTML = toEn ? tokensHTML(el.dataset.en) : esc(el.dataset.ru || '');
  } else {
    el.textContent = toEn ? el.dataset.en : el.dataset.ru;
  }
}

export function altText(box) {
  if (!box) return '';
  const line = box.querySelector('[data-flip-line]');
  if (line) {
    const t = line.dataset.cur === 'en' ? line.dataset.ru : line.dataset.en;
    if (t) return t;
  }
  const ru = box.querySelector('.ru');
  return ru && ru.textContent ? ru.textContent : '';
}
