# WORDBOUND — вся история в одном файле

## 0. Как пользоваться этим файлом

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

**Dan** — `24-year-old East-Slavic man, 178 cm, lean and slightly hunched, tired but kind face, short messy black hair with a cowlick, dark brown eyes with faint dark circles, round black-frame glasses with a bit of tape on the hinge, light stubble. Rumpled pale-grey button-up shirt with sleeves rolled to the elbows, loosened dark-olive chinos, white sneakers, a mustard-yellow office lanyard around his neck, a yellow carpenter pencil behind his right ear.` Signature: yellow pencil + taped glasses. Palette: pale grey, olive, mustard.

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
- **art:** High-angle shot over Dan's shoulder at a cluttered drafting desk at 2 AM. His phone lights his tired face from below; the screen shows a long stack of missed calls (vermilion text added in lettering pass). Cold green-grey fluorescent light, sodium-orange city glow in the window behind.
- **Реплики:**
  - `narration-ru` — **RU:** 02:07 ночи. Сегодня у мамы день рождения. Дэн обещал позвонить вечером. Он сидит над чужим чертежом, а телефон показывает девять пропущенных.
  - `thought / dan` — **EN:** Nine calls. All Mom. — **RU:** Девять звонков. И все от мамы.

#### Панель 02

- **bg:** `office-night` | **mood:** `calm` | **sfx:** `—`
- **cast:** dan (left)
- **art:** Extreme close-up of the phone screen held in Dan's hand, a short text message from Mom (lettering added later), a coffee ring on the desk beneath. Behind, out of focus, a rolled drawing of a bridge pinned over the monitor.
- **Реплики:**
  - `narration` — **EN:** Mom: Dan, eat something. — **RU:** Мама: Дэн, поешь что-нибудь.
  - `thought / dan` — **EN:** I am sorry, Mom. — **RU:** Прости, мам.
  - `narration-ru` — **RU:** Она даже не сердится — и от этого хуже. Дэн чертит чужие здания. Его собственный мост лежит в ящике с шестнадцати лет.

#### Панель 03

- **bg:** `office-night` | **mood:** `tense` | **sfx:** `CREAK`
- **cast:** dan (left)
- **art:** Low-angle wide shot: behind Dan's desk the plain grey wall now holds a tall black wooden door that was never there, a faint vermilion glow leaking around its edges. Dan, small in the foreground, turns with a coffee mug in his hand.
- **Реплики:**
  - `narration-ru` — **RU:** Три года Дэн знает эту стену. Он сам чертил этот этаж. Двери здесь быть не может.
  - `speech / dan` — **EN:** I know this wall. There is no door. — **RU:** Я знаю эту стену. Здесь нет двери.

#### Панель 04

- **bg:** `office-night` | **mood:** `tense` | **sfx:** `—`
- **cast:** —
- **art:** Insert shot: an old brass door handle in close-up, glowing vermilion letters crawl across the black wood like cracks of light (lettering added later). Tiny dust motes float in the glow.
- **Реплики:**
  - `narration-ru` — **RU:** На ручке горит красное слово. Дэн читает его — «OPEN». Оно слабо пульсирует, будто дышит.
  - `speech / dan` — **EN:** A word on a door? What is that? — **RU:** Слово на двери? Что это?

#### Панель 05

- **bg:** `office-night` | **mood:** `tense` | **sfx:** `KNOCK`
- **cast:** dan (left)
- **art:** Close-up on Dan's wide eyes behind taped glasses, phone ringing in his raised hand, the black door in soft focus behind him with ripples spreading through its wood from three knocks.
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
- **art:** Extreme low-angle establishing shot: Dan, tiny, sprawled on a stone plaza at dusk; the colossal bone-white Tower rises endlessly through cream clouds above him. Thousands of small vermilion letters drift upward like lanterns against an apricot-to-grey-teal sky.
- **Реплики:**
  - `narration-ru` — **RU:** Дэн лежит на холодных плитах. Над ним — Башня, она уходит выше облаков. Вверх плывут красные огоньки. Это не огни. Это слова.
  - `speech / dan` — **EN:** What is this place? — **RU:** Что это за место?

#### Панель 09

- **bg:** `tower-exterior` | **mood:** `calm` | **sfx:** `—`
- **cast:** dan (left), system (right)
- **art:** Medium shot: a floating cream-paper System window with a vermilion double border hovers beside Dan's face; his glasses reflect vermilion light. The window is slightly tilted and casts a soft shadow.
- **Реплики:**
  - `system / system` — **EN:** Welcome to the Tower. — **RU:** Добро пожаловать в Башню.
  - `system / system` — **EN:** You have 0 words. — **RU:** У тебя 0 слов.
  - `narration-ru` — **RU:** Башня переводит Дэну — но только короткими фразами. Чем больше слов он освоит, тем длиннее будут фразы. Но слово здесь — не просто звук. Освоенное слово даёт силу.

#### Панель 10

- **bg:** `tower-exterior` | **mood:** `calm` | **sfx:** `—`
- **cast:** dan (left), system (right)
- **art:** Over-the-shoulder shot from behind the System window: Dan jabs an indignant finger at it, the window floats there blank and unbothered. Plaza stones and the Tower's base blur behind.
- **Реплики:**
  - `speech / dan` — **EN:** Zero words? I am Dan! — **RU:** Ноль слов? Я — Дэн!
  - `system / system` — **EN:** Words are power. You are weak. — **RU:** Слова — это сила. Ты слабый.
  - `speech / dan` — **EN:** I am not weak! I am tired. — **RU:** Я не слабый! Я устал.
  - `system / system` — **EN:** Tired is weak. — **RU:** Усталый — значит слабый.

#### Панель 11

- **bg:** `tower-exterior` | **mood:** `calm` | **sfx:** `—`
- **cast:** dan (left), system (right)
- **art:** Wide shot: Dan turns to the spot where he landed; the plaza wall behind him is blank stone, no door. He spreads his hands, baffled. The System window floats at the edge of frame, a small tilted rectangle.
- **Реплики:**
  - `speech / dan` — **EN:** Where is my door? — **RU:** Где моя дверь?
  - `system / system` — **EN:** It is gone. — **RU:** Её нет.
  - `speech / dan` — **EN:** Is there a way home? — **RU:** Есть путь домой?
  - `system / system` — **EN:** Find the last door. Some doors go home. — **RU:** Найди последнюю дверь. Некоторые двери ведут домой.

#### Панель 12

- **bg:** `corridor` | **mood:** `tense` | **sfx:** `SCRATCH`
- **cast:** dan (left)
- **art:** Wide shot of a narrow soot-brown stone corridor lined with torn paper pages, cold teal darkness at its far end. Dan stands small in the foreground clutching his lanyard; beside him a rusted iron hatch in the wall. Faint claw-scratches echo (visual: tiny dust shaking from the ceiling).
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

#### Панель 14

- **bg:** `corridor` | **mood:** `tense` | **sfx:** `—`
- **cast:** dan (left), mira (right)
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
- **art:** Dramatic low-angle: a tall Silent rises from the teal shadow behind Dan, its blank bone-white face with a single vertical teal seam for a mouth; Mira already half-turned to bolt, Dan frozen mid-turn, glasses catching the light.
- **Реплики:**
  - `speech / mira` — **EN:** It is a Silent. — **RU:** Это Безмолвный.
  - `speech / dan` — **EN:** Who is that? What is a Silent? — **RU:** Кто это? Что такое Безмолвный?
  - `shout / mira` — **EN:** Run, Dan! Run now! — **RU:** Беги, Дэн! Беги сейчас!

#### Панель 17

- **bg:** `corridor` | **mood:** `action` | **sfx:** `STEP`
- **cast:** dan (left), mira (center)
- **art:** Dynamic wide diagonal shot: Dan and Mira sprint down the corridor between lantern-words; Dan stumbles behind, gasping, glasses askew; Mira drags him by the sleeve. Far behind them the Silent just walks, never closer, never farther.
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

В английском нельзя пропустить глагол: «Я Дэн» — это «I am Dan». Для «я» ставим am, для «ты» (а ещё «мы», «они») — are, а для «он / она / оно / это» — is. Вопрос получается перестановкой: «Who are you?». Отрицание — просто not после глагола: «I am not weak». Слово, которое нужно назвать как слово, пишем ЗАГЛАВНЫМИ: OPEN.

- I am Dan. — Я Дэн.
- You are weak. — Ты слабый.
- This is a door. — Это дверь.

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

# 3. Статус эпизодов (картинки и видео)

Данные из `art/manifest.json`, только чтение.

| Эпизод | Название | Панелей | Картинок | Видео | Детальные кадры (shots) |
|---|---|---|---|---|---|
| s1e01 | The Door / Дверь | 18 | 18 из 18 | 3 (панели 7, 13, 18) | нет |
| s1e02 | No Name / Без имени | 16 | 15 из 16 | 3 (панели 1, 5, 16) | нет |
| s1e03 | The Gate / Ворота | 17 | 0 из 17 | 0 | да, 17 |
| s1e04 | The Price of a Name / Цена имени | 17 | 0 из 17 | 0 | да, 17 |
| s1e05 | A Voice in the Dark / Голос во тьме | 15 | 0 из 15 | 0 | да, 15 |

---

# 4. Что дальше

## Запланированные эпизоды 6–12 (по библии)

- **E6. The Stair of Echoes (Лестница эха).** Дэн и Мира поднимаются молча, общаясь жестами и чертежами; Пип продаёт «тишину» и выдаёт, что Мира «продала сестру»; Мира падает — у неё осталось два слова дыхания.
- **E7. The Ink Market (Рынок Чернил).** Дэн чинит рушащуюся крышу ларька и получает слово REST; на рынке продают его телефон с голосом мамы; торговец упоминает девочку, которая напевает, — Лина рядом.
- **E8. Lina (Лина).** Флэшбек в тёплой «бумажной» палитре: день входа в Башню, сделка с Хранителем, «Zero can pass the door»; Дэн понимает, что был инструментом; ссора; Эхо Лины уводит его к Стене Букв.
- **E9. The Wall of Letters (Стена Букв).** Дэн один у стены украденных слов — Башня оказывается незаконченным предложением «I AM ...»; на стене вспыхивает «DAN» и стена повторяет его голосом.
- **E10. The First Sentence (Первое предложение).** Дэн понимает, что предложения сильнее и дешевле слов, и открывает вторую дверь фразой «I open the door»; появляется Хранитель и забирает у Миры слово «Mira».
- **E11. The Keeper's Door (Дверь Хранителя).** Хранитель — первый Zero; дверь домой открывается предложением и двумя людьми (тот, кто помнит, и тот, кто зовёт); он предлагает Дэну билет домой за имя «Mira»; последний кадр — рука Дэна на двери в офис и голос Миры: «Zero. Go.»
- **E12. Sister (Сестра).** Дэн не уходит, создаёт собственную дверь, говорит Лине слово «sister», Мира получает слово обратно; Система при Count 100 отвечает «Why me?»; последняя дверь ведёт на Этаж Второй; финальный телефонный звонок голосом мамы — это Башня.

## Открытые нити и что держать согласованным

- Имя «Dan» — Хранитель вернул его Дэну за OPEN; Безмолвный всё ещё носит украденное «I am Dan» и может проходить Ворота вместо владельца.
- Слово OPEN теперь у Хранителя; у Дэна есть PUSH (E5) и STOP (E3); Count вырастет до 100 только к E12; в E4 Система говорит «Count: zero. Again.» — Дэн после обмена остался с именем, но без OPEN.
- Красный шнурок на ЛЕВОМ запястье Миры — пара у Лины; страж у последней двери (голос Лины) носит обрывок такого же шнурка. Мира не может произнести и не слышит слово «sister».
- Фреска в Зале Слушающих: две девочки, у меньшей красный шнурок; царапины имён в комнате с лампой (одно — «LINA»).
- Телефон Дэна (девять пропущенных от мамы, «Dan, eat something») упал в E1; вернётся в E7 (голос мамы на рынке) и в финале E12 (Башня выучила голос).
- Хранитель — первый Zero, ему нужна Запечатанная дверь домой; в конце E4 он говорит Дэну «I need one more word» — слово не названо, развязка в E10–E11 (по библии он забирает слово у Миры).
- Система: «Ask me later / ask me when you have 100 words»; ответ на «Why me?» — в E12; пока она отвечает только короткими фразами.
- Правила, которые нельзя ломать: Безмолвные слышат, но не видят; не входят в свет связанного слова; забирают слова только у выдохшихся; Дэн и Мира говорят короткими фразами (E1 2–5 слов, E5 до ~7).
- Визуал: у Дэна на лице только круглые чёрные очки (скотч лишь на дужке), у Хранителя никогда не видно глаз, у Безмолвного нет глаз, носа и губ, только бирюзовый шов; в картинках нет текста.
