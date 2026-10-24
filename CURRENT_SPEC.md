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
- Obsah shora: titulek „Domov“ → hlavička s venkovními podmínkami → souhrn domu (štítky, jen pokud nějaké jsou) → upozornění (jen pokud nějaká jsou) → karty místností. Pod kartami nic.
- Žádné globální grafy, měřidla, velké souhrnné statistiky ani samostatné panely vytápění/klimatizace.
- Pořadí karet: Ložnice, Pracovna, Maxík, Mikuláš, Obývák.
- Hlavička: aktuální venkovní teplota, denní minimum–maximum, pravděpodobnost deště, kvalita venkovního vzduchu (dobrý / zhoršený / špatný). Příklad: „8 °C · 2–10 °C · ☂ 60 %“ a „Vzduch venku: zhoršený“. Text Zima/Léto se v hlavičce nezobrazuje.
- Souhrn domu (TODO P2.2): štítky jen pro to, co je jinak než v klidném domě, v pořadí: otevřená okna („1 okno otevřené“, „2 okna otevřená“, „5 oken otevřených“; obloha), ruční přepis Topení („Ručně: Pracovna“, u tří a více místností počet; oranžová), místnosti, kde se právě topí – aspoň jedna vlna („Topí 3 místnosti“; oranžová), zapnutá klimatizace („Klimatizace: Ložnice“, u tří a více počet; modrá). Štítek má ikonu (okno, vlny, klimatizace), jména všech místností jsou v `aria-label` a nápovědě. Neznámé stavy se nepočítají. Štítky nejsou klikací.
- Venkovní kvalita vzduchu vychází z PM2.5 ve stejné veličině jako ALPSTUGA (µg/m³), ne z AQI ani indexu. Preferovaný zdroj: Sensor.Community.
- Hranice venkovního vzduchu (návrh 23. 10., čeká na potvrzení; stejné hranice jako pro PM2.5 v místnosti): dobrý < 15 µg/m³, zhoršený 15–34, špatný ≥ 35. Hodnota 15 µg/m³ odpovídá 24hodinovému doporučení WHO z roku 2021. Chybí-li hodnota, zobrazí se „Vzduch venku: ––“.

## Room Card

- Všechny karty mají stejné rozložení. Obývák má stejné rozložení bez žaluzií (prázdné místo se akceptuje).
- Hlavička karty: název místnosti + stav místnosti, přes celou šířku. Název místnosti je největší text karty po teplotě (26 px, polotučně).
- Pod hlavičkou je blok teplota + vlhkost (vedle sebe, bez mikrotrendu) a pod ním tři sloupce zleva doprava: informační řádky | panel žaluzie | tlačítka předvoleb žaluzií. Informační řádky jsou v pořadí CO₂ → PM2.5 → první HVAC řádek → druhý HVAC řádek → okno; všechny mají stejnou výšku.
- Kvalita vzduchu (CO₂, PM2.5) je od skupiny Topení / Klimatizace / okno viditelně oddělená mezerou 12 px (bez čáry); velikost písma zůstává stejná.
- Blok informačních řádků má dva stejně široké sloupce: vlevo ikony, hodnoty a popisky, vpravo mikrotrendy. Mikrotrend je tedy stejně široký jako levý sloupec s ikonami, hodnotami a popisky.
- Panel žaluzie (viz Žaluzie) začíná u řádku CO₂ a končí u řádku okna; má stejnou výšku jako informační řádky a nezasahuje do hlavičky ani k bloku teplota/vlhkost.
- Teplota je dominantní; vlhkost vedle ní je sekundární, ve velikosti navazující na „°C“. Formát: „20,4 °C  46 %“, české formátování čísel.
- Teplota, vlhkost, CO₂ a PM2.5 pocházejí výhradně z IKEA ALPSTUGA. Teplota z Topení se pro kartu nepoužívá (Topení měří u radiátoru pod oknem).
- CO₂ a PM2.5 mají jen ikonu, bez textového popisku. CO₂: ikona molekuly CO₂ (`mdi:molecule-co2`, schválená). PM2.5: vlastní ikona z rozptýlených teček různé velikosti, bez rámečku a bez textu. CO₂ a PM2.5 mají každá svou barvu, stejnou pro ikonu i mikrotrend: CO₂ svěže zelená (testovací `#A6E36B`), PM2.5 fialová (testovací `#B8A6FF`); obě se liší odstínem od oranžové a červené varování i od broskvového mikrotrendu teploty. Barvu mají jen tehdy, když řádek má hodnotu; bez dat jsou ikona i „––“ neutrálně šedé (bez barvy, bez mikrotrendu). Podle hodnoty se barva ikony nemění; číslo se barví jen při překročení prahu. Význam ikony čtečkám obrazovky sděluje `aria-label` řádku.
- Vlhkost je bez barvy (neutrální světle šedá); chybí-li, je „––“ šedé.
- Mikrotrendy (viz Historie a grafy) jsou na kartě právě tři, všechny v pravém sloupci informačních řádků, takže začínají na stejné svislici a jsou stejně široké: CO₂ a PM2.5 ve svém řádku, mikrotrend teploty vedle řádků Topení a Klimatizace a vysoký jako oba řádky dohromady (teplota je výsledkem vytápění a chlazení). Vedle řádku okna mikrotrend není.
- Konec mikrotrendu (okraj koncové tečky) je od panelu žaluzie vzdálen 1,5× mezery mezi panelem a ikonami předvoleb vpravo od něj (mezera k okraji kolejnice ikony; na iPhonu 14 Pro 12,75 px proti 8,5 px), takže trend je o kousek kratší než levý sloupec.
- Mikrotrendy se doleva plynule ztrácejí (vlevo průhledné, plně viditelné od 55 % své šířky). Text řádků Topení a Klimatizace smí přesáhnout do sloupce trendů, nejvýš do 40 % jeho šířky, a leží nad trendem; na iPhonu 14 Pro je tak celé „WindFree · 22 °C“ i „Ručně · 22,5 °C“ (TODO P1.1).
- Text HVAC řádku se nikdy nezkracuje uprostřed čísla: když se nevejde ani s přesahem, skryje se celá cílová teplota („· 21 °C“) a stav (Plán, Ručně, WindFree …) zůstane celý. Celý text obou řádků je vždy v `aria-label`.
- Detail hodnot: klepnutí na teplotu nebo její mikrotrend otevře popup „Historie místnosti – 24 h“ (viz Historie a grafy). Klepnutí na vlhkost, CO₂, PM2.5 (i jejich mikrotrendy) a okno otevře standardní detail entity Home Assistantu (`more-info`) s grafem historie.
- Ilustrace místnosti: jemná čárová kresba v pravém horním rohu karty, v tónu `bedroom` `#A5A1F2`, `office` `#7FC8F8`, `kids` `#FFB36B`, `living` `#E8D9B5`. Leží v měkkém obdélníku přes volnou pravou část hlavičky karty (asi 58 % šířky, do konce bloku teplota/vlhkost); obdélník i kresba se zeslabují jen u levého a spodního okraje, kresba sama je celá vidět. Kresba leží vysoko: její nejnižší čára končí aspoň 22 px nad panelem žaluzie, aby nesoupeřila se zeslabením ani s žaluziemi. Je jen dekorativní (`aria-hidden`) a nepřekrývá text.
- Ilustrace se zobrazuje bez konfigurace: bez klíče `scene` se zvolí podle názvu místnosti (Ložnice → `bedroom`, Pracovna → `office`, Maxík a Mikuláš → `kids`, Obývák / Obývací pokoj → `living`; velikost písmen a diakritika nerozhodují). U jiného názvu se bez `scene` nezobrazí. Klíč `scene` (`bedroom`, `office`, `kids`, `living`) volbu přepíše, `scene: none` ilustraci vypne.

## HVAC logika

- Každá karta má vždy oba HVAC řádky: Topení (vytápění) a Klimatizace (chlazení a ostatní režimy).
- Pořadí a váhu řádků určuje House Mode, nikoli to, který systém právě běží.
- Topení je jediný zdroj vytápění. Klimatizace je primární chlazení.
- Stav HVAC se čte z ikony a její barvy; všechny ikony mají stejnou velikost.
- Řádky Topení a Klimatizace tvoří jeden dotykový cíl přes oba řádky (52 px); otevře popup s ovládáním (viz Ovládání Topení a Klimatizace). Řádek okna otevře detail entity. Řádky Topení a Klimatizace mají vždy ikonu: Topení 0–3 vlny, Klimatizace ikonu režimu. Ikona je vidět i při „Vypnuto“ (šedá) a při chybějících datech (přerušovaná, „––“).

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

- Klepnutí kamkoli na řádky Topení a Klimatizace otevře popup s titulkem místnosti, vždy na **primárním systému** podle House Mode (Zima Topení, Léto Klimatizace); není-li primární systém nakonfigurován, otevře se druhý (TODO P1.2).
- Dotykový cíl Topení + Klimatizace je aspoň tak široký jako levý sloupec informačních řádků (s přesahem do trendu podle délky textu), takže klepnutí kamkoli do levého sloupce těchto řádků otevře popup. Přístupný název tlačítka je přesně viditelný text obou řádků (WCAG 2.5.3); místnost, názvy systémů a akce jsou v popisu (`aria-describedby`).
- Pod titulkem je segmentový přepínač ve stylu iOS „Topení | Klimatizace“ v pořadí podle House Mode; přepnutím se zobrazí ovládání druhého systému. Má-li místnost nakonfigurovaný jen jeden systém, přepínač se nezobrazí a místo něj je název systému.
- Přepínač se ovládá jako záložky (ARIA tabs): šipky vlevo / vpravo (i nahoru / dolů) a Home / End přepnou systém a přesunou na něj fokus; v pořadí klávesy Tab je jen zvolená záložka, obsah je panel záložky.
- Popup je iOS list (viz Detail místnosti). Dole je odkaz „Detail a historie“, který popup zavře a otevře standardní detail `climate` entity zvoleného systému.
- Volby vycházejí z atributů entity `hvac_modes` a `preset_modes`; karta nevolá režim, který entita nenabízí. Volba volá `climate.set_hvac_mode` nebo `climate.set_preset_mode`; popup zůstává otevřený a aktivní volba se podle stavu entity zvýrazní. Chyba služby se ukáže v popupu.
- Topení: Vypnuto (`off`), Plán (`auto`), Ručně (`heat`) a Boost (předvolba `boost`). Boost se nabízí jen tehdy, když entita předvolbu `boost` uvádí; jinak je volba vidět zašedlá s textem „entita nenabízí“. Mechanismus Boostu u integrace Topení není potvrzen (viz AUDIT.md).
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
- Vpravo od panelu žaluzie (poslední sloupec karty) je jeden sloupec tří tlačítek s předvolbami, každé třetina výšky panelu, v pořadí shora dolů Den, Stín, Tma (zdvižená žaluzie nahoře, zavřená dole). Tlačítko je jen ikona: bez kulatého i jiného rámečku, bez textu; název je v `aria-label` a v `title`. Ikona je schematická žaluzie: široká kolejnice, lamely a šňůrka; Den má dvě stažené lamely pod kolejnicí a šňůrku dole pod nimi, Stín čtyři tenké lamely, Tma stejné čtyři lamely silné a téměř se dotýkající. Ikona je 32 px široká (na displeji do 380 px 28 px), sloupec 36 px (32 px); tlačítko je vysoké asi 47 px. Hodnoty jsou poloha / naklopení v %:

| Pořadí | Tlačítko | Ikona | Poloha / naklopení | Význam |
|---|---|---|---|---|
| 1 | Den | kolejnice, stažené lamely, šňůrka | 100 / 100 | vysunuto nahoru |
| 2 | Stín | kolejnice + čtyři tenké lamely | 0 / 100 | sjeté dolů, lamely otevřené |
| 3 | Tma | kolejnice + čtyři silné lamely | 0 / 0 | úplné zatemnění |

- Ikony nemají každá svou barvu: jsou šedé `#8E8E93`, a jen ikona, jejíž hodnoty odpovídají aktuálnímu stavu žaluzie (tolerance ±2 %), je bílá. Stav se tak čte ze světlosti, ne z odstínu; čtečkám ho říká `aria-pressed`. Při neznámém stavu nebo vlastní poloze (například 40 / 60) není bílá žádná.
- Předvolba se odešle až **dvojitým klepnutím (do 400 ms) nebo dlouhým stiskem (550 ms)**; jednoduché klepnutí nic neodešle, ale ukáže vlevo od tlačítka (přes panel) na 1,6 s bublinu „Podržte nebo klepněte dvakrát“ s haptikou `selection` (TODO P1.3). Během držení za ikonou roste měkký světlý čtvereček (zpětná vazba pro dlouhý stisk) a ikona se maličko zmenší; po odeslání se ikona zbělí a jednou „poskočí“ (zvětší se o 22 % a vrátí) a ozve se haptika `success`; při chybě haptika `failure` a hláška. Při „omezit pohyb“ zůstane čtvereček bez růstu a bez poskočení. Haptiku převádí aplikace Home Assistant (událost `haptic`); v prohlížeči se nic nestane. Z klávesnice se předvolba odešle klávesou Enter nebo mezerník.
- Nedostupná žaluzie (entita chybí, `unavailable` / `unknown`): předvolby zůstanou vidět a dají se zaměřit, ale jsou tlumeně šedé (`aria-disabled`), při držení nic neroste a nic neodešlou; klepnutí nebo klávesa ukáže bublinu „Žaluzie je nedostupná“ s haptikou `warning`.
- Předvolba Ráno (35 / 60) byla zrušena; ikony odpovídají třem polohám.

## Detail místnosti

- Karta má dva vlastní popupy ve stejném rámu: ovládání Topení / Klimatizace a „Historie místnosti – 24 h“. Ostatní hodnoty, okno a žaluzie otevírají standardní detail entity Home Assistantu.
- Rám popupu je iOS list (TODO P2.11): na mobilu spodní panel s úchytem nahoře, na širokém displeji (od 600 px) dialog uprostřed bez úchytu. Výška podle obsahu, nejvýš 90 % obrazovky. Zavře se tlačítkem ✕, klepnutím mimo, klávesou Escape nebo tažením horní části (úchyt a titulek) dolů o víc než 100 px či rychlým švihem; jinak se vrátí na místo. Pozadí za popupem při tažení světlá.

## Historie a grafy

- „Historie místnosti – 24 h“ (podle denního přehledu iOS aplikace pro ovládání topení; otevírá ji teplota a její mikrotrend; TODO P2.7–P2.9):
  - Nahoře řádek údajů: čas („Teď“, nebo čas pod prstem, u předchozího dne „včera“), teplota (22 px, polotučně), vlhkost (modře), pod tím Topení (ikona vln, Plán / Ručně · cíl / Vypnuto) a Klimatizace (ikona a režim). Čtečka ho čte při změně.
  - Graf (výška plochy 150 px, kreslený 1 : 1 v šířce popupu): šedé pozadí, noc 22–6 h ztmavená; bílá křivka teploty se šedou plochou pod ní a tečkou na konci; vytápění jako oranžová výplň pod křivkou teploty se sytostí podle vln (1 / 2 / 3 vlny = 24 / 44 / 68 %); cíl Topení jako schodovitá přerušovaná čára jen v době Plán / Ručně; vlhkost jako modrá přerušovaná čára s vlastním měřítkem (rozsah v legendě). Stupnice teploty vpravo po celých stupních (při rozsahu nad 6 °C po dvou), aspoň 3 °C, pokrývá teplotu i cíl.
  - Šířka grafu sleduje šířku popupu i po otočení telefonu nebo změně velikosti okna.
  - Pod grafem pruhy Topení (Plán bílá, Ručně oranžová, Vypnuto šedá) a Klimatizace (barvy podle režimu), každý s popiskem nad sebou; časová osa s popisky v celých hodinách 00, 06, 12, 18 a jemnými svislými čarami.
  - Popisky v grafu 11 px, legenda 13 px; legenda ukazuje jen to, co se v období vyskytlo (Teplota, Cíl topení, Vytápění, Vlhkost min–max, Noc, režimy Topení a Klimatizace).
  - Prohlížení: přejetím prstem (nebo najetím myší) po grafu se ukáže svislá čára s bodem na křivce a řádek údajů ukazuje hodnoty v tom čase; po zvednutí prstu se vrátí na „Teď“. Svislé posouvání popupu funguje dál. Z klávesnice (graf je zaměřitelný) šipky vlevo / vpravo po 15 min, Home začátek, End teď.
  - Načítání, chyba a „Za posledních 24 hodin nejsou k dispozici data“ mají vlastní text. Dole odkaz „Detail teploty“ na standardní detail entity.
- Společný 24h graf CO₂/PM2.5 se nevrací; CO₂ a PM2.5 otevírají standardní detail entity.
- Mikrotrendy (jen CO₂, PM2.5 a teplota; umístění viz Room Card; klepnutí viz Klikací akce): posledních 120 minut, 12 vzorků; bez viditelných os, popisků, rámečku, bublin a interakce; každý jednou jemnou barvou (CO₂ a PM2.5 mátová, teplota broskvová), tenká čára s velmi jemnou plochou pod ní a tečkou na posledním vzorku, doleva se ztrácí; na první pohled patrné zlepšování / zhoršování / stabilita.
- Do prvního načtení historie je místo mikrotrendu jemná tečkovaná linka, která pomalu pulzuje (při „omezit pohyb“ stojí); bez historie se mikrotrend nezobrazí (TODO P2.4).
- Čtečka obrazovky u CO₂, PM2.5 a trendu teploty řekne „za 2 hodiny stoupá / klesá / stabilní“; práh je polovina kroku osy (0,5 °C, 50 ppm, 2,5 µg/m³) mezi prvním a posledním vzorkem (TODO P2.5).
- Společná osa: všechny mikrotrendy jedné veličiny mají v celém domě stejnou svislou osu, takže stejná hodnota leží ve všech místnostech ve stejné výšce a místnosti jdou porovnat. Rozsah osy = minimum a maximum všech vzorků dané veličiny ze všech místností za zobrazené období, zaokrouhlené dolů a nahoru na krok: teplota 1 °C, CO₂ 100 ppm, PM2.5 5 µg/m³. Jsou-li všechny vzorky stejné celé číslo kroku, osa se rozšíří o jeden krok na každou stranu (čára je uprostřed). Příklad: jedna místnost 22–23 °C, druhá 20–21 °C → osa 20–23 °C; první leží v horní části, druhá ve spodní. Osa se nikdy nenormalizuje na jednu místnost.

## Klikací akce

| Klepnutí na | Výsledek |
|---|---|
| teplota (i mikrotrend) | popup „Historie místnosti – 24 h“ |
| vlhkost, CO₂, PM2.5 (i mikrotrendy), okno | standardní detail entity (`more-info`) s grafem historie |
| panel žaluzie | standardní ovládání krytu (`current_position`, `current_tilt_position`) |
| řádky Topení a Klimatizace (jeden cíl) | popup s ovládáním primárního systému a přepínačem na druhý (viz Ovládání Topení a Klimatizace) |
| preset žaluzie (dvojité klepnutí nebo dlouhý stisk) | zavolá `script.zaluzie_posun` s daty `entity` (žaluzie této místnosti), `pos` a `tilt`; ovlivní jen žaluzii dané místnosti; jednoduché klepnutí jen ukáže nápovědu |

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

- Pouze testovací paleta (není finální; ověřit kontrast, čitelnost venku a vzhled na OLED): spuštěná žaluzie šampaňská `#E8D9B5` při 50 % (kolejnice 70 %), okno za žaluzií a otevřené okno obloha `#64D2FF`, vedlejší texty `#9A9AA0`, Klimatizace OFF `#8E8E93`, zavřené žaluzie `#6B6B70`, ikona CO₂ a její mikrotrend zelená `#A6E36B`, ikona PM2.5 a její mikrotrend fialová `#B8A6FF`, mikrotrend teploty broskev `#FFB36B`. Vlhkost je bez barvy (`#C7C7CC`); ikony CO₂/PM2.5 bez dat jsou šedé `#8E8E93`.
- Ikony předvoleb žaluzií jsou šedé `#8E8E93`; ikona odpovídající stavu žaluzie je bílá `#FFFFFF`. Nedostupná žaluzie: šedá `#8E8E93` při 40 % neprůhlednosti.
- Oranžová = varování (CO₂ 1000+, PM2.5 15+), červená = kritické (CO₂ 1500+, PM2.5 35+).
- Neznámá hodnota není nikdy červená ani alarm.
- Štítky souhrnu domu: podklad je barva štítku na 14 % přes tmavé pozadí, text a ikona v barvě štítku (okna obloha `#64D2FF`, Ručně a Topí oranžová `#FF9F0A`, Klimatizace modrá `#64D2FF`).
- Ostatní barvy (režimy Klimatizace, Plán/Ručně) nejsou v Memory rozhodnuty, kromě pravidel výše: Větrání = barva Plánu; běžící Klimatizace ≠ OFF.

## Chybějící data

- Stav `unavailable` / `unknown` / neexistující entita: řádek zachová ikonu a zobrazí „––“, neutrálně, bez alarmu.
- Chybí-li nezbytná data, stav místnosti je „Bez dat“ doplněné o první chybějící nebo zastaralý údaj v pořadí teplota, vlhkost, CO₂, PM2.5, režim domu (např. „Bez dat · režim domu“, „Bez dat · CO₂ (před 2 h)“), aby bylo jasné, co doplnit. Nezbytná data jsou teplota, vlhkost, CO₂, PM2.5 a House Mode.
- Chybějící CO₂ nebo PM2.5 zobrazuje „––“ s ikonou řádku.
- Zastaralá data (TODO P2.3): měření místnosti (teplota, vlhkost, CO₂, PM2.5), které senzor nenahlásil déle než `thresholds.stale_minutes` (výchozí 30 min), se zobrazí šedě (`#8E8E93`), nikdy oranžově ani červeně; ikona CO₂/PM2.5 je šedá, mikrotrend ztlumený na 35 %, nápověda a čtečka řeknou „naposledy před 45 min“. Pro stav místnosti se bere jako chybějící: „Bez dat · CO₂ (před 2 h)“.
- Čas posledního hlášení = novější z `last_updated` (stav v kartě) a `last_reported` z REST stavu entity (`GET /api/states/<entity_id>`), načítaného spolu s mikrotrendy každých 5 minut. Stav posílaný kartám `last_reported` neobsahuje a `last_updated` se při opakovaném hlášení stejné hodnoty nemění; bez REST odpovědi se proto nic neoznačí jako zastaralé.
- Chybějící entity se zjišťují konkrétním dotazem přes Template; ID se nikdy neodhadují.
