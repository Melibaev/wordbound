# WORDBOUND — Сезон 1, эпизоды 6–12 (подробный план)

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

## S1E6 — The Stair of Echoes / Лестница эха

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

## S1E7 — The Ink Market / Рынок Чернил

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

## S1E8 — Lina / Лина

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

## S1E9 — The Wall of Letters / Стена Букв

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

## S1E10 — The First Sentence / Первое предложение

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

## S1E11 — The Keeper's Door / Дверь Хранителя

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

## S1E12 — Sister / Сестра (финал сезона)

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

## 9. Отличия от краткого плана в `bible.md` (и почему)

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
