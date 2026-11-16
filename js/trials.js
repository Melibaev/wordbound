// Trials: story-integrated exercises per episode (data/trials/<episode>.json) + chapter gating.
import * as store from './store.js';
import { sortedEpisodes } from './data.js';

const files = new Map(); // episodeId -> Promise<file|null>

// Dev hook: localStorage 'wb.trialsBase' = 'dev-fixtures/trials-' loads dev-fixtures/trials-<id>.json
export function trialsBase() {
  try {
    return localStorage.getItem('wb.trialsBase') || 'data/trials/';
  } catch (e) {
    return 'data/trials/';
  }
}

function valid(j) {
  return j && typeof j === 'object' && Array.isArray(j.trials) && j.trials.length && j.trials.every((t) => t && t.id && Array.isArray(t.steps) && t.steps.length);
}

// data/trials/index.json = { "episodes": ["s1e01", ...] } lists the episodes that have a trials file
// (keeps the console free of 404s). Whoever adds or removes data/trials/<id>.json must update it.
let indexP = null;
function trialIndex() {
  if (!indexP) {
    const b = trialsBase();
    indexP = fetch(b === 'data/trials/' ? 'data/trials/index.json' : b.replace(/-$/, '-index.json'))
      .then((r) => (r.ok ? r.json() : null))
      .then((j) => (j && Array.isArray(j.episodes) ? new Set(j.episodes) : new Set()))
      .catch(() => new Set());
  }
  return indexP;
}

// -> trial file or null (not listed / missing / malformed). Never throws.
export function loadTrials(epId) {
  if (!files.has(epId)) {
    files.set(
      epId,
      trialIndex()
        .then((idx) => (idx.has(epId) ? fetch(trialsBase() + epId + '.json') : null))
        .then((r) => (r && r.ok ? r.json() : null))
        .then((j) => (valid(j) ? j : null))
        .catch(() => null)
    );
  }
  return files.get(epId);
}

export const trialPassed = (id) => !!(store.trialRec(id) && store.trialRec(id).passed);
export const trialsDone = (file) => !file || file.trials.every((t) => trialPassed(t.id));
export const trialsCount = (file) => (file ? file.trials.filter((t) => trialPassed(t.id)).length : 0);

// Episode that must have its trials passed before `meta` opens, or null. Existing progress is never wiped:
// an already finished episode stays readable.
export async function blockerFor(meta) {
  if (!meta || store.get().episodes[meta.id]?.done) return null;
  const eps = sortedEpisodes();
  const i = eps.findIndex((e) => e.id === meta.id);
  if (i <= 0) return null;
  const prev = eps[i - 1];
  const file = await loadTrials(prev.id);
  if (!file || trialsDone(file)) return null;
  // the previous episode must itself be finished (otherwise it is the next one to read, not a lock)
  if (!store.get().episodes[prev.id]?.done) return null;
  return { ep: prev, file };
}

// Next chapter after finishing trials of `epId` (honours the file's `unlocks`).
export function unlockTarget(epId, file) {
  const eps = sortedEpisodes();
  if (file && file.unlocks) {
    const e = eps.find((x) => x.id === file.unlocks);
    if (e) return e;
  }
  const i = eps.findIndex((e) => e.id === epId);
  return i >= 0 && i + 1 < eps.length ? eps[i + 1] : null;
}

export function preloadTrials() {
  return Promise.all(sortedEpisodes().map((e) => loadTrials(e.id)));
}
