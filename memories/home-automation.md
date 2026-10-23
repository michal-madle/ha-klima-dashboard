---
name: "home-automation"
description: "Shelly/Tuya home automation — blinds, Nous water valve, tank mixing scenes (Velký/Malý okruh); blind schedule moving from Shelly script to HA"
---

- Automating home using Shelly Gen4 2PM devices for outdoor venetian blind control
- East-facing blinds: Ložnice at 192.168.11.113 and Pracovna at 192.168.11.106
- Moved away from "central brain" architecture — each Shelly cover now runs its own standalone script with no calls between devices; no Home Assistant involved
- Ložnice cover schedule: morning to pos35/slat50 at max(sunrise, 07:00 weekday/08:30 weekend+holiday), fixed 12:30 to pos100/slat100, sunset to pos0 (slat untouched), civil_twilight_end to pos0/slat0 — moves gated by an "only move if current is less/more open than target" safety check
- Follow-up project: differential temperature-based valve control using NOUS L3 WiFi controllers and DS18B20 sensors via the Tuya IoT Platform Rule Engine
- Troubleshot a Shelly iOS app offline display issue and a stuck slat position bug (resolved via HTTP API)
- Debugged a Shelly Gen4 2PM slat/tilt API issue — correct parameter is `slat_pos`, not `tilt`
- Has a Nous system controlling the water shut-off valve; wants the Python script reading TUV temperature (AZ router cloud, tuv_temp) to trigger the Nous action "Velký okruh" when tuv_temp >= 40; was weighing Home Assistant, IFTTT or something better to link them (Oct 2026)
- Water tank mixing setup: Nous tap-to-run scene "Velký okruh" starts mixing, "Malý okruh" ends it; thresholds: big at TUV >= 42 °C, small at <= 38 °C; check only 10:00–17:30 every 5 min; each scene should fire only once (repeated triggers just spam logs, valve doesn't reopen); script to run on his Synology DS216j; pip install tinytuya already done (Oct 2026)
- Mixing must always be switched off before 18:00: at 17:58 (a constant in the script) "Malý okruh" is triggered automatically and the remembered state reset; was weighing querying Tuya Cloud for state, a manual reset, or running the script in a cloud (Google, Microsoft, Tuya) instead of the Synology NAS (Oct 2026)
- Set up a Tuya/Nous app automation "Vypnout FVE cirkulaci": daily plan at 17:58 -> runs tap-to-run scene "Malý okruh" (precondition: all day), as a backup to the script's daily close-out (Oct 2026)
- Has two Eaton PL6-B16/1 circuit breakers; wants to replace or supplement them with something that measures consumption and can be switched remotely (Oct 2026)
- Oct 2026: wants to move the central Shelly blind script ("Unified Master Blind Controller", 4 blinds: Ložnice, Pracovna, Miki, Maxík) into Home Assistant and simplify it; the HA time-trigger automations already work (morning west/east weekday, morning weekend, noon east open / west close, evening west/east, night west/east); behavior must stay identical (hysteresis, fully closed slats = override except the morning opening)
- Oct 2026: blinds noon west (Miki, Maxík) are pos 0 in summer (shading) and pos 100 in winter; the HA blind script must stay easy to switch back to 0
- Oct 2026: controlling the blinds via native HA cover entities (position / tilt) did not work for him; now going the RPC route: rest_command.shelly_blinds_goto (Shelly Cover.GoToPosition with pos + slat_pos), scripts zaluzie_posun and zaluzie_faze
- Oct 2026: wants the blind position and tilt set at once (no waiting between the two commands) in the HA blind script
- Oct 2026: planning (no implementation yet) HA-switched house circulation pump; it should support tank mixing and keep hot water circulating to the bathroom from the gas tank (Tado); should not run nonstop because it cools the water. His draft duty cycle: ~50 % when the Tado gas tank is set >40 °C (06:30–07:00 and 18–21), ~2/3 during mixing with the boiler (TUV), minimal at night 23:30–6:30 but occasionally so he doesn't wait ~2 min for warm water after waking, otherwise ~1/3; asked for a cycling proposal (e.g. 5 min on / 10 min off)
- Oct 2026: has no thermometer on the circulation return line or on the TUV tank; Tado exposes only the requested (set) temperature and has its own hysteresis
- Oct 2026: measured circulation pump, return line gets warm ~3 min after switching on; cooldown time after switching off not measured yet
- Oct 2026: considering an external temperature sensor on the brass water pipe (circulation return); prefers a clamp-on (objímka) sensor over a probe (tyčka)
- Oct 2026: going with ESP32 (USB-powered dev board) + DS18B20 for the circulation pump temperature sensing; needs 2–3 DS18B20 sensors with pipe clamps, an enclosure and a resistor; looking for a kit at AliExpress, drátek.cz or other Czech e-shops
- Oct 2026: for the HA blind automation he does not want to keep updating/depending on two entities (sun and illumination); plans the noon step at 10:25 UTC (needs converting to local time) and the rest (morning/evening) driven by the illuminance sensor
