#!/usr/bin/env python3
"""WORDBOUND expressive dialogue audio: Gemini TTS -> MP3 (lameenc) into ../../audio.

Replaces the Kokoro voice-over of every English episode line (speech, thought, shout,
narration, system) with acted delivery. Same output paths as gen_audio.py
(audio/<ep>/<panel>-<line>.mp3), so the app needs no change.

Usage:
  python tools/audio/gen_gemini.py --dry-run          # count + time estimate
  python tools/audio/gen_gemini.py --limit 3          # first 3 pending lines
  python tools/audio/gen_gemini.py --episode s1e02    # one episode
  python tools/audio/gen_gemini.py                    # everything pending, resumable
  python tools/audio/gen_gemini.py --patient          # sleep through long daily-quota waits
State: audio/.gemini.json {relpath: hash(text|voice|style|model)}.
Key: .models/gemini_key.txt (never printed). Free tier: ~3 req/min (+ a daily cap).
"""
import argparse, base64, hashlib, io, json, os, re, sys, time, urllib.error, urllib.request, wave

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)
import gen_audio as GA  # clean(), trim(), encode(), load(), ROOT/DATA/OUT

ROOT, DATA, OUT = GA.ROOT, GA.DATA, GA.OUT
STATE = os.path.join(OUT, ".gemini.json")
KEYFILE = os.path.join(ROOT, ".models", "gemini_key.txt")
URL = "https://generativelanguage.googleapis.com/v1beta/interactions"
MODEL = "gemini-3.8-flash-tts"
BITRATE = 64
GAP = 21.0  # seconds between requests (<= 3 per minute)

# ---- voice table: edit here (character id -> Gemini voice id) -----------------
# Prebuilt names are Title case; Extended Voice Library ids are lowercase (en-us-...).
GEMINI_VOICES = {
    "dan": "Zubenelgenubi",
    "mira": "Kore",
    "system": "Charon",
    "silent": "Enceladus",
    "keeper": "en-us-storyteller-12",
    "pip": "en-us-zeno",
    "trader": "Algenib",
    "lina_human": "Leda",
}
NARRATION_VOICE = "Sulafat"
DEFAULT_VOICE = "Charon"
# fallback delivery when a line has no "delivery"
DEFAULT_STYLE = {
    "dan": "tired, kind and quiet, honest and understated",
    "mira": "deadpan, low and clipped, guarded",
    "system": "flat cold game-system announcement, precise and emotionless",
    "silent": "hollow breathy whisper, smooth and slightly wrong",
    "keeper": "calm velvety unsettling voice, soft and slow, polite and quietly dangerous",
    "pip": "cheeky fast talkative boy, bright and quick",
    "trader": "gruff genial merchant, loud and greedy",
    "lina_human": "young curious girl, soft and bright",
    "_narration": "warm calm storyteller, quiet and clear",
}
TYPE_STYLE = {"shout": "loud, urgent and emphatic, "}
# ---------------------------------------------------------------------------


def voice_of(line):
    who = line.get("voice") or line.get("who")
    if line.get("type") == "system" and not line.get("voice"):
        who = "system"
    if line.get("type") == "narration" and not who:
        return NARRATION_VOICE, "_narration"
    return GEMINI_VOICES.get(who, DEFAULT_VOICE), who


def job_hash(text, voice, style):
    return hashlib.sha1(("%s|%s|%s|%s" % (text, voice, style, MODEL)).encode()).hexdigest()[:16]


def collect(episode=None):
    """-> list of (rel, speak_text, voice, style, hash) in episode order."""
    jobs = []
    story = GA.load(os.path.join(DATA, "story.json"))
    for ep in story["episodes"]:
        if episode and ep["id"] != episode:
            continue
        path = os.path.join(DATA, ep["file"])
        if not os.path.isfile(path):
            continue
        d = GA.load(path)
        for pi, p in enumerate(d["panels"], 1):
            for li, ln in enumerate(p["lines"], 1):
                if ln.get("type") == "narration-ru" or not ln.get("en"):
                    continue
                voice, who = voice_of(ln)
                text = GA.clean(ln.get("tts_text") or ln["en"])
                style = ln.get("delivery") or (TYPE_STYLE.get(ln.get("type"), "") + DEFAULT_STYLE.get(who, "natural, expressive"))
                rel = "%s/%02d-%02d.mp3" % (ep["id"], pi, li)
                jobs.append((rel, text, voice, style, job_hash(text, voice, style)))
    return jobs


def current_set():
    """relpaths whose Gemini audio is up to date (used by gen_audio.py to skip them)."""
    if not os.path.isfile(STATE):
        return set()
    st = GA.load(STATE)
    return {rel for rel, text, v, s, h in collect() if st.get(rel) == h and os.path.isfile(os.path.join(OUT, rel))}


def api_key():
    with open(KEYFILE, encoding="utf-8") as f:
        return f.read().strip()


class Quota(Exception):
    def __init__(self, wait, msg):
        super().__init__(msg)
        self.wait = wait


def retry_seconds(msg):
    m = re.search(r"retry in (?:(\d+)h)?(?:(\d+)m)?(?:([\d.]+)s)?", msg)
    if not m or not any(m.groups()):
        return None
    h, mi, s = m.groups()
    return int(h or 0) * 3600 + int(mi or 0) * 60 + float(s or 0)


def request_audio(key, text, style, voice):
    body = {"model": MODEL,
            "input": [{"type": "user_input", "content": [{"type": "text", "text": text,
                       "annotations": [{"type": "speech_metadata", "style": style}]}]}],
            "response_format": {"type": "audio"},
            "generation_config": {"speech_config": [{"voice": voice}]}}
    req = urllib.request.Request(URL, json.dumps(body).encode(),
                                 {"x-goog-api-key": key, "content-type": "application/json"})
    try:
        with urllib.request.urlopen(req, timeout=180) as r:
            j = json.load(r)
    except urllib.error.HTTPError as e:
        msg = e.read().decode("utf-8", "replace")
        if e.code == 429:
            raise Quota(retry_seconds(msg), msg[:300])
        raise RuntimeError("HTTP %d: %s" % (e.code, msg[:300]))
    return base64.b64decode(j["steps"][0]["content"][0]["data"])


def wav_to_mp3(raw):
    import numpy as np
    w = wave.open(io.BytesIO(raw))
    assert w.getnchannels() == 1 and w.getsampwidth() == 2 and w.getframerate() == GA.SR, "unexpected WAV format"
    a = np.frombuffer(w.readframes(w.getnframes()), np.int16).astype("float32") / 32768.0
    a = GA.trim(a)
    return GA.encode(a, BITRATE), len(a) / GA.SR


def bump_index():
    ipath = os.path.join(OUT, "index.json")
    idx = GA.load(ipath) if os.path.isfile(ipath) else {"version": 0, "episodes": {}, "words": False, "placement": False}
    idx["version"] = int(idx.get("version", 0)) + 1
    json.dump(idx, open(ipath, "w"), indent=1, sort_keys=True)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--episode")
    ap.add_argument("--limit", type=int)
    ap.add_argument("--dry-run", action="store_true")
    ap.add_argument("--force", action="store_true")
    ap.add_argument("--patient", action="store_true", help="wait out long (daily) quota resets instead of stopping")
    args = ap.parse_args()

    st = GA.load(STATE) if os.path.isfile(STATE) else {}
    jobs = collect(args.episode)
    todo = [j for j in jobs if args.force or st.get(j[0]) != j[4] or not os.path.isfile(os.path.join(OUT, j[0]))]
    if args.limit:
        todo = todo[:args.limit]
    est = len(todo) * (GAP + 6) / 3600.0
    print("lines: %d, pending: %d, estimated time at 3/min: %.1f h" % (len(jobs), len(todo), est), flush=True)
    if args.dry_run or not todo:
        return
    key = api_key()
    done = 0
    t0 = time.time()
    try:
        for n, (rel, text, voice, style, h) in enumerate(todo, 1):
            attempt = 0
            waited = 0
            while True:
                try:
                    raw = request_audio(key, text, style, voice)
                    break
                except Quota as q:
                    # The server's "retry in Nh" hint proved unreliable (a retry 30 s later succeeded),
                    # so back off 30-90 s and give up only after ~10 minutes of continuous 429s.
                    attempt += 1
                    wait = min(30 * attempt, 90)
                    waited += wait
                    if waited > 600 and not args.patient:
                        print("QUOTA: 429 persisted >10 min (%s). Stopping; rerun later." % q, flush=True)
                        return
                    print("429, waiting %ds (%s)" % (wait, rel), flush=True)
                    time.sleep(wait)
                except Exception as e:
                    attempt += 1
                    print("error %s: %s" % (rel, str(e)[:200]), flush=True)
                    if attempt >= 3:
                        raise
                    time.sleep(10)
            mp3, dur = wav_to_mp3(raw)
            p = os.path.join(OUT, rel)
            os.makedirs(os.path.dirname(p), exist_ok=True)
            with open(p, "wb") as f:
                f.write(mp3)
            st[rel] = h
            json.dump(st, open(STATE, "w"), indent=0, sort_keys=True)
            done += 1
            print("[%d/%d] %s %s %.1fs  %s" % (n, len(todo), rel, voice, dur, text[:50]), flush=True)
            if n < len(todo):
                time.sleep(GAP)
    finally:
        if done:
            bump_index()
            print("generated %d files in %.0fs; audio/index.json version bumped" % (done, time.time() - t0), flush=True)


if __name__ == "__main__":
    main()
