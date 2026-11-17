import * as store from '../store.js';
import { db, nextEpisode } from '../data.js';
import { estimate, computeLevel } from '../levels.js';
import { isDue } from '../srs.js';
import { esc, plural } from '../util.js';
import { blockerFor } from '../trials.js';
import { icon, installHint, isIOS, isStandalone } from '../ui.js';

// session.js still reads the weekly target; the home screen no longer shows the diary.
export const WEEK_GOAL = 5;

export function dueIds() {
  const now = Date.now();
  const s = store.get();
  return Object.keys(s.words).filter((id) => isDue(s.words[id], now) && db.byId.has(id));
}

function chapterCode(ep) {
  return `S${ep.season} · ${String(ep.n).padStart(2, '0')}`;
}

function fallbackMark(text) {
  const word = text.length > 3 ? ' is-word' : '';
  return `<span class="cover-fallback" aria-hidden="true"><span class="cover-num${word}">${esc(text)}</span><span class="cover-brand">WORDBOUND</span></span>`;
}

function coverFor(ep) {
  const late = new Promise((res) => setTimeout(() => res(null), 2000));
  const got = fetch('art/manifest.json')
    .then((r) => (r.ok ? r.json() : null))
    .catch(() => null);
  return Promise.race([got, late]).then((m) => {
    const entry = m && m[ep.id];
    const imgs = entry && Array.isArray(entry.images) ? entry.images : [];
    let n = 0;
    for (const x of imgs) if (Number.isInteger(x) && x > 0 && (!n || x < n)) n = x;
    if (!n) return '';
    const q = entry.v != null && entry.v !== '' ? `?v=${encodeURIComponent(entry.v)}` : '';
    return `art/${encodeURIComponent(ep.id)}/${String(n).padStart(2, '0')}.jpg${q}`;
  });
}

function posterHTML(href, visual, kicker, title, ru) {
  const copy = `<span class="cover-copy"><span class="cover-kicker">${esc(kicker)}</span><h1 class="cover-title">${esc(title)}</h1>${ru ? `<span class="cover-ru">${esc(ru)}</span>` : ''}</span>`;
  const inner = `${visual}${copy}`;
  return href ? `<a class="cover-link" href="${href}">${inner}</a>` : `<div class="cover-link">${inner}</div>`;
}

export async function mount(root, ctx) {
  const s = store.get();
  const lv = computeLevel(estimate(s, db.byId));
  const due = dueIds().length;
  const next = nextEpisode(s);
  const block = next ? await blockerFor(next) : null;
  if (ctx && ctx.alive === false) return;
  const learned = Object.keys(s.words).length;
  const showHint = isIOS() && !isStandalone() && !s.settings.hintDismissed;
  const canStart = due > 0 || !!next;

  let cta = 'Читать';
  if (block && !due) cta = 'К испытаниям';
  else if (!next && due) cta = 'Повторить';

  let poster;
  if (!db.story) {
    poster = posterHTML(
      '',
      `<span class="cover-visual">${fallbackMark('ОШИБКА')}</span>`,
      'Лента',
      'Главы не загрузились',
      'Проверь соединение и открой приложение снова.'
    );
  } else if (!next) {
    poster = posterHTML('', `<span class="cover-visual">${fallbackMark('КОНЕЦ')}</span>`, 'Лента', 'Все главы прочитаны', 'Новые появятся здесь.');
  } else if (block) {
    const href = `#/trial/${encodeURIComponent(block.ep.id)}`;
    const visual = `<span class="cover-visual" data-ep="${esc(next.id)}">${fallbackMark(String(next.n).padStart(2, '0'))}<span class="cover-lock">Заперто · испытания ${block.ep.n}</span></span>`;
    poster = posterHTML(href, visual, chapterCode(next), next.title, next.titleRu || '');
  } else {
    const href = `#/session/${encodeURIComponent(next.id)}`;
    const visual = `<span class="cover-visual" data-ep="${esc(next.id)}">${fallbackMark(String(next.n).padStart(2, '0'))}</span>`;
    poster = posterHTML(href, visual, chapterCode(next), next.title, next.titleRu || '');
  }

  const dueLine = due
    ? `<a class="home-line" href="#/session"><span>${due} ${plural(due, ['слово', 'слова', 'слов'])} к повторению</span></a>`
    : '';
  const trialLine = block
    ? `<a class="home-line" href="#/trial/${encodeURIComponent(block.ep.id)}"><span>Испытания эпизода ${block.ep.n}</span></a>`
    : '';
  const goBtn = canStart ? `<button class="btn primary big" id="go" type="button"><span>${cta}</span></button>` : '';

  root.innerHTML = `<div class="screen home">
<header class="home-bar"><div class="logo">WORD<b>BOUND</b></div><span class="home-rank" aria-label="Ранг ${esc(lv.level)}">${esc(lv.level)}</span><a class="icon-btn" href="#/settings" aria-label="Настройки">${icon('gear')}</a></header>
${showHint ? installHint() : ''}
${poster}
<div class="home-dock">
${trialLine}
${dueLine}
${goBtn ? `<div class="home-actions">${goBtn}</div>` : ''}
<nav class="home-nav">
  <a href="#/episodes">${icon('list')}<span>Эпизоды</span></a>
  <a href="#/words">${icon('book')}<span>Мои слова</span><b>${learned}</b></a>
  <a href="#/settings">${icon('gear')}<span>Настройки</span></a>
</nav>
</div>
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

  if (!next) return;
  const src = await coverFor(next);
  if (!src || (ctx && ctx.alive === false)) return;
  const visual = Array.from(root.querySelectorAll('.cover-visual')).find((el) => el.getAttribute('data-ep') === next.id);
  if (!visual) return;
  const img = document.createElement('img');
  img.className = 'cover-art';
  img.alt = '';
  img.decoding = 'async';
  img.addEventListener('error', () => img.remove());
  const lock = visual.querySelector('.cover-lock');
  if (lock) visual.insertBefore(img, lock);
  else visual.appendChild(img);
  img.src = src;
}
