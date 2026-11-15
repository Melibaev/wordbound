#!/usr/bin/env python3
"""Import manually downloaded panel images/videos into art/<episodeId>/.

    python tools/art/import_art.py <folder> <episodeId> [--start NN] [--dry-run] [--order auto|mtime|number|name]
    python tools/art/import_art.py - s1e01 --video 17 clip.mp4        # video only
    python tools/art/import_art.py <folder> --refs dan                # one image -> art/refs/dan.jpg

Ordering of the files in <folder> (png/jpg/jpeg/webp):
  auto   (default) numeric order if EVERY file name has exactly one short number (1-3 digits, e.g. "panel 7.png"),
         otherwise by modified time, oldest first (= the order you downloaded them);
  mtime / number / name  force one of them.
Files are mapped in order to panels START, START+1, ... (default START=1).
Each image becomes 1080px-wide JPEG (quality ~82, lowered stepwise to fit 250 KB, metadata stripped).
"""
import argparse
import os
import re
import shutil
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import common as C  # noqa: E402

EXT = (".png", ".jpg", ".jpeg", ".webp")


def short_number(name):
    nums = re.findall(r"\d+", os.path.splitext(name)[0])
    return int(nums[0]) if len(nums) == 1 and len(nums[0]) <= 3 else None


def order_files(files, mode):
    if mode == "auto":
        mode = "number" if files and all(short_number(os.path.basename(f)) is not None for f in files) else "mtime"
    if mode == "number":
        return sorted(files, key=lambda f: (short_number(os.path.basename(f)) or 0, f)), mode
    if mode == "name":
        return sorted(files, key=lambda f: os.path.basename(f).lower()), mode
    return sorted(files, key=lambda f: (os.path.getmtime(f), f)), mode


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("folder", help="folder with downloaded images, or - for none")
    ap.add_argument("episode", nargs="?", help="episode id, e.g. s1e01")
    ap.add_argument("--start", type=int, default=1, help="panel number for the first file (default 1)")
    ap.add_argument("--dry-run", action="store_true")
    ap.add_argument("--order", choices=["auto", "mtime", "number", "name"], default="auto")
    ap.add_argument("--video", nargs=2, action="append", metavar=("NN", "FILE.mp4"), default=[],
                    help="copy a video to art/<ep>/NN.mp4 (repeatable)")
    ap.add_argument("--refs", metavar="CHAR_ID", help="import the single image in <folder> as art/refs/<id>.jpg")
    a = ap.parse_args()

    if a.refs:
        files = [os.path.join(a.folder, f) for f in os.listdir(a.folder) if f.lower().endswith(EXT)]
        files, _ = order_files(files, "mtime")
        if not files:
            C.die("no images in " + a.folder)
        src = files[-1]  # newest
        dst = os.path.join(C.REFS, a.refs + ".jpg")
        print("%s -> %s%s" % (os.path.basename(src), os.path.relpath(dst, C.ROOT), "  [dry-run]" if a.dry_run else ""))
        if not a.dry_run:
            size, q, wh = C.save_jpeg_to(src, dst)
            print("  %dx%d, %d KB, q=%d" % (wh[0], wh[1], size // 1024, q))
        return

    if not a.episode:
        C.die("episode id is required")
    eid = a.episode
    ep = C.load_episode(eid)
    npanels = len(ep.get("panels", []))
    done = False

    if a.folder != "-":
        if not os.path.isdir(a.folder):
            C.die("folder not found: " + a.folder)
        files = [os.path.join(a.folder, f) for f in os.listdir(a.folder) if f.lower().endswith(EXT)]
        files, mode = order_files(files, a.order)
        print("%d image(s), order: %s, panels %d..%d of %d" % (len(files), mode, a.start, a.start + len(files) - 1, npanels))
        for k, src in enumerate(files):
            n = a.start + k
            if n > npanels:
                print("  SKIP %s: panel %d does not exist (episode has %d panels)" % (os.path.basename(src), n, npanels))
                continue
            dst = "art/%s/%02d.jpg" % (eid, n)
            if a.dry_run:
                print("  %s -> %s  [dry-run]" % (os.path.basename(src), dst))
                continue
            p, size, q, wh = C.save_panel_jpeg(src, eid, n)
            warn = ""
            if abs(wh[0] / wh[1] - 0.8) > 0.03:
                warn += "  WARN: aspect %.2f, not 4:5 (it will be cropped by the reader)" % (wh[0] / wh[1])
            if size > 250 * 1024:
                warn += "  WARN: still > 250 KB"
            print("  %s -> %s  %dx%d, %d KB, q=%d%s" % (os.path.basename(src), dst, wh[0], wh[1], size // 1024, q, warn))
            done = True

    for nn, vf in a.video:
        n = int(nn)
        if not vf.lower().endswith(".mp4") or not os.path.isfile(vf):
            C.die("video must be an existing .mp4 file: " + vf)
        if not 1 <= n <= npanels:
            C.die("video panel %d out of range 1..%d" % (n, npanels))
        dst = os.path.join(C.ART, eid, "%02d.mp4" % n)
        mb = os.path.getsize(vf) / 1048576
        print("  %s -> art/%s/%02d.mp4  %.1f MB%s" % (os.path.basename(vf), eid, n, mb, "  [dry-run]" if a.dry_run else ""))
        if mb > 4:
            print("  WARN: video is larger than 4 MB, consider a shorter or lower-resolution clip")
        if not a.dry_run:
            os.makedirs(os.path.dirname(dst), exist_ok=True)
            shutil.copyfile(vf, dst)
            done = True

    if done and not a.dry_run:
        m = C.update_manifest(eid)
        print("art/manifest.json updated:", m)


if __name__ == "__main__":
    main()
