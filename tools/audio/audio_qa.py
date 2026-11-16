#!/usr/bin/env python3
"""Audio QA ("ears"): transcribe with faster-whisper (small.en) and measure prosody.
Run inside the Chatterbox venv:  .models/cbenv/Scripts/python tools/audio/audio_qa.py file.mp3 "expected text"
Library use: from audio_qa import analyse; analyse(y, sr, text) -> dict
"""
import re, sys, os, numpy as np

_W = None
ROOT = os.path.abspath(os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", ".."))


def whisper():
    global _W
    if _W is None:
        from faster_whisper import WhisperModel
        dev = os.environ.get("WB_WHISPER_DEVICE", "cuda")
        if dev == "cuda":
            # cuBLAS/cuDNN come from pip (nvidia-cublas-cu12, nvidia-cudnn-cu12) — expose their DLLs on Windows.
            import site
            for sp in site.getsitepackages():
                for sub in ("cublas", "cudnn", "cuda_nvrtc"):
                    d = os.path.join(sp, "nvidia", sub, "bin")
                    if os.path.isdir(d):
                        os.add_dll_directory(d)
                        os.environ["PATH"] = d + os.pathsep + os.environ.get("PATH", "")
            try:
                _W = WhisperModel("small.en", device="cuda", compute_type="int8_float16",
                                  download_root=os.path.join(ROOT, ".models", "whisper"))
                return _W
            except Exception as e:  # fall back to CPU if CUDA libs or VRAM are missing
                print("whisper: CUDA unavailable, using CPU:", str(e)[:120])
        _W = WhisperModel("small.en", device="cpu", compute_type="int8", cpu_threads=6,
                          download_root=os.path.join(ROOT, ".models", "whisper"))
    return _W


_ONES = "zero one two three four five six seven eight nine ten eleven twelve thirteen fourteen fifteen sixteen seventeen eighteen nineteen".split()
_TENS = "x x twenty thirty forty fifty sixty seventy eighty ninety".split()
_NUM = {str(i): w for i, w in enumerate(_ONES)}
for _t in range(20, 100):
    _NUM[str(_t)] = _TENS[_t // 10] + ("" if _t % 10 == 0 else " " + _ONES[_t % 10])
_ALIAS = {"ok": "okay", "lena": "lina", "mom": "mom", "mum": "mom", "ahh": "ah", "uh": "", "um": "", "hmm": "", "mhm": ""}


def norm(t):
    t = t.lower().replace("’", "'")
    t = re.sub(r"[^a-z0-9' ]+", " ", t)
    w = " ".join(_NUM.get(x, x) for x in t.split()).split()
    w = [_ALIAS.get(x, x) for x in w]
    return [x for x in w if x]


def wer(ref, hyp):
    r, h = norm(ref), norm(hyp)
    if not r:
        return 0.0
    d = list(range(len(h) + 1))
    for i in range(1, len(r) + 1):
        p, d[0] = d[0], i
        for j in range(1, len(h) + 1):
            c = d[j]
            d[j] = min(d[j] + 1, d[j - 1] + 1, p + (r[i - 1] != h[j - 1]))
            p = c
    return d[len(h)] / len(r)


def transcribe(y, sr):
    import librosa
    y16 = librosa.resample(y.astype("float32"), orig_sr=sr, target_sr=16000)
    segs, _ = whisper().transcribe(y16, language="en", beam_size=5, vad_filter=False)
    return " ".join(s.text.strip() for s in segs).strip()


def analyse(y, sr, text=None, do_asr=True):
    import librosa
    y = np.asarray(y, dtype="float32")
    dur = len(y) / sr
    out = {"dur": dur, "peak": float(np.abs(y).max()) if len(y) else 0.0}
    rms = librosa.feature.rms(y=y, frame_length=1024, hop_length=256)[0]
    act = rms > max(0.01, rms.max() * 0.1)
    idx = np.where(act)[0]
    if len(idx):
        out["lead"] = idx[0] * 256 / sr
        out["trail"] = dur - (idx[-1] + 1) * 256 / sr
    else:
        out["lead"] = out["trail"] = dur
    ra = rms[act] if act.any() else rms
    out["rms_db"] = float(20 * np.log10(np.mean(ra ** 2) ** 0.5 + 1e-9))
    out["dyn_db"] = float(20 * np.log10((np.percentile(ra, 95) + 1e-9) / (np.percentile(ra, 10) + 1e-9)))
    out["clip_frac"] = float(np.mean(np.abs(y) > 0.99))
    # F0: energy-gated YIN median (robust on whispery / FX-processed voices), pyin as a cross-check
    f = librosa.yin(y, fmin=70, fmax=500, sr=sr, frame_length=2048)
    r2 = librosa.feature.rms(y=y, frame_length=2048, hop_length=512)[0]
    n = min(len(f), len(r2))
    g = f[:n][r2[:n] > r2.max() * 0.25]
    if len(g) > 5:
        out["f0"] = float(np.median(g))
        out["f0_range_st"] = float(12 * np.log2(np.percentile(g, 90) / np.percentile(g, 10)))
    else:
        out["f0"], out["f0_range_st"] = 0.0, 0.0
    if text:
        out["cps"] = len(text) / max(0.1, dur - out["lead"] - out["trail"])
    if do_asr and text:
        hyp = transcribe(y, sr)
        out["hyp"] = hyp
        out["wer"] = wer(text, hyp)
    return out


def fmt(r):
    return ("dur %.2fs  wer %s  cps %.1f  f0 %.0fHz (range %.1f st)  rms %.1f dB  dyn %.1f dB  peak %.2f  lead/trail %.2f/%.2f" % (
        r["dur"], ("%.2f" % r["wer"]) if "wer" in r else "-", r.get("cps", 0), r["f0"], r["f0_range_st"],
        r["rms_db"], r["dyn_db"], r["peak"], r["lead"], r["trail"]))


if __name__ == "__main__":
    import librosa
    p = sys.argv[1]
    text = sys.argv[2] if len(sys.argv) > 2 else None
    y, sr = librosa.load(p, sr=None, mono=True)
    r = analyse(y, sr, text)
    print(fmt(r))
    if "hyp" in r:
        print("heard:", r["hyp"])
