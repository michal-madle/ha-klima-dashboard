import { LitElement, html, nothing } from "lit";
import { property, state } from "lit/decorators.js";
import type { PropertyValues, TemplateResult } from "lit";
import { DEFAULT_THRESHOLDS, HOUSE_MODE_ENTITY, normalizeConfig } from "./config";
import { styles } from "./styles";
import type {
  DashboardConfig,
  DashboardThresholds,
  EntityId,
  HassEntity,
  HomeAssistant,
  Reading,
  RoomConfig,
  SamsungMode,
} from "./types";
import {
  COLORS,
  SAMSUNG_COLORS,
  SAMSUNG_LABELS,
  configuredEntityIds,
  formatHalf,
  formatOne,
  getRoomStatus,
  heatingWaveCount,
  isUnavailable,
  numberAttribute,
  sameAttributes,
} from "./utils";

export class HaKlimaDashboard extends LitElement {
  static styles = styles;

  @state()
  private _config?: DashboardConfig;

  @property({ attribute: false })
  hass?: HomeAssistant;

  setConfig(config: DashboardConfig): void {
    this._config = normalizeConfig(config);
  }

  protected shouldUpdate(changedProperties: PropertyValues<this>): boolean {
    if (!changedProperties.has("hass") || changedProperties.has("_config")) {
      return super.shouldUpdate(changedProperties);
    }
    return this.hasRelevantEntityChanged(changedProperties.get("hass"));
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
    const status = getRoomStatus(
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
              : html`${formatOne(temperature.value)}<span class="temperature-unit">
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
    const unavailable = overlay === undefined || isUnavailable(overlay);
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
    } else if (!unavailable && (climateState === undefined || isUnavailable(climateState))) {
      label = "––";
    } else if (overlay === "schedule") {
      label = "Plán";
      color = COLORS.plan;
      strong = true;
      if (target !== undefined) {
        extra = `· ${formatHalf(target)}\u00a0°C`;
      }
    } else if (overlay === "manual") {
      label = "Ručně";
      color = COLORS.warning;
      strong = true;
      if (target !== undefined) {
        extra = `· ${formatHalf(target)}\u00a0°C`;
      }
    } else if (!unavailable && overlay) {
      label = overlay;
      color = COLORS.warning;
      strong = true;
    }

    const count = disabled || unavailable ? 0 : heatingWaveCount(heating);
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

    if (entity && !isUnavailable(entity.state.toLowerCase())) {
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
      target = numberAttribute(entity.attributes.temperature);
    }

    const color = SAMSUNG_COLORS[mode];
    const label = SAMSUNG_LABELS[mode];
    const hasTarget = ["cool", "wind_free", "dry", "heat", "auto"].includes(mode);
    const extra =
      hasTarget && target !== undefined ? `· ${formatHalf(target)}\u00a0°C` : "";
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
    const unavailable = state === undefined || isUnavailable(state);
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
    const position = numberAttribute(entity?.attributes.current_position);
    const tilt = numberAttribute(entity?.attributes.current_tilt_position);
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

  private handleRoomKeydown(event: KeyboardEvent, entityId: EntityId | undefined): void {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      this.showMoreInfo(entityId);
    }
  }
}
