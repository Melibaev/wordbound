#!/usr/bin/env python3
"""Generate copy-paste art prompts for the manual (Gemini app / Flow) route.

    python tools/art/prompts.py            # characters.md + one file per episode
    python tools/art/prompts.py s1e01      # only this episode (and characters.md)

Output: art-prompts/characters.md, art-prompts/<episodeId>.md   (stdlib only)
"""
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import common as C  # noqa: E402


def write(name, text):
    os.makedirs(C.PROMPTS_DIR, exist_ok=True)
    p = os.path.join(C.PROMPTS_DIR, name)
    with open(p, "w", encoding="utf-8", newline="\n") as f:
        f.write(text)
    print("wrote", os.path.relpath(p, C.ROOT))


def characters_md(story, bible):
    L = ["# Референс-листы персонажей\n",
         "Сначала сгенерируй эти листы (по одному на персонажа), выбери удачные и сохрани как "
         "`art/refs/<id>.jpg` (через `import_art.py` или вручную). Потом прикладывай их к промптам панелей.\n",
         "Как: открой Gemini (режим создания изображений, Nano Banana) или flow.google.com, вставь промпт, "
         "получи картинку, при необходимости попроси «в том же стиле, другой ракурс». Скачай лучший вариант.\n"]
    if not bible["found"]:
        L.append("> Файл `story/bible.md` не найден: описания взяты из `data/story.json` (поле `desc`). "
                 "Когда появится визуальная библия, запусти `python tools/art/prompts.py` заново.\n")
    n = 0
    for c in story.get("characters", []):
        if not C.is_visual(c):
            continue
        n += 1
        sp = C.build_sheet_prompt(c, bible)
        L.append("## %s (`%s`)\n" % (c.get("name", c["id"]), c["id"]))
        L.append("- Сохранить как: `art/refs/%s.jpg`" % c["id"])
        L.append("- Источник описания: %s" % sp["source"])
        if sp["source"] == "TODO":
            L.append("- **TODO: описание персонажа не найдено ни в bible.md, ни в story.json. Допиши его в промпт вручную.**")
        elif "not English" in sp["source"]:
            L.append("- Внимание: описание не на английском, Gemini его поймёт, но лучше перевести в bible.md.")
        L.append("\n```text\n%s\n```\n" % sp["prompt"])
    if n == 0:
        L.append("**TODO: в data/story.json нет персонажей.**\n")
    return "\n".join(L)


def episode_md(eid, ep, chars, bible):
    panels = ep.get("panels", [])
    L = ["# %s: %s (%s)\n" % (eid, ep.get("title", ""), ep.get("titleRu", "")),
         "Панелей: %d. Формат кадров: вертикальный 4:5. Для каждой панели: прикрепи указанные референсы персонажей, "
         "вставь промпт, скачай результат. Потом: `python tools/art/import_art.py <папка> %s`.\n" % (len(panels), eid),
         "Файлы `.mp4` (видео) нужны только для нескольких ключевых панелей (блоки «Видео» ниже).\n"]
    for i, p in enumerate(panels):
        n = i + 1
        b = C.build_panel_prompt(p, chars, bible, eid)
        refs = ", ".join("`art/refs/%s.jpg`" % r for r in b["refs"]) or "нет (персонажей в кадре нет)"
        L.append("## Панель %02d  (bg: %s, mood: %s)\n" % (n, p.get("bg"), p.get("mood")))
        L.append("- Файл: `art/%s/%02d.jpg`" % (eid, n))
        L.append("- Прикрепить референсы: %s" % refs)
        if not p.get("art"):
            L.append("- Сцена собрана из bg/mood/cast (поле `art` у панели не задано).")
        L.append("\n```text\n%s\n```\n" % b["prompt"])
        if C.key_moment(panels, i):
            L.append("**Видео (необязательно, Veo во Flow: image-to-video из картинки этой панели)**")
            L.append("- Файл: `art/%s/%02d.mp4` (до 4 МБ, 4 to 8 секунд)\n" % (eid, n))
            L.append("```text\n%s\n```\n" % C.build_video_prompt(p))
    return "\n".join(L)


def main():
    only = sys.argv[1] if len(sys.argv) > 1 else None
    story = C.load_story()
    bible = C.parse_bible()
    chars = {c["id"]: c for c in story.get("characters", []) if c.get("id")}
    write("characters.md", characters_md(story, bible))
    ids = [only] if only else C.episode_ids(story)
    for eid in ids:
        write(eid + ".md", episode_md(eid, C.load_episode(eid), chars, bible))
    print("bible: %s | characters from bible: %d | locations from bible: %d" %
          ("found" if bible["found"] else "NOT found", len(bible["characters"]), len(bible["locations"])))


if __name__ == "__main__":
    main()
