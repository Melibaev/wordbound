# WORDBOUND — учебный хребет (curriculum)

Этот файл задаёт, **что именно учит каждая серия** и **какой силой в сюжете это становится**. Сюжет — в `series-bible.md`, `season-1.md`, `seasons-2-4.md`. При конфликте по языку (уровень, грамматика, длина фраз, число слов) прав этот файл.

Ученик: русскоязычный, 24 года, инженер-конструктор, A0–A1. Цели: читать манхву и книги, смотреть фильмы, понимать техническую документацию. Главный риск: бросит от скуки. Отсюда три закона курса:

1. **Сначала интерес, потом правило.** Новая конструкция появляется в серии как сила, без которой герой не пройдёт; правило объясняется *после* (grammarNote).
2. **Прогресс Дэна = прогресс ученика.** Всё, что получает Дэн, ученик только что прочитал и понял. Никаких сил «из воздуха».
3. **Ничего не теряется.** Каждое фокус-слово встречается ≥3 раз в своей серии, ≥1 раза в одной из двух следующих и ещё раз через 4–6 серий (за этим следят реплики Nad и Лины — см. §5).

---

## 1. Общая лестница (9 сезонов, 108 серий)

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

## 2. Сезон 1 — the Floor of Names (A0 → A1)

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

## 3. Сезон 2 — the Floor of Deeds, город Margin (A1 → A1+)

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

## 4. Сезон 3 — the Floor of Yesterdays (A1+ → A2)

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

## 5. Сезон 4 — the Floor of Laws, Академия (A2 → A2+)

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

## 6. Сезоны 5–9 — на уровне арок

### S5 — the Floor of Marks (A2+ → B1)
- **E1–E4: present perfect (опыт).** I have seen / never / ever. Сила **Mark**: сделанное оставляет след, действующий сейчас; титулы-достижения становятся активными. Лексика: опыт, путешествие, шрамы, достижения.
- **E5–E8: present perfect (результат и длительность).** just / already / yet; for / since; present perfect vs past simple. «Окна» этажа показывают, что *изменилось* дома с тех пор, как ты ушёл. Лексика: дом, быт, перемены, здоровье (мама забывает слова).
- **E9–E12: relative clauses (who / which / that / where) + used to.** Сила **Binding**: связать две вещи описанием; опоры моста — придаточные. Первый Мост = абзац из 5 предложений с who/that/where, который Дэн «читает вслух» (и ученик читает). Лексика: строительство (beam, support, span, load, joint, rope, anchor), описание людей.
- Чтение: первые «страницы» дневника Дэна-19 на английском (связный текст 80–120 слов). Слух: have/has в слабой форме, 've.
- Первое появление разговорных «стёртых слов» (gonna, wanna, gotta, kinda) в речи Tally и Пипа — только на узнавание; подготовка к манхве и фильмам.

### S6 — the Floor of Works (B1) — технический английский
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

### S7 — the Floor of Ifs (B1 → B1+)
- **E1–E4: second conditional; wish + past.** Комнаты «If I were…». Сила **Unreal**: увидеть ложную жизнь и выйти из неё, назвав её нереальной правильно.
- **E5–E8: reported speech** (said / told / asked + сдвиг времён). Сила **Testimony**: суд над Хранителем; свидетель обязан передать чужие слова честно. Тест на Speaker'а: попроси пересказать — он может только цитировать.
- **E9–E12: might / may / must be / can't be; so / such; although.** Сила **Deduction**. Письмо мисс Торн (связный текст 200+ слов).
- Чтение: протоколы, письмо, показания. Слух: would /wəd/, 'd; интонация сомнения.

### S8 — the Floor of Regrets (B1+ → B2)
- **E1–E4: past perfect.** Сила **Deep Memory**: что *уже случилось до* самой ранней памяти. История Элиаса и Ханны.
- **E5–E8: third conditional; should have / could have.** Сила **Release**: назвать сожаление правильно — отпустить и вернуть дыхание. Каждый герой получает свою сцену.
- **E9–E12: mixed conditionals; повествовательные времена вместе.** Мира учит Дэна слову FINISH определениями (зеркало S1E12). Фокус-слова: finish, complete, the last part, give up, go on, at last, in the end.
- Чтение: главы «романа» Элиаса (300+ слов, литературный регистр). Слух: would've, had /əd/.

### S9 — the Last Line (B2)
- **Нулевой русский.** Башня перестаёт переводить: «You don't need it now.»
- E1–E4: фразовые глаголы и идиомы высокой частоты (give up, go on, find out, turn into, come back, let go, look for, run out of, put off, take over) — как «двойные слова», которые бьют сильнее.
- E5–E8: регистры: официальный (Line), рыночный (Ledger), разговорный/сленг (Gutter), книжный (Элиас) — одна и та же мысль четырьмя способами; ученик учится узнавать тон.
- E9–E12: связный текст: абзац, связки (however, therefore, although, instead, finally), пунктуация как сила (точка завершает). Последний Мост — абзац из 8–10 предложений.
- Выход на реальные материалы: в эпилоге Дэн читает «настоящую» страницу манхвы (оригинальная, написанная для серии, без упрощений) и страницу документации; ученик читает их без подсказок.

### Сквозные лексические дорожки (все сезоны)
- **Жанровая дорожка (манхва/игры)** — 10–15 слов за сезон, чтобы потом узнавать их в чужих тайтлах: S1 tower, floor, gate, power, weak, strong, rank(пассивно); S2 rank, level, guild, duel, skill, reward, quest, master; S3 memory, curse, seal, ruin, ancient, awaken; S4 academy, exam, tournament, opponent, champion, defeat, victory, promise; S5 title, achievement, legend, bond, ally, betray; S6 machine, core, system, error, command; S7 illusion, trial, witness, traitor, verdict; S8 regret, sacrifice, fate, origin; S9 author, ending.
- **Фильмы/разговор:** с S2 — сокращения; с S5 — gonna/wanna; с S7 — вставные слова (well, actually, I mean, you know) в речи Tally, Пипа, Рука.
- **Документация:** S2E7 (первая инструкция) → S4E9 (механизмы) → S6 (целый сезон) → S9 (страница реальной документации).

---

## 7. Как приложение должно зеркалить прогресс ученика (идеи для реализации)

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

## 8. Правила уровня (кратко; примеры — в WRITING-GUIDE)

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
