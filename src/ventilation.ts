import { stateAt } from "./history";
import type { HistoryPoint } from "./history";

/*
 * Ventilation mode: what a run of the mode did to the CO₂ of the rooms (CURRENT_SPEC.md, Větrací
 * režim). Everything is computed from the state history of Home Assistant, nothing is stored.
 */

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
  /** 0 to 1: how far the CO₂ went from its value at the start down to the "fully aired" value. */
  done: number;
  /** The CO₂ is at or below the target: the windows can be closed (the ring is green). */
  closable: boolean;
}

/**
 * Progress of a room: 1 (100 %) at or below `full` (420 ppm by default, about the outdoor air), or when the room was already at
 * or below `full` at the start and is at or below `target`; between the start and `full` it is the share of the fall, at most
 * 99 % until `full` is reached. `closable` is at or below `target` (500 ppm).
 */
export function progress(start: number, now: number, target: number, full: number): Progress {
  const closable = now <= target;
  if (now <= full || (start <= full && closable)) {
    return { done: 1, closable };
  }
  if (start <= full) {
    return { done: 0, closable };
  }
  return { done: Math.min(0.99, Math.max(0, (start - now) / (start - full))), closable };
}
