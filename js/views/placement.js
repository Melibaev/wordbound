// Adaptive placement test: vocab -> reading -> listening, staircase per section.
import * as store from '../store.js';
import { loadPlacement, findWord } from '../data.js';
import { ttsAvailable } from '../tts.js';
import { audioIndex, playPlacement, playPlacementWord, stopAudio } from '../audio.js';
import { esc, shuffle, sample, dayKey, confirmBox, wait } from '../util.js';
import { icon, bar, showScreen } from '../ui.js';

const SECTIONS = [
  { id: 'vocab', name: 'Словарь', cap: 10, w: 0.4 },
  { id: 'reading', name: 'Чтение', cap: 4, w: 0.3 },
  { id: 'listening', name: 'Аудирование', cap: 4, w: 0.3 },
];
const PASS_STEP = 0.7;
const PASS_FINAL = 0.65;

function remap(item) {
  const idx = shuffle(item.options.map((o, i) => ({ o, i })));
  return { ...item, options: idx.map((x) => x.o), answer: idx.findIndex((x) => x.i === item.answer) };
}

function finish(root, level, skills, skipped) {
  store.setPlacement({ level, skills, date: dayKey(), skipped: !!skipped });
}

export async function mount(root, ctx) {
  let data = null;
  try {
    data = await loadPlacement();
  } catch (e) {
    data = null;
  }
  if (!ctx.alive) return;

  const zero = () => {
    store.get().onboarded = true;
    finish(root, 'A0', {}, true);
    location.hash = '#/';
  };

  if (!data || (!data.vocab.length && !data.reading.length && !data.listening.length)) {
    const act = await showScreen(
      root,
      `<div class="screen"><div class="card err"><div class="stamp">ТЕСТ</div><p>Не удалось загрузить тест. Проверь соединение или начни с нуля: уровень можно будет пройти позже в настройках.</p>
<button class="btn primary" data-act="zero">Я полный новичок</button> <a class="btn" href="#/">Назад</a></div></div>`
    );
    if (ctx.alive && act === 'zero') zero();
    return;
  }

  const aidx = await audioIndex();
  const hasTTS = ttsAvailable() || !!(aidx && aidx.placement);
  const sections = SECTIONS.filter((sec) => data[sec.id].length && (sec.id !== 'listening' || hasTTS));
  const levels = data.levels;

  const intro = await showScreen(
    root,
    `<div class="screen">
<header class="topbar"><a class="icon-btn" href="#/" aria-label="Назад">${icon('back')}</a><h1>Тест уровня</h1><span class="tb-right"></span></header>
<div class="card"><div class="stamp tilt">10–15 МИН</div>
<p>Три части: <b>слова</b>, <b>чтение</b>${sections.some((x) => x.id === 'listening') ? ' и <b>аудирование</b> (включи звук)' : ''}. Вопросы становятся сложнее, пока ты справляешься.</p>
<p class="muted">Не угадывай наугад: если не знаешь, жми «Не знаю». Так результат точнее.</p></div>
<button class="btn primary big" data-act="start"><span>Начать</span></button>
<button class="btn" data-act="zero">Я полный новичок</button></div>`
  );
  if (!ctx.alive) return;
  if (intro === 'zero') return zero();

  const res = {}; // section -> level -> { c, n }
  let aborted = false;

  function ask(sec, level, i, n, item) {
    return new Promise((resolve) => {
      const isV = sec.id === 'vocab';
      const opts = item.options
        .map((o, k) => `<button class="opt" data-opt="${k}"><span class="k">${String.fromCharCode(65 + k)}</span><span>${esc(o)}</span></button>`)
        .join('');
      let body = '';
      if (sec.id === 'vocab') {
        body = `<div class="q-word">${esc(item.word)}</div><button class="icon-btn spk-btn" data-say aria-label="Озвучить">${icon('speaker')}</button>`;
      } else if (sec.id === 'reading') {
        body = `<p class="passage">${esc(item.text)}</p><p class="q-text">${esc(item.q)}</p>`;
      } else {
        body = `<button class="btn big play" data-say aria-label="Прослушать">${icon('play')}<span>Послушать ещё раз</span></button><p class="q-text">${esc(item.q)}</p>`;
      }
      root.innerHTML = `<div class="screen">
<header class="topbar"><span class="stamp tilt">${esc(level)}</span><h1>${esc(sec.name)}</h1><button class="chip" data-skip>Я новичок</button></header>
${bar(((i + 0) / n) * 100)}
<small class="muted q-count">Вопрос ${i + 1} из ${n}</small>
<div class="card q-card">${body}</div>
<div class="opts">${opts}</div>
${isV ? '<button class="btn ghost dk" data-opt="-1">Не знаю</button>' : ''}
</div>`;
      window.scrollTo(0, 0);
      const say = () => (isV ? playPlacementWord(item.word, findWord(item.word)) : playPlacement(item._i, item.audio));
      const sb = root.querySelector('[data-say]');
      if (sb) sb.addEventListener('click', say);
      if (sec.id === 'listening') setTimeout(() => ctx.alive && say(), 350);
      let locked = false;
      root.querySelectorAll('[data-opt]').forEach((b) =>
        b.addEventListener('click', async () => {
          if (locked) return;
          locked = true;
          const k = Number(b.dataset.opt);
          b.classList.add('picked');
          stopAudio();
          await wait(200);
          resolve({ correct: k === item.answer });
        })
      );
      root.querySelector('[data-skip]').addEventListener('click', async () => {
        if (locked) return;
        const ok = await confirmBox('Прервать тест и начать с нуля (уровень A0)?', 'Да, я новичок', 'Продолжить');
        if (ok) {
          locked = true;
          aborted = true;
          resolve({ correct: false });
        }
      });
    });
  }

  for (const sec of sections) {
    res[sec.id] = {};
    for (const level of levels) {
      const pool = data[sec.id].filter((q) => q.level === level);
      if (!pool.length) continue;
      const items = sample(pool, sec.cap).map(remap);
      let c = 0;
      for (let i = 0; i < items.length; i++) {
        const r = await ask(sec, level, i, items.length, items[i]);
        if (!ctx.alive) return;
        if (aborted) return zero();
        if (r.correct) c++;
      }
      res[sec.id][level] = { c, n: items.length };
      if (c / items.length < PASS_STEP) break;
    }
  }

  // ---- scoring ----
  const skills = {};
  for (const sec of sections) {
    let best = 'A0';
    for (const level of levels) {
      const r = res[sec.id][level];
      if (r && r.c / r.n >= PASS_STEP) best = level;
      else if (r || data[sec.id].some((q) => q.level === level)) break;
    }
    skills[sec.id] = best;
  }
  let final = 'A0';
  for (const level of levels) {
    let num = 0;
    let den = 0;
    for (const sec of sections) {
      if (!data[sec.id].some((q) => q.level === level)) continue;
      den += sec.w;
      const r = res[sec.id][level];
      if (r) num += sec.w * (r.c / r.n);
    }
    if (den > 0 && num / den >= PASS_FINAL) final = level;
    else break;
  }
  finish(root, final, skills, false);

  const LV = ['A0', ...levels];
  const rows = sections
    .map((sec) => {
      const lvl = skills[sec.id];
      const pct = (LV.indexOf(lvl) / (LV.length - 1)) * 100;
      return `<div class="skill"><span>${esc(sec.name)}</span>${bar(pct)}<b>${esc(lvl)}</b></div>`;
    })
    .join('');
  await showScreen(
    root,
    `<div class="screen result">
<div class="stamp tilt">РЕЗУЛЬТАТ</div>
<div class="lv-badge huge"><span>${esc(final)}</span></div>
<h1 class="center">Твой уровень: ${esc(final)}</h1>
<div class="card">${rows}</div>
<p class="muted center">Слова ниже этого уровня считаются известными, а эпизоды начнутся с самого начала. Тест можно пройти заново в настройках.</p>
<button class="btn primary big" data-act="ok"><span>К истории</span></button></div>`
  );
  if (ctx.alive) location.hash = '#/';
}
