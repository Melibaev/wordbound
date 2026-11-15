// Episode quiz with instant feedback. Resolves { score, total }.
import { esc, shuffle } from '../util.js';
import { icon, bar } from '../ui.js';

export function runQuiz(root, ep, ctx) {
  return new Promise((resolve) => {
    const items = ep.quiz.map((q) => {
      const idx = shuffle(q.options.map((o, i) => ({ o, i })));
      return { q: q.q, options: idx.map((x) => x.o), answer: idx.findIndex((x) => x.i === q.answer) };
    });
    if (!items.length) return resolve({ score: 0, total: 0 });
    let i = 0;
    let score = 0;
    const draw = () => {
      if (!ctx.alive) return;
      if (i >= items.length) return resolve({ score, total: items.length });
      const it = items[i];
      root.innerHTML = `<div class="screen quiz">
<header class="topbar"><a class="icon-btn" href="#/" aria-label="Выйти">${icon('close')}</a><h1>Квиз</h1><span class="tb-right muted">${i + 1}/${items.length}</span></header>
${bar((i / items.length) * 100)}
<div class="q-bubble"><p>${esc(it.q)}</p></div>
<div class="opts">${it.options.map((o, k) => `<button class="opt" data-k="${k}"><span class="k">${String.fromCharCode(65 + k)}</span><span>${esc(o)}</span></button>`).join('')}</div>
<div class="feedback" aria-live="polite"></div>
<button class="btn primary big" id="nx" hidden><span>${i + 1 === items.length ? 'Готово' : 'Дальше'}</span></button>
</div>`;
      window.scrollTo(0, 0);
      let locked = false;
      const fb = root.querySelector('.feedback');
      const nx = root.querySelector('#nx');
      root.querySelectorAll('.opt').forEach((b) =>
        b.addEventListener('click', () => {
          if (locked) return;
          locked = true;
          const k = Number(b.dataset.k);
          const ok = k === it.answer;
          if (ok) score++;
          root.querySelectorAll('.opt').forEach((o) => {
            o.disabled = true;
            if (Number(o.dataset.k) === it.answer) o.classList.add('good');
          });
          if (!ok) b.classList.add('bad');
          fb.innerHTML = ok ? '<div class="stamp stampin ok">ВЕРНО!</div>' : '<div class="stamp stampin no">НЕ ТАК</div>';
          nx.hidden = false;
          nx.focus({ preventScroll: true });
        })
      );
      nx.addEventListener('click', () => {
        i++;
        draw();
      });
    };
    draw();
  });
}
