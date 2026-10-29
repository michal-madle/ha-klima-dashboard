#!/usr/bin/env python3
"""Export hodinových dat o klimatu v domě z Home Assistantu do CSV (pro normy, popisky a předpověď).

Co dělá: přes WebSocket API přečte dlouhodobé statistiky (po hodinách; trvalé, na rozdíl od stavů, které
se po ~10 dnech mažou) a pro entity bez statistik (chybí state_class, binární senzory, atributy) použije
historii stavů. Nic v Home Assistantu nemění, jen čte.

Výstup (ve složce --outdir):
  klima_hodiny.csv     jeden řádek na hodinu a místnost (teplota, vlhkost, CO2, PM2.5, okno, topení, klimatizace,
                       žaluzie, venkovní teplota, oblačnost, PV řetězce, režim domu)
  okna_udalosti.csv    jedna řádka na otevření okna: CO2 před/po, minuty do 1000 a 800 ppm, pokles teploty,
                       odhad výměny vzduchu (ACH) z exponenciálního poklesu CO2
  popisky_sablona.csv  jen "zajímavé" hodiny (nejvýš ~120) s kontextem a prázdným sloupcem pro větu, kterou
                       byste chtěl vidět
  export_report.txt    zdroj dat u každé entity, chybějící entity, doporučení customize: state_class

Použití:
  pip install websocket-client
  export HA_TOKEN=<dlouhodobý přístupový token>        # nebo --token-file soubor
  python3 export_hodiny_klima.py --url http://homeassistant.local:8123 --days 14 \\
      --outdoor sensor.<venkovni_teplota> --weather weather.<pocasi>

Token se čte z HA_TOKEN, --token-file nebo --token; nikdy se nezapisuje do výstupu ani do zprávy.
(--token je vidět v seznamu procesů, proto je lepší proměnná prostředí.)

Entity: ve výchozím stavu jen ty z ENTITY_MAP.md (potvrzené) a odvozené ze vzoru z ENTITY_MAP.md. Co
neexistuje, skončí v reportu jako BEZ DAT. Přepsat/doplnit lze souborem --map (JSON), například:
  {"maxik": {"teplota": "sensor.maxik_...", "vlhkost": "sensor.maxik_..."},
   "obyvak": {"klima": null}}
"""
import argparse
import csv
import json
import math
import os
import statistics
import sys
from bisect import bisect_right
from datetime import datetime, timedelta, timezone

ROOMS = ["loznice", "pracovna", "maxik", "mikulas", "obyvak"]
ROOM_NAMES = {"loznice": "Ložnice", "pracovna": "Pracovna", "maxik": "Maxík",
              "mikulas": "Mikuláš", "obyvak": "Obývací pokoj"}

# Potvrzeno v ENTITY_MAP.md. Maxík, Mikuláš a Obývák teploměry zatím nemají (doplnit přes --map).
CONFIRMED = {
    "loznice": {
        "teplota": "sensor.loznice_teplomer_loznice_temperature",
        "vlhkost": "sensor.loznice_teplomer_loznice_humidity",
        "co2": "sensor.loznice_teplomer_loznice_carbon_dioxide",
        "pm25": "sensor.loznice_teplomer_loznice_pm2_5",
    },
    "pracovna": {
        "teplota": "sensor.pracovna_teplomer_pracovna_temperature",
        "vlhkost": "sensor.pracovna_teplomer_pracovna_humidity",
    },
}


def default_room(r):
    """Odvozeno ze vzoru v ENTITY_MAP.md; existenci ověří až čtení (jinak BEZ DAT)."""
    cfg = {
        "teplota": None, "vlhkost": None, "co2": None, "pm25": None,
        "okno": f"binary_sensor.{r}_okno_{r}",
        "topeni_pct": f"sensor.{r}_tado_ce_{r}_heating",
        "cil": f"sensor.{r}_tado_ce_{r}_target",
        "topeni_rezim": f"sensor.{r}_tado_ce_{r}_overlay",
        "klima": f"climate.{r}_ac_{r}",
        "zaluzie": f"cover.{r}_zaluzie_{r}",
    }
    if r == "obyvak":
        cfg["okno"] = "binary_sensor.obyvak_dvere_zahrada"
        cfg["zaluzie"] = None  # Obývák žaluzie nemá
    cfg.update(CONFIRMED.get(r, {}))
    return cfg


# ----------------------------------------------------------------------------------------------
# Práce s časovými řadami (schodová funkce: hodnota platí do další změny)
# ----------------------------------------------------------------------------------------------

def segments(times, vals, h0, h1):
    """[(hodnota, sekundy)] uvnitř hodiny <h0, h1); hodnota před první změnou je None."""
    i = bisect_right(times, h0) - 1
    cur = vals[i] if i >= 0 else None
    cursor = h0
    out = []
    j = i + 1
    while j < len(times) and times[j] < h1:
        if times[j] > cursor:
            out.append((cur, times[j] - cursor))
            cursor = times[j]
        cur = vals[j]
        j += 1
    out.append((cur, h1 - cursor))
    return out


def hour_range(start, end):
    t0 = int(start.timestamp())
    t0 -= t0 % 3600
    t1 = int(end.timestamp())
    h = t0
    while h < t1:
        yield h
        h += 3600


def hourly_numeric(events, start, end):
    """Časově vážený hodinový průměr, minimum a maximum. events: [(t, float)] seřazené."""
    out = {}
    pts = sorted((t, v) for t, v in events if v is not None)
    if not pts:
        return out
    times = [t for t, _ in pts]
    vals = [v for _, v in pts]
    for h in hour_range(start, end):
        seg = [(v, d) for v, d in segments(times, vals, h, h + 3600) if v is not None and d > 0]
        if not seg:
            continue
        cov = sum(d for _, d in seg)
        out[h] = {"mean": sum(v * d for v, d in seg) / cov,
                  "min": min(v for v, _ in seg), "max": max(v for v, _ in seg)}
    return out


def hourly_share(events, start, end, target):
    """Minuty hodiny, kdy byl stav == target. events: [(t, str)]. Neznámé/nedostupné se nepočítá jako vypnuto."""
    out = {}
    ev = sorted(events)
    if not ev:
        return out
    times = [t for t, _ in ev]
    vals = [v for _, v in ev]
    for h in hour_range(start, end):
        seg = segments(times, vals, h, h + 3600)
        known = sum(d for v, d in seg if v not in (None, "unknown", "unavailable"))
        if known <= 0:
            continue
        out[h] = sum(d for v, d in seg if v == target) / 60.0
    return out


def hourly_mode(events, start, end):
    """Nejdéle trvající hodnota v hodině. events: [(t, str)]."""
    out = {}
    ev = sorted(events)
    if not ev:
        return out
    times = [t for t, _ in ev]
    vals = [v for _, v in ev]
    for h in hour_range(start, end):
        acc = {}
        for v, d in segments(times, vals, h, h + 3600):
            if v in (None, "unknown", "unavailable") or d <= 0:
                continue
            acc[v] = acc.get(v, 0) + d
        if acc:
            out[h] = max(acc, key=acc.get)
    return out


def value_at(times, vals, t):
    i = bisect_right(times, t) - 1
    return vals[i] if i >= 0 else None


def to_float(x):
    try:
        v = float(x)
    except (TypeError, ValueError):
        return None
    return v if math.isfinite(v) else None


# ----------------------------------------------------------------------------------------------
# WebSocket API
# ----------------------------------------------------------------------------------------------

def call(ws, counter, payload):
    counter[0] += 1
    payload["id"] = counter[0]
    ws.send(json.dumps(payload))
    while True:
        msg = json.loads(ws.recv())
        if msg.get("id") == counter[0]:
            return msg


def parse_ts(t):
    if t is None:
        return None
    if isinstance(t, str):
        return datetime.fromisoformat(t.replace("Z", "+00:00")).timestamp()
    t = float(t)
    return t / 1000.0 if t > 1e11 else t


def get_stats(ws, counter, ids, start, end, report):
    ids = [i for i in ids if i]
    if not ids:
        return {}
    res = call(ws, counter, {
        "type": "recorder/statistics_during_period",
        "start_time": start.isoformat(), "end_time": end.isoformat(),
        "statistic_ids": ids, "period": "hour", "types": ["mean", "min", "max"],
    })
    if not res.get("success"):
        report.append(f"CHYBA statistik: {res.get('error', res)}")
        return {}
    out = {}
    for eid, series in (res.get("result") or {}).items():
        d = {}
        for p in series:
            t = parse_ts(p.get("start"))
            if t is None or p.get("mean") is None:
                continue
            d[int(t)] = {"mean": p["mean"], "min": p.get("min"), "max": p.get("max")}
        if d:
            out[eid] = d
    return out


def get_states(ws, counter, eid, start, end, attributes=False):
    """[(t, stav, atributy)] seřazené podle času."""
    res = call(ws, counter, {
        "type": "history/history_during_period",
        "start_time": start.isoformat(), "end_time": end.isoformat(),
        "entity_ids": [eid], "include_start_time_state": True,
        "significant_changes_only": False,
        "minimal_response": not attributes, "no_attributes": not attributes,
    })
    if not res.get("success"):
        return []
    rows = (res.get("result") or {}).get(eid) or []
    out = []
    attrs = {}
    for r in rows:
        t = parse_ts(r.get("lu", r.get("last_updated", r.get("lc", r.get("last_changed")))))
        if t is None:
            continue
        a = r.get("a", r.get("attributes"))
        if isinstance(a, dict):
            attrs = a
        out.append((t, r.get("s", r.get("state")), attrs))
    out.sort(key=lambda x: x[0])
    return out


# ----------------------------------------------------------------------------------------------
# Sběr dat
# ----------------------------------------------------------------------------------------------

class Collector:
    def __init__(self, ws, counter, start, end):
        self.ws, self.counter, self.start, self.end = ws, counter, start, end
        self.report = []
        self.hints = []     # entity, kterým chybí state_class
        self.stats = {}

    def prefetch(self, ids):
        self.stats = get_stats(self.ws, self.counter, ids, self.start, self.end, self.report)

    def numeric(self, eid, label):
        """{hodina: {mean,min,max}} ze statistik, jinak ze stavů."""
        if not eid:
            return {}
        if eid in self.stats:
            self.report.append(f"{label} {eid}: {len(self.stats[eid])} hodin ze statistik")
            return self.stats[eid]
        ev = [(t, to_float(s)) for t, s, _ in get_states(self.ws, self.counter, eid, self.start, self.end)]
        h = hourly_numeric(ev, self.start, self.end)
        if not h:
            self.report.append(f"BEZ DAT: {label} {eid} (neexistuje, nebo nemá ani historii stavů)")
            return {}
        self.report.append(f"{label} {eid}: {len(h)} hodin ze stavů (bez dlouhodobých statistik, "
                           "Home Assistant drží stavy jen ~10 dní)")
        self.hints.append(eid)  # hodiny vznikly jen z číselných stavů
        return h

    def text_series(self, eid, label):
        """[(t, stav, atributy)] nebo []; hlásí do reportu."""
        if not eid:
            return []
        st = get_states(self.ws, self.counter, eid, self.start, self.end, attributes=True)
        if not st:
            self.report.append(f"BEZ DAT: {label} {eid}")
        else:
            self.report.append(f"{label} {eid}: {len(st)} změn ze stavů")
        return st

    def raw_events(self, eid):
        return [(t, to_float(s)) for t, s, _ in get_states(self.ws, self.counter, eid, self.start, self.end)
                if to_float(s) is not None]


def attr_events(states, key):
    return [(t, to_float(a.get(key))) for t, _, a in states if to_float(a.get(key)) is not None]


def attr_text_events(states, key):
    return [(t, a.get(key)) for t, _, a in states if a.get(key) not in (None, "")]


def state_text_events(states):
    return [(t, s) for t, s, _ in states if s is not None]


# ----------------------------------------------------------------------------------------------
# Události okna (CO2 pokles, ACH)
# ----------------------------------------------------------------------------------------------

def window_episodes(win_ev, start_ts):
    eps = []
    on_t = None
    for t, s in win_ev:
        if s == "on" and on_t is None:
            on_t = t
        elif s == "off" and on_t is not None:
            eps.append((on_t, t))
            on_t = None
        elif s in ("unavailable", "unknown"):
            on_t = None
    return [(a, b) for a, b in eps if a > start_ts + 1 and b - a >= 120]


def fit_ach(points, c_out):
    """points: [(hodiny od otevření, ppm)]. Vrací (ach_za_h, r2, n) nebo None.
    Model C(t) = C_out + (C0 - C_out) * exp(-n t); regrese ln((C-Cout)/(C0-Cout)) přes počátek."""
    if len(points) < 2:
        return None
    c0 = points[0][1]
    if c0 < c_out + 200:
        return None
    xs, ys = [], []
    for x, c in points:
        if c > c_out + 50:
            xs.append(x)
            ys.append(math.log((c - c_out) / (c0 - c_out)))
    if len(xs) < 4:
        return None
    sxx = sum(x * x for x in xs)
    if sxx <= 0:
        return None
    slope = sum(x * y for x, y in zip(xs, ys)) / sxx
    ybar = sum(ys) / len(ys)
    sst = sum((y - ybar) ** 2 for y in ys)
    ssr = sum((y - slope * x) ** 2 for x, y in zip(xs, ys))
    r2 = 1 - ssr / sst if sst > 0 else 0.0
    return -slope, r2, len(xs)


def analyze_window_events(room, win_ev, co2_ev, temp_ev, start_ts, c_out):
    rows = []
    ct = [t for t, _ in co2_ev]
    cv = [v for _, v in co2_ev]
    tt = [t for t, _ in temp_ev]
    tv = [v for _, v in temp_ev]
    for a, b in window_episodes(win_ev, start_ts):
        c_before = value_at(ct, cv, a) if ct else None
        inside = [(t, v) for t, v in co2_ev if a <= t <= b]
        row = {"mistnost": ROOM_NAMES[room],
               "od": datetime.fromtimestamp(a, tz=timezone.utc).astimezone().isoformat(timespec="minutes"),
               "do": datetime.fromtimestamp(b, tz=timezone.utc).astimezone().isoformat(timespec="minutes"),
               "trvani_min": round((b - a) / 60, 1),
               "co2_pred": "" if c_before is None else round(c_before),
               "co2_min": "", "min_do_1000": "", "min_do_800": "",
               "teplota_pred": "", "teplota_pokles": "", "ach_za_h": "", "ach_r2": "", "ach_body": "",
               "ach_kvalita": "bez_co2" if c_before is None else "nedostatek_bodu"}
        if c_before is not None:
            pts = [(0.0, c_before)] + [((t - a) / 3600.0, v) for t, v in inside if t > a]
            row["co2_min"] = round(min(v for _, v in pts))
            for thr, key in ((1000, "min_do_1000"), (800, "min_do_800")):
                if c_before > thr:
                    for x, v in pts:
                        if v <= thr:
                            row[key] = round(x * 60, 1)
                            break
            fit = fit_ach(pts, c_out)
            if fit:
                ach, r2, n = fit
                row["ach_za_h"], row["ach_r2"], row["ach_body"] = round(ach, 2), round(r2, 2), n
                row["ach_kvalita"] = "ok" if (r2 >= 0.8 and n >= 4 and ach > 0) else "slabe"
        if tt:
            t_before = value_at(tt, tv, a)
            if t_before is not None:
                tmin = min([t_before] + [v for t, v in temp_ev if a <= t <= b + 600])
                row["teplota_pred"] = round(t_before, 2)
                row["teplota_pokles"] = round(t_before - tmin, 2)
        rows.append(row)
    return rows


# ----------------------------------------------------------------------------------------------
# Hlavní export
# ----------------------------------------------------------------------------------------------

HOUSE_KEYS = ["venku", "pocasi", "pv1", "pv2", "rezim_domu"]

FIELDS = ["teplota", "teplota_min", "teplota_max", "vlhkost", "co2", "co2_max", "pm25",
          "okno_min_otevreno", "topeni_pct", "cil_C", "topeni_rezim",
          "klima_stav", "klima_cil_C", "klima_preset", "zaluzie_poloha", "zaluzie_naklon",
          "venku_C", "oblacnost", "pv1_W", "pv2_W", "rezim_domu"]


def build_config(args, overrides):
    cfg = {"rooms": {r: default_room(r) for r in ROOMS},
           "dum": {"venku": args.outdoor, "pocasi": args.weather, "pv1": args.pv1, "pv2": args.pv2,
                   "rezim_domu": args.house_mode}}
    for r, m in (overrides or {}).items():
        if r in cfg["rooms"]:
            cfg["rooms"][r].update(m)
        elif r == "dum":
            cfg["dum"].update(m)
    return cfg


def export(ws, counter, cfg, outdir, days, co2_out=420.0, end=None):
    end = end or datetime.now(timezone.utc).replace(minute=0, second=0, microsecond=0)
    start = end - timedelta(days=days)
    col = Collector(ws, counter, start, end)
    rooms, dum = cfg["rooms"], cfg["dum"]

    numeric_ids = []
    for r in ROOMS:
        for k in ("teplota", "vlhkost", "co2", "pm25", "topeni_pct", "cil"):
            numeric_ids.append(rooms[r].get(k))
    numeric_ids += [dum.get("venku"), dum.get("pv1"), dum.get("pv2")]
    col.prefetch(sorted({i for i in numeric_ids if i}))

    rows = {}   # (hodina, místnost) -> dict

    def put(h, r, **kw):
        rows.setdefault((h, r), {}).update({k: v for k, v in kw.items() if v is not None})

    # --- dům: venku, počasí, PV, režim
    house = {}
    for key, col_name in (("venku", "venku_C"), ("pv1", "pv1_W"), ("pv2", "pv2_W")):
        for h, p in col.numeric(dum.get(key), key).items():
            house.setdefault(h, {})[col_name] = p["mean"]
    wst = col.text_series(dum.get("pocasi"), "pocasi")
    for h, v in hourly_numeric(attr_events(wst, "cloud_coverage"), start, end).items():
        house.setdefault(h, {})["oblacnost"] = v["mean"]
    if not dum.get("venku"):
        for h, v in hourly_numeric(attr_events(wst, "temperature"), start, end).items():
            house.setdefault(h, {}).setdefault("venku_C", v["mean"])
        if wst:
            col.report.append("venku_C: z atributu temperature entity počasí (není to měření na domě)")
    mode = col.text_series(dum.get("rezim_domu"), "rezim_domu")
    for h, v in hourly_mode(state_text_events(mode), start, end).items():
        house.setdefault(h, {})["rezim_domu"] = v

    # --- místnosti
    episodes = []
    for r in ROOMS:
        c = rooms[r]
        t = col.numeric(c.get("teplota"), f"{r} teplota")
        for h, p in t.items():
            put(h, r, teplota=p["mean"], teplota_min=p["min"], teplota_max=p["max"])
        for h, p in col.numeric(c.get("vlhkost"), f"{r} vlhkost").items():
            put(h, r, vlhkost=p["mean"])
        co2 = col.numeric(c.get("co2"), f"{r} co2")
        for h, p in co2.items():
            put(h, r, co2=p["mean"], co2_max=p["max"])
        for h, p in col.numeric(c.get("pm25"), f"{r} pm25").items():
            put(h, r, pm25=p["mean"])
        for h, p in col.numeric(c.get("topeni_pct"), f"{r} topeni").items():
            put(h, r, topeni_pct=p["mean"])
        for h, p in col.numeric(c.get("cil"), f"{r} cil").items():
            put(h, r, cil_C=p["mean"])
        ov = col.text_series(c.get("topeni_rezim"), f"{r} topeni_rezim")
        for h, v in hourly_mode(state_text_events(ov), start, end).items():
            put(h, r, topeni_rezim=v)

        win = col.text_series(c.get("okno"), f"{r} okno")
        win_ev = state_text_events(win)
        for h, v in hourly_share(win_ev, start, end, "on").items():
            put(h, r, okno_min_otevreno=v)

        ac = col.text_series(c.get("klima"), f"{r} klima")
        for h, v in hourly_mode(state_text_events(ac), start, end).items():
            put(h, r, klima_stav=v)
        for h, v in hourly_numeric(attr_events(ac, "temperature"), start, end).items():
            put(h, r, klima_cil_C=v["mean"])
        for h, v in hourly_mode(attr_text_events(ac, "preset_mode"), start, end).items():
            put(h, r, klima_preset=v)

        cv = col.text_series(c.get("zaluzie"), f"{r} zaluzie")
        for h, v in hourly_numeric(attr_events(cv, "current_position"), start, end).items():
            put(h, r, zaluzie_poloha=v["mean"])
        for h, v in hourly_numeric(attr_events(cv, "current_tilt_position"), start, end).items():
            put(h, r, zaluzie_naklon=v["mean"])

        if win_ev and c.get("co2"):
            co2_ev = col.raw_events(c["co2"])
            temp_ev = col.raw_events(c["teplota"]) if c.get("teplota") else []
            episodes += analyze_window_events(r, win_ev, co2_ev, temp_ev, start.timestamp(), co2_out)
        elif win_ev:
            col.report.append(f"okna_udalosti {r}: bez CO2 senzoru se pokles CO2 nepočítá")

    for (h, r), d in rows.items():
        for k, v in house.get(h, {}).items():
            d.setdefault(k, v)

    # --- zápis
    def fmt(v):
        if isinstance(v, float):
            return round(v, 2)
        return v

    def iso(h):
        return datetime.fromtimestamp(h, tz=timezone.utc).astimezone()

    keys = sorted(rows, key=lambda k: (k[0], ROOMS.index(k[1])))
    with open(os.path.join(outdir, "klima_hodiny.csv"), "w", newline="", encoding="utf-8") as f:
        w = csv.writer(f)
        w.writerow(["cas", "hodina", "den_v_tydnu", "mistnost"] + FIELDS)
        for h, r in keys:
            t = iso(h)
            d = rows[(h, r)]
            w.writerow([t.isoformat(timespec="minutes"), t.hour, t.isoweekday(), ROOM_NAMES[r]] +
                       ["" if d.get(k) is None else fmt(d[k]) for k in FIELDS])

    ep_cols = ["mistnost", "od", "do", "trvani_min", "co2_pred", "co2_min", "min_do_1000", "min_do_800",
               "teplota_pred", "teplota_pokles", "ach_za_h", "ach_r2", "ach_body", "ach_kvalita"]
    with open(os.path.join(outdir, "okna_udalosti.csv"), "w", newline="", encoding="utf-8") as f:
        w = csv.DictWriter(f, fieldnames=ep_cols)
        w.writeheader()
        for e in episodes:
            w.writerow(e)

    # --- šablona popisků: jen zajímavé hodiny
    scored = []
    for (h, r) in keys:
        d = rows[(h, r)]
        s = 0
        if (d.get("pm25") or 0) >= 35:
            s += 3
        co2m = d.get("co2_max") or 0
        s += 3 if co2m >= 1500 else 2 if co2m >= 1000 else 0
        hum = d.get("vlhkost")
        if hum is not None and (hum > 70 or hum < 35):
            s += 2
        tp = d.get("teplota")
        if tp is not None and (tp > 25 or tp < 20):
            s += 1
        if (d.get("okno_min_otevreno") or 0) > 0 and (d.get("topeni_pct") or 0) > 0:
            s += 2
        if s > 0:
            scored.append((s, h, r))
    top = sorted(scored, key=lambda x: (-x[0], x[1]))[:120]
    top.sort(key=lambda x: (x[1], ROOMS.index(x[2])))
    with open(os.path.join(outdir, "popisky_sablona.csv"), "w", newline="", encoding="utf-8") as f:
        w = csv.writer(f)
        w.writerow(["cas", "mistnost", "kontext", "veta_cs", "poznamka"])
        for s, h, r in top:
            d = rows[(h, r)]
            ctx = "; ".join(x for x in (
                None if d.get("teplota") is None else f"T {d['teplota']:.1f} °C",
                None if d.get("vlhkost") is None else f"RH {d['vlhkost']:.0f} %",
                None if d.get("co2_max") is None else f"CO2 max {d['co2_max']:.0f} ppm",
                None if d.get("pm25") is None else f"PM2.5 {d['pm25']:.0f}",
                None if d.get("okno_min_otevreno") is None else f"okno {d['okno_min_otevreno']:.0f} min",
                None if d.get("topeni_pct") is None else f"topení {d['topeni_pct']:.0f} %",
                None if d.get("klima_stav") is None else f"klima {d['klima_stav']}") if x)
            w.writerow([iso(h).isoformat(timespec="minutes"), ROOM_NAMES[r], ctx, "", ""])

    # --- report
    rep = list(col.report)
    ok_eps = [e for e in episodes if e["ach_kvalita"] == "ok"]
    rep.append("")
    rep.append(f"Okna: {len(episodes)} otevření, z toho {len(ok_eps)} s použitelným odhadem ACH")
    for r in ROOMS:
        dur = [e["trvani_min"] for e in episodes if e["mistnost"] == ROOM_NAMES[r]]
        if dur:
            rep.append(f"  {ROOM_NAMES[r]}: {len(dur)}× otevřeno, medián {statistics.median(dur):.0f} min, "
                       f"nejdéle {max(dur):.0f} min")
    if col.hints:
        rep.append("")
        rep.append("Číselné entity bez dlouhodobých statistik. Doplňte state_class (configuration.yaml) a po restartu "
                   "se statistiky začnou sbírat; zpětně se nedoplní:")
        rep.append("homeassistant:")
        rep.append("  customize:")
        for eid in sorted(set(col.hints)):
            rep.append(f"    {eid}:")
            rep.append("      state_class: measurement")
    with open(os.path.join(outdir, "export_report.txt"), "w", encoding="utf-8") as f:
        f.write("\n".join(rep) + "\n")
    return rep, len(keys), len(episodes), len(top)


# ----------------------------------------------------------------------------------------------

def ws_url(url):
    url = url.strip().rstrip("/")
    if url.startswith("http://"):
        url = "ws://" + url[7:]
    elif url.startswith("https://"):
        url = "wss://" + url[8:]
    elif "://" not in url:
        url = "ws://" + url
    if not url.endswith("/api/websocket"):
        url += "/api/websocket"
    return url


def read_token(args):
    if args.token_file:
        with open(args.token_file, encoding="utf-8") as f:
            return f.read().strip()
    return args.token or os.environ.get("HA_TOKEN", "")


def main():
    ap = argparse.ArgumentParser(description="Export hodinových klimatických dat z Home Assistantu.")
    ap.add_argument("--url", required=True, help="adresa jako v prohlížeči, např. http://192.168.1.50:8123")
    ap.add_argument("--token", help="raději proměnná HA_TOKEN nebo --token-file (--token je vidět v seznamu procesů)")
    ap.add_argument("--token-file")
    ap.add_argument("--days", type=int, default=14)
    ap.add_argument("--outdir", default=".")
    ap.add_argument("--map", help="JSON s přepsáním/doplněním entit (viz hlavička souboru)")
    ap.add_argument("--outdoor", help="entita venkovní teploty (zatím nepotvrzená)")
    ap.add_argument("--weather", help="entita weather.* (zatím nepotvrzená)")
    ap.add_argument("--pv1", default="sensor.goodwe_pv1_power", help="PV řetězec 1 (světová strana neověřena)")
    ap.add_argument("--pv2", default="sensor.goodwe_pv2_power", help="PV řetězec 2 (světová strana neověřena)")
    ap.add_argument("--house-mode", default="input_select.house_mode",
                    help="v ENTITY_MAP.md jen z paměti, neověřeno")
    ap.add_argument("--co2-venku", type=float, default=420.0, help="předpokládané CO2 venku v ppm")
    a = ap.parse_args()

    token = read_token(a)
    if not token:
        sys.exit("Chybí token: nastavte proměnnou HA_TOKEN nebo použijte --token-file.")
    overrides = None
    if a.map:
        with open(a.map, encoding="utf-8") as f:
            overrides = json.load(f)
    os.makedirs(a.outdir, exist_ok=True)

    try:
        import websocket  # websocket-client
    except ImportError:
        sys.exit("Chybí knihovna: pip install websocket-client")
    url = ws_url(a.url)
    try:
        ws = websocket.create_connection(url, timeout=60)
    except OSError as e:
        sys.exit(f"Nelze se připojit na {url}\n  {e}\n"
                 "Použijte přesně adresu včetně portu, kterou otevíráte Home Assistant v prohlížeči. "
                 "Odmítnuté spojení znamená špatnou IP nebo port (VirtualBox NAT bez přesměrování portu 8123) "
                 "nebo HTTPS (pak https://...).")
    first = json.loads(ws.recv())
    if first.get("type") != "auth_required":
        sys.exit(f"Neočekávaná odpověď: {first.get('type')}")
    ws.send(json.dumps({"type": "auth", "access_token": token}))
    if json.loads(ws.recv()).get("type") != "auth_ok":
        sys.exit("Přihlášení se nezdařilo (zkontrolujte token).")

    cfg = build_config(a, overrides)
    rep, n_rows, n_eps, n_lab = export(ws, [0], cfg, a.outdir, a.days, a.co2_venku)
    print("\n".join(rep))
    print(f"Hotovo: {n_rows} řádků hodina×místnost, {n_eps} otevření oken, {n_lab} hodin v šabloně popisků. "
          "Soubory: klima_hodiny.csv, okna_udalosti.csv, popisky_sablona.csv, export_report.txt")


if __name__ == "__main__":
    main()
