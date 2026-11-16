import * as store from '../store.js';
import { db, sortedEpisodes, nextEpisode } from '../data.js';
import { esc } from '../util.js';
import { loadTrials, trialsDone } from '../trials.js';
import { topbar, icon, errorBox } from '../ui.js';

export async function mount(root) {
  const s = store.get();
  const eps = sortedEpisodes();
  if (!db.story) {
    root.innerHTML = `<div class="screen">${topbar('Эпизоды')}${errorBox('Не удалось загрузить список эпизодов.')}</div>`;
    return;
  }
  const nxt = nextEpisode(s);
  const tfiles = await Promise.all(eps.map((e) => loadTrials(e.id)));
  let lastSeason = null;
  let html = '';
  for (let k = 0; k < eps.length; k++) {
    const e = eps[k];
    if (e.season !== lastSeason) {
      html += `<h2 class="season">СЕЗОН ${e.season}</h2>`;
      lastSeason = e.season;
    }
    const st = s.episodes[e.id];
    const done = st && st.done;
    const isNext = nxt && nxt.id === e.id;
    const prev = k > 0 ? eps[k - 1] : null;
    const locked = !!(!done && prev && s.episodes[prev.id] && s.episodes[prev.id].done && tfiles[k - 1] && !trialsDone(tfiles[k - 1]));
    const pendingOwn = !!(done && tfiles[k] && !trialsDone(tfiles[k]));
    const href = locked ? `#/trial/${encodeURIComponent(prev.id)}` : done ? `#/read/${encodeURIComponent(e.id)}` : `#/session/${encodeURIComponent(e.id)}`;
    const state = locked
      ? '<span class="lock" aria-label="Закрыто">🔒</span>'
      : done
        ? `<span class="stamp ok">${icon('check')}</span>${st.total ? `<small>${st.score}/${st.total}</small>` : ''}`
        : isNext
          ? '<span class="stamp tilt">ДАЛЕЕ</span>'
          : '';
    html += `<a class="card ep-row${done ? ' done' : ''}${isNext && !locked ? ' next' : ''}${locked ? ' locked' : ''}" href="${href}">
<div class="ep-num">E${String(e.n).padStart(2, '0')}</div>
<div class="ep-body"><h3>${esc(e.title)}</h3><p class="muted">${esc(e.titleRu || '')} · ${esc(e.level || '')}</p>${locked ? `<p class="lockmsg">Пройди испытания эпизода ${prev.n}</p>` : ''}</div>
<div class="ep-state">${state}</div></a>`;
    if (pendingOwn) html += `<a class="btn small trial-link" href="#/trial/${encodeURIComponent(e.id)}"><span>Испытания эпизода ${e.n}</span></a>`;
  }
  root.innerHTML = `<div class="screen">${topbar('Эпизоды')}${html || '<p class="muted">Пока нет эпизодов.</p>'}</div>`;
}
