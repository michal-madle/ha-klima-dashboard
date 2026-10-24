import { LitElement, html, nothing } from "lit";
import { property, state } from "lit/decorators.js";
import type { PropertyValues, TemplateResult } from "lit";
import { BLIND_HEIGHT, BLIND_WIDTH, renderBlindShape } from "./blind";
import { normalizeConfig, plainText } from "./config";
import { SCRUB_STEP_MS, buildRoomChart, hasChartData, renderRoomChart, timeAtX } from "./charts";
import type { RoomChartModel } from "./charts";
import {
  renderClimateIcon,
  renderHeatingOptionIcon,
  renderHeatingWaves,
  renderParticlesIcon,
  renderPresetIcon,
  renderWindowIcon,
} from "./icons";
import type { HeatingOptionId } from "./icons";
import { renderScene, sceneTone } from "./scenes";
import { HOUR_MS, fetchHistory, normalizeToAxis, sampleNumeric, sharedAxis } from "./history";
import { styles } from "./styles";
import { houseSummary, openWindows, roomConflicts, roomHeating } from "./summary";
import type { RoomConflict, SummaryChip } from "./summary";
import { climateView, spokenSystem } from "./systems";
import type { SystemView } from "./systems";
import type {
  BlindPreset,
  DashboardConfig,
  EntityId,
  HassEntity,
  HomeAssistant,
  Reading,
  Room,
  Settings,
  SheetKind,
  SheetState,
  Theme,
  TrendAxis,
  TrendKind,
} from "./types";
import {
  blindMatchesPreset,
  COLORS,
  CLIMATE_COLORS,
  CLIMATE_LABELS,
  climateModeFromState,
  configuredEntityIds,
  formatAge,
  formatDuration,
  formatOne,
  formatPreset,
  getRoomStatus,
  isUnavailable,
  lastHours,
  measurementEntityIds,
  numberAttribute,
  sameAttributes,
  spokenDuration,
  spokenPeriod,
  stringList,
  trendDirection,
  trendEntityIds,
  trendStep,
} from "./utils";

const TREND_REFRESH_MS = 5 * 60_000;
const CLOCK_TICK_MS = 30_000;
const NOTICE_MS = 8_000;
const NBSP = " ";

/** Blind presets are sent only by a long press or a double tap, never by a single tap. */
const LONG_PRESS_MS = 550;
const DOUBLE_TAP_MS = 400;
const FLASH_MS = 700;
/** How long the "hold or double tap" hint stays after a single tap on a preset. */
const HINT_MS = 1_600;

/** Pull-down distance or speed that closes a popup (iOS sheet). */
const SHEET_CLOSE_DISTANCE = 100;
const SHEET_CLOSE_SPEED = 0.6;
const SHEET_DRAG_SLOP = 6;

type TrendAxes = Partial<Record<TrendKind, TrendAxis>>;
type HistoryStatus = "loading" | "ready" | "error";
/** Haptic types forwarded by the Home Assistant app to the Taptic Engine. */
type HapticType = "success" | "failure" | "warning" | "selection" | "light";

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

interface SheetDrag {
  pointerId: number;
  startY: number;
  startTime: number;
  dragging: boolean;
}

const CLIMATE_MODE_ORDER = ["off", "cool", "dry", "fan_only", "auto", "heat"];
const SYSTEM_NAMES: Record<"heating" | "climate", string> = { heating: "Topení", climate: "Klimatizace" };

export class HaKlimaDashboard extends LitElement {
  static styles = styles;

  @state()
  private _config?: Settings;

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
  private _historyModel?: RoomChartModel;

  /** Time under the finger in the history chart; undefined = now. */
  @state()
  private _scrubTime?: number;

  /** Pull-down offset of the open popup in px. */
  @state()
  private _dragY = 0;

  /** Key of the blind preset that was just sent (brief confirmation flash). */
  @state()
  private _flash?: string;

  /** Preset on its way per room (room name -> preset id): its icon pulses until the blind arrives. */
  @state()
  private _moving: Record<string, string> = {};

  /** The system colour scheme; decides `theme: auto` when Home Assistant does not say (CURRENT_SPEC.md, Barvy). */
  @state()
  private _prefersDark = true;

  private _colorScheme?: MediaQueryList;

  /** Blind preset that shows a hint bubble ("hold or double tap" / "unavailable"). */
  @state()
  private _hint?: { key: string; text: string };

  /** Segment to focus after switching Topení / Klimatizace with the arrow keys. */
  private _focusSegment?: "heating" | "climate";

  @state()
  private _trends: Record<EntityId, Array<number | undefined>> = {};

  @state()
  private _trendsLoaded = false;

  /** last_reported (ms) of the room measurements, from the REST state; see staleness. */
  @state()
  private _reported: Record<EntityId, number> = {};

  @state()
  private _notice?: string;

  private _historyRequest = 0;
  private _scrubbing = false;
  private _drag?: SheetDrag;
  private _trendTimer?: number;

  /** Re-renders the card every 30 s while a window is open, so its "open for" time keeps counting. */
  private _clockTimer?: number;

  @state()
  private _clock = 0;
  private _noticeTimer?: number;
  private _trendsLoading = false;
  private _trendsStarted = false;
  private _opener?: HTMLElement;
  private _pressTimer?: number;
  private _flashTimer?: number;
  private _hintTimer?: number;
  private _hintHideTimer?: number;
  /** Per room with a preset on its way: last seen blind state and the stall timer. */
  private _movingWatch = new Map<string, { signature: string; timer?: number }>();
  private _pressing = false;
  private _pressFired = false;
  private _lastTap?: { key: string; time: number };

  setConfig(config: DashboardConfig): void {
    this._config = normalizeConfig(config);
    this._trends = {};
    this._trendsLoaded = false;
    this._reported = {};
    this._trendsStarted = false;
  }

  connectedCallback(): void {
    super.connectedCallback();
    this._colorScheme = window.matchMedia?.("(prefers-color-scheme: dark)");
    this._prefersDark = this._colorScheme?.matches ?? true;
    this._colorScheme?.addEventListener("change", this.handleColorScheme);
    window.clearInterval(this._clockTimer);
    this._clockTimer = window.setInterval(() => {
      if (this.anyWindowOpen()) {
        this._clock = Date.now();
      }
    }, CLOCK_TICK_MS);
    this.requestUpdate();
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this._colorScheme?.removeEventListener("change", this.handleColorScheme);
    this._colorScheme = undefined;
    window.removeEventListener("resize", this.handleResize);
    for (const timer of [this._noticeTimer, this._pressTimer, this._flashTimer, this._hintTimer, this._hintHideTimer]) {
      window.clearTimeout(timer);
    }
    for (const roomName of [...this._movingWatch.keys()]) {
      this.endMoving(roomName);
    }
    window.clearInterval(this._trendTimer);
    window.clearInterval(this._clockTimer);
    this._trendTimer = undefined;
    this._clockTimer = undefined;
    this._noticeTimer = undefined;
    this._pressTimer = undefined;
    this._flashTimer = undefined;
    this._hintTimer = undefined;
    this._hintHideTimer = undefined;
    this._trendsStarted = false;
  }

  protected shouldUpdate(changedProperties: PropertyValues): boolean {
    if (changedProperties.size === 1 && changedProperties.has("hass")) {
      const previous = changedProperties.get("hass") as HomeAssistant | undefined;
      return previous?.themes?.darkMode !== this.hass?.themes?.darkMode || this.hasRelevantEntityChanged(previous);
    }
    return true;
  }

  protected willUpdate(changedProperties: PropertyValues): void {
    if (changedProperties.has("hass")) {
      this.trackMovingPresets();
    }
    // The colours follow an attribute of the host, so the popup (outside .dashboard) gets them too.
    const theme = this.theme();
    if (this.dataset.theme !== theme) {
      this.dataset.theme = theme;
    }
  }

  /**
   * Dark or light (CURRENT_SPEC.md, Barvy): `theme: dark | light` forces it; `auto` follows the
   * dark mode Home Assistant uses (with the "Auto" theme, the system appearance), and without
   * that the system colour scheme of the browser.
   */
  private theme(): Theme {
    const setting = this._config?.theme ?? "auto";
    if (setting !== "auto") {
      return setting;
    }
    const dark = this.hass?.themes?.darkMode;
    return (typeof dark === "boolean" ? dark : this._prefersDark) ? "dark" : "light";
  }

  private handleColorScheme = (event: MediaQueryListEvent): void => {
    this._prefersDark = event.matches;
  };

  protected updated(changedProperties: PropertyValues): void {
    if (!this._trendsStarted && this.hass && this._config) {
      this._trendsStarted = true;
      void this.refreshTrends();
      window.clearInterval(this._trendTimer);
      this._trendTimer = window.setInterval(() => void this.refreshTrends(), TREND_REFRESH_MS);
    }
    if (this._focusSegment) {
      this.renderRoot.querySelector<HTMLElement>(`.segment[data-system="${this._focusSegment}"]`)?.focus();
      this._focusSegment = undefined;
    }
    if (changedProperties.has("_sheet") && this._sheet && !changedProperties.get("_sheet")) {
      const first =
        this.renderRoot.querySelector<HTMLElement>(".sheet .option[aria-pressed='true']") ??
        this.renderRoot.querySelector<HTMLElement>(".sheet button:not([disabled])");
      first?.focus();
    }
  }

  private anyWindowOpen(): boolean {
    return (this._config?.rooms ?? []).some((room) => openWindows(room, (entityId) => this.getState(entityId)).length > 0);
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
        previousEntity?.last_updated !== currentEntity?.last_updated ||
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

    // House mode values are compared without case and diacritics ("Léto" = "leto").
    const mode = plainText(this.entityState(this._config.houseModeEntity) ?? "");
    const isSummer = mode === plainText(this._config.houseModes.summer);
    const modeKnown = isSummer || mode === plainText(this._config.houseModes.winter);
    const axes = this.trendAxes(this._config);
    const now = Date.now();
    // An empty title leaves the heading out; the header disappears when nothing else is in it
    // (the second of two cards side by side in a Masonry view, CURRENT_SPEC.md, Dashboard Domov).
    const title = this._config.title;
    const outside = this.renderOutside();
    const chips = houseSummary(
      this._config.rooms,
      (entityId) => this.getState(entityId),
      this.coldRooms(isSummer, modeKnown, now),
    );
    const hasHeader = title !== "" || outside !== nothing || chips.length > 0;

    return html`
      <ha-card>
        <div class="dashboard">
          ${hasHeader
            ? html`<header class="dashboard-header">
                ${title === "" ? nothing : html`<h1>${title}</h1>`}
                ${outside} ${this.renderSummary(chips)}
              </header>`
            : nothing}
          ${this._notice ? html`<div class="notice" role="alert">${this._notice}</div>` : nothing}
          <div class="rooms">
            ${this._config.rooms.map((room, index) =>
              this.renderRoom(room, index, isSummer, modeKnown, axes, now),
            )}
          </div>
        </div>
        ${this.renderSheet(isSummer)}
      </ha-card>
    `;
  }

  /** Names of the rooms whose status is "Chladno" (for the conflict "cooling although cold"). */
  private coldRooms(isSummer: boolean, modeKnown: boolean, now: number): Set<string> {
    const cold = new Set<string>();
    for (const room of this._config?.rooms ?? []) {
      const stale = room.thresholds.stale_minutes;
      const status = getRoomStatus(
        {
          temperature: this.reading(room.temperature, stale, now),
          humidity: this.reading(room.humidity, stale, now),
          co2: this.reading(room.carbon_dioxide, stale, now),
          pm25: this.reading(room.pm25, stale, now),
        },
        isSummer,
        modeKnown,
        room,
      );
      if (status.label === "Chladno") {
        cold.add(room.name);
      }
    }
    return cold;
  }

  /**
   * One axis per quantity for the whole house (CURRENT_SPEC.md, Historie a grafy), so the
   * same value is drawn at the same height in every room.
   */
  private trendAxes(settings: Settings): TrendAxes {
    const series = (pick: (room: Room) => EntityId | undefined) =>
      settings.rooms.map((room) => {
        const entityId = pick(room);
        return entityId ? this._trends[entityId] : undefined;
      });
    return {
      temperature: sharedAxis(series((room) => room.temperature), trendStep(settings.trends, "temperature")),
      co2: sharedAxis(series((room) => room.carbon_dioxide), trendStep(settings.trends, "co2")),
      pm25: sharedAxis(series((room) => room.pm25), trendStep(settings.trends, "pm25")),
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

    // Outdoor air uses the shared PM2.5 limits of the rooms (CURRENT_SPEC.md, Dashboard Domov).
    const thresholds = this._config!.thresholds;
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

  /** House summary chips: only what differs from a quiet house (CURRENT_SPEC.md, Dashboard Domov). */
  private renderSummary(chips: SummaryChip[]): TemplateResult | typeof nothing {
    if (chips.length === 0) {
      return nothing;
    }
    return html`<ul class="summary" aria-label="Souhrn domu">
      ${chips.map((chip) => {
        const icon =
          chip.kind === "windows" || chip.kind === "conflict-window"
            ? renderWindowIcon(chip.color, false)
            : chip.kind === "climate" || chip.kind === "conflict-cooling"
              ? renderClimateIcon("cool", chip.color, false)
              : renderHeatingWaves(3, false);
        return html`<li class="chip" style=${`--chip-color: ${chip.color}`} title=${chip.spoken} aria-label=${chip.spoken}>
          <span class="chip-icon" aria-hidden="true">${icon}</span>${chip.text}
        </li>`;
      })}
    </ul>`;
  }

  // ------------------------------------------------------------------ room

  private renderRoom(
    room: Room,
    index: number,
    isSummer: boolean,
    modeKnown: boolean,
    axes: TrendAxes,
    now: number,
  ): TemplateResult {
    const stale = room.thresholds.stale_minutes;
    const temperature = this.reading(room.temperature, stale, now);
    const humidity = this.reading(room.humidity, stale, now);
    const co2 = this.reading(room.carbon_dioxide, stale, now);
    const pm25 = this.reading(room.pm25, stale, now);
    const status = getRoomStatus({ temperature, humidity, co2, pm25 }, isSummer, modeKnown, room);
    const image = room.image;
    // The measurement that decided the status is drawn in the status colour (CURRENT_SPEC.md,
    // Stavový systém); the other values stay neutral.
    const causeColour = (cause: "temperature" | "humidity") =>
      status.cause === cause ? `color: ${status.color}` : nothing;
    const conflicts = roomConflicts(room, (entityId) => this.getState(entityId), status.label === "Chladno");

    return html`
      <div class="room-cell"><article
        class="room"
        aria-label=${room.name}
        style=${image?.kind === "scene" ? `--scene-tone: ${sceneTone(image.scene)}` : nothing}
      >
        ${this.renderImage(room)}
        ${this.renderTitle(room, index)}
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
            class="plain-button temperature ${temperature.stale ? "stale" : ""}"
            style=${causeColour("temperature")}
            ?disabled=${!room.temperature}
            title=${this.staleTitle(temperature) ?? nothing}
            aria-label=${`${room.name}: teplota ${
              temperature.value === undefined ? "neznámá" : `${formatOne(temperature.value)} °C`
            }${this.staleSpoken(temperature)}, historie místnosti za ${this.historyPeriod()}`}
            @click=${(event: Event) => this.openSheet("history", room, event)}
          >
            ${temperature.value === undefined
              ? html`<span class="missing">––</span>`
              : html`${formatOne(temperature.value)}<span class="temperature-unit">${NBSP}°C</span>`}
          </button>
          <button
            type="button"
            class="plain-button humidity ${humidity.stale ? "stale" : ""}"
            style=${causeColour("humidity")}
            ?disabled=${!room.humidity}
            title=${this.staleTitle(humidity) ?? nothing}
            aria-label=${`${room.name}: vlhkost ${
              humidity.value === undefined ? "neznámá" : `${Math.round(humidity.value)} %`
            }${this.staleSpoken(humidity)}, detail a historie`}
            @click=${() => this.showMoreInfo(room.humidity)}
          >
            ${humidity.value === undefined
              ? html`<span class="missing">––</span>`
              : html`${Math.round(humidity.value)}${NBSP}%`}
          </button>
        </div>
        <div class="lower">
          <div class="info">
            ${this.renderAirBlock(room, index, co2, pm25, axes)}
            ${this.renderHvac(room, isSummer, index)}
            ${this.renderTemperatureTrend(room, temperature, axes.temperature)}
            ${this.renderWindow(room, index, conflicts, now)}
          </div>
          ${room.cover
            ? this.renderCover(room, room.cover)
            : html`<div class="cover-panel" aria-hidden="true"></div>
                <div class="presets" aria-hidden="true"></div>`}
        </div>
      </article></div>
    `;
  }

  /**
   * Picture in the top-right corner (CURRENT_SPEC.md, Room Card): a built-in line drawing, or
   * an image of the user's that fills the same soft rectangle. Both are decorative.
   */
  private renderImage(room: Room): TemplateResult | typeof nothing {
    const image = room.image;
    if (!image) {
      return nothing;
    }
    if (image.kind === "scene") {
      return html`<div class="scene" aria-hidden="true">${renderScene(image.scene)}</div>`;
    }
    return html`<div class="scene photo" aria-hidden="true">
      <img src=${image.url} alt="" loading="lazy" decoding="async" />
    </div>`;
  }

  /** Room name; with `link` a button that opens the page or address (CURRENT_SPEC.md, Room Card). */
  private renderTitle(room: Room, index: number): TemplateResult {
    const link = room.link;
    if (!link) {
      return html`<div class="room-title">${room.name}</div>`;
    }
    const descriptionId = `link-description-${index}`;
    return html`
      <button
        type="button"
        class="plain-button room-title room-link"
        aria-describedby=${descriptionId}
        @click=${() => this.openLink(link)}
      >
        <span class="room-name">${room.name}</span><span class="room-chevron" aria-hidden="true">›</span>
      </button>
      <span class="sr-only" id=${descriptionId}>${link.startsWith("/") ? "Otevře stránku místnosti." : "Otevře odkaz."}</span>
    `;
  }

  /**
   * The room link goes through Home Assistant's own action handling (navigate for a path,
   * url for a web address), the same as a tap action of a built-in card.
   */
  private openLink(link: string): void {
    const tapAction = link.startsWith("/")
      ? { action: "navigate", navigation_path: link }
      : { action: "url", url_path: link };
    this.dispatchEvent(
      new CustomEvent("hass-action", {
        detail: { config: { tap_action: tapAction }, action: "tap" },
        bubbles: true,
        composed: true,
      }),
    );
  }

  /** The room history period after "za": "24 hodin". */
  private historyPeriod(): string {
    return spokenPeriod((this._config?.history.hours ?? 24) * 60);
  }

  /** The micro trend period after "za": "2 hodiny". */
  private trendPeriod(): string {
    return spokenPeriod(this._config?.trends.minutes ?? 120);
  }

  /** On the lighter ground of the popup options the critical red needs a lighter shade to stay readable. */
  private popupColor(color: string): string {
    return color === COLORS.alert ? COLORS.alertOnPopup : color;
  }

  /** Colour of a CO₂ / PM2.5 number: white, orange from the warning limit, red from the critical one; grey without a fresh value. */
  private airColor(reading: Reading, warning: number, critical: number): string {
    if (reading.value === undefined || reading.stale) {
      return COLORS.label;
    }
    return reading.value >= critical ? COLORS.alert : reading.value >= warning ? COLORS.warning : COLORS.white;
  }

  /**
   * CO₂ and PM2.5 are one touch target over both rows (52 px, TODO P1.2). With both sensors it
   * opens the popup "Kvalita vzduchu" with a link to each detail; with one it opens that
   * detail at once. A sensor the room does not have (`carbon_dioxide: false`) has no row; without
   * both the place stays empty, so the rows below keep their position (CURRENT_SPEC.md, Room Card).
   */
  private renderAirBlock(
    room: Room,
    index: number,
    co2: Reading,
    pm25: Reading,
    axes: TrendAxes,
  ): TemplateResult | typeof nothing {
    if (!room.hasCo2 && !room.hasPm25) {
      return nothing;
    }
    const { thresholds } = room;
    const trends = this._config!.trends;
    const configured = [room.carbon_dioxide, room.pm25].filter((entityId): entityId is EntityId => Boolean(entityId));
    const spoken = (label: string, present: boolean, entityId: EntityId | undefined, reading: Reading, unit: string, slot: "co2" | "pm25") => {
      if (!present || !entityId) {
        return undefined;
      }
      const direction =
        reading.value === undefined ? undefined : trendDirection(this._trends[entityId], trendStep(trends, slot));
      return `${label} ${reading.value === undefined ? "neznámé" : `${Math.round(reading.value)} ${unit}`}${
        direction ? `, za ${this.trendPeriod()} ${direction}` : ""
      }${this.staleSpoken(reading)}`;
    };
    const description = [
      spoken("CO₂", room.hasCo2, room.carbon_dioxide, co2, "ppm", "co2"),
      spoken("PM2.5", room.hasPm25, room.pm25, pm25, "µg/m³", "pm25"),
    ]
      .filter(Boolean)
      .join("; ");
    const popup = configured.length > 1;
    const descriptionId = `air-description-${index}`;

    // Like the HVAC button: the accessible name is the visible text (WCAG 2.5.3 Label in Name);
    // the room, the quantity names, the trend and the action are the description.
    return html`
      <button
        type="button"
        class="plain-button air-block"
        ?disabled=${configured.length === 0}
        aria-haspopup=${popup ? "dialog" : nothing}
        aria-describedby=${descriptionId}
        @click=${(event: Event) => (popup ? this.openSheet("air", room, event) : this.showMoreInfo(configured[0]))}
      >
        ${room.hasCo2
          ? this.renderAirRow("co2", room.carbon_dioxide, html`<ha-icon icon="mdi:molecule-co2"></ha-icon>`,
              co2, "ppm", thresholds.co2_warning, thresholds.co2_critical, axes.co2)
          : nothing}
        ${room.hasPm25
          ? this.renderAirRow("pm25", room.pm25, renderParticlesIcon(),
              pm25, "µg/m³", thresholds.pm25_warning, thresholds.pm25_critical, axes.pm25)
          : nothing}
      </button>
      <span class="sr-only" id=${descriptionId}
        >${`${room.name}: kvalita vzduchu, ${description || "bez čidla"}. ${popup ? "Otevře detaily." : "Otevře detail a historii."}`}</span
      >
    `;
  }

  /** Popup "Kvalita vzduchu": CO₂ and PM2.5 with their values, each opens the standard entity detail. */
  private renderAirBody(room: Room, now: number): TemplateResult {
    const { thresholds } = room;
    const stale = thresholds.stale_minutes;
    const rows = [
      { slot: "co2" as const, label: "CO₂", unit: "ppm", present: room.hasCo2, entityId: room.carbon_dioxide, warning: thresholds.co2_warning, critical: thresholds.co2_critical },
      { slot: "pm25" as const, label: "PM2.5", unit: "µg/m³", present: room.hasPm25, entityId: room.pm25, warning: thresholds.pm25_warning, critical: thresholds.pm25_critical },
    ].filter((row) => row.present);
    return html`
      <div class="options list-options" role="group" aria-label="Kvalita vzduchu">
        ${rows.map(({ slot, label, unit, entityId, warning, critical }) => {
          const reading = this.reading(entityId, stale, now);
          const hasValue = reading.value !== undefined;
          const accent = hasValue && !reading.stale ? COLORS[slot] : COLORS.off;
          return html`<button
            type="button"
            class="plain-button option list-option"
            ?disabled=${!entityId}
            @click=${() => {
              this.closeSheet(false);
              this.showMoreInfo(entityId);
            }}
          >
            <span class="option-icon" style=${`color: ${accent}`} aria-hidden="true">
              ${slot === "co2" ? html`<ha-icon icon="mdi:molecule-co2"></ha-icon>` : renderParticlesIcon()}
            </span>
            <span class="option-text">
              <span>${label}</span>
              <span class="option-hint">Detail a historie</span>
            </span>
            <span class="list-value" style=${`color: ${this.popupColor(this.airColor(reading, warning, critical))}`}>
              ${hasValue
                ? `${Math.round(reading.value as number)} ${unit}`
                : html`<span aria-hidden="true">––</span><span class="sr-only">neznámé</span>`}
            </span>
            ${reading.stale ? html`<span class="sr-only">${this.staleSpoken(reading)}</span>` : nothing}
          </button>`;
        })}
      </div>
    `;
  }

  /**
   * One CO₂ / PM2.5 row inside the air block: icon and value in the left column, micro trend
   * in the right column. A stale value is grey, never orange or red.
   */
  private renderAirRow(
    slot: "co2" | "pm25",
    entityId: EntityId | undefined,
    icon: TemplateResult,
    reading: Reading,
    unit: string,
    warningThreshold: number,
    criticalThreshold: number,
    axis: TrendAxis | undefined,
  ): TemplateResult {
    const hasValue = reading.value !== undefined;
    const value = Math.round(reading.value ?? 0);
    const color = this.airColor(reading, warningThreshold, criticalThreshold);
    const accent = COLORS[slot];

    return html`
      <div class="air-row slot-${slot}" title=${this.staleTitle(reading) ?? nothing}>
        <span class="row-main">
          <span class="row-icon" style=${`color: ${hasValue && !reading.stale ? accent : COLORS.off}`} aria-hidden="true">
            ${icon}
          </span>
          <span class="row-text">
            ${hasValue
              ? html`<span class="row-label" style=${`color: ${color}`}>${value}</span>
                  <span class="row-unit">${unit}</span>`
              : html`<span class="row-label" style=${`color: ${COLORS.label}`}>––</span>`}
          </span>
        </span>
        ${hasValue ? this.renderSpark(entityId, axis, accent, reading.stale === true) : nothing}
      </div>
    `;
  }

  /**
   * Temperature micro trend: in the trend column next to the Topení and Klimatizace rows and
   * as tall as both of them (CURRENT_SPEC.md, Room Card). Opens the 24 h room history.
   */
  private renderTemperatureTrend(
    room: Room,
    temperature: Reading,
    axis: TrendAxis | undefined,
  ): TemplateResult | typeof nothing {
    if (!room.temperature || temperature.value === undefined) {
      return nothing;
    }
    const spark = this.renderSpark(room.temperature, axis, COLORS.peach, temperature.stale === true);
    if (spark === nothing) {
      return nothing;
    }
    const direction = trendDirection(this._trends[room.temperature], trendStep(this._config!.trends, "temperature"));
    return html`
      <button
        type="button"
        class="plain-button trend-button slot-temperature-trend"
        aria-label=${`${room.name}: teplota za ${this.trendPeriod()}${direction ? ` ${direction}` : ""}, historie místnosti za ${this.historyPeriod()}`}
        @click=${(event: Event) => this.openSheet("history", room, event)}
      >
        ${spark}
      </button>
    `;
  }

  /**
   * Micro trend (CURRENT_SPEC.md, Historie a grafy): the last `trends.minutes` (120) as one thin line
   * with a soft area and a dot at the latest sample, on the axis shared by the whole house.
   * It fades out to the left (text of the HVAC rows may run into it). Before the first
   * history arrives it is a dotted placeholder line; without history it is left out.
   */
  private renderSpark(
    entityId: EntityId | undefined,
    axis: TrendAxis | undefined,
    color: string,
    stale: boolean,
  ): TemplateResult | typeof nothing {
    if (!entityId) {
      return nothing;
    }
    if (!this._trendsLoaded) {
      return html`<span class="spark loading" aria-hidden="true">
        <span class="spark-plot">
          <svg viewBox="0 0 100 100" preserveAspectRatio="none">
            <line x1="2" y1="50" x2="98" y2="50" stroke="currentColor" stroke-width="1.6"
              stroke-linecap="round" stroke-dasharray="0.1 5" vector-effect="non-scaling-stroke"></line>
          </svg>
        </span>
      </span>`;
    }
    const samples = this._trends[entityId];
    if (!samples || !axis) {
      return nothing;
    }
    const points = normalizeToAxis(samples, axis)
      .map((value, index) =>
        value === undefined
          ? undefined
          : { x: (index / Math.max(1, samples.length - 1)) * 100, y: (1 - value) * 100 },
      )
      .filter((point): point is { x: number; y: number } => point !== undefined);
    if (points.length < 2) {
      return nothing;
    }
    const line = points.map((point) => `${point.x.toFixed(2)},${point.y.toFixed(2)}`).join(" ");
    const first = points[0];
    const last = points[points.length - 1];
    const area = `${line} ${last.x.toFixed(2)},100 ${first.x.toFixed(2)},100`;
    return html`<span class="spark ${stale ? "stale" : ""}" style=${`color: ${color}`} aria-hidden="true">
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

  // ------------------------------------------------------- Topení / Klimatizace

  /**
   * Both HVAC rows are one touch target (≥ 44 px). It always opens the popup of the primary
   * system (by House Mode); a segmented control there switches to the other one
   * (CURRENT_SPEC.md, Ovládání Topení a Klimatizace).
   */
  private renderHvac(room: Room, isSummer: boolean, index: number): TemplateResult {
    const heating = roomHeating(room, (entityId) => this.getState(entityId));
    const climate = climateView(this.getState(room.air_conditioner));
    const heatingRow = (primary: boolean) =>
      this.renderSystemRow(renderHeatingWaves(heating.unknown ? 0 : heating.waves, heating.unknown), heating, primary);
    const climateRow = (primary: boolean) =>
      this.renderSystemRow(renderClimateIcon(climate.mode, climate.color, climate.unknown), climate, primary);
    const order: Array<"heating" | "climate"> = isSummer ? ["climate", "heating"] : ["heating", "climate"];
    const target = this.hvacTarget(room, order);
    const spoken = order
      .map((kind) => `${SYSTEM_NAMES[kind]} ${spokenSystem(kind === "heating" ? heating : climate)}`)
      .join(", ");
    const descriptionId = `hvac-description-${index}`;

    // The accessible name is the visible text of both rows (WCAG 2.5.3 Label in Name, so voice
    // control finds "Plán · 21 °C"); room, system names and the action are the description.
    return html`
      <button
        type="button"
        class="plain-button hvac slot-hvac"
        ?disabled=${!target}
        aria-describedby=${descriptionId}
        @click=${(event: Event) => (target ? this.openSheet(target, room, event) : undefined)}
      >
        ${isSummer ? climateRow(true) : heatingRow(true)}
        ${isSummer ? heatingRow(false) : climateRow(false)}
      </button>
      <span class="sr-only" id=${descriptionId}
        >${`${room.name}: ${spoken}.${target ? ` Otevře ovládání ${SYSTEM_NAMES[target]}.` : ""}`}</span
      >
    `;
  }

  /** The system the HVAC popup opens: the primary one, or the other when only that is configured. */
  private hvacTarget(room: Room, order: Array<"heating" | "climate">): "heating" | "climate" | undefined {
    const configured = (kind: "heating" | "climate") =>
      kind === "heating" ? Boolean(room.heating?.climate) : Boolean(room.air_conditioner);
    return order.find(configured);
  }

  /**
   * One Topení or Klimatizace line. The state label always stays whole; the target may run
   * into the faded start of the temperature trend, and only when even that is not enough the
   * whole target wraps onto a hidden second line (never cut inside a number).
   */
  private renderSystemRow(icon: TemplateResult, view: SystemView, primary: boolean): TemplateResult {
    return html`
      <span
        class="system-row ${primary && view.active ? "strong" : ""}"
        style=${`--row-color: ${view.color}`}
      >
        <span class="row-main">
          <span class="row-icon">${icon}</span>
          <span class="row-text">
            <span class="row-label">${view.label}</span>
            ${view.extra ? html`<span class="row-unit">${view.extra}</span>` : nothing}
          </span>
        </span>
      </span>
    `;
  }

  // ---------------------------------------------------------------- window

  /** One window: open / closed / unknown and, when open, for how many minutes (its last_changed). */
  private windowState(entityId: EntityId, now: number): { state: "open" | "closed" | "unknown"; minutesOpen?: number } {
    const entity = this.getState(entityId);
    const state = entity?.state.toLowerCase();
    if (state === undefined || isUnavailable(state)) {
      return { state: "unknown" };
    }
    if (state !== "on") {
      return { state: "closed" };
    }
    const changed = Date.parse(entity?.last_changed ?? "");
    return { state: "open", minutesOpen: Number.isNaN(changed) ? undefined : Math.max(0, (now - changed) / 60_000) };
  }

  /**
   * The window row (CURRENT_SPEC.md, Vizuální pravidla): one row also for a room with several
   * windows. Any open window makes the room open ("Otevřeno", or "Otevřena 2" with two or more
   * open) with the time of the one open longest; all closed is "Zavřeno"; none open and one
   * unknown is "––" (unknown is never taken as closed). The conflict dot sits right after the
   * label and takes the place of the "·" before the time, so on a narrow card the time is what
   * gives way, never the dot.
   */
  private renderWindow(room: Room, index: number, conflicts: RoomConflict[], now: number): TemplateResult {
    const states = room.windows.map((window) => ({ window, ...this.windowState(window.entity, now) }));
    const open = states.filter((item) => item.state === "open");
    const opened = open.length > 0;
    const unavailable = !opened && (states.length === 0 || states.some((item) => item.state === "unknown"));
    const multiple = room.windows.length > 1;
    // Red is reserved for critical air values (CURRENT_SPEC.md, Barvy); an open window is
    // emphasised in light sky blue.
    const color = opened ? COLORS.sky : COLORS.label;
    const label = opened ? (open.length > 1 ? `Otevřena${NBSP}${open.length}` : "Otevřeno") : unavailable ? "––" : "Zavřeno";
    // How long the room has had a window open, faintly after the label.
    const durations = open.map((item) => item.minutesOpen).filter((minutes): minutes is number => minutes !== undefined);
    const minutesOpen = durations.length > 0 ? Math.max(...durations) : undefined;
    // A subtle orange dot when the open window contradicts the heating or cooling.
    const conflict = conflicts.includes("window-heating")
      ? "otevřené okno při topení"
      : conflicts.includes("window-cooling")
        ? "otevřené okno při chlazení"
        : undefined;
    const descriptionId = `window-description-${index}`;
    let spoken: string;
    if (!multiple) {
      spoken = unavailable
        ? "okno neznámé"
        : `okno ${opened ? "otevřené" : "zavřené"}${minutesOpen === undefined ? "" : `, otevřené ${spokenDuration(minutesOpen)}`}`;
    } else if (opened) {
      const names = open.map((item) => item.window.name).join(", ");
      const longest = minutesOpen === undefined ? "" : ` ${spokenDuration(minutesOpen)}`;
      spoken = open.length === 1 ? `okno ${names} otevřené${longest}` : `otevřená okna ${names}${longest ? `, nejdéle${longest}` : ""}`;
    } else {
      spoken = unavailable ? "stav oken neznámý" : "všechna okna zavřená";
    }
    const firstWindow = room.windows[0]?.entity;

    // The accessible name is the visible text (WCAG 2.5.3 Label in Name); the room, the
    // conflict and the action are the description.
    return html`
      <button
        type="button"
        class="plain-button system-row slot-window ${opened ? "strong" : ""}"
        style=${`--row-color: ${color}`}
        ?disabled=${!firstWindow}
        aria-haspopup=${multiple ? "dialog" : nothing}
        aria-describedby=${descriptionId}
        @click=${(event: Event) => (multiple ? this.openSheet("windows", room, event) : this.showMoreInfo(firstWindow))}
      >
        <span class="row-main">
          <span class="row-icon">${renderWindowIcon(unavailable ? COLORS.off : color, unavailable)}</span>
          <span class="row-text">
            <span class="row-label">${label}</span>
            ${conflict ? html`<span class="conflict-dot" aria-hidden="true"></span>` : nothing}
            ${minutesOpen === undefined
              ? nothing
              : html`<span class="row-unit window-duration"
                  >${`${conflict ? "" : `${NBSP}·${NBSP}`}${formatDuration(minutesOpen)}`}</span
                >`}
          </span>
        </span>
      </button>
      <span class="sr-only" id=${descriptionId}
        >${`${room.name}: ${spoken}${conflict ? `; konflikt: ${conflict}` : ""}. ${multiple ? "Otevře přehled oken." : "Otevře detail a historii."}`}</span
      >
    `;
  }

  /** Popup "Okna" of a room with several windows: each window with its state; a row opens its detail. */
  private renderWindowsBody(room: Room, now: number): TemplateResult {
    return html`
      <div class="options list-options" role="group" aria-label="Okna">
        ${room.windows.map((window) => {
          const { state, minutesOpen } = this.windowState(window.entity, now);
          const unknown = state === "unknown";
          const color = state === "open" ? COLORS.sky : COLORS.label;
          return html`<button
            type="button"
            class="plain-button option list-option window-option"
            @click=${() => {
              this.closeSheet(false);
              this.showMoreInfo(window.entity);
            }}
          >
            <span class="option-icon" aria-hidden="true">${renderWindowIcon(unknown ? COLORS.off : color, unknown)}</span>
            <span class="option-text">
              <span>${window.name}</span>
              <span class="option-hint">Detail a historie</span>
            </span>
            <span class="list-value" style=${`color: ${color}`}>
              ${unknown
                ? html`<span aria-hidden="true">––</span><span class="sr-only">neznámé</span>`
                : state === "open"
                  ? "Otevřeno"
                  : "Zavřeno"}${minutesOpen === undefined
                ? nothing
                : html`<span class="list-extra">${NBSP}·${NBSP}${formatDuration(minutesOpen)}</span>`}
            </span>
          </button>`;
        })}
      </div>
    `;
  }

  // ----------------------------------------------------------------- cover

  private renderCover(room: Room, entityId: EntityId): TemplateResult {
    const entity = this.getState(entityId);
    const state = entity?.state.toLowerCase();
    const available = state !== undefined && !isUnavailable(state);
    const position = available ? numberAttribute(entity?.attributes.current_position) : undefined;
    const tilt = available ? numberAttribute(entity?.attributes.current_tilt_position) : undefined;
    const known = position !== undefined && tilt !== undefined;
    const moving = state === "opening" || state === "closing";
    const description = `${known ? `poloha ${Math.round(position)} %, naklopení ${Math.round(tilt)} %` : "poloha nebo naklopení neznámé"}${
      moving ? ", pohybuje se" : ""
    }`;

    return html`
      <button
        type="button"
        class="plain-button cover-panel ${moving ? "moving" : ""}"
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
      <div class="presets" role="group" aria-label=${`${room.name}: předvolby žaluzií`}>
        ${room.presets.map((preset) => this.renderPreset(room, preset, position, tilt, available))}
      </div>
    `;
  }

  private renderPreset(
    room: Room,
    preset: BlindPreset,
    position: number | undefined,
    tilt: number | undefined,
    available: boolean,
  ): TemplateResult {
    // While a preset is on its way only that one is lit (pulsing); the others stay grey.
    const target = this._moving[room.name];
    const pending = target === preset.id;
    const active = target === undefined && blindMatchesPreset(position, tilt, preset, this.tolerance());
    const key = `${room.name}|${preset.id}`;
    const action = available
      ? "Spustí se dvojitým klepnutím nebo dlouhým stiskem."
      : "Žaluzie je nedostupná.";

    // No visible label: the name is in title / aria-label. A single tap only shows a hint;
    // the preset is sent by a double tap or a long press, or by the keyboard (detail 0).
    // An unavailable blind keeps its buttons focusable but greyed out; they only explain why.
    return html`
      <button
        type="button"
        class="plain-button preset ${this._flash === key ? "sent" : ""} ${available ? "" : "unavailable"} ${
          pending ? "pending" : ""
        }"
        title=${preset.label}
        aria-pressed=${active ? "true" : "false"}
        aria-busy=${pending ? "true" : nothing}
        aria-disabled=${available ? "false" : "true"}
        aria-label=${`${room.name}: žaluzie ${preset.label}, ${preset.description}. ${action}`}
        @pointerdown=${(event: PointerEvent) => this.pressStart(event, room, preset, available)}
        @pointerup=${() => this.pressEnd(room, preset, available)}
        @pointercancel=${() => this.pressCancel()}
        @pointerleave=${() => this.pressCancel()}
        @contextmenu=${(event: Event) => event.preventDefault()}
        @click=${(event: MouseEvent) => {
          if (event.detail === 0) {
            if (available) {
              void this.applyPreset(room, preset);
            } else {
              this.showUnavailable(key);
            }
          }
        }}
      >
        ${renderPresetIcon(preset.icon)}
        ${this._hint?.key === key
          ? html`<span class="preset-hint" role="status">${this._hint.text}</span>`
          : nothing}
      </button>
    `;
  }

  private pressStart(event: PointerEvent, room: Room, preset: BlindPreset, available: boolean): void {
    if (event.button !== 0 || !available) {
      return;
    }
    window.clearTimeout(this._pressTimer);
    this._pressing = true;
    this._pressFired = false;
    this._pressTimer = window.setTimeout(() => {
      this._pressFired = true;
      this._lastTap = undefined;
      window.clearTimeout(this._hintTimer);
      this._hint = undefined;
      void this.applyPreset(room, preset);
    }, LONG_PRESS_MS);
  }

  private pressEnd(room: Room, preset: BlindPreset, available: boolean): void {
    const key = `${room.name}|${preset.id}`;
    if (!available) {
      this.showUnavailable(key);
      return;
    }
    window.clearTimeout(this._pressTimer);
    const wasPressing = this._pressing;
    const fired = this._pressFired;
    this._pressing = false;
    this._pressFired = false;
    if (!wasPressing || fired) {
      return;
    }
    const now = performance.now();
    window.clearTimeout(this._hintTimer);
    if (this._lastTap && this._lastTap.key === key && now - this._lastTap.time <= DOUBLE_TAP_MS) {
      this._lastTap = undefined;
      this._hint = undefined;
      void this.applyPreset(room, preset);
      return;
    }
    // A single tap: when no second tap follows, explain how to send the preset.
    this._lastTap = { key, time: now };
    this._hintTimer = window.setTimeout(() => {
      if (this._lastTap?.key === key) {
        this._lastTap = undefined;
        this.showHint(key, "Podržte nebo klepněte dvakrát", "selection");
      }
    }, DOUBLE_TAP_MS);
  }

  private pressCancel(): void {
    window.clearTimeout(this._pressTimer);
    this._pressing = false;
    this._pressFired = false;
  }

  private showUnavailable(key: string): void {
    this._lastTap = undefined;
    window.clearTimeout(this._hintTimer);
    this.showHint(key, "Žaluzie je nedostupná", "warning");
  }

  private showHint(key: string, text: string, haptic: HapticType): void {
    this._hint = { key, text };
    this.haptic(haptic);
    window.clearTimeout(this._hintHideTimer);
    this._hintHideTimer = window.setTimeout(() => {
      this._hint = undefined;
    }, HINT_MS);
  }

  /** Tolerance (±, %) within which the blind is in a preset (`covers.tolerance`). */
  private tolerance(): number {
    return this._config?.covers.tolerance ?? 5;
  }

  private async applyPreset(room: Room, preset: BlindPreset): Promise<void> {
    if (!this.hass || !room.cover || !this._config) {
      return;
    }
    const state = this.entityState(room.cover)?.toLowerCase();
    if (state === undefined || isUnavailable(state)) {
      this.showUnavailable(`${room.name}|${preset.id}`);
      return;
    }
    // The icon starts pulsing at once; the script may run until the blind has arrived.
    this.startMoving(room, room.cover, preset);
    try {
      // covers.script is validated as script.<name> (config.ts).
      const [domain, service] = this._config.covers.script.split(".");
      await this.hass.callService(domain, service, {
        entity: room.cover,
        pos: preset.position,
        tilt: preset.tilt,
      });
      this.haptic("success");
      this._flash = `${room.name}|${preset.id}`;
      window.clearTimeout(this._flashTimer);
      this._flashTimer = window.setTimeout(() => {
        this._flash = undefined;
      }, FLASH_MS);
    } catch (error) {
      console.error("Klima Dashboard: skript žaluzií selhal", error);
      this.endMoving(room.name);
      this.haptic("failure");
      this.showNotice(`${room.name}: skript žaluzií se nepodařilo spustit.`);
    }
  }

  /**
   * Preset sent: its icon pulses until the blind has arrived at its position and tilt, or
   * nothing has changed for MOVE_STALL_MS. A blind that is already there needs no pulsing.
   */
  private startMoving(room: Room, entityId: EntityId, preset: BlindPreset): void {
    const entity = this.getState(entityId);
    const reached =
      blindMatchesPreset(
        numberAttribute(entity?.attributes.current_position),
        numberAttribute(entity?.attributes.current_tilt_position),
        preset,
        this.tolerance(),
      ) && !this.isMoving(entityId);
    if (reached) {
      this.endMoving(room.name);
      return;
    }
    this._moving = { ...this._moving, [room.name]: preset.id };
    this._movingWatch.set(room.name, { signature: this.coverSignature(entityId) });
    this.armStall(room.name);
  }

  /** Called on every Home Assistant update: ends the pulsing on arrival, restarts the stall timer on change. */
  private trackMovingPresets(): void {
    for (const room of this._config?.rooms ?? []) {
      const presetId = this._moving[room.name];
      const preset = room.presets.find((item) => item.id === presetId);
      const watch = this._movingWatch.get(room.name);
      if (!preset || !watch || !room.cover) {
        continue;
      }
      const entity = this.getState(room.cover);
      const state = entity?.state.toLowerCase();
      if (
        state === undefined ||
        isUnavailable(state) ||
        (blindMatchesPreset(
          numberAttribute(entity?.attributes.current_position),
          numberAttribute(entity?.attributes.current_tilt_position),
          preset,
          this.tolerance(),
        ) &&
          !this.isMoving(room.cover))
      ) {
        this.endMoving(room.name);
        continue;
      }
      const signature = this.coverSignature(room.cover);
      if (signature !== watch.signature) {
        watch.signature = signature;
        this.armStall(room.name);
      }
    }
  }

  private armStall(roomName: string): void {
    const watch = this._movingWatch.get(roomName);
    if (!watch) {
      return;
    }
    window.clearTimeout(watch.timer);
    // A sent preset pulses until the blind arrives; it stops when the blind's state, position and
    // tilt have not changed for `covers.stall_seconds` (the movement was stopped somewhere else).
    watch.timer = window.setTimeout(() => this.endMoving(roomName), (this._config?.covers.stall_seconds ?? 5) * 1000);
  }

  private endMoving(roomName: string): void {
    window.clearTimeout(this._movingWatch.get(roomName)?.timer);
    this._movingWatch.delete(roomName);
    if (roomName in this._moving) {
      const { [roomName]: _ended, ...rest } = this._moving;
      this._moving = rest;
    }
  }

  private isMoving(entityId: EntityId): boolean {
    const state = this.entityState(entityId)?.toLowerCase();
    return state === "opening" || state === "closing";
  }

  /** What changes while a blind moves: its state, position and tilt. */
  private coverSignature(entityId: EntityId): string {
    const entity = this.getState(entityId);
    return `${entity?.state}|${entity?.attributes.current_position}|${entity?.attributes.current_tilt_position}`;
  }

  /** Haptic feedback through the Home Assistant app (ignored in a plain browser). */
  private haptic(type: HapticType): void {
    this.dispatchEvent(new CustomEvent("haptic", { detail: type, bubbles: true, composed: true }));
  }

  private showNotice(message: string): void {
    this._notice = message;
    window.clearTimeout(this._noticeTimer);
    this._noticeTimer = window.setTimeout(() => {
      this._notice = undefined;
    }, NOTICE_MS);
  }

  // ----------------------------------------------------------------- sheet

  private renderSheet(isSummer: boolean): TemplateResult | typeof nothing {
    const sheet = this._sheet;
    if (!sheet) {
      return nothing;
    }
    if (sheet.kind === "history") {
      return this.renderSheetFrame(
        `Historie místnosti – ${this._config?.history.hours ?? 24} h`,
        sheet.room.name,
        this.renderHistoryBody(sheet.room),
        "history-sheet",
      );
    }
    if (sheet.kind === "air") {
      return this.renderSheetFrame("Kvalita vzduchu", sheet.room.name, this.renderAirBody(sheet.room, Date.now()));
    }
    if (sheet.kind === "windows") {
      return this.renderSheetFrame("Okna", sheet.room.name, this.renderWindowsBody(sheet.room, Date.now()));
    }
    return this.renderSheetFrame(sheet.room.name, undefined, this.renderHvacBody(sheet.room, sheet.kind, isSummer));
  }

  /**
   * Popup frame in the style of an iOS sheet (CURRENT_SPEC.md, Detail místnosti): a grabber,
   * closes by ✕, a tap outside, Escape, or by pulling the top part down.
   */
  private renderSheetFrame(
    title: string,
    sub: string | undefined,
    body: TemplateResult,
    extraClass = "",
  ): TemplateResult {
    const dragging = this._drag?.dragging === true;
    return html`
      <div
        class="backdrop"
        style=${`--backdrop-opacity: ${Math.max(0, 1 - this._dragY / 400).toFixed(2)}`}
        @click=${() => this.closeSheet()}
        @keydown=${this.handleSheetKeydown}
      >
        <div
          class="sheet ${extraClass} ${dragging ? "dragging" : ""}"
          style=${this._dragY > 0 ? `transform: translateY(${this._dragY}px)` : nothing}
          role="dialog"
          aria-modal="true"
          aria-labelledby="sheet-title"
          @click=${(event: Event) => event.stopPropagation()}
        >
          <div
            class="sheet-top"
            @pointerdown=${this.dragStart}
            @pointermove=${this.dragMove}
            @pointerup=${this.dragEnd}
            @pointercancel=${this.dragEnd}
          >
            <div class="grabber" aria-hidden="true"></div>
            <div class="sheet-head">
              <div>
                <h2 id="sheet-title">${title}</h2>
                ${sub ? html`<div class="sheet-sub">${sub}</div>` : nothing}
              </div>
              <button type="button" class="plain-button close" aria-label="Zavřít" @click=${() => this.closeSheet()}>
                ✕
              </button>
            </div>
          </div>
          ${body}
        </div>
      </div>
    `;
  }

  /** Topení / Klimatizace controls, with a segmented control to switch between the two. */
  private renderHvacBody(room: Room, kind: "heating" | "climate", isSummer: boolean): TemplateResult {
    const isHeating = kind === "heating";
    const entityId = isHeating ? room.heating?.climate : room.air_conditioner;
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
    const presets = !isHeating && available && entityId ? presetModes.filter((mode) => mode !== "none") : [];
    const order: Array<"heating" | "climate"> = isSummer ? ["climate", "heating"] : ["heating", "climate"];
    const both = Boolean(room.heating?.climate) && Boolean(room.air_conditioner);

    const body = html`
      ${!available
        ? html`<p class="sheet-message">Entita je nedostupná.</p>`
        : options.length === 0
          ? html`<p class="sheet-message">Entita neuvádí podporované režimy.</p>`
          : html`<div class="options" role="group" aria-label=${`${SYSTEM_NAMES[kind]}: režim`}>
              ${options.map((option) => this.renderOption(option))}
            </div>`}
      ${presets.length > 0
        ? html`<div class="sheet-label" id="preset-label">Předvolby</div>
            <div class="chips" role="group" aria-labelledby="preset-label">
              ${presets.map((mode) => this.renderPresetChip(entityId as EntityId, mode, preset, state, presetModes))}
            </div>`
        : nothing}
      ${this._sheetError ? html`<p class="sheet-message error" role="alert">${this._sheetError}</p>` : nothing}
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
    `;

    if (!both) {
      return html`<div class="sheet-label system-name">${SYSTEM_NAMES[kind]}</div>${body}`;
    }
    // ARIA tabs: arrows / Home / End switch the system, only the selected tab is in the Tab order.
    return html`
      <div
        class="segmented"
        role="tablist"
        aria-label="Systém"
        @keydown=${(event: KeyboardEvent) => this.segmentKeydown(event, order, kind)}
      >
        ${order.map(
          (system) => html`<button
            type="button"
            role="tab"
            id=${`tab-${system}`}
            class="plain-button segment"
            data-system=${system}
            aria-selected=${system === kind ? "true" : "false"}
            aria-controls="hvac-panel"
            tabindex=${system === kind ? "0" : "-1"}
            @click=${() => this.switchSheet(system)}
          >
            ${SYSTEM_NAMES[system]}
          </button>`,
        )}
      </div>
      <div class="hvac-panel" role="tabpanel" id="hvac-panel" aria-labelledby=${`tab-${kind}`}>${body}</div>
    `;
  }

  private segmentKeydown(event: KeyboardEvent, order: Array<"heating" | "climate">, kind: "heating" | "climate"): void {
    const index = order.indexOf(kind);
    let next: "heating" | "climate" | undefined;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      next = order[(index + 1) % order.length];
    } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      next = order[(index - 1 + order.length) % order.length];
    } else if (event.key === "Home") {
      next = order[0];
    } else if (event.key === "End") {
      next = order[order.length - 1];
    }
    if (!next) {
      return;
    }
    event.preventDefault();
    this._focusSegment = next;
    if (next === kind) {
      this.requestUpdate();
    } else {
      this.switchSheet(next);
    }
  }

  /** „Historie místnosti – 24 h“ with a readout that follows the finger (or the arrow keys). */
  private renderHistoryBody(room: Room): TemplateResult {
    const hours = this._config?.history.hours ?? 24;
    let body: TemplateResult;
    const model = this._historyModel;
    if (this._historyStatus === "loading") {
      body = html`<p class="sheet-message">Načítám historii…</p>`;
    } else if (this._historyStatus === "error" || !model) {
      body = html`<p class="sheet-message error" role="alert">Historii se nepodařilo načíst.</p>`;
    } else if (!hasChartData(model)) {
      body = html`<p class="sheet-message">Za ${lastHours(hours)} nejsou k dispozici data.</p>`;
    } else {
      body = html`<div
        class="chart-wrap"
        tabindex="0"
        role="group"
        aria-label=${`Graf za ${this.historyPeriod()}. Šipkami vlevo a vpravo procházíte čas, klávesou End se vrátíte na teď.`}
        @pointerdown=${this.chartPointer}
        @pointermove=${this.chartPointer}
        @pointerup=${this.chartPointerEnd}
        @pointercancel=${this.chartPointerEnd}
        @pointerleave=${this.chartPointerLeave}
        @keydown=${this.chartKeydown}
      >
        ${renderRoomChart(model, this.chartWidth(), this._scrubTime)}
      </div>`;
    }
    const detail = room.temperature ?? room.humidity;
    return html`
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
    `;
  }

  /** The chart is drawn 1:1 in CSS pixels at the inner width of the popup. */
  private chartWidth(): number {
    return Math.max(280, Math.min(460, window.innerWidth) - 32);
  }

  private chartPointer = (event: PointerEvent): void => {
    if (event.type === "pointerdown") {
      this._scrubbing = true;
    }
    if (event.pointerType !== "mouse" && !this._scrubbing) {
      return;
    }
    const model = this._historyModel;
    const chart = (event.currentTarget as HTMLElement).querySelector("svg.chart");
    if (!model || !chart) {
      return;
    }
    const box = chart.getBoundingClientRect();
    const width = this.chartWidth();
    this._scrubTime = timeAtX(((event.clientX - box.left) * width) / Math.max(box.width, 1), width, model.range);
  };

  private chartPointerEnd = (event: PointerEvent): void => {
    this._scrubbing = false;
    if (event.pointerType !== "mouse") {
      this._scrubTime = undefined;
    }
  };

  private chartPointerLeave = (event: PointerEvent): void => {
    if (event.pointerType === "mouse") {
      this._scrubTime = undefined;
    }
  };

  private chartKeydown = (event: KeyboardEvent): void => {
    const model = this._historyModel;
    if (!model) {
      return;
    }
    const { startMs, endMs } = model.range;
    const current = this._scrubTime ?? endMs;
    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
      const next = current + (event.key === "ArrowLeft" ? -SCRUB_STEP_MS : SCRUB_STEP_MS);
      this._scrubTime = next >= endMs ? undefined : Math.max(startMs, next);
    } else if (event.key === "Home") {
      this._scrubTime = startMs;
    } else if (event.key === "End") {
      this._scrubTime = undefined;
    } else {
      return;
    }
    event.preventDefault();
  };

  private dragStart = (event: PointerEvent): void => {
    if (event.button !== 0) {
      return;
    }
    this._drag = { pointerId: event.pointerId, startY: event.clientY, startTime: performance.now(), dragging: false };
  };

  private dragMove = (event: PointerEvent): void => {
    const drag = this._drag;
    if (!drag || drag.pointerId !== event.pointerId) {
      return;
    }
    const distance = event.clientY - drag.startY;
    if (!drag.dragging) {
      if (distance < SHEET_DRAG_SLOP) {
        return;
      }
      // Capture only once it is a drag, so a tap on ✕ still clicks.
      drag.dragging = true;
      (event.currentTarget as HTMLElement).setPointerCapture(event.pointerId);
    }
    this._dragY = Math.max(0, distance);
  };

  private dragEnd = (event: PointerEvent): void => {
    const drag = this._drag;
    this._drag = undefined;
    if (!drag || !drag.dragging) {
      return;
    }
    const distance = Math.max(0, event.clientY - drag.startY);
    const speed = distance / Math.max(1, performance.now() - drag.startTime);
    if (event.type === "pointerup" && (distance > SHEET_CLOSE_DISTANCE || speed > SHEET_CLOSE_SPEED)) {
      this.closeSheet();
    } else {
      this._dragY = 0;
    }
  };

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
        class="plain-button chip-button"
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

  private climateOptions(entityId: EntityId, hvacModes: string[], state: string | undefined): SheetOption[] {
    return CLIMATE_MODE_ORDER.filter((mode) => hvacModes.includes(mode)).map((mode) => {
      const climateMode = climateModeFromState(mode);
      const color = CLIMATE_COLORS[climateMode];
      return {
        id: mode,
        label: CLIMATE_LABELS[climateMode],
        icon: renderClimateIcon(climateMode, color, false),
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
      ...this.renderRoot.querySelectorAll<HTMLElement>(
        '.sheet button:not([disabled]):not([tabindex="-1"]), .sheet .chart-wrap',
      ),
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

  /** The history chart is drawn at the popup width; redraw it after rotation or resize. */
  private handleResize = (): void => {
    if (this._sheet?.kind === "history") {
      this.requestUpdate();
    }
  };

  private openSheet(kind: SheetKind, room: Room, event: Event): void {
    this._opener = event.currentTarget instanceof HTMLElement ? event.currentTarget : undefined;
    this._sheetError = undefined;
    this._dragY = 0;
    this._sheet = { kind, room };
    window.addEventListener("resize", this.handleResize, { passive: true });
    if (kind === "history") {
      this._scrubTime = undefined;
      void this.loadRoomHistory(room);
    }
  }

  /** Segmented control in the HVAC popup: switch between Topení and Klimatizace. */
  private switchSheet(kind: "heating" | "climate"): void {
    if (this._sheet && this._sheet.kind !== kind) {
      this._sheetError = undefined;
      this._sheet = { kind, room: this._sheet.room };
    }
  }

  private closeSheet(restoreFocus = true): void {
    window.removeEventListener("resize", this.handleResize);
    this._historyRequest += 1;
    this._sheet = undefined;
    this._sheetError = undefined;
    this._scrubTime = undefined;
    this._scrubbing = false;
    this._drag = undefined;
    this._dragY = 0;
    if (restoreFocus) {
      this._opener?.focus();
    }
    this._opener = undefined;
  }

  private async loadRoomHistory(room: Room): Promise<void> {
    const request = ++this._historyRequest;
    this._historyStatus = "loading";
    this._historyModel = undefined;
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
      room.heating?.target,
      room.air_conditioner,
    ].filter((entityId): entityId is EntityId => Boolean(entityId));
    const settings = this._config!.history;
    const endMs = Date.now();
    const startMs = endMs - settings.hours * HOUR_MS;
    try {
      const history = await fetchHistory(this.hass, ids, startMs, endMs);
      if (request !== this._historyRequest) {
        return;
      }
      this._historyModel = buildRoomChart(history, room, { startMs, endMs }, settings);
      this._historyStatus = "ready";
    } catch (error) {
      console.error("Klima Dashboard: načtení historie místnosti selhalo", error);
      if (request === this._historyRequest) {
        this._historyStatus = "error";
      }
    }
  }

  // ---------------------------------------------------------------- trends

  private async refreshTrends(): Promise<void> {
    await Promise.all([this.loadTrends(), this.loadReported()]);
  }

  private async loadTrends(): Promise<void> {
    if (!this.hass || !this._config || this._trendsLoading) {
      return;
    }
    const ids = trendEntityIds(this._config);
    if (ids.length === 0) {
      this._trendsLoaded = true;
      return;
    }
    this._trendsLoading = true;
    const { minutes, samples } = this._config.trends;
    const endMs = Date.now();
    const startMs = endMs - minutes * 60_000;
    try {
      const history = await fetchHistory(this.hass, ids, startMs, endMs);
      const next: Record<EntityId, Array<number | undefined>> = {};
      for (const entityId of ids) {
        next[entityId] = sampleNumeric(history[entityId], startMs, endMs, samples);
      }
      this._trends = next;
    } catch (error) {
      console.error("Klima Dashboard: načtení historie pro mikrotrendy selhalo", error);
    } finally {
      this._trendsLoading = false;
      this._trendsLoaded = true;
    }
  }

  /**
   * When the room sensors last reported. The state pushed to cards has only last_updated,
   * which does not move while a sensor keeps reporting the same value, so the REST state
   * (with last_reported) is asked every 5 minutes. Without it nothing is marked stale.
   */
  private async loadReported(): Promise<void> {
    const hass = this.hass;
    if (!hass?.callApi || !this._config) {
      return;
    }
    const ids = measurementEntityIds(this._config);
    const results = await Promise.allSettled(
      ids.map((entityId) =>
        hass.callApi!<{ last_reported?: string; last_updated?: string }>("GET", `states/${entityId}`),
      ),
    );
    const next: Record<EntityId, number> = {};
    results.forEach((result, index) => {
      if (result.status === "fulfilled") {
        const time = Date.parse(result.value?.last_reported ?? result.value?.last_updated ?? "");
        if (Number.isFinite(time)) {
          next[ids[index]] = time;
        }
      }
    });
    this._reported = next;
  }

  // ----------------------------------------------------------------- state

  /**
   * A room measurement with its freshness (CURRENT_SPEC.md, Chybějící data): stale when the
   * sensor has not reported for longer than `stale_minutes`. Only known report times count.
   */
  private reading(entityId: EntityId | undefined, staleMinutes: number, now: number): Reading {
    const value = this.numberState(entityId);
    if (value === undefined || !entityId) {
      return {};
    }
    const reported = this._reported[entityId];
    if (reported === undefined) {
      return { value };
    }
    const updated = Date.parse(this.getState(entityId)?.last_updated ?? "");
    const lastSeen = Math.max(reported, Number.isFinite(updated) ? updated : 0);
    const ageMinutes = Math.max(0, (now - lastSeen) / 60_000);
    return { value, ageMinutes, stale: ageMinutes > staleMinutes };
  }

  private staleTitle(reading: Reading): string | undefined {
    return reading.stale && reading.ageMinutes !== undefined
      ? `Naposledy před ${formatAge(reading.ageMinutes)}`
      : undefined;
  }

  private staleSpoken(reading: Reading): string {
    const title = this.staleTitle(reading);
    return title ? `, ${title.toLowerCase()}` : "";
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
