#!/usr/bin/env python3
"""cmudict -> data/pron.json: {wordId: "ˈoʊ.pən"} for base words in data/words.json.
Needs .models/cmudict.dict (https://github.com/cmusphinx/cmudict). Stdlib only."""
import json, os, re, sys

ROOT = os.path.abspath(os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", ".."))
IPA = {
    "AA": "ɑ", "AE": "æ", "AH": "ʌ", "AO": "ɔ", "AW": "aʊ", "AY": "aɪ", "EH": "ɛ", "ER": "ɝ", "EY": "eɪ",
    "IH": "ɪ", "IY": "i", "OW": "oʊ", "OY": "ɔɪ", "UH": "ʊ", "UW": "u",
    "B": "b", "CH": "tʃ", "D": "d", "DH": "ð", "F": "f", "G": "ɡ", "HH": "h", "JH": "dʒ", "K": "k", "L": "l",
    "M": "m", "N": "n", "NG": "ŋ", "P": "p", "R": "ɹ", "S": "s", "SH": "ʃ", "T": "t", "TH": "θ", "V": "v",
    "W": "w", "Y": "j", "Z": "z", "ZH": "ʒ",
}
ONSETS = {("P", "R"), ("P", "L"), ("B", "R"), ("B", "L"), ("T", "R"), ("D", "R"), ("K", "R"), ("K", "L"), ("G", "R"),
          ("G", "L"), ("F", "R"), ("F", "L"), ("TH", "R"), ("SH", "R"), ("S", "P"), ("S", "T"), ("S", "K"), ("S", "M"),
          ("S", "N"), ("S", "L"), ("S", "W"), ("T", "W"), ("K", "W"), ("D", "W"), ("HH", "Y"), ("S", "P", "R"),
          ("S", "T", "R"), ("S", "K", "R"), ("S", "P", "L"), ("S", "K", "W"), ("S", "F"), ("S", "K", "L")}


def convert(phones):
    syl = []  # list of dict(on=[], nu=(ph,stress), co=[])
    cons = []
    for p in phones:
        m = re.fullmatch(r"([A-Z]+)(\d)?", p)
        ph, st = m.group(1), m.group(2)
        if st is None:
            cons.append(ph)
            continue
        # split pending consonants into coda of previous + onset of this
        if not syl:
            on, co = cons, []
        else:
            # longest legal onset suffix
            take = 0
            for n in range(min(3, len(cons)), 0, -1):
                suf = tuple(cons[len(cons) - n:])
                if n == 1 or suf in ONSETS:
                    take = n
                    break
            on, co = cons[len(cons) - take:], cons[:len(cons) - take]
            syl[-1]["co"] = co
        syl.append({"on": on, "nu": (ph, st), "co": []})
        cons = []
    if syl:
        syl[-1]["co"] = cons
    out = []
    multi = len(syl) > 1
    for s in syl:
        txt = "".join(IPA[x] for x in s["on"]) + IPA[s["nu"][0]] + "".join(IPA[x] for x in s["co"])
        mark = ""
        if multi and s["nu"][1] == "1":
            mark = "ˈ"
        elif multi and s["nu"][1] == "2":
            mark = "ˌ"
        if s["nu"][0] == "AH" and s["nu"][1] == "0":
            txt = txt.replace("ʌ", "ə")
        if s["nu"][0] == "ER" and s["nu"][1] == "0":
            txt = txt.replace("ɝ", "ɚ")
        out.append(mark + txt)
    return ".".join(out)


def main():
    sys.stdout.reconfigure(encoding="utf-8")
    d = {}
    with open(os.path.join(ROOT, ".models", "cmudict.dict"), encoding="latin-1") as f:
        for line in f:
            parts = line.split()
            if len(parts) < 2:
                continue
            w = parts[0]
            if "(" in w:
                continue  # keep first pronunciation only
            d.setdefault(w, parts[1:])
    words = json.load(open(os.path.join(ROOT, "data", "words.json"), encoding="utf-8"))
    res = {}
    for w in words:
        toks = re.findall(r"[a-z']+", w["w"].lower())
        if not toks or not all(t in d for t in toks):
            continue
        res[w["id"]] = " ".join(convert(d[t]) for t in toks)
    with open(os.path.join(ROOT, "data", "pron.json"), "w", encoding="utf-8") as f:
        json.dump(res, f, ensure_ascii=False, indent=0, sort_keys=True)
    print("pron.json: %d of %d words" % (len(res), len(words)))
    for k in ("open", "door", "weak", "tired", "keeper"):
        print(k, res.get(k))


main()
