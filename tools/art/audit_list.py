"""Print panels to redraw from story/audit/<ep>.json: python tools/art/audit_list.py <ep> [--visible]"""
import json, sys
ep = sys.argv[1]; vis = "--visible" in sys.argv
a = json.load(open(f"story/audit/{ep}.json", encoding="utf-8"))
P = {}
for e in a:
    if "panel" not in e: continue
    if e.get("kind") not in ("art", "video") and e["severity"] != "hard": continue
    if e["severity"] == "hard" or (vis and e["severity"] == "visible"): P.setdefault(e["panel"], []).append(e["problem"][:90])
print(",".join(str(k) for k in sorted(P)))
for k in sorted(P): print(" ", k, "|", " ; ".join(P[k]))
vids = a[-1].get("videos") if isinstance(a[-1], dict) else None
print("videos:", vids)
