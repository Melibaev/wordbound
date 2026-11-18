# Flow cast registration

Date: 2026-11-17T20:31:06.470Z
Verified: 2026-11-17 (search on Characters page; duplicates trashed)

| Name | Result |
|---|---|
| DanV | ok — create from `images/refs/dan.jpg`; duplicate + Untitled moved to trash |
| MiraV | ok — already existed; `flow_character_edit` with look |
| SilentV | ok — already existed; `flow_character_edit` with look |
| KeeperV | ok — create from image |
| PipV | ok — create from image |
| RukV | ok — create from image |
| ThorneV | ok — create from image |
| SoupV | ok — create from image |
| LinaV | ok — create from image |
| OdessaV | ok — create from image |
| DashV | ok — create from image |
| PeriodV | ok — create from image |
| TallyV | ok — create from image |
| BellV | ok — create from image |
| HobV | ok — create from image |

Use in scenes: `asset:DanV`, `asset:MiraV`, … (exact name).

## Verified present (unique)

DanV, MiraV, SilentV, KeeperV, PipV, RukV, ThorneV, SoupV, LinaV, OdessaV, DashV, PeriodV, TallyV, BellV, HobV

Old non-V names still in project (untouched): Lina, Pip, Silent, Keeper, Traderin.

## Log

```
status url=https://flow.google.com/project/ecc209e3-8a97-44f6-afe0-fde61d4f7197
already: DanV, Untitled character, SilentV, MiraV, Lina, Traderin, Pip
DanV: already present, look saved (0s)  # created just before batch
MiraV: edit ok (48s)
SilentV: edit ok (36s)
KeeperV..HobV: create ok (~8s each)
cleanup: duplicate DanV + Untitled → ZZ_DELETE_* → Move to trash
final search: all 15 *V unique, ZZ_DELETE none
```

## Notes

- Поломка flow-mcp: на Windows `page.goto(.../character)` даёт `net::ERR_ABORTED` даже когда страница открылась. В `createCharacter` fallback заменён на уже существующий `safeGoto`; upload ждёт видимый Upload и не оставляет filechooser unhandled rejection. Исходник: `C:\Users\Laptop\flow-mcp\src\flow.ts` (пересобран `npx tsc`). MCP-процесс Grok всё ещё со старым `dist` в памяти — для штатного `flow_character` нужен рестарт MCP.
- Регистрация этого прогона шла one-shot скриптом по CDP (тот же Chrome), не через MCP `flow_character`, потому что живой MCP держал старый код.
- `MiraV` / `SilentV`: имя уже было → edit (перерисовка look), второе имя не создавалось.
- Looks записаны в `%USERPROFILE%\.flow-mcp\characters.json`.
