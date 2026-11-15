// Entry point + hash router.
import * as store from './store.js';
import { initData } from './data.js';
import { initTTS } from './tts.js';
import { applyTheme } from './theme.js';
import { esc } from './util.js';
import * as home from './views/home.js';
import * as onboarding from './views/onboarding.js';
import * as placement from './views/placement.js';
import * as session from './views/session.js';
import * as reader from './views/reader.js';
import * as episodes from './views/episodes.js';
import * as words from './views/words.js';
import * as settings from './views/settings.js';

const routes = { '': home, home, onboarding, placement, session, read: reader, episodes, words, settings };
const root = document.getElementById('app');
let current = null;
let token = 0;

function parseHash() {
  const h = location.hash.replace(/^#\/?/, '');
  const [name, ...rest] = h.split('?')[0].split('/');
  return { name: name || '', args: rest.map((x) => decodeURIComponent(x)) };
}

function teardown() {
  if (!current) return;
  current.alive = false;
  for (const fn of current.cleanups) {
    try {
      fn();
    } catch (e) {
      /* ignore */
    }
  }
  current = null;
}

function showError(msg) {
  root.innerHTML = `<div class="screen"><div class="card err"><div class="stamp">ОШИБКА</div><p>${esc(msg)}</p>
<a class="btn primary" href="#/">На главную</a> <button class="btn" id="reload">Перезагрузить</button></div></div>`;
  const b = document.getElementById('reload');
  if (b) b.addEventListener('click', () => location.reload());
}

async function render() {
  teardown();
  const my = ++token;
  const { name, args } = parseHash();
  const state = store.get();
  if (!state.onboarded && name !== 'onboarding' && name !== 'placement') {
    location.replace('#/onboarding');
    return;
  }
  const ctx = {
    alive: true,
    args,
    cleanups: [],
    onCleanup(fn) {
      this.cleanups.push(fn);
    },
  };
  current = ctx;
  document.body.dataset.route = name || 'home';
  window.scrollTo(0, 0);
  try {
    await initData();
    if (my !== token) return;
    const mod = routes[name] || home;
    root.innerHTML = '';
    await mod.mount(root, ctx);
  } catch (e) {
    if (my === token) {
      console.error(e);
      showError('Что-то пошло не так. Попробуй перезагрузить приложение.');
    }
  }
}

function registerSW() {
  if (!('serviceWorker' in navigator)) return;
  const reg = () =>
    navigator.serviceWorker
      .register('sw.js')
      .then((r) => r.update && r.update())
      .catch(() => {});
  if (document.readyState === 'complete') reg();
  else window.addEventListener('load', reg);
}

function boot() {
  store.load();
  applyTheme();
  initTTS(() => store.get().settings);
  try {
    if (navigator.storage && navigator.storage.persist) navigator.storage.persist().catch(() => {});
  } catch (e) {
    /* ignore */
  }
  // prevent iOS pinch / double-tap zoom gestures
  document.addEventListener('gesturestart', (e) => e.preventDefault());
  window.addEventListener('hashchange', render);
  registerSW();
  render();
}

boot();
