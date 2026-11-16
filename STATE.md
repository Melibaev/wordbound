# STATE — where WORDBOUND stands (update at the end of every work block)

_Last update: 2026-11-16_

## Done
- **Season 1 complete:** s1e01–s1e12 written (story by Fable foundation → Sonnet writers), illustrated in Google Flow (old soft style, Nano Banana 2.1), expressive Chatterbox voice-over for all dialogue (Whisper-checked), 1–3 looping videos per episode, published.
- **App:** reader with tap-to-translate, RU toggle, stress transcriptions, speed control; SRS reviews; placement test; System windows rendered as game UI with text; **speech bubbles over the art** (line field `place`) — so far only in **s1e01**; trial engine (7 step types, lives, resume) + **chapter gating** (next episode unlocks after the episode's trials).
- **Agents:** `.claude/agents/reader.md` (manhwa-reader critic, writes `story/reviews/<ep>.md`), `.claude/agents/episode-writer.md`. (New agent files load in a NEW session; in the old one call general-purpose with "read .claude/agents/<name>.md and become it".)
- **Series foundation:** `story/series-bible.md`, `curriculum.md`, `season-1.md`, `seasons-2-4.md`, `WRITING-GUIDE.md`, `DIGEST.md`.

## In progress (check before continuing)
- **Trials for s1e01–s1e12** being written by an Opus agent → `data/trials/*.json`, `story/TRIALS.md`, `tools/validate_trials.py`. When present: update `data/trials/index.json` (list every file), run `python tools/validate_trials.py`, generate trial audio (`.models/cbenv/Scripts/python tools/audio/gen_trials_audio.py`), test a trial in the browser at 375px, commit + push.
- **`tools/pipeline.py`** (one command per step) + `story/DIGEST.md` being built by a Sonnet agent — verify they exist and work.
- Engine commits since `a9c728c` are local only (trials engine, System windows, bubble overlay, s1e01 placements) — **not pushed yet**; push together with the trials.

## Next (in order)
1. Finish trials (above), publish.
2. **Fix s1e01 by the reader review** (`story/reviews/s1e01.md`, score 8/10): redraw panel 16 (Silent has eye slits/nose; arm from behind Dan's ear), panels 4 (word OPEN not readable as shape), 12 (grey bands, hatch drawn as huge door, stray silhouette); remove Dan's bandage (panels 3, 5, 9, 10, 11, 17) — root cause: the Flow character "Dan" reference likely has the bandage → make a clean reference; move bubbles off faces (p5 "Who is there?", p16 "It is a Silent."), p2 duplicate text on the phone, p9/p11 System windows should sit on the drawn windows; simplify English overload (hatch, Count, "Some doors go home"); audio: 13-01 "It works!" too high, 01-02 too quiet. Re-run reader → target 10/10.
3. Bubble placement (`place`) for s1e02–s1e12 (look at each image; avoid faces).
4. Video voice-over: mux the panel's Chatterbox lines onto its video (needs ffmpeg) + a "watch & understand" listening task type.
5. **Season 2 in style v1:** new clean character references (Dan without bandage, sharper manhwa look), then s2e01… via episode-writer → pipeline → reader loop.
6. Better art QA: 2 variants per panel + Sonnet visual reviewer per panel (counts hands, text, character rules) before import.

## Known issues
- Flow agent batches often fail on the first attempt ("Reuse prompt" locator) → retry; downloads sometimes fail ("tile menu did not open") → `flow_download` by title or regenerate. flow-mcp source was patched (`safeGoto`) — re-apply if flow-mcp is updated.
- ~10 very short dialogue lines have weak Whisper scores (e.g. s1e03 17-04 "Back?", s1e09 12-02 "Mira.", s1e11 14-02 "Mom!").
- Gemini free tier: TTS 10 req/day, vision flash 20/day — don't rely on it.
- Credits: Flow ≈700 left (2026-11-16); images are free.
