import { stateAt } from "./history";
import type { HistoryPoint } from "./history";

/*
 * Ventilation mode: what a run of the mode did to the CO₂ of the rooms (CURRENT_SPEC.md, Větrací
 * režim). Everything is computed from the state history of Home Assistant, nothing is stored.
 */

/** CO₂ outdoors in ppm. It is not measured: an assumption of the estimate only. */
export const OUTDOOR_CO2 = 420;
/** The estimate needs at least this much time and fall of CO₂ since the start. */
const ESTIMATE_MIN_MINUTES = 2;
const ESTIMATE_MIN_DROP = 30;
/** A longer estimate means nothing ("––"). */
const ESTIMATE_MAX_MINUTES = 120;

export interface VentilationSession {
  start: number;
  /** Undefined while the mode is still on. */
  end?: number;
}

/**
 * The last run of the mode in its history: from the last change to "on" until the next change to
 * "off". "unavailable" and "unknown" neither start nor end a run (an outage is not a change).
 */
export function lastSession(points: HistoryPoint[] | undefined): VentilationSession | undefined {
  let current: VentilationSession | undefined;
  let last: VentilationSession | undefined;
  for (const point of points ?? []) {
    const state = point.state.toLowerCase();
    if (state === "on" && !current) {
      current = { start: point.time };
      last = current;
    } else if (state === "off" && current) {
      current.end = point.time;
      current = undefined;
    }
  }
  return last;
}

/** The window was open at some moment of [from, to] (history of one window sensor). */
export function openDuring(points: HistoryPoint[] | undefined, from: number, to: number): boolean {
  if (stateAt(points, from)?.toLowerCase() === "on") {
    return true;
  }
  return (points ?? []).some((point) => point.time > from && point.time <= to && point.state.toLowerCase() === "on");
}

/** A CO₂ value of a history or a live state; anything that is not a number is unknown. */
export function co2Value(state: string | undefined): number | undefined {
  if (state === undefined) {
    return undefined;
  }
  const value = Number.parseFloat(state);
  return Number.isFinite(value) ? value : undefined;
}

export interface Progress {
  /** 0 to 1: how far the CO₂ went from its value at the start towards the target. */
  done: number;
  /** The CO₂ is at or below the target: the window can be closed. */
  closable: boolean;
}

export function progress(start: number, now: number, target: number): Progress {
  if (now <= target) {
    return { done: 1, closable: true };
  }
  if (start <= target) {
    return { done: 0, closable: false };
  }
  return { done: Math.min(1, Math.max(0, (start - now) / (start - target))), closable: false };
}

/**
 * Minutes until the CO₂ reaches the target, in whole minutes. The CO₂ falls towards the outdoor
 * value exponentially: k = ln((C0 − out) / (C − out)) / t, remaining = ln((C − out) / (target − out)) / k.
 * Undefined when it cannot be said (too little time or fall since the start, the CO₂ does not fall,
 * the target is not above the outdoor value, or the answer is longer than two hours).
 */
export function estimateMinutes(
  start: number,
  startedAt: number,
  now: number,
  reportedAt: number,
  target: number,
): number | undefined {
  if (target <= OUTDOOR_CO2 || now <= target || now <= OUTDOOR_CO2 || start - now < ESTIMATE_MIN_DROP) {
    return undefined;
  }
  const elapsed = (reportedAt - startedAt) / 60_000;
  if (!(elapsed >= ESTIMATE_MIN_MINUTES)) {
    return undefined;
  }
  const rate = Math.log((start - OUTDOOR_CO2) / (now - OUTDOOR_CO2)) / elapsed;
  const remaining = Math.log((now - OUTDOOR_CO2) / (target - OUTDOOR_CO2)) / rate;
  if (!Number.isFinite(remaining) || remaining <= 0 || remaining > ESTIMATE_MAX_MINUTES) {
    return undefined;
  }
  return Math.max(1, Math.ceil(remaining));
}
