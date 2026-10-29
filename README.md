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

Jak to vypadá na iPhonu v aplikaci Home Assistant, je v [TODO C1](./TODO.md#c1) k ověření.

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

## Společný kit

Co mají karty Klima a Energie společné, je v repozitáři [ha-dashboard-kit](https://github.com/michal-madle/ha-dashboard-kit) a tato karta to používá jako závislost: jazyky a formáty čísel, času a data, čtení entit, pravidla konfigurace, gesto podržení nebo dvojklep (předvolby žaluzií), ovládací prvky (přepínač, segmentový ovladač, posuvník), nastavení TypeScriptu, sestavení a testovací infrastruktura. **Společný kód a společná pravidla se zakládají v kitu, ne tady**; v téhle kartě zůstávají místnosti, žaluzie, topení, historie, texty (`src/translations/`) a vzhled. Kde co hledat a jak se kit mění, říká [README kitu](https://github.com/michal-madle/ha-dashboard-kit#readme) a jeho `CURRENT_SPEC.md` (oddíl Kam co patří); v téhle kartě [CURRENT_SPEC.md](./CURRENT_SPEC.md#společný-kit-ha-dashboard-kit).

## Dokumentace projektu

- [CURRENT_SPEC.md](./CURRENT_SPEC.md) – aktuální specifikace a zdroj pravdy
- [ENTITY_MAP.md](./ENTITY_MAP.md) – mapování entit používaných nástěnkou
- [DESIGN_HISTORY.md](./DESIGN_HISTORY.md) – historie návrhu a nahrazená rozhodnutí
- [MEMORY_SUMMARIZED.md](./MEMORY_SUMMARIZED.md) – stručná projektová paměť
- [AUDIT.md](./AUDIT.md) – konflikty, chybějící informace a doporučení pro údržbu
- [TODO.md](./TODO.md) – otevřené otázky a ověření na zařízení (nejsou součástí zadání)

Pro aktuální chování a návrh má přednost `CURRENT_SPEC.md`, poté `ENTITY_MAP.md`. Historická rozhodnutí nejsou závazná.

## Konfigurace

Všechno, co jde nastavit, je v YAML konfiguraci karty. [Příklad](./examples/domov_prototyp_loznice.yaml) obsahuje úplně všechna nastavení: nahoře **společné nastavení pro celý dům** (prahy CO₂ a PM2.5, komfortní teploty, úsek mikrotrendů, historie, žaluzie, barevný režim …) s výchozími hodnotami, pod ním místnosti, každou se všemi klíči. Stačí přepsat číslo nebo text. Klíč bez hodnoty (např. `link:`) nebo smazaný klíč znamená výchozí hodnotu; u místnosti tedy prázdné `thresholds:` a `cover_presets:` = společné nastavení. Starší konfigurace bez nových klíčů funguje beze změny. Chybnou hodnotu karta neignoruje: místo karty ukáže chybu s názvem klíče (např. `thresholds: co2_warning (1600) must be below co2_critical (1500)`). Přesná pravidla jsou v [CURRENT_SPEC.md](./CURRENT_SPEC.md#konfigurace).

Klíče společné pro celý dům: `title`, `theme`, `language`, `house_mode_entity`, `house_modes`, `thresholds`, `trends`, `history`, `covers` (skript, tolerance a předvolby žaluzií) a `outside` (venkovní podmínky v hlavičce). Pro každou místnost (`rooms`): `name` (povinný), `image`, `link`, `temperature`, `humidity`, `carbon_dioxide`, `pm25` (`false` = místnost čidlo nemá, řádek zmizí a stav místnosti ho nepotřebuje), `window` (entita nebo seznam oken), `cover`, `cover_presets`, vlastní `thresholds`, `heating` a `air_conditioner`. Výchozí hodnoty a význam každého klíče jsou v [CURRENT_SPEC.md](./CURRENT_SPEC.md#konfigurace). Starší klíče `tado`, `samsung` a `heating.heating` karta odmítne s chybovou hláškou, stejně jako neznámý klíč místnosti (překlep); přejmenujte je podle příkladu.

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

Úplný popis chování je v [CURRENT_SPEC.md](./CURRENT_SPEC.md); tady jen to, co potřebuje uživatel.

- **Teplota** (nebo její mikrotrend) otevře popup **Historie místnosti – 24 h**: křivka teploty, vytápění jako oranžová výplň, cíl Topení, noc, vlhkost a pod grafem pruhy Topení, Klimatizace a oken. Přejetím prstem po grafu se nahoře ukážou hodnoty v daném čase.
- **Vlhkost** a **okno** otevřou standardní detail entity (u více oken popup **Okna**). **CO₂ a PM2.5** jsou jedno tlačítko: s oběma čidly popup **Kvalita vzduchu**, s jedním rovnou jeho detail. Panel žaluzie otevře standardní ovládání krytu. Každý klikací prvek má dotykovou plochu aspoň 44 × 44 px a popupy se na mobilu zavřou i tažením dolů za úchyt.
- **Žaluzie:** tři ikony vpravo od panelu (Den 100/100, Stín 0/100, Tma 0/0) se odešlou **dvojitým klepnutím nebo dlouhým stiskem**; jedno klepnutí jen ukáže nápovědu. Karta volá skript `covers.script` (výchozí `script.zaluzie_posun`) s poli `entity`, `pos` a `tilt`; skript musí v Home Assistantu existovat. Ikona cílové předvolby pulzuje, dokud žaluzie nedojede (nejdéle `covers.stall_seconds`).
- **Topení a Klimatizace:** řádek je jedno tlačítko, které otevře popup na primárním systému podle režimu domu (Zima Topení, Léto Klimatizace); přepínač Topení | Klimatizace nahoře přejde na druhý. Topení nabízí Vypnuto, Plán, Ručně a Boost s časovačem; Ručně, Boost a Vypnuto se odešlou při zavření popupu přes `tado_ce.set_climate_timer` (bez té akce je Boost zašedlý). Vypnutí po časovači naplánuje Home Assistant přes WebSocket `execute_script` (potřebuje právo spouštět skripty a nepřežije restart). Štítky v souhrnu domu („Topí 3 místnosti“, „Klimatizace: …“) otevřou stejný popup pro všechny jmenované místnosti.
- **Stav místnosti:** hodnota, která o něm rozhodla, má barvu stavu; ostatní jsou neutrální. Měření starší než `thresholds.stale_minutes` (30 min) je šedé a stav ukáže např. „Bez dat · CO₂ (před 2 h)“. Nad kartami jsou štítky souhrnu jen pro odchylky: konflikty (oranžové), otevřená okna, ruční přepis, topení, klimatizace.
- **Vzhled:** `theme: auto` se řídí Home Assistantem a přepne se hned, `dark` / `light` režim vynutí. Karta mluví česky, švédsky a anglicky podle jazyka Home Assistantu (`language` ho vynutí) a formáty čísel, času a data berou profil Home Assistantu; texty z konfigurace se nepřekládají. Překlady jsou v [src/translations](./src/translations/), zdrojem je čeština.
- Ilustrace místnosti se zvolí podle názvu, klíčem `image` (`bedroom`, `office`, `kids`, `living`, `none`) nebo vlastním obrázkem (`/local/…`). Na úzkém displeji se u řádků Topení a Klimatizace může skrýt cílová teplota, stav zůstane vždy celý.

## Rozsah prototypu

Implementováno je rozložení karty podle [CURRENT_SPEC.md](./CURRENT_SPEC.md), panel žaluzie s předvolbami, mikrotrendy, popupy ovládání Topení a Klimatizace, popup Historie místnosti – 24 h a detaily entit. Co čeká na vaši odpověď nebo na ověření na iPhonu (například hranice venkovního vzduchu), je v [TODO.md](./TODO.md). Entitám, které nejsou v mapě potvrzené, nepřiřazujte odhadnutá ID.

## Sestavení

Po změně ve složce `src/` spusťte v kořeni repozitáře `npm install` a `npm run build`. Výsledek se zapíše do `dist/` a zkopíruje do kořenového `ha-klima-dashboard.js`, který používá HACS. Soubor `ha-klima-dashboard.js` ručně neupravujte. Kit se stahuje z GitHubu při `npm install` (verze je v `package.json`); aktualizace kitu je `npm install git+https://github.com/michal-madle/ha-dashboard-kit.git#<commit>` a nový běh testů.

## Testy

`npm test` kartu sestaví a spustí 29 testů v prohlížeči (Playwright). Testují sestavený `ha-klima-dashboard.js` na zkušební stránce [tests/harness.html](./tests/harness.html) s náhradními daty Home Assistantu ([tests/scenarios.js](./tests/scenarios.js)). Související kontroly jsou jeden test s kroky (`test.step`), aby se karta nenačítala pro každou zvlášť. Pokrývají:

- konfiguraci (chybné hodnoty, příklad YAML s výchozími hodnotami, prahy místnosti, místnost bez CO₂ a PM2.5, dvě okna, vlastní předvolby, obrázek a odkaz); scénář „real“ načítá přímo [příklad YAML](./examples/domov_prototyp_loznice.yaml) a test hlídá, že v něm nechybí žádné nastavení;
- rozložení na šířkách 320–2560 px (jeden až čtyři sloupce, telefon na šířku 852 × 393), zkrácenou místnost, stránku pod popupem a dotykové cíle 44 × 44 px měřené hit-testem;
- stavy místností, souhrn a konflikty, zastaralá data, dobu otevření okna, barvy v tmavém i světlém režimu a přístupnost (axe-core, klávesnice, dotyk);
- předvolby žaluzií (včetně tolerance ±5 %), ovládání Topení a Klimatizace (teplota, Boost, doba, odeslání při zavření popupu, hromadné nastavení, stav podle `climate` entity), historii místnosti, den změny času a překreslování;
- jazyky (výběr podle Home Assistantu, švédské a anglické texty a čísla, žádný český text mimo češtinu, delší texty na všech šířkách) a formáty čísel, času a data z profilu.

`npm run coverage` spustí tytéž testy s měřením pokrytí kódu: V8 v Chromiu, přes zdrojovou mapu zpět na `src/*.ts` (knihovna monocart-coverage-reports). Kartu sestaví zvlášť do `coverage/build`, distribuovaný `ha-klima-dashboard.js` se nemění. Vypíše tabulku po souborech a do `coverage/report/coverage-final.json` (formát Istanbul) uloží data pro přesné porovnání před a po změně testů. Stav 28. 10.: příkazy 93,6 %, větve 85,3 %, funkce 91,1 %, řádky 94,0 %.

Poprvé je potřeba stáhnout prohlížeč: `npx playwright install chromium`. Volitelně i WebKit (blíž Safari na iPhonu): `npx playwright install webkit` a pak `PW_WEBKIT=1 npm test`. Zkušební stránku lze otevřít i ručně: `node tests/server.mjs` a v prohlížeči `http://127.0.0.1:4173/tests/harness.html?s=real` (scénáře `real`, `full`, `summer`, `alarm`, `stale`, `rest-error`, `unavailable`, `cover-unavailable`, `moving`, `longnames`, `config`; světlý režim přidáním `&theme=light`, jazyk Home Assistantu `&lang=sv`, `&lang=en` apod.). Testy nic nepřidávají do karty ani do instalace přes HACS.
