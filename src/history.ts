import type { EntityId, HomeAssistant, TrendAxis } from "./types";

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
 * Axis shared by all micro trends of one quantity in the whole house (CURRENT_SPEC.md,
 * Historie a grafy): the minimum and maximum of every sample of every room, rounded down
 * and up to `step`. When all samples are the same multiple of `step`, the axis grows by one
 * step on each side so the flat line sits in the middle.
 */
export function sharedAxis(
  series: Array<Array<number | undefined> | undefined>,
  step: number,
): TrendAxis | undefined {
  let minimum = Number.POSITIVE_INFINITY;
  let maximum = Number.NEGATIVE_INFINITY;
  for (const values of series) {
    for (const value of values ?? []) {
      if (value !== undefined && Number.isFinite(value)) {
        minimum = Math.min(minimum, value);
        maximum = Math.max(maximum, value);
      }
    }
  }
  if (!Number.isFinite(minimum) || !Number.isFinite(maximum) || step <= 0) {
    return undefined;
  }
  let low = Math.floor(minimum / step) * step;
  let high = Math.ceil(maximum / step) * step;
  if (high - low < step) {
    low -= step;
    high += step;
  }
  return { min: low, max: high };
}

/** Maps samples onto a shared axis as 0 (bottom) .. 1 (top). */
export function normalizeToAxis(
  values: Array<number | undefined>,
  axis: TrendAxis,
): Array<number | undefined> {
  const range = axis.max - axis.min;
  return values.map((value) =>
    value === undefined || range <= 0
      ? undefined
      : Math.min(1, Math.max(0, (value - axis.min) / range)),
  );
}
