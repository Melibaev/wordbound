#!/usr/bin/env python3
"""WORDBOUND audio generator: Kokoro (kokoro-onnx) -> MP3 (lameenc) into ../../audio.

Usage:
  python tools/audio/gen_audio.py                 # everything, incremental
  python tools/audio/gen_audio.py --episode s1e06 # one episode
  python tools/audio/gen_audio.py --words         # dictionary words + examples
  python tools/audio/gen_audio.py --placement     # placement test items
  python tools/audio/gen_audio.py --force         # regenerate even if unchanged
  python tools/audio/gen_audio.py --verify        # only check files / durations
Models live in .models/ (kokoro-v1.0.onnx, voices-v1.0.bin) -- see README.md.
"""
import argparse, hashlib, json, os, re, statistics, sys, time

ROOT = os.path.abspath(os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", ".."))
DATA = os.path.join(ROOT, "data")
OUT = os.path.join(ROOT, "audio")
MODELS = os.path.join(ROOT, ".models")

# ---- voice table: edit here ------------------------------------------------
# character id -> (kokoro voice, speed)
VOICES = {
    "dan": ("am_michael", 1.0),
    "pip": ("am_puck", 1.08),         # boy ~11, fast talker
    "mira": ("af_sarah", 1.0),
    "keeper": ("bm_george", 1.0),
    "system": ("am_onyx", 0.95),
    "silent": ("af_nicole", 0.9),
}
NARRATION = ("bf_emma", 1.0)      # English narration lines
DEFAULT = ("am_adam", 1.0)        # unknown characters
WORD = ("af_heart", 0.85)         # dictionary words
EXAMPLE = ("af_heart", 0.95)      # dictionary example sentences
PLACEMENT = ("af_heart", 0.9)     # placement listening items
SHOUT_SPEED = 1.05                # multiplier-free override for type == shout
BITRATE = 48                      # kbps (use 40 if the total gets too big)
ACRONYMS = {"OK", "AM", "PM", "TV", "ID", "DJ", "UK", "USA", "US", "CD", "PC", "SOS", "VIP"}
PAD_LEAD, PAD_TAIL = 0.04, 0.12   # seconds of silence kept/added
SR = 24000
# ---------------------------------------------------------------------------


def clean(text):
    """Speak CAPS 'word mentions' naturally; keep acronyms."""
    def fix(m):
        w = m.group(0)
        return w if w in ACRONYMS else w.capitalize()
    t = re.sub(r"\b[A-Z]{2,}\b", fix, text.replace("’", "'"))
    return re.sub(r"\s+", " ", t).strip()


def voice_for_line(line):
    t = line.get("type", "speech")
    who = line.get("voice") or line.get("who")
    if t == "system" and not line.get("voice"):
        who = "system"
    if t == "narration" and not who:
        v, s = NARRATION
    else:
        v, s = VOICES.get(who, DEFAULT)
    if t == "shout":
        s = SHOUT_SPEED
    return v, s


def slug(w):
    return re.sub(r"[^a-z0-9]+", "_", w.lower()).strip("_")


def load(p):
    with open(p, encoding="utf-8") as f:
        return json.load(f)


def collect(args):
    """-> list of (relpath, text, voice, speed, group)"""
    jobs = []
    story = load(os.path.join(DATA, "story.json"))
    allsel = not (args.episode or args.words or args.placement)
    eps = []
    if allsel or args.episode:
        for ep in story["episodes"]:
            if args.episode and ep["id"] != args.episode:
                continue
            path = os.path.join(DATA, ep["file"])
            if not os.path.isfile(path):
                continue
            eps.append(ep["id"])
            d = load(path)
            for pi, p in enumerate(d["panels"], 1):
                for li, ln in enumerate(p["lines"], 1):
                    if ln.get("type") == "narration-ru" or not ln.get("en"):
                        continue
                    v, s = voice_for_line(ln)
                    jobs.append(("%s/%02d-%02d.mp3" % (ep["id"], pi, li), clean(ln["en"]), v, s, "ep:" + ep["id"]))
    words = load(os.path.join(DATA, "words.json"))
    if allsel or args.words:
        for w in words:
            jobs.append(("w/%s.mp3" % w["id"], clean(w["w"]), WORD[0], WORD[1], "words"))
            if w.get("ex"):
                jobs.append(("w/%s-ex.mp3" % w["id"], clean(w["ex"]), EXAMPLE[0], EXAMPLE[1], "words"))
        # inflected forms (tapped in the reader): audio/w/f-<slug>.mp3, unless the form is itself a headword
        heads = {w["w"].lower() for w in words}
        seen = set()
        for w in words:
            for f in w.get("forms", []):
                fl = f.replace("’", "'").lower()
                if fl in heads or slug(fl) in seen:
                    continue
                seen.add(slug(fl))
                jobs.append(("w/f-%s.mp3" % slug(fl), clean(fl), WORD[0], WORD[1], "words"))
    if allsel or args.placement:
        plc = load(os.path.join(DATA, "placement.json"))
        heads = {w["w"].lower() for w in words}
        for i, it in enumerate(plc.get("listening", [])):
            jobs.append(("p/%d.mp3" % i, clean(it["audio"]), PLACEMENT[0], PLACEMENT[1], "placement"))
        seen = set()
        for it in plc.get("vocab", []):
            w = it["word"]
            if w.lower() in heads or slug(w) in seen:
                continue
            seen.add(slug(w))
            jobs.append(("p/v-%s.mp3" % slug(w), clean(w), WORD[0], WORD[1], "placement"))
    return jobs, eps


def trim(a):
    import numpy as np
    thr = 0.012
    idx = np.where(np.abs(a) > thr)[0]
    if len(idx) == 0:
        return a
    s = max(0, idx[0] - int(0.03 * SR))
    e = min(len(a), idx[-1] + int(0.05 * SR))
    a = a[s:e]
    return np.concatenate([np.zeros(int(PAD_LEAD * SR), np.float32), a, np.zeros(int(PAD_TAIL * SR), np.float32)])


def encode(a, kbps):
    import numpy as np, lameenc
    enc = lameenc.Encoder()
    enc.set_bit_rate(kbps)
    enc.set_in_sample_rate(SR)
    enc.set_channels(1)
    enc.set_quality(2)
    pcm = (np.clip(a, -1, 1) * 32767).astype(np.int16).tobytes()
    return bytes(enc.encode(pcm) + enc.flush())


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--episode")
    ap.add_argument("--words", action="store_true")
    ap.add_argument("--placement", action="store_true")
    ap.add_argument("--force", action="store_true")
    ap.add_argument("--verify", action="store_true")
    ap.add_argument("--bitrate", type=int, default=BITRATE)
    args = ap.parse_args()

    os.makedirs(OUT, exist_ok=True)
    hpath = os.path.join(OUT, ".hashes.json")
    hashes = load(hpath) if os.path.isfile(hpath) else {}
    jobs, eps = collect(args)

    todo = []
    for rel, text, v, s, grp in jobs:
        h = hashlib.sha1(("%s|%s|%s|%s" % (text, v, s, args.bitrate)).encode()).hexdigest()[:16]
        ok = os.path.isfile(os.path.join(OUT, rel)) and hashes.get(rel) == h
        if args.force or not ok:
            todo.append((rel, text, v, s, h))
    print("jobs: %d, to generate: %d" % (len(jobs), len(todo)))

    stats = {"gen": 0, "skip": len(jobs) - len(todo)}
    ratios = {}
    if todo and not args.verify:
        from kokoro_onnx import Kokoro
        k = Kokoro(os.path.join(MODELS, "kokoro-v1.0.onnx"), os.path.join(MODELS, "voices-v1.0.bin"))
        avail = set(k.get_voices())
        t0 = time.time()
        for n, (rel, text, v, s, h) in enumerate(todo, 1):
            if v not in avail:
                sys.exit("voice %s not in voices-v1.0.bin" % v)
            lang = "en-gb" if v[0] == "b" else "en-us"
            audio, sr = k.create(text, voice=v, speed=s, lang=lang)
            assert sr == SR
            a = trim(audio.astype("float32"))
            dur = len(a) / SR
            ratios[rel] = (len(text) / dur, dur, text)
            data = encode(a, args.bitrate)
            p = os.path.join(OUT, rel)
            os.makedirs(os.path.dirname(p), exist_ok=True)
            with open(p, "wb") as f:
                f.write(data)
            hashes[rel] = h
            stats["gen"] += 1
            if n % 25 == 0:
                print("  %d/%d  (%.0fs)" % (n, len(todo), time.time() - t0), flush=True)
                json.dump(hashes, open(hpath, "w"), indent=0, sort_keys=True)
        print("generation time: %.0fs" % (time.time() - t0))

    # ---- index.json
    ipath = os.path.join(OUT, "index.json")
    idx = load(ipath) if os.path.isfile(ipath) else {"version": 0, "episodes": {}, "words": False, "placement": False}
    if stats["gen"]:
        idx["version"] = int(idx.get("version", 0)) + 1
    allsel = not (args.episode or args.words or args.placement)
    for e in eps:
        idx["episodes"][e] = True
    if allsel or args.words:
        idx["words"] = True
    if allsel or args.placement:
        idx["placement"] = True
    json.dump(idx, open(ipath, "w"), indent=1, sort_keys=True)
    json.dump(hashes, open(hpath, "w"), indent=0, sort_keys=True)

    # ---- verification (existence, size, duration vs text length)
    missing, small, outl = [], [], []
    rat = {}
    total = 0
    for rel, text, v, s, grp in jobs:
        p = os.path.join(OUT, rel)
        if not os.path.isfile(p):
            missing.append(rel)
            continue
        sz = os.path.getsize(p)
        total += sz
        dur = sz * 8 / (args.bitrate * 1000)
        if sz < 1024:
            small.append(rel)
        if len(text) >= 12:
            rat[rel] = (len(text) / dur, text)
    if rat:
        med = statistics.median(r for r, _ in rat.values())
        for rel, (r, text) in rat.items():
            if r > 3 * med or r < 0.3 * med:
                outl.append((rel, round(r, 1), text[:50]))
        print("median chars/sec: %.1f" % med)
    print("files generated %d, skipped %d, missing %d, <1KB %d, ratio outliers %d" % (stats["gen"], stats["skip"], len(missing), len(small), len(outl)))
    for m in missing[:20]: print("MISSING", m)
    for m in small[:20]: print("SMALL", m)
    for o in outl[:30]: print("OUTLIER", o)
    print("total size of selected files: %.1f MB" % (total / 1e6))


if __name__ == "__main__":
    main()
