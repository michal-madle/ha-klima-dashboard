# CURRENT_SPEC – Domov (Klima Dashboard)

Jediný zdroj pravdy o chování a vzhledu. Obsahuje pouze platná rozhodnutí. Entity jsou v `ENTITY_MAP.md`, historie v `DESIGN_HISTORY.md`.
Co není v Memory rozhodnuto, je uvedeno v sekci „Chybějící data“ a v `AUDIT.md`; nic z toho se nedomýšlí.

## Cíl projektu

- Rychlý stavový přehled domu na mobilu (iPhone 14 Pro), ne technický monitoring. Stav je důležitější než číslo.
- Pět místností, vlastní karta (custom card) hostovaná na GitHubu přes HACS, laděná uživatelem.
- Priority: pohodlí v místnosti, HVAC (Klimatizace + Topení), žaluzie (stejně důležité jako HVAC), okna. Historie jen v detailu.
- Klepnutí na hodnotu nic nepřepíná ani nevypíná; karta nic nevypíná sama. Ovládat lze jen přes popup Topení / Klimatizace (viz Ovládání Topení a Klimatizace) a presety žaluzií.

## Dashboard Domov

- Jeden sloupec, bez vodorovného posouvání. Desktop není priorita.
- Obsah shora: titulek „Domov“ → hlavička s venkovními podmínkami → upozornění (jen pokud nějaká jsou) → karty místností. Pod kartami nic.
- Žádné globální grafy, měřidla, velké souhrnné statistiky ani samostatné panely vytápění/klimatizace.
- Pořadí karet: Ložnice, Pracovna, Maxík, Mikuláš, Obývák.
- Hlavička: aktuální venkovní teplota, denní minimum–maximum, pravděpodobnost deště, kvalita venkovního vzduchu (dobrý / zhoršený / špatný). Příklad: „8 °C · 2–10 °C · ☂ 60 %“ a „Vzduch venku: zhoršený“. Text Zima/Léto se v hlavičce nezobrazuje.
- Venkovní kvalita vzduchu vychází z PM2.5 ve stejné veličině jako ALPSTUGA (µg/m³), ne z AQI ani indexu. Preferovaný zdroj: Sensor.Community.
- Hranice venkovního vzduchu (návrh 23. 10., čeká na potvrzení; stejné hranice jako pro PM2.5 v místnosti): dobrý < 15 µg/m³, zhoršený 15–34, špatný ≥ 35. Hodnota 15 µg/m³ odpovídá 24hodinovému doporučení WHO z roku 2021. Chybí-li hodnota, zobrazí se „Vzduch venku: ––“.

## Room Card

- Všechny karty mají stejné rozložení. Obývák má stejné rozložení bez žaluzií (prázdné místo se akceptuje).
- Hlavička karty: název místnosti + stav místnosti, přes celou šířku. Název místnosti je největší text karty po teplotě (26 px, polotučně).
- Pod hlavičkou je blok teplota + vlhkost (vedle sebe, bez mikrotrendu) a pod ním tři sloupce zleva doprava: informační řádky | tlačítka předvoleb žaluzií | panel žaluzie. Informační řádky jsou v pořadí CO₂ → PM2.5 → první HVAC řádek → druhý HVAC řádek → okno; všechny mají stejnou výšku.
- Blok informačních řádků má dva stejně široké sloupce: vlevo ikony, hodnoty a popisky, vpravo mikrotrendy. Mikrotrend je tedy stejně široký jako levý sloupec s ikonami, hodnotami a popisky.
- Panel žaluzie (viz Žaluzie) začíná u řádku CO₂ a končí u řádku okna; má stejnou výšku jako informační řádky a nezasahuje do hlavičky ani k bloku teplota/vlhkost.
- Teplota je dominantní; vlhkost vedle ní je sekundární, ve velikosti navazující na „°C“. Formát: „20,4 °C  46 %“, české formátování čísel.
- Teplota, vlhkost, CO₂ a PM2.5 pocházejí výhradně z IKEA ALPSTUGA. Teplota z Topení se pro kartu nepoužívá (Topení měří u radiátoru pod oknem).
- CO₂ a PM2.5 mají jen ikonu, bez textového popisku. CO₂: ikona molekuly CO₂ (`mdi:molecule-co2`, schválená). PM2.5: vlastní ikona z rozptýlených teček různé velikosti, bez rámečku a bez textu. Obě ikony mají jemnou mátovou barvu (testovací `#5BD6B5`) jen tehdy, když řádek má hodnotu; bez dat jsou ikona i „––“ neutrálně šedé (bez barvy, bez mikrotrendu). Podle hodnoty se barva ikony nemění; číslo se barví jen při překročení prahu. Význam ikony čtečkám obrazovky sděluje `aria-label` řádku.
- Vlhkost je bez barvy (neutrální světle šedá); chybí-li, je „––“ šedé.
- Mikrotrendy (viz Historie a grafy) jsou na kartě právě tři, všechny v pravém sloupci informačních řádků, takže začínají na stejné svislici a jsou stejně široké: CO₂ a PM2.5 ve svém řádku, mikrotrend teploty vedle řádků Topení a Klimatizace a vysoký jako oba řádky dohromady (teplota je výsledkem vytápění a chlazení). Vedle řádku okna mikrotrend není.
- Text HVAC řádku se nikdy nezkracuje uprostřed čísla: když se na úzkém displeji nevejde celý, skryje se celá cílová teplota („· 21 °C“) a stav (Plán, Ručně, WindFree …) zůstane celý. Celý text řádku je vždy v `aria-label`.
- Detail hodnot: klepnutí na teplotu (i její mikrotrend), vlhkost, CO₂, PM2.5 a okno otevře standardní detail entity Home Assistantu (`more-info`) s grafem historie. Karta nemá vlastní grafy.
- Ilustrace místnosti: jemná čárová kresba v pravém horním rohu karty, v tónu `bedroom` `#A5A1F2`, `office` `#7FC8F8`, `kids` `#FFB36B`, `living` `#E8D9B5`, plynule zeslabená směrem k obsahu (maska + měkká záře). Je jen dekorativní (`aria-hidden`) a nepřekrývá text.
- Ilustrace se zobrazuje bez konfigurace: bez klíče `scene` se zvolí podle názvu místnosti (Ložnice → `bedroom`, Pracovna → `office`, Maxík a Mikuláš → `kids`, Obývák / Obývací pokoj → `living`; velikost písmen a diakritika nerozhodují). U jiného názvu se bez `scene` nezobrazí. Klíč `scene` (`bedroom`, `office`, `kids`, `living`) volbu přepíše, `scene: none` ilustraci vypne.

## HVAC logika

- Každá karta má vždy oba HVAC řádky: Topení (vytápění) a Klimatizace (chlazení a ostatní režimy).
- Pořadí a váhu řádků určuje House Mode, nikoli to, který systém právě běží.
- Topení je jediný zdroj vytápění. Klimatizace je primární chlazení.
- Stav HVAC se čte z ikony a její barvy; všechny ikony mají stejnou velikost.
- Řádky Topení, Klimatizace a okna jsou klikací (Topení a Klimatizace otevírají popup, okno detail entity). Řádky Topení a Klimatizace mají vždy ikonu: Topení 0–3 vlny, Klimatizace ikonu režimu. Ikona je vidět i při „Vypnuto“ (šedá) a při chybějících datech (přerušovaná, „––“).

## House Mode

- `input_select.house_mode`, pouze hodnoty Zima a Léto.
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
- Všechny prahy jsou v konfiguraci karty, nastaví se jednou a dál se nemění.

## Stavový systém

Stav místnosti je lidské zhodnocení prostředí, ne příkaz. Platí první splněná podmínka:

| # | Stav | Podmínka | Barva |
|---|---|---|---|
| 1 | Bez dat | chybí nezbytná data | neutrální |
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
- Stavy: Plán (Overlay Schedule), Ručně (ruční přepis / boost, zvýrazněný), Vypnuto.
- Při Vypnuto se zobrazí pouze „Vypnuto“, nikdy cílová teplota 5 °C. Vypnuto není problémový stav.
- U Plán a Ručně se zobrazí stav a cílová teplota.
- Intenzita vytápění (heating %) se zobrazuje ikonou 0–3 teplých vln, bez čísel a procent: 0 % = 0 vln, 1–34 % = 1, 35–67 % = 2, 68–100 % = 3. Meze jsou v konfiguraci.
- Předpověď otevřeného okna z Topení se ignoruje.

## Ovládání Topení a Klimatizace

- Klepnutí na řádek Topení nebo Klimatizace otevře popup (na mobilu spodní panel, na širokém displeji dialog uprostřed) s titulkem systému a názvem místnosti. Zavře se tlačítkem ✕, klepnutím mimo panel nebo klávesou Escape. Dole je odkaz „Detail a historie“, který popup zavře a otevře standardní detail `climate` entity.
- Volby vycházejí z atributů entity `hvac_modes` a `preset_modes`; karta nevolá režim, který entita nenabízí. Volba volá `climate.set_hvac_mode` nebo `climate.set_preset_mode`; popup zůstává otevřený a aktivní volba se podle stavu entity zvýrazní. Chyba služby se ukáže v popupu.
- Topení: Vypnuto (`off`), Plán (`auto`), Ručně (`heat`) a Boost (předvolba `boost`). Boost se nabízí jen tehdy, když entita předvolbu `boost` uvádí; jinak je volba vidět zašedlá s textem „entita nenabízí“. Mechanismus Boostu u integrace Topení není potvrzen (viz AUDIT.md).
- Klimatizace: režimy Vypnuto, Chlazení, Sušení, Větrání, Auto, Topení (podle `hvac_modes`) a předvolby podle `preset_modes` (Sleep, Boost, WindFree, WindFree Sleep; „none“ se nenabízí). Zvolit režim zároveň klimatizaci zapne. Opětovné zvolení aktivní předvolby ji zruší, pokud entita nabízí předvolbu `none`.
- Dotykové cíle voleb mají nejméně 44 px na výšku.

## Žaluzie


- Ložnice, Pracovna, Maxík, Mikuláš mají žaluzie (Shelly); Obývák nemá. Panel i tlačítka předvoleb se zobrazí jen u místnosti, která má v konfiguraci karty entitu `cover`.
- Poloha: 100 % = otevřeno (nahoře), 0 % = zavřeno (dole). Naklopení: 100 % = lamely otevřené (vodorovně), 0 % = zavřené (svisle).
- Panel je jeden svislý sloupec, miniatura reálné žaluzie viděné zevnitř; bez rámečku, textu, procent, popisků a slovních stavů.
- Výška panelu = výška informačních řádků (od řádku CO₂ po řádek okna). Šířka panelu je 60 px (na užších displejích 52 px); na šířce mikrotrendů nezávisí. Stálý počet lamel.
- Naklopení mění jen tloušťku lamel: 0 % téměř splývají v plnou plochu (tenká mezera), 100 % velmi tenké linky s mezerami.
- Poloha dělí sloupec: spuštěná horní část (žaluzie) je 100 % neprůhledná, dolní část představuje okno, zachovává strukturu lamel a je v barvě oblohy při přibližně 28 % neprůhlednosti. Poloha 100 % = zvýrazněna jen horní linka; poloha 0 % = zvýrazněno celé shora dolů.
- Neznámá poloha nebo naklopení = přerušovaná silueta panelu; nikdy se nebere jako 0.
- Panel je pouze zobrazení; klepnutí otevře standardní ovládání krytu.
- Vlevo od panelu žaluzie je jeden sloupec tří kulatých tlačítek s předvolbami (ve stylu ovládání Shelly: kruh s okrajem a glyf žaluzie), rozložených přes výšku panelu, v pořadí shora dolů Tma, Stín, Den. Tlačítka mají jen ikonu, bez textu; název je v `aria-label` a v `title`. Glyf je horní kolejnice žaluzie: Den jen kolejnice (vytaženo), Stín kolejnice a řídké čáry (lamely otevřené), Tma kolejnice a husté tlustší čáry (zavřeno). Hodnoty jsou poloha / naklopení v %:

| Pořadí | Tlačítko | Ikona | Poloha / naklopení | Význam |
|---|---|---|---|---|
| 1 | Tma | kolejnice + husté čáry | 0 / 0 | úplné zatemnění |
| 2 | Stín | kolejnice + řídké čáry | 0 / 100 | sjeté dolů, lamely otevřené |
| 3 | Den | jen horní kolejnice | 100 / 100 | vysunuto nahoru |

- Předvolba se odešle až **dvojitým klepnutím (do 400 ms) nebo dlouhým stiskem (550 ms)**; jednoduché klepnutí nic neodešle. Během držení se kolem tlačítka vyplňuje kroužek (zpětná vazba pro dlouhý stisk), po odeslání tlačítko krátce zableskne. Z klávesnice se předvolba odešle klávesou Enter nebo mezerník.
- Tlačítko, jehož hodnoty odpovídají aktuálnímu stavu žaluzie (tolerance ±2 %), má okraj a podklad v barvě své ikony.
- Předvolba Ráno (35 / 60) byla zrušena; Shelly ikony odpovídají třem polohám.

## Detail místnosti

- Karta nemá vlastní grafy ani vlastní detail hodnot: hodnoty, okno a žaluzie otevírají standardní detail entity Home Assistantu s historií. Vlastní popup má jen ovládání Topení a Klimatizace (viz Ovládání Topení a Klimatizace).

## Historie a grafy

- Vlastní 24h grafy („Historie místnosti – 24 h“, společný graf CO₂/PM2.5) byly nahrazeny standardním detailem entity s historií (viz Klikací akce).
- Mikrotrendy (jen CO₂, PM2.5 a teplota; umístění viz Room Card; klepnutí na ně otevře detail své entity): posledních 120 minut, 12 vzorků; bez viditelných os, popisků, rámečku, bublin a interakce; každý jednou jemnou barvou (CO₂ a PM2.5 mátová, teplota broskvová), tenká čára s velmi jemnou plochou pod ní a tečkou na posledním vzorku; na první pohled patrné zlepšování / zhoršování / stabilita.
- Společná osa: všechny mikrotrendy jedné veličiny mají v celém domě stejnou svislou osu, takže stejná hodnota leží ve všech místnostech ve stejné výšce a místnosti jdou porovnat. Rozsah osy = minimum a maximum všech vzorků dané veličiny ze všech místností za zobrazené období, zaokrouhlené dolů a nahoru na krok: teplota 1 °C, CO₂ 100 ppm, PM2.5 5 µg/m³. Jsou-li všechny vzorky stejné celé číslo kroku, osa se rozšíří o jeden krok na každou stranu (čára je uprostřed). Příklad: jedna místnost 22–23 °C, druhá 20–21 °C → osa 20–23 °C; první leží v horní části, druhá ve spodní. Osa se nikdy nenormalizuje na jednu místnost.

## Klikací akce

| Klepnutí na | Výsledek |
|---|---|
| teplota (i mikrotrend), vlhkost, CO₂, PM2.5, okno | standardní detail entity (`more-info`) s grafem historie |
| panel žaluzie | standardní ovládání krytu (`current_position`, `current_tilt_position`) |
| řádek Topení / Klimatizace | popup s ovládáním (viz Ovládání Topení a Klimatizace) |
| preset žaluzie (dvojité klepnutí nebo dlouhý stisk) | zavolá `script.zaluzie_posun` s daty `entity` (žaluzie této místnosti), `pos` a `tilt`; ovlivní jen žaluzii dané místnosti; jednoduché klepnutí nic neudělá |

- Klepnutí na hodnotu nic nepřepíná.

## Vizuální pravidla

- Jednotná velikost napříč kategoriemi a řádky (CO₂, PM2.5, Topení, Klimatizace, okno) i pro text stavu místnosti:
  - všechny ikony informačních řádků mají stejnou velikost (22 px);
  - všechny hodnoty a popisky (656, 2, Plán, Vypnuto, Otevřeno, Příjemné …) mají stejnou velikost písma (15 px);
  - všechny jednotky a doplňky hodnot (ppm, µg/m³, „· 21 °C“) mají tutéž velikost jako hodnoty a liší se jen sekundární šedou barvou.
- Primární HVAC řádek se od druhého liší jen řezem písma (polotučně, když systém běží), ne velikostí ani výškou řádku.
- Vlastní hierarchii mají jen název místnosti, teplota (s jednotkou „°C“) a vlhkost.
- Všechny informační řádky (CO₂, PM2.5, Topení, Klimatizace, okno) mají ikonu ve stejném sloupci; hodnoty a texty řádků začínají ve stejné svislici.
- Řádek, který nemá data, zachová svou ikonu a zobrazí „––“.
- Normální stav nemá dominantní zelenou. Vypnuto je šedé. Topení Ručně je zřetelně zvýrazněné.
- Okno: jeden řádek Zavřeno / Otevřeno. Zdroj stavu okna je výhradně IKEA MYGGBETT. Otevřené okno je světle modré (barva oblohy, testovací `#64D2FF`) včetně ikony, zavřené je šedé.
- Žádné slovní stavy žaluzií, žádná procenta u žaluzií a vytápění.

## Barvy

- Pouze testovací paleta (není finální; ověřit kontrast, čitelnost venku a vzhled na OLED): spuštěná žaluzie šampaňská `#E8D9B5`, okno za žaluzií a otevřené okno obloha `#64D2FF`, vedlejší texty `#9A9AA0`, Klimatizace OFF `#8E8E93`, zavřené žaluzie `#6B6B70`, ikony CO₂/PM2.5 a jejich mikrotrendy máta `#5BD6B5`, mikrotrend teploty broskev `#FFB36B`. Vlhkost je bez barvy (`#C7C7CC`); ikony CO₂/PM2.5 bez dat jsou šedé `#8E8E93`.
- Ikony předvoleb žaluzií mají každá svou barvu: Tma `#A5A1F2`, Stín `#7FC8F8`, Den `#FFD84A`.
- Oranžová = varování (CO₂ 1000+, PM2.5 15+), červená = kritické (CO₂ 1500+, PM2.5 35+).
- Neznámá hodnota není nikdy červená ani alarm.
- Ostatní barvy (režimy Klimatizace, Plán/Ručně) nejsou v Memory rozhodnuty, kromě pravidel výše: Větrání = barva Plánu; běžící Klimatizace ≠ OFF.

## Chybějící data

- Stav `unavailable` / `unknown` / neexistující entita: řádek zachová ikonu a zobrazí „––“, neutrálně, bez alarmu.
- Chybí-li nezbytná data, stav místnosti je „Bez dat“. Nezbytná data jsou teplota, vlhkost, CO₂, PM2.5 a House Mode.
- Chybějící CO₂ nebo PM2.5 zobrazuje „––“ s ikonou řádku.
- Chybějící entity se zjišťují konkrétním dotazem přes Template; ID se nikdy neodhadují.
