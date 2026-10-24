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
    - Opuštěno, protože: cíle byly menší než 44 pt a sousedily (TODO P1.2).
    - Nahrazeno: jeden cíl přes oba řádky; popup otevře primární systém a segmentový přepínač vede na druhý.
28. **Skrytá cílová teplota HVAC na úzkém displeji**
    - Opuštěno, protože: na iPhonu se „WindFree · 22 °C“ ani „Ručně · 22,5 °C“ nevešly a cíl chyběl (TODO P1.1).
    - Nahrazeno: mikrotrendy se doleva ztrácejí a text HVAC smí přesáhnout do 40 % sloupce trendů.
29. **Glyfy předvoleb žaluzií ve stylu Shelly (kolejnice + čáry) a krátce rám okna s lamelami**
    - Opuštěno, protože: neodpovídaly ikonám, které uživatel posílal; verze s rámem okna se na 18 px četla jako „dokument“ (TODO P1.4).
    - Nahrazeno: plná kolejnice a lamely ve stylu symbolů žaluzií z aplikace Domácnost, 20 px.
30. **Jednoduché klepnutí na předvolbu bez odezvy**
    - Opuštěno, protože: působilo jako nefunkční tlačítko (TODO P1.3).
    - Nahrazeno: bublina „Podržte nebo klepněte dvakrát“ a haptika.
31. **Historie místnosti s popisky vlevo, samostatným pruhem Intenzita a bez prohlížení**
    - Opuštěno, protože: nebyla jako v aplikaci pro topení, popisky měly 9 px a graf se zmenšoval (TODO P2.7–P2.9).
    - Nahrazeno: vytápění jako oranžová výplň pod křivkou, schodovitý cíl, noc, stupnice vpravo, řádek údajů a prohlížení prstem.
32. **Popup jen se zavřením ✕ / klepnutím mimo / Escape**
    - Nahrazeno: iOS list s úchytem a zavřením tažením dolů (TODO P2.11).
33. **Tlačítko Topení / Klimatizace jen tak široké jako text, přístupný název z kontextu**
    - Opuštěno, protože: test našel mrtvou zónu (až 193 px na tabletu) a nesoulad viditelného a přístupného názvu (axe, WCAG 2.5.3).
    - Nahrazeno: cíl aspoň přes levý sloupec, název = viditelný text, kontext v popisu (TODO P1.5, P1.6).
34. **Předvolby aktivní i u nedostupné žaluzie**
    - Nahrazeno: šedé, `aria-disabled`, bublina „Žaluzie je nedostupná“ (TODO P2.17).
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
    - Opuštěno, protože: u „Vlhko“ zůstalo „76 %“ šedé a uživatel musel hledat, proč je místnost „Vlhko“ (TODO P2.15, schváleno 24. 10.).
    - Nahrazeno: hodnota, která stav určila, má barvu stavu; ostatní zůstávají neutrální.
45. **Dotykové cíle: CO₂ a PM2.5 dva řádky po 26 px, okno 26 px, vlhkost 38 × 28 px, předvolby 36 × 47 px**
    - Opuštěno, protože: HIG žádá aspoň 44 × 44 pt (TODO P1.2, schváleno 24. 10.).
    - Nahrazeno: CO₂ + PM2.5 jeden cíl 52 px s popupem „Kvalita vzduchu“; okno 32 px s neviditelnou plochou do 44 px; vlhkost, předvolby a přepínač zvětšeny neviditelným rozšířením. Test měří skutečnou plochu hit-testem. Při psaní testu se ukázalo, že řádek okna měl kvůli přebití CSS jen 26 px; opraveno.
46. **Všechny místnosti vždy jako celé karty**
    - Opuštěno, protože: pět karet je skoro dvě obrazovky iPhonu (TODO P2.1; uživatel 24. 10.: přepínač nahoře, vzhled ponechán na mně).
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
10. **v10 – TODO P1/P2 (24. 10.):** souhrn domu ve štítcích, jeden dotykový cíl Topení + Klimatizace s přepínačem v popupu, trendy blednoucí doleva, nápověda a haptika předvoleb, nové ikony předvoleb, zastaralá data, načítání a VoiceOver u trendů, pulz kolejnice při pohybu žaluzie, historie podle aplikace pro topení s prohlížením prstem, popup jako iOS list.
11. **v11 – opravy z testu a automatické testy (24. 10.):** cíl Topení / Klimatizace přes celý levý sloupec, přístupné názvy, předvolby u nedostupné žaluzie, šipky v přepínači, šířka grafu po otočení; `npm test` (Playwright, axe-core).
12. **v12 – panel a předvolby žaluzií, barvy (24. 10.):** 11 lamel (nejtenčí 2 px), lamely okna stálé, předvolby vpravo od panelu shora Den, Stín, Tma, ikony žaluzie bez rámečku (šedé, bílá podle stavu), ilustrace výš, CO₂ zelená a PM2.5 fialová.
13. **v13 – tlumené předvolby a pulzování (24. 10.):** ikony tmavě šedé, aktivní tlumeně šampaňská na podsvíceném čtverečku, cílová předvolba pulzuje do dojezdu žaluzie (konec při 5 s beze změny).
14. **v14 – dva sloupce na šířku (24. 10.):** telefon na výšku jeden sloupec přes celou šířku displeje, na šířku (od šířky karty 680 px, od v16 620 px) dvě karty vedle sebe; úzký režim podle šířky místnosti místo okna (kontejnerový dotaz), ilustrace se v úzké místnosti zmenšuje.
15. **v15 – kolo z 24. 10. odpoledne:** předvolby žaluzií jen barvou ikony (bez podbarvení), tlumenější CO₂ a PM2.5, trend CO₂ a PM2.5 navazuje na hodnotu, hodnota určující stav má barvu stavu, konflikty (okno + topí / chladí se, chladí se i když je chladno), dotykové cíle 44 × 44 px, popup „Kvalita vzduchu“; přepínač Přehled | Detail nahoře byl ještě téhož dne zamítnut (v16).
16. **v16 – kolo z 24. 10. večer (aktuální návrh):** přepínač Přehled | Detail odstraněn, karta má vždy plný detail; u otevřeného okna slabý údaj o době otevření („Otevřeno · N min“, aktualizace po 30 s); tolerance předvoleb žaluzií ±5 %; trend CO₂ a PM2.5 začíná 78 px od levého okraje; hodnoty CO₂ a PM2.5 stejnou tloušťkou písma (500) jako ostatní; dva sloupce od šířky karty 620 px; `title: ""` vynechá nadpis (a celou hlavičku, když nemá co ukázat); červená hodnota v popupu Kvalita vzduchu světlejší `#FF6961` kvůli kontrastu; osa teploty v historii místnosti jen podle naměřené teploty (křivka na celou výšku, cíl topení mimo rozsah oříznut, cíl 5 °C při Vypnuto se nekreslí).
