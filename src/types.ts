export type EntityId = string;

export interface HassEntity {
  state: string;
  attributes: Record<string, unknown>;
}

export interface HomeAssistant {
  states: Record<EntityId, HassEntity>;
}

export interface RoomConfig {
  name: string;
  temperature?: EntityId;
  humidity?: EntityId;
  carbon_dioxide?: EntityId;
  pm25?: EntityId;
  window?: EntityId;
  cover?: EntityId;
  tado?: {
    climate?: EntityId;
    overlay?: EntityId;
    target?: EntityId;
    heating?: EntityId;
  };
  samsung?: EntityId;
}

export interface OutsideConfig {
  temperature?: EntityId;
  minimum?: EntityId;
  maximum?: EntityId;
  rain_probability?: EntityId;
  pm25?: EntityId;
}

export interface DashboardThresholds {
  humidity_min: number;
  humidity_max: number;
  co2_warning: number;
  co2_critical: number;
  pm25_warning: number;
  pm25_critical: number;
  winter_min: number;
  winter_max: number;
  summer_min: number;
  summer_max: number;
}

export interface DashboardConfig {
  type: string;
  title?: string;
  house_mode_entity?: EntityId;
  outside?: OutsideConfig;
  rooms: RoomConfig[];
  thresholds?: Partial<DashboardThresholds>;
}

export interface Reading {
  value?: number;
}

export interface RoomStatus {
  label: string;
  color: string;
  kind: "normal" | "warning" | "critical" | "unknown";
}

export type SamsungMode =
  | "off"
  | "cool"
  | "wind_free"
  | "dry"
  | "fan"
  | "heat"
  | "auto"
  | "unknown";

declare global {
  interface Window {
    customCards?: Array<{
      type: string;
      name: string;
      description: string;
      preview: boolean;
    }>;
  }
}
