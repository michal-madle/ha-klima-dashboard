import { html, svg } from "lit";
import type { TemplateResult } from "lit";
import type { BlindPresetId } from "./types";

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
 * Blind preset glyphs, drawn like the Shelly cover buttons: a top rail with the blind below it.
 * Den = only the rail (blind raised), Stín = lowered blind with open slats (spaced lines),
 * Tma = lowered blind with closed slats (tight, heavy lines). They take their colour from
 * `currentColor`.
 */
export function renderPresetIcon(id: BlindPresetId): TemplateResult {
  let shape: TemplateResult;
  switch (id) {
    case "dark":
      shape = svg`<path d="M5 5.5h14" stroke-width="2.4"></path>
        <path d="M6 10.5h12M6 14h12M6 17.5h12M6 21h12" stroke-width="2.6"></path>`;
      break;
    case "shade":
      shape = svg`<path d="M5 5.5h14" stroke-width="2.4"></path>
        <path d="M6 11h12M6 15.5h12M6 20h12" stroke-width="1.8"></path>`;
      break;
    default:
      shape = svg`<path d="M5 5.5h14" stroke-width="2.4"></path>
        <path d="M12 5.5v8.5" stroke-width="1.8"></path>`;
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
      ${shape}
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
