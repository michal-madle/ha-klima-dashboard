#!/usr/bin/env python3
"""Offline test exportu na umělých datech (bez Home Assistantu): python3 tools/test_export_hodiny_klima.py"""
import csv
import json
import math
import os
import sys
import tempfile
from datetime import datetime, timedelta, timezone

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import export_hodiny_klima as ex  # noqa: E402

END = datetime(2026, 10, 29, 12, 0, tzinfo=timezone.utc)
START = END - timedelta(days=3)
TRUE_ACH = 3.0
C_OUT = 420.0


def build_data():
    stats, hist = {}, {}
    # Ložnice teplota: statistiky po hodinách
    stats["sensor.loznice_teplomer_loznice_temperature"] = [
        {"start": int((START + timedelta(hours=i)).timestamp() * 1000), "mean": 21 + 0.1 * (i % 5),
         "min": 20.8, "max": 21.6} for i in range(72)]
    # Pracovna teplota: bez statistik, jen stavy (fallback)
    hist["sensor.pracovna_teplomer_pracovna_temperature"] = [
        {"s": "22.0", "lu": (START + timedelta(hours=i)).timestamp()} for i in range(72)]
    # CO2 Ložnice: 1400 ppm, okno 20 min, exponenciální pokles s ACH = 3/h, vzorek po 2 min
    t_on = START + timedelta(hours=30)
    co2 = [{"s": "1400", "lu": START.timestamp()}]
    for k in range(0, 21, 2):
        c = C_OUT + (1400 - C_OUT) * math.exp(-TRUE_ACH * k / 60)
        co2.append({"s": f"{c:.0f}", "lu": (t_on + timedelta(minutes=k)).timestamp()})
    co2.append({"s": "500", "lu": (t_on + timedelta(minutes=30)).timestamp()})
    hist["sensor.loznice_teplomer_loznice_carbon_dioxide"] = co2
    hist["binary_sensor.loznice_okno_loznice"] = [
        {"s": "off", "lu": START.timestamp()},
        {"s": "on", "lu": t_on.timestamp()},
        {"s": "off", "lu": (t_on + timedelta(minutes=20)).timestamp()}]
    hist["sensor.loznice_tado_ce_loznice_overlay"] = [{"s": "schedule", "lu": START.timestamp()}]
    hist["climate.loznice_ac_loznice"] = [
        {"s": "cool", "lu": START.timestamp(), "a": {"temperature": 24, "preset_mode": "windfree"}}]
    hist["cover.loznice_zaluzie_loznice"] = [
        {"s": "open", "lu": START.timestamp(), "a": {"current_position": 100, "current_tilt_position": 40}}]
    return stats, hist


class FakeWS:
    def __init__(self, stats, hist):
        self.stats, self.hist, self.q, self.sent = stats, hist, [], []

    def send(self, raw):
        m = json.loads(raw)
        self.sent.append(m)
        if m["type"] == "recorder/statistics_during_period":
            res = {i: self.stats[i] for i in m["statistic_ids"] if i in self.stats}
        elif m["type"] == "history/history_during_period":
            res = {i: self.hist[i] for i in m["entity_ids"] if i in self.hist}
        else:
            self.q.append({"id": m["id"], "type": "result", "success": False, "error": "x"})
            return
        self.q.append({"id": m["id"], "type": "result", "success": True, "result": res})

    def recv(self):
        return json.dumps(self.q.pop(0))


def main():
    stats, hist = build_data()
    ws = FakeWS(stats, hist)

    class A:
        outdoor = weather = None
        pv1, pv2, house_mode = "sensor.goodwe_pv1_power", "sensor.goodwe_pv2_power", "input_select.house_mode"

    cfg = ex.build_config(A, None)
    with tempfile.TemporaryDirectory() as d:
        rep, n_rows, n_eps, n_lab = ex.export(ws, [0], cfg, d, 3, C_OUT, end=END)
        text = "\n".join(rep)
        with open(os.path.join(d, "klima_hodiny.csv"), encoding="utf-8") as f:
            rows = list(csv.DictReader(f))
        with open(os.path.join(d, "okna_udalosti.csv"), encoding="utf-8") as f:
            eps = list(csv.DictReader(f))
        assert os.path.exists(os.path.join(d, "popisky_sablona.csv"))
        assert n_rows > 0 and len(rows) == n_rows, (n_rows, len(rows))
        assert len(eps) == 1, eps
        ach = float(eps[0]["ach_za_h"])
        assert abs(ach - TRUE_ACH) < 0.3 and eps[0]["ach_kvalita"] == "ok", eps[0]
        assert "sensor.pracovna_teplomer_pracovna_temperature:\n      state_class: measurement" in text, text
        assert "BEZ DAT: maxik" in text or "BEZ DAT" in text
        lo = [r for r in rows if r["mistnost"] == "Ložnice"]
        assert any(r["klima_stav"] == "cool" and r["klima_cil_C"] == "24.0" for r in lo)
        assert any(r["zaluzie_naklon"] == "40.0" for r in lo)
        assert any(float(r["okno_min_otevreno"] or 0) == 20.0 for r in lo), "20 min okna"
        for line in "\n".join(json.dumps(m) for m in ws.sent).splitlines():
            assert "access_token" not in line
    print(f"OK: {n_rows} řádků, ACH odhad {ach} (skutečnost {TRUE_ACH}), šablona {n_lab} hodin")


if __name__ == "__main__":
    main()
