// SRS review runner: flashcards + multiple choice.
import * as store from '../store.js';
import { db, tokenize, shortRu } from '../data.js';
import { grade, previewMs } from '../srs.js';
import { playWord } from '../audio.js';
import { esc, sample, shuffle, fmtInterval, wait } from '../util.js';
import { icon, bar } from '../ui.js';

function sentenceHTML(w) {
  if (!w.ex) return '';
  return tokenize(w.ex)
    .map((t) => (t.w === w ? `<mark>${esc(t.t)}</mark>` : esc(t.t)))
    .join('');
}

function distractors(w, n = 3) {
  const own = shortRu(w.ru);
  const pool = db.words.filter((x) => x.id !== w.id && x.ru && shortRu(x.ru) !== own);
  const same = pool.filter((x) => x.pos === w.pos);
  const src = same.length >= n * 2 ? same : pool;
  const seen = new Set([own]);
  const out = [];
  for (const x of shuffle(src)) {
    const r = shortRu(x.ru);
    if (seen.has(r)) continue;
    seen.add(r);
    out.push(r);
    if (out.length === n) break;
  }
  return out.length === n ? out : null;
}

// ids: array of word ids. Resolves { count } (cards graded).
export function runReviews(root, ids, ctx) {
  return new Promise((resolve) => {
    const queue = ids.slice();
    const total = queue.length;
    let done = 0;

    const next = () => {
      if (!ctx.alive) return;
      if (!queue.length) return resolve({ count: done });
      const id = queue.shift();
      const w = db.byId.get(id);
      const rec = store.getRec(id);
      if (!w || !rec) return next();
      const mc = rec.reps > 0 && Math.random() < 0.4 ? distractors(w) : null;
      if (mc) drawMC(w, rec, mc);
      else drawFlip(w, rec);
    };

    const head = () => `<header class="topbar"><a class="icon-btn" href="#/" aria-label="Выйти">${icon('close')}</a><h1>Повторение</h1><span class="tb-right muted">${Math.min(done + 1, total)}/${total}</span></header>${bar((done / total) * 100)}`;

    const finishCard = (w, rec, g) => {
      const nr = grade(rec, g);
      store.setRec(w.id, nr);
      store.save();
      done = g === 0 ? done : done + 1;
      if (g === 0) queue.push(w.id);
      next();
    };

    function drawFlip(w, rec) {
      const sent = sentenceHTML(w);
      root.innerHTML = `<div class="screen review">${head()}
<article class="card rv-card" id="card">
  <div class="rv-word">${esc(w.w)}</div>
  <button class="icon-btn spk-btn" id="say" aria-label="Озвучить">${icon('speaker')}</button>
  ${sent ? `<p class="rv-ex">${sent}</p>` : ''}
  <div class="rv-back" hidden><div class="wc-ru">${esc(w.ru)}</div>${w.exRu ? `<p class="muted">${esc(w.exRu)}</p>` : ''}</div>
</article>
<button class="btn primary big" id="show"><span>Показать перевод</span></button>
<div class="grades" hidden>
  <button class="btn g0" data-g="0"><span>Не помню</span><small>${fmtInterval(previewMs(rec, 0))}</small></button>
  <button class="btn g1" data-g="1"><span>С трудом</span><small>${fmtInterval(previewMs(rec, 1))}</small></button>
  <button class="btn g2 primary" data-g="2"><span>Помню</span><small>${fmtInterval(previewMs(rec, 2))}</small></button>
</div></div>`;
      window.scrollTo(0, 0);
      const q = (s) => root.querySelector(s);
      q('#say').addEventListener('click', () => playWord(w.id, w.w));
      const reveal = () => {
        q('.rv-back').hidden = false;
        q('#show').hidden = true;
        q('.grades').hidden = false;
        q('#card').classList.add('flipped');
      };
      q('#show').addEventListener('click', reveal);
      q('#card').addEventListener('click', (e) => {
        if (!e.target.closest('button') && q('#show') && !q('#show').hidden) reveal();
      });
      root.querySelectorAll('[data-g]').forEach((b) => b.addEventListener('click', () => finishCard(w, rec, Number(b.dataset.g))));
      setTimeout(() => ctx.alive && playWord(w.id, w.w), 200);
    }

    function drawMC(w, rec, wrong) {
      const right = shortRu(w.ru);
      const opts = shuffle([right, ...wrong]);
      const sent = sentenceHTML(w);
      root.innerHTML = `<div class="screen review">${head()}
<article class="card rv-card">
  <div class="rv-word">${esc(w.w)}</div>
  <button class="icon-btn spk-btn" id="say" aria-label="Озвучить">${icon('speaker')}</button>
  ${sent ? `<p class="rv-ex">${sent}</p>` : ''}
</article>
<div class="opts">${opts.map((o, k) => `<button class="opt" data-k="${k}"><span class="k">${String.fromCharCode(65 + k)}</span><span>${esc(o)}</span></button>`).join('')}</div>
<div class="feedback" aria-live="polite"></div>
<button class="btn primary big" id="nx" hidden><span>Дальше</span></button></div>`;
      window.scrollTo(0, 0);
      root.querySelector('#say').addEventListener('click', () => playWord(w.id, w.w));
      let locked = false;
      root.querySelectorAll('.opt').forEach((b) =>
        b.addEventListener('click', async () => {
          if (locked) return;
          locked = true;
          const ok = opts[Number(b.dataset.k)] === right;
          root.querySelectorAll('.opt').forEach((o) => {
            o.disabled = true;
            if (opts[Number(o.dataset.k)] === right) o.classList.add('good');
          });
          if (!ok) b.classList.add('bad');
          root.querySelector('.feedback').innerHTML = ok ? '<div class="stamp stampin ok">ВЕРНО!</div>' : '<div class="stamp stampin no">НЕТ</div>';
          if (ok) {
            await wait(700);
            if (ctx.alive) finishCard(w, rec, 2);
          } else {
            const nx = root.querySelector('#nx');
            nx.hidden = false;
            nx.addEventListener('click', () => finishCard(w, rec, 0));
          }
        })
      );
      setTimeout(() => ctx.alive && playWord(w.id, w.w), 200);
    }

    next();
  });
}
