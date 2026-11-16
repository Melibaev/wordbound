"""Extract 3 frames (0 s, middle, last) from every panel video into .models/vframes/<ep>/NN_{a,b,c}.jpg
and print how far the first frame is from the current still (0 = identical, ~1 = unrelated).
Usage: .models/cbenv/Scripts/python tools/art/video_frames.py [ep ...]"""
import os, subprocess, sys, glob, json
import numpy as np
from PIL import Image
import imageio_ffmpeg
FF = imageio_ffmpeg.get_ffmpeg_exe()
ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
eps = sys.argv[1:] or sorted(os.path.basename(p) for p in glob.glob(os.path.join(ROOT, "art", "s*e*")))

def dur(mp4):
    r = subprocess.run([FF, "-hide_banner", "-i", mp4], capture_output=True, text=True).stderr
    for l in r.splitlines():
        if "Duration" in l:
            h, m, s = l.split("Duration:")[1].split(",")[0].strip().split(":")
            return int(h) * 3600 + int(m) * 60 + float(s)
    return 4.0

def small(p):
    return np.asarray(Image.open(p).convert("L").resize((48, 64)), dtype=float) / 255

rows = []
for ep in eps:
    out = os.path.join(ROOT, ".models", "vframes", ep); os.makedirs(out, exist_ok=True)
    for mp4 in sorted(glob.glob(os.path.join(ROOT, "art", ep, "*.mp4"))):
        nn = os.path.basename(mp4)[:2]; d = dur(mp4)
        for tag, t in (("a", 0.0), ("b", d / 2), ("c", max(0, d - 0.15))):
            subprocess.run([FF, "-y", "-loglevel", "error", "-ss", f"{t:.2f}", "-i", mp4, "-frames:v", "1", "-q:v", "3", os.path.join(out, f"{nn}_{tag}.jpg")])
        still = os.path.join(ROOT, "art", ep, nn + ".jpg")
        diff = float(np.abs(small(os.path.join(out, f"{nn}_a.jpg")) - small(still)).mean()) if os.path.exists(still) else -1
        rows.append((ep, nn, round(d, 1), round(diff, 3)))
for r in rows: print("%s p%s %.1fs first-frame-diff=%.3f" % r)
