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
  /**
   * Decorative illustration in the top-right corner of the room card. Without the key it is
   * chosen from the room name; "none" turns it off.
   */
  scene?: RoomScene | typeof SCENE_NONE;
}

export const ROOM_SCENES = ["bedroom", "office", "kids", "living"] as const;
export type RoomScene = (typeof ROOM_SCENES)[number];
export const SCENE_NONE = "none";

/** Quantities that have a micro trend; each has one axis shared by the whole house. */
export type TrendKind = "temperature" | "co2" | "pm25";

export interface TrendAxis {
  min: number;
  max: number;
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

export type BlindPresetId = "dark" | "shade" | "open";

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

/**
 * Popup of a room: controls of Topení or Klimatizace (opened from their rows), or the
 * 24 h room history (opened from the temperature).
 */
export type SheetKind = "heating" | "climate" | "history";

export interface SheetState {
  kind: SheetKind;
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
