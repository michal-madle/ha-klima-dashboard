import type { EntityId, HassEntity, Room } from "./types";
import { climateView, heatingView } from "./systems";
import { COLORS, plural } from "./utils";

export type SummaryKind = "windows" | "manual" | "heating" | "climate" | "conflict-window" | "conflict-cooling";

/** One status chip in the Domov header (CURRENT_SPEC.md, Dashboard Domov). */
export interface SummaryChip {
  kind: SummaryKind;
  text: string;
  color: string;
  /** Full sentence with room names for screen readers and the tooltip. */
  spoken: string;
}

const ROOM_FORMS = ["místnost", "místnosti", "místností"] as const;

function rooms(count: number): string {
  return `${count} ${plural(count, ...ROOM_FORMS)}`;
}

/** Up to two room names, otherwise a count ("Ložnice, Pracovna" / "3 místnosti"). */
function namesOrCount(names: string[]): string {
  return names.length <= 2 ? names.join(", ") : rooms(names.length);
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
export function roomHeating(room: Room, get: (entityId: EntityId | undefined) => HassEntity | undefined) {
  return heatingView(
    get(room.heating?.climate),
    get(room.heating?.overlay),
    get(room.heating?.target),
    get(room.heating?.intensity),
    room.thresholds,
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
): RoomConflict[] {
  const open = openWindows(room, get).length > 0;
  const heat = roomHeating(room, get);
  const mode = room.air_conditioner ? climateView(get(room.air_conditioner)).mode : "unknown";
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
 * manual heating overrides, rooms that are heating now (at least one wave) and running air
 * conditioners. Unknown states are never counted. `coldRooms` are the rooms whose status is
 * "Chladno".
 */
export function houseSummary(
  roomList: Room[],
  get: (entityId: EntityId | undefined) => HassEntity | undefined,
  coldRooms: ReadonlySet<string> = new Set(),
): SummaryChip[] {
  const conflicts: Record<RoomConflict, string[]> = { "window-heating": [], "window-cooling": [], "cooling-cold": [] };
  /** Rooms with an open window and how many of their windows are open. */
  const open: Array<[string, number]> = [];
  const manual: string[] = [];
  const heating: string[] = [];
  const climate: string[] = [];

  for (const room of roomList) {
    for (const conflict of roomConflicts(room, get, coldRooms.has(room.name))) {
      conflicts[conflict].push(room.name);
    }
    const openCount = openWindows(room, get).length;
    if (openCount > 0) {
      open.push([room.name, openCount]);
    }
    const heat = roomHeating(room, get);
    if (heat.overlay === "manual") {
      manual.push(room.name);
    }
    if (heat.waves > 0) {
      heating.push(room.name);
    }
    if (room.air_conditioner && climateView(get(room.air_conditioner)).active) {
      climate.push(room.name);
    }
  }

  const chips: SummaryChip[] = [];
  const conflictChips: Array<[RoomConflict, SummaryKind, string, string]> = [
    ["window-heating", "conflict-window", "Okno otevřené · topí se", "Okno je otevřené a topí se"],
    ["window-cooling", "conflict-window", "Okno otevřené · chladí se", "Okno je otevřené a chladí se"],
    ["cooling-cold", "conflict-cooling", "Chladí se, i když je chladno", "Chladí se, i když je chladno"],
  ];
  for (const [conflict, kind, text, spoken] of conflictChips) {
    if (conflicts[conflict].length > 0) {
      chips.push({
        kind,
        text: `${text}: ${namesOrCount(conflicts[conflict])}`,
        color: COLORS.warning,
        spoken: `Konflikt: ${spoken}: ${conflicts[conflict].join(", ")}`,
      });
    }
  }
  // Windows are counted, not rooms: a room with two open windows adds two.
  const openTotal = open.reduce((sum, [, count]) => sum + count, 0);
  if (openTotal > 0) {
    chips.push({
      kind: "windows",
      text: `${openTotal} ${plural(openTotal, "okno otevřené", "okna otevřená", "oken otevřených")}`,
      color: COLORS.sky,
      spoken: `Otevřená okna: ${open.map(([name, count]) => (count > 1 ? `${name} (${count})` : name)).join(", ")}`,
    });
  }
  if (manual.length > 0) {
    chips.push({
      kind: "manual",
      text: `Ručně: ${namesOrCount(manual)}`,
      color: COLORS.warning,
      spoken: `Topení ručně: ${manual.join(", ")}`,
    });
  }
  if (heating.length > 0) {
    chips.push({
      kind: "heating",
      text: `Topí ${rooms(heating.length)}`,
      color: COLORS.warning,
      spoken: `Topí se: ${heating.join(", ")}`,
    });
  }
  if (climate.length > 0) {
    chips.push({
      kind: "climate",
      text: `Klimatizace: ${namesOrCount(climate)}`,
      color: COLORS.cool,
      spoken: `Klimatizace zapnutá: ${climate.join(", ")}`,
    });
  }
  return chips;
}
