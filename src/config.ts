import type { DashboardConfig, DashboardThresholds } from "./types";

export const HOUSE_MODE_ENTITY = "input_select.house_mode";

export const DEFAULT_THRESHOLDS: DashboardThresholds = {
  humidity_min: 35,
  humidity_max: 70,
  co2_warning: 1000,
  co2_critical: 1500,
  pm25_warning: 15,
  pm25_critical: 35,
  winter_min: 20,
  winter_max: 24,
  summer_min: 21,
  summer_max: 25,
};

export function normalizeConfig(config: DashboardConfig): DashboardConfig {
  if (!config || !Array.isArray(config.rooms) || config.rooms.length === 0) {
    throw new Error("Klima Dashboard requires a non-empty rooms list.");
  }
  if (
    config.house_mode_entity !== undefined &&
    (typeof config.house_mode_entity !== "string" || !config.house_mode_entity.trim())
  ) {
    throw new Error("house_mode_entity must be a non-empty entity ID.");
  }
  for (const room of config.rooms) {
    if (!room || typeof room.name !== "string" || !room.name.trim()) {
      throw new Error("Each Klima Dashboard room requires a name.");
    }
  }
  for (const [key, value] of Object.entries(config.thresholds ?? {})) {
    if (typeof value !== "number" || !Number.isFinite(value)) {
      throw new Error(`Threshold "${key}" must be a finite number.`);
    }
  }

  const thresholds = { ...DEFAULT_THRESHOLDS, ...config.thresholds };
  if (
    thresholds.humidity_min >= thresholds.humidity_max ||
    thresholds.co2_warning >= thresholds.co2_critical ||
    thresholds.pm25_warning >= thresholds.pm25_critical ||
    thresholds.winter_min > thresholds.winter_max ||
    thresholds.summer_min > thresholds.summer_max
  ) {
    throw new Error("Threshold ranges must be in ascending order.");
  }

  return { ...config, thresholds };
}
