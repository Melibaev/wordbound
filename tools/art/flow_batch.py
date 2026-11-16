#!/usr/bin/env python3
"""Flow (flow-mcp local API) helpers for WORDBOUND: prompts -> agent batch -> wait -> contact sheet.

Library for tools/pipeline.py (no CLI). Needs flow-mcp running (http://127.0.0.1:8787, token in ~/.flow-mcp/token)
and the Flow window open for real submissions; building prompts / --dry-run needs neither.
"""
import glob
import json
import os
import re
import sys
import time
import urllib.error
import urllib.request

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.abspath(os.path.join(HERE, "..", ".."))
sys.path.insert(0, HERE)
import common as C  # noqa: E402
import agent_prompts as A  # noqa: E402

API = "http://127.0.0.1:8787"
FLOW_OUT = os.path.join(os.path.expanduser("~"), "flow-mcp-out")
STATE_DIR = os.path.join(ROOT, ".models", "flow_last")
SHEET_DIR = os.path.join(ROOT, ".models", "sheets")

# cast id -> Flow character asset name (reference image 'asset:<Name>')
CAST = {"dan": "Dan", "mira": "Mira", "keeper": "Keeper", "silent": "Silent", "pip": "Pip",
        "trader": "Trader", "lina_human": "Lina"}

# Rules shared by every style (kept short: the agent enriches prompts itself).
COMMON_RULES = (
    "No text, letters, captions or speech bubbles anywhere; glowing words are abstract glyph light. "
    "Each person has exactly two arms and two hands, no extra limbs. "
    "Dan wears round black glasses; Dan never has a bandage or plaster on his face. "
    "The Silent: smooth white face, no eyes, no nose, no lips, one thin vertical teal seam."
)

STYLES = {
    # current look (episodes 1-12)
    "s1": "Korean webtoon style, full colour, soft cel shading, vertical 3:4.",
    # sharper action-webtoon look
    "v1": ("Korean action webtoon art, high-contrast digital painting, sharp cel shading with hard-edged shadows, "
           "dramatic rim lighting, deep blacks, glossy detailed hair strands, sharp angular faces and jawlines, "
           "intense eyes, cinematic dynamic perspective, glowing particle effects, crisp thin lineart, vertical 3:4."),
}


# ---------------------------------------------------------------- API
def token():
    p = os.path.join(os.path.expanduser("~"), ".flow-mcp", "token")
    try:
        return open(p).read().strip()
    except OSError:
        raise SystemExit("flow-mcp token not found (%s): start flow-mcp / open Flow first" % p)


def call(path, body=None, timeout=130):
    req = urllib.request.Request(API + path, data=json.dumps(body or {}).encode(), method="POST",
                                 headers={"content-type": "application/json", "x-flow-token": token()})
    try:
        return json.load(urllib.request.urlopen(req, timeout=timeout))
    except urllib.error.HTTPError as e:
        msg = e.read().decode("utf-8", "replace")[:300]
        raise SystemExit("flow-mcp %s -> HTTP %d: %s" % (path, e.code, msg))
    except (urllib.error.URLError, OSError) as e:
        raise SystemExit("flow-mcp not reachable at %s (%s). Start it / open the Flow window." % (API, e))


# ---------------------------------------------------------------- prompts
def parse_panels(spec, n):
    if not spec:
        return list(range(1, n + 1))
    out = []
    for part in str(spec).split(","):
        part = part.strip()
        if "-" in part:
            a, b = part.split("-", 1)
            out += list(range(int(a), int(b) + 1))
        elif part:
            out.append(int(part))
    bad = [p for p in out if not 1 <= p <= n]
    if bad:
        raise SystemExit("panels out of range 1..%d: %s" % (n, bad))
    return out


def build_scenes(ep_id, panels=None, hint="", style="s1"):
    """-> list of {panel, prompt, refs} in the order of `panels` (default all)."""
    if style not in STYLES:
        raise SystemExit("unknown --style %r (have: %s)" % (style, ", ".join(STYLES)))
    story = C.load_story()
    bible = C.parse_bible()
    chars = {c["id"]: c for c in story["characters"]}
    ep = C.load_episode(ep_id)
    shots = A.load_shots().get(ep_id, [])
    nums = parse_panels(panels, len(ep["panels"])) if not isinstance(panels, list) else panels
    scenes = []
    for n in nums:
        p = ep["panels"][n - 1]
        blk, _tags, _ = A.panel_block(ep_id, n, p, chars, bible, None, shots[n - 1] if n - 1 < len(shots) else None)
        body = blk.split("\n", 1)[1].replace("\n", " ") if "\n" in blk else blk
        refs = []
        for c in p.get("cast", []):
            nm = CAST.get(c["id"])
            if nm and nm not in refs:
                refs.append(nm)
        extra = (" Extra direction: %s." % hint.strip().rstrip(".")) if hint else ""
        scenes.append({"panel": n, "refs": refs[:3],
                       "prompt": "Panel %02d. %s%s %s %s" % (n, body, extra, STYLES[style], COMMON_RULES)})
    return scenes


def agent_body(project, scenes):
    names = sorted({r for s in scenes for r in s["refs"]})
    return {"project": project, "aspect_ratio": "3:4",
            "references": [{"image": "asset:" + n, "name": n} for n in names],
            "scene_references": [s["refs"] for s in scenes],
            "scenes": [s["prompt"] for s in scenes]}


def single_body(project, scenes):
    return {"project": project, "scenes": [
        {"type": "image", "aspect_ratio": "3:4", "prompt": s["prompt"],
         "reference_images": ["asset:" + r for r in s["refs"]][:3]} for s in scenes]}


def fresh_project(ep_id):
    """Project (= output folder) name: the episode id, or with a stamp when the folder already holds scene files."""
    d = os.path.join(FLOW_OUT, ep_id)
    if glob.glob(os.path.join(d, "scene-*")):
        return "%s-%s" % (ep_id, time.strftime("%m%d-%H%M"))
    return ep_id


# ---------------------------------------------------------------- jobs
def wait_jobs(ids, max_wait=1800):
    """Block until every job is done/failed. Returns {id: jobview}."""
    t0 = time.time()
    last = {}
    while True:
        r = call("/api/wait", {"job_ids": ids, "timeout_seconds": 40}, timeout=120)
        last = {j["id"]: j for j in r.get("jobs", [])}
        if r.get("finished") or time.time() - t0 > max_wait:
            return last


def run_with_retry(path, body, retry_any=True):
    """Submit, wait, retry once on the known first-attempt failure. -> (job, retried)."""
    r = call(path, body)
    jobs = r.get("jobs") or []
    if not jobs:
        raise SystemExit("flow-mcp returned no jobs: %s" % json.dumps(r)[:200])
    ids = [j["id"] for j in jobs]
    res = wait_jobs(ids)
    retried = False
    bad = [i for i, j in res.items() if j.get("status") == "failed"]
    if bad:
        err = " ".join(str(res[i].get("error") or "") for i in bad)
        if retry_any or re.search(r"Reuse prompt|locator", err, re.I):
            call("/api/retry", {"job_ids": bad})
            retried = True
            res.update(wait_jobs(ids))
    return list(res.values()), retried, r.get("output_dir")


def job_files(jobs, out_dir=None, since=0):
    files = []
    for j in jobs:
        files += [f for f in (j.get("files") or []) if isinstance(f, str)]
    if not files and out_dir:
        files = [f for f in glob.glob(os.path.join(out_dir, "scene-*.jp*")) if os.path.getmtime(f) >= since - 5]
    return sorted(dict.fromkeys(files), key=lambda f: (os.path.basename(f), f))


# ---------------------------------------------------------------- state + sheet
def save_state(ep_id, data):
    os.makedirs(STATE_DIR, exist_ok=True)
    with open(os.path.join(STATE_DIR, ep_id + ".json"), "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=1)


def load_state(ep_id):
    try:
        with open(os.path.join(STATE_DIR, ep_id + ".json"), encoding="utf-8") as f:
            return json.load(f)
    except (OSError, ValueError):
        return None


def contact_sheet(files, labels, out_path, cols=6, w=260, h=347):
    from PIL import Image, ImageDraw
    os.makedirs(os.path.dirname(out_path), exist_ok=True)
    rows = (len(files) + cols - 1) // cols
    sh = Image.new("RGB", (cols * w, max(rows, 1) * h), "white")
    dr = ImageDraw.Draw(sh)
    for k, f in enumerate(files):
        try:
            im = Image.open(f).convert("RGB")
        except OSError:
            continue
        im.thumbnail((w, h))
        x, y = (k % cols) * w, (k // cols) * h
        sh.paste(im, (x, y))
        dr.rectangle([x, y, x + 44, y + 22], fill="red")
        dr.text((x + 5, y + 5), str(labels[k] if k < len(labels) else k + 1), fill="white")
    sh.save(out_path, quality=80)
    return out_path
