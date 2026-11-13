import type { Texts } from "../i18n";

/*
 * Swedish texts of the card, for Home Assistant in Swedish (CURRENT_SPEC.md, Jazyky). The keys
 * follow cs.ts, the source.
 */

const plural = (count: number, one: string, other: string): string => (count === 1 ? one : other);

export const sv: Texts = {
  cardDescription: "Översikt över temperatur, luftkvalitet, värme och persienner i rummen.",

  status: {
    polluted: "Förorenad luft",
    veryStuffy: "Mycket instängd luft",
    stuffy: "Instängd luft",
    humid: "Fuktigt",
    dry: "Torrt",
    warm: "Varmt",
    cold: "Kyligt",
    comfortable: "Behagligt",
  },
  required: { temperature: "temperatur", humidity: "luftfuktighet", co2: "CO₂", pm25: "PM2.5", houseMode: "husläge" },
  noData: (what, age) => `Inga data · ${what}${age === undefined ? "" : ` (för ${age} sedan)`}`,
  lastSeen: (age) => `Senaste rapport för ${age} sedan`,

  outsideAir: "Utomhusluft:",
  airLevel: { good: "bra", moderate: "måttlig", poor: "dålig" },
  summary: "Sammanfattning av hemmet",

  temperatureLabel: (room, value, stale, history) =>
    `${room}: temperatur ${value === undefined ? "okänd" : `${value} °C`}${stale}, rumshistorik för ${history}`,
  humidityLabel: (room, value, stale) => `${room}: luftfuktighet ${value ?? "okänd"}${stale}, detaljer och historik`,
  temperatureTrendLabel: (room, period, direction, history) =>
    `${room}: temperaturen${direction ? ` ${direction}` : ""} under ${period}, rumshistorik för ${history}`,
  link: { page: "Öppnar rummets sida.", web: "Öppnar länken." },

  airSensor: (label, value, trend, stale) => `${label} ${value ?? "okänt"}${trend ? `, ${trend}` : ""}${stale}`,
  airDescription: (room, sensors, period) =>
    `${room}: luftkvalitet, ${sensors || "ingen sensor"}. Öppnar diagrammet för ${period}.`,
  unknownValue: "okänt",
  trend: { rising: "stiger", falling: "sjunker", stable: "stabil" },
  trendOver: (direction, period) => `${direction} under ${period}`,

  system: { heating: "Värme", climate: "Luftkonditionering" },
  heatingMode: { schedule: "Schema", manual: "Manuell", off: "Av", boost: "Boost" },
  climateMode: {
    off: "Av",
    cool: "Kyla",
    wind_free: "WindFree",
    dry: "Avfuktning",
    fan: "Fläkt",
    heat: "Värme",
    auto: "Auto",
    unknown: "––",
  },
  unknownState: "okänt läge",
  hvacDescription: (room, systems, target) =>
    `${room}: ${systems}.${target ? ` Öppnar styrningen av ${target === "heating" ? "värmen" : "luftkonditioneringen"}.` : ""}`,

  window: {
    open: "Öppet",
    openCount: (count) => `${count} öppna`,
    closed: "Stängt",
    defaultName: (number) => `Fönster ${number}`,
    popup: "Fönster",
    spokenSingle: (state, duration) =>
      state === "unknown"
        ? "fönstrets läge okänt"
        : state === "closed"
          ? "fönstret stängt"
          : `fönstret öppet${duration === undefined ? "" : ` i ${duration}`}`,
    spokenOneOpen: (name, duration) => `fönstret ${name} öppet${duration === undefined ? "" : ` i ${duration}`}`,
    spokenManyOpen: (names, duration) => `fönstren ${names} öppna${duration === undefined ? "" : `, längst i ${duration}`}`,
    spokenAllClosed: "alla fönster stängda",
    spokenUnknown: "fönstrens läge okänt",
    conflict: { heating: "öppet fönster under uppvärmning", cooling: "öppet fönster under kylning" },
    description: (room, spoken, conflict, multiple) =>
      `${room}: ${spoken}${conflict ? `; konflikt: ${conflict}` : ""}. ${multiple ? "Öppnar fönsteröversikten." : "Öppnar detaljer och historik."}`,
  },

  cover: {
    label: (room, state, moving) => `${room}: persienn, ${state}${moving ? ", rör sig" : ""}. Öppnar styrningen.`,
    position: (position, tilt) => `position ${position} %, lutning ${tilt} %`,
    unknown: "position eller lutning okänd",
    presets: (room) => `${room}: förval för persiennen`,
    preset: (room, name, description, available) =>
      `${room}: persiennförval ${name}, ${description}. ${
        available ? "Dubbeltryck eller håll in för att köra det." : "Persiennen är inte tillgänglig."
      }`,
    presetName: { open: "Dag", shade: "Skugga", dark: "Mörker" },
    presetDescription: { open: "uppdragen", shade: "nerdragen, lamellerna öppna", dark: "full mörkläggning" },
    hint: "Håll in eller dubbeltryck",
    unavailable: "Persiennen är inte tillgänglig",
    /** Short text of the bubble at the button; `failed` is the full sentence for screen readers. */
    failedHint: "Kunde inte skickas",
    failed: (room) => `${room}: persiennskriptet kunde inte startas.`,
  },

  climatePopup: {
    rooms: "Rum",
    temperature: "Måltemperatur",
    mode: "Läge",
    modes: { plan: "Schema", manual: "Manuellt", boost: "Boost", off: "Av", cool: "Kylning", wind_free: "WindFree", heat: "Värme", fan_only: "Fläkt", dry: "Avfuktning", auto: "Auto", sleep: "Sömn" },
    unavailable: "Ej tillgänglig",
    now: (parts) => `Nu ${parts}`,
    heats: "värmer",
    targets: (parts) => `Mål: ${parts}`,
    mixedModes: (parts) => `Olika lägen: ${parts}`,
    firstChange: "Första ändringen ställer alla valda rum lika.",
    manualFor: "Manuellt gäller",
    manualForChoices: { next: "Till schemat", "30": "30 min", "60": "1 h", "180": "3 h", forever: "Alltid" },
    offAfter: "Stäng av om",
    offAfterChoices: { "0": "Aldrig", "60": "1 h", "180": "3 h", "480": "8 h" },
    untilNextPlan: "Till nästa ändring i schemat, sedan tillbaka till schemat.",
    untilTime: (time) => `Till ${time}, sedan tillbaka till schemat.`,
    untilChanged: "Gäller tills du ändrar det.",
    runsUntilOff: "Går tills du stänger av den.",
    offAt: (time) => `Går till ${time}, stängs sedan av.`,
    fan: "Fläkthastighet",
    swing: "Luftriktning",
    fanModes: { auto: "Auto", low: "Låg", medium: "Medel", high: "Hög", turbo: "Turbo", quiet: "Tyst" },
    swingModes: { off: "Fast", vertical: "Vertikalt", horizontal: "Horisontellt", both: "Båda" },
    detail: "Detaljer och historik",
    sending: "Skickar",
    failed: "Det gick inte",
  },
  sheet: {
    hvac: "Värme och luftkonditionering",
    close: "Stäng",
    history: (hours) => `Rumshistorik – ${hours} h`,
    systems: "System",
    commandFailed: "Kommandot kunde inte skickas.",
    loading: "Läser in historik…",
    historyFailed: "Historiken kunde inte läsas in.",
    noHistory: (hours) => `Inga data för ${hours === 1 ? "den senaste timmen" : `de senaste ${hours} timmarna`}.`,
    chart: (period) =>
      `Diagram över ${period}. Vänster- och högerpilen flyttar i tiden, End-tangenten går tillbaka till nu.`,
  },

  chart: {
    now: "Nu",
    yesterday: "igår",
  },

  summaryChips: {
    rooms: (count) => `${count} rum`,
    conflict: {
      "window-heating": "Fönster öppet · värme på",
      "window-cooling": "Fönster öppet · kyla på",
      "cooling-cold": "Kyler fast det är kyligt",
    },
    conflictSpoken: {
      "window-heating": "Konflikt: ett fönster är öppet medan värmen är på",
      "window-cooling": "Konflikt: ett fönster är öppet medan kylan är på",
      "cooling-cold": "Konflikt: kyler fast det är kyligt",
    },
    windowsOpen: (count) => `${count} fönster ${plural(count, "öppet", "öppna")}`,
    windowsSpoken: "Öppna fönster",
    manual: "Manuell",
    boost: "Boost",
    boostSpoken: "Värme i boost",
    manualSpoken: "Värme i manuellt läge",
    heating: (rooms) => `Värme i ${rooms}`,
    heatingSpoken: "Värme på",
    climate: "Luftkonditionering",
    climateSpoken: "Luftkonditionering på",
    ventilation: "Ventilationsläge",
    ventilationSpoken: "På. Öppnar detaljer och låter dig avsluta.",
    ventilationOffSpoken: "Av. Öppnar senaste ventilationen.",
  },

  ventilation: {
    title: "Ventilationsläge",
    running: "Pågår",
    endsBy: "Slutar senast",
    end: "Avsluta",
    ending: "Avslutar…",
    ended: "Ventilationsläget har avslutats.",
    last: "Senaste ventilationen",
    never: "Ingen ventilation än.",
    closable: "fönstren kan stängas",
    done: "klart",
    quantity: { co2: "CO₂ ppm", temperature: "Temperatur °C", humidity: "Fuktighet g/m³" },
    before: "Före",
    after: "Efter",
    settledAfter: (minutes) => `Efter ${minutes} min`,
    settledShort: (minutes) => `+${minutes} min`,
    windowClosed: "fönstret stängt",
    roomSpoken: (room, parts) => `${room}: ${parts}`,
    lineSpoken: (label, values) => `${label}: ${values}`,
  },

  duration: {
    lessThanMinute: "mindre än en minut",
    minute: (count) => `${count} ${plural(count, "minut", "minuter")}`,
    hour: (count) => `${count} ${plural(count, "timme", "timmar")}`,
    day: (count) => `${count} ${plural(count, "dag", "dagar")}`,
  },
  /** A period in its definite form: "de senaste 2 timmarna", "den senaste timmen". */
  period: {
    minute: (count) => (count === 1 ? "den senaste minuten" : `de senaste ${count} minuterna`),
    hour: (count) => (count === 1 ? "den senaste timmen" : `de senaste ${count} timmarna`),
  },
};
