"""Build audio/<ep>/NN-scene.mp3 for every panel that has a video: the panel's voiced lines in order,
0.35 s apart (narration-ru has no audio). The reader plays it over the silent looping video on tap (🔊).
Usage: .models/cbenv/Scripts/python tools/audio/build_scene_audio.py [ep ...] [--dry-run]"""
import glob, json, os, subprocess, sys
import imageio_ffmpeg
FF = imageio_ffmpeg.get_ffmpeg_exe()
ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
args = [a for a in sys.argv[1:] if not a.startswith("--")]
dry = "--dry-run" in sys.argv
man = json.load(open(os.path.join(ROOT, "art", "manifest.json"), encoding="utf-8"))
GAP = 0.35
n_ok = 0
for ep in args or sorted(k for k in man if k.startswith("s")):
    ent = man.get(ep) or {}
    d = json.load(open(os.path.join(ROOT, "data", "episodes", ep + ".json"), encoding="utf-8"))
    for pn in ent.get("videos", []):
        files = []
        for j, ln in enumerate(d["panels"][pn - 1]["lines"], 1):
            f = os.path.join(ROOT, "audio", ep, "%02d-%02d.mp3" % (pn, j))
            if ln.get("type") != "narration-ru" and os.path.isfile(f):
                files.append(f)
        out = os.path.join(ROOT, "audio", ep, "%02d-scene.mp3" % pn)
        if not files:
            print(ep, pn, "no voiced lines -> skipped"); continue
        if dry:
            print(ep, pn, len(files), "lines ->", os.path.relpath(out, ROOT)); continue
        cmd = [FF, "-y", "-loglevel", "error"]
        for f in files: cmd += ["-i", f]
        cmd += ["-f", "lavfi", "-t", str(GAP), "-i", "anullsrc=r=24000:cl=mono"]
        sil = len(files)
        parts, labels = [], []
        for k in range(len(files)):
            parts.append("[%d:a]aresample=24000,aformat=sample_fmts=fltp:channel_layouts=mono[a%d]" % (k, k))
            labels.append("[a%d]" % k)
            if k < len(files) - 1:
                parts.append("[%d:a]anull[s%d]" % (sil, k)); labels.append("[s%d]" % k)
        # one silence input can only feed one label: split it
        if len(files) > 1:
            parts.append("[%d:a]asplit=%d%s" % (sil, len(files) - 1, "".join("[g%d]" % k for k in range(len(files) - 1))))
            parts = [p for p in parts if not p.startswith("[%d:a]anull" % sil)]
            labels = []
            for k in range(len(files)):
                labels.append("[a%d]" % k)
                if k < len(files) - 1: labels.append("[g%d]" % k)
        parts.append("%sconcat=n=%d:v=0:a=1[o]" % ("".join(labels), len(labels)))
        cmd += ["-filter_complex", ";".join(parts), "-map", "[o]", "-ac", "1", "-ar", "24000", "-b:a", "64k", out]
        r = subprocess.run(cmd, capture_output=True, text=True)
        if r.returncode: print(ep, pn, "FAILED", r.stderr[-300:]); continue
        n_ok += 1
        print(ep, pn, len(files), "lines ->", os.path.relpath(out, ROOT), "%d KB" % (os.path.getsize(out) // 1024))
print("built", n_ok)
