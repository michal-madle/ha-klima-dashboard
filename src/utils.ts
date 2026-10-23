import { HOUSE_MODE_ENTITY } from "./config";
import type {
  DashboardConfig,
  DashboardThresholds,
  EntityId,
  RoomStatus,
  SamsungMode,
} from "./types";

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
  cool: "#64D2FF",
  dry: "#FFD60A",
  heat: "#FF9F0A",
  auto: "#BF5AF2",
};

export const SAMSUNG_COLORS: Record<SamsungMode, string> = {
  off: COLORS.off,
  cool: COLORS.cool,
  wind_free: COLORS.cool,
  dry: COLORS.dry,
  fan: COLORS.plan,
  heat: COLORS.heat,
  auto: COLORS.auto,
  unknown: COLORS.off,
};

export const SAMSUNG_LABELS: Record<SamsungMode, string> = {
  off: "Vypnuto",
  cool: "Chlazení",
  wind_free: "WindFree",
  dry: "Sušení",
  fan: "Větrání",
  heat: "Topení",
  auto: "Auto",
  unknown: "––",
};

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
    add(room.tado?.climate);
    add(room.tado?.overlay);
    add(room.tado?.target);
    add(room.tado?.heating);
    add(room.samsung);
  }
  return entityIds;
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
