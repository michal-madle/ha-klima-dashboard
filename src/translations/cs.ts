/*
 * Czech texts of the card: the source of all three languages (CURRENT_SPEC.md, Jazyky). The
 * English (en.ts) and Swedish (sv.ts) dictionaries have exactly the same keys, which the build
 * checks; a change here belongs into both of them in the same commit. Texts from the YAML
 * (title, room, window and preset names) are never translated.
 */

/** Czech plural: 1 okno, 2–4 okna, 0 and 5 or more oken. */
const plural = (count: number, one: string, few: string, many: string): string =>
  count === 1 ? one : count >= 2 && count <= 4 ? few : many;

export const cs = {
  /** Heading without `title` in the YAML. */
  title: "Domov",
  /** Card picker of Home Assistant. */
  cardDescription: "Přehled teploty, kvality vzduchu, vytápění a žaluzií v místnostech.",

  // Room status (Stavový systém, Chybějící data)
  status: {
    polluted: "Znečištěný vzduch",
    veryStuffy: "Silně vydýchaný vzduch",
    stuffy: "Vydýchaný vzduch",
    humid: "Vlhko",
    dry: "Sucho",
    warm: "Teplo",
    cold: "Chladno",
    comfortable: "Příjemné",
  },
  /** The first missing value, named in "Bez dat · …". */
  required: { temperature: "teplota", humidity: "vlhkost", co2: "CO₂", pm25: "PM2.5", houseMode: "režim domu" },
  noData: (what: string, age?: string) => `Bez dat · ${what}${age === undefined ? "" : ` (před ${age})`}`,
  /** A stale value: tooltip, and lower-case at the end of its spoken text ("45 min", "2 h"). */
  lastSeen: (age: string) => `Naposledy před ${age}`,

  // Header (Dashboard Domov)
  outsideAir: "Vzduch venku:",
  airLevel: { good: "dobrý", moderate: "zhoršený", poor: "špatný" },
  summary: "Souhrn domu",

  // Room card: temperature, humidity, link (Room Card)
  temperatureLabel: (room: string, value: string | undefined, stale: string, history: string) =>
    `${room}: teplota ${value === undefined ? "neznámá" : `${value} °C`}${stale}, historie místnosti za ${history}`,
  humidityLabel: (room: string, value: string | undefined, stale: string) =>
    `${room}: vlhkost ${value ?? "neznámá"}${stale}, detail a historie`,
  /** Temperature trend button: "Ložnice: teplota za 2 hodiny stoupá, historie místnosti za 24 hodin". */
  temperatureTrendLabel: (room: string, period: string, direction: string | undefined, history: string) =>
    `${room}: teplota za ${period}${direction ? ` ${direction}` : ""}, historie místnosti za ${history}`,
  link: { page: "Otevře stránku místnosti.", web: "Otevře odkaz." },

  // CO₂ and PM2.5
  air: "Kvalita vzduchu",
  /** "CO₂ 656 ppm, za 2 hodiny stoupá, naposledy před 2 h". */
  airSensor: (label: string, value: string | undefined, trend: string | undefined, stale: string) =>
    `${label} ${value ?? "neznámé"}${trend ? `, ${trend}` : ""}${stale}`,
  airDescription: (room: string, sensors: string, popup: boolean) =>
    `${room}: kvalita vzduchu, ${sensors || "bez čidla"}. ${popup ? "Otevře detaily." : "Otevře detail a historii."}`,
  detailsAndHistory: "Detail a historie",
  /** A value that is not known, for screen readers ("––" on screen). */
  unknownValue: "neznámé",
  trend: { rising: "stoupá", falling: "klesá", stable: "stabilní" },
  /** Direction of a micro trend over its period: "za 2 hodiny stoupá". */
  trendOver: (direction: string, period: string) => `za ${period} ${direction}`,

  // Topení and Klimatizace (Ovládání Topení a Klimatizace)
  system: { heating: "Topení", climate: "Klimatizace" },
  heatingMode: { schedule: "Plán", manual: "Ručně", off: "Vypnuto", boost: "Boost" },
  climateMode: {
    off: "Vypnuto",
    cool: "Chlazení",
    wind_free: "WindFree",
    dry: "Sušení",
    fan: "Větrání",
    heat: "Topení",
    auto: "Auto",
    unknown: "––",
  },
  /** A system row without data, for screen readers. */
  unknownState: "neznámý stav",
  /** "Ložnice: Topení Plán 21 °C, Klimatizace Vypnuto. Otevře ovládání Topení." */
  hvacDescription: (room: string, systems: string, target: "heating" | "climate" | undefined) =>
    `${room}: ${systems}.${target ? ` Otevře ovládání ${target === "heating" ? "Topení" : "Klimatizace"}.` : ""}`,

  // Window (Vizuální pravidla)
  window: {
    open: "Otevřeno",
    /** Two or more windows of the room are open. */
    openCount: (count: number) => `Otevřena ${count}`,
    closed: "Zavřeno",
    /** Name in the "Okna" popup of a window without `name` in the YAML. */
    defaultName: (number: number) => `Okno ${number}`,
    popup: "Okna",
    spokenSingle: (state: "open" | "closed" | "unknown", duration: string | undefined) =>
      state === "unknown"
        ? "okno neznámé"
        : `okno ${state === "open" ? "otevřené" : "zavřené"}${duration === undefined ? "" : `, otevřené ${duration}`}`,
    spokenOneOpen: (name: string, duration: string | undefined) =>
      `okno ${name} otevřené${duration === undefined ? "" : ` ${duration}`}`,
    spokenManyOpen: (names: string, duration: string | undefined) =>
      `otevřená okna ${names}${duration === undefined ? "" : `, nejdéle ${duration}`}`,
    spokenAllClosed: "všechna okna zavřená",
    spokenUnknown: "stav oken neznámý",
    conflict: { heating: "otevřené okno při topení", cooling: "otevřené okno při chlazení" },
    description: (room: string, spoken: string, conflict: string | undefined, multiple: boolean) =>
      `${room}: ${spoken}${conflict ? `; konflikt: ${conflict}` : ""}. ${multiple ? "Otevře přehled oken." : "Otevře detail a historii."}`,
  },

  // Blind and its presets (Žaluzie)
  cover: {
    label: (room: string, state: string, moving: boolean) =>
      `${room}: žaluzie, ${state}${moving ? ", pohybuje se" : ""}. Otevřít ovládání.`,
    position: (position: number, tilt: number) => `poloha ${position} %, naklopení ${tilt} %`,
    unknown: "poloha nebo naklopení neznámé",
    presets: (room: string) => `${room}: předvolby žaluzií`,
    preset: (room: string, name: string, description: string, available: boolean) =>
      `${room}: žaluzie ${name}, ${description}. ${
        available ? "Spustí se dvojitým klepnutím nebo dlouhým stiskem." : "Žaluzie je nedostupná."
      }`,
    /** Name and description of a preset without them in the YAML, by its icon. */
    presetName: { open: "Den", shade: "Stín", dark: "Tma" },
    presetDescription: { open: "vytaženo nahoru", shade: "spuštěno, lamely otevřené", dark: "úplné zatemnění" },
    hint: "Podržte nebo klepněte dvakrát",
    unavailable: "Žaluzie je nedostupná",
    /** Short text of the bubble at the button; `failed` is the full sentence for screen readers. */
    failedHint: "Nepodařilo se odeslat",
    failed: (room: string) => `${room}: skript žaluzií se nepodařilo spustit.`,
  },

  // Popups (Detail místnosti, Ovládání Topení a Klimatizace)
  sheet: {
    close: "Zavřít",
    history: (hours: number) => `Historie místnosti – ${hours} h`,
    entityUnavailable: "Entita je nedostupná.",
    noModes: "Entita neuvádí podporované režimy.",
    modes: (system: string) => `${system}: režim`,
    presets: "Předvolby",
    systems: "Systém",
    notOffered: "entita nenabízí",
    commandFailed: "Příkaz se nepodařilo odeslat.",
    loading: "Načítám historii…",
    historyFailed: "Historii se nepodařilo načíst.",
    noHistory: (hours: number) =>
      `Za ${hours === 1 ? "poslední hodinu" : hours >= 2 && hours <= 4 ? `poslední ${hours} hodiny` : `posledních ${hours} hodin`} nejsou k dispozici data.`,
    chart: (period: string) =>
      `Graf za ${period}. Šipkami vlevo a vpravo procházíte čas, klávesou End se vrátíte na teď.`,
    temperatureDetails: "Detail teploty",
  },

  // Room history chart (Historie a grafy)
  chart: {
    now: "Teď",
    yesterday: "včera",
  },

  // House summary chips (Dashboard Domov, Konflikty)
  summaryChips: {
    rooms: (count: number) => `${count} ${plural(count, "místnost", "místnosti", "místností")}`,
    conflict: {
      "window-heating": "Okno otevřené · topí se",
      "window-cooling": "Okno otevřené · chladí se",
      "cooling-cold": "Chladí se, i když je chladno",
    },
    conflictSpoken: {
      "window-heating": "Konflikt: Okno je otevřené a topí se",
      "window-cooling": "Konflikt: Okno je otevřené a chladí se",
      "cooling-cold": "Konflikt: Chladí se, i když je chladno",
    },
    windowsOpen: (count: number) => `${count} ${plural(count, "okno otevřené", "okna otevřená", "oken otevřených")}`,
    windowsSpoken: "Otevřená okna",
    manual: "Ručně",
    manualSpoken: "Topení ručně",
    heating: (rooms: string) => `Topí ${rooms}`,
    heatingSpoken: "Topí se",
    climate: "Klimatizace",
    climateSpoken: "Klimatizace zapnutá",
  },

  // Durations and periods for screen readers
  duration: {
    lessThanMinute: "méně než minutu",
    minute: (count: number) => `${count} ${plural(count, "minuta", "minuty", "minut")}`,
    hour: (count: number) => `${count} ${plural(count, "hodina", "hodiny", "hodin")}`,
    day: (count: number) => `${count} ${plural(count, "den", "dny", "dní")}`,
  },
  /** A period after "za" (accusative): "2 hodiny", "1 hodinu", "24 hodin", "90 minut". */
  period: {
    minute: (count: number) => `${count} ${plural(count, "minutu", "minuty", "minut")}`,
    hour: (count: number) => `${count} ${plural(count, "hodinu", "hodiny", "hodin")}`,
  },
};
