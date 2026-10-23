export type EntityId = string;

export interface HassEntity {
  state: string;
  attributes: Record<string, unknown>;
}

export interface HomeAssistant {
  states: Record<EntityId, HassEntity>;
  callService(
    domain: string,
    service: string,
    serviceData?: Record<string, unknown>,
  ): Promise<unknown>;
  callWS<T>(message: Record<string, unknown>): Promise<T>;
}

export interface RoomConfig {
  name: string;
  temperature?: EntityId;
  humidity?: EntityId;
  carbon_dioxide?: EntityId;
  pm25?: EntityId;
  window?: EntityId;
  cover?: EntityId;
  /** Topení: heating system (climate entity, overlay mode, target, heating intensity in %). */
  heating?: {
    climate?: EntityId;
    overlay?: EntityId;
    target?: EntityId;
    intensity?: EntityId;
  };
  /** Klimatizace: air conditioner climate entity. */
  air_conditioner?: EntityId;
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

export type ClimateMode =
  | "off"
  | "cool"
  | "wind_free"
  | "dry"
  | "fan"
  | "heat"
  | "auto"
  | "unknown";

export type BlindPresetId = "dark" | "shade" | "morning" | "open";

export interface BlindPreset {
  id: BlindPresetId;
  /** Accessible name; the button itself shows only an icon. */
  label: string;
  description: string;
  position: number;
  tilt: number;
  /** Accent colour of the icon and of the active state. */
  tone: string;
}

export type DialogKind = "room" | "air";

export interface DialogState {
  kind: DialogKind;
  room: RoomConfig;
}

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
