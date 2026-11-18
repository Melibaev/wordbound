# Chatterbox lexicon probe

8 samples (4 words + 4 examples), voice=`narration`, bucket=`calm`.
Output: `.models/tts_test/lexicon/` (audio/w not touched).

| file | text | heard (Whisper) | WER | dur s | cps | F0 | tries |
|---|---|---|---|---|---|---|---|
| weak.mp3 | weak | week. | 1.00 | 0.72 | 19.7 | 204 | 1 |
| weak-ex.mp3 | You are very weak. | You are very weak. | 0.00 | 1.58 | 15.6 | 177 | 1 |
| safe.mp3 | safe | Safe. | 0.00 | 0.84 | 13.4 | 223 | 1 |
| safe-ex.mp3 | This room is safe. | This room is safe. | 0.00 | 1.20 | 23.1 | 157 | 1 |
| tired.mp3 | tired | Tired | 0.00 | 0.82 | 10.0 | 162 | 1 |
| tired-ex.mp3 | I am tired. | I am tired. | 0.00 | 1.20 | 12.0 | 160 | 1 |
| where.mp3 | where | Where? | 0.00 | 0.62 | 17.4 | 166 | 1 |
| where-ex.mp3 | Where are we? | Where are we? | 0.00 | 0.94 | 21.4 | 170 | 1 |

Weak (WER>0.15): 1 / 8
- weak.mp3: expected 'weak', heard 'week.' (WER 1.00)

## Итог

- Движок Chatterbox стартовал на GPU, 8 файлов лежат в `.models/tts_test/lexicon/`.
- `audio/w/` не перезаписывался (mtime 15.11).
- Голос `narration`, bucket `calm`.
- 7/8 с WER=0. Единственный провал: изолированное `weak` → Whisper стабильно слышит `week` (3 попытки подряд). В примере `You are very weak.` WER=0 — путаница только на одиночном слове-омофоне.
- Команда: `.models/cbenv/Scripts/python tools/audio/gen_chatterbox.py --lexicon-test --seed 3000`
- Полный прогон `--words` (~1862 файла) и `--placement` (~68) **не запускался**.
