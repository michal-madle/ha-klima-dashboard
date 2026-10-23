# Mapa entit

Entity jsou rozděleny podle místností. „V exportu nenalezeno“ znamená, že ID nebylo nalezeno v JSONu dané místnosti; samo o sobě to nevylučuje, že entita existuje v Home Assistantu.

## Ložnice

| Název | entity_id | Účel |
|---|---|---|
| ALPSTUGA – teplota | `sensor.loznice_teplomer_loznice_temperature` | Teplota místnosti a její historie či trend. |
| ALPSTUGA – vlhkost | `sensor.loznice_teplomer_loznice_humidity` | Vlhkost místnosti a její historie. |
| ALPSTUGA – CO₂ | `sensor.loznice_teplomer_loznice_carbon_dioxide` | Stav vzduchu, hodnota, trend a 24hodinový graf. |
| ALPSTUGA – PM2.5 | `sensor.loznice_teplomer_loznice_pm2_5` | Stav vzduchu, hodnota a společný 24hodinový graf s CO₂. |
| IKEA MYGGBETT – okno | `binary_sensor.loznice_okno_loznice` | Otevřený/zavřený stav okna. |
| Tado CE – klimatizace/vytápění | `climate.loznice_tado_ce_loznice` | Stav a ovládání vytápění. |
| Tado CE – překryv | `sensor.loznice_tado_ce_loznice_overlay` | Rozlišení stavu Plán / Ručně / Vypnuto. |
| Tado CE – cílová teplota | `sensor.loznice_tado_ce_loznice_target` | Cílová teplota; při vypnutí se na kartě nezobrazuje. |
| Tado CE – vytápění | `sensor.loznice_tado_ce_loznice_heating` | Intenzita vytápění pro 0–3 vlny a historii. |
| Tado CE – připojení | `binary_sensor.loznice_tado_ce_loznice_connection` | Dostupnost připojení Tado CE. |
| Samsung – klimatizace | `climate.loznice_ac_loznice` | Režim, předvolba, cílová teplota a stav klimatizace. |
| Shelly – žaluzie | `cover.loznice_zaluzie_loznice` | Poloha a naklopení žaluzie; otevře standardní ovládání krytu. |

## Pracovna

| Název | entity_id | Účel |
|---|---|---|
| ALPSTUGA – teplota | `sensor.pracovna_teplomer_pracovna_temperature` | Teplota místnosti a její historie či trend. |
| ALPSTUGA – vlhkost | `sensor.pracovna_teplomer_pracovna_humidity` | Vlhkost místnosti a její historie. |
| ALPSTUGA – CO₂ | V exportu nenalezeno | Stav vzduchu, hodnota, trend a 24hodinový graf. |
| ALPSTUGA – PM2.5 | V exportu nenalezeno | Stav vzduchu, hodnota a společný 24hodinový graf s CO₂. |
| IKEA MYGGBETT – okno | `binary_sensor.pracovna_okno_pracovna` | Otevřený/zavřený stav okna. |
| Tado CE – klimatizace/vytápění | `climate.pracovna_tado_ce_pracovna` | Stav a ovládání vytápění. |
| Tado CE – překryv | `sensor.pracovna_tado_ce_pracovna_overlay` | Rozlišení stavu Plán / Ručně / Vypnuto. |
| Tado CE – cílová teplota | `sensor.pracovna_tado_ce_pracovna_target` | Cílová teplota. |
| Tado CE – vytápění | `sensor.pracovna_tado_ce_pracovna_heating` | Intenzita vytápění pro 0–3 vlny a historii. |
| Tado CE – připojení | `binary_sensor.pracovna_tado_ce_pracovna_connection` | Dostupnost připojení Tado CE. |
| Samsung – klimatizace | `climate.pracovna_ac_pracovna` | Režim, předvolba, cílová teplota a stav klimatizace. |
| Shelly – žaluzie | `cover.pracovna_zaluzie_pracovna` | Poloha a naklopení žaluzie; otevře standardní ovládání krytu. |

## Maxík

| Název | entity_id | Účel |
|---|---|---|
| ALPSTUGA – teplota | V exportu nenalezeno | Teplota místnosti a její historie či trend. |
| ALPSTUGA – vlhkost | V exportu nenalezeno | Vlhkost místnosti a její historie. |
| ALPSTUGA – CO₂ | V exportu nenalezeno | Stav vzduchu, hodnota, trend a 24hodinový graf. |
| ALPSTUGA – PM2.5 | V exportu nenalezeno | Stav vzduchu, hodnota a společný 24hodinový graf s CO₂. |
| IKEA MYGGBETT – okno | `binary_sensor.maxik_okno_maxik` | Otevřený/zavřený stav okna. |
| Tado CE – klimatizace/vytápění | `climate.maxik_tado_ce_maxik` | Stav a ovládání vytápění. |
| Tado CE – překryv | `sensor.maxik_tado_ce_maxik_overlay` | Rozlišení stavu Plán / Ručně / Vypnuto. |
| Tado CE – cílová teplota | `sensor.maxik_tado_ce_maxik_target` | Cílová teplota. |
| Tado CE – vytápění | `sensor.maxik_tado_ce_maxik_heating` | Intenzita vytápění pro 0–3 vlny a historii. |
| Tado CE – připojení | `binary_sensor.maxik_tado_ce_maxik_connection` | Dostupnost připojení Tado CE. |
| Samsung – klimatizace | `climate.maxik_ac_maxik` | Režim, předvolba, cílová teplota a stav klimatizace. |
| Shelly – žaluzie | `cover.maxik_zaluzie_maxik` | Poloha a naklopení žaluzie; otevře standardní ovládání krytu. |

## Mikuláš

| Název | entity_id | Účel |
|---|---|---|
| ALPSTUGA – teplota | V exportu nenalezeno | Teplota místnosti a její historie či trend. |
| ALPSTUGA – vlhkost | V exportu nenalezeno | Vlhkost místnosti a její historie. |
| ALPSTUGA – CO₂ | V exportu nenalezeno | Stav vzduchu, hodnota, trend a 24hodinový graf. |
| ALPSTUGA – PM2.5 | V exportu nenalezeno | Stav vzduchu, hodnota a společný 24hodinový graf s CO₂. |
| IKEA MYGGBETT – okno | `binary_sensor.mikulas_okno_mikulas` | Otevřený/zavřený stav okna. |
| Tado CE – klimatizace/vytápění | `climate.mikulas_tado_ce_mikulas` | Stav a ovládání vytápění. |
| Tado CE – překryv | `sensor.mikulas_tado_ce_mikulas_overlay` | Rozlišení stavu Plán / Ručně / Vypnuto. |
| Tado CE – cílová teplota | `sensor.mikulas_tado_ce_mikulas_target` | Cílová teplota. |
| Tado CE – vytápění | `sensor.mikulas_tado_ce_mikulas_heating` | Intenzita vytápění pro 0–3 vlny a historii. |
| Tado CE – připojení | `binary_sensor.mikulas_tado_ce_mikulas_connection` | Dostupnost připojení Tado CE. |
| Samsung – klimatizace | `climate.mikulas_ac_mikulas` | Režim, předvolba, cílová teplota a stav klimatizace. |
| Shelly – žaluzie | `cover.mikulas_zaluzie_mikulas` | Poloha a naklopení žaluzie; otevře standardní ovládání krytu. |

## Obývací pokoj

| Název | entity_id | Účel |
|---|---|---|
| ALPSTUGA – teplota | V exportu nenalezeno | Teplota místnosti a její historie či trend. |
| ALPSTUGA – vlhkost | V exportu nenalezeno | Vlhkost místnosti a její historie. |
| ALPSTUGA – CO₂ | V exportu nenalezeno | Stav vzduchu, hodnota, trend a 24hodinový graf. |
| ALPSTUGA – PM2.5 | V exportu nenalezeno | Stav vzduchu, hodnota a společný 24hodinový graf s CO₂. |
| IKEA MYGGBETT – okno | `binary_sensor.obyvak_dvere_zahrada` | Otevřený/zavřený stav dveří na zahradu. |
| Tado CE – klimatizace/vytápění | `climate.obyvak_tado_ce_obyvak` | Stav a ovládání vytápění. |
| Tado CE – překryv | `sensor.obyvak_tado_ce_obyvak_overlay` | Rozlišení stavu Plán / Ručně / Vypnuto. |
| Tado CE – cílová teplota | `sensor.obyvak_tado_ce_obyvak_target` | Cílová teplota. |
| Tado CE – vytápění | `sensor.obyvak_tado_ce_obyvak_heating` | Intenzita vytápění pro 0–3 vlny a historii. |
| Tado CE – připojení | `binary_sensor.obyvak_tado_ce_obyvak_connection_ru01`, `binary_sensor.obyvak_tado_ce_obyvak_connection_va01` | Dostupnost obou připojení Tado CE. |
| Samsung – klimatizace | `climate.obyvak_ac_obyvak` | Režim, předvolba, cílová teplota a stav klimatizace. |
| Žaluzie | Nepoužívá se | Místnost nemá venkovní žaluzie. |

## Sdílené a venkovní entity

| Název | entity_id | Účel |
|---|---|---|
| Režim domu | `input_select.house_mode` | Volba Zima/Léto; pořadí řádků vytápění a klimatizace i komfortní pásmo. |
| Aktuální venkovní teplota | V exportech nenalezeno | Hodnota v hlavičce. |
| Denní minimum venkovní teploty | V exportech nenalezeno | Hodnota v hlavičce. |
| Denní maximum venkovní teploty | V exportech nenalezeno | Hodnota v hlavičce. |
| Pravděpodobnost deště | V exportech nenalezeno | Hodnota v hlavičce. |
| Venkovní PM2.5 / kvalita vzduchu | V exportech nenalezeno | Kvalita vzduchu v hlavičce; preferovaný zdroj Sensor.Community, jednotka PM2.5. |

## Nevyřešené mapování

- JSONy potvrzují teplotu a vlhkost teploměru v Pracovně; CO₂ a PM2.5 tam ani teploměry v exportech místností Maxík, Mikuláš a Obývák nalezeny nebyly.
- V Obýváku je kontakt dveří do zahrady zobrazován jako okno - OK
- Entity venkovního počasí a venkovní PM2.5 nejsou v žádném z pěti místních JSON exportů; jejich mapování zůstává nedoložené.
