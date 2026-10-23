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
      display: block;
      box-sizing: border-box;
      width: 100%;
      padding: 16px;
      border: 1px solid rgb(255 255 255 / 7%);
      border-radius: 24px;
      background: #1c1c1e;
      box-shadow: none;
      color: #ffffff;
      font: inherit;
      text-align: left;
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
      font-size: 19px;
      font-weight: 500;
      line-height: 24px;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .status-line {
      display: flex;
      align-items: center;
      gap: 6px;
      min-height: 18px;
      font-size: 13px;
      line-height: 18px;
    }

    .status-dot {
      box-sizing: border-box;
      width: 7px;
      height: 7px;
      flex: 0 0 7px;
      border-radius: 50%;
    }

    .measurements {
      display: flex;
      align-items: baseline;
      gap: 14px;
      min-height: 44px;
      margin: 8px 0;
      font-variant-numeric: tabular-nums;
    }

    .temperature {
      font-size: 38px;
      letter-spacing: -0.5px;
      line-height: 44px;
    }

    .temperature-unit {
      color: #9a9aa0;
      font-size: 18px;
      letter-spacing: 0;
    }

    .humidity {
      color: #9a9aa0;
      font-size: 18px;
      line-height: 28px;
    }

    .missing {
      color: #8e8e93;
    }

    .spark {
      display: block;
      flex: 0 0 auto;
      align-self: center;
      margin-left: 2px;
      opacity: 0.85;
    }

    .hvac {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .hvac-rows {
      min-width: 0;
      flex: 1;
    }

    .hvac .spark {
      margin-left: auto;
    }

    .lower {
      display: flex;
      align-items: flex-start;
      gap: 12px;
    }

    .info {
      min-width: 0;
      flex: 1;
    }

    .air-row {
      display: flex;
      align-items: center;
      width: 100%;
      min-height: 22px;
      gap: 6px;
      font-size: 14px;
      line-height: 22px;
      font-variant-numeric: tabular-nums;
    }

    .air-row ha-icon {
      width: 16px;
      height: 16px;
      flex: 0 0 16px;
      color: #9a9aa0;
    }

    .air-label {
      width: 44px;
      flex: 0 0 44px;
      color: #9a9aa0;
      font-size: 12px;
    }

    .air-value-unit {
      color: #9a9aa0;
      font-size: 11px;
    }

    .system-row {
      display: flex;
      align-items: center;
      box-sizing: border-box;
      gap: 8px;
      min-width: 0;
      height: 24px;
      color: var(--row-color);
      font-size: 14px;
      line-height: 20px;
    }

    .system-row.primary {
      height: 28px;
      font-size: 15px;
    }

    .system-row.strong {
      font-weight: 500;
    }

    .system-icon {
      display: flex;
      width: 24px;
      height: 24px;
      flex: 0 0 24px;
      align-items: center;
      justify-content: center;
    }

    .system-icon svg {
      display: block;
      width: 20px;
      height: 20px;
    }

    .system-text {
      min-width: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .system-extra {
      flex: 0 0 auto;
      color: #9a9aa0;
      font-weight: 400;
    }

    .window-row {
      height: 24px;
      margin-top: 2px;
      font-size: 14px;
    }

    .cover-column {
      display: flex;
      width: 76px;
      flex: 0 0 76px;
      flex-direction: column;
      gap: 6px;
    }

    .presets {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 4px;
    }

    .preset {
      height: 24px;
      border: 1px solid rgb(255 255 255 / 14%);
      border-radius: 8px;
      background: rgb(255 255 255 / 6%);
      color: #d8d8dc;
      font-size: 11px;
      line-height: 22px;
      text-align: center;
    }

    .preset[aria-pressed="true"] {
      border-color: rgb(255 255 255 / 40%);
      background: rgb(255 255 255 / 20%);
      color: #ffffff;
    }

    .cover-panel {
      display: block;
      width: 76px;
      height: 72px;
    }

    .cover-panel svg {
      display: block;
      width: 76px;
      height: 72px;
    }

    .backdrop {
      position: fixed;
      z-index: 9;
      inset: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 12px;
      background: rgb(0 0 0 / 60%);
    }

    .dialog {
      box-sizing: border-box;
      width: 100%;
      max-width: 420px;
      max-height: 90vh;
      overflow: auto;
      padding: 16px;
      border: 1px solid rgb(255 255 255 / 10%);
      border-radius: 20px;
      background: #1c1c1e;
      color: #ffffff;
    }

    .dialog-head {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      margin-bottom: 8px;
    }

    .dialog h2 {
      margin: 0;
      font-size: 16px;
      font-weight: 500;
      line-height: 22px;
    }

    .close {
      width: 44px;
      height: 44px;
      flex: 0 0 44px;
      color: #9a9aa0;
      font-size: 18px;
      text-align: center;
    }

    .dialog-message {
      margin: 24px 0;
      color: #9a9aa0;
      font-size: 14px;
    }

    .chart {
      display: block;
      width: 100%;
      height: auto;
    }

    .legend {
      display: flex;
      flex-wrap: wrap;
      gap: 4px 12px;
      margin-top: 6px;
      color: #9a9aa0;
      font-size: 11px;
    }

    .legend-item {
      display: inline-flex;
      align-items: center;
      gap: 5px;
    }

    .legend-swatch {
      box-sizing: border-box;
      width: 12px;
      height: 8px;
      border-radius: 2px;
    }

    .legend-swatch.dashed {
      height: 0;
      border-top: 2px dashed;
      border-radius: 0;
    }

    @media (max-width: 380px) {
      .room {
        padding: 14px;
      }

      .lower {
        gap: 8px;
      }

      .cover-column,
      .cover-panel,
      .cover-panel svg {
        width: 68px;
      }

      .cover-column {
        flex-basis: 68px;
      }
    }
`;
