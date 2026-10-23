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

Výsledný samostatný ES module soubor `ha-klima-dashboard.js` vznikne v kořeni
repozitáře. Je součástí HACS balíčku; `hacs.json` na něj odkazuje.

## Instalace přes HACS

1. V HACS otevřete **Frontend** → nabídku **⋮** → **Vlastní repozitáře**.
2. Přidejte `https://github.com/michal-madle/ha-klima-dashboard` jako kategorii **Dashboard**.
3. Najděte **Klima Dashboard** a zvolte **Stáhnout**.
4. Pokud HACS zdroj karty nepřidá automaticky, otevřete **Nastavení → Nástěnky → Zdroje**
   a přidejte `/hacsfiles/ha-klima-dashboard/ha-klima-dashboard.js` jako **JavaScript module**.
5. Do pohledu vložte konfiguraci z
   [examples/domov_prototyp_loznice.yaml](./examples/domov_prototyp_loznice.yaml).
   Příklad pokrývá všech pět místností; doplňuje jen potvrzené entity podle
   [ENTITY_MAP.md](./ENTITY_MAP.md), ostatní hodnoty zůstanou prázdné.

Po instalaci obnovte stránku Home Assistantu. Karta používá vlastní vykreslení, takže
nevyžaduje `button-card` ani jinou frontendovou kartu.

### Ruční instalace

1. Spusťte `npm install` a `npm run build`.
2. Zkopírujte `ha-klima-dashboard.js` do `/config/www/ha-klima-dashboard.js`.
3. V **Nastavení → Nástěnky → Zdroje** přidejte `/local/ha-klima-dashboard.js`
   jako **JavaScript module**.
4. Do pohledu vložte konfiguraci z
   [examples/domov_prototyp_loznice.yaml](./examples/domov_prototyp_loznice.yaml).

Karta pracuje s entitami, které jsou nastavené v konfiguraci místnosti. Chybějící nebo
nedostupné hodnoty zobrazí jako `––`; náhled žaluzie vyžaduje atributy
`current_position` a `current_tilt_position`.

## Rozsah prototypu

Karta je základ připravený pro další iteraci podle specifikace. Historické grafy,
mikrotrendy, detailní akce po klepnutí a konečné vizuální doladění palety zatím
nejsou implementovány. Entitám, které nejsou v mapě potvrzené, nepřiřazujte
odhadnutá ID.
