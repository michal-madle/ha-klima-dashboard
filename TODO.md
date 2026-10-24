# TODO – otevřené body

Jen otevřené návrhy, chyby a rozhodnutí (iOS, iPhone 14 Pro, Apple Human Interface Guidelines). **Nejsou součástí zadání**: platí `CURRENT_SPEC.md`.

Pravidla:
- Každý bod má trvalé číslo (P1.2, P2.13 …), na které se dá odkazovat. Čísla se nemění; hotové body se odsud mažou (platné chování je v `CURRENT_SPEC.md`, nahrazené v `DESIGN_HISTORY.md`) a jejich čísla se znovu nepoužívají. Nový bod dostane další volné číslo ve své prioritě.
- Priorita: **P1** chyby a rozhodnutí, která blokují další práci; **P2** zlepší denní používání; **P3** doladění.
- Druh: **Chyba** (nalezeno testem), **Rozhodnutí** (čeká na uživatele), **Návrh** (UX zlepšení), **Ověření** (test na skutečném zařízení).

Konsolidace 24. 10.: odstraněny hotové body P1.1, P1.3, P1.4, P2.2–P2.9, P2.11 (8:05) a P1.5, P1.6, P2.17, P2.22, P3.8, P3.10 (opraveno a hlídáno testy, 9:00); P3.6 sloučen do [P2.14](#p2-14).

## Přehled

| Č. | Druh | Bod |
|---|---|---|
| [P1.2](#p1-2) | Chyba | Dotykové cíle menší než 44 pt (vzduch, okno, vlhkost, předvolby) |
| [P1.7](#p1-7) | Rozhodnutí | Chybí `input_select.house_mode` – všude „Bez dat“ |
| [P1.8](#p1-8) | Rozhodnutí | Místnosti, kde senzory ještě nejsou, vypadají rozbitě |
| [P1.9](#p1-9) | Ověření | Kontrolní seznam na iPhonu v aplikaci Home Assistant |
| [P1.10](#p1-10) | Rozhodnutí | Potvrdit rozhodnutí, která jsem udělal sám |
| [P2.1](#p2-1) | Rozhodnutí | Kompaktní přehled domu |
| [P2.10](#p2-10) | Návrh | Tlačítko historie v popupu Topení / Klimatizace |
| [P2.12](#p2-12) | Chyba | Úzká karta (320 px): ilustrace přes text |
| [P2.13](#p2-13) | Rozhodnutí | Hromadné akce pro celý dům |
| [P2.14](#p2-14) | Návrh | Konflikty: okno otevřené a topí / chladí se |
| [P2.15](#p2-15) | Návrh | Zvýraznit hodnotu, která určuje stav místnosti |
| [P2.16](#p2-16) | Rozhodnutí | „Topí N místností“ v zimě skoro pořád |
| [P2.18](#p2-18) | Návrh | Chyba předvolby se ukáže daleko od tlačítka |
| [P2.19](#p2-19) | Návrh | Popup: zavírací animace a stránka pod ním |
| [P2.20](#p2-20) | Návrh | „WindFree Sleep“ – cíl se nevejde ani na velkém iPhonu |
| [P2.21](#p2-21) | Návrh | Zastaralá hodnota je poznat jen z šedé barvy |
| [P3.1](#p3-1) | Návrh | Písmo SF Pro na zařízeních Apple |
| [P3.2](#p3-2) | Rozhodnutí | Světlý režim |
| [P3.3](#p3-3) | Rozhodnutí | Větší písmo |
| [P3.4](#p3-4) | Ověření | Paleta venku a na OLED |
| [P3.5](#p3-5) | Ověření | Utlumení spuštěné žaluzie |
| [P3.7](#p3-7) | Návrh | Ilustrace při odchylce |
| [P3.9](#p3-9) | Návrh | Osa trendů odolná proti jedné chybné hodnotě |
| [P3.11](#p3-11) | Návrh | Nadpis „Domov“ zdvojený s názvem pohledu |
| [P3.12](#p3-12) | Návrh | Méně REST dotazů pro zastaralá data |

## P1 – chyby a rozhodnutí, která blokují

<a id="p1-2"></a>
### P1.2 Dotykové cíle menší než 44 pt · Chyba

Změřeno na 393 px: řádky CO₂ a PM2.5 231 × 26 px, okno 113 × 26 px, vlhkost 38 × 28 px, předvolby žaluzií 34 × 34 px (HIG: aspoň 44 × 44 pt). Topení + Klimatizace už mají 52 px.
Návrh: předvolby a vlhkost zvětšit jen neviditelnou dotykovou plochou (vzhled stejný); CO₂ + PM2.5 spojit do jednoho cíle „Kvalita vzduchu“ (52 px) s popupem se dvěma odkazy na detail; okno zvýšit na 32 px (je na kraji skupiny).
Hotovo, když žádný klikací prvek nemá cíl menší než 44 × 44 px. V `tests/card.spec.ts` čeká připravený test (`fixme`).

<a id="p1-7"></a>
### P1.7 Chybí `input_select.house_mode` – všude „Bez dat“ · Rozhodnutí

Se skutečnou konfigurací z `examples/` (bez režimu domu) ukazuje Ložnice „Bez dat · režim domu“, přestože má všechny čtyři hodnoty; ostatní místnosti „Bez dat“ z jiných důvodů. V exportech entit režim domu není (ENTITY_MAP).
Akce pro uživatele: v Home Assistantu vytvořit pomocníka Rozbalovací seznam s možnostmi Zima a Léto a ID `input_select.house_mode` (nebo jiné ID zapsat do `house_mode_entity`). Rozhodnutí: má karta při chybějícím režimu použít výchozí Zimu (s viditelnou poznámkou), místo „Bez dat“ u všech místností?

<a id="p1-8"></a>
### P1.8 Místnosti, kde senzory ještě nejsou, vypadají rozbitě · Rozhodnutí

Se skutečnou konfigurací mají 3 z 5 karet trvale „Bez dat · teplota“ a místo dominantní teploty velké „––“ (Maxík, Mikuláš, Obývák nemají ALPSTUGA). Stav, který svítí pořád, se uživatel naučí přehlížet – i když jednou půjde o skutečný výpadek.
Návrh: rozlišit „nenakonfigurováno“ (entita v konfiguraci chybí) od „nedostupné“ (entita existuje, ale nemá hodnotu). U nenakonfigurovaných senzorů: bez velkého „––“, bez řádků CO₂ / PM2.5, stavový řádek „Bez senzoru“ neutrálně (bez tečky); Topení, Klimatizace, okno a žaluzie zůstanou. „Bez dat“ a „––“ zůstanou pro skutečné výpadky. Mění zadání (dnes „řádek zůstane s ––“), proto rozhodnutí.

<a id="p1-9"></a>
### P1.9 Kontrolní seznam na iPhonu v aplikaci Home Assistant · Ověření

Všechno dosud ověřeno jen v Chromiu s náhradními daty a náhradní ikonou CO₂. Na iPhonu 14 Pro v aplikaci Home Assistant ověřit (výsledek zapsat sem):
1. Haptika: jednoduché klepnutí na předvolbu (jemná), odeslání (potvrzení), chyba.
2. Tažení popupu dolů nekoliduje s gesty aplikace (tažení od kraje zpět, obnovení stránky tažením).
3. Prohlížení historie prstem: vodorovný tah posouvá čas, svislý posouvá popup.
4. Zastaralá data: REST `last_reported` funguje s vaším účtem (jinak se nic neoznačí jako zastaralé – karta to nehlásí).
5. Ikona CO₂ (`mdi:molecule-co2`) má stejnou optickou velikost jako ostatní ikony.
6. Vzhled nových ikon předvoleb, nové historie, blednutí trendů a utlumené žaluzie (viz [P1.10](#p1-10), [P3.5](#p3-5)).
7. Den změny času (25. 10.): graf historie – test v prohlížeči prošel (noc 22–6 h je ten den 9 h dlouhá, popisky času správně).

<a id="p1-10"></a>
### P1.10 Potvrdit rozhodnutí, která jsem udělal sám · Rozhodnutí

Z posledních tří kol, kde zadání nechalo volbu na mně:
1. Blednutí doleva mají všechny tři mikrotrendy, ne jen teplota (jednotný sloupec). Nevýhoda: u CO₂ a PM2.5 je první polovina dvou hodin skoro neviditelná. Varianta: blednout jen trend teploty.
2. Zastaralá hodnota se pro stav místnosti počítá jako chybějící („Bez dat · CO₂ (před 2 h)“), limit 30 min.
3. Kroky osy trendů CO₂ 100 ppm a PM2.5 5 µg/m³ (teplotu 1 °C určil uživatel).
4. Společný graf CO₂ / PM2.5 za 24 h se nevrátil (CO₂ a PM2.5 otevírají standardní detail) – chcete ho zpět?
5. Ikony předvoleb a nová historie (dřív P1.4, P2.7) jsou hotové, ale čekají na vizuální schválení.

## P2 – denní používání

<a id="p2-1"></a>
### P2.1 Kompaktní přehled domu · Rozhodnutí

Pět karet má dohromady asi 1 550 px, skoro dvě obrazovky iPhonu. Kompaktní režim: místnost bez odchylky se sbalí na jeden řádek („Ložnice · 22,9 °C · 52 % · Příjemné“), místnost s odchylkou zůstane rozbalená.
Doporučení: jeden přepínač nahoře v řádku titulku „Domov“ (dvě ikony Přehled | Detail), zapamatovaný v zařízení; klepnutí na sbalenou místnost ji dočasně rozbalí. Přepínač na každé kartě by bral místo a vytvářel směs stavů. Vedle přepínače tlačítko hromadných akcí ([P2.13](#p2-13)).
Čeká na potvrzení doporučení.

<a id="p2-10"></a>
### P2.10 Tlačítko historie v popupu Topení / Klimatizace · Návrh

Graf „Historie místnosti – 24 h“ se dnes otevře jen klepnutím na teplotu nebo její trend. Kdo mění topení v popupu, musí ho zavřít a klepnout na teplotu, aby viděl, jak místnost reagovala.
Návrh: do popupu Topení | Klimatizace přidat dole vedle „Detail a historie“ tlačítko „Historie místnosti – 24 h“, které přepne popup přímo na graf. Hotovo, když je historie vytápění jedno klepnutí od ovládání topení.

<a id="p2-12"></a>
### P2.12 Úzká karta (320 px): ilustrace přes text · Chyba

Test na 320 px: ilustrace překrývá vlhkost ve všech kartách a u názvu „Obývací pokoj“ i název (na 360 px už jen název). U CO₂ se na 320 px skryje jednotka „ppm“. Úzký režim dnes řídí `@media (max-width: 380px)` podle okna, ne podle šířky karty (karta v zobrazení Sekce nebo na tabletu může být úzká i na velkém displeji).
Návrh: `container-type: inline-size` na seznamu místností, `@container` místo `@media`; pod 360 px šířky karty ilustraci zmenšit na 70 % a posunout nahoru, pod 330 px skrýt. Hotovo, když na 320 px nic nepřekrývá text. V `tests/card.spec.ts` čeká připravený test (`fixme`).

<a id="p2-13"></a>
### P2.13 Hromadné akce pro celý dům · Rozhodnutí

Uživatel chce nahoře nad místnostmi hromadné akce: všude vypnout topení / klimatizaci, všude nastavit cílovou teplotu, všude Topení na Plán apod.
Návrh UX: vpravo v řádku titulku „Domov“ tlačítko „Celý dům“ → list se skupinami Topení (Vše na Plán · Vše vypnout · Nastavit teplotu všude… s krokovačem po 0,5 °C), Klimatizace (Vše vypnout), volitelně Žaluzie (Tma / Stín / Den všude). Akce, která vypíná nebo přepisuje víc místností, se potvrdí akčním listem („Vypnout topení v 5 místnostech?“) a ukáže výsledek po místnostech včetně chyby jedné z nich.
Otázky:
1. „Nastavit teplotu všude“ vytvoří ruční přepis (Ručně) – do další změny plánu, natrvalo, nebo na dobu (např. 2 h)? Závisí i na tom, co nabízí integrace Topení.
2. Všech pět místností, nebo jen vybrané (např. horní patro)?
3. Patří mezi hromadné akce i žaluzie?

<a id="p2-14"></a>
### P2.14 Konflikty: okno otevřené a topí / chladí se · Návrh (sloučeno z P3.6)

Test ukázal kombinace, které jsou pro rychlý přehled nejcennější a dnes je karta nespojí: Ložnice s otevřeným oknem a ručním topením; Pracovna v Létě „Chladno“ (20,2 °C), přitom klimatizace chladí (WindFree) a okno je otevřené.
Návrh: štítek v souhrnu domu v oranžové („Okno otevřené · topí se: Ložnice“, „Okno otevřené · chladí se: Pracovna“, „Chladí se, i když je chladno: Pracovna“) a jemná oranžová tečka u řádku okna dané místnosti. Ne stav místnosti, ne alarm. Předpověď okna z integrace Topení se dál ignoruje. Rozhodnout texty a zda konflikt „chladí, i když je chladno“ chcete.

<a id="p2-15"></a>
### P2.15 Zvýraznit hodnotu, která určuje stav místnosti · Návrh

Test: Maxík „Vlhko“ (oranžově), ale „76 %“ zůstává neutrálně šedé; u „Teplo“ / „Chladno“ teplota také nezmění barvu. U CO₂ / PM2.5 to dnes funguje (číslo je oranžové / červené). Uživatel musí hledat, proč je místnost „Vlhko“.
Návrh: hodnota, která rozhodla o stavu, dostane barvu stavu (teplota oranžově nebo modře, vlhkost oranžově); ostatní zůstanou neutrální. Mění zadání (vlhkost „bez barvy“), proto rozhodnout.

<a id="p2-16"></a>
### P2.16 „Topí N místností“ v zimě skoro pořád · Rozhodnutí

V zimě bude štítek „Topí 3 místnosti“ v souhrnu téměř vždy. Souhrn má ukazovat jen to, co je jinak než obvykle; stálý štítek se přestane číst.
Návrh: v Zimě štítek „Topí“ skrýt (zůstanou Ručně, konflikty z [P2.14](#p2-14)), v Létě ponechat (topení v létě je odchylka). Druhá možnost: ponechat vždy.

<a id="p2-18"></a>
### P2.18 Chyba předvolby se ukáže daleko od tlačítka · Návrh

Když skript žaluzií selže, hláška se zobrazí nahoře nad kartami. U Mikuláše nebo Obýváku je to mimo obrazovku – uživatel ucítí jen haptiku.
Návrh: chyba přímo u tlačítka (červený okraj a krátké zatřesení, „Nepodařilo se“ v bublině jako nápověda z P1.3), horní hlášku ponechat jen pro chyby celé karty.

<a id="p2-19"></a>
### P2.19 Popup: zavírací animace a stránka pod ním · Návrh

Popup se otevírá s animací, ale zavře se okamžitě (✕, klepnutí mimo i tažení). Při posouvání obsahu popupu na jeho konec se může posunout stránka pod ním (iOS řetězí posouvání).
Návrh: zavření sjetím dolů (200 ms, při „omezit pohyb“ bez animace) a `overscroll-behavior: contain` na popupu. Ověřit na iPhonu ([P1.9](#p1-9)).

<a id="p2-20"></a>
### P2.20 „WindFree Sleep“ – cíl se nevejde ani na velkém iPhonu · Návrh

Test v Létě: „WindFree Sleep · 22,5 °C“ se nevejde ani s přesahem do trendu na šířce 430 px – cíl se skryje. Předvolbu sleep uživatel používá.
Návrh: slovo „Sleep“ nahradit malým symbolem měsíce za názvem („WindFree ☾ · 22,5 °C“, u předvolby sleep „Chlazení ☾ · 22 °C“); celý název zůstane v `aria-label`. Ušetří asi 40 px.

<a id="p2-21"></a>
### P2.21 Zastaralá hodnota je poznat jen z šedé barvy · Návrh

Na iPhonu nejsou nápovědy (`title`), takže stáří hodnoty uvidí jen čtečka; stavový řádek ukazuje jen první zastaralou hodnotu. Šedé číslo bez vysvětlení může vypadat jako chyba karty.
Návrh: za zastaralou hodnotou malý symbol hodin (šedý), klepnutí na hodnotu otevře detail jako dnes. Hotovo, když je na první pohled jasné, že hodnota je stará.

## P3 – doladění

<a id="p3-1"></a>
### P3.1 Písmo SF Pro na zařízeních Apple · Návrh

`-apple-system`, `system-ui` na iOS, Roboto jinde; pro teplotu 38 px optická velikost Display. Čísla už jsou tabulková (`tabular-nums`). Pozor: změní šířky textu, po změně znovu změřit [P2.20](#p2-20) a přesah HVAC textu.

<a id="p3-2"></a>
### P3.2 Světlý režim · Rozhodnutí

Karta má pevné tmavé barvy; při světlém motivu Home Assistantu zůstane tmavým ostrovem. Barvy převést na proměnné a doplnit světlou sadu, nebo vědomě rozhodnout „karta je vždy tmavá“.

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

<a id="p3-11"></a>
### P3.11 Nadpis „Domov“ zdvojený s názvem pohledu · Návrh

Pohled v Home Assistantu má vlastní název a karta pod ním vždy kreslí nadpis „Domov“. Při `title: ""` zůstane prázdné místo. Návrh: `title: ""` nadpis úplně vynechá (souhrn a venkovní podmínky zůstanou).

<a id="p3-12"></a>
### P3.12 Méně REST dotazů pro zastaralá data · Návrh

Zastaralá data stojí 1 dotaz na každé měření každých 5 minut a na každé otevřené zařízení (dnes až 20 dotazů / 5 min). Zatím v pořádku; při více místnostech nebo obrazovkách zvážit jeden dotaz na všechny stavy, nebo šablonový senzor s časem posledního hlášení.

## Jak se testuje

`npm test` (viz README, oddíl Testy) spustí v Chromiu 31 testů nad sestavenou kartou a zkušební stránkou `tests/harness.html`: konfigurace z `examples/`, scénáře Zima / Léto / poplach / nedostupné / zastaralé / chyba REST / pohyb žaluzie / dlouhé názvy, šířky 320–768 px, přístupnost (axe-core), klávesnice, dotyk, předvolby, historie, den změny času a překreslování. Body P1.2 a P2.12 mají připravené testy označené `fixme`; po opravě se z nich stanou běžné testy. Co se v prohlížeči ověřit nedá, je v [P1.9](#p1-9).
