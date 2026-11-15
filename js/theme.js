import * as store from './store.js';

export function applyTheme() {
  const t = store.get().settings.theme;
  const root = document.documentElement;
  if (t === 'light' || t === 'dark') root.dataset.theme = t;
  else delete root.dataset.theme;
  let dark = t === 'dark';
  if (t !== 'light' && t !== 'dark') {
    try {
      dark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    } catch (e) {
      dark = false;
    }
  }
  const m = document.querySelector('meta[name="theme-color"]');
  if (m) m.setAttribute('content', dark ? '#111111' : '#F4F0E6');
}

try {
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', applyTheme);
} catch (e) {
  /* old Safari */
}
