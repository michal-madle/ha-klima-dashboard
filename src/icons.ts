import { html, nothing, svg } from "lit";
import type { TemplateResult } from "lit";
import type { BlindPresetId, ClimateMode } from "./types";
import { COLORS } from "./utils";

/** PM2.5 icon: scattered dots of different sizes, no frame and no text (CURRENT_SPEC.md, Room Card). */
export function renderParticlesIcon(): TemplateResult {
  const dots: Array<[number, number, number]> = [
    [5.5, 6, 1.9],
    [12.5, 3.8, 1.4],
    [19, 6.5, 2.1],
    [9.5, 11, 2.3],
    [16.5, 12.5, 1.5],
    [4.5, 15.5, 1.5],
    [20, 18.5, 1.7],
    [11.5, 18, 1.7],
    [7, 20.5, 1.9],
    [15, 21, 1.4],
  ];
  return html`
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      ${dots.map(([cx, cy, r]) => svg`<circle cx=${cx} cy=${cy} r=${r}></circle>`)}
    </svg>
  `;
}

/**
 * Blind preset glyphs, drawn like the blind symbols of Apple Home: a solid head rail with the
 * slats below it, in the line weight of the other card icons (CURRENT_SPEC.md, Žaluzie).
 * Tma = lowered, slats closed (heavy, almost solid); Stín = lowered, slats open (thin, spaced);
 * Den = raised (slats stacked under the rail, pull cord, empty window). `currentColor`.
 */
export function renderPresetIcon(id: BlindPresetId): TemplateResult {
  let slats: TemplateResult;
  switch (id) {
    case "dark":
      slats = svg`<path d="M5 9.2h14M5 12.2h14M5 15.2h14M5 18.2h14" stroke-width="2.4"></path>`;
      break;
    case "shade":
      slats = svg`<path d="M5 9.6h14M5 13.4h14M5 17.2h14" stroke-width="1.4"></path>`;
      break;
    default:
      slats = svg`<path d="M5 8.4h14" stroke-width="1.6"></path>
        <path d="M16.6 9.8v6" stroke-width="1.3"></path>
        <circle cx="16.6" cy="17.2" r="1.25" fill="currentColor" stroke="none"></circle>`;
  }
  return html`
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >
      <rect x="3.5" y="3.2" width="17" height="3" rx="1.5" fill="currentColor" stroke="none"></rect>
      ${slats}
    </svg>
  `;
}

/** Topení row icon: three warm waves, `count` of them lit (0–3); dashed when unknown. */
export function renderHeatingWaves(count: number, dashed: boolean): TemplateResult {
  return html`
    <svg viewBox="0 0 24 24" fill="none" stroke-width="1.8" stroke-linecap="round" aria-hidden="true">
      ${[0, 1, 2].map(
        (index) => svg`<path
          d="M${6 + 6 * index} 20q-3-2.4 0-4.8t0-4.8t0-4.8"
          stroke=${index < count ? COLORS.warning : COLORS.off}
          stroke-dasharray=${dashed ? "1.6 2.6" : nothing}
        ></path>`,
      )}
    </svg>
  `;
}

/** Klimatizace icon by mode; "off" and "unknown" keep the air-conditioner icon. */
export function renderClimateIcon(mode: ClimateMode, color: string, dashed: boolean): TemplateResult {
  let shape: TemplateResult;
  const arm = svg`<path d="M12 3v18M9.9 5.1 12 3l2.1 2.1M9.9 18.9 12 21l2.1-2.1"></path>`;
  const blade = svg`<path d="M12 12c0-5 2.4-8.1 5.8-6.8 1.2 3.2-1.3 6.1-5.8 6.8z"></path>`;

  switch (mode) {
    case "cool":
    case "wind_free":
      shape = svg`${arm}
        <g transform="rotate(60 12 12)">${arm}</g>
        <g transform="rotate(120 12 12)">${arm}</g>`;
      break;
    case "dry":
      shape = svg`<path d="M12 3.5S5.5 10.2 5.5 14.6a6.5 6.5 0 0 0 13 0C18.5 10.2 12 3.5 12 3.5z"></path>`;
      break;
    case "fan":
      shape = svg`${blade}<g transform="rotate(120 12 12)">${blade}</g>
        <g transform="rotate(240 12 12)">${blade}</g>`;
      break;
    case "heat":
      shape = svg`<circle cx="12" cy="12" r="4"></circle>
        ${[0, 1, 2, 3, 4, 5, 6, 7].map(
          (index) => svg`<path d="M12 3v2.5" transform=${`rotate(${45 * index} 12 12)`}></path>`,
        )}`;
      break;
    case "auto":
      shape = svg`<circle cx="12" cy="12" r="9"></circle>
        <path d="M8.3 16.3 12 7.7l3.7 8.6M9.7 13.6h4.6"></path>`;
      break;
    default:
      shape = svg`<rect x="3" y="5" width="18" height="8" rx="2"></rect>
        <path d="M7 9.5h10M8 16.5v2.5M12 16.5v2.5M16 16.5v2.5"></path>`;
  }

  return html`
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke=${color}
      stroke-width="1.8"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-dasharray=${dashed ? "2 2.4" : nothing}
      aria-hidden="true"
    >
      ${shape}
    </svg>
  `;
}

/** Window row icon: the rounded frame with a cross; dashed when unknown. */
export function renderWindowIcon(color: string, dashed: boolean): TemplateResult {
  return html`
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke=${color}
      stroke-width="1.8"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-dasharray=${dashed ? "2 2.4" : nothing}
      aria-hidden="true"
    >
      <rect x="5" y="3.5" width="14" height="17" rx="1.5"></rect>
      <path d="M12 3.5v17M5 12h14"></path>
    </svg>
  `;
}

export type HeatingOptionId = "off" | "auto" | "heat" | "boost";

/** Small line icons for the Topení popup options. */
export function renderHeatingOptionIcon(id: HeatingOptionId): TemplateResult {
  let shape: TemplateResult;
  switch (id) {
    case "off":
      shape = svg`<path d="M12 3.5v8M7.2 6.6a7.5 7.5 0 1 0 9.6 0"></path>`;
      break;
    case "auto":
      shape = svg`<rect x="4" y="5" width="16" height="15" rx="2.5"></rect>
        <path d="M4 10h16M8.5 3v4M15.5 3v4"></path>`;
      break;
    case "heat":
      shape = svg`<path d="M12 3c.6 3.4 5.2 5 5.2 10a5.2 5.2 0 0 1-10.4 0c0-2 1-3.4 2.4-4.4.3 1.6 1 2.3 1.8 2.5C11.2 8.6 11 5.6 12 3z"></path>`;
      break;
    default:
      shape = svg`<path d="M13.2 2.5 5.5 13.2h5.6L10.2 21.5l8.3-11.2h-5.7z"></path>`;
  }
  return html`
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="1.8"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >
      ${shape}
    </svg>
  `;
}
