// The System window: the game-UI element of WORDBOUND (reader system lines + trial windows).
import { esc } from './util.js';
import { tokenize } from './data.js';
import { icon } from './ui.js';

export function tokensHTML(text, newSet) {
  return tokenize(text)
    .map((t) => {
      if (!t.w) return esc(t.t);
      const nw = newSet && newSet.has(t.w.id) ? ' nw' : '';
      return `<span class="w${nw}" data-w="${esc(t.w.id)}">${esc(t.t)}</span>`;
    })
    .join('');
}

export const isWarn = (text) => /^\s*(warning|word lost|not true)/i.test(String(text || ''));

const KINDS = {
  system: { title: 'SYSTEM', stamp: 'OFFICIAL' },
  quest: { title: 'QUEST', stamp: 'ACCEPTED' },
  status: { title: 'STATUS', stamp: 'LOGGED' },
  warning: { title: 'WARNING', stamp: 'DANGER' },
  reward: { title: 'REWARD', stamp: 'CLAIMED' },
};
const TILTS = [-1.1, 0.8, -0.6, 1.0];
let seq = 0;

export function sysRowHTML({ en, ru, attrs = '', newSet = null }) {
  const rt = ru
    ? `<button class="rutag" data-ru aria-label="Показать перевод" aria-expanded="false">RU</button>`
    : '';
  return `<div class="sysrow"><p class="en">${tokensHTML(en, newSet)}</p><button class="spk" data-say ${attrs} aria-label="Озвучить">${icon('speaker')}</button>${rt}${ru ? `<p class="ru" hidden>${esc(ru)}</p>` : ''}</div>`;
}

// rows: [{ en, ru, attrs, newSet }]. kind: system|quest|status|warning|reward. overlay: absolutely placed over panel art.
export function sysWindowHTML({ kind = 'system', title, rows, warn, overlay = false, tilt }) {
  const k = KINDS[kind] ? kind : 'system';
  const isW = warn != null ? warn : k === 'warning';
  const t = String(title || KINDS[k].title).toUpperCase();
  const tl = tilt != null ? tilt : TILTS[seq++ % TILTS.length];
  const stamp = isW ? 'WARNING' : KINDS[k].stamp;
  return `<div class="sysw k-${k}${isW ? ' warn' : ''}${overlay ? ' overlay' : ''}" style="--tilt:${tl}deg" role="group" aria-label="${esc(t)}">
<div class="sysw-a"><div class="sysw-b"><div class="sysw-c"><div class="sysw-d">
<div class="sysw-bar"><b>[ ${esc(t)} ]</b><span class="sysw-ctl" aria-hidden="true"><i></i><i></i><i></i></span></div>
<div class="sysw-body">${rows.map(sysRowHTML).join('')}</div>
<span class="sysw-stamp" aria-hidden="true">${esc(stamp)}</span>
</div></div></div></div></div>`;
}
