# Nástěnka Klima pro Home Assistant

Vlastní Lovelace karta pro přehled klimatu v pěti místnostech. Je to **frontendová karta**, ne integrace ani automatizace. Není potřeba nic vkládat do `configuration.yaml` ani restartovat Home Assistant.

## Který soubor je správný?

- `src/` obsahuje TypeScriptový zdrojový kód; `index.ts` registruje kartu a `ha-klima-dashboard.ts` obsahuje hlavní Lit komponentu.
- `ha-klima-dashboard.js` v kořeni repozitáře je připravený JavaScriptový modul, který načítá Home Assistant.

Home Assistant TypeScript přímo nenačte. Pro běžnou instalaci tedy použijte HACS nebo soubor `ha-klima-dashboard.js`; soubor `.ts` nepřejmenovávejte ani nekopírujte do Home Assistantu. Připravený `.js` soubor už je součástí tohoto repozitáře — instalaci není potřeba kompilovat.

## Instalace doporučeným způsobem: přes HACS

Nejdřív musí být HACS nainstalovaný a nastavený v Home Assistantu. Pokud ho ještě nemáte, nejprve postupujte podle [oficiálního návodu k instalaci HACS](https://www.hacs.xyz/docs/use/).

### 1. Přidejte tento repozitář do HACS

1. V Home Assistantu otevřete **HACS**.
2. Otevřete nabídku **⋮** a zvolte **Vlastní repozitáře** (*Custom repositories*).
3. Do pole pro repozitář vložte:

   `https://github.com/michal-madle/ha-klima-dashboard`

4. Jako kategorii vyberte **Dashboard** a potvrďte přidání.

### 2. Stáhněte kartu

1. Vraťte se do HACS a vyhledejte **Klima Dashboard**.
2. Otevřete kartu repozitáře a zvolte **Stáhnout** (*Download*).
3. Počkejte, až HACS instalaci dokončí.

### 3. Zkontrolujte zdroj karty

HACS obvykle zdroj přidá automaticky. V Home Assistantu otevřete **Nastavení → Nástěnky → Zdroje** (*Settings → Dashboards → Resources*) a ověřte, že je tam tento zdroj:

`/hacsfiles/ha-klima-dashboard/ha-klima-dashboard.js`

Typ musí být **JavaScript module**. Pokud zdroj chybí, přidejte ho ručně. Nepřidávejte stejný zdroj dvakrát.

### 4. Přidejte kartu na nástěnku

1. Otevřete nástěnku, na kterou chcete kartu přidat. Pokud vlastní nástěnku ještě nemáte, vytvořte ji v **Nastavení → Nástěnky → Přidat nástěnku** a pak ji otevřete.
2. Otevřete nabídku **⋮**, zvolte **Upravit nástěnku** a pak **Přidat kartu**.
3. Vyberte kartu **Ruční** (*Manual*).
4. Otevřete soubor [examples/domov_prototyp_loznice.yaml](./examples/domov_prototyp_loznice.yaml), zkopírujte celý jeho obsah a vložte ho do editoru karty.
5. Uložte kartu a poté uložte také změny nástěnky.

Soubor YAML je konfigurace **jedné karty**. V editoru karty ji vložte přímo, bez dalších obalových řádků.

Na telefonu na výšku je karta místnosti přes celou šířku karty Domov. Počet sloupců určuje šířka karty: do 619 px jeden, od 620 px dva, od 1000 px tři, od 1400 px čtyři (nejvýš tolik, kolik je místností); karta je nejvýš 2300 px široká a na širokém monitoru vystředěná. V zobrazení Panel (jedna karta na celé šířce okna) jsou tedy na monitoru asi 2000 px čtyři sloupce. Šířku určuje zobrazení nástěnky v Home Assistantu:

| Zobrazení | Kolik místa dostane jediná karta | Dva sloupce na šířku |
|---|---|---|
| Panel (1 karta) | celou šířku okna bez postranního panelu (monitor asi 2000 px, iPhone 14 Pro na šířku asi 734 px) | ano, dva až čtyři sloupce bez dalších úprav |
| Sekce (*Sections*) | sloupec nejvýš 500 px; sekce s `column_span: 2` asi 670 px | ano, v sekci s `column_span: 2` |
| Masonry | jeden sloupec nejvýš asi 500 px | ne, jediná karta zůstane v jednom sloupci |

V zobrazení Masonry lze dosáhnout dvou sloupců dvěma kartami vedle sebe: každá dostane část místností a druhá má `title: ""` (prázdný název vynechá nadpis i prázdnou hlavičku). Na šířku je Masonry dá vedle sebe, na výšku pod sebe. Konfigurace místností zůstává stejná jako v příkladu; zkopírujte z něj jen potřebné místnosti:

```yaml
- type: custom:ha-klima-dashboard
  title: Domov
  house_mode_entity: input_select.house_mode
  rooms:
    - name: Ložnice      # … celá konfigurace místnosti z examples/
    - name: Pracovna
    - name: Maxík
- type: custom:ha-klima-dashboard
  title: ""
  house_mode_entity: input_select.house_mode
  rooms:
    - name: Mikuláš
    - name: Obývák
```

Jak to vypadá na iPhonu v aplikaci Home Assistant, je v [TODO P1.9](./TODO.md#p1-9) k ověření.

### 5. Zkontrolujte entity

Ukázková konfigurace obsahuje konkrétní ID entit z tohoto projektu. Musí odpovídat entitám ve vaší instalaci Home Assistantu. Pokud se liší, upravte ID v YAML podle svých entit; jejich názvy můžete ověřit v **Nástrojích → Stavy** (*Tools → States*; do verze 2026.7 se tato část jmenovala **Nástroje pro vývojáře**).

Karta standardně používá také entitu `input_select.house_mode` s možnostmi `Zima` a `Léto`. Pokud ji ve své instalaci nemáte, vytvořte ji přes **Nastavení → Zařízení a služby → Pomocníci → Vytvořit pomocníka → Rozbalovací seznam**. Zadejte možnosti `Zima` a `Léto`, pomocníka uložte a jeho výsledné ID nastavte v konfiguraci jako `house_mode_entity` (nahraďte jím řádek `house_mode_entity: input_select.house_mode`). Bez dostupného režimu domu nemůže karta správně určit stav místností. Volitelné nebo nedostupné hodnoty se zobrazí jako `––`.

Po přidání zdroje obnovte stránku Home Assistantu. Restart Home Assistantu není potřeba.

## Ruční instalace bez HACS

Tuto možnost použijte, pokud nechcete instalovat kartu přes HACS a máte přístup k souborům konfigurace Home Assistantu.

1. V tomto repozitáři stáhněte soubor `ha-klima-dashboard.js` z kořenové složky. **Nestahujte** `src/ha-klima-dashboard.ts`.
2. Ve složce konfigurace Home Assistantu najděte nebo vytvořte `www` a uložte do ní soubor jako `ha-klima-dashboard.js`. Výsledná cesta má být `/config/www/ha-klima-dashboard.js`. K souborům se můžete dostat například přes aplikaci File editor nebo Samba.
3. V Home Assistantu otevřete **Nastavení → Nástěnky → Zdroje** a přidejte:
   - URL: `/local/ha-klima-dashboard.js`
   - Typ: **JavaScript module**
4. Přidejte kartu podle kroků 4 a 5 výše.
5. Obnovte stránku Home Assistantu.

Při ruční aktualizaci souboru může prohlížeč používat starou uloženou verzi. Pokud se změna neprojeví, změňte URL zdroje například na `/local/ha-klima-dashboard.js?v=2` a stránku znovu obnovte. Při další aktualizaci číslo změňte.

## Dokumentace projektu

- [CURRENT_SPEC.md](./CURRENT_SPEC.md) – aktuální specifikace a zdroj pravdy
- [ENTITY_MAP.md](./ENTITY_MAP.md) – mapování entit používaných nástěnkou
- [DESIGN_HISTORY.md](./DESIGN_HISTORY.md) – historie návrhu a nahrazená rozhodnutí
- [MEMORY_SUMMARIZED.md](./MEMORY_SUMMARIZED.md) – stručná projektová paměť
- [AUDIT.md](./AUDIT.md) – konflikty, chybějící informace a doporučení pro údržbu
- [TODO.md](./TODO.md) – navržená vylepšení UX/UI (zatím nerozhodnutá, nejsou součástí zadání)

Pro aktuální chování a návrh má přednost `CURRENT_SPEC.md`, poté `ENTITY_MAP.md`. Historická rozhodnutí nejsou závazná.

## Konfigurace

Všechno, co jde nastavit, je v YAML konfiguraci karty. [Příklad](./examples/domov_prototyp_loznice.yaml) obsahuje úplně všechna nastavení: nahoře **společné nastavení pro celý dům** (prahy CO₂ a PM2.5, komfortní teploty, úsek mikrotrendů, historie, žaluzie, barevný režim …) s výchozími hodnotami, pod ním místnosti, každou se všemi klíči. Stačí přepsat číslo nebo text. Klíč bez hodnoty (např. `link:`) nebo smazaný klíč znamená výchozí hodnotu; u místnosti tedy prázdné `thresholds:` a `cover_presets:` = společné nastavení. Starší konfigurace bez nových klíčů funguje beze změny. Chybnou hodnotu karta neignoruje: místo karty ukáže chybu s názvem klíče (např. `thresholds: co2_warning (1600) must be below co2_critical (1500)`). Přesná pravidla jsou v [CURRENT_SPEC.md](./CURRENT_SPEC.md#konfigurace).

Společné pro všechny místnosti:

| Klíč | Výchozí | Co nastavuje |
|---|---|---|
| `title` | `Domov` (v jazyce karty) | nadpis; `""` ho vynechá |
| `theme` | `auto` | barevný režim: `auto` podle Home Assistantu (s motivem „Automaticky“ podle systému iPhonu), `dark`, `light` |
| `language` | `auto` | jazyk karty: `auto` podle Home Assistantu (čeština, švédština, jinak angličtina), `cs`, `sv`, `en` |
| `house_mode_entity` | `input_select.house_mode` | entita režimu domu |
| `house_modes` | `winter: Zima`, `summer: Léto` | hodnoty režimu domu |
| `thresholds` | viz příklad | vlhkost, CO₂, PM2.5, komfortní pásma v zimě a v létě, zastaralá data (`stale_minutes`), vlny vytápění (`heating_waves_2`, `heating_waves_3`) |
| `trends` | `minutes: 120`, `samples: 12` | úsek a počet bodů mikrotrendů, krok společné osy (`temperature_step`, `co2_step`, `pm25_step`) |
| `history` | `hours: 24`, noc 22–6 h | délka popupu Historie místnosti, noc v grafu, nejmenší rozsah osy teploty |
| `covers` | `script.zaluzie_posun`, ±5 %, 5 s | skript předvoleb, tolerance shody, konec pulzování; `presets` = 1–3 předvolby (Den, Stín, Tma; bez `name` pojmenované v jazyce karty) |
| `outside` | – | entity venkovních podmínek v hlavičce |

Pro každou místnost (`rooms`):

| Klíč | Co nastavuje |
|---|---|
| `name` | název (povinný) |
| `image` | ilustrace `bedroom`, `office`, `kids`, `living`, `none`, nebo adresa vlastního obrázku (`/local/klima/loznice.jpg`); bez klíče podle názvu místnosti; starší název klíče `scene` platí dál |
| `link` | klepnutí na název místnosti otevře stránku Home Assistantu (`/lovelace/loznice`) nebo webovou adresu |
| `temperature`, `humidity` | entity teploty a vlhkosti |
| `carbon_dioxide`, `pm25` | entity CO₂ a PM2.5; `false` = místnost čidlo nemá (řádek zmizí a stav místnosti ho nepotřebuje) |
| `window` | entita okna, nebo seznam oken |
| `cover`, `cover_presets` | žaluzie a vlastní předvolby jen pro ni |
| `thresholds` | vlastní prahy jen pro tuto místnost (zbytek společný) |
| `heating`, `air_conditioner` | Topení (`climate`, `overlay`, `target`, `intensity`) a Klimatizace |

Starší klíče `tado`, `samsung` a `heating.heating` karta odmítne s chybovou hláškou; přejmenujte je podle příkladu. Neznámý klíč místnosti (překlep) také.

Místnost se dvěma okny, bez čidla CO₂ a PM2.5, s vlastním obrázkem, odkazem a chladnějším pásmem v zimě (entity jsou jen ukázka):

```yaml
- name: Obývák
  image: /local/klima/obyvak.jpg
  link: /lovelace/obyvak
  temperature: sensor.vas_teplomer_temperature
  humidity: sensor.vas_teplomer_humidity
  carbon_dioxide: false
  pm25: false
  window:
    - entity: binary_sensor.vase_okno
      name: Okno
    - entity: binary_sensor.vase_dvere_zahrada
      name: Dveře na zahradu
  thresholds:
    winter_min: 19
```

Řádek okna zůstává jeden: „Zavřeno“, „Otevřeno · 12 min“, při dvou a více otevřených „Otevřena 2“ s dobou nejdéle otevřeného okna. Klepnutí na něj u místnosti s více okny otevře popup **Okna** se stavem každého okna; souhrn domu počítá okna, ne místnosti.

Vlastní obrázek uložte do složky `www` konfigurace Home Assistantu (`/config/www/klima/obyvak.jpg` je pak `/local/klima/obyvak.jpg`). Zobrazí se v pravém horním rohu karty místo ilustrace a stejně se ztrácí do karty.

## Ovládání karty

- Klepnutí na teplotu nebo její mikrotrend otevře popup **Historie místnosti – 24 h** (délka podle `history.hours`) ve stylu aplikace pro topení: křivka teploty, vytápění jako oranžová výplň pod ní, cíl Topení, noc, vlhkost a pod grafem vrstvy Topení a Klimatizace. Přejetím prstem po grafu se nahoře ukážou hodnoty v daném čase. Odkaz „Detail teploty“ otevře standardní detail entity.
- Klepnutí na vlhkost nebo okno otevře standardní detail entity Home Assistantu s grafem historie (u místnosti s více okny popup **Okna**). CO₂ a PM2.5 (hodnoty i mikrotrendy) jsou jedno tlačítko: s oběma čidly otevře popup **Kvalita vzduchu** s odkazem na detail každé veličiny, s jedním rovnou jeho detail. Klepnutí na panel žaluzie otevře standardní ovládání krytu. Každý klikací prvek má dotykovou plochu aspoň 44 × 44 px (i neviditelnou). U otevřeného okna je slabě vidět, jak dlouho je otevřené („Otevřeno · 12 min“); při konfliktu stojí oranžová tečka hned za popiskem místo „·“.
- Hodnota, která rozhodla o stavu místnosti (vlhkost při Vlhko / Sucho, teplota při Teplo / Chladno), má barvu stavu; ostatní zůstávají neutrální.
- Text „Bez dat“ pod názvem místnosti uvádí první chybějící údaj, např. „Bez dat · režim domu“ (entita `input_select.house_mode` chybí nebo nemá hodnotu Zima/Léto, případně hodnoty z `house_modes`).
- Měření, které senzor nenahlásil déle než 30 minut (`thresholds.stale_minutes`, i pro jednu místnost), je šedé a nebarví se; stav místnosti pak ukáže např. „Bez dat · CO₂ (před 2 h)“. Čas hlášení se čte z REST stavu entity (`last_reported`).
- Nad kartami se ukazují štítky souhrnu domu jen pro odchylky: na prvním místě oranžové **konflikty** („Okno otevřené · topí se: Ložnice“, „Okno otevřené · chladí se: …“, „Chladí se, i když je chladno: …“; u okna místnosti je navíc oranžová tečka), pak otevřená okna, ruční přepis Topení, místnosti, kde se topí, a zapnutá klimatizace.
- Popupy jsou ve stylu iOS: na mobilu se zavřou i tažením dolů za úchyt.
- Řádky **Topení** a **Klimatizace** jsou jedno tlačítko. Otevře popup vždy na primárním systému podle režimu domu (Zima Topení, Léto Klimatizace); přepínačem Topení | Klimatizace nahoře přejdete na druhý. Topení nabízí Vypnuto, Plán, Ručně a Boost (čtyři ikony v jedné řadě, přepínač Topení | Klimatizace je dole), Klimatizace režimy a předvolby (např. WindFree). Nabídka vychází z atributů `hvac_modes` a `preset_modes` příslušné `climate` entity a volá `climate.set_hvac_mode` / `climate.set_preset_mode`. U Topení se Ručně (posuvník teploty), Boost (pevných 25 °C) a Vypnuto ovládají i s dobou trvání („Jak dlouho“: 15 min až 8 h, do další změny plánu, dokud neobnovíte plán; posuvníky jako u teplé vody v aplikaci Tado). Odešlou se až při zavření popupu (ne hned) přes akci integrace Tado CE `tado_ce.set_climate_timer`; bez ní je Boost zašedlý a Ručně nastaví jen teplotu. Výchozí doba: Boost 30 min, Ručně do další změny plánu, Vypnuto napořád. Vypnuto na dobu je ruční přepis s 5 °C a zobrazuje se jako Vypnuto. Odkaz „Detail a historie“ v popupu otevře standardní detail entity.
- Tři tlačítka v jednom sloupci vpravo od panelu žaluzie (shora Den 100/100, Stín 0/100, Tma 0/0; poloha/naklopení) mají jen ikonu žaluzie bez rámečku a bez podbarvení; tmavě šedá je každá, tlumeně šampaňskou barvou se jen přebarví ta, která odpovídá stavu žaluzie. Po odeslání ikona cílové předvolby pulzuje, dokud žaluzie nedojede; pulzování skončí i tehdy, když se stav žaluzie 5 s nezmění (`covers.stall_seconds`). Předvolby, jejich počet (1–3), toleranci a skript nastavíte v `covers` a pro jednotlivou žaluzii v `cover_presets`. Odešlou se **dvojitým klepnutím nebo dlouhým stiskem**; jednoduché klepnutí jen ukáže nápovědu „Podržte nebo klepněte dvakrát“. V aplikaci Home Assistant na iPhonu je potvrdí haptika; volají skript `covers.script` (výchozí `script.zaluzie_posun`) s poli `entity`, `pos` a `tilt`. Skript musí v Home Assistantu existovat. Název tlačítka se ukáže jako nápověda při najetí myší a čtečka obrazovky ho přečte.
- Mikrotrendy teploty, CO₂ a PM2.5 (posledních 120 minut, `trends.minutes`) se obnovují každých 5 minut. Trend CO₂ a PM2.5 navazuje přímo na hodnotu a jednotku (začíná pod jejich koncem a doleva se ztrácí); trend teploty je vedle řádků Topení a Klimatizace. Každá veličina má v celém domě společnou osu (teplota zaokrouhlená na 1 °C, CO₂ na 100 ppm, PM2.5 na 5 µg/m³; `trends.*_step`), takže trendy místností jdou porovnat.
- Ilustrace v pravém horním rohu karty místnosti se zobrazí sama podle názvu (Ložnice, Pracovna, Maxík, Mikuláš, Obývák). Jinou zvolíte klíčem `image: bedroom | office | kids | living`, vlastní obrázek adresou (`image: /local/…`), vypnete ji `image: none`.
- Karta má **tmavý a světlý režim**. Výchozí `theme: auto` se řídí Home Assistantem: s motivem „Automaticky“ v profilu (výchozí) tedy nastavením Vzhled na iPhonu a přepne se hned, bez obnovení stránky. `theme: dark` nebo `theme: light` režim vynutí. Tmavý režim je dosavadní paleta.
- Karta mluví **česky, švédsky a anglicky** podle jazyka Home Assistantu v profilu uživatele: čeština a švédština jak jsou, každý jiný jazyk anglicky. Po změně jazyka se přepne hned. `language: cs`, `sv` nebo `en` jazyk vynutí. Formát čísel, času (12 / 24 h) a pořadí dne a měsíce se řídí profilem Home Assistantu (Profil → Obecné), pokud tam není „Podle jazyka“ (česky a švédsky „20,4 °C“, anglicky „20.4 °C“ a čas s AM / PM). Časové pásmo se neřídí profilem. Texty z konfigurace (nadpis, názvy místností, oken a předvoleb) se nepřekládají; bez nich karta použije výchozí text v jazyce karty (Domov / Hem / Home, Okno 1 / Fönster 1 / Window 1, Den / Dag / Day …). Překlady jsou v [src/translations](./src/translations/), zdrojem je čeština.
- Na úzkém displeji se u řádků Topení a Klimatizace může skrýt cílová teplota („· 21 °C“), pokud se vedle stavu nevejde; stav zůstane vždy celý.

## Rozsah prototypu

Implementováno je rozložení karty podle [CURRENT_SPEC.md](./CURRENT_SPEC.md), panel žaluzie s presety, mikrotrendy, popup ovládání Topení a Klimatizace, popup Historie místnosti – 24 h a detail entit s historií. Zatím neřešeno: hlášení „upozornění“ na Domov, slovní hodnocení venkovního vzduchu (dobrý / zhoršený / špatný; chybí hranice PM2.5, viz [AUDIT.md](./AUDIT.md), bod 4.5) a konečné vizuální doladění palety. Entitám, které nejsou v mapě potvrzené, nepřiřazujte odhadnutá ID.

## Sestavení

Po změně ve složce `src/` spusťte v kořeni repozitáře `npm install` a `npm run build`. Výsledek se zapíše do `dist/` a zkopíruje do kořenového `ha-klima-dashboard.js`, který používá HACS. Soubor `ha-klima-dashboard.js` ručně neupravujte.

## Testy

`npm test` kartu sestaví a spustí 71 testů v prohlížeči (Playwright). Testují sestavený `ha-klima-dashboard.js` na zkušební stránce [tests/harness.html](./tests/harness.html) s náhradními daty Home Assistantu ([tests/scenarios.js](./tests/scenarios.js)): konfiguraci (chybné hodnoty, příklad YAML s výchozími hodnotami, prahy místnosti, místnost bez CO₂ a PM2.5, dvě okna, vlastní předvolby, obrázek a odkaz), světlý a tmavý režim (přepínání, axe-core i ve světlém režimu), rozložení na šířkách 320–2560 px, jeden až čtyři sloupce včetně telefonu na šířku (852 × 393), zkrácenou místnost, formáty čísel, času a data z profilu, stránku pod popupem, hodiny u zastaralých hodnot, chybu u tlačítka předvolby, ikonu souhrnu Topí, velikost dotykových cílů (44 × 44 px měřená hit-testem), stavy místností, souhrn a konflikty, dobu otevření okna, tloušťku písma CO₂ a PM2.5, `title: ""`, zastaralá data, přístupnost (axe-core), klávesnici, dotyk, předvolby žaluzií (včetně tolerance ±5 %), ovládání Topení (teplota, Boost, doba, odeslání při zavření popupu, tah prstem po posuvníku, bez akce Tado CE, štítky Ručně a Boost, stav podle `climate` entity), historii místnosti, den změny času, osu teploty v historii a překreslování. Scénář „real“ načítá přímo [příklad YAML](./examples/domov_prototyp_loznice.yaml); test hlídá, že v příkladu nechybí žádné nastavení a že jeho hodnoty jsou výchozí. Jazyky: výběr podle Home Assistantu, švédské a anglické texty a čísla, žádný český text ve švédštině ani angličtině (kontrola celé karty, popupů, nápověd a popisů pro čtečku) a delší texty na všech šířkách. Každý scénář má jeden test rozložení, který projde všechny jeho šířky (320–1600 px a telefon na šířku) a na každé změří všechno najednou; axe-core a kontrast barev se kontrolují stejně v tmavém i světlém režimu.

`npm run coverage` spustí tytéž testy s měřením pokrytí kódu: V8 v Chromiu, přes zdrojovou mapu zpět na `src/*.ts` (knihovna monocart-coverage-reports). Kartu sestaví zvlášť do `coverage/build`, distribuovaný `ha-klima-dashboard.js` se nemění. Vypíše tabulku po souborech a do `coverage/report/coverage-final.json` (formát Istanbul) uloží data pro přesné porovnání před a po změně testů. Pokrytí se bere před každým načtením stránky, protože Chromium hlásí jen stránku, která je právě otevřená. Stav 25. 10.: příkazy 93,2 %, větve 84,5 %, funkce 91,1 %, řádky 93,9 %.

Poprvé je potřeba stáhnout prohlížeč: `npx playwright install chromium`. Volitelně i WebKit (blíž Safari na iPhonu): `npx playwright install webkit` a pak `PW_WEBKIT=1 npm test`. Zkušební stránku lze otevřít i ručně: `node tests/server.mjs` a v prohlížeči `http://127.0.0.1:4173/tests/harness.html?s=real` (scénáře `real`, `full`, `summer`, `alarm`, `stale`, `rest-error`, `unavailable`, `cover-unavailable`, `moving`, `longnames`, `config`; světlý režim přidáním `&theme=light`, jazyk Home Assistantu `&lang=sv`, `&lang=en` apod.). Testy nic nepřidávají do karty ani do instalace přes HACS.
