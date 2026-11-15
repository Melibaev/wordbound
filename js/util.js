// Small shared helpers: escaping, dates, sheets, toasts.

export const esc = (s) =>
  String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

export const $ = (sel, root = document) => root.querySelector(sel);
export const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

export function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function sample(arr, n) {
  return shuffle(arr).slice(0, n);
}

export const wait = (ms) => new Promise((r) => setTimeout(r, ms));

export function reduceMotion() {
  try {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  } catch (e) {
    return false;
  }
}

const p2 = (n) => String(n).padStart(2, '0');
export function dayKey(d = new Date()) {
  return `${d.getFullYear()}-${p2(d.getMonth() + 1)}-${p2(d.getDate())}`;
}
export function parseDay(k) {
  const [y, m, d] = String(k).split('-').map(Number);
  return new Date(y, (m || 1) - 1, d || 1);
}
export function daysBetween(a, b) {
  const da = parseDay(a);
  const db = parseDay(b);
  return Math.round((db - da) / 86400000);
}
// Monday-first week containing d, as array of 7 day keys.
export function weekKeys(d = new Date()) {
  const wd = (d.getDay() + 6) % 7;
  const mon = new Date(d.getFullYear(), d.getMonth(), d.getDate() - wd);
  return Array.from({ length: 7 }, (_, i) => dayKey(new Date(mon.getFullYear(), mon.getMonth(), mon.getDate() + i)));
}

// Russian plural: plural(5, ['слово','слова','слов'])
export function plural(n, forms) {
  const a = Math.abs(n) % 100;
  const b = a % 10;
  if (a > 10 && a < 20) return forms[2];
  if (b > 1 && b < 5) return forms[1];
  if (b === 1) return forms[0];
  return forms[2];
}

export function fmtInterval(ms) {
  if (ms < 3600e3) return Math.max(1, Math.round(ms / 60000)) + ' мин';
  if (ms < 86400e3) return Math.round(ms / 3600e3) + ' ч';
  const d = Math.round(ms / 86400e3);
  if (d < 60) return d + ' д';
  return Math.round(d / 30) + ' мес';
}

export function toast(msg, ms = 1900) {
  const t = document.createElement('div');
  t.className = 'toast';
  t.textContent = msg;
  t.setAttribute('role', 'status');
  document.body.appendChild(t);
  requestAnimationFrame(() => t.classList.add('show'));
  setTimeout(() => {
    t.classList.remove('show');
    setTimeout(() => t.remove(), 250);
  }, ms);
}

// Bottom sheet. html is trusted markup (callers must escape data).
export function openSheet(html, { onClose } = {}) {
  const back = document.createElement('div');
  back.className = 'sheet-back';
  back.innerHTML = `<div class="sheet" role="dialog" aria-modal="true">${html}</div>`;
  document.body.appendChild(back);
  requestAnimationFrame(() => back.classList.add('open'));
  let closed = false;
  const close = () => {
    if (closed) return;
    closed = true;
    back.classList.remove('open');
    setTimeout(() => back.remove(), 200);
    if (onClose) onClose();
  };
  back.addEventListener('click', (e) => {
    if (e.target === back) close();
  });
  return { el: back.firstElementChild, back, close };
}

export function confirmBox(text, ok = 'Да', cancel = 'Отмена') {
  return new Promise((res) => {
    const s = openSheet(
      `<p class="sheet-text">${esc(text)}</p>
       <div class="row"><button class="btn" data-v="0">${esc(cancel)}</button><button class="btn primary" data-v="1">${esc(ok)}</button></div>`,
      { onClose: () => res(false) }
    );
    s.el.addEventListener('click', (e) => {
      const b = e.target.closest('[data-v]');
      if (!b) return;
      res(b.dataset.v === '1');
      s.close();
    });
  });
}
