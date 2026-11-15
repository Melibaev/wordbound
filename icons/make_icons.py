"""Generate WORDBOUND PNG icons with the stdlib only.  Run: python make_icons.py"""
import math
import os
import struct
import zlib

INK = (17, 17, 17)
PAPER = (244, 240, 230)
ACCENT = (232, 57, 29)

W_PTS = [(0.22, 0.31), (0.36, 0.70), (0.50, 0.42), (0.64, 0.70), (0.78, 0.31)]
STROKE = 0.115


def seg_dist(px, py, a, b):
    ax, ay = a
    bx, by = b
    dx, dy = bx - ax, by - ay
    t = ((px - ax) * dx + (py - ay) * dy) / (dx * dx + dy * dy)
    t = max(0.0, min(1.0, t))
    cx, cy = ax + t * dx, ay + t * dy
    return math.hypot(px - cx, py - cy)


def in_w(x, y, ox=0.0, oy=0.0):
    for a, b in zip(W_PTS, W_PTS[1:]):
        if seg_dist(x - ox, y - oy, a, b) <= STROKE / 2:
            return True
    return False


def sample(x, y):
    """Colour at unit coords (x, y)."""
    # halftone dots, bottom-right corner
    g = 0.045
    if x + y > 1.15:
        cx = (math.floor(x / g) + 0.5) * g
        cy = (math.floor(y / g) + 0.5) * g
        r = g * 0.42 * min(1.0, (x + y - 1.15) / 0.55)
        if math.hypot(x - cx, y - cy) < r:
            return (60, 56, 50)
    if in_w(x, y):
        return PAPER
    if in_w(x, y, 0.028, 0.028):
        return ACCENT
    # accent bar under the W
    if 0.24 <= x <= 0.76 and 0.80 <= y <= 0.835:
        return ACCENT
    return INK


def render(n, ss=2):
    rows = []
    for j in range(n):
        row = bytearray([0])
        for i in range(n):
            r = g = b = 0
            for sj in range(ss):
                for si in range(ss):
                    c = sample((i + (si + 0.5) / ss) / n, (j + (sj + 0.5) / ss) / n)
                    r += c[0]
                    g += c[1]
                    b += c[2]
            k = ss * ss
            row += bytes((r // k, g // k, b // k))
        rows.append(bytes(row))
    return b''.join(rows)


def png(n):
    raw = render(n)

    def chunk(tag, data):
        c = struct.pack('>I', len(data)) + tag + data
        return c + struct.pack('>I', zlib.crc32(tag + data) & 0xFFFFFFFF)

    return (
        b'\x89PNG\r\n\x1a\n'
        + chunk(b'IHDR', struct.pack('>IIBBBBB', n, n, 8, 2, 0, 0, 0))
        + chunk(b'IDAT', zlib.compress(raw, 9))
        + chunk(b'IEND', b'')
    )


if __name__ == '__main__':
    here = os.path.dirname(os.path.abspath(__file__))
    for name, n in (('apple-touch-icon.png', 180), ('icon-192.png', 192), ('icon-512.png', 512)):
        with open(os.path.join(here, name), 'wb') as f:
            f.write(png(n))
        print('wrote', name)
