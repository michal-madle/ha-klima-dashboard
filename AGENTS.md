# Agents – Klima

Agenti a společná pravidla jsou v [ha-dashboard-kit](https://github.com/michal-madle/ha-dashboard-kit/blob/main/AGENTS.md). Karta žádné vlastní kopie nemá. Zde je jen to, co platí pro Klima.

## Omezení (uživatel, 2. 11. 2026)

- Žádné AI a žádný Forecast. L4+ signály (trend, přítomnost, předpověď) zůstávají zakázané.
- Hlavní karta místnosti je odsouhlasená a zůstává. Nové věci patří do detailu místnosti, do upozornění a do automatizací.

## Zdroje specifické pro Klima

- Soukromý repozitář `ha-config`: `ha/entities.json` je obraz Home Assistantu, z něj je odvozená `klima/ENTITY_MAP.md`. Hodinový export Klimatu: `klima/hodiny/export_hodiny.py`.
