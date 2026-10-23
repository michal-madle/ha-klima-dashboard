# CURRENT_SPEC – Domov (Klima Dashboard)

Jediný zdroj pravdy o chování a vzhledu. Obsahuje pouze platná rozhodnutí. Entity jsou v `ENTITY_MAP.md`, historie v `DESIGN_HISTORY.md`.
Co není v Memory rozhodnuto, je uvedeno v sekci „Chybějící data“ a v `AUDIT.md`; nic z toho se nedomýšlí.

## Cíl projektu

- Rychlý stavový přehled domu na mobilu (iPhone 14 Pro), ne technický monitoring. Stav je důležitější než číslo.
- Pět místností, vlastní karta (custom card) hostovaná na GitHubu přes HACS, laděná uživatelem.
- Priority: pohodlí v místnosti, HVAC (Klimatizace + Topení), žaluzie (stejně důležité jako HVAC), okna. Historie jen v detailu.
- Nikdy se nic nepřepíná ani nevypíná z karty klepnutím na hodnotu; karta nic nevypíná sama.

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
- Hlavička karty: název místnosti + stav místnosti, přes celou šířku.
- Vlevo informační řádky v tomto pořadí: teplota + vlhkost (vedle sebe) → CO₂ → PM2.5 → první HVAC řádek → druhý HVAC řádek → okno.
- Vpravo panel žaluzie (viz Žaluzie), začíná u řádku CO₂ a končí u řádku okna; nezasahuje do hlavičky ani k bloku teplota/vlhkost.
- Teplota je dominantní; vlhkost vedle ní je sekundární, ve velikosti navazující na „°C“. Formát: „20,4 °C  46 %“, české formátování čísel.
- Teplota, vlhkost, CO₂ a PM2.5 pocházejí výhradně z IKEA ALPSTUGA. Teplota z Topení se pro kartu nepoužívá (Topení měří u radiátoru pod oknem).
- CO₂ a PM2.5 mají ikonu a popisek. Číslo se barví jen při překročení prahu.
- Mikrotrendy (viz Historie a grafy): CO₂ a PM2.5 vedle hodnoty ve svém řádku; teplota jedním mikrotrendem napravo od řádků Topení a Klimatizace, přes výšku obou těchto HVAC řádků (pod řádky CO₂ a PM2.5).

## HVAC logika

- Každá karta má vždy oba HVAC řádky: Topení (vytápění) a Klimatizace (chlazení a ostatní režimy).
- Pořadí a váhu řádků určuje House Mode, nikoli to, který systém právě běží.
- Topení je jediný zdroj vytápění. Klimatizace je primární chlazení.
- Stav HVAC se čte z ikony a její barvy; všechny ikony mají stejnou velikost.

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

## Žaluzie

- Ložnice, Pracovna, Maxík, Mikuláš mají žaluzie (Shelly); Obývák nemá.
- Poloha: 100 % = otevřeno (nahoře), 0 % = zavřeno (dole). Naklopení: 100 % = lamely otevřené (vodorovně), 0 % = zavřené (svisle).
- Panel je jeden svislý sloupec, miniatura reálné žaluzie viděné zevnitř; bez rámečku, textu, procent, popisků a slovních stavů.
- Šířka ≈ původní dvojice ukazatelů zvětšená o 20–30 %. Stálý počet lamel.
- Naklopení mění jen tloušťku lamel: 0 % téměř splývají v plnou plochu (tenká mezera), 100 % velmi tenké linky s mezerami.
- Poloha dělí sloupec: spuštěná horní část 100 % neprůhledná, dolní část představuje okno a zachovává strukturu lamel při 20 % neprůhlednosti. Poloha 100 % = zvýrazněna jen horní linka; poloha 0 % = zvýrazněno celé shora dolů.
- Neznámá poloha nebo naklopení = přerušovaná silueta panelu; nikdy se nebere jako 0.
- Panel je pouze zobrazení; klepnutí otevře standardní ovládání krytu.
- Nad zobrazením žaluzie jsou 4 tlačítka s "presety" stavů. 0/0 - uplně zatemněno, 35/60 částečně povysunuto (ranní prosvětlení), 0/100 - sjeté dolů, ale otevřené lamely, 100/100 vysunuté nahoru. Texty: Tma (0/0), Ráno (35/60), Stín (0/100), Den (100/100). Rozložení 2×2 v šířce panelu žaluzie. Tlačítka jsou první verze a po vyzkoušení se mohou upravit (velikost, texty). Poloha/naklopení v %.

## Detail místnosti

- Karta nemá vlastní popup s ovládáním. Detail tvoří tři zobrazení otevíraná klepnutím (viz Klikací akce): historie místnosti, graf CO₂/PM2.5 a standardní ovládání žaluzie.

## Historie a grafy

- „Historie místnosti – 24 h“ (inspirace iOS aplikací pro ovládání topení): plošné šedé pozadí + hlavní křivka teploty; modrá přerušovaná křivka vlhkosti; dole časové vrstvy Topení (Plán / Ručně / Vypnuto) a Klimatizace (barvy podle režimu); intenzita vytápění jako intenzita výplně 0–3 vln mezi časovou vrstvou a křivkou teploty.
- CO₂ a PM2.5: jeden společný 24h graf.
- Mikrotrendy (jen CO₂, PM2.5 a teplota): CO₂ a PM2.5 bezprostředně za hodnotou ve stejném řádku, teplota jedním mikrotrendem napravo od řádků Topení a Klimatizace přes jejich výšku; posledních 120 minut, 12 vzorků, normalizace na lokální minimum/maximum zobrazeného období; bez os, popisků, rámečku, bublin a interakce; jedna jemná barva; na první pohled patrné zlepšování / zhoršování / stabilita.

## Klikací akce

| Klepnutí na | Výsledek |
|---|---|
| teplota | „Historie místnosti – 24 h“ |
| panel žaluzie | standardní ovládání krytu (`current_position`, `current_tilt_position`) |
| CO₂ nebo PM2.5 | společný 24h graf |
| preset žaluzie | okamžitě zavolá `script.zaluzie_posun` s daty `entity` (žaluzie této místnosti), `pos` a `tilt`; ovlivní jen žaluzii dané místnosti |

- Klepnutí nic nepřepíná.

## Vizuální pravidla

- Jednotná velikost písma pro informační řádky (Topení, Klimatizace, okno, text stavu). Vlastní hierarchii mohou mít název místnosti, teplota, vlhkost a popisky CO₂/PM2.5.
- Řádek, který nemá data, zachová svou ikonu a zobrazí „––“.
- Normální stav nemá dominantní zelenou. Vypnuto je šedé. Topení Ručně je zřetelně zvýrazněné.
- Okno: jeden řádek Zavřeno / Otevřeno. Zdroj stavu okna je výhradně IKEA MYGGBETT.
- Žádné slovní stavy žaluzií, žádná procenta u žaluzií a vytápění.

## Barvy

- Pouze testovací paleta (není finální; ověřit kontrast, čitelnost venku a vzhled na OLED): otevřené žaluzie `#D8D8DC`, popisky `#9A9AA0`, Klimatizace OFF `#8E8E93`, zavřené žaluzie `#6B6B70`.
- Oranžová = varování (CO₂ 1000+, PM2.5 15+), červená = kritické (CO₂ 1500+, PM2.5 35+).
- Neznámá hodnota není nikdy červená ani alarm.
- Ostatní barvy (režimy Klimatizace, Plán/Ručně, vlhkost) nejsou v Memory rozhodnuty, kromě pravidel výše: Větrání = barva Plánu; běžící Klimatizace ≠ OFF; křivka vlhkosti modrá.

## Chybějící data

- Stav `unavailable` / `unknown` / neexistující entita: řádek zachová ikonu a zobrazí „––“, neutrálně, bez alarmu.
- Chybí-li nezbytná data, stav místnosti je „Bez dat“. Nezbytná data jsou teplota, vlhkost, CO₂, PM2.5 a House Mode.
- Chybějící CO₂ nebo PM2.5 zobrazuje „––“ s ikonou řádku.
- Chybějící entity se zjišťují konkrétním dotazem přes Template; ID se nikdy neodhadují.
