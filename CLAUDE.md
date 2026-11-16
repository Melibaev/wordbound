# WORDBOUND — instructions for Claude

Free iPhone PWA that teaches English (A0→B2) to a Russian speaker through an original Korean-webtoon-style serial. Owner talks Russian — **always reply in Russian**, explain simply; he cannot read the English prompts, so give Russian translations/checklists for anything he must judge. Live site: https://melibaev.github.io/wordbound/ (GitHub `Melibaev/wordbound`, branch `main`, push publishes).

**Read first in a new session:** `STATE.md` (what's done / next / known issues). Never read `story/STORY.md` whole (≈0.5 MB) — use `story/DIGEST.md` + grep.

## Working style (saves the owner's limits)
- Heavy writing/coding → spawn Sonnet subagents with precise briefs; main model plans, reviews, fixes small things. Creative/long-range story design → Opus.
- Don't paste long prompts through your own context: use `tools/pipeline.py` / the flow-mcp local API (scripts read the JSON themselves).
- After every episode: run the **reader** agent (`.claude/agents/reader.md`) and fix to a high score.
- Update `STATE.md` at the end of each work block.

## Map
| What | Where |
|---|---|
| App (no build, ES modules) | `index.html`, `js/` (`views/reader.js`, `views/trial.js`, `sysmsg.js`, `audio.js`, `store.js`), `css/style.css`, `sw.js` (bump CACHE on shell changes) |
| Episodes (source of truth) | `data/episodes/s1eNN.json`, registry `data/story.json`, dictionary `data/words.json`, stress `data/pron.json` |
| Trials (unlock next chapter) | `data/trials/<ep>.json` + `data/trials/index.json` (must list every file), validator `tools/validate_trials.py`, design `story/TRIALS.md` |
| Story foundation | `story/series-bible.md`, `story/curriculum.md`, `story/season-1.md`, `story/seasons-2-4.md`, `story/WRITING-GUIDE.md` (procedure for new episodes), `story/DIGEST.md` (continuity facts) |
| Art direction per panel | `story/shots.json` (camera/action/faces/props/light/avoid), `story/checks.json` (Russian checks), `story/visual.json` (character & location prompt fragments) |
| Reviews | `story/reviews/<ep>.md` (reader agent output) |
| Panel art | `art/<ep>/<NN>.jpg` (+ `.mp4`), `art/manifest.json` (written by `tools/art/import_art.py`) |
| Voice-over | `audio/<ep>/<panelNN>-<lineNN>.mp3` (Chatterbox), `audio/w/` (Kokoro words), `audio/trials/<ep>/<hash>.mp3` |
| Tools | `tools/pipeline.py` (one command per step — see `tools/README.md`), `tools/validate_content.py`, `tools/story_dump.py`, `tools/art/*`, `tools/audio/*` |

## Pipelines
- **Validate:** `python tools/validate_content.py` (0 errors required) and `python tools/validate_trials.py`.
- **Voice:** Chatterbox on the local GPU (benchmarked 2026-11-16: GPU 1.1 s per audio second vs CPU 4.5 s; Whisper QA on GPU ~2x faster, falls back to CPU): `.models/cbenv/Scripts/python tools/audio/gen_chatterbox.py --episode <ep>` (incremental, Whisper QA). Voice table/refs: `tools/audio/gen_chatterbox.py`, `.models/cb_refs/`. Kokoro only for dictionary words. Gemini TTS free tier = 10/day (unusable). Every English line needs a `delivery` acting direction.
- **Art:** Google Flow via flow-mcp (`C:\Users\Laptop\flow-mcp`, MCP config `.mcp.json`, local API `http://127.0.0.1:8787`, token `~/.flow-mcp/token`, outputs `C:\Users\Laptop\flow-mcp-out\`). Project "WORDBOUND S1" must be open in the flow-mcp Chrome window (open it via CDP 9333 if needed; close Flow's agent side panel if "Agent" button not found). Images = Nano Banana 2.1, 0 credits; **ALWAYS generate in fast agent mode — many images per call (`pipeline.py art <ep> --panels …` without `--single`, ≤ ~13 panels per batch), never one image at a time unless agent mode is proven broken** (`--single` is ~5× slower). **Speed rules (measured 2026-11-16):** group ALL pending panels of several episodes into as few agent batches as possible (a batch costs ~3–5 min fixed overhead however small; the tool takes up to 50); send all videos in ONE `flow_generate` call; start the flow core with short pauses via `bash tools/start_flow_core.sh` (default 25–70 s pause between jobs is the main video delay); never run two Flow jobs in parallel (one browser page); the first attempt often fails with "Reuse prompt" → just retry. If agent batches fail with "Save … intercepts pointer events": flow-mcp `src/flow.ts` Save click needs `{ force: true }` (patched 2026-11-16; run `npx tsc` in `C:\Users\Laptop\flow-mcp`, then restart the flow-mcp core). Videos: Omni 1.1 Flash 4 s 720p = 7 credits, max 1–2 per episode, state cost first; Flow refuses child characters next to injured/unconscious people.
- **Art QA:** look at a contact sheet yourself AND have the reader check; Gemini vision checker (`tools/art/check_art.py`) is unreliable for hands.
- **Publish:** `git add -A` (never `.models/`), commit with trailer `Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>`, `git push`.

## Hard rules for content
- Original story only — never copy names/plots/designs of existing manhwa; never name existing works or artists in prompts.
- No text inside generated images (anything written = blank or abstract glyph-light); System windows and bubbles are rendered by the app (`place` on lines = bubble over art).
- Characters: Dan — round black glasses, yellow pencil behind right ear, mustard lanyard, grey shirt, **never a bandage/plaster on his face**; Mira — red cord on LEFT wrist; Keeper — eyes never visible; Silent — smooth white face, no eyes/nose/lips, one thin vertical teal seam; each person exactly two arms/hands.
- Palette: cream, ink black, ash grey, ochre; teal only for the Silent; vermilion only for word power. No purple.
- Trials: no speaking/pronunciation (owner studies at work) — read, tap, type, listen only; woven into the plot.
- Season 2 art style = "v1": Korean action webtoon, high-contrast digital painting, hard cel shadows, rim light, deep blacks, sharp faces, dynamic perspective, glowing effects. Needs new clean character references first.
