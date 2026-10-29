# Nápady – Klima Dashboard

Nápady a „nice to have“, ze kterých si vybíráte. **Není to TODO** (to je jen to, co rozpracované čeká na odpověď nebo ověření, `TODO.md`) a **není to zadání** (to je `CURRENT_SPEC.md`). Co si vyberete, dostane místo ve specifikaci a odtud se smaže (číslo se pak nepoužije znovu).

Vznik 29. 10. 2026 (zadání: vyždímat z dat a senzorů, co mám, co nejvíc užitku: přehled i kontrola). Hlavní karta místnosti je odsouhlasená a zůstává beze změny; nové věci patří do detailu místnosti, do upozornění a do automatizací. Vychází z exportů `HA entities/` (pět souborů), z `ENTITY_MAP.md`, `CURRENT_SPEC.md` a ze vzoru v repozitáři energie ([IDEAS.md](https://github.com/michal-madle/ha-energie-dashboard/blob/main/IDEAS.md)).

Pravidla:
- Čísla **KL1–KL33** jsou trvalá a nezávislá na C (`TODO.md`), N a E (karta Energie) a K (kit). Předponu **KL** (Klima) jsem zvolil místo „K“, protože K1–K3 už jsou body v `TODO.md` kitu a odkazuje se na ně ze `CURRENT_SPEC.md`. KL32 a KL33 jsou bývalé C11 a C12 z `TODO.md`.
- U každého nápadu: **Přínos** (★ až ★★★), **Náročnost** (S = hodina, M = večer, L = víc večerů nebo cizí komponenta), **Data** a případná **cena doplnění**. Stav dat: ✔ je v exportu, ＋ je potřeba doplnit, ? ověřit.
- **Ceny jsou odhady** (řádově), ne nabídky; před nákupem ověřit v e-shopu. U práce v softwaru je cena 0 Kč.
- Údaje v exportech jsou snímek v okamžiku exportu. Co je jen odvozené z názvu entity, je označeno „ověřit“. Nic z toho nebylo spuštěno na živém Home Assistantu.
- Výsledek nápadu je **důsledek vedle důsledku**, ne pokyn. Co děláte záměrně (například ignorování analytických senzorů Topení nebo vypnutý Early Start), tu se nehodnotí.

## Přehled

| Č. | Oblast | Nápad | Přínos | Nár. |
|---|---|---|---|---|
| [KL1](#kl1) | Detail | Vyvětrávací poradce: „stačí 4 minuty“ | ★★★ | M |
| [KL2](#kl2) | Historie | Pásmo „běžně“ za 28 dní v grafu historie | ★★★ | M |
| [KL3](#kl3) | Historie | Noční CO₂ a ranní souhrn ložnice | ★★★ | M |
| [KL4](#kl4) | Detail | Předpověď teploty a „co když“ | ★★★ | L |
| [KL5](#kl5) | Historie | Mapa týdne: hodina × den v pásmu pohody | ★★ | M |
| [KL6](#kl6) | Historie | „Včera v domě“: která místnost a proč | ★★★ | M |
| [KL7](#kl7) | Detail | Stínění podle slunce a předpovědi | ★★★ | L |
| [KL8](#kl8) | Data | Slunce na východní a západní straně zdarma z FVE | ★★★ | S |
| [KL9](#kl9) | Historie | Topení: vlnohodiny a stupňodny po místnostech | ★★ | M |
| [KL10](#kl10) | Historie | Rychlost chladnutí = izolace místnosti | ★★ | M |
| [KL11](#kl11) | Detail | Rosný bod a odstup od něj (vlastní výpočet) | ★★ | M |
| [KL12](#kl12) | Historie | Okno otevřené při topení a chlazení: kolik minut | ★★ | S |
| [KL13](#kl13) | Detekce | Panel zdraví čidel: baterie, spojení, mlčení | ★★★ | S |
| [KL14](#kl14) | Detekce | Topí naplno a teplota neroste | ★★ | M |
| [KL15](#kl15) | Detekce | Místnost, která nedosáhne cíle | ★★ | S |
| [KL16](#kl16) | Detekce | Žaluzie: plán proti skutečnosti, zdraví Shelly | ★★ | M |
| [KL17](#kl17) | Detekce | Odkud se vzal prach: robot a venkovní vzduch | ★★ | M |
| [KL18](#kl18) | Detekce | Topím kvůli jedné místnosti: krátké cykly okruhu | ★★ | M |
| [KL19](#kl19) | Detekce | Klimatizace: jak rychle ochladí, WindFree proti chlazení | ★★ | M |
| [KL20](#kl20) | Automatizace | Přepínač „vypnuto / upozornit / provádět“ u každého pravidla | ★★★ | S |
| [KL21](#kl21) | Automatizace | Upozornění na vyvětrání s důsledky | ★★ | S |
| [KL22](#kl22) | Automatizace | Předchlazení z přebytku FVE | ★★ | L |
| [KL23](#kl23) | Automatizace | Čas předtopení z naučené rychlosti | ★★ | L |
| [KL24](#kl24) | AI | „Zeptej se domu“: klima přes MCP | ★★★ | S |
| [KL25](#kl25) | AI | Denní a týdenní souhrn domu jako senzor | ★★★ | M |
| [KL26](#kl26) | AI | Popisky podle normy a vysvětlení události | ★★★ | M |
| [KL27](#kl27) | Hardware | CO₂ a PM2.5 tam, kde v mapě entit chybí | ★★★ | S |
| [KL28](#kl28) | Hardware | Venkovní teplota a vlhkost (entita počasí nebo vlastní čidlo) | ★★★ | S |
| [KL29](#kl29) | Hardware | Teplota povrchu okna nebo zdi (DS18B20) | ★★ | S |
| [KL30](#kl30) | Hardware | Příkon klimatizací | ★★ | M |
| [KL31](#kl31) | Hardware | Luxmetr z garáže jako spouštěč a kalibrace slunce | ★★ | S |
| [KL32](#kl32) | Vzhled | Tlačítko historie v popupu Topení / Klimatizace (bývalé C11) | ★★ | S |
| [KL33](#kl33) | Vzhled | Zavírací animace popupu (bývalé C12) | ★ | S |

Návody a koncepty k vybraným nápadům: [AI_MCP.md](./AI_MCP.md) (KL24–KL26), [FORECAST.md](./FORECAST.md) (KL2, KL4, KL7, KL26), [TYDEN.md](./TYDEN.md) (týdenní ladění), [tools/export_hodiny_klima.py](./tools/export_hodiny_klima.py) (export dat, na kterém stojí většina z nich).

---

## Co už máte v datech a karta nepoužívá

Nejrychlejší zisk; z toho vychází většina nápadů. Vše ✔ je v exportech `HA entities/`.

| Co | Entity | Pro |
|---|---|---|
| Baterie okenních čidel a napětí | `sensor.*_okno_*_battery` a `_battery_voltage`; v exportu Obývák (dveře zahrada) 34 %, Mikuláš 58 %, Pracovna 73 %, Ložnice a Maxík 84 % | KL13 |
| Baterie ventilů Topení | `binary_sensor.va…_baterie`, `sensor.*_tado_ce_*_battery`; v exportu Pracovny je `binary_sensor.va1312229888_baterie` zapnutý a `sensor.pracovna_tado_ce_pracovna_battery` hlásí `Low` | KL13 |
| Spojení Topení a čidel | `binary_sensor.*_connection`, `binary_sensor.va…_stav_pripojeni`, `binary_sensor.*_tado_*_connectivity` | KL13 |
| Teploměr Pracovny: baterie a napětí | `sensor.pracovna_teplomer_pracovna_battery` (73 %), `…_battery_voltage` | KL13 |
| Vlastní posouzení čidla ALPSTUGA | `sensor.loznice_teplomer_loznice_air_quality` (v exportu `poor` při CO₂ 1217 ppm) | KL26 (srovnání s vaším žebříčkem) |
| Rychlost a zrychlení ohřevu v místnosti | `sensor.*_tado_ce_*_heating_rate`, `_heating_acceleration`, `_approach_factor`, `_confidence`, `_schedule_deviation` | KL4, KL23 (jen jako srovnání; `ENTITY_MAP.md` je řadí mezi nepoužívané) |
| Plán Topení | `sensor.*_tado_ce_*_next_schedule` a `_next_schedule_temperature` (v exportu u všech `No schedule`), tlačítko `…_refresh_schedule` | KL23, TODO C4 bod 4 |
| Early Start | `switch.*_tado_ce_*_early_start` (v exportu vypnuto u všech pokojů) | KL23 |
| Žaluzie: příkon, energie, poruchy | `sensor.*_zaluzie_*_power`, `…_energy`, `binary_sensor.*_zaluzie_*_overcurrent / overheating / overpowering / overvoltage` | KL16 |
| Plán žaluzií (vlastní virtuální plánovač) | `sensor.loznice_zaluzie_loznice_plan_zaluzie_*` (v exportu např. `R 08:30 | V 18:07 | N 18:38`) | KL16 |
| Příkon a úspora klimatizace | `sensor.obyvak_ac_obyvak_power`, `…_energy_saved`, `…_energy_difference` (jen Obývák) | KL19, KL22, KL30 |
| Vlastní teploměr klimatizace | `sensor.*_ac_*_temperature / _humidity` (celá čísla; spec je nepoužívá) | – (jen kontrola, že se čidlo klimatizace nemá brát) |
| Úklid robotem | `vacuum.roborock_s5_ea9e_robot_cleaner`, `sensor.roborock_s5_ea9e_status`, `…_props_clean_area`, `…_props_clean_time` | KL17 |
| Vnitřní zisky tepla v Pracovně | `sensor.pracovna_zasuvka_ikea_power` (v exportu 0 W, zásuvka zapnutá), `sensor.madlovi_temperature` a `sensor.madlovi_cpu_utilization_total` (Synology v oblasti Pracovna) | KL4 |
| Slunce po stranách domu (z energie) | `sensor.goodwe_pv1_power`, `sensor.goodwe_pv2_power`, `sensor.goodwe_pv_power` (z exportu karty Energie) | KL8, KL4, KL7, KL22 |

## Co by se hodilo doplnit

| Co | Jak | Odemkne |
|---|---|---|
| **Entita venkovní teploty a počasí** | podle `ENTITY_MAP.md` žádná není potvrzená; stačí ID `weather.*` (Met.no je v Home Assistantu zdarma) nebo vlastního venkovního čidla (KL28) | KL1, KL4, KL7, KL9, KL10, KL11, KL21–KL23: asi deset nápadů |
| Venkovní PM2.5 | Sensor.Community (preferovaný zdroj podle spec), ID není v `ENTITY_MAP.md` | KL1, KL17, hlavička karty |
| CO₂ a PM2.5 v ostatních pokojích | viz KL27 | KL1, KL3, KL26 pro dětské pokoje |
| Teploměry Maxík, Mikuláš, Obývák | `ENTITY_MAP.md`: ID teploměrů nejsou v exportech; až budou, obnovit export | všechna porovnání místností |
| **`state_class: measurement`** u entit bez dlouhodobých statistik | export skript vypíše, kterých entit se to týká, a navrhne `customize` | KL2, KL5, KL6, KL9, KL10 |
| Význam stavu `on` u MYGGBETT | `ENTITY_MAP.md`: v exportech je jen `off`; skript `export_hodiny_klima.py` spočítá, jak dlouho byl který stav | KL1, KL12 |
| Příkon klimatizací, měření plynu | KL30, u plynu pulzní měřič nebo čtení z domovního měřiče | KL9 v kWh místo vlnohodin, KL19, KL22 |

---

## Detail místnosti a historie

<a id="kl1"></a>
### KL1 Vyvětrávací poradce: „stačí 4 minuty“
Místnost s vydýchaným vzduchem ukáže v detailu, jak dlouho trvá vyvětrat a co to přinese. Z minulých otevření okna se naučí, jak rychle v dané místnosti klesá CO₂ (model `C(t) = C_venku + (C₀ − C_venku)·e^(−n·t)`, `n` je výměna vzduchu za hodinu). Z toho: „Při otevřeném okně klesne CO₂ z 1 400 na 800 ppm za asi X minut; teplota klesne o asi Y °C; venku je PM2.5 38 µg/m³ (uvnitř 6).“ Důsledky jsou vedle sebe, bez pokynu. Teplotní polovinu dodá KL4.
Hodinové statistiky tu nestačí (pokles trvá minuty), proto `tools/export_hodiny_klima.py` ukládá i `okna_udalosti.csv` ze stavů (Home Assistant je drží asi 10 dní). Hodnotu CO₂ venku bere výpočet jako nastavitelný předpoklad (výchozí 420 ppm; ověřit proti čidlu venku, pokud ho někdy budete mít).
**Přínos** ★★★ · **Náročnost** M · **Data** ✔ CO₂ Ložnice (jediná místnost s CO₂ v `ENTITY_MAP.md`), ✔ okno MYGGBETT (? `on` = otevřeno), ＋ venkovní teplota a PM2.5 (KL28), ＋ CO₂ jinde (KL27) · **Cena** 0 Kč

<a id="kl2"></a>
### KL2 Pásmo „běžně“ za 28 dní v grafu historie
V grafu „Historie místnosti – 24 h“ je za křivkou jemný šedý pás: co je v dané místnosti a v tuto hodinu běžné (25.–75. percentil za posledních 28 dní, zvlášť pracovní den a víkend). Okamžitě je vidět, jestli je dnešní CO₂ nebo teplota výjimečná, bez pevného limitu. Stejná čísla pak krmí popisky (KL26). Nápad nemění hlavní stav místnosti (ten drží odsouhlasený žebříček a vaše pásma); je jen v detailu. Podrobnosti a jedna námitka k použití 25.–75. percentilu jako spouštěče: [FORECAST.md](./FORECAST.md), oddíl Popisky.
**Přínos** ★★★ · **Náročnost** M · **Data** ✔ teplota, vlhkost, CO₂, PM2.5 místností s čidlem (dlouhodobé statistiky; ? `state_class` u všech) · **Cena** 0 Kč

<a id="kl3"></a>
### KL3 Noční CO₂ a ranní souhrn ložnice
Každé ráno jedna řada pro ložnici: medián a 90. percentil CO₂ za noc (22–6 h, podle `history.night_start`), minuty nad 1 000 a nad 1 500 ppm, sklon nárůstu po usnutí; vedle toho, jestli bylo okno otevřené. Týdenní trend v rozkliku („3 noci za sebou nad běžným pásmem“). Z poklesu při zavřeném okně se dá odhadnout i těsnost místnosti (KL10 pro CO₂): nízká výměna vzduchu v noci je důvod, proč CO₂ stoupá.
**Přínos** ★★★ · **Náročnost** M · **Data** ✔ CO₂ Ložnice (v exportu 1 217 ppm), ✔ okno, ＋ CO₂ v dětských pokojích (KL27) · **Cena** 0 Kč

<a id="kl4"></a>
### KL4 Předpověď teploty a „co když“
Tepelný model místnosti naučený z vašich dat (jak rychle se ohřeje a chladne, vliv slunce a žaluzií, okna, Topení a Klimatizace) a z něj dvě až čtyři hodiny dopředu: „Když teď zavřu žaluzie, za 2 hodiny tu bude 24,1 °C.“ Důsledky vedle sebe (teplota za 2 h, kdy se překročí vaše pásmo, spotřeba), nikdy povel, a označené jako **simulace**. Nejdřív zpětné ověření na datech a chyba v číslech, potom teprve zobrazení. Celý koncept: [FORECAST.md](./FORECAST.md).
**Přínos** ★★★ · **Náročnost** L · **Data** ✔ teplota Ložnice a Pracovny, ✔ Topení (`heating`, cíl, režim), ✔ klimatizace, ✔ žaluzie, ✔ okno, ✔ slunce z FVE (KL8), ＋ venkovní teplota a předpověď (KL28), ＋ teploměry ostatních pokojů · **Cena** 0 Kč

<a id="kl5"></a>
### KL5 Mapa týdne: hodina × den v pásmu pohody
Mřížka 7 dní × 24 hodin pro místnost, každá buňka barvou podle podílu času v pásmu pohody (nebo v oranžové či červené, když CO₂ překročilo práh). Na první pohled: „Pracovna je každé odpoledne teplá, Ložnice každou noc vydýchaná.“ Jen v rozkliku, ne na hlavní kartě.
**Přínos** ★★ · **Náročnost** M · **Data** ✔ (dlouhodobé statistiky; ? `state_class`) · **Cena** 0 Kč

<a id="kl6"></a>
### KL6 „Včera v domě“: která místnost a proč
Žebříček místností za včerejšek podle minut ve stavech žebříčku ze spec (Vydýchaný vzduch, Teplo, Chladno, Vlhko …) a důvod jednou větou: „Ložnice: 6 h 20 min vydýchaný vzduch, okno zavřené celou noc.“ Odpovídá na vaši otázku „Která místnost byla včera nejhorší a proč?“ i bez AI; s AI ji KL24 formuluje. Počítá se přehráním stavového žebříčku nad historií (potřebuje i historii `input_select.house_mode`, protože pásmo se mění zimou a létem).
**Přínos** ★★★ · **Náročnost** M · **Data** ✔ místnosti s čidly, ? `input_select.house_mode` (`ENTITY_MAP.md`: nepotvrzeno) · **Cena** 0 Kč

<a id="kl7"></a>
### KL7 Stínění podle slunce a předpovědi
V detailu místnosti se žaluziemi: „Bez zásahu překročí pásmo ve 14:10; se Stínem od 11:00 až v 16:40; s Tmou nepřekročí.“ Tři důsledky vedle sebe z KL4 se sluncem po stranách domu (KL8) a předpovědí. Nic nenavrhuje a plán žaluzií (Shelly nebo HA skripty) nemění. Východní pokoje jsou podle vašich poznámek Ložnice a Pracovna, západní Maxík a Mikuláš (? ověřit): ráno a odpoledne se tedy přehřívají každé z jiné strany, což se v datech pozná.
**Přínos** ★★★ · **Náročnost** L · **Data** ✔ žaluzie (poloha a naklopení), ✔ teplota, ✔ slunce z FVE, ＋ předpověď (KL28) · **Cena** 0 Kč

<a id="kl8"></a>
### KL8 Slunce na východní a západní straně zdarma z FVE
Panely jsou rozdělené na východ a západ (10 + 10, sklon 15°, podle `FORECAST.md` v repozitáři energie) a střídač hlásí výkon obou strun zvlášť. Ráno ukazuje jedna struna slunce na východní straně domu, odpoledne druhá na západní, a oblačnost se pozná jako pokles proti jasnému dni. Pro model místnosti (KL4) a stínění (KL7) je to hotové čidlo slunce bez luxmetru. Omezení: střešní panely se sklonem 15° nejsou svislé okno, střídač výkon ořezává nad 10 kW (v zimě se nestává) a sníh na panelech dá nulu při svítícím slunci; vztah k jednotlivým oknům se proto učí z dat, ne z fyziky. Která struna je východ a která západ, se pozná z výkonu ráno a odpoledne (? ověřit). Sdílený výpočet slunce (roviny, polohy slunce) patří do kitu, protože ho potřebuje i karta Energie.
**Přínos** ★★★ · **Náročnost** S · **Data** ✔ `sensor.goodwe_pv1_power`, `sensor.goodwe_pv2_power` (v exportu karty Energie), ✔ `sensor.goodwe_pv_power` · **Cena** 0 Kč

<a id="kl9"></a>
### KL9 Topení: vlnohodiny a stupňodny po místnostech
Z `heating` (0–100 %) a času se spočítá „kolik topila“ každá místnost (součet % × hodiny, v kartě v jednotkách „vlnohodin“), a vedle stupňodny podle rozdílu cílové a venkovní teploty. Srovnání místností a týdnů bez kWh: „Maxík topil tento týden o 30 % víc než minulý, venku bylo o 2 °C chladněji.“ `heating` je poptávka Topení, ne energie; přepočet na kWh potřebuje měření plynu (＋).
**Přínos** ★★ · **Náročnost** M · **Data** ✔ `sensor.*_tado_ce_*_heating`, ✔ cíl, ＋ venkovní teplota, ＋ plyn pro kWh · **Cena** 0 Kč (měření plynu odhadem stovky až nízké tisíce Kč podle způsobu)

<a id="kl10"></a>
### KL10 Rychlost chladnutí = izolace místnosti
Z nocí, kdy je okno zavřené a Topení nejede, se z poklesu rozdílu `T_místnost − T_venku` spočítá časová konstanta místnosti (v hodinách). Dlouhá konstanta = dobře držící místnost. Pořadí místností od nejhůř po nejlépe izolovanou; zdůrazní se, že sousední místnosti se navzájem ohřívají a výsledek je tedy hrubý. Pomůže i KL4.
**Přínos** ★★ · **Náročnost** M · **Data** ✔ teplota Ložnice a Pracovny, ✔ Topení a okno, ＋ venkovní teplota, ＋ teploměry ostatních pokojů · **Cena** 0 Kč

<a id="kl11"></a>
### KL11 Rosný bod a odstup od něj (vlastní výpočet)
Z teploty a vlhkosti místnosti se spočítá rosný bod (Magnusův vzorec, `a = 17,62`, `b = 243,12 °C`) a absolutní vlhkost; v detailu „rosný bod 12,4 °C, odstup od teploty místnosti 10,3 °C“. Hodnoty z analytických senzorů Topení se nepoužívají (rozhodnutí z `ENTITY_MAP.md`). Bez čidla na povrchu zdi nebo okna se dá říct jen odstup od teploty místnosti; skutečné riziko kondenzace dodá KL29. Prahy nastavitelné.
**Přínos** ★★ · **Náročnost** M · **Data** ✔ teplota a vlhkost Ložnice a Pracovny, ＋ povrchové čidlo (KL29) · **Cena** 0 Kč

<a id="kl12"></a>
### KL12 Okno otevřené při topení a chlazení: kolik minut
Historie k živým štítkům konfliktů ze spec: kolik minut za den a týden bylo okno otevřené současně s topením (aspoň jedna vlna) nebo chlazením, po místnostech, a kolikrát. Při vašem plánu, kdy okno zastaví radiátor a po zavření se čeká asi 15 minut, to ukáže, jestli pravidlo funguje (správná hodnota je pak blízko nuly), a bez pravidla, co otevřené okno stojí.
**Přínos** ★★ · **Náročnost** S · **Data** ✔ okno, ✔ `heating`, ✔ klimatizace (? `on` = otevřeno) · **Cena** 0 Kč

---

## Detekce

<a id="kl13"></a>
### KL13 Panel zdraví čidel: baterie, spojení, mlčení
Jedna obrazovka (rozklik z upozornění, viz TODO C14): baterie čidel oken a teploměrů a ventilů Topení, dostupnost, poslední hlášení a dobu bez hlášení. **V exportech už teď** vychází: baterie Tado ventilu v Pracovně slabá (`Low`) a čidlo dveří na zahradu v Obýváku na 34 % (1,251 V). Dá se z toho udělat obsah oddílu „upozornění“ (TODO C14): jen události, které se řeší mimo kartu (baterie pod prahem, čidlo mlčí déle než `thresholds.stale_minutes` × N, výpadek spojení Topení); stavy oken a překročené prahy do něj nepatří, ty už karta ukazuje jinde.
**Přínos** ★★★ · **Náročnost** S · **Data** ✔ všechny uvedené entity v exportu · **Cena** 0 Kč

<a id="kl14"></a>
### KL14 Topí naplno a teplota neroste
Pravidlo: `heating` ≥ 68 % (tři vlny) aspoň 90 minut, teplota místnosti vzrostla o méně než 0,2 °C a okno bylo zavřené. Výstup jako seznam možných příčin vedle sebe (ventil neotevírá, vzduch v radiátoru, jiný zdroj chladu, okno jinde), ne jako závada. Prahy nastavitelné.
**Přínos** ★★ · **Náročnost** M · **Data** ✔ `heating`, ✔ teplota místnosti, ✔ okno · **Cena** 0 Kč

<a id="kl15"></a>
### KL15 Místnost, která nedosáhne cíle
Doba, po kterou je cíl Topení o víc než 0,5 °C nad teplotou místnosti, i když je topení aktivní a okno zavřené: „Pracovna 3 h 10 min pod cílem 21,5 °C.“ Měří se proti teplotě z čidla místnosti, ne z Tada (Tado měří u radiátoru).
**Přínos** ★★ · **Náročnost** S · **Data** ✔ cíl, ✔ teplota místnosti, ✔ `heating` · **Cena** 0 Kč

<a id="kl16"></a>
### KL16 Žaluzie: plán proti skutečnosti, zdraví Shelly
Porovná časy z plánu (`sensor.*_plan_zaluzie_*`, v exportu `R 08:30 | V 18:07 | N 18:38`) a skutečné změny stavu `cover`: „Ráno v Ložnici nejela.“ K tomu poruchové senzory Shelly (přetížení, přehřátí, přepětí; spec je na kartě nepoužívá) a počet jízd a příkon za den. Plán žaluzií se podle vašich poznámek stěhuje z Shelly skriptu do HA; až bude hotový, změní se zdroj plánu (? ověřit po přesunu).
**Přínos** ★★ · **Náročnost** M · **Data** ✔ plán, ✔ `cover`, ✔ příkon a poruchy · **Cena** 0 Kč

<a id="kl17"></a>
### KL17 Odkud se vzal prach: robot a venkovní vzduch
Skok PM2.5 v Ložnici (například o 5 µg/m³ za 30 minut, nastavitelné) se přiřadí k události: úklid robotem v tu dobu, otevřené okno při špatném venkovním vzduchu, nebo nic známého. Robot v exportu říká jen plochu a čas, ne místnost, takže je to souběh v čase, ne důkaz. ALPSTUGA hlásí PM2.5 jen při změně (spec), s tím výpočet počítá. Poměr vnitřního a venkovního PM2.5 při zavřeném okně ukáže, kolik smogu se dostane dovnitř.
**Přínos** ★★ · **Náročnost** M · **Data** ✔ PM2.5 Ložnice, ✔ robot, ✔ okno, ＋ venkovní PM2.5 · **Cena** 0 Kč

<a id="kl18"></a>
### KL18 Topím kvůli jedné místnosti: krátké cykly okruhu
Všech pět místností sdílí topný okruh (v exportech stejný `heating_circuit`). Spočítat, kolik hodin za den volala po teple jen jedna místnost, a jak často se okruh rozjížděl a zastavoval: „Dnes topil okruh 6,5 h, z toho 2,1 h kvůli jediné místnosti (Pracovna).“ Skutečný stav kotle entity neříkají; je to odvozeno z poptávek místností.
**Přínos** ★★ · **Náročnost** M · **Data** ✔ `heating` všech pěti místností, ? stav kotle (nemáte v datech) · **Cena** 0 Kč

<a id="kl19"></a>
### KL19 Klimatizace: jak rychle ochladí, WindFree proti chlazení
Z historie: kolik minut trvá ochladit místnost o 1 °C při `cool` a při `wind_free`, podle místnosti a venkovní teploty. Ukáže, co WindFree stojí na času (a v Obýváku i na příkonu, jediná klimatizace s měřením).
**Přínos** ★★ · **Náročnost** M · **Data** ✔ stav klimatizace (režim, předvolba, cíl), ✔ teplota místnosti, ✔ příkon jen Obývák, ＋ příkon ostatních (KL30), ＋ venkovní teplota · **Cena** 0 Kč

---

## Automatizace (v Home Assistantu, nikdy v kartě)

Karta nic sama nezapíná (spec). Všechna pravidla níže jsou automatizace v Home Assistantu a každé má přepínač z KL20.

<a id="kl20"></a>
### KL20 Přepínač „vypnuto / upozornit / provádět“ u každého pravidla
Každé automatizační pravidlo má vlastní `input_select` se třemi hodnotami: `vypnuto`, `upozornit` (pošle jen zprávu s důsledky), `provadet`. Nové pravidlo se tak nejdřív týden jen hlásí a teprve pak dostane právo cokoli měnit. Příklad (okno otevřené a topí se v Pracovně; ID jsou z `ENTITY_MAP.md`, `notify.mobile_app_telefon` nahradit; nic neprovádí, dokud je přepínač na `upozornit`):

```yaml
input_select:
  klima_pravidlo_okno_topeni:
    name: Pravidlo okno a topení
    options: [vypnuto, upozornit, provadet]
    initial: upozornit

automation:
  - alias: Klima – okno otevřené a topí se (Pracovna)
    mode: single
    triggers:
      - trigger: state
        entity_id: binary_sensor.pracovna_okno_pracovna
        to: "on"
        for: "00:05:00"
    conditions:
      - condition: not
        conditions:
          - condition: state
            entity_id: input_select.klima_pravidlo_okno_topeni
            state: vypnuto
      - condition: numeric_state
        entity_id: sensor.pracovna_tado_ce_pracovna_heating
        above: 0
    actions:
      - action: notify.mobile_app_telefon
        data:
          message: "Pracovna: okno je otevřené 5 minut a topení běží."
      - if:
          - condition: state
            entity_id: input_select.klima_pravidlo_okno_topeni
            state: provadet
        then:
          - action: climate.set_hvac_mode
            target:
              entity_id: climate.pracovna_tado_ce_pracovna
            data:
              hvac_mode: "off"
```

Návrat do Plánu po zavření okna (čekání například 15 minut, jak jste plánoval s okenními čidly) je druhé pravidlo téhož vzoru; kdy a kam se vrátit, je vaše rozhodnutí. Příklad jsem nespustil na živém Home Assistantu; syntaxe odpovídá aktuálním klíčům `triggers` / `conditions` / `actions`.
**Přínos** ★★★ · **Náročnost** S · **Data** ✔ · **Cena** 0 Kč

<a id="kl21"></a>
### KL21 Upozornění na vyvětrání s důsledky
Když CO₂ v místnosti s okny zavřenými překročí práh déle než N minut, přijde zpráva s důsledky z KL1: „Ložnice 1 320 ppm. Okno na 4 min: CO₂ asi 800, teplota −0,6 °C. Venku 6 °C, PM2.5 8.“ Žádný pokyn, jen čísla. Přepínač z KL20.
**Přínos** ★★ · **Náročnost** S (po KL1) · **Data** ✔ CO₂ Ložnice, ✔ okno, ＋ venkovní teplota a PM2.5 · **Cena** 0 Kč

<a id="kl22"></a>
### KL22 Předchlazení z přebytku FVE
Při horkém zítřku a přebytku výroby (z karty Energie: výkon FVE, spotřeba domu, nabití baterie) automatizace může klimatizaci v místnosti na jihu a západě předchladit na spodní hranici vašeho pásma (léto 21 °C). Ve výchozím režimu jen upozorní („přebytek 3,1 kW, předchlazení Maxíka by spotřebovalo asi X kWh“); skutečné kWh jsou měřitelné jen v Obýváku, jinde se ukáže „bez měření“ (KL30). Jen u místností se zavřeným oknem.
**Přínos** ★★ · **Náročnost** L · **Data** ✔ FVE (z energie), ✔ klimatizace, ＋ předpověď, ＋ příkon klimatizací (KL30) · **Cena** 0 Kč (měření KL30)

<a id="kl23"></a>
### KL23 Čas předtopení z naučené rychlosti
Early Start je v exportu vypnutý u všech pokojů; vlastní výpočet by z naučené rychlosti ohřevu (KL4) řekl, kdy se musí začít, aby v daný čas bylo požadované teplo: „Aby bylo v 6:30 22 °C, začít v 5:10.“ Nesmí předpokládat čas příštího bloku plánu: `…_next_schedule` je v exportu `No schedule` (? skutečně bez plánu, nebo se plán nenačetl; tlačítko `…_refresh_schedule`; viz TODO C4 bod 4). Ukazuje se jako důsledek, ne jako zásah.
**Přínos** ★★ · **Náročnost** L · **Data** ✔ rychlost ohřevu (vlastní i z Tada), ? čas příštího bloku · **Cena** 0 Kč

---

## AI (Claude)

<a id="kl24"></a>
### KL24 „Zeptej se domu“: klima přes MCP
Ptát se Claude na dům v běžné řeči a dostat odpověď z živých stavů i z historie: „Která místnost byla včera nejhorší a proč?“ Návod pro klimatickou část a to, co vystavit: [AI_MCP.md](./AI_MCP.md).
**Přínos** ★★★ · **Náročnost** S · **Data** ✔ · **Cena** 0 Kč (u ha-mcp nebo oficiálního serveru; nic nepotřebuje API klíč)

<a id="kl25"></a>
### KL25 Denní a týdenní souhrn domu jako senzor
Ráno tři věty o noci a včerejšku („noc v Ložnici: CO₂ 3 h 20 min nad 1 000, okno zavřené“), hotová čísla spočítá Home Assistant a Claude je jen formuluje; text projde kontrolou čísel, jinak se použije šablona. YAML šablona: [AI_MCP.md](./AI_MCP.md). Potřebuje API klíč Anthropic (platí se za volání).
**Přínos** ★★★ · **Náročnost** M · **Data** ✔ · **Cena** řádově desítky Kč měsíčně nebo méně za jedno krátké volání denně (odhad; skutečnost je v konzoli Anthropic)

<a id="kl26"></a>
### KL26 Popisky podle normy a vysvětlení události
V detailu a v upozornění věty typu „CO₂ v ložnici ráno vyšší než obvykle (1 180 ppm, běžně 760–950)“. Normu a odchylku počítá karta z dlouhodobých statistik, věta je ze šablony (česky, švédsky, anglicky) a Claude ji jen při události a s omezením četnosti rozvede, s kontrolou čísel. Koncept: [FORECAST.md](./FORECAST.md).
**Přínos** ★★★ · **Náročnost** M · **Data** ✔ místnosti s čidly (+ KL2) · **Cena** 0 Kč (volitelné volání Claude jako KL25)

---

## Doplnění hardwaru

<a id="kl27"></a>
### KL27 CO₂ a PM2.5 tam, kde v mapě entit chybí
`ENTITY_MAP.md`: CO₂ a PM2.5 nejsou potvrzené v Pracovně, Maxíku a Mikuláši (v Obýváku podle vás čidlo není a karta ho nečeká). Jestli čidla ALPSTUGA už máte a jen nejsou v exportu, stačí je přejmenovat a obnovit `HA entities/` (nejlevnější varianta). Dětské pokoje v noci jsou místa, kde se CO₂ nejvíc vyplatí vidět (KL3).
**Přínos** ★★★ · **Náročnost** S · **Data** ＋ · **Cena** stovky Kč za čidlo (odhad)

<a id="kl28"></a>
### KL28 Venkovní teplota a vlhkost: entita počasí nebo vlastní čidlo
Bez venkovní teploty stojí asi deset nápadů (viz tabulka výše). Dvě cesty: (1) entita `weather.*` z integrace počasí (Met.no je zdarma; atributy `temperature`, `humidity`, `cloud_coverage`, `dew_point` a hodinová předpověď přes `weather.get_forecasts`, podle dokumentace Home Assistantu; co skutečně vrátí, závisí na poskytovateli, ? ověřit); (2) vlastní čidlo, například DS18B20 na severní zdi ve stínu přes ESP32, které stejně připravujete pro cirkulaci (jedna sběrnice zvládne více čidel). Vlastní čidlo je přesnější pro model místnosti než předpověď.
**Přínos** ★★★ · **Náročnost** S · **Data** ＋ · **Cena** 0 Kč (počasí) nebo do ~100 Kč za DS18B20 (odhad)

<a id="kl29"></a>
### KL29 Teplota povrchu okna nebo zdi (DS18B20)
Čidlo na rámu okna nebo na studené stěně dodá k rosnému bodu (KL11) skutečný odstup: „povrch 14,2 °C, rosný bod 12,4 °C: rezerva 1,8 °C.“ Přes stejný ESP32 jako KL28.
**Přínos** ★★ · **Náročnost** S · **Data** ＋ · **Cena** do ~100 Kč za čidlo (odhad)

<a id="kl30"></a>
### KL30 Příkon klimatizací
Příkon měří jen Obývák (`sensor.obyvak_ac_obyvak_power`); ostatní klimatizace mají v exportech jen `…_volume`. Bez příkonu se „spotřeba“ v KL4, KL19 a KL22 nedá říct u Maxíka, Mikuláše, Ložnice a Pracovny. Možnost: jistič nebo modul s měřením (jak jste zvažoval u Eaton PL6) nebo Shelly s měřením na přívodu klimatizace; montáž patří elektrikáři.
**Přínos** ★★ · **Náročnost** M · **Data** ＋ · **Cena** řádově stovky až ~1 500 Kč za okruh plus montáž (odhad)

<a id="kl31"></a>
### KL31 Luxmetr z garáže jako spouštěč a kalibrace slunce
Luxmetr (ESP32 + BH1750 v garáži) kvůli žaluziím už plánujete. Pro Klima by sloužil k jednomu: kalibrovat sluneční model (KL8) a potvrdit, že v daný okamžik slunce skutečně svítí, i když FVE hlásí jen oblačnost střechy.
**Přínos** ★★ · **Náročnost** S (po zprovoznění luxmetru) · **Data** ＋ · **Cena** 0 Kč navíc

---

## Vzhled a ovládání

<a id="kl32"></a>
### KL32 Tlačítko historie v popupu Topení / Klimatizace (bývalé C11)
Graf „Historie místnosti – 24 h“ se dnes otevře jen klepnutím na teplotu nebo její trend. Kdo mění topení v popupu, musí ho zavřít a klepnout na teplotu. Návrh: dole vedle „Detail a historie“ tlačítko „Historie místnosti – 24 h“, které přepne popup přímo na graf. Hotovo, když je historie vytápění jedno klepnutí od ovládání topení.
**Přínos** ★★ · **Náročnost** S · **Data** ✔

<a id="kl33"></a>
### KL33 Zavírací animace popupu (bývalé C12)
Popup se otevírá s animací, ale zavře se okamžitě (✕, klepnutí mimo i tažení). Návrh: zavření sjetím dolů (200 ms, při „omezit pohyb“ bez animace).
**Přínos** ★ · **Náročnost** S · **Data** ✔

---

## Co bych vybral jako první a proč

1. **ID venkovní teploty (a počasí).** Žádný kód, jedno ID, a odemkne asi deset nápadů (KL1, KL4, KL7, KL9, KL10, KL21–KL23). Bez něj zůstane model místnosti jen hrubý odhad.
2. **KL13 Panel zdraví čidel.** Vychází z dat, která už máte, a z exportu je vidět konkrétní věc k řešení už teď: slabá baterie ventilu Topení v Pracovně a čidlo dveří v Obýváku na 34 %. Zároveň dává obsah oddílu „upozornění“, který je v `TODO.md` (C14) otevřený.
3. **KL8 Slunce z FVE.** Zdarma máte dvě čidla slunce po stranách domu, jinak by stálo luxmetr a čas. Která struna je východ a která západ, se pozná z výkonu ráno a odpoledne (? ověřit); sluneční vliv na okna ale není stejný jako výkon střechy se sklonem 15°, proto se vztah učí z dat.
4. **KL1 Vyvětrávací poradce.** Je to vaše vlastní zadání, a na něm se ukáže, jestli jsou data použitelná: export `okna_udalosti.csv` řekne, kolik otevření okna za 10 dní se vešlo a jak dobře jde pokles CO₂ proložit.
5. **KL2 a KL26** (pásmo „běžně“ a popisky): nepotřebují žádná nová data, jen export, a mění, jak se detail čte.
6. **KL4 Předpověď a „co když“** až po zpětném ověření na exportu; je to nejdražší a bez dat o slunci a venkovní teplotě by se plácalo.

Co mi z toho pomůže hned: export dat (`python tools/export_hodiny_klima.py …`, postup v [TYDEN.md](./TYDEN.md)) a ID entity počasí.

## Zdroje

- Entity: `HA entities/*.json`, `ENTITY_MAP.md`, `CURRENT_SPEC.md` (tento repozitář).
- Vzor struktury: [IDEAS.md](https://github.com/michal-madle/ha-energie-dashboard/blob/main/IDEAS.md) v repozitáři energie.
- Home Assistant: [Weather](https://www.home-assistant.io/integrations/weather/) (atributy a `weather.get_forecasts`), [MCP Server](https://www.home-assistant.io/integrations/mcp_server), [AI Task](https://www.home-assistant.io/integrations/ai_task/), [Anthropic](https://home-assistant.io/integrations/anthropic).
- Rosný bod: Magnusův vzorec (koeficienty 17,62 a 243,12 °C jsou běžná varianta pro −45 až 60 °C).
