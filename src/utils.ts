import { isNoValue } from "ha-dashboard-kit/entities";
import type { Texts } from "./i18n";
import type {
  BlindIcon,
  BlindPreset,
  ClimateMode,
  DashboardThresholds,
  EntityId,
  Reading,
  Room,
  RoomStatus,
  Settings,
  TrendKind,
  TrendSettings,
} from "./types";

/**
 * Position and tilt each preset icon stands for: the default presets Den (raised), Stín
 * (lowered, slats open) and Tma (closed) (CURRENT_SPEC.md, Žaluzie).
 */
export const ICON_POSITIONS: Record<BlindIcon, { position: number; tilt: number }> = {
  open: { position: 100, tilt: 100 },
  shade: { position: 0, tilt: 100 },
  dark: { position: 0, tilt: 0 },
};

/** True when the blind's position and tilt (both known) are those of the preset, within ± tolerance %. */
export function blindMatchesPreset(
  position: number | undefined,
  tilt: number | undefined,
  preset: BlindPreset,
  tolerance: number,
): boolean {
  return (
    position !== undefined &&
    tilt !== undefined &&
    Math.abs(position - preset.position) <= tolerance &&
    Math.abs(tilt - preset.tilt) <= tolerance
  );
}

/**
 * Rounding step of the house-wide trend axis per quantity (°C, ppm, µg/m³); it is also the
 * smallest axis range, so sensor noise is not drawn as a trend.
 */
export function trendStep(trends: TrendSettings, kind: TrendKind): number {
  return kind === "temperature" ? trends.temperature_step : kind === "co2" ? trends.co2_step : trends.pm25_step;
}

/**
 * Colours are CSS custom properties of the card (CURRENT_SPEC.md, Barvy): the dark set is the
 * default on :host, the light set overrides it (styles.ts). Use them only where CSS is parsed
 * (style attributes, CSS), never in SVG presentation attributes.
 */
export const COLORS = {
  /** Main text and the temperature curve. */
  white: "var(--kd-text)",
  /** Topení "Vypnuto" strip in the history chart. */
  closed: "var(--kd-closed)",
  /** Lowered blind (champagne) and the window behind it (sky). */
  blind: "var(--kd-blind)",
  sky: "var(--kd-sky)",
  /** CO₂ icon and its micro trend (muted sage green) and PM2.5 icon and its micro trend (muted lavender). */
  co2: "var(--kd-co2)",
  pm25: "var(--kd-pm25)",
  /** Temperature micro trend. */
  peach: "var(--kd-peach)",
  /** Humidity value: deliberately uncoloured. */
  neutral: "var(--kd-neutral)",
  /** Dashed humidity curve in the room history. */
  humidityLine: "var(--kd-sky)",
  label: "var(--kd-label)",
  off: "var(--kd-off)",
  plan: "var(--kd-plan)",
  warning: "var(--kd-warning)",
  alert: "var(--kd-alert)",
  /** The critical red on the lighter ground of a popup option (contrast 4.5 : 1 for 17 px text). */
  alertOnPopup: "var(--kd-alert-popup)",
  cold: "var(--kd-sky)",
  cool: "var(--kd-sky)",
  dry: "var(--kd-dry)",
  heat: "var(--kd-warning)",
  auto: "var(--kd-auto)",
};

export const CLIMATE_COLORS: Record<ClimateMode, string> = {
  off: COLORS.off,
  cool: COLORS.cool,
  wind_free: COLORS.cool,
  dry: COLORS.dry,
  fan: COLORS.plan,
  heat: COLORS.heat,
  auto: COLORS.auto,
  unknown: COLORS.off,
};

const PRESET_NAMES: Record<string, string> = {
  sleep: "Sleep",
  boost: "Boost",
  wind_free: "WindFree",
  wind_free_sleep: "WindFree Sleep",
};

export function formatPreset(preset: string): string {
  const known = PRESET_NAMES[preset];
  if (known) {
    return known;
  }
  const text = preset.replace(/_/g, " ");
  return text.charAt(0).toUpperCase() + text.slice(1);
}

export function climateModeFromState(state: string | undefined): ClimateMode {
  switch (state?.toLowerCase()) {
    case "off":
      return "off";
    case "cool":
      return "cool";
    case "dry":
      return "dry";
    case "fan_only":
      return "fan";
    case "heat":
      return "heat";
    case "auto":
    case "heat_cool":
      return "auto";
    default:
      return "unknown";
  }
}

export interface RoomReadings {
  temperature: Reading;
  humidity: Reading;
  co2: Reading;
  pm25: Reading;
}

/**
 * Room status (CURRENT_SPEC.md, Stavový systém) with its text in the card language. A stale
 * reading counts as missing, so old data never colour the room and never give "Příjemné".
 */
export function getRoomStatus(
  readings: RoomReadings,
  isSummer: boolean,
  modeKnown: boolean,
  room: Pick<Room, "thresholds" | "hasCo2" | "hasPm25">,
  t: Texts,
): RoomStatus {
  const { thresholds } = room;
  // "Bez dat" names the first missing or stale required value, so the user knows what to fix
  // (CURRENT_SPEC.md, Chybějící data). CO₂ and PM2.5 are required only in a room that has them.
  const required: Array<[string, Reading | undefined]> = [
    [t.required.temperature, readings.temperature],
    [t.required.humidity, readings.humidity],
    ...(room.hasCo2 ? [[t.required.co2, readings.co2] as [string, Reading]] : []),
    ...(room.hasPm25 ? [[t.required.pm25, readings.pm25] as [string, Reading]] : []),
    [t.required.houseMode, modeKnown ? { value: 1 } : undefined],
  ];
  for (const [name, reading] of required) {
    if (reading?.value === undefined) {
      return { id: "noData", label: t.noData(name), color: COLORS.label, kind: "unknown" };
    }
    if (reading.stale) {
      const age = reading.ageMinutes === undefined ? undefined : formatAge(reading.ageMinutes);
      return { id: "noData", label: t.noData(name, age), color: COLORS.label, kind: "unknown" };
    }
  }
  const temperature = readings.temperature.value as number;
  const humidity = readings.humidity.value as number;
  const co2 = room.hasCo2 ? (readings.co2.value as number) : Number.NEGATIVE_INFINITY;
  const pm25 = room.hasPm25 ? (readings.pm25.value as number) : Number.NEGATIVE_INFINITY;
  if (pm25 >= thresholds.pm25_critical) {
    return { id: "polluted", label: t.status.polluted, color: COLORS.alert, kind: "critical", cause: "pm25" };
  }
  if (co2 >= thresholds.co2_critical) {
    return { id: "veryStuffy", label: t.status.veryStuffy, color: COLORS.alert, kind: "critical", cause: "co2" };
  }
  if (co2 >= thresholds.co2_warning) {
    return { id: "stuffy", label: t.status.stuffy, color: COLORS.warning, kind: "warning", cause: "co2" };
  }
  if (humidity > thresholds.humidity_max) {
    return { id: "humid", label: t.status.humid, color: COLORS.warning, kind: "warning", cause: "humidity" };
  }
  if (humidity < thresholds.humidity_min) {
    return { id: "dry", label: t.status.dry, color: COLORS.warning, kind: "warning", cause: "humidity" };
  }

  const minimum = isSummer ? thresholds.summer_min : thresholds.winter_min;
  const maximum = isSummer ? thresholds.summer_max : thresholds.winter_max;
  if (temperature > maximum) {
    return { id: "warm", label: t.status.warm, color: COLORS.warning, kind: "warning", cause: "temperature" };
  }
  if (temperature < minimum) {
    return { id: "cold", label: t.status.cold, color: COLORS.cold, kind: "warning", cause: "temperature" };
  }
  return { id: "comfortable", label: t.status.comfortable, color: COLORS.label, kind: "normal" };
}

export { stringList } from "ha-dashboard-kit/entities";

/** No value: missing, unknown, unavailable, empty or "none". */
export function isUnavailable(state: string): boolean {
  return isNoValue(state) || state === "none";
}

export function numberAttribute(value: unknown): number | undefined {
  if (value === undefined || value === null || value === "") {
    return undefined;
  }
  const number = typeof value === "number" ? value : Number.parseFloat(String(value));
  return Number.isFinite(number) && number >= 0 && number <= 100 ? number : undefined;
}

/**
 * Heating intensity (%) as 0–3 waves (CURRENT_SPEC.md, Topení): 0 % none, above 0 one wave,
 * from `heating_waves_2` two, from `heating_waves_3` three (defaults 35 and 68).
 */
export function heatingWaveCount(
  value: number | undefined,
  bands: Pick<DashboardThresholds, "heating_waves_2" | "heating_waves_3">,
): number {
  if (value === undefined || value <= 0) {
    return 0;
  }
  if (value >= bands.heating_waves_3) {
    return 3;
  }
  return value >= bands.heating_waves_2 ? 2 : 1;
}

export function configuredEntityIds(settings: Settings): Set<EntityId> {
  const entityIds = new Set<EntityId>();
  const add = (entityId: EntityId | undefined): void => {
    if (entityId) {
      entityIds.add(entityId);
    }
  };

  add(settings.houseModeEntity);
  add(settings.outside?.temperature);
  add(settings.outside?.minimum);
  add(settings.outside?.maximum);
  add(settings.outside?.rain_probability);
  add(settings.outside?.pm25);

  for (const room of settings.rooms) {
    add(room.temperature);
    add(room.humidity);
    add(room.carbon_dioxide);
    add(room.pm25);
    room.windows.forEach((window) => add(window.entity));
    add(room.cover);
    add(room.heating?.climate);
    add(room.heating?.overlay);
    add(room.heating?.target);
    add(room.heating?.intensity);
    add(room.air_conditioner);
  }
  return entityIds;
}

/** Entities whose recent history is drawn as a micro trend. */
export function trendEntityIds(settings: Settings): EntityId[] {
  const entityIds = new Set<EntityId>();
  for (const room of settings.rooms) {
    for (const entityId of [room.temperature, room.carbon_dioxide, room.pm25]) {
      if (entityId) {
        entityIds.add(entityId);
      }
    }
  }
  return [...entityIds];
}

export function sameAttributes(
  previous: Record<string, unknown> | undefined,
  current: Record<string, unknown> | undefined,
): boolean {
  if (previous === current) {
    return true;
  }
  if (!previous || !current) {
    return false;
  }
  const previousKeys = Object.keys(previous);
  const currentKeys = Object.keys(current);
  return (
    previousKeys.length === currentKeys.length &&
    previousKeys.every((key) => Object.hasOwn(current, key) && previous[key] === current[key])
  );
}

/** "45 min", "2 h", "3 d" (unit symbols, the same in every language). */
export function formatAge(minutes: number): string {
  if (minutes < 60) {
    return `${Math.max(1, Math.round(minutes))} min`;
  }
  if (minutes < 48 * 60) {
    return `${Math.floor(minutes / 60)} h`;
  }
  return `${Math.floor(minutes / (24 * 60))} d`;
}

/**
 * Spoken direction of a micro trend for screen readers: the change between the first and the
 * last sample against half of the axis step (by default 0,5 °C, 50 ppm, 2,5 µg/m³ over 2 h).
 */
export function trendDirection(
  samples: Array<number | undefined> | undefined,
  step: number,
): "rising" | "falling" | "stable" | undefined {
  const defined = (samples ?? []).filter((value): value is number => value !== undefined);
  if (defined.length < 2) {
    return undefined;
  }
  const change = defined[defined.length - 1] - defined[0];
  if (change >= step / 2) {
    return "rising";
  }
  if (change <= -step / 2) {
    return "falling";
  }
  return "stable";
}

/**
 * How long something has lasted, shown next to an open window: "< 1 min", "12 min", "1 h 5 min",
 * "2 d 3 h" (two units at most, a zero second unit is left out).
 */
export function formatDuration(minutes: number): string {
  const total = Math.max(0, Math.floor(minutes));
  if (total < 1) {
    return "< 1 min";
  }
  if (total < 60) {
    return `${total} min`;
  }
  if (total < 24 * 60) {
    const [hours, rest] = [Math.floor(total / 60), total % 60];
    return rest === 0 ? `${hours} h` : `${hours} h ${rest} min`;
  }
  const [days, hours] = [Math.floor(total / (24 * 60)), Math.floor((total % (24 * 60)) / 60)];
  return hours === 0 ? `${days} d` : `${days} d ${hours} h`;
}

/**
 * The same duration in words for screen readers, in the card language: "1 hodina 5 minut",
 * "2 dny 3 hodiny" (the same two units at most as `formatDuration`).
 */
export function spokenDuration(minutes: number, t: Texts): string {
  const total = Math.max(0, Math.floor(minutes));
  if (total < 1) {
    return t.duration.lessThanMinute;
  }
  if (total < 60) {
    return t.duration.minute(total);
  }
  if (total < 24 * 60) {
    const [hours, rest] = [Math.floor(total / 60), total % 60];
    const text = t.duration.hour(hours);
    return rest === 0 ? text : `${text} ${t.duration.minute(rest)}`;
  }
  const [days, hours] = [Math.floor(total / (24 * 60)), Math.floor((total % (24 * 60)) / 60)];
  const text = t.duration.day(days);
  return hours === 0 ? text : `${text} ${t.duration.hour(hours)}`;
}

/**
 * A period for screen readers in the card language ("2 hodiny" after "za", "the last 2 hours",
 * "de senaste 2 timmarna"): whole hours are said in hours, anything else in minutes.
 */
export function spokenPeriod(minutes: number, t: Texts): string {
  const total = Math.max(1, Math.round(minutes));
  return total % 60 === 0 ? t.period.hour(total / 60) : t.period.minute(total);
}

/** Name of a blind preset: from the YAML, otherwise after its icon in the card language (Den / Day / Dag). */
export function presetName(preset: BlindPreset, t: Texts): string {
  return preset.label ?? t.cover.presetName[preset.icon];
}

/**
 * Description of a blind preset for screen readers: from the YAML; a preset without its own name
 * at the position of its icon says what the icon means ("vytaženo nahoru"), any other its
 * position and tilt.
 */
export function presetDescription(preset: BlindPreset, t: Texts): string {
  if (preset.description !== undefined) {
    return preset.description;
  }
  const own = ICON_POSITIONS[preset.icon];
  return preset.label === undefined && own.position === preset.position && own.tilt === preset.tilt
    ? t.cover.presetDescription[preset.icon]
    : t.cover.position(Math.round(preset.position), Math.round(preset.tilt));
}

/** The four ALPSTUGA measurements of a room, the only entities checked for stale data. */
export function measurementEntityIds(settings: Settings): EntityId[] {
  const entityIds = new Set<EntityId>();
  for (const room of settings.rooms) {
    for (const entityId of [room.temperature, room.humidity, room.carbon_dioxide, room.pm25]) {
      if (entityId) {
        entityIds.add(entityId);
      }
    }
  }
  return [...entityIds];
}
