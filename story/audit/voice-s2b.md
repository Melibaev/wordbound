# Озвучка s2e07–s2e12 (2026-11-17)

Chatterbox GPU, инкрементально. Диалоги не трогал. `--words` не запускал.

**Итог:** все 6 серий и все 6 trials вышли с EXIT=0. Провалов нет.

## Серии (gen_chatterbox.py)

| серия | строк | WEAK | WEAK-файлы |
|---|---:|---:|---|
| s2e07 | 35 | 0 | — |
| s2e08 | 40 | 0 | — |
| s2e09 | 40 | 2 | `13-03.mp3` (WER 0.25, «There were two boys.»), `14-02.mp3` (WER 0.50, «Count: 210.») |
| s2e10 | 37 | 1 | `10-01.mp3` (WER 0.60, «You touched yesterday. Count: 235.») |
| s2e11 | 40 | 0 | — |
| s2e12 | 40 | 1 | `02-02.mp3` (WER 0.20, «Shield. I am holding too.») |
| **всего** | **232** | **4** | |

mp3 лежат в `audio/<ep>/NN-NN.mp3`.

## Испытания (gen_trials_audio.py)

У всех шести есть `audio_text`, поэтому прогнаны все. Скрипт озвучивает все utterance испытания (не только audio_text).

| серия | строк | WEAK | WEAK-файлы |
|---|---:|---:|---|
| s2e07 | 71 | 1 | `43fef1aa42f9d6c1.mp3` (0.25, «How do we pull?») |
| s2e08 | 71 | 4 | `51812e506e8af731.mp3` (0.33, Count:195), `3a0e5eef4fd4d734.mp3` (1.0, Count:195), `a45411a96bf75502.mp3` (0.20, «Bring Nad…»), `437a73dd154607d6.mp3` (0.29, Count:195) |
| s2e09 | 72 | 5 | `23fb1707363a1c9a.mp3` (1.0, Count:210), `da1c05a1fb80f630.mp3` (0.33, «Dan is slow.»), `4e3dff33f2ea8ed8.mp3` (0.33, «Dan is slow.»), `dd73582c9170de01.mp3` (0.33, «Were, dear. Two.»), `1d268d670c556340.mp3` (0.17, Count:210) |
| s2e10 | 71 | 2 | `7f1f11f8524473b4.mp3` (0.50, «Hear yesterday.»), `f45ec040dfd74be4.mp3` (0.60, Count:235) |
| s2e11 | 71 | 2 | `f74625a252b56bcc.mp3` (0.50, «Dan. Eat.»), `96eef2a86b02c830.mp3` (0.33, «Did Ruk agree?») |
| s2e12 | 72 | 2 | `c0145a4f873e39d6.mp3` (0.33, «Rank up: Clause.»), `2d5b9131c42cf0ef.mp3` (0.50, «Clause, dear.») |
| **всего** | **428** | **16** | |

mp3 лежат в `audio/trials/<ep>/<hash>.mp3`.

## Не вышло

Нет. Все команды завершились EXIT=0.

## Заметки

- Частые WEAK на системных «Count: N» и коротких репликах (Whisper путает цифры/имена).
- Логи прогонов: `.models/audio_s2eNN_run.log`, `.models/trials_s2eNN_run.log`.
