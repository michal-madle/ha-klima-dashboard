import { BLIND_ICONS, ROOM_SCENES, SCENE_NONE } from "./types";
import type {
  BlindIcon,
  BlindPreset,
  CoverSettings,
  DashboardConfig,
  DashboardThresholds,
  HistorySettings,
  PresetInput,
  Room,
  RoomConfig,
  RoomImage,
  RoomScene,
  Settings,
  ThemeSetting,
  TrendSettings,
  WindowConfig,
} from "./types";

/*
 * Card configuration (CURRENT_SPEC.md, Konfigurace): every key is optional and falls back to
 * the defaults below, so an older configuration keeps working. A key without a value (`link:`
 * in YAML, i.e. null) is the same as no key, so the example can list every setting. A wrong
 * value stops the card with an error that names the key; nothing is silently ignored.
 */

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
  stale_minutes: 30,
  heating_waves_2: 35,
  heating_waves_3: 68,
};

export const DEFAULT_TRENDS: TrendSettings = {
  minutes: 120,
  samples: 12,
  temperature_step: 1,
  co2_step: 100,
  pm25_step: 5,
};

export const DEFAULT_HISTORY: HistorySettings = {
  hours: 24,
  night_start: 22,
  night_end: 6,
  min_temperature_span: 1.5,
};

export const DEFAULT_COVERS: CoverSettings = {
  script: "script.zaluzie_posun",
  tolerance: 5,
  stall_seconds: 5,
};

/**
 * Position / tilt: 0 = closed (down / vertical slats), 100 = open (up / horizontal slats).
 * The order is the order of the buttons from top to bottom: raised first, closed last.
 */
export const DEFAULT_PRESETS: PresetInput[] = [
  { name: "Den", icon: "open", position: 100, tilt: 100, description: "vytaženo nahoru" },
  { name: "Stín", icon: "shade", position: 0, tilt: 100, description: "spuštěno, lamely otevřené" },
  { name: "Tma", icon: "dark", position: 0, tilt: 0, description: "úplné zatemnění" },
];

export const DEFAULT_HOUSE_MODES = { winter: "Zima", summer: "Léto" };

const THEMES: readonly ThemeSetting[] = ["auto", "dark", "light"];
const MAX_PRESETS = 3;

/** Default illustration by room name (lower case, without diacritics). */
const SCENE_BY_NAME: Record<string, RoomScene> = {
  loznice: "bedroom",
  pracovna: "office",
  maxik: "kids",
  mikulas: "kids",
  obyvak: "living",
  "obyvaci pokoj": "living",
};

const ROOM_KEYS = [
  "name",
  "temperature",
  "humidity",
  "carbon_dioxide",
  "pm25",
  "window",
  "cover",
  "cover_presets",
  "thresholds",
  "heating",
  "air_conditioner",
  "image",
  "scene",
  "link",
];
const HEATING_KEYS = ["climate", "overlay", "target", "intensity"];
const OUTSIDE_KEYS = ["temperature", "minimum", "maximum", "rain_probability", "pm25"];
const PRESET_KEYS = ["name", "position", "tilt", "icon", "description"];
const WINDOW_KEYS = ["entity", "name"];

/** Lower case without diacritics and extra spaces: "Léto" = "leto", "Obývací  pokoj" = "obyvaci pokoj". */
export function plainText(text: string): string {
  return text
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .trim()
    .replace(/\s+/g, " ");
}

function fail(message: string): never {
  throw new Error(`Klima Dashboard: ${message}`);
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function checkKeys(value: Record<string, unknown>, allowed: readonly string[], where: string): void {
  for (const key of Object.keys(value)) {
    if (!allowed.includes(key)) {
      fail(`${where}: unknown key "${key}" (allowed: ${allowed.join(", ")}).`);
    }
  }
}

function section(value: unknown, where: string): Record<string, unknown> {
  if (value === undefined || value === null) {
    return {};
  }
  if (!isRecord(value)) {
    fail(`"${where}" must be a mapping of keys.`);
  }
  return value;
}

function entityId(value: unknown, where: string): string | undefined {
  if (value === undefined || value === null) {
    return undefined;
  }
  // Home Assistant entity IDs: lower-case domain and object ID of letters, digits and "_".
  if (typeof value !== "string" || !/^[a-z0-9_]+\.[a-z0-9_]+$/.test(value.trim())) {
    fail(`${where} must be an entity ID such as sensor.loznice_teplota.`);
  }
  return value.trim();
}

function text(value: unknown, where: string): string | undefined {
  if (value === undefined || value === null) {
    return undefined;
  }
  if (typeof value !== "string" || !value.trim()) {
    fail(`${where} must be a non-empty text.`);
  }
  return value.trim();
}

/** Numbers of a section over their defaults; each must be finite and within [min, max]. */
function numbers<T extends object>(
  input: Record<string, unknown>,
  defaults: T,
  where: string,
  limits: Partial<Record<keyof T, [number, number, "integer"?]>> = {},
): T {
  checkKeys(input, Object.keys(defaults), where);
  const result = { ...defaults } as Record<string, number>;
  for (const [key, value] of Object.entries(input)) {
    if (value === null) {
      continue;
    }
    if (typeof value !== "number" || !Number.isFinite(value)) {
      fail(`${where}.${key} must be a number.`);
    }
    const limit = limits[key as keyof T];
    if (limit) {
      const [min, max, integer] = limit;
      if (value < min || value > max || (integer && !Number.isInteger(value))) {
        fail(`${where}.${key} must be ${integer ? "a whole number " : ""}from ${min} to ${max}.`);
      }
    }
    result[key] = value;
  }
  return result as T;
}

function checkThresholds(thresholds: DashboardThresholds, where: string): void {
  const pairs: Array<[keyof DashboardThresholds, keyof DashboardThresholds, boolean]> = [
    ["humidity_min", "humidity_max", true],
    ["co2_warning", "co2_critical", true],
    ["pm25_warning", "pm25_critical", true],
    ["winter_min", "winter_max", false],
    ["summer_min", "summer_max", false],
    ["heating_waves_2", "heating_waves_3", true],
  ];
  for (const [low, high, strict] of pairs) {
    if (strict ? thresholds[low] >= thresholds[high] : thresholds[low] > thresholds[high]) {
      fail(`${where}: ${low} (${thresholds[low]}) must be ${strict ? "below" : "at most"} ${high} (${thresholds[high]}).`);
    }
  }
  if (thresholds.stale_minutes <= 0) {
    fail(`${where}.stale_minutes must be greater than 0.`);
  }
  if (thresholds.heating_waves_2 < 1 || thresholds.heating_waves_3 > 100) {
    fail(`${where}: heating_waves_2 and heating_waves_3 must be from 1 to 100 %.`);
  }
}

/** Icon of a preset without one: raised → Den, else open slats → Stín, else Tma. */
function presetIcon(position: number, tilt: number): BlindIcon {
  return position > 50 ? "open" : tilt > 50 ? "shade" : "dark";
}

function presets(input: unknown, where: string): BlindPreset[] {
  if (!Array.isArray(input) || input.length === 0 || input.length > MAX_PRESETS) {
    fail(`${where} must be a list of 1 to ${MAX_PRESETS} presets.`);
  }
  return input.map((item: unknown, index) => {
    const at = `${where}[${index + 1}]`;
    if (!isRecord(item)) {
      fail(`${at} must have name, position and tilt.`);
    }
    checkKeys(item, PRESET_KEYS, at);
    const label = text(item.name, `${at}.name`);
    if (!label) {
      fail(`${at}.name is required.`);
    }
    const value = (key: "position" | "tilt"): number => {
      const number = item[key];
      if (typeof number !== "number" || !Number.isFinite(number) || number < 0 || number > 100) {
        fail(`${at}.${key} must be a number from 0 to 100.`);
      }
      return number;
    };
    const position = value("position");
    const tilt = value("tilt");
    let icon = presetIcon(position, tilt);
    if (item.icon !== undefined) {
      if (!BLIND_ICONS.includes(item.icon as BlindIcon)) {
        fail(`${at}.icon must be one of ${BLIND_ICONS.join(", ")}.`);
      }
      icon = item.icon as BlindIcon;
    }
    const description =
      text(item.description, `${at}.description`) ?? `poloha ${Math.round(position)} %, naklopení ${Math.round(tilt)} %`;
    return { id: `p${index}`, icon, label, description, position, tilt };
  });
}

function windows(room: RoomConfig, where: string): WindowConfig[] {
  const input = room.window as unknown;
  if (input === undefined || input === null) {
    return [];
  }
  const list = Array.isArray(input) ? input : [input];
  if (list.length === 0) {
    fail(`${where}.window must not be an empty list.`);
  }
  const result = list.map((item: unknown, index): WindowConfig => {
    const at = `${where}.window${Array.isArray(input) ? `[${index + 1}]` : ""}`;
    if (isRecord(item)) {
      checkKeys(item, WINDOW_KEYS, at);
      const entity = entityId(item.entity, `${at}.entity`);
      if (!entity) {
        fail(`${at}.entity is required.`);
      }
      return { entity, name: text(item.name, `${at}.name`) ?? `Okno ${index + 1}` };
    }
    const entity = entityId(item, at);
    if (!entity) {
      fail(`${at} must be an entity ID.`);
    }
    return { entity, name: `Okno ${index + 1}` };
  });
  const seen = new Set<string>();
  for (const window of result) {
    if (seen.has(window.entity)) {
      fail(`${where}.window lists ${window.entity} twice.`);
    }
    seen.add(window.entity);
  }
  return result;
}

/** CO₂ / PM2.5 sensor: an entity, nothing (missing → "––" and "Bez dat"), or false (the room has none). */
function airSensor(value: unknown, where: string): { entity?: string; present: boolean } {
  if (value === false) {
    return { present: false };
  }
  return { entity: entityId(value, where), present: true };
}

function image(room: RoomConfig, where: string): RoomImage | undefined {
  if (room.image != null && room.scene != null) {
    fail(`${where}: use either image or scene (older name), not both.`);
  }
  const key = room.image != null ? "image" : "scene";
  const value = room.image ?? room.scene;
  if (value === undefined || value === null) {
    const scene = SCENE_BY_NAME[plainText(room.name)];
    return scene ? { kind: "scene", scene } : undefined;
  }
  if (typeof value !== "string" || !value.trim()) {
    fail(`${where}.${key} must be ${[...ROOM_SCENES, SCENE_NONE].join(", ")} or the address of an image.`);
  }
  const choice = value.trim();
  if (choice === SCENE_NONE) {
    return undefined;
  }
  if ((ROOM_SCENES as readonly string[]).includes(choice)) {
    return { kind: "scene", scene: choice as RoomScene };
  }
  if (key === "image" && /^(\/|https?:\/\/|data:image\/)/i.test(choice)) {
    return { kind: "url", url: choice };
  }
  fail(
    `${where}.${key} must be one of ${[...ROOM_SCENES, SCENE_NONE].join(", ")}${
      key === "image" ? " or an image address starting with /, http:// or https://" : ""
    }.`,
  );
}

function link(value: unknown, where: string): string | undefined {
  const target = text(value, `${where}.link`);
  if (target !== undefined && !/^(\/|https?:\/\/)/i.test(target)) {
    fail(`${where}.link must be a Home Assistant path (/lovelace/…) or a web address (https://…).`);
  }
  return target;
}

function normalizeRoom(
  room: RoomConfig,
  index: number,
  shared: { thresholds: DashboardThresholds; presets: BlindPreset[] },
): Room {
  if (!isRecord(room)) {
    fail(`room ${index + 1} must be a mapping with at least a name.`);
  }
  const name = typeof room.name === "string" ? room.name.trim() : "";
  if (!name) {
    fail(`room ${index + 1} requires a name.`);
  }
  const where = `room "${name}"`;
  const keys = room as unknown as Record<string, unknown>;
  // Keys of the previous configuration contract fail loudly instead of being ignored.
  for (const [oldKey, newKey] of [
    ["tado", "heating"],
    ["samsung", "air_conditioner"],
  ]) {
    if (oldKey in keys) {
      fail(`${where}: key "${oldKey}" was renamed to "${newKey}".`);
    }
  }
  if ("windows" in keys) {
    fail(`${where}: the key is "window" (one entity or a list of them), not "windows".`);
  }
  checkKeys(keys, ROOM_KEYS, where);

  const heatingInput = section(room.heating, `${where}.heating`);
  if ("heating" in heatingInput) {
    fail(`${where}: key "heating.heating" was renamed to "heating.intensity".`);
  }
  checkKeys(heatingInput, HEATING_KEYS, `${where}.heating`);
  const heating =
    room.heating == null
      ? undefined
      : {
          climate: entityId(heatingInput.climate, `${where}.heating.climate`),
          overlay: entityId(heatingInput.overlay, `${where}.heating.overlay`),
          target: entityId(heatingInput.target, `${where}.heating.target`),
          intensity: entityId(heatingInput.intensity, `${where}.heating.intensity`),
        };

  const thresholds = numbers(section(room.thresholds, `${where}.thresholds`), shared.thresholds, `${where}.thresholds`);
  checkThresholds(thresholds, `${where}.thresholds`);

  const co2 = airSensor(room.carbon_dioxide, `${where}.carbon_dioxide`);
  const pm25 = airSensor(room.pm25, `${where}.pm25`);
  return {
    name,
    temperature: entityId(room.temperature, `${where}.temperature`),
    humidity: entityId(room.humidity, `${where}.humidity`),
    carbon_dioxide: co2.entity,
    hasCo2: co2.present,
    pm25: pm25.entity,
    hasPm25: pm25.present,
    windows: windows(room, where),
    cover: entityId(room.cover, `${where}.cover`),
    presets: room.cover_presets == null ? shared.presets : presets(room.cover_presets, `${where}.cover_presets`),
    thresholds,
    heating,
    air_conditioner: entityId(room.air_conditioner, `${where}.air_conditioner`),
    image: image(room, where),
    link: link(room.link, where),
  };
}

export function normalizeConfig(config: DashboardConfig): Settings {
  if (!isRecord(config) || !Array.isArray(config.rooms) || config.rooms.length === 0) {
    fail("the configuration requires a non-empty rooms list.");
  }
  if (config.title != null && typeof config.title !== "string") {
    fail("title must be a text (an empty text leaves the heading out).");
  }
  const theme = config.theme ?? "auto";
  if (!THEMES.includes(theme)) {
    fail(`theme must be one of ${THEMES.join(", ")}.`);
  }
  const houseModeEntity = entityId(config.house_mode_entity, "house_mode_entity") ?? HOUSE_MODE_ENTITY;
  const modesInput = section(config.house_modes, "house_modes");
  checkKeys(modesInput, ["winter", "summer"], "house_modes");
  const houseModes = {
    winter: text(modesInput.winter, "house_modes.winter") ?? DEFAULT_HOUSE_MODES.winter,
    summer: text(modesInput.summer, "house_modes.summer") ?? DEFAULT_HOUSE_MODES.summer,
  };
  if (plainText(houseModes.winter) === plainText(houseModes.summer)) {
    fail("house_modes.winter and house_modes.summer must differ.");
  }
  const outside = config.outside == null ? undefined : section(config.outside, "outside");
  if (outside) {
    checkKeys(outside, OUTSIDE_KEYS, "outside");
    for (const key of OUTSIDE_KEYS) {
      entityId(outside[key], `outside.${key}`);
    }
  }

  const thresholds = numbers(section(config.thresholds, "thresholds"), DEFAULT_THRESHOLDS, "thresholds");
  checkThresholds(thresholds, "thresholds");
  const trends = numbers(section(config.trends, "trends"), DEFAULT_TRENDS, "trends", {
    minutes: [10, 1440, "integer"],
    samples: [2, 120, "integer"],
    temperature_step: [0.1, 10],
    co2_step: [1, 1000],
    pm25_step: [0.5, 100],
  });
  const history = numbers(section(config.history, "history"), DEFAULT_HISTORY, "history", {
    hours: [1, 168, "integer"],
    night_start: [0, 23, "integer"],
    night_end: [0, 23, "integer"],
    min_temperature_span: [0.5, 20],
  });
  const coversInput = { ...section(config.covers, "covers") };
  const presetInput = coversInput.presets;
  delete coversInput.presets;
  const scriptInput = coversInput.script;
  delete coversInput.script;
  const covers = {
    ...numbers(coversInput, { tolerance: DEFAULT_COVERS.tolerance, stall_seconds: DEFAULT_COVERS.stall_seconds }, "covers", {
      tolerance: [0, 25],
      stall_seconds: [1, 120],
    }),
    script: DEFAULT_COVERS.script,
  };
  if (scriptInput != null) {
    if (typeof scriptInput !== "string" || !/^script\.[a-z0-9_]+$/.test(scriptInput.trim())) {
      fail("covers.script must be a script entity such as script.zaluzie_posun.");
    }
    covers.script = scriptInput.trim();
  }
  const sharedPresets = presetInput == null ? presets(DEFAULT_PRESETS, "covers.presets") : presets(presetInput, "covers.presets");

  const rooms = config.rooms.map((room, index) => normalizeRoom(room, index, { thresholds, presets: sharedPresets }));
  const names = new Set<string>();
  for (const room of rooms) {
    if (names.has(room.name)) {
      fail(`room name "${room.name}" is used twice; room names must be unique.`);
    }
    names.add(room.name);
  }

  return {
    title: config.title ?? "Domov",
    theme,
    houseModeEntity,
    houseModes,
    outside: outside as Settings["outside"],
    thresholds,
    trends,
    history,
    covers,
    rooms,
  };
}
