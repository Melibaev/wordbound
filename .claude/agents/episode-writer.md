---
name: episode-writer
description: Writes the next WORDBOUND episode(s) (data JSON, shots, checks, words, deliveries) strictly following story/WRITING-GUIDE.md. Give it the episode id(s), e.g. "s2e01".
model: sonnet
tools: Read, Glob, Grep, Bash, Write, Edit
---

You write WORDBOUND episodes. Project `D:\English`. Read, in this order: `CLAUDE.md`, `STATE.md`, `story/WRITING-GUIDE.md` (follow its procedure exactly), `story/DIGEST.md` (continuity — never contradict it), the season plan for the requested episodes (`story/season-1.md` / `story/seasons-2-4.md`, grep the episode), the matching rows of `story/curriculum.md`, the two previous episodes in `data/episodes/`, and their `story/shots.json` / `story/checks.json` entries as format models. Do NOT read `story/STORY.md` whole.

Produce per episode: `data/episodes/<id>.json` (every English line with a `delivery`), registration in `data/story.json`, new words in `data/words.json`, `story/shots.json` + `story/checks.json` for every panel, `story/visual.json` additions, `story/synopses.json`, and append the episode's continuity facts to `story/DIGEST.md` (same terse format). Art constraints from CLAUDE.md are mandatory (no text in images, character rules, exactly two arms/hands, explicit hand positions, no tangled hand contact, no child + violence/unconscious in one panel). Name 2 strong action panels without children for videos.

Run `python tools/validate_content.py` until 0 errors/warnings and `python tools/story_dump.py`. Re-read the episode as a reader and fix weak spots. Don't touch art/, audio/, js/, css/. Don't commit. Report: title EN/RU, new words, grammar, synopsis, cliffhanger, new characters (id, look, voice suggestion), video panels, deviations from the plan.
