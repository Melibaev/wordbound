"""Shared helpers for WORDBOUND art tools: paths, bible parsing, prompt builder,
JPEG pipeline, art/manifest.json maintenance.  Pillow is imported lazily (only
needed to write images), so prompts.py works without it."""
import json
import os
import re
import sys
import time

ROOT = os.path.abspath(os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", ".."))
DATA = os.path.join(ROOT, "data")
STORY_DIR = os.path.join(ROOT, "story")
ART = os.path.join(ROOT, "art")
REFS = os.path.join(ART, "refs")
PROMPTS_DIR = os.path.join(ROOT, "art-prompts")

for _s in (sys.stdout, sys.stderr):
    try:
        _s.reconfigure(encoding="utf-8", errors="replace")
    except Exception:
        pass

# ---------------------------------------------------------------- prompt text
STYLE_PREAMBLE = ("Korean webtoon, full colour, clean confident lineart, cel shading with soft gradients "
                  "in lighting, cinematic lighting, expressive faces")
SUFFIX = ("vertical 4:5 portrait composition, no text, no letters, no speech bubbles, no captions, "
          "no watermark, leave clean empty space in the upper third for speech bubbles")
SHEET_SUFFIX = ("character reference sheet, turnaround of the same character: front view, side view and "
                "three-quarter view, full body, neutral plain light-grey background, even flat lighting, "
                "consistent design in every view, full colour webtoon style, no text, no letters, no labels, "
                "no watermark")

BG_FALLBACK = {
    "office-night": "a dim open-plan engineering office at 2 a.m., rows of desks, blueprints, cold monitor glow, one warm desk lamp",
    "room": "a small cramped apartment room, soft warm lamp light, window with city lights",
    "street": "an empty city street at dusk, wet asphalt, streetlights",
    "night-city": "a neon-lit city at night seen from above, deep blue sky, glowing windows",
    "tower-exterior": "the foot of a colossal dark stone tower rising into the clouds, ominous scale",
    "gate": "a huge ancient gate with glowing runes, mist at its base",
    "corridor": "a long narrow stone corridor, flickering torches, deep perspective",
    "dungeon": "a vast dark dungeon chamber, cracked stone, faint blue-green magical glow",
    "hall": "a grand ruined hall with tall pillars and shafts of light",
    "forest": "a dense unnatural forest, twisted trees, glowing spores",
    "sky": "open sky with dramatic clouds",
    "black": "pure black void, only the subject lit",
    "white": "blinding white light, overexposed, silhouettes",
    "flash": "a burst of white and vermilion light, motion lines, shockwave",
}
MOOD_FALLBACK = {
    "calm": "quiet, calm atmosphere, soft lighting",
    "tense": "tense atmosphere, low-key lighting, long shadows, dramatic angle",
    "action": "dynamic action, strong motion, dramatic perspective, high-contrast rim lighting",
}
POS_WORD = {"left": "on the left", "center": "in the centre", "right": "on the right"}


def die(msg, code=1):
    print("ERROR: " + msg, file=sys.stderr)
    sys.exit(code)


# --------------------------------------------------------------------- content
def load_json(path, default=None):
    try:
        with open(path, encoding="utf-8") as f:
            return json.load(f)
    except Exception:
        return default


def load_story():
    return load_json(os.path.join(DATA, "story.json"), {"characters": [], "episodes": []}) or {}


def episode_ids(story=None):
    story = story or load_story()
    return [e.get("id") for e in story.get("episodes", []) if e.get("id")]


def load_episode(eid):
    story = load_story()
    for e in story.get("episodes", []):
        if e.get("id") == eid and e.get("file"):
            d = load_json(os.path.join(DATA, e["file"]))
            if d:
                return d
    d = load_json(os.path.join(DATA, "episodes", eid + ".json"))
    if not d:
        die("episode '%s' not found in data/ (known: %s)" % (eid, ", ".join(episode_ids(story)) or "none"))
    return d


def is_visual(c):
    return (c or {}).get("silhouette") != "system" and (c or {}).get("id") != "system"


# ----------------------------------------------------------------------- bible
def _ascii_ratio(s):
    s = s.strip()
    return (sum(1 for ch in s if ord(ch) < 128) / len(s)) if s else 0


def _clean(s):
    s = re.sub(r"^\s*[-*>]+\s*", "", s, flags=re.M)
    s = re.sub(r"[`*_]{1,3}", "", s)
    return re.sub(r"\s+", " ", s).strip()


def _sections(text):
    """Split markdown into [(level, heading, body)]."""
    out, cur = [], None
    for ln in text.splitlines():
        m = re.match(r"^(#{1,6})\s+(.*?)\s*#*\s*$", ln)
        if m:
            if cur:
                out.append(tuple(cur))
            cur = [len(m.group(1)), m.group(2), ""]
        elif cur is not None:
            cur[2] += ln + "\n"
    if cur:
        out.append(tuple(cur))
    return out


def _english_fragment(body):
    """Pick the best English visual description out of a section body."""
    fences = re.findall(r"```[a-z]*\n(.*?)```", body, flags=re.S)
    fences = [_clean(f) for f in fences if _ascii_ratio(f) > 0.85]
    if fences:
        return max(fences, key=len)
    keyed = []
    for ln in body.splitlines():
        m = re.match(r"^\s*[-*]?\s*\**(visual|prompt|appearance|look|english|art|description)[^:]*\**\s*[:\-]\s*(.+)$", ln, re.I)
        if m and _ascii_ratio(m.group(2)) > 0.85:
            keyed.append(_clean(m.group(2)))
    if keyed:
        return " ".join(keyed)
    lines = [_clean(l) for l in body.splitlines() if l.strip()]
    lines = [l for l in lines if _ascii_ratio(l) > 0.9 and len(l) > 12]
    return " ".join(lines)[:900]


def parse_bible():
    """Returns {'characters': {id: english fragment}, 'locations': {bg-id: fragment}, 'found': bool}.
    Tolerant: matches headings by character id/name or by bg id (dashes or spaces)."""
    res = {"characters": {}, "locations": {}, "found": False, "style": None}
    vis = load_json(os.path.join(STORY_DIR, "visual.json"))
    if isinstance(vis, dict) and vis.get("characters"):
        res.update(found=True, style=vis.get("style"),
                   characters=dict(vis.get("characters") or {}), locations=dict(vis.get("locations") or {}))
        return res
    path = os.path.join(STORY_DIR, "bible.md")
    try:
        with open(path, encoding="utf-8") as f:
            text = f.read()
    except Exception:
        return res
    res["found"] = True
    story = load_story()
    chars = story.get("characters", [])
    secs = _sections(text)
    for c in chars:
        keys = {str(c.get("id", "")).lower(), str(c.get("name", "")).lower()} - {""}
        best = None
        for lvl, head, body in secs:
            h = head.lower()
            words = set(re.findall(r"[a-z0-9']+", h))
            if keys & words or any(k in h for k in keys if len(k) > 3):
                frag = _english_fragment(body)
                if frag and (best is None or len(frag) > len(best)):
                    best = frag
        if best:
            res["characters"][c["id"]] = best
    for lvl, head, body in secs:
        h = head.lower().strip()
        for bg in BG_FALLBACK:
            if bg in h or bg.replace("-", " ") in h:
                frag = _english_fragment(body)
                if frag:
                    res["locations"].setdefault(bg, frag)
    return res


def character_fragment(c, bible):
    """(fragment, source) for a story.json character dict."""
    f = bible["characters"].get(c.get("id"))
    if f:
        return f, "bible"
    d = (c.get("desc") or "").strip()
    if d:
        return d, "story.json desc" + ("" if _ascii_ratio(d) > 0.9 else " (not English)")
    return "TODO: describe %s (hair, face, outfit, colours)" % c.get("name", c.get("id")), "TODO"


# --------------------------------------------------------------- prompt builder
def panel_scene(panel, chars_by_id):
    art = (panel.get("art") or "").strip()
    if art:
        return art
    bits = []
    for c in panel.get("cast", []):
        ch = chars_by_id.get(c.get("id"), {})
        if is_visual(ch) or not ch:
            bits.append("%s %s" % (ch.get("name", c.get("id")), POS_WORD.get(c.get("pos"), "")))
    s = "Scene: " + MOOD_FALLBACK.get(panel.get("mood"), MOOD_FALLBACK["calm"]) + "."
    if bits:
        s += " Characters in frame: " + "; ".join(b.strip() for b in bits) + "."
    if panel.get("sfx"):
        s += " Implied sound moment: %s (show it visually, not as text)." % panel["sfx"]
    return s


def build_panel_prompt(panel, chars_by_id, bible, eid=None):
    """Returns dict(prompt, refs[list of char ids], scene)."""
    bg = panel.get("bg")
    locs = bible["locations"]
    loc = (eid and locs.get("%s:%s" % (eid, bg))) or locs.get(bg) or BG_FALLBACK.get(bg, "")
    style = bible.get("style") or STYLE_PREAMBLE
    scene = panel_scene(panel, chars_by_id)
    refs, frags = [], []
    for c in panel.get("cast", []):
        ch = chars_by_id.get(c.get("id"))
        if not ch or not is_visual(ch) or ch["id"] in refs:
            continue
        refs.append(ch["id"])
        frag, _ = character_fragment(ch, bible)
        frags.append("%s: %s" % (ch.get("name", ch["id"]), frag))
    parts = [style.rstrip(".") + ".", ("Location and lighting: " + loc.rstrip(".") + ".") if loc else "", scene.rstrip(".") + "."]
    if frags:
        parts.append("Characters (keep their look consistent): " + " ".join(f.rstrip(".") + "." for f in frags))
    parts.append(SUFFIX + ".")
    return {"prompt": " ".join(p for p in parts if p), "refs": refs, "scene": scene}


def build_sheet_prompt(c, bible):
    frag, src = character_fragment(c, bible)
    style = (bible.get("style") or STYLE_PREAMBLE).rstrip(".")
    return {"prompt": "%s. Character: %s. %s. %s." % (style, c.get("name", c.get("id")), frag.rstrip("."), SHEET_SUFFIX),
            "source": src}


def key_moment(panels, i):
    return i == 0 or i == len(panels) - 1 or panels[i].get("mood") == "action"


def build_video_prompt(panel):
    mood = panel.get("mood")
    move = {"action": "fast subtle push-in with light camera shake, hair and clothes moving, drifting dust and sparks",
            "tense": "slow creeping push-in, flickering light, faint drifting particles"}.get(
        mood, "very slow gentle push-in, soft ambient motion (breathing, drifting dust, light shimmer)")
    return ("Animate this exact image as a short looping-friendly clip, 4-8 seconds. %s. Keep every character and the "
            "composition identical to the image, subtle natural motion only. No dialogue, no speech, no text, no "
            "captions, no subtitles, no watermark." % move)


def parse_panel_list(spec, n):
    if not spec:
        return list(range(1, n + 1))
    out = []
    for part in spec.split(","):
        part = part.strip()
        if not part:
            continue
        m = re.fullmatch(r"(\d+)(?:-(\d+))?", part)
        if not m:
            die("bad --panels value '%s' (use e.g. 1,3,5-8)" % part)
        a, b = int(m.group(1)), int(m.group(2) or m.group(1))
        out.extend(range(a, b + 1))
    bad = [x for x in out if not 1 <= x <= n]
    if bad:
        die("panel numbers out of range 1..%d: %s" % (n, bad))
    return sorted(set(out))


# ------------------------------------------------------------------ price table
# Source: https://ai.google.dev/gemini-api/docs/pricing (redirects to aistudio.google.com/docs/pricing)
# Checked 2026-11-15. USD per generated image, paid tier, 1K output. The page shows no "last updated" date.
# Input (reference images, prompt) tokens are billed extra but are small next to the per-image price.
PRICES_USD_1K = {
    "gemini-nano-banana-2.1": 0.0336,
    "gemini-3.1-flash-lite-image": 0.0336,
    "gemini-2.5-flash-image": 0.039,     # deprecated, shutdown announced 2027-03-15
    "gemini-3.1-flash-image": 0.067,
    "gemini-3-pro-image": 0.134,         # "Pro"; 4K = 0.24
}
DEFAULT_MODEL = "gemini-nano-banana-2.1"


# ------------------------------------------------------------------ JPEG pipeline
def _pil():
    try:
        from PIL import Image, ImageOps
        return Image, ImageOps
    except ImportError:
        die("Pillow is required for this step: python -m pip install --user pillow")


def to_jpeg_bytes(src, width=1080, quality=82, max_kb=250):
    """src: path or bytes. Returns (jpeg_bytes, quality_used, (w,h))."""
    import io
    Image, ImageOps = _pil()
    im = Image.open(src if isinstance(src, str) else io.BytesIO(src))
    im = ImageOps.exif_transpose(im)
    if im.mode in ("RGBA", "LA", "P"):
        bg = Image.new("RGB", im.size, (255, 255, 255))
        im = im.convert("RGBA")
        bg.paste(im, mask=im.split()[-1])
        im = bg
    else:
        im = im.convert("RGB")
    w = width
    while True:
        r = im.resize((w, max(1, round(im.height * w / im.width))), Image.LANCZOS) if im.width != w else im
        q = quality
        while True:
            buf = io.BytesIO()
            r.save(buf, "JPEG", quality=q, optimize=True, progressive=True)  # no exif/metadata is written
            if len(buf.getvalue()) <= max_kb * 1024 or q <= 50:
                break
            q -= 4
        if len(buf.getvalue()) <= max_kb * 1024 or w <= 720:
            return buf.getvalue(), q, r.size
        w = int(w * 0.9)


def save_jpeg_to(src, path, **kw):
    data, q, size = to_jpeg_bytes(src, **kw)
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, "wb") as f:
        f.write(data)
    return len(data), q, size


def save_panel_jpeg(src, eid, n, **kw):
    p = os.path.join(ART, eid, "%02d.jpg" % n)
    size, q, wh = save_jpeg_to(src, p, **kw)
    return p, size, q, wh


# ---------------------------------------------------------------------- manifest
def update_manifest(eid):
    """Rescan art/<eid>/ and rewrite art/manifest.json entry (adds a cache-busting 'v')."""
    path = os.path.join(ART, "manifest.json")
    m = load_json(path, {}) or {}
    d = os.path.join(ART, eid)
    imgs, vids = [], []
    if os.path.isdir(d):
        for fn in os.listdir(d):
            mm = re.fullmatch(r"(\d\d)\.(jpg|mp4)", fn)
            if mm:
                (imgs if mm.group(2) == "jpg" else vids).append(int(mm.group(1)))
    if imgs or vids:
        m[eid] = {"images": sorted(imgs), "videos": sorted(vids), "v": int(time.time())}
    else:
        m.pop(eid, None)
    os.makedirs(ART, exist_ok=True)
    if m:
        with open(path, "w", encoding="utf-8") as f:
            json.dump(m, f, ensure_ascii=False, indent=1, sort_keys=True)
    elif os.path.exists(path):
        os.remove(path)
    return m.get(eid)
