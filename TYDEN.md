# Týdenní ladění (klima)

Smyčka podle energetického repozitáře ([TYDEN.md](https://github.com/michal-madle/ha-energie-dashboard/blob/main/TYDEN.md)): jednou týdně se z dat zjistí, co nesedí, položím nejvýš 5 otázek, odpovíte i jednou větou a podle toho se upraví normy, prahy a předpověď. Čím dál míň otázek.

## Postup (asi 10 minut)

1. Spustíte export (token nikam neposílejte ani nevkládejte do chatu; skript ho čte z proměnné prostředí):

   ```bash
   export HA_TOKEN=<dlouhodobý přístupový token>
   python3 tools/export_hodiny_klima.py --url http://homeassistant.local:8123 --days 14 \
     --outdoor sensor.<venkovní teplota> --weather weather.<počasí>
   ```

   Token: profil uživatele v Home Assistantu → Zabezpečení → Dlouhodobé přístupové tokeny.
2. Pošlete mi `klima_hodiny.csv`, `okna_udalosti.csv`, `export_report.txt` (a volitelně vyplněné `popisky_sablona.csv`). V souborech nejsou tokeny ani polohy, jen hodinové hodnoty.
3. Z dat napíšu do tohoto souboru otázky (jen to, co data nepoví), vy odpovíte, já upravím parametry.

Připomínku nebo plánovaný úkol zatím nevytvářím; řekněte a nastavím (například neděle večer).

## Odpovědi (co o domě platí)

- **Pásma komfortu:** zima 20–24 °C, léto 21–25 °C; přepíná `input_select.house_mode` (Zima/Léto), které nic nezapíná ani nevypíná.
- **Obývací pokoj** žaluzie nemá.
- **Okna:** entity IKEA MYGGBETT pojmenované „dveře“ jsou ve skutečnosti okna.
- **Tado analytika a riziko plísně** nepoužíváte (vaše rozhodnutí); karta to nepředstavuje jako problém.
- Orientace oken a žaluzií, venkovní teplota a počasí: doplnit.

## Otázky (nejvýš 5; jen to, co data nepoví)

1. Jaké je ID entity venkovní teploty a `weather` entity? Bez toho nejde předpověď, model větrání ani export bez příkazové volby.
2. Jaké teploměry jsou v Maxíku, Mikuláši a Obýváku? V `ENTITY_MAP.md` chybí; bez nich nejsou normy ani předpověď pro tyto místnosti.
3. Co je „IKEA zásuvka“ a Synology NAS v Pracovně: je to zátěž, která topí místnost? (Vstup do modelu: stálý tepelný zisk.)
4. Mají obě klimatizace společnou venkovní jednotku? (Ovlivňuje, jestli lze modelovat každou zvlášť.)
5. Je u oken stav `on` = otevřeno? Skript to předpokládá; kdyby bylo naopak, všechny údaje o větrání by byly obrácené.

## Jak se měří, že to funguje

- Chyba předpovědi teploty (MAE +2 h) proti persistenci, viz [FORECAST.md](./FORECAST.md) (zatím nenaměřeno).
- Počet událostí podle normy za týden na místnost (cíl: nejvýš zhruba 3 za den, jinak se zpřísní práh).
- Kolik podkladů `popisky_sablona.csv` odpovídá šablonovým větám (co nesedí, se přepíše).
