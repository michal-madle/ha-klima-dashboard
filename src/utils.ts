import { HOUSE_MODE_ENTITY } from "./config";
import type {
  BlindPreset,
  DashboardConfig,
  DashboardThresholds,
  EntityId,
  Reading,
  RoomStatus,
  ClimateMode,
  TrendKind,
} from "./types";

/** Script called by the blind presets (fields: entity, pos, tilt). */
export const COVER_SCRIPT = { domain: "script", service: "zaluzie_posun" } as const;

/**
 * Position / tilt: 0 = closed (down / vertical slats), 100 = open (up / horizontal slats).
 * The order is the order of the buttons from top to bottom: raised first, closed last.
 */
export const BLIND_PRESETS: BlindPreset[] = [
  { id: "open", label: "Den", description: "vytaženo nahoru", position: 100, tilt: 100 },
  { id: "shade", label: "Stín", description: "spuštěno, lamely otevřené", position: 0, tilt: 100 },
  { id: "dark", label: "Tma", description: "úplné zatemnění", position: 0, tilt: 0 },
];

/** Tolerance (position and tilt, in %) within which a blind counts as being in a preset. */
const PRESET_TOLERANCE = 2;

/** True when the blind's position and tilt (both known) are those of the preset. */
export function blindMatchesPreset(
  position: number | undefined,
  tilt: number | undefined,
  preset: BlindPreset,
): boolean {
  return (
    position !== undefined &&
    tilt !== undefined &&
    Math.abs(position - preset.position) <= PRESET_TOLERANCE &&
    Math.abs(tilt - preset.tilt) <= PRESET_TOLERANCE
  );
}

/**
 * Rounding step of the house-wide trend axis per quantity (°C, ppm, µg/m³); it is also the
 * smallest axis range, so sensor noise is not drawn as a trend.
 */
export const TREND_AXIS_STEP: Record<TrendKind, number> = { temperature: 1, co2: 100, pm25: 5 };

export const COLORS = {
  background: "#1C1C1E",
  open: "#D8D8DC",
  closed: "#6B6B70",
  /** Lowered blind (champagne) and the window behind it (sky). */
  blind: "#E8D9B5",
  sky: "#64D2FF",
  /** CO₂ icon and its micro trend (lime) and PM2.5 icon and its micro trend (violet). */
  co2: "#A6E36B",
  pm25: "#B8A6FF",
  /** Temperature micro trend. */
  peach: "#FFB36B",
  /** Humidity value: deliberately uncoloured. */
  neutral: "#C7C7CC",
  /** Dashed humidity curve in the 24 h room history. */
  humidityLine: "#64D2FF",
  label: "#9A9AA0",
  off: "#8E8E93",
  white: "#FFFFFF",
  plan: "#F2F2F7",
  warning: "#FF9F0A",
  alert: "#FF453A",
  cold: "#64D2FF",
  cool: "#64D2FF",
  dry: "#FFD60A",
  heat: "#FF9F0A",
  auto: "#BF5AF2",
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

export const CLIMATE_LABELS: Record<ClimateMode, string> = {
  off: "Vypnuto",
  cool: "Chlazení",
  wind_free: "WindFree",
  dry: "Sušení",
  fan: "Větrání",
  heat: "Topení",
  auto: "Auto",
  unknown: "––",
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
 * Room status (CURRENT_SPEC.md, Stavový systém). A stale reading counts as missing, so old
 * data never colour the room and never give "Příjemné".
 */
export function getRoomStatus(
  readings: RoomReadings,
  isSummer: boolean,
  modeKnown: boolean,
  thresholds: DashboardThresholds,
): RoomStatus {
  // "Bez dat" names the first missing or stale required value, so the user knows what to fix
  // (CURRENT_SPEC.md, Chybějící data).
  const required: Array<[string, Reading | undefined]> = [
    ["teplota", readings.temperature],
    ["vlhkost", readings.humidity],
    ["CO₂", readings.co2],
    ["PM2.5", readings.pm25],
    ["režim domu", modeKnown ? { value: 1 } : undefined],
  ];
  for (const [name, reading] of required) {
    if (reading?.value === undefined) {
      return { label: `Bez dat · ${name}`, color: COLORS.label, kind: "unknown" };
    }
    if (reading.stale) {
      const age = reading.ageMinutes === undefined ? "" : ` (před ${formatAge(reading.ageMinutes)})`;
      return { label: `Bez dat · ${name}${age}`, color: COLORS.label, kind: "unknown" };
    }
  }
  const temperature = readings.temperature.value as number;
  const humidity = readings.humidity.value as number;
  const co2 = readings.co2.value as number;
  const pm25 = readings.pm25.value as number;
  if (pm25 >= thresholds.pm25_critical) {
    return { label: "Znečištěný vzduch", color: COLORS.alert, kind: "critical" };
  }
  if (co2 >= thresholds.co2_critical) {
    return { label: "Silně vydýchaný vzduch", color: COLORS.alert, kind: "critical" };
  }
  if (co2 >= thresholds.co2_warning) {
    return { label: "Vydýchaný vzduch", color: COLORS.warning, kind: "warning" };
  }
  if (humidity > thresholds.humidity_max) {
    return { label: "Vlhko", color: COLORS.warning, kind: "warning" };
  }
  if (humidity < thresholds.humidity_min) {
    return { label: "Sucho", color: COLORS.warning, kind: "warning" };
  }

  const minimum = isSummer ? thresholds.summer_min : thresholds.winter_min;
  const maximum = isSummer ? thresholds.summer_max : thresholds.winter_max;
  if (temperature > maximum) {
    return { label: "Teplo", color: COLORS.warning, kind: "warning" };
  }
  if (temperature < minimum) {
    return { label: "Chladno", color: COLORS.cold, kind: "warning" };
  }
  return { label: "Příjemné", color: COLORS.label, kind: "normal" };
}

/** Attribute that should be a list of strings (hvac_modes, preset_modes); anything else is empty. */
export function stringList(value: unknown): string[] {
  return Array.isArray(value)
    ? value.filter((item): item is string => typeof item === "string").map((item) => item.toLowerCase())
    : [];
}

export function isUnavailable(state: string): boolean {
  return state === "" || state === "unknown" || state === "unavailable" || state === "none";
}

export function numberAttribute(value: unknown): number | undefined {
  if (value === undefined || value === null || value === "") {
    return undefined;
  }
  const number = typeof value === "number" ? value : Number.parseFloat(String(value));
  return Number.isFinite(number) && number >= 0 && number <= 100 ? number : undefined;
}

export function formatOne(value: number): string {
  return new Intl.NumberFormat("cs-CZ", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  }).format(value);
}

export function formatHalf(value: number): string {
  return new Intl.NumberFormat("cs-CZ", { maximumFractionDigits: 1 }).format(
    Math.round(value * 2) / 2,
  );
}

export function heatingWaveCount(value: number | undefined): number {
  if (value === undefined || value <= 0) {
    return 0;
  }
  if (value <= 34) {
    return 1;
  }
  if (value <= 67) {
    return 2;
  }
  return 3;
}

export function configuredEntityIds(config: DashboardConfig): Set<EntityId> {
  const entityIds = new Set<EntityId>();
  const add = (entityId: EntityId | undefined): void => {
    if (entityId) {
      entityIds.add(entityId);
    }
  };

  add(config.house_mode_entity ?? HOUSE_MODE_ENTITY);
  add(config.outside?.temperature);
  add(config.outside?.minimum);
  add(config.outside?.maximum);
  add(config.outside?.rain_probability);
  add(config.outside?.pm25);

  for (const room of config.rooms) {
    add(room.temperature);
    add(room.humidity);
    add(room.carbon_dioxide);
    add(room.pm25);
    add(room.window);
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
export function trendEntityIds(config: DashboardConfig): EntityId[] {
  const entityIds = new Set<EntityId>();
  for (const room of config.rooms) {
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

/** "45 min", "2 h", "3 d". */
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
 * last sample against half of the axis step (0,5 °C, 50 ppm, 2,5 µg/m³ over 2 h).
 */
export function trendDirection(
  samples: Array<number | undefined> | undefined,
  step: number,
): "stoupá" | "klesá" | "stabilní" | undefined {
  const defined = (samples ?? []).filter((value): value is number => value !== undefined);
  if (defined.length < 2) {
    return undefined;
  }
  const change = defined[defined.length - 1] - defined[0];
  if (change >= step / 2) {
    return "stoupá";
  }
  if (change <= -step / 2) {
    return "klesá";
  }
  return "stabilní";
}

/** Czech plural: 1 okno, 2–4 okna, 5+ oken. */
export function plural(count: number, one: string, few: string, many: string): string {
  if (count === 1) {
    return one;
  }
  return count >= 2 && count <= 4 ? few : many;
}

/** The four ALPSTUGA measurements of a room, the only entities checked for stale data. */
export function measurementEntityIds(config: DashboardConfig): EntityId[] {
  const entityIds = new Set<EntityId>();
  for (const room of config.rooms) {
    for (const entityId of [room.temperature, room.humidity, room.carbon_dioxide, room.pm25]) {
      if (entityId) {
        entityIds.add(entityId);
      }
    }
  }
  return [...entityIds];
}
