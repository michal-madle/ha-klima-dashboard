# ENTITY_MAP – mapa známých entit

Zdroj ID: exporty `HA entities/*.json` (aktuální stav názvů v Home Assistantu); role a pravidla z `CURRENT_SPEC.md` a Memory. Žádné ID není odhadnuté. Pokud se ID v Memory liší od exportu, platí export (rozdíly v `AUDIT.md`).

Nepoužívá se (platí pro všechny místnosti): analytické senzory Topení (comfort, mold risk, condensation, dew point, preheat, insights, surface temp, thermal inertia, …), `…_window` a `…_window_predicted` z Topení, původní (core) entity `*_tado_<místnost>_*`, vlastní teploměr klimatizace `sensor.<místnost>_ac_<místnost>_temperature/_humidity`, diagnostika Shelly (overcurrent, input, …).

## Ložnice

| Funkce | entity_id |
|---|---|
| Teplota místnosti (ALPSTUGA) | `sensor.loznice_teplomer_loznice_temperature` |
| Vlhkost (ALPSTUGA) | `sensor.loznice_teplomer_loznice_humidity` |
| CO₂ (ALPSTUGA) | `sensor.loznice_teplomer_loznice_carbon_dioxide` |
| PM2.5 (ALPSTUGA) | `sensor.loznice_teplomer_loznice_pm2_5` |
| Okno (IKEA MYGGBETT) | `binary_sensor.loznice_okno_loznice` |
| Topení – klimatizační entita | `climate.loznice_tado_ce_loznice` |
| Topení – režim Plán/Ručně/Vypnuto (Overlay) | `sensor.loznice_tado_ce_loznice_overlay` |
| Topení – cílová teplota | `sensor.loznice_tado_ce_loznice_target` |
| Topení – intenzita vytápění (%) | `sensor.loznice_tado_ce_loznice_heating` |
| Topení – dostupnost | `binary_sensor.loznice_tado_ce_loznice_connection` |
| Klimatizace | `climate.loznice_ac_loznice` |
| Žaluzie (Shelly) | `cover.loznice_zaluzie_loznice` |

Existuje, ale spec nepoužívá: `sensor.loznice_teplomer_loznice_air_quality` (ALPSTUGA), `sensor.loznice_okno_loznice_battery`, `sensor.loznice_zaluzie_loznice_plan_zaluzie_*` (vlastní virtuální plánovač žaluzií – ignorovat).

## Pracovna

| Funkce | entity_id |
|---|---|
| Teplota místnosti (Teploměr Pracovna) | `sensor.pracovna_teplomer_pracovna_temperature` |
| Vlhkost (Teploměr Pracovna) | `sensor.pracovna_teplomer_pracovna_humidity` |
| CO₂ | – (viz Chybějící entity) |
| PM2.5 | – (viz Chybějící entity) |
| Okno (IKEA MYGGBETT) | `binary_sensor.pracovna_okno_pracovna` |
| Topení – klimatizační entita | `climate.pracovna_tado_ce_pracovna` |
| Topení – Overlay | `sensor.pracovna_tado_ce_pracovna_overlay` |
| Topení – cílová teplota | `sensor.pracovna_tado_ce_pracovna_target` |
| Topení – intenzita vytápění (%) | `sensor.pracovna_tado_ce_pracovna_heating` |
| Topení – dostupnost | `binary_sensor.pracovna_tado_ce_pracovna_connection` |
| Klimatizace | `climate.pracovna_ac_pracovna` |
| Žaluzie (Shelly) | `cover.pracovna_zaluzie_pracovna` |

## Maxík

| Funkce | entity_id |
|---|---|
| Teplota místnosti | – (viz Chybějící entity) |
| Vlhkost | – |
| CO₂ | – |
| PM2.5 | – |
| Okno (IKEA MYGGBETT) | `binary_sensor.maxik_okno_maxik` |
| Topení – klimatizační entita | `climate.maxik_tado_ce_maxik` |
| Topení – Overlay | `sensor.maxik_tado_ce_maxik_overlay` |
| Topení – cílová teplota | `sensor.maxik_tado_ce_maxik_target` |
| Topení – intenzita vytápění (%) | `sensor.maxik_tado_ce_maxik_heating` |
| Topení – dostupnost | `binary_sensor.maxik_tado_ce_maxik_connection` |
| Klimatizace | `climate.maxik_ac_maxik` |
| Žaluzie (Shelly) | `cover.maxik_zaluzie_maxik` |

## Mikuláš

| Funkce | entity_id |
|---|---|
| Teplota místnosti | – (viz Chybějící entity) |
| Vlhkost | – |
| CO₂ | – |
| PM2.5 | – |
| Okno (IKEA MYGGBETT) | `binary_sensor.mikulas_okno_mikulas` |
| Topení – klimatizační entita | `climate.mikulas_tado_ce_mikulas` |
| Topení – Overlay | `sensor.mikulas_tado_ce_mikulas_overlay` |
| Topení – cílová teplota | `sensor.mikulas_tado_ce_mikulas_target` |
| Topení – intenzita vytápění (%) | `sensor.mikulas_tado_ce_mikulas_heating` |
| Topení – dostupnost | `binary_sensor.mikulas_tado_ce_mikulas_connection` |
| Klimatizace | `climate.mikulas_ac_mikulas` |
| Žaluzie (Shelly) | `cover.mikulas_zaluzie_mikulas` |

## Obývák

Bez žaluzií (stejné rozložení karty).

| Funkce | entity_id |
|---|---|
| Teplota místnosti | – (viz Chybějící entity) |
| Vlhkost | – |
| CO₂ | – |
| PM2.5 | – |
| „Okno“ = dveře na zahradu (IKEA MYGGBETT) | `binary_sensor.obyvak_dvere_zahrada` |
| Topení – klimatizační entita | `climate.obyvak_tado_ce_obyvak` |
| Topení – Overlay | `sensor.obyvak_tado_ce_obyvak_overlay` |
| Topení – cílová teplota | `sensor.obyvak_tado_ce_obyvak_target` |
| Topení – intenzita vytápění (%) | `sensor.obyvak_tado_ce_obyvak_heating` |
| Topení – dostupnost (dvě zařízení) | `binary_sensor.obyvak_tado_ce_obyvak_connection_ru01`, `binary_sensor.obyvak_tado_ce_obyvak_connection_va01` |
| Klimatizace | `climate.obyvak_ac_obyvak` |

## Sdílené a venkovní entity

| Funkce | entity_id |
|---|---|
| House Mode (Zima/Léto) | `input_select.house_mode` (z Memory; v exportech místností není) |

## Chybějící entity

Co nelze z Memory ani exportů jednoznačně určit:

| Co chybí | Kde | Poznámka |
|---|---|---|
| ALPSTUGA CO₂ a PM2.5 | Pracovna | export obsahuje jen teploměr (teplota, vlhkost) |
| ALPSTUGA teplota, vlhkost, CO₂, PM2.5 | Maxík, Mikuláš, Obývák | v exportech žádný teploměr |
| Typ teploměru v Pracovně | Pracovna | Memory ho nepopisuje (zmiňuje plánovaný TIMMERFLOTTE v Pracovně, nepotvrzeno) |
| Venkovní teplota | hlavička | žádná entita v Memory ani exportech |
| Denní minimum a maximum venkovní teploty | hlavička | zdroj není v Memory určen |
| Pravděpodobnost deště | hlavička | totéž |
| Venkovní PM2.5 (preferovaný zdroj Sensor.Community) | hlavička | ID není v Memory |
| Entita pro upozornění (alerts) | Domov | Memory nespecifikuje, co je upozornění |
| Potvrzení, že `input_select.house_mode` existuje se hodnotami Zima/Léto | sdílené | v Memory popsán jako rozhodnutí, ne jako ověřená entita |
| Význam stavu `on` u MYGGBETT (předpoklad on = otevřeno) | okna | exporty obsahují jen stav `off` |
| Stavy Topení Overlay pro „Ručně“ a „Vypnuto“ | Topení | v exportech všude `Schedule`; hodnoty Manual/Off jsou jen z Memory |
| Zrušené/zastaralé helpery bez určené role: `input_boolean.zaluzie_leto`, `switch.windfree_*`, `sensor.prumerna_teplota_domu`, `cover.zaluzie_dum` | sdílené | jen v Memory, v exportech nepotvrzeno; v aktuální spec nemají roli |
