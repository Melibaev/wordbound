// Webtoon-style episode reader.
import * as store from '../store.js';
import { db, loadEpisode, tokenize, sortedEpisodes } from '../data.js';
import { renderPanelArt } from '../art.js';
import { playLine, playScene, prefetchEpisode, stopAudio } from '../audio.js';
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

// ---- speech bubbles placed over the image: line.place = { x, y, w, tail } (fractions of the image box) ----
const TAILS = new Set(['down-left', 'down-right', 'up-left', 'up-right', 'left', 'right', 'none']);
const fin = (v, lo, hi, d) => (typeof v === 'number' && isFinite(v) ? Math.min(hi, Math.max(lo, v)) : d);
function placeOf(l) {
  const p = l && l.place;
  if (!p || typeof p !== 'object') return null;
  const w = fin(p.w, 0.2, 0.96, 0.5);
  return { x: fin(p.x, 0, 1 - w, 0.05), y: fin(p.y, 0, 0.97, 0.05), w, tail: TAILS.has(p.tail) ? p.tail : 'down-left' };
}
function placedHTML(l, pl, pi, li, newSet) {
  const type = l.type || 'speech';
  const style = `left:${(pl.x * 100).toFixed(2)}%;top:${(pl.y * 100).toFixed(2)}%;width:${(pl.w * 100).toFixed(2)}%`;
  const ru = l.ru || '';
  const ruBlock = ru ? `<p class="ru" hidden>${esc(ru)}</p>` : '';
  const wrap = (cls, inner) => `<div class="pl ${cls}" data-tail="${pl.tail}" style="${style}">${inner}</div>`;
  if (type === 'narration-ru') return wrap('pl-cap', `<div class="cap cap-ru"><p>${esc(ru)}</p></div>`);
  const enHTML = `<p class="en">${tokensHTML(l.en || '', newSet)}</p>`;
  if (type === 'system') {
    const warn = isWarn(l.en);
    return wrap('pl-sys', sysWindowHTML({ kind: warn ? 'warning' : 'system', title: 'SYSTEM', rows: [{ en: l.en, ru, attrs: `data-p="${pi}" data-l="${li}"`, newSet }], warn, overlay: true }));
  }
  const body = `${enHTML}${spk(pi, li)}${ruTag(ru)}${ruBlock}`;
  if (type === 'narration') return wrap('pl-cap', `<div class="cap cap-en">${body}</div>`);
  const t = BUBBLE.has(type) ? type : 'speech';
  if (t === 'shout') return wrap('pl-shout', `<div class="bub-shout"><div class="bub-in">${body}</div></div>`);
  return wrap('pl-' + t, `<div class="bub bub-${t}">${body}</div>`);
}

// keep every placed item inside the image box (heights are only known after layout)
function fitLayer(layer) {
  if (!layer) return;
  const H = layer.clientHeight;
  const W = layer.clientWidth;
  if (!H) return;
  const items = Array.from(layer.querySelectorAll('.pl'));
  items.forEach((el) => {
    if (el.dataset.top == null) {
      el.dataset.top = el.style.top;
      el.dataset.left = el.style.left;
    }
    el.style.top = el.dataset.top;
    el.style.left = el.dataset.left;
  });
  const GAP = 8;
  const placed = [];
  for (const el of items) {
    if (el.offsetLeft + el.offsetWidth > W - 2) el.style.left = Math.max(2, W - el.offsetWidth - 2) + 'px';
    const h = el.offsetHeight;
    const l = el.offsetLeft;
    const r = l + el.offsetWidth;
    const tail = /^down|^left|^right/.test(el.dataset.tail || '') ? 14 : 4;
    const maxTop = H - h - tail;
    let top = Math.min(el.offsetTop, maxTop);
    const hit = (t) => placed.find((q) => l < q.r && r > q.l && t < q.b + GAP && t + h + GAP > q.t);
    for (let n = 0; n < 12; n++) {
      const q = hit(top);
      if (!q) break;
      top = q.b + GAP; // push down
    }
    if (hit(top) || top > maxTop) {
      // no room below: try above the blocking items
      let t2 = Math.min(el.offsetTop, maxTop);
      for (let n = 0; n < 12; n++) {
        const q = hit(t2);
        if (!q) break;
        t2 = q.t - h - GAP;
      }
      top = t2 >= 10 && !hit(t2) ? t2 : Math.max(10, Math.min(top, maxTop));
    }
    top = Math.max(10, top);
    el.style.top = top + 'px';
    placed.push({ l, r, t: top, b: top + h });
  }
}

// RU translation of a placed bubble: a popover in the layer, never inside the bubble (bubbles must not resize/move)
function closeRuPop(layer) {
  if (!layer) return;
  layer.querySelectorAll('.pl-ru').forEach((n) => n.remove());
  layer.querySelectorAll('.pl [data-ru].on').forEach((b) => {
    b.classList.remove('on');
    b.setAttribute('aria-expanded', 'false');
  });
}
function toggleRuPop(pl, btn) {
  const layer = pl.parentNode;
  const wasOpen = btn.classList.contains('on');
  closeRuPop(layer);
  if (wasOpen) return;
  const src = pl.querySelector('.ru');
  if (!src) return;
  const W = layer.clientWidth;
  const H = layer.clientHeight;
  const pop = document.createElement('div');
  pop.className = 'pl-ru';
  pop.setAttribute('role', 'note');
  pop.textContent = src.textContent;
  layer.appendChild(pop);
  const G = 8;
  const bx = pl.offsetLeft, by = pl.offsetTop, bw = pl.offsetWidth, bh = pl.offsetHeight;
  const others = [...layer.querySelectorAll('.pl')].filter((n) => n !== pl).map((n) => ({ l: n.offsetLeft, t: n.offsetTop, r: n.offsetLeft + n.offsetWidth, b: n.offsetTop + n.offsetHeight }));
  const clamp = (v, lo, hi) => Math.max(lo, Math.min(v, hi));
  const widths = [Math.min(W - 8, Math.max(bw, W * 0.55))];
  if (bw < widths[0] - 2) widths.push(Math.max(bw, 90));
  const side = Math.max(90, Math.min(bw, W * 0.4));
  let best = null;
  const tryAt = (wd, kind) => {
    pop.style.width = wd + 'px';
    const h = pop.offsetHeight;
    let l, t;
    if (kind === 'below' || kind === 'above') {
      l = clamp(bx, 4, W - wd - 4);
      t = kind === 'below' ? by + bh + G : by - h - G;
    } else {
      l = kind === 'right' ? bx + bw + G : bx - wd - G;
      t = by;
    }
    if (l < 4 || l + wd > W - 4) return;
    t = clamp(t, 4, Math.max(4, H - h - 4));
    let ov = 0;
    for (const o of others) ov += Math.max(0, Math.min(l + wd, o.r) - Math.max(l, o.l)) * Math.max(0, Math.min(t + h, o.b) - Math.max(t, o.t));
    ov += 0.6 * Math.max(0, Math.min(l + wd, bx + bw) - Math.max(l, bx)) * Math.max(0, Math.min(t + h, by + bh) - Math.max(t, by));
    const dist = Math.abs(t + h / 2 - (by + bh / 2)) + Math.abs(l + wd / 2 - (bx + bw / 2));
    const score = ov * 1000 + dist + (wd < widths[0] ? 20 : 0);
    if (!best || score < best.score) best = { score, l, t, wd };
  };
  widths.forEach((wd) => { tryAt(wd, 'below'); tryAt(wd, 'above'); });
  if (bw < W * 0.55) { tryAt(side, 'right'); tryAt(side, 'left'); }
  if (!best) { const wd = widths[0]; pop.style.width = wd + 'px'; best = { l: clamp(bx, 4, W - wd - 4), t: clamp(by + bh + G, 4, Math.max(4, H - pop.offsetHeight - 4)), wd }; }
  pop.style.width = best.wd + 'px';
  pop.style.left = best.l + 'px';
  pop.style.top = best.t + 'px';
  btn.classList.add('on');
  btn.setAttribute('aria-expanded', 'true');
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
  const knownA = media.entry && (media.entry.images || []).includes(i + 1);
  const needPlace = lines.filter((l) => l.type !== 'narration-ru');
  if (knownA && needPlace.length && needPlace.every((l) => placeOf(l))) {
    const capsP = [];
    const items = [];
    lines.forEach((l, j) => {
      const pl = placeOf(l);
      if (pl) items.push(placedHTML(l, pl, i, j, newSet));
      else capsP.push(lineHTML(l, ep, newSet, sideOf, i, j));
    });
    const mood = ['calm', 'tense', 'action'].includes(p.mood) ? p.mood : 'calm';
    const alt = esc(p.art || '');
    const img = `<img class="art-img" src="${esc(media.base + nn(i) + '.jpg' + media.q)}" alt="${alt}" decoding="async" loading="${i < 2 ? 'eager' : 'lazy'}" data-alt="${alt}">`;
    return `<section class="panel mood-${mood} rv has-img placed" data-i="${i}">
${capsP.length ? `<div class="caps-top">${capsP.join('')}</div>` : ''}<div class="art">${renderPanelArt(p, db.chars)}${img}<div class="pl-layer">${items.join('')}</div></div>
</section>`;
  }
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
      requestAnimationFrame(() => fitLayer(art.querySelector('.pl-layer')));
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
        const sb = document.createElement('button');
        sb.type = 'button';
        sb.className = 'vid-say';
        sb.dataset.scene = String(i);
        sb.setAttribute('aria-label', 'Озвучить сцену');
        sb.innerHTML = icon('speaker');
        art.appendChild(sb);
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

    const fitAll = () => root.querySelectorAll('.pl-layer').forEach(fitLayer);
    requestAnimationFrame(fitAll);
    window.addEventListener('resize', fitAll);
    const wp = wordPop(root);
    const closePop = wp.close;

    const onClick = (e) => {
      const scn = e.target.closest('.vid-say');
      if (scn) {
        const art = scn.closest('.art');
        const v = art && art.querySelector('video.art-video');
        if (v) { try { v.currentTime = 0; const pr = v.play(); if (pr && pr.catch) pr.catch(() => {}); } catch (err) { /* ignore */ } }
        playScene(ep.id, Number(scn.dataset.scene));
        return;
      }
      const say = e.target.closest('[data-say]');
      if (say) {
        const box = say.closest('.bub, .bub-shout, .cap, .sysrow');
        const en = box && box.querySelector('.en');
        if (en) playLine(ep.id, Number(say.dataset.p), Number(say.dataset.l), en.textContent);
        return;
      }
      const popClick = e.target.closest('.pl-ru');
      if (popClick) { closeRuPop(popClick.parentNode); return; }
      const ru = e.target.closest('[data-ru]');
      const plEl = ru && ru.closest('.pl');
      if (plEl) { toggleRuPop(plEl, ru); return; }
      if (ru) {
        const box = ru.closest('.bub, .bub-shout, .cap, .sysrow');
        const p = box && box.querySelector('.ru');
        if (p) {
          p.hidden = !p.hidden;
          ru.classList.toggle('on', !p.hidden);
          ru.setAttribute('aria-expanded', String(!p.hidden));
          const lay = ru.closest('.pl-layer');
          if (lay) setTimeout(() => fitLayer(lay), 0);
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
      window.removeEventListener('resize', fitAll);
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
