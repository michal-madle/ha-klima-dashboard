import { svg } from "lit";
import type { TemplateResult } from "lit";
import { COLORS } from "./utils";

export const BLIND_WIDTH = 76;
export const BLIND_HEIGHT = 72;

const SLAT_COUNT = 12;
const RAIL_HEIGHT = 3;
const MIN_GAP = 0.8;
const MIN_SLAT = 1;
const WINDOW_OPACITY = 0.2;

/**
 * Miniature of a real blind seen from inside (see CURRENT_SPEC.md, Žaluzie).
 * Constant slat count; tilt only changes slat thickness (0 % nearly solid,
 * 100 % thin lines). Position splits the column: the lowered upper part is
 * fully opaque, the raised lower part (the window) keeps the slat structure
 * at 20 % opacity. Position 100 % highlights only the top rail, 0 % everything.
 * An unknown position or tilt is a dashed silhouette, never a zero.
 */
export function renderBlindShape(
  position: number | undefined,
  tilt: number | undefined,
): TemplateResult {
  if (position === undefined || tilt === undefined) {
    return svg`<rect
      x="0.75"
      y="0.75"
      width=${BLIND_WIDTH - 1.5}
      height=${BLIND_HEIGHT - 1.5}
      rx="6"
      fill="none"
      stroke=${COLORS.off}
      stroke-width="1.5"
      stroke-dasharray="3 3"
    ></rect>`;
  }

  const area = BLIND_HEIGHT - RAIL_HEIGHT - 1;
  const pitch = area / SLAT_COUNT;
  const maxSlat = pitch - MIN_GAP;
  const slatHeight = maxSlat - (tilt / 100) * (maxSlat - MIN_SLAT);
  const loweredEdge = RAIL_HEIGHT + 1 + ((100 - position) / 100) * area;

  const slats = Array.from({ length: SLAT_COUNT }, (_, index) => {
    const top = RAIL_HEIGHT + 1 + index * pitch + (pitch - slatHeight) / 2;
    const lowered = top + slatHeight / 2 <= loweredEdge;
    return svg`<rect
      x="0"
      y=${top.toFixed(2)}
      width=${BLIND_WIDTH}
      height=${slatHeight.toFixed(2)}
      rx=${Math.min(1.5, slatHeight / 2).toFixed(2)}
      fill=${COLORS.open}
      opacity=${lowered ? 1 : WINDOW_OPACITY}
    ></rect>`;
  });

  return svg`<rect
      x="0"
      y="0"
      width=${BLIND_WIDTH}
      height=${RAIL_HEIGHT}
      rx="1.5"
      fill=${COLORS.open}
    ></rect>${slats}`;
}
