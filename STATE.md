# STATE — where WORDBOUND stands (update at the end of every work block)

_Last update: 2026-11-17_

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

## Block 3 (2026-11-16/17) — whole Season 1 cleaned
- **Audit** of s1e02–s1e12 by 4 read-only agents (`story/audit/<ep>.json`), shared rulebook `story/READER-TASTE.md`. Systemic bug: tape on Dan's glasses in nearly every old panel (root cause = old Flow "Dan" portrait, fixed in block 2) → ~130 panels redrawn in Flow agent mode (new clean references), bubbles re-placed and verified on real-reader screenshots (`tools/art/shot_panels.mjs`, flags `--ru --dark --motion --zoom`).
- **Videos:** 11 regenerated (77 credits): s1e02 p1,5,16; s1e03 p7,8; s1e04 p17; s1e05 p2; s1e09 p15; s1e10 p7. Old ones with bandage/morphing dropped. Frame check tool `tools/art/video_frames.py`; batch submit `tools/art/videos_batch.py` (one call, see `tools/art/vspec_example.json`). Credits left ≈ 600.
- **Video voice-over:** every video panel has a 🔊 button over the silent loop → plays `audio/<ep>/NN-scene.mp3` (all voiced lines of the panel in order; built by `tools/audio/build_scene_audio.py`, needs `.models/cbenv` imageio-ffmpeg; rerun after any line/audio change). iPhone cannot autoplay sound, hence a tap.
- **Reader UI fixes (user's phone):** RU tap zone swallowed the speaker button in System windows; shout-bubble text invisible in dark theme; speaker icon off-centre (button padding). sw CACHE v11.
- **Reader scores:** s1e01 9.5 (4 rounds), **s1e06 8.0**, **s1e12 8.5** (`story/reviews/`). Arc works; finale loops back to s1e01.
- **flow-mcp (`C:\Users\Laptop\flow-mcp`) fixed by Opus 5.5** (report `story/audit/flow-speed.md`): fresh-tile detection by grid position, retry downloads instead of redrawing, honest "rendering" counter + 75 s start watchdog, Save click, video pipeline (`FLOW_MCP_PIPELINE=1`: all videos in one call). Start the core with `bash tools/start_flow_core.sh` (short pauses, pipeline on). The Flow Chrome window needs the user's VPN extension (Flow is geo-blocked: `unsupported-country` otherwise).
- **Remote status page:** `tools/status_server.py` + `tools/status_tunnel.sh` (self-healing ssh tunnel via localhost.run; current host published to git branch `status-url`; entry page `status.html#k=<key>` on GitHub Pages). Stop them when not needed.

## Next (in order)
1. **Fix list from the two reviews** (cheap first): s1e06 p14 pencil behind LEFT ear + diagonal stripes on lenses, p2 red-cream triangle under the System window, p4 shout text sizes; Mira's cord on RIGHT wrist in s1e12 p4,7,11 (+extra in p3) — the image model confuses left/right; s1e12 p11/p16 letter-like glyphs, p10/p15 too teal; s1e12 p2–8 static talking heads; Keeper's fate after p8; trial hint "18 words" vs 9-word answer (s1e12 t3); System line s1e12 13-02 too long for A1.
2. Run the same reader pass on the other 9 episodes (s1e02–05, 07–11) and fix to ≥ 9.
3. **Trials: "watch & understand" task type** (listen to the scene audio over the video, answer).
4. **Season 2 in style v1:** new clean character references, then s2e01… via episode-writer → pipeline → reader loop.
5. Better art QA: 2 variants per panel + Sonnet visual reviewer before import.

## Known issues
- Flow agent batches often fail on the first attempt ("Reuse prompt" locator) → retry; downloads sometimes fail ("tile menu did not open") → `flow_download` by title or regenerate. flow-mcp source was patched (`safeGoto`) — re-apply if flow-mcp is updated.
- ~10 very short dialogue lines have weak Whisper scores (e.g. s1e03 17-04 "Back?", s1e09 12-02 "Mira.", s1e11 14-02 "Mom!").
- Gemini free tier: TTS 10 req/day, vision flash 20/day — don't rely on it.
- Credits: Flow ≈700 left (2026-11-16); images are free.
- `audio/.chatterbox.json` hash ignores `delivery` → to re-voice a line with a new delivery, pop its key from the state file (or change the text) and rerun; try `--seed` values and pick the take by f0/WER.
- Never call `flow_wait`/`flow_status` without job ids — the output lists every old job with full prompts (huge).
