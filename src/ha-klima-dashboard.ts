import { LitElement, css, html, nothing, type TemplateResult } from "lit";

type EntityId = string;

interface HassEntity {
  state: string;
  attributes: Record<string, unknown>;
}

interface HomeAssistant {
  states: Record<EntityId, HassEntity>;
}

interface RoomConfig {
  name: string;
  temperature?: EntityId;
  humidity?: EntityId;
  carbon_dioxide?: EntityId;
  pm25?: EntityId;
  window?: EntityId;
  cover?: EntityId;
  tado?: {
    climate?: EntityId;
    overlay?: EntityId;
    target?: EntityId;
    heating?: EntityId;
  };
  samsung?: EntityId;
}

interface OutsideConfig {
  temperature?: EntityId;
  minimum?: EntityId;
  maximum?: EntityId;
  rain_probability?: EntityId;
  pm25?: EntityId;
}

interface DashboardThresholds {
  humidity_min: number;
  humidity_max: number;
  co2_warning: number;
  co2_critical: number;
  pm25_warning: number;
  pm25_critical: number;
  winter_min: number;
  winter_max: number;
  summer_min: number;
  summer_max: number;
}

interface DashboardConfig {
  type: string;
  title?: string;
  house_mode_entity?: EntityId;
  outside?: OutsideConfig;
  rooms: RoomConfig[];
  thresholds?: Partial<DashboardThresholds>;
}

interface Reading {
  value?: number;
}

interface RoomStatus {
  label: string;
  color: string;
  kind: "normal" | "warning" | "critical" | "unknown";
}

type SamsungMode = "off" | "cool" | "wind_free" | "dry" | "fan" | "heat" | "auto" | "unknown";

const HOUSE_MODE_ENTITY = "input_select.house_mode";

const COLORS = {
  background: "#1C1C1E",
  open: "#D8D8DC",
  closed: "#6B6B70",
  label: "#9A9AA0",
  off: "#8E8E93",
  white: "#FFFFFF",
  plan: "#F2F2F7",
  warning: "#FF9F0A",
  alert: "#FF453A",
  cold: "#64D2FF",
  cool: "#64D2FF",
  dry: "#FFD60A",
  heat: "#FF9F0A",
  auto: "#BF5AF2",
};

const DEFAULT_THRESHOLDS: DashboardThresholds = {
  humidity_min: 35,
  humidity_max: 70,
  co2_warning: 1000,
  co2_critical: 1500,
  pm25_warning: 15,
  pm25_critical: 35,
  winter_min: 20,
  winter_max: 24,
  summer_min: 21,
  summer_max: 25,
};

const SAMSUNG_COLORS: Record<SamsungMode, string> = {
  off: COLORS.off,
  cool: COLORS.cool,
  wind_free: COLORS.cool,
  dry: COLORS.dry,
  fan: COLORS.plan,
  heat: COLORS.heat,
  auto: COLORS.auto,
  unknown: COLORS.off,
};

const SAMSUNG_LABELS: Record<SamsungMode, string> = {
  off: "Vypnuto",
  cool: "Chlazení",
  wind_free: "WindFree",
  dry: "Sušení",
  fan: "Větrání",
  heat: "Topení",
  auto: "Auto",
  unknown: "––",
};

class HaKlimaDashboard extends LitElement {
  static styles = css`
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

  private _config?: DashboardConfig;
  private _hass?: HomeAssistant;

  setConfig(config: DashboardConfig): void {
    if (!config || !Array.isArray(config.rooms) || config.rooms.length === 0) {
      throw new Error("Klima Dashboard requires a non-empty rooms list.");
    }
    if (
      config.house_mode_entity !== undefined &&
      (typeof config.house_mode_entity !== "string" || !config.house_mode_entity.trim())
    ) {
      throw new Error("house_mode_entity must be a non-empty entity ID.");
    }
    for (const room of config.rooms) {
      if (!room || typeof room.name !== "string" || !room.name.trim()) {
        throw new Error("Each Klima Dashboard room requires a name.");
      }
    }
    for (const [key, value] of Object.entries(config.thresholds ?? {})) {
      if (typeof value !== "number" || !Number.isFinite(value)) {
        throw new Error(`Threshold "${key}" must be a finite number.`);
      }
    }

    const thresholds = { ...DEFAULT_THRESHOLDS, ...config.thresholds };
    if (
      thresholds.humidity_min >= thresholds.humidity_max ||
      thresholds.co2_warning >= thresholds.co2_critical ||
      thresholds.pm25_warning >= thresholds.pm25_critical ||
      thresholds.winter_min > thresholds.winter_max ||
      thresholds.summer_min > thresholds.summer_max
    ) {
      throw new Error("Threshold ranges must be in ascending order.");
    }

    this._config = config;
  }

  set hass(hass: HomeAssistant) {
    this._hass = hass;
    this.requestUpdate();
  }

  getCardSize(): number {
    return 2 + (this._config?.rooms.length ?? 1) * 4;
  }

  render(): TemplateResult | typeof nothing {
    if (!this._config) {
      return nothing;
    }

    const mode = this.entityState(this._config.house_mode_entity ?? HOUSE_MODE_ENTITY)?.toLowerCase();
    const isSummer = mode === "léto" || mode === "leto";
    const modeKnown = isSummer || mode === "zima";
    const thresholds = { ...DEFAULT_THRESHOLDS, ...this._config.thresholds };

    return html`
      <ha-card>
        <div class="dashboard">
          <header class="dashboard-header">
            <h1>${this._config.title ?? "Domov"}</h1>
            ${this.renderOutside()}
          </header>
          <div class="rooms">
            ${this._config.rooms.map((room) =>
              this.renderRoom(room, isSummer, modeKnown, thresholds),
            )}
          </div>
        </div>
      </ha-card>
    `;
  }

  private renderOutside(): TemplateResult | typeof nothing {
    const outside = this._config?.outside;
    if (!outside) {
      return nothing;
    }

    const temperature = this.reading(outside.temperature, "°C", 1);
    const minimum = this.reading(outside.minimum, "°C", 1);
    const maximum = this.reading(outside.maximum, "°C", 1);
    const rain = this.reading(outside.rain_probability, "%", 0);
    const pm25 = this.reading(outside.pm25, "µg/m³", 0);
    const range = [minimum.text, maximum.text]
      .filter((value): value is string => value !== undefined)
      .join("–");
    const parts = [
      temperature.text,
      range || undefined,
      rain.text ? `Déšť ${rain.text}` : undefined,
      pm25.text ? `PM2.5 ${pm25.text}` : undefined,
    ].filter((part): part is string => Boolean(part));

    return parts.length > 0
      ? html`<div class="outside">${parts.map((part) => html`<span>${part}</span>`)}</div>`
      : nothing;
  }

  private renderRoom(
    room: RoomConfig,
    isSummer: boolean,
    modeKnown: boolean,
    thresholds: DashboardThresholds,
  ): TemplateResult {
    const temperature = this.reading(room.temperature, "°C", 1);
    const humidity = this.reading(room.humidity, "%", 0);
    const co2 = this.reading(room.carbon_dioxide, "ppm", 0);
    const pm25 = this.reading(room.pm25, "µg/m³", 0);
    const status = this.roomStatus(
      temperature.value,
      humidity.value,
      co2.value,
      pm25.value,
      isSummer,
      modeKnown,
      thresholds,
    );
    const primaryIsSamsung = isSummer;

    return html`
      <article
        class="room"
        role="button"
        tabindex=${room.temperature ? "0" : "-1"}
        aria-disabled=${!room.temperature}
        aria-label="${room.name}: otevřít detail teploty"
        @click=${() => this.showMoreInfo(room.temperature)}
        @keydown=${(event: KeyboardEvent) => this.handleRoomKeydown(event, room.temperature)}
      >
        <div class="room-title">${room.name}</div>
        <div class="status-line">
          <span
            class="status-dot"
            style=${status.kind === "unknown"
              ? `border: 1.5px solid ${COLORS.off}`
              : `background: ${status.color}`}
          ></span>
          <span style=${`color: ${status.color}; font-weight: ${status.kind === "normal" ? 400 : 500}`}>
            ${status.label}
          </span>
        </div>
        <div class="measurements">
          <span class="temperature">
            ${temperature.value === undefined
              ? html`<span class="missing">––</span>`
              : html`${this.formatOne(temperature.value)}<span class="temperature-unit">
                  &nbsp;°C
                </span>`}
          </span>
          <span class="humidity">
            ${humidity.value === undefined
              ? html`<span class="missing">––</span>`
              : html`${Math.round(humidity.value)}&nbsp;%`}
          </span>
        </div>
        <div class="air">
          ${this.renderAirRow(
            "mdi:molecule-co2",
            "CO₂",
            co2,
            "ppm",
            thresholds.co2_warning,
            thresholds.co2_critical,
          )}
          ${this.renderAirRow(
            "mdi:blur",
            "PM2.5",
            pm25,
            "µg/m³",
            thresholds.pm25_warning,
            thresholds.pm25_critical,
          )}
        </div>
        <div class="lower">
          <div class="system-list">
            ${primaryIsSamsung
              ? this.renderSamsung(room.samsung, true)
              : this.renderTado(room.tado, true)}
            ${primaryIsSamsung
              ? this.renderTado(room.tado, false)
              : this.renderSamsung(room.samsung, false)}
            ${this.renderWindow(room.window)}
          </div>
          ${room.cover ? this.renderCover(room.cover) : html`<div class="cover-placeholder"></div>`}
        </div>
      </article>
    `;
  }

  private renderAirRow(
    icon: string,
    label: string,
    reading: Reading,
    unit: string,
    warningThreshold: number,
    criticalThreshold: number,
  ): TemplateResult {
    const color =
      reading.value === undefined
        ? COLORS.label
        : reading.value >= criticalThreshold
          ? COLORS.alert
          : reading.value >= warningThreshold
            ? COLORS.warning
            : COLORS.white;

    return html`
      <div class="air-row">
        <ha-icon icon=${icon}></ha-icon>
        <span class="air-label">${label}</span>
        ${reading.value === undefined
          ? html`<span style=${`color: ${COLORS.label}`}>––</span>`
          : html`<span style=${`color: ${color}`}>${Math.round(reading.value)}</span>
              <span class="air-value-unit">${unit}</span>`}
      </div>
    `;
  }

  private renderTado(config: RoomConfig["tado"], primary: boolean): TemplateResult {
    const climateState = this.entityState(config?.climate)?.toLowerCase();
    const overlay = this.entityState(config?.overlay)?.toLowerCase();
    const unavailable = overlay === undefined || this.isUnavailable(overlay);
    const disabled = climateState === "off" || overlay === "off";
    const heating = this.numberState(config?.heating);
    const target = this.numberState(config?.target);

    let label = "––";
    let color = COLORS.label;
    let strong = false;
    let extra = "";

    if (disabled) {
      label = "Vypnuto";
      color = COLORS.off;
    } else if (!unavailable && (climateState === undefined || this.isUnavailable(climateState))) {
      label = "––";
    } else if (overlay === "schedule") {
      label = "Plán";
      color = COLORS.plan;
      strong = true;
      if (target !== undefined) {
        extra = `· ${this.formatHalf(target)}\u00a0°C`;
      }
    } else if (overlay === "manual") {
      label = "Ručně";
      color = COLORS.warning;
      strong = true;
      if (target !== undefined) {
        extra = `· ${this.formatHalf(target)}\u00a0°C`;
      }
    } else if (!unavailable && overlay) {
      label = overlay;
      color = COLORS.warning;
      strong = true;
    }

    const count = disabled || unavailable ? 0 : this.heatingWaveCount(heating);
    return this.renderSystemRow(
      this.renderTadoWaves(count, unavailable),
      label,
      color,
      primary && strong,
      extra,
      primary,
    );
  }

  private renderSamsung(entityId: EntityId | undefined, primary: boolean): TemplateResult {
    const entity = this.getState(entityId);
    let mode: SamsungMode = "unknown";
    let target: number | undefined;

    if (entity && !this.isUnavailable(entity.state.toLowerCase())) {
      const state = entity.state.toLowerCase();
      const preset = String(entity.attributes.preset_mode ?? "none").toLowerCase();
      if (state === "off") {
        mode = "off";
      } else if (state === "cool") {
        mode = preset === "wind_free" || preset === "wind_free_sleep" ? "wind_free" : "cool";
      } else if (state === "dry") {
        mode = "dry";
      } else if (state === "fan_only") {
        mode = "fan";
      } else if (state === "heat") {
        mode = "heat";
      } else if (state === "auto") {
        mode = "auto";
      } else if (state !== "unknown" && state !== "unavailable") {
        mode = "unknown";
      }
      target = this.numberAttribute(entity.attributes.temperature);
    }

    const color = SAMSUNG_COLORS[mode];
    const label = SAMSUNG_LABELS[mode];
    const hasTarget = ["cool", "wind_free", "dry", "heat", "auto"].includes(mode);
    const extra =
      hasTarget && target !== undefined ? `· ${this.formatHalf(target)}\u00a0°C` : "";
    const active = mode !== "off" && mode !== "unknown";

    return this.renderSystemRow(
      this.renderSamsungIcon(mode, color, mode === "unknown"),
      label,
      color,
      primary && active,
      extra,
      primary,
    );
  }

  private renderSystemRow(
    icon: TemplateResult,
    label: string,
    color: string,
    strong: boolean,
    extra: string,
    primary: boolean,
  ): TemplateResult {
    return html`
      <div
        class="system-row ${primary ? "primary" : ""} ${strong ? "strong" : ""}"
        style=${`--row-color: ${color}`}
      >
        <span class="system-icon">${icon}</span>
        <span class="system-text">${label}</span>
        ${extra ? html`<span class="system-extra">${extra}</span>` : nothing}
      </div>
    `;
  }

  private renderTadoWaves(count: number, dashed: boolean): TemplateResult {
    return html`
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke-width="1.8"
        stroke-linecap="round"
        aria-hidden="true"
      >
        ${[0, 1, 2].map(
          (index) => html`<path
            d="M${6 + 6 * index} 20q-3-2.4 0-4.8t0-4.8t0-4.8"
            stroke=${index < count ? COLORS.warning : COLORS.off}
            stroke-dasharray=${dashed ? "1.6 2.6" : nothing}
          ></path>`,
        )}
      </svg>
    `;
  }

  private renderSamsungIcon(mode: SamsungMode, color: string, dashed: boolean): TemplateResult {
    let shape: TemplateResult;
    const arm = html`<path d="M12 3v18M9.9 5.1 12 3l2.1 2.1M9.9 18.9 12 21l2.1-2.1"></path>`;
    const blade = html`<path d="M12 12c0-5 2.4-8.1 5.8-6.8 1.2 3.2-1.3 6.1-5.8 6.8z"></path>`;

    switch (mode) {
      case "cool":
      case "wind_free":
        shape = html`<path d="M12 3v18M9.9 5.1 12 3l2.1 2.1M9.9 18.9 12 21l2.1-2.1"></path>
          <g transform="rotate(60 12 12)">${arm}</g>
          <g transform="rotate(120 12 12)">${arm}</g>`;
        break;
      case "dry":
        shape = html`<path d="M12 3.5S5.5 10.2 5.5 14.6a6.5 6.5 0 0 0 13 0C18.5 10.2 12 3.5 12 3.5z"></path>`;
        break;
      case "fan":
        shape = html`${blade}<g transform="rotate(120 12 12)">${blade}</g>
          <g transform="rotate(240 12 12)">${blade}</g>`;
        break;
      case "heat":
        shape = html`<circle cx="12" cy="12" r="4"></circle>
          ${[0, 1, 2, 3, 4, 5, 6, 7].map(
            (index) => html`<path d="M12 3v2.5" transform=${`rotate(${45 * index} 12 12)`}></path>`,
          )}`;
        break;
      case "auto":
        shape = html`<circle cx="12" cy="12" r="9"></circle>
          <path d="M8.3 16.3 12 7.7l3.7 8.6M9.7 13.6h4.6"></path>`;
        break;
      case "off":
        shape = html`<path d="M12 3.5v8"></path><path d="M7.4 6.4a7.5 7.5 0 1 0 9.2 0"></path>`;
        break;
      default:
        shape = html`<rect x="3" y="5" width="18" height="8" rx="2"></rect>
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

  private renderWindow(entityId: EntityId | undefined): TemplateResult {
    const state = this.entityState(entityId)?.toLowerCase();
    const unavailable = state === undefined || this.isUnavailable(state);
    const opened = state === "on";
    const color = unavailable ? COLORS.label : opened ? COLORS.alert : COLORS.label;
    const label = unavailable ? "––" : opened ? "Otevřeno" : "Zavřeno";

    return html`
      <div
        class="system-row window-row"
        style=${`--row-color: ${color}`}
      >
        <span class="system-icon">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke=${unavailable ? COLORS.off : color}
            stroke-width="1.8"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-dasharray=${unavailable ? "2 2.4" : nothing}
            aria-hidden="true"
          >
            <rect x="5" y="3.5" width="14" height="17" rx="1.5"></rect>
            <path d="M12 3.5v17M5 12h14"></path>
          </svg>
        </span>
        <span class="system-text">${label}</span>
      </div>
    `;
  }

  private renderCover(entityId: EntityId): TemplateResult {
    const entity = this.getState(entityId);
    const position = this.numberAttribute(entity?.attributes.current_position);
    const tilt = this.numberAttribute(entity?.attributes.current_tilt_position);
    const width = 26;
    const gap = 8;
    const height = 78;
    const radius = 4;
    const slatCount = 11;
    const closedHeight = position === undefined ? undefined : ((100 - position) / 100) * height;
    const tiltLevel = tilt === undefined ? undefined : ((100 - tilt) / 100) * height;
    const slatSize = (2 * height) / (2 * slatCount - 1);
    const minSlatHeight = slatSize / 7;
    const maxSlatHeight = slatSize - minSlatHeight;
    let y = 0;

    return html`
      <div class="cover" aria-label="Poloha a naklopení žaluzie">
        <svg
          viewBox="0 0 ${2 * width + gap} ${height}"
          role="img"
          aria-hidden="true"
        >
          ${closedHeight === undefined
            ? html`<rect
                x="0.75"
                y="0.75"
                width=${width - 1.5}
                height=${height - 1.5}
                rx=${radius}
                fill="none"
                stroke=${COLORS.off}
                stroke-width="1.5"
                stroke-dasharray="3 3"
              ></rect>`
            : html`<rect
                  x="0"
                  y="0"
                  width=${width}
                  height=${height}
                  rx=${radius}
                  fill=${COLORS.open}
                ></rect>
                ${closedHeight >= height - 0.5
                  ? html`<rect
                      x="0"
                      y="0"
                      width=${width}
                      height=${height}
                      rx=${radius}
                      fill=${COLORS.closed}
                    ></rect>`
                  : closedHeight > 0.5
                    ? html`<path
                        d=${`M0 ${Math.min(radius, closedHeight)} A${Math.min(radius, closedHeight)} ${Math.min(radius, closedHeight)} 0 0 1 ${Math.min(radius, closedHeight)} 0 H${width - Math.min(radius, closedHeight)} A${Math.min(radius, closedHeight)} ${Math.min(radius, closedHeight)} 0 0 1 ${width} ${Math.min(radius, closedHeight)} V${closedHeight.toFixed(2)} H0 Z`}
                        fill=${COLORS.closed}
                      ></path>`
                    : nothing}`}
          ${tiltLevel === undefined
            ? html`<rect
                x=${width + gap + 0.75}
                y="0.75"
                width=${width - 1.5}
                height=${height - 1.5}
                rx=${radius}
                fill="none"
                stroke=${COLORS.off}
                stroke-width="1.5"
                stroke-dasharray="3 3"
              ></rect>`
            : Array.from({ length: slatCount }, (_, index) => {
                const slatHeight =
                  minSlatHeight + ((maxSlatHeight - minSlatHeight) * index) / (slatCount - 1);
                const fill = y + slatHeight / 2 <= tiltLevel ? COLORS.closed : COLORS.open;
                const slat = html`<rect
                  x=${width + gap}
                  y=${y.toFixed(2)}
                  width=${width}
                  height=${slatHeight.toFixed(2)}
                  rx=${Math.min(radius, slatHeight / 2).toFixed(2)}
                  fill=${fill}
                ></rect>`;
                if (index < slatCount - 1) {
                  y += slatHeight + maxSlatHeight -
                    ((maxSlatHeight - minSlatHeight) * index) / (slatCount - 2);
                }
                return slat;
              })}
        </svg>
      </div>
    `;
  }

  private roomStatus(
    temperature: number | undefined,
    humidity: number | undefined,
    co2: number | undefined,
    pm25: number | undefined,
    isSummer: boolean,
    modeKnown: boolean,
    thresholds: DashboardThresholds,
  ): RoomStatus {
    if (
      temperature === undefined ||
      humidity === undefined ||
      co2 === undefined ||
      pm25 === undefined ||
      !modeKnown
    ) {
      return { label: "Bez dat", color: COLORS.label, kind: "unknown" };
    }
    if (pm25 >= thresholds.pm25_critical) {
      return { label: "Znečištěný vzduch", color: COLORS.alert, kind: "critical" };
    }
    if (co2 >= thresholds.co2_critical) {
      return { label: "Silně vydýchaný vzduch", color: COLORS.alert, kind: "critical" };
    }
    if (co2 >= thresholds.co2_warning) {
      return { label: "Vydýchaný vzduch", color: COLORS.warning, kind: "warning" };
    }
    if (humidity > thresholds.humidity_max) {
      return { label: "Vlhko", color: COLORS.warning, kind: "warning" };
    }
    if (humidity < thresholds.humidity_min) {
      return { label: "Sucho", color: COLORS.warning, kind: "warning" };
    }

    const minimum = isSummer ? thresholds.summer_min : thresholds.winter_min;
    const maximum = isSummer ? thresholds.summer_max : thresholds.winter_max;
    if (temperature > maximum) {
      return { label: "Teplo", color: COLORS.warning, kind: "warning" };
    }
    if (temperature < minimum) {
      return { label: "Chladno", color: COLORS.cold, kind: "warning" };
    }
    return { label: "Příjemné", color: COLORS.label, kind: "normal" };
  }

  private reading(
    entityId: EntityId | undefined,
    fallbackUnit: string,
    decimals: number,
  ): Reading & { text?: string } {
    const entity = this.getState(entityId);
    const value = this.numberState(entityId);
    if (value === undefined) {
      return {};
    }

    const unit = String(entity?.attributes.unit_of_measurement ?? fallbackUnit);
    return {
      value,
      text: `${new Intl.NumberFormat("cs-CZ", { maximumFractionDigits: decimals }).format(value)} ${unit}`,
    };
  }

  private numberState(entityId: EntityId | undefined): number | undefined {
    const state = this.entityState(entityId);
    if (state === undefined || this.isUnavailable(state.toLowerCase())) {
      return undefined;
    }

    const value = Number.parseFloat(state);
    return Number.isFinite(value) ? value : undefined;
  }

  private getState(entityId: EntityId | undefined): HassEntity | undefined {
    return entityId ? this._hass?.states[entityId] : undefined;
  }

  private entityState(entityId: EntityId | undefined): string | undefined {
    return this.getState(entityId)?.state;
  }

  private isUnavailable(state: string): boolean {
    return state === "" || state === "unknown" || state === "unavailable" || state === "none";
  }

  private numberAttribute(value: unknown): number | undefined {
    if (value === undefined || value === null || value === "") {
      return undefined;
    }
    const number = typeof value === "number" ? value : Number.parseFloat(String(value));
    return Number.isFinite(number) && number >= 0 && number <= 100 ? number : undefined;
  }

  private formatOne(value: number): string {
    return new Intl.NumberFormat("cs-CZ", {
      minimumFractionDigits: 1,
      maximumFractionDigits: 1,
    }).format(value);
  }

  private formatHalf(value: number): string {
    return new Intl.NumberFormat("cs-CZ", { maximumFractionDigits: 1 }).format(
      Math.round(value * 2) / 2,
    );
  }

  private heatingWaveCount(value: number | undefined): number {
    if (value === undefined || value <= 0) {
      return 0;
    }
    if (value <= 34) {
      return 1;
    }
    if (value <= 67) {
      return 2;
    }
    return 3;
  }

  private showMoreInfo(entityId: EntityId | undefined): void {
    if (!entityId) {
      return;
    }
    this.dispatchEvent(
      new CustomEvent("hass-more-info", {
        detail: { entityId },
        bubbles: true,
        composed: true,
      }),
    );
  }

  private handleRoomKeydown(event: KeyboardEvent, entityId: EntityId | undefined): void {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      this.showMoreInfo(entityId);
    }
  }
}

declare global {
  interface Window {
    customCards?: Array<{
      type: string;
      name: string;
      description: string;
      preview: boolean;
    }>;
  }
}

if (!customElements.get("ha-klima-dashboard")) {
  customElements.define("ha-klima-dashboard", HaKlimaDashboard);
}

window.customCards = window.customCards ?? [];
if (!window.customCards.some((card) => card.type === "ha-klima-dashboard")) {
  window.customCards.push({
    type: "ha-klima-dashboard",
    name: "Klima Dashboard",
    description: "Přehled teploty, kvality vzduchu, vytápění a žaluzií v místnostech.",
    preview: false,
  });
}
