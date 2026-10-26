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
  renderClockIcon,
  renderHeatingWaves,
  renderParticlesIcon,
  renderPresetIcon,
  renderWindowIcon,
} from "./icons";
import type { HeatingOptionId } from "./icons";
import {
  BOOST_TEMPERATURE,
  DURATION_MINUTES,
  HEATING_OFF_TARGET,
  NEXT_PLAN,
  UNTIL_RESUMED,
  activeHeatingId,
  currentHeatingControl,
  defaultDuration,
  durationMinutes,
  heatingCommand,
  manualRange,
  minutesLabel,
  numberOf,
  snapTemperature,
  temperatureRange,
} from "./heating-control";
import type { HeatingControl, HeatingControlMode, ServiceCall } from "./heating-control";
import { renderScene, sceneTone } from "./scenes";
import { HOUR_MS, fetchHistory, normalizeToAxis, sampleNumeric, sharedAxis } from "./history";
import { cardLanguage, getI18n, hassLanguage } from "./i18n";
import type { I18n } from "./i18n";
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
  WindowConfig,
} from "./types";
import {
  blindMatchesPreset,
  COLORS,
  CLIMATE_COLORS,
  climateModeFromState,
  configuredEntityIds,
  formatAge,
  formatDuration,
  formatPreset,
  getRoomStatus,
  isUnavailable,
  measurementEntityIds,
  numberAttribute,
  presetDescription,
  presetName,
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
const NBSP = " ";

/** Blind presets are sent only by a long press or a double tap, never by a single tap. */
const LONG_PRESS_MS = 550;
const DOUBLE_TAP_MS = 400;
const FLASH_MS = 700;
/** How long the "hold or double tap" hint stays after a single tap on a preset. */
/** A phone on its side or any short window: the history popup is full width (styles.ts). */
const LANDSCAPE_QUERY = "(orientation: landscape) and (max-height: 600px)";
const HINT_MS = 1_600;
/** A failed preset stays visible longer: the person has to read it. */
const ERROR_HINT_MS = 5_000;

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

/** The active Topení option id, from the controls (the person's change, otherwise the entity's state). */
function activeHeating(control: HeatingControl | undefined): string | undefined {
  return control === undefined ? undefined : control.mode === "manual" ? "heat" : control.mode === "plan" ? "auto" : control.mode;
}

const CLIMATE_MODE_ORDER = ["off", "cool", "dry", "fan_only", "auto", "heat"];

export class HaKlimaDashboard extends LitElement {
  static styles = styles;

  @state()
  private _config?: Settings;

  /** Texts and number formats of the card language (CURRENT_SPEC.md, Jazyky); set in willUpdate. */
  private _i18n: I18n = getI18n("en");

  @property({ attribute: false })
  hass?: HomeAssistant;

  @state()
  private _sheet?: SheetState;

  @state()
  private _sheetError?: string;

  /** Topení popup: what the person has changed; it is sent when the popup closes. Undefined = no change. */
  @state()
  private _heat?: HeatingControl;

  /** 24 h room history shown in the "history" popup. */
  @state()
  private _historyStatus: HistoryStatus = "loading";

  @state()
  private _historyModel?: RoomChartModel;

  /** Time under the finger in the history chart; undefined = now. */
  @state()
  private _scrubTime?: number;
  /** Where the finger touched the popup (clientY), to tell the direction of a drag. */
  private _touchY?: number;

  private _touchOnSlider = false;

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
  /** Hint bubble at a preset button; `spoken` (screen readers) and `error` only for a failed script. */
  private _hint?: { key: string; text: string; spoken?: string; error?: boolean };

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

  private _historyRequest = 0;
  private _scrubbing = false;
  private _drag?: SheetDrag;
  private _trendTimer?: number;

  /** Re-renders the card every 30 s while a window is open, so its "open for" time keeps counting. */
  private _clockTimer?: number;

  @state()
  private _clock = 0;
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
    this.flushHeat();
    for (const timer of [this._pressTimer, this._flashTimer, this._hintTimer, this._hintHideTimer]) {
      window.clearTimeout(timer);
    }
    for (const roomName of [...this._movingWatch.keys()]) {
      this.endMoving(roomName);
    }
    window.clearInterval(this._trendTimer);
    window.clearInterval(this._clockTimer);
    this._trendTimer = undefined;
    this._clockTimer = undefined;
    this._pressTimer = undefined;
    this._flashTimer = undefined;
    this._hintTimer = undefined;
    this._hintHideTimer = undefined;
    this._trendsStarted = false;
  }

  protected shouldUpdate(changedProperties: PropertyValues): boolean {
    if (changedProperties.size === 1 && changedProperties.has("hass")) {
      const previous = changedProperties.get("hass") as HomeAssistant | undefined;
      return (
        previous?.themes?.darkMode !== this.hass?.themes?.darkMode ||
        hassLanguage(previous) !== hassLanguage(this.hass) ||
        (["number_format", "time_format", "date_format"] as const).some(
          (key) => previous?.locale?.[key] !== this.hass?.locale?.[key],
        ) ||
        this.hasRelevantEntityChanged(previous)
      );
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
    // The card language; `lang` on the host tells screen readers which voice to use, also when
    // the card falls back to English in a Home Assistant in another language.
    this._i18n = getI18n(cardLanguage(this._config?.language ?? "auto", this.hass), this.hass);
    if (this.lang !== this._i18n.language) {
      this.lang = this._i18n.language;
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
    const title = this._config.title ?? this._i18n.t.title;
    const outside = this.renderOutside();
    const chips = houseSummary(
      this._config.rooms,
      (entityId) => this.getState(entityId),
      this.coldRooms(isSummer, modeKnown, now),
      this._i18n,
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
          <div class="rooms n${Math.min(this._config.rooms.length, 4)}">
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
          pm25: this.pm25Reading(room, now),
        },
        isSummer,
        modeKnown,
        room,
        this._i18n.t,
      );
      if (status.id === "cold") {
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

    const { t, whole } = this._i18n;
    const temperature = this.numberState(outside.temperature);
    const minimum = this.numberState(outside.minimum);
    const maximum = this.numberState(outside.maximum);
    const rain = this.numberState(outside.rain_probability);
    const pm25 = this.numberState(outside.pm25);

    const range =
      minimum !== undefined && maximum !== undefined
        ? `${whole(minimum)}–${whole(maximum)}${NBSP}°C`
        : undefined;
    const parts = [
      temperature === undefined ? undefined : `${whole(temperature)}${NBSP}°C`,
      range,
      rain === undefined ? undefined : `☂${NBSP}${this._i18n.percent(whole(rain))}`,
    ].filter((part): part is string => part !== undefined);

    // Outdoor air uses the shared PM2.5 limits of the rooms (CURRENT_SPEC.md, Dashboard Domov).
    const thresholds = this._config!.thresholds;
    let airLabel = "––";
    let airColor = COLORS.label;
    if (pm25 !== undefined) {
      if (pm25 >= thresholds.pm25_critical) {
        airLabel = t.airLevel.poor;
        airColor = COLORS.alert;
      } else if (pm25 >= thresholds.pm25_warning) {
        airLabel = t.airLevel.moderate;
        airColor = COLORS.warning;
      } else {
        airLabel = t.airLevel.good;
      }
    }

    if (parts.length === 0 && !outside.pm25) {
      return nothing;
    }
    return html`<div class="outside">
      ${parts.length > 0 ? html`<div>${parts.join(" · ")}</div>` : nothing}
      ${outside.pm25
        ? html`<div>${t.outsideAir} <span style=${`color: ${airColor}`}>${airLabel}</span></div>`
        : nothing}
    </div>`;
  }

  /** House summary chips: only what differs from a quiet house (CURRENT_SPEC.md, Dashboard Domov). */
  private renderSummary(chips: SummaryChip[]): TemplateResult | typeof nothing {
    if (chips.length === 0) {
      return nothing;
    }
    return html`<ul class="summary" aria-label=${this._i18n.t.summary}>
      ${chips.map((chip) => {
        const icon =
          chip.kind === "windows" || chip.kind === "conflict-window"
            ? renderWindowIcon(chip.color, false)
            : chip.kind === "climate" || chip.kind === "conflict-cooling"
              ? renderClimateIcon("cool", chip.color, false)
              : chip.kind === "manual" || chip.kind === "boost"
                ? renderHeatingOptionIcon(chip.kind === "boost" ? "boost" : "heat")
                : renderHeatingWaves(chip.waves ?? 3, false);
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
    const pm25 = this.pm25Reading(room, now);
    const { t } = this._i18n;
    const status = getRoomStatus({ temperature, humidity, co2, pm25 }, isSummer, modeKnown, room, t);
    const image = room.image;
    // The measurement that decided the status is drawn in the status colour (CURRENT_SPEC.md,
    // Stavový systém); the other values stay neutral.
    const causeColour = (cause: "temperature" | "humidity") =>
      status.cause === cause ? `color: ${status.color}` : nothing;
    const conflicts = roomConflicts(room, (entityId) => this.getState(entityId), status.id === "cold", this._i18n);

    return html`
      <div class="room-cell"><article
        class="room ${!room.cover && !room.hasCo2 && !room.hasPm25 ? "compact" : ""}"
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
            aria-label=${t.temperatureLabel(
              room.name,
              temperature.value === undefined ? undefined : this._i18n.one(temperature.value),
              this.staleSpoken(temperature),
              this.historyPeriod(),
            )}
            @click=${(event: Event) => this.openSheet("history", room, event)}
          >
            ${temperature.value === undefined
              ? html`<span class="missing">––</span>`
              : html`${this._i18n.one(temperature.value)}<span class="temperature-unit">${NBSP}°C</span>${this.staleMark(temperature)}`}
          </button>
          <button
            type="button"
            class="plain-button humidity ${humidity.stale ? "stale" : ""}"
            style=${causeColour("humidity")}
            ?disabled=${!room.humidity}
            title=${this.staleTitle(humidity) ?? nothing}
            aria-label=${t.humidityLabel(
              room.name,
              humidity.value === undefined ? undefined : this._i18n.percent(Math.round(humidity.value)),
              this.staleSpoken(humidity),
            )}
            @click=${() => this.showMoreInfo(room.humidity)}
          >
            ${humidity.value === undefined
              ? html`<span class="missing">––</span>`
              : html`${this._i18n.percent(Math.round(humidity.value))}${this.staleMark(humidity)}`}
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
      <span class="sr-only" id=${descriptionId}>${link.startsWith("/") ? this._i18n.t.link.page : this._i18n.t.link.web}</span>
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

  /** The room history period for screen readers: "24 hodin" (after "za"), "the last 24 hours". */
  private historyPeriod(): string {
    return spokenPeriod((this._config?.history.hours ?? 24) * 60, this._i18n.t);
  }

  /** The micro trend period for screen readers: "2 hodiny" (after "za"), "the last 2 hours". */
  private trendPeriod(): string {
    return spokenPeriod(this._config?.trends.minutes ?? 120, this._i18n.t);
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
    const { t } = this._i18n;
    const trends = this._config!.trends;
    const configured = [room.carbon_dioxide, room.pm25].filter((entityId): entityId is EntityId => Boolean(entityId));
    const spoken = (label: string, present: boolean, entityId: EntityId | undefined, reading: Reading, unit: string, slot: "co2" | "pm25") => {
      if (!present || !entityId) {
        return undefined;
      }
      const direction =
        reading.value === undefined ? undefined : trendDirection(this._trends[entityId], trendStep(trends, slot));
      return t.airSensor(
        label,
        reading.value === undefined ? undefined : `${this._i18n.whole(reading.value)} ${unit}`,
        direction ? t.trendOver(t.trend[direction], this.trendPeriod()) : undefined,
        this.staleSpoken(reading),
      );
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
      <span class="sr-only" id=${descriptionId}>${t.airDescription(room.name, description, popup)}</span>
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
      <div class="options list-options" role="group" aria-label=${this._i18n.t.air}>
        ${rows.map(({ slot, label, unit, entityId, warning, critical }) => {
          const reading = slot === "pm25" ? this.pm25Reading(room, now) : this.reading(entityId, stale, now);
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
              <span class="option-hint">${this._i18n.t.detailsAndHistory}</span>
            </span>
            <span class="list-value" style=${`color: ${this.popupColor(this.airColor(reading, warning, critical))}`}>
              ${hasValue
                ? `${this._i18n.whole(reading.value as number)} ${unit}`
                : html`<span aria-hidden="true">––</span><span class="sr-only">${this._i18n.t.unknownValue}</span>`}
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
    const value = this._i18n.whole(reading.value ?? 0);
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
                  <span class="row-unit">${unit}</span>${this.staleMark(reading)}`
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
    const { t } = this._i18n;
    return html`
      <button
        type="button"
        class="plain-button trend-button slot-temperature-trend"
        aria-label=${t.temperatureTrendLabel(
          room.name,
          this.trendPeriod(),
          direction ? t.trend[direction] : undefined,
          this.historyPeriod(),
        )}
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
    const { t } = this._i18n;
    const heating = roomHeating(room, (entityId) => this.getState(entityId), this._i18n);
    const climate = climateView(this.getState(room.air_conditioner), this._i18n);
    const heatingRow = (primary: boolean) =>
      this.renderSystemRow(renderHeatingWaves(heating.unknown ? 0 : heating.waves, heating.unknown), heating, primary);
    const climateRow = (primary: boolean) =>
      this.renderSystemRow(renderClimateIcon(climate.mode, climate.color, climate.unknown), climate, primary);
    const order: Array<"heating" | "climate"> = isSummer ? ["climate", "heating"] : ["heating", "climate"];
    const target = this.hvacTarget(room, order);
    const spoken = order
      .map((kind) => `${t.system[kind]} ${spokenSystem(kind === "heating" ? heating : climate, this._i18n)}`)
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
      <span class="sr-only" id=${descriptionId}>${t.hvacDescription(room.name, spoken, target)}</span>
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
    const { t } = this._i18n;
    const states = room.windows.map((window) => ({ window, ...this.windowState(window.entity, now) }));
    const open = states.filter((item) => item.state === "open");
    const opened = open.length > 0;
    const unavailable = !opened && (states.length === 0 || states.some((item) => item.state === "unknown"));
    const multiple = room.windows.length > 1;
    // Red is reserved for critical air values (CURRENT_SPEC.md, Barvy); an open window is
    // emphasised in light sky blue.
    const color = opened ? COLORS.sky : COLORS.label;
    const label = opened ? (open.length > 1 ? t.window.openCount(open.length) : t.window.open) : unavailable ? "––" : t.window.closed;
    // How long the room has had a window open, faintly after the label.
    const durations = open.map((item) => item.minutesOpen).filter((minutes): minutes is number => minutes !== undefined);
    const minutesOpen = durations.length > 0 ? Math.max(...durations) : undefined;
    // A subtle orange dot when the open window contradicts the heating or cooling.
    const conflict = conflicts.includes("window-heating")
      ? t.window.conflict.heating
      : conflicts.includes("window-cooling")
        ? t.window.conflict.cooling
        : undefined;
    const descriptionId = `window-description-${index}`;
    const duration = minutesOpen === undefined ? undefined : spokenDuration(minutesOpen, t);
    let spoken: string;
    if (!multiple) {
      spoken = t.window.spokenSingle(unavailable ? "unknown" : opened ? "open" : "closed", duration);
    } else if (opened) {
      const names = open.map((item) => this.windowName(room, item.window)).join(", ");
      spoken = open.length === 1 ? t.window.spokenOneOpen(names, duration) : t.window.spokenManyOpen(names, duration);
    } else {
      spoken = unavailable ? t.window.spokenUnknown : t.window.spokenAllClosed;
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
      <span class="sr-only" id=${descriptionId}>${t.window.description(room.name, spoken, conflict, multiple)}</span>
    `;
  }

  /** Name of a window in the "Okna" popup: from the YAML, otherwise "Okno 1", "Window 1", … */
  private windowName(room: Room, window: WindowConfig): string {
    return window.name ?? this._i18n.t.window.defaultName(room.windows.indexOf(window) + 1);
  }

  /** Popup "Okna" of a room with several windows: each window with its state; a row opens its detail. */
  private renderWindowsBody(room: Room, now: number): TemplateResult {
    const { t } = this._i18n;
    return html`
      <div class="options list-options" role="group" aria-label=${t.window.popup}>
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
              <span>${this.windowName(room, window)}</span>
              <span class="option-hint">${t.detailsAndHistory}</span>
            </span>
            <span class="list-value" style=${`color: ${color}`}>
              ${unknown
                ? html`<span aria-hidden="true">––</span><span class="sr-only">${t.unknownValue}</span>`
                : state === "open"
                  ? t.window.open
                  : t.window.closed}${minutesOpen === undefined
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
    const { t } = this._i18n;
    const description = known ? t.cover.position(Math.round(position), Math.round(tilt)) : t.cover.unknown;

    return html`
      <button
        type="button"
        class="plain-button cover-panel ${moving ? "moving" : ""}"
        aria-label=${t.cover.label(room.name, description, moving)}
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
      <div class="presets" role="group" aria-label=${t.cover.presets(room.name)}>
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
    const { t } = this._i18n;
    const name = presetName(preset, t);
    const failed = this._hint?.key === key && this._hint.error === true;

    // No visible label: the name is in title / aria-label. A single tap only shows a hint;
    // the preset is sent by a double tap or a long press, or by the keyboard (detail 0).
    // An unavailable blind keeps its buttons focusable but greyed out; they only explain why.
    return html`
      <button
        type="button"
        class="plain-button preset ${this._flash === key ? "sent" : ""} ${available ? "" : "unavailable"} ${
          pending ? "pending" : ""
        } ${failed ? "failed" : ""}"
        title=${name}
        aria-pressed=${active ? "true" : "false"}
        aria-busy=${pending ? "true" : nothing}
        aria-disabled=${available ? "false" : "true"}
        aria-label=${failed && this._hint?.spoken
          ? `${t.cover.preset(room.name, name, presetDescription(preset, t), available)} ${this._hint.text} ${this._hint.spoken}`
          : t.cover.preset(room.name, name, presetDescription(preset, t), available)}
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
        ${this._hint?.key !== key
          ? nothing
          : failed
            ? html`<span class="preset-hint error" role="alert"
                >${this._hint.text}<span class="sr-only"> ${this._hint.spoken}</span></span
              >`
            : html`<span class="preset-hint" role="status">${this._hint.text}</span>`}
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
        this.showHint(key, this._i18n.t.cover.hint, "selection");
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
    this.showHint(key, this._i18n.t.cover.unavailable, "warning");
  }

  private showHint(key: string, text: string, haptic: HapticType, failure?: { spoken: string }): void {
    this._hint = { key, text, ...(failure ? { spoken: failure.spoken, error: true } : {}) };
    this.haptic(haptic);
    window.clearTimeout(this._hintHideTimer);
    this._hintHideTimer = window.setTimeout(() => {
      this._hint = undefined;
    }, failure ? ERROR_HINT_MS : HINT_MS);
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
      console.error("Klima Dashboard: the blind script failed", error);
      this.endMoving(room.name);
      // The error appears at the button that was pressed, not far above the cards (TODO P2.18).
      const { cover } = this._i18n.t;
      this.showHint(`${room.name}|${preset.id}`, cover.failedHint, "failure", { spoken: cover.failed(room.name) });
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

  // ----------------------------------------------------------------- sheet

  private renderSheet(isSummer: boolean): TemplateResult | typeof nothing {
    const sheet = this._sheet;
    if (!sheet) {
      return nothing;
    }
    const { t } = this._i18n;
    if (sheet.kind === "history") {
      return this.renderSheetFrame(
        t.sheet.history(this._config?.history.hours ?? 24),
        sheet.room.name,
        this.renderHistoryBody(sheet.room, isSummer),
        "history-sheet",
      );
    }
    if (sheet.kind === "air") {
      return this.renderSheetFrame(t.air, sheet.room.name, this.renderAirBody(sheet.room, Date.now()));
    }
    if (sheet.kind === "windows") {
      return this.renderSheetFrame(t.window.popup, sheet.room.name, this.renderWindowsBody(sheet.room, Date.now()));
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
        @touchstart=${this.sheetTouchStart}
        @touchmove=${this.sheetTouchMove}
        @wheel=${this.sheetWheel}
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
              <button type="button" class="plain-button close" aria-label=${this._i18n.t.sheet.close} @click=${() => this.closeSheet()}>
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
        ? this.heatingOptions(entityId, hvacModes, activeHeating(this.heatControl(room, entityId, entity)))
        : this.climateOptions(entityId, hvacModes, state);
    const presets = !isHeating && available && entityId ? presetModes.filter((mode) => mode !== "none") : [];
    const order: Array<"heating" | "climate"> = isSummer ? ["climate", "heating"] : ["heating", "climate"];
    const both = Boolean(room.heating?.climate) && Boolean(room.air_conditioner);
    const { t } = this._i18n;

    const unsupported = options.filter((option) => option.unsupported).map((option) => `${option.label}: ${option.unsupported}`);
    const body = html`
      ${!available
        ? html`<p class="sheet-message">${t.sheet.entityUnavailable}</p>`
        : options.length === 0
          ? html`<p class="sheet-message">${t.sheet.noModes}</p>`
          : html`${isHeating && entityId ? this.renderHeatControl(room, entityId, entity) : nothing}
              <div class="options ${isHeating ? "icon-options" : ""}" role="group" aria-label=${t.sheet.modes(t.system[kind])}>
                ${options.map((option) => this.renderOption(option))}
              </div>
              ${isHeating
                ? html`<p class="heat-note" role="status">${this.heatNote(room, entityId, entity, unsupported)}</p>`
                : nothing}`}
      ${presets.length > 0
        ? html`<div class="sheet-label" id="preset-label">${t.sheet.presets}</div>
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
        ${t.detailsAndHistory}
      </button>
    `;

    if (!both) {
      return html`<div class="sheet-label system-name">${t.system[kind]}</div>${body}`;
    }
    // ARIA tabs: arrows / Home / End switch the system, only the selected tab is in the Tab order.
    // The switch is at the bottom, so it stays where it is when the controls above it change size.
    return html`
      <div class="hvac-panel" role="tabpanel" id="hvac-panel" aria-labelledby=${`tab-${kind}`}>${body}</div>
      <div
        class="segmented"
        role="tablist"
        aria-label=${t.sheet.systems}
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
            ${t.system[system]}
          </button>`,
        )}
      </div>
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
  private renderHistoryBody(room: Room, isSummer: boolean): TemplateResult {
    const hours = this._config?.history.hours ?? 24;
    const { t } = this._i18n;
    let body: TemplateResult;
    const model = this._historyModel;
    if (this._historyStatus === "loading") {
      body = html`<p class="sheet-message">${t.sheet.loading}</p>`;
    } else if (this._historyStatus === "error" || !model) {
      body = html`<p class="sheet-message error" role="alert">${t.sheet.historyFailed}</p>`;
    } else if (!hasChartData(model)) {
      body = html`<p class="sheet-message">${t.sheet.noHistory(hours)}</p>`;
    } else {
      body = html`<div
        class="chart-wrap"
        tabindex="0"
        role="group"
        aria-label=${t.sheet.chart(this.historyPeriod())}
        @pointerdown=${this.chartPointer}
        @pointermove=${this.chartPointer}
        @pointerup=${this.chartPointerEnd}
        @pointercancel=${this.chartPointerEnd}
        @pointerleave=${this.chartPointerLeave}
        @keydown=${this.chartKeydown}
      >
        ${renderRoomChart(model, this.chartWidth(), this._scrubTime, this._i18n, isSummer)}
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
        ${t.sheet.temperatureDetails}
      </button>
    `;
  }

  /** The chart is drawn 1:1 in CSS pixels at the inner width of the popup. */
  private chartWidth(): number {
    // On its side the popup is as wide as the phone (styles.ts, the same query), otherwise 460 px at most.
    const landscape = window.matchMedia?.(LANDSCAPE_QUERY).matches === true;
    return Math.max(280, Math.min(landscape ? 960 : 460, window.innerWidth) - 32);
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

  /**
   * A finger drag or the wheel over a popup must not move the page under it (TODO P1.9.3, P1.9.9).
   * Outside the popup, and inside it when it cannot scroll further in that direction, the move is
   * cancelled; a popup that does scroll keeps its own scrolling (`overscroll-behavior` covers the rest).
   */
  private sheetTouchStart = (event: TouchEvent): void => {
    this._touchY = event.touches[0]?.clientY;
    // A finger on a slider (range input) drags the slider: cancelling its moves would freeze it (iOS).
    this._touchOnSlider = event.composedPath().some((node) => node instanceof HTMLInputElement && node.type === "range");
  };

  private sheetTouchMove = (event: TouchEvent): void => {
    if (this._touchOnSlider) {
      return;
    }
    if (event.cancelable && this.sheetCannotScroll(event, (event.touches[0]?.clientY ?? 0) - (this._touchY ?? 0))) {
      event.preventDefault();
    }
  };

  private sheetWheel = (event: WheelEvent): void => {
    if (event.cancelable && !event.ctrlKey && this.sheetCannotScroll(event, -event.deltaY)) {
      event.preventDefault();
    }
  };

  /** `movement` > 0 pulls the content down (towards its top), < 0 up. */
  private sheetCannotScroll(event: Event, movement: number): boolean {
    const sheet = this.renderRoot.querySelector<HTMLElement>(".sheet");
    if (!sheet || !event.composedPath().includes(sheet)) {
      return true;
    }
    const scrolls = sheet.scrollHeight > sheet.clientHeight + 1;
    return (
      !scrolls ||
      (movement > 0 && sheet.scrollTop <= 0) ||
      (movement < 0 && sheet.scrollTop + sheet.clientHeight >= sheet.scrollHeight - 1)
    );
  }

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
   * Ručně (heat). Boost (a fixed 25 °C) and the duration of Ručně / Boost / Vypnuto need the
   * Tado CE action `tado_ce.set_climate_timer`; without it Boost is shown but disabled.
   * A choice is applied when the popup closes.
   */
  private heatingOptions(entityId: EntityId, hvacModes: string[], active: string | undefined): SheetOption[] {
    const options: SheetOption[] = [];
    const labels = this._i18n.t.heatingMode;
    const timer = this.timerAvailable();
    const add = (
      id: HeatingOptionId,
      label: string,
      color: string,
      mode: HeatingControlMode,
      unsupported?: string,
    ): void => {
      options.push({
        id,
        label,
        icon: renderHeatingOptionIcon(id),
        color,
        active: active === id,
        run: () => this.chooseHeating(entityId, mode),
        unsupported,
      });
    };
    if (hvacModes.includes("off")) {
      add("off", labels.off, COLORS.off, "off");
    }
    if (hvacModes.includes("auto")) {
      add("auto", labels.schedule, COLORS.plan, "plan");
    }
    if (hvacModes.includes("heat")) {
      add("heat", labels.manual, COLORS.warning, "manual");
    }
    if (options.length > 0) {
      add("boost", labels.boost, COLORS.alert, "boost", timer ? undefined : this._i18n.t.sheet.notOffered);
    }
    return options;
  }

  /** The Tado CE timer action exists in this Home Assistant (Home Assistant lists the registered actions). */
  private timerAvailable(): boolean {
    return Boolean(this.hass?.services?.tado_ce?.set_climate_timer);
  }

  /** What the controls show: the person's change, otherwise what the climate entity reports. */
  private heatControl(room: Room, entityId: EntityId, entity: HassEntity | undefined): HeatingControl | undefined {
    return this._heat?.entityId === entityId ? this._heat : currentHeatingControl(room.name, entityId, entity);
  }

  /** Choosing the mode the entity already has drops the change; otherwise it waits for the popup to close. */
  private async chooseHeating(entityId: EntityId, mode: HeatingControlMode): Promise<void> {
    const room = this._sheet?.room;
    if (!room) {
      return;
    }
    const entity = this.getState(entityId);
    const current = currentHeatingControl(room.name, entityId, entity);
    if (current?.mode === mode) {
      this._heat = undefined;
      return;
    }
    const base = this.heatControl(room, entityId, entity);
    this._heat = {
      room: room.name,
      entityId,
      mode,
      temperature: base?.temperature ?? 21,
      duration: defaultDuration(mode),
    };
  }

  /** Sends the change made in the popup (closing, switching to Klimatizace, leaving for the detail). */
  private flushHeat(): void {
    const heat = this._heat;
    if (!heat) {
      return;
    }
    this._heat = undefined;
    void this.applyHeat(heat);
  }

  private async applyHeat(heat: HeatingControl): Promise<void> {
    try {
      await this.callCommand(heatingCommand(heat.entityId, heat, this.timerAvailable()));
    } catch (error) {
      // The popup is gone: a failure is a haptic "failure" and the console.
      console.error("Klima Dashboard: the heating command failed", error);
      this.haptic("failure");
    }
  }

  private async callCommand(command: ServiceCall | undefined): Promise<void> {
    if (!this.hass) {
      throw new Error("Home Assistant is not connected.");
    }
    if (!command) {
      throw new Error("Klima Dashboard: the heating choice has no Home Assistant action.");
    }
    await this.hass.callService(command.domain, command.service, command.data);
  }

  private editHeat(room: Room, entityId: EntityId, change: Partial<HeatingControl>): void {
    const base = this.heatControl(room, entityId, this.getState(entityId));
    if (base) {
      this._heat = { ...base, ...change };
    }
  }

  /** The line under the options: what waits for the popup to close, else the time left, else what is not offered. */
  private heatNote(room: Room, entityId: EntityId | undefined, entity: HassEntity | undefined, unsupported: string[]): string {
    const c = this._i18n.t.sheet.heatControl;
    if (this._heat) {
      return c.appliesOnClose;
    }
    const active = activeHeatingId(entity);
    const seconds = numberOf(this.getState(room.heating?.overlay)?.attributes.overlay_remaining_seconds);
    if (entityId && active !== undefined && active !== "auto" && seconds !== undefined && seconds > 0) {
      return c.remaining(minutesLabel(Math.ceil(seconds / 60)));
    }
    return unsupported.join(" · ");
  }

  /** Temperature and duration of Ručně / Boost / Vypnuto, above the options (so these do not move when it changes). */
  private renderHeatControl(room: Room, entityId: EntityId, entity: HassEntity | undefined): TemplateResult | typeof nothing {
    const heat = this.heatControl(room, entityId, entity);
    const c = this._i18n.t.sheet.heatControl;
    if (!heat || heat.mode === "plan") {
      return nothing;
    }
    const i18n = this._i18n;
    const timer = this.timerAvailable();
    const manual = manualRange(temperatureRange(entity));
    const minutes = durationMinutes(heat.duration);
    const unit = `${NBSP}°C`;

    const temperature =
      heat.mode === "manual"
        ? this.renderSlider({
            id: "heat-temperature",
            label: c.temperature,
            ariaLabel: c.temperatureSlider,
            value: heat.temperature,
            min: manual.min,
            max: manual.max,
            step: manual.step,
            big: `${i18n.half(heat.temperature)}${unit}`,
            sub: "",
            minLabel: `${i18n.half(manual.min)}${unit}`,
            maxLabel: `${i18n.half(manual.max)}${unit}`,
            ticks: Math.round(manual.max - manual.min) + 1,
            onInput: (value) =>
              this.editHeat(room, entityId, { temperature: snapTemperature(value, manual), mode: "manual" }),
          })
        : heat.mode === "boost"
          ? html`<div class="heat-fixed">
              <span class="slider-label">${c.fixedTemperature}</span>
              <span class="slider-big">${i18n.half(BOOST_TEMPERATURE)}${unit}</span>
            </div>`
          : nothing;

    const durationBig =
      minutes !== undefined ? minutesLabel(minutes) : heat.duration === NEXT_PLAN ? c.nextPlan : c.untilResumed;
    const durationSub = minutes !== undefined ? c.until(i18n.time(Date.now() + minutes * 60_000)) : "";
    const duration = timer
      ? this.renderSlider({
          id: "heat-duration",
          label: c.duration,
          ariaLabel: c.durationSlider,
          value: heat.duration,
          min: 0,
          max: UNTIL_RESUMED,
          step: 1,
          big: durationBig,
          sub: durationSub,
          minLabel: minutesLabel(DURATION_MINUTES[0]),
          maxLabel: "∞",
          ticks: UNTIL_RESUMED + 1,
          valueText: durationSub ? `${durationBig}, ${durationSub}` : durationBig,
          onInput: (value) =>
            this.editHeat(room, entityId, { duration: Math.min(UNTIL_RESUMED, Math.max(0, Math.round(value))) }),
        })
      : heat.mode === "manual"
        ? html`<p class="sheet-message">${c.noTimer}</p>`
        : nothing;

    return html`
      <div class="heat-control" role="group" aria-label=${i18n.t.heatingMode[heat.mode]}>
        ${temperature}
        ${heat.mode === "off" && timer && heat.duration !== UNTIL_RESUMED ? html`<p class="heat-detail">${c.offTarget}</p>` : nothing}
        ${duration}
      </div>
    `;
  }

  /** The slider of the boiler design: label, big value, native range input (keyboard, screen reader), ticks, min / max. */
  private renderSlider(options: {
    id: string;
    label: string;
    ariaLabel: string;
    value: number;
    min: number;
    max: number;
    step: number;
    big: string;
    sub: string;
    minLabel: string;
    maxLabel: string;
    ticks: number;
    valueText?: string;
    onInput: (value: number) => void;
  }): TemplateResult {
    const span = options.max - options.min;
    const fill = span > 0 ? ((options.value - options.min) / span) * 100 : 0;
    return html`
      <div class="slider-block">
        <div class="slider-head">
          <span class="slider-label">${options.label}</span>
          <span class="slider-big">${options.big}</span>
        </div>
        ${options.sub ? html`<div class="slider-sub">${options.sub}</div>` : nothing}
        <input
          class="heat-slider"
          id=${options.id}
          type="range"
          min=${options.min}
          max=${options.max}
          step=${options.step}
          .value=${String(options.value)}
          aria-label=${options.ariaLabel}
          aria-valuetext=${options.valueText ?? options.big}
          style=${`--fill: ${fill}%`}
          @input=${(event: Event) => options.onInput(Number((event.currentTarget as HTMLInputElement).value))}
        />
        <div class="slider-ticks" aria-hidden="true">
          ${Array.from({ length: Math.max(2, options.ticks) }, () => html`<span></span>`)}
        </div>
        <div class="slider-scale" aria-hidden="true"><span>${options.minLabel}</span><span>${options.maxLabel}</span></div>
      </div>
    `;
  }

  private climateOptions(entityId: EntityId, hvacModes: string[], state: string | undefined): SheetOption[] {
    return CLIMATE_MODE_ORDER.filter((mode) => hvacModes.includes(mode)).map((mode) => {
      const climateMode = climateModeFromState(mode);
      const color = CLIMATE_COLORS[climateMode];
      return {
        id: mode,
        label: this._i18n.t.climateMode[climateMode],
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
      throw new Error("Home Assistant is not connected.");
    }
    await this.hass.callService("climate", service, data);
  }

  private async runSheetAction(run: () => Promise<void>): Promise<void> {
    this._sheetError = undefined;
    try {
      await run();
    } catch (error) {
      console.error("Klima Dashboard: the climate command failed", error);
      this._sheetError = this._i18n.t.sheet.commandFailed;
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
        '.sheet button:not([disabled]):not([tabindex="-1"]), .sheet input:not([disabled]), .sheet .chart-wrap',
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
      this.flushHeat();
      this._sheetError = undefined;
      this._sheet = { kind, room: this._sheet.room };
    }
  }

  private closeSheet(restoreFocus = true): void {
    window.removeEventListener("resize", this.handleResize);
    this.flushHeat();
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
      ...room.windows.map((window) => window.entity),
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
      console.error("Klima Dashboard: loading the room history failed", error);
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
      console.error("Klima Dashboard: loading the history of the micro trends failed", error);
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
  private reading(entityId: EntityId | undefined, staleMinutes: number, now: number, zeroIsFresh = false): Reading {
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
    // A particle sensor that measures 0 µg/m³ (clean air) reports nothing new: silence is no fault.
    return { value, ageMinutes, stale: !(zeroIsFresh && value === 0) && ageMinutes > staleMinutes };
  }

  /**
   * PM2.5 of a room (CURRENT_SPEC.md, Chybějící data). A measured 0 µg/m³ is clean air and never
   * stale. The particle sensor shares the device of the CO₂ sensor (ALPSTUGA) and reports only a
   * change, which a steady value may not give for hours: while the CO₂ of the room is fresh, the
   * device is alive and the unchanged PM2.5 is fresh too.
   */
  private pm25Reading(room: Room, now: number): Reading {
    const stale = room.thresholds.stale_minutes;
    const own = this.reading(room.pm25, stale, now, true);
    if (own.value === undefined || own.stale !== true) {
      return own;
    }
    const device = this.reading(room.carbon_dioxide, stale, now);
    return device.value !== undefined && device.stale === false
      ? { value: own.value, ageMinutes: device.ageMinutes, stale: false }
      : own;
  }

  /** Grey clock behind a stale value; the age is in the tooltip and for screen readers (CURRENT_SPEC.md, Chybějící data). */
  private staleMark(reading: Reading): TemplateResult | typeof nothing {
    return reading.stale ? html`<span class="stale-mark" aria-hidden="true">${renderClockIcon()}</span>` : nothing;
  }

  private staleTitle(reading: Reading): string | undefined {
    return reading.stale && reading.ageMinutes !== undefined ? this._i18n.t.lastSeen(formatAge(reading.ageMinutes)) : undefined;
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
