import * as store from '../store.js';
import { db, nextEpisode } from '../data.js';
import { estimate, computeLevel } from '../levels.js';
import { isDue } from '../srs.js';
import { esc, dayKey, weekKeys, plural } from '../util.js';
import { blockerFor } from '../trials.js';
import { icon, bar, installHint, isIOS, isStandalone } from '../ui.js';

const DAYS = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
export const WEEK_GOAL = 5;

export function dueIds() {
  const now = Date.now();
  const s = store.get();
  return Object.keys(s.words).filter((id) => isDue(s.words[id], now) && db.byId.has(id));
}

export async function mount(root) {
  const s = store.get();
  const lv = computeLevel(estimate(s, db.byId));
  const due = dueIds().length;
  const next = nextEpisode(s);
  const block = next ? await blockerFor(next) : null;
  const today = dayKey();
  const set = new Set(s.days);
  const wk = weekKeys();
  const wkDone = wk.filter((k) => set.has(k)).length;
  const learned = Object.keys(s.words).length;
  const showHint = isIOS() && !isStandalone() && !s.settings.hintDismissed;

  const dots = wk
    .map((k, i) => {
      const done = set.has(k);
      const cls = `wd${done ? ' done' : ''}${k === today ? ' today' : ''}${k > today ? ' future' : ''}`;
      return `<div class="${cls}"><span class="dot">${done ? icon('check') : ''}</span><small>${DAYS[i]}</small></div>`;
    })
    .join('');

  let cta = 'Начать';
  const parts = [];
  if (due) parts.push(`${due} ${plural(due, ['повторение', 'повторения', 'повторений'])}`);
  if (block) parts.push(`испытания эпизода ${block.ep.n}`);
  else if (next) parts.push(`эпизод ${next.n}`);
  const sub = parts.length ? parts.join(' + ') : 'Пока нечего делать';
  const canStart = due > 0 || !!next;

  let nextCard;
  if (!db.story) {
    nextCard = `<div class="card err"><p>Не удалось загрузить эпизоды. Проверь соединение и открой приложение снова.</p></div>`;
  } else if (!next) {
    nextCard = `<div class="card ep-card"><div class="stamp">КОНЕЦ?</div><h3>Все эпизоды прочитаны</h3><p class="muted">Новые главы скоро появятся.</p></div>`;
  } else if (block) {
    nextCard = `<a class="card ep-card locked" href="#/trial/${encodeURIComponent(block.ep.id)}">
<div class="ep-num lockn">🔒 E${String(next.n).padStart(2, '0')}</div>
<div class="ep-body"><small class="muted">ЗАПЕРТО · ${esc(next.level || '')}</small>
<h3>${esc(next.title)}</h3><p class="lockmsg">Пройди испытания эпизода ${block.ep.n}</p><span class="btn small go-trials"><span>К испытаниям</span></span></div></a>`;
  } else {
    nextCard = `<a class="card ep-card" href="#/session/${encodeURIComponent(next.id)}">
<div class="ep-num">S${next.season}·E${String(next.n).padStart(2, '0')}</div>
<div class="ep-body"><small class="muted">СЛЕДУЮЩИЙ ЭПИЗОД · ${esc(next.level || '')}</small>
<h3>${esc(next.title)}</h3><p class="muted">${esc(next.titleRu || '')}</p></div></a>`;
  }

  root.innerHTML = `<div class="screen home">
<header class="home-head"><div class="logo">WORD<b>BOUND</b></div><a class="icon-btn" href="#/settings" aria-label="Настройки">${icon('gear')}</a></header>
${showHint ? installHint() : ''}
<section class="card level-card">
  <div class="lv-badge" aria-label="Уровень ${esc(lv.level)}"><span>${esc(lv.level)}</span></div>
  <div class="lv-info">
    <div class="lv-row"><b>${lv.est}</b> <span class="muted">${plural(lv.est, ['слово', 'слова', 'слов'])} в запасе</span></div>
    ${bar(lv.progress * 100)}
    <small class="muted">${lv.next ? `до ${esc(lv.next)}: ещё ${lv.toNext} ${plural(lv.toNext, ['слово', 'слова', 'слов'])}` : 'Максимальный уровень!'}</small>
  </div>
</section>
<section class="card week-card">
  <div class="wk-top"><h2>Неделя</h2><span class="stamp tilt">${wkDone}/${WEEK_GOAL}</span></div>
  <div class="week">${dots}</div>
  <div class="wk-foot"><span>Всего дней с историей: <b>${s.days.length}</b></span><span>Серия: <b>${store.streak()}</b></span></div>
</section>
<button class="btn primary big" id="go" ${canStart ? '' : 'disabled'}><span>${cta}</span><small>${esc(sub)}</small></button>
${nextCard}
<nav class="tiles">
  <a class="tile" href="#/episodes">${icon('list')}<span>Эпизоды</span></a>
  <a class="tile" href="#/words">${icon('book')}<span>Мои слова</span><em>${learned}</em></a>
  <a class="tile" href="#/settings">${icon('gear')}<span>Настройки</span></a>
</nav>
</div>`;

  const go = root.querySelector('#go');
  if (go) go.addEventListener('click', () => (location.hash = block && !due ? '#/trial/' + encodeURIComponent(block.ep.id) : '#/session'));
  const hint = root.querySelector('[data-hint-close]');
  if (hint)
    hint.addEventListener('click', () => {
      store.get().settings.hintDismissed = true;
      store.save();
      root.querySelector('[data-hint]').remove();
    });
}
