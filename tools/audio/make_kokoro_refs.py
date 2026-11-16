#!/usr/bin/env python3
"""Make short reference clips with Kokoro for voices that have no Gemini casting clip
(trader, lina_human, narration). Run with the MAIN python (kokoro_onnx lives there).
Writes .models/cb_refs/src/<name>.wav"""
import os, wave, numpy as np
from kokoro_onnx import Kokoro
ROOT = os.path.abspath(os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", ".."))
M = os.path.join(ROOT, ".models")
OUT = os.path.join(M, "cb_refs", "src")
os.makedirs(OUT, exist_ok=True)
k = Kokoro(os.path.join(M, "kokoro-v1.0.onnx"), os.path.join(M, "voices-v1.0.bin"))
T = ("The market opens at dawn. I have ink, bread and good news for you today. "
     "Come closer and look. Nobody here will trick you, my friend. This is a fair price.")
J = {"trader": ("am_fenrir", 0.95, "en-us"), "lina": ("af_sky", 1.0, "en-us"),
     "narr": ("bf_emma", 0.97, "en-gb"), "pipk": ("am_puck", 1.1, "en-us")}
for n, (v, s, lang) in J.items():
    a, sr = k.create(T, voice=v, speed=s, lang=lang)
    with wave.open(os.path.join(OUT, n + ".wav"), "wb") as w:
        w.setnchannels(1); w.setsampwidth(2); w.setframerate(sr)
        w.writeframes((np.clip(a, -1, 1) * 32767).astype("<i2").tobytes())
    print(n, len(a) / sr)
