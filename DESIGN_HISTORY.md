# DESIGN_HISTORY – historie projektu

Jen archiv. Nic z tohoto dokumentu není závazné; platí `CURRENT_SPEC.md`. Pravidla vedení: `AGENTS.md` kitu, oddíl Dokumentace. Nové záznamy (2. 11. 2026 a dál) jsou v oddíle Záznamy, starší jsou níže ve formátu Navrženo → Opuštěno → Nahrazeno. Stav záznamu: **potvrzeno**, **nahrazeno**, **zamítnuto**, **nepotvrzeno** (otázka položena uživateli v chatu, do spec nepatří).
Formát každého bodu: **Navrženo** → **Opuštěno, protože** → **Nahrazeno**. Kde Memory důvod nezaznamenává, je to uvedeno.

## 2026-11-04 · Příklad YAML: čidla všech místností vyplněna podle Ložnice (potvrzeno uživatelem)

- Uživatel 4. 11. 2026: „Oprav mi ty nevyplnene carbon_dioxide apod. Podle loznice. Ve vsech mistnostech e to same (krome obyvak, ten nema zaluzie).“ a „Koukni na HA_COnfig, jsou tam exportovane entity.“ Práce na `main`.
- Změněno v `examples/domov_prototyp_loznice.yaml`: Pracovna, Maxík, Mikuláš a Obývák mají `temperature`, `humidity`, `carbon_dioxide` a `pm25` stejným vzorem jako Ložnice (`sensor.<místnost>_teplomer_<místnost>_…`). Každé ID je v obrazu Home Assistantu `ha-config/ha/entities.json` (1861 entit z 4. 11.). Obývák nemá `false` u CO₂ a PM2.5 (spec: Obývák má čidlo jako ostatní, jen žaluzie ne). `ventilation_timer_entity` je `timer.ventilation_mode`, entita je v obrazu.
- Nahrazeno: prázdné klíče s poznámkou „ID zatím chybí“ a `carbon_dioxide: false` / `pm25: false` u Obýváku.
- Test scénáře `real` upraven: všechny místnosti mají čidla, bez entity režimu domu hlásí každá „Bez dat · režim domu“ a blok CO₂ / PM2.5 je aktivní i v Obýváku. `npm test`: 31 testů prošlo.

## 2026-11-04 · Obraz Home Assistantu v `ha-config`, vazba na kit (potvrzeno uživatelem)

- `ENTITY_MAP.md` je v `ha-config` jako `klima/ENTITY_MAP.md`, entity ověřuje jeden obraz `ha/entities.json` (místo `klima.json` a šablony). Nový `klima.json` z 4. 11. byl omylem export Energie; místnosti (465 entit s oblastmi) jsou obnoveny z historie `ha-config`. Podrobnosti a slova uživatele: `DESIGN_HISTORY.md` kitu, záznam z 4. 11. (ha-config jako obraz HA).
- `package.json` a `package-lock.json`: kit připnut na `79c0d626…` místo `e96c781…`, který zmizel při squash `main` kitu.
- Po prvním skutečném obrazu (4. 11., 1815 entit): v mapě je automatizace pro Ložnici `automation.loznice_obnova_topeni_pri_zavrenem_okne_loznice` (dřív bez předpony `loznice_`). Podrobnosti: `DESIGN_HISTORY.md` kitu, záznam z 4. 11. (práce na `main`).

## 2026-11-04 · Soukromá data přesunuta do `ha-config` (potvrzeno uživatelem)

- Uživatel 4. 11. 2026: „Udelal jsem uklid. adresare HA entities, tools a exporty jsem presunul do privatniho ha-config.“ a „Klidne cokoli uprav, smaz, presun - i mezi repository. Pokud bys nasel dalsi veci co patri jinam, uprav to.“ Kde to bude a jak se to bude jmenovat, je mu jedno; nesmí se nic ztratit.
- Přesunuto do soukromého repozitáře `ha-config`, složka `klima/`: `HA entities/klima.json` → `entity/klima.json`, `HA entities/export_entit.jinja` → `entity/klima.jinja`, `HA entities/README.md` → `entity/README.md` (postup exportu v `README.md` repozitáře `ha-config`), `tools/export_hodiny_klima.py` → `hodiny/export_hodiny.py`, `tools/test_export_hodiny_klima.py` → `hodiny/test_export_hodiny.py`. Konfigurace Home Assistantu (větrací režim) z `HA config/` v kitu → `yaml/` v `ha-config`.
- Uživatel 4. 11. 2026: „entity map taky přesun. V dashboardu budou jen veřejné věci. Private budou v ha-config. Tvrdé pravidlo“ (pravidlo 12 v `AGENTS.md` kitu). `ENTITY_MAP.md` je v `ha-config` jako `klima/entity/ENTITY_MAP.md`; z `README.md` odstraněn oddíl „Týdenní ladění (export hodinových dat)“.
- Opraveny odkazy v `README.md`, `AGENTS.md` a `CLAUDE.md`. Cesty ve starších záznamech této historie (`HA entities/`, `tools/`, `HA config/`) odpovídají stavu před přesunem.

## 2026-11-03 · Štítek a popup „Větrací režim“ v souhrnu domu (potvrzeno; kód karty zatím neupraven)

- Uživatel 3. 11. 2026: „Chci v klima kartě vidět že je Vent mode on. Nahoře vedle otevřených oken a zapnutých klimatizací. Na rozklik uvidím jak dlouho už běží / kdy skončí a taky ho můžu ukončit ručně.“ Chování režimu je potvrzené v `CURRENT_SPEC.md` kitu (oddíl Home Assistant: větrací režim). Do spec Klimatu se nic nezapsalo.
- Návrh: štítek „Větrací režim“ (en Ventilation mode, sv Ventilationsläge) v souhrnu domu hned za štítkem oken, jen když je `input_boolean.ventilation_mode` zapnutý; ikona ventilátoru, barva Plánu. Klepnutí otevře popup ve stejném rámu jako „Okna“: řádky „Běží 4 min“ (z `last_changed`) a „Skončí nejpozději 14:32“ (z `timer.ventilation_mode`, `finishes_at`; při neplatném časovači „––“), věta „Dřív skončí zavřením posledního okna.“ a tlačítko „Ukončit“ (`input_boolean.turn_off`). Zapnutí z karty ne, notifikace ne, odpočet ne.
- Konzultace s agenty: `klima-expert` (signály L1–L3, žádné L4+), `idea-generator` (štítek a popup bez dalších prvků, název „Větrací režim“ kvůli kolizi s režimem klimatizace „Větrání“), `ux-architect` (návrh výše), dva `dashboard-critic` (návrh: upravit, žádný nález mimo rozhodnutí níže; kód HA: nálezy opraveny v kitu).
- Uživatel po návrhu a otázkách: „Vše kromě repa ok. Uprav to.“ Potvrzeno: Ukončit jedním klepnutím (výjimka v Chráněném ovládání kitu), název „Větrací režim“, pořadí hned za okny, barva Plánu, oprava rozporu ve spec (věta „Štítky nejsou klikací“ neplatila už dříve: štítky Topí, Ručně, Boost a Klimatizace jsou klikací).
- Zapsáno 3. 11. 2026: `CURRENT_SPEC.md` (nový oddíl Větrací režim, Cíl projektu, Dashboard Domov, Detail místnosti, Klikací akce, Barvy, Jazyky, Chybějící data, Konfigurace), `ENTITY_MAP.md` (`input_boolean.ventilation_mode`).
- Rozhodl Claude, změnitelné: klíče `ventilation_entity` a `ventilation_timer_entity` bez výchozích hodnot (kit: entity výchozí hodnotu nemají); ikona ventilátoru shodná s režimem klimatizace „Větrání“ (oponent navrhl odlišit, významově je shodná).
- Implementováno 3. 11. 2026 (`src/summary.ts`, `ha-klima-dashboard.ts`, `styles.ts`, `types.ts`, `config.ts`, překlady cs / en / sv, příklad YAML, README, test „větrací režim“; `npm test`: 31 testů prošlo). Snímky tmavého i světlého režimu na 393, 320 a 852 × 393 px ve třech jazycích prohlédli `ux-architect` a `dashboard-critic`; bez BLOCKERu. Opraveno po revizi: informační řádky popupu jsou jedna skupina s oddělovačem (ne dlaždice jako klikací řádky), Ukončit má výplň 24 % i ve světlém režimu a běžné písmo, chyba má 14 px, ID časovače v příkladu YAML je prázdné do potvrzení exportem.
- Poznámky revize, neřešeno: štítek větrání odsune „Topí …“ na druhý řádek a karty místností se při startu a konci režimu posunou o řádek štítků; výchozí rozdíl řádků popupů (poloměr 16 px, popisek 15 px, hodnota 17 px) proti `DASHBOARD_UX_SYSTEM.md` platí i pro popupy Okna a Kvalita vzduchu; `last_changed` režimu se po restartu Home Assistantu nastaví na čas restartu, režim se ale po restartu vypíná.
- Nepotvrzeno, čeká na HA: `timer.ventilation_mode` (atribut `finishes_at`) není v žádném exportu; do `ENTITY_MAP.md` se zapíše po restartu HA a novém exportu, spec ho zatím jmenuje jen jako „časovač režimu“. Kód karty a příklad YAML nové klíče zatím nemají (spec je před kódem).

## 2026-11-03 · Typografie čísel z Energie v Klimatu (nepotvrzeno, otázka položena D. M.)

- Uživatel 3. 11. 2026 u nového společného pravidla „číslo 17 px tučně, jednotka 12 px šedě“ (Energie, dlaždice diagramu): „Ano změn všude“.
- Kolize: `CURRENT_SPEC.md`, Jednotná velikost: hodnoty i jednotky (ppm, µg/m³, „· 21 °C“) mají v řádcích místnosti stejnou velikost a liší se jen šedou; `AGENTS.md`: hlavní karta místnosti je odsouhlasená a zůstává. Klima nemá dlaždice, takže se nic nezměnilo. Čeká se na upřesnění, které prvky a zda se má přepsat odsouhlasená jednotná velikost.

## 2026-11-02 · Úklid repozitáře: cizí soubory a mrtvý kód (potvrzeno uživatelem)

- Uživatel: „Promaž z Gitu Energy i klima vše co není potřebné - .github Evals, skills, scripts, atd. Dead code pryc.“
- Smazáno v Klimatu: `.github/skills/` (HA skills), `.github/evals/` (30 případů), `.github/scripts/`, `.github/CLAUDE.md` (soubory jiného projektu); odkazy na ně z `CLAUDE.md` a `.github/copilot-instructions.md`. Zůstává `.github/copilot-instructions.md`. Kontrola `check-docs` kitu už cizí složky nevynechává.
- Mrtvý kód: nepoužité importy, konstanta `CLIMATE_MODE_ORDER`, nepoužité překlady (`fixedTemperature`, `offTarget`), nepoužité CSS třídy posuvníku Topení (`heat-control`, `heat-slider`, `slider-*`, `heat-detail`, `heat-fixed`), nepoužitý re-export `LANGUAGES`. `_clock` zůstává: je to stav, jehož změna přerenderuje kartu.
- Ponecháno: `tools/export_hodiny*.py` (export dat, popsaný v README), vygenerovaný `ha-klima-dashboard.js` (HACS), `LICENSE`.

## 2026-11-02 · Texty podle jazyka v konfiguraci (potvrzeno uživatelem)

- Uživatel: „Název více jazykově super. To chci všude. Každý name i title bude mít podporu multilamguage. Energy i klima Dashboard. Připrav i examples.“
- Nahrazeno: „Nepřekládají se texty z konfigurace“. Nově `title`, `name` místnosti, okna a předvolby a `description` předvolby jsou text, nebo mapa jazyk → text (kit `localizedText`, `pickText`, pin `e96c781`). Identita místnosti (klíče, časovače, štítky souhrnu) je první uvedený název; zobrazuje se název v jazyce karty.
- Mimo: `house_modes.winter/summer` (jsou to stavy `input_select`, ne zobrazené názvy).

## Záznamy

### 2026-11-02 · Koncept větrání (návrh, nepotvrzeno, otázky položeny 2. 11. 2026)

Dokument `VENTILATION_CONCEPT.md` (252 řádků, „Návrh v0“ z 2. 11. 2026, bez implementace, bez AI a Forecastu) byl ze repozitáře odstraněn, protože obsahuje návrhy, které uživatel nepotvrdil. Plné znění: `git show 507d549:VENTILATION_CONCEPT.md`. Shrnutí závěru: větrání stojí na pěti pravidlech R1–R5 nad stávajícími daty; zobrazení ve skupině Upozornění nahoře na Domov (vzor z Energie) a ve třech řádcích popupu „Kvalita vzduchu“; karta místnosti beze změny; nejvíc hodnoty má „Zavřít okno“ (karta řekne, kdy je vzduch čerstvý); největší slabina: chybí venkovní PM2.5.

Otázky ze závěru dokumentu (nepotvrzeno): (1) Obývák má v exportu CO₂ (907 ppm) a PM2.5 (4 µg/m³), spec to zakazuje (`carbon_dioxide: false`, `pm25: false`, poznámka z 24. 10.) – zapnout obě veličiny a upravit spec? (2) Formát řádku Upozornění: titulek = situace (jako Energie), text = doporučení; potvrdit, že „stav není příkaz“ platí dál jen pro stav místnosti. (3) Přesunout tři druhy konfliktů ze štítků do Upozornění a dát Upozornění nad štítky souhrnu? (4) Hranice: zavřít okno při CO₂ ≤ 700 ppm, zapomenuté okno po 30 min v zimě; jiné hodnoty? (5) Venkovní PM2.5 (Sensor.Community): doplnit zdroj?

### 2026-11-02 · Odpovědi uživatele (potvrzeno)

- Klepnutí na řádky HVAC otevře běžící zařízení (větrání na klimatizaci v zimě). Boost u Tada není normální. Ostatní otázky z UX auditu uživatel nechápe a neřeší.

- Venkovní PM2.5 uživatele nezajímá. Smazání `AI_MCP.md` schváleno; AI se případně založí později načisto.

- Koncept větrání, hranice (uživatel 2. 11.): CO₂ ≤ 500 ppm (koncept navrhoval 700 ppm); zapomenuté okno po 30 min při venku o více než 5 °C méně, jinak po 1 h jako upozornění. Zapsáno do spec. Barvy a názvy entit uživatel neřeší (2. 11.).

- Obývák má ALPSTUGA jako ostatní místnosti (CO₂ i PM2.5): nahrazuje poznámku z 24. 10. „Obývák čidlo nemá“. Kód a `examples/domov_prototyp_loznice.yaml` mají zatím `carbon_dioxide: false` a `pm25: false` (spec je před kódem).
- Upozornění na Domov (formát řádku, přesun konfliktů ze štítků): uživatel „nevím, můžeme zkusit“ (povolení vyzkoušet, ne potvrzení pravidla).

### 2026-11-02 · Konsolidace dokumentace (potvrzeno)

- Uživatel 2. 11. 2026: „Zkonsoliduj všechny md soubory. Chci všude ukládat design history. Chci jen ověřené a potvrzené věci. Pokud něco není ověřené a potvrzené, ptej se tady ne v todo. Už nesmí nastat situace, že si někde koliduje zadání s nějakým jiným výstupem. Zápis si to a příště to udělej stejným způsobem.“ Pravidla jsou v `AGENTS.md` kitu, oddíl Dokumentace.
- Zrušeno a přeneseno do přílohy (původní znění): `TODO.md` (C1–C15), `AUDIT.md`, `MEMORY_SUMMARIZED.md`, `TYDEN.md`, `docs/archiv_pred_konsolidaci/` (část). Odstraněno bez náhrady (plné znění v gitu, commit 507d549): `VENTILATION_CONCEPT.md` (viz výše), `AI_MCP.md` (návod na AI Task a denní souhrn domu, v rozporu s omezením „žádné AI“), staré `docs/archiv_pred_konsolidaci/CURRENT_SPEC.md` a `ENTITY_MAP.md`.
- `HA entities/README.md` popisoval jiný export (358 entit Energie) a byl přepsán pro `klima.json` (465 entit).
- `ENTITY_MAP.md`: odstraněny oddíly „Rozpory export × spec“ a „Chybějící entity“ (přeneseno níže), přidán oddíl „Potvrzeno uživatelem (mimo export)“ pro `input_select.house_mode` a `script.zaluzie_posun`.
- Potvrzené odpovědi uživatele z `TYDEN.md` (pásma komfortu 20–24 °C zima a 21–25 °C léto, obývací pokoj žaluzie nemá, entity IKEA MYGGBETT „dveře“ jsou okna, Tado analytika a riziko plísně se nepoužívají) jsou ve `CURRENT_SPEC.md` (pásma, žaluzie, okna) nebo níže v příloze; ostatní ze `CURRENT_SPEC.md` odstraněno jako nepotvrzené (původní znění):
- Odstraněná věta o hranicích venkovního vzduchu: „Hranice venkovního vzduchu (návrh 23. 10., čeká na potvrzení; stejné hranice jako pro PM2.5 v místnosti): dobrý < 15 µg/m³, zhoršený 15–34, špatný ≥ 35. Hodnota 15 µg/m³ odpovídá 24hodinovému doporučení WHO z roku 2021. Chybí-li hodnota, zobrazí se „Vzduch venku: ––“.“
- „; co do nich patří, je otevřené, TODO C14“, „; sjednocení čeká na rozhodnutí (TODO K3 a K4 v kitu)“, „Tmavá paleta je testovací, není finální (ověřit kontrast, čitelnost venku a vzhled na OLED, TODO.md C3)“, „Ostatní barvy (režimy Klimatizace, Plán/Ručně) nejsou v Memory rozhodnuty“, „Návrh 24. 10. večer, čeká na potvrzení na displeji“ (u světlé palety): označení stavu bylo odstraněno; samotná tmavá a světlá paleta zůstává ve spec do odpovědi uživatele (otázka položena 2. 11.).

### Nepotvrzeno: dřívější oddíly `ENTITY_MAP.md` (Rozpory export × spec, Chybějící entity)

- CO₂ a PM2.5 v Obýváku: export má `sensor.obyvak_teplomer_obyvak_carbon_dioxide` a `_pm2_5` s hodnotami, spec a poznámka uživatele z 24. 10. říkají, že Obývák čidlo nemá (`carbon_dioxide: false`, `pm25: false`). Rozpor, otázka položena 2. 11. 2026.
- Chybí venkovní PM2.5 (Sensor.Community), denní minimum a maximum venkovní teploty a pravděpodobnost deště (zdrojem by byla předpověď, mimo rozsah), potvrzení, že `input_select.house_mode` existuje se hodnotami Zima/Léto (export ho neobsahuje), stav Topení Overlay „Vypnuto“ (v exportu `Schedule` a `Manual`, hodnota `Off` nepozorována); zrušené helpery bez role: `input_boolean.zaluzie_leto`, `switch.windfree_*`, `sensor.prumerna_teplota_domu`, `cover.zaluzie_dum`.
- Dvě vnitřní jednotky na jedné venkovní obvykle nemohou současně chladit a topit (ověřit v návodu k jednotkám).
- Vyřešeno 2. 11. 2026: teploměry Maxíku, Mikuláše, Obýváku a CO₂/PM2.5 v Pracovně (jsou v exportu), venkovní teplota (`sensor.openweathermap_temperature`), význam stavu okna (`on` = otevřeno, potvrdil uživatel), počet a rozdělení venkovních jednotek klimatizací.

## Nahrazené návrhy

1. **Nástěnka „Klima“ z Mushroom karet (říjen 2026)**
   - Navrženo: nativní nadpisová karta (teplota, vlhkost, okno červeně/zeleně), Klima a Radiátor jako dvě Mushroom climate karty vedle sebe, čtyři horní místnosti v jednom řádku, Obývák dole.
   - Opuštěno, protože: uživatel chtěl nástěnku „top pretty and clear“ s ikonami a stejným rozložením všech místností; konkrétní nedostatek Mushroom karet Memory nezaznamenává.
   - Nahrazeno: kartou ve stylu „button card hero“ (19. 10.), pak mobilní kartou Domov (21. 10.) a vlastní kartou z GitHubu (22. 10.).
2. **Ovládání žaluzií dlaždicemi**
   - Navrženo: tlačítka otevřít/stop/zavřít, tlačítko přepínající posuvník polohy a stále viditelný posuvník naklopení; naklopení přes pomocné `number.naklopeni_*`, protože nativní posuvník měl 0 vpravo.
   - Opuštěno, protože: cílem nové nástěnky je rychlé čtení stavu domu, ne monitoring; panel v kartě je jen zobrazení.
   - Nahrazeno: zobrazovacím panelem žaluzie v kartě místnosti + klepnutím na panel (standardní ovládání krytu).
3. **Dva posuvníky bez rámečku (poloha + naklopení)**
   - Navrženo: levý sloupec výplň shora, pravý sloupec tenká linka nahoře a mezera dole; panel začíná pod blokem CO₂/PM2.5.
   - Opuštěno, protože: panel má vypadat spíš jako okno/žaluzie než jako posuvník.
   - Nahrazeno: jedním sloupcem – miniaturou žaluzie se stálým počtem lamel (viz Vývoj room card).
4. **Zobrazení jen jednoho systému (AC nebo radiátor) podle sezónního přepínače**
   - Navrženo (19. 10.): na kartě buď klimatizace, nebo radiátor podle `input_boolean.zaluzie_leto`.
   - Opuštěno, protože: uživatel rozhodl, že oba HVAC řádky jsou vždy na kartě a sezóna mění jen pořadí a váhu.
   - Nahrazeno: oba řádky vždy na kartě, pořadí a váhu určuje `input_select.house_mode` (Zima/Léto).
5. **`input_boolean.zaluzie_leto`**
   - Navrženo: sezónní přepínač, měl být přejmenován na obecný letní režim.
   - Opuštěno, protože: je potřeba výběr se dvěma pojmenovanými hodnotami pro řazení HVAC a komfortní pásmo.
   - Nahrazeno: `input_select.house_mode` (Zima/Léto).
6. **Původní core integrace a teplota z Topení**
   - Navrženo: radiátory přes původní core integraci (`climate.<místnost>_<místnost>`), teplota místnosti z Topení.
   - Opuštěno, protože: Topení měří u radiátoru pod oknem, ALPSTUGA uprostřed místnosti; uživatel preferuje novou integraci Topení (nahrazuje core integraci).
   - Nahrazeno: ALPSTUGA pro teplotu/vlhkost/CO₂/PM2.5 a Topení (`climate.<místnost>_tado_ce_<místnost>`) pro vytápění. Původní core integrace se má odstranit (v exportech zatím stále existuje).
7. **Komfortní pásmo 19,5–23,5 °C (zima) a prahy Teplo ≥ 23,5 / Chladno ≤ 19,5**
   - Opuštěno, protože: osobní komfort uživatele (nesnáší teplo) má přednost; přesný důvod posunu na 20–24 °C Memory neuvádí.
   - Nahrazeno: pásmo Zima 20–24 °C, Léto 21–25 °C.
8. **Intenzita vytápění v procentech**
   - Navrženo: číslo (heating %), později 4 různé ikony.
   - Opuštěno, protože: uživatel chce kompaktní čtení podobné aplikaci pro ovládání topení (0–3 čárky), místo čísla.
   - Nahrazeno: ikonou 0–3 teplých vln s mezemi 0 / 1–34 / 35–67 / 68–100 %.
9. **Textový stav Klimatizace typu „Cooling“**
   - Opuštěno, protože: WindFree je preset `wind_free`, ne chlazení obecně; stav musí být čitelný z ikony a barvy.
   - Nahrazeno: sadou ikon stejné velikosti, textem „WindFree“ / „Chlazení“ / „Vypnuto“ a ikonou klimatizace (šedou při vypnutí).
10. **Přepínač WindFree `switch.windfree_*`**
    - Navrženo: šablonový switch na místnost, řádek WindFree viditelný jen při zapnutém chlazení.
    - Nahrazeno: čtením presetu `wind_free` z `climate` entity klimatizace. Memory explicitní zrušení spínačů nezaznamenává.
11. **Klepnutí = detail, dlouhý stisk = přepnutí (19. 10.)**
    - Nahrazeno: konkrétními akcemi (teplota → 24h historie, CO₂/PM2.5 → společný graf, žaluzie → standardní ovládání krytu). Chování dlouhého stisku novější spec nepotvrzuje.
12. **Detail jako Bubble Card popup s ApexCharts (21. 10., „později“)**
    - Nahrazeno: dialogy historie ve vlastní kartě (22. 10.). Memory zrušení Bubble Card neuvádí; ovládání Klimatizace/Topení v detailu zůstává nespecifikováno.
13. **Podtitulek „LÉTO · Hlavní systém Klimatizace“ / „ZIMA · Hlavní systém Topení“ pod titulkem Domov**
    - Opuštěno, protože: sezóna je patrná z pořadí HVAC řádků.
    - Nahrazeno: hlavičkou s venkovními podmínkami.
14. **ID entit přejmenovaná před konsolidací**
    - Žaluzie (18. 10.): původní `cover.shelly2pmg4_*` a `cover.miki_zaluzie_miki` → `cover.<místnost>_zaluzie_<místnost>`.
    - Klimatizace: `climate.obyvaci_pokoj_ac_obyvak`, `climate.miki_ac_miki` → `climate.obyvak_ac_obyvak`, `climate.mikulas_ac_mikulas`.
    - Okna: `binary_sensor.loznice_okno_loznice_okno` → `binary_sensor.loznice_okno_loznice`; `binary_sensor.pracovna_okno_pracovna_door` → `binary_sensor.pracovna_okno_pracovna`.
    - Opuštěno, protože: jde o přejmenování entit. Důvod je v Memory uveden jen pro žaluzie a okna (okna se jmenovala „door“, přestože nejde o dveře); u klimatizací důvod nezaznamenán.

15. **Prahy vlhkosti 65 % / 30 %**
    - Navrženo (návrh stavů v Memory, 21. 10.): Vlhko > 65 %, Sucho < 30 %.
    - Opuštěno, protože: uživatel při auditu (23. 10.) potvrdil 70 % / 35 %; v Memory žádný zdroj pro 70 / 35 není, platí jeho potvrzení.
    - Nahrazeno: Vlhko > 70 %, Sucho < 35 % (`CURRENT_SPEC.md`, `src/config.ts`).
16. **Vlhkost stejně velká jako teplota / menší než „°C“**
    - Opuštěno, protože: Memory si protiřečilo; uživatel rozhodl (23. 10.), že teplota dominuje a vlhkost je sekundární ve velikosti navazující na „°C“.
    - Nahrazeno: vlhkost ve velikosti jednotky „°C“ vedle teploty.

17. **Označování HVAC systémů názvy výrobců a integrací (Tado, Tado CE, Samsung)**
    - Opuštěno, protože: uživatel (23. 10.) rozhodl, že se na HVAC systémy odkazuje jen slovy **Topení** a **Klimatizace**; ID entit zůstávají beze změny.
    - Nahrazeno: názvy Topení / Klimatizace ve všech dokumentech, popiscích karty i v kódu. Klíče konfigurace místnosti: `tado` → `heating` (vnořené `heating` → `intensity`), `samsung` → `air_conditioner`. Starý zápis karta odmítne s chybovou hláškou.

18. **Mikrotrend teploty hned za číslem teploty, mikrotrendy 60 px široké (24. 10. ráno)**
    - Navrženo: mikrotrend teploty v bloku teplota/vlhkost; všechny tři mikrotrendy na svislici 120 px a široké jako panel žaluzie.
    - Opuštěno, protože: uživatel (24. 10.) chce teplotu číst u systémů, které ji ovlivňují, a delší, čitelnější trendy; vpravo od trendů zůstávalo prázdné místo.
    - Nahrazeno: dva stejně široké sloupce informačních řádků (hodnoty | trendy), trend teploty vedle řádků Topení a Klimatizace přes oba řádky.
19. **Normalizace mikrotrendu na lokální minimum/maximum každé místnosti**
    - Opuštěno, protože: místnost s 22–23 °C a místnost s 20–21 °C vypadaly stejně; trendy nešly mezi místnostmi porovnat.
    - Nahrazeno: společnou osou veličiny pro celý dům (zaokrouhlení teplota 1 °C, CO₂ 100 ppm, PM2.5 5 µg/m³).
20. **Hierarchie velikostí v informačních řádcích**
    - Navrženo: primární HVAC řádek 15 px a vyšší, ostatní řádky 14 px, jednotky 11 px, ikona CO₂ 24 px a ostatní 20 px, text stavu 13 px.
    - Opuštěno, protože: uživatel (24. 10.) chce stejnou velikost ikon, hodnot, popisků i jednotek napříč řádky.
    - Nahrazeno: ikony 22 px, hodnoty, popisky, jednotky i text stavu 15 px; primární řádek jen polotučně.
21. **Ilustrace místnosti jen s klíčem `scene`**
    - Opuštěno, protože: uživatel klíč v konfiguraci neměl a ilustraci neviděl.
    - Nahrazeno: výchozí ilustrace podle názvu místnosti, `scene` ji přepíše, `scene: none` vypne.
22. **Standardní detail entity místo vlastní 24h historie místnosti (v7, 24. 10. ráno)**
    - Opuštěno, protože: uživatel (24. 10.) postrádá vlastní historii teploty a hlavně vytápění; standardní detail neukazuje vrstvy Topení a Klimatizace ani intenzitu vytápění.
    - Nahrazeno: popup „Historie místnosti – 24 h“ je zpět (teplota a její mikrotrend). Společný graf CO₂/PM2.5 se nevrací.
23. **Spuštěná žaluzie 100 % neprůhledná**
    - Opuštěno, protože: zatažená žaluzie na tmavém displeji příliš svítila.
    - Nahrazeno: šampaňská na 50 %, kolejnice na 70 %; okno za žaluzií zůstává 28 % oblohy.
24. **Ilustrace v kruhovém přechodu, zeslabená k levému dolnímu rohu**
    - Opuštěno, protože: kresba mizela příliš rychle a vlevo od ní zůstávalo volné místo.
    - Nahrazeno: měkký obdélník přes volnou pravou část hlavičky, zeslabený jen u levého a spodního okraje.
25. **Mikrotrendy až k tlačítkům předvoleb, CO₂/PM2.5 hned nad Topením**
    - Opuštěno, protože: trend působil nalepený na předvolby a kvalita vzduchu splývala s HVAC řádky.
    - Nahrazeno: konec trendu 1,5× mezery předvolby–panel od předvoleb; mezera 12 px mezi kvalitou vzduchu a skupinou Topení / Klimatizace / okno.
26. **„Bez dat“ bez důvodu**
    - Opuštěno, protože: uživatel nevěděl, proč karta s viditelnými hodnotami hlásí „Bez dat“ (chyběl režim domu).
    - Nahrazeno: „Bez dat · první chybějící údaj“.
27. **Dva samostatné dotykové cíle Topení a Klimatizace (26 px)**
    - Opuštěno, protože: cíle byly menší než 44 pt a sousedily.
    - Nahrazeno: jeden cíl přes oba řádky; popup otevře primární systém a segmentový přepínač vede na druhý.
28. **Skrytá cílová teplota HVAC na úzkém displeji**
    - Opuštěno, protože: na iPhonu se „WindFree · 22 °C“ ani „Ručně · 22,5 °C“ nevešly a cíl chyběl.
    - Nahrazeno: mikrotrendy se doleva ztrácejí a text HVAC smí přesáhnout do 40 % sloupce trendů.
29. **Glyfy předvoleb žaluzií ve stylu Shelly (kolejnice + čáry) a krátce rám okna s lamelami**
    - Opuštěno, protože: neodpovídaly ikonám, které uživatel posílal; verze s rámem okna se na 18 px četla jako „dokument“.
    - Nahrazeno: plná kolejnice a lamely ve stylu symbolů žaluzií z aplikace Domácnost, 20 px.
30. **Jednoduché klepnutí na předvolbu bez odezvy**
    - Opuštěno, protože: působilo jako nefunkční tlačítko.
    - Nahrazeno: bublina „Podržte nebo klepněte dvakrát“ a haptika.
31. **Historie místnosti s popisky vlevo, samostatným pruhem Intenzita a bez prohlížení**
    - Opuštěno, protože: nebyla jako v aplikaci pro topení, popisky měly 9 px a graf se zmenšoval.
    - Nahrazeno: vytápění jako oranžová výplň pod křivkou, schodovitý cíl, noc, stupnice vpravo, řádek údajů a prohlížení prstem.
32. **Popup jen se zavřením ✕ / klepnutím mimo / Escape**
    - Nahrazeno: iOS list s úchytem a zavřením tažením dolů.
33. **Tlačítko Topení / Klimatizace jen tak široké jako text, přístupný název z kontextu**
    - Opuštěno, protože: test našel mrtvou zónu (až 193 px na tabletu) a nesoulad viditelného a přístupného názvu (axe, WCAG 2.5.3).
    - Nahrazeno: cíl aspoň přes levý sloupec, název = viditelný text, kontext v popisu.
34. **Předvolby aktivní i u nedostupné žaluzie**
    - Nahrazeno: šedé, `aria-disabled`, bublina „Žaluzie je nedostupná“.
35. **Kulatá tlačítka předvoleb s malou ikonou, každá v jiné barvě (Tma fialová, Stín modrá, Den žlutá), kroužek při držení**
    - Opuštěno, protože: uživatel (24. 10.) chtěl ikony jiné, větší a bez kulatého rámečku, ne každou jinak barevnou.
    - Nahrazeno: ikona žaluzie 32 px bez rámečku, šedá; bílá je jen ta, která odpovídá stavu žaluzie. Při držení roste měkký čtvereček. Zkoušena byla i varianta s rámem okna; četla se jako ikona dokumentu (podruhé po bodu 29), a varianta jen kolejnice a lamely, která se četla jako nabídka. Zůstala kolejnice, lamely a šňůrka.
36. **Předvolby vlevo od panelu žaluzie v pořadí Tma, Stín, Den**
    - Opuštěno, protože: uživatel (24. 10.) chtěl panel uprostřed, předvolby úplně vpravo a zdvižený stav nahoře.
    - Nahrazeno: panel | předvolby; shora Den, Stín, Tma. Konec mikrotrendu je 1,5× mezery panel–ikona od panelu.
37. **Panel žaluzie: 18 lamel, nejtenčí 1 px, lamely okna tenčí a silnější podle naklopení**
    - Opuštěno, protože: uživatel (24. 10.) chtěl méně a výraznější lamely a okno, které se naklopením nezatahuje.
    - Nahrazeno: 11 lamel, nejtenčí 2 px; lamely okna mají stálých 2 px. Zkušební změna, lze vrátit.
38. **Ilustrace v hlavičce o 11 px níž, CO₂ a PM2.5 obě v mátové barvě**
    - Opuštěno, protože: kresba ležela příliš nízko u zeslabení a žaluzií; CO₂ a PM2.5 nešly rozeznat podle barvy.
    - Nahrazeno: kresba o 11 px výš (aspoň 22 px nad panelem žaluzie); CO₂ zelená `#A6E36B`, PM2.5 fialová `#B8A6FF`.
39. **Aktivní předvolba bílá (ostatní světle šedé `#8E8E93`)**
    - Opuštěno, protože: uživatel (24. 10.) – ikony moc svítí a bílá je vedle béžových žaluzií agresivní.
    - Nahrazeno: ikony tmavě šedé `#6F6F74`; aktivní má tlumenou šampaňskou `#C9C0A8` na zaobleném čtverečku šampaňské při 13 %. Zkoušena byla i neutrální šedobílá (cizí vedle béžových lamel) a jasná krémová (stále příliš svítí); ohraničení a samotná změna barvy by vedle lamel nestačily.
40. **Cílová předvolba bez odezvy, dokud žaluzie nedojede**
    - Opuštěno, protože: uživatel (24. 10.) – po klepnutí trvá, než žaluzie sjede, a ikona do té doby nic neříká.
    - Nahrazeno: ikona cílové předvolby pulzuje (podsvícení se objevuje a mizí), dokud žaluzie nedojede; končí i po 5 s beze změny stavu, polohy a naklopení (ruční zastavení jinde) nebo chybou skriptu.
41. **Podsvícení aktivní předvolby (zaoblený čtvereček, pulzující záře)**
    - Opuštěno, protože: uživatel (24. 10.) – podbarvení se mu nelíbí, stačí změna barvy ikony.
    - Nahrazeno: aktivní ikona jen změní barvu (tmavě šedá → tlumená šampaňská `#C9C0A8`); po odeslání cílová ikona pulzuje barvou. `::before` tlačítka je už jen neviditelné rozšíření dotykové plochy.
42. **CO₂ zelená `#A6E36B` a PM2.5 fialová `#B8A6FF`**
    - Opuštěno, protože: uživatel (24. 10.) – příliš agresivní barvy, chtěl méně výrazné.
    - Nahrazeno: šalvějová zelená `#8FBF9F` (sytost 27 %) a levandulová `#A59DCF` (34 %); kontrast k pozadí aspoň 6 : 1, test hlídá sytost do 40 %.
43. **Mikrotrend CO₂ a PM2.5 v pravém sloupci, začátek 28 px před sloupcem, blednutí do 55 %**
    - Opuštěno, protože: uživatel (24. 10.) – trend má navazovat přímo na hodnotu a jednotku, aby ho nemusel hledat.
    - Nahrazeno: trend CO₂ a PM2.5 začíná 70 px od levého okraje řádků (pod koncem i nejkratší hodnoty), blednutí do 80 % šířky, číslo a jednotka se nezalamují. Trend teploty zůstává v pravém sloupci.
44. **Vlhkost a teplota bez barvy, i když rozhodly o stavu místnosti**
    - Opuštěno, protože: u „Vlhko“ zůstalo „76 %“ šedé a uživatel musel hledat, proč je místnost „Vlhko“.
    - Nahrazeno: hodnota, která stav určila, má barvu stavu; ostatní zůstávají neutrální.
45. **Dotykové cíle: CO₂ a PM2.5 dva řádky po 26 px, okno 26 px, vlhkost 38 × 28 px, předvolby 36 × 47 px**
    - Opuštěno, protože: HIG žádá aspoň 44 × 44 pt.
    - Nahrazeno: CO₂ + PM2.5 jeden cíl 52 px s popupem „Kvalita vzduchu“; okno 32 px s neviditelnou plochou do 44 px; vlhkost, předvolby a přepínač zvětšeny neviditelným rozšířením. Test měří skutečnou plochu hit-testem. Při psaní testu se ukázalo, že řádek okna měl kvůli přebití CSS jen 26 px; opraveno.
46. **Všechny místnosti vždy jako celé karty**
    - Opuštěno, protože: pět karet je skoro dvě obrazovky iPhonu.
    - Nahrazeno: přepínač Přehled | Detail (v15), který uživatel téhož dne odpoledne zamítl, viz 47. Vrací se tedy jen plný detail.
47. **Přepínač Přehled | Detail a sbalená místnost jako jeden řádek**
    - Opuštěno, protože: uživatel (24. 10.) – „Ta menší vypadnutá karty bez detailů se nelíbí. Dej ten přepínač pryč a nech jen plný detail.“
    - Nahrazeno: všechny místnosti vždy jako plná karta; zapamatování volby v zařízení a související kód jsou odstraněny.
48. **Tolerance předvolby žaluzie ±2 %**
    - Opuštěno, protože: skutečná žaluzie při otevření lamel vyjede o 3–4 % nahoru (Stín je 4 / 100, před otevřením lamel 0 / 0) a ikona Stínu proto nesvítila (uživatel 24. 10.).
    - Nahrazeno: tolerance ±5 % u polohy i naklopení.
49. **Počátek mikrotrendu CO₂ a PM2.5 70 px od levého okraje řádku**
    - Opuštěno, protože: uživatel (24. 10.) – trend má začínat o pár pixelů víc vpravo.
    - Nahrazeno: 78 px; test hlídá, že trend začíná až za koncem nejkratší hodnoty.
50. **Hodnoty CO₂ a PM2.5 tenčím písmem než ostatní**
    - Opuštěno, protože: uživatel (24. 10.) – hodnoty jsou proti plánu moc tenké, sjednotit.
    - Nahrazeno: stejná tloušťka (500) jako ostatní hodnoty; test porovnává vypočtenou tloušťku.
51. **Dva sloupce od šířky karty 680 px**
    - Opuštěno, protože: kartě v Sections s `column_span: 2` zbývá asi 670 px (uživatel 24. 10.: na šířku pořád jedna karta).
    - Nahrazeno: 620 px; zobrazení Masonry dává jediné kartě sloupec nejvýš 500 px, proto README doporučuje Panel, Sections s `column_span: 2` nebo dvě karty vedle sebe.
52. **Osa teploty v historii místnosti podle teploty i cíle topení, po celých stupních, aspoň 3 °C**
    - Opuštěno, protože: uživatel (24. 10.) – cíl topení 5 °C při vypnutém Topení natáhl osu na 4–22° a teplota byla jen čárka nahoře.
    - Příčina: entita cíle a entity režimu topení se zapisují v mírně jiných okamžicích, takže při každém přepnutí na Vypnuto vznikl krátký úsek „Plán“ s cílem 5 °C; Vypnuto má mít přednost (spec, Topení).
    - Nahrazeno: osa jen podle naměřené teploty (s 5% rezervou, nejméně 1,5 °C, popisky po 0,5 / 1 / 2 / 5 °C podle rozsahu), cíl mimo rozsah se ořízne, cíl 5 °C se nekreslí nikdy.
53. **Prahy, délky období, předvolby a skript žaluzií pevně v kódu (kromě `thresholds`)**
    - Opuštěno, protože: uživatel (24. 10. pozdě večer) – „Převeď mi všechny proměnné do konfiguračního souboru ať jdou jednoduše nastavit“ (hranice CO₂, komfortní teploty, úsek mikrotrendu; pro pokoje obrázek, link, zda má CO₂/PM2.5 senzor, presety žaluzií).
    - Nahrazeno: YAML konfigurace karty se sekcemi `thresholds` (nově i vlny vytápění), `trends`, `history`, `covers`, `house_modes`, `theme` a klíči místnosti `image`, `link`, `carbon_dioxide: false`, `pm25: false`, `window` (seznam), `cover_presets`, `thresholds`. Příklad v `examples/` vypisuje všechna nastavení s výchozími hodnotami (test hlídá, že sedí s kódem). Chybná hodnota zastaví kartu chybou s názvem klíče.
54. **Jedno okno na místnost**
    - Opuštěno, protože: uživatel (24. 10. pozdě večer) – „Možnost mít 2 okna na místnost.“
    - Nahrazeno: `window` přijme seznam; řádek okna zůstává jeden („Otevřena 2“, doba nejdéle otevřeného, „––“ když žádné není otevřené a některé je neznámé), popup „Okna“ se stavem každého okna, souhrn domu počítá okna místo místností.
55. **Tečka konfliktu až za dobou otevření okna („Otevřeno · 12 min ●“)**
    - Opuštěno, protože: se dvěma okny se na kartě 304 px řádek nevejde a tečka by se schovala na skrytý druhý řádek (nalezeno při psaní testu).
    - Nahrazeno: tečka hned za popiskem místo „·“ („Otevřeno ● 12 min“); ustoupí doba, tečka zůstane.
56. **Karta jen v tmavých barvách**
    - Opuštěno, protože: uživatel (24. 10. pozdě večer) – „Připrav mi možnost přepínat režimy – Dark nebo light mode. Podle nastavení systému. Aktuální barevné schéma je ok a bude uloženo jako Dark mode.“.
    - Nahrazeno: barvy jako CSS proměnné `--kd-…`; tmavá sada = dosavadní paleta beze změny, světlá sada s kontrastem textu aspoň 4,5 : 1; `theme: auto` podle tmavého režimu Home Assistantu (s motivem „Automaticky“ podle systému), bez něj podle `prefers-color-scheme`; `dark` / `light` vynutí.
57. **První popisek časové osy historie vždy vycentrovaný pod čarou**
    - Opuštěno, protože: krátce po celé hodině (např. 17:20) byl popisek „18:00“ u levého okraje oříznutý (nalezeno na snímku).
    - Nahrazeno: popisek u okraje grafu se zarovná k okraji.
58. **Příklad YAML se zakomentovanými volitelnými klíči (odkaz, dvě okna, vlastní předvolby a prahy místnosti, venkovní podmínky)**
    - Opuštěno, protože: uživatel (24. 10. večer) – „Musíš upravit ten example. Musí tam být kompletně všechny nastavení. Bez co2 a pm udělej Obývák“; společnou konfiguraci pro celý dům v příkladu nenašel.
    - Nahrazeno: příklad má dvě oddělené části, „Společné nastavení pro celý dům“ a „Místnosti“; každý klíč je uvedený, u místnosti i prázdné `link:`, `cover_presets:`, `thresholds:` a okna jako seznam se jménem. Klíč bez hodnoty karta bere jako výchozí. Obývák má `carbon_dioxide: false` a `pm25: false`. Scénář testů „real“ načítá přímo tento soubor.
59. **Karta jen česky (české popisky a české formátování čísel)**
    - Opuštěno, protože: uživatel (25. 10.) – „K dispozici bude angličtina, švédština a čeština. Podle jazyka Home Assistantu. Pokud nebude CZ/SE, tak bude EN. … při dalších změnách se musí aktualizovat i všechny různé překlady.“
    - Nahrazeno: všechny texty karty ve slovnících `src/translations/` (čeština je zdroj, švédština a angličtina mají stejné klíče, hlídá to sestavení); jazyk podle profilu Home Assistantu, klíč `language` ho vynutí; čísla podle jazyka karty, čas 24hodinový; výchozí nadpis, názvy oken a předvoleb v jazyce karty (předvolby v příkladu bez `name`). Štítek souhrnu domu, který je širší než karta, zalomí text, místo aby přetekl.

## Zamítnuté návrhy

1. **„Prašno“** – PM2.5 může pocházet z vaření, krbu, svíček, smogu i inverze. Nahrazeno: „Znečištěný vzduch“.
2. **„Vyvětrat“ a „Větrá se“** – stav okna je na kartě vidět samostatně; stav místnosti má hodnotit prostředí, ne radit. Nahrazeno: „Vydýchaný vzduch“ / „Silně vydýchaný vzduch“.
3. **Normativní komfortní rozsahy a hranice 18/26 °C** – osobní komfort má přednost; bez návratu k normám.
4. **PM2.5 15–34 jako změna stavu místnosti** – zamítnuto; jen oranžové číslo.
5. **Slovní stavy žaluzií** („Přivřené“, „Denní světlo“, „Soukromí“, „Morning“) – zamítnuty; panel je bez textu.
6. **Procenta a čísla u žaluzií** – zamítnuta; panel je čistě obrazový.
7. **Zobrazení 5 °C při vypnutém Topení** – zamítnuto; zobrazí se jen „Vypnuto“, protože 5 °C působí jako aktivní požadavek.
8. **Analytické senzory Topení a Mold Risk ve stavu karty** – zamítnuty; neovlivňují kartu.
9. **Předpověď otevřeného okna z Topení** – ignoruje se; okno určuje jen MYGGBETT.
10. **Text Zima/Léto v hlavičce** – zamítnut (viz Nahrazené 13).
11. **Ikona vypínače pro vypnutou Klimatizaci** – zamítnuta; zůstává ikona klimatizace, šedá.
12. **Globální grafy, měřidla, velké statistiky a samostatné panely HVAC na Domov** – zamítnuty.
13. **Desktopové rozložení / čtyři místnosti v jednom řádku** – zamítnuto; priorita je iPhone, bez vodorovného posouvání. Od 24. 10. smí být na šířku telefonu dvě karty vedle sebe (v14); tři a více sloupců zůstává zamítnuto.
14. **Vlastní plán žaluzií `plan_zaluzie` (virtuální řadič)** – nesouvisí s dashboardem, ignoruje se.
15. **Venkovní kvalita vzduchu jako AQI/index** – zamítnuto; použije se PM2.5 ve stejné veličině jako ALPSTUGA.
16. **Podbarvení čtverečkem pod aktivní předvolbou žaluzie** – zamítnuto 24. 10.; stačí změna barvy ikony.
17. **Pátá místnost (Obývák) roztažená přes celou šířku ve dvou sloupcích** – zamítnuto 24. 10.; zůstává stejně velká sama vlevo.
18. **Přepínač Přehled | Detail a sbalené místnosti jako řádky** – zamítnuto 24. 10. uživatelem (viz Nahrazené 47); karta zůstává vždy plná.

## Vývoj UX

| Fáze | Navrženo | Opuštěno, protože | Nahrazeno |
|---|---|---|---|
| Říjen 2026 | Všech pět místností na jedné stránce, Mushroom, ovládání klimy, radiátorů a žaluzií | uživatel chtěl hezčí a přehlednější nástěnku | styl button-card hero |
| 19. 10. | Karty s ikonami; ALPSTUGA + MYGGBETT; klepnutí = detail | důvod Memory nezaznamenává | mobilní redesign |
| 21. 10. | Návrh nejdřív bez YAML: titulek Domov, upozornění, karty; inspirace Apple Home, Samsung OneUI, Homey Pro | – | review a konsolidace téhož dne |
| 21. 10. review | Stavový žebříček s „Prašno / Vyvětrat / Větrá se“, hranice 19,5–23,5, PM2.5 15+ jako stav | viz zamítnuté návrhy | finální seznam stavů a pásma 20–24 / 21–25 |
| 21. 10. večer | Uzavření UX: texty se dál neladí, začíná prototyp | – | stavba prototypu |
| 22. 10. | Revize prototypu: vlastní karta na GitHubu, mikrotrendy, jednotný panel žaluzie, klikací historie | button-card prototyp (YAML) | vlastní karta (HACS) |

## Vývoj room card

1. **v1 – Mushroom:** dlaždice Klima + Radiátor, blok žaluzií s posuvníky.
2. **v2 – button-card hero:** ikony, ALPSTUGA + MYGGBETT, AC nebo radiátor podle sezóny.
3. **v3 – mobilní karta Domov:** vlevo informace (název, stav, teplota, vlhkost, CO₂ se šipkou trendu, PM2.5, primární/sekundární HVAC, okno), vpravo panel žaluzie ze dvou sloupců (poloha jako výplň shora, naklopení jako lamely), bez textu a procent.
   - Opuštěno: šipka trendu CO₂ → nahrazena mikrotrendem.
4. **v4 – po UX review:** hlavička karty (název + stav) přes celou šířku; panel začíná u CO₂/PM2.5; teplota větší než vlhkost; stavy „Znečištěný vzduch / Vydýchaný / Silně vydýchaný vzduch“; barvy čísel CO₂/PM2.5 jen při odchylce.
5. **v5 – sjednocení:** Topení Plán/Ručně/Vypnuto, vlny vytápění, ikony Klimatizace s barvami, chybějící data jako „––“ se zachovanou ikonou, panel bez rámečku, hlavička s venkovními podmínkami.
6. **v6 – revize prototypu:** jeden sloupec – miniatura žaluzie od řádku CO₂ po okno (stálý počet lamel, naklopení = tloušťka, poloha = neprůhlednost), mikrotrendy teploty a CO₂, jednotná velikost písma informačních řádků, Klimatizace OFF = šedá ikona klimatizace, klikací 24h historie a graf CO₂/PM2.5.
   - Původní repozitářový kód v `src/` a první prototyp karty tento návrh nereflektují (stav uživatel potvrdil).
7. **v7 – ovládání a Shelly presety (24. 10.):** vlastní 24h grafy nahrazeny standardním detailem entity; přibyl popup ovládání Topení (Vypnuto / Plán / Ručně / Boost) a Klimatizace (režimy, předvolby); presety žaluzií jsou tři kulaté Shelly tlačítka spouštěná dvojitým klepnutím nebo dlouhým stiskem (Ráno zrušeno); mikrotrendy přesunuty k hodnotám; vlhkost a CO₂/PM2.5 bez dat bez barvy; volitelná ilustrace místnosti.
8. **v8 – sloupec trendů (24. 10.):** informační řádky rozdělené na dva stejně široké sloupce (hodnoty | mikrotrendy), trend teploty u řádků Topení a Klimatizace, společná osa trendů pro celý dům, jednotná velikost ikon, hodnot a jednotek, výchozí ilustrace podle názvu místnosti.
9. **v9 – historie zpět (24. 10.):** popup „Historie místnosti – 24 h“ znovu otevírá teplota a její trend; kvalita vzduchu oddělená mezerou od HVAC řádků; trendy končí 1,5× mezery před předvolbami; utlumená spuštěná žaluzie; obdélníková ilustrace; „Bez dat“ s důvodem.
10. **v10 – body 24. 10.:** souhrn domu ve štítcích, jeden dotykový cíl Topení + Klimatizace s přepínačem v popupu, trendy blednoucí doleva, nápověda a haptika předvoleb, nové ikony předvoleb, zastaralá data, načítání a VoiceOver u trendů, pulz kolejnice při pohybu žaluzie, historie podle aplikace pro topení s prohlížením prstem, popup jako iOS list.
11. **v11 – opravy z testu a automatické testy (24. 10.):** cíl Topení / Klimatizace přes celý levý sloupec, přístupné názvy, předvolby u nedostupné žaluzie, šipky v přepínači, šířka grafu po otočení; `npm test` (Playwright, axe-core).
12. **v12 – panel a předvolby žaluzií, barvy (24. 10.):** 11 lamel (nejtenčí 2 px), lamely okna stálé, předvolby vpravo od panelu shora Den, Stín, Tma, ikony žaluzie bez rámečku (šedé, bílá podle stavu), ilustrace výš, CO₂ zelená a PM2.5 fialová.
13. **v13 – tlumené předvolby a pulzování (24. 10.):** ikony tmavě šedé, aktivní tlumeně šampaňská na podsvíceném čtverečku, cílová předvolba pulzuje do dojezdu žaluzie (konec při 5 s beze změny).
14. **v14 – dva sloupce na šířku (24. 10.):** telefon na výšku jeden sloupec přes celou šířku displeje, na šířku (od šířky karty 680 px, od v16 620 px) dvě karty vedle sebe; úzký režim podle šířky místnosti místo okna (kontejnerový dotaz), ilustrace se v úzké místnosti zmenšuje.
15. **v15 – kolo z 24. 10. odpoledne:** předvolby žaluzií jen barvou ikony (bez podbarvení), tlumenější CO₂ a PM2.5, trend CO₂ a PM2.5 navazuje na hodnotu, hodnota určující stav má barvu stavu, konflikty (okno + topí / chladí se, chladí se i když je chladno), dotykové cíle 44 × 44 px, popup „Kvalita vzduchu“; přepínač Přehled | Detail nahoře byl ještě téhož dne zamítnut (v16).
16. **v16 – kolo z 24. 10. večer:** přepínač Přehled | Detail odstraněn, karta má vždy plný detail; u otevřeného okna slabý údaj o době otevření („Otevřeno · N min“, aktualizace po 30 s); tolerance předvoleb žaluzií ±5 %; trend CO₂ a PM2.5 začíná 78 px od levého okraje; hodnoty CO₂ a PM2.5 stejnou tloušťkou písma (500) jako ostatní; dva sloupce od šířky karty 620 px; `title: ""` vynechá nadpis (a celou hlavičku, když nemá co ukázat); červená hodnota v popupu Kvalita vzduchu světlejší `#FF6961` kvůli kontrastu; osa teploty v historii místnosti jen podle naměřené teploty (křivka na celou výšku, cíl topení mimo rozsah oříznut, cíl 5 °C při Vypnuto se nekreslí).
17. **v17 – konfigurace, dvě okna, světlý režim (24. 10. pozdě večer):** všechna nastavení v YAML konfiguraci (prahy i pro místnost, vlny vytápění, mikrotrendy, historie, předvolby a skript žaluzií, hodnoty režimu domu), vlastní obrázek a odkaz z názvu místnosti, místnost bez CO₂ / PM2.5 (`false`), seznam oken s popupem „Okna“, světlý a tmavý režim podle Home Assistantu / systému; tečka konfliktu za popiskem okna; první popisek časové osy historie se u okraje neořízne.
18. **v18 – tři jazyky (25. 10.):** čeština, švédština a angličtina podle jazyka Home Assistantu (jinak angličtina), klíč `language`, čísla podle jazyka, výchozí názvy předvoleb a oken v jazyce karty.
19. **v19 – panel na monitoru, formáty z profilu, chyba u tlačítka (25. 10.):** karta je nejvýš 2300 px široká a vystředěná, sloupce 1 / 2 / 3 / 4 od šířky karty 620 / 1000 / 1400 px (v zobrazení Panel na monitoru asi 2000 px čtyři, pátá místnost sama vlevo ve druhém řádku); místnost bez žaluzie, CO₂ a PM2.5 o 64 px kratší; čísla, 12 / 24 h a pořadí dne a měsíce podle profilu Home Assistantu (dřív jen podle jazyka, čas 24 h i anglicky); stránka pod popupem se nehýbe a historie na telefonu na šířku je přes celou šířku; legenda grafu zrušena („popisky jsou zbytečné“); ikona souhrnu „Topí“ ukazuje nejsilnější topení ze všech místností (dřív vždy tři vlny); chyba předvolby u tlačítka (červený okraj, zatřesení, bublina 5 s) místo hlášky nad kartami; malé šedé hodiny za zastaralou hodnotou; PM2.5 0 µg/m³ není nikdy zastaralé.
   - Opuštěno: legenda grafu, horní hláška pro chybu předvolby, dvousloupcový strop, tip s dvěma kartami v Masonry (uživatel Masonry nepoužívá).
20. **v20 – ovládání Topení: teplota a doba (26. 10.):** Ručně má posuvník teploty, Boost je pevných 25 °C, u Ručně, Boostu i Vypnuto se nastavuje doba jako u teplé vody v aplikaci Tado („Jak dlouho“ s výchozími 30 min / do další změny plánu / napořád); posuvník je převzatý z návrhu ohřívače vody. Vypnuto na dobu = ruční přepis 5 °C přes časovač (volba uživatele).
   - Opuštěno: interaktivní prototyp v Artifactu (uživatel komentuje rovnou v chatu); Boost jako předvolba `boost` (Tado CE ji nemá).
21. **v21 – oprava ovládání Topení (26. 10.):** volba se odešle až při zavření popupu (ne po 2 s); posuvníky nahoře nad volbami, aby se volby nehýbaly; čtyři volby jako ikony v jedné řadě; přepínač Topení | Klimatizace dole; posuvníky se ukážou už při otevření aktivního režimu; Ručně má ikonu posuvníků (plamen a tři vlny se pletly s Boostem); u přepisu plánu je ikona režimu (viz v22). Opraveno: tah prstem po posuvníku, který popup rušil.
   - Opuštěno: automatické odeslání po 2 s.
22. **v22 – štítky Ručně a Boost, stav podle climate (26. 10.):** ikona u názvu místnosti zrušena; v horních štítcích je Ručně (ikona posuvníků) a Boost (blesk) zvlášť místo tří vln; Plán / Ručně / Vypnuto určuje `climate` entita, senzor přepisu až když `climate` nic neříká (po Plánu se jinak ještě chvíli ukazovalo Ručně).
   - Opuštěno: ikona režimu za názvem místnosti.
23. **v23 – otevřená okna v historii (26. 10.):** v historii teploty byla mezi pruhy Topení a Klimatizace tenká modrá čára, kdy bylo otevřené okno; v téže hodině přepracováno ve v24.
24. **v24 – pruhy pod historií jako na kartě (26. 10.):** pruhy Topení, Klimatizace a okna bez popisků, kompaktní (mezera 3 px), v pořadí jako na kartě místnosti (primární systém podle House Mode, druhý, okna); na začátku každého ikona z karty a kolem ní plynulé zeslabení do ztracena.
   - Opuštěno: textové popisky „Topení“ a „Klimatizace“ nad pruhy a tenká modrá čára mezi pruhy.
25. **v25 – jednotná barva Vypnuto v historii (26. 10.):** pruh Klimatizace Vypnuto byl světlejší než pruh Topení Vypnuto (tmavě `#8E8E93` proti `#6B6B70`, světle `#D1D1D6` proti `#C7C7CC`); oba pruhy mají teď barvu Topení Vypnuto (`--kd-closed`) a samostatná proměnná `--kd-strip-off` zanikla. V řádku údajů nad grafem mají Topení i Klimatizace Vypnuto barvu textu jako na kartě (`--kd-off`), protože světle šedá `#C7C7CC` jako text na bílém nemá dost kontrastu.
   - Opuštěno: zvláštní, světlejší šedá pro vypnutou klimatizaci v grafu.
26. **v26 – PM2.5 podle čidla, ne podle změny (26. 10.):** čidlo ALPSTUGA posílá hodnotu jen při změně a PM2.5 se mění málo, takže po 30 min bez změny karta ukazovala „Bez dat · PM2.5“, přestože teplota, vlhkost i CO₂ ze stejného čidla chodily. PM2.5 je teď čerstvé, dokud hlásí CO₂ téže místnosti; bez čidla CO₂ platí `stale_minutes` jako dosud.
   - Opuštěno: posuzovat PM2.5 jen podle vlastního posledního hlášení.
27. **v27 – nuly po zapnutí čidla mimo historii (29. 10., aktuální návrh):** čidlo hlásí po zapnutí přesnou 0 (teplota, vlhkost), která v grafu historie udělala svislý hrot k 0° a natáhla osu; teď se tyto nuly v historii místnosti ignorují. Mikrotrendy a hodnoty na kartě se nezměnily; PM2.5 0 je čistý vzduch a platí.
   - Opuštěno: kreslit nuly z historie jako hodnoty.

## Rekonstrukce z historie Gitu (vygenerováno 2. 11. 2026, nezávazné)

Chronologický seznam všech commitů do `507d549` (včetně) a u každého řádky z `CURRENT_SPEC.md`, které commit nahradil (text zkrácen na 600 znaků; úplné znění: `git show <commit>`). Slouží jako doplněk historie tam, kde nebyla vedena průběžně; potvrzené je jen to, co je dnes ve spec.

- `bb7fe8c` 2026-10-23 · Initial commit
- `1d7d3de` 2026-10-23 · Add initial project files including documentation, configuration, and example cases
- `31bd211` 2026-10-23 · Add Klima Dashboard custom card with initial configuration and styling
- `7b78864` 2026-10-23 · Add build script and update configuration for Klima Dashboard
- `370e13c` 2026-10-23 · Remove deprecated skill RCA template and associated workflows
- `a8fd3d6` 2026-10-23 · Remove deprecated skill RCA template and associated workflows
- `2336f6f` 2026-10-23 · Refactor Klima Dashboard structure and add configuration validation
- `1a97aa4` 2026-10-23 · Úpravy Claude
  - nahrazeno: „Mobilní nástěnka Home Assistantu „Domov“ poskytuje rychlý přehled pohodlí v pěti místnostech. Jde o stavový, snadno čitelný ovládací přehled, nikoli o technický monitorovací panel.“
  - nahrazeno: „- Návrh je přednostně určen pro iPhone 14 Pro; nesmí vyžadovat vodorovné posouvání. Počítačové zobrazení není prioritou.“
  - nahrazeno: „- Hlavní obrazovka obsahuje titulek „Domov“, hlavičku s venkovními podmínkami, upozornění pouze tehdy, když nějaká jsou, a karty místností. Neobsahuje globální grafy, měřidla, velké souhrnné statistiky ani samostatné panely vytápění a klimatizace.“
  - nahrazeno: „- Hlavička zobrazuje aktuální venkovní teplotu, minimum a maximum, pravděpodobnost deště a kvalitu venkovního vzduchu. Sezónní režim se v hlavičce nezobrazuje.“
  - nahrazeno: „- Pořadí karet: Ložnice, Pracovna, Maxík, Mikuláš, Obývací pokoj.“
  - nahrazeno: „- Každá karta má hlavičku s názvem místnosti a stavem. Informační obsah je vlevo; vpravo je obrazový panel žaluzie.“
  - nahrazeno: „- Teplota a vlhkost jsou vedle sebe, se stejnou velikostí písma a s vizuální prioritou teploty. CO₂ a PM2.5 jsou pod sebou.“
  - nahrazeno: „- Obývací pokoj zachovává stejné rozložení jako ostatní místnosti, i když nemá žaluzie.“
  - nahrazeno: „- Data o teplotě, vlhkosti, CO₂ a PM2.5 v místnosti poskytuje IKEA ALPSTUGA. Teplota z Tado se pro stav místnosti nepoužívá.“
  - nahrazeno: „- Stav okna poskytuje pouze IKEA MYGGBETT. Předpověď otevřeného okna z Tado CE se ignoruje.“
  - nahrazeno: „- Tado CE je jediným zdrojem vytápění; Samsung je zdrojem chlazení a ostatních režimů klimatizace.“
  - nahrazeno: „Stav je lidské zhodnocení prostředí, nikoli příkaz. Při souběhu podmínek se použije první splněná položka v tomto pořadí:“
  - nahrazeno: „1. **Bez dat** – chybí nezbytná data; stav „Příjemné“ se při chybějících zásadních datech nezobrazí.“
  - nahrazeno: „2. **Znečištěný vzduch** – PM2.5 ≥ 35; červený stav.“
  - nahrazeno: „3. **Silně vydýchaný vzduch** – CO₂ ≥ 1500; červený stav.“
  - nahrazeno: „4. **Vydýchaný vzduch** – CO₂ od 1000 do 1499; oranžový stav.“
  - nahrazeno: „7. **Teplo** – teplota nad horní hranicí komfortního pásma pro aktuální režim.“
  - nahrazeno: „8. **Chladno** – teplota pod dolní hranicí komfortního pásma pro aktuální režim.“
  - nahrazeno: „9. **Příjemné** – žádná z předchozích podmínek není splněna a jsou dostupná nezbytná data.“
  - nahrazeno: „- Komfortní pásmo v režimu Zima je 20–24 °C; v režimu Léto 21–25 °C.“
  - nahrazeno: „- PM2.5 od 15 do 34 zbarví pouze hodnotu oranžově a nemění stav místnosti. Od 35 je hodnota červená a mění stav místnosti.“
  - nahrazeno: „- CO₂ od 1000 do 1499 zbarví hodnotu oranžově; od 1500 červeně.“
  - nahrazeno: „- Normální hodnoty zůstávají neutrální. Neznámý údaj není alarm, nikdy není červený a zobrazí se jako „--“ při zachování identity řádku a ikony.“
  - nahrazeno: „- Není-li dostupná nezbytná hodnota, karta zobrazí „Bez dat“; Home Assistant zpracovává stav entity `unavailable`.“
  - nahrazeno: „- Režim domu je `input_select.house_mode` s hodnotami Zima a Léto. Ovlivňuje pořadí a vizuální váhu řádků vytápění a klimatizace i komfortní pásmo; sám o sobě žádný systém nevypíná.“
  - nahrazeno: „- V režimu Zima je první Tado CE a druhý Samsung. V režimu Léto je první Samsung a druhý Tado CE. Oba řádky jsou na kartě vždy.“
  - nahrazeno: „- Tado CE zobrazuje stavy **Plán**, **Ručně** a **Vypnuto**. Ruční přepis je zvýrazněný. Při vypnutí se zobrazí pouze „Vypnuto“, nikoli cílová teplota 5 °C. Analytické senzory Tado a Mold Risk nemění stav karty.“
  - nahrazeno: „- Intenzita vytápění Tado CE je zobrazena 0–3 ikonami teplých vln, bez procent: 0 % = 0 vln, 1–34 % = 1, 35–67 % = 2, 68–100 % = 3.“
  - nahrazeno: „- Samsung používá sadu ikon stejné velikosti; stav je čitelný z ikony a její barvy. Aktivní klimatizace má jinou barvu než vypnutá. Větrání používá stejnou barvu jako Plán Tado CE.“
  - nahrazeno: „- Vypnutý Samsung ponechává ikonu klimatizace v šedé barvě; vypnutí má přednost před předvolbou. Při nedostupnosti zůstává stejná ikona přerušovaná.“
  - nahrazeno: „- WindFree se zobrazuje jako „WindFree“ a pouze při zapnuté klimatizaci v režimu chlazení. Chlazení bez WindFree se označuje „Chlazení“; vypnutý systém „Vypnuto“; ostatní předvolby svým názvem.“
  - nahrazeno: „- Neznámý stav vytápění či klimatizace zachovává příslušnou ikonu a zobrazí „--“.“
  - nahrazeno: „- Místnosti Ložnice, Pracovna, Maxík a Mikuláš mají žaluzie; Obývací pokoj je nemá.“
  - nahrazeno: „- Poloha krytu: 0 % = zavřeno/dole, 100 % = otevřeno/nahoře. Naklopení: 0 % = zavřené lamely, 100 % = otevřené lamely.“
  - nahrazeno: „- Panel žaluzie je jeden svislý obrázek realistické žaluzie viděné zevnitř. Je bez rámečku, textu, procent a technických hodnot; zachovává stálý počet a rozteč lamel.“
  - nahrazeno: „- Panel začíná u řádku CO₂ a pokrývá řádky CO₂, PM2.5, Tado, Samsung a okno; nezasahuje do hlavičky ani k bloku teploty a vlhkosti. Je zhruba o 20–30 % širší než původní dvojice ukazatelů.“
  - nahrazeno: „- Naklopení mění pouze tloušťku lamel: při 0 % téměř splývají v plnou plochu, při 100 % jsou velmi tenké s mezerami.“
  - nahrazeno: „- Poloha rozděluje obrázek na spodní část žaluzie a vytaženou strukturu: spuštěná část má plnou krycí neprůhlednost, vytažená zachovává strukturu lamel při 20–30 % neprůhlednosti. Při poloze 100 % je zvýrazněna pouze horní linka.“
  - nahrazeno: „- Neznámá poloha nebo naklopení se zobrazí jako přerušovaná silueta.“
  - nahrazeno: „- Kliknutí na teplotu otevře „Historie místnosti – 24 h“: plošné pozadí pro teplotu, hlavní teplotní křivku, modrou přerušovanou křivku vlhkosti a časové vrstvy Tado CE (Plán / Ručně / Vypnuto) a Samsungu v jeho barvách režimů. Intenzita vytápění je mezi časovou vrstvou a teplotní křivkou znázorněna výplní odpovídající 0–3 vlnám.“
  - nahrazeno: „- Kliknutí na CO₂ nebo PM2.5 otevře jeden společný graf těchto hodnot za 24 hodin.“
  - nahrazeno: „- Kliknutí na panel žaluzie otevře standardní ovládání krytu s aktuální polohou a naklopením (`current_position`, `current_tilt_position`).“
  - nahrazeno: „- Mikrotrendy teploty a CO₂ jsou vpravo od hodnoty ve stejném řádku. Zobrazují posledních 120 minut ve 12 vzorcích, normalizovaných podle minima a maxima daného období. Jsou jemné, jednobarevné, bez os, popisků, rámečku, interakce a informačních bublin; na první pohled ukazují zlepšování, zhoršování nebo stabilitu.“
  - nahrazeno: „- Hlavička zobrazuje aktuální venkovní teplotu, denní minimum a maximum, pravděpodobnost deště a kvalitu venkovního vzduchu. Kvalita vzduchu se posuzuje z venkovní PM2.5 ve stejné fyzikální jednotce jako ALPSTUGA, nikoli z AQI nebo indexu; preferovaným zdrojem je Sensor.Community.“
  - nahrazeno: „- CO₂ a PM2.5 mají ikonu a popisek. Barva hodnoty se mění pouze při překročení prahu; normální hodnoty jsou neutrální.“
  - nahrazeno: „- Řádky Tado CE, Samsungu, okna, CO₂ a PM2.5 zachovávají svou ikonu i při nedostupnosti a zobrazují „--“. Neznámá hodnota nikdy není červená ani alarm.“
  - nahrazeno: „- Běžné stavy nepoužívají dominantní zelenou. Vypnuto je šedé, ruční přepis Tado CE je zřetelně odlišitelný a aktivní Samsung má jinou barvu než vypnutý.“
  - nahrazeno: „- Karta místnosti používá jednotnou velikost písma pro informační řádky Tado CE, Samsungu, okna a text stavu. Název místnosti, hodnoty teploty/vlhkosti a popisky CO₂/PM2.5 mohou mít vlastní hierarchii.“
  - nahrazeno: „- Barvy pro žaluzie, popisky a vypnutý stav nejsou finálně schválené; před finalizací se ověří kontrast, čitelnost venku a vzhled na OLED displeji.“
  - nahrazeno: „- Prahové hodnoty a komfortní pásma jsou definovány v konfiguraci karty, nastaví se jednou a běžně se nemění.“
  - nahrazeno: „- Režim domu se vybere hodnotou `input_select.house_mode` (Zima nebo Léto).“
- `ab01666` 2026-10-23 · CO2 a PM2.5 jen jako ikony, nova ikona PM2.5, uprava zadani
  - nahrazeno: „- CO₂ a PM2.5 mají ikonu a popisek. Číslo se barví jen při překročení prahu.“
  - nahrazeno: „- Mikrotrendy (viz Historie a grafy): CO₂ a PM2.5 vedle hodnoty ve svém řádku; teplota jedním mikrotrendem napravo od řádků Topení a Klimatizace, přes výšku obou těchto HVAC řádků (pod řádky CO₂ a PM2.5).“
  - nahrazeno: „- Ložnice, Pracovna, Maxík, Mikuláš mají žaluzie (Shelly); Obývák nemá.“
  - nahrazeno: „- Nad zobrazením žaluzie jsou 4 tlačítka s "presety" stavů. 0/0 - uplně zatemněno, 35/60 částečně povysunuto (ranní prosvětlení), 0/100 - sjeté dolů, ale otevřené lamely, 100/100 vysunuté nahoru. Texty: Tma (0/0), Ráno (35/60), Stín (0/100), Den (100/100). Rozložení 2×2 v šířce panelu žaluzie. Tlačítka jsou první verze a po vyzkoušení se mohou upravit (velikost, texty). Poloha/naklopení v %.“
  - nahrazeno: „- Jednotná velikost písma pro informační řádky (Topení, Klimatizace, okno, text stavu). Vlastní hierarchii mohou mít název místnosti, teplota, vlhkost a popisky CO₂/PM2.5.“
  - nahrazeno: „- Pouze testovací paleta (není finální; ověřit kontrast, čitelnost venku a vzhled na OLED): otevřené žaluzie `#D8D8DC`, popisky `#9A9AA0`, Klimatizace OFF `#8E8E93`, zavřené žaluzie `#6B6B70`.“
- `8342122` 2026-10-24 · Prepracovani karty mistnosti: sloupce, ikony presetu, barevne oziveni
  - nahrazeno: „- Hlavička karty: název místnosti + stav místnosti, přes celou šířku.“
  - nahrazeno: „- Vlevo informační řádky v tomto pořadí: teplota + vlhkost (vedle sebe) → CO₂ → PM2.5 → první HVAC řádek → druhý HVAC řádek → okno.“
  - nahrazeno: „- Vpravo panel žaluzie (viz Žaluzie), začíná u řádku CO₂ a končí u řádku okna; nezasahuje do hlavičky ani k bloku teplota/vlhkost.“
  - nahrazeno: „- CO₂ a PM2.5 mají jen ikonu, bez textového popisku. CO₂: ikona molekuly CO₂ (`mdi:molecule-co2`, schválená). PM2.5: vlastní ikona z rozptýlených teček různé velikosti, bez rámečku a bez textu. Ikona má barvu `#9A9AA0` a podle hodnoty se nemění; číslo se barví jen při překročení prahu. Význam ikony čtečkám obrazovky sděluje `aria-label` řádku.“
  - nahrazeno: „- Mikrotrendy (viz Historie a grafy) jsou na kartě právě tři: CO₂ a PM2.5 vedle hodnoty ve svém řádku; teplota jedním mikrotrendem napravo od řádků Topení a Klimatizace, přes výšku obou těchto HVAC řádků (pod řádky CO₂ a PM2.5).“
  - nahrazeno: „- Šířka ≈ původní dvojice ukazatelů zvětšená o 20–30 %. Stálý počet lamel.“
  - nahrazeno: „- Poloha dělí sloupec: spuštěná horní část 100 % neprůhledná, dolní část představuje okno a zachovává strukturu lamel při 20 % neprůhlednosti. Poloha 100 % = zvýrazněna jen horní linka; poloha 0 % = zvýrazněno celé shora dolů.“
  - nahrazeno: „- Nad panelem žaluzie jsou čtyři tlačítka s předvolbami, rozložená 2×2 v šířce panelu. Hodnoty jsou poloha / naklopení v %:“
  - nahrazeno: „| Tlačítko | Poloha / naklopení | Význam |“
  - nahrazeno: „| Ráno | 35 / 60 | částečně povysunuto (ranní prosvětlení) |“
  - nahrazeno: „| Stín | 0 / 100 | sjeté dolů, lamely otevřené |“
  - nahrazeno: „- Tlačítka jsou první verze; po vyzkoušení se mohou upravit (velikost, texty).“
  - nahrazeno: „- Mikrotrendy (jen CO₂, PM2.5 a teplota): CO₂ a PM2.5 bezprostředně za hodnotou ve stejném řádku, teplota jedním mikrotrendem napravo od řádků Topení a Klimatizace přes jejich výšku; posledních 120 minut, 12 vzorků, normalizace na lokální minimum/maximum zobrazeného období; bez os, popisků, rámečku, bublin a interakce; jedna jemná barva; na první pohled patrné zlepšování / zhoršování / stabilita.“
  - nahrazeno: „- Okno: jeden řádek Zavřeno / Otevřeno. Zdroj stavu okna je výhradně IKEA MYGGBETT.“
  - nahrazeno: „- Pouze testovací paleta (není finální; ověřit kontrast, čitelnost venku a vzhled na OLED): otevřené žaluzie `#D8D8DC`, ikony CO₂/PM2.5 a vedlejší texty `#9A9AA0`, Klimatizace OFF `#8E8E93`, zavřené žaluzie `#6B6B70`.“
- `3b84142` 2026-10-24 · Shelly presety, popup Topeni/Klimatizace, detail entit, trendy u hodnot
  - nahrazeno: „- Nikdy se nic nepřepíná ani nevypíná z karty klepnutím na hodnotu; karta nic nevypíná sama.“
  - nahrazeno: „- Pod hlavičkou je blok teplota + vlhkost (vedle sebe) a pod ním čtyři sloupce zleva doprava: informační řádky | mikrotrendy | tlačítka předvoleb žaluzií | panel žaluzie. Informační řádky jsou v pořadí CO₂ → PM2.5 → první HVAC řádek → druhý HVAC řádek → okno.“
  - nahrazeno: „- CO₂ a PM2.5 mají jen ikonu, bez textového popisku. CO₂: ikona molekuly CO₂ (`mdi:molecule-co2`, schválená). PM2.5: vlastní ikona z rozptýlených teček různé velikosti, bez rámečku a bez textu. Obě ikony mají jemnou mátovou barvu (testovací `#5BD6B5`) a podle hodnoty se nemění; číslo se barví jen při překročení prahu. Význam ikony čtečkám obrazovky sděluje `aria-label` řádku.“
  - nahrazeno: „- Mikrotrendy (viz Historie a grafy) jsou na kartě právě tři, zarovnané pod sebou v jednom sloupci vpravo za informačními řádky (za textem „Plán · 21 °C“), a sloupec je stejně široký jako panel žaluzie. CO₂ a PM2.5 leží každý ve výšce svého řádku, teplota jedním mikrotrendem přes výšku obou HVAC řádků.“
  - nahrazeno: „- Řádky Topení a Klimatizace mají vždy ikonu: Topení 0–3 vlny, Klimatizace ikonu režimu. Ikona je vidět i při „Vypnuto“ (šedá) a při chybějících datech (přerušovaná, „––“).“
  - nahrazeno: „- Vlevo od panelu žaluzie je jeden sloupec čtyř tlačítek s předvolbami, přes stejnou výšku jako panel, v pořadí shora dolů Tma, Stín, Ráno, Den. Tlačítka mají jen ikonu, bez textu; název je v `aria-label` a v `title`. Ikony tvoří jednu rodinu čárových ikon (stejná tloušťka čáry, zaoblené konce) a vyprávějí světlo během dne. Hodnoty jsou poloha / naklopení v %:“
  - nahrazeno: „| 1 | Tma | měsíc | 0 / 0 | úplné zatemnění |“
  - nahrazeno: „| 2 | Stín | slunečník | 0 / 100 | sjeté dolů, lamely otevřené |“
  - nahrazeno: „| 3 | Ráno | východ slunce | 35 / 60 | částečně povysunuto (ranní prosvětlení) |“
  - nahrazeno: „| 4 | Den | slunce | 100 / 100 | vysunuto nahoru |“
  - nahrazeno: „- Tlačítko, jehož hodnoty odpovídají aktuálnímu stavu žaluzie (tolerance ±2 %), je zvýrazněné barvou své ikony.“
  - nahrazeno: „- Tlačítka jsou první verze; po vyzkoušení se mohou upravit (velikost, ikony).“
  - nahrazeno: „- Karta nemá vlastní popup s ovládáním. Detail tvoří tři zobrazení otevíraná klepnutím (viz Klikací akce): historie místnosti, graf CO₂/PM2.5 a standardní ovládání žaluzie.“
  - nahrazeno: „- „Historie místnosti – 24 h“ (inspirace iOS aplikací pro ovládání topení): plošné šedé pozadí + hlavní křivka teploty; modrá přerušovaná křivka vlhkosti; dole časové vrstvy Topení (Plán / Ručně / Vypnuto) a Klimatizace (barvy podle režimu); intenzita vytápění jako intenzita výplně 0–3 vln mezi časovou vrstvou a křivkou teploty.“
  - nahrazeno: „- Mikrotrendy (jen CO₂, PM2.5 a teplota; umístění viz Room Card): posledních 120 minut, 12 vzorků, normalizace na lokální minimum/maximum zobrazeného období; bez os, popisků, rámečku, bublin a interakce; každý jednou jemnou barvou (CO₂ a PM2.5 mátová, teplota broskvová), tenká čára s velmi jemnou plochou pod ní a tečkou na posledním vzorku; na první pohled patrné zlepšování / zhoršování / stabilita.“
  - nahrazeno: „| teplota | „Historie místnosti – 24 h“ |“
  - nahrazeno: „| preset žaluzie | okamžitě zavolá `script.zaluzie_posun` s daty `entity` (žaluzie této místnosti), `pos` a `tilt`; ovlivní jen žaluzii dané místnosti |“
  - nahrazeno: „- Pouze testovací paleta (není finální; ověřit kontrast, čitelnost venku a vzhled na OLED): spuštěná žaluzie šampaňská `#E8D9B5`, okno za žaluzií a otevřené okno obloha `#64D2FF`, vedlejší texty `#9A9AA0`, Klimatizace OFF `#8E8E93`, zavřené žaluzie `#6B6B70`, ikony CO₂/PM2.5 a jejich mikrotrendy máta `#5BD6B5`, mikrotrend teploty broskev `#FFB36B`, vlhkost jemně modrá `#7DBCE0`.“
  - nahrazeno: „- Ikony předvoleb žaluzií mají každá svou barvu: Tma `#A5A1F2`, Stín `#7FC8F8`, Ráno `#FFAA66`, Den `#FFD84A`.“
  - nahrazeno: „- Ostatní barvy (režimy Klimatizace, Plán/Ručně, vlhkost) nejsou v Memory rozhodnuty, kromě pravidel výše: Větrání = barva Plánu; běžící Klimatizace ≠ OFF; křivka vlhkosti modrá.“
- `61677ef` 2026-10-24 · Trendy ve vlastnim sloupci, spolecna osa, jednotne velikosti, ilustrace bez konfigurace
  - nahrazeno: „- Pod hlavičkou je blok teplota + mikrotrend teploty + vlhkost (vedle sebe) a pod ním tři sloupce zleva doprava: informační řádky | tlačítka předvoleb žaluzií | panel žaluzie. Informační řádky jsou v pořadí CO₂ → PM2.5 → první HVAC řádek → druhý HVAC řádek → okno.“
  - nahrazeno: „- Mikrotrendy (viz Historie a grafy) jsou na kartě právě tři, u svých hodnot, ne u žaluzií: teplota hned za číslem teploty, CO₂ a PM2.5 hned za svou hodnotou. Všechny tři začínají na stejné svislici (120 px zleva) a jsou stejně široké jako panel žaluzie (60 px, na užších displejích 52 px), takže jsou zarovnané pod sebou. Do řádků Topení, Klimatizace a okna nezasahují.“
  - nahrazeno: „- Volitelná ilustrace místnosti (`scene`: `bedroom`, `office`, `kids`, `living`): jemná čárová kresba v pravém horním rohu karty, v tónu `bedroom` `#A5A1F2`, `office` `#7FC8F8`, `kids` `#FFB36B`, `living` `#E8D9B5`, plynule zeslabená směrem k obsahu (maska + měkká záře). Je jen dekorativní (`aria-hidden`), nepřekrývá text a bez klíče `scene` se nezobrazí.“
  - nahrazeno: „- Výška panelu = výška informačních řádků (od řádku CO₂ po řádek okna). Šířka panelu = šířka sloupce mikrotrendů (na iPhonu 14 Pro 60 px, na užších displejích menší). Stálý počet lamel.“
  - nahrazeno: „- Mikrotrendy (jen CO₂, PM2.5 a teplota; umístění viz Room Card; klepnutí na ně otevře detail své entity): posledních 120 minut, 12 vzorků, normalizace na lokální minimum/maximum zobrazeného období; bez os, popisků, rámečku, bublin a interakce; každý jednou jemnou barvou (CO₂ a PM2.5 mátová, teplota broskvová), tenká čára s velmi jemnou plochou pod ní a tečkou na posledním vzorku; na první pohled patrné zlepšování / zhoršování / stabilita.“
  - nahrazeno: „- Jednotná velikost písma pro informační řádky (Topení, Klimatizace, okno, text stavu). Vlastní hierarchii mohou mít název místnosti, teplota a vlhkost.“
- `f7d6f62` 2026-10-24 · Historie mistnosti zpet, oddeleni kvality vzduchu, tlumena zaluzie, Bez dat s duvodem
  - nahrazeno: „- Detail hodnot: klepnutí na teplotu (i její mikrotrend), vlhkost, CO₂, PM2.5 a okno otevře standardní detail entity Home Assistantu (`more-info`) s grafem historie. Karta nemá vlastní grafy.“
  - nahrazeno: „- Ilustrace místnosti: jemná čárová kresba v pravém horním rohu karty, v tónu `bedroom` `#A5A1F2`, `office` `#7FC8F8`, `kids` `#FFB36B`, `living` `#E8D9B5`, plynule zeslabená směrem k obsahu (maska + měkká záře). Je jen dekorativní (`aria-hidden`) a nepřekrývá text.“
  - nahrazeno: „| 1 | Bez dat | chybí nezbytná data | neutrální |“
  - nahrazeno: „- Poloha dělí sloupec: spuštěná horní část (žaluzie) je 100 % neprůhledná, dolní část představuje okno, zachovává strukturu lamel a je v barvě oblohy při přibližně 28 % neprůhlednosti. Poloha 100 % = zvýrazněna jen horní linka; poloha 0 % = zvýrazněno celé shora dolů.“
  - nahrazeno: „- Karta nemá vlastní grafy ani vlastní detail hodnot: hodnoty, okno a žaluzie otevírají standardní detail entity Home Assistantu s historií. Vlastní popup má jen ovládání Topení a Klimatizace (viz Ovládání Topení a Klimatizace).“
  - nahrazeno: „- Vlastní 24h grafy („Historie místnosti – 24 h“, společný graf CO₂/PM2.5) byly nahrazeny standardním detailem entity s historií (viz Klikací akce).“
  - nahrazeno: „- Mikrotrendy (jen CO₂, PM2.5 a teplota; umístění viz Room Card; klepnutí na ně otevře detail své entity): posledních 120 minut, 12 vzorků; bez viditelných os, popisků, rámečku, bublin a interakce; každý jednou jemnou barvou (CO₂ a PM2.5 mátová, teplota broskvová), tenká čára s velmi jemnou plochou pod ní a tečkou na posledním vzorku; na první pohled patrné zlepšování / zhoršování / stabilita.“
  - nahrazeno: „| teplota (i mikrotrend), vlhkost, CO₂, PM2.5, okno | standardní detail entity (`more-info`) s grafem historie |“
  - nahrazeno: „- Pouze testovací paleta (není finální; ověřit kontrast, čitelnost venku a vzhled na OLED): spuštěná žaluzie šampaňská `#E8D9B5`, okno za žaluzií a otevřené okno obloha `#64D2FF`, vedlejší texty `#9A9AA0`, Klimatizace OFF `#8E8E93`, zavřené žaluzie `#6B6B70`, ikony CO₂/PM2.5 a jejich mikrotrendy máta `#5BD6B5`, mikrotrend teploty broskev `#FFB36B`. Vlhkost je bez barvy (`#C7C7CC`); ikony CO₂/PM2.5 bez dat jsou šedé `#8E8E93`.“
  - nahrazeno: „- Chybí-li nezbytná data, stav místnosti je „Bez dat“. Nezbytná data jsou teplota, vlhkost, CO₂, PM2.5 a House Mode.“
- `c65d184` 2026-10-24 · TODO P1/P2: souhrn domu, HVAC jako jeden cil, nova historie, iOS popup, zastarala data
  - nahrazeno: „- Obsah shora: titulek „Domov“ → hlavička s venkovními podmínkami → upozornění (jen pokud nějaká jsou) → karty místností. Pod kartami nic.“
  - nahrazeno: „- Text HVAC řádku se nikdy nezkracuje uprostřed čísla: když se na úzkém displeji nevejde celý, skryje se celá cílová teplota („· 21 °C“) a stav (Plán, Ručně, WindFree …) zůstane celý. Celý text řádku je vždy v `aria-label`.“
  - nahrazeno: „- Řádky Topení, Klimatizace a okna jsou klikací (Topení a Klimatizace otevírají popup, okno detail entity). Řádky Topení a Klimatizace mají vždy ikonu: Topení 0–3 vlny, Klimatizace ikonu režimu. Ikona je vidět i při „Vypnuto“ (šedá) a při chybějících datech (přerušovaná, „––“).“
  - nahrazeno: „- Klepnutí na řádek Topení nebo Klimatizace otevře popup (na mobilu spodní panel, na širokém displeji dialog uprostřed) s titulkem systému a názvem místnosti. Zavře se tlačítkem ✕, klepnutím mimo panel nebo klávesou Escape. Dole je odkaz „Detail a historie“, který popup zavře a otevře standardní detail `climate` entity.“
  - nahrazeno: „- Vlevo od panelu žaluzie je jeden sloupec tří kulatých tlačítek s předvolbami (ve stylu ovládání Shelly: kruh s okrajem a glyf žaluzie), rozložených přes výšku panelu, v pořadí shora dolů Tma, Stín, Den. Tlačítka mají jen ikonu, bez textu; název je v `aria-label` a v `title`. Glyf je horní kolejnice žaluzie: Den jen kolejnice (vytaženo), Stín kolejnice a řídké čáry (lamely otevřené), Tma kolejnice a husté tlustší čáry (zavřeno). Hodnoty jsou poloha / naklopení v %:“
  - nahrazeno: „| 1 | Tma | kolejnice + husté čáry | 0 / 0 | úplné zatemnění |“
  - nahrazeno: „| 2 | Stín | kolejnice + řídké čáry | 0 / 100 | sjeté dolů, lamely otevřené |“
  - nahrazeno: „| 3 | Den | jen horní kolejnice | 100 / 100 | vysunuto nahoru |“
  - nahrazeno: „- Předvolba se odešle až **dvojitým klepnutím (do 400 ms) nebo dlouhým stiskem (550 ms)**; jednoduché klepnutí nic neodešle. Během držení se kolem tlačítka vyplňuje kroužek (zpětná vazba pro dlouhý stisk), po odeslání tlačítko krátce zableskne. Z klávesnice se předvolba odešle klávesou Enter nebo mezerník.“
  - nahrazeno: „- Předvolba Ráno (35 / 60) byla zrušena; Shelly ikony odpovídají třem polohám.“
  - nahrazeno: „- Karta má dva vlastní popupy ve stejném rámu (na mobilu spodní panel, na širokém displeji dialog uprostřed; zavření ✕, klepnutím mimo nebo Escape): ovládání Topení / Klimatizace a „Historie místnosti – 24 h“. Ostatní hodnoty, okno a žaluzie otevírají standardní detail entity Home Assistantu.“
  - nahrazeno: „- „Historie místnosti – 24 h“ (inspirace iOS aplikací pro ovládání topení; otevírá ji teplota a její mikrotrend): plošné šedé pozadí a hlavní bílá křivka teploty s minimem a maximem vlevo; modrá přerušovaná křivka vlhkosti s minimem a maximem vpravo; pod grafem časové vrstvy shora Intenzita (oranžová, sytost = 0–3 vlny), Topení (Plán / Ručně / Vypnuto) a Klimatizace (barvy podle režimu); časová osa po 6 hodinách a legenda jen s výskytem v daném období. Načítání, chyba a „Za posledních 24 hodin nejsou k dispozici data“ mají vlastní text. Dole odkaz „Detail teploty“ na standardní detail entity.“
  - nahrazeno: „- Mikrotrendy (jen CO₂, PM2.5 a teplota; umístění viz Room Card; klepnutí viz Klikací akce): posledních 120 minut, 12 vzorků; bez viditelných os, popisků, rámečku, bublin a interakce; každý jednou jemnou barvou (CO₂ a PM2.5 mátová, teplota broskvová), tenká čára s velmi jemnou plochou pod ní a tečkou na posledním vzorku; na první pohled patrné zlepšování / zhoršování / stabilita.“
  - nahrazeno: „| řádek Topení / Klimatizace | popup s ovládáním (viz Ovládání Topení a Klimatizace) |“
  - nahrazeno: „| preset žaluzie (dvojité klepnutí nebo dlouhý stisk) | zavolá `script.zaluzie_posun` s daty `entity` (žaluzie této místnosti), `pos` a `tilt`; ovlivní jen žaluzii dané místnosti; jednoduché klepnutí nic neudělá |“
  - nahrazeno: „- Chybí-li nezbytná data, stav místnosti je „Bez dat“ doplněné o první chybějící údaj v pořadí teplota, vlhkost, CO₂, PM2.5, režim domu (např. „Bez dat · režim domu“), aby bylo jasné, co doplnit. Nezbytná data jsou teplota, vlhkost, CO₂, PM2.5 a House Mode.“
- `0f1b082` 2026-10-24 · TODO: konsolidace na otevrene body a nalezy z testovaciho pruchodu
- `9f374dd` 2026-10-24 · Opravy z testu a automaticke testy (npm test)
- `6bcf48a` 2026-10-24 · Zaluzie: 11 lamel, predvolby vpravo bez ramecku, ilustrace vys, barvy CO2 a PM2.5
  - nahrazeno: „- Pod hlavičkou je blok teplota + vlhkost (vedle sebe, bez mikrotrendu) a pod ním tři sloupce zleva doprava: informační řádky | tlačítka předvoleb žaluzií | panel žaluzie. Informační řádky jsou v pořadí CO₂ → PM2.5 → první HVAC řádek → druhý HVAC řádek → okno; všechny mají stejnou výšku.“
  - nahrazeno: „- CO₂ a PM2.5 mají jen ikonu, bez textového popisku. CO₂: ikona molekuly CO₂ (`mdi:molecule-co2`, schválená). PM2.5: vlastní ikona z rozptýlených teček různé velikosti, bez rámečku a bez textu. Obě ikony mají jemnou mátovou barvu (testovací `#5BD6B5`) jen tehdy, když řádek má hodnotu; bez dat jsou ikona i „––“ neutrálně šedé (bez barvy, bez mikrotrendu). Podle hodnoty se barva ikony nemění; číslo se barví jen při překročení prahu. Význam ikony čtečkám obrazovky sděluje `aria-label` řádku.“
  - nahrazeno: „- Konec mikrotrendu (okraj koncové tečky) je od tlačítek předvoleb žaluzií vzdálen 1,5× mezery mezi tlačítky předvoleb a panelem žaluzie (na iPhonu 14 Pro 13,5 px proti 9 px), takže trend je o kousek kratší než levý sloupec.“
  - nahrazeno: „- Ilustrace místnosti: jemná čárová kresba v pravém horním rohu karty, v tónu `bedroom` `#A5A1F2`, `office` `#7FC8F8`, `kids` `#FFB36B`, `living` `#E8D9B5`. Leží v měkkém obdélníku přes volnou pravou část hlavičky karty (asi 58 % šířky, do konce bloku teplota/vlhkost); obdélník i kresba se zeslabují jen u levého a spodního okraje, kresba sama je celá vidět. Je jen dekorativní (`aria-hidden`) a nepřekrývá text.“
  - nahrazeno: „- Výška panelu = výška informačních řádků (od řádku CO₂ po řádek okna). Šířka panelu je 60 px (na užších displejích 52 px); na šířce mikrotrendů nezávisí. Stálý počet lamel.“
  - nahrazeno: „- Naklopení mění jen tloušťku lamel: 0 % téměř splývají v plnou plochu (tenká mezera), 100 % velmi tenké linky s mezerami.“
  - nahrazeno: „- Poloha dělí sloupec: spuštěná horní část (žaluzie) je šampaňská utlumená na 50 % (horní kolejnice 70 %), aby zatažená žaluzie na tmavém displeji nesvítila, a přesto je zřetelně světlejší než okno; dolní část představuje okno, zachovává strukturu lamel a je v barvě oblohy při přibližně 28 % neprůhlednosti. Poloha 100 % = zvýrazněna jen horní linka; poloha 0 % = zvýrazněno celé shora dolů.“
  - nahrazeno: „- Vlevo od panelu žaluzie je jeden sloupec tří kulatých tlačítek s předvolbami (kruh s okrajem a glyf žaluzie), rozložených přes výšku panelu, v pořadí shora dolů Tma, Stín, Den. Tlačítka mají jen ikonu, bez textu; název je v `aria-label` a v `title`. Glyfy jsou ve stylu symbolů žaluzií z aplikace Domácnost a ve stejné čárové tloušťce jako ostatní ikony karty (TODO P1.4): plná horní kolejnice, pod ní lamely; Tma husté silné lamely (téměř plná plocha), Stín tenké lamely s mezerami, Den lamely stažené pod kolejnicí a šňůrka. Glyf 20 px v kruhu 34 px. Hodnoty jsou poloha / naklopení v %:“
  - nahrazeno: „| 1 | Tma | kolejnice + husté silné lamely | 0 / 0 | úplné zatemnění |“
  - nahrazeno: „| 2 | Stín | kolejnice + tenké lamely s mezerami | 0 / 100 | sjeté dolů, lamely otevřené |“
  - nahrazeno: „| 3 | Den | kolejnice, stažené lamely, šňůrka | 100 / 100 | vysunuto nahoru |“
  - nahrazeno: „- Předvolba se odešle až **dvojitým klepnutím (do 400 ms) nebo dlouhým stiskem (550 ms)**; jednoduché klepnutí nic neodešle, ale ukáže vlevo od tlačítka na 1,6 s bublinu „Podržte nebo klepněte dvakrát“ s haptikou `selection` (TODO P1.3). Během držení se kolem tlačítka vyplňuje kroužek (zpětná vazba pro dlouhý stisk), po odeslání tlačítko krátce zableskne a ozve se haptika `success`; při chybě haptika `failure` a hláška. Haptiku převádí aplikace Home Assistant (událost `haptic`); v prohlížeči se nic nestane. Z klávesnice se předvolba odešle klávesou Enter nebo mezerník.“
  - nahrazeno: „- Nedostupná žaluzie (entita chybí, `unavailable` / `unknown`): předvolby zůstanou vidět a dají se zaměřit, ale jsou šedé (`aria-disabled`), nevyplňuje se kroužek dlouhého stisku a nic neodešlou; klepnutí nebo klávesa ukáže bublinu „Žaluzie je nedostupná“ s haptikou `warning`.“
  - nahrazeno: „- Tlačítko, jehož hodnoty odpovídají aktuálnímu stavu žaluzie (tolerance ±2 %), má okraj a podklad v barvě své ikony.“
  - nahrazeno: „- Pouze testovací paleta (není finální; ověřit kontrast, čitelnost venku a vzhled na OLED): spuštěná žaluzie šampaňská `#E8D9B5` při 50 % (kolejnice 70 %), okno za žaluzií a otevřené okno obloha `#64D2FF`, vedlejší texty `#9A9AA0`, Klimatizace OFF `#8E8E93`, zavřené žaluzie `#6B6B70`, ikony CO₂/PM2.5 a jejich mikrotrendy máta `#5BD6B5`, mikrotrend teploty broskev `#FFB36B`. Vlhkost je bez barvy (`#C7C7CC`); ikony CO₂/PM2.5 bez dat jsou šedé `#8E8E93`.“
  - nahrazeno: „- Ikony předvoleb žaluzií mají každá svou barvu: Tma `#A5A1F2`, Stín `#7FC8F8`, Den `#FFD84A`.“
- `67e1489` 2026-10-24 · Predvolby zaluzii: tlumene ikony, podsviceni aktivni, pulzovani do dojezdu
  - nahrazeno: „- Ikony nemají každá svou barvu: jsou šedé `#8E8E93`, a jen ikona, jejíž hodnoty odpovídají aktuálnímu stavu žaluzie (tolerance ±2 %), je bílá. Stav se tak čte ze světlosti, ne z odstínu; čtečkám ho říká `aria-pressed`. Při neznámém stavu nebo vlastní poloze (například 40 / 60) není bílá žádná.“
  - nahrazeno: „- Předvolba se odešle až **dvojitým klepnutím (do 400 ms) nebo dlouhým stiskem (550 ms)**; jednoduché klepnutí nic neodešle, ale ukáže vlevo od tlačítka (přes panel) na 1,6 s bublinu „Podržte nebo klepněte dvakrát“ s haptikou `selection` (TODO P1.3). Během držení za ikonou roste měkký světlý čtvereček (zpětná vazba pro dlouhý stisk) a ikona se maličko zmenší; po odeslání se ikona zbělí a jednou „poskočí“ (zvětší se o 22 % a vrátí) a ozve se haptika `success`; při chybě haptika `failure` a hláška. Při „omezit pohyb“ zůstane čtvereček bez růstu a bez poskočení. Haptiku převádí aplikace Home Assi …“
  - nahrazeno: „- Ikony předvoleb žaluzií jsou šedé `#8E8E93`; ikona odpovídající stavu žaluzie je bílá `#FFFFFF`. Nedostupná žaluzie: šedá `#8E8E93` při 40 % neprůhlednosti.“
- `9be9867` 2026-10-24 · Dva sloupce na sirku telefonu, uzky rezim podle sirky mistnosti
  - nahrazeno: „- Jeden sloupec, bez vodorovného posouvání. Desktop není priorita.“
  - nahrazeno: „- Vpravo od panelu žaluzie (poslední sloupec karty) je jeden sloupec tří tlačítek s předvolbami, každé třetina výšky panelu, v pořadí shora dolů Den, Stín, Tma (zdvižená žaluzie nahoře, zavřená dole). Tlačítko je jen ikona: bez kulatého i jiného rámečku, bez textu; název je v `aria-label` a v `title`. Ikona je schematická žaluzie: široká kolejnice, lamely a šňůrka; Den má dvě stažené lamely pod kolejnicí a šňůrku dole pod nimi, Stín čtyři tenké lamely, Tma stejné čtyři lamely silné a téměř se dotýkající. Ikona je 32 px široká (na displeji do 380 px 28 px), sloupec 36 px (32 px); tlačítko je vy …“
- `a549142` 2026-10-24 · Kolo 9: Prehled/Detail, konflikty, kvalita vzduchu, dotykove cile 44 px
  - nahrazeno: „- Obsah shora: titulek „Domov“ → hlavička s venkovními podmínkami → souhrn domu (štítky, jen pokud nějaké jsou) → upozornění (jen pokud nějaká jsou) → karty místností. Pod kartami nic.“
  - nahrazeno: „- Souhrn domu (TODO P2.2): štítky jen pro to, co je jinak než v klidném domě, v pořadí: otevřená okna („1 okno otevřené“, „2 okna otevřená“, „5 oken otevřených“; obloha), ruční přepis Topení („Ručně: Pracovna“, u tří a více místností počet; oranžová), místnosti, kde se právě topí – aspoň jedna vlna („Topí 3 místnosti“; oranžová), zapnutá klimatizace („Klimatizace: Ložnice“, u tří a více počet; modrá). Štítek má ikonu (okno, vlny, klimatizace), jména všech místností jsou v `aria-label` a nápovědě. Neznámé stavy se nepočítají. Štítky nejsou klikací.“
  - nahrazeno: „- Blok informačních řádků má dva stejně široké sloupce: vlevo ikony, hodnoty a popisky, vpravo mikrotrendy. Mikrotrend je tedy stejně široký jako levý sloupec s ikonami, hodnotami a popisky.“
  - nahrazeno: „- CO₂ a PM2.5 mají jen ikonu, bez textového popisku. CO₂: ikona molekuly CO₂ (`mdi:molecule-co2`, schválená). PM2.5: vlastní ikona z rozptýlených teček různé velikosti, bez rámečku a bez textu. CO₂ a PM2.5 mají každá svou barvu, stejnou pro ikonu i mikrotrend: CO₂ svěže zelená (testovací `#A6E36B`), PM2.5 fialová (testovací `#B8A6FF`); obě se liší odstínem od oranžové a červené varování i od broskvového mikrotrendu teploty. Barvu mají jen tehdy, když řádek má hodnotu; bez dat jsou ikona i „––“ neutrálně šedé (bez barvy, bez mikrotrendu). Podle hodnoty se barva ikony nemění; číslo se barví jen  …“
  - nahrazeno: „- Vlhkost je bez barvy (neutrální světle šedá); chybí-li, je „––“ šedé.“
  - nahrazeno: „- Mikrotrendy (viz Historie a grafy) jsou na kartě právě tři, všechny v pravém sloupci informačních řádků, takže začínají na stejné svislici a jsou stejně široké: CO₂ a PM2.5 ve svém řádku, mikrotrend teploty vedle řádků Topení a Klimatizace a vysoký jako oba řádky dohromady (teplota je výsledkem vytápění a chlazení). Vedle řádku okna mikrotrend není.“
  - nahrazeno: „- Mikrotrendy se doleva plynule ztrácejí (vlevo průhledné, plně viditelné od 55 % své šířky). Text řádků Topení a Klimatizace smí přesáhnout do sloupce trendů, nejvýš do 40 % jeho šířky, a leží nad trendem; na iPhonu 14 Pro je tak celé „WindFree · 22 °C“ i „Ručně · 22,5 °C“ (TODO P1.1).“
  - nahrazeno: „- Detail hodnot: klepnutí na teplotu nebo její mikrotrend otevře popup „Historie místnosti – 24 h“ (viz Historie a grafy). Klepnutí na vlhkost, CO₂, PM2.5 (i jejich mikrotrendy) a okno otevře standardní detail entity Home Assistantu (`more-info`) s grafem historie.“
  - nahrazeno: „- Ikony jsou tlumené a nemají každá svou barvu: tmavě šedé `#6F6F74` (kontrast k pozadí karty aspoň 3 : 1). Jen ikona, jejíž hodnoty odpovídají aktuálnímu stavu žaluzie (tolerance ±2 %), svítí: má tlumenou šampaňskou `#C9C0A8` (odstín barvy žaluzií, ne čistě bílou) a za ní měkký zaoblený čtvereček (poloměr 10 px, šampaňská `#E8D9B5` při 13 %), 36 × 36 px. Stav se čte ze světlosti a čtverečku, ne z odstínu; čtečkám ho říká `aria-pressed`. Při neznámém stavu nebo vlastní poloze (například 40 / 60) nesvítí žádná.“
  - nahrazeno: „- Předvolba na cestě: po odeslání začne ikona cílové předvolby pulzovat, dokud žaluzie nedojede (poloha i naklopení v toleranci a stav není `opening` / `closing`): podsvícení čtverečku se plynule objevuje a mizí (1,3 s tam a zpět, neprůhlednost 10 → 100 %) a ikona s ním mění barvu mezi tmavě šedou a šampaňskou. Pulzovat začne hned po odeslání, ne až po odpovědi služby (skript může běžet, dokud žaluzie nedojede). Během pulzování ostatní ikony nesvítí, aby bylo jasné, kam žaluzie jede; cílová má `aria-busy`. Pulzování skončí: (1) dojezdem, kdy podsvícení zůstane trvale; (2) když se stav, poloha  …“
  - nahrazeno: „- Předvolba se odešle až **dvojitým klepnutím (do 400 ms) nebo dlouhým stiskem (550 ms)**; jednoduché klepnutí nic neodešle, ale ukáže vlevo od tlačítka (přes panel) na 1,6 s bublinu „Podržte nebo klepněte dvakrát“ s haptikou `selection` (TODO P1.3). Během držení za ikonou roste podsvícený čtvereček (zpětná vazba pro dlouhý stisk) a ikona se maličko zmenší; po odeslání ikona jednou „poskočí“ (zvětší se o 22 % a vrátí) a ozve se haptika `success` (až když Home Assistant službu dokončí); při chybě haptika `failure` a hláška. Při „omezit pohyb“ zůstane čtvereček bez růstu a bez poskočení. Haptiku …“
  - nahrazeno: „- Karta má dva vlastní popupy ve stejném rámu: ovládání Topení / Klimatizace a „Historie místnosti – 24 h“. Ostatní hodnoty, okno a žaluzie otevírají standardní detail entity Home Assistantu.“
  - nahrazeno: „- Mikrotrendy (jen CO₂, PM2.5 a teplota; umístění viz Room Card; klepnutí viz Klikací akce): posledních 120 minut, 12 vzorků; bez viditelných os, popisků, rámečku, bublin a interakce; každý jednou jemnou barvou (CO₂ a PM2.5 mátová, teplota broskvová), tenká čára s velmi jemnou plochou pod ní a tečkou na posledním vzorku, doleva se ztrácí; na první pohled patrné zlepšování / zhoršování / stabilita.“
  - nahrazeno: „| vlhkost, CO₂, PM2.5 (i mikrotrendy), okno | standardní detail entity (`more-info`) s grafem historie |“
  - nahrazeno: „- Okno: jeden řádek Zavřeno / Otevřeno. Zdroj stavu okna je výhradně IKEA MYGGBETT. Otevřené okno je světle modré (barva oblohy, testovací `#64D2FF`) včetně ikony, zavřené je šedé.“
  - nahrazeno: „- Pouze testovací paleta (není finální; ověřit kontrast, čitelnost venku a vzhled na OLED): spuštěná žaluzie šampaňská `#E8D9B5` při 50 % (kolejnice 70 %), okno za žaluzií a otevřené okno obloha `#64D2FF`, vedlejší texty `#9A9AA0`, Klimatizace OFF `#8E8E93`, zavřené žaluzie `#6B6B70`, ikona CO₂ a její mikrotrend zelená `#A6E36B`, ikona PM2.5 a její mikrotrend fialová `#B8A6FF`, mikrotrend teploty broskev `#FFB36B`. Vlhkost je bez barvy (`#C7C7CC`); ikony CO₂/PM2.5 bez dat jsou šedé `#8E8E93`.“
  - nahrazeno: „- Ikony předvoleb žaluzií jsou tmavě šedé `#6F6F74`; ikona odpovídající stavu žaluzie je tlumená šampaňská `#C9C0A8` na čtverečku šampaňské `#E8D9B5` při 13 %. Nedostupná žaluzie: šedá `#6F6F74` při 55 % neprůhlednosti.“
  - nahrazeno: „- Štítky souhrnu domu: podklad je barva štítku na 14 % přes tmavé pozadí, text a ikona v barvě štítku (okna obloha `#64D2FF`, Ručně a Topí oranžová `#FF9F0A`, Klimatizace modrá `#64D2FF`).“
- `d43b06f` 2026-10-24 · Kolo 10: bez prepinace Prehled/Detail, tolerance +-5 %, doba otevreni okna, dva sloupce od 620 px
  - nahrazeno: „- Telefon na výšku: jeden sloupec, karta místnosti je na šířku displeje. Telefon na šířku: dvě karty místností vedle sebe (24. 10.). Přepíná šířka karty Domov, ne displeje: do 679 px jeden sloupec, od 680 px dva, nikdy víc (iPhone 14 Pro na šířku má kartu asi 734 px širokou, tedy dva sloupce). Karty jsou stejně široké a řadí se po řádcích zleva doprava a shora dolů, pořadí tedy zůstává Ložnice, Pracovna / Maxík, Mikuláš / Obývák (pátá karta je sama vlevo). Počet sloupců určuje šířka, kterou nástěnka kartě dá; omezí-li ji zobrazení na jeden sloupec, zůstane karta v jednom sloupci (ověřit na iPh …“
  - nahrazeno: „- Obsah shora: titulek „Domov“ s přepínačem Přehled | Detail vpravo (viz Přehled a Detail) → hlavička s venkovními podmínkami → souhrn domu (štítky, jen pokud nějaké jsou) → upozornění (jen pokud nějaká jsou) → karty místností. Pod kartami nic.“
  - nahrazeno: „- Mikrotrendy (viz Historie a grafy) jsou na kartě právě tři: CO₂ a PM2.5 ve svém řádku a mikrotrend teploty vedle řádků Topení a Klimatizace, vysoký jako oba řádky dohromady (teplota je výsledkem vytápění a chlazení). Vedle řádku okna mikrotrend není. Mikrotrend CO₂ a PM2.5 navazuje přímo na hodnotu: začíná 70 px od levého okraje informačních řádků, tedy pod koncem i nejkratší hodnoty („2 µg/m³“ končí asi 84 px od okraje), takže čára vyrůstá z čísla a jednotky a oko ji nemusí hledat (TODO P1.10.1); delší hodnota („1640 ppm“) leží nad jeho blednoucím začátkem. Číslo a jednotka se nikdy nezalam …“
  - nahrazeno: „- Dotykové cíle (TODO P1.2): každý klikací prvek karty má účinnou dotykovou plochu aspoň 44 × 44 px; ukazuje se hit-testem, proto se počítá i neviditelné rozšíření (vzhled se nemění). Okno: řádek 32 px a neviditelná plocha pod ním (dolů do okraje karty); vlhkost, předvolby a přepínač Přehled | Detail: neviditelné rozšíření; CO₂ + PM2.5 jeden cíl 52 px; Topení + Klimatizace jeden cíl 52 px. Přístupný název tlačítek CO₂ + PM2.5, Topení + Klimatizace a sbalené místnosti je přesně jejich viditelný text (WCAG 2.5.3), místnost, názvy veličin a akce jsou v popisu (`aria-describedby`).“
  - nahrazeno: „- Ikony jsou tlumené a nemají každá svou barvu: tmavě šedé `#6F6F74` (kontrast k pozadí karty aspoň 3 : 1). Jen ikona, jejíž hodnoty odpovídají aktuálnímu stavu žaluzie (tolerance ±2 %), svítí: změní barvu na tlumenou šampaňskou `#C9C0A8` (odstín barvy žaluzií, ne čistě bílou); nic dalšího se nepřidává (bez podbarvení, čtverečku a rámečku; zamítnuto 24. 10.). Stav se čte ze světlosti ikony; čtečkám ho říká `aria-pressed`. Při neznámém stavu nebo vlastní poloze (například 40 / 60) nesvítí žádná.“
  - nahrazeno: „- Vpravo v řádku titulku „Domov“ je přepínač ve stylu iOS (TODO P2.1): dvě ikony Přehled | Detail v zaobleném poli, zvolená má světlejší podklad; každá ikona má dotykový cíl 44 × 44 px, `aria-pressed` a název (Přehled, Detail). Přepnutí dá haptiku `selection`. Zvolené zobrazení se pamatuje jen v tomto zařízení (`localStorage`); při blokovaném úložišti karta začne v Detailu a volba platí do znovunačtení. Výchozí je Detail.“
  - nahrazeno: „- Detail: všechny místnosti jako celé karty (jako dosud).“
  - nahrazeno: „- Přehled: místnost **bez odchylky** je jedna sbalená řádka (výška aspoň 60 px, celý řádek je tlačítko): název, vlevo pod ním stav s tečkou, vpravo teplota a vlhkost a šipka dolů. Místnost **s odchylkou** zůstane celou kartou. Odchylka je stav jiný než Příjemné (Bez dat, varování, kritické, tedy i neznámá nebo zastaralá data) nebo konflikt (viz Konflikty); neznámé údaje se tedy nikdy neschovají do sbalené řádky.“
  - nahrazeno: „- Klepnutí na sbalenou místnost ji rozbalí na celou kartu (haptika `selection`), fokus přejde na tlačítko názvu; klepnutí na název (šipka nahoru, `aria-expanded`) ji sbalí a fokus se vrátí na řádku. Rozbalení je dočasné: přepnutím Přehled / Detail se zruší. Místnost, která se vychýlí, se rozbalí sama; sbalí se, až odchylka zmizí.“
  - nahrazeno: „- Pořadí místností se nemění, ve dvou sloupcích se sbalené řádky skládají stejně jako karty.“
  - nahrazeno: „- Zobrazení: štítek v souhrnu domu na prvním místě, oranžový (`#FF9F0A`): „Okno otevřené · topí se: Ložnice“, „Okno otevřené · chladí se: Pracovna“, „Chladí se, i když je chladno: Pracovna“ (u tří a více místností počet, jména v `aria-label`; čtečka řekne „Konflikt: …“) a jemná oranžová tečka za popiskem okna dané místnosti; popis okna pro čtečku se doplní o „konflikt“. Místnost s konfliktem zůstává v Přehledu celou kartou.“
  - nahrazeno: „| sbalená místnost (Přehled) | rozbalí místnost na celou kartu (viz Přehled a Detail) |“
  - nahrazeno: „- Primární HVAC řádek se od druhého liší jen řezem písma (polotučně, když systém běží), ne velikostí ani výškou řádku.“
  - nahrazeno: „- Okno: jeden řádek Zavřeno / Otevřeno, vysoký 32 px, může se pro popisek s tečkou konfliktu rozšířit doprava do prázdné buňky vedle sebe. Zdroj stavu okna je výhradně IKEA MYGGBETT. Otevřené okno je světle modré (barva oblohy, testovací `#64D2FF`) včetně ikony, zavřené je šedé. Při konfliktu (viz Konflikty) je za popiskem jemná oranžová tečka (6 px, `#FF9F0A`).“
  - nahrazeno: „- Oranžová = varování (CO₂ 1000+, PM2.5 15+), červená = kritické (CO₂ 1500+, PM2.5 35+).“
- `d5efcb1` 2026-10-24 · Osa teploty v historii podle namerene teploty, cil 5 C se nekresli
  - nahrazeno: „- Graf (výška plochy 150 px, kreslený 1 : 1 v šířce popupu): šedé pozadí, noc 22–6 h ztmavená; bílá křivka teploty se šedou plochou pod ní a tečkou na konci; vytápění jako oranžová výplň pod křivkou teploty se sytostí podle vln (1 / 2 / 3 vlny = 24 / 44 / 68 %); cíl Topení jako schodovitá přerušovaná čára jen v době Plán / Ručně; vlhkost jako modrá přerušovaná čára s vlastním měřítkem (rozsah v legendě). Stupnice teploty vpravo po celých stupních (při rozsahu nad 6 °C po dvou), aspoň 3 °C, pokrývá teplotu i cíl.“
- `5a3462c` 2026-10-24 · Konfigurace karty, dve okna v mistnosti, svetly a tmavy rezim
  - nahrazeno: „- Souhrn domu (TODO P2.2): štítky jen pro to, co je jinak než v klidném domě, v pořadí: konflikty (oranžově, viz Konflikty), otevřená okna („1 okno otevřené“, „2 okna otevřená“, „5 oken otevřených“; obloha), ruční přepis Topení („Ručně: Pracovna“, u tří a více místností počet; oranžová), místnosti, kde se právě topí – aspoň jedna vlna („Topí 3 místnosti“; oranžová), zapnutá klimatizace („Klimatizace: Ložnice“, u tří a více počet; modrá). Štítek má ikonu (okno, vlny, klimatizace), jména všech místností jsou v `aria-label` a nápovědě. Neznámé stavy se nepočítají. Štítky nejsou klikací.“
  - nahrazeno: „- Všechny karty mají stejné rozložení. Obývák má stejné rozložení bez žaluzií (prázdné místo se akceptuje).“
  - nahrazeno: „- Teplota, vlhkost, CO₂ a PM2.5 pocházejí výhradně z IKEA ALPSTUGA. Teplota z Topení se pro kartu nepoužívá (Topení měří u radiátoru pod oknem).“
  - nahrazeno: „- Detail hodnot: klepnutí na teplotu nebo její mikrotrend otevře popup „Historie místnosti – 24 h“ (viz Historie a grafy). Klepnutí na vlhkost a okno otevře standardní detail entity Home Assistantu (`more-info`) s grafem historie. CO₂ a PM2.5 (hodnoty i mikrotrendy) jsou jeden dotykový cíl: má-li místnost obě čidla, otevře popup „Kvalita vzduchu“ se dvěma řádky (CO₂ a PM2.5 s hodnotou, každý otevře standardní detail entity a popup zavře); má-li jen jedno, otevře rovnou jeho detail; bez čidla je neaktivní.“
  - nahrazeno: „- Ilustrace se zobrazuje bez konfigurace: bez klíče `scene` se zvolí podle názvu místnosti (Ložnice → `bedroom`, Pracovna → `office`, Maxík a Mikuláš → `kids`, Obývák / Obývací pokoj → `living`; velikost písmen a diakritika nerozhodují). U jiného názvu se bez `scene` nezobrazí. Klíč `scene` (`bedroom`, `office`, `kids`, `living`) volbu přepíše, `scene: none` ilustraci vypne.“
  - nahrazeno: „- `input_select.house_mode`, pouze hodnoty Zima a Léto.“
  - nahrazeno: „- Všechny prahy jsou v konfiguraci karty, nastaví se jednou a dál se nemění.“
  - nahrazeno: „- Intenzita vytápění (heating %) se zobrazuje ikonou 0–3 teplých vln, bez čísel a procent: 0 % = 0 vln, 1–34 % = 1, 35–67 % = 2, 68–100 % = 3. Meze jsou v konfiguraci.“
  - nahrazeno: „- Karta má tři vlastní popupy ve stejném rámu: ovládání Topení / Klimatizace, „Historie místnosti – 24 h“ a „Kvalita vzduchu“ (název místnosti jako podtitulek; dva velké řádky CO₂ a PM2.5 s ikonou, hodnotou a nápovědou „Detail a historie“). Ostatní hodnoty, okno a žaluzie otevírají standardní detail entity Home Assistantu.“
  - nahrazeno: „- „Historie místnosti – 24 h“ (podle denního přehledu iOS aplikace pro ovládání topení; otevírá ji teplota a její mikrotrend; TODO P2.7–P2.9):“
  - nahrazeno: „- Mikrotrendy (jen CO₂, PM2.5 a teplota; umístění viz Room Card; klepnutí viz Klikací akce): posledních 120 minut, 12 vzorků; bez viditelných os, popisků, rámečku, bublin a interakce; každý jednou jemnou barvou (CO₂ šalvějová zelená, PM2.5 levandulová, teplota broskvová), tenká čára s velmi jemnou plochou pod ní a tečkou na posledním vzorku, doleva se ztrácí; na první pohled patrné zlepšování / zhoršování / stabilita.“
  - nahrazeno: „- Čtečka obrazovky u CO₂, PM2.5 a trendu teploty řekne „za 2 hodiny stoupá / klesá / stabilní“; práh je polovina kroku osy (0,5 °C, 50 ppm, 2,5 µg/m³) mezi prvním a posledním vzorkem (TODO P2.5).“
  - nahrazeno: „- Společná osa: všechny mikrotrendy jedné veličiny mají v celém domě stejnou svislou osu, takže stejná hodnota leží ve všech místnostech ve stejné výšce a místnosti jdou porovnat. Rozsah osy = minimum a maximum všech vzorků dané veličiny ze všech místností za zobrazené období, zaokrouhlené dolů a nahoru na krok: teplota 1 °C, CO₂ 100 ppm, PM2.5 5 µg/m³. Jsou-li všechny vzorky stejné celé číslo kroku, osa se rozšíří o jeden krok na každou stranu (čára je uprostřed). Příklad: jedna místnost 22–23 °C, druhá 20–21 °C → osa 20–23 °C; první leží v horní části, druhá ve spodní. Osa se nikdy nenormali …“
  - nahrazeno: „| vlhkost, okno | standardní detail entity (`more-info`) s grafem historie |“
  - nahrazeno: „| preset žaluzie (dvojité klepnutí nebo dlouhý stisk) | zavolá `script.zaluzie_posun` s daty `entity` (žaluzie této místnosti), `pos` a `tilt`; ovlivní jen žaluzii dané místnosti; jednoduché klepnutí jen ukáže nápovědu |“
  - nahrazeno: „- Okno: jeden řádek Zavřeno / Otevřeno, vysoký 32 px, může se pro popisek s dobou otevření a tečkou konfliktu rozšířit doprava do prázdné buňky vedle sebe. U otevřeného okna je za popiskem slabě (sekundární šedá `#9A9AA0`, běžný řez) doba, jak dlouho je otevřené, podle `last_changed` stavu okna: „Otevřeno · 12 min“, „· 1 h 5 min“, „· 2 d 3 h“, do minuty „· < 1 min“ (nejvýš dvě jednotky, nulová druhá se vynechá). Doba se přepočítává každých 30 s, dokud je nějaké okno otevřené. Zavřené a neznámé okno dobu nemá. Čtečka ji řekne slovy („otevřené 1 hodina 5 minut“). Zdroj stavu okna je výhradně IKE …“
  - nahrazeno: „- Chybí-li nezbytná data, stav místnosti je „Bez dat“ doplněné o první chybějící nebo zastaralý údaj v pořadí teplota, vlhkost, CO₂, PM2.5, režim domu (např. „Bez dat · režim domu“, „Bez dat · CO₂ (před 2 h)“), aby bylo jasné, co doplnit. Nezbytná data jsou teplota, vlhkost, CO₂, PM2.5 a House Mode.“
  - nahrazeno: „- Chybějící CO₂ nebo PM2.5 zobrazuje „––“ s ikonou řádku.“
- `b55e6fb` 2026-10-24 · Priklad YAML se vsemi nastavenimi, Obyvak bez CO2 a PM2.5
  - nahrazeno: „- Teplota, vlhkost, CO₂ a PM2.5 pocházejí výhradně z čidel místnosti (IKEA ALPSTUGA, případně jiný teploměr místnosti). Teplota z Topení se pro kartu nepoužívá (Topení měří u radiátoru pod oknem).“
  - nahrazeno: „Vše nastavitelné je v YAML konfiguraci karty (24. 10. večer: „všechny proměnné do konfigurace“). Každý klíč je volitelný a bez něj platí výchozí hodnota, takže dosavadní konfigurace funguje beze změny. Chybná hodnota zastaví kartu srozumitelnou chybou (název klíče a co se čeká), nikdy se tiše neignoruje. Rozměry, animace, gesta a barvy zůstávají v kódu (barvy jsou CSS proměnné karty `--kd-…`, viz Barvy).“
- `5f75fc2` 2026-10-24 · Testy: slouceni 76 -> 45 se stejnym pokrytim kodu
- `03ee2cf` 2026-10-25 · Tri jazyky: cestina, svedstina a anglictina podle jazyka Home Assistantu
  - nahrazeno: „- `title: ""` vynechá nadpis; nemá-li hlavička nic jiného (venkovní podmínky, štítky souhrnu), vynechá se celá a první místnost začíná u okraje karty. Bez klíče `title` je nadpis „Domov“.“
  - nahrazeno: „- Teplota je dominantní; vlhkost vedle ní je sekundární, ve velikosti navazující na „°C“. Formát: „20,4 °C  46 %“, české formátování čísel.“
  - nahrazeno: „- Předvolby jsou v konfiguraci (24. 10. večer): společné `covers.presets` pro všechny žaluzie a `cover_presets` místnosti, které je pro ni přepíše. Výchozí jsou Den, Stín a Tma podle tabulky výše. Předvolba má `name` (název pro čtečku a nápovědu), `position` a `tilt` (0–100 %), volitelně `icon` (`open` = ikona Den, `shade` = Stín, `dark` = Tma; bez ní se zvolí podle hodnot: poloha nad 50 % → `open`, jinak naklopení nad 50 % → `shade`, jinak `dark`) a `description` (popis pro čtečku; bez něj „poloha 0 %, naklopení 100 %“). Předvolby jsou 1–3; tlačítka se dělí o výšku panelu rovným dílem (každé  …“
  - nahrazeno: „- Graf (výška plochy 150 px, kreslený 1 : 1 v šířce popupu): šedé pozadí, noc 22–6 h ztmavená; bílá křivka teploty se šedou plochou pod ní a tečkou na konci; vytápění jako oranžová výplň pod křivkou teploty se sytostí podle vln (1 / 2 / 3 vlny = 24 / 44 / 68 %); cíl Topení jako schodovitá přerušovaná čára jen v době Plán / Ručně; vlhkost jako modrá přerušovaná čára s vlastním měřítkem (rozsah v legendě). Stupnice teploty vpravo se řídí jen naměřenou teplotou, ne cílem topení: rozsah je minimum až maximum naměřených hodnot za 24 h s 5% rezervou nahoře a dole, takže křivka vyplní celou výšku gra …“
  - nahrazeno: „- Více oken v místnosti: řádek ukazuje souhrn. Je-li otevřené aspoň jedno okno, je místnost „otevřená“: popisek „Otevřeno“ při jednom otevřeném, „Otevřena 2“ (počet) při dvou a více; doba je doba nejdéle otevřeného okna. Jsou-li všechna okna zavřená, „Zavřeno“. Není-li žádné otevřené a aspoň jedno je neznámé, „––“ (neznámé se nikdy nebere jako zavřené). Konflikty a souhrn domu berou místnost jako otevřenou, když je otevřené kterékoli okno. Čtečka řekne názvy otevřených oken, např. „okno Balkon otevřené 12 minut“ nebo „otevřená okna Okno, Balkon, nejdéle 12 minut“, a u zavřených „všechna okna z …“
  - nahrazeno: „| `title` | `Domov` | nadpis; `""` ho vynechá |“
  - nahrazeno: „| `covers.presets` | Den 100/100, Stín 0/100, Tma 0/0 | 1–3 předvolby (`name`, `position`, `tilt`, volitelně `icon`, `description`) |“
  - nahrazeno: „- Kontroly: prahy jsou čísla a jdou vzestupně (min < max, varování < kritické, `heating_waves_2` < `heating_waves_3`, obojí 1–100); `trends`, `history` a `covers` v uvedených mezích; předvolba má `name`, `position` a `tilt` 0–100; `icon` jen `open`, `shade`, `dark`; `covers.script` je entita `script.…`; `link` začíná `/` nebo `http(s)://`; obrázek je jeden z vestavěných názvů, nebo adresa začínající `/`, `http(s)://` nebo `data:image/`; `window` nesmí být prázdný seznam a entity se v místnosti neopakují; `image` a `scene` zároveň nejdou; názvy místností jsou jedinečné. Neznámý klíč místnosti n …“
- `f0c443c` 2026-10-25 · Panel na monitoru, formaty z profilu, chyba u tlacitka, zastarale hodnoty
  - nahrazeno: „- Telefon na výšku: jeden sloupec, karta místnosti je na šířku displeje. Telefon na šířku: dvě karty místností vedle sebe (24. 10.). Přepíná šířka karty Domov, ne displeje: do 619 px jeden sloupec, od 620 px dva (místnost pak má aspoň 304 px, nejméně podporovanou šířku), nikdy víc. Karty jsou stejně široké a řadí se po řádcích zleva doprava a shora dolů, pořadí tedy zůstává Ložnice, Pracovna / Maxík, Mikuláš / Obývák (pátá karta je sama vlevo, stejně velká; roztažení na celou šířku zamítnuto). Bez vodorovného posouvání na žádné šířce. Tři a více sloupců a desktopové rozložení nejsou priorita.“
  - nahrazeno: „- Kolik místa karta dostane, určuje zobrazení nástěnky v Home Assistantu (ověřeno ve zdrojích frontendu k 24. 10. 2026): **Panel** dá jediné kartě celou šířku (na iPhonu 14 Pro na šířku asi 734 px, tedy dva sloupce); **Masonry** dá jediné kartě jeden sloupec široký nejvýš asi 500 px (pod 600 px displeje 600 px), takže dva sloupce místností nevzniknou; **Sections** dá sekci sloupce nejvýš 500 px, kartě v sekci s `column_span: 2` asi 670 px (dva sloupce). Bez změny karty se tedy dva sloupce na šířku dosáhnou zobrazením Panel, sekcí s `column_span: 2`, nebo ve zobrazení Masonry dvěma kartami vedl …“
  - nahrazeno: „- Souhrn domu (TODO P2.2): štítky jen pro to, co je jinak než v klidném domě, v pořadí: konflikty (oranžově, viz Konflikty), otevřená okna („1 okno otevřené“, „2 okna otevřená“, „5 oken otevřených“; počítají se okna, ne místnosti, takže místnost se dvěma otevřenými okny přidá 2; obloha), ruční přepis Topení („Ručně: Pracovna“, u tří a více místností počet; oranžová), místnosti, kde se právě topí – aspoň jedna vlna („Topí 3 místnosti“; oranžová), zapnutá klimatizace („Klimatizace: Ložnice“, u tří a více počet; modrá). Štítek má ikonu (okno, vlny, klimatizace), jména všech místností jsou v `aria …“
  - nahrazeno: „- Všechny karty mají stejné rozložení. Obývák má stejné rozložení bez žaluzií (prázdné místo se akceptuje). Stejně tak místnost, která podle konfigurace nemá čidlo CO₂ nebo PM2.5 (`carbon_dioxide: false`, `pm25: false`, viz Konfigurace): řádek té veličiny zmizí a jeho místo zůstane prázdné, řádky Topení, Klimatizace a okna i panel žaluzie zůstanou na svém místě (24. 10. večer; konzistence má přednost před místem).“
  - nahrazeno: „- Teplota je dominantní; vlhkost vedle ní je sekundární, ve velikosti navazující na „°C“. Formát: „20,4 °C  46 %“, čísla podle jazyka karty (anglicky „20.4 °C  46%“, viz Jazyky).“
  - nahrazeno: „- Předvolba se odešle až **dvojitým klepnutím (do 400 ms) nebo dlouhým stiskem (550 ms)**; jednoduché klepnutí nic neodešle, ale ukáže vlevo od tlačítka (přes panel) na 1,6 s bublinu „Podržte nebo klepněte dvakrát“ s haptikou `selection` (TODO P1.3). Během držení (zpětná vazba pro dlouhý stisk) ikona za 550 ms přejde na šampaňskou a maličko se zmenší; po odeslání ikona jednou „poskočí“ (zvětší se o 22 % a vrátí) a ozve se haptika `success` (až když Home Assistant službu dokončí); při chybě haptika `failure` a hláška. Při „omezit pohyb“ je ikona při držení hned šampaňská, bez poskočení. Haptiku …“
  - nahrazeno: „- Rám popupu je iOS list (TODO P2.11): na mobilu spodní panel s úchytem nahoře, na širokém displeji (od 600 px) dialog uprostřed bez úchytu. Výška podle obsahu, nejvýš 90 % obrazovky. Zavře se tlačítkem ✕, klepnutím mimo, klávesou Escape nebo tažením horní části (úchyt a titulek) dolů o víc než 100 px či rychlým švihem; jinak se vrátí na místo. Pozadí za popupem při tažení světlá.“
  - nahrazeno: „- Graf (výška plochy 150 px, kreslený 1 : 1 v šířce popupu): šedé pozadí, noc 22–6 h ztmavená; bílá křivka teploty se šedou plochou pod ní a tečkou na konci; vytápění jako oranžová výplň pod křivkou teploty se sytostí podle vln (1 / 2 / 3 vlny = 24 / 44 / 68 %); cíl Topení jako schodovitá přerušovaná čára jen v době Plán / Ručně; vlhkost jako modrá přerušovaná čára s vlastním měřítkem (rozsah v legendě). Stupnice teploty vpravo se řídí jen naměřenou teplotou, ne cílem topení: rozsah je minimum až maximum naměřených hodnot za 24 h s 5% rezervou nahoře a dole, takže křivka vyplní celou výšku gra …“
  - nahrazeno: „- Popisky v grafu 11 px, legenda 13 px; legenda ukazuje jen to, co se v období vyskytlo (Teplota, Cíl topení, Vytápění, Vlhkost min–max, Noc, režimy Topení a Klimatizace).“
  - nahrazeno: „- Zastaralá data (TODO P2.3): měření místnosti (teplota, vlhkost, CO₂, PM2.5), které senzor nenahlásil déle než `thresholds.stale_minutes` (výchozí 30 min), se zobrazí šedě (`#8E8E93`), nikdy oranžově ani červeně; ikona CO₂/PM2.5 je šedá, mikrotrend ztlumený na 35 %, nápověda a čtečka řeknou „naposledy před 45 min“. Pro stav místnosti se bere jako chybějící: „Bez dat · CO₂ (před 2 h)“.“
  - nahrazeno: „- Čísla a data podle jazyka karty: česky a švédsky „20,4 °C“ a „46 %“, anglicky „20.4 °C“ a „46%“ (mezeru před % dává Home Assistant podle jazyka stejně); den a měsíc „24. 10.“ / „24/10“ / „10/24“ (britská angličtina „24/10“). Čas je ve všech jazycích 24hodinový („18:00“). Značky jednotek (°C, %, ppm, µg/m³, min, h, d) jsou ve všech jazycích stejné.“
- `e85cd5c` 2026-10-26 · Topeni: teplota a doba trvani u Rucne, Boost 25 C a Vypnuto na dobu
  - nahrazeno: „- Stavy: Plán (Overlay Schedule), Ručně (ruční přepis / boost, zvýrazněný), Vypnuto.“
  - nahrazeno: „- Volby vycházejí z atributů entity `hvac_modes` a `preset_modes`; karta nevolá režim, který entita nenabízí. Volba volá `climate.set_hvac_mode` nebo `climate.set_preset_mode`; popup zůstává otevřený a aktivní volba se podle stavu entity zvýrazní. Chyba služby se ukáže v popupu.“
  - nahrazeno: „- Topení: Vypnuto (`off`), Plán (`auto`), Ručně (`heat`) a Boost (předvolba `boost`). Boost se nabízí jen tehdy, když entita předvolbu `boost` uvádí; jinak je volba vidět zašedlá s textem „entita nenabízí“. Mechanismus Boostu u integrace Topení není potvrzen (viz AUDIT.md).“
- `d14fe50` 2026-10-26 · Topeni: odeslani pri zavreni, posuvniky nahore, ikony v rade, opraveny tah prstem
  - nahrazeno: „- Stavy: Plán (Overlay Schedule), Ručně (ruční přepis, zvýrazněný; také Boost, tj. ruční 25 °C), Vypnuto. Ruční přepis s cílem 5 °C (časovač „Vypnuto na dobu“, viz Ovládání Topení) je Vypnuto: řádek, souhrn i historie ho tak ukazují.“
  - nahrazeno: „- Pod titulkem je segmentový přepínač ve stylu iOS „Topení | Klimatizace“ v pořadí podle House Mode; přepnutím se zobrazí ovládání druhého systému. Má-li místnost nakonfigurovaný jen jeden systém, přepínač se nezobrazí a místo něj je název systému.“
  - nahrazeno: „- Topení: Vypnuto (`off`), Plán (`auto`), Ručně (`heat`) a Boost. Plán se odešle hned (`climate.set_hvac_mode` `auto`, zruší rozdělanou volbu). Ručně, Boost a Vypnuto otevřou pod volbami ovládání **teploty a doby**, které se odešlou 2 s po poslední změně („Odešle se za 2 s“ → „Odesílám…“ → „Odesláno“); zavření popupu nebo přepnutí na Klimatizaci rozdělanou volbu odešle hned, nic se neztratí.“
  - nahrazeno: „- **Volání (Tado CE):** Ručně, Boost a Vypnuto s dobou volají `tado_ce.set_climate_timer` (`temperature`, a buď `time_period` ve tvaru `HH:MM:SS`, nebo `overlay`: `next_time_block` = do další změny plánu, `manual` = dokud neobnovíte plán). Vypnuto „Dokud neobnovíte plán“ je `climate.set_hvac_mode` `off`. Bez akce `tado_ce.set_climate_timer` (podle `hass.services`) je Boost zašedlý („entita nenabízí“), Ručně má jen posuvník teploty (`climate.set_temperature`, bez nastavení doby) a Vypnuto se odešle hned.“
- `f488370` 2026-10-26 · Stitky Rucne a Boost zvlast, stav Topeni podle climate entity
  - nahrazeno: „- Stavy: Plán (Overlay Schedule), Ručně (ruční přepis, zvýrazněný; také Boost, tj. ruční 25 °C), Vypnuto. Při přepisu plánu (Ručně, Boost) je v záhlaví místnosti za názvem malá ikona toho režimu (Ručně posuvníky, Boost blesk); u Plánu a Vypnuto žádná. Ruční přepis s cílem 5 °C (časovač „Vypnuto na dobu“, viz Ovládání Topení) je Vypnuto: řádek, souhrn i historie ho tak ukazují.“
- `15264ef` 2026-10-26 · Historie teploty: modra cara kdy bylo otevrene okno
  - nahrazeno: „- Pod grafem pruhy Topení (Plán bílá, Ručně oranžová, Vypnuto šedá) a Klimatizace (barvy podle režimu), každý s popiskem nad sebou; časová osa s popisky v celých hodinách 00, 06, 12, 18 a jemnými svislými čarami.“
- `b77c1d6` 2026-10-26 · Historie: pruhy bez popisku jako na karte, s ikonami a zeslabenim
  - nahrazeno: „- Pod grafem pruhy Topení (Plán bílá, Ručně oranžová, Vypnuto šedá) a Klimatizace (barvy podle režimu), každý s popiskem nad sebou. Mezi nimi je tenká modrá čára (bez popisku) v době, kdy bylo otevřené kterékoli okno místnosti (sjednocení všech oken z `windows`; místnost bez oken čáru ani místo pro ni nemá); časová osa s popisky v celých hodinách 00, 06, 12, 18 a jemnými svislými čarami.“
  - nahrazeno: „- Popisky v grafu 11 px; legenda se nekreslí (uživatel 25. 10.: „popisky jsou zbytečné“), pruhy Topení a Klimatizace mají vlastní popisek nad sebou a čáry s plochami se vysvětlují samy. Časové popisky osy jsou v 12 / 24 h podle profilu.“
- `acd3028` 2026-10-26 · Jednotna barva Vypnuto Topeni a Klimatizace v historii
  - nahrazeno: „- Pod grafem kompaktní pruhy (devět px vysoké, mezera tři px), **bez popisků**, v pořadí jako na kartě místnosti: primární systém podle House Mode (v zimě Topení, v létě Klimatizace), druhý systém, nakonec okna. Každý pruh začíná ikonou jako na kartě (vlny Topení, klimatizace, okno), kolem níž barva popupu plynule slábne do ztracena, aby byla ikona vidět. Topení: Plán bílá, Ručně oranžová, Vypnuto šedá; Klimatizace barvy podle režimu; okna modrá v době, kdy bylo otevřené kterékoli okno místnosti (řádek má jen místnost s nakonfigurovanými okny). Časová osa s popisky v celých hodinách 00, 06, 12 …“
  - nahrazeno: „| Topení Vypnuto v grafu | `#6B6B70` | `#C7C7CC` |“
- `5cfa6da` 2026-10-26 · PM2.5 je cerstve, dokud hlasi CO2 z ciditka ALPSTUGA
  - nahrazeno: „- Zastaralá data (TODO P2.3): měření místnosti (teplota, vlhkost, CO₂, PM2.5), které senzor nenahlásil déle než `thresholds.stale_minutes` (výchozí 30 min), se zobrazí šedě (`#8E8E93`), nikdy oranžově ani červeně; ikona CO₂/PM2.5 je šedá, mikrotrend ztlumený na 35 %, nápověda a čtečka řeknou „naposledy před 45 min“. Za zastaralou hodnotou stojí malý šedý symbol hodin (25. 10.; u teploty, vlhkosti, CO₂ i PM2.5, skrytý před čtečkou, která čte „naposledy před …“). Pro stav místnosti se bere jako chybějící: „Bez dat · CO₂ (před 2 h)“. PM2.5 přesně 0 µg/m³ je čistý vzduch, ne chybějící údaj: nikdy  …“
- `21ffdfe` 2026-10-27 · Popup Topení / Klimatizace podle nového návrhu a hromadné nastavení ze štítků souhrnu
  - nahrazeno: „- Úplně dole v popupu je segmentový přepínač ve stylu iOS „Topení | Klimatizace“ v pořadí podle House Mode; přepnutím se zobrazí ovládání druhého systému. Má-li místnost nakonfigurovaný jen jeden systém, přepínač se nezobrazí a místo něj je název systému.“
  - nahrazeno: „- Popup je iOS list (viz Detail místnosti). Dole je odkaz „Detail a historie“, který popup zavře a otevře standardní detail `climate` entity zvoleného systému.“
  - nahrazeno: „- Volby vycházejí z atributů entity `hvac_modes` a `preset_modes`; karta nevolá režim, který entita nenabízí. Volba u Klimatizace volá `climate.set_hvac_mode` nebo `climate.set_preset_mode` (Topení viz níže); popup zůstává otevřený a aktivní volba se podle stavu entity zvýrazní. Chyba služby se ukáže v popupu.“
  - nahrazeno: „- Topení: Vypnuto (`off`), Plán (`auto`), Ručně (`heat`) a Boost. Volba se **neodesílá hned**: použije se, až se popup zavře (křížek, tažení dolů, Esc, klepnutí vedle, přepnutí na Klimatizaci nebo „Detail a historie“). Zvolení režimu, který entita už má, změnu zahodí; beze změny se nic neodešle. Pod volbami je řádek „Použije se po zavření okna“ (jeho výška je vyhrazená, volby se nehýbou).“
  - nahrazeno: „- **Rozložení:** nahoře posuvníky aktivního (nebo právě zvoleného) režimu, pod nimi čtyři volby jako ikony s popiskem v jedné řadě (Vypnuto, Plán, Ručně, Boost), dole odkaz „Detail a historie“ a úplně dole přepínač Topení | Klimatizace. Popup roste nahoru, takže volby a přepínač zůstávají na místě. Posuvníky se ukážou už při otevření, je-li aktivní Ručně, Boost nebo Vypnuto (s hodnotami z entity).“
  - nahrazeno: „- **Teplota:** u Ručně posuvník (rozsah `min_temp`–`max_temp` entity, krok `target_temp_step`, bez 5 °C, protože 5 °C je Vypnuto; výchozí je dosavadní cíl, jinak 21 °C). Boost je pevných 25 °C bez posuvníku. Vypnuto s dobou je 5 °C (ochrana proti zamrznutí).“
  - nahrazeno: „- **Doba („Jak dlouho“, posuvník jako u teplé vody v aplikaci Tado):** 15, 30, 45, 60, 90, 120, 180, 240, 360, 480 min, „Do další změny plánu“ a „Dokud neobnovíte plán“. U dob v minutách je pod hodnotou „do HH:MM“. Výchozí: Boost 30 min, Ručně „Do další změny plánu“, Vypnuto „Dokud neobnovíte plán“.“
  - nahrazeno: „- **Volání (Tado CE):** Při zavření popupu se pro Ručně, Boost a Vypnuto s dobou volá `tado_ce.set_climate_timer` (`temperature`, a buď `time_period` ve tvaru `HH:MM:SS`, nebo `overlay`: `next_time_block` = do další změny plánu, `manual` = dokud neobnovíte plán). Plán je `climate.set_hvac_mode` `auto`, Vypnuto „Dokud neobnovíte plán“ je `climate.set_hvac_mode` `off`. Bez akce `tado_ce.set_climate_timer` (podle `hass.services`) je Boost zašedlý („entita nenabízí“), Ručně má jen posuvník teploty (`climate.set_temperature`, bez nastavení doby) a Vypnuto je bez doby (`climate.set_hvac_mode` `off`) …“
  - nahrazeno: „- Klimatizace: režimy Vypnuto, Chlazení, Sušení, Větrání, Auto, Topení (podle `hvac_modes`) a předvolby podle `preset_modes` (Sleep, Boost, WindFree, WindFree Sleep; „none“ se nenabízí). Zvolit režim zároveň klimatizaci zapne. Opětovné zvolení aktivní předvolby ji zruší, pokud entita nabízí předvolbu `none`.“
- `8749cb7` 2026-10-28 · Popup: oblouk a kolečko na kruhu se kreslí (SVG jmenný prostor), posuvník časovače s tabletovým palcem
- `30e0ae5` 2026-10-28 · Popup: kruh v plánu oranžový, Plán neukáže 5 °C z Vypnuto, slider s úzkým lozenge palcem podle HIG
- `c098521` 2026-10-28 · Klima na ha-dashboard-kit: jazyky, entity, konfigurace, gesto predvoleb a testy ze spolecneho repa
  - nahrazeno: „- Karta mluví česky, švédsky a anglicky (uživatel 25. 10.: „K dispozici bude angličtina, švédština a čeština. Podle jazyka Home Assistantu. Pokud nebude CZ/SE, tak bude EN.“). Jazyk karty je jazyk Home Assistantu z profilu uživatele (`hass.locale.language`, jinak `hass.language`): čeština → česky, švédština → švédsky, jakýkoli jiný jazyk i žádný → anglicky. Změna jazyka v profilu se projeví hned, bez obnovení stránky. Klíč `language` (`cs`, `sv`, `en`; výchozí `auto`) jazyk karty vynutí. Hostitelský prvek karty má atribut `lang` jazyka karty, aby čtečka obrazovky četla správným hlasem i tehdy, …“
- `165fbbf` 2026-10-28 · Konsolidace: testy 82 -> 28, TODO C1-C15, zadani a README bez duplicit
  - nahrazeno: „Co není v Memory rozhodnuto, je uvedeno v sekci „Chybějící data“ a v `AUDIT.md`; nic z toho se nedomýšlí.“
  - nahrazeno: „- Popupy (Topení / Klimatizace, Historie místnosti) jsou na šířku telefonu vycentrované a nejvýš 90 % výšky displeje; co se nevejde (historie na výšce 393 px), se posouvá uvnitř popupu.“
  - nahrazeno: „- Obsah shora: titulek „Domov“ → hlavička s venkovními podmínkami → souhrn domu (štítky, jen pokud nějaké jsou) → upozornění (jen pokud nějaká jsou) → karty místností. Pod kartami nic.“
  - nahrazeno: „- Pořadí karet: Ložnice, Pracovna, Maxík, Mikuláš, Obývák.“
  - nahrazeno: „- Souhrn domu (TODO P2.2): štítky jen pro to, co je jinak než v klidném domě, v pořadí: konflikty (oranžově, viz Konflikty), otevřená okna („1 okno otevřené“, „2 okna otevřená“, „5 oken otevřených“; počítají se okna, ne místnosti, takže místnost se dvěma otevřenými okny přidá 2; obloha), ruční přepis Topení („Ručně: Pracovna“, u tří a více místností počet; oranžová), místnosti, kde se právě topí – aspoň jedna vlna („Topí 3 místnosti“; oranžová; ikona ukazuje nejsilnější topení ze všech místností, tedy při jedné místnosti s 1 vlnou a druhé s 2 vlnami dvě vlny a „Topí 2 místnosti“, uživatel 25.  …“
  - nahrazeno: „- Hodnota, která rozhodla o stavu místnosti, má barvu stavu (TODO P2.15): vlhkost při Vlhko / Sucho a teplota při Teplo (oranžová `#FF9F0A`) a Chladno (modrá `#64D2FF`); ostatní hodnoty zůstanou neutrální (světle šedá `#C7C7CC`, teplota bílá). U CO₂ a PM2.5 se barví číslo (viz Stavový systém). Stav Příjemné a Bez dat nic nebarví; chybí-li hodnota, je „––“ šedé.“
  - nahrazeno: „- Mikrotrendy (viz Historie a grafy) jsou na kartě právě tři: CO₂ a PM2.5 ve svém řádku a mikrotrend teploty vedle řádků Topení a Klimatizace, vysoký jako oba řádky dohromady (teplota je výsledkem vytápění a chlazení). Vedle řádku okna mikrotrend není. Mikrotrend CO₂ a PM2.5 navazuje přímo na hodnotu: začíná 78 px od levého okraje informačních řádků, tedy pod koncem i nejkratší hodnoty („2 µg/m³“ končí asi 84 px od okraje; začátek byl 70 px, 24. 10. odpoledne o 8 px dál), takže čára vyrůstá z čísla a jednotky a oko ji nemusí hledat (TODO P1.10.1); delší hodnota („1640 ppm“, asi 98 px) leží nad …“
  - nahrazeno: „- Mikrotrendy se doleva plynule ztrácejí (vlevo průhledné, plně viditelné od 80 % své šířky), takže začátek čáry splývá s hodnotou. Text řádků Topení a Klimatizace smí přesáhnout do sloupce trendů, nejvýš do 40 % jeho šířky, a leží nad trendem; na iPhonu 14 Pro je tak celé „WindFree · 22 °C“ i „Ručně · 22,5 °C“ (TODO P1.1).“
  - nahrazeno: „- Detail hodnot: klepnutí na teplotu nebo její mikrotrend otevře popup „Historie místnosti – 24 h“ (viz Historie a grafy). Klepnutí na vlhkost a okno otevře standardní detail entity Home Assistantu (`more-info`) s grafem historie. CO₂ a PM2.5 (hodnoty i mikrotrendy) jsou jeden dotykový cíl: má-li místnost obě čidla, otevře popup „Kvalita vzduchu“ se dvěma řádky (CO₂ a PM2.5 s hodnotou, každý otevře standardní detail entity a popup zavře); má-li jen jedno, otevře rovnou jeho detail; bez čidla je neaktivní. Řádek okna: s jedním oknem otevře detail jeho entity, se dvěma a více okny popup „Okna“ ( …“
  - nahrazeno: „- Dotykové cíle (TODO P1.2): každý klikací prvek karty má účinnou dotykovou plochu aspoň 44 × 44 px; ukazuje se hit-testem, proto se počítá i neviditelné rozšíření (vzhled se nemění). Okno: řádek 32 px a neviditelná plocha pod ním (dolů do okraje karty); vlhkost a předvolby: neviditelné rozšíření; CO₂ + PM2.5 jeden cíl 52 px; Topení + Klimatizace jeden cíl 52 px. Přístupný název tlačítek CO₂ + PM2.5, Topení + Klimatizace a okna je přesně jejich viditelný text (WCAG 2.5.3), místnost, názvy veličin a akce jsou v popisu (`aria-describedby`).“
  - nahrazeno: „- Řádky Topení a Klimatizace tvoří jeden dotykový cíl přes oba řádky (52 px); otevře popup s ovládáním (viz Ovládání Topení a Klimatizace). Řádek okna otevře detail entity. Řádky Topení a Klimatizace mají vždy ikonu: Topení 0–3 vlny, Klimatizace ikonu režimu. Ikona je vidět i při „Vypnuto“ (šedá) a při chybějících datech (přerušovaná, „––“).“
  - nahrazeno: „- Barva stavu (oranžová, červená, u Chladno modrá) se přenáší na hodnotu, která stav určila (viz Room Card): u Vlhko / Sucho vlhkost, u Teplo / Chladno teplota; u CO₂ a PM2.5 už je barevné samo číslo. Hodnota, která stav neurčila, zůstává neutrální.“
  - nahrazeno: „- Klepnutí kamkoli na řádky Topení a Klimatizace otevře popup s titulkem místnosti, vždy na **primárním systému** podle House Mode (Zima Topení, Léto Klimatizace); není-li primární systém nakonfigurován, otevře se druhý (TODO P1.2).“
  - nahrazeno: „- Při pohybu žaluzie (stav `opening` / `closing`) horní kolejnice panelu jemně pulzuje; při „omezit pohyb“ ne (TODO P2.6).“
  - nahrazeno: „- Předvolba se odešle až **dvojitým klepnutím (do 400 ms) nebo dlouhým stiskem (550 ms)**; jednoduché klepnutí nic neodešle, ale ukáže vlevo od tlačítka (přes panel) na 1,6 s bublinu „Podržte nebo klepněte dvakrát“ s haptikou `selection` (TODO P1.3). Během držení (zpětná vazba pro dlouhý stisk) ikona za 550 ms přejde na šampaňskou a maličko se zmenší; po odeslání ikona jednou „poskočí“ (zvětší se o 22 % a vrátí) a ozve se haptika `success` (až když Home Assistant službu dokončí); při chybě haptika `failure` a chyba přímo u tlačítka (25. 10.): tlačítko se červeně orámuje a krátce zatřese (při „ …“
  - nahrazeno: „- Konflikt je kombinace, kterou je dobré vidět na první pohled; není to stav místnosti ani alarm (TODO P2.14). Tři druhy: **okno otevřené a topí se** (Topení má aspoň jednu vlnu, nebo klimatizace topí), **okno otevřené a chladí se** (klimatizace `cool` nebo WindFree) a **chladí se, i když je chladno** (klimatizace chladí a stav místnosti je Chladno). Otevřené okno s chlazením se hlásí jednou, ne i jako „chladí se, i když je chladno“. Neznámé stavy konflikt nevytvoří. Předpověď otevřeného okna z Topení se dál ignoruje.“
  - nahrazeno: „- Rám popupu je iOS list (TODO P2.11): na mobilu spodní panel s úchytem nahoře, na širokém displeji (od 600 px) dialog uprostřed bez úchytu. Výška podle obsahu, nejvýš 90 % obrazovky. Zavře se tlačítkem ✕, klepnutím mimo, klávesou Escape nebo tažením horní části (úchyt a titulek) dolů o víc než 100 px či rychlým švihem; jinak se vrátí na místo. Pozadí za popupem při tažení světlá. Stránka pod otevřeným popupem se nepohne (25. 10.): posouvání popupu na jeho konec ani tah mimo něj stránku neposune (`overscroll-behavior: contain`, na pozadí `touch-action: none` a zrušení tahu, který popup nemůže  …“
  - nahrazeno: „- „Historie místnosti – 24 h“ (podle denního přehledu iOS aplikace pro ovládání topení; otevírá ji teplota a její mikrotrend; TODO P2.7–P2.9). Délka období je v konfiguraci (`history.hours`, výchozí 24 h; titulek pak zní „Historie místnosti – 12 h“), stejně jako noc (`history.night_start` 22 a `history.night_end` 6 h) a nejmenší rozsah osy teploty (`history.min_temperature_span`, výchozí 1,5 °C):“
  - nahrazeno: „- Do prvního načtení historie je místo mikrotrendu jemná tečkovaná linka, která pomalu pulzuje (při „omezit pohyb“ stojí); bez historie se mikrotrend nezobrazí (TODO P2.4).“
  - nahrazeno: „- Čtečka obrazovky u CO₂, PM2.5 a trendu teploty řekne „za 2 hodiny stoupá / klesá / stabilní“ (období podle `trends.minutes`); práh je polovina kroku osy (0,5 °C, 50 ppm, 2,5 µg/m³) mezi prvním a posledním vzorkem (TODO P2.5).“
  - nahrazeno: „- Pouze testovací paleta (není finální; ověřit kontrast, čitelnost venku a vzhled na OLED): spuštěná žaluzie šampaňská `#E8D9B5` při 50 % (kolejnice 70 %), okno za žaluzií a otevřené okno obloha `#64D2FF`, vedlejší texty `#9A9AA0`, Klimatizace OFF `#8E8E93`, zavřené žaluzie `#6B6B70`, ikona CO₂ a její mikrotrend šalvějová zelená `#8FBF9F`, ikona PM2.5 a její mikrotrend levandulová `#A59DCF`, mikrotrend teploty broskev `#FFB36B`. Vlhkost je neutrální (`#C7C7CC`), dokud nerozhodne o stavu místnosti; ikony CO₂/PM2.5 bez dat jsou šedé `#8E8E93`.“
  - nahrazeno: „- Ikony předvoleb žaluzií jsou tmavě šedé `#6F6F74`; ikona odpovídající stavu žaluzie je tlumená šampaňská `#C9C0A8`, bez podbarvení. Nedostupná žaluzie: šedá `#6F6F74` při 55 % neprůhlednosti.“
  - nahrazeno: „- Oranžová = varování (CO₂ 1000+, PM2.5 15+), červená = kritické (CO₂ 1500+, PM2.5 35+). V popupu Kvalita vzduchu je červená světlejší `#FF6961`, aby na světlejším podkladu voleb měla kontrast aspoň 4,5 : 1.“
  - nahrazeno: „- Zastaralá data (TODO P2.3): měření místnosti (teplota, vlhkost, CO₂, PM2.5), které senzor nenahlásil déle než `thresholds.stale_minutes` (výchozí 30 min), se zobrazí šedě (`#8E8E93`), nikdy oranžově ani červeně; ikona CO₂/PM2.5 je šedá, mikrotrend ztlumený na 35 %, nápověda a čtečka řeknou „naposledy před 45 min“. Za zastaralou hodnotou stojí malý šedý symbol hodin (25. 10.; u teploty, vlhkosti, CO₂ i PM2.5, skrytý před čtečkou, která čte „naposledy před …“). Pro stav místnosti se bere jako chybějící: „Bez dat · CO₂ (před 2 h)“. PM2.5 přesně 0 µg/m³ je čistý vzduch, ne chybějící údaj: nikdy  …“
  - nahrazeno: „Uživatel 28. 10.: „Budu potřebovat aby ty 2 dashboardy byly udělané stejně. Jako vzor vem klima Dashboard“; „Společný kód redaktoruj a extrahuj do toho nového repa“; „aby příště se vědělo kam společně prvky zakládat a používat a hledat“.“
  - nahrazeno: „- Společné s kartou Energie je v repozitáři `michal-madle/ha-dashboard-kit` (závislost v `package.json`, konkrétní commit; `README.md` a `CURRENT_SPEC.md` kitu jsou návod, kam co patří). Z kitu tato karta používá: jazyk karty a formáty čísel, času a data (`ha-dashboard-kit/i18n`), čtení entit (`entities`), pravidla konfigurace a chyby s názvem klíče (`config`), gesto podržení nebo dvojklep předvoleb žaluzií (`gesture`), nastavení TypeScriptu, Vite, kopii sestavení pro HACS a testovací infrastrukturu (server, konfiguraci Playwrightu, pokrytí kódu, axe). Ovládací prvky kitu (`controls`: přepínač …“
  - nahrazeno: „- **Pravidlo:** co je (nebo bude) stejné v obou kartách a nezávisí na místnostech, entitách, textech ani vzhledu této karty, se zakládá v kitu, ne tady. Zde zůstává: místnosti, žaluzie, topení a klimatizace, historie a grafy, slovníky (`src/translations/`), barvy a styly, hlavní komponenta. Třetí kopie kódu, který už je v Energii, se nepíše: přesune se do kitu a obě karty ho použijí.“
  - nahrazeno: „- Kit se v této kartě neupravuje (ani v `node_modules`). Chyba nebo nová vlastnost se řeší v kitu (změna, test, spec, commit) a pak se commit v `package.json` zvedne i zde a v Energii. Zpětně nekompatibilní změna kitu přepíše obě karty v témže kole.“
  - nahrazeno: „- Dvě technická pravidla z toho plynou: testy v prohlížeči (Playwright) nesmí importovat zdroje karty, které používají kit (Playwright nepřekládá `node_modules`); testy proto čtou jen slovníky v `src/translations/`. Soubory kitu se překládají podle nastavení v `build/vite.mjs` kitu, ne podle `tsconfig.json` karty.“
  - nahrazeno: „- Společná pravidla jazyků (jazyk z profilu Home Assistantu, formáty, pravidlo „každá změna textu upraví všechny tři jazyky“) jsou i v `CURRENT_SPEC.md` kitu, oddíl Jazyky; kód jazyka a formátů je v kitu a karta Energie ho používá stejně. Karta mluví česky, švédsky a anglicky (uživatel 25. 10.: „K dispozici bude angličtina, švédština a čeština. Podle jazyka Home Assistantu. Pokud nebude CZ/SE, tak bude EN.“). Jazyk karty je jazyk Home Assistantu z profilu uživatele (`hass.locale.language`, jinak `hass.language`): čeština → česky, švédština → švédsky, jakýkoli jiný jazyk i žádný → anglicky. Změ …“
  - nahrazeno: „- Přeloženo je všechno, co karta sama píše nebo říká čtečce obrazovky: stavy, popisky řádků, souhrn domu, venkovní podmínky, popupy, graf historie, nápovědy, hlášky a popisy pro čtečku. Nepřekládají se texty z konfigurace (nadpis, názvy místností, oken a předvoleb, popisy předvoleb) a názvy předvoleb klimatizace (Sleep, WindFree …). Bez textu v konfiguraci platí výchozí v jazyce karty: nadpis Domov / Hem / Home, okno Okno 1 / Fönster 1 / Window 1, předvolby podle ikony Den / Dag / Day, Stín / Skugga / Shade, Tma / Mörker / Dark.“
  - nahrazeno: „- Čísla, čas a data podle profilu Home Assistantu (25. 10.; `hass.locale`, stejně jako vlastní karty): formát čísel `language` (výchozí, podle jazyka), `system` (jazyk prohlížeče), pevné `comma_decimal`, `decimal_comma`, `space_comma`, `quote_decimal` a `none`; čas `language`, `system`, `12`, `24`; datum `language`, `system`, `DMY`, `MDY`, `YMD`. Bez profilu platí jazyk karty: česky a švédsky „20,4 °C“ a „46 %“, anglicky „20.4 °C“ a „46%“ (mezeru před % určuje jazyk, jak ji píše Home Assistant); CO₂ a PM2.5 se oddělovačem tisíců („1 640“, anglicky „1,640“). Den a měsíc „24. 10.“ / „24/10“ / „1 …“
  - nahrazeno: „- Každá změna, která přidá nebo upraví text karty, upraví v téže změně všechny tři jazyky (uživatel 25. 10.: „při dalších změnách se musí aktualizovat i všechny různé překlady“). Zdrojem je čeština (`src/translations/cs.ts`); švédština a angličtina mají přesně stejné klíče, jinak se karta nesestaví. Testy hlídají, že ve švédštině ani v angličtině nezůstal žádný český text a že se delší texty vejdou na všech šířkách.“
  - nahrazeno: „Vše nastavitelné je v YAML konfiguraci karty (24. 10. večer: „všechny proměnné do konfigurace“). Každý klíč je volitelný a bez něj platí výchozí hodnota, takže dosavadní konfigurace funguje beze změny. Klíč bez hodnoty (v YAML např. `link:`, tedy null) znamená totéž co chybějící klíč. Příklad `examples/domov_prototyp_loznice.yaml` obsahuje úplně všechna nastavení (24. 10. večer, uživatel: „Musí tam být kompletně všechny nastavení“): nahoře společnou část pro celý dům s výchozími hodnotami, pod ní místnosti, každou se všemi klíči (neznámá ID a nastavení, která se nemají lišit od společných, jso …“
  - nahrazeno: „- Kontroly: prahy jsou čísla a jdou vzestupně (min < max, varování < kritické, `heating_waves_2` < `heating_waves_3`, obojí 1–100); `trends`, `history` a `covers` v uvedených mezích; `language` jen `auto`, `cs`, `sv`, `en`; předvolba má `position` a `tilt` 0–100; `icon` jen `open`, `shade`, `dark`; `covers.script` je entita `script.…`; `link` začíná `/` nebo `http(s)://`; obrázek je jeden z vestavěných názvů, nebo adresa začínající `/`, `http(s)://` nebo `data:image/`; `window` nesmí být prázdný seznam a entity se v místnosti neopakují; `image` a `scene` zároveň nejdou; názvy místností jsou je …“
- `96a7960` 2026-10-29 · Kit zvednut na commit s two()
- `adcb050` 2026-10-29 · Historie: nuly z cidla po zapnuti se ignoruji
  - nahrazeno: „- Graf (výška plochy 150 px, kreslený 1 : 1 v šířce popupu): šedé pozadí, noc 22–6 h ztmavená; bílá křivka teploty se šedou plochou pod ní a tečkou na konci; vytápění jako oranžová výplň pod křivkou teploty se sytostí podle vln (1 / 2 / 3 vlny = 24 / 44 / 68 %); cíl Topení jako schodovitá přerušovaná čára jen v době Plán / Ručně; vlhkost jako modrá přerušovaná čára s vlastním měřítkem (hodnotu ukáže údaj nad grafem při prohlížení). Stupnice teploty vpravo se řídí jen naměřenou teplotou, ne cílem topení: rozsah je minimum až maximum naměřených hodnot za 24 h s 5% rezervou nahoře a dole, takže k …“
- `bbf1b62` 2026-10-29 · Vraceno package-lock.json (npm install prepsal odkaz kitu na ssh)
- `1bfe22c` 2026-10-29 · Napady KL1-KL33, AI_MCP, FORECAST, TYDEN a export hodinovych dat
- `78efe1c` 2026-11-01 · Agents and entities
- `fe73872` 2026-11-02 · Update ENTITY_MAP from klima.json, add ventilation concept
- `86769ac` 2026-11-02 · New agents
- `bcc9a6c` 2026-11-02 · Rework agents: shared rules, constraints, data validation
- `b6fd5df` 2026-11-02 · Move agents and UX system to ha-dashboard-kit, drop old ideas and forecast
- `507d549` 2026-11-02 · Link CURRENT_SPEC to the common visual language in the kit

## Příloha: dřívější soubory (původní znění k 2. 11. 2026; nepotvrzené body jsou **nepotvrzeno, otázka položena 2. 11. 2026**)

### Dřívější `TODO.md` (C1–C15)

#### TODO – Klima Dashboard

Jen to, co čeká na vaši odpověď nebo na ověření na zařízení (iPhone 14 Pro, Apple Human Interface Guidelines). **Nejsou součástí zadání**: platí `CURRENT_SPEC.md`. Kde se v kitu dá sdílet kód, je to v `TODO.md` kitu (K1–K3).

Pravidla:
- Čísla C1–C15 jsou trvalá (odkazuje se na ně ze `CURRENT_SPEC.md`). Vyřízený bod se odsud smaže (platné chování je ve specifikaci, nahrazené v `DESIGN_HISTORY.md`) a jeho číslo se nepoužije znovu; nový bod dostane další volné číslo.
- Do TODO patří jen jasná otázka nebo jasný úkol. Co jste potvrdil, je ve specifikaci; nápady bez vaší žádosti se nevedou.
- Druh: **Ověření** (na skutečném zařízení), **Rozhodnutí** (čeká na vás), **Návrh** (zlepšení, které jste chtěl nebo odsouhlasil směr).

Konsolidace 29. 10.: C11 (tlačítko historie v popupu) a C12 (zavírací animace) byly nápady, ne rozpracované body; čísla C11 a C12 se nepoužijí znovu. `IDEAS.md` byl 2. 11. 2026 smazán, obsah zůstává v historii gitu.

Konsolidace 28. 10.: čísla přepsána od C1. Smazány nepotvrzené vlastní nápady bez vaší žádosti (ilustrace při odchylce, osa trendů odolná proti jedné chybné hodnotě, méně REST dotazů pro zastaralá data), popisné body bez otázky (klíče, konstanty, rozhodnutí o překlepu klíče) a statistiky testů (jsou v README).

##### Přehled

| Č. | Druh | Bod |
|---|---|---|
| [C1](#c1) | Ověření | Kontrolní seznam na iPhonu v aplikaci Home Assistant |
| [C2](#c2) | Ověření | Stín: tolerance ±5 % na skutečné žaluzii |
| [C3](#c3) | Ověření | Barvy, osy a kontrast na displeji |
| [C4](#c4) | Rozhodnutí | Popup Topení / Klimatizace: co jsem rozhodl sám |
| [C5](#c5) | Rozhodnutí | Překlady do švédštiny a angličtiny |
| [C6](#c6) | Rozhodnutí | Hranice venkovního vzduchu |
| [C7](#c7) | Rozhodnutí | Neměnné PM2.5 nad nulou jako zastaralé |
| [C8](#c8) | Rozhodnutí | Hromadné akce pro celý dům |
| [C9](#c9) | Rozhodnutí | Pátá místnost sama v druhém řádku při čtyřech sloupcích |
| [C10](#c10) | Rozhodnutí | Písmo: SF Pro a větší písmo |
| [C13](#c13) | Chyba | „WindFree Sleep“: cíl se nevejde ani na velkém iPhonu |
| [C14](#c14) | Rozhodnutí | Upozornění na Domov: co to je |
| [C15](#c15) | Rozhodnutí | Soubory jiného projektu v repozitáři |

##### C1 Kontrolní seznam na iPhonu v aplikaci Home Assistant · Ověření

Všechno dosud ověřeno jen v Chromiu s náhradními daty a náhradní ikonou CO₂. Na iPhonu 14 Pro v aplikaci Home Assistant ověřit (výsledek zapsat sem):
1. Tažení popupu dolů nekoliduje s gesty aplikace (tažení od kraje zpět, obnovení stránky tažením). Táhne se za úchyt nahoře nebo za titulek popupu, ne za obsah; obsah se posouvá sám.
2. Prohlížení historie prstem: vodorovný tah posouvá čas, svislý posouvá popup. Stránka pod popupem se nesmí hýbat ani na konci obsahu (v Chromiu to hlídá test se skutečným dotykem).
3. Telefon na šířku: popup Historie místnosti je přes celou šířku displeje (nejvýš 960 px) a posouvá se o asi 75 px uvnitř (obsah 450 px, displej 393 px). Pohodlné, nebo zkrátit graf?
4. Odkaz z názvu místnosti (`link`) otevře v aplikaci zadanou stránku a tlačítko zpět vrátí na nástěnku; vlastní obrázek (`image: /local/…`) se načte a nepřekáží textu. („Link“ jsem pochopil jako odkaz z názvu místnosti; odkaz na obrázek by byl jiná věc.)
5. Chyba předvolby je u tlačítka (červený okraj, zatřesení, „Nepodařilo se odeslat“ 5 s); malé hodiny za zastaralou hodnotou jsou čitelné a nepřekrývají ilustraci; čísla a čas odpovídají profilu (Profil → Obecné); zkrácená Obývák není vedle vyšší karty podivně prázdná.
6. Popup Topení na skutečném Tadu: Ručně 22 °C do další změny plánu, Boost (25 °C, 30 min; v Tadu se objeví jako ruční přepis s časovačem), Vypnuto na 1 h (v Tadu ruční přepis 5 °C, karta ho ukáže jako Vypnuto) a Vypnuto napořád. Zkontrolovat, že `tado_ce.set_climate_timer` přijme `overlay` (`next_time_block`, `manual`) i `time_period`; že posuvníky jdou prstem bez posunu popupu; že po Vypnuto → Plán a Ručně → Plán karta hned ukáže Plán; horní štítky Ručně a Boost zvlášť.
7. Výška popupu Topení: při 852 px vysokém displeji kolem 680 px; v aplikaci Home Assistant je viditelná plocha menší, popup se pak posouvá uvnitř. Přijatelné?

##### C2 Stín: tolerance ±5 % na skutečné žaluzii · Ověření

Podle vašeho měření žaluzie při otevření lamel vyjede o 3–4 % nahoru, takže Stín je ve skutečnosti 4 / 100 (před otevřením lamel 0 / 0). Poloha i naklopení předvolby se proto porovnávají s tolerancí ±5 % (platí i pro Den a Tmu; `open` a `closed` beze změny). Test hlídá 4 / 100 a 5 / 95 jako shodu, 6 / 100 jako neshodu.
Ověřit: na iPhonu po nastavení Stínu se prostřední ikona rozsvítí a pulzování předvolby skončí. Tma a Stín se liší jen naklopením (0 / 0 a 0 / 100), takže se nepletou; Den (100 / 100) a Stín také ne.

##### C3 Barvy, osy a kontrast na displeji · Ověření

Barvy a osy jsem volil já; ověřit na displeji, venku na slunci a v noci na OLED, pak paletu zapsat jako finální (`CURRENT_SPEC.md`, Barvy):
1. CO₂ šalvějová zelená a PM2.5 levandulová (po vašem „méně agresivní“; sytost do 40 %, kontrast aspoň 6 : 1). Nečte se zelená u CO₂ jako „v pořádku“, když je číslo oranžové?
2. Světlá paleta (bílé karty, tmavší odstíny stejných významů); hlavně spuštěná žaluzie a svítící předvolba.
3. Osa teploty v historii: rozsah z naměřené teploty, nejméně 1,5 °C, popisky po 0,5 °C. Nepůsobí plochý graf (změna do 0,3 °C) prázdně? Kroky os mikrotrendů CO₂ 100 ppm a PM2.5 5 µg/m³ (teplotu 1 °C určil uživatel).
4. Šedé texty (`#9A9AA0` 6,1 : 1, `#8E8E93` 5,2 : 1) kontrast splňují; plochy pod mikrotrendy (8 %), okno za žaluzií (28 %) a začátky blednoucích trendů na slunci zmizí.
5. Spuštěná žaluzie je šampaňská na 50 % (kolejnice 70 %). V noci na OLED může stačit 40 %, na slunci 60 %.

##### C4 Popup Topení / Klimatizace: co jsem rozhodl sám · Rozhodnutí

Popup byl přepracován podle návrhu (27. 10.). K potvrzení:
1. **Plán × Auto**: v návrhu se režim jmenoval Auto, na kartě zůstává „Plán“ (jmenuje se tak řádek Topení i štítky). Přejmenovat všude?
2. **Vypnutí po časovači** (Topení „Po skončení: Vypnuto“ a časovač Klimatizace) řeší skript přes WebSocket `execute_script` s `delay`. Potřebuje administrátora, po restartu Home Assistantu se ztratí a dřívější naplánovaný skript se změnou stavu nezruší (jen ho podmínka na stav přeskočí). Stačí to?
3. **Rychlé turbo a Tichý** z návrhu nejsou: entita má jednu předvolbu (`preset_mode`), proto zůstala tlačítka předvoleb (Sleep, Boost, WindFree Sleep …). Přepínače by znamenaly vymyslet mapování na předvolby Samsungu.
4. Čas dalšího bloku plánu („Plán do 22:00, potom 17°“ z návrhu) karta nezná, u levého konce osy je jen „Plán“.
5. Popisky „Režim“ a „Časovač“ jsou skryté kvůli výšce popupu.

##### C5 Překlady do švédštiny a angličtiny · Rozhodnutí

Znění jsem zvolil já, pojmy jsou v `CURRENT_SPEC.md`, Jazyky. K posouzení hlavně: Chladno = Kyligt / Chilly (ne Kallt / Cold, jde o mírně pod komfortním pásmem); Klimatizace = Luftkonditionering / Air conditioning (ve švédštině dlouhé slovo, vejde se i na 320 px, alternativa „AC“); Vydýchaný vzduch = Instängd luft / Stuffy air; předvolby Dag / Skugga / Mörker a Day / Shade / Dark; „Senaste rapport för 3 h sedan“ u zastaralé hodnoty. Předvolby v příkladu mají prázdné `name` a `description`, aby se jmenovaly v jazyce karty.

##### C6 Hranice venkovního vzduchu · Rozhodnutí

Návrh 23. 10., stejné hranice jako pro PM2.5 v místnosti: dobrý < 15 µg/m³, zhoršený 15–34, špatný ≥ 35 (15 µg/m³ je 24hodinové doporučení WHO z roku 2021). Potvrdit, nebo dát jiné hranice (`thresholds.pm25_warning`, `pm25_critical` platí i pro venkovní vzduch).

##### C7 Neměnné PM2.5 nad nulou jako zastaralé · Rozhodnutí

PM2.5 přesně 0 µg/m³ je čistý vzduch a nikdy se neoznačí jako zastaralé (vy 25. 10.). Senzor, který nehlásí déle než `thresholds.stale_minutes`, ale ukazuje nenulovou hodnotu (např. 3 µg/m³), se jako zastaralý dál označí. Kdyby to vadilo, lze zastaralost u PM2.5 nepočítat vůbec.

##### C8 Hromadné akce pro celý dům · Rozhodnutí

Chcete nahoře nad místnostmi hromadné akce: všude vypnout topení / klimatizaci, všude nastavit cílovou teplotu, všude Topení na Plán.
Návrh UX: vpravo v řádku titulku „Domov“ tlačítko „Celý dům“ → list se skupinami Topení (Vše na Plán · Vše vypnout · Nastavit teplotu všude… s krokovačem po 0,5 °C), Klimatizace (Vše vypnout), volitelně Žaluzie (Tma / Stín / Den všude). Akce, která vypíná nebo přepisuje víc místností, se potvrdí akčním listem („Vypnout topení v 5 místnostech?“) a ukáže výsledek po místnostech včetně chyby jedné z nich.
Otázky: (1) „Nastavit teplotu všude“ = ruční přepis do další změny plánu, natrvalo, nebo na dobu (např. 2 h)? (2) Všech pět místností, nebo jen vybrané (např. horní patro)? (3) Patří sem i žaluzie?

##### C9 Pátá místnost sama v druhém řádku při čtyřech sloupcích · Rozhodnutí

Od šířky karty 1400 px jsou čtyři sloupce, pět místností dá řádek se čtyřmi a pátou samotnou vlevo (pořadí Ložnice … Obývák zůstává); na monitoru asi 2000 px je napravo od ní prázdno. Možnosti: ponechat (stejně velké karty, pořadí bez překvapení); od šířky asi 1750 px pět sloupců (karta asi 340 px); nebo čtyři sloupce a pátá roztažená na zbytek řádku (dříve u dvou sloupců zamítnuto).

##### C10 Písmo: SF Pro a větší písmo · Rozhodnutí

1. `-apple-system`, `system-ui` na iOS, Roboto jinde; pro teplotu 38 px optická velikost Display. Čísla jsou už tabulková. Změní šířky textu, po změně znovu změřit [C13](#c13) a přesah textu HVAC.
2. Velikosti jsou v px, takže nastavení velikosti textu v iOS se nepropíše. Má karta sledovat zvětšení (rozložení by se muselo umět zalomit)?

##### C13 „WindFree Sleep“: cíl se nevejde ani na velkém iPhonu · Chyba

Test v Létě: „WindFree Sleep · 22,5 °C“ se nevejde ani s přesahem do trendu na šířce 430 px, cíl se skryje. Návrh: slovo „Sleep“ nahradit malým symbolem měsíce za názvem („WindFree ☾ · 22,5 °C“, u předvolby sleep „Chlazení ☾ · 22 °C“); celý název zůstane v `aria-label`. Ušetří asi 40 px.

##### C14 Upozornění na Domov: co to je · Rozhodnutí

Specifikace počítá s oddílem „upozornění (jen pokud nějaká jsou)“ mezi souhrnem domu a místnostmi, ale neříká, co se tam objeví ani odkud se to bere. Konflikty (okno otevřené při topení) už jsou štítky v souhrnu a zastaralá data jsou ve stavu místnosti. Návrh: oddíl zrušit; nebo uvést, které události patří do upozornění (např. chyba příkazu Topení, nedostupný skript žaluzií).

##### C15 Soubory jiného projektu v repozitáři · Rozhodnutí

Repozitář obsahuje soubory obecného projektu o Home Assistantu, které s kartou nesouvisí: `.github/skills/`, `.github/evals/` (30 případů), `.github/scripts/` a jejich pokyny v `.github/CLAUDE.md`. Návrh: odstranit z repozitáře (zůstanou v historii gitu), případně přesunout do vlastního repozitáře. Beze změny, dokud nepotvrdíte. (2. 11. 2026: `AGENTS.md` obsahuje jen omezení Klimatu (agenti jsou v ha-dashboard-kit); kořenový `CLAUDE.md` patří Klimatu, pokyny k cizímu projektu jsou v `.github/CLAUDE.md`.)

### Dřívější `AUDIT.md`

#### AUDIT – Klima Dashboard

Rozpory a zjištění mezi zdroji. Stav po konsolidaci 28. 10.: sedmnáct konfliktů z konsolidace Memory (23. 10.: prahy vlhkosti, ID entit, Topení × radiátory, Boost, WindFree, název Obývák …) je uzavřeno rozhodnutím uživatele. Rozhodnutí jsou v `CURRENT_SPEC.md` a `ENTITY_MAP.md`, nahrazené znění v `DESIGN_HISTORY.md`. Otevřené body jsou jen v `TODO.md`.

##### Otevřené

- Hranice „dobrý / zhoršený / špatný“ pro venkovní vzduch: [TODO C6](./TODO.md#c6).
- Co jsou „upozornění“ na Domov a odkud se berou: [TODO C14](./TODO.md#c14).
- Barvy a kontrast na displeji (venku, OLED): [TODO C3](./TODO.md#c3).
- Soubory jiného projektu v tomto repozitáři (`.github/skills`, `.github/evals`, `.github/scripts`, `.github/CLAUDE.md`): [TODO C15](./TODO.md#c15).

##### Doporučení pro údržbu

- Změna rozhodnutí se zapíše nejdřív do `CURRENT_SPEC.md`; staré znění se přesune do `DESIGN_HISTORY.md` s důvodem. Datum a krátký popis změny patří jen tam.
- `ENTITY_MAP.md` měnit jen z nového exportu entit (`HA entities/`); export obnovit po každém přejmenování entit.
- Pravidla nekopírovat do README, `copilot-instructions.md` ani komentářů v kódu; tam jen odkaz na `CURRENT_SPEC.md`.
- Prahy mají jedno místo, konfiguraci karty; `src/config.ts` a příklad YAML musí odpovídat specifikaci (test hlídá, že příklad obsahuje všechna nastavení a výchozí hodnoty).
- Po každém vydání ověřit vizuálně na iPhonu (kontrast, venkovní čitelnost, OLED) a výsledek zapsat do spec, oddíl Barvy.

### Dřívější `MEMORY_SUMMARIZED.md`

#### Project Memory – Home Assistant Klima Dashboard

- Účel: mobilní (iPhone 14 Pro) Home Assistant dashboard „Domov“ – rychlý stavový přehled pěti místností (Ložnice, Pracovna, Maxík, Mikuláš, Obývák); vlastní karta přes HACS z GitHubu.
- Zdroj pravdy: `CURRENT_SPEC.md`.
- Entity: `ENTITY_MAP.md` (ID ověřená exporty ve složce `HA entities/`); chybějící entity se neodhadují.
- Historie a zamítnuté návrhy: `DESIGN_HISTORY.md` (jen archiv, nezávazné).
- Pravidlo: `CURRENT_SPEC.md` má vždy přednost před čímkoli jiným (historie, staré poznámky, kód, příklady).
- Jazyky: karta je česky, švédsky a anglicky podle jazyka Home Assistantu (jinak anglicky); texty jsou v `src/translations/` a každá změna textu upraví všechny tři jazyky najednou.
- Rozložení: uživatel používá zobrazení Panel (Masonry ne), na monitoru asi 2000 px; sloupce 1 / 2 / 3 / 4 od šířky karty 620 / 1000 / 1400 px, karta nejvýš 2300 px.
- Formáty: čísla, 12 / 24 h a pořadí dne a měsíce se berou z profilu Home Assistantu (`hass.locale`); PM2.5 0 µg/m³ je čistý vzduch, nikdy „Bez dat“ ani zastaralé.
- Topení popup: Ručně (posuvník teploty), Boost (pevných 25 °C) a Vypnuto mají dobu trvání jako teplá voda v Tado aplikaci; výchozí Boost 30 min, Ručně do další změny plánu, Vypnuto napořád; Vypnuto na dobu = ruční 5 °C přes `tado_ce.set_climate_timer`; odešle se až při zavření popupu (ne automaticky); popup: posuvníky nahoře, čtyři ikony v řadě, přepínač Topení | Klimatizace dole; přepis plánu je v horních štítcích zvlášť Ručně a Boost (ikona režimu), ne u názvu místnosti; stav Plán / Ručně / Vypnuto určuje `climate` entita, ne senzor přepisu (ten se u Tado CE obnoví až při dalším dotazu).

### Dřívější `TYDEN.md`

#### Týdenní ladění (klima)

Smyčka podle energetického repozitáře ([TYDEN.md](https://github.com/michal-madle/ha-energie-dashboard/blob/main/TYDEN.md)): jednou týdně se z dat zjistí, co nesedí, položím nejvýš 5 otázek, odpovíte i jednou větou a podle toho se upraví normy, prahy a předpověď. Čím dál míň otázek.

##### Postup (asi 10 minut)

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

##### Odpovědi (co o domě platí)

- **Pásma komfortu:** zima 20–24 °C, léto 21–25 °C; přepíná `input_select.house_mode` (Zima/Léto), které nic nezapíná ani nevypíná.
- **Obývací pokoj** žaluzie nemá.
- **Okna:** entity IKEA MYGGBETT pojmenované „dveře“ jsou ve skutečnosti okna.
- **Tado analytika a riziko plísně** nepoužíváte (vaše rozhodnutí); karta to nepředstavuje jako problém.
- Orientace oken a žaluzií, venkovní teplota a počasí: doplnit.

##### Otázky (nejvýš 5; jen to, co data nepoví)

1. Jaké je ID entity venkovní teploty a `weather` entity? Bez toho nejde předpověď, model větrání ani export bez příkazové volby.
2. Jaké teploměry jsou v Maxíku, Mikuláši a Obýváku? V `ENTITY_MAP.md` chybí; bez nich nejsou normy ani předpověď pro tyto místnosti.
3. Co je „IKEA zásuvka“ a Synology NAS v Pracovně: je to zátěž, která topí místnost? (Vstup do modelu: stálý tepelný zisk.)
4. Mají obě klimatizace společnou venkovní jednotku? (Ovlivňuje, jestli lze modelovat každou zvlášť.)
5. Je u oken stav `on` = otevřeno? Skript to předpokládá; kdyby bylo naopak, všechny údaje o větrání by byly obrácené.

##### Jak se měří, že to funguje

- Počet událostí podle normy za týden na místnost (cíl: nejvýš zhruba 3 za den, jinak se zpřísní práh).
- Kolik podkladů `popisky_sablona.csv` odpovídá šablonovým větám (co nesedí, se přepíše).

### Dřívější `docs/archiv_pred_konsolidaci/DESIGN_HISTORY.md`

#### Historie návrhu

##### Zamítnuté návrhy

- **Stavy „Prašno“, „Vyvětrat“ a „Větrá se“:** „Prašno“ bylo zavádějící, protože PM2.5 může pocházet i z vaření, krbu, svíček nebo venkovního znečištění. „Vyvětrat“ a „Větrá se“ byly odmítnuty, protože stav okna je na kartě vidět samostatně. Nahradily je názvy „Znečištěný vzduch“, „Vydýchaný vzduch“ a „Silně vydýchaný vzduch“.
- **Jedna karta jen pro právě preferovaný systém nebo souběžné karty Klima a Radiátor:** návrh počítal s jediným viditelným systémem vytápění či klimatizace, případně s klimatizací a radiátorovou kartou vedle sebe. Nahradilo jej zobrazení obou řádků, jejichž pořadí a váha se mění podle režimu domu.
- **Sezónní označení Zima/Léto v hlavičce:** bylo navrženo jako textový podtitulek. Bylo vypuštěno, protože sezónní režim je patrný z pořadí řádků vytápění a klimatizace.
- **Výpis 5 °C při vypnutém Topení:** při vypnutém topení měl být vidět jeho ochranný cíl. Nahradil jej pouze stav „Vypnuto“, aby cílová teplota nepůsobila jako aktivní požadavek.
- **Rozložení pro počítač nebo čtyři horní místnosti v jednom stísněném řádku:** bylo navrženo před mobilním přepracováním. Nahradila je mobilní struktura bez vodorovného posouvání; důvodem je priorita iPhonu a čitelnosti.

##### Nahrazená řešení

- **Prototypy Mushroom a button-card:** první návrh používal nativní nadpisovou kartu a karty Mushroom, později byl navržen styl „button card hero“. Výsledkem je požadavek na vlastní kartu hostovanou na GitHubu, připravenou k instalaci a ladění. Přesný technický důvod změny platformy není v paměti zaznamenán.
- **Obecné klepnutí na kartu místnosti pro detail a dlouhý stisk pro přepínání:** návrh z 19. 10. 2026 byl nahrazen konkrétnějšími akcemi pro jednotlivé hodnoty: teplota otevře 24hodinovou historii, CO₂/PM2.5 společný graf a panel žaluzie standardní ovládání krytu. Aktuální chování dlouhého stisku pro vytápění a klimatizaci není v novějším návrhu potvrzeno.
- **Dvě samostatné indikace či posuvníky žaluzií:** byly nahrazeny jedním svislým obrázkem žaluzie, který současně znázorňuje polohu i naklopení a je vedle informačních řádků. Poznámky neuvádějí samostatný důvod této vizuální změny.
- **Zobrazení teploty z Topení a původní core integrace:** pro pokojovou teplotu byla zvolena ALPSTUGA, protože je umístěna ve volném prostoru, zatímco Topení je u radiátoru pod oknem. Jako zdroj vytápění se používá Topení; Původní core integrace se má odstranit.
- **Původní řídicí přepínač `input_boolean.zaluzie_leto`:** byl nahrazen obecným výběrem `input_select.house_mode` s hodnotami Zima/Léto, který řídí pořadí řádků vytápění a klimatizace a komfortní pásmo.
- **Komfortní pásmo 19,5–23,5 °C v zimě:** bylo nahrazeno osobním rozsahem 20–24 °C v zimě; letní pásmo zůstalo 21–25 °C.
- **Původní entity místností core integrace:** v původním seznamu byly uvedeny `climate.obyvak_obyvak`, `climate.loznice_loznice`, `climate.pracovna_pracovna`, `climate.miki_miki` a `climate.maxik_maxik`. Aktuální paměť potvrzuje jako Topení pouze Ložnici (`climate.loznice_tado_ce_loznice`); aktuální ID ostatních místností nejsou doložena.
- **Stará ID žaluzií:** 18. 10. 2026 byly žaluzie přejmenovány z neprůhledných nebo pracovních ID na čitelnější ID `cover.loznice_zaluzie_loznice`, `cover.pracovna_zaluzie_pracovna`, `cover.mikulas_zaluzie_mikulas` a `cover.maxik_zaluzie_maxik`. Jednotlivá přiřazení starých a nových ID nejsou v poznámce jednoznačně zaznamenána.
- **Původní pomocné entity `sensor.prumerna_teplota_domu` a `cover.zaluzie_dum`:** byly uvedeny ve starším seznamu, ale v aktuálním návrhu karty nemají určenou roli.

##### Vývoj návrhu

- **Říjen 2026 – první nástěnka:** cílem bylo mít všech pět místností na jedné stránce, použít Mushroom, zobrazit ovládání klimatizace, radiátorů a žaluzií a mít viditelné teplotu, vlhkost a okno.
- **19. 10. 2026 – karta místnosti:** návrh přešel ke stylu button-card hero, doplnil ALPSTUGA a MYGGBETT, sezónní výběr vytápění a klimatizace a otevření detailu klepnutím.
- **21. 10. 2026 – mobilní přepracování:** stanovena hlavní obrazovka „Domov“, přednost mobilního zobrazení, stavy místností, ALPSTUGA jako zdroj údajů o prostředí, Topení a samostatné zobrazení obou soustav vytápění a klimatizace.
- **21. 10. 2026 večer – sjednocení pravidel:** uzavřen seznam stavů, konečná komfortní pásma, zobrazení Topení a pravidla pro barvy a neznámý stav.
- **22. 10. 2026 – specifikace prototypu:** vlastní karta na GitHubu, mikrotrendy, jednotný obrazový panel žaluzií a konkrétní akce pro 24hodinové grafy a ovládání krytu. Paleta zůstala pouze návrhem k ověření, nikoli konečným rozhodnutím.

### Dřívější `docs/archiv_pred_konsolidaci/MEMORY_SUMMARIZED.md`

#### Stručná projektová paměť

- Účel: mobilní nástěnka Home Assistantu „Domov“ pro rychlý přehled pohodlí v pěti místnostech.
- Aktuální specifikace, uživatelské prostředí a pravidla jsou v `CURRENT_SPEC.md`.
- Mapování entit je v `ENTITY_MAP.md`.
- Historická rozhodnutí jsou archivována v `DESIGN_HISTORY.md`.
- `CURRENT_SPEC.md` má vždy přednost před historií v `DESIGN_HISTORY.md`.
- Při rozporu používej aktuální specifikaci; historické návrhy nejsou závazné.
