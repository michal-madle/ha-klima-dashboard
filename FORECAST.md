# Popisky podle normy a předpověď „co když“

Jen **detail místnosti a upozornění**. Hlavní stav místnosti na kartě zůstává na dohodnutém žebříčku z `CURRENT_SPEC.md` a normou se nemění. Nic z toho se nezapíná samo: karta nic nespíná, předpověď je simulace.

**Stav k 29. 10. 2026:** žádná čísla o přesnosti zatím neexistují. Chybí `klima_hodiny.csv` (viz [tools/export_hodiny_klima.py](./tools/export_hodiny_klima.py), [TYDEN.md](./TYDEN.md)). Všechny prahy a vzorce níže jsou **návrh k ověření na vašich datech**, ne měření. Klíče konfigurace nejsou ve specifikaci; do `CURRENT_SPEC.md` patří až po vašem potvrzení.

## 1. Popisky podle normy místnosti

### Co je norma

Pro každou kombinaci místnost × veličina (teplota, vlhkost, CO₂, PM2.5) × hodina dne × typ dne (pracovní den / víkend) se z hodinových dlouhodobých statistik za posledních **28 dní** spočítají percentily **p10, p25, p75, p90**. Sezónu řeší posuvné okno samo; po přepnutí `input_select.house_mode` se okno neřeže, jen se pomalu přelévá.

| Pravidlo | Hodnota (návrh) | Proč |
|---|---|---|
| Minimum vzorků v bucketu | 8 hodnot | víkendový bucket má za 28 dní jen 8 hodnot; méně → „bez normy“ a popisek se nezobrazí |
| Zdroj | `recorder/statistics_during_period`, `period: hour`, `mean` | vyžaduje `state_class`; bez něj fallback na stavy jen ~10 dní, což na normu nestačí (viz export) |
| Počítá se | v kartě, jednou za hodinu na místnost, cache v paměti | nic se neukládá do Home Assistantu |

### S čím nesouhlasím: pásmo p25–p75 jako spouštěč

Pásmo p25–p75 obsahuje z definice jen polovinu hodnot. Kdyby jeho překročení spouštělo popisek nebo upozornění, ozvalo by se zhruba v **polovině hodin**. Navrhuji proto dvě úrovně:

| Úroveň | Pravidlo | Použití |
|---|---|---|
| **Zobrazení** | p25–p75 jako „obvyklé pásmo“ v detailu (šedý pruh za grafem) | vizuální kontext, nic nespouští |
| **Událost** | hodnota mimo p10–p90 **a** odchylka od mediánu aspoň o půl kroku trendu ze specifikace (0,5 °C, 50 ppm, 2,5 µg/m³; vlhkost 3 %, návrh) **a** trvá aspoň 30 minut | popisek a upozornění |

Odhad: p10/p90 samo o sobě spouští v ~20 % hodin; minimální odchylka a trvání to dolů tlačí, na kolik, ukáže až export. Počet událostí za týden se po exportu spočítá a vypíše do [TYDEN.md](./TYDEN.md); pokud vyjde víc než asi 3 události denně na místnost, zpřísní se práh, ne se zavede další tlumení.

### Věty

Šablonové věty (cs; sv a en se musí doplnit a nechat zkontrolovat, jako u C5; nepřeložené neposílat):

| Událost | Věta (cs) |
|---|---|
| teplota nad normou | `{místnost}: o {delta} °C tepleji než obvykle v tuto dobu` |
| teplota pod normou | `{místnost}: o {delta} °C chladněji než obvykle v tuto dobu` |
| CO₂ nad normou | `{místnost}: CO₂ je o {delta} ppm výš než obvykle` |
| vlhkost mimo normu | `{místnost}: vlhkost {delta} % {nad/pod} obvyklým pásmem` |
| PM2.5 nad normou | `{místnost}: prach o {delta} µg/m³ výš než obvykle` |

Čísla vstupují jen z výpočtu (`delta` = rozdíl proti mediánu bucketu, zaokrouhlený na krok veličiny, formátování `cs-CZ`).

### Volitelná formulace od Claude (jen na vyžádání)

Jen když uživatel klepne na „vysvětlit“, nikdy při renderu:

1. Karta (nebo automatizace, viz [AI_MCP.md](./AI_MCP.md)) pošle strukturovaná fakta: veličina, hodnota, medián, p10/p90, okno, trvání.
2. Odpověď má nejvýš 2 věty. **Kontrola:** všechna čísla v textu musí být mezi vstupními (po zaokrouhlení); jinak se zahodí a zobrazí se šablona.
3. Omezení: nejvýš 1 volání za 15 minut na místnost, volání jen při události.
4. Bez klíče nebo při chybě platí šablona; chyba se nezakrývá, jen se zaznamená do konzole.

### Návrh konfigurace (není ve specifikaci)

```yaml
type: custom:ha-klima-dashboard
norm:
  enabled: true
  window_days: 28
  min_samples: 8
  event_percentiles: [10, 90]
  min_duration_minutes: 30
labels:
  language: cs
  ai:
    enabled: false          # zapnout až po zkoušce v AI_MCP.md
    cooldown_minutes: 15
```

## 2. Předpověď teploty a „co když“

### Model

Jednoduchý jednokrokový model místnosti (řád prvního stupně, hodinový krok), parametry zvlášť pro každou místnost, proložené metodou nejmenších čtverců z `klima_hodiny.csv`:

```
T[k+1] = T[k] + a·(T_venku[k] − T[k])           # prostup přes obálku
              + b·S[k]·(1 − z[k])               # slunce a zastínění žaluziemi
              + c·H[k]                           # topení (0–100 %)
              + d·A[k]·(T[k] − T_cíl_AC[k])     # klimatizace, jen když chladí
              + e·W[k]·(T_venku[k] − T[k])       # otevřené okno navíc (podíl hodiny)
```

| Vstup | Zdroj | Poznámka |
|---|---|---|
| `T_venku` | `weather` (předpověď `weather.get_forecasts`, `type: hourly`), měřeno: venkovní teplota | ID entit **nejsou potvrzené** (ENTITY_MAP.md) |
| `S` slunce | PV řetězce (`sensor.goodwe_pv1_power`, `pv2_power`) jako proxy záření; pro budoucnost z oblačnosti předpovědi a tvaru dne | PV stringy mají vlastní nastavení panelů; proxy, ne ozáření. Sdílený model slunce patří do `ha-dashboard-kit` |
| `z` zastínění | pozice a náklon žaluzií (0 % zavřeno, 100 % otevřeno; neznámé zůstává neznámé a hodina se do fitu nebere) | Obývák žaluzie nemá, `z = 0` |
| `H` | `sensor.*_tado_ce_*_heating` (vlny 0 / 1–34 / 35–67 / 68–100 %) | |
| `A` | stav `climate.*_ac_*` = `cool`, cílová teplota | Samsung je zdroj chlazení |
| `W` | podíl hodiny s otevřeným oknem (z `okno_min` v exportu) | |

Počet parametrů je 5 na místnost; při 14 dnech je to ~336 hodin, což je málo na stabilní odhad pro sluneční a okenní člen. Proto doporučuji **28 dní** a ridge regularizaci, a nevěřit modelu u místností, kde fit vyjde se špatným znaménkem (například `b < 0`): tam se předpověď nezobrazí.

### Scénáře

Vedle sebe tři sloupce plus „nic neměnit“:

| Scénář | Co se změní v modelu |
|---|---|
| **Nic neměnit** | beze změny |
| **Vyvětrat** (například 15 min) | `W = 0,25` v dané hodině; teplotní dopad z modelu, pokles CO₂ z naměřeného `ach_za_h` z `okna_udalosti.csv` (KL1) |
| **Zatáhnout žaluzie** | `z` na zvolenou polohu, jen kde je `cover` |
| **Chladit** | `A = 1` s cílem; spotřeba jen kde je měřený výkon (v exportu jen Obývák); jinde „spotřeba neměřena, běh klimatizace X h“ |

U každého scénáře se ukáže: **teplota za 2 h**, **za jak dlouho překročí pásmo** (nebo „nepřekročí do 6 h“) a **spotřeba/náklad** (vlny topení, hodiny běhu AC, kWh jen tam, kde je měření). Nikdy instrukce („udělejte“), jen důsledek. Štítek **Simulace** a interval ±MAE z backtestu u každého čísla.

### Backtest (povinný před zobrazením)

| Krok | Pravidlo |
|---|---|
| Rozdělení | rolling origin: trénink na všem před dnem D, předpověď +1, +2, +4 h od každé hodiny dne D; D probíhá posledních 7 dní |
| Srovnání | persistence (poslední hodnota), stejná hodina včera |
| Metriky | MAE a bias na každém horizontu; úspěšnost určení „překročí pásmo do 4 h“ (přesnost, úplnost) |
| Podmínka pro zobrazení | MAE při +2 h aspoň o 20 % lepší než persistence **a** ≤ 0,6 °C (obojí návrh prahu; po prvním exportu ho potvrdíme) |
| Jinak | v detailu se předpověď nezobrazí; ostatní věci (normy, popisky) zůstávají |

Výsledek (vyplní se z exportu, dosud neexistuje):

| Místnost | MAE +1 h | MAE +2 h | MAE +4 h | persistence +2 h | bias +2 h | verdikt |
|---|---|---|---|---|---|---|
| Ložnice | nenaměřeno | nenaměřeno | nenaměřeno | nenaměřeno | nenaměřeno | čeká na export |
| Pracovna | nenaměřeno | nenaměřeno | nenaměřeno | nenaměřeno | nenaměřeno | čeká na export |
| Maxík | nenaměřeno | nenaměřeno | nenaměřeno | nenaměřeno | nenaměřeno | chybí teploměr v ENTITY_MAP |
| Mikuláš | nenaměřeno | nenaměřeno | nenaměřeno | nenaměřeno | nenaměřeno | chybí teploměr v ENTITY_MAP |
| Obývací pokoj | nenaměřeno | nenaměřeno | nenaměřeno | nenaměřeno | nenaměřeno | chybí teploměr v ENTITY_MAP |

Samotný backtestovací skript zatím neexistuje; napíšu ho nad prvním exportem, ne dřív. Skript bych nepsal bez dat: tvar sloupců se po exportu může upravit.

### Rizika, která už teď vidím

- Slunce přes PV řetězce nepostihuje stínění sousedními domy ani výšku slunce na konkrétním okně; místnost na severu může mít `b ≈ 0`.
- Topení a žaluzie se často mění společně (člověk reaguje na stejnou věc), takže jejich koeficienty se spolu zaměňují; ridge to zmírní, ne odstraní.
- Dvě klimatizace na jedné venkovní jednotce se ovlivňují (neověřeno, otázka v [TYDEN.md](./TYDEN.md)).
