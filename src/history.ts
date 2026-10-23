import type { EntityId, HomeAssistant } from "./types";

export interface HistoryPoint {
  time: number;
  state: string;
}

export type HistoryMap = Record<EntityId, HistoryPoint[]>;

type RawTime = number | string | null | undefined;

interface RawHistoryState {
  s?: string;
  state?: string;
  lu?: RawTime;
  lc?: RawTime;
  last_updated?: RawTime;
  last_changed?: RawTime;
}

export const TREND_WINDOW_MS = 120 * 60_000;
export const TREND_SAMPLES = 12;

function toMillis(value: RawTime): number | undefined {
  if (value === undefined || value === null) {
    return undefined;
  }
  if (typeof value === "number") {
    if (!Number.isFinite(value)) {
      return undefined;
    }
    return value < 1e11 ? value * 1000 : value;
  }
  const parsed = Date.parse(value);
  return Number.isNaN(parsed) ? undefined : parsed;
}

export function parseHistory(
  raw: Record<EntityId, RawHistoryState[]> | undefined,
  startMs: number,
): HistoryMap {
  const result: HistoryMap = {};
  for (const [entityId, states] of Object.entries(raw ?? {})) {
    if (!Array.isArray(states)) {
      continue;
    }
    const points: HistoryPoint[] = [];
    states.forEach((item, index) => {
      const state = item.s ?? item.state;
      const time =
        toMillis(item.lu ?? item.last_updated ?? item.lc ?? item.last_changed) ??
        (index === 0 ? startMs : undefined);
      if (state !== undefined && time !== undefined) {
        points.push({ time: Math.max(time, startMs), state });
      }
    });
    points.sort((left, right) => left.time - right.time);
    result[entityId] = points;
  }
  return result;
}

export async function fetchHistory(
  hass: HomeAssistant,
  entityIds: EntityId[],
  startMs: number,
  endMs: number,
): Promise<HistoryMap> {
  if (entityIds.length === 0) {
    return {};
  }
  const raw = await hass.callWS<Record<EntityId, RawHistoryState[]>>({
    type: "history/history_during_period",
    start_time: new Date(startMs).toISOString(),
    end_time: new Date(endMs).toISOString(),
    entity_ids: entityIds,
    include_start_time_state: true,
    significant_changes_only: false,
    minimal_response: true,
    no_attributes: true,
  });
  return parseHistory(raw, startMs);
}

export function stateAt(points: HistoryPoint[] | undefined, time: number): string | undefined {
  let found: string | undefined;
  for (const point of points ?? []) {
    if (point.time > time) {
      break;
    }
    found = point.state;
  }
  return found;
}

function toNumber(state: string | undefined): number | undefined {
  if (state === undefined) {
    return undefined;
  }
  const value = Number.parseFloat(state);
  return Number.isFinite(value) ? value : undefined;
}

/** Last known numeric value at the end of each of `count` equal buckets. */
export function sampleNumeric(
  points: HistoryPoint[] | undefined,
  startMs: number,
  endMs: number,
  count: number,
): Array<number | undefined> {
  const step = (endMs - startMs) / count;
  const numeric = (points ?? []).filter((point) => toNumber(point.state) !== undefined);
  return Array.from({ length: count }, (_, index) =>
    toNumber(stateAt(numeric, startMs + (index + 1) * step)),
  );
}

/**
 * Normalizes samples to 0..1 using the local minimum/maximum of the shown
 * period. A period flatter than `minSpan` is drawn around the middle so that
 * sensor noise is not displayed as a trend.
 */
export function normalizeTrend(
  values: Array<number | undefined>,
  minSpan: number,
): Array<number | undefined> {
  const defined = values.filter((value): value is number => value !== undefined);
  if (defined.length < 2) {
    return values.map(() => undefined);
  }
  const minimum = Math.min(...defined);
  const maximum = Math.max(...defined);
  const range = maximum - minimum;
  if (range >= minSpan) {
    return values.map((value) => (value === undefined ? undefined : (value - minimum) / range));
  }
  const center = (maximum + minimum) / 2;
  return values.map((value) =>
    value === undefined ? undefined : 0.5 + (value - center) / minSpan,
  );
}
