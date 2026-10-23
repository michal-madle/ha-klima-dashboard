import { css } from "lit";

export const styles = css`
    :host {
      display: block;
      color: var(--primary-text-color);
    }

    ha-card {
      overflow: visible;
      border: 0;
      background: transparent;
      box-shadow: none;
    }

    .dashboard {
      display: grid;
      gap: 12px;
    }

    .dashboard-header {
      padding: 0 4px;
    }

    h1 {
      margin: 0;
      font-size: 1.5rem;
      font-weight: 650;
      line-height: 1.2;
    }

    .outside {
      display: grid;
      gap: 2px;
      margin-top: 5px;
      color: var(--secondary-text-color);
      font-size: 0.9rem;
    }

    .notice {
      padding: 8px 12px;
      border-radius: 12px;
      background: rgb(255 159 10 / 16%);
      color: #ff9f0a;
      font-size: 13px;
    }

    .rooms {
      display: grid;
      gap: 12px;
    }

    .room {
      /*
       * One size for every info row (CURRENT_SPEC.md, Vizuální pravidla): row height, icon,
       * values, labels and units. --col is the blind panel width.
       */
      --row-h: 26px;
      --row-font: 15px;
      --icon: 22px;
      --info-gap: 6px;
      --icon-gap: 7px;
      --col: 60px;
      --preset-col: 36px;
      position: relative;
      overflow: hidden;
      display: block;
      box-sizing: border-box;
      width: 100%;
      padding: 16px;
      border: 1px solid rgb(255 255 255 / 7%);
      border-radius: 24px;
      background: linear-gradient(165deg, #232326 0%, #1c1c1e 55%);
      box-shadow: inset 0 1px 0 rgb(255 255 255 / 6%);
      color: #ffffff;
      font: inherit;
      text-align: left;
    }

    .room > *:not(.scene) {
      position: relative;
    }

    /* Decorative illustration in the free top-right corner, faded out towards the content. */
    .scene {
      position: absolute;
      top: 0;
      right: 0;
      width: 64%;
      height: 150px;
      color: var(--scene-tone);
      background: radial-gradient(
        ellipse 85% 100% at 100% 0%,
        color-mix(in srgb, currentColor 16%, transparent),
        transparent 70%
      );
      pointer-events: none;
    }

    .scene svg {
      position: absolute;
      top: 8px;
      right: 8px;
      width: 135px;
      height: 101px;
      opacity: 0.6;
      -webkit-mask-image: radial-gradient(ellipse 125% 130% at 100% 0%, #000 38%, transparent 92%);
      mask-image: radial-gradient(ellipse 125% 130% at 100% 0%, #000 38%, transparent 92%);
    }

    .plain-button {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      border: 0;
      background: none;
      color: inherit;
      cursor: pointer;
      font: inherit;
      text-align: inherit;
      -webkit-tap-highlight-color: transparent;
    }

    .plain-button:disabled {
      cursor: default;
    }

    .plain-button:focus-visible {
      outline: 2px solid var(--primary-color, #64b5f6);
      outline-offset: 2px;
      border-radius: 6px;
    }

    .room-title {
      overflow: hidden;
      font-size: 26px;
      font-weight: 600;
      letter-spacing: -0.4px;
      line-height: 32px;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .status-line {
      display: flex;
      align-items: center;
      gap: 7px;
      min-height: 20px;
      font-size: var(--row-font);
      line-height: 20px;
    }

    .status-dot {
      box-sizing: border-box;
      width: 8px;
      height: 8px;
      flex: 0 0 8px;
      border-radius: 50%;
    }

    /* Temperature (dominant) and humidity side by side; no micro trend here. */
    .measurements {
      display: flex;
      align-items: baseline;
      gap: 14px;
      min-height: 44px;
      margin: 8px 0 10px;
      font-variant-numeric: tabular-nums;
    }

    .temperature {
      font-size: 38px;
      letter-spacing: -0.5px;
      line-height: 44px;
      white-space: nowrap;
    }

    .temperature-unit {
      color: #9a9aa0;
      font-size: 18px;
      letter-spacing: 0;
    }

    /* Humidity is deliberately uncoloured. */
    .humidity {
      color: #c7c7cc;
      font-size: 18px;
      line-height: 28px;
    }

    .missing {
      color: #8e8e93;
    }

    /*
     * Lower part: info rows | blind presets | blind panel. The blind panel is as tall as the
     * info rows (5 × --row-h), so it starts at the CO₂ row.
     */
    .lower {
      display: grid;
      grid-template-columns: minmax(0, 1fr) var(--preset-col) var(--col);
      align-items: stretch;
      column-gap: 8px;
    }

    /*
     * Info rows: two equally wide columns, values on the left and micro trends on the right
     * (CURRENT_SPEC.md, Room Card). The temperature trend spans the Topení and Klimatizace rows.
     */
    .info {
      display: grid;
      grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
      grid-template-rows: repeat(5, var(--row-h));
      column-gap: var(--info-gap);
      min-width: 0;
      font-size: var(--row-font);
      font-variant-numeric: tabular-nums;
    }

    .slot-co2 {
      grid-column: 1 / -1;
      grid-row: 1;
    }

    .slot-pm25 {
      grid-column: 1 / -1;
      grid-row: 2;
    }

    .slot-hvac1 {
      grid-column: 1;
      grid-row: 3;
    }

    .slot-hvac2 {
      grid-column: 1;
      grid-row: 4;
    }

    .slot-temperature-trend {
      grid-column: 2;
      grid-row: 3 / span 2;
    }

    .slot-window {
      grid-column: 1;
      grid-row: 5;
    }

    /* CO₂ / PM2.5: the same two columns inside the row, so the trend lines up with the others. */
    .air-row {
      display: grid;
      grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
      column-gap: var(--info-gap);
      align-items: stretch;
      min-width: 0;
      height: var(--row-h);
    }

    .system-row {
      display: flex;
      min-width: 0;
      height: var(--row-h);
      color: var(--row-color);
    }

    .row-main {
      display: flex;
      align-items: center;
      gap: var(--icon-gap);
      min-width: 0;
      height: var(--row-h);
    }

    .row-icon {
      display: flex;
      width: var(--icon);
      height: var(--icon);
      flex: 0 0 var(--icon);
      align-items: center;
      justify-content: center;
    }

    .row-icon svg {
      display: block;
      width: var(--icon);
      height: var(--icon);
    }

    .row-icon ha-icon {
      display: flex;
      --mdc-icon-size: var(--icon);
    }

    /*
     * Value or label and its unit / target. When both do not fit, the unit or target wraps onto
     * a second line that is clipped, so a number is never cut in the middle.
     */
    .row-text {
      display: flex;
      flex-wrap: wrap;
      align-content: flex-start;
      column-gap: 0.3em;
      min-width: 0;
      height: var(--row-h);
      overflow: hidden;
    }

    .row-label,
    .row-unit {
      line-height: var(--row-h);
      white-space: nowrap;
    }

    .row-label {
      min-width: 0;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .system-row.strong .row-label {
      font-weight: 500;
    }

    .row-unit {
      color: #9a9aa0;
      font-weight: 400;
    }

    /* Micro trend: stretches over its cell; the dot is HTML so it stays round. */
    .trend-button {
      display: block;
      width: 100%;
      height: 100%;
      min-width: 0;
    }

    .spark {
      display: block;
      box-sizing: border-box;
      width: 100%;
      height: 100%;
      padding: 5px 3px;
    }

    .trend-button .spark {
      padding: 7px 3px;
    }

    .spark-plot {
      position: relative;
      display: block;
      width: 100%;
      height: 100%;
    }

    .spark-plot svg {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      overflow: visible;
    }

    .spark-dot {
      position: absolute;
      width: 5px;
      height: 5px;
      margin: -2.5px 0 0 -2.5px;
      border-radius: 50%;
      background: currentColor;
    }

    /*
     * One column of three round Shelly-style buttons (ring + glyph), spread over the panel height.
     * They are pressed by a long press or a double tap; the ring fills while the button is held.
     */
    .presets {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
    }

    .preset {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 34px;
      height: 34px;
      flex: 0 0 34px;
      border: 2.5px solid rgb(255 255 255 / 15%);
      border-radius: 50%;
      background: #2c2c2e;
      color: var(--tone);
      touch-action: manipulation;
      user-select: none;
      -webkit-user-select: none;
      -webkit-touch-callout: none;
    }

    .preset svg {
      display: block;
      width: 18px;
      height: 18px;
    }

    .preset .progress {
      position: absolute;
      top: -2.5px;
      left: -2.5px;
      width: calc(100% + 5px);
      height: calc(100% + 5px);
      transform: rotate(-90deg);
      fill: none;
      stroke: var(--tone);
      stroke-width: 2.5;
      stroke-linecap: round;
      stroke-dasharray: 100;
      stroke-dashoffset: 100;
      opacity: 0;
    }

    .preset:active .progress {
      opacity: 1;
      animation: hold 550ms linear forwards;
    }

    .preset[aria-pressed="true"] {
      border-color: color-mix(in srgb, var(--tone) 60%, transparent);
      background: color-mix(in srgb, var(--tone) 22%, #2c2c2e);
    }

    .preset.sent {
      animation: sent 700ms ease-out;
    }

    @keyframes hold {
      to {
        stroke-dashoffset: 0;
      }
    }

    @keyframes sent {
      0% {
        box-shadow: 0 0 0 0 color-mix(in srgb, var(--tone) 70%, transparent);
      }
      100% {
        box-shadow: 0 0 0 10px transparent;
      }
    }

    .cover-panel {
      display: block;
      min-width: 0;
      height: 100%;
    }

    .cover-panel svg {
      display: block;
      width: 100%;
      height: 100%;
    }

    .backdrop {
      position: fixed;
      z-index: 9;
      inset: 0;
      display: flex;
      align-items: flex-end;
      justify-content: center;
      background: rgb(0 0 0 / 60%);
    }

    .sheet {
      box-sizing: border-box;
      width: 100%;
      max-width: 460px;
      max-height: 90vh;
      overflow: auto;
      padding: 16px 16px max(16px, env(safe-area-inset-bottom));
      border: 1px solid rgb(255 255 255 / 10%);
      border-bottom: 0;
      border-radius: 24px 24px 0 0;
      background: #1c1c1e;
      color: #ffffff;
      animation: rise 220ms ease-out;
    }

    @keyframes rise {
      from {
        transform: translateY(24px);
        opacity: 0;
      }
    }

    @media (min-width: 600px) {
      .backdrop {
        align-items: center;
      }

      .sheet {
        border-bottom: 1px solid rgb(255 255 255 / 10%);
        border-radius: 24px;
      }
    }

    .sheet-head {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: 8px;
      margin-bottom: 12px;
    }

    .sheet h2 {
      margin: 0;
      font-size: 20px;
      font-weight: 600;
      line-height: 26px;
    }

    .sheet-sub {
      color: #9a9aa0;
      font-size: 14px;
      line-height: 20px;
    }

    .close {
      width: 44px;
      height: 44px;
      flex: 0 0 44px;
      margin: -8px -8px 0 0;
      color: #9a9aa0;
      font-size: 18px;
      text-align: center;
    }

    .sheet-message {
      margin: 16px 0;
      color: #9a9aa0;
      font-size: 14px;
    }

    .sheet-message.error {
      color: #ff9f0a;
    }

    .sheet-label {
      margin: 16px 0 8px;
      color: #9a9aa0;
      font-size: 13px;
    }

    .options {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 8px;
    }

    .option {
      display: flex;
      align-items: center;
      gap: 10px;
      min-height: 56px;
      padding: 8px 12px;
      border: 1px solid rgb(255 255 255 / 8%);
      border-radius: 16px;
      background: rgb(255 255 255 / 5%);
      color: #ffffff;
      font-size: 15px;
    }

    .option-icon {
      display: flex;
      width: 28px;
      height: 28px;
      flex: 0 0 28px;
      align-items: center;
      justify-content: center;
      color: var(--tone);
    }

    .option-icon svg {
      display: block;
      width: 22px;
      height: 22px;
    }

    .option-text {
      display: flex;
      flex-direction: column;
      min-width: 0;
    }

    .option-hint {
      color: #9a9aa0;
      font-size: 11px;
      line-height: 14px;
    }

    .option[aria-pressed="true"] {
      border-color: color-mix(in srgb, var(--tone) 70%, transparent);
      background: color-mix(in srgb, var(--tone) 18%, transparent);
    }

    .option:disabled {
      opacity: 0.45;
    }

    .chips {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }

    .chip {
      min-height: 44px;
      padding: 0 16px;
      border: 1px solid rgb(255 255 255 / 8%);
      border-radius: 22px;
      background: rgb(255 255 255 / 5%);
      color: #ffffff;
      font-size: 14px;
    }

    .chip[aria-pressed="true"] {
      border-color: rgb(100 210 255 / 70%);
      background: rgb(100 210 255 / 18%);
    }

    .sheet-link {
      display: block;
      width: 100%;
      min-height: 44px;
      margin-top: 16px;
      border-radius: 14px;
      color: #64d2ff;
      font-size: 15px;
      text-align: center;
    }

    @media (prefers-reduced-motion: reduce) {
      .sheet,
      .preset.sent {
        animation: none;
      }
    }

    @media (max-width: 380px) {
      .room {
        padding: 14px;
      }

      .room {
        --col: 52px;
        --preset-col: 34px;
      }

      .lower {
        column-gap: 6px;
      }
    }
`;
