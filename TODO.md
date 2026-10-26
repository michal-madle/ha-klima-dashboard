# TODO – otevřené body

Jen otevřené návrhy, chyby a rozhodnutí (iOS, iPhone 14 Pro, Apple Human Interface Guidelines). **Nejsou součástí zadání**: platí `CURRENT_SPEC.md`.

Pravidla:
- Každý bod má trvalé číslo (P1.2, P2.13 …), na které se dá odkazovat. Čísla se nemění; hotové body se odsud mažou (platné chování je v `CURRENT_SPEC.md`, nahrazené v `DESIGN_HISTORY.md`) a jejich čísla se znovu nepoužívají. Nový bod dostane další volné číslo ve své prioritě.
- Priorita: **P1** chyby a rozhodnutí, která blokují další práci; **P2** zlepší denní používání; **P3** doladění.
- Druh: **Chyba** (nalezeno testem), **Rozhodnutí** (čeká na uživatele), **Návrh** (UX zlepšení), **Ověření** (test na skutečném zařízení).

Konsolidace 24. 10.: odstraněny hotové body P1.1, P1.3, P1.4, P2.2–P2.9, P2.11 (8:05) a P1.5, P1.6, P2.17, P2.22, P3.8, P3.10 (opraveno a hlídáno testy, 9:00); P3.6 sloučen do P2.14. Odpoledne po vašich odpovědích: odstraněny P1.2, P2.1, P2.12, P2.14, P2.15 (hotovo a hlídáno testy) a P1.7, P1.8 (uzavřeno uživatelem); z P1.10 odpadly body 1, 2, 4, 5, 6, 8, 9 a 10 (potvrzeno nebo vyřízeno), zůstávají 3, 7 a nové 11. Večer po vašem dalším kole: odstraněny P1.10 bod 11 (Přehled | Detail zamítnut, viz DESIGN_HISTORY) a P3.11 (`title: ""` vynechá nadpis); P1.11 a P1.12 přepsány (tolerance ±5 %, příčina jedné karty z kódu Home Assistantu). Pozdě večer (konfigurace, dvě okna, světlý režim): odstraněn P3.2 (světlý režim hotový, hlídá ho axe-core); nové body P1.9.11–12 a P1.10.13–18. 25. 10. (tři jazyky): nové body P1.9.13 a P1.10.19–21. 25. 10. dopoledne (po ověření na monitoru a iPhonu): odstraněny P1.12 (Masonry se nepoužívá), P2.16, P2.18 a P2.21 (hotovo a hlídáno testy), z P1.10 body 15 a 20 (zkrácená místnost, formáty z profilu); z P1.9 odpadly body 1, 4–8, 10, 11 a 13 (potvrzeno), body 3 a 9 přepsány; nové body P2.23 a P3.13.

## Přehled

| Č. | Druh | Bod |
|---|---|---|
| [P1.9](#p1-9) | Ověření | Kontrolní seznam na iPhonu v aplikaci Home Assistant |
| [P1.10](#p1-10) | Rozhodnutí | Potvrdit rozhodnutí, která jsem udělal sám |
| [P1.11](#p1-11) | Ověření | Stín: tolerance ±5 % na skutečné žaluzii |
| [P2.10](#p2-10) | Návrh | Tlačítko historie v popupu Topení / Klimatizace |
| [P2.13](#p2-13) | Rozhodnutí | Hromadné akce pro celý dům |
| [P2.19](#p2-19) | Návrh | Popup: zavírací animace a stránka pod ním |
| [P2.20](#p2-20) | Návrh | „WindFree Sleep“ – cíl se nevejde ani na velkém iPhonu |
| [P2.23](#p2-23) | Rozhodnutí | Pátá místnost sama v druhém řádku při čtyřech sloupcích |
| [P3.1](#p3-1) | Návrh | Písmo SF Pro na zařízeních Apple |
| [P3.3](#p3-3) | Rozhodnutí | Větší písmo |
| [P3.4](#p3-4) | Ověření | Paleta venku a na OLED |
| [P3.5](#p3-5) | Ověření | Utlumení spuštěné žaluzie |
| [P3.7](#p3-7) | Návrh | Ilustrace při odchylce |
| [P3.9](#p3-9) | Návrh | Osa trendů odolná proti jedné chybné hodnotě |
| [P3.12](#p3-12) | Návrh | Méně REST dotazů pro zastaralá data |
| [P3.13](#p3-13) | Rozhodnutí | Neměnné PM2.5 nad nulou se označí jako zastaralé |

## P1 – chyby a rozhodnutí, která blokují

<a id="p1-9"></a>
### P1.9 Kontrolní seznam na iPhonu v aplikaci Home Assistant · Ověření

Všechno dosud ověřeno jen v Chromiu s náhradními daty a náhradní ikonou CO₂. Čísla zůstávají; potvrzené body jsou pryč. Na iPhonu 14 Pro v aplikaci Home Assistant ověřit (výsledek zapsat sem):
2. Tažení popupu dolů nekoliduje s gesty aplikace (tažení od kraje zpět, obnovení stránky tažením). Táhne se za úchyt nahoře nebo za titulek popupu (horní pruh), ne za obsah; obsah se posouvá sám.
3. Prohlížení historie prstem: vodorovný tah posouvá čas, svislý posouvá popup. Stránka pod popupem se při tom nesmí hýbat ani na konci obsahu (v Chromiu to hlídá test se skutečným dotykem; na iPhonu neověřeno). Legenda grafu je pryč.
9. Telefon na šířku: popup Historie místnosti je přes celou šířku displeje (nejvýš 960 px) a stále se asi o 75 px posouvá uvnitř (obsah 450 px, displej 393 px). Stránka pod ním se nehýbe. Pohodlné, nebo zkrátit graf?
12. Odkaz z názvu místnosti (`link`) otevře v aplikaci zadanou stránku a tlačítko zpět vrátí na nástěnku; vlastní obrázek (`image: /local/…`) se načte a nepřekáží textu.
14. Nové (25. 10.): chyba předvolby je u tlačítka (červený okraj, zatřesení, „Nepodařilo se odeslat“ 5 s); malé hodiny za zastaralou hodnotou jsou čitelné a nepřekrývají ilustraci; čísla a čas odpovídají profilu (Profil → Obecné); zkrácená Obývák není vedle vyšší karty podivně prázdná.
15. Nové (26. 10.): popup Topení na skutečném Tadu: Ručně 22 °C do další změny plánu, Boost (25 °C, 30 min, v aplikaci Tado se objeví jako ruční přepis s časovačem), Vypnuto na 1 h (v Tadu ruční přepis 5 °C, karta ho ukáže jako Vypnuto) a Vypnuto napořád; zkontrolovat, že akce `tado_ce.set_climate_timer` přijme `overlay` (`next_time_block`, `manual`) i `time_period`, a že posuvníky jdou prstem (vodorovný tah) bez posunu popupu (v Chromiu to hlídá test s dotykem; popup dřív rušil každý tah prstem a v Safari mohl posuvník zamrznout, na iPhonu neověřeno); po Vypnuto → Plán a po Ručně → Plán musí karta hned ukázat Plán (stav určuje `climate` entita; dřív zůstával starý senzor přepisu); horní štítky Ručně a Boost zvlášť.

<a id="p1-10"></a>
### P1.10 Potvrdit rozhodnutí, která jsem udělal sám · Rozhodnutí

Číslování zůstává; potvrzené body jsou pryč.
3. Kroky osy trendů CO₂ 100 ppm a PM2.5 5 µg/m³ (teplotu 1 °C určil uživatel). Ponecháno, netestováno.
7. Barvy CO₂ (šalvějová zelená `#8FBF9F`) a PM2.5 (levandulová `#A59DCF`) jsem po vašem „méně agresivní“ zvolil sám; sytost do 40 %, kontrast aspoň 6 : 1, liší se od sebe, od oranžové a červené varování. Ověřit na displeji, zda se zelená u CO₂ nečte jako „v pořádku“, když je číslo oranžové.
12. Osa teploty v historii místnosti (24. 10. večer, na vaši připomínku): rozsah jen z naměřené teploty, 5% rezerva, nejméně 1,5 °C, popisky po 0,5 °C (rozsah do 3 °C), jinak 1, 2 nebo 5 °C. Cíl topení mimo osu se ořízne; cíl 5 °C (Vypnuto) se nekreslí nikdy, ani na přechodu. Rozhodl jsem sám: minimum 1,5 °C a popisky po 0,5°. Ověřit na displeji, zda plochý graf (změna do 0,3 °C) nepůsobí prázdně, nebo zda minimum zvětšit.
13. Světlá paleta (24. 10. pozdě večer; tmavá zůstala beze změny): bílé karty, tmavší odstíny stejných významů (varování `#A85200`, kritické `#C4001A`, obloha `#006B9C`, CO₂ `#3D7A55`, PM2.5 `#6158A8`, svítící předvolba bronzová `#7A5C2E`, spuštěná žaluzie `#8F7A52` při 60 %); celá tabulka v CURRENT_SPEC.md, Barvy. Text má kontrast aspoň 4,5 : 1 (axe-core), ikony 3 : 1. Ověřit na displeji, hlavně žaluzii a svítící předvolbu.
14. Dvě okna: jeden řádek, při dvou otevřených „Otevřena 2“ s dobou nejdéle otevřeného, „––“ když žádné není otevřené a některé je neznámé, popup „Okna“ se stavem každého okna; souhrn domu počítá okna. Tečka konfliktu je nově hned za popiskem místo „·“, aby na úzké kartě ustoupila doba, ne tečka.
16. „Link“ jsem pochopil jako odkaz z názvu místnosti (šipka „›“ za názvem, cesta v Home Assistantu nebo webová adresa). Jestli jste myslel odkaz na obrázek, ten dělá `image` s adresou.
17. Neznámý klíč místnosti nebo sekcí `thresholds`, `trends`, `history`, `covers` je chyba (překlep se neztratí); neznámé klíče na horní úrovni karty se tolerují, protože tam Home Assistant přidává vlastní (např. `grid_options`).
18. V kódu zůstaly rozměry, animace, gesta (dlouhý stisk 550 ms, dvojklik 400 ms), obnovování trendů po 5 min, cíl 5 °C topení při Vypnuto a barvy (jsou to CSS proměnné karty `--kd-…`, světlá a tmavá sada). Kdyby něco z toho mělo jít do konfigurace, doplním.
19. Překlady (25. 10.): švédské a anglické znění jsem zvolil sám, hlavní pojmy jsou v CURRENT_SPEC.md, Jazyky. K posouzení hlavně: Chladno = Kyligt / Chilly (ne Kallt / Cold, protože jde o mírně pod komfortním pásmem), Klimatizace = Luftkonditionering / Air conditioning (ve švédštině dlouhé slovo; vejde se i na 320 px, ale alternativa je „AC“), Vydýchaný vzduch = Instängd luft / Stuffy air, předvolby Dag / Skugga / Mörker a Day / Shade / Dark, „Senaste rapport för 3 h sedan“ u zastaralé hodnoty.
21. Klíč `language` (`auto`, `cs`, `sv`, `en`) jsem přidal po vzoru `theme`, aby šel jazyk vyzkoušet bez změny profilu. Předvolby v příkladu mají prázdné `name` a `description`, aby se jmenovaly v jazyce karty; vlastní názvy v YAML zůstanou, jak jsou napsané, stejně jako názvy místností.

<a id="p1-11"></a>
### P1.11 Stín: tolerance ±5 % na skutečné žaluzii · Ověření

Podle vašeho měření žaluzie při otevření lamel vyjede o 3–4 % nahoru, takže Stín je ve skutečnosti 4 / 100 (před otevřením lamel 0 / 0). Poloha i naklopení předvolby se proto porovnávají s tolerancí ±5 % (dřív ±2 %; tolerance platí i pro Den a Tmu, u stavů `open` a `closed` beze změny). Test hlídá 4 / 100 a 5 / 95 jako shodu, 6 / 100 jako neshodu.
Ověřit: na iPhonu po nastavení Stínu se prostřední ikona rozsvítí a pulzování předvolby skončí. Hraniční případ: Tma a Stín se liší jen naklopením (0 / 0 a 0 / 100), takže se nepletou; Den (100 / 100) a Stín také ne.

## P2 – denní používání

<a id="p2-10"></a>
### P2.10 Tlačítko historie v popupu Topení / Klimatizace · Návrh

Graf „Historie místnosti – 24 h“ se dnes otevře jen klepnutím na teplotu nebo její trend. Kdo mění topení v popupu, musí ho zavřít a klepnout na teplotu, aby viděl, jak místnost reagovala.
Návrh: do popupu Topení | Klimatizace přidat dole vedle „Detail a historie“ tlačítko „Historie místnosti – 24 h“, které přepne popup přímo na graf. Hotovo, když je historie vytápění jedno klepnutí od ovládání topení.

<a id="p2-13"></a>
### P2.13 Hromadné akce pro celý dům · Rozhodnutí

Uživatel chce nahoře nad místnostmi hromadné akce: všude vypnout topení / klimatizaci, všude nastavit cílovou teplotu, všude Topení na Plán apod.
Návrh UX: vpravo v řádku titulku „Domov“ tlačítko „Celý dům“ → list se skupinami Topení (Vše na Plán · Vše vypnout · Nastavit teplotu všude… s krokovačem po 0,5 °C), Klimatizace (Vše vypnout), volitelně Žaluzie (Tma / Stín / Den všude). Akce, která vypíná nebo přepisuje víc místností, se potvrdí akčním listem („Vypnout topení v 5 místnostech?“) a ukáže výsledek po místnostech včetně chyby jedné z nich.
Otázky:
1. „Nastavit teplotu všude“ vytvoří ruční přepis (Ručně) – do další změny plánu, natrvalo, nebo na dobu (např. 2 h)? Závisí i na tom, co nabízí integrace Topení.
2. Všech pět místností, nebo jen vybrané (např. horní patro)?
3. Patří mezi hromadné akce i žaluzie?

<a id="p2-19"></a>
### P2.19 Popup: zavírací animace · Návrh

Popup se otevírá s animací, ale zavře se okamžitě (✕, klepnutí mimo i tažení). Stránka pod ním se už nehýbe (hotovo 25. 10., viz [P1.9](#p1-9) bod 3).
Návrh: zavření sjetím dolů (200 ms, při „omezit pohyb“ bez animace).

<a id="p2-20"></a>
### P2.20 „WindFree Sleep“ – cíl se nevejde ani na velkém iPhonu · Návrh

Test v Létě: „WindFree Sleep · 22,5 °C“ se nevejde ani s přesahem do trendu na šířce 430 px – cíl se skryje. Předvolbu sleep uživatel používá.
Návrh: slovo „Sleep“ nahradit malým symbolem měsíce za názvem („WindFree ☾ · 22,5 °C“, u předvolby sleep „Chlazení ☾ · 22 °C“); celý název zůstane v `aria-label`. Ušetří asi 40 px.

<a id="p2-23"></a>
### P2.23 Pátá místnost sama v druhém řádku při čtyřech sloupcích · Rozhodnutí

Od šířky karty 1400 px jsou čtyři sloupce, takže pět místností dá řádek se čtyřmi a pátou samotnou vlevo (pořadí Ložnice … Obývák zůstává). Na monitoru asi 2000 px je napravo od ní prázdno.
Možnosti: ponechat (stejně velké karty, pořadí bez překvapení); od šířky asi 1750 px pět sloupců (každá karta asi 340 px, na hraně nejužšího podporovaného rozložení 304 px); nebo čtyři sloupce a pátá roztažená na zbytek řádku (dříve u dvou sloupců zamítnuto).

## P3 – doladění

<a id="p3-1"></a>
### P3.1 Písmo SF Pro na zařízeních Apple · Návrh

`-apple-system`, `system-ui` na iOS, Roboto jinde; pro teplotu 38 px optická velikost Display. Čísla už jsou tabulková (`tabular-nums`). Pozor: změní šířky textu, po změně znovu změřit [P2.20](#p2-20) a přesah HVAC textu.

<a id="p3-3"></a>
### P3.3 Větší písmo · Rozhodnutí

Velikosti jsou v px, takže nastavení velikosti textu v iOS se nepropíše. Rozhodnout, zda karta má sledovat zvětšení (rozložení by se muselo umět zalomit).

<a id="p3-4"></a>
### P3.4 Paleta venku a na OLED · Ověření

Šedé texty mají vůči pozadí karty kontrast asi 6,1 : 1 (`#9A9AA0`) a 5,2 : 1 (`#8E8E93`), což stačí; plochy pod mikrotrendy (8 %), okno za žaluzií (28 %) a začátky blednoucích trendů ale na slunci zmizí. Ověřit venku a v nočním režimu; paletu pak zapsat jako finální.

<a id="p3-5"></a>
### P3.5 Utlumení spuštěné žaluzie · Ověření

Šampaňská je na 50 % (kolejnice 70 %). Na OLED v noci může stačit 40 %, na slunci může být potřeba 60 %. Zvážit tlumení podle denní doby; jinak ponechat jednu hodnotu.

<a id="p3-7"></a>
### P3.7 Ilustrace při odchylce · Návrh

U karty se stavem varování nebo kritickým ilustraci ztlumit (např. na 40 %), aby nesoupeřila se stavem; případně jeden přepínač „bez ilustrací“.

<a id="p3-9"></a>
### P3.9 Osa trendů odolná proti jedné chybné hodnotě · Návrh

Osa je společná pro celý dům, takže jeden chybný vzorek (např. CO₂ 5 000 ppm po restartu senzoru) zploští trendy všech místností na rovné čáry. Návrh: horní mez osy omezit (CO₂ na 2× kritický práh, PM2.5 na 2× kritický práh, teplota na rozsah 10–35 °C) a vzorek nad mezí kreslit na okraji.

<a id="p3-12"></a>
### P3.12 Méně REST dotazů pro zastaralá data · Návrh

Zastaralá data stojí 1 dotaz na každé měření každých 5 minut a na každé otevřené zařízení (dnes až 20 dotazů / 5 min). Zatím v pořádku; při více místnostech nebo obrazovkách zvážit jeden dotaz na všechny stavy, nebo šablonový senzor s časem posledního hlášení.

<a id="p3-13"></a>
### P3.13 Neměnné PM2.5 nad nulou se označí jako zastaralé · Rozhodnutí

PM2.5 přesně 0 µg/m³ je čistý vzduch a nikdy se neoznačí jako zastaralé (uživatel 25. 10.). Senzor, který nehlásí déle než `thresholds.stale_minutes`, ale ukazuje nenulovou hodnotu (např. 3 µg/m³), se jako zastaralý dál označí. Kdyby to vadilo, lze zastaralost u PM2.5 nepočítat vůbec; `thresholds.stale_minutes` dnes platí pro všechna měření stejně.

## Jak se testuje

`npm test` (viz README, oddíl Testy) spustí v Chromiu 76 testů nad sestavenou kartou a zkušební stránkou `tests/harness.html`: konfigurace z `examples/` (scénář „real“ ji načítá přímo; kontrola, že příklad obsahuje všechna nastavení s výchozími hodnotami), chybné hodnoty konfigurace, dvě okna, místnost bez CO₂ a PM2.5, vlastní předvolby, obrázek a odkaz, světlý a tmavý režim, scénáře Zima / Léto / poplach / nedostupné / zastaralé / chyba REST / pohyb žaluzie / dlouhé názvy, šířky 320–768 px, jeden až čtyři sloupce (šířky do 2560 px) včetně telefonu na šířku (852 × 393), zkrácená místnost, formáty z profilu, stránka pod popupem, hodiny u zastaralých hodnot a chyba u tlačítka, velikost dotykových cílů měřená hit-testem, tolerance předvoleb, doba otevření okna, `title: ""`, konflikty, přístupnost (axe-core), klávesnice, dotyk, předvolby, ovládání Topení (teplota, Boost, doba, odeslání při zavření, tah prstem po posuvníku), historie (osa teploty, Vypnuto před cílem, pruhy pod grafem s ikonami a oknem), den změny času, překreslování a jazyky (výběr podle Home Assistantu, švédské a anglické texty a čísla, žádný český text ve švédštině ani angličtině, delší texty na všech šířkách). Co se v prohlížeči ověřit nedá, je v [P1.9](#p1-9) a [P1.11](#p1-11).

Testy se 24. 10. večer sloučily ze 76 na 45 se stejným pokrytím kódu (`npm run coverage`: příkazy 92,6 %, větve 81,4 %, funkce 91,0 %, řádky 92,7 %). Nový test hlídá jen to, co žádný stávající nepokrývá; kontroly rozložení patří do testu rozložení svého scénáře.
