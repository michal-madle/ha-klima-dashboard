// Test scenarios for the Klima Dashboard card: a configuration and a fake `hass` object.
// Open /tests/harness.html?s=<scenario>. The "real" scenario is the configuration of
// examples/domov_prototyp_loznice.yaml itself, read and parsed here. &lang=sv (en-GB, de, …)
// is the language of Home Assistant, Czech without it; &lang= alone is a frontend without one.
import "/ha-klima-dashboard.js";
import { parse } from "/node_modules/yaml/browser/index.js";

const params = new URLSearchParams(location.search);
const scenario = params.get("s") ?? "full";
const now = Date.now();
const HOUR = 3_600_000;
const iso = (msAgo) => new Date(now - msAgo).toISOString();

const ROOMS = [
  { name: "Ložnice", slug: "loznice", cover: true },
  { name: "Pracovna", slug: "pracovna", cover: true },
  { name: "Maxík", slug: "maxik", cover: true },
  { name: "Mikuláš", slug: "mikulas", cover: true },
  { name: "Obývák", slug: "obyvak", cover: false, window: "binary_sensor.obyvak_dvere_zahrada" },
];
const ALL_SENSORS = ["temperature", "humidity", "carbon_dioxide", "pm2_5"];
const CONFIG_KEY = { temperature: "temperature", humidity: "humidity", carbon_dioxide: "carbon_dioxide", pm2_5: "pm25" };

/** Card configuration; "real" is the example YAML, the others are built from ROOMS. */
export async function buildConfig(name) {
  if (name === "real") {
    return parse(await (await fetch("/examples/domov_prototyp_loznice.yaml")).text());
  }
  const rooms = ROOMS.map((room) => {
    const config = {
      name: room.name,
      window: room.window ?? `binary_sensor.${room.slug}_okno_${room.slug}`,
      heating: {
        climate: `climate.${room.slug}_tado_ce_${room.slug}`,
        overlay: `sensor.${room.slug}_tado_ce_${room.slug}_overlay`,
        target: `sensor.${room.slug}_tado_ce_${room.slug}_target`,
        intensity: `sensor.${room.slug}_tado_ce_${room.slug}_heating`,
      },
      air_conditioner: `climate.${room.slug}_ac_${room.slug}`,
    };
    if (room.cover) {
      config.cover = `cover.${room.slug}_zaluzie_${room.slug}`;
    }
    for (const sensor of ALL_SENSORS) {
      config[CONFIG_KEY[sensor]] = `sensor.${room.slug}_teplomer_${room.slug}_${sensor}`;
    }
    return config;
  });
  if (name === "longnames") {
    rooms[0].name = "Ložnice pro hosty";
    rooms[4].name = "Obývací pokoj";
  }
  const config = { type: "custom:ha-klima-dashboard", house_mode_entity: "input_select.house_mode", rooms };
  if (name === "config") {
    // New configuration (CURRENT_SPEC.md, Konfigurace): Ložnice has two windows with names, a link
    // and its own presets; Pracovna has no CO₂ / PM2.5 sensor; Maxík has its own picture and a
    // warmer winter band (22,4 °C is "Chladno" there); shorter trends and history.
    rooms[0].window = [
      { entity: "binary_sensor.loznice_okno_loznice", name: "Okno" },
      { entity: "binary_sensor.loznice_okno_balkon", name: "Balkon" },
    ];
    rooms[0].link = "/lovelace/loznice";
    rooms[0].cover_presets = [
      { name: "Ráno", position: 100, tilt: 100 },
      { name: "Polostín", position: 50, tilt: 60, icon: "shade" },
    ];
    rooms[1].carbon_dioxide = false;
    rooms[1].pm25 = false;
    // Obývák has no blind either: with no CO₂ and PM2.5 the three empty rows are left out.
    rooms[4].carbon_dioxide = false;
    rooms[4].pm25 = false;
    rooms[2].image = `data:image/svg+xml,${encodeURIComponent(
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 30"><rect width="40" height="30" fill="#5b8"/><circle cx="28" cy="10" r="5" fill="#fd5"/></svg>',
    )}`;
    rooms[2].thresholds = { winter_min: 23, winter_max: 26 };
    config.trends = { minutes: 60, samples: 7 };
    config.history = { hours: 12, night_start: 23, night_end: 7 };
    config.covers = { tolerance: 3 };
  }
  return config;
}

/** Entity IDs of the windows of a room in the configuration (one entity or a list). */
export function windowIds(room) {
  return [room.window ?? []].flat().map((window) => (typeof window === "string" ? window : window.entity));
}

const config = await buildConfig(scenario);
const state = (value, attributes = {}, minutesAgo = 3) => ({
  state: String(value),
  attributes,
  last_updated: iso(minutesAgo * 60_000),
  last_changed: iso(minutesAgo * 60_000),
});
const VALUES = [[21.3, 52, 656, 2], [20.2, 48, 820, 9], [22.4, 45, 540, 3], [21.7, 50, 710, 4], [22.9, 41, 480, 6]];
const states = {};

config.rooms.forEach((room, index) => {
  const [temperature, humidity, co2, pm25] = VALUES[index];
  if (room.temperature) states[room.temperature] = state(temperature, { unit_of_measurement: "°C" });
  if (room.humidity) states[room.humidity] = state(humidity, { unit_of_measurement: "%" });
  if (room.carbon_dioxide) states[room.carbon_dioxide] = state(co2, { unit_of_measurement: "ppm" });
  if (room.pm25) states[room.pm25] = state(pm25, { unit_of_measurement: "µg/m³" });
  for (const id of windowIds(room)) states[id] = state(index === 1 ? "on" : "off");
  if (room.cover) {
    states[room.cover] = state("open", {
      current_position: [0, 100, 40, 0][index],
      current_tilt_position: [0, 100, 60, 100][index],
    });
  }
  const heating = room.heating;
  states[heating.climate] = state("auto", { hvac_modes: ["off", "auto", "heat"], min_temp: 5, max_temp: 25, target_temp_step: 0.5, temperature: 21 });
  states[heating.overlay] = state("Schedule");
  states[heating.target] = state(21);
  states[heating.intensity] = state([20, 0, 60, 0, 90][index]);
  states[room.air_conditioner] = state("off", {
    hvac_modes: ["off", "cool", "dry", "fan_only", "auto", "heat"],
    preset_modes: ["none", "sleep", "boost", "wind_free", "wind_free_sleep"],
    preset_mode: "none",
    temperature: 22,
  });
});

if (scenario !== "real") {
  states["input_select.house_mode"] = state(scenario === "summer" ? "Léto" : "Zima");
}
if (scenario === "summer") {
  const loznice = "climate.loznice_ac_loznice";
  const pracovna = "climate.pracovna_ac_pracovna";
  states[loznice] = state("cool", { ...states[loznice].attributes, preset_mode: "wind_free_sleep", temperature: 22.5 });
  states[pracovna] = state("cool", { ...states[pracovna].attributes, preset_mode: "wind_free" });
}
if (scenario === "alarm") {
  states["sensor.loznice_teplomer_loznice_carbon_dioxide"].state = "1640";
  states["sensor.pracovna_teplomer_pracovna_pm2_5"].state = "41";
  states["sensor.maxik_teplomer_maxik_humidity"].state = "76";
  for (const room of config.rooms) {
    for (const id of windowIds(room)) states[id].state = "on";
    states[room.heating.overlay].state = "Manual";
    states[room.heating.target].state = "23.5";
  }
}
if (scenario === "unavailable") {
  for (const id of Object.keys(states)) {
    if (!id.startsWith("input_select.")) states[id] = state("unavailable");
  }
}
if (scenario === "cover-unavailable") {
  states["cover.loznice_zaluzie_loznice"] = state("unavailable");
}
if (scenario === "stale") {
  // Maxík measures 0 µg/m³ (clean air) and has not reported for hours: that is no stale value.
  states["sensor.maxik_teplomer_maxik_pm2_5"].state = "0";
  // In Home Assistant last_updated is never newer than last_reported.
  for (const id of Object.keys(states)) {
    if (/pracovna_teplomer|loznice_teplomer_loznice_pm2_5|maxik_teplomer_maxik_pm2_5/.test(id)) {
      states[id].last_updated = iso(3 * HOUR);
      states[id].last_changed = iso(3 * HOUR);
    }
  }
}
if (scenario === "moving") {
  states["cover.loznice_zaluzie_loznice"].state = "closing";
}

/** 2 h of samples ending at the current value (the 24 h chart reuses them). */
function series(value) {
  return Array.from({ length: 13 }, (_, i) => ({
    s: String(+(value * 0.97 + (value * 0.03 * i) / 12).toFixed(1)),
    lu: (now - 2 * HOUR + i * 10 * 60_000) / 1000,
  }));
}

const test = { services: [], haptics: [], moreInfo: [], actions: [], states, config };
window.__test = test;
window.addEventListener("haptic", (event) => test.haptics.push(event.detail));
window.addEventListener("hass-more-info", (event) => test.moreInfo.push(event.detail.entityId));
// Home Assistant handles "hass-action" (navigate, url) in the app root.
window.addEventListener("hass-action", (event) => test.actions.push(event.detail));

// Like Home Assistant: the frontend reports the dark mode in effect (?theme=light for the light one).
const light = params.get("theme") === "light";
if (light) {
  // Home Assistant's default light theme around the card.
  document.documentElement.style.background = "#fafafa";
  document.body.style.background = "#fafafa";
  document.body.style.color = "#212121";
  document.body.style.setProperty("--primary-text-color", "#212121");
  document.body.style.setProperty("--secondary-text-color", "#727272");
}

// Like Home Assistant: the language of the user profile, also set on <html lang>.
const language = params.has("lang") ? params.get("lang") : "cs";
document.documentElement.lang = language;

const hass = {
  states,
  themes: { darkMode: !light },
  // Registered actions: Tado CE offers the timer (?timer=none: an installation without it).
  services: params.get("timer") === "none" ? {} : { tado_ce: { set_climate_timer: {}, resume_schedule: {} } },
  ...(language ? { language, locale: { language } } : {}),
  callService: async (...args) => {
    if (test.failNext) {
      test.failNext = false;
      throw new Error("service failed");
    }
    test.services.push(args);
  },
  callWS: async (message) =>
    Object.fromEntries(
      message.entity_ids.map((id) => {
        const override = test.historyFor?.(id);
        if (override) return [id, override];
        const value = Number(states[id]?.state);
        return [id, Number.isFinite(value) ? series(value) : [{ s: states[id]?.state ?? "unknown", lu: (now - 20 * HOUR) / 1000 }]];
      }),
    ),
  callApi: async (_method, path) => {
    if (scenario === "rest-error") throw new Error("403");
    const id = path.replace("states/", "");
    const ago = scenario === "stale" && /pracovna|loznice_teplomer_loznice_pm2_5|maxik_teplomer_maxik_pm2_5/.test(id) ? 3 * HOUR : 60_000;
    return { last_reported: iso(ago), last_updated: iso(Math.max(ago, 3 * 60_000)) };
  },
};

const card = document.createElement("ha-klima-dashboard");
card.setConfig(config);
card.hass = hass;
test.card = card;
document.querySelector("main").append(card);

/** Replace entity states like a Home Assistant push: new objects, so the card sees a change. */
let current = hass;
test.update = (changes) => {
  const next = { ...current, states: { ...current.states } };
  for (const [id, entity] of Object.entries(changes)) {
    next.states[id] = { ...entity, last_updated: new Date().toISOString(), last_changed: new Date().toISOString() };
  }
  current = next;
  card.hass = next;
};
/** Home Assistant switching between its dark and light mode (theme "Auto" follows the system). */
test.setDarkMode = (dark) => {
  current = { ...current, themes: { darkMode: dark } };
  card.hass = current;
};
/** A frontend that does not report its dark mode: the card follows the system colour scheme. */
test.dropThemes = () => {
  const { themes: _themes, ...rest } = current;
  current = rest;
  card.hass = current;
};
/** Home Assistant switching its language (user profile) without reloading the page. */
test.setLanguage = (tag) => {
  document.documentElement.lang = tag;
  current = { ...current, language: tag, locale: { ...current.locale, language: tag } };
  card.hass = current;
};
/** The user changing the formats of numbers, time or dates in the profile of Home Assistant. */
test.setLocale = (changes) => {
  current = { ...current, locale: { ...current.locale, ...changes } };
  card.hass = current;
};
/** A blind reporting its state, position and tilt. */
test.cover = (entityId, value, position, tilt) =>
  test.update({ [entityId]: state(value, { current_position: position, current_tilt_position: tilt }, 0) });
