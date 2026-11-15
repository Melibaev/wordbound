// speechSynthesis wrapper with iOS quirks handled. Fails silently when unavailable.
let voices = [];
let unlocked = false;
let getSettings = () => ({ rate: 0.9, voice: '' });

export function ttsAvailable() {
  return typeof window !== 'undefined' && 'speechSynthesis' in window && typeof window.SpeechSynthesisUtterance !== 'undefined';
}

function loadVoices() {
  try {
    voices = window.speechSynthesis.getVoices() || [];
  } catch (e) {
    voices = [];
  }
  return voices;
}

export function listVoices() {
  if (!ttsAvailable()) return [];
  if (!voices.length) loadVoices();
  return voices.filter((v) => /^en[-_]/i.test(v.lang));
}

function score(v) {
  let s = 0;
  if (/^en[-_]US$/i.test(v.lang)) s += 10;
  else if (/^en[-_]GB$/i.test(v.lang)) s += 5;
  if (/enhanced|premium|siri/i.test(v.name)) s += 6;
  if (/samantha|ava|allison|nicky|evan|zoe|google us/i.test(v.name)) s += 3;
  if (v.localService) s += 1;
  if (/novelty|bad|good news|bells|boing|bubbles|cellos|jester|organ|whisper|zarvox|trinoids|wobble|superstar/i.test(v.name)) s -= 20;
  return s;
}

export function pickVoice() {
  const list = listVoices();
  if (!list.length) return null;
  const want = getSettings().voice;
  if (want) {
    const f = list.find((v) => v.voiceURI === want || v.name === want);
    if (f) return f;
  }
  return list.slice().sort((a, b) => score(b) - score(a))[0];
}

export function initTTS(settingsGetter) {
  if (settingsGetter) getSettings = settingsGetter;
  if (!ttsAvailable()) return;
  loadVoices();
  try {
    window.speechSynthesis.addEventListener('voiceschanged', loadVoices);
  } catch (e) {
    window.speechSynthesis.onvoiceschanged = loadVoices;
  }
  const unlock = () => {
    if (unlocked) return;
    unlocked = true;
    try {
      const u = new window.SpeechSynthesisUtterance(' ');
      u.volume = 0;
      window.speechSynthesis.speak(u);
    } catch (e) {
      /* ignore */
    }
    loadVoices();
    ['touchend', 'pointerdown', 'click'].forEach((ev) => document.removeEventListener(ev, unlock, true));
  };
  ['touchend', 'pointerdown', 'click'].forEach((ev) => document.addEventListener(ev, unlock, true));
}

export function stopSpeaking() {
  if (!ttsAvailable()) return;
  try {
    window.speechSynthesis.cancel();
  } catch (e) {
    /* ignore */
  }
}

// Resolves true when finished, false if unavailable/failed.
export function speak(text, opts = {}) {
  return new Promise((resolve) => {
    if (!ttsAvailable() || !text) return resolve(false);
    try {
      const ss = window.speechSynthesis;
      const busy = ss.speaking || ss.pending;
      ss.cancel();
      const u = new window.SpeechSynthesisUtterance(String(text));
      const v = pickVoice();
      if (v) {
        u.voice = v;
        u.lang = v.lang;
      } else u.lang = 'en-US';
      const st = getSettings();
      u.rate = opts.rate || st.rate || 0.9;
      let done = false;
      let timer = null;
      const fin = (ok) => {
        if (done) return;
        done = true;
        clearTimeout(timer);
        resolve(ok);
      };
      u.onend = () => fin(true);
      u.onerror = () => fin(false);
      timer = setTimeout(() => fin(false), 4000 + String(text).length * 150);
      if (busy) setTimeout(() => ss.speak(u), 60);
      else ss.speak(u);
    } catch (e) {
      resolve(false);
    }
  });
}
