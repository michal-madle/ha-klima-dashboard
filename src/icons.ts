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
 * Blind preset icons, one family of line icons that reads as light through the day:
 * night (moon), shade (parasol), morning (sunrise), day (sun). They take their colour
 * from `currentColor`.
 */
export function renderPresetIcon(id: BlindPresetId): TemplateResult {
  let shape: TemplateResult;
  switch (id) {
    case "dark":
      shape = svg`<path d="M19.6 14.4A8.2 8.2 0 1 1 9.6 4.4a6.6 6.6 0 0 0 10 10z"></path>`;
      break;
    case "shade":
      shape = svg`<path d="M3.5 12.5a8.5 8.5 0 0 1 17 0z"></path>
        <path d="M12 4V2.6M12 12.5v6a2 2 0 0 1-4 0"></path>`;
      break;
    case "morning":
      shape = svg`<path d="M3 18h18M7.5 18a4.5 4.5 0 0 1 9 0M12 9.6V7.4M17.2 12.8l1.5-1.5M6.8 12.8l-1.5-1.5M8 21.5h8"></path>`;
      break;
    default:
      shape = svg`<circle cx="12" cy="12" r="4"></circle>
        ${[0, 1, 2, 3, 4, 5, 6, 7].map(
          (index) => svg`<path d="M12 2.8v2.4" transform=${`rotate(${45 * index} 12 12)`}></path>`,
        )}`;
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
