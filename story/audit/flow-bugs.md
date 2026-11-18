# Flow / flow-mcp — баги этой ночи

Код: `C:\Users\Laptop\flow-mcp\src` (`flow.ts`, `core.ts`, `chrome.ts`).  
Лог с ошибкой агента: `…\terminal\call-e29da48a-…-430.log` (s2e07, job `a9268469`).  
`flow.ts` / `dist` сейчас правит другой человек — здесь только разбор.

---

## 1. Agent: «Something went wrong… What do you want to create?»

| | |
|---|---|
| **Где** | `flow.ts` → `agentRound` (читает ответ) → `runAgentBatch` (бросает `Flow's agent could not run this batch…`) |
| **Что** | Агент не рисует; в чате текст Flow: *Something went wrong. Please try again. What do you want to create?* |
| **Триггер** | Тяжёлый пакет: много jpeg/рефов + длинный общий скрипт. В логе s2e07: **16 панелей**, **7 refs** (`DanV…ThorneV`), prompt ~2135. Позже те же панели прошли кусками по 8 и с 4 refs. Длинный `--hint` / слова вроде injured тоже повышают шанс (см. Claude.md). |
| **Не путать** | Это ответ **сервера Flow**, не Playwright-таймаут. |

---

## 2. «attaching reference N of N» и долгий вис

| | |
|---|---|
| **Где** | `flow.ts` → `runAgentBatch` (`uploading reference…` + `uploadAsset`) и `agentRound` (`attaching reference…` + `attachAsset`) |
| **Что** | Шаг висит ~30+ с на открытии Asset list / загрузке файла (замер в `story/audit/flow-speed.md`: ~31 с на один attach). |
| **Триггер** | Путь **файла** (jpeg из `_cast`): каждый батч снова `uploadAsset` → `filechooser` → обработка плитки `fm-…`. Пикер иногда не открывается с первой попытки (3 ретрая в `attachAsset`). Страница занята / меню Upload ещё закрывается. |

### Уже сделано в `D:\English\tools\art\flow_batch.py`

`_ref_image()` больше **не** отдаёт путь к `~/flow-mcp-out/_cast/<Name>V.jpeg`. Всегда:

```python
return "asset:" + n
```

Комментарий в коде: *Uploading a portrait file on every batch makes the agent hang.*  
`uploadAsset` при `asset:` только снимает префикс и **не** грузит файл. Плюс укорочены style/`COMMON_RULES` и обрезка длинных промптов (>900 → ~75%).

Нужно: чтобы `DanV`/`MiraV`/… уже были **в проекте Flow** (character или media с тем же именем). Регистрация через `/character` сама по себе глючная — см. §5.

---

## 3. «tile menu has no Download item, offered: deleteDelete»

| | |
|---|---|
| **Где** | `flow.ts` → `downloadTile` |
| **Что** | В меню плитки нет `Download`; `textContent` пункта Delete склеивается в `deleteDelete` (иконка + подпись без пробела). |
| **Триггер** | Смена вёрстки Flow: Download убрали/перенесли с menuitem; либо открыли меню не той плитки (upload/reference без Download — старый кейс 2026-10-09 в комментарии у `freshMedia`). |
| **Частичный обход уже в src** | Если menuitem Download нет — Escape и клик по кнопке Download **на плитке**. Если и её нет — старая ошибка после 3 попыток. Пока чужая правка `flow.ts` не закончена и `dist` не пересобран/core не перезапущен — поведение в рантайме может отличаться. |

---

## 4. «Flow has no x1 option»

| | |
|---|---|
| **Где** | `flow.ts` → `pickRadio` ← `applySettings` (одиночные image/video). Текст: `Flow has no "x1" option for the current mode/model.` |
| **Что** | Радио `x1` нет в текущем popover настроек. |
| **Триггер** | Смена UI/модели: для части режимов счётчик вариантов скрыт или переименован. |
| **Агент** | В `setAgentSettings` x1 уже **не обязателен** (если радио нет за 2 с — пропускают). Ломается в основном **не** agent-batch, а one-by-one / video через `applySettings`. |

---

## 5. `page.goto` ERR_ABORTED на `/character` и «A generation is running»

### ERR_ABORTED /character

| | |
|---|---|
| **Где** | `flow.ts` → `createCharacter` (`waitForURL(/\/character$/)` + fallback `safeGoto(…/character)`); тот же `safeGoto` в `chrome.ts` |
| **Что** | SPA Chrome на Windows рвёт hard navigation (`net::ERR_ABORTED`), хотя URL часто уже нужный. |
| **Триггер** | Любой заход на создание/редактор персонажа. Поэтому в Claude.md: *регистрация персонажей во Flow ненадёжна*. |
| **Уже в src** | `safeGoto` глотает ERR_ABORTED и ждёт DOM; fallback прямым URL. Всё равно `waitForURL` часто таймаутится. |

### «A generation is running…»

| | |
|---|---|
| **Где** | `core.ts` константа `BUSY` — на `assets` / `download` / `character` / `new_project` / … пока `queue.busy` |
| **Что** | API отказ: второе действие на той же вкладке Flow, пока идёт генерация. |
| **Триггер** | Параллельный вызов (второй pipeline, MCP tool, ручной character) без `flow_wait`. Это **не** баг UI — замок очереди. |

---

## Пока идёт чужая правка `flow.ts` — нельзя

- Править / пересобирать `C:\Users\Laptop\flow-mcp\src\flow.ts` и `dist`.
- Убивать node на **8787** (живой core).
- Запускать генерацию / agent batch «для проверки» поверх чужой сессии.
- Снова переключать `_ref_image` на jpeg-файлы без согласованного фикса upload/attach в flow-mcp.
- Параллелить два Flow-задания на одну вкладку (получите BUSY или порвёте страницу).
- Массово звать `flow_character` / `/character`, пока не стабилизируют навигацию.

Можно: читать код и логи; держать `flow_batch.py` на `asset:`; резать размер батча и число refs; ждать `flow_wait` перед другими API.
