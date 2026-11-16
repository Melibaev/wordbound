#!/usr/bin/env python3
"""Validate WORDBOUND trials (data/trials/*.json). Stdlib only.

Checks: schema of every trial / step / System window, answer indices, the dictionary rule
(every English word must exist in data/words.json, same tokenizer as validate_content.py),
the level rule (a trial for episode N may only use words the learner has already met in the
text of episodes <= N, plus a short list of A1 basics), Floor-1 grammar (no past, future or -ing
forms), spoilers (names not introduced yet, Mira and SISTER), Count / Missed-calls continuity in
System text, the System's speech rules, and the size rules (2-4 trials, 12-20 steps per episode,
pass 0.8, 3 lives).

Usage: python tools/validate_trials.py [-v]     (-v also lists "basic word not met yet" notes)
"""
import json, re, sys, os, glob
from collections import Counter

ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..")
DATA = os.path.join(ROOT, "data")
TRIALS = os.path.join(DATA, "trials")
TOK = re.compile(r"[a-z]+(?:'[a-z]+)*")

STEP_TYPES = {"choose", "build", "type", "listen", "match", "fill", "pick_voice"}
WINDOW_KINDS = {"quest", "status", "warning", "reward"}
# window titles are fixed UI chrome (the app translates them); lines inside are checked as text
WINDOW_TITLES = {"QUEST", "STATUS", "WARNING", "REWARD", "QUEST COMPLETE"}
VOICES = {"dan", "mira", "keeper", "system", "silent", "pip", "trader", "lina_human", "narration"}
# A1 basics that may be used at any point of Season 1 without having appeared in an episode yet
BASICS = {"yes", "no", "ok", "and", "good", "bad", "hello", "say", "quest",
          "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten"}
# Floor 1 has no past and no future (WRITING-GUIDE section 3)
S1_FORBIDDEN = {"was", "were", "did", "didn't", "had", "went", "will", "won't", "would", "been",
                "wasn't", "said", "came", "took", "gave", "saw", "knew"}

errors, warns, notes = [], [], []
def err(m): errors.append(m)
def warn(m): warns.append(m)
def note(m): notes.append(m)

def load(path):
    try:
        with open(path, encoding="utf-8") as f:
            return json.load(f)
    except Exception as e:
        err("%s: cannot load JSON (%s)" % (os.path.relpath(path, ROOT), e))
        return None

def tokens(s):
    return TOK.findall(s.replace("’", "'").lower())

NUM = {"zero": 0, "one": 1, "two": 2, "three": 3, "four": 4, "five": 5, "six": 6, "seven": 7, "eight": 8,
       "nine": 9, "ten": 10, "eleven": 11, "twelve": 12, "twenty": 20, "hundred": 100, "one hundred": 100}
COUNTER_RE = {"Count": re.compile(r"\bCount: ([A-Za-z0-9 ]+?)(?=[.,]|$)"),
              "Missed calls": re.compile(r"\bMissed calls: ([A-Za-z0-9 ]+?)(?=[.,]|$)")}


def num(v):
    v = v.strip().lower()
    return int(v) if v.isdigit() else NUM.get(v)


POS, BASE = {}, {}
MET_TOKENS = {}  # eid -> exact word forms used in episodes <= eid (canon formulas such as 'Missed calls')
COUNTERS = {}  # eid -> {"Count": n, "Missed calls": n} as they stand at the end of that episode


def build_dictionary():
    words = load(os.path.join(DATA, "words.json")) or []
    lookup, level, ids = {}, {}, set()
    for i, w in enumerate(words):
        wid = w.get("id")
        for k in ("id", "w", "ru", "pos", "lvl", "forms", "ex", "exRu"):
            if k not in w: err("words[%d] (%s): missing '%s'" % (i, wid, k))
        if wid in ids: err("duplicate word id '%s'" % wid)
        ids.add(wid)
        level[wid] = w.get("lvl")
        POS[wid], BASE[wid] = w.get("pos"), w.get("w", "").lower()
        for f in [w.get("w", "")] + list(w.get("forms", [])):
            lookup.setdefault(f.replace("’", "'").lower(), wid)
    return lookup, level

def build_met(lookup):
    """met[eid] = set of word ids seen in the English text of episodes up to and including eid;
    later[eid] = word ids that are a newWord of a LATER episode and not met yet (must not be spoiled)."""
    story = load(os.path.join(DATA, "story.json")) or {}
    order, seen, met, neww = [], set(), {}, {}
    cur, seen_tok = {k: None for k in COUNTER_RE}, set()
    for ep in story.get("episodes", []):
        d = load(os.path.join(DATA, ep.get("file", "")))
        if d is None: continue
        eid = d.get("id")
        for p in d.get("panels", []):
            for ln in p.get("lines", []):
                for tk in tokens(ln.get("en", "")):
                    if tk in lookup: seen.add(lookup[tk])
                    seen_tok.add(tk)
                if ln.get("who") == "system":
                    for k, rx in COUNTER_RE.items():
                        for m in rx.finditer(ln.get("en", "")):
                            if num(m.group(1)) is not None: cur[k] = num(m.group(1))
        order.append(eid)
        COUNTERS[eid] = dict(cur)
        MET_TOKENS[eid] = set(seen_tok)
        met[eid] = set(seen)
        neww[eid] = set(d.get("newWords", []))
    later = {}
    for i, eid in enumerate(order):
        fut = set()
        for e2 in order[i + 1:]: fut |= neww[e2]
        later[eid] = fut - met[eid]
    chars = {c.get("id") for c in story.get("characters", [])}
    return order, met, later, chars

class Ctx:
    def __init__(self, eid, lookup, level, met, later):
        self.eid, self.lookup, self.level = eid, lookup, level
        self.s1 = eid.startswith("s1")
        self.counters = COUNTERS.get(eid, {})
        self.met, self.later = met, later
        self.basic_used = Counter()

    def text(self, s, where, system=False, who=None):
        """dictionary + level check of one English string"""
        if not isinstance(s, str):
            err("%s: English text must be a string" % where); return
        if "’" in s or '"' in s:
            warn("%s: non-straight quote chars in %r" % (where, s))
        for tk in tokens(s):
            wid = self.lookup.get(tk)
            if wid is None:
                err("%s: word '%s' not in dictionary (%r)" % (where, tk, s)); continue
            if self.s1:
                if tk in S1_FORBIDDEN:
                    err("%s: '%s' - no past/future on Floor 1 (%r)" % (where, tk, s))
                elif tk != BASE.get(wid) and (tk.endswith("ing") or tk.endswith("ed"))                         and tk not in MET_TOKENS.get(self.eid, ()):
                    err("%s: '%s' - no -ing / -ed forms on Floor 1 (%r)" % (where, tk, s))
                if tk.endswith("'s") and wid != "be" and self.eid < "s1e12":
                    err("%s: possessive '%s' - 's is the grammar of s1e12 (%r)" % (where, tk, s))
                if wid == "sister" and who == "mira" and self.eid < "s1e12":
                    err("%s: Mira can't say or hear SISTER before s1e12 (%r)" % (where, s))
            if POS.get(wid) == "name" and wid not in self.met:
                err("%s: name '%s' is not introduced in episodes <= %s (%r)" % (where, tk, self.eid, s))
                continue
            if wid in self.met or wid in BASICS:
                continue
            if wid in self.later:
                err("%s: '%s' is a new word of a later episode (%r)" % (where, tk, s))
            elif self.level.get(wid) != "A1":
                err("%s: '%s' (%s) is above level and not met in episodes <= %s (%r)"
                    % (where, tk, self.level.get(wid), self.eid, s))
            else:
                self.basic_used[wid] += 1
                note("%s: basic A1 word '%s' not met in the story yet" % (where, tk))
        if system:
            for k, rx in COUNTER_RE.items():
                for m in rx.finditer(s):
                    v, want = num(m.group(1)), self.counters.get(k)
                    if v is None: err("%s: can't read the %s value in %r" % (where, k, s))
                    elif want is not None and v != want:
                        err("%s: %s is %s at the end of %s, not %s (%r)" % (where, k, want, self.eid, v, s))
            if "?" in s: err("%s: the System never asks questions (%r)" % (where, s))
            if "!" in s: err("%s: the System never uses exclamation marks (%r)" % (where, s))
            if re.search(r"(?<![A-Za-z'])I(?![A-Za-z])", s):
                err("%s: the System never says 'I' (%r)" % (where, s))

def check_line(c, ln, where, chars, need_en=True):
    """a story / success / fail line: {who, en, ru}; narration may be Russian-only"""
    if not isinstance(ln, dict):
        err("%s: must be an object {who,en,ru}" % where); return
    who = ln.get("who")
    if who not in chars and who != "narration":
        err("%s: unknown who %r" % (where, who))
    if not ln.get("ru"): err("%s: missing ru" % where)
    if ln.get("en"):
        c.text(ln["en"], where, system=(who == "system"), who=who)
    elif need_en and who != "narration":
        err("%s: missing en (only narration may be Russian-only)" % where)
    for k in ln:
        if k not in ("who", "en", "ru"): err("%s: unexpected key '%s'" % (where, k))

def check_window(c, w, where):
    if not isinstance(w, dict):
        err("%s: window missing" % where); return
    if w.get("kind") not in WINDOW_KINDS: err("%s: bad window kind %r" % (where, w.get("kind")))
    if w.get("title") not in WINDOW_TITLES: err("%s: bad window title %r" % (where, w.get("title")))
    lines = w.get("lines")
    if not isinstance(lines, list) or not 1 <= len(lines) <= 5:
        err("%s: window needs 1-5 lines" % where); return
    for i, ln in enumerate(lines, 1):
        if not (isinstance(ln, dict) and ln.get("en") and ln.get("ru")):
            err("%s line %d: needs en and ru" % (where, i)); continue
        c.text(ln["en"], "%s line %d" % (where, i), system=True)
        if len(tokens(ln["en"])) > 12: warn("%s line %d: window line is long" % (where, i))

def check_options(c, st, where, key="options"):
    opts, a = st.get(key), st.get("answer")
    if not isinstance(opts, list) or not 2 <= len(opts) <= 4:
        err("%s: needs 2-4 %s" % (where, key)); return None
    if len(set(opts)) != len(opts): err("%s: duplicate options" % where)
    for o in opts:
        if not (isinstance(o, str) and o.strip()): err("%s: empty option" % where)
        else: c.text(o, where + " option")
    if not isinstance(a, int) or isinstance(a, bool) or not 0 <= a < len(opts):
        err("%s: answer index out of range" % where); return None
    return a

def check_typed(c, st, where):
    a = st.get("answer")
    if not (isinstance(a, str) and a.strip()):
        err("%s: typed answer must be a non-empty string" % where); return
    c.text(a, where + " answer")
    acc = st.get("accept", [])
    if not isinstance(acc, list) or any(not isinstance(x, str) or not x.strip() for x in acc):
        err("%s: accept must be a list of strings" % where)

def check_clip(c, cl, where):
    if not isinstance(cl, dict):
        err("%s: bad clip" % where); return
    if cl.get("voice") not in VOICES: err("%s: bad voice %r" % (where, cl.get("voice")))
    d = cl.get("delivery")
    if not (isinstance(d, str) and 3 <= len(d.split()) <= 40):
        err("%s: delivery must be a 3-40 word English acting direction" % where)
    if not cl.get("audio_text"): err("%s: missing audio_text" % where)
    else: c.text(cl["audio_text"], where + " audio_text")

def check_step(c, st, where, chars, positions):
    t = st.get("type")
    if t not in STEP_TYPES:
        err("%s: bad type %r" % (where, t)); return
    check_line(c, st.get("story"), where + " story", chars)
    p = st.get("prompt")
    # the player shows the task only when prompt.en exists (js/views/trial.js promptHTML)
    if not (isinstance(p, dict) and p.get("ru") and p.get("en")): err("%s: prompt needs en and ru" % where)
    else:
        c.text(p["en"], where + " prompt")
        for k in p:
            if k not in ("en", "ru"): err("%s: unexpected prompt key '%s'" % (where, k))
    for k in ("success", "fail"):
        if k in st: check_line(c, st[k], "%s %s" % (where, k), chars)
    allowed = {"type", "story", "prompt", "success", "fail"}
    if t == "choose":
        allowed |= {"options", "answer"}
        check_options(c, st, where)
    elif t == "build":
        allowed |= {"answer", "distractors", "accept"}
        a = st.get("answer")
        if not isinstance(a, str) or len(a.split()) < 3:
            err("%s: build answer must be a sentence of 3+ tiles" % where)
        else:
            c.text(a, where + " answer")
            used = set(tokens(a))
            for d in st.get("distractors", []):
                if not isinstance(d, str) or not d.strip(): err("%s: bad distractor" % where); continue
                c.text(d, where + " distractor")
                if set(tokens(d)) & used:
                    err("%s: distractor '%s' is also a tile of the answer" % (where, d))
            if len(a.split()) > 12: warn("%s: build answer has %d tiles" % (where, len(a.split())))
            tiles = sorted(x.lower() for x in a.split())
            acc = st.get("accept", [])
            for alt in (acc if isinstance(acc, list) else [None]):
                if not isinstance(alt, str) or sorted(x.lower() for x in alt.split()) != tiles:
                    err("%s: build accept %r must use exactly the answer tiles" % (where, alt))
    elif t == "type":
        allowed |= {"answer", "accept"}
        check_typed(c, st, where)
    elif t == "listen":
        allowed |= {"audio_text", "voice", "delivery", "options", "answer", "accept"}
        check_clip(c, st, where)
        if "options" in st:
            check_options(c, st, where)
        else:
            check_typed(c, st, where)
    elif t == "match":
        allowed |= {"pairs"}
        pairs = st.get("pairs")
        if not isinstance(pairs, list) or not 4 <= len(pairs) <= 6:
            err("%s: match needs 4-6 pairs" % where)
        else:
            for pr in pairs:
                if not (isinstance(pr, list) and len(pr) == 2 and all(isinstance(x, str) and x.strip() for x in pr)):
                    err("%s: bad pair %r" % (where, pr)); continue
                c.text(pr[0], where + " pair")
                if tokens(pr[1]): err("%s: right side of a pair must be Russian (%r)" % (where, pr[1]))
            if len({pr[0] for pr in pairs if isinstance(pr, list) and pr}) != len(pairs) or \
               len({pr[1] for pr in pairs if isinstance(pr, list) and len(pr) > 1}) != len(pairs):
                err("%s: duplicate pair members" % where)
    elif t == "fill":
        allowed |= {"sentence", "options", "answer", "accept"}
        s = st.get("sentence")
        if not isinstance(s, str) or s.count("___") != 1:
            err("%s: fill sentence needs exactly one ___" % where)
        else:
            c.text(s.replace("___", " "), where + " sentence")
        if "options" in st:
            check_options(c, st, where)
        else:
            check_typed(c, st, where)
    elif t == "pick_voice":
        allowed |= {"clips", "answer", "options"}
        clips = st.get("clips")
        # options = neutral Russian labels printed on the pick buttons (they must not give the answer away)
        labels = st.get("options")
        if labels is not None:
            if not isinstance(labels, list) or not isinstance(clips, list) or len(labels) != len(clips):
                err("%s: pick_voice options must be one label per clip" % where)
            elif len(set(labels)) != len(labels) or any(not isinstance(x, str) or not x.strip() for x in labels):
                err("%s: pick_voice labels must be distinct non-empty strings" % where)
        if not isinstance(clips, list) or not 2 <= len(clips) <= 3:
            err("%s: pick_voice needs 2-3 clips" % where)
        else:
            for i, cl in enumerate(clips, 1): check_clip(c, cl, "%s clip %d" % (where, i))
            if len({" ".join(tokens(cl.get("audio_text", ""))) for cl in clips if isinstance(cl, dict)}) != 1:
                err("%s: all clips must speak the same line" % where)
            a = st.get("answer")
            if not isinstance(a, int) or isinstance(a, bool) or not 0 <= a < len(clips):
                err("%s: answer index out of range" % where)
            else: positions[a] += 1
    for k in st:
        if k not in allowed: err("%s: unexpected key '%s' for type %s" % (where, k, t))

def check_block(c, b, where, chars, kind):
    if not isinstance(b, dict):
        err("%s: missing" % where); return
    check_window(c, b.get("window"), where + " window")
    if kind == "intro" and (b.get("window") or {}).get("kind") == "reward":
        err("%s: intro window cannot be a reward" % where)
    if kind == "outro" and (b.get("window") or {}).get("kind") != "reward":
        err("%s: outro window must be kind 'reward'" % where)
    story = b.get("story")
    if not isinstance(story, list) or not 1 <= len(story) <= 4:
        err("%s: story needs 1-4 lines" % where); return
    for i, ln in enumerate(story, 1):
        check_line(c, ln, "%s story %d" % (where, i), chars)

def main():
    verbose = "-v" in sys.argv
    lookup, level = build_dictionary()
    order, met, later, chars = build_met(lookup)
    stats = []
    files = sorted(f for f in glob.glob(os.path.join(TRIALS, "*.json")) if os.path.basename(f) != "index.json")
    have = {os.path.splitext(os.path.basename(f))[0] for f in files}
    for eid in order:
        if eid not in have: err("data/trials/%s.json is missing" % eid)
    # js/trials.js only fetches episodes listed in data/trials/index.json
    idx = load(os.path.join(TRIALS, "index.json"))
    listed = idx.get("episodes") if isinstance(idx, dict) else None
    if not isinstance(listed, list):
        err("data/trials/index.json must be {\"episodes\": [...]}")
    else:
        for e in sorted(have - set(listed)): err("data/trials/index.json does not list %s" % e)
        for e in sorted(set(listed) - have): err("data/trials/index.json lists %s, but there is no file" % e)
    for path in files:
        name = os.path.splitext(os.path.basename(path))[0]
        d = load(path)
        if d is None: continue
        if name not in met:
            err("%s: no such episode in story.json" % name); continue
        if d.get("episode") != name: err("%s: 'episode' must be %r" % (name, name))
        i = order.index(name)
        nxt = order[i + 1] if i + 1 < len(order) else "s%de01" % (int(name[1:name.index("e")]) + 1)
        if d.get("unlocks") != nxt: err("%s: 'unlocks' must be %r" % (name, nxt))
        c = Ctx(name, lookup, level, met[name], later[name])
        for k in ("title", "titleRu"):
            if not d.get(k): err("%s: missing %s" % (name, k))
        if d.get("title"): c.text(d["title"], name + " title")
        trials = d.get("trials")
        if not isinstance(trials, list) or not 2 <= len(trials) <= 4:
            err("%s: needs 2-4 trials" % name); continue
        total, types, positions = 0, Counter(), Counter()
        for ti, t in enumerate(trials, 1):
            where = "%s t%d" % (name, ti)
            if t.get("id") != "%s-t%d" % (name, ti): err("%s: id must be '%s-t%d'" % (where, name, ti))
            for k in ("title", "titleRu"):
                if not t.get(k): err("%s: missing %s" % (where, k))
            if t.get("title"): c.text(t["title"], where + " title")
            if t.get("pass") != 0.8: err("%s: pass must be 0.8" % where)
            if t.get("lives") != 3: err("%s: lives must be 3" % where)
            check_block(c, t.get("intro"), where + " intro", chars, "intro")
            check_block(c, t.get("outro"), where + " outro", chars, "outro")
            steps = t.get("steps")
            if not isinstance(steps, list) or not 3 <= len(steps) <= 8:
                err("%s: needs 3-8 steps" % where); continue
            if len({s.get("type") for s in steps}) < 3: warn("%s: fewer than 3 exercise types" % where)
            for si, s in enumerate(steps, 1):
                check_step(c, s, "%s step %d" % (where, si), chars, positions)
                types[s.get("type")] += 1
            total += len(steps)
        if not 12 <= total <= 20: err("%s: %d steps in total (need 12-20)" % (name, total))
        # choose / listen / fill options are shuffled by the player; pick_voice clips are not
        if sum(positions.values()) >= 3 and max(positions.values()) == sum(positions.values()):
            warn("%s: correct answers sit too often at the same position %s" % (name, dict(positions)))
        stats.append((name, len(trials), total, types, len(c.basic_used)))
    print("=== WORDBOUND trials report ===")
    for name, nt, total, types, nb in stats:
        print("%s: %d trials, %d steps | %s | basics not met yet: %d"
              % (name, nt, total, ", ".join("%s %d" % kv for kv in sorted(types.items())), nb))
    if verbose:
        for n in notes: print("NOTE  " + n)
    for w in warns: print("WARN  " + w)
    for e in errors: print("ERROR " + e)
    print("%d error(s), %d warning(s), %d note(s)" % (len(errors), len(warns), len(notes)))
    return 1 if errors else 0

if __name__ == "__main__":
    sys.exit(main())
