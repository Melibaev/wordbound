# STATE — where WORDBOUND stands (update at the end of every work block)

_Last update: 2026-11-16_

## Done
- **Season 1 complete:** s1e01–s1e12 written (story by Fable foundation → Sonnet writers), illustrated in Google Flow (old soft style, Nano Banana 2.1), expressive Chatterbox voice-over for all dialogue (Whisper-checked), 1–3 looping videos per episode, published.
- **App:** reader with tap-to-translate, RU toggle, stress transcriptions, speed control; SRS reviews; placement test; System windows rendered as game UI with text; **speech bubbles over the art** (line field `place`) — in **all of s1e01–s1e12** (placed by looking at each image, checked on real reader screenshots); trial engine (7 step types, lives, resume) + **chapter gating** (next episode unlocks after the episode's trials).
- **Agents:** `.claude/agents/reader.md` (manhwa-reader critic, writes `story/reviews/<ep>.md`), `.claude/agents/episode-writer.md`. (New agent files load in a NEW session; in the old one call general-purpose with "read .claude/agents/<name>.md and become it".)
- **Series foundation:** `story/series-bible.md`, `curriculum.md`, `season-1.md`, `seasons-2-4.md`, `WRITING-GUIDE.md`, `DIGEST.md`.

## Recently finished (2026-11-16, block 2)
- **Root cause of Dan's bandage found:** the Flow character "Dan" portrait had white tape on the glasses hinge (from "tape on the hinge" in the bible). Portrait redrawn clean (`flow_character_edit`), all "tape" wording removed from `story/visual.json`, `bible.md`, `shots.json`, `tools/art/agent_prompts.py`. Silent portrait made fully smooth (no nose bump).
- **s1e01 fixed by review:** panels 1,2,3,4,5,8,9,10,11,12,16,17 redrawn (OPEN readable, real small hatch, no bands, Silent without eyes, drawn System windows where the System talks, no baked text); all bubbles re-placed and checked on screenshots; Count explained by a Russian narration (13); audio 01-02 louder, 13-01 normal pitch (seed 2000, f0≈155), 11-04 re-voiced. Then round 2–3: RU translation = popover that never moves bubbles (smart free-spot placement, sw v8); Tower in 9–11 redrawn like 8; panel 14 mirrored (Mira's cord on LEFT wrist); 12 redrawn (engineer gesture at hatch); bubble reading order fixed (10, 16); line 11-04 = "Find the last door. It goes home."; quiet lines raised to ≈−22…−25 dB; trials fixed by Opus (name-loss beat, rewards; type hint "In English." in s1e01–05, "Write it in English." in s1e06+ because of the word curriculum). Reader score 8 → 8.5 → 9 → **9.5**.
- **`place` for s1e02–s1e12** (Sonnet agents, screenshot-verified).
- **New tool `tools/art/shot_panels.mjs`:** `node tools/art/shot_panels.mjs <ep> [--panels 3,5] [--ru]` → real reader screenshots at iPhone size in `.models/shots/<ep>/` (playwright-core from flow-mcp + local Chrome, own static server). Use it for every bubble/art check.
- Earlier: trials for s1e01–s1e12, `tools/pipeline.py`, DIGEST, Whisper on GPU.

## Next (in order)
1. **s1e01 is at 9.5/10** (reader round 4, no hard-rule breaks). Cosmetic leftovers in `story/reviews/s1e01.md`: RU popover of 15-01 overlaps Mira's bubble; pencil missing in 13–16/18; panel 18 Silent head cropped; panel 14 Dan's feet float; blank drawn cards peek from under System windows in 9–11; video for 16 (7 credits).
2. **Art cleanup S1 (rule breaks found while placing bubbles):** bandage on Dan — s1e02 p8, p13; s1e04 p6, p13; s1e05 p2, p6 (maybe p9, p14); ~~s1e09 p2, p16~~ (done). Readable letters — s1e02 p1 (lanterns), p6/8/10/12 (names on walls); s1e03 p12–16 (gate inscription); s1e05 p1, p4, p5; s1e09 p3 ("KTHER"); s1e12 p6 (paper). Keeper with eyes — s1e04 p5 (p8?). Silent with eye sockets — s1e10 p11. s1e09 p8 System hologram is teal (teal = Silent only). s1e08 p6 red cord on both wrists. s1e07 p13 drawn speech bubble. s1e04 p6 / s1e04 p1 / s1e05 p1 Dan in hoodie/jacket. After each redraw re-check `place` with `shot_panels.mjs`. Use `pipeline.py art <ep> --panels N --single` (agent mode sometimes picks up an old chat message and draws nothing).
3. Video voice-over: mux the panel's Chatterbox lines onto its video (needs ffmpeg) + a "watch & understand" listening task type.
4. **Season 2 in style v1:** new clean character references (sharper manhwa look), then s2e01… via episode-writer → pipeline → reader loop.
5. Better art QA: 2 variants per panel + Sonnet visual reviewer per panel (counts hands, text, character rules) before import.

## Known issues
- Flow agent batches often fail on the first attempt ("Reuse prompt" locator) → retry; downloads sometimes fail ("tile menu did not open") → `flow_download` by title or regenerate. flow-mcp source was patched (`safeGoto`) — re-apply if flow-mcp is updated.
- ~10 very short dialogue lines have weak Whisper scores (e.g. s1e03 17-04 "Back?", s1e09 12-02 "Mira.", s1e11 14-02 "Mom!").
- Gemini free tier: TTS 10 req/day, vision flash 20/day — don't rely on it.
- Credits: Flow ≈700 left (2026-11-16); images are free.
- `audio/.chatterbox.json` hash ignores `delivery` → to re-voice a line with a new delivery, pop its key from the state file (or change the text) and rerun; try `--seed` values and pick the take by f0/WER.
- Never call `flow_wait`/`flow_status` without job ids — the output lists every old job with full prompts (huge).
