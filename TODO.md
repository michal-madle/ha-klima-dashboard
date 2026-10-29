# TODO – Klima Dashboard

Jen to, co čeká na vaši odpověď nebo na ověření na zařízení (iPhone 14 Pro, Apple Human Interface Guidelines). **Nejsou součástí zadání**: platí `CURRENT_SPEC.md`. Kde se v kitu dá sdílet kód, je to v `TODO.md` kitu (K1–K3).

Pravidla:
- Čísla C1–C15 jsou trvalá (odkazuje se na ně ze `CURRENT_SPEC.md`). Vyřízený bod se odsud smaže (platné chování je ve specifikaci, nahrazené v `DESIGN_HISTORY.md`) a jeho číslo se nepoužije znovu; nový bod dostane další volné číslo.
- Do TODO patří jen jasná otázka nebo jasný úkol. Co jste potvrdil, je ve specifikaci; nápady bez vaší žádosti se nevedou.
- Druh: **Ověření** (na skutečném zařízení), **Rozhodnutí** (čeká na vás), **Návrh** (zlepšení, které jste chtěl nebo odsouhlasil směr). Nápady na zlepšení bez jasného zadání jsou v [IDEAS.md](./IDEAS.md), ne tady.

Konsolidace 29. 10.: C11 (tlačítko historie v popupu) a C12 (zavírací animace) přesunuty do [IDEAS.md](./IDEAS.md) jako KL32 a KL33; čísla C11 a C12 se nepoužijí znovu.

Konsolidace 28. 10.: čísla přepsána od C1. Smazány nepotvrzené vlastní nápady bez vaší žádosti (ilustrace při odchylce, osa trendů odolná proti jedné chybné hodnotě, méně REST dotazů pro zastaralá data), popisné body bez otázky (klíče, konstanty, rozhodnutí o překlepu klíče) a statistiky testů (jsou v README).

## Přehled

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

<a id="c1"></a>
## C1 Kontrolní seznam na iPhonu v aplikaci Home Assistant · Ověření

Všechno dosud ověřeno jen v Chromiu s náhradními daty a náhradní ikonou CO₂. Na iPhonu 14 Pro v aplikaci Home Assistant ověřit (výsledek zapsat sem):
1. Tažení popupu dolů nekoliduje s gesty aplikace (tažení od kraje zpět, obnovení stránky tažením). Táhne se za úchyt nahoře nebo za titulek popupu, ne za obsah; obsah se posouvá sám.
2. Prohlížení historie prstem: vodorovný tah posouvá čas, svislý posouvá popup. Stránka pod popupem se nesmí hýbat ani na konci obsahu (v Chromiu to hlídá test se skutečným dotykem).
3. Telefon na šířku: popup Historie místnosti je přes celou šířku displeje (nejvýš 960 px) a posouvá se o asi 75 px uvnitř (obsah 450 px, displej 393 px). Pohodlné, nebo zkrátit graf?
4. Odkaz z názvu místnosti (`link`) otevře v aplikaci zadanou stránku a tlačítko zpět vrátí na nástěnku; vlastní obrázek (`image: /local/…`) se načte a nepřekáží textu. („Link“ jsem pochopil jako odkaz z názvu místnosti; odkaz na obrázek by byl jiná věc.)
5. Chyba předvolby je u tlačítka (červený okraj, zatřesení, „Nepodařilo se odeslat“ 5 s); malé hodiny za zastaralou hodnotou jsou čitelné a nepřekrývají ilustraci; čísla a čas odpovídají profilu (Profil → Obecné); zkrácená Obývák není vedle vyšší karty podivně prázdná.
6. Popup Topení na skutečném Tadu: Ručně 22 °C do další změny plánu, Boost (25 °C, 30 min; v Tadu se objeví jako ruční přepis s časovačem), Vypnuto na 1 h (v Tadu ruční přepis 5 °C, karta ho ukáže jako Vypnuto) a Vypnuto napořád. Zkontrolovat, že `tado_ce.set_climate_timer` přijme `overlay` (`next_time_block`, `manual`) i `time_period`; že posuvníky jdou prstem bez posunu popupu; že po Vypnuto → Plán a Ručně → Plán karta hned ukáže Plán; horní štítky Ručně a Boost zvlášť.
7. Výška popupu Topení: při 852 px vysokém displeji kolem 680 px; v aplikaci Home Assistant je viditelná plocha menší, popup se pak posouvá uvnitř. Přijatelné?

<a id="c2"></a>
## C2 Stín: tolerance ±5 % na skutečné žaluzii · Ověření

Podle vašeho měření žaluzie při otevření lamel vyjede o 3–4 % nahoru, takže Stín je ve skutečnosti 4 / 100 (před otevřením lamel 0 / 0). Poloha i naklopení předvolby se proto porovnávají s tolerancí ±5 % (platí i pro Den a Tmu; `open` a `closed` beze změny). Test hlídá 4 / 100 a 5 / 95 jako shodu, 6 / 100 jako neshodu.
Ověřit: na iPhonu po nastavení Stínu se prostřední ikona rozsvítí a pulzování předvolby skončí. Tma a Stín se liší jen naklopením (0 / 0 a 0 / 100), takže se nepletou; Den (100 / 100) a Stín také ne.

<a id="c3"></a>
## C3 Barvy, osy a kontrast na displeji · Ověření

Barvy a osy jsem volil já; ověřit na displeji, venku na slunci a v noci na OLED, pak paletu zapsat jako finální (`CURRENT_SPEC.md`, Barvy):
1. CO₂ šalvějová zelená a PM2.5 levandulová (po vašem „méně agresivní“; sytost do 40 %, kontrast aspoň 6 : 1). Nečte se zelená u CO₂ jako „v pořádku“, když je číslo oranžové?
2. Světlá paleta (bílé karty, tmavší odstíny stejných významů); hlavně spuštěná žaluzie a svítící předvolba.
3. Osa teploty v historii: rozsah z naměřené teploty, nejméně 1,5 °C, popisky po 0,5 °C. Nepůsobí plochý graf (změna do 0,3 °C) prázdně? Kroky os mikrotrendů CO₂ 100 ppm a PM2.5 5 µg/m³ (teplotu 1 °C určil uživatel).
4. Šedé texty (`#9A9AA0` 6,1 : 1, `#8E8E93` 5,2 : 1) kontrast splňují; plochy pod mikrotrendy (8 %), okno za žaluzií (28 %) a začátky blednoucích trendů na slunci zmizí.
5. Spuštěná žaluzie je šampaňská na 50 % (kolejnice 70 %). V noci na OLED může stačit 40 %, na slunci 60 %.

<a id="c4"></a>
## C4 Popup Topení / Klimatizace: co jsem rozhodl sám · Rozhodnutí

Popup byl přepracován podle návrhu (27. 10.). K potvrzení:
1. **Plán × Auto**: v návrhu se režim jmenoval Auto, na kartě zůstává „Plán“ (jmenuje se tak řádek Topení i štítky). Přejmenovat všude?
2. **Vypnutí po časovači** (Topení „Po skončení: Vypnuto“ a časovač Klimatizace) řeší skript přes WebSocket `execute_script` s `delay`. Potřebuje administrátora, po restartu Home Assistantu se ztratí a dřívější naplánovaný skript se změnou stavu nezruší (jen ho podmínka na stav přeskočí). Stačí to?
3. **Rychlé turbo a Tichý** z návrhu nejsou: entita má jednu předvolbu (`preset_mode`), proto zůstala tlačítka předvoleb (Sleep, Boost, WindFree Sleep …). Přepínače by znamenaly vymyslet mapování na předvolby Samsungu.
4. Čas dalšího bloku plánu („Plán do 22:00, potom 17°“ z návrhu) karta nezná, u levého konce osy je jen „Plán“.
5. Popisky „Režim“ a „Časovač“ jsou skryté kvůli výšce popupu.

<a id="c5"></a>
## C5 Překlady do švédštiny a angličtiny · Rozhodnutí

Znění jsem zvolil já, pojmy jsou v `CURRENT_SPEC.md`, Jazyky. K posouzení hlavně: Chladno = Kyligt / Chilly (ne Kallt / Cold, jde o mírně pod komfortním pásmem); Klimatizace = Luftkonditionering / Air conditioning (ve švédštině dlouhé slovo, vejde se i na 320 px, alternativa „AC“); Vydýchaný vzduch = Instängd luft / Stuffy air; předvolby Dag / Skugga / Mörker a Day / Shade / Dark; „Senaste rapport för 3 h sedan“ u zastaralé hodnoty. Předvolby v příkladu mají prázdné `name` a `description`, aby se jmenovaly v jazyce karty.

<a id="c6"></a>
## C6 Hranice venkovního vzduchu · Rozhodnutí

Návrh 23. 10., stejné hranice jako pro PM2.5 v místnosti: dobrý < 15 µg/m³, zhoršený 15–34, špatný ≥ 35 (15 µg/m³ je 24hodinové doporučení WHO z roku 2021). Potvrdit, nebo dát jiné hranice (`thresholds.pm25_warning`, `pm25_critical` platí i pro venkovní vzduch).

<a id="c7"></a>
## C7 Neměnné PM2.5 nad nulou jako zastaralé · Rozhodnutí

PM2.5 přesně 0 µg/m³ je čistý vzduch a nikdy se neoznačí jako zastaralé (vy 25. 10.). Senzor, který nehlásí déle než `thresholds.stale_minutes`, ale ukazuje nenulovou hodnotu (např. 3 µg/m³), se jako zastaralý dál označí. Kdyby to vadilo, lze zastaralost u PM2.5 nepočítat vůbec.

<a id="c8"></a>
## C8 Hromadné akce pro celý dům · Rozhodnutí

Chcete nahoře nad místnostmi hromadné akce: všude vypnout topení / klimatizaci, všude nastavit cílovou teplotu, všude Topení na Plán.
Návrh UX: vpravo v řádku titulku „Domov“ tlačítko „Celý dům“ → list se skupinami Topení (Vše na Plán · Vše vypnout · Nastavit teplotu všude… s krokovačem po 0,5 °C), Klimatizace (Vše vypnout), volitelně Žaluzie (Tma / Stín / Den všude). Akce, která vypíná nebo přepisuje víc místností, se potvrdí akčním listem („Vypnout topení v 5 místnostech?“) a ukáže výsledek po místnostech včetně chyby jedné z nich.
Otázky: (1) „Nastavit teplotu všude“ = ruční přepis do další změny plánu, natrvalo, nebo na dobu (např. 2 h)? (2) Všech pět místností, nebo jen vybrané (např. horní patro)? (3) Patří sem i žaluzie?

<a id="c9"></a>
## C9 Pátá místnost sama v druhém řádku při čtyřech sloupcích · Rozhodnutí

Od šířky karty 1400 px jsou čtyři sloupce, pět místností dá řádek se čtyřmi a pátou samotnou vlevo (pořadí Ložnice … Obývák zůstává); na monitoru asi 2000 px je napravo od ní prázdno. Možnosti: ponechat (stejně velké karty, pořadí bez překvapení); od šířky asi 1750 px pět sloupců (karta asi 340 px); nebo čtyři sloupce a pátá roztažená na zbytek řádku (dříve u dvou sloupců zamítnuto).

<a id="c10"></a>
## C10 Písmo: SF Pro a větší písmo · Rozhodnutí

1. `-apple-system`, `system-ui` na iOS, Roboto jinde; pro teplotu 38 px optická velikost Display. Čísla jsou už tabulková. Změní šířky textu, po změně znovu změřit [C13](#c13) a přesah textu HVAC.
2. Velikosti jsou v px, takže nastavení velikosti textu v iOS se nepropíše. Má karta sledovat zvětšení (rozložení by se muselo umět zalomit)?

<a id="c11"></a>
## C13 „WindFree Sleep“: cíl se nevejde ani na velkém iPhonu · Chyba

Test v Létě: „WindFree Sleep · 22,5 °C“ se nevejde ani s přesahem do trendu na šířce 430 px, cíl se skryje. Návrh: slovo „Sleep“ nahradit malým symbolem měsíce za názvem („WindFree ☾ · 22,5 °C“, u předvolby sleep „Chlazení ☾ · 22 °C“); celý název zůstane v `aria-label`. Ušetří asi 40 px.

<a id="c14"></a>
## C14 Upozornění na Domov: co to je · Rozhodnutí

Specifikace počítá s oddílem „upozornění (jen pokud nějaká jsou)“ mezi souhrnem domu a místnostmi, ale neříká, co se tam objeví ani odkud se to bere. Konflikty (okno otevřené při topení) už jsou štítky v souhrnu a zastaralá data jsou ve stavu místnosti. Návrh: oddíl zrušit; nebo uvést, které události patří do upozornění (např. chyba příkazu Topení, nedostupný skript žaluzií).

<a id="c15"></a>
## C15 Soubory jiného projektu v repozitáři · Rozhodnutí

Repozitář obsahuje soubory obecného projektu o Home Assistantu, které s kartou nesouvisí: `CLAUDE.md`, `AGENTS.md`, `.github/skills/`, `.github/evals/` (30 případů) a `.github/scripts/`. Návrh: odstranit z repozitáře (zůstanou v historii gitu), případně přesunout do vlastního repozitáře. Beze změny, dokud nepotvrdíte.
