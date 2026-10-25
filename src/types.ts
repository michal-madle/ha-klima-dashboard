export type EntityId = string;

export interface HassEntity {
  state: string;
  attributes: Record<string, unknown>;
  /** ISO time; changes only when the state or an attribute changes. */
  last_updated?: string;
  last_changed?: string;
}

export interface HomeAssistant {
  states: Record<EntityId, HassEntity>;
  callService(
    domain: string,
    service: string,
    serviceData?: Record<string, unknown>,
  ): Promise<unknown>;
  callWS<T>(message: Record<string, unknown>): Promise<T>;
  /** REST call, e.g. GET states/<entity_id> (whose answer includes last_reported). */
  callApi?<T>(method: "GET" | "POST" | "PUT" | "DELETE", path: string): Promise<T>;
  /**
   * Theme settings of the frontend. `darkMode` is the dark mode in effect: with the theme set
   * to "Auto" in the user profile it follows the system (iPhone appearance).
   */
  themes?: { darkMode?: boolean };
  /** Language of the frontend (user profile), e.g. "cs", "sv", "en-GB"; `locale.language` is the current one. */
  language?: string;
  locale?: { language?: string };
}

// ------------------------------------------------------------ configuration (YAML)

/** One window of a room in the YAML: an entity ID, or an entity with a name for the popup. */
export interface WindowInput {
  entity: EntityId;
  name?: string;
}

/** One blind preset in the YAML (CURRENT_SPEC.md, Žaluzie); without a name it is named after its icon. */
export interface PresetInput {
  name?: string;
  position: number;
  tilt: number;
  icon?: string;
  description?: string;
}

export interface RoomConfig {
  name: string;
  temperature?: EntityId;
  humidity?: EntityId;
  /** CO₂ sensor; `false` = the room has none (no row, not needed for the room status). */
  carbon_dioxide?: EntityId | false;
  pm25?: EntityId | false;
  /** One window, or a list of windows (entity IDs or `{ entity, name }`). */
  window?: EntityId | Array<EntityId | WindowInput>;
  cover?: EntityId;
  /** Blind presets of this room; without the key the shared `covers.presets` apply. */
  cover_presets?: PresetInput[];
  /** Thresholds of this room only, over the shared ones. */
  thresholds?: Partial<DashboardThresholds>;
  /** Topení: heating system (climate entity, overlay mode, target, heating intensity in %). */
  heating?: HeatingEntities;
  /** Klimatizace: air conditioner climate entity. */
  air_conditioner?: EntityId;
  /**
   * Picture in the top-right corner of the room card: a built-in illustration
   * (bedroom, office, kids, living), `none`, or the address of an image (/local/…, https://…).
   * Without the key the illustration is chosen from the room name.
   */
  image?: string;
  /** Older name of `image` (built-in illustrations only). */
  scene?: string;
  /** Tap on the room name: a Home Assistant path (/lovelace/…) or a web address. */
  link?: string;
}

export interface HeatingEntities {
  climate?: EntityId;
  overlay?: EntityId;
  target?: EntityId;
  intensity?: EntityId;
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
  /** A room measurement not reported for this many minutes is stale (dimmed, never coloured). */
  stale_minutes: number;
  /** Heating intensity (%) from which two and three waves are shown; one wave is anything above 0. */
  heating_waves_2: number;
  heating_waves_3: number;
}

export interface TrendSettings {
  /** Length of the micro trends in minutes. */
  minutes: number;
  /** Number of samples of a micro trend. */
  samples: number;
  /** Step of the house-wide trend axis per quantity (°C, ppm, µg/m³). */
  temperature_step: number;
  co2_step: number;
  pm25_step: number;
}

export interface HistorySettings {
  /** Length of the room history popup in hours. */
  hours: number;
  /** Night shading of the history chart, whole hours. */
  night_start: number;
  night_end: number;
  /** Smallest range of the temperature axis (°C). */
  min_temperature_span: number;
}

export interface CoverSettings {
  /** Script of the presets (fields entity, pos, tilt). */
  script: EntityId;
  /** Tolerance (±, in %) within which a blind counts as being in a preset. */
  tolerance: number;
  /** A preset on its way stops pulsing after this many seconds without any change of the blind. */
  stall_seconds: number;
}

export type ThemeSetting = "auto" | "dark" | "light";
export type Theme = "dark" | "light";

/** Languages of the card (CURRENT_SPEC.md, Jazyky); `auto` follows Home Assistant. */
export const LANGUAGES = ["cs", "en", "sv"] as const;
export type Language = (typeof LANGUAGES)[number];
export type LanguageSetting = "auto" | Language;

export interface DashboardConfig {
  type: string;
  title?: string;
  theme?: ThemeSetting;
  language?: LanguageSetting;
  house_mode_entity?: EntityId;
  house_modes?: { winter?: string; summer?: string };
  outside?: OutsideConfig;
  rooms: RoomConfig[];
  thresholds?: Partial<DashboardThresholds>;
  trends?: Partial<TrendSettings>;
  history?: Partial<HistorySettings>;
  covers?: Partial<CoverSettings> & { presets?: PresetInput[] };
}

// ------------------------------------------------------- normalized configuration

export const ROOM_SCENES = ["bedroom", "office", "kids", "living"] as const;
export type RoomScene = (typeof ROOM_SCENES)[number];
export const SCENE_NONE = "none";

/** Picture of a room: a built-in illustration or an image address. */
export type RoomImage = { kind: "scene"; scene: RoomScene } | { kind: "url"; url: string };

export interface WindowConfig {
  entity: EntityId;
  /** Name in the "Okna" popup; without it "Okno 1", "Window 1", … in the card language. */
  name?: string;
}

/** A room after `normalizeConfig`: every setting resolved (CURRENT_SPEC.md, Konfigurace). */
export interface Room {
  name: string;
  temperature?: EntityId;
  humidity?: EntityId;
  /** CO₂ sensor entity; undefined when it is missing from the configuration or the room has none. */
  carbon_dioxide?: EntityId;
  pm25?: EntityId;
  /** False when the configuration says the room has no such sensor (`carbon_dioxide: false`). */
  hasCo2: boolean;
  hasPm25: boolean;
  windows: WindowConfig[];
  cover?: EntityId;
  presets: BlindPreset[];
  thresholds: DashboardThresholds;
  heating?: HeatingEntities;
  air_conditioner?: EntityId;
  image?: RoomImage;
  link?: string;
}

/** The card configuration after `normalizeConfig`. */
export interface Settings {
  /** Undefined: the default title in the card language ("Domov", "Home", "Hem"). */
  title?: string;
  theme: ThemeSetting;
  language: LanguageSetting;
  houseModeEntity: EntityId;
  houseModes: { winter: string; summer: string };
  outside?: OutsideConfig;
  /** Shared thresholds (outdoor air uses them; every room has its own merged copy). */
  thresholds: DashboardThresholds;
  trends: TrendSettings;
  history: HistorySettings;
  covers: CoverSettings;
  rooms: Room[];
}

// ------------------------------------------------------------------- runtime

/** Quantities that have a micro trend; each has one axis shared by the whole house. */
export type TrendKind = "temperature" | "co2" | "pm25";

export interface TrendAxis {
  min: number;
  max: number;
}

export interface Reading {
  value?: number;
  /** Not reported for longer than `stale_minutes`. */
  stale?: boolean;
  /** Minutes since the sensor last reported, when known. */
  ageMinutes?: number;
}

/** Room statuses in their order of precedence (CURRENT_SPEC.md, Stavový systém). */
export type RoomStatusId =
  | "noData"
  | "polluted"
  | "veryStuffy"
  | "stuffy"
  | "humid"
  | "dry"
  | "warm"
  | "cold"
  | "comfortable";

export interface RoomStatus {
  id: RoomStatusId;
  label: string;
  color: string;
  kind: "normal" | "warning" | "critical" | "unknown";
  /** The measurement that decided the status (it is drawn in the status colour); none for normal / unknown. */
  cause?: "temperature" | "humidity" | "co2" | "pm25";
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

/** Glyph of a blind preset button: raised (Den), lowered with open slats (Stín), closed (Tma). */
export const BLIND_ICONS = ["open", "shade", "dark"] as const;
export type BlindIcon = (typeof BLIND_ICONS)[number];

export interface BlindPreset {
  /** Unique within the room ("p0", "p1", …). */
  id: string;
  icon: BlindIcon;
  /**
   * Accessible name from the YAML; the button itself shows only an icon. Without it the
   * preset is named after its icon in the card language (Den / Day / Dag, …).
   */
  label?: string;
  /** Description for screen readers from the YAML; see `presetDescription` for the default. */
  description?: string;
  position: number;
  tilt: number;
}

/**
 * Popup of a room: controls of Topení or Klimatizace (opened from their rows), the room
 * history (opened from the temperature), the air quality, or the windows of a room with more than one.
 */
export type SheetKind = "heating" | "climate" | "history" | "air" | "windows";

export interface SheetState {
  kind: SheetKind;
  room: Room;
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
