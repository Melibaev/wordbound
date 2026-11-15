// Webtoon-style episode reader.
import * as store from '../store.js';
import { db, loadEpisode, tokenize, sortedEpisodes } from '../data.js';
import { renderPanelArt } from '../art.js';
import { speak } from '../tts.js';
import { esc, reduceMotion, toast } from '../util.js';
import { icon, errorBox } from '../ui.js';

const BUBBLE = new Set(['speech', 'thought', 'shout']);

function tokensHTML(text, newSet) {
  return tokenize(text)
    .map((t) => {
      if (!t.w) return esc(t.t);
      const nw = newSet.has(t.w.id) ? ' nw' : '';
      return `<span class="w${nw}" data-w="${esc(t.w.id)}">${esc(t.t)}</span>`;
    })
    .join('');
}

function ruTag(ru) {
  if (!ru) return '';
  return `<button class="rutag" data-ru aria-label="Показать перевод" aria-expanded="false">RU</button>`;
}
function spk() {
  return `<button class="spk" data-say aria-label="Озвучить">${icon('speaker')}</button>`;
}

function lineHTML(line, ep, newSet, sideOf) {
  const type = line.type || 'speech';
  if (type === 'narration-ru') {
    return `<div class="cap cap-ru"><p>${esc(line.ru || '')}</p></div>`;
  }
  const en = line.en || '';
  const ru = line.ru || '';
  const ruBlock = ru ? `<p class="ru" hidden>${esc(ru)}</p>` : '';
  const enHTML = `<p class="en">${tokensHTML(en, newSet)}</p>`;
  if (type === 'narration') {
    return `<div class="cap cap-en">${enHTML}${spk()}${ruTag(ru)}${ruBlock}</div>`;
  }
  if (type === 'system') {
    return `<div class="sys"><div class="sys-tag">[ СИСТЕМА ]</div>${enHTML}${spk()}${ruTag(ru)}${ruBlock}</div>`;
  }
  const t = BUBBLE.has(type) ? type : 'speech';
  const ch = line.who ? db.chars.get(line.who) : null;
  const who = line.who ? `<div class="who">${esc(ch ? ch.name : line.who)}</div>` : '';
  const side = sideOf(line.who);
  const inner = `${who}${enHTML}${spk()}${ruTag(ru)}${ruBlock}`;
  if (t === 'shout') {
    return `<div class="bub-wrap shout side-${side}"><div class="bub bub-shout"><div class="bub-in">${inner}</div></div></div>`;
  }
  return `<div class="bub-wrap side-${side}"><div class="bub bub-${t}">${inner}</div></div>`;
}

function panelHTML(p, i, ep, newSet) {
  const sides = {};
  let nextSide = 0;
  const posOf = (id) => {
    const c = (p.cast || []).find((x) => x.id === id);
    return c && c.pos;
  };
  const sideOf = (id) => {
    if (!id) return 'center';
    const pos = posOf(id);
    if (pos === 'left' || pos === 'right') return pos;
    if (!(id in sides)) sides[id] = nextSide++ % 2 ? 'right' : 'left';
    return pos === 'center' ? 'center' : sides[id];
  };
  const lines = p.lines;
  let k = 0;
  const caps = [];
  while (k < lines.length && (lines[k].type === 'narration-ru' || lines[k].type === 'narration')) {
    caps.push(lineHTML(lines[k], ep, newSet, sideOf));
    k++;
  }
  const rest = lines.slice(k).map((l) => lineHTML(l, ep, newSet, sideOf)).join('');
  const mood = ['calm', 'tense', 'action'].includes(p.mood) ? p.mood : 'calm';
  return `<section class="panel mood-${mood} rv" data-i="${i}">
<div class="art">${renderPanelArt(p, db.chars)}${caps.length ? `<div class="caps">${caps.join('')}</div>` : ''}</div>
${rest ? `<div class="lines">${rest}</div>` : ''}
</section>`;
}

// Resolves when the user taps the final button.
export function readEpisode(root, ep, ctx, opts = {}) {
  return new Promise((resolve) => {
    const newSet = new Set(ep.newWords);
    const label = opts.finishLabel || 'Дальше';
    const exitHref = opts.exitHref || '#/';
    const code = `S${ep.season || 1}·E${String(ep.n || 1).padStart(2, '0')}`;
    root.innerHTML = `<div class="reader">
<header class="rtop"><a class="icon-btn" href="${esc(exitHref)}" aria-label="Выйти">${icon('close')}</a>
<div class="rtitle"><b>${esc(code)}</b> ${esc(ep.title)}</div><div class="rprog"><i></i></div></header>
<div class="ep-title"><span class="stamp tilt">${esc(code)} · ${esc(ep.level || '')}</span><h1>${esc(ep.title)}</h1><p>${esc(ep.titleRu)}</p></div>
<div class="panels">${ep.panels.map((p, i) => panelHTML(p, i, ep, newSet)).join('')}</div>
<div class="tbc rv"><div class="tbc-stamp">TO BE<br>CONTINUED</div></div>
<div class="reader-end"><button class="btn primary big" id="fin"><span>${esc(label)}</span></button></div>
</div>`;
    window.scrollTo(0, 0);

    const prog = root.querySelector('.rprog i');
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        const max = document.documentElement.scrollHeight - window.innerHeight;
        prog.style.width = (max > 0 ? Math.min(100, (window.scrollY / max) * 100) : 100) + '%';
        closePop();
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    // panel reveal
    let io = null;
    const rvs = Array.from(root.querySelectorAll('.rv'));
    if ('IntersectionObserver' in window && !reduceMotion()) {
      io = new IntersectionObserver(
        (entries) => {
          for (const e of entries) {
            if (e.isIntersecting) {
              e.target.classList.add('in');
              io.unobserve(e.target);
            }
          }
        },
        { threshold: 0.12 }
      );
      rvs.forEach((el) => io.observe(el));
    } else rvs.forEach((el) => el.classList.add('in'));

    // ---- popover ----
    let pop = null;
    function closePop() {
      if (pop) {
        pop.remove();
        pop = null;
      }
    }
    function showPop(el, w) {
      closePop();
      const rec = store.getRec(w.id);
      pop = document.createElement('div');
      pop.className = 'pop';
      const tok = el.textContent;
      const same = tok.toLowerCase() === String(w.w).toLowerCase();
      pop.innerHTML = `<div class="pop-top"><b class="pop-w">${esc(same ? w.w : tok)}</b>${same ? '' : `<span class="muted"> → ${esc(w.w)}</span>`}
<button class="icon-btn small" data-pspk aria-label="Озвучить слово">${icon('speaker')}</button></div>
<div class="pop-ru">${esc(w.ru)}</div>
<div class="pop-meta muted">${esc([w.pos, w.lvl].filter(Boolean).join(' · '))}</div>
<button class="btn small ${rec ? 'on' : ''}" data-padd>${rec ? 'В моих словах ✓' : '+ В мои слова'}</button>`;
      document.body.appendChild(pop);
      const r = el.getBoundingClientRect();
      const pw = pop.offsetWidth;
      const ph = pop.offsetHeight;
      const left = Math.min(Math.max(8, r.left + r.width / 2 - pw / 2), window.innerWidth - pw - 8);
      let top = r.bottom + 10;
      if (top + ph > window.innerHeight - 8) top = r.top - ph - 10;
      pop.style.left = left + 'px';
      pop.style.top = Math.max(8, top) + 'px';
      pop.querySelector('[data-pspk]').addEventListener('click', () => speak(w.w));
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
      if (pop && !pop.contains(e.target) && !e.target.closest('.w')) closePop();
    };
    document.addEventListener('pointerdown', onDown, true);

    root.addEventListener('click', (e) => {
      const wEl = e.target.closest('.w');
      if (wEl) {
        const w = db.byId.get(wEl.dataset.w);
        if (w) showPop(wEl, w);
        return;
      }
      const say = e.target.closest('[data-say]');
      if (say) {
        const box = say.closest('.bub, .cap, .sys');
        const en = box && box.querySelector('.en');
        if (en) speak(en.textContent);
        return;
      }
      const ru = e.target.closest('[data-ru]');
      if (ru) {
        const box = ru.closest('.bub, .cap, .sys');
        const p = box && box.querySelector('.ru');
        if (p) {
          p.hidden = !p.hidden;
          ru.classList.toggle('on', !p.hidden);
          ru.setAttribute('aria-expanded', String(!p.hidden));
        }
      }
    });

    const cleanup = () => {
      window.removeEventListener('scroll', onScroll);
      document.removeEventListener('pointerdown', onDown, true);
      if (io) io.disconnect();
      closePop();
    };
    if (ctx && ctx.onCleanup) ctx.onCleanup(cleanup);
    root.querySelector('#fin').addEventListener('click', () => {
      cleanup();
      resolve();
    });
  });
}

// Route: #/read/<episodeId> — re-read a finished episode.
export async function mount(root, ctx) {
  const id = ctx.args[0];
  const meta = sortedEpisodes().find((e) => e.id === id);
  if (!meta) {
    root.innerHTML = `<div class="screen">${errorBox('Эпизод не найден.', '<a class="btn" href="#/episodes">К списку</a>')}</div>`;
    return;
  }
  let ep;
  try {
    ep = await loadEpisode(meta);
  } catch (e) {
    root.innerHTML = `<div class="screen">${errorBox('Не удалось загрузить эпизод. Проверь соединение.', '<a class="btn" href="#/episodes">К списку</a>')}</div>`;
    return;
  }
  if (!ctx.alive) return;
  await readEpisode(root, ep, ctx, { finishLabel: 'К списку эпизодов', exitHref: '#/episodes' });
  if (ctx.alive) location.hash = '#/episodes';
}
