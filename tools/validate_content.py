#!/usr/bin/env python3
"""Validate WORDBOUND learning content in ../data. Stdlib only."""
import json, re, sys, os
from collections import Counter

DATA = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "data")
BGS = {"office-night", "room", "street", "night-city", "tower-exterior", "gate", "corridor", "dungeon",
       "hall", "forest", "sky", "black", "white", "flash"}
MOODS = {"calm", "tense", "action"}
POSS = {"left", "center", "right"}
LTYPES = {"speech", "thought", "shout", "narration", "narration-ru", "system"}
SIL = {"male-young", "female-young", "male-large", "hooded", "child", "monster", "system"}
LVLS = {"A1", "A2", "B1", "B2", "C1"}
WPOS = {"n", "v", "adj", "adv", "pron", "prep", "conj", "det", "num", "interj", "name", "phrase"}
TOK = re.compile(r"[a-z]+(?:'[a-z]+)*")

errors, warns = [], []
def err(m): errors.append(m)
def warn(m): warns.append(m)

def load(path):
    try:
        with open(path, encoding="utf-8") as f:
            return json.load(f)
    except Exception as e:
        err("%s: cannot load JSON (%s)" % (os.path.relpath(path, DATA), e))
        return None

def tokens(s):
    return TOK.findall(s.replace("’", "'").lower())

def main():
    story = load(os.path.join(DATA, "story.json"))
    words = load(os.path.join(DATA, "words.json"))
    plc = load(os.path.join(DATA, "placement.json"))
    if story is None or words is None:
        return report({})
    # ---- words
    ids, lookup, owner = set(), {}, {}
    for i, w in enumerate(words):
        wid = w.get("id")
        for k in ("id", "w", "ru", "pos", "lvl", "forms", "ex", "exRu"):
            if k not in w:
                err("words[%d] (%s): missing '%s'" % (i, wid, k))
        if wid in ids: err("duplicate word id '%s'" % wid)
        ids.add(wid)
        if not re.fullmatch(r"[a-z0-9_]+", wid or ""): err("bad word id '%s'" % wid)
        if w.get("pos") not in WPOS: err("word '%s': bad pos %r" % (wid, w.get("pos")))
        if w.get("lvl") not in LVLS: err("word '%s': bad lvl %r" % (wid, w.get("lvl")))
        if not isinstance(w.get("forms", []), list): err("word '%s': forms not list" % wid)
        for f in [w.get("w", "")] + list(w.get("forms", [])):
            f = f.replace("’", "'").lower()
            if f in lookup and lookup[f] != wid:
                warn("form collision '%s': %s vs %s" % (f, lookup[f], wid))
            else:
                lookup[f] = wid
    # ---- characters
    chars = {c["id"] for c in story.get("characters", [])}
    for c in story.get("characters", []):
        if c.get("silhouette") not in SIL: err("character %s: bad silhouette" % c.get("id"))
        if not c.get("desc"): err("character %s: no desc" % c.get("id"))
    if "system" not in chars: err("character 'system' missing")
    # ---- episodes
    stats = {}
    lemmas = set()
    prev_words = set()
    for ep in story.get("episodes", []):
        path = os.path.join(DATA, ep.get("file", ""))
        if not os.path.isfile(path):
            err("episode file missing: %s" % ep.get("file")); continue
        d = load(path)
        if d is None: continue
        eid = d.get("id")
        if eid != ep.get("id"): err("%s: id mismatch with story.json" % eid)
        if d.get("level") not in LVLS: err("%s: bad level" % eid)
        panels = d.get("panels", [])
        if not 14 <= len(panels) <= 18: err("%s: %d panels (need 14-18)" % (eid, len(panels)))
        nen = nru = 0
        cnt = Counter()
        for pi, p in enumerate(panels, 1):
            where = "%s panel %d" % (eid, pi)
            if p.get("bg") not in BGS: err("%s: bad bg %r" % (where, p.get("bg")))
            if p.get("mood") not in MOODS: err("%s: bad mood %r" % (where, p.get("mood")))
            if "art" in p and not (isinstance(p["art"], str) and p["art"].strip()):
                err("%s: 'art' must be a non-empty string" % where)
            sfx = p.get("sfx")
            if sfx is not None and not (isinstance(sfx, str) and re.fullmatch(r"[A-Z!?. ]+", sfx)):
                err("%s: bad sfx %r" % (where, sfx))
            cast = p.get("cast", [])
            if len(cast) > 3: err("%s: >3 cast" % where)
            for c in cast:
                if c.get("id") not in chars: err("%s: unknown cast id %r" % (where, c.get("id")))
                if c.get("pos") not in POSS: err("%s: bad cast pos" % where)
            lines = p.get("lines", [])
            if not 1 <= len(lines) <= 4: err("%s: %d lines (need 1-4)" % (where, len(lines)))
            for li, ln in enumerate(lines, 1):
                t = ln.get("type")
                if t not in LTYPES: err("%s line %d: bad type %r" % (where, li, t)); continue
                if not ln.get("ru"): err("%s line %d: missing ru" % (where, li))
                if t == "narration-ru":
                    nru += 1
                    if "en" in ln: err("%s line %d: narration-ru has en" % (where, li))
                    continue
                nen += 1
                if "who" in ln and ln["who"] not in chars: err("%s line %d: unknown who %r" % (where, li, ln["who"]))
                if t in ("speech", "thought", "shout", "system") and "who" not in ln:
                    err("%s line %d: missing who" % (where, li))
                if not ln.get("en"): err("%s line %d: missing en" % (where, li)); continue
                if "’" in ln["en"] or '"' in ln["en"]: warn("%s line %d: non-straight quote chars" % (where, li))
                for tk in tokens(ln["en"]):
                    cnt[tk] += 1
                    if tk not in lookup: err("%s line %d: word '%s' not in dictionary" % (where, li, tk))
        if not 25 <= nen <= 40: err("%s: %d English lines (need 25-40)" % (eid, nen))
        if panels:
            last = panels[-1]
        # new words
        nw = d.get("newWords", [])
        if not 8 <= len(nw) <= 10: err("%s: %d newWords (need 8-10)" % (eid, len(nw)))
        for wid in nw:
            if wid not in ids:
                err("%s: newWord '%s' not in words.json" % (eid, wid)); continue
            e = next(w for w in words if w["id"] == wid)
            n = sum(cnt[f.replace("’", "'").lower()] for f in [e["w"]] + e.get("forms", []))
            if n < 3: err("%s: newWord '%s' appears only %d times (need >=3)" % (eid, wid, n))
        # grammar + quiz
        g = d.get("grammarNote") or {}
        if not (g.get("title") and g.get("body")) or len(g.get("examples", [])) != 3:
            err("%s: grammarNote needs title, body, 3 examples" % eid)
        for ex in g.get("examples", []):
            for tk in tokens(ex.get("en", "")):
                if tk not in lookup: warn("%s: grammar example word '%s' not in dictionary" % (eid, tk))
        qz = d.get("quiz", [])
        if len(qz) != 4: err("%s: %d quiz questions (need 4)" % (eid, len(qz)))
        for qi, q in enumerate(qz, 1):
            if len(q.get("options", [])) != 4: err("%s quiz %d: need 4 options" % (eid, qi))
            if not isinstance(q.get("answer"), int) or not 0 <= q["answer"] < len(q.get("options", [])):
                err("%s quiz %d: answer out of range" % (eid, qi))
        used = set(lookup[t] for t in cnt if t in lookup)
        lemmas |= used
        stats[eid] = (len(panels), nen, nru, len(nw), len(used))
    # ---- placement
    if plc is not None:
        if plc.get("levels") != ["A1", "A2", "B1", "B2", "C1"]: err("placement: levels wrong")
        for sec, need in (("vocab", 12), ("reading", 4), ("listening", 4)):
            items = plc.get(sec, [])
            for lv in plc.get("levels", []):
                n = sum(1 for x in items if x.get("level") == lv)
                if n != need: err("placement %s %s: %d items (need %d)" % (sec, lv, n, need))
            ans = Counter()
            for i, x in enumerate(items):
                where = "placement %s[%d]" % (sec, i)
                if x.get("level") not in LVLS: err("%s: bad level" % where)
                if len(x.get("options", [])) != 4: err("%s: need 4 options" % where)
                a = x.get("answer")
                if not isinstance(a, int) or not 0 <= a < len(x.get("options", [])): err("%s: answer out of range" % where)
                else: ans[a] += 1
                key = {"vocab": "word", "reading": "text", "listening": "audio"}[sec]
                if not x.get(key): err("%s: missing %s" % (where, key))
                if sec != "vocab" and not x.get("q"): err("%s: missing q" % where)
            if items and len(ans) < 3: warn("placement %s: answer positions poorly varied %s" % (sec, dict(ans)))
    return report(stats, len(words), len(lemmas), plc)

def report(stats, nwords=0, nlemmas=0, plc=None):
    print("=== WORDBOUND content report ===")
    for k, (p, e, r, nw, lm) in stats.items():
        print("%s: %d panels, %d EN lines, %d RU-narration lines, %d new words, %d distinct lemmas" % (k, p, e, r, nw, lm))
    print("dictionary entries: %d | distinct lemmas used in episodes: %d" % (nwords, nlemmas))
    if plc:
        print("placement: vocab %d, reading %d, listening %d" % (len(plc.get("vocab", [])), len(plc.get("reading", [])), len(plc.get("listening", []))))
    for w in warns: print("WARN  " + w)
    for e in errors: print("ERROR " + e)
    print("%d error(s), %d warning(s)" % (len(errors), len(warns)))
    return 1 if errors else 0

# ---- optional art manifest check (additive): every file listed in art/manifest.json must exist
def check_art_manifest():
    root = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "art")
    path = os.path.join(root, "manifest.json")
    if not os.path.isfile(path):
        return
    m = load(path)
    if not isinstance(m, dict):
        return
    for eid, ent in m.items():
        for key, ext in (("images", "jpg"), ("videos", "mp4")):
            for n in (ent or {}).get(key, []):
                if not os.path.isfile(os.path.join(root, eid, "%02d.%s" % (n, ext))):
                    err("art/manifest.json: art/%s/%02d.%s listed but missing" % (eid, n, ext))

_report_without_art = report
def report(*a, **k):
    check_art_manifest()
    return _report_without_art(*a, **k)

# ---- optional line field "voice": character id whose TTS voice reads the line (additive check)
def check_line_voice():
    story = load(os.path.join(DATA, "story.json"))
    if not isinstance(story, dict):
        return
    chars = {c.get("id") for c in story.get("characters", [])}
    for ep in story.get("episodes", []):
        path = os.path.join(DATA, ep.get("file", ""))
        if not os.path.isfile(path):
            continue
        d = load(path)
        for pi, p in enumerate((d or {}).get("panels", []), 1):
            for li, ln in enumerate(p.get("lines", []), 1):
                if "voice" in ln and (not isinstance(ln["voice"], str) or ln["voice"] not in chars):
                    err("%s panel %d line %d: bad voice %r (must be a character id)" % (ep.get("id"), pi, li, ln["voice"]))

_report_without_voice = report
def report(*a, **k):
    check_line_voice()
    return _report_without_voice(*a, **k)

if __name__ == "__main__":
    sys.exit(main())
