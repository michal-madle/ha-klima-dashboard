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

- Klepnutí na teplotu nebo její mikrotrend otevře popup **Historie místnosti – 24 h**: křivka teploty, přerušovaná vlhkost a pod nimi časové vrstvy intenzity vytápění, Topení (Plán / Ručně / Vypnuto) a Klimatizace. Odkaz „Detail teploty“ otevře standardní detail entity.
- Klepnutí na vlhkost, CO₂, PM2.5 (i jejich mikrotrendy) nebo okno otevře standardní detail entity Home Assistantu s grafem historie. Klepnutí na panel žaluzie otevře standardní ovládání krytu.
- Text „Bez dat“ pod názvem místnosti uvádí první chybějící údaj, např. „Bez dat · režim domu“ (entita `input_select.house_mode` chybí nebo nemá hodnotu Zima/Léto).
- Klepnutí na řádek **Topení** otevře popup: Vypnuto, Plán, Ručně a Boost. Klepnutí na řádek **Klimatizace** otevře popup s režimy a předvolbami (např. WindFree). Nabídka vychází z atributů `hvac_modes` a `preset_modes` příslušné `climate` entity a volá `climate.set_hvac_mode` / `climate.set_preset_mode`. Boost je aktivní jen tehdy, když entita předvolbu `boost` nabízí. Odkaz „Detail a historie“ v popupu otevře standardní detail entity.
- Tři kulatá tlačítka v jednom sloupci vlevo od panelu žaluzie (shora Tma 0/0, Stín 0/100, Den 100/100; poloha/naklopení) mají jen ikonu. Odešlou se **dvojitým klepnutím nebo dlouhým stiskem** (jednoduché klepnutí nic neudělá); volají službu `script.zaluzie_posun` s poli `entity`, `pos` a `tilt`. Skript musí v Home Assistantu existovat. Název tlačítka se ukáže jako nápověda při najetí myší a čtečka obrazovky ho přečte.
- Mikrotrendy teploty, CO₂ a PM2.5 (posledních 120 minut) se obnovují každých 5 minut. Jsou v pravém sloupci informačních řádků, stejně širokém jako sloupec s hodnotami; trend teploty je vedle řádků Topení a Klimatizace. Každá veličina má v celém domě společnou osu (teplota zaokrouhlená na 1 °C, CO₂ na 100 ppm, PM2.5 na 5 µg/m³), takže trendy místností jdou porovnat.
- Ilustrace v pravém horním rohu karty místnosti se zobrazí sama podle názvu (Ložnice, Pracovna, Maxík, Mikuláš, Obývák). Jinou zvolíte klíčem `scene: bedroom | office | kids | living`, vypnete ji `scene: none`.
- Na úzkém displeji se u řádků Topení a Klimatizace může skrýt cílová teplota („· 21 °C“), pokud se vedle stavu nevejde; stav zůstane vždy celý.

## Rozsah prototypu

Implementováno je rozložení karty podle [CURRENT_SPEC.md](./CURRENT_SPEC.md), panel žaluzie s presety, mikrotrendy, popup ovládání Topení a Klimatizace, popup Historie místnosti – 24 h a detail entit s historií. Zatím neřešeno: hlášení „upozornění“ na Domov, slovní hodnocení venkovního vzduchu (dobrý / zhoršený / špatný; chybí hranice PM2.5, viz [AUDIT.md](./AUDIT.md), bod 4.5) a konečné vizuální doladění palety. Entitám, které nejsou v mapě potvrzené, nepřiřazujte odhadnutá ID.

## Sestavení

Po změně ve složce `src/` spusťte v kořeni repozitáře `npm install` a `npm run build`. Výsledek se zapíše do `dist/` a zkopíruje do kořenového `ha-klima-dashboard.js`, který používá HACS. Soubor `ha-klima-dashboard.js` ručně neupravujte.
