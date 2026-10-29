# Claude a Home Assistant: klimatická část

Doplněk k obecnému návodu v repozitáři energie: [AI_MCP.md](https://github.com/michal-madle/ha-energie-dashboard/blob/main/AI_MCP.md) (tři různé věci A, B, C, volba mezi nimi, bezpečnostní zásady, instalace ha-mcp). Tady se **neopakuje**; je tu jen to, co je jiné pro klima: co vystavit, na co se ptát, denní souhrn domu jako senzor, upozornění s vysvětlením.

Ověřeno 29. 10. 2026 v dokumentaci Home Assistantu (verze 2026.10.4); co se ověřit nepodařilo, je na konci. YAML níže jsem **nespustil** na živém Home Assistantu; před použitím ho vyzkoušejte v Nástroje pro vývojáře → Šablony a Stavy.

## Co v 2026.10 skutečně existuje

| Věc | Stav podle dokumentace | Zdroj |
|---|---|---|
| Integrace **Model Context Protocol Server** | je od 2025.2; adresa `…/api/mcp`, přihlášení OAuth 2.0 s PKCE, bez klientského tajemství; adresu najdete v **Nastavení → Systém → AI** (volba „Your MCP API“). Energetický návod popisuje přidání přes Zařízení a služby; postup se mezi verzemi liší, platí obrazovka ve vašem Home Assistantu | [MCP Server](https://www.home-assistant.io/integrations/mcp_server) |
| Co klient vidí | **jen entity vystavené Assistu**; „Expose all LLM APIs“ je ve výchozím stavu zapnuto u nových nastavení; „Require an administrator account“ je u nových nastavení zapnuto (u starších vypnuto, aby fungovali stávající klienti) | tamtéž |
| Zdroje a omezení | `homeassistant://assist/context-snapshot` jen pro čtení, jen když LLM API obsahuje nástroj `GetLiveContext`; nepodporuje sampling ani notifikace | tamtéž |
| Integrace **Anthropic** | entity `conversation` a `ai_task`; potřebuje API klíč s fakturací („placená služba“); umí strukturovaný výstup, prompt caching, volitelně web search, web fetch, spuštění kódu; neumí sentence triggery | [Anthropic](https://home-assistant.io/integrations/anthropic) |
| Akce **`ai_task.generate_data`** | parametry `task_name`, `instructions` (Jinja), `entity_id` (bez něj výchozí AI Task entita), `structure` (pole se `selector`, `description`, `required`), `attachments`; výsledek v `response_variable`, text v `data`, u struktury `data.<pole>`; dokumentace ukazuje i trigger-based `template:` sensor s `actions` | [AI Task](https://www.home-assistant.io/integrations/ai_task/) |
| Počasí | atributy `temperature`, `humidity`, `cloud_coverage`, `dew_point`, `uv_index`, vítr …; předpověď akcí `weather.get_forecasts` (`type: hourly`) s položkami `datetime`, `condition`, `temperature`, `precipitation_probability`, `humidity`, `dew_point`, `wind_speed`; co vrátí váš poskytovatel, se liší | [Weather](https://www.home-assistant.io/integrations/weather/) |
| **ha-mcp** (komunitní) | nástroje `ha_get_history`, `ha_get_logs`, `ha_get_automation_traces`, `ha_eval_template`, `ha_config_get_automation` a `ha_config_set_automation`; doporučená instalace je HA-MCP Custom Component z HACS (bez tokenu), jinak add-on; **Read Only Mode**, vypínání nástrojů, schvalování nástrojů | [ha-mcp](https://github.com/homeassistant-ai/ha-mcp) |
| Změny v 2026.10 pro MCP a Assist | MCP Server: options flow a volba vyžadovat administrátora; Assist: nový záměr `HassClimateSetFanMode` pro klimatizace | [changelog 2026.10](https://www.home-assistant.io/changelogs/core-2026.10/) |

## Co vystavit Assistu pro klima

Vystavení v **Nastavení → Hlasoví asistenti → Vystavit** má jednu pravidlo, které pro klima rozhoduje: oficiální server dovolí klientovi jednat jen s vystavenými entitami a „jednat“ znamená i **ovládat**, pokud to doména umožňuje (Assist má záměry pro klimatizace, a od 2026.10 i pro sílu větru). Čistě čtecí režim má oficiální server jen tím, že se nevystaví entity, které ovládat jdou. Čtecí režim po entitách nabízí až ha-mcp (Read Only Mode).

| Skupina | Entity | Doporučený začátek |
|---|---|---|
| **Vystavit hned** (jen čtení z podstaty) | teplota, vlhkost, CO₂, PM2.5: `sensor.loznice_teplomer_loznice_*`, `sensor.pracovna_teplomer_pracovna_temperature` a `_humidity`; okna `binary_sensor.*_okno_*`, `binary_sensor.obyvak_dvere_zahrada`; Topení jako senzory `sensor.*_tado_ce_*_heating`, `_target`, `_overlay`; baterie čidel; `weather.*` a `sun.sun` | ano |
| **Až po zkoušce** (ovládají) | `climate.*_tado_ce_*`, `climate.*_ac_*` | zatím ne; nejdřív zkusit v Assistu, jestli se na pokyn skutečně změní cíl, a vystavit po jedné místnosti |
| **Až po zkoušce** (ovládají) | `cover.*_zaluzie_*`, `script.zaluzie_posun`, `input_select.house_mode` | zatím ne |
| **Nevystavovat** | `device_tracker.*` a cokoli s polohou, adresy, identifikační čísla zařízení | ne |

Návrh pořadí: dva dny jen senzory a okna, ptát se; potom zvážit klimatizace po jedné místnosti (jen když chcete říkat „nastav v Pracovně 22“). Poznámka: názvy entit z exportů jsou podle `ENTITY_MAP.md`; teploměry Maxíku, Mikuláše a Obýváku tam nejsou potvrzené, takže chybí i tady.

## Na co se ptát (příklady)

Označení: **A** = stačí oficiální server (živé stavy), **B** = potřebuje ha-mcp (historie, šablony).

| Dotaz | Server | Co Claude použije |
|---|---|---|
| „Která místnost je teď nejchladnější a nejvíc vydýchaná?“ | A | stavy vystavených senzorů |
| „Je někde otevřené okno a topí se tam?“ | A | okna + `…_heating` |
| „Která místnost byla včera nejhorší a proč?“ | B | `ha_get_history` pro teplotu, CO₂, okna; stavový žebříček ze `CURRENT_SPEC.md` (nebo KL6 v [IDEAS.md](./IDEAS.md), až bude) |
| „Jak rychle po otevření okna klesá CO₂ v Ložnici? Kolik minut stačí na 800 ppm?“ | B | historie stavů CO₂ a okna (ne statistiky: pokles trvá minuty); viz KL1 |
| „Byla minulé noci v Ložnici CO₂ nad 1 000? Kolik minut?“ | B | `ha_get_history` nebo `ha_eval_template` |
| „Kdy dnes překročí Pracovna 25 °C, když nic neudělám?“ | B | historie + předpověď počasí; odhad, ne měření (viz [FORECAST.md](./FORECAST.md)) |
| „Která baterie čidla je nejblíž vybití?“ | A | baterie okenních čidel a ventilů (KL13) |
| „Napiš automatizaci: okno otevřené 5 minut a topí se → upozornění.“ | B | `ha_config_set_automation` po vašem schválení; vzor v KL20 |

Pro odpověď o historii je lepší v zadání říct, **za jaké období** a **ze kterých entit**, aby Claude nehádal. Pro čísla v tabulkách ať vždy uvede entitu a období.

## Denní souhrn domu jako senzor (`ai_task`)

Zásada: **čísla počítá Home Assistant, Claude je jen formuluje**, a text s jiným číslem než ve vstupu se zahodí a nahradí šablonou. To je stejné pravidlo jako u popisků v kartě (viz [FORECAST.md](./FORECAST.md), oddíl Popisky).

Potřebujete integraci Anthropic (API klíč) a její entitu `ai_task`; její přesný název najdete v Nástroje pro vývojáře → Stavy (filtr `ai_task`). Příklad je pro Ložnici (CO₂ a okno); další místnosti se přidají stejně. Chybějící údaj není nula: když některý ze senzorů nehlásí, souhrn se nevytvoří.

```yaml
# 1. Pomocné senzory. ID vzniknou z názvu (slugify); ověřte ve Stavech.
binary_sensor:
  - platform: threshold
    name: Ložnice CO2 nad 1000
    entity_id: sensor.loznice_teplomer_loznice_carbon_dioxide
    upper: 1000

sensor:
  - platform: history_stats
    name: Ložnice CO2 nad 1000 v noci
    entity_id: binary_sensor.loznice_co2_nad_1000
    state: "on"
    type: time                      # výsledek je v hodinách
    start: "{{ today_at('22:00') - timedelta(days=1) }}"
    end: "{{ today_at('06:00') }}"
  - platform: history_stats
    name: Ložnice okno otevřené v noci
    entity_id: binary_sensor.loznice_okno_loznice
    state: "on"                     # předpoklad: on = otevřeno (ENTITY_MAP.md: ověřit)
    type: time
    start: "{{ today_at('22:00') - timedelta(days=1) }}"
    end: "{{ today_at('06:00') }}"

template:
  # 2. Fakta: jediné místo, odkud jdou čísla do věty. Hodnoty v minutách a ppm.
  - sensor:
      - name: Klima fakta ráno
        unique_id: klima_fakta_rano
        state: "{{ now().isoformat() }}"
        attributes:
          fakta: >-
            {{ {
              'loznice_co2_noc_nad_1000_min': (states('sensor.loznice_co2_nad_1000_v_noci') | float(0) * 60) | round(0),
              'loznice_okno_otevrene_noc_min': (states('sensor.loznice_okno_otevrene_v_noci') | float(0) * 60) | round(0),
              'loznice_co2_ted_ppm': states('sensor.loznice_teplomer_loznice_carbon_dioxide') | float(0) | round(0)
            } }}

  # 3. Souhrn: Claude formuluje, kontrola čísel rozhodne, zda se text použije.
  - triggers:
      - trigger: time
        at: "07:30:00"
    conditions:
      - condition: template
        value_template: >-
          {{ has_value('sensor.loznice_co2_nad_1000_v_noci')
             and has_value('sensor.loznice_okno_otevrene_v_noci')
             and has_value('sensor.loznice_teplomer_loznice_carbon_dioxide') }}
    actions:
      - action: ai_task.generate_data
        data:
          task_name: Klima souhrn rána
          entity_id: ai_task.claude_ai_task      # nahradit skutečnou entitou
          instructions: >-
            Jsi stručný pozorovatel domu. Napiš česky nejvýš dvě věty (do 250 znaků)
            o uplynulé noci. Použij JEN čísla z faktů, přesně ve stejných jednotkách,
            žádná jiná, žádné hodiny ani data. Nic nedoporučuj a nepřikazuj; popiš, co se
            stalo a co z toho plyne.
            Fakta: {{ state_attr('sensor.klima_fakta_rano', 'fakta') | tojson }}
          structure:
            text:
              description: Souhrn, nejvýš 250 znaků
              required: true
              selector:
                text:
        response_variable: odpoved
      - variables:
          fakta: "{{ state_attr('sensor.klima_fakta_rano', 'fakta') }}"
          povolena: "{{ fakta.values() | map('float', 0) | map('round', 1) | list }}"
          text_ai: "{{ odpoved.data.text | default('') | trim }}"
          cisla_v_textu: >-
            {{ text_ai | regex_findall('[0-9]+(?:[.,][0-9]+)?')
               | map('replace', ',', '.') | map('float', 0) | map('round', 1) | list }}
          ok: >-
            {{ text_ai | length > 0 and text_ai | length <= 250
               and (cisla_v_textu | reject('in', povolena) | list | count) == 0 }}
          sablona: >-
            Noc v Ložnici: CO₂ nad 1 000 ppm {{ fakta.loznice_co2_noc_nad_1000_min | int }} min,
            okno otevřené {{ fakta.loznice_okno_otevrene_noc_min | int }} min.
    sensor:
      - name: Klima souhrn rána
        unique_id: klima_souhrn_rana
        state: "{{ 'ai' if ok else 'sablona' }}"      # kdo text napsal
        attributes:
          text: "{{ text_ai if ok else sablona }}"
```

Poznámky:
- Stav senzoru smí mít nejvýš 255 znaků, proto je text v atributu `text`.
- Kontrola čísel je záměrně přísná (číslo v textu musí být mezi fakty, po zaokrouhlení na desetinu). Věta s „3 hodinami“ místo „200 minut“ propadne a nahradí ji šablona; v zadání je proto „stejné jednotky“.
- Odeslání na telefon: akce `notify.mobile_app_<telefon>` se zprávou `{{ state_attr('sensor.klima_souhrn_rana', 'text') }}` v automatizaci, která se spouští změnou senzoru.
- Týdenní souhrn je tentýž vzor s `history_stats` přes sedm dní (`start: "{{ now() - timedelta(days=7) }}"`).

## Upozornění s vysvětlením (jen při události, s omezením četnosti)

Vzor: událost vznikne šablonovým `binary_sensor` (například „CO₂ v Ložnici nad 1 000 ppm déle než 10 minut při zavřeném okně“), automatizace zavolá `ai_task` s hotovými fakty, zkontroluje čísla jako výše a pošle zprávu. Omezení četnosti drží podmínka na `last_triggered` té samé automatizace:

```yaml
automation:
  - alias: Klima – upozornění s vysvětlením (CO2 Ložnice)
    mode: single
    triggers:
      - trigger: state
        entity_id: binary_sensor.klima_udalost_co2_loznice   # vlastní šablonový binary_sensor
        to: "on"
    conditions:
      - condition: not
        conditions:
          - condition: state
            entity_id: input_select.klima_pravidlo_vyvetrani   # přepínač z KL20; zde hodnota vypnuto
            state: vypnuto
      - condition: template      # nejvýš jedno upozornění za 15 minut
        value_template: >-
          {{ this.attributes.last_triggered is none
             or (now() - this.attributes.last_triggered).total_seconds() > 900 }}
    actions:
      - action: notify.mobile_app_telefon        # nahradit
        data:
          title: Ložnice
          message: >-
            CO₂ {{ states('sensor.loznice_teplomer_loznice_carbon_dioxide') | int }} ppm
            a okno je zavřené. Důsledky vyvětrání: viz detail místnosti.
```

Tento kostra posílá šablonovou větu; větu od Claude doplníte stejně jako v souhrnu (volání `ai_task`, `variables` s kontrolou čísel, `text_ai if ok else sablona`). Doporučení k četnosti: nejvýš jedno volání za 15 minut na místnost, další událost téže místnosti jen s novou hodnotou; volání `ai_task` dělat jen při události, ne při každé změně hodnoty.

## Co se mi ověřit nepodařilo

- Přesný seznam statistických nástrojů v ha-mcp (dokumentace uvádí historii, logy, stopy automatizací a šablony; samostatný nástroj pro dlouhodobé statistiky nejmenuje) a číslo aktuální verze ha-mcp.
- Chování `this.attributes.last_triggered` v podmínce automatizace, a že proměnné z akce `variables` jsou ve šablonách trigger-based entity (tak se to chová podle toho, jak jsou `response_variable` dokumentované, ale na živém systému jsem to nezkoušel). Ověřit v Nástroje pro vývojáře.
- Na kterém ID entity `ai_task` poběží vaše instalace.
- Ceny volání: podle dokumentace jde o placenou službu; skutečná spotřeba je v konzoli Anthropic.

## Zdroje

- [MCP Server – Home Assistant](https://www.home-assistant.io/integrations/mcp_server)
- [AI Task – Home Assistant](https://www.home-assistant.io/integrations/ai_task/)
- [Anthropic – Home Assistant](https://home-assistant.io/integrations/anthropic)
- [Weather – Home Assistant](https://www.home-assistant.io/integrations/weather/)
- [Changelog Home Assistant 2026.10](https://www.home-assistant.io/changelogs/core-2026.10/)
- [ha-mcp](https://github.com/homeassistant-ai/ha-mcp)
- [Obecný návod pro energii](https://github.com/michal-madle/ha-energie-dashboard/blob/main/AI_MCP.md)
