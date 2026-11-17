// Shared tap-a-word popover (translation + add to my words). Used by the reader and the trial player.
import * as store from './store.js';
import { db } from './data.js';
import { playWord } from './audio.js';
import { esc, toast } from './util.js';
import { icon } from './ui.js';

// Delegates clicks on `.w[data-w]` inside root. Returns { close, destroy }.
export function wordPop(root) {
  let pop = null;
  let anchor = null;
  function close() {
    if (anchor) {
      anchor.classList.remove('on');
      anchor = null;
    }
    if (pop) {
      pop.remove();
      pop = null;
    }
  }
  function show(el, w) {
    close();
    anchor = el;
    el.classList.add('on');
    const rec = store.getRec(w.id);
    pop = document.createElement('div');
    pop.className = 'pop';
    const tok = el.textContent;
    const same = tok.toLowerCase() === String(w.w).toLowerCase();
    pop.innerHTML = `<div class="pop-top"><b class="pop-w">${esc(same ? w.w : tok)}</b>${same ? '' : `<span class="muted"> → ${esc(w.w)}</span>`}
<button class="icon-btn small" data-pspk aria-label="Озвучить слово">${icon('speaker')}</button></div>
${db.pron[w.id] ? `<div class="pop-ipa muted">/${esc(db.pron[w.id])}/</div>` : ''}<div class="pop-ru">${esc(w.ru)}</div>
<div class="pop-meta muted">${esc([w.pos, w.lvl].filter(Boolean).join(' · '))}</div>
<button class="btn small ${rec ? 'on' : ''}" data-padd>${rec ? 'В моих словах ✓' : '+ В мои слова'}</button>`;
    document.body.appendChild(pop);
    const r = el.getBoundingClientRect();
    const margin = 8;
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const pw = pop.offsetWidth;
    const ph = pop.offsetHeight;
    const left = Math.max(margin, Math.min(r.left + r.width / 2 - pw / 2, vw - pw - margin));
    let top = r.bottom + 10;
    if (top + ph > vh - margin) top = r.top - ph - 10;
    if (top < margin) top = margin;
    if (top + ph > vh - margin) top = Math.max(margin, vh - ph - margin);
    pop.style.left = left + 'px';
    pop.style.top = top + 'px';
    pop.querySelector('[data-pspk]').addEventListener('click', () => playWord(w.id, w.w, tok));
    const add = pop.querySelector('[data-padd]');
    add.addEventListener('click', () => {
      if (store.getRec(w.id)) {
        store.removeWord(w.id);
        add.textContent = '+ В мои слова';
        add.classList.remove('on');
      } else {
        store.addWord(w.id);
        add.textContent = 'В моих словах ✓';
        add.classList.add('on');
        toast('Слово добавлено');
      }
    });
  }
  const onDown = (e) => {
    if (pop && !pop.contains(e.target) && !e.target.closest('.w')) close();
  };
  const onClick = (e) => {
    const wEl = e.target.closest('.w');
    if (!wEl || !root.contains(wEl)) return;
    const w = db.byId.get(wEl.dataset.w);
    if (w) show(wEl, w);
  };
  document.addEventListener('pointerdown', onDown, true);
  root.addEventListener('click', onClick);
  return {
    close,
    destroy() {
      close();
      document.removeEventListener('pointerdown', onDown, true);
      root.removeEventListener('click', onClick);
    },
  };
}
