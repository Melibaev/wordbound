// Pre-generated neural audio (audio/*.mp3, made by tools/audio/gen_audio.py) with speechSynthesis fallback.
import * as store from './store.js';
import { speak, stopSpeaking } from './tts.js';

let el = null;
let index = null; // audio/index.json or false when missing
let indexP = null;
let token = 0;
let cur = null; // { done }

const SILENT_WAV = 'data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEAQB8AAIA+AAACABAAZGF0YQAAAAA=';
const nn = (i) => String(i).padStart(2, '0');
export const slug = (w) => String(w).toLowerCase().replace(/’/g, "'").replace(/[^a-z0-9]+/g, '_').replace(/^_+|_+$/g, '');

function getEl() {
  if (!el) {
    el = new Audio();
    el.preload = 'auto';
    el.setAttribute('playsinline', '');
    for (const k of ['preservesPitch', 'webkitPreservesPitch', 'mozPreservesPitch']) {
      try {
        el[k] = true;
      } catch (e) {
        /* ignore */
      }
    }
  }
  return el;
}

export function speechRate() {
  return store.get().settings.speech === 'slow' ? 0.75 : 1;
}
const ttsRate = () => (speechRate() < 1 ? 0.7 : 0.9);

function loadIndex() {
  if (!indexP) {
    indexP = fetch('audio/index.json')
      .then((r) => (r.ok ? r.json() : null))
      .catch(() => null)
      .then((j) => {
        index = j && typeof j === 'object' ? j : false;
        return index;
      });
  }
  return indexP;
}

export function initAudio() {
  loadIndex();
  const unlock = () => {
    ['touchend', 'pointerdown', 'click'].forEach((ev) => document.removeEventListener(ev, unlock, true));
    const a = getEl();
    if (!a.src && a.paused) {
      try {
        a.muted = true;
        a.src = SILENT_WAV;
        const p = a.play();
        const undo = () => {
          if (a.src === SILENT_WAV) {
            a.pause();
            a.removeAttribute('src');
          }
          a.muted = false;
        };
        if (p && p.then) p.then(undo, () => (a.muted = false));
        else undo();
      } catch (e) {
        /* ignore */
      }
    }
  };
  ['touchend', 'pointerdown', 'click'].forEach((ev) => document.addEventListener(ev, unlock, true));
}

// Resolves the parsed index (or false). Used by callers that must know whether audio exists.
export const audioIndex = () => loadIndex();

export function stopAudio() {
  token++;
  if (cur) {
    cur.done(false);
    cur = null;
  }
  if (el) {
    try {
      el.pause();
    } catch (e) {
      /* ignore */
    }
  }
  stopSpeaking();
}

function url(rel) {
  return 'audio/' + rel + (index && index.version ? '?v=' + index.version : '');
}

// kind: 'episodes:<id>' | 'words' | 'placement'. Resolves true when played to the end.
function playFile(rel, kind, fallbackText, ttsOpts) {
  stopAudio();
  const my = token;
  const tts = () => (fallbackText ? speak(fallbackText, { rate: ttsRate(), ...(ttsOpts || {}) }) : Promise.resolve(false));
  if (index === false) return tts();
  if (index) {
    const ok = kind.startsWith('episodes:')
      ? index.episodes && index.episodes[kind.slice(9)]
      : kind.startsWith('trials:')
        ? index.trials && index.trials[kind.slice(7)]
        : index[kind];
    if (!ok) return tts();
  }
  const a = getEl();
  return new Promise((resolve) => {
    let finished = false;
    const done = (v) => {
      if (finished) return;
      finished = true;
      a.removeEventListener('ended', onEnd);
      a.removeEventListener('error', onErr);
      a.removeEventListener('loadedmetadata', setRate);
      if (cur && cur.done === done) cur = null;
      resolve(v);
    };
    const onEnd = () => done(true);
    const onErr = () => {
      if (my !== token) return done(false);
      finished = true;
      a.removeEventListener('ended', onEnd);
      a.removeEventListener('error', onErr);
      a.removeEventListener('loadedmetadata', setRate);
      resolve(tts());
    };
    const setRate = () => {
      try {
        a.defaultPlaybackRate = speechRate();
        a.playbackRate = speechRate();
      } catch (e) {
        /* ignore */
      }
    };
    cur = { done };
    a.addEventListener('ended', onEnd);
    a.addEventListener('error', onErr);
    a.addEventListener('loadedmetadata', setRate);
    a.muted = false;
    a.src = url(rel);
    setRate();
    const p = a.play();
    if (p && p.catch) {
      p.catch((err) => {
        if (my !== token) return;
        if (err && err.name === 'AbortError') return;
        if (err && err.name === 'NotAllowedError') return done(false);
        onErr();
      });
    }
    // index not loaded yet: learn it for next time (and for the cache-busting version)
    if (index === null) loadIndex();
  });
}

export const playLine = (epId, panelIdx, lineIdx, fallbackText) =>
  playFile(`${epId}/${nn(panelIdx + 1)}-${nn(lineIdx + 1)}.mp3`, 'episodes:' + epId, fallbackText);

// Voiced scene for a panel with a video: audio/<ep>/NN-scene.mp3 (all spoken lines in order). Plays over the silent video.
export const playScene = (epId, panelIdx) => playFile(`${epId}/${nn(panelIdx + 1)}-scene.mp3`, 'episodes:' + epId, null);

// Trial audio: audio/trials/<episode>/<hash>.mp3, hash = FNV-1a 64 over UTF-8 of `voice|delivery|text` (16 hex chars).
// tools/audio/gen_trials_audio.py implements the identical function.
export function trialHash(voice, delivery, text) {
  const bytes = new TextEncoder().encode(`${voice || ''}|${delivery || ''}|${text || ''}`);
  let h = 0xcbf29ce484222325n;
  for (const b of bytes) {
    h ^= BigInt(b);
    h = (h * 0x100000001b3n) & 0xffffffffffffffffn;
  }
  return h.toString(16).padStart(16, '0');
}
export const playTrial = (epId, voice, delivery, text) =>
  playFile(`trials/${epId}/${trialHash(voice, delivery, text)}.mp3`, 'trials:' + epId, text);

// form: optional tapped (inflected) token; when it differs from the headword its own file is used.
export function playWord(wordId, fallbackText, form) {
  const base = String(fallbackText || '').toLowerCase();
  if (form && String(form).toLowerCase().replace(/’/g, "'") !== base) {
    return playFile(`w/f-${slug(form)}.mp3`, 'words', form);
  }
  return playFile(`w/${wordId}.mp3`, 'words', fallbackText);
}
export const playExample = (wordId, fallbackText) => playFile(`w/${wordId}-ex.mp3`, 'words', fallbackText, { rate: ttsRate() });
export const playPlacement = (i, fallbackText) => playFile(`p/${i}.mp3`, 'placement', fallbackText, { rate: 0.85 });
// vocab item of the placement test: dictionary word if it has one, else audio/p/v-<slug>.mp3
export function playPlacementWord(word, wordObj) {
  if (wordObj && String(wordObj.w).toLowerCase() === String(word).toLowerCase()) return playFile(`w/${wordObj.id}.mp3`, 'words', word);
  return playFile(`p/v-${slug(word)}.mp3`, 'placement', word);
}

// Background prefetch of an episode's line audio (sequential, low priority). Returns a cancel fn.
export function prefetchEpisode(ep) {
  let stop = false;
  (async () => {
    try {
      if (typeof navigator !== 'undefined' && navigator.onLine === false) return;
      const idx = await loadIndex();
      if (!idx || !idx.episodes || !idx.episodes[ep.id]) return;
      await new Promise((r) => setTimeout(r, 1500));
      for (let pi = 0; pi < ep.panels.length; pi++) {
        const lines = ep.panels[pi].lines;
        for (let li = 0; li < lines.length; li++) {
          if (stop) return;
          const l = lines[li];
          if (!l || l.type === 'narration-ru' || !l.en) continue;
          try {
            const r = await fetch(url(`${ep.id}/${nn(pi + 1)}-${nn(li + 1)}.mp3`), { priority: 'low' });
            await r.arrayBuffer();
          } catch (e) {
            return; // offline
          }
        }
      }
    } catch (e) {
      /* ignore */
    }
  })();
  return () => {
    stop = true;
  };
}
