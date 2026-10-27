/**
 * Topení popup: how long a manual choice lasts, and the Home Assistant calls it turns into
 * (CURRENT_SPEC.md, Ovládání Topení). Pure helpers, no DOM.
 */
import type { EntityId, HassEntity } from "./types";

/** Target (°C) Tado reports while the heating is off; Vypnuto for a limited time is a timer at this value. */
export const HEATING_OFF_TARGET = 5;
/** Boost is a fixed target (Tado app: 25 °C). */
export const BOOST_TEMPERATURE = 25;
/** Minutes the slider offers (Tado CE accepts 15–720 min), then "until the next schedule change" and "until you resume". */
export const DURATION_MINUTES = [15, 30, 45, 60, 90, 120, 180, 240, 360, 480] as const;
export const NEXT_PLAN = DURATION_MINUTES.length;
export const UNTIL_RESUMED = DURATION_MINUTES.length + 1;

/** What the person chooses in the popup (applied when it closes); Plán has nothing to set. */
export type HeatingControlMode = "plan" | "manual" | "boost" | "off";

export interface HeatingControl {
  room: string;
  entityId: EntityId;
  mode: HeatingControlMode;
  /** °C; fixed for Boost and Vypnuto. */
  temperature: number;
  /** Index into `DURATION_MINUTES`, or `NEXT_PLAN` / `UNTIL_RESUMED`. */
  duration: number;
  /** After a timed Ručně / Boost: back to Plán (what Tado does itself), or Vypnuto. Undefined = Plán. */
  after?: AfterTimer;
}

/** What follows a timed Ručně / Boost (CURRENT_SPEC.md, Časovač). */
export type AfterTimer = "plan" | "off";

/** Slider positions run from the plan (left) over the durations to "until resumed" (right, ∞). */
export function durationToSlot(duration: number): number {
  return duration === NEXT_PLAN ? 0 : duration === UNTIL_RESUMED ? DURATION_MINUTES.length + 1 : duration + 1;
}

export function slotToDuration(slot: number): number {
  const last = DURATION_MINUTES.length + 1;
  const clamped = Math.min(last, Math.max(0, Math.round(slot)));
  return clamped === 0 ? NEXT_PLAN : clamped === last ? UNTIL_RESUMED : clamped - 1;
}

/** Air conditioner: the same durations, no plan; the last position is "no limit" (`UNTIL_RESUMED`). */
export function durationToAcSlot(duration: number): number {
  return duration === UNTIL_RESUMED || duration === NEXT_PLAN ? DURATION_MINUTES.length : duration;
}

export function acSlotToDuration(slot: number): number {
  const clamped = Math.min(DURATION_MINUTES.length, Math.max(0, Math.round(slot)));
  return clamped === DURATION_MINUTES.length ? UNTIL_RESUMED : clamped;
}

/**
 * A script Home Assistant runs by itself after `minutes`: it turns the climate entity off, but only
 * while it is still in `onlyWhile` (so a change made meanwhile is not overridden). Sent with the
 * `execute_script` WebSocket command, so it needs no script in the Home Assistant configuration.
 */
export function delayedOffScript(
  entityId: EntityId,
  minutes: number,
  onlyWhile: string | undefined,
  graceSeconds = 0,
): { sequence: Array<Record<string, unknown>> } {
  const seconds = Math.round(minutes * 60) + graceSeconds;
  const sequence: Array<Record<string, unknown>> = [
    { delay: { hours: Math.floor(seconds / 3600), minutes: Math.floor((seconds % 3600) / 60), seconds: seconds % 60 } },
  ];
  if (onlyWhile !== undefined) {
    sequence.push({ condition: "state", entity_id: entityId, state: onlyWhile });
  }
  sequence.push({ action: "climate.set_hvac_mode", target: { entity_id: entityId }, data: { hvac_mode: "off" } });
  return { sequence };
}

export interface ServiceCall {
  domain: string;
  service: string;
  data: Record<string, unknown>;
}

/** Defaults by the person's wish (25. 10.): Boost 30 min, Ručně until the next schedule change, Vypnuto until resumed. */
export function defaultDuration(mode: HeatingControlMode): number {
  return mode === "boost" ? 1 : mode === "off" ? UNTIL_RESUMED : NEXT_PLAN;
}

/** The popup control for what the climate entity reports now; undefined when it reports nothing usable. */
export function currentHeatingControl(room: string, entityId: EntityId, entity: HassEntity | undefined): HeatingControl | undefined {
  const active = activeHeatingId(entity);
  if (active === undefined) {
    return undefined;
  }
  const mode: HeatingControlMode = active === "heat" ? "manual" : active === "auto" ? "plan" : active;
  const range = manualRange(temperatureRange(entity));
  const target = numberOf(entity?.attributes.temperature);
  const usable = mode === "manual" && target !== undefined && target >= range.min && target <= range.max;
  return {
    room,
    entityId,
    mode,
    temperature: snapTemperature(usable ? target : 21, range),
    duration: defaultDuration(mode),
  };
}

export function numberOf(value: unknown): number | undefined {
  const number = typeof value === "string" ? Number.parseFloat(value) : value;
  return typeof number === "number" && Number.isFinite(number) ? number : undefined;
}

export interface TemperatureRange {
  min: number;
  max: number;
  step: number;
}

/** Range of the climate entity (Tado CE: 5–25 °C by 0,5), otherwise those defaults. */
export function temperatureRange(entity: HassEntity | undefined): TemperatureRange {
  const step = numberOf(entity?.attributes.target_temp_step);
  const min = numberOf(entity?.attributes.min_temp) ?? HEATING_OFF_TARGET;
  const max = numberOf(entity?.attributes.max_temp) ?? 25;
  const safeStep = step !== undefined && step > 0 ? step : 0.5;
  return max > min ? { min, max, step: safeStep } : { min: HEATING_OFF_TARGET, max: 25, step: safeStep };
}

/** The slowest "Ručně" value: the entity's minimum is Vypnuto (frost protection), so Ručně starts one step above. */
export function manualRange(range: TemperatureRange): TemperatureRange {
  return { ...range, min: Math.max(range.min, HEATING_OFF_TARGET) + range.step };
}

export function snapTemperature(value: number, range: TemperatureRange): number {
  const snapped = Math.round((value - range.min) / range.step) * range.step + range.min;
  return Math.min(range.max, Math.max(range.min, Math.round(snapped * 100) / 100));
}

/** Which popup option is active, from the climate entity's state and target. */
export function activeHeatingId(entity: HassEntity | undefined): "off" | "auto" | "heat" | "boost" | undefined {
  const state = entity?.state.toLowerCase();
  if (state === "off") {
    return "off";
  }
  if (state === "auto") {
    return "auto";
  }
  if (state === "heat") {
    const target = numberOf(entity?.attributes.temperature);
    if (target !== undefined && target <= HEATING_OFF_TARGET) {
      return "off";
    }
    return target === BOOST_TEMPERATURE ? "boost" : "heat";
  }
  return undefined;
}

export type HeatingKind = "schedule" | "manual" | "off";

/**
 * Plán / Ručně / Vypnuto of a room. The climate entity decides (`auto` = schedule, `heat` = an
 * override, `off`): Tado CE updates it at once after a command, while the overlay sensor changes
 * only with the next poll and stays stale for a while (Ručně would linger after Plán). The overlay
 * sensor is used when the climate entity says nothing usable. An override at the 5 °C target is Vypnuto.
 */
export function heatingKindOf(climate: string | undefined, overlay: string | undefined, target?: number): HeatingKind | undefined {
  const c = climate?.toLowerCase();
  const o = overlay?.toLowerCase();
  if (c === "off") {
    return "off";
  }
  const fromClimate = c === "auto" ? "schedule" : c === "heat" ? "manual" : undefined;
  const fromOverlay = o === "off" ? "off" : o === "schedule" || o === "manual" ? o : undefined;
  const kind: HeatingKind | undefined = fromClimate ?? fromOverlay;
  return kind === "manual" && target !== undefined && target <= HEATING_OFF_TARGET ? "off" : kind;
}

/** "00:30:00" for the Tado CE `time_period` field. */
export function timePeriod(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const rest = minutes % 60;
  return `${String(hours).padStart(2, "0")}:${String(rest).padStart(2, "0")}:00`;
}

/** Minutes of a duration index, or undefined for "until the next schedule change" / "until resumed". */
export function durationMinutes(index: number): number | undefined {
  return index >= 0 && index < DURATION_MINUTES.length ? DURATION_MINUTES[index] : undefined;
}

/**
 * The call for a choice. Plán resumes the schedule. Ručně, Boost and a timed Vypnuto use the Tado CE
 * action `tado_ce.set_climate_timer` (target, and either `time_period` or `overlay`: "next_time_block"
 * until the next schedule change, "manual" until changed); Vypnuto until resumed is a plain `off`.
 * Without that action Ručně is a plain `climate.set_temperature` and Boost cannot be sent.
 */
export function heatingCommand(
  entityId: EntityId,
  choice: HeatingControl,
  timerAvailable: boolean,
): ServiceCall | undefined {
  if (choice.mode === "plan") {
    return { domain: "climate", service: "set_hvac_mode", data: { entity_id: entityId, hvac_mode: "auto" } };
  }
  const minutes = durationMinutes(choice.duration);
  if (choice.mode === "off" && (choice.duration === UNTIL_RESUMED || !timerAvailable)) {
    return { domain: "climate", service: "set_hvac_mode", data: { entity_id: entityId, hvac_mode: "off" } };
  }
  if (!timerAvailable) {
    return choice.mode === "manual"
      ? { domain: "climate", service: "set_temperature", data: { entity_id: entityId, temperature: choice.temperature } }
      : undefined;
  }
  const temperature = choice.mode === "boost" ? BOOST_TEMPERATURE : choice.mode === "off" ? HEATING_OFF_TARGET : choice.temperature;
  const data: Record<string, unknown> = { entity_id: entityId, temperature };
  if (minutes !== undefined) {
    data.time_period = timePeriod(minutes);
  } else {
    data.overlay = choice.duration === NEXT_PLAN ? "next_time_block" : "manual";
  }
  return { domain: "tado_ce", service: "set_climate_timer", data };
}

/** "45 min", "1 h", "1 h 30 min"; the unit marks are the same in every language. */
export function minutesLabel(minutes: number): string {
  const total = Math.max(1, Math.round(minutes));
  const hours = Math.floor(total / 60);
  const rest = total % 60;
  if (hours === 0) {
    return `${rest} min`;
  }
  return rest === 0 ? `${hours} h` : `${hours} h ${rest} min`;
}
