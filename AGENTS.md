# Agents – Klima

Agenti a společná pravidla jsou v [ha-dashboard-kit](https://github.com/michal-madle/ha-dashboard-kit/blob/main/AGENTS.md). Karta žádné vlastní kopie nemá. Zde je jen to, co platí pro Klima.

## Omezení (uživatel, 2. 11. 2026)

- Žádné AI a žádný Forecast. L4+ signály (trend, přítomnost, předpověď) zůstávají zakázané.
- Hlavní karta místnosti je odsouhlasená a zůstává. Nové věci patří do detailu místnosti, do upozornění a do automatizací.
- Výjimka jen pro větrací režim (uživatel 4. 11. 2026: „Popup na Větrací režim je dobrý začátek úpravy - chci vidět jak dlouho běží a jaký je pokles v místnostech a zda je možné zavřít okna. a předpověď kolik už hotovo atd.“): pokles CO₂, odhad dokončení a historie větrání (L4+) jsou tam povolené. Zbytek karty zůstává bez L4+, s výjimkou grafu CO₂ a PM2.5 v „Historii místnosti“ (uživatel 4. 11. 2026: „Klik na CO2/PM2.5 udělej rovnou graf podobně jako u teploty. Podobně zvýrazni větrání, otevřené okna atd.“): jen zaznamenané hodnoty, hranice z konfigurace a doby oken a Větrací režim, bez trendu, rychlosti změny a předpovědi.

## Zdroje specifické pro Klima

- Soukromý repozitář `ha-config`: `ha/entities.json` je obraz Home Assistantu, z něj je odvozená `klima/ENTITY_MAP.md`. Hodinový export Klimatu: `klima/hodiny/export_hodiny.py`.
