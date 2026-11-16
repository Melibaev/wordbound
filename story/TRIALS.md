# WORDBOUND — Испытания (Trials)

После каждой серии ученик проходит 2–4 **испытания**. Следующая глава открывается, только когда пройдены все испытания предыдущей (`js/trials.js`, ключ `unlocks`). Испытание — это **сцена манхвы**, а не контрольная: Дэн делает в мире то, что ему приходится делать между серией N и N+1. Ученик отвечает за Дэна.

Файлы: `data/trials/s1e01.json … s1e12.json`, список — `data/trials/index.json` (приложение загружает только перечисленные там эпизоды). Проверка: `python tools/validate_trials.py` (`-v` показывает ещё и заметки про базовые слова), результат должен быть `0 error(s)`.

---

## 1. Правила (если запомнишь только это)

1. **Сюжет, а не урок.** У каждого шага есть `story`: реплика персонажа, которая объясняет, *зачем* Дэну это нужно прямо сейчас. Пример: Мира шепчет «Shh. The System.», а потом звучит задание на аудирование.
2. **Между сериями, без спойлеров.** Испытание происходит после последней панели серии N и заканчивается так, чтобы первая панель N+1 шла следом:
   - нельзя решать за следующую серию её вопрос. Пример: выбор в s1e11 остаётся открытым, а испытания s1e11 кончаются строкой «The door is open. Your hand is on it.»;
   - нельзя дублировать её первую реплику;
   - нельзя называть то, что ещё не известно.
3. **Только пройденное.** Английский текст берётся только из слов, встреченных в сериях ≤ N, плюс базовые A1-слова. Слово, которое станет *новым словом* более поздней серии, запрещено. Пример: `stop` до s1e03, `she` до s1e05, `child` до s1e08. Грамматика следующих серий тоже запрещена:
   - до s1e05 нет `does`;
   - до s1e12 нет `'s`;
   - на всём Этаже 1 нет прошедшего, будущего и форм на -ing.
4. **Никакой речи вслух.** Только чтение, тап, ввод с клавиатуры и слушание. Когда Дэн «говорит» слово-силу, ученик его **печатает** (`type`) или **собирает** (`build`). Пример: «Дэн говорит слово-силу: «Стоп!»» → `stop`.
5. **Голоса держат характер.**
   - Мира — приговоры в 2–4 слова: «Loud. OK. Run.».
   - Система — сухие окна без «I», без вопросов и без «!».
   - Пип — цены и подколки: «Fast with words. Slow with legs.».
   - Хранитель — бархатная вежливость: «A price, Dan. All things have a price.».
   - Безмолвный — пустые чужие голоса.
6. **Награда — в мире.** Награда — это окно `reward` с фактом мира: «You stay in the light.», «Title: Teacher of One.». **Count, Missed calls, ранги и связанные слова в испытаниях не меняются.** Окна только повторяют значение, которое стоит на конце серии N, и валидатор это сверяет.
7. **Сложно, но честно.** В эпизоде 3 испытания по 5–6 шагов, всего 16–18 шагов. Порог `pass: 0.8`, `lives: 3`. Каждый шаг по отдельности лёгкий (~95 %). Трудность складывается из того, что ошибиться можно один раз за испытание.

### Арифметика движка (важно для автора)
`runTrial` требует `ceil(0.8 × шагов)` верных ответов и обрывает испытание, как только порог становится недостижим. Поэтому:

| Шагов в испытании | Нужно верных | Можно ошибиться |
|---|---|---|
| 3–4 | все | 0 — **не делай таких испытаний** |
| 5–9 | n − 1 | 1 |
| 10 | 8 | 2 |

Значит, три «жизни» при 5–9 шагах на деле не расходуются: раньше срабатывает порог 80 %. Отсюда правило: **5–6 шагов на испытание, максимум один `match` на испытание и в нём ровно 4 пары**. `match` засчитывается как ошибка при первом же неверном тапе.

Провал перезапускает только это испытание. Пройденные испытания не сбрасываются.

---

## 2. Типы заданий и как их «вшивать» в сюжет

| Тип | Что делает ученик | Сюжетная рамка (примеры из S1) |
|---|---|---|
| `choose` | выбирает 1 из 3–4 | «Что ответит Мира?»; «Чего Дэн НЕ может?»; разбор сделки Хранителя |
| `build` | собирает фразу из плиток (+ отвлекающие `distractors`, допустимые перестановки — `accept`) | дверь открывается фразой; Дэн пишет записку на Лестнице эха; предложение-сила «I find the light» |
| `type` | печатает слово или фразу (регистр и знаки не важны; `accept` — варианты) | Дэн произносит слово-силу: `open`, `stop`, `push`; называет себя «Zero» |
| `listen` | слушает (`audio_text`, `voice`, `delivery`) и выбирает или печатает | шёпот Миры в темноте; окно Системы; цена Пипа на слух («Four words? Eight apples!» → `eight`/`8`) |
| `match` | 4 пары EN↔RU | слова на дверях; числа торговца; «Remember, forget, stay, leave. His whole life.» |
| `fill` | вставляет пропуск (`___`), выбирая или печатая | Стена Букв с выпавшими камнями; «There ___ a Silent behind us.» |
| `pick_voice` | 2–3 клипа одной фразы, выбрать нужный голос; `options` — нейтральные подписи «Голос A/B» | настоящий Дэн против копии Безмолвного |

`pick_voice` — редкая специя: **3 раза за сезон** (s1e02, s1e08, s1e12). Без сгенерированного аудио (`tools/audio/gen_trials_audio.py`) приложение озвучивает всё одним голосом `speechSynthesis`, и задание становится нерешаемым.

### Подсказки-задания (`prompt.en`) — разговорник
Приложение показывает задание только если есть `prompt.en`. Его английский текст подчиняется тем же правилам уровня, поэтому подсказки собраны из ранних слов:

| С серии | `prompt.en` | `prompt.ru` (пример) |
|---|---|---|
| s1e01 | `What is it?` · `Who is it?` · `Find the right word.` · `Find the words.` · `Put the words in place.` · `In English.` · `What is it in English?` · `Mira says...` | «Что шепчет Мира?» · «Собери ответ Дэна…» · «Напиши, что крикнет Дэн…» |
| s1e02 | `Which voice is Dan?` | «Какой голос — настоящий Дэн?» |
| s1e03 | `Listen.` | «Послушай и выбери.» |
| s1e10 | `Make the sentence.` · `What is the right sentence?` | «Собери предложение-силу…» |
| s1e12 | `What does it mean?` · `What is the answer?` | «Какое слово Дэн объясняет?» |

---

## 3. Окна Системы

```json
{"kind": "quest|status|warning|reward", "title": "QUEST", "lines": [{"en": "QUEST: Run.", "ru": "ЗАДАНИЕ: Беги."}]}
```

- **intro**: окно `quest`, `status` или `warning` + 1–4 реплики. **outro**: окно `reward` + 1–4 реплики.
- Строки короткие, в стиле игрового интерфейса:
  - `QUEST: Know the trade.`
  - `Warning. They hear your name.`
  - `Mira is Zero now.`
  - `Title: Teacher of One.`
- Слово `Warning` открывается только в s1e04. До этого предупреждение — это окно `kind: "warning"` без самого слова: «A Silent is near.».
- **Непрерывность.** Валидатор берёт последние `Count: …` / `Missed calls: …` из серий ≤ N и сверяет с ними каждое окно и реплику Системы.

| После серии | Count | Missed calls | Что ещё держать |
|---|---|---|---|
| s1e01 | one (OPEN) | — | имени нет; Мира ещё не зовёт его «Zero» |
| s1e02 | one | — | Дэн — «Zero» |
| s1e03 | one | — | STOP — только «New word», ещё не связано |
| s1e04 | zero | — | имя DAN вернулось; OPEN у Хранителя |
| s1e05 | zero (в окнах лучше не упоминать) | — | PUSH — «New word» |
| s1e06 | two (PUSH, STOP) | — | у Миры два дыхания |
| s1e07 | four (+FIX, REST) | 10 | титул Roof-Fixer |
| s1e08 | four | 11 | Дэн один, Миры рядом нет |
| s1e09 | five (+READ) | 11 | Миры рядом нет до s1e10 p1 |
| s1e10 | 14 | 11 | Мира без имени и дыхания |
| s1e11 | 31, Rank WORD | 12 | выбор не сделан |
| s1e12 | one hundred, PHRASE, BUILDER | 12 | титул Teacher of One |

---

## 4. Кривая сложности

| Блок | Грамматика | Длина `build` | Аудирование | Ввод с клавиатуры |
|---|---|---|---|---|
| s1e01–e04 | be, this/that, a/the, повелительное + can, do/don't | 3–5 плиток | выбор из похожих фраз (last/lost, cold/gone) | одно слово-сила или 2–3 слова |
| s1e05–e08 | -s, does, there is/are, how much/many, числа, my/his/her, me/him/us | 4–7 плиток | на слух: числа, окончание -s, him/her/us | 3–4 слова; диктант 3 слов («No more breath», «Mom I love you») |
| s1e09–e12 | and/but/because, SVO, want/need/have to, 's, means | 5–9 плиток | длинные фразы Хранителя и Системы | предложения-силы («I close the door», «We go up») |

**Повторение.** Старые слова возвращаются в новых ролях:
- `door/open` проходят через весь сезон;
- `slow` появляется в s1e01, s1e03 и s1e12;
- «I am Dan» звучит в s1e01 (украдено), s1e04 (возвращено) и s1e12 (настоящий против копии).

---

## 5. План по сериям

У каждой строки:
- рамка — где и когда происходит действие;
- три испытания с главными заданиями;
- последняя строка — мост в следующую серию.

### s1e01 → s1e02 · The Dark Way / Тёмный путь
Рамка: сразу после кражи имени. Мира тащит Дэна по коридору, Безмолвный идёт следом. Грамматика: am/is/are.
1. **Not Dead / Не мёртвый.**
   - на слух: «You are very slow.»;
   - `I ___ tired.`;
   - собрать «I am not weak»;
   - слово-сила `open`;
   - шёпот «Loud is dead here.».
2. **Doors in the Dark / Двери в темноте.**
   - `match` слов на дверях;
   - «It ___ home.» (goes);
   - на слух last/lost;
   - `Open the hatch`;
   - вопрос «Where is my door».
3. **It Is Not Tired / Он не устаёт.**
   - голос Безмолвного «I am lost. Help me.»: кто это?;
   - `We ___ slow.`;
   - «It is a Silent».

Мост: «It is slow. It is not tired. Run.» → s1e02 открывается погоней.

### s1e02 → s1e03 · The Safe Room / Безопасная комната
Рамка: комната с лампой, снаружи стучат. Грамматика: this/that, a/the.
1. **Names on the Wall / Имена на стене.**
   - `___ lamp is here, with me.` (This) против `___ is a name. Far…` (That);
   - «Silents stay out of the light.».
2. **Out There / Там, снаружи.**
   - `pick_voice`: Дэн и копия Безмолвного говорят «I am not weak.»;
   - «Stay in the light».
3. **Cold / Холодно.**
   - детский голос «It is cold.»;
   - «That is ___ Silent with a little voice.»;
   - Дэн называет себя `Zero`.

Мост: окно «The door is not open.» + «Why am I at the door?» → s1e03 p1 «That is not me. I stop.».

### s1e03 → s1e04 · After the Gate / За Воротами
Рамка: темнота сразу за Воротами, бархатный голос из темноты. Грамматика: повелительное + can.
1. **In the Dark / В темноте.**
   - «Take my hand»;
   - «Look down. Go slowly.»;
   - «Do not look at them.»;
   - `Come here`.
2. **Can and Can't / Могу и не могу.**
   - диктант «No more breath»;
   - «I can open the door»;
   - «Dan says: I can't… say my name.».
3. **A Voice in the Hall / Голос в зале.**
   - Хранитель: «Come here, Zero. Take my hand.»;
   - `Who are you` → «A good question. Later.» (рифма с s1e11);
   - «And welcome back, Mira.».

Мост: зажигаются лампы → s1e04 p1 «So many words!».

### s1e04 → s1e05 · Count: Zero / Счёт: ноль
Рамка: бегство по тёмному залу, Безмолвные слышат имя. Грамматика: do/don't.
1. **I Don't Have It.**
   - `I ___ have that word now.`;
   - «No, I don't.»;
   - `I am Dan`;
   - «I don't give. I trade.».
2. **The Trade / Сделка Хранителя** — расшифровка сделки:
   - «One word, one name. That is the price.»;
   - «I trade names ___ words.»;
   - «A name is me»;
   - итог: «his name. No OPEN.».
3. **They Hear Your Name.**
   - «Don't say your name.»;
   - «We need a door»;
   - на слух «Count: zero. Again.».

Мост: «A door. You have no OPEN.» + «Think, Zero. Think!» → s1e05 p1 «I can't open it! No OPEN!».

### s1e05 → s1e06 · The Last Door / Последняя дверь
Рамка: та же секунда у последней двери. Маленький Безмолвный с красной нитью, Мира не может двинуться. Грамматика: he/she -s, does, wh-вопросы.
1. **The Red Cord.**
   - `It ___ a red cord.`;
   - «Mira does not move»;
   - `Who is she`.
2. **How Does It Hear?**
   - `How ___ it hear us?`;
   - «He lives in the Hall.» против «He live…»;
   - «Why does she wait here»;
   - слово-сила `push` → «The door is heavy. It does not move.».
3. **She Does Not Have the Word.**
   - «Mira ___ here. Three years.»;
   - на слух «She does not have that word.» против «hear»;
   - `why`.

Мост: «She can't say the word. And I don't know it.» → s1e06 p1.

### s1e06 → s1e07 · Up There / Там, наверху
Рамка: подъём по Лестнице эха к рынку с Пипом и слабой Мирой. Грамматика: there is/are, предлоги места.
1. **300 Stairs.**
   - «There ___ many stairs.»;
   - на слух 300/30/13;
   - записка «There is nothing under us»;
   - `match` up/down/under/behind.
2. **Pay the Boy / Пошлина Пипа.**
   - «Give me the yellow pencil.» → «I don't know. Not the pencil.»;
   - «Is there help up there»;
   - `quiet`.
3. **Two Breaths.**
   - на слух «Mira has two breaths.»;
   - разбор «Then she is a Silent.»;
   - слово-сила `stop`;
   - «Sit ___, Mira.».

Мост: «Two words. Two breaths. Up.» → s1e07 p1 на рынке.

### s1e07 → s1e08 · The Song / Песня
Рамка: рынок после продажи телефона, песня зовёт. Грамматика: how much/many, -s, числа.
1. **Cheap for You / Тебе дёшево** — Пип торгуется:
   - `How ___ apples?`;
   - на слух «Four words? Eight apples!» → `eight`/`8`;
   - «Ten apples? Five words.»;
   - «How much is the bread».
2. **Twenty Jars.**
   - `match` twelve/twenty/eleven/nine ↔ цифры;
   - на слух twenty/twelve/two и apples/jar;
   - «How many jars do you have»;
   - «Missed calls: 10.».
3. **The Song.**
   - «She does not talk. She sings.»;
   - «A little girl.»;
   - `Lina ___ it every night.`;
   - на слух «The song stops.».

Мост: «A dead end. And a red…» → s1e08 p1 (тупик, красная нить).

### s1e08 → s1e09 · Alone / Один
Рамка: Дэн ушёл от Миры, рядом только Система и маленькая Безмолвная (Лина), которая ведёт его. Грамматика: притяжательные и объектные местоимения.
1. **Her Story.**
   - «Lina is ___ family.»;
   - «Our mother is gone.»;
   - «One word, whole.»;
   - «A friend does not use a friend»;
   - `alone`.
2. **Mine, Not Yours.**
   - «It is ___ word now.» (his);
   - «all ___ words» (her);
   - `match` me/him/us/them;
   - «He is bad for us!»;
   - диктант «Mom I love you» → «Missed calls: 11.».
3. **Come. You.**
   - `pick_voice`: Мира или Безмолвный говорит «Zero. Wait.» за спиной;
   - «I go with ___.»;
   - «This place is new for me».

Мост: «This place is not on her map.» → s1e09 (Стена Букв).

### s1e09 → s1e10 · The Wall Speaks / Стена говорит
Рамка: Стена Букв, Дэн и Лина. Грамматика: and/but/because.
1. **Lost Words / Пробелы в Стене** — заполни выпавшие камни:
   - «The Tower builds with words, ___ it can't make them.»;
   - «I am Dan. I am not weak. I am ___.»;
   - «Stop ___ push.»;
   - «Every lost word comes here».
2. **A Door Hears a Reason.**
   - «Let me in, because I learn.»;
   - «___ I don't like her now.»;
   - «We find her because she is alone»;
   - `because`.
3. **My Voice in the Wall.** Стена повторяет голос Дэна с первой ночи:
   - «on the first night.»;
   - «OK. OK. OK.»;
   - «The others buy but you learn».

Мост: «Someone comes. She hears your voice.» → s1e10 p1 (Мира пришла на голос).

### s1e10 → s1e11 · Who, What, Where / Кто, что, где
Рамка: Мира без имени и дыхания. Дэн несёт её сквозь Безмолвных к лампе. Грамматика: порядок слов S-V-O.
1. **I Hold Her.**
   - «I hold Mira.» против «Mira I hold.»;
   - «I find the light»;
   - на слух «Sentence: 4 words. True.»;
   - `I close the door`.
2. **Every Door Hears.**
   - «Bring your name to my hall.»;
   - «I stop the Silent»;
   - «Every door hears a true ___.»;
   - `I find the lamp`.
3. **Mira Is Zero.**
   - «She ___ no name now.»;
   - «His name for her name.»;
   - «I make a new plan»;
   - `last`.

Мост: «Mira. Look at me.» → s1e11 p1 «You are Mira.».

### s1e11 → s1e12 · Choose, Dan / Выбирай, Дэн
Рамка: Зал Слов, Хранитель, открытая дверь домой. Выбор **не делается**. Грамматика: want to / need to / have to.
1. **The First Zero** — расшифровка истории Хранителя:
   - «A young man. No words. No friend.»;
   - `forty`;
   - «Every year I want ___ go home.»;
   - «One remembers. One ___.»;
   - «I need your name».
2. **Two Ways.** Два пути пересказаны выбором:
   - «Mira has her name. Dan stays.»;
   - «Dan goes home and forgets Mira.»;
   - «I don't want to leave her»;
   - `choose`.
3. **Mom Calls.**
   - диктант «call me»;
   - «I need ___ call her.»;
   - «I want to remember her voice»;
   - «She wants Dan to go home.».

Мост: «The door is open. Your hand is on it.» + «Mom. I hear you.» → s1e12 p1 (рука на двери).

### s1e12 → s2e01 · The Way Up / Путь наверх
Рамка: после последней двери Этажа Имён — свет сверху и голос «Come up, Dan». Грамматика: 's, X means Y, повторение сезона.
1. **What Does It Mean?** — Define:
   - определение «Lina's mother is your mother…» → `sister`;
   - «Lina is ___ sister.» (Mira's);
   - Мира впервые: «I am your sister. I am here.»;
   - «It ___ we are together.».
2. **Teacher of One.**
   - Хранитель: «You give, and you still have it.»;
   - определения together и hundred;
   - «Nobody pays for it»;
   - `teach`.
3. **One Hundred.**
   - `pick_voice` «I am Dan.» — настоящий против копии (рифма с первой ночью);
   - голос Башни «Mom waits, because you learn.»;
   - «your ___ voice» (mother's);
   - «I am Dan and we open this door together»;
   - `We go up`.

Мост: «Floor of Names: behind you. Next floor: up.» → S2E1 (Лестница света в Margin). Present continuous и Now-sight не раскрываются.

---

## 6. Как добавлять испытания (S2 и дальше)

1. Прочитай последнюю панель серии N и первую панель N+1 и найди «щель» между ними: в ней и происходит действие.
2. Выпиши слова и грамматику серий ≤ N и разговорник подсказок (§2).
3. Напиши 3 испытания по 5–6 шагов:
   - в каждом минимум 3 разных типа;
   - один `match` на 4 пары, не больше;
   - слово-сила серии — через `type`/`build`.
4. Окна: intro — `quest`/`status`/`warning`, outro — `reward`. Цифры только канонические.
5. Добавь файл в `data/trials/index.json`. Запусти `python tools/validate_trials.py` и `python tools/validate_content.py`, если трогал `words.json`.
6. Озвучка: `tools/audio/gen_trials_audio.py --episode sXeYY`.

Что проверяет `tools/validate_trials.py`:
- схему, индексы ответов, ключи шагов;
- что у каждого шага есть `prompt.en`;
- словарь (тот же токенайзер, что в `validate_content.py`) и уровень (новые слова будущих серий, уровень выше A1 без встречи в сериях);
- Этаж 1: нет прошедшего, будущего и форм -ing/-ed, кроме канонических формул вроде «Missed calls»; до s1e12 нет притяжательного `'s`;
- имена, ещё не появившиеся в сериях;
- что Мира не говорит SISTER до s1e12;
- непрерывность Count/Missed calls;
- речь Системы;
- размеры: 2–4 испытания, 12–20 шагов на эпизод, 3–8 шагов на испытание, `pass` 0.8, `lives` 3;
- `pick_voice` (одна фраза во всех клипах, по одной подписи на клип);
- допустимые перестановки в `build.accept`;
- соответствие `index.json` файлам.
