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
  house_mode_entity: EntityId;
  outside?: OutsideConfig;
  rooms: RoomConfig[];
  thresholds?: Partial<DashboardThresholds>;
}

interface Reading {
  text: string;
  value?: number;
}

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

const ROOM_NAMES = ["Ložnice", "Pracovna", "Maxík", "Mikuláš", "Obývací pokoj"];

class HaKlimaDashboard extends LitElement {
  static styles = css`
    :host {
      display: block;
      color: var(--primary-text-color);
    }

    ha-card {
      overflow: hidden;
    }

    .dashboard {
      padding: 18px;
    }

    .dashboard-header {
      margin: 0 0 14px;
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
      gap: 10px;
    }

    .room {
      padding: 14px;
      border-radius: 16px;
      background: var(--ha-card-background, var(--card-background-color));
      box-shadow: 0 1px 5px rgb(0 0 0 / 9%);
    }

    .room-main {
      display: grid;
      grid-template-columns: minmax(0, 1fr) 42px;
      gap: 0 12px;
      min-width: 0;
    }

    .room-header {
      grid-column: 1 / -1;
      display: flex;
      align-items: baseline;
      justify-content: space-between;
      gap: 8px;
      margin-bottom: 10px;
    }

    h2 {
      overflow: hidden;
      margin: 0;
      font-size: 1.05rem;
      font-weight: 650;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .status {
      flex: 0 0 auto;
      color: var(--secondary-text-color);
      font-size: 0.9rem;
      text-align: right;
    }

    .status.warning,
    .reading.warning {
      color: var(--warning-color, #d97706);
    }

    .status.critical,
    .reading.critical {
      color: var(--error-color, #c62828);
    }

    .measurements {
      grid-column: 1 / -1;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10px;
      margin-bottom: 9px;
    }

    .measurement {
      display: flex;
      align-items: baseline;
      gap: 5px;
      min-width: 0;
      font-size: 1.2rem;
      font-variant-numeric: tabular-nums;
      font-weight: 600;
    }

    .measurement-label {
      position: absolute;
      width: 1px;
      height: 1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      white-space: nowrap;
      clip-path: inset(50%);
    }

    .air {
      grid-column: 1;
      display: grid;
      gap: 5px;
      margin-bottom: 9px;
    }

    .air-row,
    .system-row {
      display: flex;
      align-items: center;
      min-height: 20px;
      gap: 7px;
      font-size: 0.9rem;
    }

    .air-row ha-icon,
    .system-row ha-icon {
      flex: 0 0 18px;
      width: 18px;
      height: 18px;
      color: var(--secondary-text-color);
    }

    .air-label {
      width: 44px;
      color: var(--secondary-text-color);
    }

    .reading {
      font-variant-numeric: tabular-nums;
    }

    .system-rows {
      grid-column: 1;
      display: grid;
      gap: 4px;
    }

    .system-text {
      min-width: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .manual {
      color: var(--warning-color, #d97706);
      font-weight: 600;
    }

    .off {
      color: var(--secondary-text-color);
    }

    .heating {
      display: inline-flex;
      gap: 1px;
      margin-left: auto;
      color: var(--warning-color, #d97706);
      font-size: 0.88rem;
      letter-spacing: -2px;
    }

    .cover {
      grid-column: 2;
      grid-row: 3 / span 2;
      display: flex;
      align-items: stretch;
      justify-content: center;
      min-height: 100%;
      padding: 4px 5px;
    }

    .blind {
      display: grid;
      width: 28px;
      min-height: 104px;
      grid-template-rows: auto 1fr;
      overflow: hidden;
      border-radius: 5px;
      background: color-mix(in srgb, var(--secondary-text-color) 8%, transparent);
    }

    .blind-rail {
      height: 2px;
      background: var(--secondary-text-color);
      opacity: 0.8;
    }

    .blind-slats {
      display: grid;
      grid-template-rows: repeat(10, 1fr);
      gap: 1px;
      padding: 3px 2px;
    }

    .blind-slat {
      border-radius: 2px;
      background: var(--blind-color, #8e8e93);
    }

    .blind-slat.raised {
      opacity: 0.25;
    }

    .blind.unknown {
      border: 1px dashed var(--secondary-text-color);
      background: transparent;
    }

    .blind.unknown .blind-slat {
      border: 1px dashed var(--secondary-text-color);
      background: transparent;
    }

    .no-cover {
      grid-column: 2;
      grid-row: 3 / span 2;
      width: 28px;
    }

    @media (max-width: 380px) {
      .dashboard {
        padding: 14px;
      }

      .room {
        padding: 12px;
      }

      .room-main {
        grid-template-columns: minmax(0, 1fr) 36px;
        gap: 0 8px;
      }

      .blind {
        width: 24px;
      }
    }
  `;

  private _config?: DashboardConfig;
  private _hass?: HomeAssistant;

  setConfig(config: DashboardConfig): void {
    if (!config || !Array.isArray(config.rooms) || config.rooms.length === 0) {
      throw new Error("Klima Dashboard requires a non-empty rooms list.");
    }
    if (typeof config.house_mode_entity !== "string" || !config.house_mode_entity.trim()) {
      throw new Error("Klima Dashboard requires house_mode_entity.");
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
    return 2 + (this._config?.rooms.length ?? ROOM_NAMES.length) * 4;
  }

  render(): TemplateResult | typeof nothing {
    if (!this._config) {
      return nothing;
    }

    const mode = this.getState(this._config.house_mode_entity)?.state;
    const isSummer = mode === "Léto";
    const modeKnown = mode === "Léto" || mode === "Zima";
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

    const temperature = this.reading(outside.temperature, "°C");
    const minimum = this.reading(outside.minimum, "°C");
    const maximum = this.reading(outside.maximum, "°C");
    const rain = this.reading(outside.rain_probability, "%");
    const pm25 = this.reading(outside.pm25, "µg/m³");
    const range = [
      minimum.text !== "--" ? minimum.text : undefined,
      maximum.text !== "--" ? maximum.text : undefined,
    ]
      .filter((part): part is string => Boolean(part))
      .join("–");
    const parts = [
      temperature.text !== "--" ? temperature.text : undefined,
      range || undefined,
      rain.text !== "--" ? `Déšť ${rain.text}` : undefined,
      pm25.text !== "--" ? `PM2.5 ${pm25.text}` : undefined,
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
    const temperature = this.reading(room.temperature, "°C");
    const humidity = this.reading(room.humidity, "%");
    const co2 = this.reading(room.carbon_dioxide, "ppm");
    const pm25 = this.reading(room.pm25, "µg/m³");
    const status = this.roomStatus(
      temperature.value,
      humidity.value,
      co2.value,
      pm25.value,
      isSummer,
      modeKnown,
      thresholds,
    );
    const primary = isSummer ? this.renderSamsung(room.samsung) : this.renderTado(room.tado);
    const secondary = isSummer ? this.renderTado(room.tado) : this.renderSamsung(room.samsung);

    return html`
      <article class="room">
        <div class="room-main">
          <div class="room-header">
            <h2>${room.name}</h2>
            <span class="status ${status.kind}">${status.label}</span>
          </div>
          <div class="measurements">
            <div class="measurement">
              <span class="measurement-label">Teplota</span>
              <span>${temperature.text}</span>
            </div>
            <div class="measurement">
              <span class="measurement-label">Vlhkost</span>
              <span>${humidity.text}</span>
            </div>
          </div>
          <div class="air">
            ${this.renderAirRow("mdi:molecule-co2", "CO₂", co2, thresholds.co2_warning, thresholds.co2_critical)}
            ${this.renderAirRow("mdi:blur", "PM2.5", pm25, thresholds.pm25_warning, thresholds.pm25_critical)}
          </div>
          <div class="system-rows">
            ${primary}
            ${secondary}
            ${this.renderWindow(room.window)}
          </div>
          ${room.cover ? this.renderCover(room.cover) : html`<div class="no-cover"></div>`}
        </div>
      </article>
    `;
  }

  private renderAirRow(
    icon: string,
    label: string,
    reading: Reading,
    warningThreshold: number,
    criticalThreshold: number,
  ): TemplateResult {
    const kind =
      reading.value === undefined
        ? ""
        : reading.value >= criticalThreshold
          ? "critical"
          : reading.value >= warningThreshold
            ? "warning"
            : "";

    return html`
      <div class="air-row">
        <ha-icon icon=${icon}></ha-icon>
        <span class="air-label">${label}</span>
        <span class="reading ${kind}">${reading.text}</span>
      </div>
    `;
  }

  private renderTado(config?: RoomConfig["tado"]): TemplateResult {
    const climate = this.getState(config?.climate);
    const climateState = climate?.state.toLowerCase();
    const climateAvailable =
      climateState !== undefined &&
      climateState !== "unknown" &&
      climateState !== "unavailable";
    const overlayState = this.getState(config?.overlay)?.state.toLowerCase();
    const overlay =
      overlayState === "unknown" || overlayState === "unavailable"
        ? undefined
        : overlayState;
    const heating = this.reading(config?.heating, "%");
    const target = this.reading(config?.target, "°C");
    const disabled = climateState === "off" || overlay === "off";
    const manual = overlay === "manual";
    const label = disabled
      ? "Vypnuto"
      : !climateAvailable || !overlay
        ? "--"
        : manual
          ? "Ručně"
          : overlay === "schedule"
            ? "Plán"
            : "--";
    const targetText =
      label === "--" || disabled || target.text === "--" ? "" : ` · ${target.text}`;
    const waveCount = disabled ? 0 : this.heatingWaveCount(heating.value);
    const wavesUnknown = !disabled && heating.value === undefined;

    return html`
      <div class="system-row ${disabled ? "off" : manual ? "manual" : ""}">
        <ha-icon icon="mdi:radiator"></ha-icon>
        <span class="system-text">Tado CE · ${label}${targetText}</span>
        <span class="heating" aria-label=${wavesUnknown ? "Intenzita neznámá" : `Intenzita ${waveCount} z 3`}>
          ${wavesUnknown ? "--" : Array.from({ length: waveCount }, () => html`<span>∿</span>`)}
        </span>
      </div>
    `;
  }

  private renderSamsung(entityId?: EntityId): TemplateResult {
    const entity = this.getState(entityId);
    if (!entity) {
      return this.systemRow("mdi:air-conditioner", "Samsung · --", "");
    }

    const state = entity.state.toLowerCase();
    if (state === "unknown" || state === "unavailable") {
      return this.systemRow("mdi:air-conditioner", "Samsung · --", "");
    }
    const mode = String(entity.attributes.hvac_mode ?? state).toLowerCase();
    const preset = String(entity.attributes.preset_mode ?? "none").toLowerCase();
    if (state === "off" || mode === "off") {
      return this.systemRow("mdi:air-conditioner", "Samsung · Vypnuto", "off");
    }

    let label: string;
    if (mode === "cool" && preset === "wind_free") {
      label = "WindFree";
    } else if (mode === "cool") {
      label = "Chlazení";
    } else if (mode === "fan_only") {
      label = "Větrání";
    } else if (mode === "dry") {
      label = "Odvlhčování";
    } else if (preset !== "none") {
      label = preset.replaceAll("_", " ");
    } else {
      label = mode;
    }

    return this.systemRow("mdi:air-conditioner", `Samsung · ${label}`, mode === "fan_only" ? "fan" : "");
  }

  private systemRow(icon: string, text: string, kind: string): TemplateResult {
    return html`
      <div class="system-row ${kind}">
        <ha-icon icon=${icon}></ha-icon>
        <span class="system-text">${text}</span>
      </div>
    `;
  }

  private renderWindow(entityId?: EntityId): TemplateResult {
    const state = this.getState(entityId)?.state.toLowerCase();
    const label = state === "on" ? "Otevřeno" : state === "off" ? "Zavřeno" : "--";
    return this.systemRow("mdi:window-closed-variant", `Okno · ${label}`, "");
  }

  private renderCover(entityId: EntityId): TemplateResult {
    const entity = this.getState(entityId);
    const position = this.numberAttribute(entity?.attributes.current_position);
    const tilt = this.numberAttribute(entity?.attributes.current_tilt_position);

    if (position === undefined || tilt === undefined) {
      return html`
        <div class="cover" aria-label="Poloha žaluzie neznámá">
          <div class="blind unknown">
            <div class="blind-rail"></div>
            <div class="blind-slats">
              ${Array.from({ length: 10 }, () => html`<span class="blind-slat"></span>`)}
            </div>
          </div>
        </div>
      `;
    }

    const raisedCount = Math.round((position / 100) * 10);
    const slatThickness = Math.max(1, 5 - (tilt / 100) * 4);

    return html`
      <div class="cover" aria-label="Žaluzie">
        <div
          class="blind"
          style=${`--blind-color: var(--primary-text-color); --slat-thickness: ${slatThickness}px`}
        >
          <div class="blind-rail"></div>
          <div class="blind-slats">
            ${Array.from({ length: 10 }, (_, index) => {
              const raised = index < raisedCount;
              return html`<span
                class="blind-slat ${raised ? "raised" : ""}"
                style=${`height: var(--slat-thickness); align-self: center`}
              ></span>`;
            })}
          </div>
        </div>
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
  ): { label: string; kind: string } {
    if (
      temperature === undefined ||
      humidity === undefined ||
      co2 === undefined ||
      pm25 === undefined ||
      !modeKnown
    ) {
      return { label: "Bez dat", kind: "" };
    }
    if (pm25 >= thresholds.pm25_critical) {
      return { label: "Znečištěný vzduch", kind: "critical" };
    }
    if (co2 >= thresholds.co2_critical) {
      return { label: "Silně vydýchaný vzduch", kind: "critical" };
    }
    if (co2 >= thresholds.co2_warning) {
      return { label: "Vydýchaný vzduch", kind: "warning" };
    }
    if (humidity > thresholds.humidity_max) {
      return { label: "Vlhko", kind: "" };
    }
    if (humidity < thresholds.humidity_min) {
      return { label: "Sucho", kind: "" };
    }

    const minimum = isSummer ? thresholds.summer_min : thresholds.winter_min;
    const maximum = isSummer ? thresholds.summer_max : thresholds.winter_max;
    if (temperature > maximum) {
      return { label: "Teplo", kind: "" };
    }
    if (temperature < minimum) {
      return { label: "Chladno", kind: "" };
    }
    return { label: "Příjemné", kind: "" };
  }

  private reading(entityId: EntityId | undefined, fallbackUnit: string): Reading {
    const entity = this.getState(entityId);
    if (!entity || entity.state === "unknown" || entity.state === "unavailable") {
      return { text: "--" };
    }

    const value = Number(entity.state);
    if (!Number.isFinite(value)) {
      return { text: "--" };
    }

    const unit = String(entity.attributes.unit_of_measurement ?? fallbackUnit);
    const decimals = fallbackUnit === "ppm" ? 0 : 1;
    return {
      text: `${new Intl.NumberFormat("cs-CZ", {
        maximumFractionDigits: decimals,
      }).format(value)} ${unit}`,
      value,
    };
  }

  private getState(entityId: EntityId | undefined): HassEntity | undefined {
    return entityId ? this._hass?.states[entityId] : undefined;
  }

  private numberAttribute(value: unknown): number | undefined {
    if (value === undefined || value === null || value === "") {
      return undefined;
    }
    const number = typeof value === "number" ? value : Number(value);
    return Number.isFinite(number) && number >= 0 && number <= 100
      ? number
      : undefined;
  }

  private heatingWaveCount(value: number | undefined): number {
    if (value === undefined || value <= 0) {
      return 0;
    }
    if (value < 35) {
      return 1;
    }
    if (value < 68) {
      return 2;
    }
    return 3;
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
    description: "Mobilní přehled klimatu v domácnosti.",
    preview: false,
  });
}
