# TODO – návrhy UX/UI

Návrhy vylepšení z pohledu Apple Human Interface Guidelines (iOS, iPhone 14 Pro). **Nejsou součástí zadání**, dokud nejsou hotové: platí `CURRENT_SPEC.md`.

Pravidla:
- Každý bod má trvalé číslo (P1.1, P2.3 …), na které se dá odkazovat. Čísla se nikdy nemění ani nepřečíslovávají; nový bod dostane další volné číslo ve své prioritě.
- Hotový bod zůstává na svém místě se stavem **Hotovo** a datem; co z něj platí, je zapsané v `CURRENT_SPEC.md`.
- Priorita: **P1** rozhodnout brzy (dotýká se aktuálního rozložení), **P2** zlepší denní používání, **P3** doladění.

## Přehled

| Č. | Bod | Stav |
|---|---|---|
| [P1.1](#p1-1) | Cílová teplota u HVAC řádků na iPhonu | Hotovo 24. 10. |
| [P1.2](#p1-2) | Dotykové cíle informačních řádků | Částečně (HVAC hotovo) |
| [P1.3](#p1-3) | Objevitelnost předvoleb žaluzií | Hotovo 24. 10. |
| [P1.4](#p1-4) | Ikony předvoleb žaluzií v čistém stylu Apple | Hotovo 24. 10., čeká na vizuální schválení |
| [P2.1](#p2-1) | Kompaktní přehled domu | Otevřené – doporučení níže |
| [P2.2](#p2-2) | Souhrn v hlavičce Domov | Hotovo 24. 10. |
| [P2.3](#p2-3) | Zastaralá data | Hotovo 24. 10. |
| [P2.4](#p2-4) | Načítání mikrotrendů | Hotovo 24. 10. |
| [P2.5](#p2-5) | Mikrotrendy pro VoiceOver | Hotovo 24. 10. |
| [P2.6](#p2-6) | Pohyb žaluzie | Částečně |
| [P2.7](#p2-7) | Historie místnosti jako v aplikaci pro topení | Hotovo 24. 10., čeká na vizuální schválení |
| [P2.8](#p2-8) | Čitelnost grafu historie | Hotovo 24. 10. |
| [P2.9](#p2-9) | Prohlížení historie prstem | Hotovo 24. 10. |
| [P2.10](#p2-10) | Tlačítko historie v popupu Topení / Klimatizace | Otevřené |
| [P2.11](#p2-11) | Popup jako iOS list (sheet) | Hotovo 24. 10. |
| [P2.12](#p2-12) | Rozměry podle šířky karty, ne obrazovky | Otevřené |
| [P2.13](#p2-13) | Hromadné akce pro celý dům | Otevřené – návrh níže |
| [P3.1](#p3-1) | Písmo SF Pro na zařízeních Apple | Otevřené |
| [P3.2](#p3-2) | Světlý režim | Otevřené |
| [P3.3](#p3-3) | Větší písmo | Otevřené |
| [P3.4](#p3-4) | Paleta venku a na OLED | Otevřené |
| [P3.5](#p3-5) | Utlumení spuštěné žaluzie ověřit na iPhonu | Otevřené |
| [P3.6](#p3-6) | Okno otevřené a topí se | Otevřené |
| [P3.7](#p3-7) | Ilustrace při odchylce | Otevřené |

## P1 – rozhodnout brzy

<a id="p1-1"></a>
### P1.1 Cílová teplota u HVAC řádků na iPhonu

**Stav: Hotovo 24. 10.** Mikrotrendy se doleva plynule ztrácejí do ztracena (průhledné vlevo, plně viditelné od 55 % šířky) a text řádků Topení / Klimatizace smí přesáhnout až do 40 % sloupce trendů. Na iPhonu 14 Pro je tak celý vidět i „WindFree · 22 °C“ a „Ručně · 22,5 °C“; cíl se skryje celý jen u ještě delšího textu (např. „WindFree Sleep · 22 °C“).
Další možnost do budoucna: mikrotrend zkrátit, aby začínal víc vpravo (zatím nechceme).

<a id="p1-2"></a>
### P1.2 Dotykové cíle informačních řádků

**Stav: Částečně.** Hotovo: řádky Topení a Klimatizace jsou jeden dotykový cíl (52 px). Klepnutí vždy otevře ovládání primárního systému podle režimu domu a v popupu jde segmentovým přepínačem Topení | Klimatizace přejít na druhý systém.
Zbývá: řádky CO₂, PM2.5 a okno jsou dál samostatné cíle vysoké 26 px (HIG doporučuje 44 pt). Možnost: CO₂ + PM2.5 spojit do jednoho cíle „Kvalita vzduchu“ s popupem se dvěma odkazy na detail, okno nechat (je na kraji skupiny). Hotovo, když žádný klikací prvek nemá cíl menší než 44 × 44 px nebo nesdílí hranu s jinou akcí.

<a id="p1-3"></a>
### P1.3 Objevitelnost předvoleb žaluzií

**Stav: Hotovo 24. 10.** Jednoduché klepnutí na předvolbu ukáže na 1,6 s bublinu „Podržte nebo klepněte dvakrát“ a jemnou haptiku (`selection`). Odeslání předvolby potvrdí haptika `success`, chyba haptika `failure`. Haptiku převádí aplikace Home Assistant na iPhonu na Taptic Engine; v prohlížeči se nic nestane.

<a id="p1-4"></a>
### P1.4 Ikony předvoleb žaluzií v čistém stylu Apple

**Stav: Hotovo 24. 10., čeká na vizuální schválení.** Původní glyfy neodpovídaly ikonám, které uživatel posílal. Nové ikony mají stejnou čárovou tloušťku jako ostatní ikony karty a vycházejí ze symbolů žaluzií v aplikaci Domácnost: plná horní kolejnice a lamely pod ní. Tma = husté silné lamely (téměř plná plocha), Stín = tenké lamely s mezerami, Den = lamely stažené pod kolejnicí a šňůrka, okno prázdné. Velikost glyfu 20 px v kruhu 34 px.

## P2 – denní používání

<a id="p2-1"></a>
### P2.1 Kompaktní přehled domu

**Stav: Otevřené.** Pět karet má dohromady asi 1 550 px, tedy skoro dvě obrazovky iPhonu. Kompaktní režim: místnost bez odchylky se sbalí na jeden řádek („Ložnice · 22,9 °C · 52 % · Příjemné“), místnost s odchylkou zůstane rozbalená.
Otázka uživatele: přepínač nahoře, nebo na kartičkách? **Doporučení: jeden přepínač nahoře** v řádku titulku „Domov“ (malý segmentový přepínač se dvěma ikonami Přehled | Detail), zapamatovaný v tomto zařízení. Důvody: jeden režim pro celý dům je předvídatelný; přepínač na každé kartě by na každé kartě zabral místo a vytvářel směs sbalených a rozbalených karet, kterou si uživatel nepamatuje. Na kartě v kompaktním režimu pak stačí klepnout na řádek místnosti a ta se dočasně rozbalí (bez dalšího ovládacího prvku). Vedle přepínače bude i tlačítko hromadných akcí ([P2.13](#p2-13)), takže pravá strana titulku vytvoří jeden „ovládací“ prostor.
Hotovo, když je celý dům v běžném stavu vidět bez posouvání.

<a id="p2-2"></a>
### P2.2 Souhrn v hlavičce Domov

**Stav: Hotovo 24. 10.** Pod venkovními podmínkami jsou štítky jen pro to, co je jinak než v klidném domě: „2 okna otevřená“, „Ručně: Pracovna“, „Topí 3 místnosti“, „Klimatizace: Ložnice“. Úplná jména místností jsou v popisku pro čtečku a v nápovědě. Navazuje na nerozhodnutá „upozornění“ (AUDIT 4.6).

<a id="p2-3"></a>
### P2.3 Zastaralá data

**Stav: Hotovo 24. 10.** Měření místnosti (teplota, vlhkost, CO₂, PM2.5), které senzor nenahlásil déle než `stale_minutes` (výchozí 30 min), je šedé, nikdy oranžové ani červené, jeho trend je ztlumený a nápověda / čtečka řekne „naposledy před 45 min“. Stav místnosti ho bere jako chybějící: „Bez dat · CO₂ (před 2 h)“.
Čas posledního hlášení se zjišťuje z REST stavu (`last_reported`), protože stav posílaný kartám obsahuje jen `last_updated`, který se při opakované stejné hodnotě nemění. Bez REST odpovědi se nic neoznačí jako zastaralé.

<a id="p2-4"></a>
### P2.4 Načítání mikrotrendů

**Stav: Hotovo 24. 10.** Do prvního načtení historie je místo trendu jemná tečkovaná linka, která pomalu pulzuje (při „omezit pohyb“ stojí). Když historie není, trend se nezobrazí.

<a id="p2-5"></a>
### P2.5 Mikrotrendy pro VoiceOver

**Stav: Hotovo 24. 10.** Čtečka u CO₂, PM2.5 a trendu teploty řekne „za 2 hodiny stoupá / klesá / stabilní“ (práh = polovina kroku osy: 0,5 °C, 50 ppm, 2,5 µg/m³).

<a id="p2-6"></a>
### P2.6 Pohyb žaluzie

**Stav: Částečně.** Při stavu `opening` / `closing` jemně pulzuje horní kolejnice panelu (při „omezit pohyb“ ne). Plynulé přechody polohy nejsou potřeba: Home Assistant posílá polohu během jízdy průběžně, takže se panel už teď hýbe.

<a id="p2-7"></a>
### P2.7 Historie místnosti jako v aplikaci pro topení

**Stav: Hotovo 24. 10., čeká na vizuální schválení.** Vytápění je oranžová výplň přímo pod křivkou teploty (sytost = 0–3 vlny), cíl Topení je schodovitá přerušovaná čára, noc (22–6 h) je ztmavená, stupnice teploty je vpravo po celých stupních, vlhkost je přerušovaná modrá s rozsahem v legendě, pod grafem vrstvy Topení a Klimatizace. Samostatný pruh „Intenzita“ zmizel.
Další krok po schválení: venkovní teplota jako druhá slabá čára, až budou venkovní entity.

<a id="p2-8"></a>
### P2.8 Čitelnost grafu historie

**Stav: Hotovo 24. 10.** Graf se kreslí 1 : 1 v šířce popupu, popisky os a vrstev mají 11 px, legenda 13 px, údaje nad grafem 13–22 px.

<a id="p2-9"></a>
### P2.9 Prohlížení historie prstem

**Stav: Hotovo 24. 10.** Nad grafem je řádek údajů (čas, teplota, vlhkost, Topení a Klimatizace s ikonami). Bez dotyku ukazuje „Teď“; při přejetí prstem (nebo najetí myší) ukazuje hodnoty pod svislou čarou. Z klávesnice šipky vlevo / vpravo po 15 min, Home = začátek, End = teď. Svislé posouvání popupu funguje dál.

<a id="p2-10"></a>
### P2.10 Tlačítko historie v popupu Topení / Klimatizace

**Stav: Otevřené.** Dnes se graf „Historie místnosti – 24 h“ otevře jen klepnutím na teplotu (nebo její trend) na kartě. Kdo právě mění topení v popupu Topení | Klimatizace, musí popup zavřít a klepnout na teplotu, aby viděl, jak místnost reagovala.
Návrh: do popupu Topení | Klimatizace přidat dole vedle „Detail a historie“ druhé tlačítko „Historie místnosti – 24 h“, které přepne popup přímo na graf (a ✕ nebo tažení dolů ho zavře jako dnes). Hotovo, když je historie vytápění jedno klepnutí od ovládání topení.

<a id="p2-11"></a>
### P2.11 Popup jako iOS list (sheet)

**Stav: Hotovo 24. 10.** Popupy mají nahoře úchyt, zavřou se tažením horní části dolů (nad 100 px nebo rychlým švihem) i dál ✕, klepnutím mimo a Escape; výška podle obsahu, nejvýš 90 % obrazovky. Na širokém displeji je popup dialog uprostřed bez úchytu.

<a id="p2-12"></a>
### P2.12 Rozměry podle šířky karty, ne obrazovky

**Stav: Otevřené.** Úzký režim dnes řídí `@media (max-width: 380px)` podle okna; karta v zobrazení Sekce nebo na tabletu může být úzká i na velkém displeji. Návrh: `container-type: inline-size` na seznamu místností a `@container` místo `@media`.

<a id="p2-13"></a>
### P2.13 Hromadné akce pro celý dům

**Stav: Otevřené – návrh.** Uživatel chce nahoře nad všemi místnostmi hromadné akce: všude vypnout topení, všude vypnout klimatizaci, všude nastavit cílovou teplotu, všude přepnout Topení na Plán apod.
Návrh UX: v řádku titulku „Domov“ vpravo tlačítko „Celý dům“, které otevře list (stejný jako ostatní popupy) se skupinami:
- Topení: Vše na Plán · Vše vypnout · Nastavit teplotu všude… (krokovač po 0,5 °C)
- Klimatizace: Vše vypnout · (případně Vše WindFree)
- Žaluzie (volitelně): Tma / Stín / Den všude

Každá akce, která něco vypíná nebo přepisuje ve více místnostech, se potvrdí akčním listem („Vypnout topení v 5 místnostech?“) a po provedení ukáže výsledek po místnostech (i chybu jedné místnosti).
Otevřené otázky pro uživatele:
1. „Nastavit teplotu všude“ u Topení vytvoří ruční přepis (Ručně). Do kdy má platit – do další změny plánu, natrvalo, nebo na dobu (např. 2 h)? Způsob závisí na tom, co nabízí integrace Topení.
2. Týká se „všude“ všech pěti místností, nebo jen vybraných (např. jen horní patro)?
3. Mají být mezi hromadnými akcemi i žaluzie?

## P3 – doladění

<a id="p3-1"></a>
### P3.1 Písmo SF Pro na zařízeních Apple

**Stav: Otevřené.** `-apple-system`, `system-ui` na iOS, Roboto jinde; pro teplotu 38 px optická velikost Display. Čísla už jsou tabulková (`tabular-nums`).

<a id="p3-2"></a>
### P3.2 Světlý režim

**Stav: Otevřené.** Karta má pevné tmavé barvy; při světlém motivu Home Assistantu zůstane tmavým ostrovem. Barvy převést na proměnné (tokeny) a doplnit světlou sadu, nebo vědomě rozhodnout „karta je vždy tmavá“.

<a id="p3-3"></a>
### P3.3 Větší písmo

**Stav: Otevřené.** Velikosti jsou v px, takže nastavení velikosti textu v iOS se nepropíše. Rozhodnout, zda karta má sledovat zvětšení (rozložení by se muselo umět zalomit).

<a id="p3-4"></a>
### P3.4 Paleta venku a na OLED

**Stav: Otevřené.** Šedé texty mají vůči pozadí karty kontrast asi 6,1 : 1 (`#9A9AA0`) a 5,2 : 1 (`#8E8E93`), což stačí; plochy pod mikrotrendy (8 %) a okno za žaluzií (28 %) ale na slunci zmizí. Ověřit na zařízení venku a v nočním režimu; paletu pak zapsat jako finální (spec, Barvy).

<a id="p3-5"></a>
### P3.5 Utlumení spuštěné žaluzie ověřit na iPhonu

**Stav: Otevřené.** Šampaňská je teď na 50 % (kolejnice 70 %). Na OLED v noci může stačit 40 %, na slunci může být potřeba 60 %. Zvážit, zda tlumení řídit podle denní doby nebo jasu – jinak ponechat jednu hodnotu.

<a id="p3-6"></a>
### P3.6 Okno otevřené a topí se

**Stav: Otevřené.** Když je okno otevřené a Topení má aspoň jednu vlnu, jemná oranžová tečka u okna (ne stav místnosti, ne alarm). Vyžaduje rozhodnutí, protože předpověď okna z Topení se záměrně ignoruje.

<a id="p3-7"></a>
### P3.7 Ilustrace při odchylce

**Stav: Otevřené.** U karty se stavem varování nebo kritickým ilustraci ztlumit (např. na 40 %), aby nesoupeřila se stavem; případně jeden globální přepínač „bez ilustrací“.
