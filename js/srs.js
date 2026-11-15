// SM-2-like spaced repetition. Pure functions, no storage access.
export const MIN = 60e3;
export const DAY = 864e5;

export function newCard(due) {
  return { due, interval: 0, ease: 2.5, reps: 0, lapses: 0, relearn: false };
}

// g: 0 = again, 1 = hard, 2 = good. Returns a NEW record.
export function grade(rec, g, now = Date.now()) {
  const r = { ...newCard(now), ...rec };
  if (g === 0) {
    if (r.reps > 0 && !r.relearn) r.lapses += 1;
    r.ease = Math.max(1.3, r.ease - 0.2);
    r.relearn = true;
    r.reps = 0;
    r.interval = 1;
    r.due = now + 10 * MIN;
    return r;
  }
  if (r.relearn) {
    r.relearn = false;
    r.interval = 1;
    r.reps = 1;
    if (g === 1) r.ease = Math.max(1.3, r.ease - 0.15);
    r.due = now + DAY;
    return r;
  }
  if (g === 2) {
    const next = r.reps === 0 ? 1 : r.reps === 1 ? 3 : r.reps === 2 ? 7 : Math.round(r.interval * r.ease);
    r.interval = r.reps === 0 ? next : Math.max(next, r.interval + 1);
    r.reps += 1;
  } else {
    let next = r.reps === 0 ? 1 : Math.max(1, Math.round(r.interval * 1.2));
    if (r.reps > 0 && next <= r.interval) next = r.interval + 1;
    r.interval = next;
    r.ease = Math.max(1.3, r.ease - 0.15);
    r.reps += 1;
  }
  r.due = now + r.interval * DAY;
  return r;
}

// Milliseconds until the next review if graded g (for button hints).
export function previewMs(rec, g, now = Date.now()) {
  return grade(rec, g, now).due - now;
}

export function isDue(rec, now = Date.now()) {
  return !!rec && !rec.skip && rec.due <= now;
}

export function isKnown(rec) {
  return !!rec && (!!rec.skip || (rec.interval || 0) >= 7);
}

// 'new' | 'learning' | 'known'
export function status(rec) {
  if (isKnown(rec)) return 'known';
  if (rec && (rec.reps > 0 || rec.relearn)) return 'learning';
  return 'new';
}
