# Как рисовать WORDBOUND во Google Flow — пошаговая инструкция

Всё бесплатно в рамках подписки Google AI Pro. Делается на компьютере (Flow в браузере + одна команда в терминале).

> Интерфейс Flow иногда меняется. Если кнопка называется чуть иначе — ищи по смыслу. Названия ниже взяты из официальной справки Flow на ноябрь 2026.

---

## 0. Что важно знать заранее

**Лимиты картинок (в день, на Google AI Pro):**

| Модель | Лимит | Для чего |
|---|---|---|
| **Nano Banana Pro** | 100 в день | основная — лучше держит персонажей |
| Nano Banana 2.1 / 2 Lite | 1000 в день | черновики, если Pro закончился |

- Картинки **не тратят** кредиты Flow, только дневной лимит. Лимит обнуляется через 24 часа после первой генерации.
- Неудачные и заблокированные генерации в лимит не идут.
- **Видео тратят кредиты Flow** (баланс виден во Flow). Поэтому видео — только для 2–4 ключевых панелей эпизода, и только когда картинки уже готовы.

**Объём работы:** 83 панели в 5 эпизодах + 4 персонажа. Не надо делать всё сразу.
**План на первый день (~1–1,5 часа):** персонажи (шаг 2) + панели 01–08 первого эпизода.

**Где лежат промпты** (в папке проекта `D:\English\art-prompts\`):
- `characters.md` — персонажи;
- `s1e01.md` … `s1e05.md` — панели каждого эпизода по порядку.

Каждый блок в файле выглядит так:
```
## Панель 03
- Файл: art/s1e01/03.jpg          ← куда попадёт картинка
- Во Flow в начало промпта: @Dan   ← каких персонажей отметить
(серый блок с английским текстом)   ← это и есть промпт, копируешь целиком
```
Удобно открыть файл в VS Code / Блокноте (или в панели файлов Claude) рядом с окном Flow.

---

## 1. Подготовка (один раз)

1. Создай папку для скачанных картинок первого эпизода: `D:\English\incoming\s1e01`
   (потом так же `s1e02`, `s1e03`…). Папка `incoming` в git не попадёт — это просто «прихожая».
2. Открой https://labs.google/fx/tools/flow (или flow.google.com) и войди тем аккаунтом Google, где подписка AI Pro.
3. Создай **новый проект** и назови его `WORDBOUND S1`. Всё делай в одном проекте — тогда персонажи доступны для всех панелей.

---

## 2. Персонажи (один раз, ~30 минут)

Это главный шаг: благодаря ему Дэн на 1-й и 80-й панели выглядит одинаково.
Делай персонажей **по очереди**: Dan → Mira → Keeper → Silent. Для каждого ниже всё по шагам, в том порядке, в каком кликаешь. Систему рисует приложение, её делать не надо.

**Перед началом (один раз):** внизу в поле «Что вы хотите изменить?» выбери модель **Nano Banana Pro** — она точнее держит детали, чем 2.1.

**Кнопки на странице персонажа:** **Перегенерировать** — новый вариант с нуля; **Повторить** — ещё варианты в том же духе; поле **«Что вы хотите изменить?»** — точечная правка готовой картинки (заканчивай правку фразой `Keep everything else exactly the same.`).

---

### 👤 Персонаж 1 — Dan

**Шаг 1.** Слева **Characters** → **New Character**.

**Шаг 2. Аватар.** Вставь описание → **Generate**:
```text
Korean webtoon style, full colour, clean digital linework with soft cel shading. Portrait, head and shoulders, front view. 24-year-old East-Slavic man, lean, tired but kind face, short messy black hair with a cowlick, dark brown eyes with faint dark circles, round black-frame glasses with a small piece of white tape wrapped around the hinge, light stubble. Rumpled pale-grey button-up shirt, mustard-yellow office lanyard, a yellow carpenter pencil behind his right ear. Plain light background, no text.
```
Проверь: очки с изолентой **на дужке** (не на лице), карандаш за ухом, жёлтый бейдж, серая рубашка, усталое доброе лицо.
Если изолента оказалась на лице — в «Что вы хотите изменить?»:
```text
Remove the tape from his face. Put a small piece of white tape wrapped around the hinge of the glasses instead. Keep everything else exactly the same.
```

**Шаг 3. Тело.** Нажми **Создать тело** → вставь:
```text
Full body, standing straight, front view, same face, hair and glasses. Rumpled pale-grey button-up shirt with sleeves rolled to the elbows, mustard-yellow lanyard, loosened dark-olive chinos, white sneakers, yellow pencil behind his right ear. Slightly hunched, tired posture. Plain light background, no text.
```
Проверь: лицо как на аватаре, оливковые брюки, белые кроссовки.

**Шаг 4. Имя** (карандаш ✏️ сверху): `Dan`

**Шаг 5. Голос.** **Выбрать голос** → **Zubenelgenubi** (если не понравится — **Schedar**).
Пример диалога:
```text
Nine calls. All Mom. I am sorry, Mom... Wait. What is that door?
```
Настроить производительность:
```text
Tired 24-year-old man at 2 AM. Quiet, slightly hoarse, warm and honest. Short sentences with small pauses. Breathless and urgent when scared.
```
**Предварительное прослушивание** → **Добавить к персонажу**.

**Шаг 6. Информация о персонаже:**
```text
Dan Vey, 24, a tired design engineer who fell into the Tower, a place where words are power. He starts with zero words and loses his own name. Kind, quiet, stubborn; solves problems like an engineer. Glasses taped at the hinge, yellow pencil behind his ear.
```

**Шаг 7.** Справа сверху **Done**. ✅ Дэн готов.

---

### 👤 Персонаж 2 — Mira

**Шаг 1.** **Characters** → **New Character**.

**Шаг 2. Аватар:**
```text
Korean webtoon style, full colour, clean digital linework with soft cel shading. Portrait, head and shoulders, front view. 23-year-old woman, sharp narrow face, olive-tan skin, amber-gold eyes, a small scar through her left eyebrow, dark-brown choppy shoulder-length hair tied in a short ponytail with loose strands. Olive-khaki canvas climbing jacket, long cream scarf. Dry, unimpressed, half-lidded expression. Plain light background, no text.
```
Проверь: шрам на левой брови, янтарные глаза, короткий хвост, «скучающий» взгляд.

**Шаг 3. Тело** (**Создать тело**):
```text
Full body, standing, front view, same face and hair. Athletic and wiry build. Olive-khaki canvas climbing jacket with patched elbows, long cream scarf, black fingerless gloves, ink-black cargo trousers, rust-brown boots, a worn canvas backpack with a coil of rope, a frayed vermilion-red cord bracelet on her left wrist. Arms crossed, confident stance. Plain light background, no text.
```
Проверь: **красный шнурок на левом запястье** (важен для сюжета), перчатки без пальцев, рюкзак с верёвкой.
Если шнурка нет:
```text
Add a frayed vermilion-red cord bracelet on her left wrist. Keep everything else exactly the same.
```

**Шаг 4. Имя:** `Mira`

**Шаг 5. Голос:** **Kore** (запасной — **Despina**).
Пример диалога:
```text
Loud is dead here. Walk slow. You want help? Not my problem. Not today.
```
Настроить производительность:
```text
Young woman, dry and deadpan, sarcastic. Short clipped sentences, low and controlled, never shouts. A hint of hidden sadness.
```
→ **Добавить к персонажу**.

**Шаг 6. Информация о персонаже:**
```text
Mira, 23, a Tower climber with many words. Dry, sarcastic, speaks in short sentences, never smiles at her own jokes. Helps Dan reluctantly. Hides grief about her lost sister. Always wears a frayed red cord on her left wrist.
```

**Шаг 7.** **Done**. ✅ Мира готова.

---

### 👤 Персонаж 3 — Keeper

Его глаз никогда не видно, поэтому вторая картинка — не стоя, а сидя в кресле.

**Шаг 1.** **Characters** → **New Character**.

**Шаг 2. Аватар:**
```text
Korean webtoon style, full colour, clean digital linework with soft cel shading. Head and shoulders, front view. A man of indeterminate age in a long ink-black robe with a high deep hood that completely hides his eyes; only his pale thin lower face and a calm small smile are visible. Ochre thread script embroidered on the edge of the hood. Plain light background, no text.
```
Проверь: **глаз не видно**, только нижняя часть лица и улыбка.
Если глаза видны:
```text
Pull the hood lower so his eyes are completely hidden in shadow; only the lower face and smile are visible. Keep everything else exactly the same.
```

**Шаг 3. Тело** (**Создать тело**):
```text
Full body, seated in a very tall high-backed dark wooden chair, front view, same hooded figure. Long ink-black robe, sleeves embroidered with fine ochre thread script, ink-stained fingertips resting on the armrests, a brass quill pen tucked in the sleeve. Eyes always hidden by the hood. Plain light background, no text.
```
Проверь: высокое тёмное кресло, латунное перо, охровая вышивка на рукавах.

**Шаг 4. Имя:** `Keeper`

**Шаг 5. Голос:** **Umbriel** (запасной — **Gacrux**).
Пример диалога:
```text
Welcome, Zero. And welcome back, Mira. Every word has a price.
```
Настроить производительность:
```text
Calm, slow, velvety man. Polite, almost kind, but unsettling. A soft smile in the voice, long deliberate pauses.
```
→ **Добавить к персонажу**.

**Шаг 6. Информация о персонаже:**
```text
The Keeper of the Hall of Words. Calm, polite, patient, quietly dangerous. Trades words for words. His eyes are always hidden by a deep black hood; only his small smile is visible. Carries a brass quill.
```

**Шаг 7.** **Done**. ✅ Хранитель готов.

---

### 👤 Персонаж 4 — Silent

**Шаг 1.** **Characters** → **New Character**.

**Шаг 2. Аватар:**
```text
Korean webtoon style, full colour, clean digital linework with soft cel shading. Head and shoulders, front view. A gaunt humanoid creature with a smooth, featureless, matte paper-white head and face: no eyes, no nose, no hair, only a single thin vertical teal seam where a mouth would be. Tattered faded grey-teal remnants of human clothing. Unsettling, calm. Plain light background, no text.
```
Проверь: на лице **нет глаз и носа**, только тонкая бирюзовая полоска.
Если появились глаза или нос:
```text
Make the face completely smooth and featureless: no eyes, no nose, only one thin vertical teal seam for a mouth. Keep everything else exactly the same.
```

**Шаг 3. Тело** (**Создать тело**):
```text
Full body, standing, front view, same creature. Very tall (2.3 m) and thin, long arms and long thin fingers like unbound pages, ink-teal drips from the fingertips, tattered faded grey-teal clothing, body edges dissolving into cold teal shadow. Plain light background, no text.
```
Проверь: очень длинные руки и пальцы, бирюзовые капли с пальцев.

**Шаг 4. Имя:** `Silent`

**Шаг 5. Голос:** **Enceladus** (запасной — **Achernar**).
Пример диалога:
```text
I am Dan... Mira? It is cold.
```
Настроить производительность:
```text
Hollow breathy whisper, flat and emotionless, like an echo in a stone hall. Slightly too slow, unnatural pauses.
```
→ **Добавить к персонажу**.
(В сюжете Безмолвные говорят **украденными** голосами — Дэна, ребёнка. Для таких сцен в видео бери голос того, кого они копируют.)

**Шаг 6. Информация о персонаже:**
```text
The Silent: tall faceless creatures that steal words and names from tired people. They never show emotion, move slowly and listen for sound. They speak only with stolen voices. Smooth white face, a thin teal seam for a mouth.
```

**Шаг 7.** **Done**. ✅ Все персонажи готовы — переходи к панелям.

---

### Общие правки (для любого персонажа)

| Проблема | Что написать в «Что вы хотите изменить?» |
|---|---|
| На картинке текст или подписи | `Remove all text, letters and labels. Keep everything else exactly the same.` |
| Слишком бледные, выцветшие цвета | `Make the colours richer and more saturated, stronger contrast, like a full-colour webtoon. Keep everything else exactly the same.` |
| Тело не похоже на аватар | Нажми **Перегенерировать** на вкладке тела |
| Голос не нашёлся в списке | Введи имя в «Поиск объектов»; нет — бери запасной или любой с похожим описанием |

---

## 3. Панели — через агента Flow (основная работа)

Вручную по одной панели — долго. Поэтому работаем через **агента** (чат справа: «Что вы хотите создать?»): один раз задаём ему правила, а дальше отправляем сообщения сразу по **4 панели**. На эпизод — 4–5 сообщений.

Готовые сообщения лежат в `D:\English\art-prompts\agent\`:
- `instructions.md` — правила для агента (вставляется один раз);
- `s1e01.md` … `s1e05.md` — сообщения для каждого эпизода по порядку.

### 3.1 Настройки агента (один раз на проект)

1. В чате агента внизу нажми значок настроек (ползунки, рядом со стрелкой отправки) → **Настройки агента**.
2. Выставь:
   - **Подтверждать перед созданием: «Всегда».** Картинки кредиты не тратят, но так агент не запустит дорогое видео без спроса. Подтверждение — один клик на сообщение.
   - **Создание изображений по умолчанию:** формат **3:4**, количество **x1**, модель **Nano Banana Pro** (выбери в выпадающем списке вместо Nano Banana 2.1).
     x1 — чтобы не тратить дневной лимит (100 картинок Pro в день): неудачные панели проще переделать точечно.
   - **Создание видео по умолчанию:** **9:16**, **x1**, модель оставь.
3. **Сохранить.**

### 3.2 Инструкции для агента (один раз на проект)

Во Flow можно максимум **3 инструкции**, поэтому делаем так:

| № | Название | Референс | Что внутри |
|---|---|---|---|
| 1 | `WORDBOUND style` | нет* | стиль, палитра, 3:4, без текста + описание Keeper и Silent |
| 2 | `Dan` | персонаж **Dan** | как выглядит Дэн |
| 3 | `Mira` | персонаж **Mira** | как выглядит Мира |

Дэн и Мира есть почти в каждой панели — им отдельные инструкции с картинкой. Keeper и Silent появляются реже, их описание в общей инструкции, а в сообщениях они ещё и отмечены `@Keeper` / `@Silent`.

\* Если в инструкции можно добавить **несколько** референсов — добавь в первую Keeper и Silent.

Все тексты — в `art-prompts/agent/instructions.md`. Для каждой инструкции:

1. **Инструкции для агента** → **+ Добавить инструкцию**.
2. Переключатель слева — **включён**.
3. **Название инструкции** — из таблицы.
4. **Референс** (для Dan и Mira): **+ Референс** → выбери персонажа → **Добавить в инструкцию**.
5. В поле **«Создайте руководство для агента»** вставь английский текст этой инструкции из файла.

Когда все 3 готовы — **Готово**.

### 3.3 Генерация эпизода

1. В чате агента нажми значок нового сеанса (✎ справа от «Сеанс без названия») — на каждый эпизод свой сеанс, так агент не путает панели разных эпизодов.
2. Открой `art-prompts/agent/s1e01.md` → блок **«Сообщение 1 — панели 01–04»** → скопируй серый блок целиком → вставь в чат.
3. **Метки персонажей.** В тексте стоят `@Dan`, `@Mira` и т. д. Лучше, если они превратятся в «плашки» персонажей: если после вставки метка осталась простым текстом — сотри её и набери `@` → выбери персонажа из списка. Если лень — можно оставить текстом: инструкции из 3.2 всё равно подскажут агенту, как они выглядят. Попробуй на первом сообщении оба варианта и сравни.
4. Отправь (стрелка). Если агент спросит разрешение — подтверди.
5. Агент сделает 4 картинки. Проверь каждую:
   - ✅ персонажи похожи на себя (очки и карандаш у Дэна, шнурок у Миры);
   - ✅ нет текста, букв, пузырей, водяных знаков;
   - ✅ верхняя треть кадра свободная;
   - ✅ кадр соответствует описанию.
6. Если панель не удалась — напиши агенту коротко, например:
   ```text
   Redo panel 03: Dan must hold a coffee mug and the door must be much taller. Keep the same style.
   ```
   или
   ```text
   Redo panel 02: remove all text from the phone screen, just a soft glow.
   ```
7. Когда все 4 хороши — вставляй **Сообщение 2**, и так до конца эпизода.

> Если агент сгенерировал меньше картинок, чем панелей, или перепутал порядок — напиши: `You made N images, I need one image per panel 01-04 in order. Generate the missing ones.`

### 3.4 Библиотека, коллекции и скачивание

**Библиотекой пользуемся** — через неё удобно скачивать эпизод целиком.

- Агент просит складывать панели в коллекцию с именем эпизода (`s1e01`). Если он этого не сделал: **Библиотека** → **+** → создай коллекцию `s1e01` и перетащи туда удачные панели **по порядку** (01, 02, 03…). Неудачные варианты в коллекцию не клади.
- Скачать: наведи на коллекцию → значок **Download**. Придёт архив — распакуй его в `D:\English\incoming\s1e01`.

> ⚠️ **Первый раз:** после распаковки пришли мне список файлов из папки (или скриншот). Я проверю, сохраняется ли порядок панелей в именах, и при необходимости подстрою импорт. Пока не проверили — надёжный запасной путь: скачивать картинки по одной, **строго по порядку**: наведи на картинку → **More** (⋮) → **Download** → самое большое качество.

### 3.5 Что не нужно

- **Сцены** — это раздел для монтажа видео из клипов. Для панелей манхвы не нужен; может пригодиться позже для видео.
- **Инструменты / Создать инструмент** — пока не нужны: инструкция агента и готовые сообщения уже решают задачу. Если захочешь попробовать — сначала доделаем первый эпизод.

### 3.6 Запасной путь: без агента, по одной панели

Если агент работает плохо, используй обычные промпты из `art-prompts/s1e01.md` (там на каждую панель полный промпт): поле создания внизу → название модели → **Image** → **3:4**, **x2**, **Nano Banana Pro** → набери `@Персонажи` из строки «Во Flow в начало промпта» → вставь промпт → создать.

---

## 4. Загрузка картинок в приложение

Открой терминал в папке `D:\English` (в VS Code: Терминал → Новый терминал; или в Claude Code попроси меня — я сделаю это сам).

### 4.1 Проверка без изменений (сначала всегда так)
```bash
python tools/art/import_art.py incoming/s1e01 s1e01 --dry-run
```
Покажет, какой файл станет какой панелью:
```
flow_image_8f3a….png -> art/s1e01/01.jpg
flow_image_1b77….png -> art/s1e01/02.jpg
```
Если порядок верный — шаг 4.2. Если нет — переименуй файлы в `01.png`, `02.png`… и повтори.

### 4.2 Импорт
```bash
python tools/art/import_art.py incoming/s1e01 s1e01
```
Программа сама уменьшит картинки до 1080 px и сожмёт до ~250 КБ (чтобы приложение быстро грузилось и работало офлайн на iPhone) и запишет их в `art/s1e01/`.
После успешного импорта папку `incoming/s1e01` можно очистить.

### 4.3 Заменить одну панель или продолжить с середины
Положи в отдельную папку **только** нужные файлы и укажи, с какой панели начать:
```bash
python tools/art/import_art.py incoming/fix s1e01 --start 7
```
Один файл → станет панелью 07 (старая заменится). Три файла → панели 07, 08, 09.

---

## 5. Посмотреть результат

Проще всего — написать мне «картинки для s1e01 загружены»: я открою приложение, проверю панели и закоммичу.

Самому на компьютере:
```bash
python -m http.server 8765
```
Открой в браузере http://localhost:8765 → **Начать** (или «Эпизоды» → нужный). Панели с картинками будут цветными, остальные — пока старой графикой. Остановить сервер: `Ctrl+C`.

На iPhone картинки появятся после публикации на GitHub Pages.

---

## 6. Видео (по желанию, после картинок)

В файле эпизода у некоторых панелей есть блок **«Видео»** — это ключевые моменты (в 1-м эпизоде: 01, 07, 13, 16, 17, 18). Начни с 2–3 самых эффектных — видео тратят кредиты.

1. Поле промпта → название модели → **Video** → **Frames**.
2. Перетащи **готовую картинку этой панели** (из проекта Flow) на **+ Add start frame**.
3. Вставь английский текст из блока «Видео» этой панели.
4. Настройки: вертикальный формат (**9:16**), **1 output**, самая короткая длина. Модель — самая дешёвая из Veo (Fast/Lite), её качества хватает для лёгкой анимации.
5. **Generate**, выбери удачный вариант (движение мягкое, персонажи не «поплыли», нет текста).
6. Скачай: **More** → **Download** → **720p** (не больше — видео должно быть до ~4 МБ).
7. Загрузи в приложение (пример для панели 07):
```bash
python tools/art/import_art.py - s1e01 --video 7 "C:\Users\Laptop\Downloads\имя_файла.mp4"
```
В приложении видео тихо зациклено играет вместо картинки, когда панель на экране. У видео 9:16 края сверху и снизу будут немного обрезаны — это нормально.

---

## 7. Частые проблемы

| Проблема | Что делать |
|---|---|
| На картинке появился текст / буквы / пузыри | Перегенерировать; дописать `absolutely no text anywhere` |
| Персонаж не похож на себя | Проверь, что в начале промпта стоит `@Dan` (выбранный из списка, а не просто текст). Перегенерируй |
| В кадре лишний человек / два Дэна | Перегенерируй; допиши `only one Dan in the frame` |
| Нет варианта 3:4 | Выбери ближайший вертикальный (не 9:16, если есть 3:4/4:5); приложение аккуратно обрежет |
| Закончился лимит Nano Banana Pro | Подожди 24 часа или временно переключись на Nano Banana 2.1 |
| Импорт пишет `WARN: aspect …` | Картинка не 3:4 — она будет обрезана по краям. Если важное обрезалось — перегенерируй в 3:4 |
| Импорт пишет ошибку про Pillow | Выполни `python -m pip install --user pillow` |
| Перепутался порядок панелей | Переименуй файлы в `01.png`, `02.png`… и импортируй заново |

---

## 8. Порядок работы — коротко

1. Проект `WORDBOUND S1` во Flow.
2. 4 персонажа: Dan, Mira, Keeper, Silent — у каждого аватар + тело, голос, информация.
3. Настройки агента: «Всегда», 3:4, x1, Nano Banana Pro. 3 инструкции агента (стиль + Dan + Mira) из `art-prompts/agent/instructions.md`.
4. Новый сеанс агента на эпизод → по очереди сообщения из `art-prompts/agent/s1e01.md` → проверка → «Redo panel NN…» для неудачных.
5. Удачные панели — в коллекцию `s1e01` по порядку → скачать → распаковать в `incoming/s1e01`.
6. `import_art.py … --dry-run` → `import_art.py …`.
7. Сказать мне — проверю и опубликую.
