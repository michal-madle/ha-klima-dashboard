# AUDIT

Audit konsolidace Memory (`/areas/climate-dashboard.md`, kopie `memories/climate-dashboard.md`), kořenových `.md` souborů a exportů `HA entities/*.json`. Vše níže je ověřeno čtením těchto zdrojů; nic nebylo domýšleno.

## 1. Konflikty nalezené v původní Memory

Stav k 23. 10. 2026: všech 16 konfliktů je uzavřeno rozhodnutím uživatele; platí sloupec „Rozhodnuto“. Rozhodnutí jsou zapsaná v `CURRENT_SPEC.md` a `ENTITY_MAP.md`, nahrazené znění v `DESIGN_HISTORY.md`.

| # | Konflikt | Rozhodnuto (23. 10. 2026) |
|---|---|---|
| 1 | **Prahy vlhkosti.** Memory (návrh stavů): Vlhko > 65 %, Sucho < 30 %; dřívější kořenový `CURRENT_SPEC.md` a `src/config.ts` mají 70 / 35. | **70 / 35 %** (Vlhko > 70 %, Sucho < 35 %). |
| 2 | **Velikost vlhkosti.** „menší a sekundární“ vs. „stejně velká jako °C“. | Teplota dominantní, vlhkost sekundární, ve velikosti navazující na „°C“. |
| 3 | **ID okna Ložnice**: Memory `binary_sensor.loznice_okno_loznice_okno` vs. export `binary_sensor.loznice_okno_loznice`. | Export (nejnovější). |
| 4 | **ID okna Pracovna**: Memory `binary_sensor.pracovna_okno_pracovna_door` vs. export `binary_sensor.pracovna_okno_pracovna`. | Export. |
| 5 | **ID klimatizací**: Memory `climate.obyvaci_pokoj_ac_obyvak`, `climate.miki_ac_miki` vs. export `climate.obyvak_ac_obyvak`, `climate.mikulas_ac_mikulas`. | Export. |
| 6 | **Radiátory**: Memory `climate.<m>_<m>` (původní core integrace) vs. `climate.<m>_tado_ce_<m>` (Topení). | Topení (`climate.<m>_tado_ce_<m>`) je zdroj. |
| 7 | **Žaluzie**: Memory uvádí staré `cover.shelly2pmg4_*` i nové názvy. | Nová ID z exportů. |
| 8 | **Sezónní přepínač**: `input_boolean.zaluzie_leto` vs. `input_select.house_mode`. | `input_select.house_mode`. |
| 9 | **Podtitulek „LÉTO · Hlavní systém …“** vs. „v hlavičce nesmí být Zima/Léto“. | Žádný text Zima/Léto. |
| 10 | **Klepnutí / dlouhý stisk**: 19. 10. „klepnutí = detail, dlouhý stisk přepíná“ vs. 22. 10. konkrétní akce. | Jen akce z 22. 10.; klepnutí nic nepřepíná. Dlouhý stisk zatím není rozhodnut (nic se neimplementuje). |
| 11 | **Detail**: Bubble Card popup (21. 10.) vs. dialogy ve vlastní kartě (22. 10.). | Dialogy ve vlastní kartě. |
| 12 | **Název místnosti**: „Obývací pokoj“ vs. „Obývák“. | Obývák. |
| 13 | **Teplotní hranice stavů**: „Teplo ≥ 23,5 / Chladno ≤ 19,5“ vs. pásma. | Pásma: Zima 20–24 °C, Léto 21–25 °C. |
| 14 | **Stavy**: starší seznam vs. finální seznam. | Finální seznam. |
| 15 | **Kořenový `DESIGN_HISTORY.md`** tvrdil, že Topení je potvrzeno jen pro Ložnici. | Exporty (potvrzují všech pět místností). |
| 16 | **WindFree**: spínače `switch.windfree_*` vs. preset `wind_free`. | Preset `wind_free`. |
| 17 | **Boost u Topení**: uživatel chce ovládání Vypnuto / Plán / Ručně / Boost, ale mechanismus Boostu u integrace Topení (preset `boost`, nebo vlastní služba) není potvrzen. | Karta nabízí Boost jen tehdy, když `climate` entita uvádí `preset_modes` s `boost`; jinak je volba zašedlá. Čeká na ověření atributů entity v Nástroje → Stavy. |

## 2. Zastaralé informace vhodné ke smazání

V Memory `/areas/climate-dashboard.md` (a kopii `memories/climate-dashboard.md`):

- Celý starší blok před nadpisem „Mobile-first Domov“ (první design z Mushroom karet, rozložení čtyři + jedna místnost, tlačítka žaluzií, `number.naklopeni_*`, „Mushroom test“/„Styly“, „button card hero“, přepínač AC/radiátor podle `zaluzie_leto`).
- Staré a přejmenované entity: `cover.shelly2pmg4_*`, `cover.miki_zaluzie_miki`, `binary_sensor.pracovna_okno_pracovna_door`, `binary_sensor.loznice_okno_loznice_okno`, `climate.obyvaci_pokoj_ac_obyvak`, `climate.miki_ac_miki`, `climate.<m>_<m>` (původní core integrace), `switch.windfree_*`, `input_boolean.zaluzie_leto`.
- „Proposed state ladder“ (Prašno, Vyvětrat, Větrá se, 19,5 / 23,5) a „Proposed HVAC wording“, pokud nejsou potvrzeny.
- Podtitulek „LÉTO · Hlavní systém …“, návrh panelu ze dvou sloupců a Bubble Card detailu.
- Doporučení: po schválení nahradit celý soubor obsahem `MEMORY_SUMMARIZED.md` a odkazem na repozitář; historii nese `DESIGN_HISTORY.md`.

V projektu:

- `memories/` v repozitáři jsou kopie, které stárnou; ponechat jen jako archiv nebo odstranit.
- `CLAUDE.md`, `AGENTS.md` a `.github/skills/`, `.github/evals/`, `.github/scripts/*.py` se týkají jiného (obecného Home Assistant / plugin) repozitáře, ne tohoto dashboardu. Zvážit odstranění nebo přesun mimo repozitář.
- `/areas/home-automation.md`, `/areas/home-assistant.md` v Memory obsahují mnoho tématu mimo dashboard (FVE, wallbox, míchání vody, BMW); do projektu nepatří.

## 3. Duplicity

- Pravidla Topení (Plán/Ručně/Vypnuto, 5 °C, vlny) jsou v Memory opakovaně na několika místech; stejně tak zdroje dat ALPSTUGA, popis panelu žaluzie, komfortní pásma, House Mode a chování při chybějících datech.
- Totéž v kořenových `.md`: pravidla stavů a Topení/Klimatizace jsou zároveň v `CURRENT_SPEC.md`, `.github/copilot-instructions.md` a `README.md`.
- Prahové hodnoty jsou ve třech místech (spec, `src/config.ts`, `examples/…yaml`) – a už se rozcházejí (viz 1.1).
- Seznamy entit Ložnice jsou v Memory, ENTITY_MAP i příkladu YAML.
- `ha-klima-dashboard.js` v kořeni a `dist/` jsou záměrně shodné (generovaný soubor).
- Dvě sady entit topení (původní core integrace i nová) pro každou místnost.

## 4. Chybějící informace pro implementaci

Stav k 23. 10. 2026: bod 1 vyřešen (70 / 35 %), bod 2 rozhodnut (teplota, vlhkost, CO₂, PM2.5 a House Mode), bod 5 navržen (dobrý < 15, zhoršený 15–34, špatný ≥ 35 µg/m³, čeká na potvrzení). Ostatní body zůstávají otevřené.

1. Potvrzení prahů vlhkosti (65 / 30 vs. 70 / 35).
2. Které hodnoty jsou „nezbytná data“ pro stav „Bez dat“ (teplota? vlhkost? CO₂? PM2.5?). Čtyři místnosti dnes CO₂ a PM2.5 nemají.
3. ALPSTUGA (teplota, vlhkost, CO₂, PM2.5) pro Maxík, Mikuláš, Obývák; CO₂ a PM2.5 pro Pracovnu; typ teploměru v Pracovně.
4. Venkovní entity: aktuální teplota, min/max, pravděpodobnost deště, venkovní PM2.5 (Sensor.Community) a jejich ID.
5. Hranice pro „dobrý / zhoršený / špatný“ venkovní vzduch (PM2.5 v µg/m³).
6. Co přesně jsou „upozornění“ na Domov a odkud se berou.
7. Ověření `input_select.house_mode` (existence, přesné hodnoty Zima/Léto).
8. Význam stavu MYGGBETT (on = otevřeno) a zda dveře na zahradu v Obýváku smějí být tak zobrazeny jako „okno“ (uživatel to potvrdil jako OK).
9. Hodnoty Overlay u Topení pro Ručně a Vypnuto (v exportech jen `Schedule`).
10. Konkrétní barvy: Plán, Ručně, režimy Klimatizace (cool, dry, fan, heat, auto), WindFree, vlny vytápění, vlhkost; finální paleta žaluzií (testovací).
11. Ovládání v detailu (Klimatizace, Topení), zda existuje; chování dlouhého stisku.
12. Přesná šířka panelu žaluzie (jen relativně: stará dvojice +20–30 %), počet lamel, přesná neprůhlednost (rozsah 20–30 %).
13. Jednotky a zaokrouhlení (např. desetiny °C, hodnota CO₂ bez desetin), chování při „stale“ datech.
14. Ověření kontrastu, čitelnosti venku a vzhledu na OLED na skutečném zařízení zatím neproběhlo.

## 5. Doporučení pro budoucí údržbu projektu

- Jedno pravidlo: změna rozhodnutí se zapíše nejdřív do `CURRENT_SPEC.md`; staré znění se přesune do `DESIGN_HISTORY.md` (s důvodem).
- `ENTITY_MAP.md` měnit jen z nového exportu entit; export aktualizovat po každém přejmenování.
- Nekopírovat pravidla do README, `copilot-instructions.md` ani komentářů v kódu; tam jen odkaz na `CURRENT_SPEC.md`.
- Prahy držet na jednom místě (konfigurace karty) a po schválení opravit `src/config.ts` a příklad YAML tak, aby odpovídaly spec.
- Živou Memory zkrátit na `MEMORY_SUMMARIZED.md`; složku `memories/` v repozitáři vyřadit nebo označit jako archiv.
- Z repozitáře odstranit nepatřičné soubory (`CLAUDE.md`, `.github/skills`, `.github/evals`) nebo je přesunout do samostatného repozitáře.
- Datum a krátký popis změny přidávat jen do `DESIGN_HISTORY.md`, ne do spec.
- Před implementací karty: vyřešit body 4.1–4.6 (jsou to jediná místa, kde by implementace jinak musela hádat).
- Po každém vydání ověřit vizuálně na iPhonu (kontrast, venkovní čitelnost, OLED) a výsledek zapsat do spec sekce Barvy.
