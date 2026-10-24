import type { EntityId, HassEntity, RoomConfig } from "./types";
import { climateView, heatingView } from "./systems";
import { COLORS, isUnavailable, plural } from "./utils";

export type SummaryKind = "windows" | "manual" | "heating" | "climate";

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

/**
 * Chips only for what differs from a quiet house: open windows, manual heating overrides,
 * rooms that are heating now (at least one wave) and running air conditioners. Unknown
 * states are never counted.
 */
export function houseSummary(
  roomList: RoomConfig[],
  get: (entityId: EntityId | undefined) => HassEntity | undefined,
): SummaryChip[] {
  const open: string[] = [];
  const manual: string[] = [];
  const heating: string[] = [];
  const climate: string[] = [];

  for (const room of roomList) {
    const window = get(room.window)?.state.toLowerCase();
    if (window !== undefined && !isUnavailable(window) && window === "on") {
      open.push(room.name);
    }
    const heat = heatingView(
      get(room.heating?.climate),
      get(room.heating?.overlay),
      get(room.heating?.target),
      get(room.heating?.intensity),
    );
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
  if (open.length > 0) {
    chips.push({
      kind: "windows",
      text: `${open.length} ${plural(open.length, "okno otevřené", "okna otevřená", "oken otevřených")}`,
      color: COLORS.sky,
      spoken: `Otevřená okna: ${open.join(", ")}`,
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
