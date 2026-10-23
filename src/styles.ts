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
      display: flex;
      flex-wrap: wrap;
      gap: 4px 10px;
      margin-top: 5px;
      color: var(--secondary-text-color);
      font-size: 0.9rem;
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
      cursor: pointer;
      font: inherit;
      text-align: left;
      -webkit-tap-highlight-color: transparent;
    }

    .room:focus-visible {
      outline: 2px solid var(--primary-color, #64b5f6);
      outline-offset: 2px;
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
      font-size: 20px;
      line-height: 28px;
    }

    .missing {
      color: #8e8e93;
    }

    .air {
      display: grid;
      gap: 0;
    }

    .air-row {
      display: flex;
      align-items: center;
      min-height: 20px;
      gap: 6px;
      font-size: 14px;
      line-height: 20px;
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

    .lower {
      display: flex;
      gap: 12px;
      margin-top: 8px;
    }

    .system-list {
      min-width: 0;
      flex: 1;
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
      height: 20px;
      margin-top: 6px;
      font-size: 13px;
    }

    .cover {
      width: 60px;
      height: 78px;
      flex: 0 0 60px;
    }

    .cover-placeholder {
      width: 60px;
      flex: 0 0 60px;
    }

    .cover svg {
      display: block;
      width: 60px;
      height: 78px;
    }

    @media (max-width: 380px) {
      .room {
        padding: 14px;
      }

      .lower {
        gap: 8px;
      }

      .cover,
      .cover svg {
        width: 52px;
      }

      .cover {
        flex-basis: 52px;
      }

      .cover-placeholder {
        width: 52px;
        flex-basis: 52px;
      }
    }
`;
