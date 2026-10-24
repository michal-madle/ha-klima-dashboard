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

## Konfigurace místnosti

Každá místnost má volitelné klíče `temperature`, `humidity`, `carbon_dioxide`, `pm25`, `window`, `cover`, `scene` (ilustrace `bedroom`, `office`, `kids`, `living`, nebo `none` pro vypnutí; bez klíče se ilustrace zvolí podle názvu místnosti), `heating` (Topení: `climate`, `overlay`, `target`, `intensity`) a `air_conditioner` (Klimatizace: entita `climate`). Starší klíče `tado`, `samsung` a `heating.heating` karta odmítne s chybovou hláškou; přejmenujte je podle [příkladu](./examples/domov_prototyp_loznice.yaml).

## Ovládání karty

- Klepnutí na teplotu nebo její mikrotrend otevře popup **Historie místnosti – 24 h** ve stylu aplikace pro topení: křivka teploty, vytápění jako oranžová výplň pod ní, cíl Topení, noc, vlhkost a pod grafem vrstvy Topení a Klimatizace. Přejetím prstem po grafu se nahoře ukážou hodnoty v daném čase. Odkaz „Detail teploty“ otevře standardní detail entity.
- Klepnutí na vlhkost, CO₂, PM2.5 (i jejich mikrotrendy) nebo okno otevře standardní detail entity Home Assistantu s grafem historie. Klepnutí na panel žaluzie otevře standardní ovládání krytu.
- Text „Bez dat“ pod názvem místnosti uvádí první chybějící údaj, např. „Bez dat · režim domu“ (entita `input_select.house_mode` chybí nebo nemá hodnotu Zima/Léto).
- Měření, které senzor nenahlásil déle než 30 minut (`thresholds.stale_minutes`), je šedé a nebarví se; stav místnosti pak ukáže např. „Bez dat · CO₂ (před 2 h)“. Čas hlášení se čte z REST stavu entity (`last_reported`).
- Nad kartami se ukazují štítky souhrnu domu jen pro odchylky: otevřená okna, ruční přepis Topení, místnosti, kde se topí, a zapnutá klimatizace.
- Popupy jsou ve stylu iOS: na mobilu se zavřou i tažením dolů za úchyt.
- Řádky **Topení** a **Klimatizace** jsou jedno tlačítko. Otevře popup vždy na primárním systému podle režimu domu (Zima Topení, Léto Klimatizace); přepínačem Topení | Klimatizace nahoře přejdete na druhý. Topení nabízí Vypnuto, Plán, Ručně a Boost, Klimatizace režimy a předvolby (např. WindFree). Nabídka vychází z atributů `hvac_modes` a `preset_modes` příslušné `climate` entity a volá `climate.set_hvac_mode` / `climate.set_preset_mode`. Boost je aktivní jen tehdy, když entita předvolbu `boost` nabízí. Odkaz „Detail a historie“ v popupu otevře standardní detail entity.
- Tři tlačítka v jednom sloupci vpravo od panelu žaluzie (shora Den 100/100, Stín 0/100, Tma 0/0; poloha/naklopení) mají jen ikonu žaluzie bez rámečku; šedá je každá, bílá ta, která odpovídá stavu žaluzie. Odešlou se **dvojitým klepnutím nebo dlouhým stiskem**; jednoduché klepnutí jen ukáže nápovědu „Podržte nebo klepněte dvakrát“. V aplikaci Home Assistant na iPhonu je potvrdí haptika; volají službu `script.zaluzie_posun` s poli `entity`, `pos` a `tilt`. Skript musí v Home Assistantu existovat. Název tlačítka se ukáže jako nápověda při najetí myší a čtečka obrazovky ho přečte.
- Mikrotrendy teploty, CO₂ a PM2.5 (posledních 120 minut) se obnovují každých 5 minut. Jsou v pravém sloupci informačních řádků, stejně širokém jako sloupec s hodnotami; trend teploty je vedle řádků Topení a Klimatizace. Každá veličina má v celém domě společnou osu (teplota zaokrouhlená na 1 °C, CO₂ na 100 ppm, PM2.5 na 5 µg/m³), takže trendy místností jdou porovnat.
- Ilustrace v pravém horním rohu karty místnosti se zobrazí sama podle názvu (Ložnice, Pracovna, Maxík, Mikuláš, Obývák). Jinou zvolíte klíčem `scene: bedroom | office | kids | living`, vypnete ji `scene: none`.
- Na úzkém displeji se u řádků Topení a Klimatizace může skrýt cílová teplota („· 21 °C“), pokud se vedle stavu nevejde; stav zůstane vždy celý.

## Rozsah prototypu

Implementováno je rozložení karty podle [CURRENT_SPEC.md](./CURRENT_SPEC.md), panel žaluzie s presety, mikrotrendy, popup ovládání Topení a Klimatizace, popup Historie místnosti – 24 h a detail entit s historií. Zatím neřešeno: hlášení „upozornění“ na Domov, slovní hodnocení venkovního vzduchu (dobrý / zhoršený / špatný; chybí hranice PM2.5, viz [AUDIT.md](./AUDIT.md), bod 4.5) a konečné vizuální doladění palety. Entitám, které nejsou v mapě potvrzené, nepřiřazujte odhadnutá ID.

## Sestavení

Po změně ve složce `src/` spusťte v kořeni repozitáře `npm install` a `npm run build`. Výsledek se zapíše do `dist/` a zkopíruje do kořenového `ha-klima-dashboard.js`, který používá HACS. Soubor `ha-klima-dashboard.js` ručně neupravujte.

## Testy

`npm test` kartu sestaví a spustí testy v prohlížeči (Playwright). Testují sestavený `ha-klima-dashboard.js` na zkušební stránce [tests/harness.html](./tests/harness.html) s náhradními daty Home Assistantu ([tests/scenarios.js](./tests/scenarios.js)): rozložení na šířkách 320–768 px, stavy místností a souhrn, zastaralá data, přístupnost (axe-core), klávesnici, dotyk, předvolby žaluzií, historii místnosti, den změny času a překreslování. Scénář „real“ používá stejná ID entit jako [příklad YAML](./examples/domov_prototyp_loznice.yaml); test hlídá, že se neliší.

Poprvé je potřeba stáhnout prohlížeč: `npx playwright install chromium`. Volitelně i WebKit (blíž Safari na iPhonu): `npx playwright install webkit` a pak `PW_WEBKIT=1 npm test`. Zkušební stránku lze otevřít i ručně: `node tests/server.mjs` a v prohlížeči `http://127.0.0.1:4173/tests/harness.html?s=real` (scénáře `real`, `full`, `summer`, `alarm`, `stale`, `rest-error`, `unavailable`, `cover-unavailable`, `moving`, `longnames`). Testy nic nepřidávají do karty ani do instalace přes HACS.
