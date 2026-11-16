// Webtoon-style episode reader.
import * as store from '../store.js';
import { db, loadEpisode, tokenize, sortedEpisodes } from '../data.js';
import { renderPanelArt } from '../art.js';
import { playLine, prefetchEpisode, stopAudio } from '../audio.js';
import { esc, reduceMotion } from '../util.js';
import { icon, errorBox } from '../ui.js';
import { tokensHTML, sysWindowHTML, isWarn } from '../sysmsg.js';
import { wordPop } from '../wordpop.js';

const BUBBLE = new Set(['speech', 'thought', 'shout']);

// ---- optional real art: art/<episodeId>/<NN>.jpg (+ .mp4), listed in art/manifest.json when present ----
let manifestP = null;
function loadManifest() {
  if (!manifestP) {
    const f = fetch('art/manifest.json')
      .then((r) => (r.ok ? r.json() : null))
      .catch(() => null);
    const t = new Promise((res) => setTimeout(() => res(null), 2000));
    manifestP = Promise.race([f, t]).then((m) => (m && typeof m === 'object' ? m : null));
  }
  return manifestP;
}
const nn = (i) => String(i + 1).padStart(2, '0');

function ruTag(ru) {
  if (!ru) return '';
  return `<button class="rutag" data-ru aria-label="Показать перевод" aria-expanded="false">RU</button>`;
}
function spk(pi, li) {
  return `<button class="spk" data-say data-p="${pi}" data-l="${li}" aria-label="Озвучить">${icon('speaker')}</button>`;
}

function lineHTML(line, ep, newSet, sideOf, pi, li) {
  const type = line.type || 'speech';
  if (type === 'narration-ru') {
    return `<div class="cap cap-ru"><p>${esc(line.ru || '')}</p></div>`;
  }
  const en = line.en || '';
  const ru = line.ru || '';
  const ruBlock = ru ? `<p class="ru" hidden>${esc(ru)}</p>` : '';
  const enHTML = `<p class="en">${tokensHTML(en, newSet)}</p>`;
  if (type === 'narration') {
    return `<div class="cap cap-en">${enHTML}${spk(pi, li)}${ruTag(ru)}${ruBlock}</div>`;
  }
  const t = BUBBLE.has(type) ? type : 'speech';
  const ch = line.who ? db.chars.get(line.who) : null;
  const who = line.who ? `<div class="who">${esc(ch ? ch.name : line.who)}</div>` : '';
  const side = sideOf(line.who);
  const inner = `${who}${enHTML}${spk(pi, li)}${ruTag(ru)}${ruBlock}`;
  if (t === 'shout') {
    return `<div class="bub-wrap shout side-${side}"><div class="bub bub-shout"><div class="bub-in">${inner}</div></div></div>`;
  }
  return `<div class="bub-wrap side-${side}"><div class="bub bub-${t}">${inner}</div></div>`;
}

function panelHTML(p, i, ep, newSet, media) {
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
    caps.push(lineHTML(lines[k], ep, newSet, sideOf, i, k));
    k++;
  }
  const known0 = media.entry && (media.entry.images || []).includes(i + 1);
  const overlay = [];
  const restParts = [];
  let grp = null;
  lines.slice(k).forEach((l, j) => {
    if (l.type === 'system' && l.en) {
      const warn = isWarn(l.en);
      if (!grp || grp.warn !== warn) {
        grp = { warn, rows: [] };
        (known0 ? overlay : restParts).push(grp);
      }
      grp.rows.push({ en: l.en, ru: l.ru, attrs: `data-p="${i}" data-l="${k + j}"`, newSet });
      return;
    }
    grp = null;
    restParts.push(lineHTML(l, ep, newSet, sideOf, i, k + j));
  });
  const winOf = (g, ov) => sysWindowHTML({ kind: g.warn ? 'warning' : 'system', title: 'SYSTEM', rows: g.rows, warn: g.warn, overlay: ov });
  const rest = restParts.map((x) => (typeof x === 'string' ? x : winOf(x, false))).join('');
  const sysOver = overlay.length ? `<div class="sys-over${caps.length ? ' low' : ''}">${overlay.map((g) => winOf(g, true)).join('')}</div>` : '';
  const mood = ['calm', 'tense', 'action'].includes(p.mood) ? p.mood : 'calm';
  const known = media.entry && (media.entry.images || []).includes(i + 1);
  const alt = esc(p.art || '');
  const img = known
    ? `<img class="art-img" src="${esc(media.base + nn(i) + '.jpg' + media.q)}" alt="${alt}" decoding="async" loading="${i < 2 ? 'eager' : 'lazy'}" data-alt="${alt}">`
    : '';
  return `<section class="panel mood-${mood} rv${known ? ' has-img' : ''}" data-i="${i}">
<div class="art">${renderPanelArt(p, db.chars)}${img}${sysOver}${caps.length ? `<div class="caps">${caps.join('')}</div>` : ''}</div>
${rest ? `<div class="lines">${rest}</div>` : ''}
</section>`;
}

// Resolves when the user taps the final button.
export async function readEpisode(root, ep, ctx, opts = {}) {
  const manifest = await loadManifest();
  if (ctx && ctx.alive === false) return;
  const entry = manifest && manifest[ep.id];
  const media = { entry, hasManifest: !!manifest, base: `art/${ep.id}/`, q: entry && entry.v ? `?v=${encodeURIComponent(entry.v)}` : '' };
  return new Promise((resolve) => {
    const newSet = new Set(ep.newWords);
    const label = opts.finishLabel || 'Дальше';
    const exitHref = opts.exitHref || '#/';
    const code = `S${ep.season || 1}·E${String(ep.n || 1).padStart(2, '0')}`;
    root.innerHTML = `<div class="reader">
<header class="rtop"><a class="icon-btn" href="${esc(exitHref)}" aria-label="Выйти">${icon('close')}</a>
<div class="rtitle"><b>${esc(code)}</b> ${esc(ep.title)}</div><div class="rprog"><i></i></div></header>
<div class="ep-title"><span class="stamp tilt">${esc(code)} · ${esc(ep.level || '')}</span><h1>${esc(ep.title)}</h1><p>${esc(ep.titleRu)}</p></div>
<div class="panels">${ep.panels.map((p, i) => panelHTML(p, i, ep, newSet, media)).join('')}</div>
<div class="tbc rv"><div class="tbc-stamp">TO BE<br>CONTINUED</div></div>
<div class="reader-end"><button class="btn primary big" id="fin"><span>${esc(label)}</span></button></div>
</div>`;
    window.scrollTo(0, 0);
    const cancelPrefetch = prefetchEpisode(ep);

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

    // ---- real art: swap SVG placeholder for the image; optional looping video for key panels ----
    const vids = new Set();
    let vio = null;
    const still = reduceMotion();
    if ('IntersectionObserver' in window && !still) {
      vio = new IntersectionObserver(
        (entries) => {
          for (const e of entries) {
            const v = e.target;
            if (e.isIntersecting) {
              if (!v.getAttribute('src')) v.src = v.dataset.src;
              const pr = v.play();
              if (pr && pr.catch) pr.catch(() => {});
            } else v.pause();
          }
        },
        { threshold: 0.35 }
      );
    }
    const markReady = (img) => {
      const art = img.closest('.art');
      const panel = img.closest('.panel');
      if (!art || art.classList.contains('img-ready')) return;
      art.classList.add('img-ready');
      panel.classList.add('has-img');
      const i = Number(panel.dataset.i);
      if (!img.alt && img.dataset.alt) img.alt = img.dataset.alt;
      if (!still && vio && media.entry && (media.entry.videos || []).includes(i + 1)) {
        const v = document.createElement('video');
        v.className = 'art-video';
        v.muted = true;
        v.loop = true;
        v.playsInline = true;
        v.setAttribute('muted', '');
        v.setAttribute('playsinline', '');
        v.preload = 'none';
        v.poster = img.currentSrc || img.src;
        v.dataset.src = media.base + nn(i) + '.mp4' + media.q;
        v.setAttribute('aria-hidden', 'true');
        v.addEventListener('error', () => { vio.unobserve(v); v.remove(); vids.delete(v); }, { once: true });
        img.after(v);
        vids.add(v);
        vio.observe(v);
      }
    };
    root.querySelectorAll('.panel').forEach((panel) => {
      let img = panel.querySelector('img.art-img');
      if (!img && !media.hasManifest) {
        // no manifest file at all: probe images only, one request per panel
        img = new Image();
        img.className = 'art-img';
        img.decoding = 'async';
        img.dataset.alt = '';
        img.src = `${media.base}${nn(Number(panel.dataset.i))}.jpg`;
        img.onload = () => {
          panel.querySelector('.art').appendChild(img);
          markReady(img);
        };
        img.onerror = () => {};
        return;
      }
      if (!img) return;
      if (img.complete && img.naturalWidth) markReady(img);
      else {
        img.addEventListener('load', () => markReady(img), { once: true });
        img.addEventListener('error', () => {
          img.remove();
          panel.classList.remove('has-img');
        }, { once: true });
      }
    });

    const wp = wordPop(root);
    const closePop = wp.close;

    const onClick = (e) => {
      const say = e.target.closest('[data-say]');
      if (say) {
        const box = say.closest('.bub, .cap, .sysrow');
        const en = box && box.querySelector('.en');
        if (en) playLine(ep.id, Number(say.dataset.p), Number(say.dataset.l), en.textContent);
        return;
      }
      const ru = e.target.closest('[data-ru]');
      if (ru) {
        const box = ru.closest('.bub, .cap, .sysrow');
        const p = box && box.querySelector('.ru');
        if (p) {
          p.hidden = !p.hidden;
          ru.classList.toggle('on', !p.hidden);
          ru.setAttribute('aria-expanded', String(!p.hidden));
        }
      }
    };
    root.addEventListener('click', onClick);

    const cleanup = () => {
      window.removeEventListener('scroll', onScroll);
      if (io) io.disconnect();
      if (vio) vio.disconnect();
      vids.forEach((v) => v.pause());
      root.removeEventListener('click', onClick);
      wp.destroy();
      cancelPrefetch();
      stopAudio();
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
