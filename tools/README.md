# tools/ — конвейер эпизода

Один вход: `python tools/pipeline.py <команда>`. Вывод короткий (без эха промптов).

| Команда | Что делает |
|---|---|
| `validate <ep>` | `validate_content.py` + `validate_trials.py` (если есть `data/trials/<ep>.json`) + `story_dump.py` (пересобирает `story/STORY.md`). Печатает итоги и только ошибки. |
| `audio <ep> [--dry-run]` | Chatterbox для реплик (`gen_chatterbox.py --episode`) и для испытаний (`gen_trials_audio.py --episode`, если есть файл испытаний). Печатает счётчик и слабые строки (WER > 0.15). Нужен `.models/cbenv`. |
| `art <ep> [--panels 3,5] [--hint "текст"] [--single] [--style s1\|v1] [--dry-run] [--print]` | Собирает промпты панелей из `story/shots.json` / `visual.json` (Setting/Camera/Action/Faces/Props/Light/Avoid + короткие правила стиля), отправляет в flow-mcp (`/api/agent`, с `--single` — `/api/generate`), ждёт (`/api/wait`), один раз повторяет при сбое («Reuse prompt»), пишет контакт-лист `.models/sheets/<ep>.jpg` (номера панелей). Печатает: id задачи, статус, число файлов, путь листа. Состояние сохраняется в `.models/flow_last/<ep>.json`. |
| `import <ep> [--from папка] [--panels 3,5] [--dry-run]` | Файлы `scene-NN` -> панели (по порядку батча; для подмножества — в порядке `--panels`) и `tools/art/import_art.py`. Без `--from` берёт папку последнего `art`; иначе `~/flow-mcp-out/<ep>`. Число файлов должно совпасть с числом панелей, иначе ошибка (подсказка про `--panels`). |
| `video <ep> <панель> "<движение>" [--dry-run]` | Omni 1.1 Flash, 4 с, 720p, 9:16, `first_frame` = `art/<ep>/NN.jpg`, `max_credits` 12; ждёт, импортирует `--video`; печатает потраченные кредиты. |
| `publish "<сообщение>" [--dry-run]` | validate_content + story_dump, `git add -A` (без `.models`), коммит с трейлером `Co-Authored-By`, `git push`. Трейлер можно задать переменной `WORDBOUND_TRAILER`. |
| `status` | Таблица по эпизодам: панели / картинки / видео / аудио (mp3 / EN-реплик) / испытания / оценка ревью (строка «Итог» в `story/reviews/<ep>.md`). |

## Стили (`--style`)
Словарь `STYLES` в `tools/art/flow_batch.py`: `s1` — текущий (мягкий cel shading), `v1` — Korean action webtoon (контрастная живопись, жёсткие тени, rim light, острые лица). Общие правила (без текста, по две руки, у Дэна никогда нет пластыря, лицо Безмолвного без глаз) — `COMMON_RULES` там же.

## Ссылки на персонажей
`dan→Dan, mira→Mira, keeper→Keeper, silent→Silent, pip→Pip, trader→Trader, lina_human→Lina` (`asset:<Name>` в проекте Flow; не более 3 на панель).

## Что нужно для живых команд
`art` и `video` требуют запущенный flow-mcp (порт 8787, токен `~/.flow-mcp/token`) и открытое окно Flow. `art --dry-run`, `import --dry-run`, `video --dry-run`, `validate`, `status`, `audio --dry-run` ничего не тратят и не требуют Flow.

## Прочее
- `story/DIGEST.md` — компактный дайджест непрерывности (≤12 КБ); `story/STORY.md` целиком не читать — только grep по разделам.
- Остальные скрипты: `tools/art/README.md`, `tools/audio/README.md`.
