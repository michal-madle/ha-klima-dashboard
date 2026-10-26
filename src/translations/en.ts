import type { Texts } from "../i18n";

/*
 * English texts of the card, for Home Assistant in English and in every language other than
 * Czech and Swedish (CURRENT_SPEC.md, Jazyky). The keys follow cs.ts, the source.
 */

const plural = (count: number, one: string, other: string): string => (count === 1 ? one : other);

export const en: Texts = {
  title: "Home",
  cardDescription: "Temperature, air quality, heating and blinds of your rooms at a glance.",

  status: {
    polluted: "Polluted air",
    veryStuffy: "Very stuffy air",
    stuffy: "Stuffy air",
    humid: "Humid",
    dry: "Dry",
    warm: "Warm",
    cold: "Chilly",
    comfortable: "Comfortable",
  },
  required: { temperature: "temperature", humidity: "humidity", co2: "CO₂", pm25: "PM2.5", houseMode: "house mode" },
  noData: (what, age) => `No data · ${what}${age === undefined ? "" : ` (${age} ago)`}`,
  lastSeen: (age) => `Last report ${age} ago`,

  outsideAir: "Outdoor air:",
  airLevel: { good: "good", moderate: "moderate", poor: "poor" },
  summary: "Home summary",

  temperatureLabel: (room, value, stale, history) =>
    `${room}: temperature ${value === undefined ? "unknown" : `${value} °C`}${stale}, room history for ${history}`,
  humidityLabel: (room, value, stale) => `${room}: humidity ${value ?? "unknown"}${stale}, details and history`,
  temperatureTrendLabel: (room, period, direction, history) =>
    `${room}: temperature${direction ? ` ${direction}` : ""} over ${period}, room history for ${history}`,
  link: { page: "Opens the room page.", web: "Opens the link." },

  air: "Air quality",
  airSensor: (label, value, trend, stale) => `${label} ${value ?? "unknown"}${trend ? `, ${trend}` : ""}${stale}`,
  airDescription: (room, sensors, popup) =>
    `${room}: air quality, ${sensors || "no sensor"}. ${popup ? "Opens details." : "Opens details and history."}`,
  detailsAndHistory: "Details and history",
  unknownValue: "unknown",
  trend: { rising: "rising", falling: "falling", stable: "stable" },
  trendOver: (direction, period) => `${direction} over ${period}`,

  system: { heating: "Heating", climate: "Air conditioning" },
  heatingMode: { schedule: "Schedule", manual: "Manual", off: "Off", boost: "Boost" },
  climateMode: {
    off: "Off",
    cool: "Cooling",
    wind_free: "WindFree",
    dry: "Dry",
    fan: "Fan",
    heat: "Heating",
    auto: "Auto",
    unknown: "––",
  },
  unknownState: "unknown state",
  hvacDescription: (room, systems, target) =>
    `${room}: ${systems}.${target ? ` Opens the ${target === "heating" ? "heating" : "air conditioning"} controls.` : ""}`,

  window: {
    open: "Open",
    openCount: (count) => `${count} open`,
    closed: "Closed",
    defaultName: (number) => `Window ${number}`,
    popup: "Windows",
    spokenSingle: (state, duration) =>
      state === "unknown"
        ? "window state unknown"
        : state === "closed"
          ? "window closed"
          : `window open${duration === undefined ? "" : ` for ${duration}`}`,
    spokenOneOpen: (name, duration) => `window ${name} open${duration === undefined ? "" : ` for ${duration}`}`,
    spokenManyOpen: (names, duration) =>
      `windows ${names} open${duration === undefined ? "" : `, the longest for ${duration}`}`,
    spokenAllClosed: "all windows closed",
    spokenUnknown: "state of the windows unknown",
    conflict: { heating: "window open while heating", cooling: "window open while cooling" },
    description: (room, spoken, conflict, multiple) =>
      `${room}: ${spoken}${conflict ? `; conflict: ${conflict}` : ""}. ${multiple ? "Opens the window overview." : "Opens details and history."}`,
  },

  cover: {
    label: (room, state, moving) => `${room}: blind, ${state}${moving ? ", moving" : ""}. Opens the controls.`,
    position: (position, tilt) => `position ${position}%, tilt ${tilt}%`,
    unknown: "position or tilt unknown",
    presets: (room) => `${room}: blind presets`,
    preset: (room, name, description, available) =>
      `${room}: blind preset ${name}, ${description}. ${available ? "Double-tap or hold to run it." : "The blind is unavailable."}`,
    presetName: { open: "Day", shade: "Shade", dark: "Dark" },
    presetDescription: { open: "raised", shade: "lowered, slats open", dark: "full blackout" },
    hint: "Hold or double-tap",
    unavailable: "The blind is unavailable",
    /** Short text of the bubble at the button; `failed` is the full sentence for screen readers. */
    failedHint: "Could not send",
    failed: (room) => `${room}: the blind script could not be started.`,
  },

  sheet: {
    close: "Close",
    history: (hours) => `Room history – ${hours} h`,
    entityUnavailable: "The entity is unavailable.",
    noModes: "The entity lists no supported modes.",
    modes: (system) => `${system}: mode`,
    presets: "Presets",
    systems: "System",
    notOffered: "not offered by the entity",
    commandFailed: "The command could not be sent.",
    heatControl: {
      temperature: "Temperature",
      fixedTemperature: "Fixed temperature",
      temperatureSlider: "Target temperature",
      duration: "For how long",
      durationSlider: "Duration",
      nextPlan: "Until the next schedule change",
      untilResumed: "Until you resume the schedule",
      until: (time) => `until ${time}`,
      offTarget: "Frost protection (5 °C)",
      appliesOnClose: "Applied when you close this window",
      remaining: (time) => `${time} left`,
      noTimer: "The duration cannot be set: Tado CE offers no timer.",
    },
    loading: "Loading history…",
    historyFailed: "The history could not be loaded.",
    noHistory: (hours) => `No data for ${hours === 1 ? "the last hour" : `the last ${hours} hours`}.`,
    chart: (period) =>
      `Chart of ${period}. The left and right arrow keys move through time, the End key returns to now.`,
    temperatureDetails: "Temperature details",
  },

  chart: {
    now: "Now",
    yesterday: "yesterday",
  },

  summaryChips: {
    rooms: (count) => `${count} ${plural(count, "room", "rooms")}`,
    conflict: {
      "window-heating": "Window open · heating on",
      "window-cooling": "Window open · cooling on",
      "cooling-cold": "Cooling although chilly",
    },
    conflictSpoken: {
      "window-heating": "Conflict: a window is open while heating",
      "window-cooling": "Conflict: a window is open while cooling",
      "cooling-cold": "Conflict: cooling although it is chilly",
    },
    windowsOpen: (count) => `${count} ${plural(count, "window", "windows")} open`,
    windowsSpoken: "Open windows",
    manual: "Manual",
    boost: "Boost",
    boostSpoken: "Heating in boost",
    manualSpoken: "Heating set manually",
    heating: (rooms) => `Heating in ${rooms}`,
    heatingSpoken: "Heating",
    climate: "Air conditioning",
    climateSpoken: "Air conditioning on",
  },

  duration: {
    lessThanMinute: "less than a minute",
    minute: (count) => `${count} ${plural(count, "minute", "minutes")}`,
    hour: (count) => `${count} ${plural(count, "hour", "hours")}`,
    day: (count) => `${count} ${plural(count, "day", "days")}`,
  },
  /** A period with its article: "the last 2 hours", "the last hour", "the last 90 minutes". */
  period: {
    minute: (count) => (count === 1 ? "the last minute" : `the last ${count} minutes`),
    hour: (count) => (count === 1 ? "the last hour" : `the last ${count} hours`),
  },
};
