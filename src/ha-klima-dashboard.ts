import { LitElement, html, nothing, svg } from "lit";
import { property, state } from "lit/decorators.js";
import type { PropertyValues, TemplateResult } from "lit";
import { BLIND_HEIGHT, BLIND_WIDTH, renderBlindShape } from "./blind";
import { hasChartData, renderAirChart, renderRoomChart } from "./charts";
import { DEFAULT_THRESHOLDS, HOUSE_MODE_ENTITY, normalizeConfig } from "./config";
import {
  HOUR_MS,
  TREND_SAMPLES,
  TREND_WINDOW_MS,
  fetchHistory,
  normalizeTrend,
  sampleNumeric,
} from "./history";
import type { HistoryMap } from "./history";
import { styles } from "./styles";
import type {
  BlindPreset,
  DashboardConfig,
  DashboardThresholds,
  DialogKind,
  DialogState,
  EntityId,
  HassEntity,
  HomeAssistant,
  Reading,
  RoomConfig,
  ClimateMode,
} from "./types";
import {
  BLIND_PRESETS,
  COLORS,
  COVER_SCRIPT,
  CLIMATE_COLORS,
  CLIMATE_LABELS,
  TREND_MIN_SPAN,
  configuredEntityIds,
  formatHalf,
  formatOne,
  formatPreset,
  getRoomStatus,
  heatingWaveCount,
  isUnavailable,
  numberAttribute,
  sameAttributes,
  trendEntityIds,
} from "./utils";

const TREND_REFRESH_MS = 5 * 60_000;
const NOTICE_MS = 8_000;
const NBSP = " ";

type DialogStatus = "loading" | "ready" | "error";

export class HaKlimaDashboard extends LitElement {
  static styles = styles;

  @state()
  private _config?: DashboardConfig;

  @property({ attribute: false })
  hass?: HomeAssistant;

  @state()
  private _dialog?: DialogState;

  @state()
  private _dialogStatus: DialogStatus = "loading";

  @state()
  private _dialogHistory: HistoryMap = {};

  @state()
  private _dialogRange = { startMs: 0, endMs: 0 };

  @state()
  private _trends: Record<EntityId, Array<number | undefined>> = {};

  @state()
  private _notice?: string;

  private _trendTimer?: number;
  private _noticeTimer?: number;
  private _trendsLoading = false;
  private _trendsStarted = false;
  private _dialogRequest = 0;
  private _opener?: HTMLElement;

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
    this._trendTimer = undefined;
    this._noticeTimer = undefined;
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
    if (changedProperties.has("_dialog") && this._dialog) {
      this.renderRoot.querySelector<HTMLElement>(".dialog .close")?.focus();
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
              this.renderRoom(room, isSummer, modeKnown, thresholds),
            )}
          </div>
        </div>
        ${this.renderDialog(thresholds)}
      </ha-card>
    `;
  }

  private thresholds(): DashboardThresholds {
    return { ...DEFAULT_THRESHOLDS, ...this._config?.thresholds };
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

    return html`
      <article class="room" aria-label=${room.name}>
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
            aria-label=${`${room.name}: historie místnosti za 24 hodin`}
            @click=${(event: Event) => this.openDialog("room", room, event)}
          >
            ${temperature.value === undefined
              ? html`<span class="missing">––</span>`
              : html`${formatOne(temperature.value)}<span class="temperature-unit">${NBSP}°C</span>`}
          </button>
          <span class="humidity">
            ${humidity.value === undefined
              ? html`<span class="missing">––</span>`
              : html`${Math.round(humidity.value)}${NBSP}%`}
          </span>
        </div>
        <div class="lower">
          <div class="info">
            ${this.renderAirRow(
              room,
              html`<ha-icon icon="mdi:molecule-co2"></ha-icon>`,
              "CO₂",
              co2,
              "ppm",
              thresholds.co2_warning,
              thresholds.co2_critical,
              room.carbon_dioxide,
              TREND_MIN_SPAN.co2,
            )}
            ${this.renderAirRow(
              room,
              this.renderParticlesIcon(),
              "PM2.5",
              pm25,
              "µg/m³",
              thresholds.pm25_warning,
              thresholds.pm25_critical,
              room.pm25,
              TREND_MIN_SPAN.pm25,
            )}
            <div class="hvac">
              <div class="hvac-rows">
                ${primaryIsClimate
                  ? this.renderClimate(room.air_conditioner, true)
                  : this.renderHeating(room.heating, true)}
                ${primaryIsClimate
                  ? this.renderHeating(room.heating, false)
                  : this.renderClimate(room.air_conditioner, false)}
              </div>
              ${this.renderSpark(room.temperature, TREND_MIN_SPAN.temperature, "Trend teploty", 48, 40)}
            </div>
            ${this.renderWindow(room.window)}
          </div>
          ${room.cover ? this.renderCover(room, room.cover) : html`<div class="cover-column"></div>`}
        </div>
      </article>
    `;
  }

  /** PM2.5 icon: scattered dots of different sizes, no frame and no text (CURRENT_SPEC.md, Room Card). */
  private renderParticlesIcon(): TemplateResult {
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

  private renderAirRow(
    room: RoomConfig,
    icon: TemplateResult,
    label: string,
    reading: Reading,
    unit: string,
    warningThreshold: number,
    criticalThreshold: number,
    entityId: EntityId | undefined,
    minSpan: number,
  ): TemplateResult {
    const color =
      reading.value === undefined
        ? COLORS.label
        : reading.value >= criticalThreshold
          ? COLORS.alert
          : reading.value >= warningThreshold
            ? COLORS.warning
            : COLORS.white;
    const disabled = !room.carbon_dioxide && !room.pm25;

    return html`
      <button
        type="button"
        class="plain-button air-row"
        ?disabled=${disabled}
        aria-label=${`${room.name}: ${label}, graf CO₂ a PM2.5 za 24 hodin`}
        @click=${(event: Event) => this.openDialog("air", room, event)}
      >
        <span class="air-icon" aria-hidden="true">${icon}</span>
        ${reading.value === undefined
          ? html`<span style=${`color: ${COLORS.label}`}>––</span>`
          : html`<span style=${`color: ${color}`}>${Math.round(reading.value)}</span>
              <span class="air-value-unit">${unit}</span>`}
        ${this.renderSpark(entityId, minSpan, `Trend ${label}`)}
      </button>
    `;
  }

  private renderSpark(
    entityId: EntityId | undefined,
    minSpan: number,
    label: string,
    width = 44,
    height = 14,
  ): TemplateResult | typeof nothing {
    const samples = entityId ? this._trends[entityId] : undefined;
    if (!samples) {
      return nothing;
    }
    const normalized = normalizeTrend(samples, minSpan);
    const pad = 2;
    const points = normalized
      .map((value, index) =>
        value === undefined
          ? undefined
          : `${((index / (TREND_SAMPLES - 1)) * width).toFixed(1)},${(
              pad +
              (1 - value) * (height - 2 * pad)
            ).toFixed(1)}`,
      )
      .filter((point): point is string => point !== undefined);
    if (points.length < 2) {
      return nothing;
    }
    return html`<svg
      class="spark"
      viewBox="0 0 ${width} ${height}"
      style=${`width: ${width}px; height: ${height}px; flex-basis: ${width}px`}
      aria-hidden="true"
      data-label=${label}
    >
      <polyline
        points=${points.join(" ")}
        fill="none"
        stroke=${COLORS.label}
        stroke-width="1.4"
        stroke-linecap="round"
        stroke-linejoin="round"
      ></polyline>
    </svg>`;
  }

  // --------------------------------------------------------------- Topení

  private renderHeating(config: RoomConfig["heating"], primary: boolean): TemplateResult {
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
      this.renderHeatingWaves(count, unavailable),
      label,
      color,
      primary && strong,
      extra,
      primary,
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

  private renderClimate(entityId: EntityId | undefined, primary: boolean): TemplateResult {
    const entity = this.getState(entityId);
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
      this.renderClimateIcon(mode, color, mode === "unknown"),
      label ?? CLIMATE_LABELS[mode],
      color,
      primary && active,
      extra,
      primary,
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

  // ---------------------------------------------------------------- window

  private renderWindow(entityId: EntityId | undefined): TemplateResult {
    const state = this.entityState(entityId)?.toLowerCase();
    const unavailable = state === undefined || isUnavailable(state);
    const opened = state === "on";
    // Red is reserved for critical air values (CURRENT_SPEC.md, Barvy); an open window is
    // only emphasised.
    const color = unavailable ? COLORS.label : opened ? COLORS.white : COLORS.label;
    const label = unavailable ? "––" : opened ? "Otevřeno" : "Zavřeno";

    return html`
      <div class="system-row window-row ${opened ? "strong" : ""}" style=${`--row-color: ${color}`}>
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
      <div class="cover-column">
        <div class="presets" role="group" aria-label=${`${room.name}: předvolby žaluzií`}>
          ${BLIND_PRESETS.map((preset) => this.renderPreset(room, preset, position, tilt))}
        </div>
        <button
          type="button"
          class="plain-button cover-panel"
          aria-label=${`${room.name}: žaluzie, ${description}. Otevřít ovládání.`}
          @click=${() => this.showMoreInfo(entityId)}
        >
          <svg viewBox="0 0 ${BLIND_WIDTH} ${BLIND_HEIGHT}" aria-hidden="true">
            ${renderBlindShape(position, tilt)}
          </svg>
        </button>
      </div>
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

    return html`
      <button
        type="button"
        class="plain-button preset"
        aria-pressed=${active ? "true" : "false"}
        aria-label=${`${room.name}: žaluzie ${preset.description} (poloha ${preset.position} %, naklopení ${preset.tilt} %)`}
        @click=${() => void this.applyPreset(room, preset)}
      >
        ${preset.label}
      </button>
    `;
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

  // ---------------------------------------------------------------- dialog

  private renderDialog(thresholds: DashboardThresholds): TemplateResult | typeof nothing {
    const dialog = this._dialog;
    if (!dialog) {
      return nothing;
    }
    const title =
      dialog.kind === "room" ? "Historie místnosti – 24 h" : "CO₂ a PM2.5 – 24 h";
    const entityIds =
      dialog.kind === "room"
        ? [dialog.room.temperature, dialog.room.humidity]
        : [dialog.room.carbon_dioxide, dialog.room.pm25];

    let body: TemplateResult;
    if (this._dialogStatus === "loading") {
      body = html`<p class="dialog-message">Načítám historii…</p>`;
    } else if (this._dialogStatus === "error") {
      body = html`<p class="dialog-message" role="alert">
        Historii se nepodařilo načíst.
      </p>`;
    } else if (!hasChartData(this._dialogHistory, entityIds)) {
      body = html`<p class="dialog-message">Za posledních 24 hodin nejsou k dispozici data.</p>`;
    } else if (dialog.kind === "room") {
      body = renderRoomChart(this._dialogHistory, dialog.room, this._dialogRange);
    } else {
      body = renderAirChart(this._dialogHistory, dialog.room, thresholds, this._dialogRange);
    }

    return html`
      <div class="backdrop" @click=${() => this.closeDialog()} @keydown=${this.handleDialogKeydown}>
        <div
          class="dialog"
          role="dialog"
          aria-modal="true"
          aria-labelledby="dialog-title"
          @click=${(event: Event) => event.stopPropagation()}
        >
          <div class="dialog-head">
            <h2 id="dialog-title">${title} · ${dialog.room.name}</h2>
            <button
              type="button"
              class="plain-button close"
              aria-label="Zavřít"
              @click=${() => this.closeDialog()}
            >
              ✕
            </button>
          </div>
          ${body}
        </div>
      </div>
    `;
  }

  private handleDialogKeydown = (event: KeyboardEvent): void => {
    if (event.key === "Escape") {
      event.stopPropagation();
      this.closeDialog();
    } else if (event.key === "Tab") {
      // The close button is the only focusable element in the dialog.
      event.preventDefault();
      this.renderRoot.querySelector<HTMLElement>(".dialog .close")?.focus();
    }
  };

  private openDialog(kind: DialogKind, room: RoomConfig, event: Event): void {
    this._opener = event.currentTarget instanceof HTMLElement ? event.currentTarget : undefined;
    this._dialog = { kind, room };
    this._dialogStatus = "loading";
    this._dialogHistory = {};
    void this.loadDialogHistory(kind, room);
  }

  private closeDialog(): void {
    this._dialogRequest += 1;
    this._dialog = undefined;
    this._opener?.focus();
    this._opener = undefined;
  }

  private async loadDialogHistory(kind: DialogKind, room: RoomConfig): Promise<void> {
    const request = ++this._dialogRequest;
    if (!this.hass) {
      this._dialogStatus = "error";
      return;
    }
    const entityIds =
      kind === "room"
        ? [
            room.temperature,
            room.humidity,
            room.heating?.overlay,
            room.heating?.climate,
            room.heating?.intensity,
            room.air_conditioner,
          ]
        : [room.carbon_dioxide, room.pm25];
    const ids = entityIds.filter((entityId): entityId is EntityId => Boolean(entityId));
    const endMs = Date.now();
    const startMs = endMs - 24 * HOUR_MS;

    try {
      const history = await fetchHistory(this.hass, ids, startMs, endMs);
      if (request !== this._dialogRequest) {
        return;
      }
      this._dialogHistory = history;
      this._dialogRange = { startMs, endMs };
      this._dialogStatus = "ready";
    } catch (error) {
      console.error("Klima Dashboard: načtení historie selhalo", error);
      if (request === this._dialogRequest) {
        this._dialogStatus = "error";
      }
    }
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
