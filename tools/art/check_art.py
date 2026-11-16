#!/usr/bin/env python
"""Automated artifact check for panel art via Gemini vision (free tier).
Usage: python tools/art/check_art.py [--episode s1e07] [--panels 15,16] [--model M] [--force]
Key: .models/gemini_key.txt (never printed). Cache: story/art_qa.json keyed by image hash + prompt version."""
import argparse, threading, base64, hashlib, io, json, re, sys, time, urllib.request, urllib.error
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parents[2]
KEY = (ROOT / ".models/gemini_key.txt").read_text().strip()
OUT_JSON = ROOT / "story/art_qa.json"
OUT_MD = ROOT / "story/art_qa.md"
API = "https://generativelanguage.googleapis.com/v1beta/models/"
DEFAULT_MODELS = ["gemini-3.5-flash-lite", "gemini-3.1-flash-lite", "gemini-3-flash-preview", "gemini-3.5-flash"]
PROMPT_VER = "v5"

RULES = """Character rules (violations are errors):
- Dan: round black glasses, NEVER a bandage on the face, yellow pencil, grey shirt.
- Mira: olive jacket, cream scarf, red cord on her LEFT wrist.
- Silent: smooth white face with NO eyes, nose or lips, one thin vertical teal seam.
- Keeper: eyes never visible under the hood.
- Pip: boy in a grey flat cap.
- NO text, letters, words or numbers anywhere in the image. NO speech bubbles."""

PROMPT = """You are a strict quality inspector of AI-generated webtoon panels. AI art often has anatomy glitches.
Expected panel (Russian description): {ru}
Art brief (English): {art}
Cast: {cast}
{rules}

Inspection procedure (do it silently, output only the JSON):
1. List every person/creature visible, including small background ones.
2. For EACH person count: heads, arms, hands (every visible hand, including a hand holding an object or partly hidden), legs, and fingers per hand. A normal person has exactly 2 arms, 2 hands, 2 legs, 1 head, 5 fingers per hand. A hand that appears with no matching arm, or a third hand/arm, is a MAJOR anatomy error. Each arm must start at a shoulder: count the sleeves/forearms attached to each person's torso; a person has only 2 shoulders, so a third sleeve or arm (for example one hanging down in front of the torso, or one reaching out while two others are visible) is an extra limb. Trace each hand back to its arm and shoulder. IMPORTANT: scan the WHOLE frame, including the image edges and the bottom, for stray hands, forearms or sleeves; people grabbing, pulling or holding each other are a common place for a duplicated limb, so for every hand gripping a body part or object decide whose arm it belongs to, and check that each person's arms add up to 2. If a person has more than 2 arms or hands, report it even if it could be read as another person's limb.
3. Look for fused/duplicated body parts, impossible poses, melted objects, wrong glasses, readable text.
4. Compare with the expected description.

Before the per-person tally, scan the frame LEFT to RIGHT and list EVERY human hand/forearm visible anywhere in the image (all_hands, with location), even ones at the image edge or bottom; then assign each to a person. all_hands must not exceed 2 per person; if it does, one person has an extra limb.

Return ONLY JSON with this schema:
{{"all_hands": ["location + owner"], "people": [{{"who": "...", "heads": 1, "hands_found": ["each separate hand/forearm you can see, with image location (e.g. 'bare hand at lower center gripping a wrist')"], "arms_traced": ["for each arm: shoulder -> elbow -> hand, or 'orphan: no shoulder'"], "arms": 2, "hands": 2, "legs_visible": 2}}],
"anatomy": ["issue"], "text": ["any readable letters/words/numbers/speech bubbles"], "character": ["rule violations"],
"match": "yes|partial|no", "severity": "ok|minor|major", "fix_hint": "one English sentence on how to redraw it"}}
severity: major = clear anatomy error (extra/missing limbs, extra hands, two heads, fused bodies), readable text or speech bubble, or panel does not match; minor = small finger/rule/detail problem; ok = none. Use empty lists when nothing is found. Do not invent problems."""


def load_json(p, default):
    try:
        return json.loads(Path(p).read_text(encoding="utf8"))
    except Exception:
        return default


def img_b64(path):
    im = Image.open(path).convert("RGB")
    im.thumbnail((1280, 1280))
    b = io.BytesIO()
    im.save(b, "JPEG", quality=88)
    return base64.b64encode(b.getvalue()).decode()


class Blocked(Exception):
    pass


def call(model, b64, prompt):
    body = {"contents": [{"parts": [{"inlineData": {"mimeType": "image/jpeg", "data": b64}}, {"text": prompt}]}],
            "generationConfig": {"responseMimeType": "application/json", "temperature": 1.0}}
    req = urllib.request.Request(API + model + ":generateContent", json.dumps(body).encode(),
                                 {"x-goog-api-key": KEY, "Content-Type": "application/json"})
    with urllib.request.urlopen(req, timeout=90) as r:
        d = json.load(r)
    if d.get("promptFeedback", {}).get("blockReason"):
        raise Blocked(d["promptFeedback"]["blockReason"])
    parts = d["candidates"][0]["content"]["parts"]
    txt = "".join(p.get("text", "") for p in parts if not p.get("thought"))
    txt = re.sub(r"^```(?:json)?|```$", "", txt.strip()).strip()
    out = json.loads(txt)
    if isinstance(out, list):
        out = next((x for x in out if isinstance(x, dict)), {})
    if not isinstance(out, dict) or "severity" not in out:
        raise KeyError("bad schema")
    return out


def check(models, state, b64, prompt):
    """Try models in order for this panel. Transient failures (disconnect/timeout) fall through to the next
    model for this panel only; daily-quota / 404 marks the model dead for the rest of the run."""
    dead = state.setdefault("dead", set())
    for m in models:
        if m in dead:
            continue
        fails = 0
        while fails < 3:
            try:
                return m, call(m, b64, prompt)
            except urllib.error.HTTPError as e:
                body = e.read().decode("utf8", "replace")
                if e.code == 429:
                    low = body.lower().replace(" ", "").replace("_", "")
                    mm = re.search(r"retry in ([\d.]+)s", body) or re.search(r'"retryDelay":\s*"(\d+)', body)
                    wait = float(mm.group(1)) + 2 if mm else 30
                    if "perday" in low:
                        print(f"  429 {m}: DAILY limit; {body[:300]!r}", file=sys.stderr)
                        dead.add(m)
                        break
                    print(f"  429 {m}: per-minute limit, sleeping {wait:.0f}s", file=sys.stderr)
                    time.sleep(wait)
                    continue
                print(f"  HTTP {e.code} {m}: {body[:200]}", file=sys.stderr)
                if e.code in (400, 403, 404):
                    dead.add(m)
                    break
                fails += 1
                time.sleep(5)
            except Blocked:
                raise
            except (json.JSONDecodeError, KeyError, OSError) as e:
                print(f"  transient {m}: {type(e).__name__}", file=sys.stderr)
                fails += 1
                time.sleep(2)
    raise SystemExit("all models failed/exhausted")


def write_md(res):
    rows = []
    for ep in sorted(res):
        for n in sorted(res[ep]):
            r = res[ep][n]
            if r.get("severity") in ("major", "minor"):
                rows.append((0 if r["severity"] == "major" else 1, ep, n, r))
    rows.sort(key=lambda x: (x[0], x[1], x[2]))
    total = sum(len(v) for v in res.values())
    L = ["# Проверка артефактов арта", "",
         f"Проверено панелей: {total}; major: {sum(1 for x in rows if x[0] == 0)}, minor: {sum(1 for x in rows if x[0] == 1)}", ""]
    for sev, title in ((0, "Major"), (1, "Minor")):
        L += [f"## {title}", ""]
        for s, ep, n, r in rows:
            if s != sev:
                continue
            L.append(f"### {ep} / {n}")
            for k, lab in (("anatomy", "Анатомия"), ("text", "Текст/пузыри"), ("character", "Персонажи")):
                for i in r.get(k) or []:
                    L.append(f"- {lab}: {i}")
            if r.get("match") != "yes":
                L.append(f"- Соответствие описанию: {r.get('match')}")
            L.append(f"- Как исправить: {r.get('fix_hint', '')}")
            L.append("")
    OUT_MD.write_text("\n".join(L), encoding="utf8")


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--episode")
    ap.add_argument("--panels")
    ap.add_argument("--model")
    ap.add_argument("--force", action="store_true")
    ap.add_argument("--votes", type=int, default=2, help="independent passes per panel; worst severity wins")
    ap.add_argument("--only", help="re-check only panels whose cached severity is in this list, e.g. major,minor (implies --force)")
    ap.add_argument("--workers", type=int, default=4)
    a = ap.parse_args()
    models = [a.model] if a.model else DEFAULT_MODELS
    state = {"i": 0}
    checks = load_json(ROOT / "story/checks.json", {})
    res = load_json(OUT_JSON, {})
    eps = [a.episode] if a.episode else sorted(p.name for p in (ROOT / "art").iterdir()
                                               if p.is_dir() and re.fullmatch(r"s\d+e\d+", p.name))
    want = {int(x) for x in a.panels.split(",")} if a.panels else None
    t0 = time.time()
    lock = threading.Lock()
    calls = [0]
    rank = {"ok": 0, "minor": 1, "major": 2}

    def _n(v):
        try:
            return int(v)
        except (TypeError, ValueError):
            return 0

    def work(ep, f, h, ru, pn):
        prompt = PROMPT.format(ru=ru, art=pn.get("art", ""), cast=json.dumps(pn.get("cast", [])), rules=RULES)
        b64 = img_b64(f)
        try:
            m, r = check(models, state, b64, prompt)
        except Blocked:
            # safety filter tripped on the story text: retry with image-only context
            prompt = PROMPT.format(ru="(omitted)", art="(omitted)", cast=json.dumps(pn.get("cast", [])), rules=RULES)
            m, r = check(models, state, b64, prompt)
            r["note"] = "prompt text omitted (blocked by safety filter)"
        n_calls = 1
        for _ in range(a.votes - 1):
            m2, r2 = check(models, state, b64, prompt)
            n_calls += 1
            if rank.get(r2.get("severity"), 0) > rank.get(r.get("severity"), 0):
                m, r = m2, r2
        ppl = [x for x in r.get("people") or [] if isinstance(x, dict)]
        over = [x.get("who") for x in ppl if _n(x.get("hands")) > 2 or _n(x.get("arms")) > 2]
        if over:
            if r.get("severity") != "major":
                r["severity"] = "major"
                r.setdefault("anatomy", []).append("Auto: hand/arm count exceeds 2 per person (" + ", ".join(map(str, over)) + ")")
        r["hash"] = h
        r["model"] = m
        with lock:
            calls[0] += n_calls
            res.setdefault(ep, {})[f.stem] = r
            print(f"{ep}/{f.stem}: {r.get('severity')} {(r.get('anatomy') or [''])[0][:90]}", flush=True)
            OUT_JSON.write_text(json.dumps(res, ensure_ascii=False, indent=1), encoding="utf8")

    jobs = []
    for ep in eps:
        epd = load_json(ROOT / f"data/episodes/{ep}.json", {"panels": []})
        cl = checks.get(ep, [])
        for f in sorted((ROOT / "art" / ep).glob("[0-9][0-9].jpg")):
            n = int(f.stem)
            if want and n not in want:
                continue
            h = hashlib.sha256(f.read_bytes()).hexdigest()[:16] + PROMPT_VER
            old = res.get(ep, {}).get(f.stem)
            if a.only:
                if not old or old.get("severity") not in a.only.split(","):
                    continue
            elif old and old.get("hash") == h and not a.force:
                continue
            ru = cl[n - 1] if n - 1 < len(cl) else ""
            pn = epd["panels"][n - 1] if n - 1 < len(epd["panels"]) else {}
            jobs.append((ep, f, h, ru, pn))
    with ThreadPoolExecutor(max_workers=a.workers) as ex:
        futs = [ex.submit(work, *j) for j in jobs]
        for fu in futs:
            fu.result()
    write_md(res)
    print(f"done: {calls[0]} calls in {time.time() - t0:.0f}s")


if __name__ == "__main__":
    main()
