# Nástěnka Klima pro Home Assistant

Vlastní Lovelace karta pro mobilní přehled klimatu v pěti místnostech. Aktuální
prototyp obsahuje responzivní rozložení, stav místnosti, hodnoty prostředí,
řádky Tado CE a Samsungu a náhled žaluzie.

## Dokumentace

- [CURRENT_SPEC.md](./CURRENT_SPEC.md) = aktuální specifikace a zdroj pravdy
- [ENTITY_MAP.md](./ENTITY_MAP.md) = mapování entit používaných nástěnkou
- [DESIGN_HISTORY.md](./DESIGN_HISTORY.md) = historie návrhu a nahrazená rozhodnutí
- [MEMORY_SUMMARIZED.md](./MEMORY_SUMMARIZED.md) = stručná projektová paměť
- Původní poznámky: [memories/climate-dashboard.md](./memories/climate-dashboard.md)

Pro aktuální chování a návrh má přednost `CURRENT_SPEC.md`, poté `ENTITY_MAP.md`.
Historická rozhodnutí nejsou závazná.

## Vývoj

Vyžaduje Node.js 20.19+ nebo 22.12+.

```sh
npm install
npm run build
```

Výsledná samostatná ES module karta je `dist/ha-klima-dashboard.js`.

## Ruční instalace do Home Assistantu

1. Zkopírujte `dist/ha-klima-dashboard.js` do `/config/www/ha-klima-dashboard.js`.
2. V dashboardu přidejte zdroj `/local/ha-klima-dashboard.js` typu `module`.
3. Vložte konfiguraci karty z [examples/dashboard-card.yaml](./examples/dashboard-card.yaml)
   do požadovaného pohledu. Ukázka používá entity z [ENTITY_MAP.md](./ENTITY_MAP.md);
   dosud nezmapované hodnoty záměrně nechává prázdné.

Nastavení aktuální polohy a naklopení žaluzie vyžaduje atributy
`current_position` a `current_tilt_position`. Karta zobrazuje `--` nebo přerušovaný
náhled, pokud data nejsou dostupná.

## Rozsah prototypu

Karta je základ připravený pro další iteraci podle specifikace. Historické grafy,
mikrotrendy, detailní akce po klepnutí a konečné vizuální doladění palety zatím
nejsou implementovány. Entitám, které nejsou v mapě potvrzené, nepřiřazujte
odhadnutá ID.
