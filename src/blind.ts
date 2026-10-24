import { svg } from "lit";
import type { TemplateResult } from "lit";
import { COLORS } from "./utils";

/** Width of the blind panel (--col in styles.ts). */
export const BLIND_WIDTH = 60;
/** Height of the info rows from CO₂ to the window row: 5 × --row-h (26 px) + --group-gap (12 px). */
export const BLIND_HEIGHT = 142;

const SLAT_COUNT = 11;
const RAIL_HEIGHT = 3;
const MIN_GAP = 0.8;
/** Thickness of a fully open (100 %) slat; also the constant slat thickness of the window part. */
const MIN_SLAT = 2;
const WINDOW_OPACITY = 0.28;
/**
 * The lowered blind is champagne, dimmed so a closed blind does not glare on a dark screen,
 * yet still clearly lighter than the sky-tinted window part (CURRENT_SPEC.md, Žaluzie).
 */
const BLIND_OPACITY = 0.5;
const RAIL_OPACITY = 0.7;

/**
 * Miniature of a real blind seen from inside (see CURRENT_SPEC.md, Žaluzie).
 * Constant slat count; tilt only changes the thickness of the lowered slats (0 % nearly
 * solid, 100 % thin lines). Position splits the column: the lowered upper part is the blind
 * itself (dimmed champagne); the raised lower part is the window behind it, tinted like the
 * sky, with the same slat grid and a constant slat thickness, so tilt never "closes" the window.
 * Position 100 % highlights only the top rail, 0 % everything.
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
    const centre = RAIL_HEIGHT + 1 + index * pitch + pitch / 2;
    const lowered = centre <= loweredEdge;
    const height = lowered ? slatHeight : MIN_SLAT;
    return svg`<rect
      x="0"
      y=${(centre - height / 2).toFixed(2)}
      width=${BLIND_WIDTH}
      height=${height.toFixed(2)}
      rx=${Math.min(1.5, height / 2).toFixed(2)}
      fill=${lowered ? COLORS.blind : COLORS.sky}
      opacity=${lowered ? BLIND_OPACITY : WINDOW_OPACITY}
    ></rect>`;
  });

  return svg`<rect
      class="rail"
      x="0"
      y="0"
      width=${BLIND_WIDTH}
      height=${RAIL_HEIGHT}
      rx="1.5"
      fill=${COLORS.blind}
      opacity=${RAIL_OPACITY}
    ></rect>${slats}`;
}
