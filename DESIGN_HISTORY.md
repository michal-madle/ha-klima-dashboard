# DESIGN_HISTORY – historie projektu

Pouze archiv. Nic z tohoto dokumentu není závazné; platí `CURRENT_SPEC.md`.
Formát každého bodu: **Navrženo** → **Opuštěno, protože** → **Nahrazeno**. Kde Memory důvod nezaznamenává, je to uvedeno.

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
13. **Desktopové rozložení / čtyři místnosti v jednom řádku** – zamítnuto; priorita je iPhone, bez vodorovného posouvání.
14. **Vlastní plán žaluzií `plan_zaluzie` (virtuální řadič)** – nesouvisí s dashboardem, ignoruje se.
15. **Venkovní kvalita vzduchu jako AQI/index** – zamítnuto; použije se PM2.5 ve stejné veličině jako ALPSTUGA.

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
7. **v7 – ovládání a Shelly presety (aktuální návrh, 24. 10.):** vlastní 24h grafy nahrazeny standardním detailem entity; přibyl popup ovládání Topení (Vypnuto / Plán / Ručně / Boost) a Klimatizace (režimy, předvolby); presety žaluzií jsou tři kulaté Shelly tlačítka spouštěná dvojitým klepnutím nebo dlouhým stiskem (Ráno zrušeno); mikrotrendy přesunuty k hodnotám; vlhkost a CO₂/PM2.5 bez dat bez barvy; volitelná ilustrace místnosti.
