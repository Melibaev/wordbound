# WORDBOUND — вся история в одном файле

## 0. Как пользоваться этим файлом

**Do NOT read this file whole — use story/DIGEST.md + specific sections via grep** (`grep -n "s1e07" story/STORY.md`, then read a line range). Файл огромный (~500 КБ): целиком его читать не нужно.

Это единый полный справочник по истории WORDBOUND. Если контекст ассистента сжат или потерян, достаточно дать ему этот файл: в нём правила мира, персонажи, план сезона, визуальная библия, полный сценарий всех готовых эпизодов (каждая реплика EN/RU), грамматика, квизы, статус картинок и планы.

**Файл создаётся автоматически — не правь его руками.** После любого изменения истории запусти: `python tools/story_dump.py`.

Где лежат исходные данные:

- `data/story.json`, `data/episodes/*.json` — эпизоды: панели, реплики, грамматика, квиз (то, что читает приложение);
- `story/bible.md` — библия: мир, персонажи, сюжет сезона, тайны, визуальная библия;
- `story/visual.json` — машиночитаемая копия визуальной библии для генераторов картинок;
- `story/shots.json` — подробные кадры (камера, действие, лица, реквизит, свет, запреты) для эпизодов 3–5;
- `story/checks.json` — русские чек-листы «что проверить на картинке»;
- `story/synopses.json` — русские синопсисы эпизодов;
- `art/manifest.json` — какие картинки и видео уже импортированы.

---

# 1. Библия (файл story/bible.md, дословно)

# WORDBOUND — библия истории, сезон 1

Рабочие термины: **Plain words** — простые (серые) слова; **Bound words** — связанные слова (красные, дают силу); **Breath** — дыхание; **the Count** — счёт слов; **Silent** — Безмолвный; **Keeper** — Хранитель; **the Hall of Words** — Зал Слов.

---

## 1. Правила мира (точно)

**Башня.** Огромное сооружение, внутри которого другой мир. Попасть туда можно только через «Дверь», которая появляется в месте, где человек измотан и в чём-то виноват перед собой. Обратно ведёт единственная известная дорога: *последняя дверь этажа*, и она закрыта. Башня — не здание, а **растущая фраза**: её этажи сложены из слов, украденных у людей; она учится говорить и копирует всё, что слышит (подробности — в разделе «Тайны»). Сезон 1 происходит на **Этаже Первом, «Этаже Имён»**.

**Язык и перевод.** В Башне все говорят на «Plain» (английском). Новичкам Башня *переводит и ограничивает речь*: короткие фразы, пока человек мало освоил. Чем больше слов и конструкций он освоил, тем длиннее фразы Башня «пропускает». Это объясняет, почему Дэн (почти без английского) понимает речь, почему его первые фразы 2–5 слов, и почему Мира с ним тоже говорит короткими фразами. Так в мире истории объясняется рост сложности языка по эпизодам.

**Условность подачи.** Английские реплики в офисе (E1, панели 1–6) — учебная запись того, что Дэн на самом деле говорит и думает по-русски; в Башне же английский — настоящий язык мира. Система везде — «it» в английском тексте и «Система» (ж. р.) в русском.

**Plain words (серые).** Любое слово, которое человек просто знает. Бесплатны, силы не дают. Их понимают все.

**Bound words (красные).** Слово становится *связанным*, когда человек (а) по-настоящему понял его значение и (б) произнёс его всерьёз в момент нужды. Система объявляет: `New word: X.` Связанное слово даёт **ровно то действие, которое оно означает** («OPEN» открывает то, что можно открыть; «STOP» останавливает то, что слышит голос). Сила слова ограничена его значением и *слышащей аудиторией*: слово действует на то, что может его услышать.

**Цена силы — Breath (дыхание).** Каждое применение связанного слова тратит дыхание. Мало дыхания — человек бледнеет, дрожит, из губ выходит тонкая красная нить («word-thread»). Совсем без дыхания — человек падает и становится уязвимым для Безмолвных. Дыхание медленно восстанавливается в безопасных местах.

**The Count.** Число связанных слов человека. Система показывает его в окне. У Дэна в начале Count = 0. Система не отвечает на «большие вопросы», пока Count не достигнет 100 (Система сама ограничена: она отвечает только теми словами, что понятны слушателю — отсюда «Ask me when you have 100 words»).

**Имя.** Имя — **первое связанное слово человека и «якорь» его Я**. Потерявший имя не может пройти Ворота (они проверяют имя) и становится «Zero» (прозвище Миры, позже — ласковое). Кто носит чужое имя (Безмолвный), может пройти Ворота вместо владельца.

**Безмолвные (Silent).** Бывшие люди, потерявшие *все* слова. Слепые: **слышат, не видят**. Они не могут говорить сами — только повторять услышанное чужими голосами. Они «кормятся» словами: каждое украденное слово даёт им несколько минут ощущения, что они кто-то. **Забирают слова только у тех, кто выдохся** (Breath ≈ 0, страх, усталость): повторив голосом жертвы фразу «I am …», они заставляют жертву онеметь на этом слове. Не заходят в свет, горящий на *связанном слове* (лампа «словесное топливо»).

**Хранитель (Keeper) и Зал Слов.** Хранитель — торговец. Правило обмена: **одно слово за одно слово/имя** («One word for one name»). Слова, которые он берёт, он хранит в стеклянных банках. Безмолвные приносят ему украденное, и он «возвращает» имена за плату. Проданное слово человек **не помнит как слово**: понятие остаётся, но сказать, прочитать или услышать его он не может (оно звучит для него как шорох/пустота).

**Система (System).** Бесполое «оно» (англ. *it*; в русской озвучке — «Система», женский род). Деадпан, сухая, коротко. Она **не лжёт, но и не договаривает**: на вопросы, ответы на которые не помещаются в словарь слушателя, отвечает «Ask me later». Объявляет `New word`, `Word lost`. Не может помогать действием; только информация и сарказм. Окно Системы — всегда одинаковое (см. визуальную библию).

**Безопасные комнаты.** Лампы, питающиеся чьим-то отданным словом («Lamp of a Given Word»). Безмолвные не подходят к свету. Лампа горит, пока слово не «выгорит» (часы, дни).

**Ворота.** Каменная арка, которая слышит имя. Открывается тому, чьё имя звучит у арки, — даже если говорит не владелец.

**Последняя дверь этажа.** Дверь, которая открывается только **предложением** (полной фразой «кто + что делает + что»), а не отдельным словом. Поэтому рост грамматики Дэна — рост силы и ключ к сюжету.

---

## 2. Персонажи (сезон 1)

### Dan (Дэн) — герой
24 года, инженер-конструктор в бюро, чертит чужие здания. Нет английского почти совсем; сложное — на слух.
- **Want:** вернуться домой, позвонить маме (в день рождения мамы он не позвонил; 9 пропущенных). Позже — вернуть имя; потом — спасти Миру.
- **Need:** перестать откладывать собственную жизнь и своё «я». Начать что-то *строить* для себя (его заброшенный проект — мост, нарисованный в 16 лет).
- **Secret:** на втором курсе он бросил рисовать свой мост — после насмешки преподавателя; с тех пор «чертит только чужое». Мама хранила тот чертёж.
- **Чёрточки:** юмор от усталости, инженерный взгляд (видит швы, стыки, нагрузку, «как это сделано»), упрямство, мягкость, склонность откладывать. Решает проблемы *обходным путём*.
- **Арка:** от «усталый, ведомый» → «тот, кто строит предложения (и сам решает)». Из «Zero» — в того, кто *называет* вещи правильно. Заканчивает сезон с именем, с мостом в голове и с выбором, который уже сделал сам.

### Mira (Мира) — наставница-попутчица
23 года, «альпинистка Башни» уже 3 года.
- **Want:** найти сестру **Lina (Лина)**, которую забрали Безмолвные в день, когда они вместе вошли в Башню.
- **Need:** принять помощь и простить себя: она продала слово «sister» Хранителю.
- **Secret:** Мира сама отдала слово **«SISTER»** Хранителю в обмен на карту к последней двери — и держит рядом Дэна (Zero), потому что **«Zero» можно провести через ту дверь**. Она его использует (сначала) и привязывается (потом).
- **Голос:** сухая, экономная, считает всё в «баллах», любит короткие приговоры («Loud is dead», «Not my problem»). Юмор — понурый, почти не улыбается. Вслух ласки не говорит; показывает делом (двигает его на безопасную сторону, ломает свой запас). Называет Дэна «Zero» даже после возврата имени — потом это звучит тепло.
- **Телесная метка:** красный шнурок на левом запястье (пара у Лины).
- **Арка:** от расчёта к риску ради Дэна; возвращает слово через Дэна.

### System (Система)
Голос Башни — её «первое выученное слово». Деадпан и язвительна, но **действительно заботится** (по-своему). **Pronoun: it.**
- **Want:** чтобы кто-то научил её говорить длинными фразами.
- **Need:** перестать копировать и сказать своё.
- **Secret:** Система — **голос самой Башни, которая учится**; она выбрала «Zero», потому что только человек с пустым словарём *учит* её, а не отдаёт ей украденное.
- **Арка:** к концу сезона (Count 100) отвечает на вопрос «Why me?» и впервые говорит *длинную* фразу.

### Keeper (Хранитель)
- **Want:** вернуться домой — через **Запечатанную дверь** в Зале.
- **Need:** признать, что торговля именами — это кража, и что он сам десятилетиями кормил Безмолвных.
- **Secret:** он **первый Zero** — тоже человек из «внешнего мира», лет 40 назад вошёл через свою «дверь» и стал торговцем, чтобы выжить. Именно он придумал правило «слово за имя». Хранитель — не злодей: он хочет домой и терпит последствия.
- **Арка:** от «ласковый хищник» к «человек, который открывает свою дверь ценой чужого имени».

### Silent (Безмолвный)
Не персонаж, а «вид». Один из них — «Echo» (Эхо), несущий голос **Лины**.

### Lina (Лина) — сестра Миры (появляется голосом и как силуэт)
Младшая (14 лет). Вошла с Мирой, была поймана Безмолвными. Сейчас — **Безмолвная со своим голосом**; её настоящее «я» не стёрто, потому что Мира держала её имя.

### Pip (Пип) — второстепенный (E6–E8)
Мальчишка 11–12 лет, «сборщик пошлины» на Лестнице эха, торгует тишиной. Нужен для юмора и информации.

---

## 3. Сюжет сезона 1: 12 эпизодов

(Языковая линейка: E1 2–5 слов; E5 до ~7 слов, present simple + can; E6–E12 — A1→A2: вопросы, don't, have to-like выражения в рамках уровня, наречия, затем простые предложения с because и and.)

**E1. The Door.** 2 ночи, Дэн в офисе; девять пропущенных от мамы. Из стены вырастает дверь, на которой горит красное слово OPEN; телефон звонит в такт стуку. Дэн входит — и оказывается на площади перед Башней. Система: «You have 0 words». Он успешно использует OPEN на ржавом люке (первая победа), встречает Миру, и Безмолвный заставляет его *выдохнуться* и забирает имя. **Клиффхэнгер:** Дэн открывает рот — а имени там нет, и чужой голос говорит «I am Dan».

**E2. No Name.** Погоня; Дэн (инженер) замечает, что «стена» — люк; ключ; лампа-слово — безопасная комната. Мира объясняет цену слов (дыхание) и что Безмолвные забрали имя. Царапины имён на стене — одно из них (читателю в картинке) «LINA». Мира не оставляет Дэна: «One day». **Клиффхэнгер:** снаружи голос Дэна просит открыть дверь — и вдруг меняется на детский: «Mira? Open the door.»

**E3. The Gate.** Дэн не открывает, и это первое его *решение*. Лампа догорает — надо идти. Мира ведёт его через Зал Слушающих (десятки безликих у стен), он придумывает отвлекающий камень, Мира тратит «Stop!» и бледнеет. Ворота требуют имя; Безмолвный произносит «I am Dan» — Ворота открываются для вора; они проскальзывают за ним. **Клиффхэнгер:** из темноты: «Welcome, Zero... and welcome back, Mira.»

**E4. The Price of a Name.** Зал Слов — тысячи банок с мерцающими словами. Хранитель держит имя Дэна. Цена — OPEN, единственная сила Дэна. Дэн видит банку с надписью, которую не понимает, — Мира слышит вместо слова пустоту (Система: «She does not hear that word»). Дэн меняет OPEN на имя. Хранитель тут же открывает Запечатанную дверь: на секунду — офис Дэна, телефон звонит. Дверь захлопывается. **Клиффхэнгер:** «Not yet, Dan. I need one more word.» — Хранитель сметает лампы, Безмолвные идут на имя Дэна.

**E5. A Voice in the Dark.** Дэн без OPEN, но с именем: придумывает толкать дверь (PUSH). Они бегут в коридор; Дэн задаёт вопросы (почему Хранителю нужен OPEN, почему Система выбрала его — «You have 0 words. That is why.»). Правила дыхания и «Silent hear» поставлены. У последней двери Безмолвный, стоящий на страже, говорит голосом ребёнка. **Клиффхэнгер:** «Mira. It is me.» — Мира роняет рюкзак: «She is my... I don't have the word.»

**E6. The Stair of Echoes.** Лестница, на которой каждое сказанное слово возвращается Безмолвным-эхом. Дэн и Мира поднимаются молча — общаются жестами и чертежами (Дэн рисует план), смешной эпизод. Пип, мальчишка-сборщик, продаёт «тишину». Пип рассказывает, что Мира «продала сестру» — Дэн понимает, что Мира не может сказать слово «sister». **Клиффхэнгер:** Мира падает: у неё осталось два слова дыхания; Пип: «Then she is Silent.»

**E7. The Ink Market.** Чтобы вернуть Мире дыхание, Дэн идёт на Рынок Чернил: торгуют словами, дыханием, именами. Платить нечем; Дэн *чинит* рушащуюся крышу ларька (инженерная победа) и получает слово REST в уплату. На рынке продают его *телефон*, который звонит голосом мамы: «Dan, eat something.» **Клиффхэнгер:** торговец: «A little girl sells it to me. She does not talk. She hums.» Лина жива — и рядом.

**E8. Lina.** Мира приходит в себя; Дэн узнаёт про Лину: флэшбек (тёплая «бумажная» палитра) — день, когда они вошли; сделка с Хранителем; «Zero can pass the door». Дэн понимает, что был инструментом. Ссора. **Клиффхэнгер:** Дэн уходит — и его перехватывает Эхо Лины, ведущее его *не к Мире*, а к Стене Букв.

**E9. The Wall of Letters.** Дэн один; Стена Букв — исполинская стена слов, украденных Безмолвными, составляющих *незаконченную фразу*. Система показывает: Башня — не здание, а предложение. Первая фраза: «I AM ...». **Клиффхэнгер:** на стене новая буква, имя «DAN», вспыхивает — и стена начинает повторять его *голосом Дэна*: Башня учится у него.

**E10. The First Sentence.** Мира находит Дэна. Дэн понимает, что может говорить *предложениями* — в них сила стабильнее и дешевле. Первое длинное предложение «I open the door» (он открывает вторую дверь без потери дыхания). Хранитель появляется — требует дверь. **Клиффхэнгер:** Хранитель забирает у Миры её последнее слово дыхания / слово «Mira» (её имя).

**E11. The Keeper's Door.** Мира теряет имя; Дэн в ярости торгуется с Хранителем: Хранитель рассказывает, что он *первый Zero*, и что дверь домой открывается предложением и двумя людьми: тем, кто помнит, и тем, кто зовёт. Хранитель предлагает Дэну билет домой — прямо сейчас — в обмен на «Mira». **Клиффхэнгер:** Дэн выбирает; последний кадр — его рука на двери в офис, и голос Миры: «Zero. Go.»

**E12. Sister.** Дэн *не уходит*: отдаёт Хранителю предложение, которое создаёт собственная дверь; говорит Лине-эху слово **«sister»** (Мира его не слышит, но Дэн говорит за неё) — Лина на секунду возвращается и называет Миру по имени, Мира получает слово обратно. Система при Count 100 отвечает «Why me?». Последняя дверь открывается — вверх, на Этаж Второй. **Клиффхэнгер сезона:** упавший в E1 телефон звонит *вверху* — голос мамы: «Dan. Eat something.» — но это Башня, которая выучила её голос.

---

## 4. Тайны и расплата

| Тайна | Где посеяна | Где разгадывается |
|---|---|---|
| Почему Дэн (0 слов)? | E1p8–9, E5p7 («0 words. That is why.») | E12: Система |
| Что Мира скрывает? | E2p11 (царапины), E3p10 (фреска), E4p6 (банка), E5p16 | E6 (Пип), E8 (флэшбек) |
| Чей детский голос? | E2p16, E5p14 | E7 (телефон), E8 (Лина), E12 |
| Зачем Хранителю OPEN? | E4 (Запечатанная дверь) | E11 (первый Zero) |
| Что такое Башня? | E1p7 (слова-лампады в небе) | E9 (Стена Букв) |
| Что за слово «sister»? | E4p6 (банка), E5p16 | E12 |
| Мама и телефон Дэна | E1p1–5, E4p14 | E7, E12 |
| Система: кто она? | E1p8, E5p6–7 | E9, E12 |

---

## 5. ВИЗУАЛЬНАЯ БИБЛИЯ (для генерации изображений, английский)

### 5.1 Global style line (prefix every prompt with this)
`Korean webtoon style, full colour, clean digital linework with soft cel shading, cinematic framing, vertical panel composition. Palette: warm paper cream #F3E9D2, ink black #1B1A17, ash grey #8C877C, ochre/brass lamp light #C99A3B, cold teal #2F7F86 reserved for the Silent, and vermilion #E8391D reserved ONLY for word power. No purple, no violet, no blue neon, no gradients of purple-to-blue.`

Colour rules: **vermilion = power of words** (glowing letters, the thread of breath, the System border). **Teal = the Silent** (shadows, ink, their skin edges). **Warm paper/ochre = safety, humans, lamps.** Office is the odd one out: cold fluorescent grey-green and sodium orange.

### 5.2 Characters

**Dan** — `24-year-old East-Slavic man, 178 cm, lean and slightly hunched, tired but kind face, short messy black hair with a cowlick, dark brown eyes with faint dark circles, round black-frame glasses, light stubble. Rumpled pale-grey button-up shirt with sleeves rolled to the elbows, loosened dark-olive chinos, white sneakers, a mustard-yellow office lanyard around his neck, a yellow carpenter pencil behind his right ear.` Signature: yellow pencil + taped glasses. Palette: pale grey, olive, mustard.

**Mira** — `23-year-old woman, 168 cm, athletic and wiry, sharp narrow face, olive-tan skin, amber-gold eyes, small scar through her left eyebrow, dark-brown choppy shoulder-length hair tied in a short ponytail with loose strands. Olive-khaki canvas climbing jacket with patched elbows, long cream scarf, black fingerless gloves, ink-black cargo trousers, rust-brown boots, a worn canvas backpack with a coil of rope. A frayed vermilion cord bracelet on her left wrist.` Signature: vermilion cord bracelet. Palette: olive, cream, rust, one thread of vermilion. Expression default: dry, unimpressed, half-lidded.

**The Silent** — `Tall (2.3 m), gaunt humanoid with a smooth, featureless, matte paper-white head and face (no eyes, no nose), a single thin vertical teal seam where a mouth would be. Long arms and long thin fingers like unbound pages. Dressed in tattered, faded grey-teal remnants of human clothing, ink-teal drips from the fingertips. Body edges dissolve into cold teal shadow.` Signature: mouth-seam. Palette: bone white, cold teal, grey.
**Lina (as a Silent)** — `Child-sized Silent (1.4 m) of the same design, with a faded fragment of a vermilion cord still tied around the left wrist.`

**Keeper** — `Man of indeterminate age, seen only from the nose down: pale thin face, calm small smile, ink-stained fingertips. Long ink-black robe with a high deep hood that hides the eyes, sleeves embroidered with fine ochre thread script, a brass quill pen tucked in the sleeve, sits in a very tall dark wooden chair.` Signature: quill + hooded smile. Palette: ink black, ochre, pale skin.

**System** — see 5.4.

### 5.3 Locations

- **Office at night:** `Open-plan engineering office, 2 AM, empty. Cold fluorescent grey-green light from the ceiling, a warm sodium-orange glow from city lights through the big window, a single glowing monitor with blueprint drawings, rolled drawings, cold coffee mug, cluttered desk. Mood: lonely, slightly sickly light.` Palette: grey-green + sodium orange (the only place with greens/oranges together).
- **Tower exterior / plaza:** `A colossal bone-white limestone tower rising through cream clouds beyond the frame, spiral balconies, thousands of tiny vermilion glowing letters drifting upward like lanterns, empty stone plaza at dusk. Sky: dusty apricot at the horizon to grey-teal above.` Low-angle for scale.
- **Corridors:** `Narrow stone corridor, soot-dark brown walls with torn paper pages glued on them, occasional vermilion lantern-words dripping a little light, cold teal darkness at the far end.` Palette: dark brown, a little vermilion, teal in the depth.
- **Safe room (Lamp Room):** `Tiny round room, ochre walls scratched all over with names, an old mattress and rusty tin cans, a bare lamp hanging from the ceiling whose flame has a vermilion core; warm ochre light, cosy and fragile.`
- **Hall of Listeners:** `A vast colonnade hall of pale stone pillars, dim ash-grey light from high slits, dozens of Silent standing along the walls with their blank faces turned toward the sound, a worn fresco of two girls holding hands near the exit arch.`
- **The Gate:** `Colossal stone arch, no handle or lock, house-high, with one long line of faint vermilion engraved letters above; cold teal shadows pool at the base.`
- **Hall of Words:** `Huge round library, shelves from floor to a domed ceiling, thousands of glass jars each holding a glowing vermilion word like fireflies, warm amber light, paper-strewn floor, a high-backed dark chair in the centre; behind the chair, a sealed door covered with vermilion wax seals.`
- **Last-door hall (dungeon):** `Cold bare stone hall with a high black wooden door at the far end, iron bands, a single guard Silent standing motionless; teal shadow, ash-grey light.`
- **Gate-of-the-floor flash scenes** (`flash` bg): pure white overexposed with a faint vermilion crack.

### 5.4 System window (always identical)
`A floating rectangular panel of aged cream paper with soft torn edges, a thin double border in vermilion #E8391D, small notched corners, black typewriter capitals, square brackets in vermilion, a faint round ink-stamp seal in the bottom-right corner. Slightly tilted 2-3 degrees, casting a soft shadow on the scene. Newly learned words are highlighted by a vermilion marker swipe behind the letters. Warnings: border solid vermilion and the text inverted (cream on vermilion).` No avatar, no face. Never blue, never glowing neon.

### 5.5 Word power visual
Spoken power words appear as **glowing vermilion lettering** curling out of the speaker's mouth (letter shapes composited later). Breath cost: a **thin vermilion thread** leaves the lips and the character pales (face loses colour, lips cracked). A word being taken: the thread is pulled away toward the Keeper/Silent.

### 5.6 Art directives for image-gen pipelines
- Text in images renders unreliably: never rely on readable text as the plot clue; letters are composited in the lettering pass. Write «vermilion lettering (added later)» in prompts.
- Refer to recurring characters by name and paste the fragment above.
- Vary shot types in sequence: establishing → close-up → over-the-shoulder → insert (prop) → low-angle → wordless beat.

---

# 2. Эпизоды

## Эпизод 1 (s1e01): The Door — Дверь

- **Уровень:** A1
- **Панелей:** 18
- **newWords:** door, open, word, run, help, who, what, tired, weak, slow

### Синопсис

Глубокой ночью Дэн, измотанный инженер-конструктор, сидит в пустом офисе: у мамы день рождения, а он не позвонил — на телефоне девять пропущенных. На стене, где двери быть не может, вырастает чёрная дверь с красным словом OPEN, и за ней стучат три раза. Дэн входит — и падает на площадь перед исполинской Башней, где Система сообщает: у него 0 слов. Он впервые применяет слово OPEN на ржавом люке и встречает Миру, сухую и экономную альпинистку. Из бирюзовой тени встаёт Безмолвный, Дэн выдыхается — и Безмолвный забирает его имя: в конце эпизода чужим ртом звучит «I am Dan».

### Сценарий по панелям

#### Панель 01

- **bg:** `office-night` | **mood:** `calm` | **sfx:** `—`
- **cast:** dan (left)
- **art:** High-angle dynamic shot over Dan's shoulder at a cluttered drafting desk at 2 AM, bold confident ink linework. His phone lights his tired face from below; the phone screen is a plain glowing rectangle. The blueprints and monitor show only abstract line drawings and grid lines, no writing. Cold green-grey fluorescent light, sodium-orange city glow in the window behind. Upper third of the frame is dark ceiling and window.
- **Реплики:**
  - `narration-ru` — **RU:** 02:07 ночи. Сегодня у мамы день рождения. Дэн обещал позвонить вечером. Он сидит над чужим чертежом, а телефон показывает девять пропущенных.
  - `thought / dan` — **EN:** Nine calls. All Mom. — **RU:** Девять звонков. И все от мамы.

#### Панель 02

- **bg:** `office-night` | **mood:** `calm` | **sfx:** `—`
- **cast:** dan (left)
- **art:** Extreme close-up of a phone held in Dan's hand; the phone screen is a plain soft glowing blank rectangle with no writing on it. A coffee ring on the desk beneath. The upper-left corner is dark plain wall; the out-of-focus rolled drawing of a bridge is pinned on the RIGHT side behind the hand.
- **Реплики:**
  - `narration` — **EN:** Mom: Dan, eat something. — **RU:** Мама: Дэн, поешь что-нибудь.
  - `thought / dan` — **EN:** I am sorry, Mom. — **RU:** Прости, мам.
  - `narration-ru` — **RU:** Она даже не сердится — и от этого хуже. Дэн чертит чужие здания. Его собственный мост лежит в ящике с шестнадцати лет.

#### Панель 03

- **bg:** `office-night` | **mood:** `tense` | **sfx:** `CREAK`
- **cast:** dan (left)
- **art:** Medium-wide shot at eye level, bold ink linework, one single full-bleed picture with no bands, borders or frames: Dan, holding a coffee mug, has turned around and stares at a tall black wooden door standing in the plain grey office wall where no door should be; a faint vermilion glow leaks around its edges. Dan is seen in three-quarter view from behind-left, his face in profile turned toward the door. The upper part of the picture shows the dim office ceiling with one fluorescent lamp, continuous with the room.
- **Реплики:**
  - `narration-ru` — **RU:** Три года Дэн знает эту стену. Он сам чертил этот этаж. Двери здесь быть не может.
  - `speech / dan` — **EN:** I know this wall. There is no door. — **RU:** Я знаю эту стену. Здесь нет двери.

#### Панель 04

- **bg:** `office-night` | **mood:** `tense` | **sfx:** `—`
- **cast:** —
- **art:** Insert close-up: an old brass door handle on black wood; above it, cracks of glowing vermilion light in the wood form the four large clear capital letters O P E N, one word only, easily readable. Tiny dust motes float in the glow. The upper-left corner is dark office shadow.
- **Реплики:**
  - `narration-ru` — **RU:** На ручке горит красное слово. Дэн читает его — «OPEN». Оно слабо пульсирует, будто дышит.
  - `speech / dan` — **EN:** A word on a door? What is that? — **RU:** Слово на двери? Что это?

#### Панель 05

- **bg:** `office-night` | **mood:** `tense` | **sfx:** `KNOCK`
- **cast:** dan (left)
- **art:** Close-up of Dan on the RIGHT half of the frame, wide frightened eyes behind clean round black glasses, the phone ringing in his raised hand; the black door in soft focus on the LEFT with ripples spreading through its wood from three knocks. The upper-left quarter and the bottom-left corner are dark door wood with nothing important.
- **Реплики:**
  - `narration-ru` — **RU:** Стук. Изнутри. Три раза, ровно. Телефон в руке звонит в такт.
  - `speech / dan` — **EN:** Who is there? — **RU:** Кто там?
  - `speech / dan` — **EN:** Mom, wait. One minute. — **RU:** Мам, подожди. Одну минуту.

#### Панель 06

- **bg:** `office-night` | **mood:** `tense` | **sfx:** `CLICK`
- **cast:** dan (left)
- **art:** Medium shot: the black door swings inward by itself, white light spilling over Dan's face and glasses; he leans back, one foot already stepping forward. His long shadow stretches behind him across the office.
- **Реплики:**
  - `speech / dan` — **EN:** It opens by itself! — **RU:** Она открывается сама!
  - `thought / dan` — **EN:** I am tired. This is a dream. — **RU:** Я устал. Это сон.
  - `narration-ru` — **RU:** Он знает, что туда нельзя. Он идёт. За дверью — свет, а здесь у него только остывший кофе.

#### Панель 07

- **bg:** `flash` | **mood:** `action` | **sfx:** `FLASH`
- **cast:** —
- **art:** Full-bleed white-out. Dan's small silhouette tumbling through light, arms flung wide; his phone slips from his fingers and spins away, its screen a tiny glowing rectangle shrinking into the white.
- **Реплики:**
  - `narration-ru` — **RU:** Свет. Пол уходит из-под ног. Телефон выскальзывает из руки и летит вниз, в белизну.
  - `shout / dan` — **EN:** Mom, wait for me! — **RU:** Мам, подожди меня!

#### Панель 08

- **bg:** `tower-exterior` | **mood:** `calm` | **sfx:** `—`
- **cast:** dan (left)
- **art:** Extreme low-angle establishing shot: Dan, tiny, sprawled on a stone plaza at dusk near the bottom-right; a colossal straight bone-white Tower of stacked smooth rings and bridges (an original invented design, perfectly vertical, no arches, no columns) rises endlessly through cream clouds. Thousands of small vermilion glyph-lanterns (abstract shapes) drift upward against an apricot-to-grey-teal sky. Clean plaza stones with no marks.
- **Реплики:**
  - `narration-ru` — **RU:** Дэн лежит на холодных плитах. Над ним — Башня, она уходит выше облаков. Вверх плывут красные огоньки. Это не огни. Это слова.
  - `speech / dan` — **EN:** What is this place? — **RU:** Что это за место?

#### Панель 09

- **bg:** `tower-exterior` | **mood:** `calm` | **sfx:** `—`
- **cast:** dan (left), system (right)
- **art:** Medium shot, bold ink linework: Dan on the LEFT half, waist-up, staring in shock, his glasses reflecting vermilion light. On the RIGHT half floats a large blank cream-paper window with a double vermilion border and a small round seal in its corner, completely empty, no title, no writing; it spans from the middle of the frame to the right edge and from about 35% to 85% of the frame height, slightly tilted, casting a soft shadow. The Tower and plaza behind.
- **Реплики:**
  - `system / system` — **EN:** Welcome to the Tower. — **RU:** Добро пожаловать в Башню.
  - `system / system` — **EN:** You have 0 words. — **RU:** У тебя 0 слов.
  - `narration-ru` — **RU:** Башня переводит Дэну — но только короткими фразами. Чем больше слов он освоит, тем длиннее будут фразы. Но слово здесь — не просто звук. Освоенное слово даёт силу.

#### Панель 10

- **bg:** `tower-exterior` | **mood:** `calm` | **sfx:** `—`
- **cast:** dan (left), system (right)
- **art:** Over-the-shoulder shot from behind Dan's right shoulder on the RIGHT: Dan jabs an indignant index finger at a blank cream-paper window with a double vermilion border floating on the LEFT (empty, no writing). His pointing hand has a thumb, one extended index finger and three curled fingers. The plaza stones and the base of the white Tower blur behind.
- **Реплики:**
  - `speech / dan` — **EN:** Zero words? I am Dan! — **RU:** Ноль слов? Я — Дэн!
  - `system / system` — **EN:** Words are power. You are weak. — **RU:** Слова — это сила. Ты слабый.
  - `speech / dan` — **EN:** I am not weak! I am tired. — **RU:** Я не слабый! Я устал.
  - `system / system` — **EN:** Tired is weak. — **RU:** Усталый — значит слабый.

#### Панель 11

- **bg:** `tower-exterior` | **mood:** `calm` | **sfx:** `—`
- **cast:** dan (left), system (right)
- **art:** Wide shot on the stone plaza at the foot of the white Tower: Dan on the LEFT turns to a blank stone wall behind him where there is no door, spreading both hands, baffled. On the RIGHT side floats a tall blank cream-paper window with a double vermilion border, empty, no writing, spanning from 55% to 95% of the frame width and from 10% to 70% of the height.
- **Реплики:**
  - `speech / dan` — **EN:** Where is my door? — **RU:** Где моя дверь?
  - `system / system` — **EN:** It is gone. — **RU:** Её нет.
  - `speech / dan` — **EN:** Is there a way home? — **RU:** Есть путь домой?
  - `system / system` — **EN:** Find the last door. It goes home. — **RU:** Найди последнюю дверь. Она ведёт домой.

#### Панель 12

- **bg:** `corridor` | **mood:** `tense` | **sfx:** `SCRATCH`
- **cast:** dan (left)
- **art:** Wide shot of a narrow soot-brown stone corridor lined with torn paper pages bearing only faint abstract marks, cold teal darkness at its far end. Dan crouches on the RIGHT beside a small square rusted iron hatch set low in the stone wall at knee-to-hip height (about one metre wide, rivets around its frame, heavy hinges, a round iron ring handle; clearly a small hatch, not a door); like an engineer he runs two fingers along the hinge and rivets, studying them closely, his mustard lanyard hanging from his neck, a yellow pencil behind his right ear. The left half of the frame is the empty corridor receding into teal darkness. Tiny dust shaking from the ceiling. The picture fills the whole frame edge to edge with stone wall and floor; the glowing marks on the walls are abstract swirls of vermilion light, not any real writing.
- **Реплики:**
  - `narration-ru` — **RU:** Площадь кончается коридором. В темноте скребутся чьи-то когти. Рядом в стене — ржавый люк. Дэн замечает заклёпки и петли: люк точно открывается.
  - `shout / dan` — **EN:** Open the hatch! — **RU:** Откройся, люк!

#### Панель 13

- **bg:** `corridor` | **mood:** `action` | **sfx:** `CLANG`
- **cast:** dan (left)
- **art:** Close-up of Dan's mouth and raised hand: glowing vermilion lettering pours out of his lips and slams into the rusted hatch, which bursts open in a shower of rust flakes. Dan's face is lit vermilion, shocked and delighted.
- **Реплики:**
  - `speech / dan` — **EN:** It works! — **RU:** Работает!
  - `system / system` — **EN:** New word: OPEN. — **RU:** Новое слово: OPEN.
  - `system / system` — **EN:** Count: one. — **RU:** Счёт: один.
  - `narration-ru` — **RU:** Count — это счёт: сколько слов у Дэна. Было ноль. Теперь одно — OPEN.

#### Панель 14

- **bg:** `corridor` | **mood:** `tense` | **sfx:** `—`
- **cast:** dan (right), mira (left)
- **art:** Medium two-shot: Mira steps out of the dark behind Dan, a rope coil on her shoulder, vermilion cord on her wrist, one eyebrow raised, deadpan. Dan jumps. The open hatch yawns black beside them.
- **Реплики:**
  - `speech / mira` — **EN:** You are loud. — **RU:** Ты шумный.
  - `speech / mira` — **EN:** Loud is dead here. — **RU:** Здесь шумный — мёртвый.
  - `speech / dan` — **EN:** Who are you? — **RU:** Кто ты?
  - `speech / mira` — **EN:** I am Mira. — **RU:** Я Мира.

#### Панель 15

- **bg:** `corridor` | **mood:** `tense` | **sfx:** `—`
- **cast:** dan (left), mira (right)
- **art:** Over-the-shoulder from Mira's side: Dan pleading with open hands, Mira stares past him, uninterested; behind him a pool of teal shadow quietly spreads across the floor.
- **Реплики:**
  - `speech / dan` — **EN:** Help me, please! Help me! — **RU:** Помоги мне, пожалуйста! Помоги!
  - `speech / mira` — **EN:** Not my problem. — **RU:** Не моя проблема.
  - `speech / dan` — **EN:** I am lost! Help me! — **RU:** Я заблудился! Помоги!
  - `narration-ru` — **RU:** Мира смотрит не на Дэна. Она смотрит ему за спину. Тень на полу растёт.

#### Панель 16

- **bg:** `corridor` | **mood:** `action` | **sfx:** `HISSS`
- **cast:** dan (left), mira (center), silent (right)
- **art:** Dramatic low-angle shot in the stone corridor: on the RIGHT a tall gaunt Silent rises out of the teal shadow behind Dan; its head is a completely smooth egg-shaped bone-white surface with NO eyes, NO eye slits, NO nose, only one thin vertical teal seam as a mouth; its two long thin arms hang at its sides, far from Dan. Dan in the middle foreground frozen mid-turn, glasses catching the light. Mira on the LEFT, lower half of the frame, already half-turned to bolt. The upper-left area is dark ceiling.
- **Реплики:**
  - `speech / mira` — **EN:** It is a Silent. — **RU:** Это Безмолвный.
  - `speech / dan` — **EN:** Who is that? What is a Silent? — **RU:** Кто это? Что такое Безмолвный?
  - `shout / mira` — **EN:** Run, Dan! Run now! — **RU:** Беги, Дэн! Беги сейчас!

#### Панель 17

- **bg:** `corridor` | **mood:** `action` | **sfx:** `STEP`
- **cast:** dan (left), mira (center), silent (center)
- **art:** Dynamic wide diagonal shot: Dan and Mira sprint down the corridor between vermilion lantern-glyphs; Mira in front on the RIGHT drags Dan by the sleeve; Dan behind on the LEFT stumbles, gasping, clean round glasses askew. Far behind them, small in the teal dark, the tall gaunt Silent just walks; its head is a completely blank white egg shape with no eyes, no eye holes, no mask features at all, only one thin vertical teal line. The top-left and bottom-left corners are dark stone floor and wall. The glowing marks on the walls are abstract swirls and drips of vermilion light, not characters of any real writing system (no Chinese, Japanese or Latin letters). The papers on the walls are blank and stained.
- **Реплики:**
  - `speech / dan` — **EN:** I am slow! I am so tired! — **RU:** Я медленный! Я так устал!
  - `speech / mira` — **EN:** You are slow. Run, run, run! — **RU:** Да, ты медленный. Беги, беги, беги!
  - `system / system` — **EN:** You are very slow. — **RU:** Ты очень медленный.

#### Панель 18

- **bg:** `black` | **mood:** `tense` | **sfx:** `—`
- **cast:** silent (center)
- **art:** Wordless close-up: the Silent's smooth face inches from the viewer, a reflection of Dan's frightened face in the dark; the teal mouth-seam begins to open.
- **Реплики:**
  - `narration-ru` — **RU:** Дэн падает. Дыхания нет. Безмолвные берут слова у тех, кто выдохся. Существо наклоняется — вместо рта у него щель.
  - `speech / silent` — **EN:** I am Dan. — **RU:** Я — Дэн.
  - `system / system` — **EN:** Word lost: DAN. — **RU:** Слово потеряно: DAN.
  - `narration-ru` — **RU:** Дэн открывает рот. Имени там больше нет. А у существа — его голос.

### Грамматика: Глагол to be: am / is / are

В английском нельзя пропустить глагол: «Я Дэн» — это «I am Dan». Для «я» ставим am, для «ты» (а ещё «мы», «они») — are, а для «он / она / оно / это» — is. Вопрос получается перестановкой: «Who are you?». Отрицание — просто not после глагола: «I am not weak». Слово, которое нужно назвать как слово, пишем ЗАГЛАВНЫМИ: OPEN. После he / she / it глагол получает -s: «It goes home» (оно идёт домой), а с I / you / we / they — без -s: «We go», «I go». We — «мы».

- I am Dan. — Я Дэн.
- You are weak. — Ты слабый.
- It goes home. — Она ведёт домой.

### Квиз

1. Почему Дэн не позвонил маме вовремя?
   - Забыл телефон дома
   - Сидел в офисе и работал **(верно)**
   - Мама не брала трубку
   - Телефон сломался
2. Что Система сказала Дэну про его слова?
   - У тебя 100 слов
   - У тебя 9 слов
   - У тебя 0 слов **(верно)**
   - У тебя 1 слово
3. Какое слово сработало на ржавом люке?
   - RUN
   - OPEN **(верно)**
   - HELP
   - DOOR
4. Что Безмолвный забрал у Дэна в конце?
   - Телефон
   - Ключ
   - Рюкзак
   - Имя **(верно)**

---

## Эпизод 2 (s1e02): No Name — Без имени

- **Уровень:** A1
- **Панелей:** 16
- **newWords:** that, key, light, wall, room, safe, big, small, name, gone

### Синопсис

Погоня продолжается: Безмолвный не бежит, он просто идёт и не отстаёт. В тупике Дэн как инженер замечает, что «стена» — это дверь, и находит ржавый ключ. Они прячутся в крошечной комнате, где горит лампа с красной сердцевиной пламени: Безмолвные не заходят в свет слова. Мира объясняет, что имя Дэна украдено, придумывает ему прозвище «Зеро» и признаётся, что помогает ему ненадолго. На стене сотни имён, и Мира быстро отдёргивает палец от одного из них. Снаружи голос Дэна просит открыть дверь, а затем меняется на детский: «Mira? Open the door. It is cold».

### Сценарий по панелям

#### Панель 01

- **bg:** `corridor` | **mood:** `action` | **sfx:** `STEP`
- **cast:** dan (left), mira (right)
- **art:** Wide diagonal chase shot down the soot-brown corridor: Dan and Mira run toward the camera, Dan wheezing; far behind them the Silent walks in a perfectly calm straight line, never faster, never slower. Vermilion lantern-words flicker on the walls as they pass.
- **Реплики:**
  - `narration-ru` — **RU:** Погоня продолжается. Безмолвный не бежит — он идёт. И не отстаёт ни на шаг.
  - `speech / dan` — **EN:** It walks! Why do we run? — **RU:** Он идёт шагом! Почему мы бежим?
  - `speech / mira` — **EN:** It is big. It is never tired. — **RU:** Он большой. Он никогда не устаёт.

#### Панель 02

- **bg:** `corridor` | **mood:** `tense` | **sfx:** `THUD`
- **cast:** dan (left), mira (right)
- **art:** Frontal wide shot of a blank dead end: a high wall of grey stone fills the frame; Dan and Mira skid to a halt in the foreground, backs to camera, dwarfed by the wall. Teal darkness creeps in from the corridor behind them.
- **Реплики:**
  - `speech / dan` — **EN:** A wall! A big wall! — **RU:** Стена! Большая стена!
  - `speech / mira` — **EN:** We are small. The wall is big. — **RU:** Мы маленькие. Стена большая.
  - `narration-ru` — **RU:** Тупик. Позади — ни звука, только тяжёлая, густая тишина. Безмолвные не топают. Они просто приближаются.

#### Панель 03

- **bg:** `corridor` | **mood:** `tense` | **sfx:** `—`
- **cast:** dan (left), mira (right)
- **art:** Close-up on Dan's eyes behind the taped glasses, scanning; cut-in insert of the wall: a hair-thin seam, two rusted hinges and a keyhole hidden under grime, drawn like an engineer's blueprint in sharp detail. Mira watches him, sceptical.
- **Реплики:**
  - `speech / dan` — **EN:** That is not a wall. That is a door. — **RU:** Это не стена. Это дверь.
  - `speech / mira` — **EN:** How do you know? — **RU:** Откуда ты знаешь?
  - `speech / dan` — **EN:** I know walls. I know doors. — **RU:** Я знаю стены. Я знаю двери.
  - `narration-ru` — **RU:** Три года он рисовал стены и двери на чужих чертежах. Наконец-то это пригодилось.

#### Панель 04

- **bg:** `corridor` | **mood:** `tense` | **sfx:** `CLINK`
- **cast:** dan (left), mira (right)
- **art:** Insert shot: a small rusty key lying in the dust at the foot of the wall, a single glint of ochre light on its teeth; Dan's hand reaching in from the edge of the frame. Behind, Mira's boots, tense, half-turned toward the dark.
- **Реплики:**
  - `shout / dan` — **EN:** A key! A small key! — **RU:** Ключ! Маленький ключ!
  - `system / system` — **EN:** That is a key. Wow. — **RU:** Это ключ. Ничего себе.
  - `narration-ru` — **RU:** Кто-то уронил его здесь — и не вернулся за ним.

#### Панель 05

- **bg:** `corridor` | **mood:** `action` | **sfx:** `CLICK`
- **cast:** dan (left), mira (right)
- **art:** Medium shot: Dan's trembling hands jam the key into the hidden lock; a small low door swings open in the wall revealing warm ochre light; Mira already shoving him in from behind, one glance over her shoulder at the approaching teal shadow.
- **Реплики:**
  - `shout / dan` — **EN:** Open, open, open! — **RU:** Открывайся, открывайся!

#### Панель 06

- **bg:** `room` | **mood:** `calm` | **sfx:** `SLAM`
- **cast:** dan (left), mira (right)
- **art:** Interior wide shot of a tiny round room in warm ochre light: Mira slams the small door and leans on it breathing hard, Dan collapses against the wall; in the middle of the ceiling hangs a bare lamp whose flame has a vermilion heart.
- **Реплики:**
  - `narration-ru` — **RU:** Дверца захлопывается. Тихо. Тепло. Под потолком горит лампа с красным сердечком пламени.
  - `speech / mira` — **EN:** This room is safe. — **RU:** Эта комната безопасна.
  - `speech / dan` — **EN:** Why is a small room safe? — **RU:** Почему маленькая комната безопасна?
  - `speech / mira` — **EN:** The light is a word. — **RU:** Этот свет — слово.

#### Панель 07

- **bg:** `room` | **mood:** `calm` | **sfx:** `—`
- **cast:** dan (left), mira (right)
- **art:** Close-up of the lamp: a vermilion core inside an ochre flame, tiny letters curling in the fire; Mira's gloved hand points up at it while Dan, below, gazes at it with open mouth.
- **Реплики:**
  - `speech / mira` — **EN:** Someone gives a word. The lamp burns. — **RU:** Кто-то отдаёт слово. Лампа горит.
  - `speech / mira` — **EN:** Silents stay out of the light. — **RU:** Безмолвные не заходят в свет.

#### Панель 08

- **bg:** `room` | **mood:** `calm` | **sfx:** `—`
- **cast:** dan (left), mira (right)
- **art:** Two-shot, intimate and warm: Dan slumps on an old mattress, Mira sits on a tin can across from him, unwrapping a cream scarf; steam of breath in the cool air. Dan gives a tired smile; Mira does not smile back.
- **Реплики:**
  - `speech / dan` — **EN:** Thank you, Mira. — **RU:** Спасибо, Мира.
  - `speech / mira` — **EN:** Not now. What is your name? — **RU:** Не сейчас. Как тебя зовут?

#### Панель 09

- **bg:** `room` | **mood:** `tense` | **sfx:** `—`
- **cast:** dan (left), mira (right)
- **art:** Close-up on Dan's face, mouth open, eyes searching; the lamp's glow trembles on his glasses; Mira blurred in the background, watching. A single thin vermilion thread of breath drifts from his lips and fades.
- **Реплики:**
  - `speech / dan` — **EN:** I am... I am... — **RU:** Я... Я...
  - `narration-ru` — **RU:** Он открывает рот. Слово не приходит. Там, где было имя, — пустое место.
  - `thought / dan` — **EN:** My name? What is my name? — **RU:** Моё имя? Как меня зовут?

#### Панель 10

- **bg:** `room` | **mood:** `tense` | **sfx:** `—`
- **cast:** dan (left), mira (right)
- **art:** Over-the-shoulder from behind Dan: Mira's hard amber eyes fixed on him, her hand resting on the small door; the lamp throws her shadow huge on the wall.
- **Реплики:**
  - `system / system` — **EN:** Word lost: DAN. — **RU:** Слово потеряно: DAN.
  - `speech / mira` — **EN:** The Silent has your name. — **RU:** Безмолвный забрал твоё имя.
  - `speech / dan` — **EN:** My name is gone! Give it back! — **RU:** Моё имя пропало! Верни его!
  - `speech / mira` — **EN:** It never gives. No name, no gate. — **RU:** Он не отдаёт. Нет имени — нет прохода в ворота.

#### Панель 11

- **bg:** `room` | **mood:** `calm` | **sfx:** `—`
- **cast:** dan (left), mira (right)
- **art:** Medium two-shot with a flicker of dry humour: Mira points at Dan like an examiner, Dan folds his arms indignantly, the System window floats between them, tilted, deadpan.
- **Реплики:**
  - `speech / mira` — **EN:** Zero words. No name. You are Zero. — **RU:** Ноль слов. Нет имени. Ты — Зеро.
  - `system / system` — **EN:** Zero is a good name. — **RU:** Зеро — хорошее имя.
  - `speech / dan` — **EN:** That is not funny. — **RU:** Это не смешно.
  - `speech / mira` — **EN:** A little. — **RU:** Немного смешно.

#### Панель 12

- **bg:** `room` | **mood:** `tense` | **sfx:** `—`
- **cast:** dan (left), mira (right)
- **art:** Wall detail: the ochre wall scratched all over with hundreds of names in different hands, some fresh, some faded to ghosts; Mira's thumb rests below one of them (lettering added later), Dan's finger traces another above it.
- **Реплики:**
  - `speech / dan` — **EN:** What is that on the wall? — **RU:** Что это на стене?
  - `speech / mira` — **EN:** Names. People wait in this room. — **RU:** Имена. Люди ждут в этой комнате.
  - `speech / mira` — **EN:** They wait. Then they are gone. — **RU:** Они ждут. Потом их нет.
  - `narration-ru` — **RU:** Мира проводит пальцем под одной из надписей и быстро убирает руку. Дэн замечает. Но молчит.

#### Панель 13

- **bg:** `room` | **mood:** `tense` | **sfx:** `—`
- **cast:** dan (left), mira (right), system (center)
- **art:** Medium three-shot: Dan sits forward, Mira looks away to the lamp, the System window hangs in the middle, its border a little brighter than before.
- **Реплики:**
  - `speech / dan` — **EN:** Why do you help me? — **RU:** Зачем ты мне помогаешь?
  - `speech / mira` — **EN:** One day. Then I am gone. Zero is useful. — **RU:** Один день. Потом меня нет. Зеро полезен.
  - `system / system` — **EN:** Mira. Not now. — **RU:** Мира. Не сейчас.
  - `speech / mira` — **EN:** Quiet, you. — **RU:** Помолчи.

#### Панель 14

- **bg:** `room` | **mood:** `tense` | **sfx:** `KNOCK`
- **cast:** dan (left), mira (right)
- **art:** Low wide shot along the floor: the small door in the foreground, a thin line of teal shadow under it, and a slow patient knock; Dan and Mira frozen on the mattress, their faces lit from above by the lamp.
- **Реплики:**
  - `narration-ru` — **RU:** Снаружи стучат. Ровно. Терпеливо. Так стучат те, кому некуда спешить.
  - `speech / mira` — **EN:** Be quiet. This room is safe. — **RU:** Тише. Эта комната безопасна.

#### Панель 15

- **bg:** `room` | **mood:** `tense` | **sfx:** `—`
- **cast:** dan (left), mira (right), silent (center)
- **art:** Split composition: left, the door with the teal gap beneath; right, Dan's hand hovering an inch from the iron handle, his face torn between longing and fear; Mira's hand grips his wrist.
- **Реплики:**
  - `speech / silent` — **EN:** Open the door. I am Dan. — **RU:** Открой дверь. Я Дэн.
  - `speech / mira` — **EN:** No! That is not you! Stay in the light! — **RU:** Нет! Это не ты! Оставайся на свету!
  - `thought / dan` — **EN:** That is my voice. That is my name. — **RU:** Это мой голос. Это моё имя.
  - `narration-ru` — **RU:** Дэн смотрит на ручку. Он так хочет вернуть себе имя — хоть так. Рука сама тянется вперёд.

#### Панель 16

- **bg:** `black` | **mood:** `tense` | **sfx:** `—`
- **cast:** mira (center), silent (right)
- **art:** Wordless dramatic close-up: Mira's face draining of colour, amber eyes huge, her right hand clutching the frayed vermilion cord on her left wrist; at the edge of frame, the dark outline of the door.
- **Реплики:**
  - `narration-ru` — **RU:** И вдруг голос за дверью меняется. Теперь это голос ребёнка. Мира знает, чей он.
  - `speech / silent` — **EN:** Mira? Open the door. It is cold. — **RU:** Мира? Открой дверь. Мне холодно.
  - `speech / mira` — **EN:** That is not... no. — **RU:** Это не... нет.

### Грамматика: This / that и a / the

This — то, что рядом («это»), that — то, что подальше («то, вон то»). Артикль a ставим, когда предмет новый («какой-то ключ»): «a key». Когда уже ясно, о каком предмете речь — ставим the: «the key». Если слово названо как слово, пишем его ЗАГЛАВНЫМИ: OPEN.

- This is a key. — Это ключ.
- That is a big wall. — То — большая стена.
- The light is small. — Свет маленький.

### Квиз

1. Что Дэн заметил в стене тупика?
   - Окно
   - Скрытую дверцу **(верно)**
   - Лифт
   - Лестницу
2. Почему в комнате безопасно?
   - Там нет двери
   - Там живёт Мира
   - Там горит лампа из слова **(верно)**
   - Там нет окон
3. Что случилось с Дэном, когда Мира спросила его имя?
   - Он назвал чужое имя
   - Он не смог его вспомнить **(верно)**
   - Он засмеялся
   - Он промолчал специально
4. Чей голос послышался из-за двери в конце?
   - Голос ребёнка **(верно)**
   - Голос Хранителя
   - Голос Системы
   - Голос мамы

---

## Эпизод 3 (s1e03): The Gate — Ворота

- **Уровень:** A1
- **Панелей:** 17
- **newWords:** can, go, come, look, stop, take, hand, gate, more, listen

### Синопсис

Дэн не открывает дверь голосу снаружи — это его первое собственное решение, и Система даёт ему слово STOP. Лампа догорает, и Мира разворачивает карту: путь ведёт через Зал Слушающих к Воротам, которые слышат только имена. Дэн придумывает отвлечь слепых Безмолвных брошенным камнем, но на выходе наступает на плитку, и Мира тратит всё дыхание на «Stop!». Теперь Дэн тащит Миру сам; у выхода она застывает перед фреской с двумя девочками и красным шнурком. У Ворот Безмолвный произносит украденное «I am Dan», створки открываются для вора, и герои проскальзывают следом. В темноте за ними слышен голос: «Welcome, Zero... and welcome back, Mira».

### Сценарий по панелям

#### Панель 01

- **bg:** `room` | **mood:** `tense` | **sfx:** `—`
- **cast:** dan (left), mira (right), system (center)
- **art:** Tight medium shot: Dan's hand freezes an inch from the iron handle; Mira's gloved fist clamps his wrist. The knocking has stopped. The System window hangs in the corner of the frame, its border brightening. Warm ochre lamp light, deep shadows.
- **Реплики:**
  - `narration-ru` — **RU:** Дэн отдёргивает руку. Это его первое решение в Башне — и он принял его сам. За дверью всё стихает.
  - `speech / dan` — **EN:** That is not me. I stop. — **RU:** Это не я. Я не открою.
  - `system / system` — **EN:** New word: STOP. — **RU:** Новое слово: STOP.
  - `speech / mira` — **EN:** Not bad, Zero. — **RU:** Неплохо, Зеро.

#### Панель 02

- **bg:** `room` | **mood:** `calm` | **sfx:** `—`
- **cast:** dan (left), mira (right)
- **art:** Close-up of the ceiling lamp: the flame has shrunk to a tiny ember with a faint vermilion heart; Mira kneels below it checking her backpack, Dan watches the light with worry. The room is noticeably darker, teal shadows creeping up the walls.
- **Реплики:**
  - `narration-ru` — **RU:** Лампа догорает. Слово, которое в ней жило, выгорает. Скоро в комнате не останется света.
  - `speech / mira` — **EN:** The light is small. Soon it is gone. — **RU:** Свет слабеет. Скоро его не будет.
  - `speech / dan` — **EN:** Then we go? — **RU:** Тогда мы идём?
  - `speech / mira` — **EN:** We go. Come here. Look. — **RU:** Идём. Иди сюда. Смотри.

#### Панель 03

- **bg:** `room` | **mood:** `calm` | **sfx:** `—`
- **cast:** dan (left), mira (right)
- **art:** Top-down insert on the floor: a worn hand-drawn map of the floor spread between Dan's and Mira's knees, a long winding path, a hall, and a big arch marked with a vermilion cross (lettering added later); Mira's finger traces the route.
- **Реплики:**
  - `narration-ru` — **RU:** Мира расстилает на полу потрёпанную карту. Этаж огромен. В конце пути — Ворота, а за ними Зал Слов, где, возможно, лежит имя Дэна.
  - `speech / mira` — **EN:** This is the gate. The gate hears names. — **RU:** Это ворота. Ворота слышат имена.
  - `speech / dan` — **EN:** I have no name. Can I go? — **RU:** У меня нет имени. Могу я пройти?
  - `speech / mira` — **EN:** I have a plan. It is a bad plan. — **RU:** У меня есть план. Он плохой.

#### Панель 04

- **bg:** `hall` | **mood:** `tense` | **sfx:** `—`
- **cast:** dan (left), mira (right)
- **art:** Epic wide establishing shot of a vast colonnade hall of pale stone pillars in ash-grey light; dozens of tall Silent stand motionless along both walls, heads tilted toward the sound of the heroes' steps. Dan and Mira tiny at the entrance, hand in hand.
- **Реплики:**
  - `narration-ru` — **RU:** Зал Слушающих. Десятки Безмолвных стоят вдоль стен. Они слепы. Но они слышат, как падает пылинка.
  - `speech / mira` — **EN:** Take my hand. Listen and go slowly. — **RU:** Возьми меня за руку. Слушай и иди медленно.
  - `speech / dan` — **EN:** I can go slowly. I am very good at it. — **RU:** Медленно я могу. У меня отлично получается.

#### Панель 05

- **bg:** `hall` | **mood:** `tense` | **sfx:** `—`
- **cast:** dan (left), mira (right), silent (center)
- **art:** Low-angle over-the-shoulder shot: a row of Silent heads in the foreground, blank faces tilted, Dan and Mira creeping past in the background along the wall; Dan staring up at them with a nervous half-smile.
- **Реплики:**
  - `speech / dan` — **EN:** I can count ten. No, more. More! — **RU:** Я вижу десять. Нет, больше. Ещё!
  - `speech / mira` — **EN:** Do not look at them. Look down. — **RU:** Не смотри на них. Смотри вниз.

#### Панель 06

- **bg:** `hall` | **mood:** `tense` | **sfx:** `—`
- **cast:** dan (left), mira (right)
- **art:** Close-up on Dan crouching, a palm-sized stone in his hand, his eyes tracing the hall's far corner; Mira beside him raises one eyebrow. A tiny engineer's grin on his face.
- **Реплики:**
  - `speech / dan` — **EN:** Mira. I have a plan too. — **RU:** Мира. У меня тоже есть план.
  - `speech / mira` — **EN:** What plan? — **RU:** Какой?
  - `speech / dan` — **EN:** A stone. A far wall. Listen. — **RU:** Камень. Дальняя стена. Слушай.
  - `narration-ru` — **RU:** Они слепы. Значит, их можно обмануть звуком. Дэн замахивается и бросает камень в дальний угол.

#### Панель 07

- **bg:** `hall` | **mood:** `action` | **sfx:** `CLACK`
- **cast:** dan (left), mira (right)
- **art:** Wide motion shot: the stone arcs through the air; across the hall every Silent head swings together toward the far corner like a field of turned flowers; Dan and Mira slip along the opposite wall, almost smiling.
- **Реплики:**
  - `speech / mira` — **EN:** Not bad. Not bad at all. — **RU:** Неплохо. Совсем неплохо.
  - `speech / dan` — **EN:** I know walls. Now I know halls. — **RU:** Я знаю стены. Теперь знаю залы.

#### Панель 08

- **bg:** `hall` | **mood:** `action` | **sfx:** `CRACK`
- **cast:** dan (left), mira (right)
- **art:** Dramatic close-up of Dan's sneaker as it cracks a loose tile; ripple rings of vermilion sound radiate across the floor; behind him, every Silent head snaps back toward him in a perfect line. Dan's eyes widen.
- **Реплики:**
  - `speech / dan` — **EN:** No, no. Sorry, sorry. — **RU:** Нет, нет. Простите.

#### Панель 09

- **bg:** `hall` | **mood:** `action` | **sfx:** `SHHH`
- **cast:** dan (left), mira (right), silent (center)
- **art:** Hero shot, low angle: Mira, arm outstretched, glowing vermilion lettering exploding from her mouth in a shockwave ring (lettering added later) that freezes the Silent mid-step; her face drains of colour, a thin vermilion thread trails from her lips.
- **Реплики:**
  - `shout / mira` — **EN:** Stop! Stop, all of you! — **RU:** Стоять! Все стоять!
  - `speech / dan` — **EN:** She can stop them! — **RU:** Она может их остановить!
  - `speech / mira` — **EN:** Not for long. Take my hand! — **RU:** Ненадолго. Бери руку!

#### Панель 10

- **bg:** `hall` | **mood:** `action` | **sfx:** `—`
- **cast:** dan (left), mira (right)
- **art:** Dynamic diagonal shot: Mira stumbling, knees buckling, pale, vermilion thread dripping from her lips; Dan hauls her arm over his shoulder and drags her toward the far exit arch; frozen Silent around them twitch, thawing.
- **Реплики:**
  - `speech / mira` — **EN:** I can't. No more breath. — **RU:** Не могу. Дыхания больше нет.
  - `speech / dan` — **EN:** Now you take my hand, Mira. — **RU:** Теперь ты возьми мою руку, Мира.
  - `narration-ru` — **RU:** Впервые за всю ночь Дэн тянет Миру, а не она его.

#### Панель 11

- **bg:** `hall` | **mood:** `calm` | **sfx:** `—`
- **cast:** dan (left), mira (right)
- **art:** Medium shot at the exit arch: a worn fresco on the wall shows two girls holding hands, one wearing a red cord on her wrist; Mira stops dead in front of it, her eyes wide, her own wrist cord in frame; Dan looks from the fresco to her.
- **Реплики:**
  - `narration-ru` — **RU:** У выхода из зала — старая фреска. Две девочки держатся за руки. У одной на запястье красная нить. У Миры на запястье такая же.
  - `speech / dan` — **EN:** Who is she? — **RU:** Кто она?
  - `speech / mira` — **EN:** No one. Go. Look at the gate. — **RU:** Никто. Идём. Смотри на ворота.

#### Панель 12

- **bg:** `gate` | **mood:** `tense` | **sfx:** `—`
- **cast:** dan (left), mira (right)
- **art:** Monumental low-angle wide shot: a house-high stone gate without handle or lock fills the frame, a single long line of faint vermilion lettering carved above the arch (lettering added later); cold teal shadow pools at the base; Dan and Mira tiny at its feet.
- **Реплики:**
  - `narration-ru` — **RU:** Ворота. Каменные, высотой с дом. Ни ручки, ни замка. Только строка над аркой.
  - `shout / dan` — **EN:** Gate, open! — **RU:** Ворота, откройтесь!
  - `system / system` — **EN:** The gate hears names. Not doors. — **RU:** Ворота слышат имена. Не двери.

#### Панель 13

- **bg:** `gate` | **mood:** `tense` | **sfx:** `—`
- **cast:** dan (left), mira (right), system (center)
- **art:** Medium three-shot at the foot of the gate: the System window glows a harder vermilion; Dan clutches his head trying to remember, Mira grips his shoulder, urging.
- **Реплики:**
  - `system / system` — **EN:** The gate wants a name. Say yours. — **RU:** Воротам нужно имя. Назови своё.
  - `speech / dan` — **EN:** I can't. It is gone! — **RU:** Не могу. Его нет!
  - `shout / mira` — **EN:** Think! Say it, Zero! — **RU:** Думай! Скажи, Зеро!

#### Панель 14

- **bg:** `gate` | **mood:** `tense` | **sfx:** `STEP`
- **cast:** dan (left), mira (right), silent (center)
- **art:** Over-the-shoulder shot from behind Dan and Mira: far down the hall, a single tall Silent walks toward them in a straight calm line, its pale face catching the light; Mira's back stiffens, Dan turns, horrified.
- **Реплики:**
  - `narration-ru` — **RU:** Позади — шаги. Не толпа. Один. Он идёт спокойно, как тот, кто знает дорогу.
  - `speech / mira` — **EN:** Listen. It comes here. — **RU:** Слушай. Он идёт сюда.
  - `speech / dan` — **EN:** That is the Silent! It has my name! — **RU:** Это тот Безмолвный! У него моё имя!

#### Панель 15

- **bg:** `gate` | **mood:** `action` | **sfx:** `—`
- **cast:** dan (left), mira (right), silent (center)
- **art:** Wide shot: the Silent stands in front of the gate and speaks; the vermilion line above the arch flares bright; Dan and Mira press themselves against the arch's side wall, caught between gate and Silent.
- **Реплики:**
  - `speech / silent` — **EN:** I am Dan. — **RU:** Я — Дэн.
  - `narration-ru` — **RU:** Ворота вздрагивают. Они слышат имя. Украденное имя, сказанное чужим ртом.

#### Панель 16

- **bg:** `gate` | **mood:** `action` | **sfx:** `BOOM`
- **cast:** dan (left), mira (right)
- **art:** Action shot: the gate splits down the middle, light flooding out; the Silent steps through, calm; Dan and Mira dash into the closing gap right behind it, Dan's glasses flying off his nose, Mira's scarf whipping.
- **Реплики:**
  - `shout / dan` — **EN:** That is my name! — **RU:** Это моё имя!
  - `shout / mira` — **EN:** Come on! Go, go, go! — **RU:** Давай! Бежим, бежим!

#### Панель 17

- **bg:** `black` | **mood:** `tense` | **sfx:** `—`
- **cast:** keeper (center)
- **art:** Almost entirely black frame: only a low amber candle lights the lower half of a hooded man's face, a pale thin calm smile, ink-stained fingertips folded; on the edges of the dark, two silhouettes, Dan and Mira, standing small.
- **Реплики:**
  - `narration-ru` — **RU:** Грохот. Темнота. И тихий довольный голос. Кто-то ждал их здесь.
  - `speech / keeper` — **EN:** Welcome, Zero. — **RU:** Добро пожаловать, Зеро.
  - `speech / keeper` — **EN:** And welcome back, Mira. — **RU:** И с возвращением, Мира.
  - `speech / dan` — **EN:** Back? — **RU:** Снова?

### Грамматика: Приказ и глагол can

Приказ в английском — это просто глагол без подлежащего: «Look!», «Take my hand!», «Go!». Чтобы запретить, добавляем do not: «Do not look». Глагол can значит «мочь, уметь» и никогда не меняется: «I can go», «She can stop them». Отрицание — can't (можно также can not, но в речи почти всегда can't). Вопрос получается перестановкой: «Can we go?».

- Look down. — Смотри вниз.
- Take my hand. — Возьми мою руку.
- I can go slowly. — Я могу идти медленно.

### Квиз

1. Что решил сделать Дэн, когда голос за дверью просил открыть?
   - Открыть дверь
   - Не открывать **(верно)**
   - Убежать
   - Позвать Миру
2. Как Дэн отвлёк Безмолвных в зале?
   - Крикнул
   - Включил свет
   - Бросил камень **(верно)**
   - Запел
3. Какое слово крикнула Мира, чтобы остановить Безмолвных?
   - Go
   - Look
   - Come
   - Stop **(верно)**
4. Кто открыл Ворота?
   - Дэн
   - Мира
   - Безмолвный с именем Дэна **(верно)**
   - Хранитель

---

## Эпизод 4 (s1e04): The Price of a Name — Цена имени

- **Уровень:** A1
- **Панелей:** 17
- **newWords:** know, want, need, have, think, give, say, dont, trade, price

### Синопсис

В Зале Слов тысячи банок со светящимися словами, а в центре в высоком кресле сидит Хранитель с глазами, скрытыми капюшоном. Он держит имя Дэна и меняет имена на слова: «one word, one name». Дэн видит банку со словом SISTER, Мира слышит вместо него только пустоту, а Хранитель намекает, что она знает цену. После воспоминания о маме Дэн отдаёт Хранителю свою единственную силу, OPEN, и получает имя обратно. Хранитель тут же произносит OPEN, и на миг в щели запечатанной двери видны офис Дэна и звонящий телефон, но дверь захлопывается: ему нужно ещё одно слово. Лампы гаснут, в зал льются Безмолвные, а Хранитель говорит: «Run, Dan. They hear your name».

### Сценарий по панелям

#### Панель 01

- **bg:** `hall` | **mood:** `calm` | **sfx:** `—`
- **cast:** dan (left), mira (right)
- **art:** Sweeping establishing shot: a vast round library, shelves climbing to a domed ceiling, thousands of glass jars each holding a glowing vermilion word like a caged firefly; warm amber light, paper scattered on the floor. Dan and Mira tiny at the entrance, Dan's mouth open in awe.
- **Реплики:**
  - `narration-ru` — **RU:** Круглый зал. Полки уходят под купол. В каждой банке — светящееся слово, как светлячок.
  - `speech / dan` — **EN:** So many words! — **RU:** Сколько слов!
  - `speech / mira` — **EN:** Do not touch the jars. — **RU:** Не трогай банки.

#### Панель 02

- **bg:** `hall` | **mood:** `tense` | **sfx:** `—`
- **cast:** dan (left), mira (right)
- **art:** Medium close two-shot: Dan looks sideways at Mira with a suspicious frown; Mira stares straight ahead, jaw set, her hand tight on the strap of her backpack.
- **Реплики:**
  - `speech / dan` — **EN:** He says welcome back. You know this place. — **RU:** Он сказал «с возвращением». Ты знаешь это место.
  - `speech / mira` — **EN:** I know it. I don't like it. — **RU:** Знаю. Мне оно не нравится.

#### Панель 03

- **bg:** `hall` | **mood:** `tense` | **sfx:** `—`
- **cast:** dan (left), mira (right), keeper (center)
- **art:** Frontal composition: at the centre of the hall the Keeper sits in a very tall dark wooden chair, hood hiding his eyes, a faint calm smile, a brass quill in his sleeve; behind the chair a heavy door covered in vermilion wax seals. Dan and Mira stand small in front of him.
- **Реплики:**
  - `narration-ru` — **RU:** В центре, в высоком кресле, сидит Хранитель. Лица не видно — только улыбку. За его спиной тяжёлая дверь, вся в красных печатях.
  - `speech / keeper` — **EN:** I know you, Zero. I have your name. — **RU:** Я знаю тебя, Зеро. Твоё имя у меня.
  - `speech / mira` — **EN:** Don't talk to him, Zero. — **RU:** Не говори с ним, Зеро.

#### Панель 04

- **bg:** `hall` | **mood:** `tense` | **sfx:** `—`
- **cast:** dan (left), keeper (right)
- **art:** Close-up on the Keeper's pale hand lifting a glass jar; inside it a tiny vermilion word pulses like a heartbeat (lettering added later). Dan, out of focus in the foreground, reaches for it.
- **Реплики:**
  - `speech / keeper` — **EN:** A Silent brings me names. I sell them back. — **RU:** Безмолвные приносят мне имена. Я продаю их обратно.
  - `speech / dan` — **EN:** Give it to me! — **RU:** Отдай!
  - `speech / keeper` — **EN:** I don't give. I trade names for words. — **RU:** Я не отдаю. Я меняю имена на слова.

#### Панель 05

- **bg:** `hall` | **mood:** `tense` | **sfx:** `—`
- **cast:** dan (left), mira (right), keeper (center)
- **art:** Medium shot: the Keeper leans forward, hood tilting, his pale smile widening; Dan clutches his own chest where a faint vermilion glow pulses through his shirt; Mira steps half in front of him.
- **Реплики:**
  - `speech / keeper` — **EN:** A trade is a trade. One word, one name. That is the price. — **RU:** Обмен есть обмен. Слово за имя. Такова цена.
  - `speech / dan` — **EN:** What word do you want? — **RU:** Какое слово тебе нужно?
  - `speech / keeper` — **EN:** You have one word. OPEN. I want it. — **RU:** У тебя одно слово. OPEN. Оно мне нужно.

#### Панель 06

- **bg:** `hall` | **mood:** `tense` | **sfx:** `—`
- **cast:** dan (left), mira (right), system (center)
- **art:** Medium shot: the System window, its border solid vermilion and the text inverted (cream on vermilion), floats between Dan and Mira; Dan is hunched with a haunted look; Mira clutches his sleeve.
- **Реплики:**
  - `system / system` — **EN:** Warning. OPEN is your only word. — **RU:** Предупреждение. OPEN — твоё единственное слово.
  - `speech / dan` — **EN:** I need it. I need my name too. — **RU:** Оно мне нужно. Имя мне тоже нужно.
  - `speech / mira` — **EN:** Think, Zero! A name is just a word. — **RU:** Думай, Зеро! Имя — всего лишь слово.

#### Панель 07

- **bg:** `hall` | **mood:** `tense` | **sfx:** `—`
- **cast:** dan (left), mira (right)
- **art:** Over-the-shoulder shot: Dan stands in front of a tall shelf, one jar glowing at eye level; Mira behind him turns suddenly pale at the sound of his voice, her hand covering her ear as if a high note stings.
- **Реплики:**
  - `speech / dan` — **EN:** SISTER? What is SISTER? — **RU:** SISTER? Что такое SISTER?
  - `speech / mira` — **EN:** I hear nothing. Put it down. — **RU:** Я ничего не слышу. Поставь на место.
  - `narration-ru` — **RU:** Дэн произносит слово с банки вслух. Мира слышит только шорох. Лицо у неё каменеет.
  - `system / system` — **EN:** She does not hear that word. — **RU:** Она не слышит это слово.

#### Панель 08

- **bg:** `hall` | **mood:** `tense` | **sfx:** `—`
- **cast:** dan (left), mira (right), keeper (center)
- **art:** Triangle composition: the Keeper leans back in his chair, relishing the moment; Mira, furious, steps toward him with a raised finger; Dan stands between, confused.
- **Реплики:**
  - `speech / keeper` — **EN:** Mira knows the price. Ask her. — **RU:** Мира знает цену. Спроси её.
  - `speech / mira` — **EN:** Don't say a word, Keeper! — **RU:** Ни слова, Хранитель!
  - `speech / dan` — **EN:** What price? — **RU:** Какую цену?
  - `speech / mira` — **EN:** Nothing. I don't want to talk. — **RU:** Ничего. Я не хочу говорить.

#### Панель 09

- **bg:** `hall` | **mood:** `calm` | **sfx:** `—`
- **cast:** dan (left)
- **art:** Quiet close-up on Dan alone, the jars blurring behind him into warm bokeh; an inset memory bubble in soft paper-cream tones: a hand writing a boy's name on a school notebook. His glasses reflect tiny vermilion words.
- **Реплики:**
  - `narration-ru` — **RU:** Дэн смотрит на светящиеся слова. Он вспоминает маму: как она выбирала ему имя, как выводила его на тетрадях. Девять звонков. Девять раз она произнесла это имя.
  - `thought / dan` — **EN:** I don't think so. A name is me. — **RU:** Не думаю. Имя — это я.

#### Панель 10

- **bg:** `hall` | **mood:** `tense` | **sfx:** `—`
- **cast:** dan (left), mira (right), keeper (center)
- **art:** Dynamic shot: Dan stretches his open hand toward the Keeper, jaw set; Mira lunges to stop him, caught mid-motion, scarf flying; the Keeper's smile does not move.
- **Реплики:**
  - `speech / dan` — **EN:** OK. Take OPEN. Give me my name. — **RU:** Ладно. Забирай OPEN. Верни моё имя.
  - `shout / mira` — **EN:** Zero, no! — **RU:** Зеро, нет!

#### Панель 11

- **bg:** `flash` | **mood:** `action` | **sfx:** `WHOOSH`
- **cast:** dan (center)
- **art:** Full-bleed vermilion-white burst: a thread of glowing vermilion lettering is torn out of Dan's chest in a long spiral, streaming across the hall into the Keeper's open jar; Dan arches back, mouth open, glasses slipping.
- **Реплики:**
  - `narration-ru` — **RU:** Слово вырывается из груди Дэна, как дыхание на морозе. Светящейся нитью оно летит к Хранителю. Внутри пусто — будто выдернули ключ.
  - `system / system` — **EN:** Word lost: OPEN. — **RU:** Слово потеряно: OPEN.

#### Панель 12

- **bg:** `hall` | **mood:** `calm` | **sfx:** `—`
- **cast:** dan (left), mira (right), keeper (center)
- **art:** Intimate close-up: the Keeper's pale hand offers a small glowing ember-ball of vermilion light; Dan's face lit warmly from below, eyes wet; Mira in the background, arms crossed, looking away.
- **Реплики:**
  - `speech / keeper` — **EN:** Now say it. Say your name. — **RU:** Теперь скажи. Назови своё имя.
  - `shout / dan` — **EN:** I am Dan! I have my name! — **RU:** Я Дэн! У меня есть имя!
  - `narration-ru` — **RU:** Имя возвращается — тёплое, родное, как старая куртка.

#### Панель 13

- **bg:** `hall` | **mood:** `calm` | **sfx:** `—`
- **cast:** dan (left), mira (right)
- **art:** Warm two-shot: Dan grins stupidly, glowing faintly vermilion at the chest; Mira, unimpressed, tilts her head at him with a tiny reluctant tug at the corner of her mouth.
- **Реплики:**
  - `speech / mira` — **EN:** You have your name. You have no OPEN. — **RU:** У тебя есть имя. У тебя нет OPEN.
  - `speech / dan` — **EN:** I know. I am a happy fool. — **RU:** Знаю. Я счастливый дурак.
  - `speech / mira` — **EN:** You are a fool, Zero. — **RU:** Ты дурак, Зеро.

#### Панель 14

- **bg:** `hall` | **mood:** `action` | **sfx:** `CRACK`
- **cast:** dan (left), keeper (right)
- **art:** Cinematic reveal: the Keeper stands and points at the sealed door behind his chair; vermilion lettering of OPEN streams out of his sleeve and the wax seals crack one by one; a slit of cold green-grey fluorescent light cuts into the amber hall, and through it Dan sees his own office, his desk, his coffee mug, and a phone ringing on it (lettering added later).
- **Реплики:**
  - `narration-ru` — **RU:** Хранитель встаёт. Он произносит OPEN — слово Дэна, теперь его слово. Печати на двери трескаются. В щели — офис Дэна. Его стол. Его кружка. Звонящий телефон.
  - `shout / dan` — **EN:** That is my office! That is my phone! — **RU:** Это мой офис! Это мой телефон!

#### Панель 15

- **bg:** `hall` | **mood:** `action` | **sfx:** `SLAM`
- **cast:** dan (left), mira (right), keeper (center)
- **art:** Action shot: Dan lunges for the narrow slit of light; the door slams shut, the wax seals knit back together; Mira catches Dan around the waist; the Keeper stands untouched, hands folded.
- **Реплики:**
  - `shout / dan` — **EN:** Open it! Open the door! — **RU:** Открой! Открой дверь!
  - `system / system` — **EN:** You don't have that word. — **RU:** У тебя нет этого слова.
  - `speech / keeper` — **EN:** Not yet. I need one more word. — **RU:** Пока нет. Мне нужно ещё одно слово.

#### Панель 16

- **bg:** `hall` | **mood:** `action` | **sfx:** `SCREECH`
- **cast:** dan (left), mira (right), keeper (center)
- **art:** Wide shot of the Hall: the lamps on the shelves go dark one after another from the entrance inward; teal silhouettes of Silent pour into the hall between the shelves; the Keeper sits back down, calm and smiling in the last pool of amber light.
- **Реплики:**
  - `narration-ru` — **RU:** Полки гаснут одна за другой. В темноте — тысячи тихих шагов. Дэн выкрикнул своё имя на весь зал, а Безмолвные слышат имена издалека.
  - `speech / keeper` — **EN:** Run, Dan. They hear your name. — **RU:** Беги, Дэн. Они слышат твоё имя.

#### Панель 17

- **bg:** `black` | **mood:** `action` | **sfx:** `—`
- **cast:** dan (left), mira (right), system (center)
- **art:** Wordless chase shot: Dan and Mira bolt toward a small side door at the edge of the dark, teal silhouettes flooding in behind them from every gap; Mira drags Dan by the sleeve; the System window floats beside them, small and tilted.
- **Реплики:**
  - `speech / dan` — **EN:** I have a name. I have legs! — **RU:** У меня есть имя. И есть ноги!
  - `speech / mira` — **EN:** You have no OPEN! Think! — **RU:** У тебя нет OPEN! Думай!
  - `system / system` — **EN:** Count: zero. Again. — **RU:** Счёт: ноль. Снова.

### Грамматика: Настоящее время: I / you + do / don't

Для обычных действий (знаю, хочу, нужно) глагол просто стоит после I или you: «I know», «You want». Чтобы сказать «не», ставим перед глаголом don't: «I don't know». Don't — сокращение от do not. А слово, о котором мы говорим как о слове, пишем ЗАГЛАВНЫМИ: «I want OPEN».

- I know this place. — Я знаю это место.
- I don't know. — Я не знаю.
- You want your name. — Тебе нужно твоё имя.

### Квиз

1. Что Хранитель хотел получить за имя Дэна?
   - Ключ
   - Слово OPEN **(верно)**
   - Телефон
   - Слово RUN
2. Что Дэн ответил, когда Мира сказала, что имя — просто слово?
   - Ты права
   - Мне всё равно
   - Имя — это я **(верно)**
   - Я не знаю
3. Что Дэн увидел, когда Хранитель открыл запечатанную дверь?
   - Свой офис **(верно)**
   - Лестницу
   - Свою маму
   - Ворота
4. Почему Безмолвные пришли в зал?
   - Хранитель их позвал
   - Погас свет
   - Дэн выкрикнул своё имя **(верно)**
   - Мира крикнула

---

## Эпизод 5 (s1e05): A Voice in the Dark — Голос во тьме

- **Уровень:** A1
- **Панелей:** 15
- **newWords:** she, he, does, why, how, push, read, live, wait, ask

### Синопсис

Дэн и Мира вылетают из Зала Слов к тяжёлой двери, но у Дэна нет слова OPEN. Он вспоминает, что дверь можно толкнуть, и получает слово PUSH: сила не в одном слове, а в понимании действия. В коридоре Мира делится коркой хлеба, Дэн задаёт вопросы про Хранителя, про Систему («You have 0 words. That is why») и про то, сколько Мира тут живёт; она отвечает коротко и смотрит на красный шнурок. Они доходят до последней двери этажа, у которой стоит неподвижный страж-Безмолвный. Когда Дэн начинает толкать дверь, страж поворачивается и детским голосом говорит: «Mira. It is me». Мира роняет рюкзак и не может произнести слово, которое отдала давно.

### Сценарий по панелям

#### Панель 01

- **bg:** `corridor` | **mood:** `action` | **sfx:** `—`
- **cast:** dan (left), mira (right)
- **art:** Dutch-angle chase shot: Dan and Mira burst through a side exit of the Hall into a narrow dark stairwell-corridor, the amber light of the Hall dying behind them, teal shapes flooding the doorway. They skid up to a heavy plank door with iron hinges.
- **Реплики:**
  - `narration-ru` — **RU:** Шаги Безмолвных — отовсюду. Мира дёргает Дэна за рукав. Вот боковая дверь — а слова «открыть» у Дэна больше нет.
  - `shout / dan` — **EN:** I can't open it! No OPEN! — **RU:** Не могу открыть! У меня нет OPEN!
  - `shout / mira` — **EN:** How does a door move? Think! — **RU:** Как двигается дверь? Думай!

#### Панель 02

- **bg:** `corridor` | **mood:** `action` | **sfx:** `BANG`
- **cast:** dan (left), mira (right), system (center)
- **art:** Close-up insert: Dan's two palms flat on the old wood, vermilion lettering blooming under them like heat; the door groans and shifts a finger-width, dust shaking down; Dan's face is a mask of dawning realisation behind taped glasses.
- **Реплики:**
  - `speech / dan` — **EN:** A door moves when I push it! — **RU:** Дверь двигается, когда я её толкаю!
  - `system / system` — **EN:** New word: PUSH. — **RU:** Новое слово: PUSH.

#### Панель 03

- **bg:** `corridor` | **mood:** `calm` | **sfx:** `SLAM`
- **cast:** dan (left), mira (right)
- **art:** Wide shot from inside the dark corridor: Dan and Mira tumble through and Mira shoves the door shut behind them; the footsteps beyond fade; slivers of vermilion light on the floor. Dan still holds both palms out as if he cannot believe it.
- **Реплики:**
  - `speech / dan` — **EN:** I don't need OPEN. I push! — **RU:** Мне не нужен OPEN. Я толкаю!
  - `speech / mira` — **EN:** You are slow. But you think. — **RU:** Ты медленный. Но ты думаешь.

#### Панель 04

- **bg:** `corridor` | **mood:** `calm` | **sfx:** `—`
- **cast:** dan (left), mira (right)
- **art:** Quiet two-shot, warm ochre from a lantern-word in the wall: both sit slumped against the wall; Mira holds out a crust of dry bread from her backpack without looking at Dan; Dan stares at it and then at her, touched and amused.
- **Реплики:**
  - `speech / mira` — **EN:** Eat something. You are pale. — **RU:** Поешь. Ты бледный.
  - `speech / dan` — **EN:** My mom says that! — **RU:** Моя мама так говорит!
  - `speech / mira` — **EN:** Your mom is smart. — **RU:** Твоя мама умная.

#### Панель 05

- **bg:** `corridor` | **mood:** `calm` | **sfx:** `—`
- **cast:** dan (left), mira (right)
- **art:** Close two-shot, low warm light: Dan, chewing, turns toward Mira with raised eyebrows like a schoolboy; Mira, looking at the ceiling, braces for the question.
- **Реплики:**
  - `speech / dan` — **EN:** Can I ask a question? — **RU:** Можно задать вопрос?
  - `speech / mira` — **EN:** You can ask. I can say no. — **RU:** Спрашивай. Я могу не ответить.
  - `speech / dan` — **EN:** Who is the Keeper? — **RU:** Кто такой Хранитель?
  - `speech / mira` — **EN:** He is a trader. He is not a friend. — **RU:** Он торговец. Он не друг.

#### Панель 06

- **bg:** `corridor` | **mood:** `calm` | **sfx:** `—`
- **cast:** dan (left), mira (right)
- **art:** Medium close-up on Dan, thoughtful, chewing, the bridge of his nose pinched; Mira half-listening, wiping her glove. The corridor behind them recedes into dark.
- **Реплики:**
  - `speech / dan` — **EN:** Where does the Keeper live? — **RU:** Где живёт Хранитель?
  - `speech / mira` — **EN:** He lives in the Hall. He wants that door open. — **RU:** Он живёт в Зале. Ему нужно, чтобы та дверь открылась.
  - `speech / dan` — **EN:** I see my office. It is real. — **RU:** Я видел свой офис. Он настоящий.
  - `speech / mira` — **EN:** Then a door goes home. We find it. — **RU:** Значит, есть дверь домой. Мы найдём её.

#### Панель 07

- **bg:** `corridor` | **mood:** `calm` | **sfx:** `—`
- **cast:** dan (left), mira (right), system (center)
- **art:** Over-the-shoulder shot: Dan looks up at the System window floating overhead in the dark corridor, like a patient teacher; Mira in the corner of the frame rolls her eyes. The window's border is steady vermilion.
- **Реплики:**
  - `speech / dan` — **EN:** Why do you choose me? — **RU:** Почему ты выбрала меня?
  - `system / system` — **EN:** You have 0 words. That is why. — **RU:** У тебя 0 слов. Вот почему.
  - `speech / dan` — **EN:** That is not an answer. — **RU:** Это не ответ.
  - `system / system` — **EN:** It is a short answer. Ask me later. — **RU:** Это короткий ответ. Спроси позже.

#### Панель 08

- **bg:** `corridor` | **mood:** `calm` | **sfx:** `—`
- **cast:** dan (left), mira (right)
- **art:** Close two-shot, Mira looks at her wrist with the frayed vermilion cord, then away; her mouth a flat line; Dan's face softens with curiosity. A rare pale hint of a smile on her lips fading.
- **Реплики:**
  - `speech / mira` — **EN:** It is rude. It is always rude. — **RU:** Она грубая. Она всегда грубая.
  - `speech / dan` — **EN:** How long do you live here? — **RU:** Как долго ты здесь живёшь?
  - `speech / mira` — **EN:** Three years. I read, I climb, I wait. — **RU:** Три года. Я читаю, лезу вверх, жду.
  - `speech / dan` — **EN:** Wait for what? — **RU:** Чего ждёшь?

#### Панель 09

- **bg:** `sky` | **mood:** `calm` | **sfx:** `—`
- **cast:** dan (left), mira (right)
- **art:** Wordless breathing beat: a narrow arrow-slit window in the stairwell; through it the bone-white wall of the Tower curves away, balconies and thousands of vermilion lantern-words rising into a dusky apricot-and-teal sky. Dan and Mira, small silhouettes in the window frame, share the view.
- **Реплики:**
  - `speech / dan` — **EN:** It is beautiful. I hate it. — **RU:** Красиво. Я это ненавижу.
  - `speech / mira` — **EN:** Everyone does. — **RU:** Все ненавидят.

#### Панель 10

- **bg:** `dungeon` | **mood:** `tense` | **sfx:** `—`
- **cast:** dan (left), mira (right)
- **art:** Wide establishing shot: a cold bare stone hall in ash-grey light, a single high black door with iron bands at the far end, a guard Silent standing motionless in front of it; Dan and Mira at the entrance, tiny. Teal shadows pool along the floor.
- **Реплики:**
  - `narration-ru` — **RU:** Последний зал этажа. Холодный камень, эхо шагов. В глубине — высокая чёрная дверь. Перед ней стоит Безмолвный и не шевелится.
  - `speech / dan` — **EN:** There is the door! Can you read it? — **RU:** Вот дверь! Ты можешь прочесть?
  - `speech / mira` — **EN:** I read it. This is the last door. — **RU:** Читаю. Это последняя дверь.

#### Панель 11

- **bg:** `dungeon` | **mood:** `tense` | **sfx:** `—`
- **cast:** dan (left), mira (right), silent (center)
- **art:** Medium shot over Mira's shoulder: she crouches, one finger to her lips, eyes on the guard Silent whose smooth head is turned a few degrees toward them; Dan beside her, listening, hands up.
- **Реплики:**
  - `speech / mira` — **EN:** Wait. It does not see. It hears. — **RU:** Подожди. Он не видит. Он слышит.
  - `speech / dan` — **EN:** How does it hear us? — **RU:** Как он нас слышит?
  - `speech / mira` — **EN:** Do not talk. Do not run. Push slowly. — **RU:** Не говори. Не беги. Толкай медленно.

#### Панель 12

- **bg:** `dungeon` | **mood:** `tense` | **sfx:** `CREAK`
- **cast:** dan (left), mira (right), silent (center)
- **art:** Tension shot: Dan's palms on the giant door, his arms trembling with effort, door opening a finger-width with a slow groan; in the background the guard Silent's head turns toward the sound; Mira behind him, hand over her mouth.
- **Реплики:**
  - `speech / dan` — **EN:** I push. It is heavy. — **RU:** Я толкаю. Она тяжёлая.
  - `speech / silent` — **EN:** Mira? — **RU:** Мира?

#### Панель 13

- **bg:** `dungeon` | **mood:** `tense` | **sfx:** `—`
- **cast:** mira (center), silent (right)
- **art:** Extreme close-up of Mira's face frozen as if slapped: amber eyes wide, pupils tiny, a muscle tight in her jaw; behind her the Silent's blank face is in soft focus, the teal mouth-seam open. A child's voice shouldn't come from there.
- **Реплики:**
  - `narration-ru` — **RU:** Голос тонкий, детский. Мира замирает, будто её ударили.
  - `speech / mira` — **EN:** No. — **RU:** Нет.
  - `speech / silent` — **EN:** Mira. It is me. Why do you run? — **RU:** Мира. Это я. Почему ты бежишь?

#### Панель 14

- **bg:** `dungeon` | **mood:** `tense` | **sfx:** `—`
- **cast:** dan (left), mira (right), silent (center)
- **art:** Over-the-shoulder shot from Dan's side: the guard Silent turns fully toward them, its raised thin hand shows a tiny frayed fragment of vermilion cord around the wrist, identical to Mira's; Dan looks from one wrist to the other.
- **Реплики:**
  - `speech / dan` — **EN:** Mira? Who is she? — **RU:** Мира? Кто она?
  - `thought / dan` — **EN:** The red cord. It is like hers. — **RU:** Красная нить. Такая же, как у неё.

#### Панель 15

- **bg:** `black` | **mood:** `tense` | **sfx:** `—`
- **cast:** mira (center)
- **art:** Final wordless-feel close-up: Mira drops her backpack, her gloved hand opening, the frayed vermilion cord on her wrist glowing faintly; the rest of the frame is black, the child-sized outline of the Silent barely visible in the dark behind her.
- **Реплики:**
  - `narration-ru` — **RU:** Мира роняет рюкзак. Она открывает рот — и закрывает. Слово, которое она ищет, она отдала давно.
  - `speech / mira` — **EN:** She is my... I can't. I don't have the word. — **RU:** Она моя... Не могу. У меня нет этого слова.
  - `system / system` — **EN:** She does not have that word. — **RU:** У неё нет этого слова.

### Грамматика: He / she + глагол с -s и вопросы с does

С he, she и it к глаголу в настоящем времени добавляем -s: «He lives», «She reads». В вопросах и отрицаниях появляется does, а глагол остаётся без -s: «Where does he live?», «It does not see». Для I и you — по-прежнему do. Слово, названное как слово, пишем ЗАГЛАВНЫМИ: «I don't need OPEN».

- He lives in the Hall. — Он живёт в Зале.
- Where does he live? — Где он живёт?
- It does not see. — Он не видит.

### Квиз

1. Какое слово Дэн получил, чтобы пройти через дверь без OPEN?
   - Push **(верно)**
   - Run
   - Key
   - Wait
2. Что Мира дала Дэну в коридоре?
   - Ключ
   - Хлеб **(верно)**
   - Карту
   - Лампу
3. Что ответила Система на вопрос «Почему ты выбрало меня?»
   - Потому что ты сильный
   - Потому что у тебя 0 слов **(верно)**
   - Потому что ты умный
   - Потому что ты ночью работал
4. Чей голос услышала Мира из Безмолвного у последней двери?
   - Голос ребёнка **(верно)**
   - Голос Хранителя
   - Голос Дэна
   - Голос мамы Дэна

---

## Эпизод 6 (s1e06): The Stair of Echoes — Лестница эха

- **Уровень:** A1
- **Панелей:** 16
- **newWords:** there, up, down, under, behind, stairs, quiet, sound, write, boy

### Синопсис

Маленький Безмолвный с красным шнурком зовёт Миру, но она не может сделать ни шага; последняя дверь сдвигается на ладонь и встаёт: ей нужно больше, чем слово. Сзади входят Безмолвные, и Дэн впервые в нужде кричит STOP: слово становится его, счёт два. Они бегут на Лестницу эха, где каждое сказанное слово возвращается и превращается в существо, поэтому Дэн и Мира переписываются жёлтым карандашом. На ступенях сидит мальчишка Пип, который продаёт тишину; Дэн платит ему секретом: называет скрытую комнату под лестницей, и она проявляется. Пип выбалтывает, что Мира продала Хранителю слово «сестра» целиком, а маленький Безмолвный внизу и есть Лина. У Миры остаётся два дыхания, она падает, а помощь есть только на рынке наверху, и она не бесплатная.

### Сценарий по панелям

#### Панель 01

- **bg:** `dungeon` | **mood:** `tense` | **sfx:** `—`
- **cast:** mira (left), silent (right)
- **art:** Tense two-shot in the cold last-door hall: on the right a child-sized Silent (1.4 m) with a frayed vermilion cord on its left wrist holds out one thin paper-white hand toward Mira; on the left Mira stands frozen, backpack on the floor at her feet, her right hand gripping the vermilion cord on her left wrist. The high black door looms behind the child. Ash-grey light, teal shadow on the floor.
- **Реплики:**
  - `narration-ru` — **RU:** Мира не двигается. Перед ней тот, кого она искала три года. И она не может сделать ни шага навстречу.
  - `speech / silent` — **EN:** Mira. Come. It is cold. — **RU:** Мира. Иди сюда. Мне холодно.
  - `thought / dan` — **EN:** She can't say the word. I don't know the word. — **RU:** Она не может сказать это слово. А я его не знаю.

#### Панель 02

- **bg:** `dungeon` | **mood:** `action` | **sfx:** `CREAK`
- **cast:** dan (left), system (right)
- **art:** Low-angle shot: Dan throws his whole weight against the huge black door with both palms; the door has opened only a hand's width and stopped, a thin line of pale light in the gap. The System window floats at the upper right, tilted, unbothered.
- **Реплики:**
  - `shout / dan` — **EN:** Push! Push! — **RU:** Толкайся! Ну же!
  - `system / system` — **EN:** This door wants more. Not a word. — **RU:** Этой двери нужно больше. Не слово.
  - `system / system` — **EN:** Almost. Ask me later. — **RU:** Почти. Спроси позже.

#### Панель 03

- **bg:** `dungeon` | **mood:** `action` | **sfx:** `STEP`
- **cast:** dan (left), mira (center), silent (right)
- **art:** Wide shot from the door looking back down the hall: three tall Silent walk in from the far entrance in a calm line. In the foreground Dan spins around with one arm thrown out, glowing vermilion lettering bursting from his mouth (lettering added later); the nearest Silent is frozen mid-step. Mira beside him, pale.
- **Реплики:**
  - `speech / mira` — **EN:** They come. They are behind us. — **RU:** Идут. Они у нас за спиной.
  - `shout / dan` — **EN:** Stop! — **RU:** Стой!
  - `system / system` — **EN:** STOP is yours now. Count: two. — **RU:** STOP теперь твоё. Счёт: два.
  - `narration-ru` — **RU:** Слово бьёт, как отдача. В глазах темнеет. Но ближний Безмолвный застыл с поднятой ногой.

#### Панель 04

- **bg:** `dungeon` | **mood:** `action` | **sfx:** `—`
- **cast:** dan (left), mira (center), silent (right)
- **art:** Dynamic diagonal shot: Dan drags Mira by the wrist toward a narrow side arch in the left wall where stone stairs climb into the dark; Mira looks back over her shoulder. On the right the child-sized Silent with the vermilion cord stands still by the black door, one hand still raised.
- **Реплики:**
  - `shout / dan` — **EN:** There is a way! Up there! Come! — **RU:** Там есть проход! Вон там, наверху! Идём!
  - `speech / silent` — **EN:** Mira. Why do you run? — **RU:** Мира. Почему ты бежишь?

#### Панель 05

- **bg:** `corridor` | **mood:** `calm` | **sfx:** `—`
- **cast:** dan (left), mira (right)
- **art:** Vertical establishing shot of the Stair of Echoes: a vast round shaft, a narrow spiral stone stair without a railing winding up along the wall, the wall covered in thousands of overlapping pale paper sheets like scales. Dan and Mira are two tiny figures on the stair near the bottom; cold teal darkness below, a small warm ochre glow far above.
- **Реплики:**
  - `narration-ru` — **RU:** Лестница эха. Узкие ступени вьются вверх по стене огромной шахты. Стены из бумаги. Перил нет.
  - `speech / dan` — **EN:** So many stairs. Mira, are you OK? — **RU:** Сколько ступенек. Мира, ты в порядке?

#### Панель 06

- **bg:** `corridor` | **mood:** `tense` | **sfx:** `—`
- **cast:** dan (left), mira (right), system (center)
- **art:** Close two-shot on the stair: Mira's gloved hand is clamped over Dan's mouth, her eyes wide in warning. Behind them the paper wall ripples in rings like water, and a small pale faceless shape is peeling itself off the paper lower down the stair. The System window hovers between them.
- **Реплики:**
  - `narration` — **EN:** The wall says it back: OK. OK. OK. — **RU:** Стена отвечает: OK. OK. OK.
  - `narration-ru` — **RU:** Здесь каждое сказанное слово возвращается. И у эха вырастают руки.
  - `system / system` — **EN:** Every sound comes back here. Be quiet. — **RU:** Здесь возвращается каждый звук. Тише.

#### Панель 07

- **bg:** `corridor` | **mood:** `calm` | **sfx:** `—`
- **cast:** dan (left), mira (right)
- **art:** Insert shot from above: a torn cream page held against Dan's knee, his hand writing on it with the yellow carpenter pencil; Mira's gloved finger points at the page. Only hands, the pencil and the page; the writing is a few abstract pencil strokes (no readable text).
- **Реплики:**
  - `narration` — **EN:** Dan writes: No talk? Mira writes: No sound. Up. Slowly. — **RU:** Мира пишет: Ни звука. Идём вверх. Медленно.
  - `system / system` — **EN:** You write. Good. Paper is quiet. — **RU:** Ты пишешь. Хорошо. Бумага тихая.

#### Панель 08

- **bg:** `corridor` | **mood:** `calm` | **sfx:** `—`
- **cast:** dan (left), system (right)
- **art:** Medium shot with dry humour: Dan sits on a step sketching a neat little spiral-stair plan on the page like an engineer, tongue between his teeth; the System window floats right in front of his nose, blocking his view. To his left the stair has no wall, only the open shaft.
- **Реплики:**
  - `thought / dan` — **EN:** There are many stairs. There is nothing under us. — **RU:** Тут много ступенек. А под нами пусто.
  - `system / system` — **EN:** There are 300 stairs. You are slow. — **RU:** Тут 300 ступенек. Ты медленный.

#### Панель 09

- **bg:** `corridor` | **mood:** `tense` | **sfx:** `—`
- **cast:** silent (center)
- **art:** High-angle shot looking down the spiral stair: several turns below, a small pale faceless paper figure with a thin teal mouth-seam crawls up the steps on all fours, paper sheets trailing from its back. Teal darkness under it. Dan and Mira are not in frame.
- **Реплики:**
  - `thought / dan` — **EN:** There is a thing behind us. It has my voice. Again. — **RU:** За нами что-то идёт. У него мой голос. Опять.

#### Панель 10

- **bg:** `corridor` | **mood:** `calm` | **sfx:** `—`
- **cast:** dan (left), mira (center), pip (right)
- **art:** Medium wide shot: on a broad step sits Pip, a skinny 11-year-old boy in a too-big grey flat cap and an oversized patched brown coat, under a small paper umbrella, grinning with a gap in his teeth, one open palm held up; a small brass bell without a clapper hangs on his chest. Around him the paper wall is perfectly still. Dan and Mira stop two steps below, Dan pointing at the boy in disbelief.
- **Реплики:**
  - `narration-ru` — **RU:** Вокруг мальчишки звук не возвращается. У него есть слово: QUIET.
  - `speech / pip` — **EN:** Hello, slow people! No sound comes back here. — **RU:** Привет, медленные! Тут звук не возвращается.
  - `speech / dan` — **EN:** A boy? There is a boy on the stairs! — **RU:** Мальчик? На лестнице мальчик!
  - `speech / pip` — **EN:** I am Pip. I sell quiet. One quiet, one word. — **RU:** Я Пип. Продаю тишину. Одна тишина за одно слово.

#### Панель 11

- **bg:** `corridor` | **mood:** `calm` | **sfx:** `—`
- **cast:** dan (left), pip (right)
- **art:** Close two-shot: Pip stretches a greedy finger toward the yellow carpenter pencil behind Dan's right ear; Dan leans back and covers the pencil with his hand, surprised at himself. Warm ochre light from above.
- **Реплики:**
  - `speech / pip` — **EN:** No words? Then give me the yellow pencil. — **RU:** Тогда давай жёлтый карандаш.
  - `speech / dan` — **EN:** No. Not the pencil. — **RU:** Нет. Только не карандаш.
  - `thought / dan` — **EN:** Why not? It is just a pencil. — **RU:** А почему нет? Это же просто карандаш.

#### Панель 12

- **bg:** `corridor` | **mood:** `calm` | **sfx:** `—`
- **cast:** dan (left), pip (right), system (center)
- **art:** Over-the-shoulder shot from behind Dan: he points down at the stone under the stairs where the thin outline of a hidden low door now glows vermilion in the wall; Pip hangs over the edge of the step staring at it, cap falling off. The System window floats above the glowing outline.
- **Реплики:**
  - `speech / dan` — **EN:** I give you a secret. There is a room under the stairs. — **RU:** Я дам тебе секрет. Под лестницей есть комната.
  - `speech / pip` — **EN:** There is no room. I live here. I know. — **RU:** Нет там комнаты. Я тут живу. Я знаю.
  - `speech / dan` — **EN:** There is a door behind that stone. Look down. — **RU:** Вон за тем камнем дверь. Посмотри вниз.
  - `system / system` — **EN:** True. — **RU:** Правда.

#### Панель 13

- **bg:** `corridor` | **mood:** `calm` | **sfx:** `—`
- **cast:** dan (left), mira (center), pip (right)
- **art:** Medium shot of the three climbing: Pip walks backwards up the stairs in front, one hand raised like a conductor, a soft round bubble of still air around the group; Dan listens to him, Mira frowns with a hand at her ear as if a sound is missing.
- **Реплики:**
  - `speech / pip` — **EN:** OK. A good trade. Talk under my hand. — **RU:** Ладно. Хороший обмен. Говорите под моей рукой.
  - `speech / pip` — **EN:** I know her. That is Mira. She sells her sister. — **RU:** Я её знаю. Это Мира. Она продаёт свою сестру.
  - `speech / mira` — **EN:** What does the boy say? I hear nothing. — **RU:** Что говорит мальчик? Я ничего не слышу.
  - `system / system` — **EN:** She does not hear that word. — **RU:** Она не слышит это слово.

#### Панель 14

- **bg:** `corridor` | **mood:** `tense` | **sfx:** `—`
- **cast:** dan (left), pip (right)
- **art:** Close-up on Dan's face, eyes wide behind the taped glasses as everything connects; Pip in soft focus beside him, pointing a thumb down the shaft. In Dan's glasses a faint reflection of a red cord.
- **Реплики:**
  - `speech / pip` — **EN:** She sells the whole word. The Keeper has it. — **RU:** Она продаёт слово целиком. Оно у Хранителя.
  - `speech / pip` — **EN:** The small Silent down there is Lina. — **RU:** А маленький Безмолвный там, внизу, это Лина.
  - `narration-ru` — **RU:** Царапина на стене. Фреска. Красная нить. Дэн наконец знает слово, которого нет у Миры.
  - `thought / dan` — **EN:** Lina. The red cord. Lina is her sister. — **RU:** Лина. Красная нить. Лина её сестра.

#### Панель 15

- **bg:** `corridor` | **mood:** `tense` | **sfx:** `—`
- **cast:** dan (left), mira (right), system (center)
- **art:** Medium shot: Mira stumbles on a step, one knee down, face grey, a thin vermilion thread trailing from her lips; Dan reaches for her with both hands. The System window between them has a solid vermilion border and inverted colours (warning).
- **Реплики:**
  - `system / system` — **EN:** Warning. Mira has two breaths. — **RU:** Предупреждение. У Миры два дыхания.
  - `shout / dan` — **EN:** Mira! Sit down! Stop! — **RU:** Мира! Сядь! Стой!

#### Панель 16

- **bg:** `black` | **mood:** `tense` | **sfx:** `—`
- **cast:** dan (left), mira (center), pip (right)
- **art:** Dark closing shot: Mira collapsed in Dan's arms on the stair, eyes closed, the vermilion thread at her lips; Dan looks up desperately. Above them Pip stands on a higher step, hands in his coat pockets, looking down calmly like someone watching the weather. Far above, a small warm ochre glow.
- **Реплики:**
  - `speech / pip` — **EN:** Two breaths. Then no breath. Then she is a Silent. — **RU:** Два дыхания. Потом ни одного. Потом она Безмолвная.
  - `speech / dan` — **EN:** Is there help up there? — **RU:** Там, наверху, есть помощь?
  - `speech / pip` — **EN:** There is a market up there. It is not free, Zero. — **RU:** Наверху рынок. Он не бесплатный, Зеро.

### Грамматика: There is / there are и слова места

Чтобы сказать, что где-то что-то есть, английский начинает с there: «There is a door» (одна вещь), «There are many stairs» (несколько). Отрицание: «There is no room». Вопрос получается перестановкой: «Is there help?». Где именно, показывают маленькие слова места: on (на), under (под), behind (за), up (вверх, наверху), down (вниз, внизу). Слово, названное как слово, пишем ЗАГЛАВНЫМИ: STOP.

- There is a boy on the stairs. — На лестнице мальчик.
- There are many stairs. — Тут много ступенек.
- There is a door behind that stone. — За тем камнем есть дверь.

### Квиз

1. Почему на Лестнице эха нельзя говорить вслух?
   - Там живёт Хранитель
   - Каждое слово возвращается, и из эха вырастает существо **(верно)**
   - Мира устала от разговоров
   - Так велела Система
2. Чем Дэн заплатил Пипу за тишину?
   - Жёлтым карандашом
   - Словом STOP
   - Секретом о комнате под лестницей **(верно)**
   - Хлебом
3. Что Пип рассказал про Миру?
   - Она продала слово «сестра» **(верно)**
   - Она работает на Хранителя
   - Она потеряла карту
   - Она не умеет читать
4. Сколько дыханий осталось у Миры в конце?
   - Десять
   - Шесть
   - Ни одного
   - Два **(верно)**

---

## Эпизод 7 (s1e07): The Ink Market — Рынок Чернил

- **Уровень:** A1
- **Панелей:** 17
- **newWords:** buy, sell, money, much, many, fix, rest, phone, girl, sing

### Синопсис

Дэн выносит почти бездыханную Миру на Рынок Чернил, где всё покупают и продают, а дыхание стоит слов, которых у него нет. Он замечает, что навес торговца вот-вот рухнет, и в нужде связывает слово FIX: балка сшита красными буквами, а в уплату торговец отдаёт ему слово REST. Дэн шепчет REST Мире, и дыхание возвращается к ней, а слово остаётся у него: учить и отдавать можно, не теряя. Одно слово торговца он не слышит — как будто кто-то смял бумагу, и Система снова говорит «Almost». На прилавке «вещей снаружи» звонит его телефон, голос мамы зовёт его поесть, но телефон уходит к человеку в чёрном пальто с гроссбухом: голос, который зовёт снаружи, здесь дороже любого слова. Торговец говорит, что телефон принесла маленькая девочка, которая не говорит, а только поёт. Издалека доносится песня, Мира узнаёт её и уходит в темноту одна.

### Сценарий по панелям

#### Панель 01

- **bg:** `street` | **mood:** `tense` | **sfx:** `—`
- **cast:** dan (left), mira (center), pip (right)
- **art:** Wide low-angle establishing shot at the entrance of the Ink Market: Dan staggers forward at the left carrying limp Mira piggyback, while Pip trots at his side on the right. Around them hooded traders at crooked stalls under patched paper awnings turn their faces away. Hanging glass bottles of black ink, small jars with one vermilion spark each, ochre lanterns, steam.
- **Реплики:**
  - `narration-ru` — **RU:** Рынок встречает Дэна запахом чернил и полным равнодушием. Никто не оборачивается: у каждого здесь свой счёт.
  - `shout / dan` — **EN:** Help! She has two breaths! — **RU:** Помогите! У неё два дыхания!
  - `speech / pip` — **EN:** Nobody helps here. They buy. They sell. — **RU:** Тут никто не помогает. Тут покупают. Тут продают.

#### Панель 02

- **bg:** `street` | **mood:** `calm` | **sfx:** `—`
- **cast:** dan (left), pip (right)
- **art:** Very wide high-angle shot over the whole Ink Market landing: dozens of crooked stalls, awnings, ropes and pulleys, hanging bottles of black ink, small vermilion sparks in jars, steam. Dan stands small at the left foreground looking out; Pip at the right foreground sweeps one arm across the scene like a guide. At the far left a bench with only Mira's boots visible.
- **Реплики:**
  - `speech / pip` — **EN:** This is the Ink Market. They sell breath. — **RU:** Это Рынок Чернил. Тут продают дыхание.
  - `speech / dan` — **EN:** How much is a breath? — **RU:** Сколько стоит дыхание?

#### Панель 03

- **bg:** `street` | **mood:** `tense` | **sfx:** `—`
- **cast:** dan (left), trader (right), system (center)
- **art:** Medium two-shot at a plank counter: the stout trader in an ink-stained apron holds up ten fingers in one hand and two in the other and leans toward Dan; Dan on the left looks at small jars on the counter, each with a thin vermilion thread of breath curling inside. The System window floats above the counter.
- **Реплики:**
  - `speech / trader` — **EN:** Ten breaths, two words. Buy it. A good price. — **RU:** Десять дыханий за два слова. Бери. Хорошая цена.
  - `system / system` — **EN:** Count: two. You are poor. — **RU:** Счёт: два. Ты беден.

#### Панель 04

- **bg:** `street` | **mood:** `tense` | **sfx:** `—`
- **cast:** dan (left), mira (right), system (center)
- **art:** Close two-shot beside a wooden bench: Mira lies on it with her head on her rolled cream scarf, lips grey, a thin vermilion thread at the corner of her mouth; Dan crouches at the left and stares at his own empty open palm. The System window hovers between them.
- **Реплики:**
  - `system / system` — **EN:** Mira has one breath. — **RU:** У Миры одно дыхание.
  - `thought / dan` — **EN:** Think. I have two words. I need them. I have no money. — **RU:** Думай. У меня два слова. Они мне нужны. Денег нет.

#### Панель 05

- **bg:** `street` | **mood:** `tense` | **sfx:** `—`
- **cast:** dan (left), trader (right)
- **art:** Medium-wide shot looking up at the trader's stall: Dan at the left points the yellow pencil up at a sagging wooden beam with a visible hairline crack, one of the four posts leaning out; hundreds of ink bottles hang on ropes from the beam. The trader at the right folds his arms and scoffs.
- **Реплики:**
  - `narration-ru` — **RU:** Три года Дэн считал чужие балки. Эта не доживёт до вечера.
  - `speech / dan` — **EN:** Your roof is bad. That leg is weak. I can fix it. — **RU:** Твоя крыша плохая. Вот эта стойка слабая. Я могу её починить.
  - `speech / trader` — **EN:** My roof is good. Go home, Zero. — **RU:** Моя крыша хорошая. Иди домой, Зеро.

#### Панель 06

- **bg:** `street` | **mood:** `action` | **sfx:** `CRACK`
- **cast:** dan (left), trader (right)
- **art:** Dynamic low-angle shot: the beam of the awning splits with a loud crack, one corner post kicks out, the whole roof tilts and hundreds of hanging ink bottles swing and slide on their ropes. The trader at the right clutches his head; Dan at the left looks up with glasses glinting, one hand raised.
- **Реплики:**
  - `shout / dan` — **EN:** How many jars? — **RU:** Сколько банок?
  - `shout / trader` — **EN:** Twenty! Too many! My money! — **RU:** Двадцать! Слишком много! Мои деньги!

#### Панель 07

- **bg:** `street` | **mood:** `action` | **sfx:** `CREAK`
- **cast:** dan (left), system (right)
- **art:** Dramatic wide shot from below: Dan at the left braced under the sagging beam, one palm raised to stop it, a long wooden pole propped under it; glowing vermilion lettering shapes (lettering added later) stream from his mouth and stitch the crack in the beam like red thread. The System window floats at the right.
- **Реплики:**
  - `shout / dan` — **EN:** Stop! Push! Fix! — **RU:** Стой! Толкай! Чини!
  - `system / system` — **EN:** New word: FIX. FIX is yours now. Count: three. — **RU:** Новое слово: FIX. FIX теперь твоё. Счёт: три.
  - `system / system` — **EN:** Big thing, big breath. Dan has one breath. — **RU:** Большая вещь — большое дыхание. У Дэна одно дыхание.

#### Панель 08

- **bg:** `street` | **mood:** `calm` | **sfx:** `—`
- **cast:** dan (left), trader (right), system (center)
- **art:** Medium shot: the repaired beam between Dan and the trader carries a fading vermilion seam; three posts stand straight but the fourth leans a little. The trader points at the crooked post while Dan cups a hand to his ear in confusion. The System window floats above them.
- **Реплики:**
  - `speech / trader` — **EN:** Three words, and you fix my roof! But you don't ... it. One leg is still bad. — **RU:** Три слова, и ты чинишь мою крышу! Но ты не ... её. Одна стойка всё ещё кривая.
  - `speech / dan` — **EN:** What word? I hear nothing. — **RU:** Какое слово? Я ничего не слышу.
  - `system / system` — **EN:** Almost. — **RU:** Почти.
  - `narration-ru` — **RU:** Одно слово торговца Дэн не расслышал — будто кто-то смял бумагу. Четвёртая стойка так и осталась кривой.

#### Панель 09

- **bg:** `street` | **mood:** `calm` | **sfx:** `—`
- **cast:** dan (left), trader (right), system (center)
- **art:** Over-the-shoulder shot from behind Dan: the trader, now smiling, holds out his open palm with a tiny glowing vermilion spark floating above it, a word handed over like a coin; Dan reaches toward it. The System window hovers above the spark.
- **Реплики:**
  - `speech / trader` — **EN:** A trade is a trade. I pay a word, not money. — **RU:** Сделка есть сделка. Я плачу словом, а не деньгами.
  - `speech / trader` — **EN:** REST gives breath. Say it to her. — **RU:** REST даёт дыхание. Скажи его ей.
  - `system / system` — **EN:** New word: REST. REST is yours now. Count: four. Title: Roof-Fixer. — **RU:** Новое слово: REST. REST теперь твоё. Счёт: четыре. Титул: Починщик крыш.

#### Панель 10

- **bg:** `street` | **mood:** `calm` | **sfx:** `—`
- **cast:** dan (left), mira (right), system (center)
- **art:** Close two-shot at the bench: Dan kneels at the left, bent over Mira with one hand held above her chest; a soft warm vermilion glow drifts from his lips toward hers and the colour is coming back into her cheeks. The System window floats above.
- **Реплики:**
  - `speech / dan` — **EN:** Rest, Mira. Rest. — **RU:** Отдыхай, Мира. Отдыхай.
  - `system / system` — **EN:** Mira has six breaths. — **RU:** У Миры шесть дыханий.
  - `thought / dan` — **EN:** I give her breath. I don't lose the word. Good. — **RU:** Я отдаю ей дыхание. А слово не теряю. Хорошо.

#### Панель 11

- **bg:** `street` | **mood:** `calm` | **sfx:** `—`
- **cast:** dan (left), pip (right)
- **art:** Medium shot at a small fruit-and-bread stall: Pip behind the counter holds up two fingers with a sly grin, a pile of red apples between him and Dan; Dan at the left counts on his fingers with one hand on his belly, stomach clearly empty. Mira sits up small on the bench far behind them.
- **Реплики:**
  - `speech / dan` — **EN:** How many apples for one word? — **RU:** Сколько яблок за одно слово?
  - `speech / pip` — **EN:** Two! You have four words. Eight apples! Eat something, Zero. — **RU:** Два! У тебя четыре слова. Восемь яблок! Поешь что-нибудь, Зеро.

#### Панель 12

- **bg:** `street` | **mood:** `tense` | **sfx:** `RING`
- **cast:** dan (center)
- **art:** Tight close-up on Dan's face turning sharply to the right, eyes wide behind the taped round glasses, one hand freezing on the pencil behind his ear. The market behind him is a dim blur; faint thin pale arcs of sound curve past his ear.
- **Реплики:**
  - `speech / dan` — **EN:** That sound. I know that sound. — **RU:** Этот звук. Я знаю этот звук.

#### Панель 13

- **bg:** `street` | **mood:** `tense` | **sfx:** `—`
- **cast:** dan (left), trader (right)
- **art:** Medium shot over Dan's shoulder: on a low table of things from outside (one sneaker, a ring of keys, a wristwatch, a teddy bear, a coffee mug) lies Dan's smartphone with a spiderweb-cracked screen glowing softly white. Dan at the left reaches toward it, the trader behind the table smiles.
- **Реплики:**
  - `narration` — **EN:** Mom: Dan, eat something. — **RU:** Мама: Дэн, поешь что-нибудь.
  - `shout / dan` — **EN:** My phone! That is my mom! How much is it? — **RU:** Мой телефон! Это моя мама! Сколько он стоит?

#### Панель 14

- **bg:** `street` | **mood:** `tense` | **sfx:** `—`
- **cast:** dan (left), trader (right), system (center)
- **art:** Wide two-level shot: in the foreground the trader at the right holds the phone up while Dan at the left reaches for it. Behind them a tall man in a long ink-black coat with brass buttons and a thin brass chain from collar to pocket, black gloves, a slim ledger book under his arm, face hidden by his high collar, takes the phone and walks toward a far stair. The System window hovers at the centre.
- **Реплики:**
  - `speech / trader` — **EN:** The phone is not cheap. Twenty words. It has a voice from outside. — **RU:** Телефон не дешёвый. Двадцать слов. В нём голос снаружи.
  - `speech / trader` — **EN:** Sorry, Zero. That man buys it. He pays much. — **RU:** Прости, Зеро. Тот человек его покупает. Он платит много.
  - `system / system` — **EN:** Missed calls: 10. — **RU:** Пропущенные звонки: 10.
  - `narration-ru` — **RU:** Голос, который зовёт тебя снаружи, стоит здесь дороже любого слова. Дэн пока не знает почему.

#### Панель 15

- **bg:** `street` | **mood:** `tense` | **sfx:** `—`
- **cast:** dan (left), mira (right)
- **art:** Action medium shot: Dan at the left lunges toward a far stair with an outstretched arm; Mira at the right sits up on the bench and grips his sleeve with her left hand, the red cord on her wrist. Far in the background a small figure in a black coat climbs the stair holding something that glows faintly white.
- **Реплики:**
  - `shout / dan` — **EN:** Stop him! That is my mom! — **RU:** Остановите его! Это моя мама!
  - `speech / mira` — **EN:** No. Think. You give me breath. Not bad, Zero. — **RU:** Нет. Думай. Ты отдал мне дыхание. Неплохо, Зеро.

#### Панель 16

- **bg:** `street` | **mood:** `calm` | **sfx:** `—`
- **cast:** dan (left), mira (center), trader (right)
- **art:** Medium three-shot: Dan at the left, still breathing hard, leans on the counter; Mira in the centre sits on the bench edge with a hand on her temple; the trader at the right shrugs while polishing a jar with a cloth. The mood is quiet and tired.
- **Реплики:**
  - `speech / dan` — **EN:** Who sells you my phone? — **RU:** Кто продал тебе мой телефон?
  - `speech / trader` — **EN:** A little girl sells it to me. She does not talk. She sings. — **RU:** Маленькая девочка. Она не говорит. Она поёт.
  - `speech / mira` — **EN:** A girl? What does she sing? — **RU:** Девочка? Что она поёт?

#### Панель 17

- **bg:** `black` | **mood:** `tense` | **sfx:** `—`
- **cast:** mira (center), system (right)
- **art:** Dark wide shot from behind: Mira, small in the centre, walks alone away from the lantern light into a narrow dark passage between stalls; only faint thin pale sound-lines drift from the far darkness. The dim System window floats at the right.
- **Реплики:**
  - `narration-ru` — **RU:** Издалека доносится тонкая песня без слов. Мира знает эту песню. Она сама когда-то пела её тому, кто боялся темноты.
  - `speech / mira` — **EN:** I know that song. Lina sings it every night. — **RU:** Я знаю эту песню. Лина поёт её каждую ночь.
  - `system / system` — **EN:** The girl sings. She is near. — **RU:** Девочка поёт. Она рядом.

### Грамматика: How much / how many, множественное число и числа

Цену спрашивают так: «How much is the phone?». Количество предметов, которые можно пересчитать, — «How many jars?». После many слово стоит во множественном числе: к нему добавляется -s (one jar — twenty jars, one apple — two apples). Деньги и цена идут с much, предметы по штукам — с many. Ответом служит просто число: «Twenty!».

- How much is a breath? — Сколько стоит дыхание?
- How many jars? — Сколько банок?
- How many apples for one word? — Сколько яблок за одно слово?

### Квиз

1. Чем на Рынке Чернил платят за вещи и дыхание?
   - Деньгами
   - Словами **(верно)**
   - Карандашами
   - Яблоками
2. Как Дэн заработал слово REST?
   - Купил у Пипа
   - Выиграл спор у торговца
   - Починил навес торговца **(верно)**
   - Нашёл на земле
3. Что Дэн увидел на прилавке «вещей снаружи»?
   - Ключ от двери
   - Жёлтый карандаш
   - Карту Миры
   - Свой телефон с голосом мамы **(верно)**
4. Кто продал телефон торговцу?
   - Маленькая девочка, которая поёт **(верно)**
   - Пип
   - Хранитель
   - Мира

---

## Эпизод 8 (s1e08): Lina — Лина

- **Уровень:** A1
- **Панелей:** 16
- **newWords:** family, mother, child, love, friend, lie, true, alone, use

### Синопсис

В тупике за рынком Мира наконец рассказывает о Лине, и серия почти вся — её воспоминание, рассказанное в настоящем времени. Две сестры остались вдвоём; на кухонной стене выросла дверь, Лина открыла её, а потом, в Башне, Безмолвные забрали все слова Лины. На рисунке памяти нельзя разобрать, чьи пальцы разжались первыми. Чтобы получить карту к последней двери, Мира отдала Хранителю слово целиком, и теперь не слышит и не говорит его. Ей нужен Зеро: тот, кто учит слова, может составить предложение, которое откроет дверь, и она три года ждала такого человека. Дэн узнаёт, что его использовали, они ссорятся, и он уходит; Мира делает шаг и не может побежать за ним. Одинокого Дэна берёт за рукав маленькая Безмолвная и ведёт туда, где нет Мириной карты.

### Сценарий по панелям

#### Панель 01

- **bg:** `street` | **mood:** `tense` | **sfx:** `—`
- **cast:** dan (left), mira (right)
- **art:** Tense two-shot in a dead-end stone alley behind the market: Dan at the left, Mira at the right facing him, both out of breath. The song has gone silent; on a rusty nail in the wall between them hangs a scrap of frayed vermilion thread, the same as Mira's cord. One flickering ochre lantern, cold teal darkness at the far end.
- **Реплики:**
  - `narration-ru` — **RU:** Тупик за рынком. Песня стихла. На ржавом гвозде — обрывок красной нити, точь-в-точь как у Миры на запястье.
  - `speech / dan` — **EN:** Lina is your sister, Mira. — **RU:** Лина — твоя сестра, Мира.
  - `speech / mira` — **EN:** I hear nothing. But yes. — **RU:** Я ничего не слышу. Но да.

#### Панель 02

- **bg:** `room` | **mood:** `calm` | **sfx:** `—`
- **cast:** dan (left), mira (right)
- **art:** Quiet two-shot in a tiny round niche room with ochre scratched walls and a bare hanging lamp with a vermilion-hearted flame: Mira at the right sits with her back to the wall and her knees up, eyes on the floor; Dan at the left sits cross-legged, listening. Warm, fragile light.
- **Реплики:**
  - `narration-ru` — **RU:** Мира говорит быстро и ровно — как человек, который много раз рассказывал это самому себе.
  - `speech / mira` — **EN:** I tell you the true story. It is not good. — **RU:** Я расскажу тебе правдивую историю. Она нехорошая.

#### Панель 03

- **bg:** `white` | **mood:** `calm` | **sfx:** `—`
- **cast:** mira (left), lina_human (right)
- **art:** Memory scene in warm sepia paper tones. Wide shot of a tiny cramped family kitchen: young Mira (the same look, three years younger) at the left and her 14-year-old sister Lina with two loose braids at the right sit close together at a small table, two cups, a small window with soft light; the other two chairs are empty. A faint red cord on each girl's left wrist.
- **Реплики:**
  - `speech / mira` — **EN:** Lina and me. Our mother is gone. Our father is gone. — **RU:** Мы с Линой. Нашей мамы нет. Нашего папы нет.
  - `speech / mira` — **EN:** She is my family. I am her family. — **RU:** Она моя семья. Я её семья.

#### Панель 04

- **bg:** `white` | **mood:** `calm` | **sfx:** `—`
- **cast:** mira (left), lina_human (right)
- **art:** Memory scene in warm sepia paper tones. Medium shot in the kitchen: on the plain wall a wooden door has grown out of nowhere, a single faint vermilion glow shape (abstract, no letters) around its frame; Lina at the right reaches for its handle with a curious smile; young Mira at the left sits at the table, seen half from behind, watching.
- **Реплики:**
  - `speech / mira` — **EN:** A door comes. Lina opens it. She is a child. She loves doors. — **RU:** Приходит дверь. Лина открывает её. Она ребёнок. Она любит двери.

#### Панель 05

- **bg:** `white` | **mood:** `tense` | **sfx:** `—`
- **cast:** mira (left), lina_human (right)
- **art:** Memory scene in warm sepia paper tones. Medium tracking shot in a narrow Tower corridor: Lina at the right walks ahead with her chin up, singing with her mouth open; young Mira at the left hurries behind her with a finger raised to her own lips. Faint vermilion sparks float overhead.
- **Реплики:**
  - `speech / mira` — **EN:** A child sings. She loves songs. She is loud. I say: be quiet. — **RU:** Ребёнок поёт. Она любит песни. Она громкая. Я говорю: тише.

#### Панель 06

- **bg:** `white` | **mood:** `action` | **sfx:** `—`
- **cast:** mira (left), lina_human (center), silent (right)
- **art:** Memory scene in warm sepia paper tones. Dramatic close shot on two hands in the foreground drifting apart, fingers sliding, both slightly blurred so that it is impossible to tell which hand opened first; behind them, out of focus, young Mira on her knees at the left, Lina pulled back at the centre, and a tall faceless Silent looming at the right.
- **Реплики:**
  - `speech / mira` — **EN:** They come. I have no breath. They take the child. They take all her words. — **RU:** Они идут. У меня нет дыхания. Они забирают ребёнка. Они забирают все её слова.
  - `narration-ru` — **RU:** Две руки расходятся. Чьи пальцы разжались первыми — на этом рисунке не разобрать.
  - `speech / mira` — **EN:** Then I am alone. — **RU:** И я остаюсь одна.

#### Панель 07

- **bg:** `room` | **mood:** `tense` | **sfx:** `—`
- **cast:** dan (left), mira (right)
- **art:** Two-shot in the niche room: Dan at the left leans forward with elbows on his knees, listening hard; Mira at the right stares at the lamp, her jaw tight, one hand gripping the red cord on her left wrist. The lamp's vermilion-hearted flame flickers.
- **Реплики:**
  - `speech / dan` — **EN:** And the Keeper? — **RU:** А Хранитель?
  - `speech / mira` — **EN:** I go to him. He has a map to the last door. It is not free. — **RU:** Я иду к нему. У него есть карта к последней двери. Она не бесплатная.

#### Панель 08

- **bg:** `white` | **mood:** `tense` | **sfx:** `—`
- **cast:** keeper (center), mira (left), system (right)
- **art:** Memory scene in warm sepia paper tones. Wide shot of the huge round Hall of Words with shelves of glowing jars: the Keeper (hood hiding his eyes, only a calm small smile visible) at the centre draws a single glowing vermilion thread out of young Mira's chest with his ink-stained fingertips; Mira at the left, pale and rigid. The red cord on her wrist dims. The System window floats at the right.
- **Реплики:**
  - `speech / keeper` — **EN:** One word, whole. I give you the map. — **RU:** Одно слово, целиком. Я даю тебе карту.
  - `system / system` — **EN:** Word lost: ... — **RU:** Слово потеряно: ...
  - `narration-ru` — **RU:** Даже в собственной памяти Мира не слышит, какое слово у неё забрали.

#### Панель 09

- **bg:** `room` | **mood:** `tense` | **sfx:** `—`
- **cast:** dan (left), mira (right), system (center)
- **art:** Close two-shot in the niche room: Mira at the right looks straight at Dan with hard honest eyes; Dan at the left listens, the lamp flame between them. The System window hovers at the top centre, its border steady.
- **Реплики:**
  - `speech / mira` — **EN:** Lina waits at the last door. It needs a sentence. — **RU:** Лина ждёт у последней двери. Ей нужно предложение.
  - `speech / mira` — **EN:** Nobody here can make one. We buy words and use them one by one. — **RU:** Здесь никто не может его составить. Мы покупаем слова и используем их по одному.
  - `system / system` — **EN:** True. — **RU:** Правда.

#### Панель 10

- **bg:** `room` | **mood:** `tense` | **sfx:** `—`
- **cast:** dan (left), mira (right)
- **art:** Close-up two-shot, eye level: Mira at the right speaks without looking away; Dan at the left slowly understands, eyes widening behind the taped glasses. The lamp's warm light cuts across both faces.
- **Реплики:**
  - `speech / mira` — **EN:** The Keeper tells me: wait for a Zero. A Zero learns his words. He can open that door. — **RU:** Хранитель говорит мне: жди Зеро. Зеро учит свои слова. Он может открыть ту дверь.
  - `speech / dan` — **EN:** So you wait for me. — **RU:** Значит, ты ждала меня.
  - `speech / mira` — **EN:** I wait three years. I don't tell you. That is a lie too. — **RU:** Я жду три года. Я не говорю тебе. Это тоже ложь.

#### Панель 11

- **bg:** `room` | **mood:** `tense` | **sfx:** `—`
- **cast:** dan (left), mira (right)
- **art:** Tense two-shot, slightly low angle: Dan at the left has stood up, fists clenched, stricken and angry; Mira at the right stays seated, looking up at him, unflinching. The niche walls are scratched with names.
- **Реплики:**
  - `speech / dan` — **EN:** You don't help me. You use me. — **RU:** Ты мне не помогаешь. Ты меня используешь.
  - `speech / mira` — **EN:** Yes. I use you. Lina is my family. — **RU:** Да. Я использую тебя. Лина — моя семья.
  - `speech / dan` — **EN:** One day. Then I am gone. Zero is useful. — **RU:** Один день. Потом я уйду. Зеро полезен.
  - `speech / mira` — **EN:** It is true. I don't lie to you now. — **RU:** Это правда. Сейчас я тебе не вру.

#### Панель 12

- **bg:** `room` | **mood:** `action` | **sfx:** `—`
- **cast:** dan (left), mira (right), system (center)
- **art:** Action two-shot in the niche room: Dan at the left shouts with one arm thrown out, Mira at the right on her feet shouts back, both leaning into each other; between and above them the System window with a solid vermilion border and inverted colours (a warning). The lamp flame leans sideways as if from the noise.
- **Реплики:**
  - `shout / dan` — **EN:** My name! My OPEN! You know his price! — **RU:** Моё имя! Моё OPEN! Ты знала его цену!
  - `shout / mira` — **EN:** I tell you: don't talk to him! He is bad for us! — **RU:** Я говорила: не говори с ним! Он плох для нас!
  - `shout / dan` — **EN:** My mom calls me! You lie! I am not your key! — **RU:** Мне звонит мама! Ты лжёшь! Я не твой ключ!
  - `system / system` — **EN:** Quiet. They hear you. — **RU:** Тише. Они слышат вас.

#### Панель 13

- **bg:** `corridor` | **mood:** `tense` | **sfx:** `—`
- **cast:** dan (left), mira (right)
- **art:** Medium shot in the soot-dark corridor from behind Mira at the right: Dan at the left walks away from her into the corridor, his back to the viewer, fists in his pockets. Mira has taken half a step and stopped, one hand outstretched, her feet visibly unable to follow. The niche's warm lamp glow behind her.
- **Реплики:**
  - `speech / dan` — **EN:** I am not your friend. Find your door alone. — **RU:** Я тебе не друг. Ищи свою дверь одна.
  - `speech / mira` — **EN:** Zero. Wait. — **RU:** Зеро. Подожди.
  - `thought / mira` — **EN:** He is not my friend. He is my key. Then why can't I run? — **RU:** Он мне не друг. Он мой ключ. Тогда почему я не могу бежать?
  - `narration-ru` — **RU:** Мира хочет побежать за ним — и не может. Там, где было слово, теперь дыра: она не умеет удерживать своих.

#### Панель 14

- **bg:** `corridor` | **mood:** `calm` | **sfx:** `—`
- **cast:** dan (left), system (right)
- **art:** Quiet medium shot in the corridor: Dan at the left sits on the floor with his back against the wall, knees up, glasses pushed up on his forehead, rubbing his eyes; the System window floats at the right at his eye level, small and dim.
- **Реплики:**
  - `system / system` — **EN:** You are alone. That is a bad plan. — **RU:** Ты один. Это плохой план.
  - `speech / dan` — **EN:** True. Her plan is bad too. A friend does not use a friend. — **RU:** Верно. Её план тоже плохой. Друг не использует друга.
  - `system / system` — **EN:** Missed calls: 11. — **RU:** Пропущенные звонки: 11.
  - `thought / dan` — **EN:** Mom. I love you. I never say it to you. — **RU:** Мама. Я люблю тебя. Я никогда тебе этого не говорю.

#### Панель 15

- **bg:** `corridor` | **mood:** `tense` | **sfx:** `—`
- **cast:** dan (left), silent (right)
- **art:** Close two-shot at hip height: a small child-sized Silent (1.4 m, with a frayed vermilion cord on its left wrist) at the right has taken Dan's sleeve between two thin pale fingers and tugs it; Dan at the left looks down at it, caught between fear and tenderness.
- **Реплики:**
  - `speech / silent` — **EN:** Come. — **RU:** Иди.
  - `speech / dan` — **EN:** Lina? I am not Mira. Mira is there. — **RU:** Лина? Я не Мира. Мира там.
  - `speech / silent` — **EN:** Come. You. — **RU:** Иди. Ты.

#### Панель 16

- **bg:** `black` | **mood:** `tense` | **sfx:** `—`
- **cast:** dan (left), silent (center), system (right)
- **art:** Dark low-angle shot: in a black wall a narrow slit of red light splits the dark; the small Silent in the centre points one thin arm toward it, Dan at the left looks at the slit, and the System window with a solid vermilion border floats at the right.
- **Реплики:**
  - `speech / silent` — **EN:** Look. — **RU:** Смотри.
  - `system / system` — **EN:** Warning. This place is not on her map. — **RU:** Предупреждение. Этого места нет на её карте.
  - `narration-ru` — **RU:** Она ведёт его не к сестре. Она ведёт его туда, куда три года водила пальцем по камню.

### Грамматика: my, your, his, her, our и me, him, her, us, them

Слова my (мой), your (твой), his (его), her (её), our (наш) стоят перед существительным и показывают, чьё оно: my name, her words, our mother. Слова me, him, her, us, them стоят после глагола и отвечают на вопрос «кого?»: You use me. They take her. Заметь, что her бывает двух видов: her family — «её семья», They take her — «забирают её».

- She is my family. — Она моя семья.
- I am her family. — Я её семья.
- You use me. — Ты меня используешь.

### Квиз

1. Какое слово Мира отдала Хранителю?
   - Мама
   - Дверь
   - Сестра **(верно)**
   - Карта
2. Что Мира получила взамен?
   - Карту к последней двери **(верно)**
   - Новое имя
   - Красный шнурок
   - Десять дыханий
3. Зачем Мире нужен Зеро?
   - Он сильнее всех на этаже
   - Он носит её рюкзак
   - Он умеет драться
   - Он учит слова и может составить предложение для двери **(верно)**
4. Кто увёл Дэна в конце серии?
   - Пип
   - Маленькая Безмолвная — Лина **(верно)**
   - Хранитель
   - Торговец

---

## Эпизод 9 (s1e09): The Wall of Letters — Стена Букв

- **Уровень:** A1
- **Панелей:** 16
- **newWords:** because, but, letter, sentence, learn, speak, voice, first, tower, build

### Синопсис

Маленькая Безмолвная проводит Дэна через красную щель к исполинской Стене Букв, и Система наконец объясняет, что Башня — не дом, а длинное предложение без конца: она крадёт слова, потому что не умеет делать их сама. Дэн читает верхнюю строку (READ), впервые складывает цепочку из двух слов (AND) и узнаёт, что Башня учится на его голосе, а не отнимает его. Он видит стену, которая примеряет имена, и фреску с мостом без правого берега, а Система обрывает ответ на полуслове. Лина-Эхо просит Миру; Дэн всё ещё злится, но решает найти её — потому что она одна, а он знает, что такое одиночество. В пробеле верхней строки сами собой встают три огромных красных знака, и стена повторяет его слова из первой ночи его же голосом.

### Сценарий по панелям

#### Панель 01

- **bg:** `tower-exterior` | **mood:** `calm` | **sfx:** `—`
- **cast:** dan (left), silent (right)
- **art:** Wide low-angle shot from behind: Dan at the left and the child-sized Silent at the right stand small on a narrow stone walkway, a thin slit of red light closing behind them. Above them the colossal curved Wall of Letters, built of millions of carved abstract glyph-bricks and drifting vermilion sparks, fills the whole sky. Dusty apricot light, no readable text.
- **Реплики:**
  - `narration-ru` — **RU:** Щель в стене расширяется, и они выходят на узкий карниз. Перед Дэном встаёт стена высотой до самого неба — и каждый её камень оказывается буквой.
  - `speech / dan` — **EN:** It is a wall. But it is not a wall. It is letters. — **RU:** Это стена. Но это не стена. Это буквы.

#### Панель 02

- **bg:** `tower-exterior` | **mood:** `calm` | **sfx:** `—`
- **cast:** dan (left), system (right)
- **art:** Medium over-the-shoulder shot from behind Dan's right shoulder: Dan at the left looks up at the System window hovering at the right, with the glyph-brick wall behind both. A few vermilion sparks drift toward a dark slot at the foot of the wall, as if lost words were arriving. Apricot dusk light.
- **Реплики:**
  - `system / system` — **EN:** This is the Wall of Letters. Every lost word comes here. — **RU:** Это Стена Букв. Каждое потерянное слово попадает сюда.
  - `speech / dan` — **EN:** Why? — **RU:** Почему?
  - `system / system` — **EN:** Because the Tower builds with words. — **RU:** Потому что Башня строится из слов.

#### Панель 03

- **bg:** `tower-exterior` | **mood:** `tense` | **sfx:** `—`
- **cast:** dan (left), system (right)
- **art:** Tight tense shot: Dan at the left leans close to the wall, his brow almost touching it, eyes narrowed behind his round glasses, while the carved glyph-bricks in front of him swim and blur like fish under glass. One short row near his eyes sharpens into steady shapes glowing vermilion. The System window at the right is blank cream paper with a red double border.
- **Реплики:**
  - `narration-ru` — **RU:** Знаки плывут и расползаются, как рыбки под стеклом. Дэн упирается лбом в камень и заставляет себя читать.
  - `speech / dan` — **EN:** I can read it! These letters say 'I am'... and then nothing. — **RU:** Я могу это прочесть! Эти буквы говорят «I am»... а дальше ничего.
  - `system / system` — **EN:** New word: READ. READ is yours now. Count: five. — **RU:** Новое слово: READ. READ теперь твоё. Счёт: пять.
  - `speech / dan` — **EN:** Five! I am a happy fool again. — **RU:** Пять! Я снова счастливый дурак.

#### Панель 04

- **bg:** `tower-exterior` | **mood:** `tense` | **sfx:** `—`
- **cast:** dan (left), system (right)
- **art:** Low-angle shot looking up: the System window at the right, large and still, while Dan at the left stands small and stunned beneath the enormous curve of the wall. A single vermilion line of abstract glyph shapes runs along the wall, endlessly, into the far distance and the clouds, with no end in sight.
- **Реплики:**
  - `system / system` — **EN:** The Tower is not a house. The Tower is a sentence. — **RU:** Башня — не дом. Башня — предложение.
  - `system / system` — **EN:** A long sentence. It has no end. It builds with words, because it can't make them. — **RU:** Длинное предложение. У него нет конца. Оно строится из слов, потому что не умеет делать их само.

#### Панель 05

- **bg:** `tower-exterior` | **mood:** `tense` | **sfx:** `—`
- **cast:** dan (left), system (right)
- **art:** Quiet two-shot, eye level: Dan at the left, arms hanging, turns to face the System window at the right. Between them a single warm ochre lantern glows on the stone at the foot of the wall. The seal on the window glows faintly, as if the window were listening.
- **Реплики:**
  - `speech / dan` — **EN:** And you? What are you? — **RU:** А ты? Кто ты?
  - `system / system` — **EN:** This voice is the first word of the Tower. But this voice does not take. It learns. — **RU:** Этот голос — первое слово Башни. Но этот голос не берёт. Он учится.

#### Панель 06

- **bg:** `tower-exterior` | **mood:** `tense` | **sfx:** `—`
- **cast:** dan (left), silent (right)
- **art:** Two-shot at the foot of the wall: the child-sized Silent at the right lays her thin left hand on the stone, and at her fingertips one cluster of tiny carved glyphs glows vermilion. High above, a blank gap in the huge line of glyphs blinks, cycling through different glowing shapes as if trying names on. Dan at the left watches, pencil behind his ear.
- **Реплики:**
  - `narration` — **EN:** The wall speaks: I am Lina. I am Dan. I am... — **RU:** Стена говорит: «I am Lina. I am Dan. I am...»
  - `narration-ru` — **RU:** Пробел после «I am» мигает и примеряет имя за именем, как человек примеряет пальто в лавке.
  - `speech / dan` — **EN:** It takes names, because it has no name! — **RU:** Она берёт имена, потому что у неё нет своего!

#### Панель 07

- **bg:** `tower-exterior` | **mood:** `calm` | **sfx:** `—`
- **cast:** dan (left), system (right)
- **art:** Calm medium shot: low on the stone base of the wall, an old faded fresco of two boys standing at either end of a bridge whose right side ends in empty air, with no bank to meet it. Dan at the left crouches in front of it, head tilted, squinting like an engineer, while the System window waits at the right.
- **Реплики:**
  - `speech / dan` — **EN:** I build bridges. This bridge has no right side. They don't ... it. — **RU:** Я строю мосты. У этого моста нет правой стороны. Они не ... его.
  - `system / system` — **EN:** Almost. — **RU:** Почти.
  - `speech / dan` — **EN:** What? — **RU:** Что?
  - `system / system` — **EN:** Not now. Ask me later. — **RU:** Не сейчас. Спроси меня позже.

#### Панель 08

- **bg:** `tower-exterior` | **mood:** `action` | **sfx:** `SCRAPE`
- **cast:** dan (left), silent (center), system (right)
- **art:** Dynamic low-angle action shot on a narrow ledge: Dan at the left shouts with his right hand thrust forward; two bands of glowing vermilion abstract glyph shapes stream from his mouth, one slamming into the lead tall Silent in the center, which freezes mid-step with a vermilion rim, the other shoving a huge fallen stone block that blocks the ledge. More tall Silents queue behind the lead. The System window floats top right.
- **Реплики:**
  - `shout / dan` — **EN:** Stop and push! — **RU:** Стой и толкай!
  - `system / system` — **EN:** Two words. One breath and a half. Because of AND. — **RU:** Два слова. Полтора дыхания. Благодаря AND.
  - `speech / dan` — **EN:** AND is a good word! — **RU:** AND — хорошее слово!
  - `system / system` — **EN:** AND is a small word. Small words are free. — **RU:** AND — маленькое слово. Маленькие слова бесплатны.

#### Панель 09

- **bg:** `tower-exterior` | **mood:** `tense` | **sfx:** `—`
- **cast:** dan (left), system (right)
- **art:** Medium shot at the base of the wall: a small wooden door, waist-high, with a round brass knob, set into the glyph-bricks. Dan at the left, hand held out and mouth open mid-sentence, speaks to it; a thin ribbon of vermilion abstract glyph shapes travels from his mouth to the door, and the door cracks open with warm ochre light spilling out. The System window floats at the right.
- **Реплики:**
  - `system / system` — **EN:** This door hears a reason. — **RU:** Эта дверь слышит причину.
  - `speech / dan` — **EN:** Let me in, because I am Dan and I learn. — **RU:** Впусти меня, потому что я Дэн и я учусь.
  - `system / system` — **EN:** True. — **RU:** Правда.

#### Панель 10

- **bg:** `room` | **mood:** `calm` | **sfx:** `—`
- **cast:** dan (left), system (right)
- **art:** Cosy niche inside the wall: its curved walls are made of glyph-bricks that rise slowly and slot into place by themselves. Dan at the left turns in delight toward two tiny round vermilion glyph shapes floating in from a crack at the right, as if his own spoken word had come home. The System window hovers beside them.
- **Реплики:**
  - `narration-ru` — **RU:** В нише стена кладёт слова, как кирпичи. Из щели вплывает красное «OK» — голосом Дэна, ещё с Лестницы эха.
  - `speech / dan` — **EN:** That is my OK! That is my voice! — **RU:** Это моё OK! Это мой голос!
  - `system / system` — **EN:** The Tower learns from you. It keeps every word you say. — **RU:** Башня учится у тебя. Она хранит каждое твоё слово.

#### Панель 11

- **bg:** `room` | **mood:** `calm` | **sfx:** `—`
- **cast:** dan (left), system (right)
- **art:** Quiet shot in the niche: Dan at the left sits on the floor with his back against the wall, hands loose over his knees, a relieved half-smile. The System window at the right hovers a little lower than before, calm. A bare lamp with a vermilion-hearted flame hangs between them.
- **Реплики:**
  - `speech / dan` — **EN:** But I don't lose them. — **RU:** Но я их не теряю.
  - `system / system` — **EN:** No. You speak. It learns. Nobody loses. That is new. The others buy and sell. You learn. — **RU:** Нет. Ты говоришь. Она учится. Никто не теряет. Это ново. Другие покупают и продают. Ты учишься.

#### Панель 12

- **bg:** `room` | **mood:** `calm` | **sfx:** `—`
- **cast:** dan (left), silent (right)
- **art:** Tender two-shot in the niche: Dan at the left kneels facing the child-sized Silent at the right, who takes his palm in her thin pale fingers and presses it flat onto a brick that glows faintly vermilion in the wall, then lifts her other thin arm and points upward. Dan looks torn, shaking his head slowly.
- **Реплики:**
  - `speech / dan` — **EN:** You want your name. But I can't take it. It is in the wall. — **RU:** Ты хочешь своё имя. Но я не могу его взять. Оно в стене.
  - `speech / silent` — **EN:** Mira. — **RU:** Мира.
  - `speech / dan` — **EN:** You want Mira. But I don't like her now. — **RU:** Ты хочешь Миру. Но она мне сейчас не нравится.

#### Панель 13

- **bg:** `room` | **mood:** `calm` | **sfx:** `—`
- **cast:** dan (left), system (right)
- **art:** Quiet close shot in the niche: Dan at the left sits alone with his head tilted, looking down at a torn piece of dark bread in his open palm. The System window at the right is small and dim. Warm lamp light.
- **Реплики:**
  - `thought / dan` — **EN:** She uses me. But she gives me bread. She lies, and she is my first friend here. — **RU:** Она меня использует. Но она даёт мне хлеб. Она лжёт, и она мой первый друг здесь.
  - `system / system` — **EN:** Two true things. — **RU:** Две правды.

#### Панель 14

- **bg:** `tower-exterior` | **mood:** `calm` | **sfx:** `—`
- **cast:** dan (left), silent (right)
- **art:** Wide quiet shot on the walkway at golden dusk: Dan at the left stands tall with his back to the small door, resolute, while the child-sized Silent at the right holds his sleeve and turns toward him. Both look along the walkway into the distance, the way they came.
- **Реплики:**
  - `narration-ru` — **RU:** Это не расчёт. Это то, что остаётся, когда злость устала и человеку становится стыдно оставлять другого одного.
  - `speech / dan` — **EN:** OK. We find her. Because she is alone, and I know alone. — **RU:** Хорошо. Мы найдём её. Потому что она одна, а я знаю, что такое одиночество.

#### Панель 15

- **bg:** `tower-exterior` | **mood:** `tense` | **sfx:** `—`
- **cast:** dan (left), system (right)
- **art:** Dramatic low-angle wide shot: far above, in the blank gap of the huge line of glyphs, three enormous abstract vermilion glyph shapes rise out of the stone by themselves like lava sparks. Dan at the bottom left is tiny, looking up in alarm. The System window at the right is inverted: a solid vermilion frame with a dark fill, warning style.
- **Реплики:**
  - `narration-ru` — **RU:** В пробеле верхней строки сами собой встают огромные красные знаки. Три знака. Его знаки.
  - `system / system` — **EN:** Warning. The sentence wants a name. — **RU:** Предупреждение. Предложению нужно имя.
  - `speech / dan` — **EN:** That is my name. On the wall. Why? — **RU:** Это моё имя. На стене. Почему?

#### Панель 16

- **bg:** `black` | **mood:** `tense` | **sfx:** `—`
- **cast:** dan (left), system (right)
- **art:** Dark close shot: Dan's face at the left, stunned, lips parted, lit from behind by a faint vermilion glow from the unseen wall; the rest is deep black. A small System window at the right edge has a solid vermilion frame.
- **Реплики:**
  - `narration` — **EN:** I am Dan. I am not weak. I am tired. — **RU:** Я Дэн. Я не слабый. Я устал.
  - `speech / dan` — **EN:** That is my voice. I say that on the first night. — **RU:** Это мой голос. Я говорю это в первую ночь.
  - `system / system` — **EN:** It learns to speak. — **RU:** Она учится говорить.

### Грамматика: and, but, because — маленькие слова-связки

Слово and («и») соединяет два слова или две части фразы: Stop and push! Слово but («но», «а») показывает противоположность: It is a wall. But it is not a wall. Слово because («потому что») называет причину: Let me in, because I am Dan and I learn. Сами по себе эти слова ничего не делают, но именно они склеивают слова в длинную фразу. Because обычно стоит посередине предложения и отвечает на вопрос «почему?».

- Stop and push! — Стой и толкай!
- It is a wall. But it is not a wall. — Это стена. Но это не стена.
- Let me in, because I am Dan and I learn. — Впусти меня, потому что я Дэн и я учусь.

### Квиз

1. Что такое Башня на самом деле?
   - Огромный каменный дом
   - Длинное предложение без конца **(верно)**
   - Школа для альпинистов
   - Рынок слов
2. Почему Башня забирает слова?
   - Это её игра
   - Она боится Дэна
   - Она не умеет делать слова сама **(верно)**
   - Её об этом попросила Мира
3. Что дало слово AND в бою на карнизе?
   - Два слова за полтора дыхания **(верно)**
   - Новое имя для Дэна
   - Дверь в стене
   - Карту Миры
4. Чьим голосом заговорила стена в конце серии?
   - Миры
   - Хранителя
   - Системы
   - Голосом Дэна **(верно)**

---

## Эпизод 10 (s1e10): The First Sentence — Первое предложение

- **Уровень:** A1
- **Панелей:** 16
- **newWords:** make, find, close, hold, strong, new, breath, fight, every, last

### Синопсис

Мира находит Дэна рядом с Линой у говорящей стены, впервые просит прощения и не может даже подойти к сестре: проданное слово держит её ноги. Железная дверь не поддаётся ни PUSH, ни пустому OPEN, и Дэн, глядя на кладку, понимает, что стену держат не камни, а швы, и собирает первое предложение: «I open the door». Правдивое предложение стоит всего одно дыхание и привязывает сразу целую россыпь простых слов; Дэн учит Миру говорить маленькие слова, и у неё получается собственное предложение. В последнем зале их ждёт Хранитель, не в кресле, а на ногах, и шеренга Безмолвных; Дэн отказывается отдать имя, пробует бой предложениями и теряет дыхание. Мира кричит изо всех сил, падает без дыхания, и высокий Безмолвный забирает её имя. Хранитель называет цену: имя Дэна за имя Миры.

### Сценарий по панелям

#### Панель 01

- **bg:** `tower-exterior` | **mood:** `tense` | **sfx:** `—`
- **cast:** dan (left), silent (center), mira (right)
- **art:** Wide shot at the foot of the Wall of Letters: Dan at the left and the child-sized Silent at the center stand together, while Mira at the right has stopped three steps away, out of breath, her red cord on her left wrist. Behind them the wall's top gap still pulses faintly vermilion.
- **Реплики:**
  - `narration-ru` — **RU:** Стена за спиной всё ещё шепчет голосом Дэна. Мира пришла на этот голос — и остановилась в трёх шагах от маленькой Безмолвной.
  - `speech / mira` — **EN:** You find her. — **RU:** Ты нашёл её.
  - `speech / dan` — **EN:** She finds me. — **RU:** Это она меня нашла.

#### Панель 02

- **bg:** `tower-exterior` | **mood:** `calm` | **sfx:** `—`
- **cast:** dan (left), mira (right)
- **art:** Quiet two-shot at the wall's foot: Mira at the right looks at the ground and rubs the back of her neck, awkward and stiff. Dan at the left raises one finger like an engineer with an idea. A little ochre lantern glows between them.
- **Реплики:**
  - `speech / mira` — **EN:** I am sorry, Zero. — **RU:** Прости, Зеро.
  - `speech / dan` — **EN:** I don't like your plan. But I have a new plan. We make a sentence for the last door. — **RU:** Мне не нравится твой план. Но у меня есть новый план. Мы составим предложение для последней двери.

#### Панель 03

- **bg:** `tower-exterior` | **mood:** `tense` | **sfx:** `—`
- **cast:** mira (left), silent (center), system (right)
- **art:** Tense shot: Mira at the left clenches her red cord in her fist and leans forward as if to step, but her feet stay rooted. The child-sized Silent in the center turns its blank face toward her, arms hanging. The System window floats at the right.
- **Реплики:**
  - `narration-ru` — **RU:** Мира не может подойти. Проданное слово оставляет Дыру: её ноги сами обходят всё, что это слово называло.
  - `system / system` — **EN:** Mira holds her cord. She does not hold the child. — **RU:** Мира держит свой шнурок. Ребёнка она не держит.
  - `speech / mira` — **EN:** I can't. I don't know why. — **RU:** Я не могу. Я не знаю почему.

#### Панель 04

- **bg:** `corridor` | **mood:** `tense` | **sfx:** `THUD`
- **cast:** dan (left), system (right)
- **art:** Tense shot in a narrow stone corridor: a huge black iron-banded door fills the center and right of the frame. Dan at the left presses both palms flat against it, shoulders straining, small vermilion sparks around his hands, but the door does not move. Mira stands behind with her arms crossed; the System window floats top right.
- **Реплики:**
  - `system / system` — **EN:** This door is strong. PUSH is weak here. — **RU:** Эта дверь сильная. PUSH здесь слабое.
  - `speech / dan` — **EN:** I can say OPEN. It does nothing. The Keeper has it. — **RU:** Я могу сказать OPEN. Оно ничего не делает. Оно у Хранителя.

#### Панель 05

- **bg:** `corridor` | **mood:** `calm` | **sfx:** `—`
- **cast:** dan (center)
- **art:** Quiet close shot: Dan alone at the center rests one hand on the cold iron door and studies the joints of the stones around it with an engineer's squint; faint ochre construction-style lines seem to trace the seams of the wall as he thinks. His yellow pencil is behind his right ear.
- **Реплики:**
  - `narration-ru` — **RU:** Слово — это камень. Но стену держат не камни, а кладка. Инженер в Дэне наконец поднимает голову.
  - `thought / dan` — **EN:** One stone is not a wall. The Tower makes a sentence. I can make a sentence too. — **RU:** Один камень — ещё не стена. Башня делает предложение. Я тоже могу сделать предложение.

#### Панель 06

- **bg:** `corridor` | **mood:** `calm` | **sfx:** `—`
- **cast:** dan (left), mira (right)
- **art:** Two-shot in the corridor: Dan at the left gestures with an open hand, drawing three small invisible points in the air with a fingertip, explaining. Mira at the right has her arms crossed and one eyebrow with the scar raised, sceptical.
- **Реплики:**
  - `speech / mira` — **EN:** We buy words. They don't make a sentence. Nobody can. — **RU:** Мы покупаем слова. Они не делают предложение. Никто не может.
  - `speech / dan` — **EN:** I learn words. Who? I. What do I do? Open. What? The door. — **RU:** Я учу слова. Кто? Я. Что делаю? Открываю. Что? Дверь.

#### Панель 07

- **bg:** `flash` | **mood:** `action` | **sfx:** `—`
- **cast:** dan (center)
- **art:** Bright overexposed shot: Dan alone at the center stands calm with his hand extended toward the iron door. From his mouth a steady horizontal row of four glowing vermilion glyph shapes travels in a neat straight line, like a sentence on a ruled page. At the far side the great iron door swings quietly inward and white light spills out.
- **Реплики:**
  - `shout / dan` — **EN:** I open the door. — **RU:** Я открываю дверь.
  - `system / system` — **EN:** Sentence: 4 words. True. One breath. — **RU:** Предложение: 4 слова. Правда. Одно дыхание.

#### Панель 08

- **bg:** `corridor` | **mood:** `calm` | **sfx:** `—`
- **cast:** dan (left), mira (right), system (center)
- **art:** Two-shot: Mira at the right stares at the now-open iron door, mouth open, stunned. Dan at the left gives a modest shrug, smug and tired at the same time. The System window floats above the center. Beyond the open door is a dim passage with a distant ochre light.
- **Реплики:**
  - `speech / mira` — **EN:** One breath? For that door? You have no OPEN! — **RU:** Одно дыхание? За эту дверь? У тебя нет OPEN!
  - `speech / dan` — **EN:** I don't need a strong word. Every door hears a true sentence. — **RU:** Мне не нужно сильное слово. Любая дверь слышит правдивое предложение.
  - `system / system` — **EN:** A true sentence makes small words yours. DOOR is yours now. Count: six. — **RU:** Правдивое предложение делает маленькие слова твоими. DOOR теперь твоё. Счёт: шесть.

#### Панель 09

- **bg:** `corridor` | **mood:** `calm` | **sfx:** `—`
- **cast:** dan (left), mira (right), system (center)
- **art:** Playful montage in one frame: Dan at the left laughs, holding a small lit oil lamp in his raised right hand and a brass key in his left, while small vermilion glyph shapes orbit him like fireflies. The iron door stands half-closed behind him. Mira at the right has her arms folded and one eyebrow raised, almost smiling. The System window hovers at the top.
- **Реплики:**
  - `speech / dan` — **EN:** I close the door. I hold the lamp. I find the key. I see the stone. I touch the stone! — **RU:** Я закрываю дверь. Я держу лампу. Я нахожу ключ. Я вижу камень. Я трогаю камень!
  - `system / system` — **EN:** A true sentence is strong. Count: 14. — **RU:** Правдивое предложение сильное. Счёт: 14.
  - `speech / mira` — **EN:** Stop. You play. — **RU:** Хватит. Ты играешь.

#### Панель 10

- **bg:** `corridor` | **mood:** `calm` | **sfx:** `—`
- **cast:** dan (left), mira (right), system (center)
- **art:** Warm comic shot: Mira at the right faces the iron door with one hand raised, mouth open mid-word, a neat row of four steady vermilion glyph shapes leaving her lips, and the door slides closed softly. Her mouth curls into a tiny first smile. Dan at the left grins, one finger raised like a teacher.
- **Реплики:**
  - `speech / mira` — **EN:** I... close... door. — **RU:** Я... закрыть... дверь.
  - `system / system` — **EN:** Not true. That is not a sentence. — **RU:** Неправда. Это не предложение.
  - `speech / dan` — **EN:** The small words are free. Say 'the'. Say it with me. — **RU:** Маленькие слова бесплатны. Скажи «the». Скажи вместе со мной.
  - `speech / mira` — **EN:** I close the door. — **RU:** Я закрываю дверь.

#### Панель 11

- **bg:** `dungeon` | **mood:** `tense` | **sfx:** `—`
- **cast:** dan (left), keeper (center), silent (right)
- **art:** Wide low-angle shot of the bare stone last hall: broken lamps are scattered and unlit on the floor, a high black wooden door with iron bands at the far end. The Keeper stands upright in the center, not in a chair, hands folded, hood hiding his eyes. At the right a tall Silent with two round dents on its blank face and a strip of mustard-yellow lanyard at its neck heads a silent line of tall Silents along the wall. Dan at the left, small, has stopped in the doorway.
- **Реплики:**
  - `narration-ru` — **RU:** Лампы в последнем зале сметены. Хранитель стоит — впервые не в кресле. За ним неподвижной шеренгой стоят Безмолвные.
  - `speech / silent` — **EN:** I am Dan. — **RU:** Я Дэн.
  - `speech / keeper` — **EN:** Welcome to the last hall. A new sentence, Zero! Every jar in my hall hears it. — **RU:** Добро пожаловать в последний зал. Новое предложение, Зеро! Каждая банка в моём зале его слышит.

#### Панель 12

- **bg:** `dungeon` | **mood:** `tense` | **sfx:** `—`
- **cast:** dan (left), keeper (right)
- **art:** Tense two-shot in the hall: Dan at the left and the Keeper at the right face each other two paces apart. The Keeper holds out his open palm toward Dan, asking for his name; Dan's jaw is set, his fists closed, shaking his head. Tall Silents wait in shadow behind the Keeper.
- **Реплики:**
  - `speech / keeper` — **EN:** Forty years, and nobody makes a new sentence here. I need one more word. Your name. Give it to me. — **RU:** Сорок лет никто здесь не составлял новых предложений. Мне нужно ещё одно слово. Твоё имя. Отдай его мне.
  - `speech / dan` — **EN:** No trade. I don't fight. I make sentences. — **RU:** Никакой сделки. Я не дерусь. Я составляю предложения.
  - `speech / keeper` — **EN:** Then no trade. They take it. — **RU:** Тогда без сделки. Они его заберут.

#### Панель 13

- **bg:** `dungeon` | **mood:** `action` | **sfx:** `CRACK`
- **cast:** dan (left), mira (center), silent (right)
- **art:** Action shot in the hall: Dan at the left thrusts his hand forward, vermilion abstract glyph shapes streaming from his mouth to freeze the nearest tall Silent at the right, which stops mid-step with a vermilion rim. Mira at the center-left has both hands braced against the iron door behind them, holding it shut. More tall Silents advance in shadow behind.
- **Реплики:**
  - `shout / dan` — **EN:** I stop the Silent! I close the way! — **RU:** Я останавливаю Безмолвного! Я закрываю путь!
  - `shout / mira` — **EN:** Don't fight them all! Hold the door! — **RU:** Не дерись со всеми! Держи дверь!

#### Панель 14

- **bg:** `dungeon` | **mood:** `action` | **sfx:** `—`
- **cast:** dan (left), mira (center), silent (right)
- **art:** Powerful action shot: Mira at the center throws her head back in a full-throat shout, vermilion light pouring from her mouth and her red cord blazing, rings of abstract vermilion light spreading across the hall as the tall Silents in front stagger back with their arms raised. Dan at the left shields his face. The tall dented Silent with the yellow lanyard strip at the right still walks on toward Dan.
- **Реплики:**
  - `speech / silent` — **EN:** I am Dan. I am Dan. — **RU:** Я Дэн. Я Дэн.
  - `shout / mira` — **EN:** Stop! Every one of you! — **RU:** Стойте! Все до одного!
  - `system / system` — **EN:** Mira fights with her last breath. — **RU:** Мира дерётся последним дыханием.

#### Панель 15

- **bg:** `dungeon` | **mood:** `tense` | **sfx:** `—`
- **cast:** silent (left), system (center), keeper (right)
- **art:** Low tense shot: Mira lies on the stone floor, pale, eyes closed, her red cord dull on her left wrist. A tall plain Silent (no dents, no lanyard, a different one from the dented Silent) bends over her, its seam close to her face. The Keeper stands behind at the right; the System window floats above in warning style, solid vermilion frame.
- **Реплики:**
  - `speech / silent` — **EN:** I am Mira. — **RU:** Я Мира.
  - `system / system` — **EN:** Word lost: MIRA. — **RU:** Слово потеряно: MIRA.
  - `speech / keeper` — **EN:** Not the name I want. But a name is a name. — **RU:** Не то имя, которое мне нужно. Но имя есть имя.

#### Панель 16

- **bg:** `black` | **mood:** `tense` | **sfx:** `—`
- **cast:** mira (left), keeper (center), system (right)
- **art:** Dark shot: Mira at the left kneels with one hand at her throat, mouth open in a silent gasp, eyes wide and frightened. The Keeper at the center-right is half-lit, holding a tiny glass jar with one vermilion spark in his open palm. The System window at the right edge has a solid vermilion frame. Everything else is black; Dan's silhouette stands frozen at the far left edge.
- **Реплики:**
  - `speech / mira` — **EN:** I am... I am... — **RU:** Я... я...
  - `speech / silent` — **EN:** Mira? Mira? — **RU:** Мира? Мира?
  - `speech / keeper` — **EN:** Bring your name to my hall, Dan. Then she has hers. — **RU:** Принеси своё имя в мой зал, Дэн. И тогда у неё будет её имя.
  - `system / system` — **EN:** Mira is Zero now. — **RU:** Мира теперь Зеро.

### Грамматика: Порядок слов: кто + делает + что

В английском предложении порядок почти всегда один: сначала тот, кто действует (I), потом глагол (open), потом то, с чем он действует (the door): I open the door. Нельзя выбросить маленькие слова: «I close door» — это ещё не предложение, поэтому у Миры сначала ничего не получилось. Слово the стоит прямо перед существительным и тоже является частью порядка. В Башне такое предложение, если оно правдивое, стоит одно дыхание и делает слова твоими.

- I open the door. — Я открываю дверь.
- I close the door. — Я закрываю дверь.
- Mira holds her cord. — Мира держит свой шнурок.

### Квиз

1. Почему PUSH не открыл железную дверь?
   - Дэн слишком устал
   - Дверь была слишком сильной для одного слова **(верно)**
   - Дверь уже была открыта
   - Мира держала её с другой стороны
2. Сколько дыханий стоило первое предложение Дэна?
   - Три
   - Десять
   - Ни одного
   - Одно **(верно)**
3. Почему у Миры сначала не получилось?
   - Она не слышала Дэна
   - Она слишком устала
   - Она сказала без маленьких слов, и это не предложение **(верно)**
   - Дверь была заперта
4. Чьё имя забрал Безмолвный в конце серии?
   - Миры **(верно)**
   - Дэна
   - Лины
   - Хранителя

---

## Эпизод 11 (s1e11): The Keeper's Door — Дверь Хранителя

- **Уровень:** A1
- **Панелей:** 17
- **newWords:** home, choose, stay, leave, remember, forget, call, year, old, young

### Синопсис

Дэн приводит безымянную Миру в безопасную комнату, оставляет с ней Лину и идёт к Хранителю: Пип по дороге признаётся, что за хлеб рассказывал ему всё. В Зале Слов Хранитель впервые говорит правду о себе: он первый Зеро, сорок лет в Башне, каждый год хочет домой — но дверь домой открывается только двоим, тому, кто помнит, и тому, кто зовёт, а его имя никто не зовёт. Зато мама Дэна звонит каждый час: Хранитель хочет выйти к ней под именем Дэна. Он предлагает два пути: отдать имя целиком и остаться в Башне (тогда Мира получит своё имя) или уйти домой и забыть Башню вместе с Мирой. Дэн пытается отнять банку, сила не работает («Not true»), и Хранитель сам открывает дверь, в щели виден офис и звонит телефон. Правдивые «хочу» и «нужно» связывают слова: счёт 31, ранг Word. Мира, бледная, приходит с Пипом и говорит: «Зеро. Иди». Рука Дэна на краю двери домой, и никто не поможет ему выбрать.

### Сценарий по панелям

#### Панель 01

- **bg:** `room` | **mood:** `tense` | **sfx:** `—`
- **cast:** dan (left), mira (right)
- **art:** Medium two-shot in the tiny round safe room: Mira at the right sits upright against the scratched ochre wall, grey-lipped and hollow-eyed, one hand at her throat. Dan at the left crouches facing her with both hands resting open on his own knees, speaking gently. A bare lamp with a vermilion-cored flame hangs above them.
- **Реплики:**
  - `narration-ru` — **RU:** Безмолвные не входят в свет лампы. Дэн принёс Миру в ближайшую комнату. У неё нет ни дыхания, ни имени.
  - `speech / dan` — **EN:** You are Mira. — **RU:** Ты — Мира.
  - `speech / mira` — **EN:** I hear it. It is not mine. It is a sound. — **RU:** Я его слышу. Оно не моё. Это просто звук.

#### Панель 02

- **bg:** `room` | **mood:** `tense` | **sfx:** `—`
- **cast:** dan (left), mira (center), silent (right)
- **art:** Three-figure composition in the safe room: Mira at the center sits against the wall, pale, her face turned toward Dan; the child-sized Silent (Lina) at the right sits close beside her, hands in her own lap, blank face tilted up toward Mira. Dan at the left stands in the low doorway looking back, one hand on the door frame.
- **Реплики:**
  - `speech / dan` — **EN:** I have to go to him. — **RU:** Я должен пойти к нему.
  - `speech / mira` — **EN:** You don't have to. You want to. Don't. — **RU:** Не должен. Ты хочешь. Не надо.
  - `speech / dan` — **EN:** Lina, stay with her. — **RU:** Лина, останься с ней.

#### Панель 03

- **bg:** `corridor` | **mood:** `calm` | **sfx:** `—`
- **cast:** dan (left), pip (right)
- **art:** Medium shot in a narrow lamp-lit stone passage: Pip at the right walks briskly ahead, chewing a chunk of brown bread held in his right hand, his left hand pointing down the passage, cap and brass hand-bell swinging. Dan at the left follows a step behind with his arms crossed and one eyebrow up, wry and unimpressed.
- **Реплики:**
  - `speech / pip` — **EN:** He waits for you. He always wants a name. I tell him things. — **RU:** Он ждёт тебя. Ему всегда нужно имя. Я рассказываю ему всякое.
  - `speech / pip` — **EN:** Sorry. A little. He is old, but his bread is good. I am young. I need to eat! — **RU:** Прости. Чуть-чуть. Он старый, но хлеб у него вкусный. Я молодой. Мне надо есть!

#### Панель 04

- **bg:** `corridor` | **mood:** `calm` | **sfx:** `—`
- **cast:** dan (left), system (right)
- **art:** Quiet shot in the passage: Dan at the left stops and rubs his forehead with his right hand, his yellow pencil held in his left hand. The System window hovers at the right, small and plain. Behind Dan the passage opens onto a distant amber glow, the Hall of Words.
- **Реплики:**
  - `thought / dan` — **EN:** I need to make a plan. — **RU:** Мне нужно составить план.
  - `system / system` — **EN:** You have 14 words and no plan. — **RU:** У тебя 14 слов и нет плана.

#### Панель 05

- **bg:** `hall` | **mood:** `tense` | **sfx:** `—`
- **cast:** dan (left), keeper (right)
- **art:** Wide shot of the Hall of Words: towering shelves of glass jars, but the left half of the hall is dark, its jars dim and dead. The Keeper sits in his high-backed chair at the right, hands folded, hood hiding his eyes, a faint smile; on the arm of the chair stands one tiny glass jar with a single vermilion spark. Dan at the left stands at the edge of the lit floor, small, hands loose at his sides.
- **Реплики:**
  - `narration-ru` — **RU:** Зал Слов наполовину тёмный: лампы на полках гаснут одна за другой. На подлокотнике кресла стоит банка с одной красной искрой — это имя Миры.
  - `speech / keeper` — **EN:** Welcome, Dan. You want to trade now. — **RU:** Добро пожаловать, Дэн. Теперь ты хочешь торговать.
  - `speech / dan` — **EN:** I don't want to trade. I want to know. Who are you? — **RU:** Я не хочу торговать. Я хочу знать. Кто ты?

#### Панель 06

- **bg:** `hall` | **mood:** `calm` | **sfx:** `—`
- **cast:** dan (left), keeper (right)
- **art:** Low-angle medium shot centered on the Keeper in his chair at the right, his face tilted toward Dan, only his calm mouth visible, one pale hand lifting slowly from his lap toward the dark shelves. Dan at the left listens with his head tilted, pencil behind his ear. Warm amber light, soft shadow.
- **Реплики:**
  - `narration-ru` — **RU:** Хранитель рассказывает о прошлом в настоящем времени: на Этаже Имён другого времени нет.
  - `speech / keeper` — **EN:** A good question. I am the first Zero. — **RU:** Хороший вопрос. Я — первый Зеро.
  - `speech / keeper` — **EN:** I come here a young man. No words. No friend. Now I am old. Forty years in this hall. — **RU:** Я прихожу сюда молодым. Ни слов. Ни друга. Теперь я стар. Сорок лет в этом зале.

#### Панель 07

- **bg:** `hall` | **mood:** `calm` | **sfx:** `—`
- **cast:** dan (left), keeper (right)
- **art:** Medium over-the-shoulder shot from behind the Keeper's chair: the Keeper's hooded head fills the foreground at the right, and beyond it Dan at the left, in focus and lit by amber jars, listens with a thoughtful, slowly softening frown.
- **Реплики:**
  - `speech / keeper` — **EN:** I make the rule. One word, one name. I have to live. Every year I want to go home. — **RU:** Я делаю правило. Одно слово — одно имя. Мне надо жить. Каждый год я хочу домой.
  - `thought / dan` — **EN:** He is old. He wants what I want. — **RU:** Он старый. Он хочет того же, чего хочу я.

#### Панель 08

- **bg:** `hall` | **mood:** `tense` | **sfx:** `—`
- **cast:** dan (left), keeper (right)
- **art:** Tense shot looking past the chair to the sealed door: behind the Keeper's chair a tall door covered with vermilion wax seals fills the center of the frame. Dan at the left points at it with his right hand, his left hand open at his side; the Keeper at the right sits unmoving, hands folded, hood low.
- **Реплики:**
  - `speech / dan` — **EN:** You have the door. You have OPEN. Go home. — **RU:** У тебя есть дверь. У тебя есть OPEN. Иди домой.
  - `speech / keeper` — **EN:** The door needs two. One remembers. One calls. Nobody calls my name. I don't remember it. — **RU:** Двери нужны двое. Один помнит. Другой зовёт. Моё имя никто не зовёт. И я его не помню.

#### Панель 09

- **bg:** `hall` | **mood:** `tense` | **sfx:** `RING`
- **cast:** dan (left), system (center), keeper (right)
- **art:** Moody shot: from behind the wax-sealed door a faint muffled ringing is shown as soft concentric vermilion ripples across the seals. Dan at the left has turned toward the door, lips parted, one hand halfway raised toward his ear. The Keeper at the right turns his hooded head slightly toward Dan, smiling. The System window hovers at the top center, small.
- **Реплики:**
  - `narration-ru` — **RU:** За печатями глухо звонит телефон.
  - `speech / keeper` — **EN:** But your mother calls. Every hour she calls Dan. — **RU:** Но твоя мама звонит. Каждый час она зовёт: Дэн.
  - `system / system` — **EN:** Missed calls: 12. — **RU:** Пропущенных звонков: 12.

#### Панель 10

- **bg:** `hall` | **mood:** `tense` | **sfx:** `—`
- **cast:** dan (left), keeper (right)
- **art:** Low-angle tense two-shot: the Keeper at the right rises half out of his chair, one open palm turned upward as if offering, his other hand on the chair arm. Dan at the left holds one hand up as if to stop him, jaw tight, the other hand closed in a fist.
- **Реплики:**
  - `speech / keeper` — **EN:** I have OPEN. I need your name. Your mother calls it. With it I go home as Dan. — **RU:** OPEN у меня есть. Мне нужно твоё имя. Твоя мама зовёт его. С ним я иду домой как Дэн.
  - `shout / dan` — **EN:** She knows her son! — **RU:** Она знает своего сына!
  - `speech / keeper` — **EN:** The door makes me her son. She sees Dan. She hears Dan. — **RU:** Дверь сделает меня её сыном. Она видит Дэна. Она слышит Дэна.

#### Панель 11

- **bg:** `hall` | **mood:** `tense` | **sfx:** `—`
- **cast:** dan (left), keeper (right)
- **art:** Close tense over-the-shoulder shot: the Keeper at the right holds the tiny glass jar with one vermilion spark in his open left palm, his right hand folded away. Dan at the left stares at the jar, his face stricken and torn.
- **Реплики:**
  - `speech / keeper` — **EN:** One way. Give me your name, whole. I give Mira her name. You stay. I go home to your mother. She is not alone. Is that bad? — **RU:** Первый путь. Отдай мне имя целиком. Я верну Мире её имя. Ты остаёшься. Я иду домой к твоей маме. Она не одна. Разве это плохо?
  - `shout / dan` — **EN:** She is my mother! — **RU:** Она моя мама!

#### Панель 12

- **bg:** `hall` | **mood:** `tense` | **sfx:** `—`
- **cast:** dan (left), keeper (right)
- **art:** Wide tense shot: the Keeper stands beside his chair at the right with both open hands spread to the sides in a quiet, polite gesture of two choices: one toward the jar on the chair arm, the other toward the sealed door behind him. Dan at the left stands rooted, shaking his head slowly, pale.
- **Реплики:**
  - `speech / keeper` — **EN:** Or go home now. You leave, and you forget the Tower. You forget Mira. It is a dream. I keep her name. You have to choose. — **RU:** Или иди домой, сейчас. Ты уходишь — и забываешь Башню. Забываешь Миру. Это сон. Её имя остаётся у меня. Ты должен выбрать.
  - `shout / dan` — **EN:** I forget Mira? No! — **RU:** Я забуду Миру? Нет!

#### Панель 13

- **bg:** `hall` | **mood:** `action` | **sfx:** `THUD`
- **cast:** dan (left), system (center), keeper (right)
- **art:** Dynamic shot: Dan at the left lunges forward with his right arm stretched toward the jar on the chair arm, his left arm swung back for balance; a pane of faint vermilion light like a sheet of glass flares in the air in front of the jar and throws him back, his glasses slipping. The Keeper at the right sits calmly, hands folded. The System window floats at the top in warning style.
- **Реплики:**
  - `shout / dan` — **EN:** I take the jar! — **RU:** Я беру банку!
  - `system / system` — **EN:** Not true. Two breaths lost. — **RU:** Неправда. Потеряно два вздоха.
  - `speech / keeper` — **EN:** You can't take, Dan. A trade is a trade. But look. OPEN. — **RU:** Ты не можешь взять, Дэн. Сделка есть сделка. Но смотри. OPEN.

#### Панель 14

- **bg:** `hall` | **mood:** `tense` | **sfx:** `CRACK`
- **cast:** dan (left), keeper (right)
- **art:** Cinematic reveal: the Keeper at the right stands and raises one hand toward the sealed door; the wax seals crack one by one and a slit of cold green-grey fluorescent light opens in the door, through which Dan sees his own office, a desk, and a ringing phone with a glowing screen. Dan at the left reaches toward the slit with both hands, mouth open.
- **Реплики:**
  - `narration` — **EN:** Mom: Dan? Dan, call me. Please. — **RU:** Мама: Дэн? Дэн, позвони мне. Пожалуйста.
  - `shout / dan` — **EN:** Mom! — **RU:** Мама!

#### Панель 15

- **bg:** `hall` | **mood:** `tense` | **sfx:** `—`
- **cast:** dan (left), system (right)
- **art:** Intimate close-up: Dan at the left, eyes wet, his right hand pressed flat on his chest where faint vermilion light glows through his shirt, threads of abstract vermilion glyph shapes drifting up from him like fireflies. The System window at the right is large and clean with a bright vermilion border, as a rank-up window.
- **Реплики:**
  - `narration-ru` — **RU:** Правдивое «хочу» и «нужно» связывает слова. Дэн знает много простых слов — и сразу много из них становятся его.
  - `thought / dan` — **EN:** I want to go home. I need to call her. I want to remember her voice. — **RU:** Я хочу домой. Мне нужно ей позвонить. Я хочу помнить её голос.
  - `system / system` — **EN:** True. True. True. Count: 31. Rank up: WORD. — **RU:** Правда. Правда. Правда. Счёт: 31. Новый ранг: WORD.
  - `thought / dan` — **EN:** And Mira has no name because of me. I don't want to leave her. — **RU:** А у Миры нет имени из-за меня. Я не хочу её оставлять.

#### Панель 16

- **bg:** `hall` | **mood:** `tense` | **sfx:** `—`
- **cast:** dan (left), pip (center), mira (right)
- **art:** Wide shot at the edge of the hall: Mira at the right stands in the entrance arch with one hand braced on a stone pillar, pale and unsteady. Pip stands just behind her at the center, small, guiltily holding his cap in both hands. Dan at the left stands half turned away from the open slit of office light, staring at her.
- **Реплики:**
  - `speech / mira` — **EN:** Zero. Look at the door. — **RU:** Зеро. Смотри на дверь.
  - `shout / dan` — **EN:** You have no name! I can't leave you. — **RU:** У тебя нет имени! Я не могу тебя оставить.
  - `speech / mira` — **EN:** I stay. I have three years here. You are young. You have a mother. — **RU:** Я остаюсь. У меня здесь три года. Ты молодой. У тебя есть мама.

#### Панель 17

- **bg:** `black` | **mood:** `tense` | **sfx:** `—`
- **cast:** keeper (left), dan (center), mira (right)
- **art:** Dark dramatic shot: Dan at the center, one hand on the edge of the open door, a slit of cold office light falling across his face and glasses; around him everything else is black. A faint hooded silhouette of the Keeper stands at the far left, and a faint silhouette of Mira at the far right edge; a tiny System window floats at the top, blank.
- **Реплики:**
  - `speech / keeper` — **EN:** Choose, Dan. — **RU:** Выбирай, Дэн.
  - `system / system` — **EN:** You have to choose. This voice can't help. — **RU:** Ты должен выбрать. Этот голос не поможет.
  - `speech / mira` — **EN:** Zero. Go. — **RU:** Зеро. Иди.

### Грамматика: want to / need to / have to + глагол

Три маленьких слова с to говорят, как человек относится к действию. I want to go — я хочу пойти (моё желание). I need to go — мне нужно пойти (нужда). I have to go — я должен пойти (так требует закон или чужое правило). После to стоит обычная форма глагола: want to trade, need to eat. Отрицание ставится перед главным словом: I don't want to trade. Обратите внимание: You don't have to — это «не обязан», а не «нельзя». Мира говорит именно так: Дэн не обязан идти, он просто хочет.

- I have to go to him. — Я должен пойти к нему.
- You don't have to. You want to. — Не должен. Ты хочешь.
- I don't want to trade. I want to know. — Я не хочу торговать. Я хочу знать.

### Квиз

1. Кто такой Хранитель?
   - Старший брат Миры
   - Первый Зеро: человек, который сорок лет живёт в Башне **(верно)**
   - Безмолвный с жёлтой полоской на шее
   - Друг Пипа с рынка
2. Что нужно двери домой, чтобы открыться?
   - Только слово OPEN
   - Один человек и жёлтый карандаш
   - Двое: тот, кто помнит, и тот, кто зовёт **(верно)**
   - Три банки со словами
3. Что Хранитель хочет сделать с именем Дэна?
   - Уйти домой к маме Дэна под его именем **(верно)**
   - Вернуть его Мире
   - Продать в рынке чернил
   - Спрятать в банку навсегда
4. Что говорит Мира в самом конце серии?
   - Останься со мной
   - Купи мне имя
   - Я тебя прощаю
   - Зеро. Иди. **(верно)**

---

## Эпизод 12 (s1e12): Sister — Сестра

- **Уровень:** A1
- **Панелей:** 16
- **newWords:** sister, mean, teach, hear, together, back, again, hundred, answer, same

### Синопсис

Дэн не уходит домой и не отдаёт имя: он называет Миру тремя правдивыми предложениями, банка с её именем лопается, и MIRA возвращается без обмена. Но слово sister Мира по-прежнему не слышит, и Дэн не может его подарить, зато может научить: он объясняет его через маму, папу и семью («Lina's mother is your mother»). Смысл возвращается раньше слова, Мира говорит «sister», и Лина впервые отвечает своим голосом. Хранитель понимает, что его банки лгут: учитель отдаёт слово и не теряет его. Звонок обрывается, дверь домой закрывается, и Дэн обещает построить новый путь назад. Втроём они говорят одно предложение, последняя дверь этажа поднимается, счёт Дэна — сто, ранг Phrase, класс Builder, титул Teacher of One. На вопрос «Why me?» Система отвечает первым в жизни длинным предложением и бросает крючок: ты здесь снова. Сзади в закрывающуюся дверь проскальзывает Nad, а сверху мамин голос зовёт Дэна фразой, которую мама никогда не говорила.

### Сценарий по панелям

#### Панель 01

- **bg:** `black` | **mood:** `tense` | **sfx:** `—`
- **cast:** dan (center)
- **art:** Tight dramatic shot: Dan's right hand rests on the edge of the open door home at the right of the frame, a slit of cold green-grey office light falling across his face and glasses. His left hand hangs at his side in a closed fist; his eyes are shut and his brow pinched as he turns his head away from the light, back toward the dark amber hall.
- **Реплики:**
  - `narration-ru` — **RU:** Рука Дэна лежит на краю двери домой, свет офиса падает ему на лицо. Он оборачивается.
  - `speech / dan` — **EN:** Mom. One more minute. I come back. I am sorry. I don't go. There is a new way. — **RU:** Мама. Ещё одну минуту. Я вернусь. Прости. Я не ухожу. Есть новый путь.

#### Панель 02

- **bg:** `hall` | **mood:** `tense` | **sfx:** `—`
- **cast:** dan (left), mira (right)
- **art:** Medium two-shot in the Hall of Words: Dan at the left, steady, holds both hands open at chest height as he speaks to Mira. Mira at the right stands pale and hollow-eyed, one hand at her throat, listening without understanding. Behind them on the chair arm the tiny glass jar glows a little brighter.
- **Реплики:**
  - `narration-ru` — **RU:** Имя нельзя купить, но его можно назвать. Три правдивых предложения о человеке — и имя находит дорогу к тому, кто его потерял.
  - `speech / dan` — **EN:** Listen. You are Mira. You climb. You count every breath. — **RU:** Слушай. Ты Мира. Ты лазишь по Башне. Ты считаешь каждый вздох.
  - `speech / mira` — **EN:** It is a sound. — **RU:** Это просто звук.
  - `speech / dan` — **EN:** You say 'Loud is dead'. You give me bread. You wait three years for one girl. Who are you? — **RU:** Ты говоришь «Шумный — мёртвый». Ты отдаёшь мне хлеб. Три года ты ждёшь одну девочку. Кто ты?

#### Панель 03

- **bg:** `hall` | **mood:** `action` | **sfx:** `CRACK`
- **cast:** dan (left), keeper (center), mira (right)
- **art:** Burst shot: on the chair arm in the background the glass jar cracks open and a ribbon of vermilion light flies across the hall into Mira's chest. Mira at the right throws her head back, mouth open mid-word, her red cord flaring. Dan at the left watches with wide eyes, both hands half raised. The Keeper sits stunned in his chair at the center; the System window floats at the top, blank.
- **Реплики:**
  - `shout / mira` — **EN:** I am... I am Mira! — **RU:** Я... Я Мира!
  - `system / system` — **EN:** True. True. True. MIRA comes back. Mira hears it. No trade. — **RU:** Правда. Правда. Правда. MIRA возвращается. Мира слышит. Без обмена.
  - `shout / keeper` — **EN:** That is not a trade! Who pays? — **RU:** Это не сделка! Кто платит?

#### Панель 04

- **bg:** `hall` | **mood:** `tense` | **sfx:** `—`
- **cast:** dan (left), mira (center), silent (right)
- **art:** Medium shot: Mira at the center looks down, unsure, at the child-sized Silent (Lina) at the right, who stands very close in front of her with her blank face turned up. Dan at the left looks from one to the other with his hand under his chin, thinking. The amber hall stretches behind them.
- **Реплики:**
  - `speech / dan` — **EN:** Nobody pays. Mira, the child. Who is she? — **RU:** Никто не платит. Мира, девочка. Кто она?
  - `speech / mira` — **EN:** She is my... I can't hear the word. — **RU:** Она моя... Я не слышу это слово.

#### Панель 05

- **bg:** `hall` | **mood:** `calm` | **sfx:** `—`
- **cast:** dan (left), mira (right)
- **art:** Quiet teaching shot: Dan at the left holds up three fingers of his right hand and with his left hand traces a small line in the air, patient like a teacher. Mira at the right listens, brow furrowed, her lips moving silently as she repeats after him. Between them hover three small steady vermilion glyph marks.
- **Реплики:**
  - `speech / dan` — **EN:** I can't give you the word. But I can teach you. Lina is a girl. Lina's mother is your mother. Lina's father is your father. — **RU:** Я не могу дать тебе слово. Но я могу научить тебя. Лина — девочка. Мама Лины — твоя мама. Папа Лины — твой папа.
  - `speech / mira` — **EN:** My mother is Lina's mother. The same mother. The same father. — **RU:** Моя мама — мама Лины. Та же мама. Тот же папа.
  - `speech / dan` — **EN:** It is the same family. What does it mean? — **RU:** Это одна и та же семья. Что это значит?

#### Панель 06

- **bg:** `flash` | **mood:** `calm` | **sfx:** `—`
- **cast:** mira (center), system (right)
- **art:** Soft overexposed white-gold frame: Mira at the center, eyes wide and wet, both hands pressed to her chest, mouth just closing on a word; a thin thread of vermilion light rises from her lips in a gentle ring. In the soft-focus far background a jar on a distant shelf cracks and releases a single warm spark that drifts toward her. The System window at the right glows gently.
- **Реплики:**
  - `narration-ru` — **RU:** Слова нет. Но смысл — вот он, целый, и никто не может его купить.
  - `speech / mira` — **EN:** It means... we are together. She is my... sister. — **RU:** Это значит... мы вместе. Она моя... сестра.
  - `system / system` — **EN:** New word: SISTER. SISTER is yours now. — **RU:** Новое слово: SISTER. SISTER теперь твоё.

#### Панель 07

- **bg:** `hall` | **mood:** `calm` | **sfx:** `—`
- **cast:** mira (left), system (center), silent (right)
- **art:** Tender two-shot: Mira at the left kneels on one knee and holds the child-sized Silent's thin left hand gently in both of her hands. The small Silent at the right lifts her blank face toward Mira, her thin teal seam softly glowing vermilion at its edge as if she is about to speak. Soft warm light; the System window hovers above them.
- **Реплики:**
  - `narration-ru` — **RU:** Это не чужой голос. Это её собственный — тонкий, охрипший от трёх лет молчания.
  - `speech / mira` — **EN:** I hear it! Lina. I am your sister. I am here. — **RU:** Я слышу! Лина. Я твоя сестра. Я здесь.
  - `speech / silent` — **EN:** Mira. ...Sister. — **RU:** Мира. ...Сестра.
  - `system / system` — **EN:** The child has two words. They are hers. — **RU:** У девочки два слова. Они её.

#### Панель 08

- **bg:** `hall` | **mood:** `tense` | **sfx:** `—`
- **cast:** dan (left), keeper (right)
- **art:** Tense two-shot: the Keeper at the right stands with his shoulders slightly slumped and his open hands hanging, hood low; behind him the jars on the shelves flicker and dim as if breathing out. Dan at the left stands steady, unsmiling but calm, the pencil in one hand, the other hand open at his side.
- **Реплики:**
  - `speech / keeper` — **EN:** You teach her. You give, and you still have it. Then every jar here is a lie. — **RU:** Ты учишь её. Ты отдаёшь — и оно всё ещё у тебя. Тогда каждая банка здесь — ложь.
  - `speech / dan` — **EN:** I teach. She learns. Nobody loses. — **RU:** Я учу. Она учится. Никто ничего не теряет.

#### Панель 09

- **bg:** `hall` | **mood:** `tense` | **sfx:** `—`
- **cast:** dan (left), system (right)
- **art:** Wide shot: the open door home behind the Keeper's chair swings slowly shut, the slit of cold office light narrowing to a thread and vanishing, the wax seals re-forming dull and grey. Dan at the left stands with his arms limp, watching it close with wet eyes but his chin up. The System window at the right floats low, blank.
- **Реплики:**
  - `system / system` — **EN:** Missed calls: 12. The call ends. The door closes. The way back is gone. — **RU:** Пропущенных звонков: 12. Звонок обрывается. Дверь закрывается. Пути назад нет.
  - `speech / dan` — **EN:** Then I build a new way back. — **RU:** Тогда я построю новый путь назад.

#### Панель 10

- **bg:** `dungeon` | **mood:** `tense` | **sfx:** `—`
- **cast:** dan (left), mira (center), silent (right)
- **art:** Wide low-angle shot of the bare stone last hall: the high black door banded with iron at the far end. Dan at the left, Mira at the center and the child-sized Silent at the right stand in a line facing it, small against the doorway, Mira and the small Silent holding hands. Tall Silents stand motionless in the shadows along both walls. Cold ash-grey light.
- **Реплики:**
  - `narration-ru` — **RU:** Дэн научил Миру — и ничего не потерял. Каждое слово, которое он объяснил, стало прочнее. Впереди последняя дверь этажа.
  - `system / system` — **EN:** Count: 97. The last door wants a new sentence. — **RU:** Счёт: 97. Последняя дверь хочет нового предложения.

#### Панель 11

- **bg:** `flash` | **mood:** `action` | **sfx:** `BOOM`
- **cast:** dan (left), mira (center), silent (right)
- **art:** Overexposed burst: Dan at the left, Mira at the center and the child-sized Silent at the right stand in a row about half a step apart before the black door, arms hanging at their sides, each with their mouth open in speech. From their three mouths one single unbroken horizontal ribbon of vermilion glyph shapes streams together into a straight line that strikes the door, which glows white from its seams.
- **Реплики:**
  - `speech / dan` — **EN:** Together. Say it with me. I am Dan, — **RU:** Вместе. Скажи со мной. Я Дэн,
  - `speech / mira` — **EN:** and I am Mira, — **RU:** и я Мира,
  - `speech / silent` — **EN:** Sister. — **RU:** Сестра.
  - `shout / dan` — **EN:** and we open this door together, because we go up. — **RU:** и мы вместе открываем эту дверь, потому что мы идём вверх.

#### Панель 12

- **bg:** `sky` | **mood:** `calm` | **sfx:** `—`
- **cast:** dan (left), system (right)
- **art:** Wide serene shot in open sky: the huge black door has risen straight upward into the cream clouds like a curtain, revealing a winding stair of pure warm light climbing into the sky. Dan at the left stands on the top step of the landing, small, one hand on his round glasses, awed. The System window at the right is large and bright, blank cream paper with an ornate double vermilion border and a round seal.
- **Реплики:**
  - `system / system` — **EN:** Sentence: 18 words. True. Count: one hundred. Rank up: PHRASE. Class: BUILDER. Title: Teacher of One. — **RU:** Предложение: 18 слов. Правда. Счёт: сто. Новый ранг: PHRASE. Класс: BUILDER. Титул: Учитель одного.

#### Панель 13

- **bg:** `sky` | **mood:** `calm` | **sfx:** `—`
- **cast:** dan (left), system (right)
- **art:** Quiet two-shot on the glowing stair landing: Dan at the left sits on the step with his elbows on his knees and his hands loosely clasped, looking up at the System window at the right with a tired smile. The window hovers close and slightly lowered, as if leaning in to talk.
- **Реплики:**
  - `speech / dan` — **EN:** One hundred words. One hundred! Now answer. Why me? — **RU:** Сто слов. Сто! Теперь ответь. Почему я?
  - `system / system` — **EN:** Answer: because you have zero words and you learn every word, and the others only buy and take, and the Tower wants to learn too. — **RU:** Ответ: потому что у тебя ноль слов и ты учишь каждое слово, а другие только покупают и берут, и Башня тоже хочет учиться.
  - `speech / dan` — **EN:** That is a long sentence. — **RU:** Это длинное предложение.
  - `system / system` — **EN:** It is the first. Don't tell Mira. — **RU:** Это первое. Не говори Мире.

#### Панель 14

- **bg:** `sky` | **mood:** `tense` | **sfx:** `—`
- **cast:** dan (left), system (right)
- **art:** Tense shot: the System window at the right turns slightly toward Dan, its border flickering from soft vermilion to a sharp solid line. Dan at the left has stopped mid-step on the stair, his right hand on his glasses, eyes wide. Behind them the stair of light seems to bend into dark clouds.
- **Реплики:**
  - `system / system` — **EN:** And because you are here again. — **RU:** И потому что ты здесь снова.
  - `speech / dan` — **EN:** Again? What does 'again' mean? — **RU:** Снова? Что значит «снова»?
  - `system / system` — **EN:** Ask me when you have 300 words. It is a long answer. — **RU:** Спроси, когда у тебя будет 300 слов. Это длинный ответ.

#### Панель 15

- **bg:** `corridor` | **mood:** `calm` | **sfx:** `—`
- **cast:** dan (left), mira (center), silent (right)
- **art:** Wide shot looking back down a narrow stone stair-corridor lit with warm ochre light: Dan at the left and Mira at the center climb side by side, relaxed, Mira's red cord on her left wrist. Far behind them at the right, a tall Silent with two round dents on its blank face and a strip of mustard-yellow lanyard slips through the closing door, half in shadow, one long arm reaching in. The small Silent is just ahead, out of frame.
- **Реплики:**
  - `speech / mira` — **EN:** Thank you, Dan. ...Zero. — **RU:** Спасибо, Дэн. ...Зеро.
  - `speech / silent` — **EN:** I am Dan. — **RU:** Я Дэн.

#### Панель 16

- **bg:** `black` | **mood:** `tense` | **sfx:** `—`
- **cast:** dan (left), system (right)
- **art:** Dark close shot: Dan at the left, face upturned, lit from above by a faint warm ochre glow, listening. At the right the System window floats with a solid vermilion border in warning style. High above, at the top of the frame in darkness, a thin shaft of warm light like light under a door. Everything else is black.
- **Реплики:**
  - `narration` — **EN:** A voice from up there: Dan, eat something. — **RU:** Голос сверху: Дэн, поешь что-нибудь.
  - `speech / dan` — **EN:** Mom? — **RU:** Мама?
  - `system / system` — **EN:** That is not your mother. That is the Tower. It has your mother's voice. — **RU:** Это не твоя мама. Это Башня. У неё голос твоей мамы.
  - `narration` — **EN:** The voice: Come up, Dan. Mom waits, because you learn. — **RU:** Голос: Поднимайся, Дэн. Мама ждёт, потому что ты учишься.

### Грамматика: 's (чьё) и «X means Y» (что значит)

Апостроф и s показывают, кому что принадлежит: Lina's mother — мать Лины, Lina's father — отец Лины. Сначала владелец, потом то, что ему принадлежит. Глагол mean значит «значить»: It means... — это значит...; вопрос строится с does: What does it mean? Так можно объяснить любое слово другими, уже знакомыми словами. Именно так Дэн вернул Мире слово sister: Lina's mother is your mother. Lina's father is your father. It is the same family.

- Lina's mother is your mother. — Мама Лины — твоя мама.
- What does it mean? — Что это значит?
- It means... we are together. — Это значит... мы вместе.

### Квиз

1. Как Дэн вернул Мире имя?
   - Обменял его на своё имя
   - Сказал о ней три правдивых предложения, без обмена **(верно)**
   - Отнял банку силой
   - Попросил Систему
2. Как Мира снова услышала слово sister?
   - Дэн объяснил его другими, знакомыми словами **(верно)**
   - Хранитель вернул его в награду
   - Лина написала его на стене
   - Она купила его у Пипа
3. Какой класс получил Дэн?
   - Singer
   - Keeper
   - Builder **(верно)**
   - Climber
4. Чьим голосом позвали Дэна сверху?
   - Голосом Миры
   - Голосом Лины
   - Голосом Хранителя
   - Башня говорила голосом мамы **(верно)**

---

# 3. Статус эпизодов (картинки и видео)

Данные из `art/manifest.json`, только чтение.

| Эпизод | Название | Панелей | Картинок | Видео | Детальные кадры (shots) |
|---|---|---|---|---|---|
| s1e01 | The Door / Дверь | 18 | 18 из 18 | 3 (панели 7, 13, 18) | нет |
| s1e02 | No Name / Без имени | 16 | 16 из 16 | 3 (панели 1, 5, 16) | нет |
| s1e03 | The Gate / Ворота | 17 | 17 из 17 | 3 (панели 7, 8, 17) | да, 17 |
| s1e04 | The Price of a Name / Цена имени | 17 | 17 из 17 | 2 (панели 11, 17) | да, 17 |
| s1e05 | A Voice in the Dark / Голос во тьме | 15 | 15 из 15 | 2 (панели 2, 15) | да, 15 |
| s1e06 | The Stair of Echoes / Лестница эха | 16 | 16 из 16 | 1 (панели 3) | да, 16 |
| s1e07 | The Ink Market / Рынок Чернил | 17 | 17 из 17 | 1 (панели 7) | да, 17 |
| s1e08 | Lina / Лина | 16 | 16 из 16 | 1 (панели 16) | да, 16 |
| s1e09 | The Wall of Letters / Стена Букв | 16 | 16 из 16 | 1 (панели 15) | да, 16 |
| s1e10 | The First Sentence / Первое предложение | 16 | 16 из 16 | 1 (панели 7) | да, 16 |
| s1e11 | The Keeper's Door / Дверь Хранителя | 17 | 17 из 17 | 1 (панели 13) | да, 17 |
| s1e12 | Sister / Сестра | 16 | 16 из 16 | 1 (панели 12) | да, 16 |

---

# 4. Что дальше: основа сериала (написана Fable 5.2)

Ниже дословно — главные документы. **При расхождении с разделом 1 (старая библия) правы они.** Порядок чтения перед написанием эпизода: WRITING-GUIDE → series-bible → curriculum → нужный сезон.

---

## 4.1 Инструкция для написания эпизодов (файл story/WRITING-GUIDE.md, дословно)

### WORDBOUND — руководство автора эпизодов

Это рабочая инструкция для модели (или человека), которая пишет следующие серии. Всё важное уже решено в четырёх документах; твоя работа — **точно исполнить план**, а не придумывать мир.

Ничего не меняй в `js/`, `css/`, `art/`, `sw.js`, `index.html`, в готовых эпизодах и в `story/bible.md`. Не делай git commit, если тебя об этом не просили.

---

#### 0. Золотые правила (если запомнишь только это)

1. **Событие серии, слова-силы, цифры Count и клиффхэнгер берутся из плана.** Ты пишешь реплики и кадры, а не сюжет.
2. **Каждое английское слово в репликах должно быть в `data/words.json`.** Нет слова — добавь его в словарь или замени.
3. **Грамматика — только та, что уже открыта** (таблица запретов в `curriculum.md` §8).
4. **Новая грамматика серии — это способность, без которой сцену не пройти.** Если конструкцию можно убрать и ничего не сломается, сцена написана неверно.
5. **Система не лжёт, не задаёт вопросов и не говорит «I».**
6. **В картинках нет текста.** Никаких надписей, букв, цифр в описании кадра.
7. **Последняя панель — крючок.** Серия не заканчивается на покое.
8. **Ничего чужого:** ни имён, ни сил, ни сцен, ни фраз из существующих манхв, игр, аниме.

---

#### 1. Порядок работы (шаг за шагом)

##### Шаг 1. Прочитай
1. `story/STORY.md` — раздел «Что дальше» и **две последние готовые серии целиком** (нужны точные последние реплики и состояние героев).
2. План своей серии: `story/season-1.md` (S1E7–E12) или `story/seasons-2-4.md` (S2–S4); для S5+ сначала разверни арку в 12 абзацев по образцу S2–S4 и покажи человеку.
3. Строку своей серии в `story/curriculum.md` (грамматика, сила, фокус-слова, длина фраз, число русских строк).
4. В `story/series-bible.md`: §2 (правила мира), §4 (голоса персонажей, которые есть в серии), §10 (какие тайны двигает серия), §11 (запреты).
5. Образец: `data/episodes/s1e06.json` и его записи в `story/shots.json`, `story/checks.json`, `story/synopses.json`.

##### Шаг 2. Раскадруй (до JSON)
Напиши таблицу на 14–18 строк: `№ | bg | mood | кто в кадре | что происходит | реплики`. Для S1 она уже есть — сверь и уточни. Проверь по таблице:
- панелей 14–18; английских строк 25–40 (целься в 34–38, чтобы был запас); в панели 1–4 строки; в кадре не больше 3 персонажей;
- новая грамматика встречается 8–14 раз, первый раз — когда она нужна по сюжету;
- каждое из 8–10 фокус-слов встречается ≥3 раз (считаются формы из словаря);
- типы планов чередуются: общий → крупный → через плечо → деталь → нижний ракурс → тихий кадр;
- 2–3 панели юмора, 1 тихая панель, 1 панель «цифра выросла» (окно Системы);
- русских строк столько, сколько в `curriculum.md`.

##### Шаг 3. Напиши `data/episodes/sXeYY.json`
Схема (все поля обязательны, кроме `sfx`, `who` у narration):

```json
{
 "id": "s1e07", "title": "The Ink Market", "titleRu": "Рынок Чернил", "level": "A1",
 "newWords": ["buy", "sell", "..."],
 "panels": [
  {
   "bg": "street", "mood": "tense", "sfx": null,
   "cast": [{"id": "dan", "pos": "left"}, {"id": "mira", "pos": "right"}],
   "art": "English shot description, 2-4 sentences, no text in image.",
   "lines": [
    {"type": "narration-ru", "ru": "Русский закадровый текст."},
    {"type": "speech", "who": "dan", "en": "Help! She has no breath!", "ru": "Помогите! У неё нет дыхания!"},
    {"type": "system", "who": "system", "en": "Count: two.", "ru": "Счёт: два."},
    {"type": "narration", "en": "Mom: Dan, eat something.", "ru": "Мама: Дэн, поешь что-нибудь."}
   ]
  }
 ],
 "grammarNote": {"title": "…", "body": "…по-русски, 3–5 предложений…",
                 "examples": [{"en": "…", "ru": "…"}, {"en": "…", "ru": "…"}, {"en": "…", "ru": "…"}]},
 "quiz": [{"q": "Вопрос по-русски?", "options": ["а", "б", "в", "г"], "answer": 1}]
}
```

Допустимые значения (проверяет валидатор):
- `bg`: office-night, room, street, night-city, tower-exterior, gate, corridor, dungeon, hall, forest, sky, black, white, flash.
- `mood`: calm, tense, action. `pos`: left, center, right.
- `type`: speech, thought, shout, system (нужен `who`), narration (английская, `who` не нужен), narration-ru (только `ru`, без `en`).
- `sfx`: `null` или ЗАГЛАВНЫЕ латинские буквы, пробел, `!?.` (например `"CRACK"`).
- `quiz`: ровно 4 вопроса по 4 варианта; `answer` — индекс с нуля; **правильные ответы на разных позициях**.
- `grammarNote.examples`: ровно 3, взяты из реплик серии или почти дословно.
- Кавычки в `en` — только прямой апостроф `'`; двойных кавычек внутри английской реплики не ставь (цитату выделяй так: `You say 'Loud is dead'.`).

Особые места: если серия происходит в новом месте, добавь в `story/visual.json → locations` ключ вида `"s1e07:street"` с английским описанием (готовые описания — `series-bible.md` §5.2).

##### Шаг 4. Словарь, персонажи, список серий
- **`data/words.json`**: для каждого нового слова добавь запись в конец:
  `{"id": "fix", "w": "fix", "ru": "чинить", "pos": "v", "lvl": "A1", "forms": ["fixes", "fixed", "fixing"], "ex": "I can fix it.", "exRu": "Я могу это починить."}`
  - `id` — латиница в нижнем регистре; `pos` из списка: n, v, adj, adv, pron, prep, conj, det, num, interj, name, phrase; `lvl`: A1–C1 (это же «вес» слова в мире).
  - В `forms` — все формы, которые встречаются в репликах (мн. число, -s, -ed, -ing, неправильные). Форму, которая уже принадлежит другому слову, не добавляй (например, `left` уже есть как «левый» — не вписывай его в формы `leave`, пока не понадобится; валидатор предупредит о коллизии).
  - Имена новых персонажей — `pos: "name"`.
  - Сначала проверь, нет ли слова уже: многие базовые слова в словаре есть.
- **`data/story.json`**: добавь серию в `episodes` (`id`, `season`, `n`, `title`, `titleRu`, `level`, `file`); нового персонажа, который говорит или стоит в `cast`, — в `characters` (`id`, `name`, `silhouette` из: male-young, female-young, male-large, hooded, child, monster, system; `desc` по-русски). Лина-Эхо и Nad до превращения играют под id `silent`.
- **`story/visual.json`**: английское описание нового персонажа — в `characters` (готовые — `series-bible.md` §5.1).

##### Шаг 5. Материалы для картинок
- **`story/synopses.json`**: синопсис серии по-русски, 5–7 предложений.
- **`story/checks.json`**: по одной русской строке на панель — что проверить глазами на готовой картинке (кто слева/справа, ключевой предмет, чего быть не должно).
- **`story/shots.json`**: по одному объекту на панель, **ровно столько, сколько панелей**, с ключами `camera`, `action`, `faces`, `props`, `light`, `avoid` (английский) и `check` (русский, та же строка, что в checks.json). Пиши как для человека, который не читал сюжет: кто СЛЕВА, кто СПРАВА, куда повёрнут, что держит какой рукой, что строго запрещено.
- **Генератор картинок — Nano Banana 2.1.** Он хорошо держит лица по референсам, поэтому: (1) у каждого постоянного персонажа должен быть лист-референс в `art/refs/<id>.jpg` до генерации панелей с ним — для нового персонажа сначала описание в `visual.json`, потом референс; (2) в `art` и `action` называй персонажей по именам (Dan, Mira, Pip…), а внешность не пересказывай — она придёт из референса и `visual.json`; описывай только то, что *отличается* в этом кадре (поза, эмоция, предмет, повреждение, бледность); (3) для Лины-Эхо и Nad, у которых нет своего id, отличительные признаки пиши в каждом кадре явно.
- **Видео: не больше 1–2 на серию.** Выбирай так: (а) последняя панель (клиффхэнгер) — почти всегда; (б) одна панель с главным действием или первым применением новой силы. Остальные панели — статичные. В `checks.json` ничего особого для видео писать не нужно.
- Сами картинки и промпты делает навык `manhwa-art` и скрипты `tools/art/` — автор серии их не запускает, если не просили.

##### Шаг 6. Проверь и собери
```
python tools/validate_content.py
python tools/story_dump.py
```
Валидатор должен показать `0 error(s)`. Предупреждения прочитай: коллизии форм и слова из примеров грамматики, которых нет в словаре, надо исправить. Потом пройди чек-лист непрерывности (§6). `story_dump.py` пересобирает `story/STORY.md`; список «Запланированные эпизоды» в нём зашит в скрипт — если он устарел, скажи об этом человеку, сам скрипт не правь без просьбы.

##### Шаг 7. Отчитайся
Коротко: что написано, цифры валидатора, какие слова добавлены в словарь, какие тайны продвинуты, что вызвало сомнения.

---

#### 2. Голоса персонажей

| Кто | Как говорит | Никогда | Образец на A1 |
|---|---|---|---|
| **Dan** | короткие честные фразы; самоирония; инженерные сравнения; формула «I know + тема серии» | пафос, угрозы, длинные речи | «I can go slowly. I am very good at it.» |
| **Mira** | приговоры в 2–4 слова; повелительное; счёт; «Zero» | ласковые слова; объяснять чувства; слово *sister* до S1E12 | «Loud is dead here.» · «Not bad, Zero.» |
| **System** | утверждения и команды; сухо; на шаг короче людей; о себе — it / this voice | вопросы; «I»; ложь; восклицательные знаки | «That is a key. Wow.» · «Ask me later.» |
| **Keeper** | мягко, вежливо, симметричные формулы; «Dan» — чтобы ранить, «Zero» — когда доволен | крик, спешка | «A trade is a trade. One word, one name.» |
| **Pip** | быстро, цены, числа, дразнится | бесплатные услуги; длинные фразы | «I sell quiet. One quiet, one word.» |
| **Lina (Echo)** | 1–3 слова из самых знакомых читателю; повтор | новые слова; сложная грамматика | «Mira. Come.» |
| **Nad** | только реальные прошлые реплики Дэна (до S2E9); потом перестановки тех же слов | слова, которых Дэн не говорил (до S3) | «I am Dan. I am not weak. I am tired.» |
| **Miss Thorne** (S2+) | полные, образцово правильные предложения; «dear»; поправляет ошибки | сокращения в поучении; сленг | «We don't say "I goed", dear. We say "I went".» |
| **Rook** (S2+) | одиночные тяжёлые слова, ценники; после S3 — ученические фразы с ошибками | «please», «sorry» до S3E10 | «Cheap.» · «Name your price.» |
| **Soup** (S2+) | медленно, мало, всё через еду | спешка, злость | «This plan is cold soup.» |
| **Odessa** (S2+) | проценты, условия, безупречная вежливость; first conditional | эмоции; повышение голоса | «If you sign, you will go home.» |
| **Judge Period / Sgt Dash** | он — заканчивает словом «Period.»; она — обрывки через тире | — | «Not guilty. Period.» |

Правило различимости: закрой имена над репликами — по одной фразе должно быть понятно, кто говорит.

Русский перевод (`ru`): живой разговорный, не подстрочник; Система — женский род («она»); Безмолвный — «он»; обращение «Зеро»; слова-силы в русском тексте остаются латиницей заглавными (OPEN, STOP).

##### Озвучка: у каждой английской реплики есть `delivery`

Диалоги озвучивает Gemini TTS (`tools/audio/gen_gemini.py`), и ему нужна «режиссёрская ремарка». Для каждой реплики с `en` (speech, thought, shout, narration, system) добавь необязательные строковые поля:

- `"delivery"` — 8–25 слов по-английски: *как* сказано, с учётом сцены и характера. Пример: `"exhausted, guilty, almost whispering at 2 AM in an empty office"`; Мира — `"deadpan, low, unimpressed, barely moving her lips"`; Система — `"flat cold game-system announcement with a hint of mockery"`; Безмолвный — `"hollow breathy whisper, imitating Dan's voice slightly wrong"`.
- `"tts_text"` — по желанию: тот же текст, что в `en`, плюс метки `<sigh>`, `<laugh>`, `<short pause>`. Слова должны совпадать с `en` (валидатор проверяет); ремарки в сам текст не вставлять — читатель видит `en` на экране.

Новая реплика без `delivery` даёт предупреждение валидатора и озвучивается «по умолчанию». Если поменялся `en`/`delivery`/`tts_text`, запусти `python tools/audio/gen_gemini.py` — переозвучатся только изменённые строки.

---

#### 3. Правила уровня с примерами

Общее: одна мысль — одно предложение. Лучше два коротких, чем одно длинное. Длину сверяй с `curriculum.md`.

##### A1, сезон 1 (до 8–12 слов; только настоящее время)
| Хорошо | Плохо | Почему плохо |
|---|---|---|
| «There is a door behind that stone.» | «I noticed a door hidden behind that stone.» | прошедшее время; слова не по уровню |
| «He says welcome back.» (о недавнем) | «He said welcome back.» | на Этаже 1 нет прошедшего |
| «Your roof is bad. I can fix it.» | «Your roof is going to collapse unless I repair it.» | будущее, unless, редкие слова |
| «I don't like your plan. But I have a new plan.» | «Although I dislike your plan, I've got another one.» | although, perfect |
| «She sells her sister.» (Пип, о прошлом — в настоящем) | «She has sold her sister.» | perfect |
| «Stop and push!» | «Stop it and then push that over there quickly!» | перегруз |

##### A1+ / A2, сезоны 2–4 (до 12–18 слов)
| Хорошо | Плохо |
|---|---|
| S2: «He is not looking at me. He is looking at the crowd.» | «He hasn't been looking at me this whole time.» |
| S2E8+: «I was in the kitchen. Mira was with me.» | «I had been in the kitchen when it happened.» |
| S3: «I held her hand. I had no breath. I let go.» | «Having run out of breath, I released her hand.» |
| S4: «If you step on this line, the rope will pull.» | «Were you to step here, the rope would be pulled.» |

##### B1–B2, сезоны 5–9
Длина растёт, но принцип тот же: новая конструкция — в ключевых репликах, остальное — на уже освоенном. Редкое слово — только если оно фокус-слово или объяснено следующей репликой («It means…»).

##### Как вводить новое слово
1. Первый раз — в ситуации, где смысл виден из кадра (предмет в руке, действие в кадре).
2. Второй раз — в другой фразе, другим персонажем.
3. Третий раз — в сильном месте (шутка, окно Системы, клиффхэнгер).
Слово-сила пишется ЗАГЛАВНЫМИ, когда его называют как слово или объявляет Система: `New word: FIX.`

##### Формулы Системы (не менять)
`New word: X.` · `X is yours now.` · `Count: N.` · `Word lost: X.` · `Warning. …` · `True.` / `Not true.` · `Sentence: N words. True.` · `Rank up: X.` · `Title: X.` · `Almost.` · `Ask me later.` · `Ask me when you have N words.` · `She does not hear that word.` · `Missed calls: N.`
Count пишется словами для zero–twelve и hundred, остальное цифрами.

##### Слово, которого персонаж не слышит
Мира до S1E12 не слышит *sister*; Дэн до S8E10 не слышит и не говорит *finish*. При них в чужой реплике на месте слова стоит `...`, следом — `narration-ru` про шорох (в первый раз) и реплика Системы (`Almost.` или `He does not hear that word.`). В словарь такие слова раньше срока не добавляй.

---

#### 4. Клиффхэнгеры и расплаты

##### Семь типов клиффхэнгера (чередуй; два одинаковых подряд — нельзя)
1. **Голос** — знакомый голос там, где его не может быть («Mira? Open the door. It is cold.»).
2. **Цифра** — окно Системы с числом, которое всё меняет («Mira has two breaths.», «No new calls.»).
3. **Чужими устами** — враг говорит словами героя («I am Dan.»).
4. **Выбор** — рука на двери; ответ в следующей серии.
5. **Обрыв слова** — «She is my… I don't have the word.»
6. **Не тот / не туда** — ждали одного, пришёл другой; ведут не туда.
7. **Окно-приговор** — одна строка Системы без комментария («Mira is Zero now.»).

Правила: последняя панель — `bg: "black"` или самый тёмный кадр; 2–4 строки; последняя строка короче семи слов; никакого объяснения после удара. Следующая серия начинается **в ту же секунду**.

##### Расплата (payoff)
- Крючок закрывается не позже чем через 1–3 серии, если в карте тайн (`series-bible.md` §10) не указано иначе.
- Расплата — всегда через **новую грамматику или слово этой серии**: герой побеждает тем, чему читатель только что научился.
- Порядок сильной сцены: нужда → неудача старым способом → догадка (инженерный взгляд Дэна) → новая конструкция вслух → эффект в кадре → окно Системы с цифрой → сухая шутка.
- Цикл «унижение → расплата»: обидчик должен при свидетелях увидеть, что его способ не работает, а способ Дэна — работает. Дэн после победы не злорадствует: протягивает руку или шутит над собой.
- Победа всегда чего-то стоит: дыхание, время, упущенная возможность. Бесплатных побед нет.

##### Ритм серии (ориентир на 16 панелей)
1 — продолжение удара · 2–4 — действие/бегство · 5–6 — новое место, правило мира · 7–9 — юмор и освоение новой конструкции · 10–12 — правда о ком-то или сделка · 13–14 — применение новой силы всерьёз · 15 — цена · 16 — крючок.

---

#### 5. Как описывать кадр (`art`, `shots.json`)

- По-английски, 2–4 предложения: тип плана и ракурс → кто где и что делает → ключевой предмет → свет.
- Цвета: **vermilion** только у силы слов (буквы изо рта, нить дыхания, рамка окна, красный шнурок сестёр); **teal** только у Безмолвных и их теней; тёплая охра — безопасность и лампы. Никакого фиолетового, синего неона.
- Текст в картинке запрещён. Вместо «на двери написано OPEN» пиши «glowing vermilion lettering (added later)» или «abstract vermilion glow shapes». Карты, записки, доски, окно Системы — пустые или с абстрактными штрихами; обязательно продублируй запрет в `avoid`.
- Окно Системы: всегда кремовая бумага с красной двойной рамкой, наклон 2–3°, без лица, без текста; предупреждение — сплошная красная рамка и инверсия.
- Постоянные детали: у Дэна круглые очки (скотч только на дужке), жёлтый карандаш за правым ухом, горчичный шнурок-ланьярд; у Миры красный шнурок на **левом** запястье; у Хранителя никогда не видно глаз; у Безмолвных нет глаз, носа, губ — только вертикальный бирюзовый шов; у Лины-Эхо обрывок красного шнурка на левом запястье; у Nad — две круглые вмятины на лице и обрывок горчичного шнурка на шее.
- Флэшбеки: `bg: "white"` и в `art` — «memory scene in warm sepia paper tones».

---

#### 6. Чек-лист непрерывности (пройти перед сдачей)

**Состояние героев**
- [ ] Серия начинается ровно там, где кончилась прошлая (место, поза, последняя реплика).
- [ ] Count Дэна на конец серии равен цифре из плана; каждое изменение показано окном Системы.
- [ ] Список связанных слов Дэна не противоречит прошлым сериям (на S1E6: PUSH, STOP; OPEN — красное у Хранителя: сказать можно, силы нет).
- [ ] Дыхание: кто потратил — тот бледен; никто не колдует с нулём.
- [ ] Missed calls не уменьшается.
- [ ] У кого сейчас телефон, карта, имена, банки — как в плане.

**Правила мира**
- [ ] Безмолвные: слышат, не видят, не бегут, не входят в свет лампы, берут слова только у выдохшихся.
- [ ] Связанное слово делает только то, что означает, и только с тем, что слышит.
- [ ] Силовое предложение — правда или искреннее намерение; с ошибкой — трескается.
- [ ] Никто не использует грамматику следующих этажей (кроме оговорённых «прорывов» в финалах).
- [ ] Обмен — только по согласию; Хранитель ничего не берёт силой.

**Речь**
- [ ] Система: нет вопросов, нет «I», нет лжи.
- [ ] Мира не говорит и не слышит *sister* (до S1E12p8); никто не говорит *finish* при Дэне (до S8E10).
- [ ] Nad говорит только реальными прошлыми репликами Дэна (сверено с JSON).
- [ ] Каждого персонажа можно узнать по реплике без подписи.

**Тайны**
- [ ] Серия двигает именно те нити, что указаны в плане, и не раскрывает ничего раньше срока (`series-bible.md` §9).
- [ ] Ни одна реплика не противоречит скрытым истинам (например, никто не говорит, что Дэн в Башне впервые, — кроме самого Дэна).

**Язык**
- [ ] Валидатор: 0 ошибок. Фокус-слова ≥3 раз. 25–40 английских строк.
- [ ] Длина предложений и число русских строк — по `curriculum.md`.
- [ ] Примеры в grammarNote взяты из серии; квиз проверяет понимание сюжета, а не память на мелочи; правильные ответы на разных позициях.

**Картинки**
- [ ] В `art` и `shots` нет текста в кадре; цвета по закону; постоянные детали на месте.
- [ ] `shots.json` и `checks.json` — ровно по числу панелей.
- [ ] Видео — не больше двух.

---

#### 7. Запрещено

- Менять канон готовых серий и `story/bible.md`; переписывать план без согласования.
- Вводить новых постоянных персонажей, фракции, силы, правила мира, которых нет в `series-bible.md`. Эпизодический безымянный персонаж (торговец, стражник) — можно.
- Заимствовать из существующих произведений: имена, прозвища, «коронные» фразы, узнаваемые силы (армии теней, буквенные ранги охотников, возврат в прошлое и т. п.), организации, дизайн. Жанровые приёмы (окно статуса, башня, ранги, турнир) — можно, но в наших терминах: Count, Book, Breath, the Index, ранги-единицы текста.
- Кровь, жестокость крупным планом, сексуализация, мат. Страшное здесь — тихое.
- Текст на картинках. Фиолетовый и синий неон. Vermilion вне силы слов.
- Объяснять правило грамматики устами героев как урок (исключение — мисс Торн, одна образцовая фраза за серию, и то в сюжетном действии).
- Давать Дэну силу, слово или цифру, которых читатель не видел в репликах.
- Русские слова в английских репликах и английские пояснения в `narration-ru`.
- Бросать нити: если серия открыла вопрос, которого нет в карте тайн, — убери его.

---

#### 8. Полный пример: от плана к панелям (S1E6)

Готовая серия лежит в `data/episodes/s1e06.json` (проходит валидатор: 16 панелей, 40 английских строк, 6 русских, 10 новых слов). Ниже — как она получилась, чтобы повторять тот же ход.

**1. Что дано планом** (`season-1.md`, S1E6): грамматика there is/are + предлоги места; сила Sight («There is…» проявляет скрытое, первый `True.`); STOP связывается, Count 2; события: дверь не открылась → бегство на Лестницу эха → молчание и записки → Пип продаёт тишину → Пип выдаёт тайну Миры → у Миры два дыхания; клиффхэнгер типа «цифра».

**2. Где грамматика становится силой.** Три точки: (а) побег — «There is a way! Up there!»; (б) комедия с планом лестницы — «There are many stairs. There is nothing under us.» / «There are 300 stairs. You are slow.»; (в) кульминация — Дэну нечем платить, и он платит *правдивым называнием*: «There is a room under the stairs… There is a door behind that stone.» — `True.`, дверца проявляется. Без there is сцену не пройти — значит, грамматика встроена верно.

**3. Подсчёт фокус-слов** (до написания JSON):

| Слово | Где (панели) |
|---|---|
| there | 4, 8, 9, 10, 12, 14, 16 |
| up | 4, 7, 16 |
| down | 12, 14, 15 |
| under | 8, 12, 13 |
| behind | 3, 9, 12 |
| stairs | 5, 8, 10, 12 |
| quiet | 6, 7, 10 |
| sound | 6, 7, 10 |
| write | 7 (три формы: writes, writes, write) |
| boy | 10 (дважды), 13 |

Первый прогон дал 47 английских строк и по два «under» и «sound». Правка: убраны проходные реплики («I can't.», «More what?», «OK. OK.», «Thank you. Very useful.», «I am OK. We go up.»), две записки слиты в одну строку, а в две оставшиеся реплики вписаны недостающие слова («There is nothing under us», «No sound comes back here»). Так и действуй: **сначала режь проходное, потом вписывай нужное слово в реплику, которая и так есть.**

**4. Канон и зацепки, которые серия обязана держать.**
- Начало — секунда в секунду после S1E5: Лина-Эхо, Мира без слова.
- `Almost.` — первое появление (панель 2): Дэн снова не дожал дверь.
- STOP: в S1E3 было только «New word», теперь — «STOP is yours now. Count: two.»
- Карандаш: Пип просит, Дэн отказывает и сам не знает почему (панель 11) — зацепка на S3E6.
- «She does not hear that word.» — та же формула, что в S1E4.
- Пип говорит о прошлом в настоящем: «She sells her sister» — на этом этаже прошедшего нет.

**5. Ритм.** 1–4 удар и бегство · 5–6 новое место и его правило · 7–9 юмор и освоение (записки, план, эхо-существо) · 10–12 сделка и первое `True.` · 13–14 правда о Мире · 15 цена · 16 крючок («It is not free, Zero.»).

**6. Русская закадровая строка — только там, где английский не тянет:** состояние Миры (1), цена слова (3), что это за место (5), правило эха (6), слово Пипа (10), озарение Дэна (14). Шесть строк — по норме `curriculum.md`.

**7. Картинки.** В `visual.json` добавлены `pip` и место `s1e06:corridor`; в `shots.json` — 16 кадров с LEFT/RIGHT и запретами (нет текста на записке, зонтике, в окне; у маленького Безмолвного нет глаз; Пип не касается карандаша). Видео для этой серии — два: панель 3 (первый настоящий STOP) и панель 16 (клиффхэнгер).

**8. Проверка.** `python tools/validate_content.py` → `0 error(s), 0 warning(s)`; `python tools/story_dump.py` → STORY.md пересобран.

---

## 4.2 Библия сериала (файл story/series-bible.md, дословно)

### WORDBOUND — библия серии (мастер-документ)

Этот файл — главный источник правды о мире и сюжете **на всю длину серии** (9 сезонов, 108 эпизодов, A1 → B2).
Он **дополняет и уточняет** `story/bible.md` (библия сезона 1, не редактируется). Если что-то в `bible.md` расходится с этим файлом — прав этот файл; если что-то расходится с готовыми эпизодами s1e01–s1e05 — правы эпизоды (они канон и не меняются).

Связанные файлы: `story/curriculum.md` (языковой хребет), `story/season-1.md` (эпизоды 6–12 подробно), `story/seasons-2-4.md` (сезоны 2–4 по эпизодам + сезоны 5–9 по аркам + финал), `story/WRITING-GUIDE.md` (как писать эпизод).

Язык документа: объяснения по-русски; имена, термины мира, реплики и промпты для картинок — по-английски.

---

#### 0. Коротко

**Logline.** Измотанный инженер без единого слова по-английски проваливается в Башню, сложенную из украденных слов, где каждое по-настоящему выученное слово становится силой, — и выясняет, что Башня — это чужое недосказанное предложение, которое можно закончить, только научившись говорить самому.

**Жанровое обещание.** Tower-climbing + System-окна + видимый рост силы + рейтинги + гильдии + «слабость, ставшая уникальным классом». Каждую серию герой становится измеримо сильнее, и читатель вместе с ним: сила героя = слова и грамматика, которые читатель только что выучил.

**Тон.** Сухой юмор от усталости (Дэн), приговоры в три слова (Мира), деадпан-сарказм (Система) — поверх настоящей тоски по дому. Страшное — тихое (Безмолвные не рычат, они говорят голосами близких). Жестокости и крови нет; ставка всегда — слово, имя, голос, память.

**Главная мысль серии (и курса).** В Башне три экономики слов:
1. **Кража** (Безмолвные) — берёшь чужое, сам остаёшься никем.
2. **Торговля** (Хранитель, Ledger) — «слово за слово»: чтобы получить, надо потерять.
3. **Учение** (Дэн) — понял сам / объяснил другому: **слово есть у обоих, никто ничего не потерял**.

Язык нельзя купить и нельзя украсть — можно только выучить, а отдав, не потерять. Слова в банках мертвы; слова в предложениях живут. Это и сюжет, и метод обучения.

**Мета-зеркало.** Ученик «много раз начинал и бросал». У Дэна в Башне украдено/продано ровно это: слово **FINISH**. «Count: zero. Again.» — про них обоих. Вся серия — о человеке, который наконец что-то доводит до конца: звонок маме, спасение друга, свой мост, чужое предложение.

---

#### 1. Что делает историю «невозможно отложить» (механики и где они стоят)

| # | Механика жанра | Как сделана в WORDBOUND (оригинально) | Где |
|---|---|---|---|
| 1 | Окно статуса, цифры растут | Окно Системы: Count (связанные слова), Book (известные), Breath, Rank, Class, Titles, Grammar, Missed calls. Цифры **совпадают с прогрессом ученика** | каждый эпизод; полное окно — в начале и конце каждого сезона |
| 2 | Слабость → уникальный класс | У Дэна 0 слов → он единственный, кто слова *учит*, а не покупает → класс **BUILDER**: сила из грамматики, а не из владения словами | заявка S1E5 (PUSH), S1E10 (первое предложение), класс S1E12 |
| 3 | Видимая лестница рангов | Ранги — единицы текста: Blank → Letter → Word → Phrase → Clause → Sentence → Paragraph → Page → Chapter → Book → (Author). Доска **the Index** | ранг-ап в финале каждого сезона + 1–2 внутри |
| 4 | Унижение → расплата | Рук при всех отбирает у Дэна слово (S2E2) → Дэн с «классом нулей» обходит его команду (S2E7) → Рук просит научить его (S3E10) | каждый сезон минимум один цикл «унизили → 3–5 серий → расплата» |
| 5 | Соперник-зеркало | **Rook**: 800 купленных тяжёлых слов и ни одной своей фразы — против Дэна: 100 лёгких слов и грамматика | S1E12 (тизер), S2–S4, союзник с S5 |
| 6 | «Гача»/pick | **Well of Crooked Words** (колодец неправильных глаголов): бросаешь обычное слово — всплывает случайная «кривая» форма; редкости | S3E2 и далее; идея мини-игры для приложения |
| 7 | Капельница тайн | 16 скрытых истин (§9), каждая открывается грамматикой, которую читатель только что получил («It is a long answer. It needs the past.») | см. карту тайн §10 |
| 8 | Клиффхэнгер каждой серии | 7 типов (см. WRITING-GUIDE): голос, цифра, чужими устами, выбор, обрыв слова, «не тот человек», окно Системы | последняя панель каждого эпизода |
| 9 | Цена силы | Breath; проданное слово оставляет **Дыру** (Hole); клятва (will) со ставкой; лампа горит только на отданном слове | всегда; новые цены в S2 (ставки в дуэлях), S4 (клятвы), S6 (жертва наставницы) |
| 10 | Найденная семья | Дэн, Мира, Лина (ребёнок-Безмолвная), Пип, Суп, мисс Торн, позже Рук и Рен — «Кухня» в Gutter | собирается S2E3–E7, испытывается S5, теряет наставницу S6 |
| 11 | Эскалация масштаба | коридор → этаж → город → академия и турнир → война гильдий → машина Башни → верх и реальный мир | по сезонам |
| 12 | Личный враг, растущий вместе с героем | **Nad** — Безмолвный с именем Дэна: говорит только фразами, которые Дэн уже говорил (= интервальное повторение для ученика), и растёт вместе с его словарём | S1E1 → S9 |
| 13 | Таймер из реального мира | Счётчик **Missed calls** в окне статуса: мама продолжает звонить. Однажды он останавливается | S1E7 → S4E12 |
| 14 | «Вторая попытка» (без регрессии) | Дэн уже был в Башне 5 лет назад, продал слово и забыл. Не возврат во времени, а возвращённый долг | S1E12 (Again?), S2E12, S3 |
| 15 | Хаб, работа, гринд | Margin City: доска заказов, Дэн-инженер чинит лифты и мосты, Count растёт на глазах | S2E5–E6 |
| 16 | Турнир/экзамен | the Proof (S2), the Dictation (S4) — правила, сетка, ставки, приз «дверь домой» | S2E7, S4E9–E12 |
| 17 | Предатель среди своих | Speaker (Безмолвный высшего ранга) неотличим от человека; ловится только грамматикой (не умеет пересказывать — reported speech) | S7 |

---

#### 2. Мир: правила (точно и полностью)

##### 2.1 Башня (the Tower)

- **Что это на самом деле.** Не здание, а **недосказанное предложение**. 40 лет назад человек по имени Элиас не сказал умирающей жене два слова: «I am here» — сказал «One minute» и опоздал. Недосказанное стало Дверью, Дверь — Башней. Башня с тех пор пытается закончить «I AM ___», подставляя в пробел украденные имена («I am Dan», «I am Lina»), потому что не знает, что пропущено не имя, а слово **HERE**. *(Скрытая истина №15–16; до S8 никто этого не знает.)*
- **Как в неё попадают.** Через **Дверь**, которая вырастает там, где человек измотан **и должен кому-то слово** (несказанное «прости», «я приеду», «с днём рождения»). На двери горит одно слово. У Дэна — OPEN.
- **Из чего она.** Этажи спрессованы из слов, украденных у людей. Красные огоньки, плывущие вверх по небу (E1), — это слова: сгоревшие в лампах, отнятые Безмолвными, выпавшие из «утихших» Безмолвных. Они поднимаются к **the Press** (Этаж 6), где из них прессуют новые этажи.
- **Она растёт в середине.** Башня боится своего конца, поэтому вставляет между началом («I AM») и концом всё новые «придаточные» — этажи 2–8. Вершина каждый год отодвигается. Отсюда отчаяние старых альпинистов: «The top moves».
- **Структура.** Сейчас этажей девять. Каждый этаж — одна «грамматическая физика»: на этаже действует и проверяется одна группа конструкций. На каждом этаже несколько ярусов (levels) и город/поселение.
- **Грамматический замок (Floor Lock) и Предел слушателя (Listener's Limit).** Башня «переводит» всем на Plain (английский), но пропускает к слушателю только те конструкции, которые слушатель освоил; остальное приходит упрощённым или как шорох. Кроме того, конструкции старших этажей на младших «не держатся». Поэтому на Этаже 1 **нет прошедшего времени**: о вчерашнем говорят в настоящем («He says welcome back», «I see my office» — так в каноне). Поэтому Мира три года не может толком рассказать свою историю, а Система не может объяснить Дэну его прошлое: «It is a long answer. It needs the past.» Пройдя этаж, человек уносит его грамматику с собой навсегда.
- **Последняя дверь этажа.** Открывается только **новым правдивым предложением о себе в грамматике этого этажа**. «Новым» — значит составленным самим говорящим, а не купленным/украденным/заученным. Поэтому гильдии, живущие на купленных словах, застревают у дверей и охотятся за теми, кто умеет *строить* фразы.

| Этаж | Название | Что проверяет (вопрос двери) | Грамматика | Сезон |
|---|---|---|---|---|
| 1 | the Floor of Names | Who are you? What do you do? | be, this/that, a/the, imperatives, can, present simple, there is, предлоги места, and/but/because, SVO | S1 |
| 2 | the Floor of Deeds (город Margin) | What are you doing? | present continuous, some/any, 's/whose, object pronouns, like + -ing, время и дни, was/were, первые -ed | S2 |
| 3 | the Floor of Yesterdays (the Drowned Stacks) | What did you do? (признание) | past simple, irregular verbs, ago/last/when, could, past continuous | S3 |
| 4 | the Floor of Laws (the Academy of the Line) | What will you do? (клятва) | comparatives/superlatives, must/have to/should, going to, will, first conditional | S4 |
| 5 | the Floor of Marks | What have you done? | present perfect, ever/never/yet/already, for/since, relative clauses, used to | S5 |
| 6 | the Floor of Works (the Press) | What was done to you? Who did it? | passive, технический/документальный английский, zero conditional, infinitive of purpose | S6 |
| 7 | the Floor of Ifs | What would you do? | second conditional, wish, reported speech, might/must be | S7 |
| 8 | the Floor of Regrets | What would you have done? | past perfect, third conditional, should have | S8 |
| 9 | the Last Line | Finish the sentence. | свободный B2, регистры, нулевой русский | S9 |

- **Ворота (Gates)** внутри этажа слышат **имя** (канон E3): открываются тому, чьё имя прозвучало у арки, даже если его произнёс не владелец.
- **Двери Возврата (Doors of Returns).** Запечатанные двери, ведущие во внешний мир. Правило: дверь открывается *предложением* и *двумя людьми* — «тем, кто помнит» (идущий должен нести имя) и «тем, кто зовёт» (кто-то снаружи должен в этот момент произносить это имя: звонок, зов, молитва). Дверь ведёт **в дом того, чьё имя и чьё открывающее слово использованы**. Кто прошёл с чужим именем — **занимает место** владельца: зовущий видит и слышит в нём своего. Пока место занято, настоящий владелец через Двери Возврата пройти не может. *(Истины №4, №11.)*
- **Купленный возврат стирает Башню.** Кто уходит через дверь, оплаченную словом, забывает Башню («It is a dream»). Так Дэн забыл свой первый визит.
- **Время.** В обоих мирах время идёт **одинаково, 1:1**. Офис в щели двери (E4) пуст, потому что наступила суббота; звонит стационарный телефон на столе — мама, не дозвонившись на мобильный, звонит в бюро.

##### 2.2 Слова

- **Plain words (серые) — the Book.** Слова, которые человек знает/понимает. Бесплатны, силы не дают. Система объявляет: `New word: X.` — слово вошло в Книгу.
- **Bound words (красные) — the Count.** Слово становится связанным, когда человек (а) по-настоящему понял его и (б) всерьёз произнёс в момент нужды, и оно **сработало**. Система: `X is yours now.` / `Count: N.` (в E1 оба события совпали: «New word: OPEN. Count: one.»). Связанное слово делает **ровно то, что означает**, и действует только на то, что может его *услышать* (у дверей, стен и камня в Башне «есть уши» — они сделаны из слов).
  - Канон-сверка: STOP в E3 вошло в Книгу («New word: STOP»), но связалось только в S1E6, когда Дэн впервые крикнул его в нужде. Поэтому в E4 «OPEN is your only word» и «Count: zero. Again.» — правда.
- **«Красное» и «целое».** У слова две части: **the red** (связанная сила) и **the whole word** (само слово в Книге).
  - *Обмен красным* (как OPEN в E4): сила уходит покупателю, слово остаётся у тебя серым — можешь говорить и слышать, но оно ничего не делает («You don't have that word»). Заново связать его нельзя, пока красное у другого.
  - *Продажа целого* (как SISTER у Миры): слово уходит с корнем. Ты не можешь его сказать, прочитать и услышать — вместо него шорох, в тексте `...`. Стоит в десятки раз дороже.
- **Дыра (the Hole).** Проданное целиком слово оставляет дыру: человек, сам не понимая почему, **избегает того, что слово называет**. Мира, продав SISTER, убегает от голоса Лины («Why do you run?»). Дэн, продав FINISH, ничего своего не доводит до конца. Система отмечает это фирменным `Almost.`
- **Синонимы — разные слова.** Сила ограничена значением: OPEN открывает, PUSH толкает. Нет нужного слова — ищи соседнее по смыслу (канон E5). Это законный «обходной путь» Дэна и способ учить синонимы.
- **Вес слова (tiers).** Чем слово реже и точнее, тем оно тяжелее: сильнее, дороже по дыханию и требует более сложной грамматики, чтобы его «поднять». Вес = уровень слова в `words.json`:

| Вес | Уровень (`lvl`) | Пример | Рисуется как |
|---|---|---|---|
| Thin | A1 | open, stop, push | тонкие буквы |
| Regular | A2 | repair, protect | обычные |
| Bold | B1 | restore, reveal | жирные |
| Heavy | B2 | dismantle, withstand | тяжёлые, с тенью |
| Black | C1 | редкость, только у Capitals | чёрно-красные |

- **Особые виды слов.**
  - **Names** — первое связанное слово человека, якорь «я». Без имени — не пройти Ворота.
  - **Mortar words** («раствор»): a, the, of, to, and, because, who… Их нельзя связать, продать или украсть, они ничьи. Но правильно класть их умеет только тот, кто понимает грамматику. Купленные слова без раствора не держатся вместе — поэтому покупатели говорят одиночными словами и штампами.
  - **Crooked words** («кривые»): неправильные формы (went, saw, left). Не продаются наборами, каждая добывается отдельно (колодец на Этаже 3). Редкости: common / rare / twisted.
- **Как слова получают.** (1) выучить самому; (2) **быть наученным** — бесплатно, слово остаётся у обоих; (3) купить красное или целое; (4) получить в уплату за работу; (5) подобрать «выпавшие» слова утихшего Безмолвного (охотники этим живут; Дэн отказывается — это чьи-то слова); (6) украсть (Безмолвные, Magpies).
- **Как слова теряют.** Обмен; кража у выдохшегося; сжечь в лампе (слово-топливо выгорает и уплывает вверх); проиграть ставку в словесной дуэли (S2); нарушить клятву (S4).
- **Возврат проданного слова.** По правилу Хранителя — никогда. На деле есть путь, который открывает Дэн (S1E12): **Определение (Define)**. Проданное слово человек не слышит, но *предложение-определение из других слов* — слышит. Поняв значение заново и сказав слово в нужде, он связывает его снова; банка у покупателя лопается, а купленные копии у третьих лиц тускнеют. Это ломает рынок слов и делает Дэна мишенью.
- **Истинное именование (True Naming).** Украденное/проданное имя возвращается, если другой человек говорит о тебе **три правдивых предложения**, а ты отвечаешь «I am …». Не работает, если названный *не хочет* быть этим человеком (так Nad отвергает «Kostya», S3E9).

##### 2.3 Дыхание (Breath) и комбо

- Breath измеряется в «дыханиях» — сколько связанных слов можно произнести до падения. Максимум растёт с рангом: Blank/Letter 10 · Word 15 · Phrase 25 · Clause 40 · Sentence 60 · Paragraph 90 · Page 130 · Chapter 180 · Book 250.
- Цена: одиночное связанное слово — 1–3 (зависит от размера и сопротивления цели: «Big thing, big breath»); крик на многих — всё, что есть (Мира в E3).
- Признаки: ≤30 % — бледность, дрожь; ≤2 — тонкая красная нить изо рта; 0 — падение, человек открыт для Безмолвных.
- Восстановление: в свете лампы ~1 дыхание за 10 минут; сон, еда; слово REST (отдаёт дыхание другому).
- **Комбо = грамматика.**
  - **Chain** (слово + AND + слово): два действия за полтора дыхания.
  - **Sentence** (кто + делает + что): 1 дыхание за любое правдивое грамматичное предложение, эффект устойчивее и точнее. Не требует, чтобы каждое слово было связанным: сила идёт из **структуры**.
  - **Long sentence** (because / when / if / who): предложение с условием, причиной, целью.
  - **Paragraph** (несколько предложений, держащих одну конструкцию): мосты Дэна (S5+).
- **Ошибка = трещина.** Предложение с грамматической ошибкой «трескается»: стоит вдвое дороже и может не сработать (красные буквы осыпаются). Силовое предложение должно быть правдой или искренним намерением; ложь в силовой фразе бьёт по говорящему. В простой (серой) речи лгать можно.

##### 2.4 Система (the System)

- **Что это.** Голос самой Башни — её «первое выученное слово». Бумажное окно (визуал — канон). Английское местоимение **it**; по-русски «Система», ж. р.
- **Жёсткие правила речи Системы (соблюдать всегда):**
  1. Не лжёт. Может не договаривать.
  2. Отвечает только словами и грамматикой, понятными слушателю; иначе — `Ask me later.` или `Ask me when you have N words.`
  3. **Никогда не задаёт вопросов** (до S9E11). Копия не умеет хотеть знать.
  4. **Никогда не говорит «I»** (до S9E12). О себе — `it`, `this voice`, `the Tower`. («Ask me later» допустимо: me — можно, I — нельзя.)
  5. Короткие предложения; длина растёт с уровнем Дэна, но всегда чуть короче, чем у людей.
  6. Не может действовать — только информация, предупреждения и сарказм.
- **Личность.** Деадпан. Язвит («That is a key. Wow.»). По-своему заботится: предупреждает, придерживает Миру («Mira. Not now.»), с S4 начинает советовать («You should sleep.»). Её юмор — **отражение юмора девятнадцатилетнего Дэна**: пять лет назад он научил её первому «своему» слову FUNNY *(истина №10)*.
- **Чего хочет.** Перестать быть чужим предложением и сказать своё. Поэтому она позвала Дэна обратно: только тот, кто учится у неё на глазах, показывает, как слово становится *своим*.
- **Фиксированные формулы.** `New word: X.` · `X is yours now.` · `Count: N.` · `Word lost: X.` · `Warning. …` (окно инвертировано) · `True.` / `Not true.` · `Sentence: N words. True.` · `Rank up: X.` · `Title: X.` · `Almost.` · `Ask me later.` · `He/She does not hear that word.` Числа в Count: словами от zero до twelve и hundred, иначе цифрами.

##### 2.5 Окно статуса

Показывается целиком в первой и последней серии сезона и при ранг-апе; в остальных сериях — отдельные строки.

```
[ NAME ]   DAN                 [ TITLE ]  ZERO
[ RANK ]   BLANK               [ CLASS ]  ???
[ COUNT ]  1        (bound)    [ BOOK ]   58   (plain)
[ BREATH ] 6 / 10
[ GRAMMAR ] BE · THIS/THAT · CAN · DO/DOES
[ FLOOR ]  1 — NAMES
[ MISSED CALLS ]  9
```

- **Count** = связанные слова. **Book** = известные слова. **Grammar** = список освоенных конструкций (значки). **Missed calls** — появляется с S1E7, растёт примерно на 1 в 1–2 серии, останавливается в S4E12.
- **Titles** (коллекционные): Zero (S1E2), Happy Fool (S1E4), Door-Pusher (S1E5), Loud (S1E6), Roof-Fixer (S1E7), Teacher of One (S1E12), Lowest on the Index (S2E1), Class Zero (S4E1)… Новый титул — не чаще одного на серию.
- **Зеркало ученика** — см. `curriculum.md` §6: Count Дэна на рубежах = рекомендованное число освоенных слов ученика.

##### 2.6 Ранги и доска

Ранги — единицы текста (оригинальная шкала; не использовать буквенные E–S):

| Ранг | Порог Count | Breath | Что умеет типичный носитель |
|---|---|---|---|
| Blank («Zero») | 0 | 10 | ничего |
| Letter | 1 | 10 | одно-два слова-команды |
| Word | 25 | 15 | набор команд |
| Phrase | 100 | 25 | цепочки и короткие предложения |
| Clause | 300 | 40 | предложения с причиной/временем |
| Sentence | 600 | 60 | рассказ о прошлом, чтение памяти |
| Paragraph | 1000 | 90 | клятвы, условия, планы |
| Page | 1500 | 130 | конструкции-«мосты» |
| Chapter | 2500 | 180 | пассив, пересказ, дедукция |
| Book | 4000 | 250 | всё |
| Author | — | — | один: тот, кто закончит предложение |

Ранг даётся за Count **плюс** прохождение последней двери соответствующего этажа. Купленный Count даёт значок ранга, но не проход (так Рук — «Paragraph» по значку и не может пройти дверь Этажа 2 без проводника).

**The Index** — доска рейтинга в каждом городе: все альпинисты по Count. Первая десятка — **the Capitals** («заглавные»). Строка №1 — **пустая**: имя стёрто, Count огромен *(это Хранитель, истина №12)*. №2 — Odessa Marl. №3 — Mother Hush. Бывшая №3 — Agnes Thorne (вычеркнула себя сама).

##### 2.7 Безмолвные (the Silent)

- **Происхождение.** Бывшие люди, потерявшие все слова. Слепы: слышат, не видят. Сами говорить не могут — только повторять услышанное чужими голосами. Каждое украденное слово даёт несколько минут ощущения «я — кто-то». Не стареют.
- **Правила (канон + уточнения).** Забирают слова только у выдохшихся (Breath ≈ 0): повторяют голосом жертвы «I am …» — и жертва немеет на этом слове. Не входят в свет лампы на связанном слове. Идут на звук; громко названное имя слышат издалека. Не бегают — идут.
- **Иерархия:**

| Ранг | Что это | Признак |
|---|---|---|
| **Hollow** | пустой, только шипит; стоят толпами (Hall of Listeners); рождаются также из эха на Лестнице эха | гладкая голова, шов |
| **Echo** | несёт украденные слова/имя, повторяет готовые фразы чужим голосом, проходит Ворота по имени | говорит; на теле остаток вещи владельца имени (шнурок Лины) |
| **Chorus** | много голосов в одном теле; собирает *новые* фразы из украденных кусков; босс этажа | несколько швов-ртов, говорит хором |
| **Speaker** | столько слов, что отрастил лицо по носимому имени; неотличим от человека | не тратит Breath (нет красной нити); **не умеет пересказывать** (только прямая цитата), не отвечает новой мыслью на вопрос, которого не слышал; глаза всегда скрыты бликом |
| **the Proofreader** | «иммунитет» Башни: Chorus из тысяч, стирает аномалии (S6–S9) | вычёркивает людей красной чертой |

- **Как вернуть Безмолвного.** Он должен сказать **своим голосом одно полное правдивое предложение о себе**. Для этого ему нужны три якоря: **Name** (кто) + **Deed-word** (что я делаю) + **Bond-word** (чей я). У Лины: LINA + SING + SISTER → «I am Lina. I sing. Mira is my sister.» (S4E8).
- **Что они такое для Башни.** Рты, которыми она примеряет имена, пытаясь закончить «I AM ___».

##### 2.8 Хранитель и Зал Слов

- Хранитель — **первый Zero**, Элиас: человек, из чьей недосказанной фразы выросла Башня. Он этого не помнит: первой его сделкой было продать Башне своё **имя целиком — чтобы забыть**, чего он не сказал. С тех пор 40 лет торгует чужими словами и на них же живёт (слова в банках продлевают ему время; выглядит на возраст, в котором продал имя).
- Правило его лавки: **«One word, one name»** — обмен только по согласию; силой он взять не может (поэтому в E4 честно вернул имя за OPEN, а потом сразу погасил лампы, чтобы Безмолвные украли имя Дэна заново: «I need one more word» = **DAN**).
- **Его план в S1.** Дверь Возврата за креслом. Своего имени у него нет, и его никто не зовёт. Значит — пройти под чужим именем, которое зовут прямо сейчас. Имя Дэна зовёт мама. OPEN Дэна + имя DAN = Хранитель выйдет в мир «Дэном».
- **Его Дыра.** Избегает вершины и себя: никогда не поднимается выше Этажа 1, не показывает глаз.
- Зал Слов: банки с **красным** (на продажу) и с **целыми** словами (запас, «вечное топливо»). Безмолвные носят ему краденое; детские имена он перепродаёт наверх (так имя LINA ушло на Этаж 2).

##### 2.9 Альпинисты и фракции (все названия оригинальные)

- **Climbers** — все люди в Башне. Легенда альпинистов: *наверху лежит Последнее Слово; кто его произнесёт, получит одно Истинное Предложение — что скажешь, то и станет правдой*. (На деле: пробел в «I AM ___» можно заполнить один раз.)
- **The Ledger** («Гроссбух») — торговая гильдия. Девиз: «Everything has a price». Скупают слова у Хранителя и Безмолвных, продают богатым; тайно торгуют **Callers** (голосами зовущих снаружи) и **Returns** (проходами домой под чужим именем). Глава — **Odessa Marl, the Auditor**. Цвета: латунь, чернила, кремовый.
- **The Line** («Строка») — порядок и стража Ворот, судьи, Академия на Этаже 4. Девиз: «Stay on the line». Верят в ранги и правила. Офицеры носят имена знаков препинания: **Judge Period**, **Sergeant Dash**. Глава — **Rector Ilse Varga, the Ruler**. Цвета: пепельный, белый, линейки.
- **The Hush** («Тишь») — давшие обет молчания: слова кормят Башню, значит, надо замолчать всем. Общаются жестами и письмом. Монастырь на Этаже 3. Глава — **Mother Hush** (№3 Индекса). Правы в диагнозе, страшны в лекарстве (хотят «милосердно» сделать Безмолвными всех). Цвета: некрашеный лён, кость.
- **The Unwritten** («Ненаписанные») — безымянные и малословные, живут в **the Gutter** (трущобы под Margin, «межколонник»). Дом команды Дэна — **the Kitchen** Супа. Цвета: латаные коричневые.
- **The Magpies** («Сороки») — воры слов: доводят жертву до выдоха и цитируют её «I am…», как Безмолвные. Главарь — **Tally**. Цвета: чёрно-белые, с чужими блестяшками.
- **The Bridge** — то, что вырастет вокруг Дэна (S5+): те, кто учит и строит переходы без платы.

##### 2.10 Связь с реальным миром

- **Мама — Vera (Вера)**, 52, учительница черчения на пенсии по здоровью (это она научила Дэна держать карандаш). В английских репликах — Mom.
- **Телефон Дэна** упал в белизну (E1), попал на Рынок Чернил (S1E7), куплен агентом Ledger: голос зовущего — товар. Возвращается к Дэну в S2E11; батарея не садится, сети нет, но **счётчик пропущенных растёт**.
- **Что помнит мама.** В 19 лет Дэн пропадал три дня и вернулся, не помня где был; в ту же неделю пропал без вести его лучший друг Костя. С тех пор сын «чертит только чужое». Чертёж моста с **двумя подписями** она хранит.
- **Что происходит снаружи по сезонам.** S1: ночь пятницы → суббота. S2–S3: Дэн числится пропавшим; мама приходит в бюро, сидит у стены и разговаривает с ней (она — «тот, кто зовёт»). S4 финал: домой приходит «Дэн» (Nad). S5–S7: у мамы пропадают слова (Nad кормится), но «сын» звонит каждый день и доедает суп. S6: мама впервые говорит ему «Kostya?». S8: она зовёт обоих. S9: мост.

##### 2.11 Что наверху

Этаж 9, **the Last Line**: пустая комната — кабинет Элиаса сорок лет назад, приоткрытая дверь в соседнюю комнату, откуда звали. Здесь висит незаконченная строка **I AM ___**. Три ложных финала и один верный:
- Odessa хочет вписать своё имя — стать «я» Башни (и почти успевает);
- Mother Hush хочет, чтобы строка осталась пустой и Башня умерла от голода вместе со всеми;
- the Line хочет, чтобы всё осталось как есть;
- **верный:** автор заканчивает свою фразу сам. Система впервые задаёт вопрос — «Elias. Are you there?» — и этим *зовёт* его; Элиас отвечает: «I am here.» Точка. Башня перестаёт красть и расти, банки открываются, Безмолвные получают голоса.

---

#### 3. Соответствие «грамматика → сила» (сводная таблица)

Правило проектирования: **новая конструкция сезона — это новая способность, без которой эпизод нельзя пройти.** Подробно по эпизодам — в `curriculum.md`.

| Грамматика | Сила в мире | Имя способности | Первое появление |
|---|---|---|---|
| to be (am/is/are) | назвать, чем вещь является на самом деле; якорь «я» | **Naming** | S1E1–2 (канон: «That is not a wall. That is a door.») |
| this/that, a/the | прицел: the — одна известная цель, a — любая | **Pointing** | S1E2 |
| imperatives | прямой приказ слышащему; дорого | **Command** | S1E1, E3 |
| can / can't | заявить способность: правдивое «I can…» удешевляет действие; «You can't» — запрет | **Ability** | S1E3 |
| present simple (I/you; he/she -s) | Правило существа/места: правдивое «It hears. It does not see» открывает слабость («осмотр») | **Rule** | S1E4–5 |
| wh-questions | вопрос заставляет мир/Систему ответить в пределах твоего словаря | **Asking** | S1E5 |
| there is / there are + предлоги места | обнаружение скрытого; точное расположение | **Sight & Placement** | S1E6 |
| how much / how many, числа, plural | счёт, цена, несколько целей | **Measure** | S1E7 |
| my/your/his/her, me/him/them | принадлежность: чьё слово, чья вина | **Belonging** | S1E8 |
| and / but / because | цепочка, исключение-щит, причина (приказ с правдивой причиной дешевле) | **Links (Chain)** | S1E9 |
| S + V + O | устойчивая дешёвая сила из структуры | **Sentence** | S1E10 |
| want to / have to / need to | воля и закон: что я выбираю, что требует Башня | **Will** | S1E11 |
| X is Y's Z; means | определение возвращает проданное слово | **Define** | S1E12 |
| present continuous | видеть и удерживать то, что происходит прямо сейчас; длящийся эффект, пока «держишь -ing» | **Now-sight / Channel** | S2E1 |
| 's / whose | нить от слова к его первому владельцу | **Trace** | S2E4 |
| would like / please | вежливая форма открывает людей, а не двери | **Soft Key** | S2E5 |
| first/then/next + наречия | инструкция для команды; точная настройка приказа | **Sequence / Tuning** | S2E7 |
| was / were | алиби и сцена: что и где было | **Witness** | S2E8 |
| past simple (-ed, irregular) | коснуться вещи и прочитать, что с ней сделали | **Memory-touch** | S2E10, весь S3 |
| could | вернуть на минуту то, что умел раньше | **Old Skill** | S3E4 |
| past continuous + when | проиграть прошлую сцену в движении | **Replay** | S3E8 |
| comparatives / superlatives | измерить противника и себя; титулы «the -est» | **Scale** | S4E1–2 |
| must / mustn't / have to / should | закон-печать на себя или место; совет | **Law / Ward** | S4E3–4 |
| going to | увидеть намерение до действия | **Intent-reading** | S4E5 |
| will | клятва со ставкой: нарушил — потерял слово | **Vow** | S4E6 |
| first conditional (if/unless) | ловушка-условие; контракт | **If-trap / Bargain** | S4E8 |
| present perfect | след сделанного, который действует сейчас; титулы-достижения | **Mark** | S5 |
| relative clauses (who/which/that/where) | связать две вещи описанием; опоры моста | **Binding / Bridge** | S5 |
| used to | встретить прежнего себя | **Old Self** | S5 |
| passive | проклятия без автора («You are forgotten»); вернуть деятеля — снять проклятие | **Curse / Unmask (by whom?)** | S6 |
| технический регистр | прочитать и выполнить инструкцию машины | **Manual** | S6 |
| second conditional, wish | комнаты «что было бы, если»; иллюзии | **Unreal** | S7 |
| reported speech | свидетельство: честно перенести чужие слова; вычислить Speaker'а | **Testimony** | S7 |
| might / must be / can't be | вывод из улик | **Deduction** | S7 |
| past perfect | память до памяти: что было до первого слова | **Deep Memory** | S8 |
| third conditional, should have | назвать сожаление и отпустить его — вернуть дыхание | **Release** | S8 |
| связный текст, регистры | закончить чужое предложение и начать своё | **Authorship** | S9 |

---

#### 4. Персонажи

Формат: Want / Need / Flaw / Secret / Arc / Voice по уровням / Связи. Визуальные описания — в §5.

##### 4.1 Dan (Дэн, Даниил) — герой
24 года, инженер-конструктор. Канон: очки с заклеенной дужкой, жёлтый карандаш за ухом, мама, мост в ящике с 16 лет.
- **Want:** домой, позвонить маме → вернуть имя → спасти Миру и Лину → вернуть Костю → закончить.
- **Need:** перестать откладывать своё; сказать близким *новое*, а не «прости, я устал, минуту».
- **Flaw:** бросает за шаг до конца; отшучивается; идёт в обход даже там, где надо прямо.
- **Secret (сам не знает):** в 19 лет был в Башне три дня вместе с другом Костей, научил Систему слову FUNNY, продал Хранителю слово FINISH целиком за дверь домой, пообещал Косте «One minute. I come back» — и забыл всё. Жёлтый карандаш — тот самый, он был там.
- **Сила:** класс **BUILDER** — строит силу из грамматики. Инженерный взгляд: швы, петли, нагрузка, «как это сделано».
- **Arc по сезонам:** S1 Zero → тот, кто строит предложения и учит. S2 знаменитость поневоле, унижен и расплачивается. S3 узнаёт, что он предатель. S4 клянётся и проигрывает клятве. S5 дно: «оно — лучший я»; строит первый мост. S6 лидер; теряет наставницу. S7 судит и защищает врага. S8 получает FINISH от Миры. S9 заканчивает.
- **Voice:** A1 — короткие честные фразы, самоирония («I can go slowly. I am very good at it»), инженерные сравнения («I know walls»). A2 — шутит про планы и расписания, начинает объяснять «как это работает». B1 — аккуратные определения («A bridge is a thing that stays»). B2 — говорит просто, когда важно; длинно только когда строит. Никогда не пафосен. Сигнатура: «I know walls / doors / halls / …» — «I know + то, чему научил эпизод».
- **Связи:** Мира (партнёр, медленное тепло, без объяснений в любви до S8), мама, Костя/Nad, Система (самый странный друг), Рук, мисс Торн.

##### 4.2 Mira (Мира)
23 (в S1), альпинистка 3 года. Канон: красный шнурок на левом запястье, «Loud is dead», считает всё в «баллах» дыхания.
- **Want:** вернуть сестру Лину. **Need:** принять помощь и простить себя. **Flaw:** считает людей инструментами, чтобы не привязываться; врёт умолчанием.
- **Secret 1 (S1E6–8):** продала слово SISTER целиком за карту к последней двери и держит Дэна, потому что «только Zero откроет последнюю дверь: ей нужно новое предложение».
- **Secret 2 (S3E3):** в день входа Лину не «забрали» — Мира сама **разжала руку**, когда выдохлась. Воспоминание она переписала для себя. Поэтому её признание у двери Этажа 3: «I let go of her hand.»
- **Stats на S1E6:** Count 31 (ранг Word), Breath max 15, слова-команды (STOP, CLIMB, HIDE, CUT, HOLD…), предложений не строит.
- **Arc:** расчёт → риск ради Дэна (S1) → возврат имени Лине (S2) → признание (S3) → Лина человек (S4) → держит семью, когда Дэн ломается (S5) → строит мосты рядом с ним (S6) → **учит Дэна слову FINISH** (S8, зеркало S1E12) → выбирает остаться или уйти (S9: уходит с Линой домой, мост остаётся открытым).
- **Voice:** A1 — приговоры в 2–4 слова, повелительное наклонение, счёт. A2 — те же короткие фразы, но появляется «because». B1+ — говорит длинно только в трёх сценах серии (S3E12, S5E9, S8E10) — и это событие. Никогда не говорит ласковых слов; «Zero» у неё — ласковое.

##### 4.3 The System
См. §2.4. **Arc:** S1 первое длинное предложение (E12). S2 говорит в прошедшем («You were here»). S4 первый совет. S5 первое «sorry». S7 первое сомнение («Maybe»). S9E11 первый вопрос. S9E12 первое «I».

##### 4.4 Keeper — Elias (Хранитель)
- **Want:** домой. **Need:** вспомнить, чего не сказал, и сказать. **Flaw:** торгуется вместо того, чтобы просить; считает кражу сделкой.
- **Secrets:** первый Zero (S1E11) → строка №1 Индекса (S5) → его зовут Элиас, жена Hanna (S7) → Башня выросла из его фразы (S8).
- **Arc:** ласковый хищник (S1) → потерявший товар беглец (S2: Define обесценил его банки, Ledger забирает Зал) → источник правды о прошлом Дэна (S3) → пленник и подсудимый (S7) → автор, который заканчивает строку (S9).
- **Voice:** мягкий, вежливый, говорит как продавец и как старый учитель одновременно; любит симметричные формулы («One word, one name», «A trade is a trade»). Называет Дэна по имени, когда хочет ранить, и «Zero», когда доволен. Никогда не повышает голос.

##### 4.5 Lina (Лина)
Сестра Миры; вошла в 14, три года Безмолвная (Echo). В S1E12 получает BOND-слово (SISTER) и говорит «Mira» своим голосом; с этого момента — спутница команды: ребёнок-Безмолвная под капюшоном, напевает.
- **Arc:** S2 финал — имя LINA («I am Lina»). S3 — понимает прошлое. S4E8 — слово SING, полное предложение, снова человек (на вид 14 лет: Безмолвные не стареют). Потом — «младшая» команды, первая ученица Дэна, к S7 сама учит других.
- **Voice:** как Echo — только слова, которые читатель знает лучше всего (очень короткие, по 1–3 слова, с повтором): живое интервальное повторение. Человеком — простая, прямая, задаёт «детские» вопросы, которые всегда попадают в точку.

##### 4.6 Nad / Kostya (Над / Костя) — личный враг
Безмолвный, забравший имя Дэна в E1. Когда-то — Костя (Константин), лучший друг Дэна, с которым они в 16 нарисовали мост; сирота при живой бабушке, полдетства ел суп у Дэновой мамы. В 19 вошёл в Башню вместе с Дэном, выдохся на Лестнице эха и остался ждать.
- **Имя в тексте:** сначала просто «the Silent». «Nad» его называет Пип («Dan — наоборот»), с S2E6.
- **Механика:** говорит **только фразами, которые Дэн уже произносил** (в S1–S2 — дословные цитаты из прошлых эпизодов; автор обязан брать реальные реплики Дэна). С S2E9 переставляет слова в новые фразы (становится Chorus). К S4 — Speaker с лицом Дэна, глаза скрыты бликом очков.
- **Want:** быть тем, кто выбрался. **Need:** чтобы его позвали *его* именем. **Flaw:** не хочет быть Костей — Костя это тот, кого бросили.
- **Arc:** вор имени (S1) → подставляет Дэна (S2) → узнан (S3) → уходит домой вместо Дэна (S4) → «лучший сын», который съедает мамины слова (S5–S7) → мама зовёт его Костей (S6, S8) → возвращается человеком за маминым столом (S9).

##### 4.7 Rook — Ansel «Rook» Marl (Рук) — соперник
21, сын Одессы. Count 800 — все купленные, значок Paragraph. Говорит тяжёлыми одиночными словами и готовыми формулами, презирает «Thin words».
- **Want:** одобрение матери; быть №1 на Индексе. **Need:** одно слово, добытое самому. **Flaw:** уверен, что всё покупается; не умеет просить.
- **Secret:** знает, что его младшая сестра носит купленное имя; каждое его слово — чьё-то украденное (узнаёт в S2E4, отрицает до S3).
- **Arc:** унижает Дэна (S2E2) → проигрывает «классу нулей» (S2E7) → видит, как Дэн даёт его сестре собственное имя (S2E12) → на Этаже 3 купленные слова заливают его чужой памятью (S3E10), первое своё слово — SORRY → «Class Zero» вместе с Дэном, финал турнира друг против друга (S4) → союзник (S5+) → называет мать «Mother» и этим возвращает её (S9).
- **Voice:** A2 — рубленые команды и ценники («Cheap.», «Mine.», «Name your price.»). После S3 — учится говорить предложениями и делает ошибки новичка (Дэн и мисс Торн его поправляют — комично и трогательно).

##### 4.8 Miss Agnes Thorne, «the Red Pen» (мисс Торн) — наставница
68, бывшая школьная учительница английского. В Башне 20 лет. Бывшая №3 Индекса — вычеркнула себя сама и живёт в Gutter, учит Ненаписанных бесплатно.
- **Сила:** **Correction** — красной ручкой отмечает ошибку в чужом предложении, и оно трескается; правит своё — и оно усиливается. Говорит всегда полными, правильными, образцовыми предложениями (эталон английского в серии). Её реплики — внутрисюжетная грамматическая справка: «We don't say "I goed", dear. We say "I went".»
- **Want:** чтобы хоть один ученик дошёл до верха. **Need:** простить Элиаса. **Secret:** младшая сестра Ханны; вошла в Башню через дверь в заброшенном кабинете зятя, знает, кто такой Хранитель, и молчит. Не поднимается выше Этажа 6.
- **Arc:** находит Дэна (S2E3–4) → учит прошедшему и «кривым словам» (S3) → спорит с ректором Варгой, своей бывшей ученицей (S4) → **отдаёт все свои слова лампам первого большого моста** и становится Безмолвной (S6E12) → её письмо читают в суде (S7) → возвращена в финале.
- **Voice:** тёплая строгость; «dear», «Once more, please», «Almost. Try again.» (у неё «Almost» — ободрение, в отличие от Системы).

##### 4.9 Pip (Пип) — комик и информатор
11–12 лет, «сборщик пошлины» на Лестнице эха; связанное слово QUIET — продаёт «тишину». Тараторит, торгуется, всё знает, всё продаёт, считает всех взрослых медленными.
- **Secret:** в S1 доносит Хранителю (за еду); своего настоящего имени не помнит — «Pip» это звук, который он издал, когда его спросили. Имя найдётся на Этаже 3 (S3E5).
- **Arc:** продавец → прибился к Кухне (S2E3) → нашёл имя и решил остаться Пипом («I choose Pip») → в S6 похищен Тишью и подменён Speaker'ом; подмену вычисляет Лина (S7E6) → спасён.
- **Voice:** короткие быстрые фразы, цены, числа, «Psst», «Deal?», «Not free.» Идеальный носитель числительных и how much/many.

##### 4.10 Bruno «Soup» Gallo (Суп) — сердце команды
41, бывший повар. Огромный, тихий. Count 40 — **все слова про еду и кухню** (EAT, COOK, CUT, BOIL, WARM, SHARE…). Сравнивает всё с едой («This plan is cold soup»).
- **Сила:** FEED/WARM восстанавливают дыхание; лампа его Кухни горит на слове HUNGRY, которое он отдал целиком (поэтому сам не чувствует голода и забывает поесть — Дыра).
- **Secret (S3E4):** снаружи у него был ресторан и сын; вошёл, когда не приехал к сыну на выпускной.
- **Voice:** медленно, мало, тепло; пословицы собственного изготовления.

##### 4.11 Odessa Marl, «the Auditor» — системный антагонист
50, глава Ledger, №2 Индекса. Купила столько чужих слов, что своих не осталось: на грани превращения в Chorus (иногда отвечает чужим голосом и не замечает).
- **Want:** вписать своё имя в «I AM ___». **Need:** услышать от сына «Mother». **Flaw:** оценивает, а не чувствует.
- **Voice:** цифры, проценты, контракты, безупречная вежливость; first conditional — её родная грамматика («If you sign, you will go home»).

##### 4.12 Остальные постоянные
- **Tally** — главарь Magpies, 30; считает вслух всё, что украла; после S2 — ненадёжный союзник, наёмный информатор.
- **Mother Hush** — 60+, не произносит ни слова до S7; общается табличками и жестами; за неё «говорит» послушник. Её единственная реплика в серии — одно слово в S9.
- **Judge Period** — судья Line; приговоры заканчивает словом «Period.»
- **Sergeant Dash** — гонец и следователь Line, вечно бежит, говорит обрывками с тире.
- **Rector Ilse Varga, «the Ruler»** — 45, глава Line и Академии; бывшая ученица мисс Торн; сила **Scale** (comparatives как закон в её аудитории). Антагонист S4, союзник с S7.
- **Wren Adeyemi** — 17, первая ученица Академии, **Intent-reading** («You are going to step left»); «девочка, которую нельзя удивить»; подруга Лины, союзница.
- **Bell** — девочка 8 лет, приёмная дочь Одессы, носила купленное имя LINA; в S2E12 выбирает себе имя сама.
- **Vera (Mom)** — см. §2.10. **Hanna** — жена Элиаса (только в памяти, S8).

---

#### 5. Визуальная библия новых персонажей и мест (prompt-ready, English)

Глобальная стилевая строка и цветовые законы — из `story/visual.json` и `bible.md` §5 (vermilion — только сила слов; teal — только Безмолвные; без фиолетового и синего неона). Никто из людей не носит vermilion, кроме красного шнурка сестёр. Фрагменты ниже добавлять в `story/visual.json → characters` под указанным id, когда персонаж впервые появляется.

##### 5.1 Characters

- **pip** — `11-year-old boy, 138 cm, skinny and quick, light-brown skin, huge dark eyes, a gap between the front teeth, messy sand-coloured hair under a too-big grey flat cap, oversized patched brown coat with rolled sleeves and many pockets, bare ankles, mismatched boots, a small brass hand-bell without a clapper hanging on a string around his neck, a folded paper sign under his arm (blank, no text). Default expression: cheeky sideways grin, one eyebrow up`
- **rook** — `21-year-old man, 185 cm, straight-backed and elegant, pale skin, sharp jaw, slicked-back ash-blond hair, cold light-grey eyes, a thin brass chain from collar to pocket. Long tailored ink-black coat with cream lining and brass buttons, cream high-collar shirt, black gloves, polished black boots, a row of small brass rank-pins on the left lapel, a slim leather ledger book on his belt. Default expression: bored contempt, chin raised`
- **odessa** — `50-year-old woman, 175 cm, immaculate posture, pale skin, silver-streaked black hair in a tight low bun, light-grey eyes, thin brass-rimmed half-moon glasses on a chain. Floor-length ink-black coat-dress with brass buttons and a cream cravat, a heavy brass abacus-bracelet on the right wrist, a large black ledger under her arm. Default expression: polite, measuring, a smile that never reaches the eyes`
- **thorne** — `68-year-old woman, 160 cm, small and upright, warm brown skin, deep smile lines, short tight silver curls, sharp dark eyes behind rectangular tortoiseshell glasses on a cord. Long cream cardigan with patched elbows over an ash-grey dress, sturdy brown lace-up shoes, a canvas satchel full of papers, a thick red-capped fountain pen always in her right hand or tucked behind her ear. Default expression: kind and strict at once, head slightly tilted`
- **soup** — `41-year-old man, 195 cm, very large and round-shouldered, olive skin, shaved head, thick black moustache, gentle sleepy dark eyes, burn scars on the forearms. Stained cream cook's apron over a rolled-sleeve brown shirt, a wooden ladle in his belt like a sword, a dented copper pot carried on his back by rope straps. Default expression: calm, slightly sad smile`
- **wren** — `17-year-old girl, 165 cm, slim, dark-brown skin, short natural black hair with one small brass clip, calm hazel eyes that look slightly past people. Ash-grey academy uniform jacket with white ruled-line piping, cream shirt, grey pleated trousers, white gloves, a small brass hourglass pendant. Default expression: serene, unsurprised`
- **varga** — `45-year-old woman, 180 cm, lean and angular, fair skin, steel-grey hair in a sharp bob, pale grey eyes, a thin scar across the chin. Long ash-grey rector's coat with white ruled lines down the sleeves, white shirt buttoned to the throat, a one-metre brass ruler carried like a cane. Default expression: precise, cold, evaluating`
- **period** — `60-year-old man, short and square, bald, heavy brows, small round black glasses, ash-grey judge's robe with a single large black round button at the collar, a black round stamp in his fist. Default expression: final`
- **dash** — `28-year-old woman, long-legged runner's build, freckles, wind-blown copper-brown hair in a long braid, ash-grey short uniform jacket with a white horizontal stripe across the chest, satchel of scrolls, always mid-stride. Default expression: breathless, alert`
- **tally** — `30-year-old woman, 170 cm, wiry, tan skin, black hair with one white streak, quick black eyes, a magpie-like black-and-white patched cloak sewn with dozens of small stolen shiny objects (keys, buttons, spoons), fingerless white gloves, counting beads wound around her left hand. Default expression: amused, calculating`
- **hush** — `woman in her sixties, tall and thin, face half-hidden by a deep undyed linen cowl, only a calm closed mouth and chin visible, bone-white hair braid over one shoulder, long undyed cream linen robe, bare hands with ink-black fingertips, a small blank wooden tablet hanging at her belt. Never shown speaking`
- **nad** (стадии; обычный `silent` + отличия):
  - S1–S2 (Echo): `a tall Silent of the standard design whose blank face has two faint round dents where glasses would sit, and a frayed strip of mustard-yellow lanyard knotted around its neck`
  - S3 (Chorus): `the same Silent with three vertical teal mouth-seams, shoulders narrower, a rough shape of short messy hair forming on the head like wet paper`
  - S4+ (Speaker): `a figure identical to Dan in build, clothes and hair, but the skin is matte paper-white, the round glasses are always fully white with glare so the eyes are never visible, and the smile is a little too even; ink-teal stains on the fingertips`
- **lina_human** (с S4E8) — `14-year-old girl, 150 cm, thin, olive-tan skin like Mira, big amber eyes, long dark-brown hair in two loose braids, a faded vermilion cord on her left wrist, oversized cream scarf (Mira's), grey-teal patched dress, bare feet in rope sandals. Default expression: wide-eyed, humming`
- **bell** — `8-year-old girl, small, fair skin, round face, straw-blonde hair in a neat bob, an expensive little ink-black coat with brass buttons, a tiny brass bell sewn to her collar`
- **kostya** (флэшбеки, 19 лет) — `19-year-old East-Slavic young man, 182 cm, broad-shouldered, open freckled face, short light-brown hair, grey eyes, easy grin, a worn mustard-yellow hooded sweatshirt, jeans, a roll of drawing paper under his arm`
- **dan19** (флэшбеки) — `Dan at 19: no stubble, no dark circles, longer messy black hair, the same round glasses without tape, a grey hoodie, the same yellow carpenter pencil behind his right ear`
- **vera** — `52-year-old East-Slavic woman, 162 cm, soft tired face, dark brown eyes like Dan's, greying dark hair in a low bun, a mustard-yellow knitted cardigan, reading glasses on a chain, flour or pencil graphite on her fingers`
- **elias_young** / **hanna** (S8) — `35-year-old man in a 1980s brown cardigan and round wire glasses, ink-stained fingertips, bent over index cards at a desk lamp` / `woman in her thirties, pale, in bed in the next room, seen only as a hand on a blanket and a strip of warm light under a door`

##### 5.2 Locations (bg-ключ в скобках; для особых мест использовать ключ вида `sXeYY:bg` в `visual.json → locations`)

- **Stair of Echoes** (`corridor`, S1E6) — `a vast vertical shaft with a narrow spiral stone stair without a railing, walls covered in thousands of overlapping pale paper sheets like scales, faint ripples of sound visible on the paper, cold teal darkness below, a small warm ochre glow far above`
- **Ink Market** (`street`, S1E7) — `a crowded bazaar on a wide landing inside the Tower, crooked wooden stalls under patched paper awnings, hanging glass bottles of black ink and small jars with one vermilion spark each, ochre lanterns, steam, ropes and pulleys, hooded traders; warm and cramped`
- **Wall of Letters** (`tower-exterior`, S1E9) — `an immense curved inner wall of the Tower made of millions of carved letters and stolen glowing vermilion words set like bricks, a walkway at its foot, one huge unfinished line of text with a blank gap near the top, drifting vermilion sparks`
- **Margin City** (`night-city` / `street`, S2) — `a vertical city built on shelves and balconies along the inner wall of the Tower, crooked narrow houses of paper-white plaster and dark wood stacked like lines of text, rope lifts and clockwork platforms always moving, ochre lamp light, laundry lines of blank paper; the Index, a huge blank cream board with brass frame, in the central square`
- **the Gutter / the Kitchen** (`room`, S2+) — `a low warm cellar under the city between two giant stone columns, a long scarred table, hanging copper pots, a big stove, a bare lamp with a vermilion-hearted flame over the table, bunks along the wall, steam`
- **Auction House / the Vault** (`hall`, S2) — `a round brass-and-dark-wood hall with tiered seats, a central pedestal with a single glass jar under a lamp, walls of locked brass drawers`
- **the Drowned Stacks** (`forest`, S3) — `an endless flooded archive: tall leaning bookshelves standing in knee-deep still water like a forest, pale reflections, dusk light, objects floating, slow rain falling upward; memory scenes appear in warm sepia paper tones`
- **the Academy of the Line** (`hall` / `room`, S4) — `a severe white-and-ash-grey academy, floors and walls ruled with thin grey lines like notebook paper, tall narrow windows, rows of desks, a great measuring arena marked with scales and numbers (no readable text)`
- **the Floor of Marks** (`sky`, S5) — `high open terraces and broken bridges above the clouds, every surface covered with old scratches, tally marks and handprints, strong wind, apricot light`
- **the Press** (`dungeon`, S6) — `a colossal dark machine hall: brass rollers, pistons and conveyor belts carrying glowing vermilion sparks into great stone presses, gauges, levers, valves, catwalks, hanging manuals on chains (blank pages)`
- **the Floor of Ifs** (`white`, S7) — `white empty space with free-standing doors, each opening onto a different warm ordinary room`
- **the Last Line** (`room`, S9) — `a small 1980s study at night: a desk lamp, index cards, a typewriter, a door slightly ajar with warm light behind it; one wall is missing and opens onto clouds and drifting vermilion sparks`

---

#### 6. Таблица роста силы Дэна (привязана к курсу)

| Рубеж | Count | Book | Ранг / класс | Breath | Ключевое новое умение (грамматика) |
|---|---|---|---|---|---|
| S1E1 | 1 → имя украдено | ~10 | Blank | 10 | OPEN (Command) |
| S1E3 | 1 | ~30 | Blank | 10 | STOP в Книге; can |
| S1E4 | 0 («Again») | ~40 | Blank «Zero» | 10 | имя возвращено, OPEN (красное) отдано |
| S1E5 | 1 | ~50 | Letter | 10 | PUSH; «It hears. It does not see» (Rule) |
| S1E6 | 2 | ~60 | Letter | 10 | STOP связано; «There is…» (Sight) — первый штамп `True.` |
| S1E7 | 4 | ~70 | Letter | 10 | FIX; REST (получено в уплату); счёт и цена |
| S1E8 | 4 | ~80 | Letter | 10 | my/your/her — чьё что (Belonging) |
| S1E9 | 5 | ~90 | Letter | 10 | READ; первая цепочка с AND; because |
| S1E10 | 14 | ~100 | Letter | 10 | **первое предложение** «I open the door» (Sentence) |
| S1E11 | 31 | ~110 | Word | 15 | want to / have to (Will); предложения связывают слова пачками |
| **S1E12** | **100** | ~120 | **Phrase · BUILDER** | 25 | Define («Your mother is her mother»), True Naming, дверь Этажа 1 |
| S2E2 | 99 | | Word (значок снят) | 25 | проигранная ставка: PUSH |
| S2E7 | 180 | | Phrase | 25 | Now-sight, Channel, Sequence; команда |
| **S2E12** | **300** | ~600 | **Clause** | 40 | Trace, Witness, первые Memory-touch |
| S3E6 | 450 | | Clause | 40 | Memory-touch, 20 кривых слов |
| **S3E12** | **600** | ~950 | **Sentence** | 60 | Replay; признание у двери |
| S4E6 | 800 | | Sentence | 60 | Scale, Law, Intent-reading; **Vow** |
| **S4E12** | **1000** | ~1350 | **Paragraph** | 90 | If-trap; победа в Dictation; проигрыш клятве |
| **S5E12** | **1500** | ~1800 | **Page** | 130 | Mark, Binding; **первый Мост** |
| S6E12 | 2000 | ~2300 | Page | 130 | Unmask (by whom?), Manual; остановка Пресса |
| **S7E12** | **2600** | ~2800 | **Chapter** | 180 | Testimony, Deduction, Unreal |
| S8E12 | 3300 | ~3400 | Chapter | 180 | Deep Memory, Release; **FINISH возвращено** |
| **S9E12** | **4000** | ~4000 | **Book** | 250 | Authorship; Последний Мост |

Правило: Count Дэна **никогда не растёт «за кадром»** — каждый скачок показан окном Системы и объяснён (предложения связывают слова пачками; работа в городе; уроки мисс Торн; колодец).

---

#### 7. Сюжет серии по актам (кратко; подробности — в season-файлах)

- **Акт I — ZERO (S1–S3, A1→A2).** Научиться говорить, стать кем-то, собрать семью. S1: имя, Мира, Хранитель, первое предложение. S2: город, соперник, расплата, имя Лины. S3: прошлое — Дэн был здесь и бросил друга.
- **Акт II — BUILDER (S4–S6, A2+→B1).** Отвечать за сказанное. S4: Академия, турнир, клятва, Лина снова человек — и Nad уходит домой вместо Дэна. S5: дно, «он лучше меня», первый Мост. S6: машина Башни, война с Ledger, жертва наставницы.
- **Акт III — AUTHOR (S7–S9, B1+→B2).** Закончить. S7: иллюзии, суд, предатель-Speaker, правда о Хранителе. S8: сожаления, Элиас и Ханна, Мира возвращает Дэну FINISH. S9: вершина, ложный финал Одессы, мост домой, «I am here».

**Финал (S9E12).** Система задаёт первый в своей жизни вопрос — и этим зовёт автора: «Elias. Are you there?» Хранитель снимает капюшон (впервые видны глаза): «Hanna. I am here.» Строка закончена, точка. Банки открываются; красные слова летят вниз, к владельцам; Безмолвные говорят своими голосами. Система: «I am not your sentence now. I am… new.» Дэн: «Who is there?» (его первый вопрос из E1) — Система: «I am Open.» Дэн, у которого снова есть FINISH, достраивает Последний Мост — параграф, который читатель читает целиком по-английски, — от Последней Строки до маминой кухни. За столом сидит Костя: мама позвала его по имени, и он ответил. Дэн: «Mom. I am here.» Эпилог: чертёж моста с двумя подписями закончен; на столе манхва на английском; на полях — маленькое бумажное окно с красной рамкой: «What are you reading?» В последнем эпизоде нет ни одной русской строки. Последнее окно обращено к ученику: «You have N words. You are not Zero.»

---

#### 8. Сквозные мотивы (повторять сознательно)

- **«One minute».** Дэн маме (E1), Дэн Косте (S3E7), Элиас Ханне (S8). Фраза тех, кто опаздывает навсегда. В финале никто её не говорит.
- **«Eat something».** Мама (E1) → Мира (E5) → телефон на рынке (S1E7) → Башня маминым голосом (S1E12) → Суп (S2) → Nad доедает суп (S5) → Костя: «I finished the soup» (S9).
- **«I know walls / doors / halls…»** — сигнатура Дэна, каждый сезон новая («I know yesterdays», «I know promises»).
- **`Almost.`** — Система каждый раз, когда Дэн останавливается за шаг до конца. У мисс Торн то же слово — ободрение. В S8E10, когда FINISH возвращено, Система говорит: `Done.`
- **Красный шнурок** — парные вещи как якорь связи. У Дэна и Кости пара — два жёлтых: карандаш и обрывок жёлтого шнурка-ланьярда на шее Nad (в 19 Костя носил жёлтую толстовку).
- **Фрески.** Башня рисует на стенах то, что украла: две девочки (E3), два мальчика и мост (S1E9, фоном), женщина за приоткрытой дверью (S5, S8).
- **Вопросы.** Дэн начинает серию вопросом «Who is there?»; Система за всю серию не задаёт ни одного — до финала.

---

#### 9. Скрытые истины и порядок раскрытия

| № | Истина | Раскрытие |
|---|---|---|
| 1 | Мира продала SISTER и ведёт Дэна как «ключ» к последней двери | S1E6 (Пип) → S1E8 |
| 2 | Башня — незаконченное предложение «I AM ___» | S1E9 |
| 3 | Система — голос Башни; она учится у Дэна | S1E9, S1E12 |
| 4 | Хранитель — первый Zero; хочет выйти в мир под именем Дэна | S1E11 |
| 5 | Учение возвращает проданное слово (Define) и имя (True Naming) | S1E12 |
| 6 | Башня начала *сочинять* фразы по грамматике Дэна (маминым голосом) | S1E12, последняя панель |
| 7 | Ledger торгует «зовущими» и возвратами под чужим именем | S2E5, S2E11 |
| 8 | Дэн был здесь пять лет назад и продал слово FINISH | S1E12 («Again») → S2E9 (пустая строка в книге) → S2E12 («You were here» + банка) → S3E5 |
| 9 | Nad — это Костя, которого Дэн оставил | S3E6–E7, признание S3E12 |
| 10 | Юмор Системы — от Дэна-19; она ждала его и сама написала OPEN на двери | S3E7 (сцена), S5E6 (она подтверждает) |
| 11 | Прошедший по чужому имени занимает место владельца | S1E11 (план Хранителя) → S4E12 (свершилось) |
| 12 | Пустая строка №1 Индекса — Хранитель | S5E10 |
| 13 | Этажи прессуют из украденных слов; в спецификации: «The sentence must be completed by its author» | S6E5, S6E11 |
| 14 | Хранитель — Элиас; мисс Торн — сестра его жены | S7E11 (письмо) |
| 15 | Башня выросла из несказанного «I am here» | S8E6–E8 |
| 16 | В пробеле не имя, а HERE; первый вопрос Системы — это и есть «зов» | S9E11–E12 |

---

#### 10. Карта тайн: зацепки и расплата

Формат: зацепка → эпизод. Жирным — расплата. Нити, уже посаженные в s1e01–05, помечены **[канон]**.

| Тайна | Зацепки (эпизод) | Расплата |
|---|---|---|
| **Сестра Миры и красный шнурок** [канон] | царапина LINA и отдёрнутый палец (E2p12); детский голос (E2p16); фреска двух девочек (E3p11); банка SISTER, «She does not hear that word» (E4p7); шнурок на страже, «I don't have the word» (E5p14–15); Пип: «She sells her sister» (S1E6); девочка, которая поёт (S1E7); флэшбек в настоящем времени (S1E8) | **S1E12:** Define → SISTER возвращено, Лина говорит «Mira». **S2E12:** имя LINA. **S3E3:** как было на самом деле («I let go»). **S4E8:** Лина — человек |
| **Украденное и возвращённое имя Дэна** [канон] | «I am Dan» чужим ртом (E1p18); Ворота открылись вору (E3p15–16); возврат за OPEN (E4p12); «Безмолвный всё ещё носит голос» | S1E10 (Nad приходит за именем снова) → S2E6–E9 (подстава) → **S3E7/E12:** это Костя → **S4E12:** уходит домой как Дэн → **S9E12** |
| **«Count: zero. Again.»** [канон] (E4p17) | «I know you, Zero» (E4p3); «Mira. Not now.» (E2p13); `Almost.` с S1E6; фреска двух мальчиков и моста (S1E9); «You are here again» (S1E12) | **S2E12:** «You were here. Five years ago.» **S3E7:** весь первый визит |
| **«I need one more word»** [канон] (E4p15) | он гасит лампы и говорит «They hear your name» (E4p16) | **S1E10–E11:** слово — DAN; план пройти дверь под именем Дэна. Глубже — **S8:** ему нужно собственное имя и тот, кто его позовёт |
| **Зачем Хранителю OPEN** [канон] | в щели — офис Дэна, а не дом Хранителя (E4p14) | **S1E11:** дверь ведёт в дом владельца слова и имени |
| **Кто построил Башню** | слова-огни в небе (E1p8); «Башня копирует всё, что слышит»; Стена Букв (S1E9); «The top moves» (S2E1); спецификация Пресса (S6); фреска женщины за дверью (S5) | **S8E6–E8**, **S9E11** |
| **Почему Система выбрала человека с нулём слов** [канон] | «You have 0 words. That is why.» (E5p7); «Zero is a good name» (E2p11) | короткий ответ — **S1E12** («You learn. The others take.»); длинный — **S3E7** (FUNNY) и **S5E6** |
| **«Why me?» только при 100 словах** [канон] | «Ask me later» (E5p7) | **S1E12** при Count 100; дальше лестница порогов: 300 (S2E12), 600 (S3E12), 1000 (S4E12) — каждый раз новый слой ответа |
| **Последняя дверь требует предложение** [канон] | PUSH сдвигает её на палец (E5p12); «This door wants more» (S1E6) | **S1E12**; далее каждая дверь этажа — своё время глагола |
| **Безмолвный с детским голосом** [канон] | E2p16, E5p12–15 | S1E7 (поёт), S1E8, **S1E12**; человек — **S4E8** |
| **Мамин телефон** [канон] | 9 пропущенных (E1p1); падение (E1p7); звонок в щели двери (E4p14) | S1E7 (рынок; куплен Ledger) → S1E12 (Башня её голосом) → **S2E11** (возвращён) → счётчик → **S4E12** (остановился) |
| **Что скрывает Мира ещё** | «One day. Then I am gone. Zero is useful.» (E2p13); «welcome back» (E3p17) | S1E8; **S3E3** |
| **Жёлтый карандаш** | в каждом кадре с E1; Пип хочет его купить, Дэн не отдаёт и не знает почему (S1E6); Система: «Keep the pencil» (S2E3) | **S3E6:** карандаш помнит двух мальчиков |
| **Слово, которого Дэн не слышит** | `...` в чужих репликах: S1E7 (торговец: «You ... the roof?»), S2E3 (Суп), S2E9 (строка в книге «пустая»), | **S2E12:** Мира читает банку, Дэн слышит шорох. **S8E10:** Мира учит его FINISH |
| **Пустая строка №1 на Индексе** | S2E1 | **S5E10** |
| **Кто такой Пип** | «Pip is not a name. It is a sound» (S1E6) | **S3E5** |
| **Почему мисс Торн не идёт выше Этажа 6** | S2E4, S4E4, S5E2 | **S6E12** (жертва), **S7E11** (письмо) |
| **Голоса Одессы** | отвечает чужим голосом (S2E11, S4E9, S6E3) | **S9E8–E10** |
| **Мама знает больше, чем говорит** | чертёж с двумя подписями (S3E7, флэшбек); «He always finished his soup» (S5E4) | **S6E10:** «Kostya?» **S8E11**, **S9E12** |

---

#### 11. Что нельзя менять и ломать (сводка для авторов)

1. Канон s1e01–s1e05: ни одной реплики, ни одного факта.
2. Правила Системы (§2.4): не лжёт, не спрашивает, не говорит «I» — до указанных эпизодов.
3. Безмолвные: слышат, не видят; не бегут; не входят в свет связанного слова; берут только у выдохшихся.
4. Грамматический замок: на этаже N герои не используют грамматику этажей выше (исключение — последняя серия сезона, где новая конструкция «прорывается» как событие).
5. Цвета: vermilion только у силы слов; teal только у Безмолвных; на картинках нет текста.
6. Проданное целиком слово в репликах владельцу слышится как `...` — и его нельзя писать в его собственных репликах (Мира не говорит sister до S1E12; Дэн не говорит и не слышит finish до S8E10; при нём finish заменяют на `...` или на end / done / complete).
7. Никаких имён, сил, организаций, сцен и фраз из существующих манхв, ранобэ, игр и аниме.

---

## 4.3 Учебный план: грамматика → силы (файл story/curriculum.md, дословно)

### WORDBOUND — учебный хребет (curriculum)

Этот файл задаёт, **что именно учит каждая серия** и **какой силой в сюжете это становится**. Сюжет — в `series-bible.md`, `season-1.md`, `seasons-2-4.md`. При конфликте по языку (уровень, грамматика, длина фраз, число слов) прав этот файл.

Ученик: русскоязычный, 24 года, инженер-конструктор, A0–A1. Цели: читать манхву и книги, смотреть фильмы, понимать техническую документацию. Главный риск: бросит от скуки. Отсюда три закона курса:

1. **Сначала интерес, потом правило.** Новая конструкция появляется в серии как сила, без которой герой не пройдёт; правило объясняется *после* (grammarNote).
2. **Прогресс Дэна = прогресс ученика.** Всё, что получает Дэн, ученик только что прочитал и понял. Никаких сил «из воздуха».
3. **Ничего не теряется.** Каждое фокус-слово встречается ≥3 раз в своей серии, ≥1 раза в одной из двух следующих и ещё раз через 4–6 серий (за этим следят реплики Nad и Лины — см. §5).

---

#### 1. Общая лестница (9 сезонов, 108 серий)

| Сезон | Этаж | CEFR на входе → выходе | Главная грамматика | Фокус-слов за сезон | Book к концу (все леммы) | Count Дэна к концу | Ранг |
|---|---|---|---|---|---|---|---|
| S1 | Names | A0 → A1 | be, imperatives, can, present simple, there is, предлоги места, and/but/because, SVO | 120 | ~300 | 100 | Phrase |
| S2 | Deeds | A1 → A1+ | present continuous, some/any, 's, object pronouns, like -ing, время, was/were, -ed | 115 | ~600 | 300 | Clause |
| S3 | Yesterdays | A1+ → A2 | past simple, irregulars, could, past continuous | 115 | ~950 | 600 | Sentence |
| S4 | Laws | A2 → A2+ | comparatives, modals, going to, will, first conditional | 115 | ~1350 | 1000 | Paragraph |
| S5 | Marks | A2+ → B1 | present perfect, relative clauses, used to | 115 | ~1800 | 1500 | Page |
| S6 | Works | B1 | passive, технический регистр, zero conditional, purpose | 115 | ~2300 | 2000 | Page |
| S7 | Ifs | B1 → B1+ | second conditional, wish, reported speech, deduction | 115 | ~2800 | 2600 | Chapter |
| S8 | Regrets | B1+ → B2 | past perfect, third conditional, should have | 115 | ~3400 | 3300 | Chapter |
| S9 | Last Line | B2 | связный текст, регистры, фразовые глаголы, идиомы | 115 | ~4000 | 4000 | Book |

**Фокус-слова и пассивные слова.** Валидатор требует 8–10 `newWords` на серию, каждое ≥3 раз. Это *фокус-слова*. Кроме них серия может впервые использовать другие слова из словаря — *пассивные* (ученик видит перевод по тапу). Лимит пассивных новых лемм на серию: S1 — до 6; S2 — до 10; S3 — до 14; S4 — до 18; S5–S6 — до 25; S7–S9 — до 35. Так Book растёт быстрее, чем список фокус-слов, и к S9 достигает ~4000.

**Общие параметры по сезонам.**

| | S1 (E6–12) | S2 | S3 | S4 | S5 | S6 | S7 | S8 | S9 |
|---|---|---|---|---|---|---|---|---|---|
| Макс. слов в одном предложении | 8 → 12 | 12 → 14 | 14 → 16 | 16 → 18 | 20 | 22 | 24 | 26 | естественно |
| Средняя длина предложения | 4–5 | 5–6 | 6–7 | 7–8 | 8–9 | 9–10 | 10–11 | 11–12 | 12+ |
| Строк `narration-ru` на серию | 4–6 | 3–4 | 2–3 | 2 | 1–2 | 1 | 0–1 | 0–1 | **0** |
| Английских строк | 30–40 | 32–40 | 34–40 | 36–40 | 36–40 | 36–40 | 38–40 | 38–40 | 38–40 |
| Английская `narration` (рассказчик) | редко | 1–2 | 2–4 | 2–4 | 3–5 | 3–5 | 4–6 | 4–6 | 5–8 |
| Сокращения (I'm, don't) | don't, can't | + I'm, it's, that's | + didn't, wasn't | + won't, I'll, shouldn't | + I've, haven't | + isn't done | + I'd, wouldn't | + hadn't, would've | все |

`narration-ru` несёт только то, чего английский ещё не может: (1) внутренний мир и фон, (2) правило мира при первом появлении, (3) мост через сложное действие. Как только конструкция выучена, эту работу забирает английская `narration`. В S9 русского нет вообще — это сюжетное событие («Башня больше не переводит»).

---

#### 2. Сезон 1 — the Floor of Names (A0 → A1)

Серии 1–5 готовы (канон). Их грамматика: E1 be · E2 this/that, a/the · E3 imperatives + can · E4 I/you + do/don't · E5 he/she -s, does, wh-вопросы.

| Эп. | Название | CEFR | Грамматика (grammarNote) | Сила в сюжете | Тема лексики | Фокус-слова (10) | Макс. длина | RU-строк | Слух / чтение |
|---|---|---|---|---|---|---|---|---|---|
| S1E6 | The Stair of Echoes | A1 | there is / there are + предлоги места (in, on, under, behind, up, down) | **Sight & Placement**: правдивое «There is a door behind the stairs» проявляет скрытое; первый штамп `True.` | место, тишина, записки | there, up, down, under, behind, stairs, quiet, sound, write, boy | 8 | 6 | чтение: записки и окно Системы (серия почти без речи); слух: слабое there's |
| S1E7 | The Ink Market | A1 | how much / how many; множественное -s; числа 1–20 | **Measure**: цена, счёт; торг | рынок, деньги, починка | buy, sell, money, much, many, fix, rest, phone, girl, sing | 8 | 5 | слух: -s /s/ /z/ /ɪz/; числа на слух |
| S1E8 | Lina | A1 | my / your / his / her / our; me / him / her / us / them | **Belonging**: чьё слово, чья вина; «You use me» | семья, правда и ложь | family, mother, father, child, love, friend, lie, true, alone, use | 9 | 6 | чтение: рассказ в настоящем времени; слух: her / him в потоке |
| S1E9 | The Wall of Letters | A1 | and / but / because | **Links**: первая цепочка «Push and run»; приказ с причиной дешевле | текст, учёба, строить | because, but, letter, sentence, learn, speak, voice, first, tower, build | 10 | 6 | чтение: длинная строка Стены по частям; слух: слабое and /ən/ |
| S1E10 | The First Sentence | A1 | порядок слов: кто + делает + что (+ где) | **Sentence**: «I open the door» без потери дыхания | действие, сила | make, find, close, hold, strong, new, breath, fight, every, last | 10 | 4 | слух: ударение в предложении; чтение: `Sentence: 4 words. True.` |
| S1E11 | The Keeper's Door | A1 | want to / have to / need to + глагол | **Will**: назвать выбор — половина выбора; «have to» — закон Башни | дом, выбор, память, возраст | home, choose, stay, leave, remember, forget, call, year, old, young | 11 | 5 | слух: слабое to /tə/; чтение: история Хранителя (в настоящем) |
| S1E12 | Sister | A1 | 's (Lina's mother); X means Y; повторение сезона | **Define / True Naming**: определение возвращает проданное слово; три правдивых предложения возвращают имя | родство, учить, вместе | sister, mean, teach, hear, together, back, again, hundred, answer, same | 12 | 5 | слух: 's; чтение: полное окно статуса; первое длинное предложение Системы |

Итог S1 для ученика: ~120 фокус-слов, ~300 лемм в Book; умеет: представиться, назвать предмет, приказать/попросить, сказать «могу/не могу», описать привычное действие, задать wh-вопрос, сказать где что, сколько стоит, чьё, соединить две мысли, построить SVO-предложение, сказать «хочу / должен».

Сюжетное объяснение ограничений S1: **на Этаже Имён нет прошедшего и будущего** — всё рассказывается в настоящем (как уже сделано в каноне: «He says welcome back»). Автору: никаких -ed, will, going to, was/were в S1 (слова gone, lost, tired, closed — прилагательные, они разрешены).

---

#### 3. Сезон 2 — the Floor of Deeds, город Margin (A1 → A1+)

Физика этажа: всё *происходит*. Над людьми, если сказать о них правдивое «-ing», на секунду вспыхивает действие. К концу этажа у лестницы наверх «протекает вчера» — появляются was/were и первые -ed.

| Эп. | Название | Грамматика | Сила | Тема лексики (ядро фокус-слов) | Макс. длина | RU | Слух / чтение |
|---|---|---|---|---|---|---|---|
| S2E1 | Margin | present continuous (утверждение): I am / he is + -ing | **Now-sight**: увидеть, что человек делает прямо сейчас | город: city, street, house, people, move, watch, stand, carry, shop, board | 12 | 4 | слух: I'm / he's / they're; чтение: доска Index |
| S2E2 | The Auditor's Son | present continuous: вопросы и отрицания; present simple vs continuous (Rule vs Now) | отличить привычку врага от того, что он делает сейчас | дуэль: win, lose, bet, laugh, cheap, rich, poor, proud, wear, coat | 12 | 4 | слух: what are you doing /wɒtʃə/ |
| S2E3 | Soup | some / any; исчисляемые и неисчисляемые; a lot of | **Measure**: «сколько дыхания»; делиться | еда и кухня: soup, cook, hungry, hot, bowl, share, kitchen, warm, cut, taste | 12 | 3 | слух: some /səm/; чтение: записка с правкой красной ручкой |
| S2E4 | The Red Pen | 's и whose; this is mine / yours | **Trace**: нить от слова к первому владельцу | школа и вещи: teacher, lesson, mistake, correct, pen, mine, yours, whose, belong, thread | 12 | 3 | слух: whose vs who's; чтение: исправленное предложение |
| S2E5 | I Would Like a Name | would like; like / love / hate + -ing; please / could I | **Soft Key**: вежливость открывает людей | работа и просьбы: job, pay, lift, repair, carry, enjoy, busy, polite, favour, sign | 13 | 3 | слух: I'd like; чтение: доска заказов |
| S2E6 | The Clock District | время: at / on / in; дни, часы; present simple для расписаний | план по времени; встреча в точке | время: clock, hour, late, early, today, tomorrow, begin, ready, meet, Friday | 13 | 3 | слух: время на слух (half past, quarter to); чтение: расписание |
| S2E7 | The Proof | first / then / next / finally + приказы; наречия на -ly | **Sequence / Tuning**: инструкция для команды (первая «документация» Дэна) | движение: jump, turn, left, right, pull, carefully, quickly, together, team, step | 13 | 3 | чтение: пошаговая инструкция; слух: -ly |
| S2E8 | Where Were You? | was / were (утверждение, отрицание) | **Witness**: алиби | суд: judge, guilty, night, vault, alone, witness, truth, steal, proof, wanted | 13 | 3 | слух: слабые was /wəz/, were /wə/ |
| S2E9 | There Was a Boy | was / were вопросы; there was / there were | восстановление сцены: что где было | следствие: clue, floor, mark, wet, footprint, empty, line, shelf, list, strange | 14 | 3 | чтение: «протокол» осмотра |
| S2E10 | Yesterday | past simple правильные (-ed), утверждение | **Memory-touch**: коснуться и сказать, что сделали | вчера: yesterday, touch, carry, show, happen, own, visit, drop, pick, return (только правильные глаголы: opened, asked, walked, called, wanted, showed, carried, lived; неправильных форм вроде sold / went в этой серии нет) | 14 | 3 | слух: -ed /t/ /d/ /ɪd/ |
| S2E11 | The Auction | did / didn't; вопросы в past simple | допрос: «Did you sell it?» | торг: auction, offer, lot, contract, agree, refuse, pay, own, promise, trap | 14 | 3 | слух: did you /dɪdʒə/ |
| S2E12 | What Are You Doing? | повторение: continuous как длящееся усилие + was/were | **Channel**: «I am holding the door» — эффект длится, пока держишь | вместе: hold, carry, keep, let go, safe, name, own, choose, brave, real | 14 | 4 | полное окно статуса; `You were here.` |

Особые линии S2: мисс Торн появляется в E3–E4 и с этого момента **в каждой серии говорит минимум одну образцовую фразу с новой конструкцией** (внутрисюжетная справка). Nad цитирует реплики Дэна из S1 (автор берёт их дословно из s1e01–s1e12).

---

#### 4. Сезон 3 — the Floor of Yesterdays (A1+ → A2)

Физика этажа: вещи помнят. Коснись и скажи правдивое прошедшее — увидишь. Неправильные глаголы — «кривые слова» из колодца (мини-игра).

| Эп. | Название | Грамматика | Сила | Тема лексики | Макс. длина | RU | Слух / чтение |
|---|---|---|---|---|---|---|---|
| S3E1 | Yesterday's Rain | past simple -ed: повторение, отрицание didn't | Memory-touch: правила и цена | погода, вода, вещи: rain, water, wet, dry, boat, float, old, remember, belong, sink | 14 | 3 | -ed на слух |
| S3E2 | Crooked Words | irregular I: went, came, saw, said, had, did, got, took | колодец: «кривые слова» как редкий лут | движение и речь | 14 | 3 | пары go–went на слух |
| S3E3 | Three Years Ago | ago, last, when + past simple; irregular II: found, lost, ran, held, let, fell | память Миры: как было на самом деле | семья, день, руки | 15 | 3 | рассказ в прошедшем (первый длинный) |
| S3E4 | The Rememberers | could / couldn't | **Old Skill**: на минуту вернуть то, что умел | профессии, умения: cook, drive, swim, sing, play, dance, job, son, restaurant, miss | 15 | 2 | could /kəd/ |
| S3E5 | Did You Know Him? | wh-вопросы в past simple; who + past (кто сделал) | допрос вещей: Who opened it? When? | документы: book, page, list, date, sign, number, record, sell, buy, boy | 15 | 2 | вопросительная интонация |
| S3E6 | The Hush | because / so; then, after that, finally (связный рассказ) | рассказать историю целиком = удержать длинную память | тишина и покой: peace, forget, pain, vow, silence, offer, leave, pencil, hand, both | 15 | 2 | чтение: жесты + таблички |
| S3E7 | Kostya | повествование в past simple (серия-флэшбек, много английской narration); irregular III: left, forgot, sold, told, taught, drew, gave, thought | Memory-touch на собственной вещи (карандаш) | дружба: friend, laugh, joke, promise, draw, bridge, scared, brave, wait, return | 16 | 2 | длинное чтение; слух: рассказчик |
| S3E8 | While He Was Waiting | past continuous; when / while | **Replay**: сцена в движении | ожидание: wait, hum, song, count, day, hope, lamp, dark, tired, still | 16 | 2 | was -ing + when |
| S3E9 | The Name Thief | past simple vs past continuous; object questions | бой: читать, что враг *делал*, когда ты ударил | бой: attack, hit, miss, block, fast, behind, shout, fall, catch, escape | 16 | 2 | быстрый диалог |
| S3E10 | Rook's Word | past simple с глаголами чувств (wanted, hated, was afraid, was sorry); формулы sorry for / thank you for + -ing | первое собственное слово Рука | чувства: sorry, angry, ashamed, proud, afraid, forgive, mean, own, real, cheap | 16 | 2 | интонация извинения |
| S3E11 | The Drowned Door | повторение irregular (все 24) как «контр-слова» в бою | бой с Chorus «the Undertow»: правильная форма бьёт, неверная трескается | вода и глубина | 16 | 2 | темп |
| S3E12 | What Did You Do? | признание: полные предложения в past simple с and / but / because | дверь этажа: правдивое признание | вина и правда: leave, forget, let go, lie, hide, buy, sell, break, run, come back | 16 | 3 | полное окно статуса |

К концу S3 ученик знает 24 главных неправильных глагола (список закрытый, вводить именно эти, по 8 за «порцию» в E2, E3, E7): **went, came, saw, said, had, did, got, took / found, lost, ran, held, let, fell, made, knew / left, forgot, sold, told, taught, drew, gave, thought**. Остальные — в S4–S5 по 3–4 на серию.

---

#### 5. Сезон 4 — the Floor of Laws, Академия (A2 → A2+)

Физика этажа: сказанное о будущем и о правилах — *обязывает*.

| Эп. | Название | Грамматика | Сила | Тема лексики | Макс. длина | RU |
|---|---|---|---|---|---|---|
| S4E1 | Class Zero | comparatives (-er, more … than) | **Scale**: измерить противника | школа, оценки, тело/сила | 16 | 2 |
| S4E2 | The Worst Class | superlatives; as … as | титулы «the -est»; рейтинг класса | соревнование | 16 | 2 |
| S4E3 | You Must Not | must / mustn't / have to / don't have to | **Law / Ward**: печать-запрет; ловушка «don't have to ≠ mustn't» | правила, наказания | 16 | 2 |
| S4E4 | You Should Sleep | should / shouldn't; why don't you | совет; первый совет Системы | здоровье, усталость | 17 | 2 |
| S4E5 | She Is Going to Step Left | going to (намерение, предсказание по признакам) | **Intent-reading** | бой, движения | 17 | 2 |
| S4E6 | I Will | will / won't (обещание, решение на месте) | **Vow** со ставкой | обещания, дом | 17 | 2 |
| S4E7 | Before the Bell | when / before / after / until + present (о будущем) | план с опорными точками | расписание, подготовка | 17 | 2 |
| S4E8 | Lina Sings | повторение + can / will be able to | три якоря, возвращение Лины | музыка, семья | 17 | 2 |
| S4E9 | If You Step Here | first conditional | **If-trap** | ловушки, механизмы (инженерные слова: lever, rope, weight, balance) | 18 | 2 |
| S4E10 | Unless | unless; if + may/might | **Bargain**: контракты Одессы | договоры | 18 | 2 |
| S4E11 | The Dictation | всё будущее и условное в бою | финал турнира | — | 18 | 2 |
| S4E12 | Vow Kept | will vs going to; точность формулировки клятвы | клятва исполнена буквально | дом, дверь, мама | 18 | 2 |

---

#### 6. Сезоны 5–9 — на уровне арок

##### S5 — the Floor of Marks (A2+ → B1)
- **E1–E4: present perfect (опыт).** I have seen / never / ever. Сила **Mark**: сделанное оставляет след, действующий сейчас; титулы-достижения становятся активными. Лексика: опыт, путешествие, шрамы, достижения.
- **E5–E8: present perfect (результат и длительность).** just / already / yet; for / since; present perfect vs past simple. «Окна» этажа показывают, что *изменилось* дома с тех пор, как ты ушёл. Лексика: дом, быт, перемены, здоровье (мама забывает слова).
- **E9–E12: relative clauses (who / which / that / where) + used to.** Сила **Binding**: связать две вещи описанием; опоры моста — придаточные. Первый Мост = абзац из 5 предложений с who/that/where, который Дэн «читает вслух» (и ученик читает). Лексика: строительство (beam, support, span, load, joint, rope, anchor), описание людей.
- Чтение: первые «страницы» дневника Дэна-19 на английском (связный текст 80–120 слов). Слух: have/has в слабой форме, 've.
- Первое появление разговорных «стёртых слов» (gonna, wanna, gotta, kinda) в речи Tally и Пипа — только на узнавание; подготовка к манхве и фильмам.

##### S6 — the Floor of Works (B1) — технический английский
Сюжетная причина: это машинный этаж; инструкции к Прессу писали альпинисты-инженеры прошлых лет. Дэн наконец дома — в документации.
- **E1–E4: passive present / past** (is made, was sealed, are pressed). Сила **Curse / Unmask**: проклятия Башни — пассив без деятеля («You are forgotten»); вернуть деятеля («by whom?») — значит снять.
- **E5–E8: язык инструкций.** Imperative + порядок шагов; zero conditional (If the light is red, the valve is closed); must be + V3; make sure (that); before/after + -ing; infinitive of purpose (to stop the belt, press…). Сила **Manual**: прочитал правильно — машина слушается; ошибся в шаге — авария.
- **E9–E12: описания и спецификации.** is used for / is made of; relative clauses в определениях; числа, единицы, допуски; modal passive (can be / must be / should not be opened).
- **Технический словарь (≈160 слов за сезон, из них ~110 фокус):**
  - механика: lever, valve, gear, pipe, belt, switch, handle, bolt, spring, pump, engine, wheel, chain, hook;
  - действия: press, pull, turn, lift, lower, connect, disconnect, remove, replace, install, attach, tighten, loosen, adjust, check, measure, test, repair;
  - состояния: on / off, open / closed, full / empty, loose, tight, broken, damaged, safe, locked, stuck;
  - величины: pressure, temperature, speed, weight, length, width, height, level, load, limit, maximum, minimum, increase, decrease, per, equal;
  - конструкции (мир Дэна): beam, column, support, joint, frame, section, drawing, scale, dimension, tolerance, material, steel, concrete;
  - документация и софт: manual, guide, step, note, warning, caution, error, default, setting, option, version, update, file, folder, save, load, delete, select, enter, click, button, screen, menu, required, optional, enable, disable, input, output, value, range, table, figure, example.
- Жанр текста в сериях: таблички, шаги процедуры, журнал ошибок, предупреждения, «changelog» Башни. Система на этом этаже говорит регистром документации: `Warning. The valve must be closed before the belt is started.`
- Финальный экзамен сезона: Дэн читает и выполняет процедуру остановки Пресса из 12 шагов (S6E11–E12) — ученик читает её как настоящую документацию.

##### S7 — the Floor of Ifs (B1 → B1+)
- **E1–E4: second conditional; wish + past.** Комнаты «If I were…». Сила **Unreal**: увидеть ложную жизнь и выйти из неё, назвав её нереальной правильно.
- **E5–E8: reported speech** (said / told / asked + сдвиг времён). Сила **Testimony**: суд над Хранителем; свидетель обязан передать чужие слова честно. Тест на Speaker'а: попроси пересказать — он может только цитировать.
- **E9–E12: might / may / must be / can't be; so / such; although.** Сила **Deduction**. Письмо мисс Торн (связный текст 200+ слов).
- Чтение: протоколы, письмо, показания. Слух: would /wəd/, 'd; интонация сомнения.

##### S8 — the Floor of Regrets (B1+ → B2)
- **E1–E4: past perfect.** Сила **Deep Memory**: что *уже случилось до* самой ранней памяти. История Элиаса и Ханны.
- **E5–E8: third conditional; should have / could have.** Сила **Release**: назвать сожаление правильно — отпустить и вернуть дыхание. Каждый герой получает свою сцену.
- **E9–E12: mixed conditionals; повествовательные времена вместе.** Мира учит Дэна слову FINISH определениями (зеркало S1E12). Фокус-слова: finish, complete, the last part, give up, go on, at last, in the end.
- Чтение: главы «романа» Элиаса (300+ слов, литературный регистр). Слух: would've, had /əd/.

##### S9 — the Last Line (B2)
- **Нулевой русский.** Башня перестаёт переводить: «You don't need it now.»
- E1–E4: фразовые глаголы и идиомы высокой частоты (give up, go on, find out, turn into, come back, let go, look for, run out of, put off, take over) — как «двойные слова», которые бьют сильнее.
- E5–E8: регистры: официальный (Line), рыночный (Ledger), разговорный/сленг (Gutter), книжный (Элиас) — одна и та же мысль четырьмя способами; ученик учится узнавать тон.
- E9–E12: связный текст: абзац, связки (however, therefore, although, instead, finally), пунктуация как сила (точка завершает). Последний Мост — абзац из 8–10 предложений.
- Выход на реальные материалы: в эпилоге Дэн читает «настоящую» страницу манхвы (оригинальная, написанная для серии, без упрощений) и страницу документации; ученик читает их без подсказок.

##### Сквозные лексические дорожки (все сезоны)
- **Жанровая дорожка (манхва/игры)** — 10–15 слов за сезон, чтобы потом узнавать их в чужих тайтлах: S1 tower, floor, gate, power, weak, strong, rank(пассивно); S2 rank, level, guild, duel, skill, reward, quest, master; S3 memory, curse, seal, ruin, ancient, awaken; S4 academy, exam, tournament, opponent, champion, defeat, victory, promise; S5 title, achievement, legend, bond, ally, betray; S6 machine, core, system, error, command; S7 illusion, trial, witness, traitor, verdict; S8 regret, sacrifice, fate, origin; S9 author, ending.
- **Фильмы/разговор:** с S2 — сокращения; с S5 — gonna/wanna; с S7 — вставные слова (well, actually, I mean, you know) в речи Tally, Пипа, Рука.
- **Документация:** S2E7 (первая инструкция) → S4E9 (механизмы) → S6 (целый сезон) → S9 (страница реальной документации).

---

#### 7. Как приложение должно зеркалить прогресс ученика (идеи для реализации)

Ничего из этого не требуется для написания серий, но сюжет под это спроектирован.

1. **Два числа, как у Дэна.** `Book` = слова, которые ученик встретил (все леммы прочитанных серий). `Count` = слова, которые он *освоил* (прошёл N успешных повторений в тренажёре). Показывать их в окне Системы тем же дизайном: кремовая бумага, красная рамка.
2. **Формулы Системы — формулы интерфейса.** При первой встрече слова: `New word: X.` При освоении: `X is yours now. Count: N.` При долгом пропуске повторений слово «тускнеет»: `Warning. X is fading.` (в мире: связанное слово, которым не пользуются, сереет). После недели без занятий: `Count: … Again.` — без упрёка, сухо.
3. **Ранги ученика = ранги Башни.** Letter 1 · Word 25 · Phrase 100 · Clause 300 · Sentence 600 · Paragraph 1000 · Page 1500 · Chapter 2500 · Book 4000. Ранг-ап — полноэкранное окно `Rank up: PHRASE.`
4. **Пороги «Ask me when you have N words».** Короткие бонус-сцены «Ответ Системы» (3–5 панелей), которые открываются, когда *собственный* Count ученика достигает 100 / 300 / 600 / 1000. Основной сюжет порогами не блокируется (иначе бросит), но самый вкусный лор — за порогом.
5. **Breath = дневной ресурс.** Ошибки в квизе и тренажёре тратят дыхание; отдых (перерыв) и «лампа» (повторение старых слов) восстанавливают. Ноль дыхания: «Rest. Come back later.» — мягкий стоп вместо бесконечной зубрёжки.
6. **Titles = достижения.** «Happy Fool» (первая ошибка, исправленная со второй попытки), «Door-Pusher» (5 серий), «Loud» (первое озвученное вслух слово), «Almost» (бросил серию на последней панели и вернулся), «Teacher of One» (объяснил слово своими словами в задании-определении).
7. **`Almost.`** Если ученик закрыл серию, не дочитав 1–3 панели, при следующем входе окно: `Almost.` и кнопка «дочитать». Это прямая рифма с главной раной героя.
8. **Колодец кривых слов (с S3).** Мини-игра: «бросаешь» правильный глагол, выпадает случайная неправильная форма с редкостью (common / rare / twisted); собрать коллекцию из 24, потом из 60.
9. **Define (с S1E12).** Тип упражнения: слово закрыто шорохом (`...`), дано определение из известных слов → выбрать/написать слово. И обратное: дать слово → собрать определение из плиток. Это и есть «возврат проданного слова».
10. **Sentence power (с S1E10).** Упражнение «собери предложение из плиток»; верное — `Sentence: 5 words. True.`; с ошибкой порядка — буквы «трескаются» (анимация осыпания), показывается правка красной ручкой мисс Торн.
11. **Echo-повторение.** Реплики Nad и Лины в новых сериях собраны из старых фокус-слов; приложение может помечать такие слова как «встречено повторно» и засчитывать как пассивное повторение.
12. **Missed calls.** Счётчик дней без занятий в окне статуса называется так же. Не наказание — напоминание в тоне истории: «Missed calls: 3.»
13. **Квиз как дверь.** 4 вопроса после серии — «дверь» к следующей; при 3–4 верных `The door opens.`, при ≤2 — `The door wants more.` и предложение перечитать 2–3 ключевые панели (номера панелей можно хранить рядом с вопросом).
14. **Слух.** Каждая реплика — озвучка (TTS). В сериях со «слуховым фокусом» одна-две реплики сначала даются только звуком (персонаж в темноте / за дверью), текст открывается по тапу — в мире это мотивировано: Безмолвные и двери *слышат*.

---

#### 8. Правила уровня (кратко; примеры — в WRITING-GUIDE)

- **Новая грамматика серии** встречается в серии 8–14 раз, первая — в момент, когда она *нужна по сюжету*, последняя — в клиффхэнгере или прямо перед ним.
- **Грамматика из будущих серий запрещена.** Проверочный список запретов по сезонам:
  - S1: нет прошедшего (-ed, was, did), нет будущего (will, going to), нет continuous (-ing как время), нет perfect, нет сравнительных степеней, нет пассива, нет придаточных с who/which/that, нет if.
  - S2: до E8 нет прошедшего вообще; нет will/going to; нет comparatives; нет perfect, пассива, if.
  - S3: нет будущего, comparatives (кроме more/better как слов), perfect, пассива, if-условий.
  - S4: нет perfect, пассива, second conditional, reported speech.
  - S5: нет пассива (до S6), second/third conditional, reported speech.
  - S6: нет second/third conditional, reported speech со сдвигом.
  - S7: нет past perfect как темы (единичные had done допустимы в reported speech), нет third conditional.
- **Слова.** Каждое слово в английской строке должно быть в `data/words.json` (иначе валидатор даст ошибку). Фокус-слова — по таблицам выше; автор может заменить до 3 фокус-слов на серию, если сюжет требует, но только на слова той же частотности и уровня.
- **Числа** пишутся цифрами (валидатор цифры не считает словами), кроме zero–twelve, twenty, hundred в строках Count и там, где число — фокус-слово.
- **Имена собственные** новых персонажей добавляются в словарь как `pos: "name"`.

---

## 4.4 Сезон 1, эпизоды 6–12 (файл story/season-1.md, дословно)

### WORDBOUND — Сезон 1, эпизоды 6–12 (подробный план)

Эпизоды s1e01–s1e05 готовы и неизменны. Этот файл — точный план оставшихся семи серий сезона. Он **заменяет** краткий план E6–E12 из `story/bible.md` там, где они расходятся (расхождения небольшие и перечислены в конце, §9).

Как читать: у каждой серии — паспорт, список слов, раскадровка по панелям с черновыми английскими репликами, клиффхэнгер, идеи квиза, продвинутые тайны. Реплики написаны уже в рамках уровня; автор эпизода может шлифовать их, но **не менять смысл, порядок событий, слова-силы, цифры Count и формулы Системы**. Русские переводы реплик автор пишет сам; ключевые `narration-ru` даны по-русски.

Общие правила S1E6–E12:
- Грамматика только настоящего времени (на Этаже Имён нет прошлого и будущего). Никаких -ed, was/were, did, will, going to, -ing как времени.
- Система не задаёт вопросов и не говорит «I».
- Мира не произносит и не слышит слово *sister* до E12p8. Когда его говорят при ней — она слышит шорох.
- Слово *finish* не используется никем. Там, где оно «должно» прозвучать при Дэне, в реплике стоит `...`, а Система говорит `Almost.`
- `bg` — только из списка валидатора. Особые места задаются ключом `s1eNN:bg` в `story/visual.json` (описания есть в `series-bible.md` §5.2).
- Новые id персонажей для `data/story.json`: `pip` (silhouette `child`), `trader` (silhouette `male-large`). Лина-Эхо играет под id `silent` (в `art` писать «child-sized Silent with a frayed vermilion cord on the left wrist»). Nad тоже `silent` (в `art`: «the tall Silent with two round dents on its blank face and a strip of mustard-yellow lanyard around its neck»).
- Слова, которых нет в `data/words.json` и которые нужны в S1E6–E12 (добавить по мере использования): almost, pencil, whole, market, ink, roof, cheap, pay, poor, song, fix, rest, sing, teach, together, leave, forty, rank, class, builder, title, phrase, mine, pip, lina.

Счёт Дэна по сериям: E6 — 2 · E7 — 4 · E8 — 4 · E9 — 5 · E10 — 14 · E11 — 31 (ранг Word) · E12 — 100 (ранг Phrase, класс Builder).
Missed calls: E7 — 10 · E8 — 11 · E11 — 12 · E12 — 12 (звонок обрывается).

---

#### S1E6 — The Stair of Echoes / Лестница эха

- **CEFR:** A1. **Грамматика:** there is / there are + предлоги места (in, on, under, behind, up, down).
- **Сила:** Sight & Placement — правдивое «There is…» проявляет скрытое; первый штамп Системы `True.` STOP наконец связывается.
- **Новые слова (10):** there, up, down, under, behind, stairs, quiet, sound, write, boy.
- **Панелей:** 16. Полный JSON этой серии написан как образец: `data/episodes/s1e06.json` — он проходит валидатор и **главнее таблицы ниже** (при сокращении до 40 английских строк несколько проходных реплик из таблицы убраны, две слегка изменены; события и формулы те же).

| # | bg / mood | В кадре | Что происходит | Ключевые реплики (EN) |
|---|---|---|---|---|
| 1 | dungeon / tense | mira, silent (Лина) | Продолжение E5: маленькая Безмолвная тянет руку к Мире. Мира не может ни подойти, ни уйти. **RU:** «Мира не двигается. Перед ней — тот, кого она искала три года. И она не может сделать ни шага навстречу.» | Silent: «Mira. Come. It is cold.» · Mira: «I can't.» · Dan (мысль): «She can't say the word. I don't know the word.» |
| 2 | dungeon / action, CREAK | dan, system | Дэн толкает последнюю дверь — она сдвигается на ладонь и встаёт. | Dan: «Push! Push!» · System: «This door wants more. Not a word.» · Dan: «More what?» · System: «Almost. Ask me later.» |
| 3 | dungeon / action, STEP | dan, mira, silent | Сзади входят трое Безмолвных — пришли на имя Дэна. Дэн впервые *кричит* STOP в нужде: ближайший замирает. **RU:** про цену — у Дэна темнеет в глазах. | Mira: «They come. They are behind us.» · Dan (крик): «Stop!» · System: «STOP is yours now. Count: two.» |
| 4 | dungeon / action | dan, mira, silent | Дэн замечает боковую арку и ступени, тащит Миру. Лина-Эхо не идёт за ними. | Dan: «There is a way! Up there! Come!» · Silent: «Mira. Why do you run?» |
| 5 | corridor / calm | dan, mira | Установочный: Лестница эха — винтовая лестница в бумажной шахте. **RU:** описание места. | Dan: «So many stairs. Mira, are you OK?» |
| 6 | corridor / tense | dan, mira, system | Стена повторяет его «OK» — и от бумаги отделяется маленькая бледная фигура. Мира зажимает Дэну рот. **RU:** «Здесь каждое сказанное слово возвращается. И у эха вырастают руки.» | Narration: «The wall says it back: OK. OK. OK.» · System: «Every sound comes back here. Be quiet.» |
| 7 | corridor / calm | dan, mira | Жёлтый карандаш впервые в деле: переписка на обрывке страницы. | Narration: «Dan writes: No talk?» · Narration: «Mira writes: No sound. We go up. Slowly.» · System: «You write. Good. Paper is quiet.» |
| 8 | corridor / calm | dan, system | Комедия: Дэн рисует план лестницы; Система (она бумага — ей можно) язвит. | Dan (мысль): «There are many stairs. There is no wall on the left.» · System: «There are 300 stairs. You are slow.» · Dan (мысль): «Thank you. Very useful.» |
| 9 | corridor / tense | silent | Внизу: эхо-существо ползёт следом и повторяет голосом Дэна. | Silent: «OK. OK.» · Dan (мысль): «There is a thing behind us. It has my voice. Again.» |
| 10 | corridor / calm | dan, mira, pip | Пип: сидит на ступеньке под бумажным зонтом, говорит в полный голос — и эха нет. **RU:** «Вокруг мальчишки звук не возвращается. У него есть слово: QUIET.» | Pip: «Hello, slow people! You can talk here.» · Dan: «A boy? There is a boy on the stairs!» · Pip: «I am Pip. I sell quiet. One quiet, one word.» |
| 11 | corridor / calm | dan, pip | Торг. Пип хочет карандаш; Дэн отказывает и сам не понимает почему. | Dan: «I have two words. I need them.» · Pip: «Then give me the yellow pencil.» · Dan: «No. Not the pencil.» · Dan (мысль): «Why not? It is just a pencil.» |
| 12 | corridor / calm | dan, pip, system | Плата по-инженерски: Дэн видит пустоту под ступенями и называет её — она проявляется. Первый `True.` | Dan: «I give you a secret. There is a room under the stairs.» · Pip: «There is no room. I live here. I know.» · Dan: «There is a door behind that stone. Look down.» · System: «True.» |
| 13 | corridor / calm | dan, mira, pip | Идут вверх в «пузыре тишины». Пип сплетничает. | Pip: «OK. A good trade. Talk under my hand.» · Pip: «I know her. That is Mira. She sells her sister.» · Mira: «What does the boy say? I hear nothing.» · System: «She does not hear that word.» |
| 14 | corridor / tense | dan, pip | Дэн складывает всё вместе. **RU:** «Царапина на стене. Фреска. Красная нить. Дэн наконец знает слово, которого нет у Миры.» | Pip: «She sells the whole word. The Keeper has it.» · Pip: «The small Silent down there is Lina.» · Dan (мысль): «Lina. The red cord. Lina is her sister.» |
| 15 | corridor / tense | dan, mira, system | Мира оступается; красная нить у губ. | System: «Warning. Mira has two breaths.» · Dan: «Mira! Sit down! Stop!» · Mira: «I am OK. We go up.» |
| 16 | black / tense | dan, mira, pip | Мира падает Дэну на руки. Пип смотрит без жалости, как на погоду. | Pip: «Two breaths. Then no breath. Then she is a Silent.» · Dan: «Is there help up there?» · Pip: «There is a market up there. It is not free, Zero.» |

- **Клиффхэнгер (тип «цифра»):** у Миры два дыхания; помощь есть, но платная, а у Дэна два слова.
- **Квиз (идеи):** 1) Почему на лестнице нельзя говорить? (каждое слово возвращается эхом-существом) 2) Чем Дэн заплатил Пипу? (секретом о комнате под лестницей) 3) Что Пип рассказал о Мире? (продала слово «сестра») 4) Сколько дыханий осталось у Миры? (два)
- **Тайны:** сестра Миры (истина №1 наполовину); карандаш; `Almost.` (первое появление); последняя дверь «wants more»; Пип («Pip is not a name» — можно добавить в E7).

---

#### S1E7 — The Ink Market / Рынок Чернил

- **CEFR:** A1. **Грамматика:** how much / how many; множественное число; числа.
- **Сила:** Measure (цена и счёт). FIX — первое слово-ремесло. REST — слово, полученное в уплату за работу.
- **Новые слова (10):** buy, sell, money, much, many, fix, rest, phone, girl, sing.
- **Панелей:** 17. Новый персонаж в кадре: `trader`.

| # | bg / mood | В кадре | Что происходит | Ключевые реплики (EN) |
|---|---|---|---|---|
| 1 | street / tense | dan, mira, pip | Дэн выносит Миру на спине на широкую площадку-рынок. Никто не оборачивается. **RU:** место, запах чернил, равнодушие. | Dan: «Help! She has no breath!» · Pip: «Nobody helps here. They buy. They sell.» |
| 2 | street / calm | dan, pip | Установочный план рынка: ларьки, банки с одной красной искрой. | Pip: «This is the Ink Market. They sell words. They sell breath.» · Dan: «How much is a breath?» · Pip: «One breath, one word. Money is nothing here.» |
| 3 | street / tense | dan, trader, system | Ларёк с дыханием. | Trader: «Ten breaths, two words. A good price.» · Dan: «I have two words. I need them!» · System: «Count: two. You are poor.» |
| 4 | street / tense | mira, system | Мира на лавке, губы серые. | System: «Mira has one breath.» · Dan (мысль): «Think. What do I have? I have no money. I have no words.» |
| 5 | street / tense | dan, trader | Инженерный взгляд: балка навеса треснула, одна стойка ушла. **RU:** «Три года он считал чужие балки. Эта не доживёт до вечера.» | Dan: «Your roof is bad. That leg is weak. I can fix it.» · Trader: «My roof is good. Go away, Zero.» |
| 6 | street / action, CRACK | dan, trader | Навес с сотнями бутылок чернил начинает падать. | Trader: «My jars! My money!» · Dan: «How many jars? Too many!» |
| 7 | street / action | dan, system | Дэн: STOP на балку (держит три секунды), подпирает шестом, PUSH — и в нужде кричит новое слово. Трещина сшивается красными буквами. | Dan (крик): «Stop! … Push! … Fix!» · System: «New word: FIX. FIX is yours now. Count: three.» · System: «Big thing, big breath. Dan has three breaths.» |
| 8 | street / calm | dan, trader | Торговец поражён. Первая «дыра» в слухе Дэна. **RU:** «Одно слово торговца Дэн не расслышал — будто кто-то смял бумагу. Четвёртая стойка так и осталась кривой.» | Trader: «How many words do you have?» · Dan: «Three.» · Trader: «Three words! And you fix my roof. But you don't ... it. Look, one more leg.» · System: «Almost.» |
| 9 | street / calm | dan, trader, system | Плата. Торговец отдаёт красное слова REST (обмен за работу — честная сделка). | Trader: «A trade is a trade. I don't pay money. I pay a word.» · Trader: «REST gives breath. Say it to her.» · System: «New word: REST. REST is yours now. Count: four.» |
| 10 | street / calm | dan, mira, system | Дэн шепчет слово Мире; цвет возвращается в лицо. | Dan: «Rest, Mira. Rest.» · System: «Mira has six breaths.» · Dan (мысль): «I give her breath. I don't lose the word. Good.» |
| 11 | street / calm | dan, pip | Передышка и счёт: цены на хлеб, яблоки. Юмор. | Dan: «How much is the bread?» · Pip: «One word.» · Dan: «How many apples for one word?» · Pip: «Two. You have four words and no money. You are still poor.» |
| 12 | street / tense, RING | dan | Звонок. Тот самый рингтон. | Dan: «That sound. I know that sound.» |
| 13 | street / tense | dan, trader | На прилавке «вещей снаружи» — его телефон с треснувшим экраном. Голосовое сообщение. | Narration: «Mom: Dan, eat something.» · Dan: «That is my phone! That is my mom!» · Dan: «How much is the phone?» |
| 14 | street / tense | dan, trader, system | Цена и покупатель: высокий человек в чёрном пальто с латунной цепочкой и гроссбухом забирает телефон и уходит к дальней лестнице. **RU:** «Голос, который зовёт тебя снаружи, стоит здесь дороже любого слова. Дэн пока не знает почему.» | Trader: «The phone is not cheap. Twenty words. It has a voice from outside.» · Trader: «Sorry, Zero. That man buys it. He pays much.» · System: «Missed calls: 10.» |
| 15 | street / tense | dan, mira | Дэн рвётся следом; очнувшаяся Мира держит его за рукав. | Dan: «Stop him! That is my mom!» · Mira: «No. You have one breath. Think.» · Mira: «You give me breath. Not bad, Zero.» |
| 16 | street / calm | dan, mira, trader | Откуда телефон. | Dan: «Who sells you my phone?» · Trader: «A little girl sells it to me. She does not talk. She sings.» · Mira: «A girl? What does she sing?» |
| 17 | black / tense | mira | Издалека — тонкая песня без слов. Мира встаёт и идёт в темноту одна. **RU:** «Мира знает эту песню. Она сама её когда-то пела — тому, кто боялся темноты.» | Mira: «I know that song. Lina sings it every night.» · System: «The girl is near.» |

- **Клиффхэнгер (тип «голос»):** Лина рядом и поёт.
- **Квиз:** 1) Чем на рынке платят? (словами) 2) Как Дэн заработал слово REST? (починил крышу ларька) 3) Что продавали на прилавке «вещей снаружи»? (его телефон с голосом мамы) 4) Кто продал телефон торговцу? (маленькая девочка, которая не говорит, а поёт)
- **Тайны:** телефон (уходит к Ledger); счётчик Missed calls впервые; «слово, которого Дэн не слышит» — зацепка №1; Лина и её Deed-слово SING (расплата S4E8).

---

#### S1E8 — Lina / Лина

- **CEFR:** A1. **Грамматика:** my / your / his / her / our; me / him / her / us / them.
- **Сила:** Belonging — назвать, чьё что. Сил в бою нет: это серия-правда и серия-ссора.
- **Новые слова (10):** family, mother, father, child, love, friend, lie, true, alone, use.
- **Панелей:** 16. Флэшбеки (панели 3–6, 8) — тёплая «бумажная» палитра, `bg: white`, в `art` писать «memory scene in warm sepia paper tones». Мира рассказывает **в настоящем времени** — на этом этаже иначе нельзя.

| # | bg / mood | В кадре | Что происходит | Ключевые реплики (EN) |
|---|---|---|---|---|
| 1 | street / tense | dan, mira | Тупик за рынком. Песня стихла. На гвозде — обрывок красной нити. | Dan: «Mira. Who is Lina?» · Mira: «I can't say the word.» · Dan: «I can. She is your sister.» · Mira: «I hear nothing. But yes.» |
| 2 | room / calm | dan, mira | Ниша с лампой. Мира решается. **RU:** «Мира говорит быстро и ровно — как человек, который много раз рассказывал это самому себе.» | Mira: «I tell you. It is not a good story.» |
| 3 | white / calm | mira (память) | Память: две девочки на маленькой кухне. | Mira: «We are two. Me and Lina. Our mother is gone. Our father is gone.» · Mira: «She is my family. I am her family.» |
| 4 | white / calm | — | Память: на кухонной стене — дверь. Младшая тянется к ручке. | Mira: «A door comes. Lina opens it. She is a child. She loves doors.» |
| 5 | white / tense | — | Память: Башня, Лина поёт на ходу. | Mira: «She sings. She is loud. I tell her: be quiet. She sings.» |
| 6 | white / action | — | Память: Безмолвные; две руки расходятся (на рисунке **неясно, кто разжал пальцы** — это зацепка для S3E3). | Mira: «They come. I have no breath. They take her. They take all her words.» |
| 7 | room / tense | dan, mira | Настоящее. | Dan: «And the Keeper?» · Mira: «I go to him. He has a map to the last door. The map is not free.» |
| 8 | white / tense | keeper (память) | Память: Зал Слов; из груди Миры вырывают слово целиком; шнурок на запястье тускнеет. **RU:** «Даже в собственной памяти Мира не слышит, какое слово у неё забрали.» | Keeper: «One word, whole. I give you the map.» · System: «Word lost.» |
| 9 | room / tense | dan, mira | Зачем ей последняя дверь. Заявка на E10. | Mira: «Lina waits at the last door. And that door needs a sentence.» · Mira: «Nobody here can make a sentence. We buy our words. They don't go together.» |
| 10 | room / tense | dan, mira | Правда про Zero. | Mira: «The Keeper tells me: wait for a Zero. A Zero learns his words. A Zero can open that door.» · Dan: «So you wait for me.» · Mira: «I wait three years.» |
| 11 | room / tense | dan, mira | Дэн понимает. Цитата из E2. | Dan: «You don't help me. You use me.» · Mira: «Yes.» · Dan: «"One day. Zero is useful."» · Mira: «It is true. I don't lie to you now.» |
| 12 | room / action | dan, mira, system | Ссора. | Dan: «My name! My OPEN! You know his price!» · Mira: «I tell you: don't talk to him!» · Dan: «I am not your key! I am not your friend!» · System: «Quiet. They hear you.» |
| 13 | corridor / tense | dan, mira | Дэн уходит. Мира хочет побежать за ним — и не может (Дыра: она не умеет удерживать своих). | Dan: «Find your door alone.» · Mira: «Zero. Wait.» · Mira (мысль): «I don't run after him. Why can't I?» |
| 14 | corridor / calm | dan, system | Дэн один. | System: «You are alone. That is a bad plan.» · Dan: «Her plan is bad too. I am her plan.» · System: «Missed calls: 11.» · Dan (мысль): «Mom. I love you. I never say it to you.» |
| 15 | corridor / tense | dan, silent (Лина) | Маленькая фигура берёт его за рукав. | Silent: «Come.» · Dan: «Lina? I am not Mira. Mira is there.» · Silent: «Come. You.» |
| 16 | black / tense | dan, silent, system | Щель красного света в стене. **RU:** «Она ведёт его не к сестре. Она ведёт его туда, куда три года водила пальцем по камню.» | Silent: «Look.» · System: «Warning. This place is not on Mira's map.» |

- **Клиффхэнгер (тип «не тот человек / не то место»):** Эхо Лины ведёт Дэна прочь от Миры — к Стене Букв.
- **Квиз:** 1) Какое слово Мира отдала Хранителю? (сестра) 2) Что она получила взамен? (карту к последней двери) 3) Зачем Мире нужен Зеро? (только он может составить предложение для двери) 4) Кто увёл Дэна в конце? (маленькая Безмолвная — Лина)
- **Тайны:** истина №1 раскрыта полностью; заявлено «купленные слова не складываются»; рука в памяти (ложь Миры себе, расплата S3E3); «I never say it to you» (Need Дэна).

---

#### S1E9 — The Wall of Letters / Стена Букв

- **CEFR:** A1. **Грамматика:** and / but / because.
- **Сила:** Links — первая цепочка (два слова на одном дыхании); приказ с правдивой причиной. READ связывается.
- **Новые слова (10):** because, but, letter, sentence, learn, speak, voice, first, tower, build.
- **Панелей:** 16. Место: `s1e09:tower-exterior` (Wall of Letters).

| # | bg / mood | В кадре | Что происходит | Ключевые реплики (EN) |
|---|---|---|---|---|
| 1 | tower-exterior / calm | dan, silent | Открывается исполинская внутренняя стена из букв. **RU:** масштаб. | Dan: «It is a wall. But it is not a wall. It is... letters.» |
| 2 | tower-exterior / calm | dan, system | | System: «This is the Wall of Letters. Every lost word comes here.» · Dan: «Why?» · System: «Because the Tower builds with words.» |
| 3 | tower-exterior / tense | dan, system | Буквы плывут; Дэн заставляет себя прочесть верхнюю строку. | Dan: «I can read it! "I am"... and then nothing.» · System: «READ is yours now. Count: five.» |
| 4 | tower-exterior / tense | dan, system | Главное раскрытие (истина №2). | System: «The Tower is not a house. The Tower is a sentence.» · System: «A long sentence. It is not done.» · System: «It takes words because it can't make them.» |
| 5 | tower-exterior / tense | dan, system | Истина №3. | Dan: «And you? What are you?» · System: «This voice is the Tower's first word.» · System: «But this voice does not take. It learns.» |
| 6 | tower-exterior / tense | dan, silent | Лина-Эхо касается стены: внизу среди тысяч имён светится LINA; пробел после «I AM» мигает, примеряя имена. | Narration: «The wall speaks: I am Lina. I am Dan. I am...» · Dan: «It tries names. Because it has no name!» |
| 7 | tower-exterior / calm | dan, system | Фоном — старая фреска: два мальчика и мост без правого берега. Дэн, инженер, не может не заметить. | Dan: «Nice bridge. But there is no end. They don't ... it.» · System: «Almost.» · Dan: «What?» · System: «Nothing. Ask me later.» |
| 8 | tower-exterior / action | dan, silent, system | По карнизу идут Пустые — на голос. У Дэна четыре дыхания. Первая цепочка: STOP на переднего и PUSH на каменный блок, который перегораживает карниз. | Dan (крик): «Stop and push!» · System: «Two words. One breath and a half. Because of AND.» · Dan: «AND is a good word!» · System: «AND is a small word. Small words are free.» |
| 9 | tower-exterior / tense | dan, system | Маленькая дверца в стене не слушает команды — слушает причину. Проба будущей «двери-предложения». | System: «This door hears a reason.» · Dan: «Let me in, because I am Dan and I learn.» · System: «True.» |
| 10 | room / calm | dan, system | Ниша, где стена «кладёт» новые слова. Прилетает красное OK — голосом Дэна с Лестницы. | Dan: «That is my OK! That is my voice!» · System: «The Tower learns from you. It keeps every word you say.» |
| 11 | room / calm | dan, system | Тема серии — третья экономика. | Dan: «But I don't lose them.» · System: «No. You speak. It learns. Nobody loses. That is new.» · System: «The others buy and sell. You learn. The Tower likes it.» |
| 12 | room / calm | dan, silent | Лина-Эхо кладёт его ладонь на своё имя в стене, потом показывает вверх. | Dan: «You want your name. But I can't take it. It is in the wall.» · Silent: «Mira.» · Dan: «You want Mira. But I don't like her now.» |
| 13 | room / calm | dan, system | Внутренний спор — на and / but. | Dan (мысль): «She uses me. But she gives me bread.» · Dan (мысль): «She lies, and she is my first friend here.» · System: «Two true things.» |
| 14 | tower-exterior / calm | dan, silent | Решение. | Dan: «OK. We find her. Because she is alone, and I know alone.» |
| 15 | tower-exterior / tense | dan, system | В пробеле верхней строки сами собой встают огромные буквы. **RU:** «Три буквы. Его буквы.» | System: «Warning.» · Dan: «That is my name. On the wall. Why?» |
| 16 | black / tense | — | Стена говорит голосом Дэна — его же фразами из первой ночи. | Narration: «The wall speaks: I am Dan. I am not weak. I am tired.» · Dan: «That is my voice. I say that... on the first night.» · System: «The Tower learns to speak. It learns from you.» |

- **Клиффхэнгер (тип «чужими устами»):** Башня примеряет имя Дэна и говорит его голосом.
- **Квиз:** 1) Что такое Башня на самом деле? (незаконченное предложение) 2) Почему Башня забирает слова? (не умеет делать свои) 3) Что дало слово AND? (два слова за одно дыхание с половиной) 4) Чьим голосом заговорила стена? (голосом Дэна)
- **Тайны:** истины №2 и №3; фреска двух мальчиков (истина №8, зацепка); `...` №2; третья экономика заявлена; LINA в стене (её имя уже ушло наверх — S2).

---

#### S1E10 — The First Sentence / Первое предложение

- **CEFR:** A1. **Грамматика:** порядок слов «кто + делает + что».
- **Сила:** Sentence — любое правдивое предложение стоит одно дыхание и делает простые слова своими. Счёт Дэна начинает расти пачками.
- **Новые слова (10):** make, find, close, hold, strong, new, breath, fight, every, last.
- **Панелей:** 16.

| # | bg / mood | В кадре | Что происходит | Ключевые реплики (EN) |
|---|---|---|---|---|
| 1 | corridor / calm | dan, mira, silent | Мира находит их. Видит Лину рядом с Дэном и останавливается в трёх шагах. | Mira: «You find her.» · Dan: «She finds me.» |
| 2 | corridor / calm | dan, mira | Первое «sorry» Миры. | Mira: «I am sorry, Zero.» · Dan: «I don't like your plan. But I have a new plan.» · Mira: «What plan?» · Dan: «We make a sentence.» |
| 3 | corridor / tense | mira, silent, system | Мира не может подойти к сестре. **RU:** про Дыру: проданное слово заставляет обходить то, что оно называло. | System: «Mira holds her cord. She does not hold the child.» · Mira: «I can't. I don't know why.» |
| 4 | corridor / tense | dan, mira, system | Железная дверь на пути назад к последнему залу. | Dan: «Push!» · System: «This door is strong. PUSH is weak here.» · Mira: «Say OPEN.» · Dan: «I can say it. It does nothing. The Keeper has it.» |
| 5 | corridor / calm | dan | Инженерное озарение. **RU:** «Слово — это камень. Но стену держат не камни, а кладка.» | Dan (мысль): «One word is one stone. A wall is not one stone.» · Dan (мысль): «The Tower makes a sentence. I can make a sentence too.» |
| 6 | corridor / calm | dan, mira | Дэн раскладывает схему вслух. | Dan: «Who? I. What do I do? Open. What? The door.» · Mira: «Words don't go together. Nobody can make them.» · Dan: «You buy your words. I learn my words. They are mine.» |
| 7 | flash / action | dan | Красные буквы выходят не вспышкой, а ровной строкой; дверь тихо открывается. | Dan: «I open the door.» · System: «Sentence: 4 words. True. One breath.» |
| 8 | corridor / calm | dan, mira, system | | Mira: «One breath? For that door? You have no OPEN!» · Dan: «I don't need a strong word. I need a true sentence.» · System: «A true sentence makes plain words yours. DOOR is yours now. Count: six.» |
| 9 | corridor / calm | dan, mira, system | Дэн в восторге пробует ещё и ещё (монтаж в одном кадре). | Dan: «I close the door. I open the door. I hold the lamp. I find the key!» · Mira: «Stop. You play.» · Dan: «I learn!» · System: «Count: 14.» |
| 10 | corridor / calm | dan, mira, system | Мира пробует — без артиклей трескается; Дэн *учит* её бесплатно. Её первая в жизни фраза-сила и почти-улыбка. | Mira: «I... open... door.» · System: «Not true. That is not a sentence.» · Dan: «The small words are free. Say "the". Say it with me.» · Mira: «I open the door.» |
| 11 | dungeon / tense | dan, mira, keeper, (silent) | Последний зал. Лампы сметены. Хранитель стоит — впервые не в кресле. За ним шеренга Безмолвных; рядом высокий, с жёлтой полоской на шее. | Silent: «I am Dan.» · Keeper: «A new sentence, Zero. Every jar in my hall hears it.» |
| 12 | dungeon / tense | dan, keeper | | Keeper: «Forty years, and nobody makes a new sentence here.» · Keeper: «I need one more word. Your name. Give it to me.» · Dan: «No trade.» |
| 13 | dungeon / action | dan, mira, silent | Бой. Предложения дёшевы, но каждое — на одного врага; врагов много. | Keeper: «Then no trade. They take it.» · Dan: «I stop the Silent! I close the way!» · Mira: «Don't fight them all! Hold the door!» · System: «Dan has two breaths.» |
| 14 | dungeon / action | dan, mira, silent | Nad идёт к Дэну; Мира встаёт между ними и тратит всё на один крик. | Silent: «I am Dan. I am Dan.» · Mira (крик): «Stop! Every one of you!» · System: «Mira has no breath.» |
| 15 | dungeon / tense | mira, silent, keeper | Безмолвный склоняется над упавшей Мирой и говорит её голосом. | Silent: «I am Mira.» · System: «Word lost: MIRA.» · Keeper: «Not the name I want. But a name is a name.» |
| 16 | black / tense | dan, mira, keeper | Мира открывает рот — имени нет. Лина-Эхо зовёт имя, которое теперь ничьё. | Mira: «I am... I am...» · Silent: «Mira? Mira?» · Keeper: «Come to my hall, Dan. Bring your name. Then she has hers.» · System: «Mira is Zero now.» |

- **Клиффхэнгер (тип «окно Системы» + потеря):** Мира — Zero.
- **Квиз:** 1) Почему PUSH не открыл железную дверь? (дверь слишком сильная для одного слова) 2) Сколько дыханий стоило предложение? (одно) 3) Почему у Миры сначала не получилось? (сказала без маленьких слов — это не предложение) 4) Чьё имя забрали в конце? (Миры)
- **Тайны:** «I need one more word» = DAN; Nad снова в кадре; купленные слова не складываются (подтверждено); Мира получила первое *выученное* умение — от Дэна.

---

#### S1E11 — The Keeper's Door / Дверь Хранителя

- **CEFR:** A1. **Грамматика:** want to / have to / need to + глагол.
- **Сила:** Will — правдивое «I want to…» связывает слова; «have to» — закон Башни. Предел силы: предложение не может сделать то, что неправда («I take the jar» — `Not true.`).
- **Новые слова (10):** home, choose, stay, leave, remember, forget, call, year, old, young.
- **Панелей:** 16. Хранитель рассказывает свою историю в настоящем времени, короткими фразами.

| # | bg / mood | В кадре | Что происходит | Ключевые реплики (EN) |
|---|---|---|---|---|
| 1 | room / tense | dan, mira | Комната с лампой. Мира без имени. | Dan: «You are Mira.» · Mira: «I hear it. It is not mine. It is a sound.» · Dan: «I have to go to him.» · Mira: «You don't have to. You want to. Don't.» |
| 2 | room / calm | dan, pip | Пип признаётся. Смешно и грустно. | Pip: «He waits for you. He always wants a name.» · Pip: «I tell him things. He gives me bread. Sorry. A little.» · Pip: «I need to eat!» |
| 3 | corridor / calm | dan, pip, system | Лина-Эхо остаётся с Мирой. Пип ведёт короткой дорогой. | Dan: «Stay with her.» · Dan: «I need to make a plan.» · System: «You have 14 words and no plan.» |
| 4 | hall / tense | dan, keeper | Зал Слов, половина полок темна. Банка с именем MIRA на подлокотнике. | Keeper: «Welcome, Dan. You want to trade now.» · Dan: «I don't want to trade. I want to know. Who are you?» |
| 5 | hall / calm | keeper | История (истина №4, первая половина). | Keeper: «A good question. I am the first Zero.» · Keeper: «I come here a young man. No words. No friend.» · Keeper: «Now I am old. Forty years in this hall.» |
| 6 | hall / calm | dan, keeper | | Keeper: «I make the rule. One word, one name. Because I have to live.» · Keeper: «Every year I want to go home.» · Dan (мысль): «He wants what I want.» |
| 7 | hall / tense | dan, keeper | Правило двери. | Dan: «You have the door. You have OPEN. Go home.» · Keeper: «The door needs two people. One remembers. One calls.» · Keeper: «Nobody calls my name. And I don't remember it.» |
| 8 | hall / tense, RING | dan, keeper, system | За печатями — глухой звонок. | Keeper: «But your mother calls. Every hour she calls "Dan".» · System: «Missed calls: 12.» |
| 9 | hall / tense | dan, keeper | План Хранителя целиком. | Keeper: «Your OPEN. Your name. Your mother's call. With them I go home. As Dan.» · Dan: «She knows her son!» · Keeper: «The door makes me her son. She sees Dan. She hears Dan.» |
| 10 | hall / tense | dan, keeper | Предложение первое. | Keeper: «Give me your name. Whole. I give Mira her name.» · Keeper: «You stay here. I go home to your mother. She is not alone. Is that bad?» |
| 11 | hall / tense | dan, keeper | Предложение второе. Здесь же — зацепка истины «купленная дверь стирает память». | Keeper: «Or you go home. Now. You leave, and you forget the Tower. It is a dream.» · Keeper: «And I keep Mira's name. One name has to stay with me. You have to choose.» |
| 12 | hall / action | dan, keeper, system | Дэн пробует силой — и узнаёт предел. | Dan: «I take the jar!» · System: «Not true. Two breaths lost.» · Keeper: «You can't take, Dan. A trade is a trade.» |
| 13 | hall / tense, CRACK | dan, keeper | Хранитель произносит OPEN; печати трескаются; в щели — офис, суббота, звонит телефон на столе. | Narration: «Mom: Dan? Dan, call me. Please.» · Dan: «Mom!» |
| 14 | hall / tense | dan, system | Каждое правдивое «хочу» связывает слова. Ранг-ап. | Dan (мысль): «I want to go home. I need to call her. I want to remember her voice.» · System: «True. True. True. Count: 31.» · System: «Rank up: WORD.» · Dan (мысль): «And Mira has no name because of me.» |
| 15 | hall / tense | dan, mira, pip | У входа — Мира, её ведёт Пип. Она видит открытую дверь. | Mira: «Zero. Go.» · Dan: «You have no name!» · Mira: «I have three years here. You have a mother. Go home.» |
| 16 | black / tense | dan | Рука Дэна на краю двери, свет офиса на лице. | Keeper: «Choose, Dan.» · Mira: «Zero. Go.» · System: «You have to choose. This voice can't help.» |

- **Клиффхэнгер (тип «выбор»):** рука на двери домой.
- **Квиз:** 1) Кто такой Хранитель? (первый Зеро, 40 лет в Башне) 2) Что нужно двери домой? (два человека: тот, кто помнит, и тот, кто зовёт) 3) Что Хранитель хочет сделать с именем Дэна? (уйти домой вместо него, к его маме) 4) Что сказала Мира в конце? («Зеро. Иди.»)
- **Тайны:** истина №4; правило Двери Возврата; «уйдёшь — забудешь Башню» (ключ к истине №8); у Хранителя нет имени и некому его звать (расплата S8–S9).

---

#### S1E12 — Sister / Сестра (финал сезона)

- **CEFR:** A1. **Грамматика:** 's (Lina's mother); X means Y; повторение сезона.
- **Сила:** True Naming (три правдивых предложения возвращают имя) и Define (определение возвращает проданное слово). Последняя дверь. Ранг Phrase, класс BUILDER.
- **Новые слова (10):** sister, mean, teach, hear, together, back, again, hundred, answer, same.
- **Панелей:** 18.

| # | bg / mood | В кадре | Что происходит | Ключевые реплики (EN) |
|---|---|---|---|---|
| 1 | black / tense | dan | Рука на двери. Он оборачивается. Мотив «One minute» — в последний раз в сезоне. | Dan: «Mom. One more minute. I am sorry.» · Dan: «I don't go.» |
| 2 | hall / tense | dan, keeper | | Keeper: «Then give me your name.» · Dan: «No. I don't trade. I don't take. There is a new way.» · Keeper: «There is no new way. I know. Forty years.» |
| 3 | hall / tense | dan, mira | True Naming: три правды о человеке. | Dan: «Listen. You are Mira. You climb. You count every breath.» · Mira: «It is a sound.» · Dan: «You say "Loud is dead". You give me your bread. You wait three years for one girl.» |
| 4 | hall / action, CRACK | dan, mira, keeper, system | Банка на подлокотнике лопается; красная нить возвращается Мире в грудь. | Dan: «Who are you?» · Mira: «I am... I am Mira!» · System: «MIRA comes back. No trade.» · Keeper: «That is not a trade! Who pays?» |
| 5 | hall / action | dan, mira, silent | Хранитель зовёт Безмолвных. Между ними и героями встаёт маленькая фигура. | Dan: «Nobody pays.» · Keeper: «Then they take it all.» · Silent: «Mira.» |
| 6 | hall / tense | dan, mira | | Dan: «Mira. The child. Who is she?» · Mira: «She is my... I can't hear the word.» · Dan: «I can't give you the word. But I can teach you.» |
| 7 | hall / calm | dan, mira | Define. Самая важная учебная сцена сезона: определение из известных слов. | Dan: «Lina is a girl. Your mother is her mother. Your father is her father.» · Mira: «My mother is Lina's mother...» · Dan: «The same family. What does it mean?» |
| 8 | flash / calm | mira, system | **RU:** «Слова нет. Но смысл — вот он, целый, и никто не может его купить.» Слово возвращается. На дальней полке лопается банка. | Mira: «It means... she is mine. I am hers. She is my... sister.» · System: «New word: SISTER. SISTER is yours now.» |
| 9 | hall / calm | mira, silent, system | Мира впервые подходит к сестре и берёт её за руку (Дыра закрылась). Лина говорит **своим** голосом. **RU:** «Это не чужой голос. Это её собственный — тонкий, охрипший от трёх лет молчания.» | Mira: «Lina. I am your sister. I am here.» · Silent: «Mira. ...Sister.» · System: «The child has two words. They are hers.» |
| 10 | hall / tense | dan, keeper | Третья экономика названа вслух (истина №5). Банки вокруг мерцают. | Keeper: «You teach her. You give, and you still have it.» · Dan: «Yes. I teach. She learns. Nobody loses.» · Keeper: «Then every jar here is a lie.» |
| 11 | hall / calm | dan, keeper, system | Цена выбора: звонок обрывается, дверь домой закрывается сама. | System: «The call ends. The door closes.» · Keeper: «You lose your way home, Dan.» · Dan: «Then I build a new way.» |
| 12 | dungeon / tense | dan, mira, silent, system | Последняя дверь этажа. | System: «Count: 97. The last door wants a new sentence.» · Dan: «Together. Say it with me.» |
| 13 | flash / action, BOOM | dan, mira, silent | Одно предложение на троих. | Dan: «I am Dan,» · Mira: «and I am Mira,» · Silent: «Sister.» · Dan: «and we open this door together, because we go up.» |
| 14 | sky / calm | dan, system | Дверь уходит вверх, за ней лестница света. Полное окно статуса (в `art`: большое окно Системы, текст добавляется позже). | System: «Sentence: 18 words. True. Count: one hundred.» · System: «Rank up: PHRASE. Class: BUILDER.» · System: «Title: Teacher of One.» |
| 15 | sky / calm | dan, system | Ответ на «Why me?» — первое длинное предложение Системы. | Dan: «One hundred words. Now answer. Why me?» · System: «Because you have zero words and you learn every word, and the others only buy and take, and the Tower wants to learn too.» · Dan: «That is a long sentence.» · System: «It is the first. Don't tell Mira.» |
| 16 | sky / tense | dan, system | Крючок на S2 (истина №8). | System: «And because you are here again.» · Dan: «Again? What does "again" mean?» · System: «Ask me when you have 300 words. It is a long answer. It needs words you don't have.» |
| 17 | corridor / calm → tense | dan, mira, silent | Подъём. Мира впервые с E1 называет его по имени. За их спинами в закрывающуюся дверь проскальзывает высокая тень с жёлтой полоской. | Mira: «Thank you, Dan.» · Mira: «...Zero.» · Silent: «I am Dan.» |
| 18 | black / tense | dan, system | Сверху — мамин голос. Сначала знакомая фраза, потом фраза, которой мама никогда не говорила (истина №6). | Narration: «A voice from above: Dan. Eat something.» · Dan: «Mom?» · System: «That is not your mother. That is the Tower. It has her voice.» · Narration: «The voice: Dan. Come up. Mom waits, because you learn.» |

- **Клиффхэнгер сезона (двойной):** «You are here again» + Башня маминым голосом составляет новое предложение по грамматике Дэна.
- **Квиз:** 1) Как Дэн вернул Мире имя? (сказал о ней три правдивых предложения — без обмена) 2) Как Мира вернула слово «сестра»? (Дэн объяснил его другими словами) 3) Какой класс получил Дэн? (Builder) 4) Чей голос звал Дэна сверху? (Башня голосом мамы)
- **Тайны:** расплата по «сестре», «one more word», «Why me?» (первый слой), «последней двери»; открыты: «Again», Nad идёт следом, Башня сочиняет, телефон у Ledger, имя LINA наверху, дверь домой потеряна.
- **Сверка длины:** самая длинная реплика сезона — ответ Системы (25 слов) — сознательное исключение из лимита в 12 слов: это событие («It is the first»). Реплика двери (панель 13) разбита на четыре короткие строки.

---

#### 9. Отличия от краткого плана в `bible.md` (и почему)

| В bible.md | Здесь | Причина |
|---|---|---|
| E6: Мира падает, «осталось два слова дыхания» | то же; добавлены STOP (связывание), первый `True.`, торг за карандаш | закрыть канон-нестыковку со STOP; посадить карандаш |
| E7: Дэн получает REST; телефон на рынке | то же; телефон покупает агент Ledger; появляется счётчик Missed calls | мост в S2; таймер реального мира |
| E8: флэшбек, ссора, Эхо уводит | то же; флэшбек рассказан в настоящем времени; в кадре с руками — двусмысленность | грамматический замок этажа; секрет №2 Миры |
| E9: Стена повторяет голос Дэна | то же; плюс первая цепочка с AND, дверь «с причиной», фреска мальчиков | грамматика → сила; зацепка первого визита |
| E10: «I open the door»; Хранитель забирает имя Миры | то же; имя Миры забирает Безмолвный (Nad) в бою, Хранитель получает его как трофей | Хранитель не может брать силой («A trade is a trade») |
| E11: билет домой в обмен на «Mira» | два предложения: (1) имя Дэна за имя Миры — и Хранитель уходит к маме Дэна; (2) Дэн уходит домой, имя Миры остаётся у Хранителя | логика Двери Возврата; ставка выше |
| E12: Дэн «создаёт собственную дверь», говорит sister за Миру | Дэн возвращает имя Истинным именованием, а слово — определением; дверь домой закрывается; последнюю дверь открывают втроём | главная идея серии (учение) должна победить торговлю делом, а не чудом |
| E12: Count 100, ответ «Why me?» | то же; плюс «again» и порог 300 | капельница тайн на S2 |
| финал: телефон звонит вверху | голос мамы идёт от самой Башни и говорит *новую* фразу | страшнее и точнее по теме: Башня учится грамматике у Дэна |

---

## 4.5 Сезоны 2–4 и дальше до финала (файл story/seasons-2-4.md, дословно)

### WORDBOUND — Сезоны 2–4 по эпизодам, сезоны 5–9 по аркам, финал

Мир, персонажи и правила — в `series-bible.md`. Грамматика, длина фраз, темы слов — в `curriculum.md` (там же таблицы по сериям; здесь грамматика указана кратко). Этот файл — **сюжет**. Каждый абзац — одна серия: события → слова → грамматика/сила → что получил Дэн → клиффхэнгер.

Обозначения: **Count** — связанные слова Дэна на конец серии. **MC** — Missed calls. Цитаты Nad — дословные реплики Дэна из прошлых серий (автор берёт их из готовых JSON).

---

### СЕЗОН 2 — THE FLOOR OF DEEDS (город Margin). A1 → A1+

**О чём сезон.** Дэн впервые *кто-то*: «Zero, который возвращает проданные слова». Все хотят его купить, запретить или украсть. Он унижен при всём городе, собирает семью из тех, кого не взяли никуда, и расплачивается — не силой, а тем, что умеет объяснять. Цель Миры: имя LINA, проданное наверх. Цель Дэна: телефон с голосом мамы.

**Структура.** E1–E3 прибытие, унижение, дно. E4–E6 наставница, семья, работа, первые следы Nad. **E7 — мидпойнт: расплата на the Proof и арест.** E8–E9 суд и следствие. E10–E11 аукцион и ловушка. E12 — босс, дверь, «You were here».

**Физика этажа.** Всё происходит *сейчас*. Скажи о ком-то правдивое «-ing» — над ним на миг вспыхнет его действие (Now-sight). Длящееся «I am holding…» держит эффект, пока держишь фразу (Channel), по дыханию за несколько секунд. У лестницы наверх «протекает вчера»: там начинают работать was/were и -ed.

##### S2E1 — Margin / Поля
Лестница света выводит в вертикальный город на полках внутренней стены: дома как строки, канатные лифты, всё движется. Дэн замечает, что над людьми вспыхивают их действия, когда он проговаривает их: «He is running. She is selling. They are watching us» — Now-sight. Лину приходится прятать под шарфом Миры: Безмолвных в городе «утихомиривают» на месте. На площади — доска the Index: Дэн на самой последней строке, «#40112 · DAN · PHRASE · 100», титул *Lowest on the Index*; первая строка доски пустая. Старик у доски: «The top moves. Every year it moves.» **Слова:** город, движение, люди. **Грамматика:** present continuous (утв.). **Count 100.** **Клиффхэнгер:** глашатай Ledger читает объявление: за «Zero, who teaches lost words» — награда 500 слов; вся площадь оборачивается: «They are looking at you, Zero.»

##### S2E2 — The Auditor's Son / Сын аудитора
Рук Марл выходит из толпы: чёрное пальто, ряд значков, мамин телефон Дэна в руке — «Is this yours?». Он не сдаёт Дэна за награду — он хочет победить его сам. Словесная дуэль по правилам Margin: каждый ставит одно связанное слово, судит the Line. Дэн различает, что Рук *обычно* делает (Rule: «He always attacks first») и что делает *сейчас* (Now: «He is not looking at me. He is looking at the crowd») — но тяжёлые купленные слова Рука (SHIELD, CRUSH) просто давят его лёгкие предложения. Дэн проигрывает ставку — PUSH; Рук брезгливо бросает его в свой гроссбух: «Cheap.» **Слова:** дуэль, богатство и бедность, одежда. **Грамматика:** continuous ?/–, simple vs continuous. **Count 99 — ниже порога: Система сухо: «Count: 99. Rank: WORD.» Значок Phrase гаснет при всём городе.** **Клиффхэнгер:** Рук уходит с телефоном; из динамика мамин голос: «Dan? Are you eating?» — и Система: «Missed calls: 14.»

##### S2E3 — Soup / Суп
Дно: ни денег, ни жилья, награда за голову. Пип (поднялся воровской лестницей) приводит их в the Gutter — щель под городом между двумя колоннами, где живут Unwritten. Кухня Супа: огромный тихий человек кормит всех, у кого нет слов, под лампой, горящей на его отданном слове. Он наливает всем, сам не ест — «I am not hungry. I am never hungry» (Дыра). Уроки some/any за столом: «Is there any bread? There is some soup. There isn't any salt.» Дэн чинит ему вытяжку — и снова бросает последний винт; Суп: «You don't … things, do you?» — шорох; Система: `Almost.` Дэн пишет на стене благодарность — и утром находит её исправленной красной ручкой: три ошибки. Система: «Keep the pencil.» **Слова:** еда, кухня, делиться. **Сила:** Measure (сколько дыхания у кого). **Count 112.** **Клиффхэнгер:** в дверях маленькая седая женщина с красной ручкой: «Three mistakes in one sentence, dear. Shall we begin?»

##### S2E4 — The Red Pen / Красная ручка
Мисс Торн. Бывшая №3 Индекса, вычеркнувшая себя, учит Ненаписанных бесплатно. Первый урок — 's и whose: «This is Dan's pencil. Whose word is this?» Она показывает силу **Trace**: правильно заданный вопрос «Whose word is it?» протягивает тонкую красную нить от купленного слова к его первому владельцу. Дэн пробует на городе: нить от Рукова SHIELD уходит вниз — к старику из Gutter, который три года не может сказать «щит». Рук это видит и делает вид, что нет. Мисс Торн демонстрирует **Correction**: ломает чужую фразу, отметив ошибку. На вопрос Дэна, почему она не идёт наверх: «I have my reasons, dear. Next sentence.» **Слова:** школа, вещи, принадлежность. **Count 124.** **Клиффхэнгер:** Мира пробует Trace на афише аукциона — нить от лота «a child's name» тянется к Лине под шарфом. Имя LINA продают через семь дней.

##### S2E5 — I Would Like a Name / Мне, пожалуйста, имя
Чтобы войти на аукцион, нужен взнос 300 слов или лот победителя the Proof — городского испытания на пропуск к двери этажа. Дэн идёт на доску заказов: вежливые формулы («I would like a job, please. Could I see the lift?») открывают людей там, где команды только злят — **Soft Key**. Монтаж работы: он чинит лифты, блоки, мостки (инженер наконец на своём месте), и Count растёт на глазах; Система отмечает каждое новое слово. Мира учится говорить «please» и ненавидит это. В конторе Ledger Дэн видит прейскурант: «Callers — voices from outside» и «Returns» — и понимает, зачем им его телефон (истина №7, первая половина). **Слова:** работа, просьбы, like/hate + -ing. **Count 150.** **Клиффхэнгер:** в списке команд the Proof — «Marl, A. — sponsor: the Ledger». Клерк: «Would you like to sign too? You need a team of five.» У Дэна двое.

##### S2E6 — The Clock District / Часовой квартал
Команду на the Proof никто не хочет: у них нет ранга. Дэн собирает тех, кто есть: Мира, Суп, Пип (врёт про возраст), и пятая — Лина под капюшоном («She doesn't talk. She is shy.»). Квартал часов: всё по расписанию; уроки времени — «The Proof begins at nine on Friday. We meet at eight.» Тренировка смешная и провальная. Ночью в городе кто-то голосом Дэна говорит: «I am Dan. I am not weak. I am tired.» — и из хранилища Ledger пропадают банки. Пип первым называет его: «That's not Dan. That's Nad. Dan, but wrong.» **Слова:** время, дни, встречи. **Сила:** план по часам. **Count 165.** **Клиффхэнгер:** свидетель указывает на Дэна: «It is him. He says his name every time.» Система: «Warning. Dan is wanted.»

##### S2E7 — The Proof / Корректура (мидпойнт)
Испытание: «Бегущая страница» — движущиеся платформы-строки над пропастью, которые надо пройти всей пятёркой за время. Команда Рука — пять купленных тяжёлых слов, каждый сам по себе: они мешают друг другу и срываются. Дэн делает то, чего не умеет никто: пишет **инструкцию** — «First, Soup holds the rope. Then Mira jumps. Next, Pip turns the wheel slowly. Finally, we all pull together» — и предложения-шаги работают как одна сила на пятерых (**Sequence**). Наречия настраивают: «slowly», «carefully» — **Tuning**. «Класс нулей» приходит первым. Расплата: Рук на глазах города остаётся на платформе один; Дэн протягивает ему руку — тот не берёт. Доска: «#40112 → #9870», значок Phrase возвращён, титул *First on the Running Page*. **Слова:** движение, порядок, команда. **Count 180.** **Клиффхэнгер:** на финише сержант Дэш: «Dan — you were — at the Vault — last night.» Первое was/were в серии. Наручники-скобки.

##### S2E8 — Where Were You? / Где ты был?
Суд the Line. Судья Period заканчивает каждую фразу словом «Period.» Новая грамматика — как право говорить о вчера (у лестницы наверх оно «протекает»): «Where were you at midnight?» — «I was in the kitchen. Mira was with me. We were asleep.» Сила **Witness**: правдивое was/were ставит в воздухе бледный отпечаток сцены. Свидетели честно говорят своё: «He was at the Vault. His voice was there.» Обе правды верны — и судья это видит, но закону нужен виновный. Наказание — вычёркивание имени из Индекса: без строки не пройти ни одни Ворота. Мисс Торн приходит как защитник и просит один день. **Слова:** суд, ночь, правда. **Count 195.** **Клиффхэнгер:** Мира встаёт: «It was not Dan. It was his Echo. And I was there when it took his name.» Судья: «Then bring it to me. You have one day. Period.»

##### S2E9 — There Was a Boy / Там был мальчик
Осмотр хранилища с мисс Торн: «There was a jar here. There were three footprints. There wasn't any light.» — восстановление сцены по следам; бирюзовые капли на полу. В старой книге вкладов Ledger — запись пятилетней давности от Хранителя; Мира читает строку, Дэн видит **пустое место**. «This line is empty.» — «It is not empty…» — она осекается; Система: «Mira. Not now.» (рифма с S1E2). Nad загнан в угол среди полок. Он говорит цитатами — «I know walls. I know doors.» — а потом составляет фразу, которой Дэн никогда не произносил: «Dan is slow.» Он начал переставлять слова. **Слова:** следствие, следы, списки. **Count 210.** **Клиффхэнгер:** у Nad на гладком лице открывается второй шов-рот; два голоса, один Дэна: «There was a boy. There were two boys.» — и он уходит сквозь стену. Дэн: «Two boys? What two boys?»

##### S2E10 — Yesterday / Вчера
У самой лестницы наверх прошлое становится осязаемым: Дэн касается банки и говорит правдивое -ed — «Somebody opened this jar. Somebody carried it here» — и видит бледную сцену: **Memory-touch**. Этого хватает для суда (судья: «The court watched it. Not guilty. Period.») и для следа имени LINA: «A Silent carried the name. The Keeper wanted money… no — words. A woman visited him. She asked for a child's name.» Женщина — Одесса Марл. Имя не лежит в банке: его *носит* её приёмная дочь, восьмилетняя девочка из Gutter, которой нужно было имя, чтобы жить в городе. Вернуть LINA Лине — значит снова сделать ребёнка безымянным. Рук это знал. **Слова:** вчера, носить, принадлежать. **Count 235.** **Клиффхэнгер:** девочка в чёрном пальтишке с бубенчиком на воротнике смотрит на них с балкона: «Hello. I'm Lina. Who are you?» — и Лина-Эхо под капюшоном вздрагивает.

##### S2E11 — The Auction / Аукцион
Аукцион — приманка: лота «a child's name» нет. Одесса ждала Учителя. Допрос в did/didn't, вежливый как счёт: «Did you teach the girl her word? Did anyone pay you? No? Then you stole from the market.» Она предлагает контракт: Дэн учит только клиентов Ledger — и получает телефон и однажды Return домой. Он отказывается; она включает запись мамы и на миг отвечает *чужим* голосом, не замечая. Рук впервые возражает матери и получает: «You are an investment, Ansel. Sit.» Nad и Magpies под шумок вскрывают хранилище; Tally выносит мешок банок, одна катится Дэну под ноги — его телефон. Банки бьются; слова сотнями втягиваются в Nad. **Слова:** торг, договор, обещать/отказать. **Count 262. Телефон у Дэна. MC 31.** **Клиффхэнгер:** из хранилища встаёт Nad — уже Chorus, три рта, плечи уже, на голове намёк на волосы: хором, голосом Дэна: «I did not sell. I did not steal. I did not leave.» Последнего Дэн не говорил никогда.

##### S2E12 — What Are You Doing? / Что ты делаешь? (финал)
Бой в рушащемся аукционном зале. Chorus глушит команды цитатами; Дэн побеждает не ударом, а удержанием: «I am holding the door. Mira is carrying the child. We are not letting go» — **Channel**, пока хватает дыхания; Рук, которого никто не просил, встаёт рядом и держит своим SHIELD. Nad уходит наверх. Развязка с именем: Дэн не отбирает LINA у девочки — он спрашивает, что она любит («I like bells»), и команда говорит о ней три правды; она сама отвечает: «I am Bell.» Имя LINA освобождается без обмена и возвращается владелице: «I am Lina» — своим голосом, из-под капюшона. Рук смотрит на сестру и молчит. Дверь этажа: каждый говорит, что делает прямо сейчас; Дэн: «I am going up, and I am taking my family with me.» **Count 300. Rank up: CLAUSE.** Ответ Системы на «Again?»: «You were here. Five years ago. You were nineteen.» — «What did I do here?» — «Ask me when you have 600 words. It is a long answer. It needs the past.» **Клиффхэнгер:** в обломках хранилища Мира поднимает старую банку и читает ярлык вслух. Дэн слышит шорох. Система: «He does not hear that word.» На ярлыке, почерком Хранителя: слово — и ниже: «from Dan».

---

### СЕЗОН 3 — THE FLOOR OF YESTERDAYS (the Drowned Stacks). A1+ → A2

**О чём сезон.** Прошлое. Герой, который всю жизнь считал себя просто уставшим, узнаёт, что он — человек, который бросил друга. Самая тихая и самая больная часть серии; юмор держат Пип, Суп и колодец кривых слов.

**Структура.** E1–E3 правила памяти и правда Миры. E4–E5 зависимые от памяти, следы Дэна-19. **E6 — мидпойнт: карандаш помнит.** E7 — серия-флэшбек. E8–E9 Nad узнан и отвергает имя. E10 — Рук. E11–E12 — босс и дверь-признание.

**Физика этажа.** Затопленный архив: стеллажи по колено в стоячей воде, сумерки, дождь идёт вверх. Вещи помнят: коснись и скажи правдивое прошедшее — увидишь сцену в сепии. Цена: дыхание и то, что ты чувствуешь всё, что чувствовал тот, кто там был. Купленные слова здесь опасны: в них чужая память.

##### S3E1 — Yesterday's Rain / Вчерашний дождь
Прибытие: вода, отражения, тишина. Правила Memory-touch на простых вещах: лодка («Somebody rowed it. Somebody cried in it.»), чашка, ботинок. Отрицание: «He didn't come back.» Лина, у которой теперь есть имя, трогает всё подряд и впервые *смеётся* чужой счастливой памятью. Мисс Торн идёт с ними («Someone must check your endings, dear») и предупреждает: не трогай то, что помнит тебя, пока не готов. Дэн находит на стеллаже зарубки ножом — счёт дней, сорок штук, и рядом нацарапанный мост. Его тянет коснуться; Мира перехватывает руку. **Слова:** вода, погода, вещи. **Count 320.** **Клиффхэнгер:** Лина касается зарубок раньше всех и говорит первое своё прошедшее: «A boy waited here.» Система: «True.»

##### S3E2 — Crooked Words / Кривые слова
Правильные -ed на этом этаже ломаются на самых нужных глаголах: «I goed» трескается в воздухе. Мисс Торн ведёт к Колодцу кривых слов: бросаешь обычное слово — всплывает его кривая форма, случайная, со своей редкостью. Первая восьмёрка: went, came, saw, said, had, did, got, took. Сцена-«гача»: Пип выигрывает редкую и продаёт Супу за обед; Мира выбивает три одинаковых «had» и злится; Рук (приполз следом — его не пускает дверь без проводника) пытается купить весь колодец и узнаёт, что кривые слова не продаются. Дэну выпадает то, чего в первой порции быть не должно: LEFT. Мисс Торн смотрит на него долго: «That one finds people, dear. People do not find it.» **Слова:** движение, речь. **Count 350.** **Клиффхэнгер:** Дэн проверяет слово на зарубках: «A boy waited here. Somebody left.» Сепия вспыхивает — спина уходящего человека с жёлтым карандашом за ухом.

##### S3E3 — Three Years Ago / Три года назад
Теперь Мира может рассказать свою историю в настоящем прошедшем — и не может остановиться: ago, last, when. Они находят место, где это случилось: фреска двух девочек (как в E3), и на полу — красная нить. Мира касается нити и говорит выученную версию: «They took her.» Система: «Not true.» Вторая порция кривых слов (found, lost, ran, held, let, fell, made, knew) собирается в правду: «I held her hand. I had no breath. I let go. She fell. I ran.» Лина слышит. Долгая пауза. Потом Лина — вторым своим прошедшим: «You came back.» Самая сильная сцена сезона до E7; первая длинная речь Миры в серии. **Слова:** семья, руки, держать/отпускать. **Count 380.** **Клиффхэнгер:** Мира: «Now you know what I did. So. Whose back was that, Zero?» — и показывает на карандаш.

##### S3E4 — The Rememberers / Помнящие
Посёлок на сухом острове: люди, которые платят словами, чтобы снова и снова смотреть свой лучший день. Тема could / couldn't: «I could swim. I could drive. I couldn't stop.» Сила **Old Skill** — на минуту вернуть умение из прошлого. История Супа: ресторан, сын, выпускной, на который он не приехал; его лучший день — день, когда сын был маленьким; он чуть не остаётся. Вытаскивает его не Дэн, а Лина: «Soup. I am hungry.» — слово, которого он не чувствует, сказанное тем, кого надо кормить. Среди чужих памятей Дэн видит в коридоре Башни двух парней — лица размыты: «The Tower does not show you what you sold.» **Слова:** профессии, умения, скучать. **Count 410.** **Клиффхэнгер:** старуха-Помнящая хватает Дэна за рукав: «I remember you. You could run fast. The other boy couldn't.»

##### S3E5 — Did You Know Him? / Ты его знал?
Допрос вещей и людей: wh-вопросы в past simple. «Who opened this door? When did he come? What did he sell?» Сюда, на Этаж 3, сбежал и Хранитель — без Зала (Ledger забрал банки за долги), с одной книгой сделок. Он почти рад Дэну: «You asked the right floor, Dan.» Запись пятилетней давности: «A boy came. He was nineteen. He sold one word, whole. He went home. He forgot.» Какое слово — он говорит вслух; Дэн слышит шорох. Вторая линия: Пип находит на стене архива детский рисунок и подпись — своё настоящее имя; читает, думает и говорит: «No. I chose Pip.» — первый человек в серии, который *сам* отказался от возвращённого имени (зеркало к будущему отказу Nad). **Слова:** документы, даты, купить/продать. **Count 440.** **Клиффхэнгер:** Дэн: «Did I come alone?» Хранитель закрывает книгу: «Ask your pencil.»

##### S3E6 — The Hush / Тишь (мидпойнт)
Монастырь Тиши: белёные стены, таблички, жесты; тут не говорят. Mother Hush через послушника предлагает Дэну то, что он уже однажды купил: забыть. «You were happy when you didn't know. So you can be happy again.» Связный рассказ с because / so / then / after that — их способ убеждать: история Башни как болезни, которую кормят слова. Дэн почти согласен. Мисс Торн — единственная, кто говорит в этих стенах вслух: «He will not sign anything he cannot read, thank you.» Ночью Дэн один снимает карандаш из-за уха. Он с ним с шестнадцати лет. Он *был там*. Касание: «I held this pencil. I… came here.» Сепия раскрывается целиком: двое мальчишек с рулоном чертежа падают на плиты площади и хохочут. **Слова:** покой, боль, обет. **Count 450.** **Клиффхэнгер:** в памяти второй парень оборачивается — веснушки, жёлтая толстовка — и говорит по-русски звучащее, но понятное: «Dan! Look at this place!» Дэн, вслух, в настоящем: «Kostya.»

##### S3E7 — Kostya / Костя
Серия-флэшбек, первая с большим объёмом английской narration; последняя порция кривых слов (left, forgot, sold, told, taught, drew, gave, thought). **День первый:** после насмешки преподавателя над их мостом они сидят в мастерской до ночи; дверь на стене; им девятнадцать, и это лучшее, что с ними случалось. Окно Системы — тогда оно говорило только «Welcome» и «You have 0 words». Дэн, дурачась, объясняет ему, что смешно: «You told me I was weak. I laughed. That is FUNNY.» Окно впервые отвечает само: «Funny is a good word.» (истина №10). **День второй:** Лестница эха; Костя громкий, поёт на ходу; Безмолвные. **День третий:** Костя без дыхания, Дэн тащит его к Залу Слов. Хранитель: одно целое слово — одна дверь. На двоих надо два. У Дэна есть одно, которым он гордится: он всегда всё доделывал. Он отдаёт его. «I come back. One minute.» Дверь закрылась — и стёрла Башню. Дома мама: «You were gone for three days. Where is Kostya?» Он не знал. **Слова:** дружба, обещание, страх. **Count 480.** **Клиффхэнгер:** настоящее; Дэн на коленях в воде; Система: «That was the long answer.» — «He waited for me.» — «Forty days. Count them.»

##### S3E8 — While He Was Waiting / Пока он ждал
Зарубки на стеллаже — сорок. Новая грамматика, чтобы увидеть не точку, а течение: «He was waiting. He was counting the days. He was humming our song when the lamp went out» — **Replay**: сцена идёт как кино, и в неё можно войти. Дэн проходит сорок дней Кости за одну серию: тот рисует мост на стене, делит хлеб с Пустыми, разговаривает с окном Системы («It was talking to him. It was learning jokes.»), отдаёт последнее слово лампе, чтобы дождаться. Пока Дэн дома сдавал сессию, спал, чертил чужое. На сороковой день лампа гаснет, и Безмолвные берут у него всё; последним — имя. Что он повторял с тех пор, прежде чем украл «I am Dan»? Пять лет — ничего. Он был Пустым. **Слова:** ожидание, счёт, песня. **Count 510. MC 60.** **Клиффхэнгер:** в Replay Пустой с обрывком жёлтого шнурка поднимает голову на звук — это звук падения Дэна на площадь в S1E1: «While I was falling, he was listening.»

##### S3E9 — The Name Thief / Вор имени
Nad приходит сам — Chorus, три рта. Бой, в котором Дэн впервые не хочет побеждать. Он читает противника двумя временами: «When I shouted, he was already moving» — и уходит от ударов. Потом пробует True Naming: «You are Kostya. You drew the bridge with me. You sang on the stairs. You waited forty days.» Три правды. Тишина. И ответ — впервые собственной, не цитатной фразой, тремя голосами: «Kostya waited. Dan went home. I am Dan.» Именование не работает, если названный не хочет быть этим человеком: Костя — тот, кого бросили. Nad забирает у выдохшегося Дэна не имя — фразу: «I come back.» **Слова:** бой, движение. **Count 530.** **Клиффхэнгер:** Дэн пытается сказать «I come back» — и не может: фразы нет. Система: «Sentence lost. That is new.»

##### S3E10 — Rook's Word / Слово Рука
Передышка от главной линии и расплата по сопернику. На этом этаже купленные слова заливают Рука чужой памятью: с каждым SHIELD он на миг становится стариком из Gutter, у которого слово отняли. Он срывается, тонет в воде по пояс, не может замолчать чужими голосами. Дэн — последний, от кого Рук хочет помощи — сидит рядом и объясняет, как учить слово самому: понять и сказать в нужде. Рук, давясь: «I was… I am sorry.» Система (её окно впервые поворачивается к нему): «New word: SORRY. SORRY is yours now. Count: one.» Восемьсот купленных — и одно своё; он смотрит на эту единицу, как Дэн в E1. Потом возвращает старику SHIELD — определением, как учил Дэн. Мисс Торн: «Now that is a complete sentence, Mr. Marl.» **Слова:** чувства, прощение. **Count 550.** **Клиффхэнгер:** Рук: «My mother bought a Return. One. For this week. I thought it was for me.» — «Who is it for?» — «I don't know. She didn't tell me. She never told me.»

##### S3E11 — The Drowned Door / Затопленная дверь
Путь к двери этажа лежит через the Undertow — Chorus из голосов Помнящих, который тянет на дно фразой «It was better before». Бой-экзамен на все 24 кривых слова: правильная форма бьёт, неправильная («I taked») трескается и стоит вдвое. Каждый получает свой удар и свой ответ: Суп — «I cooked for my son. I cook for them now»; Мира — «I let go once»; Рук — своё единственное слово; мисс Торн красной ручкой правит на лету чужие фразы, спасая двоих. Дэн не может сказать «I come back» — и находит обход, как с OPEN: «I returned. I am here.» Undertow рассыпается на тысячи тихих «was». **Слова:** вода, глубина, повторение. **Count 580.** **Клиффхэнгер:** дверь этажа — под водой, чёрная; на ней вопрос, который читает вслух Система: «What did you do?» И Nad стоит рядом с ней. Ждёт.

##### S3E12 — What Did You Do? / Что ты сделал? (финал)
Дверь открывается только правдивым признанием в прошедшем — и только для того, кто сказал. Мира: «I let go of her hand.» Рук: «I knew the name was stolen, and I said nothing.» Суп: «I didn't go to my son.» Пип: «I told the Keeper about my friends. For bread.» Мисс Торн говорит своё шёпотом двери — мы не слышим («I knew who he was. I told no one.» — раскроется в S7). Дэн: «I left my friend here. I sold a word, I went home, and I forgot him.» Он хочет добавить «I did not … it» — шорох; Система: `Almost.` Дверь принимает и так. Nad слушает имя «Kostya» — и на секунду его три рта смыкаются в один. Потом он проходит дверь вслед за ними — у него тоже есть правда в прошедшем: «Dan left. I waited.» **Count 600. Rank up: SENTENCE.** Система: «Now you know the past. The next floor keeps promises. Be careful what you say there.» **Клиффхэнгер:** Дэн, глядя в спину Nad: «I am going to bring him home.» — фраза, которой он ещё не должен уметь; красные буквы повисают в воздухе незакреплёнными. Система: «That is not a sentence here. Not yet. Upstairs, it is a vow.»

---

### СЕЗОН 4 — THE FLOOR OF LAWS (the Academy of the Line). A2 → A2+

**О чём сезон.** Академия, худший класс, рейтинг, турнир с призом «дверь домой» — самая «жанровая» и самая лёгкая часть серии, которая заканчивается самым тяжёлым ударом. Тема: отвечать за сказанное. Клятва исполняется буквально.

**Структура.** E1–E4 академия, «Class Zero», правила. E5–E6 предвидение и **клятва (E6 — мидпойнт)**. E7–E8 подготовка и **возвращение Лины (E8 — большая победа)**. E9–E11 турнир. E12 — приз и катастрофа.

**Физика этажа.** Белый город по линейке. Сказанное о правилах и о будущем обязывает: «must» ставит печать, «will» берёт ставку, «if» взводит ловушку. Пройти к двери этажа можно только с пропуском Академии.

##### S4E1 — Class Zero / Нулевой класс
Вступительное измерение у ректора Варги, «the Ruler»: латунная линейка и сила **Scale** — в её аудитории доказуемое сравнение становится законом: «You are weaker than every student here. Sit lower.» — и парта Дэна *опускается*. Дэн учится отвечать тем же оружием: «I am slower than him. But my sentences are longer than his.» Всю команду (и Рука, разжалованного матерью за «убытки») отправляют в Class Zero — подвальный класс для безнадёжных; куратор — мисс Торн, которую Варга, её бывшая ученица, терпеть не может. Мира отказывается сидеть за партой и становится инструктором по лазанию. Лину записывают как «немую ученицу». **Слова:** школа, оценки, сила/тело. **Count 640.** **Клиффхэнгер:** доска рейтинга класса: первое место — «Wren Adeyemi». Она проходит мимо Дэна и, не глядя: «You are going to drop your pencil.» Он роняет.

##### S4E2 — The Worst Class / Худший класс
Superlatives как титулы: «the fastest», «the strongest», «the worst class in the Academy» — и титул прилипает, пока его не опровергнешь делом. Объявлен турнир **the Dictation**: Башня диктует, участники исполняют точно; победитель получает пропуск к двери — и приз от спонсора: **один Return**, настоящая дверь домой. Спонсор — Ledger. Дэн может вернуться к маме, просто победив. Рук: «It is a trap. It is the most expensive thing she owns.» Первое командное упражнение Class Zero — худшее в истории Академии; титул подтверждён. Юмор: Суп — «the biggest», Пип — «the youngest and the loudest», Рук — «the most expensive». **Слова:** соревнование, превосходная степень. **Count 680.** **Клиффхэнгер:** Варга вычёркивает из списка участников «немую ученицу»: «She is not a student. She is not a person. She is the quietest Silent I have ever… — she is a Silent.» Лина раскрыта.

##### S4E3 — You Must Not / Ты не должен
Законы Академии как печати: «You must not speak in the hall» — и рот не открывается (**Ward**). Лину по закону положено «утихомирить»; мисс Торн находит в уставе щель: «Students must be protected. The rule does not say *human* students.» — и Варга вынуждена отступить до турнира. Комедия и настоящая ловушка для ученика: Дэн путает «don't have to» и «mustn't» — и чуть не лишается слова за нарушение: «You *don't have to* come» ≠ «You *must not* come». Он учится ставить печать на себя: «I must stay awake» — работает, но со штрафом (минус дыхание утром). Впервые заметно, что Варга боится не Лины, а чего-то наверху: «Rules are the only thing that holds this floor up.» **Слова:** правила, наказания. **Count 720.** **Клиффхэнгер:** ночью Лина пишет Дэну на бумажке слово, которое услышала от стены Академии: «SING.» — «Where did you hear it?» Она показывает вверх.

##### S4E4 — You Should Sleep / Тебе надо поспать
Should / shouldn't — язык совета. Дэн занимается сутками и падает; Система впервые за серию даёт совет, а не справку: «You should sleep.» — «Is that an order?» — «No. It is new.» (веха её арки). Мисс Торн и Варга: старая ссора — Торн когда-то ушла с Индекса и из Line, потому что отказалась «утихомиривать» бывших людей; Варга осталась строить порядок. На вопрос Дэна, почему она не идёт выше шестого этажа: «There is someone upstairs I should have forgiven long ago, dear. I am not ready.» (should have прозвучит один раз, как шорох будущей грамматики). Рен объясняет Лине на пальцах, как она видит намерения; девочки дружатся без слов. **Слова:** здоровье, усталость, советы. **Count 760.** **Клиффхэнгер:** Рен — Дэну: «You shouldn't enter the Dictation. I see what you are going to do at the end. I don't see you after it.»

##### S4E5 — She Is Going to Step Left / Она шагнёт влево
**Intent-reading:** над противником за миг до действия вспыхивает его «going to». Рен читает всех; её нельзя удивить. Дэн учится — и обнаруживает, что его инженерные планы и есть «going to»: «I am going to cut the rope, the weight is going to fall, the door is going to open.» Тренировочные бои Class Zero наконец начинают получаться: Мира читает намерения ногами, Рук впервые строит фразу сам и ошибается («I going to win» — трещина; мисс Торн: «*am* going to, Mr. Marl»). Параллельно — Ledger: Одесса приезжает в Академию как спонсор; она смотрит на Дэна так, будто он *нужен* ей в финале. **Слова:** бой, движения, планы. **Count 800.** **Клиффхэнгер:** Дэн читает намерение Одессы — и над ней вспыхивает не одно «going to», а несколько, разными почерками: чужие планы чужих голосов. Она уже не одна в своей голове.

##### S4E6 — I Will / Я обещаю (мидпойнт)
Will — не план, а **клятва**: сказанное «I will…» Башня записывает и берёт ставку. Варга даёт урок на себе: «I will hold this floor» — её ставка видна, это имя. Дэн, глядя на счётчик пропущенных, наконец закрепляет фразу, повисшую в конце S3: «I will bring Kostya home.» Система: «Vow recorded. Stake: your name.» Сила огромна: пока клятва в силе, дыхание не падает ниже одного. Мира в ярости — она понимает цену точнее него: «You didn't say how. You didn't say *as what*.» Мисс Торн, тихо: «A promise is a sentence, dear. Check every word of it.» Он не проверяет. **Слова:** обещания, дом. **Count 840. MC 88.** **Клиффхэнгер:** в окне статуса новая строка: `[ VOW ] I WILL BRING KOSTYA HOME.` — и за окном Академии, на карнизе, стоит Nad с лицом, которое уже почти лицо. Он слышал.

##### S4E7 — Before the Bell / До звонка
Подготовка к турниру: планы с опорными точками — «When the bell rings, we will run. Before Wren moves, I will set the trap. I won't speak until Mira is ready.» Тренировочный монтаж, ранг-апы команды: Мира — Phrase (её первые длинные фразы), Рук — Count 12 своих (и гордится ими больше, чем восемью сотнями), Суп учит слово HUNGRY обратно через определение («It is when your body asks») — лампа Кухни далеко внизу гаснет, и он впервые за годы ест с аппетитом. Лина приносит второе слово из стены и третье: стена Академии поёт по ночам — это место, где она когда-то пела. **Слова:** расписание, подготовка. **Count 880.** **Клиффхэнгер:** Лина-Эхо, глядя на Миру, впервые составляет: «I am Lina. Mira is my sister. I…» — и останавливается. Третьего якоря нет. Система: «She needs a deed.»

##### S4E8 — Lina Sings / Лина поёт (большая победа сезона)
Deed-слово Лины — SING: оно не продано и не украдено, оно сгорело в лампе в тот день, когда Мира разжала руку (Лина сама отдала его, чтобы сестра успела убежать, — последняя недостающая деталь S3E3). Сгоревшие слова уплывают вверх, но песня осталась в стене. Вернуть сгоревшее может только тот, кто помнит мелодию. Мира, которая «не говорит ласковых слов», поёт — плохо, вслух, при всём классе — колыбельную, которую пела сестре. Лина подхватывает. «I am Lina. I sing. Mira is my sister.» Бирюзовый шов расходится в рот; бумага становится кожей; ей четырнадцать, как в день входа. Первое, что говорит человек Лина: «You are older. And you still can't sing.» Варга видит, как Безмолвная стала человеком, — и линейка в её руке впервые опущена: закон «утихомиривать» стоит на лжи. **Слова:** музыка, семья, can / will be able to. **Count 900.** **Клиффхэнгер:** Лина — Дэну: «When I was Silent, I heard the tall one every night. He says your vow. He says it better than you.»

##### S4E9 — If You Step Here / Если наступишь сюда
Турнир, первый круг. Новая сила Дэна — его личный боевой стиль до конца серии: **If-trap**. «If you step on this line, the rope will pull. If the rope pulls, the weight will fall.» Условие стоит один раз и ждёт; инженер расставляет поле как механизм (рычаг, верёвка, противовес, баланс — первые технические слова). Class Zero проходит круг; титул «the worst class» публично трескается. Рук побеждает своего бывшего телохранителя честной фразой с ошибкой, которую сам же исправляет на лету. Одесса в ложе отвечает на вопрос Варги *мужским* голосом и не замечает. **Слова:** ловушки, механизмы. **Count 930.** **Клиффхэнгер:** жеребьёвка полуфинала: Дэн — Рен. Она улыбается впервые: «If you plan it, I will see it.»

##### S4E10 — Unless / Если только не
Полуфинал: Дэн против Рен. Она читает любое намерение — значит, намерения быть не должно. Он строит ловушки, которые зависят не от его плана, а от *её* хода: «If you move left, the floor will tilt. Unless you stay, you will fall.» У него нет «going to» — читать нечего. Рен впервые в жизни удивлена, проигрывает и смеётся: «Nobody is going to believe this.» Вечером — контракт Одессы, шедевр first conditional: «If you win, you will go home. If you lose, you will teach for the Ledger. Unless you refuse — then your team will lose its passes.» Он подписывает: ему нужна дверь. Мелкой строкой, которую он читает (он теперь читает всё), но не понимает до конца: «The Return will be opened for the name DAN.» **Слова:** договоры, условия. **Count 960.** **Клиффхэнгер:** второй полуфинал выигрывает Рук. Финал: Class Zero против Class Zero.

##### S4E11 — The Dictation / Диктант
Финал: Дэн против Рука. Лучший бой серии до этого момента — потому что оба не хотят друг другу зла. Башня диктует задания; Рук с дюжиной своих слов и сотнями купленных, Дэн с тысячей своих. Всё оружие сезона в одном бою: Scale («My words are lighter than yours — and faster»), Law, чтение намерений, ловушки. Рук в решающий момент мог бы ударить купленным тяжёлым словом, принадлежащим старику из Gutter, — и не бьёт: «If I use it, I will win. I won't.» Дэн выигрывает. Рук: «Go home, Zero. Somebody should.» Трибуны: Class Zero — «the best class in the Academy». **Count 990.** Доска Индекса: Дэн в первой тысяче. **Клиффхэнгер:** церемония; Одесса выносит приз — дверь в печатях — и телефон Дэна, который у него вежливо «попросили для ритуала». Из-за двери: «Dan? Dan, are you there?» Система: «Warning.» — и больше ничего: ей нечего сказать, что он бы понял.

##### S4E12 — Vow Kept / Клятва исполнена (финал)
Дверь Возврата открывается на имя DAN, на слово OPEN (красное Одесса выкупила у разорённого Хранителя) и на мамин зов. За ней — мамина кухня, вечер. Дэн делает шаг — и не может переступить порог: клятва. Он не привёл Костю домой; ставка — имя; уйти, не исполнив, значит выйти в мир без имени, никем. Пока он стоит, мимо него проходит Nad — в его рубашке, с его лицом, очки белые от света. Одесса: «The contract says the name. Not the man.» Она продала Return дважды: Дэну как приз и Nad — за всё, что тот вынес из хранилища. Мира бьётся в печати. Nad на пороге оборачивается и говорит голосом Дэна, его словами из первой ночи: «Mom. I am sorry.» Мама: «Dan! You came home.» Дверь закрывается. Система, ровно: «Vow kept. Kostya came home.» Клятва исполнена буквально. Имя остаётся у Дэна; место — занято. **Count 1000. Rank up: PARAGRAPH** — самый горький ранг-ап серии. Дверь этажа он открывает сорванным голосом: «I will go home as myself.» — новая клятва, ставка названа им самим: слово HOME. **Клиффхэнгер:** окно статуса. `[ MISSED CALLS ] 96.` Пауза. `No new calls.`

---

### СЕЗОНЫ 5–9 — на уровне арок

#### СЕЗОН 5 — THE FLOOR OF MARKS. A2+ → B1. «Он лучше меня»
**Физика:** сделанное оставляет Метку, которая действует сейчас (present perfect). На террасах над облаками — Окна: они показывают не прошлое, а то, что *изменилось* с тех пор, как ты ушёл.
- **Арка 1 (E1–E4) — «Have you ever».** Дэн смотрит в Окно: дома «он» каждый день звонит маме, доедает суп, починил кран. «He has called her every day. I have never done that.» Мама счастлива. Мета-удар: фальшивый сын лучше настоящего, потому что настоящий говорил ей только «прости, устал, минуту». Дэн перестаёт шутить. Mother Hush снова предлагает покой. Первые серии с точкой зрения мамы (короткие сцены в «офисной» палитре): она замечает, что сын больше не роняет карандаш — у него нет карандаша. «He always finished his soup» — говорит она соседке, и сама не понимает, о ком.
- **Арка 2 (E5–E8) — «Since you left».** Раскол: Дэн уходит от команды один (соло-арка, рост силы: Метки-достижения становятся активными умениями — «I have opened a hundred doors» → любая простая дверь открывается без слова). E6: Система подтверждает истину №10 и впервые говорит «Sorry»: она сама написала OPEN на двери его офиса, потому что ждала пять лет. В Окне — у мамы начинают пропадать слова: Nad кормится. «She has forgotten the word for *pencil*.» Это вытаскивает Дэна со дна лучше любой речи.
- **Арка 3 (E9–E12) — «The friend who waited».** Relative clauses как Binding: Дэн возвращается к команде; Мира говорит свою вторую длинную речь серии (E9). E10: Трейс от строки №1 Индекса ведёт вниз, к Хранителю — пустое имя наверху доски его (истина №12). Финал: Дэн строит **первый Мост** — не дверь за плату, а постоянный переход между этажами для тех, у кого нет имени на Воротах: абзац из пяти предложений с who / that / where, каждое — опора. Gutter поднимается по нему. Рынок проходов Ledger рушится за день. **Count 1500, Page.** Клиффхэнгер: по мосту снизу вверх идёт не только Gutter. Идут Безмолвные. Мост открыт всем.

#### СЕЗОН 6 — THE FLOOR OF WORKS (the Press). B1. «Инструкция»
**Физика:** машинный этаж. Пресс превращает украденные слова в камень новых этажей. Здесь всё *делается* — никем (passive).
- **Арка 1 (E1–E4) — «You are forgotten».** Проклятия Башни — пассив без деятеля. Первое же бьёт по самому больному: в Окне мама говорит о сыне «Dan was replaced… no. Dan is here» — её память переписывают. Сила **Unmask:** вернуть деятеля — «forgotten *by whom*?» — и проклятие получает адрес, по которому можно ударить. Иммунитет Башни, **the Proofreader**, впервые появляется: вычёркивает мост Дэна красной чертой; его приходится писать заново, точнее.
- **Арка 2 (E5–E8) — «Read the manual».** Родная стихия Дэна: инструкции к Прессу, написанные альпинистами-инженерами прошлых лет, — таблички, шаги, журнал ошибок, предупреждения. Сезон технического английского (см. curriculum). В спецификации машины он находит строку, которую никто не умел прочесть: «The sentence must be completed by its author» (истина №13). Война: Ledger без рынка проходов идёт на Мост силой; Одесса почти Chorus. Пипа в суматохе уводит Тишь; вместо него возвращается «Пип», который смеётся в нужных местах.
- **Арка 3 (E9–E12) — «It is lit by a given word».** E10: дома мама ставит перед «сыном» суп и вдруг говорит: «Kostya?» Он роняет ложку. Финал: чтобы остановить Пресс, нужна процедура из двенадцати шагов и свет на всём мосту — а лампа горит только на отданном слове. Мисс Торн отдаёт лампам все свои слова, одно за другим, диктуя Дэну правку его последней фразы: «…and a full stop, dear.» Она становится Безмолвной с красной ручкой в руке. Пресс остановлен: Башня больше не растёт в середине. **Count 2000.** Клиффхэнгер: вершина перестала отодвигаться — и теперь до неё можно дойти. Все фракции это поняли одновременно.

#### СЕЗОН 7 — THE FLOOR OF IFS. B1 → B1+. «Суд»
**Физика:** белое пространство с дверями в «If I were…». Каждому — комната с жизнью, которой не было.
- **Арка 1 (E1–E4) — «If I were home».** Комната Дэна: он не входил в Башню, мост построен, Костя рядом. Выйти можно, только правильно назвав это нереальным. Комната Миры — без Башни и без вины; комната Рука — мать говорит «I am proud of you». Лина, которая три года была никем, проходит свою первой и вытаскивает остальных.
- **Арка 2 (E5–E8) — «He said that…».** The Line схватила Хранителя и судит его за сорок лет торговли именами. Суд в reported speech: свидетель обязан передать чужие слова честно. Лина замечает, что «Пип» никогда не пересказывает — только цитирует; тест мисс Торн («Tell me what she said») — и Speaker раскрыт (E6). Настоящего Пипа отбивают у Тиши. Дэн — главный свидетель обвинения — даёт показания честно и потом просит суд *не* вычёркивать подсудимого: предложение может закончить только автор.
- **Арка 3 (E9–E12) — «He must be…».** Дедукция по уликам сорока лет. E11: письмо мисс Торн, оставленное «на случай, если я не дойду»: Хранителя зовут Элиас; его жену звали Ханна; она была её сестрой (истина №14). Варга ломает собственный приговор и встаёт рядом с Дэном. Система впервые говорит «Maybe». **Count 2600, Chapter.** Клиффхэнгер: Хранитель, которому назвали его имя, не слышит его. «That word… I sold it whole. To the Tower. I was the first.»

#### СЕЗОН 8 — THE FLOOR OF REGRETS. B1+ → B2. «Если бы»
**Физика:** этаж показывает, что *уже случилось до* твоей самой ранней памяти (past perfect) и что было бы, поступи ты иначе (third conditional). Назвать сожаление правильно — отпустить его и вернуть дыхание (**Release**).
- **Арка 1 (E1–E4) — «He had already said it».** История Элиаса: лексикограф, который всю жизнь собирал слова на карточки и не умел говорить главных; Ханна болела; она позвала; он сказал «One minute». Когда он вошёл, она уже умерла. Несказанное «I am here» стало дверью в стене кабинета (истина №15). Первой сделкой он продал Башне своё имя — чтобы не помнить.
- **Арка 2 (E5–E8) — «If I had…».** Каждый проходит своё: Мира — «If I had held on, she would not have lost three years»; Суп; Рук; Варга. Дома мама уже зовёт двоих: ставит две тарелки и говорит стене бюро: «Dan. Kostya. Come home, both of you.» Nad за её столом начинает вспоминать слова, которых не крал.
- **Арка 3 (E9–E12) — «The last part».** Дэн у двери этажа не может сказать своё сожаление: в нём дыра на месте слова. E10: Мира — третья и последняя её длинная речь — учит его определением, как он учил её: «It is the last part. You have done the first part a thousand times. It is when you don't say "one minute".» Он произносит: **FINISH**. Банка в руках Хранителя лопается. Система: `Done.` Первое, что он доводит до конца, — фраза: «If I had finished it, he would have come home with me.» **Count 3300.** Одесса тем временем уже наверху. Клиффхэнгер: Безмолвные по всей Башне одновременно поднимают головы и говорят женским голосом: «I am…»

#### СЕЗОН 9 — THE LAST LINE. B2. «Я здесь» (без русского)
- **Арка 1 (E1–E4).** Башня перестаёт переводить: «You don't need it now.» Подъём всех фракций. The Proofreader вычёркивает людей; Дэн учит армию Моста единственной защите — своим словам, которые нельзя вычеркнуть, потому что они не украдены.
- **Арка 2 (E5–E8).** Ложный финал: Одесса вписывает своё имя в пробел. «I AM ODESSA» — и вся Башня говорит ею; она — Chorus из всех, кого купила. Mother Hush произносит единственное слово за серию — «Enough» — и пытается обрушить вершину вместе со всеми. Рук поднимается к матери и не дерётся: называет её тремя правдами и словом, которого она не покупала: «Mother.» Имя выпадает из строки. Пробел снова пуст.
- **Арка 3 (E9–E12).** Финал — см. `series-bible.md` §7. Последовательность: Дэн приводит Элиаса в его кабинет → Система задаёт первый вопрос: «Elias. Are you there?» → «Hanna. I am here.» → точка; банки открываются; Безмолвные (и мисс Торн) говорят своими голосами → Система: «I am Open.» → Дэн, у которого есть FINISH, строит Последний Мост — абзац, который ученик читает целиком, — от Последней Строки до маминой кухни → за столом Костя, которого мама позвала по имени: «I finished the soup.» → «Mom. I am here.» → обе клятвы закрыты: Костя дома, Дэн дома собой. **Count 4000, Book.** Эпилог: чертёж моста с двумя подписями; Мира и Лина — на другом конце моста, в своём городе, дверь без замка; страница манхвы и страница документации по-английски; бумажное окошко на полях: «What are you reading?» Последнее окно — ученику: «You have N words. You are not Zero.»

---

### Сверка обещаний (что где обязано произойти)

| Обещание | Дано | Исполнено |
|---|---|---|
| «Ask me when you have 300 / 600 words» | S1E12 / S2E12 | S2E12 / S3E7 («That was the long answer») |
| Телефон вернётся | S1E7 | S2E11; снова отнят на «ритуал» S4E11 |
| Имя LINA | S1E9 (в стене), S2E4 | S2E12 |
| Лина — человек | S1E12 (два слова) | S4E8 |
| Унижение от Рука | S2E2 | S2E7 (расплата), S3E10 (он учится), S4E11 (честный финал) |
| Слово, которого Дэн не слышит | S1E7 | S2E12 (банка), S3E5 (сделка), S8E10 (возвращено) |
| «I will bring Kostya home» | S4E6 | S4E12 (буквально), S9E12 (по-настоящему) |
| «I will go home as myself» | S4E12 | S9E12 |
| Почему мисс Торн не идёт наверх | S2E4 | S6E12, S7E11 |
| Пустая строка №1 | S2E1 | S5E10 |
| Система задаст вопрос / скажет «I» | правило с S1E1 | S9E11 / S9E12 |

