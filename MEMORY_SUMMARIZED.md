# Project Memory – Home Assistant Klima Dashboard

- Účel: mobilní (iPhone 14 Pro) Home Assistant dashboard „Domov“ – rychlý stavový přehled pěti místností (Ložnice, Pracovna, Maxík, Mikuláš, Obývák); vlastní karta přes HACS z GitHubu.
- Zdroj pravdy: `CURRENT_SPEC.md`.
- Entity: `ENTITY_MAP.md` (ID ověřená exporty ve složce `HA entities/`); chybějící entity se neodhadují.
- Historie a zamítnuté návrhy: `DESIGN_HISTORY.md` (jen archiv, nezávazné).
- Pravidlo: `CURRENT_SPEC.md` má vždy přednost před čímkoli jiným (historie, staré poznámky, kód, příklady).
- Jazyky: karta je česky, švédsky a anglicky podle jazyka Home Assistantu (jinak anglicky); texty jsou v `src/translations/` a každá změna textu upraví všechny tři jazyky najednou.
- Rozložení: uživatel používá zobrazení Panel (Masonry ne), na monitoru asi 2000 px; sloupce 1 / 2 / 3 / 4 od šířky karty 620 / 1000 / 1400 px, karta nejvýš 2300 px.
- Formáty: čísla, 12 / 24 h a pořadí dne a měsíce se berou z profilu Home Assistantu (`hass.locale`); PM2.5 0 µg/m³ je čistý vzduch, nikdy „Bez dat“ ani zastaralé.
- Topení popup: Ručně (posuvník teploty), Boost (pevných 25 °C) a Vypnuto mají dobu trvání jako teplá voda v Tado aplikaci; výchozí Boost 30 min, Ručně do další změny plánu, Vypnuto napořád; Vypnuto na dobu = ruční 5 °C přes `tado_ce.set_climate_timer`; odešle se 2 s po poslední změně.
