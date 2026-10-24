import { html, nothing, svg } from "lit";
import type { TemplateResult } from "lit";
import { HOUR_MS, buildSegments, numericSeries } from "./history";
import type { HistoryMap, Segment } from "./history";
import { renderClimateIcon, renderHeatingWaves } from "./icons";
import type { ClimateMode, HistorySettings, Room } from "./types";
import {
  CLIMATE_COLORS,
  CLIMATE_LABELS,
  COLORS,
  climateModeFromState,
  formatHalf,
  formatOne,
  heatingWaveCount,
} from "./utils";

/**
 * „Historie místnosti – 24 h“ (CURRENT_SPEC.md, Historie a grafy; the length is
 * `history.hours`), modelled on the day report
 * of the heating app: temperature curve over a grey area, heating as orange fill under the
 * curve (strength = 0–3 waves), the Topení target as a stepped dashed line, night shading,
 * dashed humidity, and time layers for Topení and Klimatizace. The chart is drawn 1:1 in CSS
 * pixels so its labels keep their size.
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
/** Temperature labels sit on the right, as in the heating app. */
const PAD_RIGHT = 32;
const PLOT_TOP = 6;
const PLOT_HEIGHT = 150;
const PLOT_BOTTOM = PLOT_TOP + PLOT_HEIGHT;
const STRIP_HEIGHT = 10;
const HEATING_LABEL_Y = PLOT_BOTTOM + 20;
const HEATING_STRIP_Y = PLOT_BOTTOM + 25;
const CLIMATE_LABEL_Y = PLOT_BOTTOM + 50;
const CLIMATE_STRIP_Y = PLOT_BOTTOM + 55;
const AXIS_Y = PLOT_BOTTOM + 83;
export const CHART_HEIGHT = PLOT_BOTTOM + 90;
const FONT = 11;
const INTENSITY_OPACITY = [0, 0.24, 0.44, 0.68];
const CLIP_ID = "history-under-temperature";
const PLOT_CLIP_ID = "history-plot";
/** Target (°C) Tado reports while the heating is off; never drawn or read as a target. */
const HEATING_OFF_TARGET = 5;
const TICK_FORMAT = new Intl.NumberFormat("cs-CZ", { maximumFractionDigits: 1 });

const HEATING_COLORS: Record<string, string> = {
  schedule: COLORS.plan,
  manual: COLORS.warning,
  off: COLORS.closed,
};
const HEATING_LABELS: Record<string, string> = {
  schedule: "Plán",
  manual: "Ručně",
  off: "Vypnuto",
};

const timeFormat = new Intl.DateTimeFormat("cs-CZ", { hour: "2-digit", minute: "2-digit" });
const dayFormat = new Intl.DateTimeFormat("cs-CZ", { day: "numeric", month: "numeric" });

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
  tempMin: number;
  tempMax: number;
  tempStep: number;
  humidityMin?: number;
  humidityMax?: number;
  /** Night shading, whole hours [start, end] (start = end: none). */
  night: [number, number];
}

function heatingMode(overlay: string | undefined, climate: string | undefined): string | undefined {
  const overlayState = overlay?.toLowerCase();
  if (climate?.toLowerCase() === "off" || overlayState === "off") {
    return "off";
  }
  return overlayState === "schedule" || overlayState === "manual" ? overlayState : undefined;
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
): RoomChartModel {
  const series = (entityId: string | undefined) => (entityId ? history[entityId] : undefined);
  const { startMs, endMs } = range;
  const overlay = series(room.heating?.overlay);
  const heatingClimate = series(room.heating?.climate);

  const temperature = numericSeries(series(room.temperature), startMs, endMs);
  const humidity = numericSeries(series(room.humidity), startMs, endMs);
  const heating = buildSegments([overlay, heatingClimate], startMs, endMs, ([o, c]) => heatingMode(o, c));
  const intensity = buildSegments(
    [overlay, heatingClimate, series(room.heating?.intensity)],
    startMs,
    endMs,
    ([o, c, value]) => {
      const mode = heatingMode(o, c);
      const waves = heatingWaveCount(finite(value), room.thresholds);
      return mode === undefined || mode === "off" || waves === 0 ? undefined : String(waves);
    },
  );
  const target = buildSegments(
    [overlay, heatingClimate, series(room.heating?.target)],
    startMs,
    endMs,
    ([o, c, value]) => {
      const mode = heatingMode(o, c);
      const number = finite(value);
      // Vypnuto wins over any target (CURRENT_SPEC.md, Topení). Tado reports 5 °C while off, and the
      // target entity changes a moment before or after the mode entities do, which would leave a
      // sliver of "Plán · 5 °C" at every switch; 5 °C is therefore never a target.
      if (number === undefined || number <= HEATING_OFF_TARGET) {
        return undefined;
      }
      return mode === "schedule" || mode === "manual" ? String(number) : undefined;
    },
  );
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
    tempMin,
    tempMax,
    tempStep,
    humidityMin: humidityValues.length > 0 ? Math.min(...humidityValues) : undefined,
    humidityMax: humidityValues.length > 0 ? Math.max(...humidityValues) : undefined,
    night: [settings.night_start, settings.night_end],
  };
}

export function hasChartData(model: RoomChartModel): boolean {
  return model.temperature.length > 0 || model.humidity.length > 0 || model.heating.length > 0;
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
 * Hours between two clock ticks: every 6 h up to a day (00, 06, 12, 18), then 12 h up to two
 * days and whole days beyond, so a longer history keeps about four to eight labels.
 */
function tickHours(range: ChartRange): number {
  const hours = (range.endMs - range.startMs) / HOUR_MS;
  if (hours <= 12) {
    return 3;
  }
  if (hours <= 24) {
    return 6;
  }
  if (hours <= 48) {
    return 12;
  }
  return hours <= 96 ? 24 : 48;
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
 * A tick label is centred under its line, but one close to an edge of the plot is aligned to
 * that edge instead, so "18:00" just after the start of the range is not cut off.
 */
function tickAnchor(x: number, left: number, right: number): { x: number; anchor: "start" | "middle" | "end" } {
  const half = 16;
  if (x - half < left) {
    return { x: left, anchor: "start" };
  }
  if (x + half > right) {
    return { x: right, anchor: "end" };
  }
  return { x, anchor: "middle" };
}

/** In the light theme a switched-off air conditioner is a light strip, like Topení Vypnuto. */
function climateStripColor(mode: ClimateMode): string {
  return mode === "off" ? "var(--kd-strip-off)" : CLIMATE_COLORS[mode] ?? COLORS.off;
}

/** Label of a tick: the time, or the date for ticks a day or more apart ("24. 10."). */
function tickLabel(tick: number, range: ChartRange): string {
  return tickHours(range) >= 24 ? dayFormat.format(tick) : timeFormat.format(tick);
}

function legendItem(color: string, label: string, kind: "line" | "dashed" | "block" = "block"): TemplateResult {
  return html`<span class="legend-item">
    <span class="legend-swatch ${kind}" style=${kind === "block" ? `background: ${color}` : `border-color: ${color}`}></span
    >${label}
  </span>`;
}

/** Values under the finger (or now): time, temperature, humidity, Topení and Klimatizace. */
function renderReadout(model: RoomChartModel, time: number | undefined): TemplateResult {
  const at = time ?? model.range.endMs;
  const temperature = valueAt(model.temperature, at);
  const humidity = valueAt(model.humidity, at);
  const heating = segmentAt(model.heating, at, model.range.endMs);
  const waves = Number(segmentAt(model.intensity, at, model.range.endMs) ?? 0);
  const target = segmentAt(model.target, at, model.range.endMs);
  const climate = segmentAt(model.climate, at, model.range.endMs) as ClimateMode | undefined;

  let when = "Teď";
  if (time !== undefined) {
    const day = (ms: number) => {
      const date = new Date(ms);
      date.setHours(12, 0, 0, 0);
      return date.getTime();
    };
    const daysAgo = Math.round((day(model.range.endMs) - day(time)) / (24 * HOUR_MS));
    const prefix = daysAgo === 0 ? "" : daysAgo === 1 ? "včera " : `${dayFormat.format(time)} `;
    when = `${prefix}${timeFormat.format(time)}`;
  }
  const heatingText =
    heating === undefined
      ? "––"
      : `${HEATING_LABELS[heating]}${heating !== "off" && target !== undefined ? ` · ${formatHalf(Number(target))} °C` : ""}`;
  const climateText = climate ? CLIMATE_LABELS[climate] : "––";
  const climateColor = climate ? CLIMATE_COLORS[climate] : COLORS.off;

  return html`
    <div class="readout" aria-live="polite">
      <div class="readout-main">
        <span class="readout-time">${when}</span>
        <span class="readout-temp">${temperature === undefined ? "––" : `${formatOne(temperature)} °C`}</span>
        <span class="readout-hum">${humidity === undefined ? "" : `${Math.round(humidity)} %`}</span>
      </div>
      <div class="readout-systems">
        <span class="readout-system" style=${`color: ${heating ? HEATING_COLORS[heating] : COLORS.label}`}>
          <span class="readout-icon">${renderHeatingWaves(heating && heating !== "off" ? waves : 0, heating === undefined)}</span>
          Topení ${heatingText}
        </span>
        <span class="readout-system" style=${`color: ${climateColor}`}>
          <span class="readout-icon">${renderClimateIcon(climate ?? "off", climateColor, climate === undefined)}</span>
          Klimatizace ${climateText}
        </span>
      </div>
    </div>
  `;
}

export function renderRoomChart(model: RoomChartModel, width: number, scrubTime: number | undefined): TemplateResult {
  // Ground, night and grid of the plot follow the theme (styles.ts).
  const { range } = model;
  const x = (time: number): number => xOf(time, range, width);
  const yTemp = (value: number): number =>
    PLOT_BOTTOM - ((value - model.tempMin) / (model.tempMax - model.tempMin)) * PLOT_HEIGHT;
  const humidityLow = (model.humidityMin ?? 0) - 3;
  const humidityHigh = Math.max((model.humidityMax ?? 100) + 3, humidityLow + 12);
  const yHumidity = (value: number): number =>
    PLOT_BOTTOM - ((value - humidityLow) / (humidityHigh - humidityLow)) * PLOT_HEIGHT;
  const right = PAD_LEFT + plotWidth(width);

  const line = (points: Point[], y: (value: number) => number): string =>
    points.map((point, index) => `${index === 0 ? "M" : "L"}${x(point.t).toFixed(1)} ${y(point.v).toFixed(1)}`).join(" ");
  const temperatureLine = line(model.temperature, yTemp);
  const first = model.temperature[0];
  const last = model.temperature[model.temperature.length - 1];
  const temperatureArea =
    first && last ? `${temperatureLine} L${x(last.t).toFixed(1)} ${PLOT_BOTTOM} L${x(first.t).toFixed(1)} ${PLOT_BOTTOM} Z` : "";

  // Stepped target line: horizontal at each target, vertical where two segments meet.
  let targetPath = "";
  model.target.forEach((segment, index) => {
    const y = yTemp(Number(segment.value)).toFixed(1);
    const previous = model.target[index - 1];
    targetPath += previous && previous.end === segment.start ? ` L${x(segment.start).toFixed(1)} ${y}` : ` M${x(segment.start).toFixed(1)} ${y}`;
    targetPath += ` L${x(segment.end).toFixed(1)} ${y}`;
  });

  const grid = temperatureTicks(model.tempMin, model.tempMax, model.tempStep);
  const strip = (segments: Segment[], y: number, color: (value: string) => string) =>
    segments.map((segment) => {
      const left = x(segment.start);
      return svg`<rect x=${left.toFixed(1)} y=${y} width=${Math.max(x(segment.end) - left, 0.8).toFixed(1)}
        height=${STRIP_HEIGHT} rx="2" style=${fill(color(segment.value))}></rect>`;
    });

  const scrubX = scrubTime === undefined ? undefined : x(scrubTime);
  const scrubTemperature = scrubTime === undefined ? undefined : valueAt(model.temperature, scrubTime);
  const nights = nightBands(range, model.night);
  const heatingKinds = ["schedule", "manual", "off"].filter((kind) => model.heating.some((segment) => segment.value === kind));
  const climateModes = [...new Set(model.climate.map((segment) => segment.value as ClimateMode))];

  return html`
    ${renderReadout(model, scrubTime)}
    <svg
      class="chart"
      viewBox="0 0 ${width} ${CHART_HEIGHT}"
      width=${width}
      height=${CHART_HEIGHT}
      aria-hidden="true"
    >
      <defs>
        <clipPath id=${CLIP_ID}><path d=${temperatureArea}></path></clipPath>
        <clipPath id=${PLOT_CLIP_ID}>
          <rect x=${PAD_LEFT} y=${PLOT_TOP} width=${plotWidth(width)} height=${PLOT_HEIGHT}></rect>
        </clipPath>
      </defs>
      <rect x=${PAD_LEFT} y=${PLOT_TOP} width=${plotWidth(width)} height=${PLOT_HEIGHT} rx="8" style=${fill("var(--kd-fill)")}></rect>
      ${nights.map(
        ([start, end]) => svg`<rect class="night" x=${x(start).toFixed(1)} y=${PLOT_TOP} width=${(x(end) - x(start)).toFixed(1)}
          height=${PLOT_HEIGHT} style=${fill("var(--kd-night)")}></rect>`,
      )}
      ${grid.map(
        (value) => svg`<line x1=${PAD_LEFT} x2=${right} y1=${yTemp(value).toFixed(1)} y2=${yTemp(value).toFixed(1)}
            style=${stroke("var(--kd-grid)")} stroke-width="1"></line>
          <text x=${right + 6} y=${(yTemp(value) + 4).toFixed(1)} style=${fill(COLORS.label)} font-size=${FONT}>${TICK_FORMAT.format(value)}°</text>`,
      )}
      ${temperatureArea ? svg`<path d=${temperatureArea} style=${fill("var(--kd-area)")}></path>` : nothing}
      <g clip-path=${`url(#${CLIP_ID})`}>
        ${model.intensity.map(
          (segment) => svg`<rect x=${x(segment.start).toFixed(1)} y=${PLOT_TOP}
            width=${Math.max(x(segment.end) - x(segment.start), 0.8).toFixed(1)} height=${PLOT_HEIGHT}
            style=${fill(COLORS.warning)} opacity=${INTENSITY_OPACITY[Number(segment.value)] ?? 0}></rect>`,
        )}
      </g>
      ${model.humidity.length > 0
        ? svg`<path d=${line(model.humidity, yHumidity)} fill="none" style=${stroke(COLORS.humidityLine)}
            stroke-width="1.5" stroke-dasharray="4 3" stroke-linejoin="round" opacity="0.85"></path>`
        : nothing}
      ${targetPath
        ? svg`<path d=${targetPath} fill="none" style=${stroke(COLORS.plan)} stroke-width="1.4"
            stroke-dasharray="3 3" opacity="0.6" clip-path=${`url(#${PLOT_CLIP_ID})`}></path>`
        : nothing}
      ${temperatureLine
        ? svg`<path class="temperature-curve" d=${temperatureLine} fill="none" style=${stroke(COLORS.white)} stroke-width="2"
            stroke-linejoin="round" stroke-linecap="round"></path>`
        : nothing}
      ${last && scrubTime === undefined
        ? svg`<circle cx=${x(last.t).toFixed(1)} cy=${yTemp(last.v).toFixed(1)} r="3.5" style=${fill(COLORS.white)}></circle>`
        : nothing}

      <text x=${PAD_LEFT} y=${HEATING_LABEL_Y} style=${fill(COLORS.label)} font-size=${FONT}>Topení</text>
      <rect x=${PAD_LEFT} y=${HEATING_STRIP_Y} width=${plotWidth(width)} height=${STRIP_HEIGHT} rx="2" style=${fill("var(--kd-fill)")}></rect>
      ${strip(model.heating, HEATING_STRIP_Y, (value) => HEATING_COLORS[value] ?? COLORS.off)}
      <text x=${PAD_LEFT} y=${CLIMATE_LABEL_Y} style=${fill(COLORS.label)} font-size=${FONT}>Klimatizace</text>
      <rect x=${PAD_LEFT} y=${CLIMATE_STRIP_Y} width=${plotWidth(width)} height=${STRIP_HEIGHT} rx="2" style=${fill("var(--kd-fill)")}></rect>
      ${strip(model.climate, CLIMATE_STRIP_Y, (value) => climateStripColor(value as ClimateMode))}

      ${clockTicks(range).map((tick) => {
        const label = tickAnchor(x(tick), PAD_LEFT, right);
        return svg`<line x1=${x(tick).toFixed(1)} x2=${x(tick).toFixed(1)} y1=${PLOT_TOP} y2=${CLIMATE_STRIP_Y + STRIP_HEIGHT}
            style=${stroke("var(--kd-grid-soft)")} stroke-width="1"></line>
          <text class="tick" x=${label.x.toFixed(1)} y=${AXIS_Y} style=${fill(COLORS.label)} font-size=${FONT}
            text-anchor=${label.anchor}>${tickLabel(tick, range)}</text>`;
      })}
      ${scrubX === undefined
        ? nothing
        : svg`<line x1=${scrubX.toFixed(1)} x2=${scrubX.toFixed(1)} y1=${PLOT_TOP} y2=${CLIMATE_STRIP_Y + STRIP_HEIGHT}
              style=${stroke(COLORS.white)} stroke-width="1" opacity="0.7"></line>
            ${scrubTemperature === undefined
              ? nothing
              : svg`<circle cx=${scrubX.toFixed(1)} cy=${yTemp(scrubTemperature).toFixed(1)} r="4"
                  style=${`${fill(COLORS.white)}; ${stroke("var(--kd-sheet-bg)")}`} stroke-width="2"></circle>`}`}
    </svg>
    <div class="legend">
      ${legendItem(COLORS.white, "Teplota", "line")}
      ${model.target.length > 0 ? legendItem(COLORS.plan, "Cíl topení", "dashed") : nothing}
      ${model.intensity.length > 0 ? legendItem(COLORS.warning, "Vytápění (sytost = výkon)") : nothing}
      ${model.humidityMin !== undefined && model.humidityMax !== undefined
        ? legendItem(
            COLORS.humidityLine,
            `Vlhkost ${Math.round(model.humidityMin)}–${Math.round(model.humidityMax)} %`,
            "dashed",
          )
        : nothing}
      ${nights.length > 0 ? legendItem("var(--kd-night-swatch)", `Noc ${model.night[0]}–${model.night[1]} h`) : nothing}
    </div>
    <div class="legend">
      ${heatingKinds.map((kind) => legendItem(HEATING_COLORS[kind], `Topení ${HEATING_LABELS[kind]}`))}
      ${climateModes.map((mode) => legendItem(climateStripColor(mode), `Klimatizace ${CLIMATE_LABELS[mode]}`))}
    </div>
  `;
}

/** Keyboard step when scrubbing with the arrow keys. */
export const SCRUB_STEP_MS = HOUR_MS / 4;
