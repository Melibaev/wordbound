#!/usr/bin/env python3
"""Batch messages for the Google Flow *agent* (chat panel on the right in Flow).

    python tools/art/agent_prompts.py            # all episodes
    python tools/art/agent_prompts.py s1e01      # one episode
    python tools/art/agent_prompts.py --batch 3  # panels per message (default 4)

Output: art-prompts/agent/instructions.md (paste once into "Инструкции для агента")
        art-prompts/agent/<episodeId>.md   (one chat message per batch of panels)
Style, palette and rules live in the agent instructions, characters come from Flow
characters via @Name, so each panel needs only location + shot.
"""
import os
import re
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import common as C  # noqa: E402

OUT = os.path.join(C.PROMPTS_DIR, "agent")

INSTRUCTIONS = [
    ("WORDBOUND style", None, """You are the illustrator of WORDBOUND, an original colour webtoon. Every request is a list of numbered panels.
Rules for every panel image:
1. Korean webtoon style, full colour, clean digital linework, soft cel shading, cinematic framing, expressive faces.
2. Palette: warm paper cream, ink black, ash grey, ochre lamp light. Cold teal ONLY for the Silent. Vermilion red ONLY for word power and the System window. No purple, no violet, no blue neon.
3. Vertical 3:4 image. Exactly ONE image per panel, in the given order. Do not merge panels.
4. Absolutely no text, letters, captions, speech bubbles, sound effects or watermarks. Keep the upper third of the frame calm and fairly empty for speech bubbles added later.
5. Recurring characters (Dan, Mira, Keeper, Silent) must always match their character references exactly, whether they are tagged with @ or just named.
6. "The System window" = a floating blank cream-paper panel with a thin double vermilion border, slightly tilted, no text inside.
7. Do not ask me questions, do not suggest variations, just generate. Put each finished panel into the collection named in the request, in panel order.
8. The Keeper (@Keeper): long ink-black robe with a deep hood, ochre embroidery, brass quill; his eyes are NEVER visible, only the pale lower face and a calm small smile.
9. The Silent (@Silent): very tall and thin, smooth paper-white face with NO eyes and NO nose, one thin vertical teal seam for a mouth, long thin fingers, tattered grey-teal clothes, edges dissolving into teal shadow. Several Silent in one panel share this design."""),
    ("Dan", "Dan", """Dan is the main hero. Whenever a panel mentions Dan or @Dan, draw exactly this character from the reference: same face, short messy black hair, round black glasses with white tape on the hinge, light stubble, yellow pencil behind his right ear, rumpled pale-grey shirt, mustard-yellow lanyard, dark-olive chinos, white sneakers. Tired but kind expression unless the panel says otherwise. Only one Dan per image."""),
    ("Mira", "Mira", """Whenever a panel mentions Mira or @Mira, draw exactly this character from the reference: amber-gold eyes, scar through her left eyebrow, dark-brown short ponytail, olive-khaki climbing jacket, long cream scarf, black fingerless gloves, black cargo trousers, rust-brown boots, backpack with rope, and ALWAYS a frayed vermilion-red cord on her left wrist. Default expression: dry, unimpressed. Only one Mira per image."""),
]


LETTERING = re.compile(r"\s*\([^)]*\b(lettering|text|letters?)\b[^)]*\)", re.I)


def panel_block(eid, n, panel, chars, bible, prev_loc):
    b = C.build_panel_prompt(panel, chars, bible, eid)
    locs = bible["locations"]
    bg = panel.get("bg")
    loc = (locs.get("%s:%s" % (eid, bg)) or locs.get(bg) or C.BG_FALLBACK.get(bg, "")).rstrip(".")
    tags = " ".join("@" + chars.get(r, {}).get("name", r) for r in b["refs"])
    head = "Panel %02d" % n + (" - " + tags if tags else " - no characters")
    lines = [head]
    if loc:
        lines.append("Setting: same as the previous panel." if loc == prev_loc else "Setting: %s." % loc)
    shot = LETTERING.sub("", b["scene"].strip())
    shot = re.sub(r"\b(lettering|letters)\b(?: of [A-Z]+)?", "glyph-shaped light (abstract, not readable)", shot)
    lines.append("Shot: %s" % shot)
    return "\n".join(lines), tags, loc


def episode_md(eid, ep, chars, bible, size):
    panels = ep.get("panels", [])
    n = len(panels)
    L = ["# %s: %s (%s) — сообщения для агента Flow\n" % (eid, ep.get("title", ""), ep.get("titleRu", "")),
         "Панелей: %d, сообщений: %d. Каждое сообщение — отдельный блок ниже: скопируй целиком, вставь в чат агента, отправь.\n"
         % (n, (n + size - 1) // size),
         "**Метки `@Dan`, `@Mira`… набери заново руками**, выбирая персонажа из выпадающего списка — "
         "вставленный текстом `@Dan` Flow может не распознать как персонажа.\n"]
    for start in range(0, n, size):
        chunk = list(range(start, min(start + size, n)))
        first, last = chunk[0] + 1, chunk[-1] + 1
        blocks, all_tags, prev = [], [], None
        for i in chunk:
            blk, tags, prev = panel_block(eid, i + 1, panels[i], chars, bible, prev)
            blocks.append(blk)
            all_tags += [t for t in tags.split() if t and t not in all_tags]
        msg = ("Generate %d separate images: WORDBOUND %s, panels %02d-%02d, one image per panel, in this order. "
               "Follow the project instructions. Add them to the collection \"%s\" in panel order.\n\n" %
               (len(chunk), eid, first, last, eid)) + "\n\n".join(blocks)
        L.append("## Сообщение %d — панели %02d–%02d\n" % (start // size + 1, first, last))
        L.append("Персонажи в этом сообщении: %s\n" % (", ".join("`%s`" % t for t in all_tags) or "нет"))
        L.append("```text\n%s\n```\n" % msg)
    return "\n".join(L)


def write(name, text):
    os.makedirs(OUT, exist_ok=True)
    p = os.path.join(OUT, name)
    with open(p, "w", encoding="utf-8", newline="\n") as f:
        f.write(text)
    print("wrote", os.path.relpath(p, C.ROOT))


def main():
    args = sys.argv[1:]
    size = 4
    if "--batch" in args:
        i = args.index("--batch")
        size = max(1, int(args[i + 1]))
        del args[i:i + 2]
    story = C.load_story()
    bible = C.parse_bible()
    chars = {c["id"]: c for c in story.get("characters", []) if c.get("id")}
    L = ["# Инструкции для агента Flow\n",
         "Создай %d инструкции: «Инструкции для агента» → **Добавить инструкцию** для каждой. "
         "В каждой: переключатель включён, **Название инструкции**, **Референс** (если указан), "
         "текст — в поле «Создайте руководство для агента». В конце **Готово**.\n" % len(INSTRUCTIONS)]
    for i, (name, ref, text) in enumerate(INSTRUCTIONS, 1):
        L.append("## Инструкция %d — %s\n" % (i, name))
        L.append("- Название: `%s`" % name)
        L.append("- Референс: %s" % (("**+ Референс** → персонаж **%s** → **Добавить в инструкцию**" % ref) if ref else "не нужен"))
        L.append("- Текст:\n\n```text\n%s\n```\n" % text)
    write("instructions.md", "\n".join(L))
    for eid in (args or C.episode_ids(story)):
        write(eid + ".md", episode_md(eid, C.load_episode(eid), chars, bible, size))


if __name__ == "__main__":
    main()
