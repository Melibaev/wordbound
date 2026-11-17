// Single-blob localStorage state with versioning + migration hook.
import { dayKey, parseDay, daysBetween } from './util.js';
import { newCard, DAY } from './srs.js';

const KEY = 'wordbound.state';
export const SCHEMA = 1;
// Newly learned words first come up for review after this delay.
const FIRST_REVIEW_DELAY = 20 * 3600e3;

let state = null;

export function defaults() {
  return {
    v: SCHEMA,
    onboarded: false,
    placement: null, // { level, skills, date, skipped }
    words: {}, // id -> { due, interval, ease, reps, lapses, relearn, skip, added }
    episodes: {}, // id -> { done, date, score, total }
    trials: {}, // trialId -> { passed, date, best, attempts, prog:{ i, lives, correct } }
    days: [], // studied day keys, never reset
    settings: {
      theme: 'auto',
      rate: 0.9,
      voice: '',
      speech: 'normal',
      hintDismissed: false,
      read: 'learn',
      learnWay: 'ru-en',
      learnGrain: 'sentence',
    },
  };
}

// Migration hook: bring any older/foreign blob up to SCHEMA.
export function migrate(input) {
  const d = defaults();
  if (!input || typeof input !== 'object') return d;
  const s = { ...d, ...input, settings: { ...d.settings, ...(input.settings || {}) } };
  if (!s.words || typeof s.words !== 'object' || Array.isArray(s.words)) s.words = {};
  if (!s.episodes || typeof s.episodes !== 'object' || Array.isArray(s.episodes)) s.episodes = {};
  if (!s.trials || typeof s.trials !== 'object' || Array.isArray(s.trials)) s.trials = {};
  if (!Array.isArray(s.days)) s.days = [];
  // let ver = input.v || 0; if (ver < 2) { ... } — future migrations go here.
  s.v = SCHEMA;
  return s;
}

export function load() {
  try {
    const raw = localStorage.getItem(KEY);
    state = migrate(raw ? JSON.parse(raw) : null);
  } catch (e) {
    state = defaults();
  }
  return state;
}

export function get() {
  if (!state) load();
  return state;
}

export function save() {
  try {
    localStorage.setItem(KEY, JSON.stringify(state));
  } catch (e) {
    /* storage full or blocked: keep running in memory */
  }
}

// Reset progress but keep user preferences.
export function reset() {
  const keep = get().settings;
  state = defaults();
  state.settings = { ...state.settings, ...keep };
  save();
}

export function exportJSON() {
  return JSON.stringify({ app: 'wordbound', exportedAt: new Date().toISOString(), state: get() }, null, 1);
}

export function importJSON(text) {
  const o = JSON.parse(text);
  const s = o && o.state ? o.state : o;
  if (!s || typeof s !== 'object' || typeof s.words !== 'object') throw new Error('bad backup');
  state = migrate(s);
  save();
}

// ---- days / streak ----
export function markStudied() {
  const s = get();
  const k = dayKey();
  if (!s.days.includes(k)) s.days.push(k);
  save();
}

export function lastStudyDay() {
  const d = get().days;
  return d.length ? d.slice().sort().pop() : null;
}

export function awayDays() {
  const l = lastStudyDay();
  return l ? daysBetween(l, dayKey()) : 0;
}

export function streak() {
  const set = new Set(get().days);
  let d = new Date();
  if (!set.has(dayKey(d))) d = new Date(d.getFullYear(), d.getMonth(), d.getDate() - 1);
  let n = 0;
  while (set.has(dayKey(d))) {
    n++;
    d = new Date(d.getFullYear(), d.getMonth(), d.getDate() - 1);
  }
  return n;
}

// ---- words ----
export function getRec(id) {
  return get().words[id] || null;
}

export function setRec(id, rec) {
  get().words[id] = rec;
}

export function addWord(id) {
  const s = get();
  if (s.words[id]) return s.words[id];
  const now = Date.now();
  s.words[id] = { ...newCard(now + FIRST_REVIEW_DELAY), skip: false, added: now };
  save();
  return s.words[id];
}

export function markKnown(id) {
  const s = get();
  const now = Date.now();
  s.words[id] = { ...newCard(now + 3650 * DAY), skip: true, added: now };
  save();
}

export function removeWord(id) {
  delete get().words[id];
  save();
}

export function setPlacement(p) {
  get().placement = p;
  save();
}

export function recordEpisode(id, info) {
  get().episodes[id] = { done: true, date: dayKey(), ...info };
  save();
}

export function trialRec(id) {
  return get().trials[id] || null;
}

export function setTrialRec(id, patch) {
  const s = get();
  s.trials[id] = { ...(s.trials[id] || {}), ...patch };
  save();
  return s.trials[id];
}

export { parseDay };
