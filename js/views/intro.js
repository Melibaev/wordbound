// New-word introduction cards for an episode.
import * as store from '../store.js';
import { speak } from '../tts.js';
import { esc } from '../util.js';
import { icon, bar } from '../ui.js';

// words: array of word objects. Resolves with { learned, known } counts.
export function runIntro(root, words, ctx) {
  return new Promise((resolve) => {
    let i = 0;
    let learned = 0;
    let known = 0;
    const draw = () => {
      if (!ctx.alive) return;
      if (i >= words.length) return resolve({ learned, known });
      const w = words[i];
      root.innerHTML = `<div class="screen intro">
<header class="topbar"><a class="icon-btn" href="#/" aria-label="Выйти">${icon('close')}</a><h1>Новые слова</h1><span class="tb-right muted">${i + 1}/${words.length}</span></header>
${bar((i / words.length) * 100)}
<article class="card word-card">
  <div class="wc-tags"><span class="stamp tilt">${esc(w.lvl || '')}</span><span class="tag">${esc(w.pos || '')}</span></div>
  <h2 class="wc-word">${esc(w.w)}</h2>
  <button class="btn round" id="say" aria-label="Озвучить">${icon('speaker')}<span>Слушать</span></button>
  <div class="wc-ru">${esc(w.ru)}</div>
  ${w.ex ? `<div class="wc-ex"><p class="en">${esc(w.ex)}</p><p class="muted">${esc(w.exRu || '')}</p><button class="icon-btn small" id="sayex" aria-label="Озвучить пример">${icon('speaker')}</button></div>` : ''}
</article>
<div class="row">
  <button class="btn" id="know">Уже знаю</button>
  <button class="btn primary" id="learn">Учить</button>
</div></div>`;
      window.scrollTo(0, 0);
      const q = (s) => root.querySelector(s);
      q('#say').addEventListener('click', () => speak(w.w));
      const ex = q('#sayex');
      if (ex) ex.addEventListener('click', () => speak(w.ex));
      q('#learn').addEventListener('click', () => {
        store.addWord(w.id);
        learned++;
        i++;
        draw();
      });
      q('#know').addEventListener('click', () => {
        store.markKnown(w.id);
        known++;
        i++;
        draw();
      });
      setTimeout(() => ctx.alive && speak(w.w), 250);
    };
    draw();
  });
}
