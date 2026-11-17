// WORDBOUND service worker: network-first with cache fallback; background prefetch of episodes.
const CACHE = 'wordbound-v24';
const MEDIA = 'wordbound-media-v1';
const MEDIA_MAX = 150;
const AUDIO = 'wordbound-audio-v1';
const AUDIO_MAX = 3000;
const AUDIO_RE = /\/audio\/[^?#]+\.mp3$/i;
const MEDIA_RE = /\/art\/[^?#]+\.(?:jpe?g|png|webp|mp4)$/i;
const SHELL = [
  './',
  'index.html',
  'manifest.webmanifest',
  'css/style.css',
  'css/home.css',
  'js/app.js',
  'js/util.js',
  'js/store.js',
  'js/srs.js',
  'js/levels.js',
  'js/readmode.js',
  'js/theme.js',
  'js/tts.js',
  'js/audio.js',
  'js/data.js',
  'js/art.js',
  'js/ui.js',
  'js/views/home.js',
  'js/views/onboarding.js',
  'js/views/placement.js',
  'js/views/session.js',
  'js/views/reader.js',
  'js/views/intro.js',
  'js/views/quiz.js',
  'js/views/review.js',
  'js/views/episodes.js',
  'js/views/trial.js',
  'js/trials.js',
  'js/sysmsg.js',
  'js/wordpop.js',
  'js/views/words.js',
  'js/views/settings.js',
  'icons/icon-192.png',
  'icons/icon-512.png',
  'icons/apple-touch-icon.png',
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE).then((c) => Promise.allSettled(SHELL.map((u) => c.add(new Request(u, { cache: 'reload' }))))).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE && k !== MEDIA && k !== AUDIO).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

function withTimeout(p, ms) {
  return new Promise((resolve, reject) => {
    const t = setTimeout(() => reject(new Error('timeout')), ms);
    p.then(
      (v) => {
        clearTimeout(t);
        resolve(v);
      },
      (err) => {
        clearTimeout(t);
        reject(err);
      }
    );
  });
}

async function prefetchData(storyRes) {
  try {
    const story = await storyRes.json();
    const cache = await caches.open(CACHE);
    const rels = ['data/words.json', 'data/placement.json', 'data/pron.json', 'audio/index.json'];
    for (const ep of story.episodes || []) if (ep && ep.file) rels.push('data/' + ep.file);
    rels.push('data/trials/index.json');
    try {
      const ti = await (await fetch(new URL('data/trials/index.json', self.registration.scope).href, { cache: 'no-cache' })).json();
      for (const id of ti.episodes || []) rels.push('data/trials/' + id + '.json');
    } catch (err) {
      /* no trials yet */
    }
    for (const rel of rels) {
      const url = new URL(rel, self.registration.scope).href;
      try {
        const r = await fetch(new Request(url, { cache: 'no-cache' }));
        if (r && r.ok) await cache.put(url, r);
      } catch (err) {
        /* offline or missing: skip */
      }
    }
  } catch (err) {
    /* ignore */
  }
}

async function networkFirst(event) {
  const req = event.request;
  const cache = await caches.open(CACHE);
  try {
    const res = await withTimeout(fetch(new Request(req.url, { cache: 'no-cache', credentials: 'same-origin' })), 7000);
    if (res && res.ok) {
      cache.put(req, res.clone());
      if (/\/data\/story\.json$/.test(new URL(req.url).pathname)) event.waitUntil(prefetchData(res.clone()));
    }
    return res;
  } catch (err) {
    const hit = (await cache.match(req, { ignoreSearch: true })) || (await cache.match(req.url, { ignoreSearch: true }));
    if (hit) return hit;
    if (req.mode === 'navigate') {
      const idx = (await cache.match('index.html')) || (await cache.match('./'));
      if (idx) return idx;
    }
    throw err;
  }
}

// Real art: cache-first in its own cache, capped (oldest evicted). Never precached.
async function mediaFirst(req) {
  const cache = await caches.open(MEDIA);
  const hit = await cache.match(req);
  if (hit) return hit;
  const res = await fetch(req);
  if (res && res.status === 200) {
    await cache.put(req, res.clone());
    const keys = await cache.keys();
    for (let i = 0; i < keys.length - MEDIA_MAX; i++) await cache.delete(keys[i]);
  }
  return res;
}

// Speech audio: cache-first in its own big cache. Only full 200 responses are stored (never Range/partial).
// A new ?v= version of the same file replaces the old entry.
let audioPuts = 0;
async function audioFirst(req) {
  const cache = await caches.open(AUDIO);
  const hit = await cache.match(req);
  if (hit) return hit;
  const res = await fetch(req);
  if (res && res.status === 200 && !res.headers.get('content-range')) {
    await cache.put(req, res.clone());
    try {
      const same = await cache.keys(req, { ignoreSearch: true });
      for (const k of same) if (k.url !== req.url) await cache.delete(k);
      if (++audioPuts % 50 === 0) {
        const keys = await cache.keys();
        for (let i = 0; i < keys.length - AUDIO_MAX; i++) await cache.delete(keys[i]);
      }
    } catch (err) {
      /* housekeeping only */
    }
  }
  return res;
}

// iOS <audio> asks for byte ranges. Serve them by slicing a fully cached file; never cache the partial answers.
async function audioRange(req) {
  const cache = await caches.open(AUDIO);
  const full = new Request(req.url);
  const hit = await cache.match(full);
  const m = /bytes=(\d*)-(\d*)/.exec(req.headers.get('range') || '');
  if (!hit || !m) return fetch(req);
  const buf = await hit.arrayBuffer();
  const size = buf.byteLength;
  let start = m[1] === '' ? Math.max(0, size - Number(m[2])) : Number(m[1]);
  let end = m[1] === '' || m[2] === '' ? size - 1 : Math.min(Number(m[2]), size - 1);
  if (start > end || start >= size) return new Response(null, { status: 416, headers: { 'Content-Range': 'bytes */' + size } });
  return new Response(buf.slice(start, end + 1), {
    status: 206,
    headers: { 'Content-Type': 'audio/mpeg', 'Content-Length': String(end - start + 1), 'Content-Range': `bytes ${start}-${end}/${size}` },
  });
}

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;
  if (AUDIO_RE.test(url.pathname)) {
    event.respondWith(req.headers.has('range') ? audioRange(req) : audioFirst(req));
    return;
  }
  if (MEDIA_RE.test(url.pathname)) {
    if (req.headers.has('range')) return; // partial responses (video) go straight to the network
    event.respondWith(mediaFirst(req));
    return;
  }
  event.respondWith(networkFirst(event));
});
