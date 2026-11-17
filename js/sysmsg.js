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
  system: { title: 'SYSTEM' },
  quest: { title: 'QUEST' },
  status: { title: 'STATUS' },
  warning: { title: 'WARNING' },
  reward: { title: 'REWARD' },
};

// Episode lines have no kind field. Trials pass kind themselves.
export function sysKind(text) {
  const t = String(text || '');
  if (isWarn(t)) return 'warning';
  if (/^\s*(quest|mission)\b/i.test(t)) return 'quest';
  if (/^\s*(reward|bonus)\b/i.test(t)) return 'reward';
  if (/^\s*status\b/i.test(t)) return 'status';
  return 'system';
}

export function sysRowHTML({ en, ru, attrs = '', newSet = null, inner = null, other = null }) {
  const trans = other != null ? other : ru;
  const rt = trans
    ? `<button class="rutag" data-ru aria-label="Показать перевод" aria-expanded="false">RU</button>`
    : '';
  const body = inner != null ? inner : `<p class="en">${tokensHTML(en, newSet)}</p>`;
  return `<div class="sysrow">${body}<button class="spk" data-say ${attrs} aria-label="Озвучить">${icon('speaker')}</button>${rt}${trans ? `<p class="ru" hidden>${esc(trans)}</p>` : ''}</div>`;
}

// One chrome everywhere. kind: system|quest|status|warning|reward.
// overlay and tilt are ignored: the window is a flat full-width frame, never a sticker.
export function sysWindowHTML({ kind = 'system', title, rows, warn }) {
  const k = KINDS[kind] ? kind : 'system';
  const isW = warn != null ? !!warn : k === 'warning';
  const t = String(title || KINDS[k].title).toUpperCase();
  const body = (Array.isArray(rows) ? rows : []).map(sysRowHTML).join('');
  return `<div class="sysw k-${k}${isW ? ' warn' : ''}" role="group" aria-label="${esc(t)}"><p class="sysw-lab">${esc(t)}</p><div class="sysw-body">${body}</div></div>`;
}
