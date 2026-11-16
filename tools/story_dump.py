#!/usr/bin/env python3
"""Build story/STORY.md: ONE file with the whole WORDBOUND story in full detail.

    python tools/story_dump.py

Reads (read-only): story/bible.md, story/synopses.json, story/shots.json,
data/story.json, data/episodes/*.json, art/manifest.json.  Writes: story/STORY.md.
Re-run after any change to the story data.
"""
import json
import os
import sys

ROOT = os.path.abspath(os.path.join(os.path.dirname(os.path.abspath(__file__)), ".."))
STORY_DIR = os.path.join(ROOT, "story")
DATA = os.path.join(ROOT, "data")

for _s in (sys.stdout, sys.stderr):
    try:
        _s.reconfigure(encoding="utf-8", errors="replace")
    except Exception:
        pass


def load(path, default=None):
    try:
        with open(path, encoding="utf-8") as f:
            return json.load(f)
    except (OSError, ValueError):
        return default


def read_text(path):
    with open(path, encoding="utf-8") as f:
        return f.read().rstrip("\n")


TYPE_RU = {
    "speech": "речь", "shout": "крик", "thought": "мысль", "system": "Система",
    "narration": "рассказчик", "narration-ru": "рассказчик (RU)",
}

PLANNED = [
    ("E6", "The Stair of Echoes (Лестница эха)", "Дэн и Мира поднимаются молча, общаясь жестами и чертежами; Пип продаёт «тишину» и выдаёт, что Мира «продала сестру»; Мира падает — у неё осталось два слова дыхания."),
    ("E7", "The Ink Market (Рынок Чернил)", "Дэн чинит рушащуюся крышу ларька и получает слово REST; на рынке продают его телефон с голосом мамы; торговец упоминает девочку, которая напевает, — Лина рядом."),
    ("E8", "Lina (Лина)", "Флэшбек в тёплой «бумажной» палитре: день входа в Башню, сделка с Хранителем, «Zero can pass the door»; Дэн понимает, что был инструментом; ссора; Эхо Лины уводит его к Стене Букв."),
    ("E9", "The Wall of Letters (Стена Букв)", "Дэн один у стены украденных слов — Башня оказывается незаконченным предложением «I AM ...»; на стене вспыхивает «DAN» и стена повторяет его голосом."),
    ("E10", "The First Sentence (Первое предложение)", "Дэн понимает, что предложения сильнее и дешевле слов, и открывает вторую дверь фразой «I open the door»; появляется Хранитель и забирает у Миры слово «Mira»."),
    ("E11", "The Keeper's Door (Дверь Хранителя)", "Хранитель — первый Zero; дверь домой открывается предложением и двумя людьми (тот, кто помнит, и тот, кто зовёт); он предлагает Дэну билет домой за имя «Mira»; последний кадр — рука Дэна на двери в офис и голос Миры: «Zero. Go.»"),
    ("E12", "Sister (Сестра)", "Дэн не уходит, создаёт собственную дверь, говорит Лине слово «sister», Мира получает слово обратно; Система при Count 100 отвечает «Why me?»; последняя дверь ведёт на Этаж Второй; финальный телефонный звонок голосом мамы — это Башня."),
]

OPEN_THREADS = [
    "Имя «Dan» — Хранитель вернул его Дэну за OPEN; Безмолвный всё ещё носит украденное «I am Dan» и может проходить Ворота вместо владельца.",
    "Слово OPEN теперь у Хранителя; у Дэна есть PUSH (E5) и STOP (E3); Count вырастет до 100 только к E12; в E4 Система говорит «Count: zero. Again.» — Дэн после обмена остался с именем, но без OPEN.",
    "Красный шнурок на ЛЕВОМ запястье Миры — пара у Лины; страж у последней двери (голос Лины) носит обрывок такого же шнурка. Мира не может произнести и не слышит слово «sister».",
    "Фреска в Зале Слушающих: две девочки, у меньшей красный шнурок; царапины имён в комнате с лампой (одно — «LINA»).",
    "Телефон Дэна (девять пропущенных от мамы, «Dan, eat something») упал в E1; вернётся в E7 (голос мамы на рынке) и в финале E12 (Башня выучила голос).",
    "Хранитель — первый Zero, ему нужна Запечатанная дверь домой; в конце E4 он говорит Дэну «I need one more word» — слово не названо, развязка в E10–E11 (по библии он забирает слово у Миры).",
    "Система: «Ask me later / ask me when you have 100 words»; ответ на «Why me?» — в E12; пока она отвечает только короткими фразами.",
    "Правила, которые нельзя ломать: Безмолвные слышат, но не видят; не входят в свет связанного слова; забирают слова только у выдохшихся; Дэн и Мира говорят короткими фразами (E1 2–5 слов, E5 до ~7).",
    "Визуал: у Дэна на лице только круглые чёрные очки (скотч лишь на дужке), у Хранителя никогда не видно глаз, у Безмолвного нет глаз, носа и губ, только бирюзовый шов; в картинках нет текста.",
]


def synopsis_block(eid, syn):
    return syn.get(eid) or "(синопсис не написан — добавь в story/synopses.json)"


def panel_md(i, p):
    cast = ", ".join("%s (%s)" % (c.get("id"), c.get("pos")) for c in p.get("cast", [])) or "—"
    L = ["#### Панель %02d" % i,
         "",
         "- **bg:** `%s` | **mood:** `%s` | **sfx:** `%s`" % (p.get("bg"), p.get("mood"), p.get("sfx") or "—"),
         "- **cast:** %s" % cast,
         "- **art:** %s" % p.get("art", ""),
         "- **Реплики:**"]
    for ln in p.get("lines", []):
        t = ln.get("type", "")
        who = ln.get("who")
        head = "%s%s" % (t, (" / " + who) if who else "")
        en = ln.get("en")
        ru = ln.get("ru", "")
        if en:
            L.append("  - `%s` — **EN:** %s — **RU:** %s" % (head, en, ru))
        else:
            L.append("  - `%s` — **RU:** %s" % (head, ru))
    return "\n".join(L)


def episode_md(meta, ep, syn, art):
    eid = meta["id"]
    panels = ep.get("panels", [])
    L = ["## Эпизод %d (%s): %s — %s" % (meta.get("n", 0), eid, ep.get("title", meta.get("title", "")), ep.get("titleRu", meta.get("titleRu", ""))),
         "",
         "- **Уровень:** %s" % ep.get("level", meta.get("level", "")),
         "- **Панелей:** %d" % len(panels),
         "- **newWords:** %s" % ", ".join(ep.get("newWords", [])),
         "",
         "### Синопсис",
         "",
         synopsis_block(eid, syn),
         "",
         "### Сценарий по панелям",
         ""]
    for i, p in enumerate(panels, 1):
        L.append(panel_md(i, p))
        L.append("")
    g = ep.get("grammarNote") or {}
    L += ["### Грамматика: %s" % g.get("title", ""), "", g.get("body", ""), ""]
    for ex in g.get("examples", []):
        L.append("- %s — %s" % (ex.get("en", ""), ex.get("ru", "")))
    L += ["", "### Квиз", ""]
    for qi, q in enumerate(ep.get("quiz", []), 1):
        L.append("%d. %s" % (qi, q.get("q", "")))
        for oi, o in enumerate(q.get("options", [])):
            mark = " **(верно)**" if oi == q.get("answer") else ""
            L.append("   - %s%s" % (o, mark))
    L.append("")
    return "\n".join(L)


def status_table(story, art):
    L = ["| Эпизод | Название | Панелей | Картинок | Видео | Детальные кадры (shots) |",
         "|---|---|---|---|---|---|"]
    shots = load(os.path.join(STORY_DIR, "shots.json"), {})
    for meta in story.get("episodes", []):
        eid = meta["id"]
        ep = load(os.path.join(DATA, meta.get("file") or ("episodes/%s.json" % eid)), {})
        n = len(ep.get("panels", []))
        a = art.get(eid, {})
        imgs = len(a.get("images", []))
        vids = a.get("videos", [])
        L.append("| %s | %s / %s | %d | %d из %d | %s | %s |" % (
            eid, ep.get("title", ""), ep.get("titleRu", ""), n, imgs, n,
            ("%d (панели %s)" % (len(vids), ", ".join(str(v) for v in vids))) if vids else "0",
            ("да, %d" % len(shots[eid])) if shots.get(eid) else "нет"))
    return "\n".join(L)


FOUNDATION = [
    ("WRITING-GUIDE.md", "Инструкция для написания эпизодов"),
    ("series-bible.md", "Библия сериала"),
    ("curriculum.md", "Учебный план: грамматика → силы"),
    ("season-1.md", "Сезон 1, эпизоды 6–12"),
    ("seasons-2-4.md", "Сезоны 2–4 и дальше до финала"),
]


def demote(md):
    """Shift markdown headings down two levels so included files nest under section 4."""
    import re
    return re.sub(r"^(#{1,4}) ", lambda m: "#" * min(6, len(m.group(1)) + 2) + " ", md, flags=re.M)


def main():
    story = load(os.path.join(DATA, "story.json"), {"episodes": []})
    syn = load(os.path.join(STORY_DIR, "synopses.json"), {})
    art = load(os.path.join(ROOT, "art", "manifest.json"), {})
    bible = read_text(os.path.join(STORY_DIR, "bible.md"))

    out = ["# WORDBOUND — вся история в одном файле",
           "",
           "## 0. Как пользоваться этим файлом",
           "",
           "**Do NOT read this file whole — use story/DIGEST.md + specific sections via grep** (`grep -n \"s1e07\" story/STORY.md`, then read a line range). Файл огромный (~500 КБ): целиком его читать не нужно.",
           "",
           "Это единый полный справочник по истории WORDBOUND. Если контекст ассистента сжат или потерян, достаточно дать ему этот файл: в нём правила мира, персонажи, план сезона, визуальная библия, полный сценарий всех готовых эпизодов (каждая реплика EN/RU), грамматика, квизы, статус картинок и планы.",
           "",
           "**Файл создаётся автоматически — не правь его руками.** После любого изменения истории запусти: `python tools/story_dump.py`.",
           "",
           "Где лежат исходные данные:",
           "",
           "- `data/story.json`, `data/episodes/*.json` — эпизоды: панели, реплики, грамматика, квиз (то, что читает приложение);",
           "- `story/bible.md` — библия: мир, персонажи, сюжет сезона, тайны, визуальная библия;",
           "- `story/visual.json` — машиночитаемая копия визуальной библии для генераторов картинок;",
           "- `story/shots.json` — подробные кадры (камера, действие, лица, реквизит, свет, запреты) для эпизодов 3–5;",
           "- `story/checks.json` — русские чек-листы «что проверить на картинке»;",
           "- `story/synopses.json` — русские синопсисы эпизодов;",
           "- `art/manifest.json` — какие картинки и видео уже импортированы.",
           "",
           "---",
           "",
           "# 1. Библия (файл story/bible.md, дословно)",
           "",
           bible,
           "",
           "---",
           "",
           "# 2. Эпизоды",
           ""]
    for meta in story.get("episodes", []):
        eid = meta["id"]
        ep = load(os.path.join(DATA, meta.get("file") or ("episodes/%s.json" % eid)), {})
        out.append(episode_md(meta, ep, syn, art))
        out.append("---")
        out.append("")
    out += ["# 3. Статус эпизодов (картинки и видео)", "",
            "Данные из `art/manifest.json`, только чтение.", "",
            status_table(story, art), "", "---", "",
            "# 4. Что дальше: основа сериала (написана Fable 5.2)", "",
            "Ниже дословно — главные документы. **При расхождении с разделом 1 (старая библия) правы они.** "
            "Порядок чтения перед написанием эпизода: WRITING-GUIDE → series-bible → curriculum → нужный сезон.", ""]
    for i, (fn, title) in enumerate(FOUNDATION, 1):
        txt = read_text(os.path.join(STORY_DIR, fn))
        if txt:
            out += ["---", "", "## 4.%d %s (файл story/%s, дословно)" % (i, title, fn), "", demote(txt), ""]
    out.append("")
    text = "\n".join(out)
    p = os.path.join(STORY_DIR, "STORY.md")
    with open(p, "w", encoding="utf-8", newline="\n") as f:
        f.write(text)
    npan = sum(len((load(os.path.join(DATA, m.get("file") or ("episodes/%s.json" % m["id"])), {}) or {}).get("panels", [])) for m in story.get("episodes", []))
    print("wrote story/STORY.md: %d bytes, %d lines, %d panels" % (len(text.encode("utf-8")), text.count("\n") + 1, npan))


if __name__ == "__main__":
    main()
