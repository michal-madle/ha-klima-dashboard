import { html, nothing, svg } from "lit";
import type { TemplateResult } from "lit";
import type { I18n } from "./i18n";
import type { EntityId, HomeAssistant } from "./types";
import { COLORS } from "./utils";

/*
 * The weather forecast of the popup "Venku" (CURRENT_SPEC.md, Dashboard Klima, Horní řádek; uživatel 14. 11. 2026:
 * „Q231 1,2,3,4“, „Q240 A“): the day (minimum, maximum, rain) and the next 24 hours as a chart. The forecast comes from
 * the action `weather.get_forecasts` of Home Assistant; an entity without it gives nothing and nothing is shown.
 */

export interface ForecastPoint {
  /** Start of the hour or of the day (ms). */
  time: number;
  temperature?: number;
  /** Daily forecast: the minimum of the day. */
  low?: number;
  /** Precipitation in mm. */
  rain?: number;
  /** Probability of precipitation in %. */
  probability?: number;
}

export interface Forecast {
  daily: ForecastPoint[];
  hourly: ForecastPoint[];
}

const number = (value: unknown): number | undefined => (typeof value === "number" && Number.isFinite(value) ? value : undefined);

function points(raw: unknown): ForecastPoint[] {
  if (!Array.isArray(raw)) return [];
  return raw.flatMap((item: Record<string, unknown>) => {
    const time = Date.parse(String(item?.datetime ?? ""));
    if (!Number.isFinite(time)) return [];
    return [{ time, temperature: number(item.temperature), low: number(item.templow), rain: number(item.precipitation), probability: number(item.precipitation_probability) }];
  });
}

/** Both forecasts of a weather entity; a kind the entity does not offer is an empty list. */
export async function fetchForecast(hass: HomeAssistant, entityId: EntityId): Promise<Forecast> {
  const one = async (type: "daily" | "hourly"): Promise<ForecastPoint[]> => {
    try {
      const result = await hass.callWS<{ response?: Record<string, { forecast?: unknown }> }>({
        type: "call_service",
        domain: "weather",
        service: "get_forecasts",
        service_data: { type },
        target: { entity_id: entityId },
        return_response: true,
      });
      return points(result?.response?.[entityId]?.forecast);
    } catch {
      return [];
    }
  };
  const [daily, hourly] = await Promise.all([one("daily"), one("hourly")]);
  return { daily, hourly };
}

/** Today in the daily forecast: the entry of this calendar day, else the first one. */
export function today(forecast: Forecast | undefined, now: number): ForecastPoint | undefined {
  const day = new Date(now).toDateString();
  return forecast?.daily.find((point) => new Date(point.time).toDateString() === day) ?? forecast?.daily[0];
}

/** The next 24 hours of the hourly forecast, from the current hour. */
export function nextHours(forecast: Forecast | undefined, now: number): ForecastPoint[] {
  return (forecast?.hourly ?? []).filter((point) => point.time > now - 3_600_000 && point.time <= now + 24 * 3_600_000 && point.temperature !== undefined);
}

const PAD_LEFT = 4;
const PAD_RIGHT = 44;
const TOP = 6;
const HEIGHT = 120;
const FONT = 12;
const fill = (color: string) => `fill: ${color}`;
const stroke = (color: string) => `stroke: ${color}`;

/**
 * The next 24 hours: the temperature as a line with its scale on the right, the precipitation as bars from the bottom
 * (their own scale, the highest hour said in words above the chart), vertical lines every three hours with the hour.
 */
export function renderForecastChart(hours: ForecastPoint[], width: number, i18n: I18n): TemplateResult | typeof nothing {
  if (hours.length < 2) return nothing;
  const { t } = i18n;
  const start = hours[0].time;
  const end = hours[hours.length - 1].time;
  const plot = width - PAD_LEFT - PAD_RIGHT;
  const x = (time: number): number => PAD_LEFT + ((time - start) / (end - start)) * plot;
  const temperatures = hours.map((point) => point.temperature!);
  const span = Math.max(...temperatures) - Math.min(...temperatures);
  const step = span <= 4 ? 1 : span <= 10 ? 2 : 5;
  const low = Math.floor(Math.min(...temperatures) / step) * step;
  const high = Math.max(Math.ceil(Math.max(...temperatures) / step) * step, low + step);
  const y = (value: number): number => TOP + HEIGHT - ((value - low) / (high - low)) * HEIGHT;
  const line = hours.map((point, index) => `${index === 0 ? "M" : "L"}${x(point.time).toFixed(1)} ${y(point.temperature!).toFixed(1)}`).join(" ");
  const grid: number[] = [];
  for (let value = low; value <= high + 1e-9; value += step) grid.push(value);
  // A line right at the edge of the plot has no label (DASHBOARD_UX_SYSTEM.md, Grafy): it would be cut.
  const ticks = hours.filter((point) => new Date(point.time).getHours() % 3 === 0 && x(point.time) > PAD_LEFT + 8 && x(point.time) < PAD_LEFT + plot - 8);
  const rains = hours.map((point) => point.rain ?? 0);
  const wettest = Math.max(...rains);
  const barWidth = Math.max(2, plot / (hours.length - 1) - 2);
  const bar = (value: number): number => (value / Math.max(wettest, 1)) * HEIGHT * 0.4;
  const bottom = TOP + HEIGHT;
  return html`<div class="forecast">
    <div class="forecast-head">
      <span>${t.outside.next24}</span>
      <span class="forecast-rain">${wettest > 0 ? t.outside.rainMost(`${i18n.one(wettest)} mm/h`) : t.outside.noRain}</span>
    </div>
    <svg class="forecast-chart" viewBox="0 0 ${width} ${bottom + 20}" width=${width} height=${bottom + 20} role="img" aria-label=${t.outside.next24}>
      <rect x=${PAD_LEFT} y=${TOP} width=${plot} height=${HEIGHT} rx="8" style=${fill("var(--kd-fill)")}></rect>
      ${grid.map(
        (value) => svg`<line x1=${PAD_LEFT} x2=${PAD_LEFT + plot} y1=${y(value).toFixed(1)} y2=${y(value).toFixed(1)} style=${stroke("var(--kd-grid)")} stroke-width="1"></line>
          <text x=${PAD_LEFT + plot + 6} y=${(y(value) + 4).toFixed(1)} style=${fill(COLORS.label)} font-size=${FONT}>${i18n.tick(value)}°</text>`,
      )}
      ${ticks.map(
        (point) => svg`<line x1=${x(point.time).toFixed(1)} x2=${x(point.time).toFixed(1)} y1=${TOP} y2=${bottom} style=${stroke("var(--kd-grid-soft)")} stroke-width="1"></line>
          <text class="tick" x=${x(point.time).toFixed(1)} y=${bottom + 15} text-anchor="middle" style=${fill(COLORS.label)} font-size=${FONT}>${i18n.hour(point.time).replace(/^(\d{1,2}):00$/, "$1")}</text>`,
      )}
      ${hours.map((point) =>
        (point.rain ?? 0) > 0
          ? svg`<rect class="forecast-bar" x=${(x(point.time) - barWidth / 2).toFixed(1)} y=${(bottom - bar(point.rain!)).toFixed(1)} width=${barWidth.toFixed(1)}
              height=${bar(point.rain!).toFixed(1)} rx="1.5" style=${`${fill(COLORS.sky)}; opacity: 0.55`}></rect>`
          : nothing,
      )}
      <path class="forecast-line" d=${line} fill="none" style=${stroke(COLORS.white)} stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"></path>
    </svg>
  </div>`;
}
