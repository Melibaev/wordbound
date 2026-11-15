// Shared UI snippets (icons, top bar, badges).
import { esc } from './util.js';

const svg = (inner, vb = '0 0 24 24') =>
  `<svg viewBox="${vb}" width="22" height="22" aria-hidden="true" focusable="false">${inner}</svg>`;

export const ICONS = {
  speaker: svg(
    '<path d="M3 9v6h4l5 4V5L7 9H3z" fill="currentColor"/><path d="M15.5 8.5a5 5 0 0 1 0 7M18 6a8.5 8.5 0 0 1 0 12" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round"/>'
  ),
  back: svg('<path d="M15 4l-8 8 8 8" stroke="currentColor" stroke-width="3" fill="none" stroke-linecap="square"/>'),
  close: svg('<path d="M5 5l14 14M19 5L5 19" stroke="currentColor" stroke-width="3" fill="none" stroke-linecap="square"/>'),
  check: svg('<path d="M4 12.5l5 5L20 6.5" stroke="currentColor" stroke-width="3.4" fill="none" stroke-linecap="square"/>'),
  gear: svg(
    '<circle cx="12" cy="12" r="3.2" fill="none" stroke="currentColor" stroke-width="2.4"/><path d="M12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3M5.3 5.3l2.1 2.1M16.6 16.6l2.1 2.1M18.7 5.3l-2.1 2.1M7.4 16.6l-2.1 2.1" stroke="currentColor" stroke-width="2.6" stroke-linecap="square"/>'
  ),
  book: svg('<path d="M4 5h7v14H4zM13 5h7v14h-7z" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linejoin="round"/>'),
  list: svg('<path d="M8 6h12M8 12h12M8 18h12M3.5 6h.01M3.5 12h.01M3.5 18h.01" stroke="currentColor" stroke-width="3" stroke-linecap="square"/>'),
  play: svg('<path d="M7 4l13 8-13 8z" fill="currentColor"/>'),
};

export const icon = (n) => ICONS[n] || '';

export function topbar(title, back = '#/', right = '') {
  const left = back
    ? `<a class="icon-btn" href="${esc(back)}" aria-label="Назад">${icon('back')}</a>`
    : '<span class="icon-btn ghost"></span>';
  return `<header class="topbar">${left}<h1>${esc(title)}</h1><span class="tb-right">${right}</span></header>`;
}

export function errorBox(msg, extra = '') {
  return `<div class="card err"><div class="stamp">ОШИБКА</div><p>${esc(msg)}</p>${extra}</div>`;
}

export function bar(pct) {
  const p = Math.max(0, Math.min(100, Math.round(pct)));
  return `<div class="bar" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${p}"><i style="width:${p}%"></i></div>`;
}

export function isStandalone() {
  return (window.navigator && window.navigator.standalone === true) || (window.matchMedia && window.matchMedia('(display-mode: standalone)').matches);
}

export function isIOS() {
  const ua = navigator.userAgent || '';
  return /iPad|iPhone|iPod/.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
}

export function installHint() {
  return `<div class="card hint" data-hint><button class="icon-btn small" data-hint-close aria-label="Скрыть">${icon('close')}</button>
<div class="stamp">СОВЕТ</div>
<p>Добавь приложение на экран «Домой»: нажми «Поделиться» в Safari и выбери «На экран “Домой”». Так оно работает как приложение и без сети.</p></div>`;
}

// Promise-based screen: renders html, resolves with the data-act of the clicked element.
export function showScreen(root, html) {
  return new Promise((resolve) => {
    root.innerHTML = html;
    window.scrollTo(0, 0);
    root.querySelectorAll('[data-act]').forEach((b) => b.addEventListener('click', () => resolve(b.dataset.act)));
  });
}
