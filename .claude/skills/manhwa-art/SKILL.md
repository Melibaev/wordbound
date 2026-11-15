---
name: manhwa-art
description: Generate or import full-colour webtoon panel art, character reference sheets and optional panel videos for the WORDBOUND app (tools/art, art/ folder, art-prompts/). Use when the user asks to make, regenerate, check or import panel images, reference sheets, art prompts or art/manifest.json.
---

# WORDBOUND manhwa art

Tools live in `tools/art/` (see `tools/art/README.md`, in Russian). Images go to `art/<episodeId>/NN.jpg` (NN = panel number, two digits), refs to `art/refs/<characterId>.jpg`, `art/manifest.json` is rewritten by the tools. Never edit `data/` or `story/` for this job unless the user asks.

## Workflow
1. **Characters first.** `python tools/art/generate.py --characters --dry-run`, state the estimate, then run with `--max N`. Open each `art/refs/*.jpg` with the Read tool and judge it (turnaround views consistent, matches the visual bible in `story/bible.md`, no text). Ask the user to approve the refs before going on; regenerate bad ones with `--force`.
2. **Episode panels in small batches.** Always `--dry-run` first: `python tools/art/generate.py --episode s1e01 --panels 1-4 --dry-run`. Tell the user the printed estimate and the model. Then run the same command without `--dry-run` and with `--max` (3-5 images). Existing files are skipped unless `--force`.
3. **Review every produced image** with the Read tool. Regenerate (`--panels N --force`) panels that break character consistency (hair, outfit, face differ from the ref), contain any text/letters/bubbles/watermarks, are not 4:5, or leave no empty space in the upper third. Do not loop endlessly: at most 2 retries per panel, then tell the user.
4. **Manual route:** `python tools/art/prompts.py` writes `art-prompts/*.md` for pasting into Gemini/Flow. When the user downloaded images: `python tools/art/import_art.py <folder> <episodeId> [--start NN] --dry-run`, check the mapping, then run it without `--dry-run`. Videos: `--video NN file.mp4` (key panels only, keep under 4 MB).
5. Run `python tools/validate_content.py` afterwards (it checks that files listed in `art/manifest.json` exist).

## Rules
- **Cost discipline:** `--dry-run` first, always state the estimate. Never exceed the budget the user stated; if none was given, keep a run to about 10 images and ask before more. Prefer the cheap default model; use `--model gemini-3-pro-image` (about 4x the price) only for a problem panel or key art, and say so.
- **Secrets:** the key is only read from the env var `GEMINI_API_KEY`. Never print, log, echo or write it, never accept it as an argument, never put it in a file. If it is missing, tell the user to set it (README, API section); do not ask them to paste it into the chat.
- No third-party image proxies or wrappers, no browser automation of Flow / Gemini web. Only the official API through `generate.py` (or the user doing the manual route themselves). API video generation is deliberately not implemented.
- Billing / key / budget-alert steps are the user's to do; do not attempt them.
- Keep images at or below about 250 KB (the pipeline does it); never commit raw PNG originals.
