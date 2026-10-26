import type { I18n } from "./i18n";
import type { EntityId, HassEntity, Room } from "./types";
import { climateView, heatingView } from "./systems";
import { COLORS } from "./utils";

export type SummaryKind = "windows" | "manual" | "boost" | "heating" | "climate" | "conflict-window" | "conflict-cooling";

/** One status chip in the Domov header (CURRENT_SPEC.md, Dashboard Domov), in the card language. */
export interface SummaryChip {
  kind: SummaryKind;
  text: string;
  color: string;
  /** Full sentence with room names for screen readers and the tooltip. */
  spoken: string;
  /** Heating chip only: waves (1–3) of the strongest heating room, as in that room's row. */
  waves?: number;
}

/** Up to two room names, otherwise a count ("Ložnice, Pracovna" / "3 místnosti"). */
function namesOrCount(names: string[], i18n: I18n): string {
  return names.length <= 2 ? names.join(", ") : i18n.t.summaryChips.rooms(names.length);
}

/** What contradicts what in a room (CURRENT_SPEC.md, Konflikty): never a room status, never an alarm. */
export type RoomConflict = "window-heating" | "window-cooling" | "cooling-cold";

/** The windows of a room that are open now (state "on"); unknown windows are never counted. */
export function openWindows(
  room: Room,
  get: (entityId: EntityId | undefined) => HassEntity | undefined,
): Room["windows"] {
  return room.windows.filter((window) => get(window.entity)?.state.toLowerCase() === "on");
}

/** Topení of a room as shown on the card (the room's own wave bands). */
export function roomHeating(room: Room, get: (entityId: EntityId | undefined) => HassEntity | undefined, i18n: I18n) {
  return heatingView(
    get(room.heating?.climate),
    get(room.heating?.overlay),
    get(room.heating?.target),
    get(room.heating?.intensity),
    room.thresholds,
    i18n,
  );
}

/**
 * Conflicts of one room: a window is open while it heats (Topení has at least one wave, or the
 * air conditioner heats) or cools (cool / WindFree), or it cools although the room is "Chladno".
 * An open window with cooling is reported once (not also as "cooling although cold"). Unknown
 * states are never a conflict. A room with several windows is open when any of them is.
 */
export function roomConflicts(
  room: Room,
  get: (entityId: EntityId | undefined) => HassEntity | undefined,
  cold: boolean,
  i18n: I18n,
): RoomConflict[] {
  const open = openWindows(room, get).length > 0;
  const heat = roomHeating(room, get, i18n);
  const mode = room.air_conditioner ? climateView(get(room.air_conditioner), i18n).mode : "unknown";
  const heating = (!heat.unknown && heat.waves > 0) || mode === "heat";
  const cooling = mode === "cool" || mode === "wind_free";

  const conflicts: RoomConflict[] = [];
  if (open && heating) {
    conflicts.push("window-heating");
  }
  if (open && cooling) {
    conflicts.push("window-cooling");
  } else if (cooling && cold) {
    conflicts.push("cooling-cold");
  }
  return conflicts;
}

/**
 * Chips only for what differs from a quiet house: conflicts first (orange), then open windows,
 * manual heating overrides and Boost (one chip each), rooms that are heating now (at least one wave) and running air
 * conditioners. Unknown states are never counted. `coldRooms` are the rooms whose status is
 * "Chladno".
 */
export function houseSummary(
  roomList: Room[],
  get: (entityId: EntityId | undefined) => HassEntity | undefined,
  coldRooms: ReadonlySet<string>,
  i18n: I18n,
): SummaryChip[] {
  const texts = i18n.t.summaryChips;
  const conflicts: Record<RoomConflict, string[]> = { "window-heating": [], "window-cooling": [], "cooling-cold": [] };
  /** Rooms with an open window and how many of their windows are open. */
  const open: Array<[string, number]> = [];
  const manual: string[] = [];
  const boost: string[] = [];
  const heating: string[] = [];
  let strongestWaves = 0;
  const climate: string[] = [];

  for (const room of roomList) {
    for (const conflict of roomConflicts(room, get, coldRooms.has(room.name), i18n)) {
      conflicts[conflict].push(room.name);
    }
    const openCount = openWindows(room, get).length;
    if (openCount > 0) {
      open.push([room.name, openCount]);
    }
    const heat = roomHeating(room, get, i18n);
    if (heat.override === "boost") {
      boost.push(room.name);
    } else if (heat.override === "manual") {
      manual.push(room.name);
    }
    if (heat.waves > 0) {
      heating.push(room.name);
      strongestWaves = Math.max(strongestWaves, heat.waves);
    }
    if (room.air_conditioner && climateView(get(room.air_conditioner), i18n).active) {
      climate.push(room.name);
    }
  }

  const chips: SummaryChip[] = [];
  const conflictChips: Array<[RoomConflict, SummaryKind]> = [
    ["window-heating", "conflict-window"],
    ["window-cooling", "conflict-window"],
    ["cooling-cold", "conflict-cooling"],
  ];
  for (const [conflict, kind] of conflictChips) {
    if (conflicts[conflict].length > 0) {
      chips.push({
        kind,
        text: `${texts.conflict[conflict]}: ${namesOrCount(conflicts[conflict], i18n)}`,
        color: COLORS.warning,
        spoken: `${texts.conflictSpoken[conflict]}: ${conflicts[conflict].join(", ")}`,
      });
    }
  }
  // Windows are counted, not rooms: a room with two open windows adds two.
  const openTotal = open.reduce((sum, [, count]) => sum + count, 0);
  if (openTotal > 0) {
    chips.push({
      kind: "windows",
      text: texts.windowsOpen(openTotal),
      color: COLORS.sky,
      spoken: `${texts.windowsSpoken}: ${open.map(([name, count]) => (count > 1 ? `${name} (${count})` : name)).join(", ")}`,
    });
  }
  if (manual.length > 0) {
    chips.push({
      kind: "manual",
      text: `${texts.manual}: ${namesOrCount(manual, i18n)}`,
      color: COLORS.warning,
      spoken: `${texts.manualSpoken}: ${manual.join(", ")}`,
    });
  }
  if (boost.length > 0) {
    chips.push({
      kind: "boost",
      text: `${texts.boost}: ${namesOrCount(boost, i18n)}`,
      color: COLORS.warning,
      spoken: `${texts.boostSpoken}: ${boost.join(", ")}`,
    });
  }
  if (heating.length > 0) {
    chips.push({
      kind: "heating",
      text: texts.heating(texts.rooms(heating.length)),
      color: COLORS.warning,
      spoken: `${texts.heatingSpoken}: ${heating.join(", ")}`,
      waves: strongestWaves,
    });
  }
  if (climate.length > 0) {
    chips.push({
      kind: "climate",
      text: `${texts.climate}: ${namesOrCount(climate, i18n)}`,
      color: COLORS.cool,
      spoken: `${texts.climateSpoken}: ${climate.join(", ")}`,
    });
  }
  return chips;
}
