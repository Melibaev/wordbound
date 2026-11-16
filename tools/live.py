"""Live progress view for the art queue: python tools/live.py  (refreshes every 5 s, Ctrl+C to quit)
Shows: current Flow job + stage, per-episode batch results from the driver log."""
import json, os, re, subprocess, sys, time, urllib.request
TOKEN = open(os.path.expanduser("~/.flow-mcp/token")).read().strip()
LOG = os.path.join(os.environ.get("TEMP", "."), "redraw4.log")

def flow():
    req = urllib.request.Request("http://127.0.0.1:8787/api/status", data=b'{"detailed":false}', headers={"x-flow-token": TOKEN, "content-type": "application/json"})
    return json.load(urllib.request.urlopen(req, timeout=15))["jobs"]

def log_rows():
    rows, cur = [], None
    if not os.path.exists(LOG): return rows
    for l in open(LOG, encoding="utf-8", errors="ignore"):
        m = re.match(r"=== (\S+) (\S+)", l)
        if m: cur = [m.group(1), m.group(2), "рисуется…"]; rows.append(cur)
        elif cur and "status=done" in l: cur[2] = "✔ готово и импортировано"
        elif cur and l.startswith("FAILED"): cur[2] = "✘ сбой (повторю)"
    return rows

ONCE = '--once' in sys.argv
while True:
    if not ONCE: os.system("cls" if os.name == "nt" else "clear")
    print("== ОЧЕРЕДЬ ПЕРЕРИСОВКИ ==  ", time.strftime("%H:%M:%S"))
    for ep, panels, st in log_rows(): print(f"  {ep:7} панели {panels:34} {st}")
    try:
        j = flow()[-1]
        print("\n== СЕЙЧАС ВО FLOW ==")
        print("  задача:", j["id"], "|", str(j.get("prompt"))[:60].replace("\n", " "))
        print("  этап:  ", j["status"], "-", j.get("progress") or "")
        print("  файлов:", len(j.get("files", [])))
    except Exception as e:
        print("\nFlow не отвечает:", e)
    if ONCE: break
    time.sleep(5)
