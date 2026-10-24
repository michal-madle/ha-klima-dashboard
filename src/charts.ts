import { html, nothing, svg } from "lit";
import type { TemplateResult } from "lit";
import { HOUR_MS, buildSegments, numericSeries } from "./history";
import type { HistoryMap, Segment } from "./history";
import type { RoomConfig, ClimateMode } from "./types";
import {
  COLORS,
  CLIMATE_COLORS,
  CLIMATE_LABELS,
  heatingWaveCount,
  climateModeFromState,
} from "./utils";

const WIDTH = 360;
const LEFT = 60;
const RIGHT = 38;
const PLOT_WIDTH = WIDTH - LEFT - RIGHT;
const GRAPH_TOP = 14;
const LABEL_FILL = COLORS.label;

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
const HEATING_OPACITY = [0, 0.3, 0.6, 0.9];

const timeFormat = new Intl.DateTimeFormat("cs-CZ", { hour: "2-digit", minute: "2-digit" });
const numberFormat = (digits: number): Intl.NumberFormat =>
  new Intl.NumberFormat("cs-CZ", { maximumFractionDigits: digits });

interface Range {
  startMs: number;
  endMs: number;
}

type Point = { t: number; v: number };

function xOf(time: number, range: Range): number {
  return LEFT + ((time - range.startMs) / (range.endMs - range.startMs)) * PLOT_WIDTH;
}

function linePath(points: Point[], range: Range, yOf: (value: number) => number): string {
  return points
    .map((point, index) => `${index === 0 ? "M" : "L"}${xOf(point.t, range).toFixed(1)} ${yOf(point.v).toFixed(1)}`)
    .join(" ");
}

function areaPath(points: Point[], range: Range, yOf: (value: number) => number, bottom: number): string {
  if (points.length === 0) {
    return "";
  }
  const first = xOf(points[0].t, range).toFixed(1);
  const last = xOf(points[points.length - 1].t, range).toFixed(1);
  return `${linePath(points, range, yOf)} L${last} ${bottom} L${first} ${bottom} Z`;
}

function extent(points: Point[], minSpan: number, padding: number): { min: number; max: number } {
  const values = points.map((point) => point.v);
  const low = Math.min(...values);
  const high = Math.max(...values);
  const span = Math.max(high - low, minSpan);
  const center = (high + low) / 2;
  return { min: center - span / 2 - padding, max: center + span / 2 + padding };
}

function timeAxis(range: Range, y: number): TemplateResult {
  const ticks = [4, 3, 2, 1, 0].map((back) => range.endMs - back * 6 * HOUR_MS);
  return svg`${ticks.map((time) => {
    const x = xOf(time, range);
    return svg`<line x1=${x} x2=${x} y1=${y - 4} y2=${y} stroke=${LABEL_FILL} stroke-width="0.8"></line>
      <text x=${x} y=${y + 10} fill=${LABEL_FILL} font-size="9" text-anchor="middle">${timeFormat.format(time)}</text>`;
  })}`;
}

function segmentRects(
  segments: Segment[],
  range: Range,
  y: number,
  height: number,
  paint: (value: string) => { fill: string; opacity: number },
): TemplateResult {
  return svg`${segments.map((segment) => {
    const { fill, opacity } = paint(segment.value);
    if (opacity <= 0) {
      return nothing;
    }
    const x = xOf(segment.start, range);
    const width = Math.max(xOf(segment.end, range) - x, 0.5);
    return svg`<rect x=${x.toFixed(1)} y=${y} width=${width.toFixed(1)} height=${height} fill=${fill} opacity=${opacity}></rect>`;
  })}`;
}

function rowLabel(text: string, y: number): TemplateResult {
  return svg`<text x=${LEFT - 6} y=${y} fill=${LABEL_FILL} font-size="9" text-anchor="end">${text}</text>`;
}

function legendItem(color: string, label: string, dashed = false): TemplateResult {
  return html`<span class="legend-item">
    <span
      class="legend-swatch ${dashed ? "dashed" : ""}"
      style=${dashed ? `border-color: ${color}` : `background: ${color}`}
    ></span
    >${label}
  </span>`;
}

export function hasChartData(history: HistoryMap, entityIds: Array<string | undefined>): boolean {
  return entityIds.some((entityId) => entityId !== undefined && (history[entityId]?.length ?? 0) > 0);
}

/**
 * „Historie místnosti – 24 h“ (CURRENT_SPEC.md, Historie a grafy): temperature curve over a
 * grey area, dashed humidity, and time layers for heating intensity (0–3 waves as fill
 * strength), Topení (Plán / Ručně / Vypnuto) and Klimatizace (mode colours).
 */
export function renderRoomChart(history: HistoryMap, room: RoomConfig, range: Range): TemplateResult {
  const temperature = numericSeries(room.temperature ? history[room.temperature] : undefined, range.startMs, range.endMs);
  const humidity = numericSeries(room.humidity ? history[room.humidity] : undefined, range.startMs, range.endMs);

  const graphBottom = 120;
  const intensityY = 126;
  const heatingY = 142;
  const climateY = 158;
  const layerHeight = 12;
  const axisY = 182;

  const heatingSeries = [
    room.heating?.overlay ? history[room.heating.overlay] : undefined,
    room.heating?.climate ? history[room.heating.climate] : undefined,
  ];
  const heatingSegments = buildSegments(heatingSeries, range.startMs, range.endMs, ([overlay, climate]) => {
    const overlayState = overlay?.toLowerCase();
    if (climate?.toLowerCase() === "off" || overlayState === "off") {
      return "off";
    }
    if (overlayState === "schedule" || overlayState === "manual") {
      return overlayState;
    }
    return undefined;
  });
  const intensitySegments = buildSegments(
    [room.heating?.intensity ? history[room.heating.intensity] : undefined],
    range.startMs,
    range.endMs,
    ([heating]) => {
      const value = heating === undefined ? undefined : Number.parseFloat(heating);
      return value === undefined || !Number.isFinite(value) ? undefined : String(heatingWaveCount(value));
    },
  );
  const climateSegments = buildSegments(
    [room.air_conditioner ? history[room.air_conditioner] : undefined],
    range.startMs,
    range.endMs,
    ([state]) => {
      if (state === undefined) {
        return undefined;
      }
      const mode = climateModeFromState(state);
      return mode === "unknown" ? undefined : mode;
    },
  );

  const tempExtent = temperature.length > 0 ? extent(temperature, 2, 0.3) : undefined;
  const humidityExtent = humidity.length > 0 ? extent(humidity, 10, 1) : undefined;
  const plotHeight = graphBottom - GRAPH_TOP;
  const tempY = (value: number): number =>
    graphBottom - ((value - (tempExtent?.min ?? 0)) / ((tempExtent?.max ?? 1) - (tempExtent?.min ?? 0))) * plotHeight;
  const humidityY = (value: number): number =>
    graphBottom -
    ((value - (humidityExtent?.min ?? 0)) / ((humidityExtent?.max ?? 1) - (humidityExtent?.min ?? 0))) * plotHeight;

  const tempFormat = numberFormat(1);
  const humidityFormat = numberFormat(0);
  const tempLow = temperature.length > 0 ? Math.min(...temperature.map((point) => point.v)) : 0;
  const tempHigh = temperature.length > 0 ? Math.max(...temperature.map((point) => point.v)) : 0;
  const humidityLow = humidity.length > 0 ? Math.min(...humidity.map((point) => point.v)) : 0;
  const humidityHigh = humidity.length > 0 ? Math.max(...humidity.map((point) => point.v)) : 0;

  const climateModes = [...new Set(climateSegments.map((segment) => segment.value as ClimateMode))];

  return html`
    <svg
      class="chart"
      viewBox="0 0 ${WIDTH} 196"
      role="img"
      aria-label="Graf teploty a vlhkosti za posledních 24 hodin s vrstvami vytápění a klimatizace"
    >
      <rect x=${LEFT} y=${GRAPH_TOP} width=${PLOT_WIDTH} height=${plotHeight} rx="6" fill="rgb(255 255 255 / 6%)"></rect>
      ${tempExtent
        ? svg`<path d=${areaPath(temperature, range, tempY, graphBottom)} fill="rgb(255 255 255 / 8%)"></path>
          <path d=${linePath(temperature, range, tempY)} fill="none" stroke=${COLORS.plan} stroke-width="2" stroke-linejoin="round" stroke-linecap="round"></path>
          <text x=${LEFT - 6} y=${GRAPH_TOP + 8} fill=${COLORS.plan} font-size="9" text-anchor="end">${tempFormat.format(tempHigh)} °C</text>
          <text x=${LEFT - 6} y=${graphBottom - 2} fill=${COLORS.plan} font-size="9" text-anchor="end">${tempFormat.format(tempLow)} °C</text>`
        : svg`<text x=${LEFT + PLOT_WIDTH / 2} y=${(GRAPH_TOP + graphBottom) / 2} fill=${LABEL_FILL} font-size="11" text-anchor="middle">––</text>`}
      ${humidityExtent
        ? svg`<path d=${linePath(humidity, range, humidityY)} fill="none" stroke=${COLORS.humidityLine} stroke-width="1.6" stroke-dasharray="4 3" stroke-linejoin="round"></path>
          <text x=${LEFT + PLOT_WIDTH + 6} y=${GRAPH_TOP + 8} fill=${COLORS.humidityLine} font-size="9">${humidityFormat.format(humidityHigh)} %</text>
          <text x=${LEFT + PLOT_WIDTH + 6} y=${graphBottom - 2} fill=${COLORS.humidityLine} font-size="9">${humidityFormat.format(humidityLow)} %</text>`
        : nothing}
      ${rowLabel("Intenzita", intensityY + 9)}
      ${segmentRects(intensitySegments, range, intensityY, layerHeight, (value) => ({
        fill: COLORS.warning,
        opacity: HEATING_OPACITY[Number(value)] ?? 0,
      }))}
      ${rowLabel("Topení", heatingY + 9)}
      ${segmentRects(heatingSegments, range, heatingY, layerHeight, (value) => ({
        fill: HEATING_COLORS[value] ?? COLORS.off,
        opacity: 1,
      }))}
      ${rowLabel("Klimatizace", climateY + 9)}
      ${segmentRects(climateSegments, range, climateY, layerHeight, (value) => ({
        fill: CLIMATE_COLORS[value as ClimateMode] ?? COLORS.off,
        opacity: 1,
      }))}
      ${timeAxis(range, axisY - 8)}
    </svg>
    <div class="legend">
      ${legendItem(COLORS.plan, "Teplota")} ${legendItem(COLORS.humidityLine, "Vlhkost", true)}
      ${legendItem(COLORS.warning, "Intenzita topení: sytost = 0–3 vlny")}
    </div>
    <div class="legend">
      ${["schedule", "manual", "off"]
        .filter((key) => heatingSegments.some((segment) => segment.value === key))
        .map((key) => legendItem(HEATING_COLORS[key], `Topení ${HEATING_LABELS[key]}`))}
      ${climateModes.map((mode) => legendItem(CLIMATE_COLORS[mode], `Klimatizace ${CLIMATE_LABELS[mode]}`))}
    </div>
  `;
}
