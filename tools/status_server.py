"""Live status page for the art queue. Run: python tools/status_server.py [port]  -> http://<this-PC-ip>:8790 (read-only).
Shows driver batches (from %TEMP%/redraw4.log) and the current Flow job. Auto-refresh every 3 s."""
import json, os, re, sys, urllib.request
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
PORT = int(sys.argv[1]) if len(sys.argv) > 1 else 8790
KEY = sys.argv[2] if len(sys.argv) > 2 else ""
TOKEN = open(os.path.expanduser("~/.flow-mcp/token")).read().strip()
LOGS = ["redraw4.log", "pass5.log", "video.log"]
T = os.environ.get("TEMP", ".")

def status():
    rows = []
    for name in LOGS:
        p = os.path.join(T, name); cur = None
        if not os.path.exists(p): continue
        for l in open(p, encoding="utf-8", errors="ignore"):
            m = re.match(r"=== (\S+) (.*)", l)
            if m: cur = {"ep": m.group(1), "what": m.group(2).strip(), "st": "рисуется"}; rows.append(cur)
            elif cur and ("status=done" in l or l.startswith("OK")): cur["st"] = "готово"
            elif cur and l.startswith("FAILED"): cur["st"] = "сбой"
    jobs = []
    job = None
    try:
        req = urllib.request.Request("http://127.0.0.1:8787/api/status", data=b'{"detailed":false}', headers={"x-flow-token": TOKEN, "content-type": "application/json"})
        j = json.load(urllib.request.urlopen(req, timeout=10))["jobs"][-1]
        for x in json.load(urllib.request.urlopen(req, timeout=10))["jobs"][-14:][::-1]:
            jobs.append({"id": x["id"], "kind": "видео" if "Animate" in str(x.get("prompt")) else ("пачка" if "Agent batch" in str(x.get("prompt")) else "картинка"), "what": re.sub(r"NO SUBTITLES.*?Animate this exact webtoon panel\. ", "", str(x.get("prompt")))[:70], "status": x["status"], "stage": x.get("progress") or "", "files": len(x.get("files", [])), "error": re.sub(r"\[[0-9;]*m", "", x.get("error") or "")[:90]})
        job = {"id": j["id"], "prompt": str(j.get("prompt"))[:80], "status": j["status"], "stage": j.get("progress") or "", "files": len(j.get("files", []))}
    except Exception as e:
        job = {"error": str(e)[:100]}
    return {"rows": rows, "job": job, "jobs": jobs}

PAGE = """<!doctype html><meta charset=utf-8><meta name=viewport content="width=device-width,initial-scale=1"><title>Очередь арта</title>
<style>body{font:16px system-ui;background:#111;color:#eee;margin:16px}h1{font-size:18px}.r{padding:8px 10px;margin:6px 0;border-radius:8px;background:#222}
.готово{border-left:5px solid #4c4}.рисуется{border-left:5px solid #fc3}.сбой{border-left:5px solid #e44}.j{background:#1c2a3a;padding:10px;border-radius:8px}small{color:#999}</style>
<h1>Очередь арта <small id=t></small></h1><div id=rows></div><h1>Все задачи Flow (новые сверху)</h1><div id=jobs></div>
<script>async function u(){try{const d=await (await fetch('/status.json'+location.search)).json();
rows.innerHTML=d.rows.map(r=>`<div class="r ${r.st}"><b>${r.ep}</b> · ${r.what}<br>${r.st=='готово'?'✔ готово':r.st=='сбой'?'✘ сбой':'⏳ рисуется'}</div>`).join('');
jobs.innerHTML=d.jobs.map(x=>`<div class="r ${x.status=='done'?'готово':x.status=='failed'?'сбой':'рисуется'}"><b>${x.kind}</b> · ${x.status} ${x.stage} · файлов ${x.files}<br><small>${x.what}${x.error?'<br>'+x.error:''}</small></div>`).join('');
t.textContent=new Date().toLocaleTimeString()}catch(e){t.textContent='нет связи'}}u();setInterval(u,3000)</script>"""

class H(BaseHTTPRequestHandler):
    def log_message(self, *a): pass
    def do_GET(self):
        if KEY and ("k=" + KEY) not in self.path and "k=" + KEY not in (self.headers.get("Referer") or ""):
            self.send_response(403); self.end_headers(); return
        if self.path.startswith("/status.json"):
            b = json.dumps(status(), ensure_ascii=False).encode(); ct = "application/json; charset=utf-8"
        else:
            b = PAGE.encode(); ct = "text/html; charset=utf-8"
        self.send_response(200); self.send_header("Content-Type", ct); self.send_header("Cache-Control", "no-store"); self.send_header("Access-Control-Allow-Origin", "*"); self.end_headers(); self.wfile.write(b)
ThreadingHTTPServer(("0.0.0.0", PORT), H).serve_forever()
