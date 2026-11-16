#!/usr/bin/env python3
"""WORDBOUND pipeline: one command per episode step, SHORT output. See tools/README.md.

  python tools/pipeline.py validate <ep>
  python tools/pipeline.py audio <ep> [--dry-run]
  python tools/pipeline.py art <ep> [--panels 3,5] [--hint "text"] [--single] [--style s1|v1] [--dry-run] [--print]
  python tools/pipeline.py import <ep> [--from <folder>] [--panels 3,5] [--dry-run]
  python tools/pipeline.py video <ep> <panel> "<motion prompt>" [--dry-run]
  python tools/pipeline.py publish "<message>" [--dry-run]
  python tools/pipeline.py status
"""
import argparse
import glob
import json
import os
import re
import shutil
import subprocess
import sys
import time

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.abspath(os.path.join(HERE, ".."))
sys.path.insert(0, os.path.join(HERE, "art"))
for _s in (sys.stdout, sys.stderr):
    try:
        _s.reconfigure(encoding="utf-8", errors="replace")
    except Exception:
        pass

PY = sys.executable
CBPY = os.path.join(ROOT, ".models", "cbenv", "Scripts", "python.exe")
TRAILER = os.environ.get("WORDBOUND_TRAILER", "Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>")


def p(*a):
    return os.path.join(ROOT, *a)


def run(cmd, env_utf8=True):
    env = dict(os.environ, PYTHONIOENCODING="utf-8")
    r = subprocess.run(cmd, cwd=ROOT, capture_output=True, text=True, encoding="utf-8", errors="replace", env=env)
    return r.returncode, (r.stdout or "") + (r.stderr or "")


def load_json(path, default=None):
    try:
        with open(path, encoding="utf-8") as f:
            return json.load(f)
    except (OSError, ValueError):
        return default


def check_ep(ep):
    if not re.fullmatch(r"s\d+e\d+", ep) or not os.path.isfile(p("data", "episodes", ep + ".json")):
        raise SystemExit("unknown episode %r (no data/episodes/%s.json)" % (ep, ep))


# ------------------------------------------------------------------ validate
def cmd_validate(a):
    check_ep(a.episode)
    ep = a.episode
    ok = True
    rc, out = run([PY, p("tools", "validate_content.py")])
    lines = out.strip().splitlines()
    mine = [l for l in lines if ep in l and re.search(r"error|warn|ERROR|WARN", l)]
    tail = lines[-2:] if lines else []
    errs = [l for l in lines if l.startswith("ERROR")]
    print("content: rc=%d, %d ERROR lines | %s" % (rc, len(errs), tail[-1] if tail else ""))
    for l in (errs + mine)[:8]:
        print("  " + l[:200])
    ok &= rc == 0
    if os.path.isfile(p("data", "trials", ep + ".json")):
        rc, out = run([PY, p("tools", "validate_trials.py")])
        lines = out.strip().splitlines()
        theirs = [l for l in lines if l.startswith(("ERROR", "WARN")) and (ep in l or "missing" not in l)]
        summary = lines[-1] if lines else ""
        print("trials : %s" % summary)
        for l in theirs[:10]:
            print("  " + l[:200])
        # other episodes' missing trials are not this episode's problem
        ok &= not any(l.startswith("ERROR") for l in theirs)
    else:
        print("trials : none for %s (skipped)" % ep)
    rc, out = run([PY, p("tools", "story_dump.py")])
    print("story  : " + (out.strip().splitlines() or ["?"])[-1][:120])
    ok &= rc == 0
    print("OK" if ok else "FAILED")
    return 0 if ok else 1


# ------------------------------------------------------------------ audio
def _audio_one(label, cmd, dry):
    rc, out = run(cmd)
    lines = out.strip().splitlines()
    if dry:
        keep = [l for l in lines if re.match(r"\s*(lines|files):", l)]
        print("%s: %s" % (label, " | ".join(k.strip() for k in keep) or (lines[-1] if lines else "no output")))
        return rc
    done = [l for l in lines if "done" in l and "weak" in l]
    weak = [l.strip() for l in lines if "WEAK" in l]
    tail = done[-1] if done else (lines[-1] if lines else "no output")
    print("%s: rc=%d | %s" % (label, rc, tail[-160:]))
    for w in weak[:15]:
        print("  " + w[-170:])
    if rc != 0 and not done:
        for l in lines[-6:]:
            print("  " + l[:170])
    return rc


def cmd_audio(a):
    check_ep(a.episode)
    ep = a.episode
    extra = ["--dry-run"] if a.dry_run else []
    if not os.path.isfile(CBPY):
        raise SystemExit("Chatterbox venv not found: %s" % CBPY)
    rc = _audio_one("lines ", [CBPY, p("tools", "audio", "gen_chatterbox.py"), "--episode", ep] + extra, a.dry_run)
    if os.path.isfile(p("data", "trials", ep + ".json")):
        rc |= _audio_one("trials", [CBPY, p("tools", "audio", "gen_trials_audio.py"), "--episode", ep] + extra, a.dry_run)
    else:
        print("trials: none for %s (skipped)" % ep)
    return 1 if rc else 0


# ------------------------------------------------------------------ art
def cmd_art(a):
    check_ep(a.episode)
    import flow_batch as F
    ep = a.episode
    scenes = F.build_scenes(ep, a.panels, a.hint or "", a.style)
    refs = sorted({r for s in scenes for r in s["refs"]})
    mode = "generate" if a.single else "agent"
    print("%s: %d panels %s | style=%s | mode=%s | refs=%s | prompt~%d chars" % (
        ep, len(scenes), [s["panel"] for s in scenes], a.style, mode, ",".join(refs),
        sum(len(s["prompt"]) for s in scenes) // len(scenes)))
    if a.print:
        for s in scenes:
            print("--- panel %d refs=%s\n%s" % (s["panel"], s["refs"], s["prompt"]))
    if a.dry_run:
        print("dry-run: nothing submitted")
        return 0
    project = F.fresh_project(ep)
    body = F.single_body(project, scenes) if a.single else F.agent_body(project, scenes)
    t0 = time.time()
    jobs, retried, out_dir = F.run_with_retry("/api/generate" if a.single else "/api/agent", body)
    status = ",".join(sorted({j.get("status", "?") for j in jobs}))
    files = F.job_files(jobs, out_dir or os.path.join(F.FLOW_OUT, project), t0)
    panels = [s["panel"] for s in scenes]
    F.save_state(ep, {"jobs": [j["id"] for j in jobs], "out_dir": out_dir, "files": files, "panels": panels, "style": a.style})
    sheet = ""
    if files:
        labels = panels if len(files) == len(panels) else list(range(1, len(files) + 1))
        sheet = F.contact_sheet(files, labels, os.path.join(F.SHEET_DIR, ep + ".jpg"))
    print("job=%s status=%s%s files=%d/%d sheet=%s" % (
        ",".join(j["id"] for j in jobs), status, " (retried)" if retried else "", len(files), len(scenes),
        os.path.relpath(sheet, ROOT) if sheet else "-"))
    if status != "done":
        for j in jobs:
            if j.get("error"):
                print("  error: %s" % str(j["error"])[:200])
    return 0 if status == "done" else 1


# ------------------------------------------------------------------ import
def cmd_import(a):
    check_ep(a.episode)
    import flow_batch as F
    ep = a.episode
    nep = len(load_json(p("data", "episodes", ep + ".json"))["panels"])
    st = F.load_state(ep) or {}
    folder = a.from_ or st.get("out_dir") or os.path.join(F.FLOW_OUT, ep)
    if not os.path.isdir(folder):
        raise SystemExit("folder not found: %s" % folder)
    files = sorted(glob.glob(os.path.join(folder, "scene-*.jp*")) + glob.glob(os.path.join(folder, "scene-*.png")) +
                   glob.glob(os.path.join(folder, "scene-*.webp")))
    if a.panels:
        panels = F.parse_panels(a.panels, nep)
    elif st.get("panels") and os.path.normcase(st.get("out_dir") or "") == os.path.normcase(folder) and len(st["panels"]) == len(files):
        panels = st["panels"]
    else:
        panels = list(range(1, nep + 1))
    if not files:
        raise SystemExit("no scene-NN images in %s" % folder)
    if len(files) != len(panels):
        raise SystemExit("%d scene files vs %d panels %s: pass --panels (in batch order) or a clean --from folder" % (
            len(files), len(panels), panels))
    tmp = p(".models", "tmp_import", ep)
    shutil.rmtree(tmp, ignore_errors=True)
    os.makedirs(tmp)
    for f, n in zip(files, panels):
        shutil.copy(f, os.path.join(tmp, "%s p%02d%s" % (ep, n, os.path.splitext(f)[1])))
    cmd = [PY, p("tools", "art", "import_art.py"), tmp, ep] + (["--dry-run"] if a.dry_run else [])
    rc, out = run(cmd)
    lines = [l for l in out.strip().splitlines() if l.strip()]
    print("%s: %d files -> panels %s%s | rc=%d" % (ep, len(files), panels if len(panels) < 8 else "%d..%d" % (panels[0], panels[-1]),
                                                   " [dry-run]" if a.dry_run else "", rc))
    for l in (lines[:1] + lines[-2:]) if len(lines) > 3 else lines:
        print("  " + l[:170])
    shutil.rmtree(tmp, ignore_errors=True)
    return rc


# ------------------------------------------------------------------ video
def cmd_video(a):
    check_ep(a.episode)
    import flow_batch as F
    ep, n = a.episode, a.panel
    src = p("art", ep, "%02d.jpg" % n)
    if not os.path.isfile(src):
        raise SystemExit("source image missing: %s" % os.path.relpath(src, ROOT))
    scene = {"prompt": a.prompt, "type": "video", "model": "Omni 1.1 Flash", "aspect_ratio": "9:16", "duration": 4,
             "resolution": "720p", "max_credits": 12, "first_frame": src}
    print("%s p%02d: video Omni 1.1 Flash 4s 720p 9:16, first_frame=%s, max_credits=12" % (ep, n, os.path.relpath(src, ROOT)))
    if a.dry_run:
        print("dry-run: nothing submitted; prompt: %s" % a.prompt[:100])
        return 0
    t0 = time.time()
    jobs, retried, out_dir = F.run_with_retry("/api/generate", {"project": "%s-video" % ep, "scenes": [scene]}, retry_any=False)
    j = jobs[0]
    mp4 = [f for f in (j.get("files") or []) if str(f).lower().endswith(".mp4")]
    if not mp4 and out_dir:
        mp4 = sorted([f for f in glob.glob(os.path.join(out_dir, "*.mp4")) if os.path.getmtime(f) >= t0 - 5])
    print("job=%s status=%s credits=%s%s files=%d" % (j["id"], j.get("status"), j.get("credits"), " (retried)" if retried else "", len(mp4)))
    if j.get("status") != "done" or not mp4:
        if j.get("error"):
            print("  error: %s" % str(j["error"])[:200])
        return 1
    rc, out = run([PY, p("tools", "art", "import_art.py"), "-", ep, "--video", "%02d" % n, mp4[-1]])
    print("import: rc=%d %s" % (rc, (out.strip().splitlines() or [""])[-1][:150]))
    return rc


# ------------------------------------------------------------------ publish
def cmd_publish(a):
    ns = argparse.Namespace(episode="s1e01")
    rc, out = run([PY, p("tools", "validate_content.py")])
    if rc != 0:
        print("validate_content FAILED:\n" + "\n".join(out.strip().splitlines()[-6:]))
        return 1
    rc, out = run([PY, p("tools", "story_dump.py")])
    print("validate ok; " + (out.strip().splitlines() or [""])[-1][:100])
    if a.dry_run:
        rc, out = run(["git", "status", "--short"])
        print("dry-run: %d changed paths; would commit with trailer and push" % len(out.strip().splitlines()))
        return 0
    rc, out = run(["git", "add", "-A", "--", ".", ":!.models"])
    if rc:
        print(out[-300:])
        return 1
    rc, out = run(["git", "diff", "--cached", "--quiet"])
    if rc == 0:
        print("nothing to commit")
        return 0
    rc, out = run(["git", "-c", "user.name=WORDBOUND", "-c", "user.email=noreply@example.com", "commit",
                   "-m", a.message, "-m", TRAILER])
    print("commit: " + (out.strip().splitlines() or [""])[0][:120])
    if rc:
        print(out[-300:])
        return 1
    rc, out = run(["git", "push"])
    print("push: rc=%d %s" % (rc, (out.strip().splitlines() or [""])[-1][:120]))
    return rc


# ------------------------------------------------------------------ status
def cmd_status(a):
    manifest = load_json(p("art", "manifest.json"), {})
    eps = sorted(os.path.basename(f)[:-5] for f in glob.glob(p("data", "episodes", "s*e*.json")))
    print("%-6s %6s %6s %6s %9s %7s %6s" % ("ep", "panels", "images", "videos", "audio", "trials", "review"))
    for ep in eps:
        d = load_json(p("data", "episodes", ep + ".json"), {})
        panels = d.get("panels", [])
        en = sum(1 for pn in panels for l in pn.get("lines", []) if l.get("en"))
        mp3 = len(glob.glob(p("audio", ep, "*.mp3")))
        m = manifest.get(ep, {})
        t = load_json(p("data", "trials", ep + ".json"))
        tr = "-"
        if t:
            lst = t.get("trials") if isinstance(t, dict) else None
            tr = str(len(lst)) if isinstance(lst, list) else "yes"
        rv = "-"
        rp = p("story", "reviews", ep + ".md")
        if os.path.isfile(rp):
            mm = re.search(r"Итог[^\d\n]{0,12}(\d+(?:[.,]\d+)?\s*/\s*10)", open(rp, encoding="utf-8").read())
            rv = mm.group(1).replace(" ", "") if mm else "?"
        print("%-6s %6d %6s %6s %9s %7s %6s" % (ep, len(panels), "%d" % len(m.get("images", [])), "%d" % len(m.get("videos", [])),
                                                "%d/%d" % (mp3, en), tr, rv))
    return 0


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    sub = ap.add_subparsers(dest="cmd", required=True)
    s = sub.add_parser("validate"); s.add_argument("episode"); s.set_defaults(f=cmd_validate)
    s = sub.add_parser("audio"); s.add_argument("episode"); s.add_argument("--dry-run", action="store_true"); s.set_defaults(f=cmd_audio)
    s = sub.add_parser("art"); s.add_argument("episode")
    s.add_argument("--panels"); s.add_argument("--hint"); s.add_argument("--single", action="store_true")
    s.add_argument("--style", default="s1"); s.add_argument("--dry-run", action="store_true")
    s.add_argument("--print", action="store_true", help="print the full prompts"); s.set_defaults(f=cmd_art)
    s = sub.add_parser("import"); s.add_argument("episode"); s.add_argument("--from", dest="from_")
    s.add_argument("--panels"); s.add_argument("--dry-run", action="store_true"); s.set_defaults(f=cmd_import)
    s = sub.add_parser("video"); s.add_argument("episode"); s.add_argument("panel", type=int); s.add_argument("prompt")
    s.add_argument("--dry-run", action="store_true"); s.set_defaults(f=cmd_video)
    s = sub.add_parser("publish"); s.add_argument("message"); s.add_argument("--dry-run", action="store_true"); s.set_defaults(f=cmd_publish)
    s = sub.add_parser("status"); s.set_defaults(f=cmd_status)
    a = ap.parse_args()
    sys.exit(a.f(a) or 0)


if __name__ == "__main__":
    main()
