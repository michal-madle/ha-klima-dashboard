---
name: "pv-system"
description: "Home PV/FVE solar system — charging priorities, safety standards"
---

- Has a PV/FVE (solar) system at home
- Investigated the AZ Router local HTTP REST API for managing PV system charging priorities (EV charger, battery, water heater)
- Consulted on Czech fire safety standards (ČSN P 73 0847) for chimney-to-panel clearance
- Explored lightning protection systems in a comparative Czech/Swedish context — property is part of a row house community sharing an ESE lightning rod
- Wants to automatically read battery SOC and TUV (hot water) temperature from the AZ Router cloud (new.azrouter.cloud); recorded Chrome HAR of the web app for API analysis (Oct 2026)
- Will click through the whole AZ Router web app to record further HAR files; wants a living document of reverse-engineered AZ cloud API findings plus a tool to reach all read endpoints (az_reverse.py, API notes doc created Oct 2026)
- Wanted AZ router control scenarios: (1) car boost ~4 kW even from grid with surplus to TUV; (2) car from surplus up to 10 kW, auto-start when plugged, then water heating; (3) hot water first, target 60 °C; (4) maximize grid export (no car charging or water heating; TUV temperature must always return to 60 °C); also wants charging stopped at 80 % based on BMW SOC; weighing Home Assistant vs own app vs cloud/NAS (Oct 2026)
- Home battery 11.2 kWh (GoodWe GW10KN-ET inverter) behaves oddly: at low draw it discharges slowly to the 15 % minimum, but at higher power (~5 kW) with SOC below ~30-40 % the SOC drops abruptly (e.g. 32 % to 14 % in under a minute, seen live in AZ Router as 1 % per 2 s), even after a full charge the day before; it also sometimes goes below the set minimum (in summer min was 10 % and it fell to 9 %). He suspects a "soft"/weak battery (Oct 2026)
- Service (FVE Podpora) replied about a year ago that the jump is normal SOC recalibration and advised occasionally charging to 100 %; he disagrees; about 6 months of warranty remain (as of 2026-10-17); wants data as evidence for service and a warranty claim (Oct 2026)
- Plan: collect data first (HA recorder history, discharge test at ~4-5 kW using wallbox boost with AZ Router screen recording, possibly a 1 s logger); battery in HA GoodWe integration reports 6 modules, SOH 98 %, min/max cell voltage and temperature with cell IDs, battery voltage/current, BMS charge/discharge limits (30 A), error/warning codes (Oct 2026)
- Discharge test 2026-10-19 (~5.7 kW, wallbox boost): normal down to ~20 % SOC, then sudden drop 20 % to 14 % and the battery "blocked" (stopped discharging); other parameters looked OK at first glance; details/CSV to follow
- Battery model: GS Titan HV, 3 x 3.74 kWh modules; he was told the battery warranty is 10 years (so ~8.5 years left), which differs from the ~6 months left on the earlier claim window (Oct 2026)
