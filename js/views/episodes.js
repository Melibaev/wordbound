import * as store from '../store.js';
import { db, sortedEpisodes, nextEpisode } from '../data.js';
import { esc } from '../util.js';
import { topbar, icon, errorBox } from '../ui.js';

export async function mount(root) {
  const s = store.get();
  const eps = sortedEpisodes();
  if (!db.story) {
    root.innerHTML = `<div class="screen">${topbar('Эпизоды')}${errorBox('Не удалось загрузить список эпизодов.')}</div>`;
    return;
  }
  const nxt = nextEpisode(s);
  let lastSeason = null;
  let html = '';
  for (const e of eps) {
    if (e.season !== lastSeason) {
      html += `<h2 class="season">СЕЗОН ${e.season}</h2>`;
      lastSeason = e.season;
    }
    const st = s.episodes[e.id];
    const done = st && st.done;
    const isNext = nxt && nxt.id === e.id;
    const href = done ? `#/read/${encodeURIComponent(e.id)}` : `#/session/${encodeURIComponent(e.id)}`;
    html += `<a class="card ep-row${done ? ' done' : ''}${isNext ? ' next' : ''}" href="${href}">
<div class="ep-num">E${String(e.n).padStart(2, '0')}</div>
<div class="ep-body"><h3>${esc(e.title)}</h3><p class="muted">${esc(e.titleRu || '')} · ${esc(e.level || '')}</p></div>
<div class="ep-state">${done ? `<span class="stamp ok">${icon('check')}</span>${st.total ? `<small>${st.score}/${st.total}</small>` : ''}` : isNext ? '<span class="stamp tilt">ДАЛЕЕ</span>' : ''}</div></a>`;
  }
  root.innerHTML = `<div class="screen">${topbar('Эпизоды')}${html || '<p class="muted">Пока нет эпизодов.</p>'}</div>`;
}
