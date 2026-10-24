import { html, nothing, svg } from "lit";
import type { TemplateResult } from "lit";
import { HOUR_MS, buildSegments, numericSeries } from "./history";
import type { HistoryMap, Segment } from "./history";
import { renderClimateIcon, renderHeatingWaves } from "./icons";
import type { ClimateMode, RoomConfig } from "./types";
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
 * „Historie místnosti – 24 h“ (CURRENT_SPEC.md, Historie a grafy), modelled on the day report
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
const NIGHT_FROM_HOUR = 22;
const NIGHT_TO_HOUR = 6;
const INTENSITY_OPACITY = [0, 0.24, 0.44, 0.68];
const CLIP_ID = "history-under-temperature";

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

export function buildRoomChart(history: HistoryMap, room: RoomConfig, range: ChartRange): RoomChartModel {
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
      const waves = heatingWaveCount(finite(value));
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
      return mode === "schedule" || mode === "manual" ? (number === undefined ? undefined : String(number)) : undefined;
    },
  );
  const climate = buildSegments([series(room.air_conditioner)], startMs, endMs, ([state]) => {
    const mode = climateModeFromState(state);
    return mode === "unknown" ? undefined : mode;
  });

  // Temperature axis in whole degrees, at least 3 °C, covering the curve and the target.
  const values = [...temperature.map((point) => point.v), ...target.map((segment) => Number(segment.value))];
  let tempMin = 19;
  let tempMax = 23;
  if (values.length > 0) {
    tempMin = Math.floor(Math.min(...values) - 0.2);
    tempMax = Math.ceil(Math.max(...values) + 0.2);
    if (tempMax - tempMin < 3) {
      const grow = 3 - (tempMax - tempMin);
      tempMin -= Math.floor(grow / 2);
      tempMax = tempMin + 3;
    }
  }
  const tempStep = tempMax - tempMin <= 6 ? 1 : 2;

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

function nightBands(range: ChartRange): Array<[number, number]> {
  const bands: Array<[number, number]> = [];
  const day = new Date(range.startMs);
  day.setHours(0, 0, 0, 0);
  day.setDate(day.getDate() - 1);
  while (day.getTime() < range.endMs) {
    const from = new Date(day);
    from.setHours(NIGHT_FROM_HOUR, 0, 0, 0);
    const to = new Date(day);
    to.setDate(to.getDate() + 1);
    to.setHours(NIGHT_TO_HOUR, 0, 0, 0);
    const start = Math.max(from.getTime(), range.startMs);
    const end = Math.min(to.getTime(), range.endMs);
    if (end > start) {
      bands.push([start, end]);
    }
    day.setDate(day.getDate() + 1);
  }
  return bands;
}

/** Clock ticks every 6 hours (00, 06, 12, 18) inside the range. */
function clockTicks(range: ChartRange): number[] {
  const ticks: number[] = [];
  const tick = new Date(range.startMs);
  tick.setMinutes(0, 0, 0);
  tick.setHours(Math.ceil(tick.getHours() / 6) * 6);
  while (tick.getTime() <= range.endMs) {
    if (tick.getTime() >= range.startMs) {
      ticks.push(tick.getTime());
    }
    tick.setHours(tick.getHours() + 6);
  }
  return ticks;
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
    const sameDay = new Date(time).toDateString() === new Date(model.range.endMs).toDateString();
    when = `${sameDay ? "" : "včera "}${timeFormat.format(time)}`;
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

  const grid: number[] = [];
  for (let value = model.tempMin; value <= model.tempMax; value += model.tempStep) {
    grid.push(value);
  }
  const strip = (segments: Segment[], y: number, color: (value: string) => string) =>
    segments.map((segment) => {
      const left = x(segment.start);
      return svg`<rect x=${left.toFixed(1)} y=${y} width=${Math.max(x(segment.end) - left, 0.8).toFixed(1)}
        height=${STRIP_HEIGHT} rx="2" fill=${color(segment.value)}></rect>`;
    });

  const scrubX = scrubTime === undefined ? undefined : x(scrubTime);
  const scrubTemperature = scrubTime === undefined ? undefined : valueAt(model.temperature, scrubTime);
  const nights = nightBands(range);
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
      </defs>
      <rect x=${PAD_LEFT} y=${PLOT_TOP} width=${plotWidth(width)} height=${PLOT_HEIGHT} rx="8" fill="rgb(255 255 255 / 5%)"></rect>
      ${nights.map(
        ([start, end]) => svg`<rect x=${x(start).toFixed(1)} y=${PLOT_TOP} width=${(x(end) - x(start)).toFixed(1)}
          height=${PLOT_HEIGHT} fill="rgb(0 0 0 / 30%)"></rect>`,
      )}
      ${grid.map(
        (value) => svg`<line x1=${PAD_LEFT} x2=${right} y1=${yTemp(value).toFixed(1)} y2=${yTemp(value).toFixed(1)}
            stroke="rgb(255 255 255 / 8%)" stroke-width="1"></line>
          <text x=${right + 6} y=${(yTemp(value) + 4).toFixed(1)} fill=${COLORS.label} font-size=${FONT}>${value}°</text>`,
      )}
      ${temperatureArea ? svg`<path d=${temperatureArea} fill="rgb(255 255 255 / 7%)"></path>` : nothing}
      <g clip-path=${`url(#${CLIP_ID})`}>
        ${model.intensity.map(
          (segment) => svg`<rect x=${x(segment.start).toFixed(1)} y=${PLOT_TOP}
            width=${Math.max(x(segment.end) - x(segment.start), 0.8).toFixed(1)} height=${PLOT_HEIGHT}
            fill=${COLORS.warning} opacity=${INTENSITY_OPACITY[Number(segment.value)] ?? 0}></rect>`,
        )}
      </g>
      ${model.humidity.length > 0
        ? svg`<path d=${line(model.humidity, yHumidity)} fill="none" stroke=${COLORS.humidityLine}
            stroke-width="1.5" stroke-dasharray="4 3" stroke-linejoin="round" opacity="0.85"></path>`
        : nothing}
      ${targetPath
        ? svg`<path d=${targetPath} fill="none" stroke=${COLORS.plan} stroke-width="1.4"
            stroke-dasharray="3 3" opacity="0.6"></path>`
        : nothing}
      ${temperatureLine
        ? svg`<path d=${temperatureLine} fill="none" stroke=${COLORS.white} stroke-width="2"
            stroke-linejoin="round" stroke-linecap="round"></path>`
        : nothing}
      ${last && scrubTime === undefined
        ? svg`<circle cx=${x(last.t).toFixed(1)} cy=${yTemp(last.v).toFixed(1)} r="3.5" fill=${COLORS.white}></circle>`
        : nothing}

      <text x=${PAD_LEFT} y=${HEATING_LABEL_Y} fill=${COLORS.label} font-size=${FONT}>Topení</text>
      <rect x=${PAD_LEFT} y=${HEATING_STRIP_Y} width=${plotWidth(width)} height=${STRIP_HEIGHT} rx="2" fill="rgb(255 255 255 / 5%)"></rect>
      ${strip(model.heating, HEATING_STRIP_Y, (value) => HEATING_COLORS[value] ?? COLORS.off)}
      <text x=${PAD_LEFT} y=${CLIMATE_LABEL_Y} fill=${COLORS.label} font-size=${FONT}>Klimatizace</text>
      <rect x=${PAD_LEFT} y=${CLIMATE_STRIP_Y} width=${plotWidth(width)} height=${STRIP_HEIGHT} rx="2" fill="rgb(255 255 255 / 5%)"></rect>
      ${strip(model.climate, CLIMATE_STRIP_Y, (value) => CLIMATE_COLORS[value as ClimateMode] ?? COLORS.off)}

      ${clockTicks(range).map(
        (tick) => svg`<line x1=${x(tick).toFixed(1)} x2=${x(tick).toFixed(1)} y1=${PLOT_TOP} y2=${CLIMATE_STRIP_Y + STRIP_HEIGHT}
            stroke="rgb(255 255 255 / 6%)" stroke-width="1"></line>
          <text x=${x(tick).toFixed(1)} y=${AXIS_Y} fill=${COLORS.label} font-size=${FONT} text-anchor="middle">${timeFormat.format(tick)}</text>`,
      )}
      ${scrubX === undefined
        ? nothing
        : svg`<line x1=${scrubX.toFixed(1)} x2=${scrubX.toFixed(1)} y1=${PLOT_TOP} y2=${CLIMATE_STRIP_Y + STRIP_HEIGHT}
              stroke=${COLORS.white} stroke-width="1" opacity="0.7"></line>
            ${scrubTemperature === undefined
              ? nothing
              : svg`<circle cx=${scrubX.toFixed(1)} cy=${yTemp(scrubTemperature).toFixed(1)} r="4" fill=${COLORS.white}
                  stroke="#1c1c1e" stroke-width="2"></circle>`}`}
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
      ${nights.length > 0 ? legendItem("rgb(0 0 0 / 55%)", "Noc 22–6 h") : nothing}
    </div>
    <div class="legend">
      ${heatingKinds.map((kind) => legendItem(HEATING_COLORS[kind], `Topení ${HEATING_LABELS[kind]}`))}
      ${climateModes.map((mode) => legendItem(CLIMATE_COLORS[mode], `Klimatizace ${CLIMATE_LABELS[mode]}`))}
    </div>
  `;
}

/** Keyboard step when scrubbing with the arrow keys. */
export const SCRUB_STEP_MS = HOUR_MS / 4;
