# Озвучка WORDBOUND (Kokoro TTS)

Приложение проигрывает заранее сгенерированные MP3 из `audio/` (нейроголоса Kokoro). Если файла нет, оно
откатывается на встроенный `speechSynthesis`.

## Первичная настройка (один раз)
```
python -m pip install --user kokoro-onnx lameenc
```
Скачать в `.models/` (папка в .gitignore):
- `kokoro-v1.0.onnx` и `voices-v1.0.bin` с https://github.com/thewh1teagle/kokoro-onnx/releases (релиз `model-files-v1.0`)
- `cmudict.dict` с https://github.com/cmusphinx/cmudict (нужен только для транскрипций)

## Новые эпизоды / слова
```
python tools/audio/gen_audio.py              # всё, только изменившееся (кэш audio/.hashes.json)
python tools/audio/gen_audio.py --episode s1e06
python tools/audio/gen_audio.py --words      # слова, формы, примеры
python tools/audio/gen_audio.py --placement  # тест уровня
python tools/audio/gen_audio.py --force      # перегенерировать всё
python tools/audio/gen_audio.py --verify     # только проверка файлов
python tools/audio/gen_ipa.py                # транскрипции -> data/pron.json
```
После генерации закоммить `audio/` (включая `.hashes.json` и `index.json`). Версия в `audio/index.json`
растёт сама и сбрасывает кэш у пользователей.

Раскладка файлов: `audio/<эпизод>/<панель>-<реплика>.mp3` (номера с 1, считаются все реплики панели, включая
`narration-ru`), `audio/w/<id>.mp3`, `audio/w/<id>-ex.mp3`, `audio/w/f-<форма>.mp3`, `audio/p/<n>.mp3`, `audio/p/v-<слово>.mp3`.

## Голоса
Таблица `VOICES` в начале `tools/audio/gen_audio.py`: персонаж -> (голос Kokoro, скорость). Список голосов:
`Kokoro(...).get_voices()`. У реплики может быть необязательное поле `"voice": "<id персонажа>"`, чтобы
прочитать её чужим голосом (например, Безмолвный говорит голосом Дэна). Чтобы сменить голос, поменяй таблицу и
запусти с `--force` (или просто запусти: хэш включает голос и скорость).
Если общий размер вырос, уменьши `BITRATE` до 40.

## Gemini TTS: диалоги (`gen_gemini.py`)
Все английские реплики эпизодов (speech, thought, shout, narration, system) озвучивает Gemini TTS
(`gemini-3.8-flash-tts`) с актёрской ремаркой из поля `delivery` (и, если есть, `tts_text` с метками `<sigh>`,
`<short pause>`). Kokoro остаётся для слов/примеров словаря и placement. Файлы пишутся в те же пути
`audio/<эп>/<панель>-<реплика>.mp3`. Ключ: `.models/gemini_key.txt` (в .gitignore). Состояние: `audio/.gemini.json`.
`python tools/audio/gen_gemini.py --dry-run | --limit N | --episode s1e02 | --patient`. Лимит бесплатного тарифа
~3 запроса в минуту (скрипт ждёт 21 с; 429 -> пауза, после ~10 минут подряд -> аккуратная остановка, запусти позже).
`gen_audio.py` пропускает реплики, которые уже озвучены Gemini (по `.gemini.json`).

### Кастинг голосов (таблица `GEMINI_VOICES` в `gen_gemini.py`)
Расширенная библиотека (`GET /v1beta/voices`) содержит ~735 английских голосов с возрастом/регионом, но детских
нет (минимум 20 лет), поэтому Пипа/Лину подбираем по высоте и энергии. Пробы лежат в `.models/tts_test/casting/`.
| Роль | Голос | Почему |
|---|---|---|
| Dan (24, усталый, добрый, тихий) | Zubenelgenubi | casual, ровный, неторжественный; утверждён пользователем по пробе; альтернатива en-us-storyteller-5 (25 лет, дикторский, но с региональным акцентом) |
| Mira (23, жилистая, сухая, низкий голос) | Kore | firm, собранный, низкий; en-us-commercial-15 звучит рекламно-приветливо |
| Keeper (безвозрастный, бархатный, опасный) | en-us-storyteller-12 | рассказчик 65 лет, низкий, медленный — «старый» бархат; Algieba слишком корпоративно-гладкий |
| Pip (11, уличный, быстрый) | en-us-zeno (high, 27, энергичный) | самый высокий мужской en-US голос; детей в библиотеке нет; Puck (upbeat) — запасной |
| Trader (50, добродушно-жадный) | Algenib | хрипловатый, низкий, плотный |
| Lina (человек, 14) | Leda | youthful |
| System | Charon | информативный, ровный, безличный |
| Silent | Enceladus | придыхание, «неправильность» |
| Рассказчик (narration) | Sulafat | тёплый storyteller |
