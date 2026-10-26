# CURRENT_SPEC – Domov (Klima Dashboard)

Jediný zdroj pravdy o chování a vzhledu. Obsahuje pouze platná rozhodnutí. Entity jsou v `ENTITY_MAP.md`, historie v `DESIGN_HISTORY.md`.
Co není v Memory rozhodnuto, je uvedeno v sekci „Chybějící data“ a v `AUDIT.md`; nic z toho se nedomýšlí.

## Cíl projektu

- Rychlý stavový přehled domu na mobilu (iPhone 14 Pro), ne technický monitoring. Stav je důležitější než číslo.
- Pět místností, vlastní karta (custom card) hostovaná na GitHubu přes HACS, laděná uživatelem.
- Priority: pohodlí v místnosti, HVAC (Klimatizace + Topení), žaluzie (stejně důležité jako HVAC), okna. Historie jen v detailu.
- Klepnutí na hodnotu nic nepřepíná ani nevypíná; karta nic nevypíná sama. Ovládat lze jen přes popup Topení / Klimatizace (viz Ovládání Topení a Klimatizace) a presety žaluzií.

## Dashboard Domov

- Telefon na výšku: jeden sloupec, karta místnosti je na šířku displeje. Počet sloupců určuje šířka karty Domov, ne displeje (25. 10.): do 619 px jeden sloupec, od 620 px dva, od 1000 px tři, od 1400 px čtyři; nikdy víc sloupců než místností. Karta je nejvýš 2300 px široká a v širší ploše vystředěná, místnost tedy nikdy nepřesáhne asi 570 px. Karty jsou stejně široké a řadí se po řádcích zleva doprava a shora dolů, pořadí tedy zůstává Ložnice, Pracovna, Maxík, Mikuláš, Obývák (poslední řádek začíná vlevo, karty mají stejnou šířku; u pěti místností a čtyř sloupců je pátá sama v druhém řádku). Karty jednoho řádku jsou stejně vysoké. Bez vodorovného posouvání na žádné šířce.
- Kolik místa karta dostane, určuje zobrazení nástěnky v Home Assistantu (ověřeno ve zdrojích frontendu k 24. 10. 2026): **Panel** dá jediné kartě celou šířku okna bez postranního panelu (uživatel používá Panel; na monitoru asi 2000 px tedy čtyři sloupce, na iPhonu 14 Pro na šířku asi 734 px dva); **Sections** dá sekci sloupce nejvýš 500 px, kartě v sekci s `column_span: 2` asi 670 px (dva sloupce); **Masonry** dá jediné kartě jeden sloupec široký nejvýš asi 500 px (uživatel Masonry nepoužívá, 25. 10.).
- `title: ""` vynechá nadpis; nemá-li hlavička nic jiného (venkovní podmínky, štítky souhrnu), vynechá se celá a první místnost začíná u okraje karty. Bez klíče `title` je nadpis „Domov“ v jazyce karty (Hem, Home; viz Jazyky).
- Popupy (Topení / Klimatizace, Historie místnosti) jsou na šířku telefonu vycentrované a nejvýš 90 % výšky displeje; co se nevejde (historie na výšce 393 px), se posouvá uvnitř popupu.
- Obsah shora: titulek „Domov“ → hlavička s venkovními podmínkami → souhrn domu (štítky, jen pokud nějaké jsou) → upozornění (jen pokud nějaká jsou) → karty místností. Pod kartami nic.
- Žádné globální grafy, měřidla, velké souhrnné statistiky ani samostatné panely vytápění/klimatizace.
- Pořadí karet: Ložnice, Pracovna, Maxík, Mikuláš, Obývák.
- Hlavička: aktuální venkovní teplota, denní minimum–maximum, pravděpodobnost deště, kvalita venkovního vzduchu (dobrý / zhoršený / špatný). Příklad: „8 °C · 2–10 °C · ☂ 60 %“ a „Vzduch venku: zhoršený“. Text Zima/Léto se v hlavičce nezobrazuje.
- Souhrn domu (TODO P2.2): štítky jen pro to, co je jinak než v klidném domě, v pořadí: konflikty (oranžově, viz Konflikty), otevřená okna („1 okno otevřené“, „2 okna otevřená“, „5 oken otevřených“; počítají se okna, ne místnosti, takže místnost se dvěma otevřenými okny přidá 2; obloha), ruční přepis Topení („Ručně: Pracovna“, u tří a více místností počet; oranžová), místnosti, kde se právě topí – aspoň jedna vlna („Topí 3 místnosti“; oranžová; ikona ukazuje nejsilnější topení ze všech místností, tedy při jedné místnosti s 1 vlnou a druhé s 2 vlnami dvě vlny a „Topí 2 místnosti“, uživatel 25. 10.), zapnutá klimatizace („Klimatizace: Ložnice“, u tří a více počet; modrá). Štítek má ikonu (okno, vlny, klimatizace), jména všech místností jsou v `aria-label` a nápovědě. Neznámé stavy se nepočítají. Štítky nejsou klikací.
- Venkovní kvalita vzduchu vychází z PM2.5 ve stejné veličině jako ALPSTUGA (µg/m³), ne z AQI ani indexu. Preferovaný zdroj: Sensor.Community.
- Hranice venkovního vzduchu (návrh 23. 10., čeká na potvrzení; stejné hranice jako pro PM2.5 v místnosti): dobrý < 15 µg/m³, zhoršený 15–34, špatný ≥ 35. Hodnota 15 µg/m³ odpovídá 24hodinovému doporučení WHO z roku 2021. Chybí-li hodnota, zobrazí se „Vzduch venku: ––“.

## Room Card

- Všechny karty mají stejné rozložení. Obývák má stejné rozložení bez žaluzií (prázdné místo se akceptuje). Stejně tak místnost, která podle konfigurace nemá čidlo CO₂ nebo PM2.5 (`carbon_dioxide: false`, `pm25: false`, viz Konfigurace): řádek té veličiny zmizí a jeho místo zůstane prázdné, řádky Topení, Klimatizace a okna i panel žaluzie zůstanou na svém místě (24. 10. večer). Výjimka (25. 10.): místnost, která nemá žaluzii ani CO₂ a PM2.5, je o 64 px kratší (třída `compact`); řádky Topení, Klimatizace a okno se posunou nahoru a v řádku s vyššími kartami se zkrácená karta natáhne na jejich výšku.
- Úzký režim se řídí šířkou karty místnosti, ne displeje (kontejnerový dotaz, 24. 10.): od šířky místnosti 364 px a méně je vnitřní okraj 14 px, panel žaluzie 52 px, sloupec předvoleb 32 px a ikony předvoleb 28 px; jinak 16 px, 60 px, 36 px a 32 px. V jednom sloupci to odpovídá šířce karty do 364 px (iPhone na výšku s displejem do 380 px), ve dvou sloupcích šířce karty Domov do 740 px: iPhone 14 Pro na šířku (karta asi 734 px, místnost asi 361 px) je tedy v úzkém režimu. Ilustrace se zmenšuje, když je místnost užší než 340 px (šířka = šířka místnosti − 190 px, nejvýš 150 px).
- Hlavička karty: název místnosti + stav místnosti, přes celou šířku. Název místnosti je největší text karty po teplotě (26 px, polotučně).
- Pod hlavičkou je blok teplota + vlhkost (vedle sebe, bez mikrotrendu) a pod ním tři sloupce zleva doprava: informační řádky | panel žaluzie | tlačítka předvoleb žaluzií. Informační řádky jsou v pořadí CO₂ → PM2.5 → první HVAC řádek → druhý HVAC řádek → okno; všechny mají stejnou výšku.
- Kvalita vzduchu (CO₂, PM2.5) je od skupiny Topení / Klimatizace / okno viditelně oddělená mezerou 12 px (bez čáry); velikost písma zůstává stejná.
- Blok informačních řádků má dva stejně široké sloupce: vlevo ikony, hodnoty a popisky (řádky Topení, Klimatizace a okno), vpravo mikrotrend teploty. Mikrotrendy CO₂ a PM2.5 začínají hned za hodnotou (viz níže).
- Panel žaluzie (viz Žaluzie) začíná u řádku CO₂ a končí u řádku okna; má stejnou výšku jako informační řádky a nezasahuje do hlavičky ani k bloku teplota/vlhkost.
- Teplota je dominantní; vlhkost vedle ní je sekundární, ve velikosti navazující na „°C“. Formát: „20,4 °C  46 %“, čísla podle profilu Home Assistantu, jinak podle jazyka karty (anglicky „20.4 °C  46%“, viz Jazyky).
- Teplota, vlhkost, CO₂ a PM2.5 pocházejí výhradně z čidel místnosti (IKEA ALPSTUGA, případně jiný teploměr místnosti). Obývák čidlo CO₂ ani PM2.5 nemá (uživatel 24. 10.), v konfiguraci má `carbon_dioxide: false` a `pm25: false`. Teplota z Topení se pro kartu nepoužívá (Topení měří u radiátoru pod oknem).
- CO₂ a PM2.5 mají jen ikonu, bez textového popisku. CO₂: ikona molekuly CO₂ (`mdi:molecule-co2`, schválená). PM2.5: vlastní ikona z rozptýlených teček různé velikosti, bez rámečku a bez textu. CO₂ a PM2.5 mají každá svou barvu, stejnou pro ikonu i mikrotrend: CO₂ tlumená šalvějová zelená (testovací `#8FBF9F`, sytost 27 %), PM2.5 tlumená levandulová (testovací `#A59DCF`, sytost 34 %); obě jsou nenápadné (původní svěží `#A6E36B` a `#B8A6FF` byly příliš výrazné), liší se odstínem od sebe, od oranžové a červené varování i od broskvového mikrotrendu teploty a mají kontrast k pozadí karty aspoň 6 : 1. Barvu mají jen tehdy, když řádek má hodnotu; bez dat jsou ikona i „––“ neutrálně šedé (bez barvy, bez mikrotrendu). Podle hodnoty se barva ikony nemění; číslo se barví jen při překročení prahu. Význam ikony čtečkám obrazovky sděluje `aria-label` řádku.
- Hodnota, která rozhodla o stavu místnosti, má barvu stavu (TODO P2.15): vlhkost při Vlhko / Sucho a teplota při Teplo (oranžová `#FF9F0A`) a Chladno (modrá `#64D2FF`); ostatní hodnoty zůstanou neutrální (světle šedá `#C7C7CC`, teplota bílá). U CO₂ a PM2.5 se barví číslo (viz Stavový systém). Stav Příjemné a Bez dat nic nebarví; chybí-li hodnota, je „––“ šedé.
- Mikrotrendy (viz Historie a grafy) jsou na kartě právě tři: CO₂ a PM2.5 ve svém řádku a mikrotrend teploty vedle řádků Topení a Klimatizace, vysoký jako oba řádky dohromady (teplota je výsledkem vytápění a chlazení). Vedle řádku okna mikrotrend není. Mikrotrend CO₂ a PM2.5 navazuje přímo na hodnotu: začíná 78 px od levého okraje informačních řádků, tedy pod koncem i nejkratší hodnoty („2 µg/m³“ končí asi 84 px od okraje; začátek byl 70 px, 24. 10. odpoledne o 8 px dál), takže čára vyrůstá z čísla a jednotky a oko ji nemusí hledat (TODO P1.10.1); delší hodnota („1640 ppm“, asi 98 px) leží nad jeho blednoucím začátkem. Číslo a jednotka se nikdy nezalamují ani neořezávají, ani na kartě 304 px (TODO P2.12). Mikrotrend teploty začíná o 28 px (v úzké místnosti 14 px) před pravým sloupcem.
- Konec mikrotrendu (okraj koncové tečky) je od panelu žaluzie vzdálen 1,5× mezery mezi panelem a ikonami předvoleb vpravo od něj (mezera k okraji kolejnice ikony; na iPhonu 14 Pro 12,75 px proti 8,5 px), takže trend je o kousek kratší než levý sloupec.
- Mikrotrendy se doleva plynule ztrácejí (vlevo průhledné, plně viditelné od 80 % své šířky), takže začátek čáry splývá s hodnotou. Text řádků Topení a Klimatizace smí přesáhnout do sloupce trendů, nejvýš do 40 % jeho šířky, a leží nad trendem; na iPhonu 14 Pro je tak celé „WindFree · 22 °C“ i „Ručně · 22,5 °C“ (TODO P1.1).
- Text HVAC řádku se nikdy nezkracuje uprostřed čísla: když se nevejde ani s přesahem, skryje se celá cílová teplota („· 21 °C“) a stav (Plán, Ručně, WindFree …) zůstane celý. Celý text obou řádků je vždy v `aria-label`.
- Detail hodnot: klepnutí na teplotu nebo její mikrotrend otevře popup „Historie místnosti – 24 h“ (viz Historie a grafy). Klepnutí na vlhkost a okno otevře standardní detail entity Home Assistantu (`more-info`) s grafem historie. CO₂ a PM2.5 (hodnoty i mikrotrendy) jsou jeden dotykový cíl: má-li místnost obě čidla, otevře popup „Kvalita vzduchu“ se dvěma řádky (CO₂ a PM2.5 s hodnotou, každý otevře standardní detail entity a popup zavře); má-li jen jedno, otevře rovnou jeho detail; bez čidla je neaktivní. Řádek okna: s jedním oknem otevře detail jeho entity, se dvěma a více okny popup „Okna“ (viz Detail místnosti).
- Dotykové cíle (TODO P1.2): každý klikací prvek karty má účinnou dotykovou plochu aspoň 44 × 44 px; ukazuje se hit-testem, proto se počítá i neviditelné rozšíření (vzhled se nemění). Okno: řádek 32 px a neviditelná plocha pod ním (dolů do okraje karty); vlhkost a předvolby: neviditelné rozšíření; CO₂ + PM2.5 jeden cíl 52 px; Topení + Klimatizace jeden cíl 52 px. Přístupný název tlačítek CO₂ + PM2.5, Topení + Klimatizace a okna je přesně jejich viditelný text (WCAG 2.5.3), místnost, názvy veličin a akce jsou v popisu (`aria-describedby`).
- Ilustrace místnosti: jemná čárová kresba v pravém horním rohu karty, v tónu `bedroom` `#A5A1F2`, `office` `#7FC8F8`, `kids` `#FFB36B`, `living` `#E8D9B5`. Leží v měkkém obdélníku přes volnou pravou část hlavičky karty (asi 58 % šířky, do konce bloku teplota/vlhkost); obdélník i kresba se zeslabují jen u levého a spodního okraje, kresba sama je celá vidět. Kresba leží vysoko: její nejnižší čára končí aspoň 22 px nad panelem žaluzie, aby nesoupeřila se zeslabením ani s žaluziemi. Je jen dekorativní (`aria-hidden`) a nepřekrývá text.
- Ilustrace se zobrazuje bez konfigurace: bez klíče `image` se zvolí podle názvu místnosti (Ložnice → `bedroom`, Pracovna → `office`, Maxík a Mikuláš → `kids`, Obývák / Obývací pokoj → `living`; velikost písmen a diakritika nerozhodují). U jiného názvu se bez `image` nezobrazí. Klíč `image` (`bedroom`, `office`, `kids`, `living`) volbu přepíše, `image: none` ilustraci vypne. Starší název klíče `scene` platí dál.
- Vlastní obrázek místnosti (24. 10. večer): `image` s adresou obrázku (`/local/…`, `/hacsfiles/…`, `https://…`) zobrazí obrázek na místě ilustrace, vyplní měkký obdélník (oříznutý na jeho tvar, `object-fit: cover`) a zeslabuje se u levého a spodního okraje stejně jako ilustrace; je dekorativní (prázdný `alt`). Neprůhlednost 50 % v tmavém, 60 % ve světlém režimu, aby nesoupeřil s textem.
- Odkaz místnosti (24. 10. večer): s klíčem `link` je název místnosti tlačítko se šipkou „›“ za názvem (sekundární šedá); klepnutí otevře cestu v Home Assistantu (`/lovelace/loznice`, navigace jako akce `navigate`) nebo webovou adresu (`https://…`, akce `url`). Přístupný název je název místnosti, popis „Otevře …“. Dotyková plocha aspoň 44 px na výšku (neviditelné rozšíření). Bez `link` je název jen text.

## HVAC logika

- Každá karta má vždy oba HVAC řádky: Topení (vytápění) a Klimatizace (chlazení a ostatní režimy).
- Pořadí a váhu řádků určuje House Mode, nikoli to, který systém právě běží.
- Topení je jediný zdroj vytápění. Klimatizace je primární chlazení.
- Stav HVAC se čte z ikony a její barvy; všechny ikony mají stejnou velikost.
- Řádky Topení a Klimatizace tvoří jeden dotykový cíl přes oba řádky (52 px); otevře popup s ovládáním (viz Ovládání Topení a Klimatizace). Řádek okna otevře detail entity. Řádky Topení a Klimatizace mají vždy ikonu: Topení 0–3 vlny, Klimatizace ikonu režimu. Ikona je vidět i při „Vypnuto“ (šedá) a při chybějících datech (přerušovaná, „––“).

## House Mode

- `input_select.house_mode` (klíč `house_mode_entity`), pouze hodnoty Zima a Léto. Názvy hodnot lze v konfiguraci změnit (`house_modes.winter`, `house_modes.summer`); velikost písmen a diakritika nerozhodují.
- Zima: první řádek Topení, druhý Klimatizace. Léto: první Klimatizace, druhý Topení.
- Určuje také komfortní pásmo (viz níže).
- Nikdy sám nezapíná ani nevypíná žádný systém.

## Komfortní pásma

| Režim | Pásmo teploty |
|---|---|
| Zima | 20–24 °C |
| Léto | 21–25 °C |

- Jde o osobní komfort uživatele, ne o normy; hodnoty 18/26 °C se nepoužívají.
- Teplota nad horní hranicí pásma = Teplo, pod dolní hranicí = Chladno.
- Všechny prahy jsou v konfiguraci karty (`thresholds`), nastaví se jednou a dál se nemění. Platí pro všechny místnosti; místnost může vybrané prahy přepsat vlastním `thresholds` (např. chladnější ložnice). Souhrn domu, konflikty i barvy hodnot se pak řídí prahy dané místnosti; venkovní vzduch společnými.

## Stavový systém

Stav místnosti je lidské zhodnocení prostředí, ne příkaz. Platí první splněná podmínka:

| # | Stav | Podmínka | Barva |
|---|---|---|---|
| 1 | Bez dat · první chybějící údaj | chybí nezbytná data | neutrální |
| 2 | Znečištěný vzduch | PM2.5 ≥ 35 | červená |
| 3 | Silně vydýchaný vzduch | CO₂ ≥ 1500 | červená |
| 4 | Vydýchaný vzduch | CO₂ ≥ 1000 | oranžová |
| 5 | Vlhko | vlhkost > 70 % | – |
| 6 | Sucho | vlhkost < 35 % | – |
| 7 | Teplo | teplota nad pásmem | – |
| 8 | Chladno | teplota pod pásmem | – |
| 9 | Příjemné | nic z výše uvedeného a jsou nezbytná data | bez dominantní zelené |

- PM2.5 od 15 do 34: oranžové jen číslo, stav místnosti se nemění.
- CO₂ 1000–1499 oranžově, od 1500 červeně. Normální hodnoty jsou neutrální.
- Červená vždy mění stav místnosti.
- Stav „Příjemné“ se nikdy nezobrazí při chybějících nezbytných datech.
- Barva stavu (oranžová, červená, u Chladno modrá) se přenáší na hodnotu, která stav určila (viz Room Card): u Vlhko / Sucho vlhkost, u Teplo / Chladno teplota; u CO₂ a PM2.5 už je barevné samo číslo. Hodnota, která stav neurčila, zůstává neutrální.
- Stav „Větrá se“ neexistuje; stav okna je vidět v řádku okna.
- Analytické senzory Topení a Mold Risk stav karty neovlivňují.

## Klimatizace

- Zdroj: `climate` entita klimatizace. Režimy: off / cool / dry / fan_only (Větrání) / auto / heat. Předvolby: none / sleep / boost / wind_free / wind_free_sleep.
- Sada ikon režimů stejné velikosti; režim je poznat z ikony a barvy.
- Běžící klimatizace má jinou barvu než vypnutá. Větrání má stejnou barvu jako Plán u Topení.
- Vypnuto: stejná ikona klimatizace, šedá, text „Vypnuto“ (ne ikona vypínače). Vypnutí má přednost před předvolbou.
- Nedostupné: stejná ikona, přerušovaná, „––“.
- Texty: chlazení + wind_free = „WindFree · cíl“; chlazení = „Chlazení · cíl“; ostatní předvolby se zobrazí svým názvem. WindFree se zobrazuje jako „WindFree“, nikoli jen „Chlazení“.
- Vlastní teploměr klimatizace se nepoužívá.

## Topení

- Jediný zdroj vytápění. Původní (core) integrace se odstraňuje a nepoužívá.
- Stavy: Plán (Overlay Schedule), Ručně (ruční přepis, zvýrazněný; také Boost, tj. ruční 25 °C), Vypnuto. Při přepisu plánu (Ručně, Boost) je v záhlaví místnosti za názvem malá ikona toho režimu (Ručně posuvníky, Boost blesk); u Plánu a Vypnuto žádná. Ruční přepis s cílem 5 °C (časovač „Vypnuto na dobu“, viz Ovládání Topení) je Vypnuto: řádek, souhrn i historie ho tak ukazují.
- Při Vypnuto se zobrazí pouze „Vypnuto“, nikdy cílová teplota 5 °C. Vypnuto není problémový stav.
- U Plán a Ručně se zobrazí stav a cílová teplota.
- Intenzita vytápění (heating %) se zobrazuje ikonou 0–3 teplých vln, bez čísel a procent: 0 % = 0 vln, 1–34 % = 1, 35–67 % = 2, 68–100 % = 3. Meze jsou v konfiguraci (`thresholds.heating_waves_2: 35` a `heating_waves_3: 68`: od kolika % se ukážou dvě a tři vlny; jedna vlna je vše nad 0 %).
- Předpověď otevřeného okna z Topení se ignoruje.

## Ovládání Topení a Klimatizace

- Klepnutí kamkoli na řádky Topení a Klimatizace otevře popup s titulkem místnosti, vždy na **primárním systému** podle House Mode (Zima Topení, Léto Klimatizace); není-li primární systém nakonfigurován, otevře se druhý (TODO P1.2).
- Dotykový cíl Topení + Klimatizace je aspoň tak široký jako levý sloupec informačních řádků (s přesahem do trendu podle délky textu), takže klepnutí kamkoli do levého sloupce těchto řádků otevře popup. Přístupný název tlačítka je přesně viditelný text obou řádků (WCAG 2.5.3); místnost, názvy systémů a akce jsou v popisu (`aria-describedby`).
- Úplně dole v popupu je segmentový přepínač ve stylu iOS „Topení | Klimatizace“ v pořadí podle House Mode; přepnutím se zobrazí ovládání druhého systému. Má-li místnost nakonfigurovaný jen jeden systém, přepínač se nezobrazí a místo něj je název systému.
- Přepínač se ovládá jako záložky (ARIA tabs): šipky vlevo / vpravo (i nahoru / dolů) a Home / End přepnou systém a přesunou na něj fokus; v pořadí klávesy Tab je jen zvolená záložka, obsah je panel záložky.
- Popup je iOS list (viz Detail místnosti). Dole je odkaz „Detail a historie“, který popup zavře a otevře standardní detail `climate` entity zvoleného systému.
- Volby vycházejí z atributů entity `hvac_modes` a `preset_modes`; karta nevolá režim, který entita nenabízí. Volba u Klimatizace volá `climate.set_hvac_mode` nebo `climate.set_preset_mode` (Topení viz níže); popup zůstává otevřený a aktivní volba se podle stavu entity zvýrazní. Chyba služby se ukáže v popupu.
- Topení: Vypnuto (`off`), Plán (`auto`), Ručně (`heat`) a Boost. Volba se **neodesílá hned**: použije se, až se popup zavře (křížek, tažení dolů, Esc, klepnutí vedle, přepnutí na Klimatizaci nebo „Detail a historie“). Zvolení režimu, který entita už má, změnu zahodí; beze změny se nic neodešle. Pod volbami je řádek „Použije se po zavření okna“ (jeho výška je vyhrazená, volby se nehýbou).
  - **Rozložení:** nahoře posuvníky aktivního (nebo právě zvoleného) režimu, pod nimi čtyři volby jako ikony s popiskem v jedné řadě (Vypnuto, Plán, Ručně, Boost), dole odkaz „Detail a historie“ a úplně dole přepínač Topení | Klimatizace. Popup roste nahoru, takže volby a přepínač zůstávají na místě. Posuvníky se ukážou už při otevření, je-li aktivní Ručně, Boost nebo Vypnuto (s hodnotami z entity).
  - **Teplota:** u Ručně posuvník (rozsah `min_temp`–`max_temp` entity, krok `target_temp_step`, bez 5 °C, protože 5 °C je Vypnuto; výchozí je dosavadní cíl, jinak 21 °C). Boost je pevných 25 °C bez posuvníku. Vypnuto s dobou je 5 °C (ochrana proti zamrznutí).
  - **Doba („Jak dlouho“, posuvník jako u teplé vody v aplikaci Tado):** 15, 30, 45, 60, 90, 120, 180, 240, 360, 480 min, „Do další změny plánu“ a „Dokud neobnovíte plán“. U dob v minutách je pod hodnotou „do HH:MM“. Výchozí: Boost 30 min, Ručně „Do další změny plánu“, Vypnuto „Dokud neobnovíte plán“.
  - **Volání (Tado CE):** Při zavření popupu se pro Ručně, Boost a Vypnuto s dobou volá `tado_ce.set_climate_timer` (`temperature`, a buď `time_period` ve tvaru `HH:MM:SS`, nebo `overlay`: `next_time_block` = do další změny plánu, `manual` = dokud neobnovíte plán). Plán je `climate.set_hvac_mode` `auto`, Vypnuto „Dokud neobnovíte plán“ je `climate.set_hvac_mode` `off`. Bez akce `tado_ce.set_climate_timer` (podle `hass.services`) je Boost zašedlý („entita nenabízí“), Ručně má jen posuvník teploty (`climate.set_temperature`, bez nastavení doby) a Vypnuto je bez doby (`climate.set_hvac_mode` `off`).
  - **Stav:** ruční cíl 25 °C se ukáže jako Boost, ruční cíl ≤ 5 °C jako Vypnuto. Běží-li časovač, pod volbami je „Zbývá N min“ z `overlay_remaining_seconds` senzoru přepisu.
- Klimatizace: režimy Vypnuto, Chlazení, Sušení, Větrání, Auto, Topení (podle `hvac_modes`) a předvolby podle `preset_modes` (Sleep, Boost, WindFree, WindFree Sleep; „none“ se nenabízí). Zvolit režim zároveň klimatizaci zapne. Opětovné zvolení aktivní předvolby ji zruší, pokud entita nabízí předvolbu `none`.
- Dotykové cíle voleb mají nejméně 44 px na výšku.

## Žaluzie


- Ložnice, Pracovna, Maxík, Mikuláš mají žaluzie (Shelly); Obývák nemá. Panel i tlačítka předvoleb se zobrazí jen u místnosti, která má v konfiguraci karty entitu `cover`.
- Poloha: 100 % = otevřeno (nahoře), 0 % = zavřeno (dole). Naklopení: 100 % = lamely otevřené (vodorovně), 0 % = zavřené (svisle).
- Panel je jeden svislý sloupec, miniatura reálné žaluzie viděné zevnitř; bez rámečku, textu, procent, popisků a slovních stavů.
- Výška panelu = výška informačních řádků (od řádku CO₂ po řádek okna). Šířka panelu je 60 px (na užších displejích 52 px); na šířce mikrotrendů nezávisí. Stálý počet 11 lamel.
- Naklopení mění jen tloušťku spuštěných lamel: 0 % téměř splývají v plnou plochu (tenká mezera), 100 % linky silné 2 px s mezerami.
- Poloha dělí sloupec: spuštěná horní část (žaluzie) je šampaňská utlumená na 50 % (horní kolejnice 70 %), aby zatažená žaluzie na tmavém displeji nesvítila, a přesto je zřetelně světlejší než okno; dolní část představuje okno, zachovává mřížku lamel a je v barvě oblohy při přibližně 28 % neprůhlednosti. Lamely okna mají stálou tloušťku 2 px bez ohledu na naklopení, takže se okno naklopením „nezatahuje“ (zkušební volba z 24. 10., lze vrátit). Poloha 100 % = zvýrazněna jen horní linka; poloha 0 % = zvýrazněno celé shora dolů.
- Neznámá poloha nebo naklopení = přerušovaná silueta panelu; nikdy se nebere jako 0.
- Panel je pouze zobrazení; klepnutí otevře standardní ovládání krytu.
- Při pohybu žaluzie (stav `opening` / `closing`) horní kolejnice panelu jemně pulzuje; při „omezit pohyb“ ne (TODO P2.6).
- Vpravo od panelu žaluzie (poslední sloupec karty) je jeden sloupec tří tlačítek s předvolbami, každé třetina výšky panelu, v pořadí shora dolů Den, Stín, Tma (zdvižená žaluzie nahoře, zavřená dole). Tlačítko je jen ikona: bez kulatého i jiného rámečku, bez textu; název je v `aria-label` a v `title`. Ikona je schematická žaluzie: široká kolejnice, lamely a šňůrka; Den má dvě stažené lamely pod kolejnicí a šňůrku dole pod nimi, Stín čtyři tenké lamely, Tma stejné čtyři lamely silné a téměř se dotýkající. Ikona je 32 px široká (v úzké místnosti, viz Room Card, 28 px), sloupec 36 px (32 px); tlačítko je vysoké asi 47 px. Hodnoty jsou poloha / naklopení v %:

| Pořadí | Tlačítko | Ikona | Poloha / naklopení | Význam |
|---|---|---|---|---|
| 1 | Den | kolejnice, stažené lamely, šňůrka | 100 / 100 | vysunuto nahoru |
| 2 | Stín | kolejnice + čtyři tenké lamely | 0 / 100 | sjeté dolů, lamely otevřené |
| 3 | Tma | kolejnice + čtyři silné lamely | 0 / 0 | úplné zatemnění |

- Ikony jsou tlumené a nemají každá svou barvu: tmavě šedé `#6F6F74` (kontrast k pozadí karty aspoň 3 : 1). Jen ikona, jejíž hodnoty odpovídají aktuálnímu stavu žaluzie (tolerance ±5 %: žaluzie po otevření lamel vyjede o 3–4 % nahoru, takže Stín je skutečně 4 / 100, a ne 0 / 100; vlastní polohy dál nesvítí žádná předvolba), svítí: změní barvu na tlumenou šampaňskou `#C9C0A8` (odstín barvy žaluzií, ne čistě bílou); nic dalšího se nepřidává (bez podbarvení, čtverečku a rámečku; zamítnuto 24. 10.). Stav se čte ze světlosti ikony; čtečkám ho říká `aria-pressed`. Při neznámém stavu nebo vlastní poloze (například 40 / 60) nesvítí žádná.
- Předvolba na cestě: po odeslání začne ikona cílové předvolby pulzovat, dokud žaluzie nedojede (poloha i naklopení v toleranci a stav není `opening` / `closing`): ikona plynule mění barvu mezi tmavě šedou a šampaňskou a zpět (1,3 s tam a zpět). Pulzovat začne hned po odeslání, ne až po odpovědi služby (skript může běžet, dokud žaluzie nedojede). Během pulzování ostatní ikony nesvítí, aby bylo jasné, kam žaluzie jede; cílová má `aria-busy`. Pulzování skončí: (1) dojezdem, kdy ikona zůstane trvale šampaňská; (2) když se stav, poloha ani naklopení žaluzie 5 s nezmění (pohyb někdo zastavil jinde, třeba ručně); každá změna odpočet 5 s začne znovu a první odpočet běží od odeslání; (3) chybou skriptu; (4) když se žaluzie stane nedostupnou. Žaluzie, která už v poloze předvolby je, nepulzuje. Při „omezit pohyb“ se místo pulzování ukáže ikona v barvě napůl mezi šedou a šampaňskou.
- Předvolba se odešle až **dvojitým klepnutím (do 400 ms) nebo dlouhým stiskem (550 ms)**; jednoduché klepnutí nic neodešle, ale ukáže vlevo od tlačítka (přes panel) na 1,6 s bublinu „Podržte nebo klepněte dvakrát“ s haptikou `selection` (TODO P1.3). Během držení (zpětná vazba pro dlouhý stisk) ikona za 550 ms přejde na šampaňskou a maličko se zmenší; po odeslání ikona jednou „poskočí“ (zvětší se o 22 % a vrátí) a ozve se haptika `success` (až když Home Assistant službu dokončí); při chybě haptika `failure` a chyba přímo u tlačítka (25. 10.): tlačítko se červeně orámuje a krátce zatřese (při „omezit pohyb“ bez třesu) a v bublině vlevo od něj stojí „Nepodařilo se odeslat“ na 5 s; čtečka řekne „Ložnice: skript žaluzií se nepodařilo spustit.“ Horní hláška nad kartami se pro chybu předvolby nepoužívá. Při „omezit pohyb“ je ikona při držení hned šampaňská, bez poskočení. Haptiku převádí aplikace Home Assistant (událost `haptic`); v prohlížeči se nic nestane. Z klávesnice se předvolba odešle klávesou Enter nebo mezerník.
- Nedostupná žaluzie (entita chybí, `unavailable` / `unknown`): předvolby zůstanou vidět a dají se zaměřit, ale jsou tlumeně šedé (`aria-disabled`), při držení nic neroste a nic neodešlou; klepnutí nebo klávesa ukáže bublinu „Žaluzie je nedostupná“ s haptikou `warning`.
- Předvolba Ráno (35 / 60) byla zrušena; ikony odpovídají třem polohám.
- Předvolby jsou v konfiguraci (24. 10. večer): společné `covers.presets` pro všechny žaluzie a `cover_presets` místnosti, které je pro ni přepíše. Výchozí jsou Den, Stín a Tma podle tabulky výše. Předvolba má `position` a `tilt` (0–100 %), volitelně `name` (název pro čtečku a nápovědu; bez něj podle ikony v jazyce karty: Den / Dag / Day, Stín / Skugga / Shade, Tma / Mörker / Dark), `icon` (`open` = ikona Den, `shade` = Stín, `dark` = Tma; bez ní se zvolí podle hodnot: poloha nad 50 % → `open`, jinak naklopení nad 50 % → `shade`, jinak `dark`) a `description` (popis pro čtečku; bez něj předvolba bez `name` v poloze své ikony řekne, co ikona znamená, např. „vytaženo nahoru“, a každá jiná svou polohu, „poloha 0 %, naklopení 100 %“, obojí v jazyce karty). Výchozí předvolby nemají `name` ani `description`, takže se jmenují v jazyce karty. Předvolby jsou 1–3; tlačítka se dělí o výšku panelu rovným dílem (každé aspoň 44 px). Tolerance shody (`covers.tolerance`, výchozí ±5 %), skript (`covers.script`, výchozí `script.zaluzie_posun` s poli `entity`, `pos`, `tilt`) a čas bez pohybu, po kterém pulzování skončí (`covers.stall_seconds`, výchozí 5 s), jsou také v konfiguraci.

## Konflikty

- Konflikt je kombinace, kterou je dobré vidět na první pohled; není to stav místnosti ani alarm (TODO P2.14). Tři druhy: **okno otevřené a topí se** (Topení má aspoň jednu vlnu, nebo klimatizace topí), **okno otevřené a chladí se** (klimatizace `cool` nebo WindFree) a **chladí se, i když je chladno** (klimatizace chladí a stav místnosti je Chladno). Otevřené okno s chlazením se hlásí jednou, ne i jako „chladí se, i když je chladno“. Neznámé stavy konflikt nevytvoří. Předpověď otevřeného okna z Topení se dál ignoruje.
- Zobrazení: štítek v souhrnu domu na prvním místě, oranžový (`#FF9F0A`): „Okno otevřené · topí se: Ložnice“, „Okno otevřené · chladí se: Pracovna“, „Chladí se, i když je chladno: Pracovna“ (u tří a více místností počet, jména v `aria-label`; čtečka řekne „Konflikt: …“) a jemná oranžová tečka za popiskem okna dané místnosti; popis okna pro čtečku se doplní o „konflikt“.

## Detail místnosti

- Karta má čtyři vlastní popupy ve stejném rámu: ovládání Topení / Klimatizace, „Historie místnosti – 24 h“, „Kvalita vzduchu“ (název místnosti jako podtitulek; dva velké řádky CO₂ a PM2.5 s ikonou, hodnotou a nápovědou „Detail a historie“) a „Okna“ (jen u místnosti se dvěma a více okny; řádek za každé okno s ikonou, názvem, stavem a dobou otevření, např. „Balkon · Otevřeno · 12 min“; řádek otevře standardní detail entity okna a popup zavře). Ostatní hodnoty, okno místnosti s jedním oknem a žaluzie otevírají standardní detail entity Home Assistantu.
- Rám popupu je iOS list (TODO P2.11): na mobilu spodní panel s úchytem nahoře, na širokém displeji (od 600 px) dialog uprostřed bez úchytu. Výška podle obsahu, nejvýš 90 % obrazovky. Zavře se tlačítkem ✕, klepnutím mimo, klávesou Escape nebo tažením horní části (úchyt a titulek) dolů o víc než 100 px či rychlým švihem; jinak se vrátí na místo. Pozadí za popupem při tažení světlá. Stránka pod otevřeným popupem se nepohne (25. 10.): posouvání popupu na jeho konec ani tah mimo něj stránku neposune (`overscroll-behavior: contain`, na pozadí `touch-action: none` a zrušení tahu, který popup nemůže odscrollovat). Telefon na šířku (výška do 600 px): historie je přes celou šířku displeje (nejvýš 960 px) a posouvá se jen uvnitř.

## Historie a grafy

- „Historie místnosti – 24 h“ (podle denního přehledu iOS aplikace pro ovládání topení; otevírá ji teplota a její mikrotrend; TODO P2.7–P2.9). Délka období je v konfiguraci (`history.hours`, výchozí 24 h; titulek pak zní „Historie místnosti – 12 h“), stejně jako noc (`history.night_start` 22 a `history.night_end` 6 h) a nejmenší rozsah osy teploty (`history.min_temperature_span`, výchozí 1,5 °C):
  - Nahoře řádek údajů: čas („Teď“, nebo čas pod prstem, u předchozího dne „včera“), teplota (22 px, polotučně), vlhkost (modře), pod tím Topení (ikona vln, Plán / Ručně · cíl / Vypnuto) a Klimatizace (ikona a režim). Čtečka ho čte při změně.
  - Graf (výška plochy 150 px, kreslený 1 : 1 v šířce popupu): šedé pozadí, noc 22–6 h ztmavená; bílá křivka teploty se šedou plochou pod ní a tečkou na konci; vytápění jako oranžová výplň pod křivkou teploty se sytostí podle vln (1 / 2 / 3 vlny = 24 / 44 / 68 %); cíl Topení jako schodovitá přerušovaná čára jen v době Plán / Ručně; vlhkost jako modrá přerušovaná čára s vlastním měřítkem (hodnotu ukáže údaj nad grafem při prohlížení). Stupnice teploty vpravo se řídí jen naměřenou teplotou, ne cílem topení: rozsah je minimum až maximum naměřených hodnot za 24 h s 5% rezervou nahoře a dole, takže křivka vyplní celou výšku grafu; nejmenší rozsah je 1,5 °C (plochá křivka se nenatahuje na šum). Popisky leží na násobcích kroku uvnitř rozsahu: 0,5 °C do rozsahu 3 °C, 1 °C do 6 °C, 2 °C do 12 °C, jinak 5 °C; zápis podle jazyka karty („21,5°“, anglicky „21.5°“). Cíl topení mimo rozsah se z grafu ořízne a osu nemění; hodnota cíle je dál v řádku údajů. Vypnuto má přednost před cílem: cíl 5 °C (Tado ho hlásí při Vypnuto) se v grafu ani v řádku údajů nekreslí nikdy, ani na krátkém přechodu, kdy entita cíle změní hodnotu o chvilku dřív či později než entity režimu (jinak by na každém přepnutí vznikl proužek „Plán · 5 °C“). Bez jediného měření teploty rozhodují hodnoty cíle, bez nich platí 19–23 °C.
  - Šířka grafu sleduje šířku popupu i po otočení telefonu nebo změně velikosti okna.
  - Pod grafem pruhy Topení (Plán bílá, Ručně oranžová, Vypnuto šedá) a Klimatizace (barvy podle režimu), každý s popiskem nad sebou; časová osa s popisky v celých hodinách 00, 06, 12, 18 a jemnými svislými čarami.
  - Popisky v grafu 11 px; legenda se nekreslí (uživatel 25. 10.: „popisky jsou zbytečné“), pruhy Topení a Klimatizace mají vlastní popisek nad sebou a čáry s plochami se vysvětlují samy. Časové popisky osy jsou v 12 / 24 h podle profilu.
  - Prohlížení: přejetím prstem (nebo najetím myší) po grafu se ukáže svislá čára s bodem na křivce a řádek údajů ukazuje hodnoty v tom čase; po zvednutí prstu se vrátí na „Teď“. Svislé posouvání popupu funguje dál. Z klávesnice (graf je zaměřitelný) šipky vlevo / vpravo po 15 min, Home začátek, End teď.
  - Načítání, chyba a „Za posledních 24 hodin nejsou k dispozici data“ mají vlastní text. Dole odkaz „Detail teploty“ na standardní detail entity.
- Společný 24h graf CO₂/PM2.5 se nevrací; CO₂ a PM2.5 otevírají standardní detail entity.
- Mikrotrendy (jen CO₂, PM2.5 a teplota; umístění viz Room Card; klepnutí viz Klikací akce): posledních 120 minut, 12 vzorků (obojí v konfiguraci: `trends.minutes`, `trends.samples`); bez viditelných os, popisků, rámečku, bublin a interakce; každý jednou jemnou barvou (CO₂ šalvějová zelená, PM2.5 levandulová, teplota broskvová), tenká čára s velmi jemnou plochou pod ní a tečkou na posledním vzorku, doleva se ztrácí; na první pohled patrné zlepšování / zhoršování / stabilita.
- Do prvního načtení historie je místo mikrotrendu jemná tečkovaná linka, která pomalu pulzuje (při „omezit pohyb“ stojí); bez historie se mikrotrend nezobrazí (TODO P2.4).
- Čtečka obrazovky u CO₂, PM2.5 a trendu teploty řekne „za 2 hodiny stoupá / klesá / stabilní“ (období podle `trends.minutes`); práh je polovina kroku osy (0,5 °C, 50 ppm, 2,5 µg/m³) mezi prvním a posledním vzorkem (TODO P2.5).
- Společná osa: všechny mikrotrendy jedné veličiny mají v celém domě stejnou svislou osu, takže stejná hodnota leží ve všech místnostech ve stejné výšce a místnosti jdou porovnat. Rozsah osy = minimum a maximum všech vzorků dané veličiny ze všech místností za zobrazené období, zaokrouhlené dolů a nahoru na krok: teplota 1 °C, CO₂ 100 ppm, PM2.5 5 µg/m³ (v konfiguraci `trends.temperature_step`, `trends.co2_step`, `trends.pm25_step`). Jsou-li všechny vzorky stejné celé číslo kroku, osa se rozšíří o jeden krok na každou stranu (čára je uprostřed). Příklad: jedna místnost 22–23 °C, druhá 20–21 °C → osa 20–23 °C; první leží v horní části, druhá ve spodní. Osa se nikdy nenormalizuje na jednu místnost.

## Klikací akce

| Klepnutí na | Výsledek |
|---|---|
| teplota (i mikrotrend) | popup „Historie místnosti – 24 h“ |
| vlhkost, okno (místnost s jedním oknem) | standardní detail entity (`more-info`) s grafem historie |
| okno (místnost se dvěma a více okny) | popup „Okna“ se stavem každého okna; řádek otevře detail entity |
| název místnosti s `link` | otevře cestu v Home Assistantu nebo webovou adresu |
| CO₂ + PM2.5 (hodnoty i mikrotrendy, jeden cíl) | popup „Kvalita vzduchu“ s odkazem na detail každé veličiny; s jediným čidlem rovnou jeho detail |
| panel žaluzie | standardní ovládání krytu (`current_position`, `current_tilt_position`) |
| řádky Topení a Klimatizace (jeden cíl) | popup s ovládáním primárního systému a přepínačem na druhý (viz Ovládání Topení a Klimatizace) |
| preset žaluzie (dvojité klepnutí nebo dlouhý stisk) | zavolá skript `covers.script` (výchozí `script.zaluzie_posun`) s daty `entity` (žaluzie této místnosti), `pos` a `tilt`; ovlivní jen žaluzii dané místnosti; jednoduché klepnutí jen ukáže nápovědu |

- Klepnutí na hodnotu nic nepřepíná.

## Vizuální pravidla

- Jednotná velikost napříč kategoriemi a řádky (CO₂, PM2.5, Topení, Klimatizace, okno) i pro text stavu místnosti:
  - všechny ikony informačních řádků mají stejnou velikost (22 px);
  - všechny hodnoty a popisky (656, 2, Plán, Vypnuto, Otevřeno, Příjemné …) mají stejnou velikost písma (15 px);
  - všechny jednotky a doplňky hodnot (ppm, µg/m³, „· 21 °C“) mají tutéž velikost jako hodnoty a liší se jen sekundární šedou barvou.
- Primární HVAC řádek se od druhého liší jen řezem písma (polotučně, když systém běží), ne velikostí ani výškou řádku. Číslo CO₂ a PM2.5 je polotučné stejně jako „Plán“ (řez 500), jednotka je běžná.
- Vlastní hierarchii mají jen název místnosti, teplota (s jednotkou „°C“) a vlhkost.
- Všechny informační řádky (CO₂, PM2.5, Topení, Klimatizace, okno) mají ikonu ve stejném sloupci; hodnoty a texty řádků začínají ve stejné svislici.
- Řádek, který nemá data, zachová svou ikonu a zobrazí „––“.
- Normální stav nemá dominantní zelenou. Vypnuto je šedé. Topení Ručně je zřetelně zvýrazněné.
- Okno: jeden řádek Zavřeno / Otevřeno i u místnosti se dvěma a více okny (24. 10. večer; klíč `window` přijme seznam), vysoký 32 px, může se pro popisek s dobou otevření a tečkou konfliktu rozšířit doprava do prázdné buňky vedle sebe. U otevřeného okna je za popiskem slabě (sekundární šedá `#9A9AA0`, běžný řez) doba, jak dlouho je otevřené, podle `last_changed` stavu okna: „Otevřeno · 12 min“, „· 1 h 5 min“, „· 2 d 3 h“, do minuty „· < 1 min“ (nejvýš dvě jednotky, nulová druhá se vynechá). Doba se přepočítává každých 30 s, dokud je nějaké okno otevřené. Zavřené a neznámé okno dobu nemá. Čtečka ji řekne slovy („otevřené 1 hodina 5 minut“). Zdroj stavu okna je výhradně IKEA MYGGBETT. Otevřené okno je světle modré (barva oblohy, testovací `#64D2FF`) včetně ikony, zavřené je šedé. Při konfliktu (viz Konflikty) je hned za popiskem jemná oranžová tečka (6 px, `#FF9F0A`), která nahradí oddělovač „·“ před dobou („Otevřeno ● 12 min“); když se řádek na úzké kartě nevejde, ustoupí doba, tečka zůstane (24. 10. večer, dřív byla tečka až za dobou).
- Více oken v místnosti: řádek ukazuje souhrn. Je-li otevřené aspoň jedno okno, je místnost „otevřená“: popisek „Otevřeno“ při jednom otevřeném, „Otevřena 2“ (počet) při dvou a více; doba je doba nejdéle otevřeného okna. Jsou-li všechna okna zavřená, „Zavřeno“. Není-li žádné otevřené a aspoň jedno je neznámé, „––“ (neznámé se nikdy nebere jako zavřené). Konflikty a souhrn domu berou místnost jako otevřenou, když je otevřené kterékoli okno. Čtečka řekne názvy otevřených oken, např. „okno Balkon otevřené 12 minut“ nebo „otevřená okna Okno, Balkon, nejdéle 12 minut“, a u zavřených „všechna okna zavřená“. Okno má volitelné jméno (`name`, výchozí „Okno 1“, „Okno 2“ … v jazyce karty), které se ukáže v popupu Okna.
- Žádné slovní stavy žaluzií, žádná procenta u žaluzií a vytápění.

## Barvy

- Dva barevné režimy (24. 10. večer): **tmavý** je dosavadní paleta beze změny (všechny hodnoty níže), **světlý** je samostatná paleta (viz Světlý režim). Režim určuje klíč `theme`: `auto` (výchozí) podle Home Assistantu – jeho skutečně použitého tmavého režimu, který při volbě motivu „Automaticky“ v profilu sleduje nastavení systému (na iPhonu Vzhled: Světlý / Tmavý / Automaticky); není-li ho z Home Assistantu možné zjistit, podle systému (`prefers-color-scheme`). `dark` a `light` režim vynutí. Přepnutí proběhne hned, bez obnovení stránky. Nadpis a venkovní podmínky nad kartami používají barvy textu motivu Home Assistantu.
- Pouze testovací paleta (není finální; ověřit kontrast, čitelnost venku a vzhled na OLED): spuštěná žaluzie šampaňská `#E8D9B5` při 50 % (kolejnice 70 %), okno za žaluzií a otevřené okno obloha `#64D2FF`, vedlejší texty `#9A9AA0`, Klimatizace OFF `#8E8E93`, zavřené žaluzie `#6B6B70`, ikona CO₂ a její mikrotrend šalvějová zelená `#8FBF9F`, ikona PM2.5 a její mikrotrend levandulová `#A59DCF`, mikrotrend teploty broskev `#FFB36B`. Vlhkost je neutrální (`#C7C7CC`), dokud nerozhodne o stavu místnosti; ikony CO₂/PM2.5 bez dat jsou šedé `#8E8E93`.
- Ikony předvoleb žaluzií jsou tmavě šedé `#6F6F74`; ikona odpovídající stavu žaluzie je tlumená šampaňská `#C9C0A8`, bez podbarvení. Nedostupná žaluzie: šedá `#6F6F74` při 55 % neprůhlednosti.
- Oranžová = varování (CO₂ 1000+, PM2.5 15+), červená = kritické (CO₂ 1500+, PM2.5 35+). V popupu Kvalita vzduchu je červená světlejší `#FF6961`, aby na světlejším podkladu voleb měla kontrast aspoň 4,5 : 1.
- Neznámá hodnota není nikdy červená ani alarm.
- Štítky souhrnu domu: podklad je barva štítku na 14 % přes tmavé pozadí, text a ikona v barvě štítku (okna obloha `#64D2FF`, Ručně, Topí a konflikty oranžová `#FF9F0A`, Klimatizace modrá `#64D2FF`).
- Ostatní barvy (režimy Klimatizace, Plán/Ručně) nejsou v Memory rozhodnuty, kromě pravidel výše: Větrání = barva Plánu; běžící Klimatizace ≠ OFF.

### Světlý režim

Stejné významy barev jako v tmavém režimu, tmavší odstíny, aby na bílém podkladu měl každý text kontrast aspoň 4,5 : 1 a ikony a čáry aspoň 3 : 1 (kontroluje test axe-core). Návrh 24. 10. večer, čeká na potvrzení na displeji:

| Význam | Tmavý | Světlý |
|---|---|---|
| karta místnosti, popup | `#1C1C1E` (karta s přechodem od `#232326`) | `#FFFFFF`, jemný okraj a stín |
| hlavní text, křivka teploty | `#FFFFFF` | `#1C1C1E` |
| vedlejší text, jednotky | `#9A9AA0` | `#6C6C70` |
| Vypnuto, bez dat | `#8E8E93` | `#6E6E73` |
| vlhkost (neutrální) | `#C7C7CC` | `#48484A` |
| Plán, Větrání | `#F2F2F7` | `#3A3A3C` |
| Topení Vypnuto v grafu | `#6B6B70` | `#C7C7CC` |
| varování, Ručně, topí | `#FF9F0A` | `#A85200` |
| kritické | `#FF453A` (v popupu `#FF6961`) | `#C4001A` |
| obloha: okno, Chladno, chlazení, vlhkost v grafu, odkazy | `#64D2FF` | `#006B9C` |
| Sušení | `#FFD60A` | `#7A5E00` |
| Auto | `#BF5AF2` | `#8944AB` |
| CO₂ | `#8FBF9F` | `#3D7A55` |
| PM2.5 | `#A59DCF` | `#6158A8` |
| mikrotrend teploty | `#FFB36B` | `#B8641C` |
| předvolba žaluzie / svítící | `#6F6F74` / `#C9C0A8` | `#8E8E93` / `#7A5C2E` |
| spuštěná žaluzie / okno za ní | `#E8D9B5` 50 % / `#64D2FF` 28 % | `#8F7A52` 60 % / `#006B9C` 16 % |
| ilustrace bedroom / office / kids / living | `#A5A1F2` / `#7FC8F8` / `#FFB36B` / `#E8D9B5` | `#6F67D6` / `#2C8BC9` / `#D9822B` / `#A88F5C` |

- Štítky souhrnu domu ve světlém režimu: podklad je barva štítku na 10 % přes bílou (v tmavém 14 % přes `#1C1C1E`), text a ikona v barvě štítku.
- Barvy jsou CSS proměnné karty (`--kd-…`); tmavý režim je výchozí sada, světlý ji přepíše.

## Chybějící data

- Stav `unavailable` / `unknown` / neexistující entita: řádek zachová ikonu a zobrazí „––“, neutrálně, bez alarmu.
- Chybí-li nezbytná data, stav místnosti je „Bez dat“ doplněné o první chybějící nebo zastaralý údaj v pořadí teplota, vlhkost, CO₂, PM2.5, režim domu (např. „Bez dat · režim domu“, „Bez dat · CO₂ (před 2 h)“), aby bylo jasné, co doplnit. Nezbytná data jsou teplota, vlhkost, CO₂, PM2.5 a House Mode; CO₂ a PM2.5 jen tehdy, když je místnost má (`carbon_dioxide: false` nebo `pm25: false` znamená, že místnost čidlo nemá, takže chybějící hodnota není „Bez dat“).
- Chybějící CO₂ nebo PM2.5 zobrazuje „––“ s ikonou řádku. Vynechaný klíč `carbon_dioxide` / `pm25` je chybějící čidlo (řádek „––“, stav „Bez dat“); `false` znamená, že místnost čidlo nemá (řádek se nezobrazí, viz Room Card).
- Zastaralá data (TODO P2.3): měření místnosti (teplota, vlhkost, CO₂, PM2.5), které senzor nenahlásil déle než `thresholds.stale_minutes` (výchozí 30 min), se zobrazí šedě (`#8E8E93`), nikdy oranžově ani červeně; ikona CO₂/PM2.5 je šedá, mikrotrend ztlumený na 35 %, nápověda a čtečka řeknou „naposledy před 45 min“. Za zastaralou hodnotou stojí malý šedý symbol hodin (25. 10.; u teploty, vlhkosti, CO₂ i PM2.5, skrytý před čtečkou, která čte „naposledy před …“). Pro stav místnosti se bere jako chybějící: „Bez dat · CO₂ (před 2 h)“. PM2.5 přesně 0 µg/m³ je čistý vzduch, ne chybějící údaj: nikdy se neoznačí jako zastaralé ani jako „Bez dat“ (uživatel 25. 10.), i když sensor dlouho nehlásí změnu.
- Čas posledního hlášení = novější z `last_updated` (stav v kartě) a `last_reported` z REST stavu entity (`GET /api/states/<entity_id>`), načítaného spolu s mikrotrendy každých 5 minut. Stav posílaný kartám `last_reported` neobsahuje a `last_updated` se při opakovaném hlášení stejné hodnoty nemění; bez REST odpovědi se proto nic neoznačí jako zastaralé.
- Chybějící entity se zjišťují konkrétním dotazem přes Template; ID se nikdy neodhadují.

## Jazyky

- Karta mluví česky, švédsky a anglicky (uživatel 25. 10.: „K dispozici bude angličtina, švédština a čeština. Podle jazyka Home Assistantu. Pokud nebude CZ/SE, tak bude EN.“). Jazyk karty je jazyk Home Assistantu z profilu uživatele (`hass.locale.language`, jinak `hass.language`): čeština → česky, švédština → švédsky, jakýkoli jiný jazyk i žádný → anglicky. Změna jazyka v profilu se projeví hned, bez obnovení stránky. Klíč `language` (`cs`, `sv`, `en`; výchozí `auto`) jazyk karty vynutí. Hostitelský prvek karty má atribut `lang` jazyka karty, aby čtečka obrazovky četla správným hlasem i tehdy, když je Home Assistant v jiném jazyce.
- Přeloženo je všechno, co karta sama píše nebo říká čtečce obrazovky: stavy, popisky řádků, souhrn domu, venkovní podmínky, popupy, graf historie, nápovědy, hlášky a popisy pro čtečku. Nepřekládají se texty z konfigurace (nadpis, názvy místností, oken a předvoleb, popisy předvoleb) a názvy předvoleb klimatizace (Sleep, WindFree …). Bez textu v konfiguraci platí výchozí v jazyce karty: nadpis Domov / Hem / Home, okno Okno 1 / Fönster 1 / Window 1, předvolby podle ikony Den / Dag / Day, Stín / Skugga / Shade, Tma / Mörker / Dark.
- Čísla, čas a data podle profilu Home Assistantu (25. 10.; `hass.locale`, stejně jako vlastní karty): formát čísel `language` (výchozí, podle jazyka), `system` (jazyk prohlížeče), pevné `comma_decimal`, `decimal_comma`, `space_comma`, `quote_decimal` a `none`; čas `language`, `system`, `12`, `24`; datum `language`, `system`, `DMY`, `MDY`, `YMD`. Bez profilu platí jazyk karty: česky a švédsky „20,4 °C“ a „46 %“, anglicky „20.4 °C“ a „46%“ (mezeru před % určuje jazyk, jak ji píše Home Assistant); CO₂ a PM2.5 se oddělovačem tisíců („1 640“, anglicky „1,640“). Den a měsíc „24. 10.“ / „24/10“ / „10/24"; čas česky a švédsky 24hodinový, anglicky 12hodinový s AM / PM, osa grafu v celých hodinách („6 PM“). Časové pásmo se neřídí profilem, ale hodinami Home Assistantu / prohlížeče. Značky jednotek (°C, %, ppm, µg/m³, min, h, d) jsou ve všech jazycích stejné.
- Hlavní pojmy (čeština / švédština / angličtina): Topení / Värme / Heating, Klimatizace / Luftkonditionering / Air conditioning, Plán / Schema / Schedule, Ručně / Manuell / Manual, Vypnuto / Av / Off, Příjemné / Behagligt / Comfortable, Chladno / Kyligt / Chilly, Teplo / Varmt / Warm, Vydýchaný vzduch / Instängd luft / Stuffy air, Znečištěný vzduch / Förorenad luft / Polluted air, Bez dat / Inga data / No data, žaluzie / persienn / blind. Úplné znění je v `src/translations/`.
- Každá změna, která přidá nebo upraví text karty, upraví v téže změně všechny tři jazyky (uživatel 25. 10.: „při dalších změnách se musí aktualizovat i všechny různé překlady“). Zdrojem je čeština (`src/translations/cs.ts`); švédština a angličtina mají přesně stejné klíče, jinak se karta nesestaví. Testy hlídají, že ve švédštině ani v angličtině nezůstal žádný český text a že se delší texty vejdou na všech šířkách.

## Konfigurace

Vše nastavitelné je v YAML konfiguraci karty (24. 10. večer: „všechny proměnné do konfigurace“). Každý klíč je volitelný a bez něj platí výchozí hodnota, takže dosavadní konfigurace funguje beze změny. Klíč bez hodnoty (v YAML např. `link:`, tedy null) znamená totéž co chybějící klíč. Příklad `examples/domov_prototyp_loznice.yaml` obsahuje úplně všechna nastavení (24. 10. večer, uživatel: „Musí tam být kompletně všechny nastavení“): nahoře společnou část pro celý dům s výchozími hodnotami, pod ní místnosti, každou se všemi klíči (neznámá ID a nastavení, která se nemají lišit od společných, jsou prázdná). Test hlídá, že v příkladu žádný klíč nechybí a že jeho hodnoty jsou výchozí. Chybná hodnota zastaví kartu srozumitelnou chybou (název klíče a co se čeká), nikdy se tiše neignoruje. Rozměry, animace, gesta a barvy zůstávají v kódu (barvy jsou CSS proměnné karty `--kd-…`, viz Barvy).

Společné pro všechny místnosti:

| Klíč | Výchozí | Význam |
|---|---|---|
| `title` | `Domov` (v jazyce karty) | nadpis; `""` ho vynechá |
| `theme` | `auto` | barevný režim: `auto` (podle Home Assistantu / systému), `dark`, `light` |
| `language` | `auto` | jazyk karty: `auto` (podle Home Assistantu: čeština, švédština, jinak angličtina), `cs`, `sv`, `en` (viz Jazyky) |
| `house_mode_entity` | `input_select.house_mode` | entita režimu domu |
| `house_modes.winter`, `house_modes.summer` | `Zima`, `Léto` | hodnoty režimu domu |
| `thresholds.humidity_min`, `humidity_max` | 35, 70 | Sucho pod, Vlhko nad (%) |
| `thresholds.co2_warning`, `co2_critical` | 1000, 1500 | ppm |
| `thresholds.pm25_warning`, `pm25_critical` | 15, 35 | µg/m³ (i venkovní vzduch) |
| `thresholds.winter_min`, `winter_max` | 20, 24 | komfortní pásmo v zimě (°C) |
| `thresholds.summer_min`, `summer_max` | 21, 25 | komfortní pásmo v létě (°C) |
| `thresholds.stale_minutes` | 30 | po kolika minutách bez hlášení je měření zastaralé |
| `thresholds.heating_waves_2`, `heating_waves_3` | 35, 68 | od kolika % intenzity vytápění dvě a tři vlny |
| `trends.minutes` | 120 | délka mikrotrendů (10–1440 min) |
| `trends.samples` | 12 | počet bodů mikrotrendu (2–120) |
| `trends.temperature_step`, `co2_step`, `pm25_step` | 1, 100, 5 | krok společné osy mikrotrendů (zároveň nejmenší rozsah a polovina je práh „stoupá / klesá“) |
| `history.hours` | 24 | délka popupu Historie místnosti (1–168 h) |
| `history.night_start`, `night_end` | 22, 6 | noc v grafu historie (celé hodiny 0–23) |
| `history.min_temperature_span` | 1,5 | nejmenší rozsah osy teploty v grafu (°C) |
| `covers.script` | `script.zaluzie_posun` | skript předvoleb (pole `entity`, `pos`, `tilt`) |
| `covers.tolerance` | 5 | tolerance shody s předvolbou (± %) |
| `covers.stall_seconds` | 5 | po kolika s beze změny skončí pulzování předvolby |
| `covers.presets` | Den 100/100, Stín 0/100, Tma 0/0 | 1–3 předvolby (`position`, `tilt`, volitelně `name`, `icon`, `description`) |
| `outside.temperature`, `minimum`, `maximum`, `rain_probability`, `pm25` | – | entity hlavičky |

Pro místnost (`rooms[]`):

| Klíč | Výchozí | Význam |
|---|---|---|
| `name` | povinný | název místnosti |
| `image` | podle názvu | `bedroom`, `office`, `kids`, `living`, `none`, nebo adresa obrázku (`/local/…`, `/hacsfiles/…`, `https://…`); starší název klíče `scene` |
| `link` | – | klepnutí na název: cesta v Home Assistantu (`/lovelace/loznice`) nebo `https://…` |
| `temperature`, `humidity` | – | entity čidel místnosti |
| `carbon_dioxide`, `pm25` | – | entita čidla; `false` = místnost čidlo nemá |
| `window` | – | entita okna, nebo seznam (`- binary_sensor.x` nebo `- entity: binary_sensor.x` + `name: Balkon`) |
| `cover` | – | entita žaluzie |
| `cover_presets` | `covers.presets` | předvolby jen pro tuto žaluzii |
| `thresholds` | společné | vybrané prahy jen pro tuto místnost |
| `heating.climate`, `overlay`, `target`, `intensity` | – | entity Topení |
| `air_conditioner` | – | entita Klimatizace |

- Kontroly: prahy jsou čísla a jdou vzestupně (min < max, varování < kritické, `heating_waves_2` < `heating_waves_3`, obojí 1–100); `trends`, `history` a `covers` v uvedených mezích; `language` jen `auto`, `cs`, `sv`, `en`; předvolba má `position` a `tilt` 0–100; `icon` jen `open`, `shade`, `dark`; `covers.script` je entita `script.…`; `link` začíná `/` nebo `http(s)://`; obrázek je jeden z vestavěných názvů, nebo adresa začínající `/`, `http(s)://` nebo `data:image/`; `window` nesmí být prázdný seznam a entity se v místnosti neopakují; `image` a `scene` zároveň nejdou; názvy místností jsou jedinečné. Neznámý klíč místnosti nebo sekcí `thresholds`, `trends`, `history`, `covers`, `house_modes`, `outside` je chyba (překlep se neztratí); neznámé klíče na horní úrovni karty se tolerují, protože tam Home Assistant přidává vlastní (např. `grid_options`, `view_layout`).
