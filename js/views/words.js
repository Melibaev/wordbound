import * as store from '../store.js';
import { db } from '../data.js';
import { status } from '../srs.js';
import { speak } from '../tts.js';
import { esc, openSheet, fmtInterval, toast } from '../util.js';
import { topbar, icon } from '../ui.js';

const ST = { new: 'новое', learning: 'учу', known: 'знаю' };

export async function mount(root) {
  const s = store.get();
  const all = () =>
    Object.keys(s.words)
      .map((id) => ({ w: db.byId.get(id), rec: s.words[id], id }))
      .filter((x) => x.w)
      .map((x) => ({ ...x, st: status(x.rec) }))
      .sort((a, b) => a.w.w.localeCompare(b.w.w));
  let q = '';
  let f = 'all';

  root.innerHTML = `<div class="screen words">${topbar('Мои слова')}
<input class="search" type="search" placeholder="Поиск" autocomplete="off" autocapitalize="off" aria-label="Поиск">
<div class="chips" role="tablist">
${[['all', 'Все'], ['new', 'Новые'], ['learning', 'Учу'], ['known', 'Знаю']].map(([k, l]) => `<button class="chip${k === 'all' ? ' on' : ''}" data-f="${k}">${l}</button>`).join('')}
</div>
<div id="list"></div></div>`;
  const list = root.querySelector('#list');

  const draw = () => {
    const ql = q.trim().toLowerCase();
    const items = all().filter((x) => (f === 'all' || x.st === f) && (!ql || x.w.w.toLowerCase().includes(ql) || String(x.w.ru).toLowerCase().includes(ql)));
    if (!items.length) {
      list.innerHTML = `<p class="muted center pad">${Object.keys(s.words).length ? 'Ничего не найдено.' : 'Здесь появятся слова, которые ты учишь. Тапай по словам в эпизодах!'}</p>`;
      return;
    }
    list.innerHTML = items
      .map(
        (x) => `<button class="card word-row" data-id="${esc(x.id)}"><div><b>${esc(x.w.w)}</b><span class="muted"> ${esc(x.w.pos || '')}</span><div class="muted">${esc(x.w.ru)}</div></div><span class="stamp st-${x.st}">${ST[x.st]}</span></button>`
      )
      .join('');
  };
  draw();

  root.querySelector('.search').addEventListener('input', (e) => {
    q = e.target.value;
    draw();
  });
  root.querySelector('.chips').addEventListener('click', (e) => {
    const b = e.target.closest('[data-f]');
    if (!b) return;
    f = b.dataset.f;
    root.querySelectorAll('.chip').forEach((c) => c.classList.toggle('on', c === b));
    draw();
  });
  list.addEventListener('click', (e) => {
    const b = e.target.closest('[data-id]');
    if (!b) return;
    const w = db.byId.get(b.dataset.id);
    const rec = s.words[b.dataset.id];
    if (!w || !rec) return;
    const st = status(rec);
    const due = rec.skip ? 'отмечено как известное' : rec.due <= Date.now() ? 'пора повторить' : 'через ' + fmtInterval(rec.due - Date.now());
    const sh = openSheet(`<div class="wc-tags"><span class="stamp tilt">${esc(w.lvl || '')}</span><span class="tag">${esc(w.pos || '')}</span><span class="stamp st-${st}">${ST[st]}</span></div>
<h2 class="wc-word">${esc(w.w)}</h2>
<button class="btn round" data-say>${icon('speaker')}<span>Слушать</span></button>
<div class="wc-ru">${esc(w.ru)}</div>
${w.ex ? `<div class="wc-ex"><p class="en">${esc(w.ex)}</p><p class="muted">${esc(w.exRu || '')}</p></div>` : ''}
${w.forms && w.forms.length ? `<p class="muted">Формы: ${esc(w.forms.join(', '))}</p>` : ''}
<p class="muted">Повторение: ${esc(due)}</p>
<div class="row"><button class="btn" data-del>Удалить</button><button class="btn primary" data-close>Закрыть</button></div>`);
    sh.el.querySelector('[data-say]').addEventListener('click', () => speak(w.w));
    sh.el.querySelector('[data-close]').addEventListener('click', sh.close);
    sh.el.querySelector('[data-del]').addEventListener('click', () => {
      store.removeWord(w.id);
      sh.close();
      toast('Слово удалено');
      draw();
    });
    setTimeout(() => speak(w.w), 150);
  });
}
