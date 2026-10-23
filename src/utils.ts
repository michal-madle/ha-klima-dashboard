import { HOUSE_MODE_ENTITY } from "./config";
import type {
  BlindPreset,
  DashboardConfig,
  DashboardThresholds,
  EntityId,
  RoomStatus,
  ClimateMode,
} from "./types";

/** Script called by the blind presets (fields: entity, pos, tilt). */
export const COVER_SCRIPT = { domain: "script", service: "zaluzie_posun" } as const;

/** Position / tilt: 0 = closed (down / vertical slats), 100 = open (up / horizontal slats). */
export const BLIND_PRESETS: BlindPreset[] = [
  { id: "dark", label: "Tma", description: "úplné zatemnění", position: 0, tilt: 0 },
  { id: "morning", label: "Ráno", description: "ranní prosvětlení", position: 35, tilt: 60 },
  { id: "shade", label: "Stín", description: "spuštěno, lamely otevřené", position: 0, tilt: 100 },
  { id: "open", label: "Den", description: "vytaženo nahoru", position: 100, tilt: 100 },
];

/** Smallest range a trend is stretched over; flatter periods are drawn as stable. */
export const TREND_MIN_SPAN = { temperature: 0.5, co2: 50, pm25: 3 } as const;

export const COLORS = {
  background: "#1C1C1E",
  open: "#D8D8DC",
  closed: "#6B6B70",
  label: "#9A9AA0",
  off: "#8E8E93",
  white: "#FFFFFF",
  plan: "#F2F2F7",
  warning: "#FF9F0A",
  alert: "#FF453A",
  cold: "#64D2FF",
  humidity: "#64D2FF",
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

export function getRoomStatus(
  temperature: number | undefined,
  humidity: number | undefined,
  co2: number | undefined,
  pm25: number | undefined,
  isSummer: boolean,
  modeKnown: boolean,
  thresholds: DashboardThresholds,
): RoomStatus {
  if (
    temperature === undefined ||
    humidity === undefined ||
    co2 === undefined ||
    pm25 === undefined ||
    !modeKnown
  ) {
    return { label: "Bez dat", color: COLORS.label, kind: "unknown" };
  }
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
