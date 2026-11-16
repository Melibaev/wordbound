// Screenshots real reader panels as on iPhone. See tools/art/README.md.
// Usage: node tools/art/shot_panels.mjs <episodeId> [--panels 3,5] [--ru] [--ru-index N] [--out dir]
import { createRequire } from 'node:module';
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const require = createRequire(import.meta.url);
const { chromium } = require('C:/Users/Laptop/flow-mcp/node_modules/playwright-core');
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');

const argv = process.argv.slice(2);
const ep = argv.find((a) => !a.startsWith('--') && argv[argv.indexOf(a) - 1] !== '--panels' && argv[argv.indexOf(a) - 1] !== '--out' && argv[argv.indexOf(a) - 1] !== '--ru-index');
const opt = (n) => { const i = argv.indexOf(n); return i >= 0 ? argv[i + 1] : null; };
if (!ep) { console.error('usage: node tools/art/shot_panels.mjs <episodeId> [--panels 3,5] [--ru] [--ru-index N] [--out dir]'); process.exit(2); }
const only = opt('--panels') ? new Set(opt('--panels').split(',').map(Number)) : null;
const ru = argv.includes('--ru');
const ruIndex = Number(opt('--ru-index') || 0);
const outDir = path.resolve(opt('--out') || path.join(ROOT, '.models', 'shots', ep));
fs.mkdirSync(outDir, { recursive: true });

const MIME = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.mjs': 'text/javascript', '.json': 'application/json', '.css': 'text/css', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.png': 'image/png', '.svg': 'image/svg+xml', '.mp4': 'video/mp4', '.mp3': 'audio/mpeg', '.webmanifest': 'application/manifest+json', '.woff2': 'font/woff2', '.ico': 'image/x-icon' };
const server = http.createServer((req, res) => {
  let p = decodeURIComponent(req.url.split('?')[0]);
  if (p.endsWith('/')) p += 'index.html';
  const f = path.join(ROOT, p);
  if (!f.startsWith(ROOT) || !fs.existsSync(f) || fs.statSync(f).isDirectory()) { res.writeHead(404); res.end(); return; }
  res.writeHead(200, { 'Content-Type': MIME[path.extname(f).toLowerCase()] || 'application/octet-stream' });
  fs.createReadStream(f).pipe(res);
});
await new Promise((r) => server.listen(0, '127.0.0.1', r));
const port = server.address().port;

const exe = ['C:/Program Files/Google/Chrome/Application/chrome.exe', 'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe', path.join(process.env.LOCALAPPDATA || '', 'Google/Chrome/Application/chrome.exe')].find((x) => fs.existsSync(x));
const t0 = Date.now();
let browser;
try {
  browser = await chromium.launch(exe ? { executablePath: exe, headless: true } : { channel: 'chrome', headless: true });
  const ctx = await browser.newContext({
    viewport: { width: 390, height: 844 }, deviceScaleFactor: process.argv.includes('--zoom') ? 4 : 2, colorScheme: process.argv.includes('--dark') ? 'dark' : 'light', isMobile: true, hasTouch: true,
    serviceWorkers: 'block', reducedMotion: process.argv.includes('--motion') ? 'no-preference' : 'reduce',
  });
  await ctx.addInitScript(() => {
    try { localStorage.setItem('wordbound.state', JSON.stringify({ v: 1, onboarded: true })); } catch (e) {}
  });
  const page = await ctx.newPage();
  page.on('console', (m) => { if (m.type() === 'error') console.log('console error:', m.text()); });
  page.on('pageerror', (e) => console.log('page error:', e.message));
  await page.goto(`http://127.0.0.1:${port}/index.html#/read/${ep}`);
  await page.waitForSelector('section.panel', { timeout: 20000 });
  const panels = page.locator('section.panel');
  const n = await panels.count();
  if (!process.argv.includes('--motion')) await page.addStyleTag({ content: 'video{display:none !important}' });
  // --ru: per panel, open the translation of the first bubble (placed panels show a popover; others expand inline)
  if (ru) await page.evaluate((idx) => document.querySelectorAll('section.panel').forEach((s) => { const b = s.querySelectorAll('[data-ru]')[idx]; if (b) b.click(); }), ruIndex);
  // scroll through to trigger lazy images
  for (let i = 0; i < n; i++) { await panels.nth(i).scrollIntoViewIfNeeded(); await page.waitForTimeout(150); }
  await page.waitForLoadState('networkidle').catch(() => {});
  await page.waitForFunction(() => [...document.querySelectorAll('img.art-img')].every((im) => im.complete), null, { timeout: 15000 }).catch(() => {});
  await page.waitForTimeout(500);
  for (let i = 0; i < n; i++) {
    if (only && !only.has(i + 1)) continue;
    const el = panels.nth(i);
    await el.scrollIntoViewIfNeeded();
    await page.evaluate(() => document.querySelectorAll('.pl-layer').length); // keep layout settled
    await page.waitForTimeout(250);
    const file = path.join(outDir, String(i + 1).padStart(2, '0') + '.png');
    await el.screenshot({ path: file });
    console.log(file);
  }
  console.log(`done ${ep}: ${n} panels in ${((Date.now() - t0) / 1000).toFixed(1)}s`);
} finally {
  if (browser) await browser.close();
  server.close();
}
process.exit(0);
