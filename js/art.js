// Procedural manga-style panel art (SVG strings). Palette: ink / paper / vermilion.
import { esc } from './util.js';

const I = '#111';
const P = '#F4F0E6';
const A = '#E8391D';
const W = 360;
const H = 270;

let uidc = 0;

const rnd = (n) => {
  const x = Math.sin(n * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
};
const R = (x, y, w, h, f, ex = '') => `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${f}" ${ex}/>`;
const Pg = (pts, f, ex = '') => `<polygon points="${pts}" fill="${f}" ${ex}/>`;
const C = (cx, cy, r, f, ex = '') => `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${f}" ${ex}/>`;
const L = (x1, y1, x2, y2, s, w = 2, ex = '') => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${s}" stroke-width="${w}" ${ex}/>`;
const url = (u, id) => `url(#${u}${id})`;

function defs(u) {
  const dots = (id, size, r, fill, rot = 30) =>
    `<pattern id="${u}${id}" width="${size}" height="${size}" patternUnits="userSpaceOnUse" patternTransform="rotate(${rot})"><circle cx="${size / 2}" cy="${size / 2}" r="${r}" fill="${fill}"/></pattern>`;
  return `<defs>
${dots('d1', 6, 1.3, I)}${dots('d2', 4, 1, I)}${dots('d3', 9, 2.6, I)}
${dots('p1', 6, 1.3, P)}${dots('p3', 9, 2.4, P)}${dots('a1', 6, 1.5, A)}
<pattern id="${u}hl" width="5" height="5" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="5" height="1.7" fill="${I}"/></pattern>
<pattern id="${u}hp" width="5" height="5" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="5" height="1.7" fill="${P}"/></pattern>
<pattern id="${u}br" width="60" height="30" patternUnits="userSpaceOnUse"><path d="M0 0H60M0 15H60M0 30H60M0 0V15M30 15V30" stroke="${P}" stroke-opacity=".55" fill="none" stroke-width="1.6"/></pattern>
<clipPath id="${u}cl"><rect width="${W}" height="${H}"/></clipPath>
</defs>`;
}

function rays(cx, cy, n, r0, r1, wid, fill, rot = 0, seed = 1) {
  let s = '';
  for (let i = 0; i < n; i++) {
    const a = rot + (i * Math.PI * 2) / n + (rnd(seed + i) - 0.5) * 0.08;
    const d = wid * (0.5 + rnd(seed * 3 + i));
    const rr0 = r0 * (0.8 + rnd(seed + i * 7) * 0.5);
    const p = (ang, r) => `${(cx + Math.cos(ang) * r).toFixed(1)},${(cy + Math.sin(ang) * r).toFixed(1)}`;
    s += Pg(`${p(a, rr0)} ${p(a - d, r1)} ${p(a + d, r1)}`, fill);
  }
  return s;
}

function burst(cx, cy, n, r1, r2, fill, ex = '', seed = 5) {
  const pts = [];
  for (let i = 0; i < n * 2; i++) {
    const a = (i * Math.PI) / n;
    const r = i % 2 ? r1 : r2 * (0.85 + rnd(seed + i) * 0.3);
    pts.push(`${(cx + Math.cos(a) * r).toFixed(1)},${(cy + Math.sin(a) * r).toFixed(1)}`);
  }
  return Pg(pts.join(' '), fill, ex);
}

// ---------- backgrounds ----------
const BG = {
  'office-night': (u) => {
    let s = R(0, 0, W, H, I);
    s += R(18, 24, 324, 118, P);
    s += R(18, 24, 324, 118, url(u, 'd2'));
    const bl = [[22, 34, 52], [60, 26, 74], [90, 40, 44], [134, 30, 82], [168, 44, 60], [216, 30, 90], [250, 38, 50], [292, 46, 70]];
    for (const [x, w, h] of bl) {
      s += R(x, 142 - h, w, h, I);
      s += R(x + 3, 142 - h + 4, w - 6, h - 8, url(u, 'p3'));
    }
    s += C(300, 58, 18, P, `stroke="${I}" stroke-width="3"`);
    s += C(300, 58, 26, 'none', `stroke="${A}" stroke-width="3"`);
    s += R(122, 24, 8, 118, I) + R(230, 24, 8, 118, I) + R(18, 82, 324, 7, I);
    s += R(18, 24, 324, 118, 'none', `stroke="${P}" stroke-width="5"`);
    // floor perspective
    for (let x = -360; x <= 720; x += 60) s += L(180, 142, x, 270, P, 1, 'opacity=".35"');
    for (const y of [158, 180, 212, 252]) s += L(0, y, W, y, P, 1, 'opacity=".25"');
    // desks + monitors
    s += Pg('0,196 128,196 150,222 0,242', I, `stroke="${P}" stroke-width="2.5"`);
    s += Pg('360,196 232,196 210,222 360,242', I, `stroke="${P}" stroke-width="2.5"`);
    s += R(26, 158, 56, 38, I, `stroke="${P}" stroke-width="2.5"`) + R(31, 163, 46, 28, P) + R(31, 163, 46, 28, url(u, 'd1'));
    s += R(278, 158, 56, 38, I, `stroke="${P}" stroke-width="2.5"`) + R(283, 163, 46, 28, A);
    s += R(0, 0, W, 8, P, 'opacity=".9"') + R(50, 8, 70, 5, P) + R(240, 8, 70, 5, P);
    return s;
  },
  room: (u) => {
    let s = R(0, 0, W, H, P) + R(0, 0, W, 190, url(u, 'd2'));
    s += R(0, 190, W, 80, P) + R(0, 190, W, 80, url(u, 'hl'), 'opacity=".5"') + R(0, 186, W, 6, I);
    s += R(232, 38, 96, 102, I, `stroke="${I}" stroke-width="5"`) + R(236, 42, 88, 94, I);
    s += R(236, 42, 88, 94, url(u, 'p1'), 'opacity=".5"') + C(296, 72, 14, P) + C(303, 67, 12, I);
    s += R(278, 38, 5, 102, P) + R(232, 86, 96, 5, P) + R(232, 38, 96, 102, 'none', `stroke="${I}" stroke-width="6"`);
    // bed
    s += R(10, 140, 150, 60, I) + R(10, 118, 14, 82, I) + R(26, 130, 52, 20, P, `stroke="${I}" stroke-width="4"`);
    s += Pg('26,158 160,150 160,200 10,200', A, `stroke="${I}" stroke-width="4"`);
    // poster + shelf
    s += R(172, 60, 40, 56, P, `stroke="${I}" stroke-width="4"`) + R(180, 70, 24, 24, I) + R(180, 70, 24, 24, url(u, 'p1'));
    s += R(176, 150, 70, 6, I) + R(184, 130, 12, 20, I) + R(204, 136, 16, 14, I);
    return s;
  },
  street: (u) => {
    let s = R(0, 0, W, H, P) + R(0, 0, W, 170, url(u, 'd2'));
    s += R(112, 90, 40, 84, I) + R(160, 64, 54, 110, I) + R(222, 100, 46, 74, I);
    s += R(116, 96, 32, 70, url(u, 'p1')) + R(166, 70, 42, 96, url(u, 'p1')) + R(226, 106, 38, 60, url(u, 'p1'));
    s += Pg('0,0 96,34 96,206 0,246', I, `stroke="${I}"`) + Pg('360,0 264,34 264,206 360,246', I);
    s += Pg('8,30 88,52 88,196 8,222', url(u, 'p3')) + Pg('352,30 272,52 272,196 352,222', url(u, 'p3'));
    s += Pg('0,246 96,206 264,206 360,246 360,270 0,270', P) + Pg('0,246 96,206 264,206 360,246 360,270 0,270', url(u, 'hl'), 'opacity=".4"');
    s += Pg('177,208 183,208 185,222 175,222', I) + Pg('174,232 186,232 190,250 170,250', I) + Pg('168,262 192,262 200,270 160,270', I);
    s += R(298, 86, 5, 128, I) + C(300, 84, 11, A, `stroke="${I}" stroke-width="3"`);
    s += `<path d="M0 60 Q90 80 180 58 T360 54" fill="none" stroke="${I}" stroke-width="2"/>`;
    return s;
  },
  'night-city': (u) => {
    let s = R(0, 0, W, H, I) + R(0, 0, W, 170, url(u, 'p1'), 'opacity=".35"');
    for (let i = 0; i < 26; i++) s += C(Math.round(rnd(i) * W), Math.round(rnd(i + 40) * 120), 0.8 + rnd(i + 9) * 1.2, P);
    s += C(78, 64, 30, P) + C(92, 56, 26, I) + C(78, 64, 38, 'none', `stroke="${A}" stroke-width="2.5"`);
    const far = [[0, 120, 34], [30, 96, 40], [70, 140, 30], [100, 104, 46], [150, 126, 34], [184, 92, 44], [228, 136, 36], [264, 100, 40], [304, 118, 56]];
    for (const [x, y, w] of far) s += R(x, y + 40, w, 270 - y - 40, I) + R(x + 2, y + 42, w - 4, 270 - y - 42, url(u, 'p1'), 'opacity=".55"');
    const near = [[-6, 168, 60], [50, 140, 48], [102, 182, 70], [170, 150, 56], [224, 176, 64], [286, 132, 84]];
    near.forEach(([x, y, w], k) => {
      s += R(x, y, w, 270 - y, I, `stroke="${P}" stroke-width="2"`);
      for (let j = 0; j < 7; j++) {
        const wx = x + 8 + Math.floor(rnd(k * 9 + j) * (w - 18));
        const wy = y + 12 + Math.floor(rnd(k * 5 + j + 3) * (270 - y - 30));
        s += R(wx, wy, 6, 8, rnd(k * 3 + j) > 0.82 ? A : P);
      }
    });
    s += R(0, 264, W, 6, A);
    return s;
  },
  'tower-exterior': (u) => {
    let s = R(0, 0, W, H, P) + R(0, 0, W, H, url(u, 'd2'));
    s += Pg('0,270 0,150 56,126 80,270', I, 'opacity=".9"') + Pg('360,270 360,160 300,132 276,270', I, 'opacity=".9"');
    s += Pg('0,270 0,150 56,126 80,270', url(u, 'p1'), 'opacity=".4"');
    s += Pg('122,270 238,270 208,-4 152,-4', I);
    for (let i = 0; i < 11; i++) {
      const y = 14 + i * 24;
      const t = y / 270;
      const lx = 152 - 30 * t;
      const rx = 208 + 30 * t;
      s += L(lx + 3, y, rx - 3, y, P, 1.5);
      for (let k = 0; k < 3; k++) s += R(lx + 8 + k * ((rx - lx - 24) / 3), y + 6, 10 + t * 4, 10, rnd(i * 3 + k) > 0.8 ? A : P);
    }
    s += L(180, -4, 180, 270, P, 1.2, 'opacity=".4"');
    s += `<path d="M180 -4 l-14 30 l12 0 l-10 28" fill="none" stroke="${A}" stroke-width="5" stroke-linejoin="miter"/>`;
    for (const [x, y, r] of [[60, 60, 24], [300, 90, 28], [100, 160, 18]]) {
      s += C(x, y, r, P, `stroke="${I}" stroke-width="3"`) + C(x + r * 0.9, y + 4, r * 0.8, P, `stroke="${I}" stroke-width="3"`) + C(x + r * 0.7, y + 3, r * 0.7, P);
    }
    return s;
  },
  gate: (u) => {
    let s = R(0, 0, W, H, I) + R(0, 0, W, H, url(u, 'br'));
    s += `<path d="M96 270 V112 Q96 28 180 28 Q264 28 264 112 V270 Z" fill="${I}" stroke="${P}" stroke-width="7"/>`;
    s += `<path d="M110 270 V114 Q110 44 180 44 Q250 44 250 114 V270 Z" fill="${I}"/>`;
    s += `<path d="M110 270 V114 Q110 44 180 44 Q250 44 250 114 V270 Z" fill="${url(u, 'hp')}" opacity=".35"/>`;
    s += Pg('172,44 188,44 196,270 164,270', A);
    s += rays(180, 190, 22, 14, 300, 0.05, A, 0, 11).replace(/fill="#E8391D"/g, `fill="${A}" opacity=".35"`);
    s += R(176, 44, 8, 226, P);
    for (const y of [90, 140, 190, 240]) {
      s += C(150, y, 5, P) + C(210, y, 5, P);
    }
    s += L(110, 120, 168, 120, P, 3) + L(192, 120, 250, 120, P, 3) + L(110, 200, 168, 200, P, 3) + L(192, 200, 250, 200, P, 3);
    s += R(60, 236, 240, 34, I) + R(60, 236, 240, 34, url(u, 'p1'), 'opacity=".6"');
    return s;
  },
  corridor: (u) => {
    let s = R(0, 0, W, H, I);
    for (let k = 0; k < 7; k++) {
      const x = k * 25;
      const y = k * 19;
      const f = k % 2 ? I : P;
      s += R(x, y, W - 2 * x, H - 2 * y, f, `stroke="${I}" stroke-width="2.5"`);
      if (k % 2 === 0) s += R(x, y, W - 2 * x, H - 2 * y, url(u, 'd1'), 'opacity=".8"');
    }
    s += R(150, 112, 60, 62, A, `stroke="${I}" stroke-width="4"`) + R(176, 112, 8, 62, I);
    s += R(160, 4, 40, 6, P) + R(168, 18, 24, 5, P);
    s += Pg('0,0 175,112 175,174 0,270', I, 'opacity=".28"');
    s += Pg('360,0 185,112 185,174 360,270', I, 'opacity=".28"');
    for (const [x1, y1] of [[0, 0], [0, 270], [360, 0], [360, 270]]) s += L(x1, y1, 180, 143, I, 3);
    return s;
  },
  dungeon: (u) => {
    let s = R(0, 0, W, H, I) + R(0, 0, W, H, url(u, 'br'));
    s += `<path d="M20 270 V120 Q20 40 90 40 Q160 40 160 120 V270" fill="none" stroke="${P}" stroke-width="5"/>`;
    s += `<path d="M200 270 V130 Q200 60 270 60 Q340 60 340 130 V270" fill="none" stroke="${P}" stroke-width="5"/>`;
    s += R(34, 120, 112, 150, I) + R(214, 140, 112, 130, I);
    for (const [x, y] of [[176, 88], [352, 96]]) {
      s += R(x, y, 6, 30, P) + `<path d="M${x - 8} ${y} Q${x + 3} ${y - 40} ${x + 14} ${y} Z" fill="${A}" stroke="${P}" stroke-width="2"/>` + `<path d="M${x - 2} ${y} Q${x + 3} ${y - 20} ${x + 8} ${y} Z" fill="${P}"/>`;
    }
    for (let i = 0; i < 6; i++) s += C(60 + i * 8, 20 + i * 14, 4.5, 'none', `stroke="${P}" stroke-width="2.5"`);
    s += R(0, 196, W, 74, url(u, 'p1'), 'opacity=".55"');
    s += Pg('0,270 0,236 360,236 360,270', I, 'opacity=".5"');
    for (const x of [30, 120, 210, 300]) s += L(x, 236, x - 40 + (x % 3) * 10, 270, P, 1.5, 'opacity=".5"');
    return s;
  },
  hall: (u) => {
    let s = R(0, 0, W, H, P) + R(0, 0, W, 170, url(u, 'd1'), 'opacity=".7"');
    s += Pg('0,270 360,270 360,170 0,170', P) + R(0, 170, W, 100, url(u, 'hl'), 'opacity=".25"');
    for (let x = -360; x <= 720; x += 45) s += L(180, 170, x, 270, I, 1.2, 'opacity=".5"');
    for (const y of [176, 188, 206, 234, 270]) s += L(0, y, W, y, I, 1.5, 'opacity=".5"');
    s += Pg('164,170 196,170 262,270 98,270', A, `stroke="${I}" stroke-width="3"`);
    const cols = [[0, 44, 0], [64, 26, 24], [106, 16, 50]];
    for (const [x, w, top] of cols) {
      for (const mx of [x, W - x - w]) {
        s += R(mx, top, w, 180 - top / 4, I) + R(mx - 4, top, w + 8, 10, I) + R(mx - 4, 168 - top / 4, w + 8, 10, I);
        s += L(mx + w * 0.33, top + 14, mx + w * 0.33, 160, P, 1.2) + L(mx + w * 0.66, top + 14, mx + w * 0.66, 160, P, 1.2);
      }
    }
    // throne
    s += Pg('160,170 160,96 172,80 188,80 200,96 200,170', I) + R(150, 160, 60, 14, I) + R(142, 170, 76, 10, I);
    s += C(180, 96, 8, A, `stroke="${P}" stroke-width="2"`);
    return s;
  },
  forest: (u) => {
    let s = R(0, 0, W, H, P) + R(0, 0, W, H, url(u, 'd2'), 'opacity=".8"');
    s += C(250, 58, 26, P, `stroke="${I}" stroke-width="3"`);
    for (const [x, w, h] of [[20, 26, 270], [84, 18, 250], [140, 30, 270], [256, 22, 260], [310, 34, 270]]) {
      s += R(x, 270 - h, w, h, I);
      s += Pg(`${x},${160 - (x % 40)} ${x - 36},${120 - (x % 30)} ${x - 28},${112 - (x % 30)} ${x + 4},${146 - (x % 40)}`, I);
      s += Pg(`${x + w},${120 + (x % 25)} ${x + w + 38},${84 + (x % 25)} ${x + w + 30},${76 + (x % 25)} ${x + w - 4},${108 + (x % 25)}`, I);
      s += C(x + w / 2, 270 - h + 8, 40 + (x % 12), I) + C(x + w / 2 - 20, 270 - h + 24, 30, url(u, 'd3'));
    }
    s += `<ellipse cx="190" cy="214" rx="120" ry="22" fill="${P}" opacity=".85"/>`;
    s += `<ellipse cx="80" cy="244" rx="110" ry="18" fill="${P}" opacity=".8"/>`;
    s += R(0, 252, W, 18, I);
    s += `<ellipse cx="206" cy="150" rx="5" ry="3" fill="${A}"/><ellipse cx="222" cy="150" rx="5" ry="3" fill="${A}"/>`;
    return s;
  },
  sky: (u) => {
    let s = R(0, 0, W, H, P) + R(0, 0, W, 70, url(u, 'd3')) + R(0, 70, W, 70, url(u, 'd1')) + R(0, 140, W, 60, url(u, 'd2'));
    s += rays(250, 80, 28, 38, 360, 0.04, I, 0, 3);
    s += C(250, 80, 44, A, `stroke="${I}" stroke-width="5"`);
    const clouds = [[70, 190, 1], [220, 220, 1.3], [320, 160, 0.8]];
    let c1 = '';
    let c2 = '';
    for (const [x, y, k] of clouds) {
      for (const [dx, dy, r] of [[0, 0, 26], [26, -10, 30], [58, 2, 24], [30, 10, 24]]) {
        c1 += C(x + dx * k, y + dy * k, r * k + 3, I);
        c2 += C(x + dx * k, y + dy * k, r * k, P);
      }
    }
    return s + c1 + c2;
  },
  black: (u) => R(0, 0, W, H, I) + R(0, 0, W, H, url(u, 'p1'), 'opacity=".1"') + Pg('0,0 70,0 0,60', url(u, 'hp'), 'opacity=".5"') + Pg('360,270 290,270 360,210', url(u, 'hp'), 'opacity=".5"'),
  white: (u) => R(0, 0, W, H, P) + Pg('0,0 90,0 0,70', url(u, 'd1'), 'opacity=".5"') + Pg('360,270 270,270 360,200', url(u, 'd1'), 'opacity=".5"') + L(0, 135, 40, 135, I, 2) + L(320, 135, 360, 135, I, 2),
  flash: (u) => {
    let s = R(0, 0, W, H, P) + rays(180, 135, 44, 40, 330, 0.05, I, 0, 21);
    s += burst(180, 135, 14, 40, 62, P, `stroke="${I}" stroke-width="4"`);
    s += burst(180, 135, 10, 20, 34, A, `stroke="${I}" stroke-width="3"`, 9);
    return s;
  },
};
export const bgIds = Object.keys(BG);
const DARK = new Set(['office-night', 'night-city', 'gate', 'corridor', 'dungeon', 'black']);

// ---------- characters ----------
// Shapes are drawn in local coords: origin at feet centre, head near y=-175.
const FIG = {
  'male-young': {
    s: 1,
    body: `<circle cx="0" cy="-150" r="17"/><path d="M-19 -152 L-15 -173 L-6 -163 L0 -178 L7 -163 L16 -172 L19 -150 Z"/>
<path d="M-37 -128 Q-40 -135 -20 -135 L20 -135 Q40 -135 37 -128 L31 -60 L-31 -60 Z"/>
<path d="M-37 -128 L-47 -66 L-36 -63 L-28 -108 Z"/><path d="M37 -128 L47 -66 L36 -63 L28 -108 Z"/>
<path d="M-27 -62 L-25 0 L-3 0 L-2 -62 Z"/><path d="M2 -62 L3 0 L25 0 L27 -62 Z"/>`,
    detail: `<path d="M-6 -135 L6 -135 L4 -104 L0 -98 L-4 -104 Z" fill="${A}"/>`,
  },
  'female-young': {
    s: 1,
    body: `<circle cx="0" cy="-150" r="16"/><path d="M-20 -150 Q-26 -178 0 -178 Q26 -178 20 -150 L28 -92 Q10 -104 0 -104 Q-10 -104 -28 -92 Z"/>
<path d="M-22 -134 L22 -134 L18 -92 L38 -30 L-38 -30 L-18 -92 Z"/>
<path d="M-22 -132 L-34 -74 L-25 -71 L-15 -104 Z"/><path d="M22 -132 L34 -74 L25 -71 L15 -104 Z"/>
<path d="M-15 -32 L-13 0 L-4 0 L-4 -32 Z"/><path d="M4 -32 L4 0 L13 0 L15 -32 Z"/>`,
    detail: `<path d="M-14 -166 L-4 -160 L-14 -154 Z M14 -166 L4 -160 L14 -154 Z" fill="${A}"/><circle cx="0" cy="-160" r="3" fill="${A}"/>`,
  },
  'male-large': {
    s: 1,
    body: `<circle cx="0" cy="-156" r="19"/><path d="M-22 -162 L-18 -180 L0 -184 L18 -180 L22 -162 L16 -170 L-16 -170 Z"/>
<path d="M-62 -134 Q-66 -142 -30 -142 L30 -142 Q66 -142 62 -134 L48 -52 L-48 -52 Z"/>
<path d="M-62 -134 L-74 -60 L-56 -56 L-46 -108 Z"/><path d="M62 -134 L74 -60 L56 -56 L46 -108 Z"/>
<path d="M-44 -54 L-40 0 L-6 0 L-4 -54 Z"/><path d="M4 -54 L6 0 L40 0 L44 -54 Z"/>`,
    detail: `<path d="M-48 -122 L48 -122 L46 -112 L-46 -112 Z" fill="${A}"/>`,
  },
  hooded: {
    s: 1,
    body: `<path d="M0 -184 Q-34 -176 -36 -132 L-52 0 L52 0 L36 -132 Q34 -176 0 -184 Z"/>`,
    detail: `<path d="M-16 -150 Q0 -176 16 -150 Q14 -126 0 -120 Q-14 -126 -16 -150 Z" fill="${I}" stroke="${P}" stroke-width="2"/><path d="M-10 -150 l8 3 l-8 1 Z M10 -150 l-8 3 l8 1 Z" fill="${A}" stroke="${A}" stroke-width="2"/>`,
  },
  child: {
    s: 1,
    body: `<circle cx="0" cy="-102" r="17"/><path d="M-17 -108 Q-16 -124 0 -122 Q16 -124 17 -108 L8 -112 L-4 -114 Z"/>
<path d="M-22 -84 L22 -84 L26 -34 L-26 -34 Z"/><path d="M-22 -82 L-32 -44 L-24 -41 L-16 -66 Z"/><path d="M22 -82 L32 -44 L24 -41 L16 -66 Z"/>
<path d="M-16 -36 L-15 0 L-3 0 L-3 -36 Z"/><path d="M3 -36 L3 0 L15 0 L16 -36 Z"/>`,
    detail: `<rect x="-20" y="-84" width="40" height="8" fill="${A}"/>`,
  },
  monster: {
    s: 1.15,
    body: `<path d="M-74 0 L-64 -72 L-84 -112 L-60 -102 L-52 -152 L-36 -122 L-28 -176 L-12 -134 L0 -190 L12 -134 L28 -176 L36 -122 L52 -152 L60 -102 L84 -112 L64 -72 L74 0 Z"/>`,
    detail: `<path d="M-30 -120 l16 6 l-14 4 Z M30 -120 l-16 6 l14 4 Z" fill="${A}" stroke="${A}" stroke-width="3"/><circle cx="0" cy="-138" r="5" fill="${A}"/><path d="M-26 -92 L-18 -82 L-10 -92 L-2 -82 L6 -92 L14 -82 L22 -92 L26 -88 L22 -96 L-26 -96 Z" fill="${P}"/>`,
  },
};

function figure(type, x, scale = 1) {
  if (type === 'system') {
    return `<g transform="translate(${x},118)"><polygon points="0,-48 44,0 0,48 -44,0" fill="${I}" stroke="${A}" stroke-width="5"/><polygon points="0,-32 29,0 0,32 -29,0" fill="none" stroke="${P}" stroke-width="2"/><rect x="-3.5" y="-17" width="7" height="22" fill="${A}"/><rect x="-3.5" y="10" width="7" height="7" fill="${A}"/></g>`;
  }
  const f = FIG[type] || FIG['male-young'];
  const sc = (f.s || 1) * scale;
  return `<g transform="translate(${x},276) scale(${sc})"><g fill="${P}" stroke="${P}" stroke-width="8" stroke-linejoin="round">${f.body}</g><g fill="${I}">${f.body}</g>${f.detail || ''}</g>`;
}

const POSX = { left: 92, center: 180, right: 268 };

function cast(panel, chars) {
  const used = {};
  let s = '';
  const list = (panel.cast || []).slice();
  // draw centre first so side figures overlap it slightly
  list.sort((a, b) => (a.pos === 'center' ? -1 : 0) - (b.pos === 'center' ? -1 : 0));
  for (const c of list) {
    const ch = chars && chars.get ? chars.get(c.id) : null;
    const pos = POSX[c.pos] ? c.pos : 'center';
    const n = (used[pos] = (used[pos] || 0) + 1) - 1;
    const x = POSX[pos] + (n % 2 ? 1 : -1) * Math.ceil(n / 2) * 34;
    s += figure(ch ? ch.silhouette : 'male-young', x, list.length > 2 ? 0.88 : 1);
  }
  return s;
}

function sfxSVG(text, panel) {
  const t = String(text).toUpperCase();
  const size = Math.max(24, Math.min(58, Math.floor(210 / (t.length * 0.55 + 0.3))));
  const hasRight = (panel.cast || []).some((c) => c.pos === 'right');
  const x = hasRight ? 122 : 232;
  const y = 74;
  const ff = `font-family="'Avenir Next Condensed','DIN Condensed','Arial Narrow',Impact,sans-serif" font-weight="900" text-anchor="middle" font-size="${size}"`;
  const safe = esc(t);
  return `<g transform="translate(${x},${y}) rotate(-9)">
<text ${ff} x="4" y="5" fill="${I}" stroke="${I}" stroke-width="9" stroke-linejoin="round">${safe}</text>
<text ${ff} x="0" y="0" fill="${A}" stroke="${P}" stroke-width="7" stroke-linejoin="round" style="paint-order:stroke">${safe}</text></g>`;
}

export function renderPanelArt(panel, chars) {
  const u = 'a' + ++uidc + '_';
  const bgId = BG[panel.bg] ? panel.bg : 'black';
  const dark = DARK.has(bgId);
  let s = `<svg class="art-svg" viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">`;
  s += defs(u);
  s += `<g clip-path="url(#${u}cl)">`;
  s += BG[bgId](u);
  if (panel.mood === 'action') s += rays(180, 150, 54, 78, 330, 0.035, dark ? P : I, 0.1, 7).replace(/<polygon /g, '<polygon opacity=".92" ');
  s += cast(panel, chars);
  if (panel.mood === 'tense') {
    const hp = url(u, dark ? 'hp' : 'hl');
    s += Pg('0,0 120,0 0,92', hp, 'opacity=".75"') + Pg('360,0 240,0 360,92', hp, 'opacity=".75"');
    s += R(0, 0, W, 12, I) + R(0, H - 12, W, 12, I);
  }
  if (panel.sfx) s += sfxSVG(panel.sfx, panel);
  s += '</g></svg>';
  return s;
}

// Small demo art used on onboarding screens.
export function demoArt(kind) {
  const map = {
    door: { bg: 'corridor', mood: 'tense', sfx: null, cast: [{ id: 'x', pos: 'left' }] },
    city: { bg: 'night-city', mood: 'calm', sfx: null, cast: [{ id: 'x', pos: 'center' }] },
    boom: { bg: 'flash', mood: 'action', sfx: 'BOOM', cast: [{ id: 'm', pos: 'right' }] },
  };
  const fakeChars = new Map([
    ['x', { silhouette: 'hooded' }],
    ['m', { silhouette: 'monster' }],
  ]);
  return renderPanelArt(map[kind] || map.city, fakeChars);
}
