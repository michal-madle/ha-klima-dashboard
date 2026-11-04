import { html, nothing, svg } from "lit";
import type { TemplateResult } from "lit";
import { HEATING_OFF_TARGET, heatingKindOf } from "./heating-control";
import { HOUR_MS, buildSegments, numericSeries } from "./history";
import type { HistoryMap, Segment } from "./history";
import type { I18n } from "./i18n";
import { climateShape, heatingWavesShape, renderClimateIcon, renderHeatingWaves, renderWindowIcon, windowShape } from "./icons";
import type { ClimateMode, HistoryMetric, HistorySettings, Room } from "./types";
import { CLIMATE_COLORS, COLORS, climateModeFromState, heatingWaveCount } from "./utils";

const NBSP = " ";

/**
 * „Historie místnosti – 24 h“ (CURRENT_SPEC.md, Historie a grafy; the length is
 * `history.hours`), modelled on the day report
 * of the heating app: temperature curve over a grey area, heating as orange fill under the
 * curve (strength = 0–3 waves), the Topení target as a stepped dashed line, night shading,
 * dashed humidity, and time layers for Topení and Klimatizace. The chart is drawn 1:1 in CSS
 * pixels so its labels keep their size; texts, numbers and times are in the card language.
 */

export interface ChartRange {
  startMs: number;
  endMs: number;
}

interface Point {
  t: number;
  v: number;
}

const PAD_LEFT = 4;
/** The scale labels sit on the right, as in the heating app; wide enough for "1 500" so every quantity has the same plot. */
const PAD_RIGHT = 44;
const PLOT_TOP = 6;
const PLOT_HEIGHT = 180;
const PLOT_BOTTOM = PLOT_TOP + PLOT_HEIGHT;
/*
 * Under the plot: one row per system, in the order of the room card (primary system first, then
 * the other, then the windows), as compact bars. Each row starts with the icon of the card; a
 * fade of the popup colour behind it keeps the icon readable.
 */
const STRIP_HEIGHT = 10;
const ROWS_TOP = PLOT_BOTTOM + 10;
const ROW_PITCH = 14;
const ICON_SIZE = 14;
/** The popup has the same height for every quantity: room for the most rows (heating, climate, windows). */
const RESERVED_ROWS = 3;
const AXIS_GAP = 14;
const AXIS_DESCENT = 7;
type StripRow = "heating" | "climate" | "windows" | "ventilation";

/** What the popup draws: the temperature (with humidity and heating), or one air quantity. */
export type ChartMetric = HistoryMetric;

/**
 * Rows under the plot, in the order of the room card: temperature has the two systems (the primary
 * one by House Mode first) and the windows; CO₂ and PM2.5 have the ventilation mode and the windows.
 * A row exists only when its source is configured.
 */
export function stripRows(model: Pick<RoomChartModel, "windows" | "ventilation">, metric: ChartMetric, isSummer: boolean): StripRow[] {
  if (metric === "temperature") {
    const rows: StripRow[] = isSummer ? ["climate", "heating"] : ["heating", "climate"];
    return model.windows ? [...rows, "windows"] : rows;
  }
  const rows: StripRow[] = [];
  if (model.ventilation) {
    rows.push("ventilation");
  }
  if (model.windows) {
    rows.push("windows");
  }
  return rows;
}

const rowsBottom = (rows: number): number => (rows === 0 ? PLOT_BOTTOM : ROWS_TOP + rows * ROW_PITCH);
/** Height of the drawing: the same for every quantity, the rows not used are blank space under the time axis. */
export const chartHeight = (rows = 0): number => rowsBottom(Math.max(rows, RESERVED_ROWS)) + AXIS_GAP + AXIS_DESCENT;
const FONT = 12;
const INTENSITY_OPACITY = [0, 0.24, 0.44, 0.68];
const CLIP_ID = "history-under-temperature";
const PLOT_CLIP_ID = "history-plot";
const CURVE_ID = "history-curve";

const HEATING_COLORS: Record<string, string> = {
  schedule: COLORS.plan,
  manual: COLORS.warning,
  off: COLORS.closed,
};
type HeatingKind = "schedule" | "manual" | "off";

/*
 * Colours are CSS custom properties (styles.ts), set through `style`: SVG presentation
 * attributes do not take var() reliably in every browser.
 */
const fill = (color: string) => `fill: ${color}`;
const stroke = (color: string) => `stroke: ${color}`;

export interface RoomChartModel {
  range: ChartRange;
  temperature: Point[];
  humidity: Point[];
  /** Topení mode: schedule / manual / off. */
  heating: Segment[];
  /** Heating intensity as waves "1"–"3" (0 is left out). */
  intensity: Segment[];
  /** Topení target while Plán or Ručně. */
  target: Segment[];
  /** Klimatizace mode. */
  climate: Segment[];
  /** Times any window of the room was open ("open"); undefined for a room without windows. */
  windows?: Segment[];
  co2: Point[];
  pm25: Point[];
  /** Times the ventilation mode ran ("on"); undefined without `ventilation_entity`. */
  ventilation?: Segment[];
  /** Limits of the room (orange from `warning`, red from `critical`), drawn as lines in the air charts. */
  limits: Record<"co2" | "pm25", { warning: number; critical: number }>;
  tempMin: number;
  tempMax: number;
  tempStep: number;
  humidityMin?: number;
  humidityMax?: number;
  /** Night shading, whole hours [start, end] (start = end: none). */
  night: [number, number];
}

function heatingMode(
  overlay: string | undefined,
  climate: string | undefined,
  target?: number,
): string | undefined {
  return heatingKindOf(climate, overlay, target);
}

function finite(state: string | undefined): number | undefined {
  if (state === undefined) {
    return undefined;
  }
  const value = Number.parseFloat(state);
  return Number.isFinite(value) ? value : undefined;
}

/** Share of the span added above and below the curve so the line stays inside the plot. */
const AXIS_MARGIN = 0.05;

/**
 * Temperature axis that stretches the values over the whole plot height: the range is
 * min–max of `values` plus a small margin, at least `minSpan` (°C, centred; so sensor noise is
 * not drawn as a swing). Labels sit on multiples of `step` (0,5 / 1 / 2 / 5 °C by range) that
 * fall inside the range.
 */
export function temperatureAxis(values: number[], minSpan: number): { min: number; max: number; step: number } {
  const finiteValues = values.filter((value) => Number.isFinite(value));
  let low = 19;
  let high = 23;
  if (finiteValues.length > 0) {
    low = Math.min(...finiteValues);
    high = Math.max(...finiteValues);
    if (high - low < minSpan) {
      const middle = (low + high) / 2;
      low = middle - minSpan / 2;
      high = middle + minSpan / 2;
    }
    const margin = (high - low) * AXIS_MARGIN;
    low -= margin;
    high += margin;
  }
  const span = high - low;
  const step = span <= 3 ? 0.5 : span <= 6 ? 1 : span <= 12 ? 2 : 5;
  return { min: low, max: high, step };
}

/** Axis labels: multiples of the step inside the range. */
export function temperatureTicks(min: number, max: number, step: number): number[] {
  const ticks: number[] = [];
  const epsilon = step / 1000;
  for (let value = Math.ceil(min / step - epsilon) * step; value <= max + epsilon; value += step) {
    ticks.push(Math.round(value * 100) / 100);
  }
  return ticks;
}

export function buildRoomChart(
  history: HistoryMap,
  room: Room,
  range: ChartRange,
  settings: HistorySettings,
  ventilationEntity?: string,
): RoomChartModel {
  const series = (entityId: string | undefined) => (entityId ? history[entityId] : undefined);
  const { startMs, endMs } = range;
  const overlay = series(room.heating?.overlay);
  const heatingClimate = series(room.heating?.climate);

  // A sensor reports 0 right after it is switched on, before its first measurement: no value (CURRENT_SPEC.md, Historie).
  const temperature = numericSeries(series(room.temperature), startMs, endMs, true);
  const humidity = numericSeries(series(room.humidity), startMs, endMs, true);
  const heating = buildSegments(
    [overlay, heatingClimate, series(room.heating?.target)],
    startMs,
    endMs,
    ([o, c, value]) => heatingMode(o, c, finite(value)),
  );
  const intensity = buildSegments(
    [overlay, heatingClimate, series(room.heating?.intensity), series(room.heating?.target)],
    startMs,
    endMs,
    ([o, c, value, targetValue]) => {
      const mode = heatingMode(o, c, finite(targetValue));
      const waves = heatingWaveCount(finite(value), room.thresholds);
      return mode === undefined || mode === "off" || waves === 0 ? undefined : String(waves);
    },
  );
  const target = buildSegments(
    [overlay, heatingClimate, series(room.heating?.target)],
    startMs,
    endMs,
    ([o, c, value]) => {
      const number = finite(value);
      const mode = heatingMode(o, c, number);
      // Vypnuto wins over any target (CURRENT_SPEC.md, Topení). Tado reports 5 °C while off, and the
      // target entity changes a moment before or after the mode entities do, which would leave a
      // sliver of "Plán · 5 °C" at every switch; 5 °C is therefore never a target.
      if (number === undefined || number <= HEATING_OFF_TARGET) {
        return undefined;
      }
      return mode === "schedule" || mode === "manual" ? String(number) : undefined;
    },
  );
  const windows =
    room.windows.length > 0
      ? buildSegments(
          room.windows.map((window) => series(window.entity)),
          startMs,
          endMs,
          (states) => (states.some((state) => state?.toLowerCase() === "on") ? "open" : undefined),
        )
      : undefined;
  const ventilation = ventilationEntity
    ? buildSegments([series(ventilationEntity)], startMs, endMs, ([state]) => (state?.toLowerCase() === "on" ? "on" : undefined))
    : undefined;
  // CO₂ is never 0 ppm (a sensor just switched on says so before it measures); PM2.5 of 0 µg/m³ is a real, clean reading.
  const co2 = numericSeries(series(room.carbon_dioxide), startMs, endMs, true);
  const pm25 = numericSeries(series(room.pm25), startMs, endMs);
  const climate = buildSegments([series(room.air_conditioner)], startMs, endMs, ([state]) => {
    const mode = climateModeFromState(state);
    return mode === "unknown" ? undefined : mode;
  });

  // The axis follows the measured temperature, so the curve fills the plot; the target is only
  // drawn where it falls inside (e.g. Tado's 5 °C with the heating off must not squash the curve).
  // Only without any temperature sample do the target values decide.
  const measured = temperature.map((point) => point.v);
  const { min: tempMin, max: tempMax, step: tempStep } = temperatureAxis(
    measured.length > 0 ? measured : target.map((segment) => Number(segment.value)),
    settings.min_temperature_span,
  );

  const humidityValues = humidity.map((point) => point.v);
  return {
    range,
    temperature,
    humidity,
    heating,
    intensity,
    target,
    climate,
    windows,
    co2,
    pm25,
    ventilation,
    limits: {
      co2: { warning: room.thresholds.co2_warning, critical: room.thresholds.co2_critical },
      pm25: { warning: room.thresholds.pm25_warning, critical: room.thresholds.pm25_critical },
    },
    tempMin,
    tempMax,
    tempStep,
    humidityMin: humidityValues.length > 0 ? Math.min(...humidityValues) : undefined,
    humidityMax: humidityValues.length > 0 ? Math.max(...humidityValues) : undefined,
    night: [settings.night_start, settings.night_end],
  };
}

export function hasChartData(model: RoomChartModel, metric: ChartMetric = "temperature"): boolean {
  if (metric === "co2") {
    return model.co2.length > 0;
  }
  if (metric === "pm25") {
    return model.pm25.length > 0;
  }
  return model.temperature.length > 0 || model.humidity.length > 0 || model.heating.length > 0;
}

/**
 * Axis of CO₂ (ppm) or PM2.5 (µg/m³): CO₂ from 400 ppm (lower readings round down to 100), PM2.5 from 0, up to the highest
 * value with a small margin. The warning limit is always inside (how far the air is from it, and the days stay comparable);
 * the critical limit joins as soon as a value reaches the warning one.
 */
export function airAxis(
  values: number[],
  limits: { warning: number; critical: number },
  quantity: "co2" | "pm25",
): { min: number; max: number } {
  const finiteValues = values.filter((value) => Number.isFinite(value));
  const measuredMax = finiteValues.length > 0 ? Math.max(...finiteValues) : limits.warning;
  let high = Math.max(measuredMax, limits.warning);
  if (measuredMax >= limits.warning) {
    high = Math.max(high, limits.critical);
  }
  const floor = 400;
  const low =
    quantity === "pm25" ? 0 : Math.min(floor, finiteValues.length > 0 ? Math.floor(Math.min(...finiteValues) / 100) * 100 : floor);
  return { min: low, max: high + (high - low) * AXIS_MARGIN };
}

/** Label steps of an air axis (the nearest to about `parts` parts, as for the temperature). */
export function airGrid(min: number, max: number, quantity: "co2" | "pm25", parts: number): number[] {
  const steps = quantity === "co2" ? [50, 100, 200, 250, 500, 1000, 2000] : [1, 2, 5, 10, 20, 50, 100];
  const raw = (max - min) / Math.max(2, parts);
  const step = steps.find((candidate) => candidate >= raw * 0.8) ?? steps[steps.length - 1];
  const ticks: number[] = [];
  for (let value = Math.ceil(min / step - 1e-9) * step; value <= max + 1e-9; value += step) {
    ticks.push(value);
  }
  return ticks;
}

function plotWidth(width: number): number {
  return width - PAD_LEFT - PAD_RIGHT;
}

function xOf(time: number, range: ChartRange, width: number): number {
  return PAD_LEFT + ((time - range.startMs) / (range.endMs - range.startMs)) * plotWidth(width);
}

/** Time under a horizontal position of the chart (CSS pixels, chart coordinates). */
export function timeAtX(x: number, width: number, range: ChartRange): number {
  const share = Math.min(1, Math.max(0, (x - PAD_LEFT) / plotWidth(width)));
  return range.startMs + share * (range.endMs - range.startMs);
}

function valueAt(points: Point[], time: number): number | undefined {
  let found: number | undefined;
  for (const point of points) {
    if (point.t > time) {
      break;
    }
    found = point.v;
  }
  return found;
}

/** Segment value at a time; the end of the range belongs to the last segment that reaches it. */
function segmentAt(segments: Segment[], time: number, endMs: number): string | undefined {
  return segments.find(
    (segment) => segment.start <= time && (time < segment.end || (time === endMs && segment.end === endMs)),
  )?.value;
}

/** Night intervals inside the range; a night from 22 to 6 h runs over midnight, one from 0 to 6 h does not. */
function nightBands(range: ChartRange, [startHour, endHour]: [number, number]): Array<[number, number]> {
  const bands: Array<[number, number]> = [];
  if (startHour === endHour) {
    return bands;
  }
  const day = new Date(range.startMs);
  day.setHours(0, 0, 0, 0);
  day.setDate(day.getDate() - 1);
  while (day.getTime() < range.endMs) {
    const from = new Date(day);
    from.setHours(startHour, 0, 0, 0);
    const to = new Date(day);
    if (endHour < startHour) {
      to.setDate(to.getDate() + 1);
    }
    to.setHours(endHour, 0, 0, 0);
    const start = Math.max(from.getTime(), range.startMs);
    const end = Math.min(to.getTime(), range.endMs);
    if (end > start) {
      bands.push([start, end]);
    }
    day.setDate(day.getDate() + 1);
  }
  return bands;
}

/**
 * Hours between two clock ticks: the step that divides the width of the plot into 6 to 10 parts (CURRENT_SPEC.md, Grafy;
 * uživatel 4. 11. 2026), the nearest to 8 (on a tie the larger step): 3 h for a day, 6 h for two days, 12 h for four days,
 * whole days beyond.
 */
const TICK_STEPS_H = [1, 2, 3, 4, 6, 12, 24, 48, 72, 120, 168];
export function tickHours(range: ChartRange): number {
  const hours = (range.endMs - range.startMs) / HOUR_MS;
  let best = TICK_STEPS_H[0];
  let bestScore = Infinity;
  for (const step of TICK_STEPS_H) {
    const parts = hours / step;
    const outside = parts < 6 ? 6 - parts : parts > 10 ? parts - 10 : 0;
    const score = outside * 100 + Math.abs(parts - 8) - step / 1e6;
    if (score < bestScore) {
      bestScore = score;
      best = step;
    }
  }
  return best;
}

/** Clock ticks on whole multiples of `tickHours` inside the range (local time). */
function clockTicks(range: ChartRange): number[] {
  const step = tickHours(range);
  const ticks: number[] = [];
  const tick = new Date(range.startMs);
  tick.setMinutes(0, 0, 0);
  if (step >= 24) {
    tick.setHours(0);
    while (tick.getTime() < range.startMs) {
      tick.setDate(tick.getDate() + 1);
    }
  } else {
    tick.setHours(Math.ceil(tick.getHours() / step) * step);
  }
  while (tick.getTime() <= range.endMs) {
    if (tick.getTime() >= range.startMs) {
      ticks.push(tick.getTime());
    }
    if (step >= 24) {
      tick.setDate(tick.getDate() + step / 24);
    } else {
      tick.setHours(tick.getHours() + step);
    }
  }
  return ticks;
}

/**
 * A tick label is centred under its line; one at the left edge is moved a little to the right so it stays inside the
 * margin of the popup (the right edge has the free margin of the scale, so a label there is centred too).
 */
function tickAnchor(x: number, left: number): { x: number; anchor: "start" | "middle" | "end" } {
  return { x: Math.max(x, left + 9), anchor: "middle" };
}

/** A switched-off air conditioner is the same strip as Topení Vypnuto (`HEATING_COLORS.off`). */
function climateStripColor(mode: ClimateMode): string {
  return mode === "off" ? HEATING_COLORS.off : CLIMATE_COLORS[mode] ?? COLORS.off;
}

/** Label of a tick: the time, or the date for ticks a day or more apart ("24. 10."). */
function tickLabel(tick: number, range: ChartRange, i18n: I18n): string {
  // A midnight on a chart of more than a day and a half shows the date, so the change of the day is visible between the hours.
  const midnight = new Date(tick).getHours() === 0;
  // Whole hours without the minutes ("18", "03"), like the charts of the Energie card; a 12 h clock keeps its text ("6 PM").
  return tickHours(range) >= 24 || (midnight && range.endMs - range.startMs > 36 * HOUR_MS) ? i18n.day(tick) : i18n.hour(tick).replace(/^(\d{1,2}):00$/, "$1");
}

/** The time label of the readout: "Teď", or the time under the finger ("včera 21:40" for the previous day). */
function readoutTime(model: RoomChartModel, time: number | undefined, i18n: I18n): string {
  const { t } = i18n;
  if (time === undefined) {
    return t.chart.now;
  }
  const day = (ms: number) => {
    const date = new Date(ms);
    date.setHours(12, 0, 0, 0);
    return date.getTime();
  };
  const daysAgo = Math.round((day(model.range.endMs) - day(time)) / (24 * HOUR_MS));
  const prefix = daysAgo === 0 ? "" : daysAgo === 1 ? `${t.chart.yesterday} ` : `${i18n.day(time)} `;
  return `${prefix}${i18n.time(time)}`;
}

/** Colour of an air value: white, orange from the warning limit, red from the critical one. */
function airValueColor(value: number | undefined, limits: { warning: number; critical: number }): string {
  if (value === undefined) {
    return COLORS.label;
  }
  return value >= limits.critical ? COLORS.alertOnPopup : value >= limits.warning ? COLORS.warning : COLORS.white;
}

/** Values under the finger (or now): temperature and humidity (time on the right), then Topení and Klimatizace. */
function renderReadout(model: RoomChartModel, time: number | undefined, i18n: I18n): TemplateResult {
  const { t } = i18n;
  const at = time ?? model.range.endMs;
  const temperature = valueAt(model.temperature, at);
  const humidity = valueAt(model.humidity, at);
  const heating = segmentAt(model.heating, at, model.range.endMs) as HeatingKind | undefined;
  const waves = Number(segmentAt(model.intensity, at, model.range.endMs) ?? 0);
  const target = segmentAt(model.target, at, model.range.endMs);
  const climate = segmentAt(model.climate, at, model.range.endMs) as ClimateMode | undefined;

  const when = readoutTime(model, time, i18n);
  const heatingText =
    heating === undefined
      ? "––"
      : `${t.heatingMode[heating]}${heating !== "off" && target !== undefined ? ` · ${i18n.half(Number(target))} °C` : ""}`;
  const climateText = climate ? t.climateMode[climate] : "––";
  const climateColor = climate ? CLIMATE_COLORS[climate] : COLORS.off;

  return html`
    <div class="readout" aria-live="polite">
      <div class="readout-main">
        <span class="readout-values">
          <span class="readout-temp"
            >${temperature === undefined ? "––" : html`${i18n.one(temperature)}<span class="readout-unit">${NBSP}°C</span>`}</span
          >
          ${humidity === undefined
            ? nothing
            : html`<span class="readout-hum"
                ><span class="readout-swatch" aria-hidden="true"></span><span class="sr-only">${t.required.humidity} </span>${i18n.percent(Math.round(humidity))}</span
              >`}
        </span>
        <span class="readout-time">${when}</span>
      </div>
      <div class="readout-systems">
        <span class="readout-system" style=${`color: ${heating === "off" ? COLORS.off : heating ? HEATING_COLORS[heating] : COLORS.label}`}>
          <span class="readout-icon">${renderHeatingWaves(heating && heating !== "off" ? waves : 0, heating === undefined)}</span>
          ${t.system.heating} ${heatingText}
        </span>
        <span class="readout-system" style=${`color: ${climateColor}`}>
          <span class="readout-icon">${renderClimateIcon(climate ?? "off", climateColor, climate === undefined)}</span>
          ${t.system.climate} ${climateText}
        </span>
      </div>
    </div>
  `;
}

/** Readout of CO₂ or PM2.5: the value in the colour of its limits, then the ventilation mode and the windows at that time. */
function renderAirReadout(
  model: RoomChartModel,
  metric: "co2" | "pm25",
  time: number | undefined,
  i18n: I18n,
  live?: LiveReading,
): TemplateResult {
  const { t } = i18n;
  const at = time ?? model.range.endMs;
  // "Teď" is the reading of the card (a stale value is grey there, never orange or red), under the finger the recorded value.
  const useLive = time === undefined && live !== undefined;
  const value = useLive ? live.value : valueAt(model[metric], at);
  // PM2.5 is the weaker second line of the CO₂ chart (the way humidity is under the temperature).
  const second = metric === "co2" && model.pm25.length > 0 ? (useLive && live.secondary ? live.secondary.value : valueAt(model.pm25, at)) : undefined;
  const secondStale = useLive && live.secondary?.stale === true;
  const limits = model.limits[metric];
  const unit = metric === "co2" ? "ppm" : "µg/m³";
  const running = model.ventilation ? segmentAt(model.ventilation, at, model.range.endMs) === "on" : undefined;
  const open = model.windows ? segmentAt(model.windows, at, model.range.endMs) === "open" : undefined;
  return html`
    <div class="readout" aria-live="polite">
      <div class="readout-main">
        <span class="readout-values">
          <span class="readout-temp" style=${`color: ${useLive && live.stale ? COLORS.label : airValueColor(value, limits)}`}
            >${value === undefined ? "––" : html`${i18n.whole(value)}<span class="readout-unit">${NBSP}${unit}</span>`}</span
          >
          ${metric === "co2" && model.pm25.length > 0
            ? html`<span class="readout-hum pm25" style=${secondStale ? `color: ${COLORS.label}` : nothing}
                ><span class="readout-swatch" aria-hidden="true"></span><span class="sr-only">PM2.5 </span>${second === undefined
                  ? "––"
                  : html`${i18n.whole(second)}${NBSP}µg/m³`}</span
              >`
            : nothing}
        </span>
        <span class="readout-time">${readoutTime(model, time, i18n)}</span>
      </div>
      <div class="readout-systems">
        ${running === undefined
          ? nothing
          : html`<span class="readout-system" style=${`color: ${running ? COLORS.fresh : COLORS.off}`}>
              <span class="readout-icon">${renderClimateIcon("fan", running ? COLORS.fresh : COLORS.off, false)}</span>
              ${t.ventilation.title} ${running ? t.chart.ventilationOn : t.chart.ventilationOff}
            </span>`}
        ${open === undefined
          ? nothing
          : html`<span class="readout-system" style=${`color: ${open ? COLORS.sky : COLORS.off}`}>
              <span class="readout-icon">${renderWindowIcon(open ? COLORS.sky : COLORS.off, false)}</span>
              ${t.window.popup} ${open ? t.window.open : t.window.closed}
            </span>`}
      </div>
    </div>
  `;
}

/** The current reading as the room card shows it (value and whether it is stale), for "Teď" of an air chart. */
export interface LiveReading {
  value?: number;
  stale: boolean;
  /** The weaker second line (PM2.5 under CO₂). */
  secondary?: { value?: number; stale: boolean };
}

export function renderRoomChart(
  model: RoomChartModel,
  metric: ChartMetric,
  width: number,
  scrubTime: number | undefined,
  i18n: I18n,
  isSummer = false,
  live?: LiveReading,
): TemplateResult {
  // Ground, night and grid of the plot follow the theme (styles.ts).
  const { range } = model;
  const air = metric === "temperature" ? undefined : metric;
  const x = (time: number): number => xOf(time, range, width);

  // The curve and its scale: temperature, or CO₂ / PM2.5 with its limits.
  const curve = air ? model[air] : model.temperature;
  const limits = air ? model.limits[air] : undefined;
  const axis = air
    ? airAxis(curve.map((point) => point.v), model.limits[air], air)
    : { min: model.tempMin, max: model.tempMax };
  const yOf = (value: number): number => PLOT_BOTTOM - ((value - axis.min) / (axis.max - axis.min)) * PLOT_HEIGHT;
  const humidityLow = (model.humidityMin ?? 0) - 3;
  const humidityHigh = Math.max((model.humidityMax ?? 100) + 3, humidityLow + 12);
  const yHumidity = (value: number): number =>
    PLOT_BOTTOM - ((value - humidityLow) / (humidityHigh - humidityLow)) * PLOT_HEIGHT;
  const right = PAD_LEFT + plotWidth(width);

  const line = (points: Point[], y: (value: number) => number): string =>
    points.map((point, index) => `${index === 0 ? "M" : "L"}${x(point.t).toFixed(1)} ${y(point.v).toFixed(1)}`).join(" ");
  // PM2.5 reports only a change: the value holds until the next report (a step), not a slope that never happened.
  const stepLine = (points: Point[], y: (value: number) => number): string =>
    points
      .map((point, index) => {
        const previous = points[index - 1];
        return `${index === 0 ? "M" : `L${x(point.t).toFixed(1)} ${y(previous.v).toFixed(1)} L`}${x(point.t).toFixed(1)} ${y(point.v).toFixed(1)}`;
      })
      .join(" ");
  const curveLine = air === "pm25" ? stepLine(curve, yOf) : line(curve, yOf);
  const first = curve[0];
  const last = curve[curve.length - 1];
  const curveArea =
    first && last ? `${curveLine} L${x(last.t).toFixed(1)} ${PLOT_BOTTOM} L${x(first.t).toFixed(1)} ${PLOT_BOTTOM} Z` : "";

  // Stepped target line: horizontal at each target, vertical where two segments meet.
  let targetPath = "";
  if (!air) {
    model.target.forEach((segment, index) => {
      const y = yOf(Number(segment.value)).toFixed(1);
      const previous = model.target[index - 1];
      targetPath += previous && previous.end === segment.start ? ` L${x(segment.start).toFixed(1)} ${y}` : ` M${x(segment.start).toFixed(1)} ${y}`;
      targetPath += ` L${x(segment.end).toFixed(1)} ${y}`;
    });
  }

  // The horizontal lines about as far apart as the vertical ones (6 to 10 parts across): the cells of the grid are about square.
  const pitch = plotWidth(width) / Math.max(1, (range.endMs - range.startMs) / HOUR_MS / tickHours(range));
  const parts = Math.max(2, Math.round(PLOT_HEIGHT / pitch));
  const rawStep = (axis.max - axis.min) / parts;
  const gridStep = [0.5, 1, 2, 5, 10].find((candidate) => candidate >= rawStep * 0.8) ?? 10;
  const grid = air ? airGrid(axis.min, axis.max, air, parts) : temperatureTicks(axis.min, axis.max, gridStep);
  const gridLabel = (value: number): string => (air ? i18n.whole(value) : `${i18n.tick(value)}°`);
  // A limit is a dashed line in its own colour with its value in the margin; a scale label too close to it is left out.
  const limitLines = limits
    ? [
        { value: limits.warning, color: COLORS.warning },
        { value: limits.critical, color: COLORS.alertOnPopup },
      ].filter((limit) => limit.value > axis.min && limit.value < axis.max)
    : [];
  // The curve is white, orange above the warning limit and red above the critical one: one path, hard stops at the limits.
  const offset = (value: number): number => Math.min(1, Math.max(0, (yOf(value) - PLOT_TOP) / PLOT_HEIGHT));
  const gradient: Array<[number, string]> = [];
  if (limits && limitLines.length > 0) {
    const hasCritical = limitLines.some((limit) => limit.value === limits.critical);
    const critical = offset(limits.critical);
    const warning = offset(limits.warning);
    if (hasCritical) {
      gradient.push([0, COLORS.alertOnPopup], [critical, COLORS.alertOnPopup]);
    }
    gradient.push([hasCritical ? critical : 0, COLORS.warning], [warning, COLORS.warning], [warning, COLORS.white], [1, COLORS.white]);
  }
  const valueColor = (value: number): string => (limits ? airValueColor(value, limits) : COLORS.white);

  const strip = (segments: Segment[], y: number, color: (value: string) => string) =>
    segments.map((segment) => {
      const left = x(segment.start);
      return svg`<rect x=${left.toFixed(1)} y=${y} width=${Math.max(x(segment.end) - left, 0.8).toFixed(1)}
        height=${STRIP_HEIGHT} rx="2" style=${fill(color(segment.value))}></rect>`;
    });

  // One row per system in the order of the room card; the windows come last.
  const order = stripRows(model, metric, isSummer);
  const bottom = rowsBottom(order.length);
  const axisY = bottom + AXIS_GAP;
  const height = chartHeight(order.length);
  const rowIcon = (row: StripRow): TemplateResult =>
    row === "heating"
      ? svg`${heatingWavesShape(3, false)}`
      : row === "climate"
        ? svg`<g style=${stroke(COLORS.off)}>${climateShape("off")}</g>`
        : row === "ventilation"
          ? svg`<g style=${stroke(COLORS.fresh)}>${climateShape("fan")}</g>`
          : svg`<g style=${stroke("var(--kd-sky)")}>${windowShape()}</g>`;
  const block = (segments: Segment[], y: number, color: string, className: string, minWidth: number): TemplateResult[] =>
    segments.map((segment) => {
      const left = x(segment.start);
      return svg`<rect class=${className} x=${left.toFixed(1)} y=${y} width=${Math.max(x(segment.end) - left, minWidth).toFixed(1)}
        height=${STRIP_HEIGHT} rx="2" style=${fill(color)}></rect>`;
    });
  const rowBars = (row: StripRow, y: number): TemplateResult =>
    row === "heating"
      ? svg`${strip(model.heating, y, (value) => HEATING_COLORS[value] ?? COLORS.off)}`
      : row === "climate"
        ? svg`${strip(model.climate, y, (value) => climateStripColor(value as ClimateMode))}`
        : row === "ventilation"
          ? svg`${block(model.ventilation ?? [], y, COLORS.fresh, "ventilation-on", 1.5)}`
          : svg`${block(model.windows ?? [], y, "var(--kd-sky)", "window-open", 1.5)}`;
  const scrubX = scrubTime === undefined ? undefined : x(scrubTime);
  const scrubValue = scrubTime === undefined ? undefined : valueAt(curve, scrubTime);
  const nights = nightBands(range, model.night);
  // Over the plot, behind the curve: the times the windows were open and the ventilation mode ran (the air charts).
  const bands = (segments: Segment[] | undefined, color: string, className: string, token: string): TemplateResult[] =>
    (segments ?? []).map(
      (segment) => svg`<rect class=${className} x=${x(segment.start).toFixed(1)} y=${PLOT_TOP}
        width=${Math.max(x(segment.end) - x(segment.start), 3).toFixed(1)} height=${PLOT_HEIGHT}
        style=${`${fill(color)}; opacity: var(${token})`}></rect>`,
    );
  const dotColor = (value: number): string => (air ? valueColor(value) : COLORS.white);

  // PM2.5 under the CO₂ curve: a weaker dashed step line on its own scale (no axis), like the humidity under the temperature.
  const pm25Max = Math.max(...model.pm25.map((point) => point.v), 0);
  const pm25High = Math.max(pm25Max + 3, 10);
  const yPm25 = (value: number): number => PLOT_BOTTOM - (value / pm25High) * PLOT_HEIGHT;
  const secondaryLine = air === "co2" && model.pm25.length > 0 ? stepLine(model.pm25, yPm25) : "";

  // Time labels of the axis: a label that would touch the one to its right is left out (the newest times win), the lines stay.
  const labelWidth = (text: string): number => [...text].reduce((sum, character) => sum + (/\d/.test(character) ? 6.7 : 3.6), 0);
  const timeLabels = clockTicks(range).map((tick) => {
    const text = tickLabel(tick, range, i18n);
    const anchored = tickAnchor(x(tick), PAD_LEFT);
    const textWidth = labelWidth(text);
    const left = anchored.anchor === "start" ? anchored.x : anchored.anchor === "end" ? anchored.x - textWidth : anchored.x - textWidth / 2;
    return { x: x(tick), text, anchored, left, right: left + textWidth, show: false };
  });
  let edge = Infinity;
  for (let index = timeLabels.length - 1; index >= 0; index--) {
    if (timeLabels[index].right <= edge + 2) {
      timeLabels[index].show = true;
      edge = timeLabels[index].left;
    }
  }

  return html`
    ${air ? renderAirReadout(model, air, scrubTime, i18n, live) : renderReadout(model, scrubTime, i18n)}
    <svg
      class="chart"
      viewBox="0 0 ${width} ${height}"
      width=${width}
      height=${height}
      aria-hidden="true"
    >
      <defs>
        <clipPath id=${CLIP_ID}><path d=${curveArea}></path></clipPath>
        <clipPath id=${PLOT_CLIP_ID}>
          <rect x=${PAD_LEFT} y=${PLOT_TOP} width=${plotWidth(width)} height=${PLOT_HEIGHT} rx="8"></rect>
        </clipPath>
        ${gradient.length > 0
          ? svg`<linearGradient id=${CURVE_ID} gradientUnits="userSpaceOnUse" x1="0" x2="0" y1=${PLOT_TOP} y2=${PLOT_BOTTOM}>
              ${gradient.map(
                ([at, color]) => svg`<stop offset=${`${(at * 100).toFixed(2)}%`} style=${`stop-color: ${color}`}></stop>`,
              )}
            </linearGradient>`
          : nothing}
      </defs>
      <rect x=${PAD_LEFT} y=${PLOT_TOP} width=${plotWidth(width)} height=${PLOT_HEIGHT} rx="8" style=${fill("var(--kd-fill)")}></rect>
      <g clip-path=${`url(#${PLOT_CLIP_ID})`}>
        ${nights.map(
          ([start, end]) => svg`<rect class="night" x=${x(start).toFixed(1)} y=${PLOT_TOP} width=${(x(end) - x(start)).toFixed(1)}
            height=${PLOT_HEIGHT} style=${fill("var(--kd-night)")}></rect>`,
        )}
        ${air ? bands(model.windows, "var(--kd-sky)", "window-band", "--kd-band-window") : nothing}
        ${air ? bands(model.ventilation, COLORS.fresh, "ventilation-band", "--kd-band-ventilation") : nothing}
      </g>
      ${grid.map((value) => {
        const y = yOf(value);
        const nearLimit = limitLines.some((limit) => Math.abs(yOf(limit.value) - y) < 10);
        return svg`<line x1=${PAD_LEFT} x2=${right} y1=${y.toFixed(1)} y2=${y.toFixed(1)}
            style=${stroke("var(--kd-grid)")} stroke-width="1"></line>
          ${nearLimit
            ? nothing
            : svg`<text x=${right + 6} y=${(y + 4).toFixed(1)} style=${fill(COLORS.label)} font-size=${FONT}>${gridLabel(value)}</text>`}`;
      })}
      ${limitLines.map(
        (limit) => svg`<line class="limit-line" x1=${PAD_LEFT} x2=${right} y1=${yOf(limit.value).toFixed(1)} y2=${yOf(limit.value).toFixed(1)}
            style=${stroke(limit.color)} stroke-width="1" stroke-dasharray="4 3" opacity="0.8"></line>
          <text class="limit-label" x=${right + 6} y=${(yOf(limit.value) + 4).toFixed(1)} style=${fill(limit.color)} font-size=${FONT}
            font-weight="600">${gridLabel(limit.value)}</text>`,
      )}
      <g clip-path=${`url(#${PLOT_CLIP_ID})`}>
        ${curveArea ? svg`<path d=${curveArea} style=${fill("var(--kd-area)")}></path>` : nothing}
      </g>
      ${!air
        ? svg`<g clip-path=${`url(#${CLIP_ID})`}>
        ${model.intensity.map(
          (segment) => svg`<rect x=${x(segment.start).toFixed(1)} y=${PLOT_TOP}
            width=${Math.max(x(segment.end) - x(segment.start), 0.8).toFixed(1)} height=${PLOT_HEIGHT}
            style=${fill(COLORS.warning)} opacity=${INTENSITY_OPACITY[Number(segment.value)] ?? 0}></rect>`,
        )}
      </g>`
        : nothing}
      ${secondaryLine
        ? svg`<path class="pm25-line" d=${secondaryLine} fill="none" style=${stroke(COLORS.pm25)}
            stroke-width="1.25" stroke-dasharray="4 3" stroke-linejoin="round" opacity="0.75" clip-path=${`url(#${PLOT_CLIP_ID})`}></path>`
        : nothing}
      ${!air && model.humidity.length > 0
        ? svg`<path d=${line(model.humidity, yHumidity)} fill="none" style=${stroke(COLORS.humidityLine)}
            stroke-width="1.25" stroke-dasharray="4 3" stroke-linejoin="round" opacity="0.65"></path>`
        : nothing}
      ${targetPath
        ? svg`<path d=${targetPath} fill="none" style=${stroke(COLORS.plan)} stroke-width="1"
            stroke-dasharray="3 3" opacity="0.45" clip-path=${`url(#${PLOT_CLIP_ID})`}></path>`
        : nothing}
      ${curveLine
        ? svg`<path class="temperature-curve" d=${curveLine} fill="none"
            style=${stroke(gradient.length > 0 ? `url(#${CURVE_ID})` : COLORS.white)} stroke-width="2.5"
            stroke-linejoin="round" stroke-linecap="round" clip-path=${`url(#${PLOT_CLIP_ID})`}></path>`
        : nothing}
      ${last && scrubTime === undefined
        ? svg`<circle class="end-dot" cx=${x(last.t).toFixed(1)} cy=${yOf(last.v).toFixed(1)} r="4"
            style=${`${fill(dotColor(last.v))}; ${stroke("var(--kd-sheet-bg)")}`} stroke-width="2"></circle>`
        : nothing}

      ${order.map((row, index) => {
        const rowY = ROWS_TOP + index * ROW_PITCH;
        const barY = rowY + (ROW_PITCH - STRIP_HEIGHT) / 2;
        return svg`<g class=${`strip-row ${row}`}>
          <rect x=${PAD_LEFT} y=${barY} width=${plotWidth(width)} height=${STRIP_HEIGHT} rx="2" style=${fill("var(--kd-fill)")}></rect>
          ${rowBars(row, barY)}
          <g class="strip-icon" transform=${`translate(${right + 6} ${rowY + (ROW_PITCH - ICON_SIZE) / 2}) scale(${ICON_SIZE / 24})`} fill="none"
            stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">${rowIcon(row)}</g>
        </g>`;
      })}

      ${timeLabels.map(
        (label) => svg`<line x1=${label.x.toFixed(1)} x2=${label.x.toFixed(1)} y1=${PLOT_TOP} y2=${bottom}
            style=${stroke("var(--kd-grid-soft)")} stroke-width="1"></line>
          ${label.show
            ? svg`<text class="tick" x=${label.anchored.x.toFixed(1)} y=${axisY} style=${fill(COLORS.label)} font-size=${FONT}
                text-anchor=${label.anchored.anchor}>${label.text}</text>`
            : nothing}`,
      )}
      ${scrubX === undefined
        ? nothing
        : svg`<line x1=${scrubX.toFixed(1)} x2=${scrubX.toFixed(1)} y1=${PLOT_TOP} y2=${bottom}
              style=${stroke(COLORS.white)} stroke-width="1" opacity="0.7"></line>
            ${scrubValue === undefined
              ? nothing
              : svg`<circle cx=${scrubX.toFixed(1)} cy=${yOf(scrubValue).toFixed(1)} r="4"
                  style=${`${fill(dotColor(scrubValue))}; ${stroke("var(--kd-sheet-bg)")}`} stroke-width="2"></circle>`}`}
    </svg>
  `;
}

/** Keyboard step when scrubbing with the arrow keys. */
export const SCRUB_STEP_MS = HOUR_MS / 4;
