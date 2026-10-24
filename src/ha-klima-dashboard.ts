import { LitElement, html, nothing, svg } from "lit";
import { property, state } from "lit/decorators.js";
import type { PropertyValues, TemplateResult } from "lit";
import { BLIND_HEIGHT, BLIND_WIDTH, renderBlindShape } from "./blind";
import { DEFAULT_THRESHOLDS, HOUSE_MODE_ENTITY, normalizeConfig } from "./config";
import { hasChartData, renderRoomChart } from "./charts";
import { renderHeatingOptionIcon, renderParticlesIcon, renderPresetIcon } from "./icons";
import type { HeatingOptionId } from "./icons";
import { SCENE_TONES, renderScene, resolveScene } from "./scenes";
import {
  HOUR_MS,
  TREND_SAMPLES,
  TREND_WINDOW_MS,
  fetchHistory,
  normalizeToAxis,
  sampleNumeric,
  sharedAxis,
} from "./history";
import type { HistoryMap } from "./history";
import { styles } from "./styles";
import type {
  BlindPreset,
  DashboardConfig,
  DashboardThresholds,
  EntityId,
  HassEntity,
  HomeAssistant,
  Reading,
  RoomConfig,
  ClimateMode,
  SheetKind,
  SheetState,
  TrendAxis,
  TrendKind,
} from "./types";
import {
  BLIND_PRESETS,
  COLORS,
  COVER_SCRIPT,
  CLIMATE_COLORS,
  CLIMATE_LABELS,
  TREND_AXIS_STEP,
  climateModeFromState,
  configuredEntityIds,
  formatHalf,
  formatOne,
  formatPreset,
  getRoomStatus,
  heatingWaveCount,
  isUnavailable,
  numberAttribute,
  sameAttributes,
  stringList,
  trendEntityIds,
} from "./utils";

const TREND_REFRESH_MS = 5 * 60_000;
const NOTICE_MS = 8_000;
const NBSP = " ";

/** Blind presets are sent only by a long press or a double tap, never by a single tap. */
const LONG_PRESS_MS = 550;
const DOUBLE_TAP_MS = 400;
const FLASH_MS = 700;

interface SystemRowAction {
  onClick: (event: Event) => void;
}

type TrendAxes = Partial<Record<TrendKind, TrendAxis>>;

type HistoryStatus = "loading" | "ready" | "error";

/** Grid slot of an air-quality row (see `.slot-*` in styles.ts). */
type InfoSlot = "co2" | "pm25";

/** One choice in the Topení / Klimatizace popup. */
interface SheetOption {
  id: string;
  label: string;
  icon: TemplateResult;
  color: string;
  active: boolean;
  /** Shown under the label when the entity cannot do this (the option is then disabled). */
  unsupported?: string;
  run: () => Promise<void>;
}

const CLIMATE_MODE_ORDER = ["off", "cool", "dry", "fan_only", "auto", "heat"];

export class HaKlimaDashboard extends LitElement {
  static styles = styles;

  @state()
  private _config?: DashboardConfig;

  @property({ attribute: false })
  hass?: HomeAssistant;

  @state()
  private _sheet?: SheetState;

  @state()
  private _sheetError?: string;

  /** 24 h room history shown in the "history" popup. */
  @state()
  private _historyStatus: HistoryStatus = "loading";

  @state()
  private _historyData: HistoryMap = {};

  private _historyRange = { startMs: 0, endMs: 0 };
  private _historyRequest = 0;

  /** Key of the blind preset that was just sent (brief confirmation flash). */
  @state()
  private _flash?: string;

  @state()
  private _trends: Record<EntityId, Array<number | undefined>> = {};

  @state()
  private _notice?: string;

  private _trendTimer?: number;
  private _noticeTimer?: number;
  private _trendsLoading = false;
  private _trendsStarted = false;
  private _opener?: HTMLElement;
  private _pressTimer?: number;
  private _flashTimer?: number;
  private _pressing = false;
  private _pressFired = false;
  private _lastTap?: { key: string; time: number };

  setConfig(config: DashboardConfig): void {
    this._config = normalizeConfig(config);
    this._trends = {};
    this._trendsStarted = false;
  }

  connectedCallback(): void {
    super.connectedCallback();
    this.requestUpdate();
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    window.clearInterval(this._trendTimer);
    window.clearTimeout(this._noticeTimer);
    window.clearTimeout(this._pressTimer);
    window.clearTimeout(this._flashTimer);
    this._trendTimer = undefined;
    this._noticeTimer = undefined;
    this._pressTimer = undefined;
    this._flashTimer = undefined;
    this._trendsStarted = false;
  }

  protected shouldUpdate(changedProperties: PropertyValues): boolean {
    if (changedProperties.size === 1 && changedProperties.has("hass")) {
      return this.hasRelevantEntityChanged(changedProperties.get("hass") as HomeAssistant | undefined);
    }
    return true;
  }

  protected updated(changedProperties: PropertyValues): void {
    if (!this._trendsStarted && this.hass && this._config) {
      this._trendsStarted = true;
      void this.loadTrends();
      window.clearInterval(this._trendTimer);
      this._trendTimer = window.setInterval(() => void this.loadTrends(), TREND_REFRESH_MS);
    }
    if (changedProperties.has("_sheet") && this._sheet && !changedProperties.get("_sheet")) {
      const first =
        this.renderRoot.querySelector<HTMLElement>(".sheet .option[aria-pressed='true']") ??
        this.renderRoot.querySelector<HTMLElement>(".sheet button:not([disabled])");
      first?.focus();
    }
  }

  private hasRelevantEntityChanged(previousHass: HomeAssistant | undefined): boolean {
    if (!previousHass || !this.hass || !this._config) {
      return true;
    }
    for (const entityId of configuredEntityIds(this._config)) {
      const previousEntity = previousHass.states[entityId];
      const currentEntity = this.hass.states[entityId];
      if (
        previousEntity?.state !== currentEntity?.state ||
        !sameAttributes(previousEntity?.attributes, currentEntity?.attributes)
      ) {
        return true;
      }
    }
    return false;
  }

  getCardSize(): number {
    return 2 + (this._config?.rooms.length ?? 1) * 5;
  }

  render(): TemplateResult | typeof nothing {
    if (!this._config) {
      return nothing;
    }

    const mode = this.entityState(this._config.house_mode_entity ?? HOUSE_MODE_ENTITY)?.toLowerCase();
    const isSummer = mode === "léto" || mode === "leto";
    const modeKnown = isSummer || mode === "zima";
    const thresholds = this.thresholds();
    const axes = this.trendAxes(this._config);

    return html`
      <ha-card>
        <div class="dashboard">
          <header class="dashboard-header">
            <h1>${this._config.title ?? "Domov"}</h1>
            ${this.renderOutside()}
          </header>
          ${this._notice ? html`<div class="notice" role="alert">${this._notice}</div>` : nothing}
          <div class="rooms">
            ${this._config.rooms.map((room) =>
              this.renderRoom(room, isSummer, modeKnown, thresholds, axes),
            )}
          </div>
        </div>
        ${this.renderSheet()}
      </ha-card>
    `;
  }

  private thresholds(): DashboardThresholds {
    return { ...DEFAULT_THRESHOLDS, ...this._config?.thresholds };
  }

  /**
   * One axis per quantity for the whole house (CURRENT_SPEC.md, Historie a grafy), so the
   * same value is drawn at the same height in every room.
   */
  private trendAxes(config: DashboardConfig): TrendAxes {
    const series = (pick: (room: RoomConfig) => EntityId | undefined) =>
      config.rooms.map((room) => {
        const entityId = pick(room);
        return entityId ? this._trends[entityId] : undefined;
      });
    return {
      temperature: sharedAxis(series((room) => room.temperature), TREND_AXIS_STEP.temperature),
      co2: sharedAxis(series((room) => room.carbon_dioxide), TREND_AXIS_STEP.co2),
      pm25: sharedAxis(series((room) => room.pm25), TREND_AXIS_STEP.pm25),
    };
  }

  // ---------------------------------------------------------------- header

  private renderOutside(): TemplateResult | typeof nothing {
    const outside = this._config?.outside;
    if (!outside) {
      return nothing;
    }

    const integer = new Intl.NumberFormat("cs-CZ", { maximumFractionDigits: 0 });
    const temperature = this.numberState(outside.temperature);
    const minimum = this.numberState(outside.minimum);
    const maximum = this.numberState(outside.maximum);
    const rain = this.numberState(outside.rain_probability);
    const pm25 = this.numberState(outside.pm25);

    const range =
      minimum !== undefined && maximum !== undefined
        ? `${integer.format(minimum)}–${integer.format(maximum)}${NBSP}°C`
        : undefined;
    const parts = [
      temperature === undefined ? undefined : `${integer.format(temperature)}${NBSP}°C`,
      range,
      rain === undefined ? undefined : `☂${NBSP}${integer.format(rain)}${NBSP}%`,
    ].filter((part): part is string => part !== undefined);

    // Outdoor air uses the same PM2.5 limits as the rooms (CURRENT_SPEC.md, Dashboard Domov).
    const thresholds = this.thresholds();
    let airLabel = "––";
    let airColor = COLORS.label;
    if (pm25 !== undefined) {
      if (pm25 >= thresholds.pm25_critical) {
        airLabel = "špatný";
        airColor = COLORS.alert;
      } else if (pm25 >= thresholds.pm25_warning) {
        airLabel = "zhoršený";
        airColor = COLORS.warning;
      } else {
        airLabel = "dobrý";
      }
    }

    if (parts.length === 0 && !outside.pm25) {
      return nothing;
    }
    return html`<div class="outside">
      ${parts.length > 0 ? html`<div>${parts.join(" · ")}</div>` : nothing}
      ${outside.pm25
        ? html`<div>Vzduch venku: <span style=${`color: ${airColor}`}>${airLabel}</span></div>`
        : nothing}
    </div>`;
  }

  // ------------------------------------------------------------------ room

  private renderRoom(
    room: RoomConfig,
    isSummer: boolean,
    modeKnown: boolean,
    thresholds: DashboardThresholds,
    axes: TrendAxes,
  ): TemplateResult {
    const temperature = this.reading(room.temperature, "°C", 1);
    const humidity = this.reading(room.humidity, "%", 0);
    const co2 = this.reading(room.carbon_dioxide, "ppm", 0);
    const pm25 = this.reading(room.pm25, "µg/m³", 0);
    const status = getRoomStatus(
      temperature.value,
      humidity.value,
      co2.value,
      pm25.value,
      isSummer,
      modeKnown,
      thresholds,
    );
    const primaryIsClimate = isSummer;
    const scene = resolveScene(room);

    return html`
      <article
        class="room"
        aria-label=${room.name}
        style=${scene ? `--scene-tone: ${SCENE_TONES[scene]}` : nothing}
      >
        ${scene ? html`<div class="scene" aria-hidden="true">${renderScene(scene)}</div>` : nothing}
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
          <button
            type="button"
            class="plain-button temperature"
            ?disabled=${!room.temperature}
            aria-label=${`${room.name}: teplota ${
              temperature.value === undefined ? "neznámá" : `${formatOne(temperature.value)} °C`
            }, historie místnosti za 24 hodin`}
            @click=${(event: Event) => this.openSheet("history", room, event)}
          >
            ${temperature.value === undefined
              ? html`<span class="missing">––</span>`
              : html`${formatOne(temperature.value)}<span class="temperature-unit">${NBSP}°C</span>`}
          </button>
          <button
            type="button"
            class="plain-button humidity"
            ?disabled=${!room.humidity}
            aria-label=${`${room.name}: vlhkost ${
              humidity.value === undefined ? "neznámá" : `${Math.round(humidity.value)} %`
            }, detail a historie`}
            @click=${() => this.showMoreInfo(room.humidity)}
          >
            ${humidity.value === undefined
              ? html`<span class="missing">––</span>`
              : html`${Math.round(humidity.value)}${NBSP}%`}
          </button>
        </div>
        <div class="lower">
          <div class="info">
            ${this.renderAirRow(
              room,
              "co2",
              room.carbon_dioxide,
              html`<ha-icon icon="mdi:molecule-co2"></ha-icon>`,
              "CO₂",
              co2,
              "ppm",
              thresholds.co2_warning,
              thresholds.co2_critical,
              axes.co2,
            )}
            ${this.renderAirRow(
              room,
              "pm25",
              room.pm25,
              renderParticlesIcon(),
              "PM2.5",
              pm25,
              "µg/m³",
              thresholds.pm25_warning,
              thresholds.pm25_critical,
              axes.pm25,
            )}
            ${primaryIsClimate
              ? this.renderClimate(room, true)
              : this.renderHeating(room, true)}
            ${primaryIsClimate
              ? this.renderHeating(room, false)
              : this.renderClimate(room, false)}
            ${this.renderTemperatureTrend(room, temperature, axes.temperature)}
            ${this.renderWindow(room)}
          </div>
          ${room.cover
            ? this.renderCover(room, room.cover)
            : html`<div class="presets" aria-hidden="true"></div>
                <div class="cover-panel" aria-hidden="true"></div>`}
        </div>
      </article>
    `;
  }

  /**
   * CO₂ / PM2.5 row: icon and value in the left column, micro trend in the right column;
   * the whole row opens the entity detail with its history.
   */
  private renderAirRow(
    room: RoomConfig,
    slot: InfoSlot,
    entityId: EntityId | undefined,
    icon: TemplateResult,
    label: string,
    reading: Reading,
    unit: string,
    warningThreshold: number,
    criticalThreshold: number,
    axis: TrendAxis | undefined,
  ): TemplateResult {
    // Without a reading the icon is neutral grey and no trend is drawn (never coloured).
    const hasValue = reading.value !== undefined;
    const value = Math.round(reading.value ?? 0);
    const color =
      reading.value === undefined
        ? COLORS.label
        : reading.value >= criticalThreshold
          ? COLORS.alert
          : reading.value >= warningThreshold
            ? COLORS.warning
            : COLORS.white;

    return html`
      <button
        type="button"
        class="plain-button air-row slot-${slot}"
        ?disabled=${!entityId}
        aria-label=${`${room.name}: ${label} ${hasValue ? `${value} ${unit}` : "neznámé"}, detail a historie`}
        @click=${() => this.showMoreInfo(entityId)}
      >
        <span class="row-main">
          <span class="row-icon" style=${`color: ${hasValue ? COLORS.mint : COLORS.off}`} aria-hidden="true">
            ${icon}
          </span>
          <span class="row-text">
            ${hasValue
              ? html`<span class="row-label" style=${`color: ${color}`}>${value}</span>
                  <span class="row-unit">${unit}</span>`
              : html`<span class="row-label" style=${`color: ${COLORS.label}`}>––</span>`}
          </span>
        </span>
        ${hasValue ? this.renderSpark(entityId, axis, COLORS.mint) : nothing}
      </button>
    `;
  }

  /**
   * Temperature micro trend: in the trend column next to the Topení and Klimatizace rows and
   * as tall as both of them (CURRENT_SPEC.md, Room Card). Opens the 24 h room history.
   */
  private renderTemperatureTrend(
    room: RoomConfig,
    temperature: Reading,
    axis: TrendAxis | undefined,
  ): TemplateResult | typeof nothing {
    if (!room.temperature || temperature.value === undefined) {
      return nothing;
    }
    const spark = this.renderSpark(room.temperature, axis, COLORS.peach);
    if (spark === nothing) {
      return nothing;
    }
    return html`
      <button
        type="button"
        class="plain-button trend-button slot-temperature-trend"
        aria-label=${`${room.name}: trend teploty za 2 hodiny, historie místnosti za 24 hodin`}
        @click=${(event: Event) => this.openSheet("history", room, event)}
      >
        ${spark}
      </button>
    `;
  }

  /**
   * Micro trend (CURRENT_SPEC.md, Historie a grafy): the last 120 minutes as one thin line
   * with a soft area and a dot at the latest sample, drawn on the axis shared by the whole
   * house. It stretches over its cell; the dot is HTML so that it stays round.
   */
  private renderSpark(
    entityId: EntityId | undefined,
    axis: TrendAxis | undefined,
    color: string,
  ): TemplateResult | typeof nothing {
    const samples = entityId ? this._trends[entityId] : undefined;
    if (!samples || !axis) {
      return nothing;
    }
    const points = normalizeToAxis(samples, axis)
      .map((value, index) =>
        value === undefined
          ? undefined
          : { x: (index / (TREND_SAMPLES - 1)) * 100, y: (1 - value) * 100 },
      )
      .filter((point): point is { x: number; y: number } => point !== undefined);
    if (points.length < 2) {
      return nothing;
    }
    const line = points.map((point) => `${point.x.toFixed(2)},${point.y.toFixed(2)}`).join(" ");
    const first = points[0];
    const last = points[points.length - 1];
    const area = `${line} ${last.x.toFixed(2)},100 ${first.x.toFixed(2)},100`;
    return html`<span class="spark" style=${`color: ${color}`} aria-hidden="true">
      <span class="spark-plot">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none">
          <polygon points=${area} fill="currentColor" fill-opacity="0.08"></polygon>
          <polyline
            points=${line}
            fill="none"
            stroke="currentColor"
            stroke-width="1.6"
            stroke-linecap="round"
            stroke-linejoin="round"
            vector-effect="non-scaling-stroke"
          ></polyline>
        </svg>
        <span
          class="spark-dot"
          style=${`left: ${last.x.toFixed(2)}%; top: ${last.y.toFixed(2)}%`}
        ></span>
      </span>
    </span>`;
  }

  // --------------------------------------------------------------- Topení

  private renderHeating(room: RoomConfig, primary: boolean): TemplateResult {
    const config = room.heating;
    const climateState = this.entityState(config?.climate)?.toLowerCase();
    const overlay = this.entityState(config?.overlay)?.toLowerCase();
    const unavailable = overlay === undefined || isUnavailable(overlay);
    const disabled = climateState === "off" || overlay === "off";
    const heating = this.numberState(config?.intensity);
    const target = this.numberState(config?.target);

    let label = "––";
    let color = COLORS.label;
    let strong = false;
    let extra = "";

    if (disabled) {
      label = "Vypnuto";
      color = COLORS.off;
    } else if (!unavailable && (climateState === undefined || isUnavailable(climateState))) {
      label = "––";
    } else if (overlay === "schedule") {
      label = "Plán";
      color = COLORS.plan;
      strong = true;
      if (target !== undefined) {
        extra = `· ${formatHalf(target)}${NBSP}°C`;
      }
    } else if (overlay === "manual") {
      label = "Ručně";
      color = COLORS.warning;
      strong = true;
      if (target !== undefined) {
        extra = `· ${formatHalf(target)}${NBSP}°C`;
      }
    } else if (!unavailable && overlay) {
      label = overlay;
      color = COLORS.warning;
      strong = true;
    }

    const count = disabled || unavailable ? 0 : heatingWaveCount(heating);
    return this.renderSystemRow(
      room,
      "Topení",
      this.renderHeatingWaves(count, unavailable),
      label,
      color,
      primary && strong,
      extra,
      primary,
      config?.climate ? this.sheetAction("heating", room) : undefined,
    );
  }

  private renderHeatingWaves(count: number, dashed: boolean): TemplateResult {
    return html`
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke-width="1.8"
        stroke-linecap="round"
        aria-hidden="true"
      >
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

  // ----------------------------------------------------------- Klimatizace

  private renderClimate(room: RoomConfig, primary: boolean): TemplateResult {
    const entity = this.getState(room.air_conditioner);
    let mode: ClimateMode = "unknown";
    let target: number | undefined;
    let label: string | undefined;

    if (entity && !isUnavailable(entity.state.toLowerCase())) {
      const state = entity.state.toLowerCase();
      const preset = String(entity.attributes.preset_mode ?? "none").toLowerCase();
      if (state === "off") {
        mode = "off";
      } else if (state === "cool") {
        mode = preset === "wind_free" ? "wind_free" : "cool";
      } else if (state === "dry") {
        mode = "dry";
      } else if (state === "fan_only") {
        mode = "fan";
      } else if (state === "heat") {
        mode = "heat";
      } else if (state === "auto") {
        mode = "auto";
      }
      // Other presets (sleep, boost, wind_free_sleep, ...) are shown by their own name;
      // "off" always wins over a preset.
      if (mode !== "off" && mode !== "unknown" && mode !== "wind_free" && preset !== "none" && preset !== "") {
        label = formatPreset(preset);
      }
      target = numberAttribute(entity.attributes.temperature);
    }

    const color = CLIMATE_COLORS[mode];
    const hasTarget = ["cool", "wind_free", "dry", "heat", "auto"].includes(mode);
    const extra =
      hasTarget && target !== undefined ? `· ${formatHalf(target)}${NBSP}°C` : "";
    const active = mode !== "off" && mode !== "unknown";

    return this.renderSystemRow(
      room,
      "Klimatizace",
      this.renderClimateIcon(mode, color, mode === "unknown"),
      label ?? CLIMATE_LABELS[mode],
      color,
      primary && active,
      extra,
      primary,
      room.air_conditioner ? this.sheetAction("climate", room) : undefined,
    );
  }

  private renderClimateIcon(mode: ClimateMode, color: string, dashed: boolean): TemplateResult {
    let shape: TemplateResult;
    const arm = svg`<path d="M12 3v18M9.9 5.1 12 3l2.1 2.1M9.9 18.9 12 21l2.1-2.1"></path>`;
    const blade = svg`<path d="M12 12c0-5 2.4-8.1 5.8-6.8 1.2 3.2-1.3 6.1-5.8 6.8z"></path>`;

    switch (mode) {
      case "cool":
      case "wind_free":
        shape = svg`<path d="M12 3v18M9.9 5.1 12 3l2.1 2.1M9.9 18.9 12 21l2.1-2.1"></path>
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
        // "off" and "unknown" keep the air-conditioner icon (grey / dashed), not a power icon.
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

  /** Row action: opens the control popup of Topení / Klimatizace. */
  private sheetAction(kind: SheetKind, room: RoomConfig): SystemRowAction {
    return {
      onClick: (event: Event) => this.openSheet(kind, room, event),
    };
  }

  /**
   * Topení / Klimatizace row in the left info column. The state label always stays whole;
   * when the row is too narrow the whole target ("· 21 °C") wraps onto a hidden second line
   * instead of being cut inside the number (CURRENT_SPEC.md, Room Card).
   */
  private renderSystemRow(
    room: RoomConfig,
    name: string,
    icon: TemplateResult,
    label: string,
    color: string,
    strong: boolean,
    extra: string,
    primary: boolean,
    action?: SystemRowAction,
  ): TemplateResult {
    const spoken = `${label === "––" ? "neznámý stav" : label}${
      extra ? ` ${extra.replace(/^·\s*/, "")}` : ""
    }`;
    return html`
      <button
        type="button"
        class="plain-button system-row slot-${primary ? "hvac1" : "hvac2"} ${strong ? "strong" : ""}"
        style=${`--row-color: ${color}`}
        ?disabled=${!action}
        aria-label=${`${room.name}: ${name}, ${spoken}${action ? ", ovládání" : ""}`}
        @click=${action?.onClick}
      >
        <span class="row-main">
          <span class="row-icon">${icon}</span>
          <span class="row-text">
            <span class="row-label">${label}</span>
            ${extra ? html`<span class="row-unit">${extra}</span>` : nothing}
          </span>
        </span>
      </button>
    `;
  }

  // ---------------------------------------------------------------- window

  private renderWindow(room: RoomConfig): TemplateResult {
    const entityId = room.window;
    const state = this.entityState(entityId)?.toLowerCase();
    const unavailable = state === undefined || isUnavailable(state);
    const opened = state === "on";
    // Red is reserved for critical air values (CURRENT_SPEC.md, Barvy); an open window is
    // emphasised in light sky blue.
    const color = unavailable ? COLORS.label : opened ? COLORS.sky : COLORS.label;
    const label = unavailable ? "––" : opened ? "Otevřeno" : "Zavřeno";

    return html`
      <button
        type="button"
        class="plain-button system-row slot-window ${opened ? "strong" : ""}"
        style=${`--row-color: ${color}`}
        ?disabled=${!entityId}
        aria-label=${`${room.name}: okno ${unavailable ? "neznámé" : label.toLowerCase()}, detail a historie`}
        @click=${() => this.showMoreInfo(entityId)}
      >
        <span class="row-main">
          <span class="row-icon">
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
          <span class="row-text"><span class="row-label">${label}</span></span>
        </span>
      </button>
    `;
  }

  // ----------------------------------------------------------------- cover

  private renderCover(room: RoomConfig, entityId: EntityId): TemplateResult {
    const entity = this.getState(entityId);
    const available = entity !== undefined && !isUnavailable(entity.state.toLowerCase());
    const position = available ? numberAttribute(entity.attributes.current_position) : undefined;
    const tilt = available ? numberAttribute(entity.attributes.current_tilt_position) : undefined;
    const known = position !== undefined && tilt !== undefined;
    const description = known
      ? `poloha ${Math.round(position)} %, naklopení ${Math.round(tilt)} %`
      : "poloha nebo naklopení neznámé";

    return html`
      <div class="presets" role="group" aria-label=${`${room.name}: předvolby žaluzií`}>
        ${BLIND_PRESETS.map((preset) => this.renderPreset(room, preset, position, tilt))}
      </div>
      <button
        type="button"
        class="plain-button cover-panel"
        aria-label=${`${room.name}: žaluzie, ${description}. Otevřít ovládání.`}
        @click=${() => this.showMoreInfo(entityId)}
      >
        <svg
          viewBox="0 0 ${BLIND_WIDTH} ${BLIND_HEIGHT}"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          ${renderBlindShape(position, tilt)}
        </svg>
      </button>
    `;
  }

  private renderPreset(
    room: RoomConfig,
    preset: BlindPreset,
    position: number | undefined,
    tilt: number | undefined,
  ): TemplateResult {
    const active =
      position !== undefined &&
      tilt !== undefined &&
      Math.abs(position - preset.position) <= 2 &&
      Math.abs(tilt - preset.tilt) <= 2;
    const key = `${room.name}|${preset.id}`;

    // No visible label: the name is in title / aria-label. A single tap does nothing; the
    // preset is sent by a double tap or a long press (pointer events), or by the keyboard
    // (a keyboard click has detail 0).
    return html`
      <button
        type="button"
        class="plain-button preset ${this._flash === key ? "sent" : ""}"
        style=${`--tone: ${preset.tone}`}
        title=${preset.label}
        aria-pressed=${active ? "true" : "false"}
        aria-label=${`${room.name}: žaluzie ${preset.label}, ${preset.description}. Spustí se dvojitým klepnutím nebo dlouhým stiskem.`}
        @pointerdown=${(event: PointerEvent) => this.pressStart(event, room, preset)}
        @pointerup=${() => this.pressEnd(room, preset)}
        @pointercancel=${() => this.pressCancel()}
        @pointerleave=${() => this.pressCancel()}
        @contextmenu=${(event: Event) => event.preventDefault()}
        @click=${(event: MouseEvent) => {
          if (event.detail === 0) {
            void this.applyPreset(room, preset);
          }
        }}
      >
        <svg class="progress" viewBox="0 0 36 36" aria-hidden="true">
          <circle cx="18" cy="18" r="16.75" pathLength="100"></circle>
        </svg>
        ${renderPresetIcon(preset.id)}
      </button>
    `;
  }

  private pressStart(event: PointerEvent, room: RoomConfig, preset: BlindPreset): void {
    if (event.button !== 0) {
      return;
    }
    window.clearTimeout(this._pressTimer);
    this._pressing = true;
    this._pressFired = false;
    this._pressTimer = window.setTimeout(() => {
      this._pressFired = true;
      this._lastTap = undefined;
      void this.applyPreset(room, preset);
    }, LONG_PRESS_MS);
  }

  private pressEnd(room: RoomConfig, preset: BlindPreset): void {
    window.clearTimeout(this._pressTimer);
    const wasPressing = this._pressing;
    const fired = this._pressFired;
    this._pressing = false;
    this._pressFired = false;
    if (!wasPressing || fired) {
      return;
    }
    const key = `${room.name}|${preset.id}`;
    const now = performance.now();
    if (this._lastTap && this._lastTap.key === key && now - this._lastTap.time <= DOUBLE_TAP_MS) {
      this._lastTap = undefined;
      void this.applyPreset(room, preset);
    } else {
      this._lastTap = { key, time: now };
    }
  }

  private pressCancel(): void {
    window.clearTimeout(this._pressTimer);
    this._pressing = false;
    this._pressFired = false;
  }

  private async applyPreset(room: RoomConfig, preset: BlindPreset): Promise<void> {
    if (!this.hass || !room.cover) {
      return;
    }
    try {
      await this.hass.callService(COVER_SCRIPT.domain, COVER_SCRIPT.service, {
        entity: room.cover,
        pos: preset.position,
        tilt: preset.tilt,
      });
      this._flash = `${room.name}|${preset.id}`;
      window.clearTimeout(this._flashTimer);
      this._flashTimer = window.setTimeout(() => {
        this._flash = undefined;
      }, FLASH_MS);
    } catch (error) {
      console.error("Klima Dashboard: skript žaluzií selhal", error);
      this.showNotice(`${room.name}: skript žaluzií se nepodařilo spustit.`);
    }
  }

  private showNotice(message: string): void {
    this._notice = message;
    window.clearTimeout(this._noticeTimer);
    this._noticeTimer = window.setTimeout(() => {
      this._notice = undefined;
    }, NOTICE_MS);
  }

  // ----------------------------------------------------------------- sheet

  /** Popup with the controls of Topení (Vypnuto / Plán / Ručně / Boost) or Klimatizace (režimy). */
  private renderSheet(): TemplateResult | typeof nothing {
    const sheet = this._sheet;
    if (!sheet) {
      return nothing;
    }
    if (sheet.kind === "history") {
      return this.renderHistorySheet(sheet.room);
    }
    const isHeating = sheet.kind === "heating";
    const entityId = isHeating ? sheet.room.heating?.climate : sheet.room.air_conditioner;
    const entity = this.getState(entityId);
    const available = entity !== undefined && !isUnavailable(entity.state.toLowerCase());
    const hvacModes = stringList(entity?.attributes.hvac_modes);
    const presetModes = stringList(entity?.attributes.preset_modes);
    const state = entity?.state.toLowerCase();
    const preset = String(entity?.attributes.preset_mode ?? "none").toLowerCase();

    const options = !available || !entityId
      ? []
      : isHeating
        ? this.heatingOptions(entityId, hvacModes, presetModes, state, preset)
        : this.climateOptions(entityId, hvacModes, state);
    const presets =
      !isHeating && available && entityId
        ? presetModes.filter((mode) => mode !== "none")
        : [];

    return html`
      <div class="backdrop" @click=${() => this.closeSheet()} @keydown=${this.handleSheetKeydown}>
        <div
          class="sheet"
          role="dialog"
          aria-modal="true"
          aria-labelledby="sheet-title"
          @click=${(event: Event) => event.stopPropagation()}
        >
          <div class="sheet-head">
            <div>
              <h2 id="sheet-title">${isHeating ? "Topení" : "Klimatizace"}</h2>
              <div class="sheet-sub">${sheet.room.name}</div>
            </div>
            <button
              type="button"
              class="plain-button close"
              aria-label="Zavřít"
              @click=${() => this.closeSheet()}
            >
              ✕
            </button>
          </div>
          ${!available
            ? html`<p class="sheet-message">Entita je nedostupná.</p>`
            : options.length === 0
              ? html`<p class="sheet-message">Entita neuvádí podporované režimy.</p>`
              : html`<div class="options" role="group" aria-label="Režim">
                  ${options.map((option) => this.renderOption(option))}
                </div>`}
          ${presets.length > 0
            ? html`<div class="sheet-label" id="preset-label">Předvolby</div>
                <div class="chips" role="group" aria-labelledby="preset-label">
                  ${presets.map((mode) =>
                    this.renderPresetChip(entityId as EntityId, mode, preset, state, presetModes),
                  )}
                </div>`
            : nothing}
          ${this._sheetError
            ? html`<p class="sheet-message error" role="alert">${this._sheetError}</p>`
            : nothing}
          <button
            type="button"
            class="plain-button sheet-link"
            ?disabled=${!entityId}
            @click=${() => {
              this.closeSheet(false);
              this.showMoreInfo(entityId);
            }}
          >
            Detail a historie
          </button>
        </div>
      </div>
    `;
  }

  /** „Historie místnosti – 24 h“ in the same popup frame as the Topení / Klimatizace controls. */
  private renderHistorySheet(room: RoomConfig): TemplateResult {
    let body: TemplateResult;
    if (this._historyStatus === "loading") {
      body = html`<p class="sheet-message">Načítám historii…</p>`;
    } else if (this._historyStatus === "error") {
      body = html`<p class="sheet-message error" role="alert">Historii se nepodařilo načíst.</p>`;
    } else if (!hasChartData(this._historyData, [room.temperature, room.humidity])) {
      body = html`<p class="sheet-message">Za posledních 24 hodin nejsou k dispozici data.</p>`;
    } else {
      body = renderRoomChart(this._historyData, room, this._historyRange);
    }
    const detail = room.temperature ?? room.humidity;

    return html`
      <div class="backdrop" @click=${() => this.closeSheet()} @keydown=${this.handleSheetKeydown}>
        <div
          class="sheet history-sheet"
          role="dialog"
          aria-modal="true"
          aria-labelledby="sheet-title"
          @click=${(event: Event) => event.stopPropagation()}
        >
          <div class="sheet-head">
            <div>
              <h2 id="sheet-title">Historie místnosti – 24 h</h2>
              <div class="sheet-sub">${room.name}</div>
            </div>
            <button
              type="button"
              class="plain-button close"
              aria-label="Zavřít"
              @click=${() => this.closeSheet()}
            >
              ✕
            </button>
          </div>
          ${body}
          <button
            type="button"
            class="plain-button sheet-link"
            ?disabled=${!detail}
            @click=${() => {
              this.closeSheet(false);
              this.showMoreInfo(detail);
            }}
          >
            Detail teploty
          </button>
        </div>
      </div>
    `;
  }

  private async loadRoomHistory(room: RoomConfig): Promise<void> {
    const request = ++this._historyRequest;
    this._historyStatus = "loading";
    this._historyData = {};
    if (!this.hass) {
      this._historyStatus = "error";
      return;
    }
    const ids = [
      room.temperature,
      room.humidity,
      room.heating?.overlay,
      room.heating?.climate,
      room.heating?.intensity,
      room.air_conditioner,
    ].filter((entityId): entityId is EntityId => Boolean(entityId));
    const endMs = Date.now();
    const startMs = endMs - 24 * HOUR_MS;
    try {
      const history = await fetchHistory(this.hass, ids, startMs, endMs);
      if (request !== this._historyRequest) {
        return;
      }
      this._historyData = history;
      this._historyRange = { startMs, endMs };
      this._historyStatus = "ready";
    } catch (error) {
      console.error("Klima Dashboard: načtení historie místnosti selhalo", error);
      if (request === this._historyRequest) {
        this._historyStatus = "error";
      }
    }
  }

  private renderOption(option: SheetOption): TemplateResult {
    return html`
      <button
        type="button"
        class="plain-button option"
        style=${`--tone: ${option.color}`}
        aria-pressed=${option.active ? "true" : "false"}
        ?disabled=${option.unsupported !== undefined}
        @click=${() => void this.runSheetAction(option.run)}
      >
        <span class="option-icon">${option.icon}</span>
        <span class="option-text">
          ${option.label}
          ${option.unsupported ? html`<span class="option-hint">${option.unsupported}</span>` : nothing}
        </span>
      </button>
    `;
  }

  private renderPresetChip(
    entityId: EntityId,
    mode: string,
    current: string,
    state: string | undefined,
    presetModes: string[],
  ): TemplateResult {
    const active = current === mode && state !== "off";
    // Choosing the active preset again clears it, when the entity has a "none" preset.
    const target = active && presetModes.includes("none") ? "none" : mode;
    return html`
      <button
        type="button"
        class="plain-button chip"
        aria-pressed=${active ? "true" : "false"}
        @click=${() => void this.runSheetAction(() => this.setPresetMode(entityId, target))}
      >
        ${formatPreset(mode)}
      </button>
    `;
  }

  /**
   * Topení options come from the entity's own `hvac_modes`: Vypnuto (off), Plán (auto) and
   * Ručně (heat). Boost needs a `boost` preset; without it the option is shown but disabled.
   */
  private heatingOptions(
    entityId: EntityId,
    hvacModes: string[],
    presetModes: string[],
    state: string | undefined,
    preset: string,
  ): SheetOption[] {
    const options: SheetOption[] = [];
    const add = (
      id: HeatingOptionId,
      label: string,
      color: string,
      active: boolean,
      run: () => Promise<void>,
      unsupported?: string,
    ): void => {
      options.push({ id, label, icon: renderHeatingOptionIcon(id), color, active, run, unsupported });
    };
    if (hvacModes.includes("off")) {
      add("off", "Vypnuto", COLORS.off, state === "off", () => this.setHvacMode(entityId, "off"));
    }
    if (hvacModes.includes("auto")) {
      add("auto", "Plán", COLORS.plan, state === "auto", () => this.setHvacMode(entityId, "auto"));
    }
    if (hvacModes.includes("heat")) {
      add("heat", "Ručně", COLORS.warning, state === "heat" && preset !== "boost", () =>
        this.setHvacMode(entityId, "heat"),
      );
    }
    if (options.length > 0) {
      const boost = presetModes.includes("boost");
      add(
        "boost",
        "Boost",
        COLORS.alert,
        boost && preset === "boost" && state !== "off",
        () => this.setPresetMode(entityId, "boost"),
        boost ? undefined : "entita nenabízí",
      );
    }
    return options;
  }

  private climateOptions(
    entityId: EntityId,
    hvacModes: string[],
    state: string | undefined,
  ): SheetOption[] {
    return CLIMATE_MODE_ORDER.filter((mode) => hvacModes.includes(mode)).map((mode) => {
      const climateMode = climateModeFromState(mode);
      const color = CLIMATE_COLORS[climateMode];
      return {
        id: mode,
        label: CLIMATE_LABELS[climateMode],
        icon: this.renderClimateIcon(climateMode, color, false),
        color,
        active: state === mode,
        run: () => this.setHvacMode(entityId, mode),
      };
    });
  }

  private setHvacMode(entityId: EntityId, hvacMode: string): Promise<void> {
    return this.callClimate("set_hvac_mode", { entity_id: entityId, hvac_mode: hvacMode });
  }

  private setPresetMode(entityId: EntityId, presetMode: string): Promise<void> {
    return this.callClimate("set_preset_mode", { entity_id: entityId, preset_mode: presetMode });
  }

  private async callClimate(service: string, data: Record<string, unknown>): Promise<void> {
    if (!this.hass) {
      throw new Error("Home Assistant není připojen.");
    }
    await this.hass.callService("climate", service, data);
  }

  private async runSheetAction(run: () => Promise<void>): Promise<void> {
    this._sheetError = undefined;
    try {
      await run();
    } catch (error) {
      console.error("Klima Dashboard: příkaz klimatu selhal", error);
      this._sheetError = "Příkaz se nepodařilo odeslat.";
    }
  }

  private handleSheetKeydown = (event: KeyboardEvent): void => {
    if (event.key === "Escape") {
      event.stopPropagation();
      this.closeSheet();
      return;
    }
    if (event.key !== "Tab") {
      return;
    }
    const items = [
      ...this.renderRoot.querySelectorAll<HTMLElement>(".sheet button:not([disabled])"),
    ];
    if (items.length === 0) {
      return;
    }
    const current = (this.renderRoot as ShadowRoot).activeElement as HTMLElement | null;
    const index = current ? items.indexOf(current) : -1;
    const next = event.shiftKey
      ? items[index <= 0 ? items.length - 1 : index - 1]
      : items[index === -1 || index === items.length - 1 ? 0 : index + 1];
    event.preventDefault();
    next.focus();
  };

  private openSheet(kind: SheetKind, room: RoomConfig, event: Event): void {
    this._opener = event.currentTarget instanceof HTMLElement ? event.currentTarget : undefined;
    this._sheetError = undefined;
    this._sheet = { kind, room };
    if (kind === "history") {
      void this.loadRoomHistory(room);
    }
  }

  private closeSheet(restoreFocus = true): void {
    this._historyRequest += 1;
    this._sheet = undefined;
    this._sheetError = undefined;
    if (restoreFocus) {
      this._opener?.focus();
    }
    this._opener = undefined;
  }

  // ---------------------------------------------------------------- trends

  private async loadTrends(): Promise<void> {
    if (!this.hass || !this._config || this._trendsLoading) {
      return;
    }
    const ids = trendEntityIds(this._config);
    if (ids.length === 0) {
      return;
    }
    this._trendsLoading = true;
    const endMs = Date.now();
    const startMs = endMs - TREND_WINDOW_MS;
    try {
      const history = await fetchHistory(this.hass, ids, startMs, endMs);
      const next: Record<EntityId, Array<number | undefined>> = {};
      for (const entityId of ids) {
        next[entityId] = sampleNumeric(history[entityId], startMs, endMs, TREND_SAMPLES);
      }
      this._trends = next;
    } catch (error) {
      console.error("Klima Dashboard: načtení historie pro mikrotrendy selhalo", error);
    } finally {
      this._trendsLoading = false;
    }
  }

  // ----------------------------------------------------------------- state

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
    if (state === undefined || isUnavailable(state.toLowerCase())) {
      return undefined;
    }

    const value = Number.parseFloat(state);
    return Number.isFinite(value) ? value : undefined;
  }

  private getState(entityId: EntityId | undefined): HassEntity | undefined {
    return entityId ? this.hass?.states[entityId] : undefined;
  }

  private entityState(entityId: EntityId | undefined): string | undefined {
    return this.getState(entityId)?.state;
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
}
