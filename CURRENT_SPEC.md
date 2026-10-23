# Klima Dashboard – aktuální specifikace

## Cíl nástěnky

Mobilní nástěnka Home Assistantu „Domov“ poskytuje rychlý přehled pohodlí v pěti místnostech. Jde o stavový, snadno čitelný ovládací přehled, nikoli o technický monitorovací panel.

## Uživatelské prostředí a rozložení

- Návrh je přednostně určen pro iPhone 14 Pro; nesmí vyžadovat vodorovné posouvání. Počítačové zobrazení není prioritou.
- Hlavní obrazovka obsahuje titulek „Domov“, hlavičku s venkovními podmínkami, upozornění pouze tehdy, když nějaká jsou, a karty místností. Neobsahuje globální grafy, měřidla, velké souhrnné statistiky ani samostatné panely vytápění a klimatizace.
- Hlavička zobrazuje aktuální venkovní teplotu, minimum a maximum, pravděpodobnost deště a kvalitu venkovního vzduchu. Sezónní režim se v hlavičce nezobrazuje.
- Pořadí karet: Ložnice, Pracovna, Maxík, Mikuláš, Obývací pokoj.
- Každá karta má hlavičku s názvem místnosti a stavem. Informační obsah je vlevo; vpravo je obrazový panel žaluzie.
- Teplota a vlhkost jsou vedle sebe, se stejnou velikostí písma a s vizuální prioritou teploty. CO₂ a PM2.5 jsou pod sebou.
- Obývací pokoj zachovává stejné rozložení jako ostatní místnosti, i když nemá žaluzie.
- Data o teplotě, vlhkosti, CO₂ a PM2.5 v místnosti poskytuje IKEA ALPSTUGA. Teplota z Tado se pro stav místnosti nepoužívá.
- Stav okna poskytuje pouze IKEA MYGGBETT. Předpověď otevřeného okna z Tado CE se ignoruje.
- Tado CE je jediným zdrojem vytápění; Samsung je zdrojem chlazení a ostatních režimů klimatizace.

## Stavy místnosti a prahové hodnoty

Stav je lidské zhodnocení prostředí, nikoli příkaz. Při souběhu podmínek se použije první splněná položka v tomto pořadí:

1. **Bez dat** – chybí nezbytná data; stav „Příjemné“ se při chybějících zásadních datech nezobrazí.
2. **Znečištěný vzduch** – PM2.5 ≥ 35; červený stav.
3. **Silně vydýchaný vzduch** – CO₂ ≥ 1500; červený stav.
4. **Vydýchaný vzduch** – CO₂ od 1000 do 1499; oranžový stav.
5. **Vlhko** – vlhkost > 70 %.
6. **Sucho** – vlhkost < 35 %.
7. **Teplo** – teplota nad horní hranicí komfortního pásma pro aktuální režim.
8. **Chladno** – teplota pod dolní hranicí komfortního pásma pro aktuální režim.
9. **Příjemné** – žádná z předchozích podmínek není splněna a jsou dostupná nezbytná data.

- Komfortní pásmo v režimu Zima je 20–24 °C; v režimu Léto 21–25 °C.
- PM2.5 od 15 do 34 zbarví pouze hodnotu oranžově a nemění stav místnosti. Od 35 je hodnota červená a mění stav místnosti.
- CO₂ od 1000 do 1499 zbarví hodnotu oranžově; od 1500 červeně.
- Normální hodnoty zůstávají neutrální. Neznámý údaj není alarm, nikdy není červený a zobrazí se jako „--“ při zachování identity řádku a ikony.
- Není-li dostupná nezbytná hodnota, karta zobrazí „Bez dat“; Home Assistant zpracovává stav entity `unavailable`.

## Pravidla vytápění a klimatizace

- Režim domu je `input_select.house_mode` s hodnotami Zima a Léto. Ovlivňuje pořadí a vizuální váhu řádků vytápění a klimatizace i komfortní pásmo; sám o sobě žádný systém nevypíná.
- V režimu Zima je první Tado CE a druhý Samsung. V režimu Léto je první Samsung a druhý Tado CE. Oba řádky jsou na kartě vždy.
- Tado CE zobrazuje stavy **Plán**, **Ručně** a **Vypnuto**. Ruční přepis je zvýrazněný. Při vypnutí se zobrazí pouze „Vypnuto“, nikoli cílová teplota 5 °C. Analytické senzory Tado a Mold Risk nemění stav karty.
- Intenzita vytápění Tado CE je zobrazena 0–3 ikonami teplých vln, bez procent: 0 % = 0 vln, 1–34 % = 1, 35–67 % = 2, 68–100 % = 3.
- Samsung používá sadu ikon stejné velikosti; stav je čitelný z ikony a její barvy. Aktivní klimatizace má jinou barvu než vypnutá. Větrání používá stejnou barvu jako Plán Tado CE.
- Vypnutý Samsung ponechává ikonu klimatizace v šedé barvě; vypnutí má přednost před předvolbou. Při nedostupnosti zůstává stejná ikona přerušovaná.
- WindFree se zobrazuje jako „WindFree“ a pouze při zapnuté klimatizaci v režimu chlazení. Chlazení bez WindFree se označuje „Chlazení“; vypnutý systém „Vypnuto“; ostatní předvolby svým názvem.
- Neznámý stav vytápění či klimatizace zachovává příslušnou ikonu a zobrazí „--“.

## Žaluzie

- Místnosti Ložnice, Pracovna, Maxík a Mikuláš mají žaluzie; Obývací pokoj je nemá.
- Poloha krytu: 0 % = zavřeno/dole, 100 % = otevřeno/nahoře. Naklopení: 0 % = zavřené lamely, 100 % = otevřené lamely.
- Panel žaluzie je jeden svislý obrázek realistické žaluzie viděné zevnitř. Je bez rámečku, textu, procent a technických hodnot; zachovává stálý počet a rozteč lamel.
- Panel začíná u řádku CO₂ a pokrývá řádky CO₂, PM2.5, Tado, Samsung a okno; nezasahuje do hlavičky ani k bloku teploty a vlhkosti. Je zhruba o 20–30 % širší než původní dvojice ukazatelů.
- Naklopení mění pouze tloušťku lamel: při 0 % téměř splývají v plnou plochu, při 100 % jsou velmi tenké s mezerami.
- Poloha rozděluje obrázek na spodní část žaluzie a vytaženou strukturu: spuštěná část má plnou krycí neprůhlednost, vytažená zachovává strukturu lamel při 20–30 % neprůhlednosti. Při poloze 100 % je zvýrazněna pouze horní linka.
- Neznámá poloha nebo naklopení se zobrazí jako přerušovaná silueta.

## Klikací akce a historie

- Kliknutí na teplotu otevře „Historie místnosti – 24 h“: plošné pozadí pro teplotu, hlavní teplotní křivku, modrou přerušovanou křivku vlhkosti a časové vrstvy Tado CE (Plán / Ručně / Vypnuto) a Samsungu v jeho barvách režimů. Intenzita vytápění je mezi časovou vrstvou a teplotní křivkou znázorněna výplní odpovídající 0–3 vlnám.
- Kliknutí na CO₂ nebo PM2.5 otevře jeden společný graf těchto hodnot za 24 hodin.
- Kliknutí na panel žaluzie otevře standardní ovládání krytu s aktuální polohou a naklopením (`current_position`, `current_tilt_position`).
- Mikrotrendy teploty a CO₂ jsou vpravo od hodnoty ve stejném řádku. Zobrazují posledních 120 minut ve 12 vzorcích, normalizovaných podle minima a maxima daného období. Jsou jemné, jednobarevné, bez os, popisků, rámečku, interakce a informačních bublin; na první pohled ukazují zlepšování, zhoršování nebo stabilitu.

## Venkovní data a vizuální pravidla

- Hlavička zobrazuje aktuální venkovní teplotu, denní minimum a maximum, pravděpodobnost deště a kvalitu venkovního vzduchu. Kvalita vzduchu se posuzuje z venkovní PM2.5 ve stejné fyzikální jednotce jako ALPSTUGA, nikoli z AQI nebo indexu; preferovaným zdrojem je Sensor.Community.
- CO₂ a PM2.5 mají ikonu a popisek. Barva hodnoty se mění pouze při překročení prahu; normální hodnoty jsou neutrální.
- Řádky Tado CE, Samsungu, okna, CO₂ a PM2.5 zachovávají svou ikonu i při nedostupnosti a zobrazují „--“. Neznámá hodnota nikdy není červená ani alarm.
- Běžné stavy nepoužívají dominantní zelenou. Vypnuto je šedé, ruční přepis Tado CE je zřetelně odlišitelný a aktivní Samsung má jinou barvu než vypnutý.
- Karta místnosti používá jednotnou velikost písma pro informační řádky Tado CE, Samsungu, okna a text stavu. Název místnosti, hodnoty teploty/vlhkosti a popisky CO₂/PM2.5 mohou mít vlastní hierarchii.
- Barvy pro žaluzie, popisky a vypnutý stav nejsou finálně schválené; před finalizací se ověří kontrast, čitelnost venku a vzhled na OLED displeji.

## Konfigurace

- Prahové hodnoty a komfortní pásma jsou definovány v konfiguraci karty, nastaví se jednou a běžně se nemění.
- Režim domu se vybere hodnotou `input_select.house_mode` (Zima nebo Léto).
