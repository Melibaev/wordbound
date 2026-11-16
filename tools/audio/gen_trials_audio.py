#!/usr/bin/env python3
"""WORDBOUND trial voice-over: every story line, window line, audio_text and pick_voice clip in data/trials/*.json
-> Chatterbox (same engine, refs, QA loop and per-character FX as gen_chatterbox.py) -> audio/trials/<episode>/<hash>.mp3

File name = FNV-1a 64 over UTF-8 of "voice|delivery|text" (16 hex chars); js/audio.js trialHash() is the identical function,
so the app finds a line's audio without any manifest. Missing files fall back to speechSynthesis in the app.

  .models/cbenv/Scripts/python tools/audio/gen_trials_audio.py --dry-run
  .models/cbenv/Scripts/python tools/audio/gen_trials_audio.py --episode s1e01
  .models/cbenv/Scripts/python tools/audio/gen_trials_audio.py --file dev-fixtures/trials-s1e01.json --limit 2
  options: --limit N --force --seed N
State: audio/.chatterbox_trials.json {relpath: job hash}; audio/index.json gets trials[<episode>] = true.
"""
import argparse, glob, hashlib, json, os, sys, time

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)
import gen_audio as GA
import gen_chatterbox as CB

ROOT, DATA, OUT = GA.ROOT, GA.DATA, GA.OUT
STATE = os.path.join(OUT, ".chatterbox_trials.json")
ALIAS = {"lina": "lina_human", "narrator": "narration", "": "narration"}


def trial_hash(voice, delivery, text):
    """FNV-1a 64 of utf-8 'voice|delivery|text' -> 16 hex chars. Mirror of trialHash() in js/audio.js."""
    h = 0xCBF29CE484222325
    for b in ("%s|%s|%s" % (voice or "", delivery or "", text or "")).encode("utf-8"):
        h ^= b
        h = (h * 0x100000001B3) & 0xFFFFFFFFFFFFFFFF
    return "%016x" % h


def utterances(doc):
    """yield (voice, delivery, text) for everything the player can speak."""
    def story(l):
        if isinstance(l, dict) and l.get("en"):
            yield (l.get("who") or "", l.get("delivery") or "", l["en"])

    def window(w):
        for l in (w or {}).get("lines", []) or []:
            if l.get("en"):
                yield ("system", "", l["en"])

    for t in doc.get("trials", []):
        intro, outro = t.get("intro") or {}, t.get("outro") or {}
        yield from window(intro.get("window"))
        for l in intro.get("story", []) or []:
            yield from story(l)
        for s in t.get("steps", []):
            yield from story(s.get("story"))
            yield from story(s.get("success"))
            yield from story(s.get("fail"))
            if s.get("audio_text") and s.get("voice") is not None and s.get("type") in ("listen",):
                yield (s.get("voice") or "", s.get("delivery") or "", s["audio_text"])
            for c in s.get("clips", []) or []:
                yield (c.get("voice") or "", c.get("delivery") or s.get("delivery") or "", c.get("audio_text") or s.get("audio_text") or "")
        yield from window(outro.get("window"))
        for l in outro.get("story", []) or []:
            yield from story(l)


def collect(files):
    jobs, seen = [], set()
    for path in files:
        doc = GA.load(path)
        ep = doc.get("episode") or os.path.splitext(os.path.basename(path))[0].replace("trials-", "")
        for voice, delivery, text in utterances(doc):
            if not text:
                continue
            h = trial_hash(voice, delivery, text)
            rel = "trials/%s/%s.mp3" % (ep, h)
            if rel in seen:
                continue
            seen.add(rel)
            who = ALIAS.get(voice, voice)
            line = {"type": "system" if who == "system" else ("narration" if who == "narration" else "speech"),
                    "who": who, "en": text, "delivery": delivery}
            ch = CB.char_of(line)
            b = CB.bucket_of(line, ch)
            sp = CB.speak_text(line)
            jobs.append({"rel": rel, "ep": ep, "text": sp, "char": ch, "bucket": b, "delivery": delivery,
                         "hash": CB.job_hash(sp, ch, b, delivery)})
    return jobs


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--episode")
    ap.add_argument("--file", action="append", help="trial json path (default: data/trials/*.json)")
    ap.add_argument("--limit", type=int)
    ap.add_argument("--force", action="store_true")
    ap.add_argument("--dry-run", action="store_true")
    ap.add_argument("--seed", type=int, default=2000)
    a = ap.parse_args()

    files = a.file or sorted(glob.glob(os.path.join(DATA, "trials", "*.json")))
    if a.episode and not a.file:
        files = [f for f in files if os.path.basename(f) == a.episode + ".json"]
    jobs = collect(files)
    st = GA.load(STATE) if os.path.isfile(STATE) else {}
    todo = [j for j in jobs if a.force or st.get(j["rel"]) != j["hash"] or not os.path.isfile(os.path.join(OUT, j["rel"]))]
    if a.limit:
        todo = todo[: a.limit]
    if a.dry_run:
        import collections
        c = collections.Counter((j["char"], j["bucket"]) for j in todo)
        for k, v in sorted(c.items()):
            print("%-12s %-8s %d" % (k[0], k[1], v))
        print("files:", len(files), "| utterances:", len(jobs), "| to generate:", len(todo), "(~%.0f min incl. QA)" % (len(todo) * 9 / 60))
        for j in todo[:5]:
            print("  ", j["rel"], j["char"], j["bucket"], repr(j["text"]))
        return

    import audio_qa as qa
    S = CB.Synth()
    os.makedirs(OUT, exist_ok=True)
    CB.log("trials: %d utterances, %d to generate" % (len(jobs), len(todo)))
    done, t0, worst, eps = 0, time.time(), [], set()
    for n, j in enumerate(todo, 1):
        seed = a.seed + int(hashlib.md5(j["rel"].encode()).hexdigest()[:6], 16) % 100000
        y, r, tries = CB.render_line(S, j, seed, qa)
        CB.save_mp3(y, os.path.join(OUT, j["rel"]))
        st[j["rel"]] = j["hash"]
        eps.add(j["ep"])
        done += 1
        if r.get("wer", 0) > 0.15:
            worst.append((j["rel"], round(r["wer"], 2), j["text"]))
        if n % 10 == 0:
            json.dump(st, open(STATE, "w"), indent=0, sort_keys=True)
            CB.log("%d/%d (%.0fs)" % (n, len(todo), time.time() - t0))
    json.dump(st, open(STATE, "w"), indent=0, sort_keys=True)
    # flag every episode that has at least one trial file on disk, bump the cache-busting version
    ip = os.path.join(OUT, "index.json")
    idx = GA.load(ip) if os.path.isfile(ip) else {"version": 0, "episodes": {}, "words": False, "placement": False}
    have = {j["ep"] for j in jobs if os.path.isfile(os.path.join(OUT, j["rel"]))}
    idx.setdefault("trials", {})
    for ep in have:
        idx["trials"][ep] = True
    if done:
        idx["version"] = int(idx.get("version", 0)) + 1
    json.dump(idx, open(ip, "w"), indent=1, sort_keys=True)
    CB.log("trials done: %d lines in %.0fs; weak (WER>0.15): %d" % (done, time.time() - t0, len(worst)))
    for w in worst:
        CB.log("  WEAK %s" % (w,))


if __name__ == "__main__":
    main()
