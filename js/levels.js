// Level maths: placement baseline + learned words -> estimate -> level + progress.
import { isKnown } from './srs.js';

export const LEVELS = ['A0', 'A1', 'A2', 'B1', 'B2', 'C1'];
export const THR = [0, 300, 800, 1500, 3000, 5000];

export function rank(l) {
  const i = LEVELS.indexOf(l);
  return i < 0 ? 1 : i;
}

export function placementRank(state) {
  return rank((state.placement && state.placement.level) || 'A0');
}

// Words whose level is below the placement level count as already known.
export function knownByLevel(word, state) {
  return !!word && rank(word.lvl) < placementRank(state);
}

// byId: Map(id -> word)
export function estimate(state, byId) {
  const pr = placementRank(state);
  let n = THR[pr];
  for (const id in state.words) {
    if (!isKnown(state.words[id])) continue;
    const w = byId && byId.get(id);
    const wr = w ? rank(w.lvl) : 1;
    if (wr >= pr) n++;
  }
  return n;
}

export function computeLevel(est) {
  let i = 0;
  for (let k = 0; k < THR.length; k++) if (est >= THR[k]) i = k;
  const last = i === THR.length - 1;
  const progress = last ? 1 : (est - THR[i]) / (THR[i + 1] - THR[i]);
  return {
    est,
    idx: i,
    level: LEVELS[i],
    next: last ? null : LEVELS[i + 1],
    progress: Math.max(0, Math.min(1, progress)),
    toNext: last ? 0 : THR[i + 1] - est,
  };
}
