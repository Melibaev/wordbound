#!/usr/bin/env python3
"""Generate panel art / character sheets with the official Gemini API (paid via Google Cloud credit).

    set GEMINI_API_KEY first (never pass it as an argument), e.g.  setx GEMINI_API_KEY "..."  and reopen the terminal.

    python tools/art/generate.py --episode s1e01 --dry-run
    python tools/art/generate.py --characters --max 6
    python tools/art/generate.py --episode s1e01 --panels 1,3,5-8 --max 4
    python tools/art/generate.py --episode s1e01 --panels 2 --force --model gemini-3-pro-image

Request format (verified 2026-11-15):
  REST reference: https://ai.google.dev/api/generate-content  (-> aistudio.google.com/api-reference/generate-content)
    POST https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent
    header x-goog-api-key; body {"contents":[{"role":"user","parts":[{"inlineData":{"mimeType","data"(base64)}},{"text":...}]}],
    "generationConfig":{"responseModalities":["IMAGE"],"imageConfig":{"aspectRatio":"3:4","imageSize":"1K"}}}
    result: candidates[].content.parts[].inlineData.data (base64)
  Image guide (aspect ratios incl. 3:4, model ids, <=14 reference images): https://ai.google.dev/gemini-api/docs/image-generation
  Pricing: https://ai.google.dev/gemini-api/docs/pricing
NOTE: Google now recommends the newer Interactions API for new projects; generateContent is documented as
"legacy but supported". Video generation is intentionally NOT implemented (too expensive for the credit).
"""
import argparse
import base64
import json
import os
import sys
import time
import urllib.error
import urllib.request

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import common as C  # noqa: E402

ENDPOINT = "https://generativelanguage.googleapis.com/v1beta/models/%s:generateContent"
MAX_REFS = 14


def build_body(prompt, ref_paths, ref_names):
    parts = []
    for p in ref_paths:
        with open(p, "rb") as f:
            parts.append({"inlineData": {"mimeType": "image/jpeg", "data": base64.b64encode(f.read()).decode("ascii")}})
    text = prompt
    if ref_paths:
        text = ("The attached reference images show the characters %s (in this order). Keep each character's face, hair, "
                "outfit and colours identical to their reference. " % ", ".join(ref_names)) + prompt
    parts.append({"text": text})
    return {"contents": [{"role": "user", "parts": parts}],
            "generationConfig": {"responseModalities": ["IMAGE"], "imageConfig": {"aspectRatio": "3:4", "imageSize": "1K"}}}


def api_error_text(code, raw):
    try:
        msg = json.loads(raw).get("error", {}).get("message", "")
    except Exception:
        msg = raw[:300].decode("utf-8", "replace") if isinstance(raw, bytes) else str(raw)[:300]
    hint = ""
    low = (msg or "").lower()
    if code == 400:
        hint = ("Bad request. If it mentions billing / 'free tier' / quota 0: billing is not enabled for the project of this key "
                "(image models have no free tier). Otherwise check --model id and that the model supports imageConfig.")
    elif code == 403:
        hint = ("Permission denied: key invalid/restricted, Generative Language API not enabled, or billing not enabled / "
                "credit not linked to the Cloud project behind this key. See tools/art/README.md, section API.")
    elif code == 404:
        hint = "Model not found: check --model against the current list at https://ai.google.dev/gemini-api/docs/image-generation"
    elif code == 429:
        hint = "Rate limit / quota exhausted."
    return "HTTP %d: %s %s" % (code, msg, ("\n  Hint: " + hint) if hint else "")


def call_api(model, body, key, retries=5):
    data = json.dumps(body).encode("utf-8")
    delay = 4
    for attempt in range(retries + 1):
        req = urllib.request.Request(ENDPOINT % model, data=data, method="POST",
                                     headers={"Content-Type": "application/json", "x-goog-api-key": key})
        try:
            with urllib.request.urlopen(req, timeout=180) as r:
                return json.loads(r.read().decode("utf-8"))
        except urllib.error.HTTPError as e:
            raw = e.read()
            if e.code in (429, 500, 502, 503, 504) and attempt < retries:
                print("  HTTP %d, retry in %ds (%d/%d)" % (e.code, delay, attempt + 1, retries))
                time.sleep(delay)
                delay = min(delay * 2, 60)
                continue
            raise RuntimeError(api_error_text(e.code, raw))
        except (urllib.error.URLError, TimeoutError, ConnectionError) as e:
            if attempt < retries:
                print("  network error (%s), retry in %ds" % (type(e).__name__, delay))
                time.sleep(delay)
                delay = min(delay * 2, 60)
                continue
            raise RuntimeError("network error: %s" % type(e).__name__)


def extract_image(resp):
    for cand in resp.get("candidates", []) or []:
        for part in (cand.get("content") or {}).get("parts", []) or []:
            inl = part.get("inlineData") or part.get("inline_data")
            if inl and inl.get("data"):
                return base64.b64decode(inl["data"])
    reason = [c.get("finishReason") for c in resp.get("candidates", []) or []]
    block = (resp.get("promptFeedback") or {}).get("blockReason")
    raise RuntimeError("no image in response (finishReason=%s, blockReason=%s)" % (reason, block))


def main():
    ap = argparse.ArgumentParser(description="Generate WORDBOUND art via the Gemini API.")
    ap.add_argument("--episode", help="episode id, e.g. s1e01")
    ap.add_argument("--panels", help="e.g. 1,3,5-8 (default: all)")
    ap.add_argument("--characters", action="store_true", help="generate character reference sheets into art/refs/")
    ap.add_argument("--model", default=C.DEFAULT_MODEL,
                    help="default %s (cheapest, up to 14 references). Pro: gemini-3-pro-image (~4x price, best consistency/detail). "
                         "Others: gemini-3.1-flash-image, gemini-3.1-flash-lite-image" % C.DEFAULT_MODEL)
    ap.add_argument("--dry-run", action="store_true", help="print prompts and estimated cost, send nothing")
    ap.add_argument("--force", action="store_true", help="overwrite existing files")
    ap.add_argument("--max", type=int, default=10, help="hard cap of images per run (default 10)")
    a = ap.parse_args()
    if not a.episode and not a.characters:
        ap.error("give --episode and/or --characters")

    story = C.load_story()
    bible = C.parse_bible()
    chars = {c["id"]: c for c in story.get("characters", []) if c.get("id")}

    jobs = []  # dicts: label, out, prompt, refs(list of paths), ref_names, kind
    if a.characters:
        for c in story.get("characters", []):
            if not C.is_visual(c):
                continue
            out = os.path.join(C.REFS, c["id"] + ".jpg")
            sp = C.build_sheet_prompt(c, bible)
            jobs.append({"label": "character sheet: " + c["id"], "out": out, "prompt": sp["prompt"], "refs": [], "names": [],
                         "kind": "ref", "id": c["id"]})
    if a.episode:
        ep = C.load_episode(a.episode)
        panels = ep.get("panels", [])
        for n in C.parse_panel_list(a.panels, len(panels)):
            b = C.build_panel_prompt(panels[n - 1], chars, bible, a.episode)
            refs, names = [], []
            for cid in b["refs"]:
                rp = os.path.join(C.REFS, cid + ".jpg")
                if os.path.isfile(rp) and len(refs) < MAX_REFS:
                    refs.append(rp)
                    names.append(chars[cid].get("name", cid))
            jobs.append({"label": "%s panel %02d" % (a.episode, n), "out": os.path.join(C.ART, a.episode, "%02d.jpg" % n),
                         "prompt": b["prompt"], "refs": refs, "names": names, "kind": "panel", "n": n})

    todo = []
    for j in jobs:
        if os.path.exists(j["out"]) and not a.force:
            print("skip (exists): " + os.path.relpath(j["out"], C.ROOT))
        else:
            todo.append(j)
    if len(todo) > a.max:
        print("NOTE: %d images requested, --max %d: only the first %d will be generated." % (len(todo), a.max, a.max))
        todo = todo[:a.max]

    price = C.PRICES_USD_1K.get(a.model)
    est = ("%.2f USD" % (price * len(todo))) if price else "unknown (model not in price table)"
    print("model: %s | images to generate: %d | estimated cost: %s (1K, %s per image; prices checked 2026-11-15)" %
          (a.model, len(todo), est, ("$%.4f" % price) if price else "?"))
    if a.dry_run or not todo:
        for j in todo:
            print("\n--- %s -> %s" % (j["label"], os.path.relpath(j["out"], C.ROOT)))
            print("refs: %s" % (", ".join(os.path.relpath(r, C.ROOT) for r in j["refs"]) or "none"))
            print(j["prompt"])
        print("\n[dry-run] nothing sent." if a.dry_run else "\nNothing to do.")
        print("\nPrice table (USD per 1K image):")
        for m, p in C.PRICES_USD_1K.items():
            print("  %-30s %.4f%s" % (m, p, "   <- selected" if m == a.model else ""))
        return

    key = os.environ.get("GEMINI_API_KEY", "").strip()
    if not key:
        C.die("GEMINI_API_KEY is not set (never pass the key as an argument). Windows: setx GEMINI_API_KEY \"...\", then open a NEW terminal.")

    ok = 0
    touched = set()
    for k, j in enumerate(todo, 1):
        print("[%d/%d] %s ..." % (k, len(todo), j["label"]), flush=True)
        try:
            resp = call_api(a.model, build_body(j["prompt"], j["refs"], j["names"]), key)
            raw = extract_image(resp)
            if j["kind"] == "ref":
                size, q, wh = C.save_jpeg_to(raw, j["out"])
            else:
                _, size, q, wh = C.save_panel_jpeg(raw, a.episode, j["n"])
                touched.add(a.episode)
        except Exception as e:  # never include the key; messages come from the API body only
            print("  FAILED: %s" % e)
            if "HTTP 40" in str(e) and ("HTTP 403" in str(e) or "HTTP 400" in str(e)):
                print("  Stopping: this error will repeat for every image.")
                break
            continue
        ok += 1
        print("  saved %s  %dx%d, %d KB, q=%d" % (os.path.relpath(j["out"], C.ROOT), wh[0], wh[1], size // 1024, q))
    for eid in touched:
        C.update_manifest(eid)
        print("art/manifest.json updated for", eid)
    print("done: %d/%d images (approx. cost %.2f USD)" % (ok, len(todo), (price or 0) * ok))


if __name__ == "__main__":
    main()
