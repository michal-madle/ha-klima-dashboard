// Test scenarios for the Klima Dashboard card: a configuration and a fake `hass` object.
// Open /tests/harness.html?s=<scenario>. The "real" scenario uses the configuration of
// examples/domov_prototyp_loznice.yaml (a test checks that the entity IDs match).
import "/ha-klima-dashboard.js";

const params = new URLSearchParams(location.search);
const scenario = params.get("s") ?? "full";
const now = Date.now();
const HOUR = 3_600_000;
const iso = (msAgo) => new Date(now - msAgo).toISOString();

const ROOMS = [
  { name: "Ložnice", slug: "loznice", sensors: ["temperature", "humidity", "carbon_dioxide", "pm2_5"], cover: true },
  { name: "Pracovna", slug: "pracovna", sensors: ["temperature", "humidity"], cover: true },
  { name: "Maxík", slug: "maxik", sensors: [], cover: true },
  { name: "Mikuláš", slug: "mikulas", sensors: [], cover: true },
  { name: "Obývák", slug: "obyvak", sensors: [], cover: false, window: "binary_sensor.obyvak_dvere_zahrada" },
];
const ALL_SENSORS = ["temperature", "humidity", "carbon_dioxide", "pm2_5"];
const CONFIG_KEY = { temperature: "temperature", humidity: "humidity", carbon_dioxide: "carbon_dioxide", pm2_5: "pm25" };

/** Card configuration; "real" keeps only the sensors of the example YAML. */
export function buildConfig(name) {
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
    for (const sensor of name === "real" ? room.sensors : ALL_SENSORS) {
      config[CONFIG_KEY[sensor]] = `sensor.${room.slug}_teplomer_${room.slug}_${sensor}`;
    }
    return config;
  });
  if (name === "longnames") {
    rooms[0].name = "Ložnice pro hosty";
    rooms[4].name = "Obývací pokoj";
  }
  return { type: "custom:ha-klima-dashboard", house_mode_entity: "input_select.house_mode", rooms };
}

const config = buildConfig(scenario);
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
  states[room.window] = state(index === 1 ? "on" : "off");
  if (room.cover) {
    states[room.cover] = state("open", {
      current_position: [0, 100, 40, 0][index],
      current_tilt_position: [0, 100, 60, 100][index],
    });
  }
  const heating = room.heating;
  states[heating.climate] = state("auto", { hvac_modes: ["off", "auto", "heat"], preset_modes: ["none", "boost"], preset_mode: "none" });
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
    states[room.window].state = "on";
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
  // In Home Assistant last_updated is never newer than last_reported.
  for (const id of Object.keys(states)) {
    if (/pracovna_teplomer|loznice_teplomer_loznice_pm2_5/.test(id)) {
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

const test = { services: [], haptics: [], moreInfo: [], states, config };
window.__test = test;
window.addEventListener("haptic", (event) => test.haptics.push(event.detail));
window.addEventListener("hass-more-info", (event) => test.moreInfo.push(event.detail.entityId));

const hass = {
  states,
  callService: async (...args) => {
    test.services.push(args);
  },
  callWS: async (message) =>
    Object.fromEntries(
      message.entity_ids.map((id) => {
        const value = Number(states[id]?.state);
        return [id, Number.isFinite(value) ? series(value) : [{ s: states[id]?.state ?? "unknown", lu: (now - 20 * HOUR) / 1000 }]];
      }),
    ),
  callApi: async (_method, path) => {
    if (scenario === "rest-error") throw new Error("403");
    const id = path.replace("states/", "");
    const ago = scenario === "stale" && /pracovna|loznice_teplomer_loznice_pm2_5/.test(id) ? 3 * HOUR : 60_000;
    return { last_reported: iso(ago), last_updated: iso(Math.max(ago, 3 * 60_000)) };
  },
};

const card = document.createElement("ha-klima-dashboard");
card.setConfig(config);
card.hass = hass;
test.card = card;
document.querySelector("main").append(card);
