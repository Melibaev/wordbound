"""Submit several panel videos in ONE call and import them. Usage: python tools/art/videos_batch.py spec.json
spec.json = [{"ep":"s1e03","panel":7,"prompt":"..."}, ...]. Omni 1.1 Flash 4 s 720p 9:16, first frame = art/<ep>/NN.jpg, max 12 credits each."""
import json, os, subprocess, sys
sys.path.insert(0, os.path.dirname(__file__))
import flow_batch as F
ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
spec = json.load(open(sys.argv[1], encoding="utf-8"))
scenes = [{"type": "video", "model": "Omni 1.1 Flash", "duration": 4, "resolution": "720p", "aspect_ratio": "9:16", "max_credits": 12,
           "first_frame": os.path.join(ROOT, "art", s["ep"], "%02d.jpg" % s["panel"]), "prompt": s["prompt"]} for s in spec]
jobs, retried, out_dir = F.run_with_retry("/api/generate", {"project": "videos-batch", "scenes": scenes}, retry_any=False)
for s, j in zip(spec, jobs):
    mp4 = [f for f in (j.get("files") or []) if f.lower().endswith(".mp4")]
    print("%s p%02d status=%s credits=%s files=%d" % (s["ep"], s["panel"], j.get("status"), j.get("credits"), len(mp4)))
    if mp4:
        subprocess.run([sys.executable, os.path.join(ROOT, "tools", "art", "import_art.py"), "-", s["ep"], "--video", str(s["panel"]), mp4[0]], cwd=ROOT)
