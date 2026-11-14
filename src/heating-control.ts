/**
 * The state of the heating of a room as the card shows it (CURRENT_SPEC.md, Topení). The popup Topení / Klimatizace is
 * the shared one of the kit (ha-dashboard-kit/climate). Pure helpers, no DOM.
 */

import { BOOST_TEMPERATURE, OFF_TEMPERATURE } from "ha-dashboard-kit/climate";

/**
 * Target (°C) Tado reports while the heating is off; Vypnuto for a limited time is a timer at this value. The rule is the
 * kit's, the same in every card (uživatel 14. 11. 2026: „Je to vlastnost kitu, common chování“).
 */
export const HEATING_OFF_TARGET = OFF_TEMPERATURE;
/** Boost is a fixed target (Tado app: 25 °C). */
export { BOOST_TEMPERATURE };

export function numberOf(value: unknown): number | undefined {
  const number = typeof value === "string" ? Number.parseFloat(value) : value;
  return typeof number === "number" && Number.isFinite(number) ? number : undefined;
}

export type HeatingKind = "schedule" | "manual" | "off";

/**
 * Plán / Ručně / Vypnuto of a room. The climate entity decides (`auto` = schedule, `heat` = an
 * override, `off`): Tado CE updates it at once after a command, while the overlay sensor changes
 * only with the next poll and stays stale for a while (Ručně would linger after Plán). The overlay
 * sensor is used when the climate entity says nothing usable. An override at the 5 °C target is Vypnuto.
 */
export function heatingKindOf(climate: string | undefined, overlay: string | undefined, target?: number): HeatingKind | undefined {
  const c = climate?.toLowerCase();
  const o = overlay?.toLowerCase();
  if (c === "off") {
    return "off";
  }
  const fromClimate = c === "auto" ? "schedule" : c === "heat" ? "manual" : undefined;
  const fromOverlay = o === "off" ? "off" : o === "schedule" || o === "manual" ? o : undefined;
  const kind: HeatingKind | undefined = fromClimate ?? fromOverlay;
  return kind === "manual" && target !== undefined && target <= HEATING_OFF_TARGET ? "off" : kind;
}
