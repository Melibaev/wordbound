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
