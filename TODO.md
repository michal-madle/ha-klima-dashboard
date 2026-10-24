# TODO – návrhy UX/UI

Návrhy vylepšení z pohledu Apple Human Interface Guidelines (iOS, iPhone 14 Pro). **Nejsou součástí zadání**: platí `CURRENT_SPEC.md`. Každý bod před implementací potvrdí uživatel; potom se přepíše do spec a odsud smaže.

Formát: co → proč → kdy je hotovo. Priorita: **P1** rozhodnout brzy (dotýká se aktuálního rozložení), **P2** zlepší denní používání, **P3** doladění.

## P1 – rozhodnout brzy

- [ ] **Cílová teplota u HVAC řádků na iPhonu.**
  Dva stejně široké sloupce (hodnoty | trendy) nechávají na šířce 393 px pro text HVAC řádku asi 83 px. Změřeno v písmu Roboto 15 px: „Plán · 21 °C“ 78 px se vejde, „Plán · 20,5 °C“ 90 px, „Ručně · 22,5 °C“ 102 px a „WindFree · 22 °C“ 111 px ne. Karta dnes nevejde-li se cíl celý, skryje ho (stav zůstane) – v jedné kartě pak cíl někde je a jinde ne.
  Možnosti: (A) ponechat; (B) cílovou teplotu primárního systému kreslit v mikrotrendu teploty jako jemnou přerušovanou vodorovnou linku na společné ose a z textu ji vypustit – na první pohled je vidět, zda místnost k cíli směřuje (princip „cílového pásma“ z aplikace Zdraví); (C) na úzké kartě dát levému sloupci víc místa než trendům (např. 56 : 44).
  Doporučení: **B**. Hotovo, když je na iPhonu u všech místností vidět stav i cíl a žádný text se nezkracuje.

- [ ] **Dotykové cíle informačních řádků.**
  Řádky jsou vysoké 26 px; HIG doporučuje alespoň 44 pt. Sousední řádky (Topení / Klimatizace) jsou různé akce a na telefonu se snadno trefí vedlejší. Možnosti: výška řádku 30–32 px (karta se prodlouží o 20–30 px), nebo jediný cíl „HVAC“ přes oba řádky, který otevře popup se dvěma záložkami Topení / Klimatizace.
  Hotovo, když žádný klikací prvek karty nemá cíl menší než 44 × 44 px nebo sdílí hranu s jinou akcí.

- [ ] **Objevitelnost předvoleb žaluzií.**
  Jednoduché klepnutí nic neudělá a nic neřekne – působí to jako nefunkční tlačítko. Návrh: po jednoduchém klepnutí krátká bublina „Podržte nebo klepněte dvakrát“ (1,5 s) a haptika `selection`; po odeslání haptika `success`, po chybě `failure`. Home Assistant frontend k tomu má událost `haptic`, kterou aplikace Companion převede na Taptic Engine.
  Hotovo, když první klepnutí vždy dá zpětnou vazbu a odeslání je cítit.

## P2 – denní používání

- [ ] **Kompaktní přehled domu.** Pět karet má dohromady asi 1 550 px, tedy skoro dvě obrazovky iPhonu. Cíl „rychlý přehled“ by splnil kompaktní režim: místnost bez odchylky se sbalí na jeden řádek („Ložnice · 22,9 °C · 52 % · Příjemné“), místnost s odchylkou zůstane rozbalená; klepnutí na název přepíná. Hotovo, když je celý dům v běžném stavu vidět bez posouvání.
- [ ] **Souhrn v hlavičce Domov** (jako stavové štítky v aplikaci Domácnost): jen když je něco jinak než obvykle, např. „1 okno otevřené · topí 3 místnosti · Ručně: Pracovna“. Navazuje na nerozhodnutá „upozornění“ (AUDIT 4.6).
- [ ] **Zastaralá data.** Senzor, který se dlouho neozval (baterie, Thread), dnes vypadá jako čerstvá hodnota. Návrh: po N minutách bez aktualizace (`last_updated`; N rozhodne uživatel, např. 30) hodnotu ztlumit a v `aria-label` doplnit „naposledy před 45 min“. Neznámé ≠ alarm, takže bez červené.
- [ ] **Načítání mikrotrendů.** Po otevření je pravý sloupec 1–2 s prázdný a karta vypadá rozbitě. Návrh: do načtení jemná tečkovaná základní linka (skeleton); „historie není“ a „načítá se“ odlišit.
- [ ] **Mikrotrendy pro VoiceOver.** Směr trendu je dnes jen tvar čáry. Doplnit do `aria-label` slovně „stoupá / klesá / stabilní“ (práh = polovina kroku osy, tj. 0,5 °C, 50 ppm, 2,5 µg/m³ za 2 h).
- [ ] **Pohyb žaluzie.** Při stavu `opening` / `closing` plynule animovat hranu polohy (200–300 ms, `ease-out`) a jemně pulzovat horní kolejnici; při „omezit pohyb“ bez animace. Uživatel vidí, že příkaz běží.
- [ ] **Historie místnosti jako v aplikaci pro topení.** Intenzitu vytápění kreslit přímo jako oranžovou výplň pod křivkou teploty (sytost 0–3 vlny) místo samostatného pruhu a přidat schodovitou přerušovanou čáru cílové teploty Topení (z historie entity cíle). Na první pohled je vidět, kdy se topilo, jak silně a zda místnost cíle dosáhla. Hotovo, když je vztah „topí → teplota roste k cíli“ čitelný bez legendy.
- [ ] **Čitelnost grafu historie.** Popisky os a vrstev mají 9 px a legenda 11 px; HIG počítá s minimem 11 pt. Zvětšit popisky na 11 px, legendu na 13 px a graf roztáhnout na celou šířku panelu (dnes je kreslený na šířku 360 a zmenšuje se).
- [ ] **Prohlížení historie prstem.** V popupu (ne na kartě) přejetím po grafu ukázat svislou čáru s časem, teplotou, vlhkostí a stavem Topení / Klimatizace v tom okamžiku – jako v aplikacích Akcie a Zdraví.
- [ ] **Historie z popupu Topení / Klimatizace.** Do popupu ovládání přidat druhý odkaz „Historie místnosti – 24 h“, aby historie vytápění byla jedno klepnutí od řádku Topení, nejen od teploty.
- [ ] **Popup jako iOS list (sheet).** Úchyt nahoře, zavření tažením dolů, výška podle obsahu. Dnes jen ✕, klepnutí mimo a Escape.
- [ ] **Rozměry podle šířky karty, ne obrazovky.** Úzký režim dnes řídí `@media (max-width: 380px)` podle okna; karta v zobrazení Sekce nebo na tabletu může být úzká i na velkém displeji. Návrh: `container-type: inline-size` na seznamu místností a `@container` místo `@media`.

## P3 – doladění

- [ ] **Písmo SF Pro na zařízeních Apple** (`-apple-system`, `system-ui`), Roboto jinde; pro teplotu 38 px optická velikost Display. Čísla už jsou tabulková (`tabular-nums`).
- [ ] **Světlý režim.** Karta má pevné tmavé barvy; při světlém motivu Home Assistantu zůstane tmavým ostrovem. Barvy převést na proměnné (tokeny) a doplnit světlou sadu, nebo vědomě rozhodnout „karta je vždy tmavá“.
- [ ] **Větší písmo.** Velikosti jsou v px, takže nastavení velikosti textu v iOS se nepropíše. Rozhodnout, zda karta má sledovat zvětšení (rozložení by se muselo umět zalomit).
- [ ] **Paleta venku a na OLED.** Šedé texty mají vůči pozadí karty kontrast asi 6,1 : 1 (`#9A9AA0`) a 5,2 : 1 (`#8E8E93`), což stačí; plochy pod mikrotrendy (8 %) a okno za žaluzií (28 %) ale na slunci zmizí. Ověřit na zařízení venku a v nočním režimu; paletu pak zapsat jako finální (spec, Barvy).
- [ ] **Okno otevřené a topí se.** Když je okno otevřené a Topení má aspoň jednu vlnu, jemná oranžová tečka u okna (ne stav místnosti, ne alarm). Vyžaduje rozhodnutí, protože předpověď okna z Topení se záměrně ignoruje.
- [ ] **Utlumení spuštěné žaluzie ověřit na iPhonu.** Šampaňská je teď na 50 % (kolejnice 70 %). Na OLED v noci může stačit 40 %, na slunci může být potřeba 60 %. Zvážit, zda tlumení řídit podle denní doby nebo jasu – jinak ponechat jednu hodnotu.
- [ ] **Ilustrace při odchylce.** U karty se stavem varování nebo kritickým ilustraci ztlumit (např. na 40 %), aby nesoupeřila se stavem; případně jeden globální přepínač „bez ilustrací“.
