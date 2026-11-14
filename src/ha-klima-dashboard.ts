import { LitElement, html, nothing } from "lit";
import { property, state } from "lit/decorators.js";
import type { PropertyValues, TemplateResult } from "lit";
import { BLIND_HEIGHT, BLIND_WIDTH, renderBlindShape } from "./blind";
import { normalizeConfig, plainText } from "./config";
import { SCRUB_STEP_MS, buildRoomChart, hasChartData, renderRoomChart, timeAtX } from "./charts";
import type { LiveReading } from "./charts";
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
import {
  numberOf,
} from "./heating-control";
import { HOUR_MS, fetchHistory, normalizeToAxis, sampleNumeric, sharedAxis, stateAt } from "./history";
import { absoluteHumidity, co2Value, lastSession, openDuring, progress } from "./ventilation";
import type { VentilationSession } from "./ventilation";
import { pickText } from "ha-dashboard-kit/config";
import { HoldOrDoubleTap } from "ha-dashboard-kit/gesture";
import { RunStarts } from "ha-dashboard-kit/runstart";
import { fitJoined, joined, joinedStyles, joinedText } from "ha-dashboard-kit/joined";
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
  DetailFocus,
  HistoryMetric,
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
  configuredEntityIds,
  formatAge,
  formatDuration,
  getRoomStatus,
  isUnavailable,
  measurementEntityIds,
  numberAttribute,
  presetDescription,
  presetName,
  roomLabel,
  sameAttributes,
  spokenDuration,
  spokenPeriod,
  trendDirection,
  trendEntityIds,
  trendStep,
} from "./utils";

const TREND_REFRESH_MS = 5 * 60_000;
const CLOCK_TICK_MS = 30_000;
const NBSP = " ";

/** One quantity of a room at the three times of the ventilation popup. */
interface VentilationTriple {
  before?: number;
  after?: number;
  settled?: number;
}

/** What the ventilation popup learned from the history (see loadVentilation). */
interface VentilationData {
  session?: VentilationSession;
  rooms: Array<{
    name: string;
    opened: boolean;
    start?: number;
    end?: number;
    /** CO₂ (ppm), temperature (°C) and absolute humidity (g/m³) at the start, at the end and (once the settling time has passed) that long after the end. */
    co2?: VentilationTriple;
    temperature?: VentilationTriple;
    humidity?: VentilationTriple;
  }>;
  failed?: boolean;
}

/** Blind presets are sent only by a long press or a double tap, never by a single tap. */
const LONG_PRESS_MS = 550;
const DOUBLE_TAP_MS = 400;
const FLASH_MS = 700;
/** How long the "hold or double tap" hint stays after a single tap on a preset. */
/** A phone on its side or any short window: the history popup is full width (styles.ts). */
const LANDSCAPE_QUERY = "(orientation: landscape) and (max-height: 600px)";
/** The longer period of the charts of the room detail: a week. */
const WEEK_HOURS = 168;
/** The id of a position and tilt set by the sliders of the room detail (no preset of the room has it). */
const CUSTOM_PRESET = "custom";
const HINT_MS = 1_600;
/** A failed preset stays visible longer: the person has to read it. */
const ERROR_HINT_MS = 5_000;

type TrendAxes = Partial<Record<TrendKind, TrendAxis>>;
type HistoryStatus = "loading" | "ready" | "error";
/** Haptic types forwarded by the Home Assistant app to the Taptic Engine. */
type HapticType = "success" | "failure" | "warning" | "selection" | "light";


export class HaKlimaDashboard extends LitElement {
  static styles = [joinedStyles, styles];

  @state()
  private _config?: Settings;

  /** Texts and number formats of the card language (CURRENT_SPEC.md, Jazyky); set in willUpdate. */
  private _i18n: I18n = getI18n("en");

  @property({ attribute: false })
  hass?: HomeAssistant;

  /** Since when a window is open and the ventilation mode runs: from the recorder, a restart of Home Assistant does not start them again. */
  private readonly _starts = new RunStarts(() => this.requestUpdate());

  @state()
  private _sheet?: SheetState;

  @state()
  private _sheetError?: string;
  /** The rooms the popup Topení / Klimatizace sets now (entity ids); the room tiles of the popup change them. */
  @state() private _hvacSelected: EntityId[] = [];

  /** Ventilation popup: "Ukončit" was sent and the mode has not turned off yet. */
  @state()
  private _ventilationEnding = false;
  private _endTimer?: number;

  /** Polite announcement for screen readers (the ventilation mode has ended). */
  @state()
  private _announcement = "";

  /** The ventilation popup: the last run of the mode and the CO₂ of the rooms at its start and end, from the history. */
  @state()
  private _vent?: VentilationData;
  private _ventRequest = 0;
  /** The ventilation mode was on at the last render (a change reloads the popup). */
  private _ventOn = false;

  /** 24 h room history shown in the "history" popup. */
  @state()
  private _historyStatus: HistoryStatus = "loading";

  @state()
  private _historyModel?: RoomChartModel;

  /** Time under the finger in the history chart; undefined = now. */
  @state()
  private _scrubTime?: number;

  /** Period of the charts of the room detail in hours: `history.hours`, or a week (CURRENT_SPEC.md, Sjednocení, Období historie). */
  @state()
  private _historyHours = 24;
  /** The part the room detail scrolls to once it is drawn. */
  private _focusPart?: DetailFocus;
  /** A position and tilt set by the sliders of the detail, shown until the blind arrives. */
  @state()
  private _coverTarget: Record<string, { position: number; tilt: number }> = {};

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
  private _trendTimer?: number;

  /** Re-renders the card every 30 s while a window is open or the ventilation mode runs, so the times keep counting. */
  private _clockTimer?: number;

  @state()
  private _clock = 0;
  private _trendsLoading = false;
  private _trendsStarted = false;
  private _opener?: HTMLElement;
  /** Long press or double tap on a blind preset (ha-dashboard-kit/gesture); a single tap only explains. */
  private readonly _gesture = new HoldOrDoubleTap(() => ({ holdMs: LONG_PRESS_MS, doubleTapMs: DOUBLE_TAP_MS }));
  private _flashTimer?: number;
  private _hintTimer?: number;
  private _hintHideTimer?: number;
  /** Per room with a preset on its way: last seen blind state and the stall timer. */
  private _movingWatch = new Map<string, { signature: string; timer?: number }>();

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
      if (this.anyWindowOpen() || this.ventilationOn()) {
        this._clock = Date.now();
      }
    }, CLOCK_TICK_MS);
    // Texts joined by a dot are measured again when the card width changes or a web font arrives (ha-dashboard-kit/joined).
    this._joinedObserver = new ResizeObserver(() => {
      const width = Math.round(this.getBoundingClientRect().width);
      if (width === this._joinedWidth) return;
      this._joinedWidth = width;
      window.requestAnimationFrame(() => this.fitJoined());
    });
    this._joinedObserver.observe(this);
    document.fonts?.addEventListener("loadingdone", this.handleFonts);
    this.requestUpdate();
  }

  private _joinedObserver?: ResizeObserver;
  private _joinedWidth = 0;
  private _fonts = 0;
  private handleFonts = (): void => {
    this._fonts++;
    this.fitJoined();
  };

  private fitJoined(): void {
    fitJoined(this.renderRoot, `${this._joinedWidth}|${this._fonts}`);
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this._joinedObserver?.disconnect();
    this._joinedObserver = undefined;
    document.fonts?.removeEventListener("loadingdone", this.handleFonts);
    this._colorScheme?.removeEventListener("change", this.handleColorScheme);
    this._colorScheme = undefined;
    window.removeEventListener("resize", this.handleResize);
    this.flushClimate();
    this._gesture.dispose();
    for (const timer of [this._flashTimer, this._hintTimer, this._hintHideTimer]) {
      window.clearTimeout(timer);
    }
    for (const roomName of [...this._movingWatch.keys()]) {
      this.endMoving(roomName);
    }
    window.clearInterval(this._trendTimer);
    window.clearInterval(this._clockTimer);
    window.clearTimeout(this._endTimer);
    this._trendTimer = undefined;
    this._clockTimer = undefined;
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
    // The mode started or ended (button, last window closed, timer ...): the popup stays and shows the result.
    const ventilationOn = this.ventilationOn();
    if (ventilationOn !== this._ventOn) {
      this._ventOn = ventilationOn;
      this._ventilationEnding = false;
      if (this._sheet?.kind === "ventilation") {
        this._announcement = ventilationOn ? "" : this._i18n.t.ventilation.ended;
        void this.loadVentilation();
      }
    }
  }

  /**
   * Dark or light (CURRENT_SPEC.md, Barvy): `theme: dark | light` forces it; `auto` follows the
   * dark mode Home Assistant uses (with the "Auto" theme, the system appearance), and without
   * that the system colour scheme of the browser.
   */
  private theme(): Theme {
    // No setting of its own (HIG Dark Mode; uživatel 14. 11. 2026: „Q236 ano“): the mode of Home Assistant, else of the system.
    const dark = this.hass?.themes?.darkMode;
    return (typeof dark === "boolean" ? dark : this._prefersDark) ? "dark" : "light";
  }

  private handleColorScheme = (event: MediaQueryListEvent): void => {
    this._prefersDark = event.matches;
  };

  protected updated(changedProperties: PropertyValues): void {
    this.fitJoined();
    if (!this._trendsStarted && this.hass && this._config) {
      this._trendsStarted = true;
      void this.refreshTrends();
      window.clearInterval(this._trendTimer);
      this._trendTimer = window.setInterval(() => void this.refreshTrends(), TREND_REFRESH_MS);
    }
    if (this._focusPart && this._sheet?.kind === "history") {
      const part = this.renderRoot.querySelector<HTMLElement>(`[data-part="${this._focusPart}"]`);
      if (part) {
        this._focusPart = undefined;
        // The temperature chart is at the top already; the other parts are brought to the top of the sheet, once the sheet
        // of the kit has drawn itself and can scroll.
        if (part.dataset.part !== "temperature") {
          const sheet = this.renderRoot.querySelector("kd-sheet") as (Element & { updateComplete?: Promise<unknown> }) | null;
          void Promise.resolve(sheet?.updateComplete).then(() => requestAnimationFrame(() => part.scrollIntoView({ block: "start" })));
        }
      }
    }
    if (this._focusSegment) {
      this.renderRoot.querySelector<HTMLElement>(`.segment[data-system="${this._focusSegment}"]`)?.focus();
      this._focusSegment = undefined;
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
    // No title: the name of the dashboard is at the top of Home Assistant (uživatel 12. 11. 2026: „nechci title … To zrus“).
    // The header disappears when nothing else is in it (CURRENT_SPEC.md, Dashboard Domov).
    const tiles = this.renderTopTiles(now);
    const chips = houseSummary(
      this._config.rooms,
      (entityId) => this.getState(entityId),
      this.coldRooms(isSummer, modeKnown, now),
      this._i18n,
    );
    const hasHeader = tiles !== nothing || chips.length > 0;

    return html`
      <ha-card>
        <div class="dashboard">
          ${hasHeader
            ? html`<header class="dashboard-header">
                ${tiles} ${this.renderSummary(chips)}
              </header>`
            : nothing}
          <div class="rooms n${Math.min(this._config.rooms.length, 4)}">
            ${this._config.rooms.map((room, index) =>
              this.renderRoom(room, index, isSummer, modeKnown, axes, now),
            )}
          </div>
        </div>
        ${this.renderSheet(isSummer, modeKnown, now)}
        <div class="sr-only" role="status" aria-live="polite">${this._announcement}</div>
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

  /** What is known about the outside now: the temperature, the weather in words, the range of the day, the rain, the humidity and the air. */
  private outsideFacts(): { temperature?: number; condition?: string; range?: string; rain?: number; humidity?: number; air?: { label: string; color: string } } | undefined {
    const outside = this._config?.outside;
    if (!outside) {
      return undefined;
    }
    const { t, whole } = this._i18n;
    const minimum = this.numberState(outside.minimum);
    const maximum = this.numberState(outside.maximum);
    const pm25 = this.numberState(outside.pm25);
    const weather = this.entityState(outside.weather)?.toLowerCase();
    // Outdoor air uses the shared PM2.5 limits of the rooms (CURRENT_SPEC.md, Dashboard Domov).
    const thresholds = this._config!.thresholds;
    const air =
      pm25 === undefined
        ? undefined
        : pm25 >= thresholds.pm25_critical
          ? { label: t.airLevel.poor, color: COLORS.alert }
          : pm25 >= thresholds.pm25_warning
            ? { label: t.airLevel.moderate, color: COLORS.warning }
            : { label: t.airLevel.good, color: "var(--kd-text)" };
    return {
      temperature: this.numberState(outside.temperature),
      condition: weather === undefined ? undefined : t.weatherState[weather],
      range: minimum !== undefined && maximum !== undefined ? `${whole(minimum)}–${whole(maximum)}${NBSP}°C` : undefined,
      rain: this.numberState(outside.rain_probability),
      humidity: this.numberState(outside.humidity),
      air,
    };
  }

  /**
   * The top row (uživatel 14. 11. 2026: „Q230 B“): two tiles of the kit beside each other, "Venku" and "Větrací režim",
   * each with its name, its state in words and a chevron into its popup. A tile without data is left out and the other
   * takes the whole row.
   */
  private renderTopTiles(now: number): TemplateResult | typeof nothing {
    const { t, whole } = this._i18n;
    const facts = this.outsideFacts();
    const parts = facts
      ? [facts.condition, facts.range, facts.rain === undefined ? undefined : `☂${NBSP}${this._i18n.percent(whole(facts.rain))}`].filter((part): part is string => part !== undefined)
      : [];
    const hasOutside = facts !== undefined && (facts.temperature !== undefined || parts.length > 0 || facts.air !== undefined);
    const outsideName = facts?.temperature === undefined ? t.outside.title : `${t.outside.title} ${whole(facts.temperature)}${NBSP}°C`;
    const outsideText = parts.join(" · ");
    const outside = hasOutside
      ? html`<kd-tile
          class="outside-tile"
          kind="open"
          state="idle"
          .name=${outsideName}
          .text=${outsideText}
          .label=${[outsideName, outsideText, t.outside.spoken].filter(Boolean).join(". ")}
          @hdk-open=${(event: Event) => this.openHouseSheet("outside", event)}
        ></kd-tile>`
      : nothing;
    const state = this.ventilationState();
    let vent: TemplateResult | typeof nothing = nothing;
    if (state !== undefined) {
      const running = state === "on";
      const entityId = this._config!.ventilationEntity!;
      const since = this._starts.of(this.hass, entityId);
      const timer = this._config!.ventilationTimerEntity;
      const finishes = timer ? Date.parse(String(this.getState(timer)?.attributes.finishes_at ?? "")) : NaN;
      const when = (time: number): string => (new Date(time).toDateString() === new Date(now).toDateString() ? this._i18n.time(time) : `${this._i18n.day(time)} ${this._i18n.time(time)}`);
      const text = running
        ? [`${t.ventilation.running}${since === undefined ? "" : ` ${formatDuration(Math.max(0, (now - since) / 60_000))}`}`, ...(Number.isFinite(finishes) ? [t.ventilation.until(this._i18n.time(finishes))] : [])].join(" · ")
        : [t.ventilation.off, ...(since === undefined ? [] : [t.ventilation.lastAt(when(since))])].join(" · ");
      vent = html`<kd-tile
        class="vent-tile ${running ? "on" : "off"}"
        kind="open"
        state=${running ? "on" : "off"}
        .name=${t.ventilation.title}
        .text=${text}
        .label=${`${t.ventilation.title}. ${text}. ${running ? t.summaryChips.ventilationSpoken : t.summaryChips.ventilationOffSpoken}`}
        @hdk-open=${(event: Event) => this.openVentilationSheet(event)}
      ></kd-tile>`;
    }
    if (outside === nothing && vent === nothing) {
      return nothing;
    }
    return html`<div class="top-tiles ${outside !== nothing && vent !== nothing ? "" : "single"}">${outside}${vent}</div>`;
  }

  /** A popup of the whole house (Venku): it has no room; the first one stands in. */
  private openHouseSheet(kind: "outside", event: Event): void {
    const room = this._config?.rooms[0];
    if (room) {
      this.openSheet(kind, room, event);
    }
  }

  /** The popup "Venku": what the tile says, row by row, with the humidity also as grams of water in the air. */
  private renderOutsideBody(): TemplateResult {
    const { t, whole } = this._i18n;
    const facts = this.outsideFacts() ?? {};
    const absolute = facts.temperature !== undefined && facts.humidity !== undefined ? absoluteHumidity(facts.temperature, facts.humidity) : undefined;
    const rows: Array<[string, string | TemplateResult]> = [];
    if (facts.temperature !== undefined) rows.push([t.outside.temperature, `${this._i18n.one(facts.temperature)}${NBSP}°C`]);
    if (facts.condition !== undefined) rows.push([t.outside.weather, facts.condition]);
    if (facts.range !== undefined) rows.push([t.outside.today, facts.range]);
    if (facts.rain !== undefined) rows.push([t.outside.rain, this._i18n.percent(whole(facts.rain))]);
    if (facts.humidity !== undefined) {
      rows.push([t.outside.humidity, joined([this._i18n.percent(whole(facts.humidity)), ...(absolute === undefined ? [] : [`${this._i18n.one(absolute)}${NBSP}g/m³`])])]);
    }
    if (facts.air !== undefined) rows.push([t.outside.air, html`<span style=${`color: ${facts.air.color}`}>${facts.air.label}</span>`]);
    return html`<div class="static-list outside-list" role="group" aria-label=${t.outside.title}>
      ${rows.map(([label, value]) => html`<div class="static-row"><span class="option-text"><span>${label}</span></span><span class="list-value">${value}</span></div>`)}
    </div>`;
  }

  /** House summary chips: only what differs from a quiet house (CURRENT_SPEC.md, Dashboard Domov). */
  private renderSummary(chips: SummaryChip[]): TemplateResult | typeof nothing {
    if (chips.length === 0) {
      return nothing;
    }
    return html`<ul class="summary" aria-label=${this._i18n.t.summary}>
      ${chips.map((chip) => {
        const icon = this.summaryIcon(chip);
        const opens = chip.opens;
        if (opens && opens.rooms.length > 0) {
          // The chip sets exactly the rooms it names (CURRENT_SPEC.md, Hromadné nastavení).
          return html`<li class="chip" style=${`--chip-color: ${chip.color}`}>
            <button
              type="button"
              class="plain-button chip-open"
              title=${chip.spoken}
              aria-label=${`${chip.text}. ${chip.spoken}`}
              aria-haspopup="dialog"
              @click=${(event: Event) => this.openGroupSheet(opens.system, opens.rooms, event)}
            >
              <span class="chip-icon" aria-hidden="true">${icon}</span>${chip.text}
            </button>
          </li>`;
        }
        return html`<li class="chip" style=${`--chip-color: ${chip.color}`} title=${chip.spoken} aria-label=${chip.spoken}>
          <span class="chip-icon" aria-hidden="true">${icon}</span>${chip.text}
        </li>`;
      })}
    </ul>`;
  }

  /** The icon of a summary chip (window, air conditioner, heating option or waves). */
  private summaryIcon(chip: SummaryChip): TemplateResult {
    if (chip.kind === "windows" || chip.kind === "conflict-window") {
      return renderWindowIcon(chip.color, false);
    }
    if (chip.kind === "climate" || chip.kind === "conflict-cooling") {
      return renderClimateIcon("cool", chip.color, false);
    }
    if (chip.kind === "manual" || chip.kind === "boost") {
      return renderHeatingOptionIcon(chip.kind === "boost" ? "boost" : "heat");
    }
    return renderHeatingWaves(chip.waves ?? 3, false);
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
    // The measurement that decided the status is drawn in the status colour (CURRENT_SPEC.md,
    // Stavový systém); the other values stay neutral.
    const causeColour = (cause: "temperature" | "humidity") =>
      status.cause === cause ? `color: ${status.color}` : nothing;
    const conflicts = roomConflicts(room, (entityId) => this.getState(entityId), status.id === "cold", this._i18n);

    return html`
      <div class="room-cell"><article
        class="room ${!room.cover && !room.hasCo2 && !room.hasPm25 ? "compact" : ""}"
        aria-label=${this.roomLabel(room)}
      >
        <div class="room-head">
        <div class="room-id">
        ${this.renderTitle(room, index)}
        <div class="status-line">
          <span
            class="status-dot"
            style=${status.kind === "unknown"
              ? `border: 1.5px solid ${COLORS.off}`
              : `background: ${status.color}`}
          ></span>
          <span style=${`color: ${status.color}; font-weight: ${status.kind === "normal" ? 400 : 500}`}>
            ${joinedText(status.label)}
          </span>
        </div>
        </div>
        <div class="measurements">
          <button
            type="button"
            class="plain-button temperature ${temperature.stale ? "stale" : ""}"
            style=${causeColour("temperature")}
            ?disabled=${!room.temperature}
            title=${this.staleTitle(temperature) ?? nothing}
            aria-label=${t.temperatureLabel(
              this.roomLabel(room),
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
              this.roomLabel(room),
              humidity.value === undefined ? undefined : this._i18n.percent(Math.round(humidity.value)),
              this.staleSpoken(humidity),
            )}
            aria-haspopup="dialog"
            @click=${(event: Event) => this.openSheet("history", room, event)}
          >
            ${humidity.value === undefined
              ? html`<span class="missing">––</span>`
              : html`${this._i18n.percent(Math.round(humidity.value))}${this.staleMark(humidity)}`}
          </button>
        </div>
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

  /** Room name; with `link` a button that opens the page or address (CURRENT_SPEC.md, Room Card). */
  private renderTitle(room: Room, index: number): TemplateResult {
    // The name opens the room detail (uživatel 14. 11. 2026: „Q234 A“); a `link` of the room is a row of that detail.
    const descriptionId = `detail-description-${index}`;
    return html`
      <button
        type="button"
        class="plain-button room-title room-link"
        aria-haspopup="dialog"
        aria-describedby=${descriptionId}
        @click=${(event: Event) => this.openSheet("history", room, event)}
      >
        <span class="room-name">${this.roomLabel(room)}</span><span class="room-chevron" aria-hidden="true">›</span>
      </button>
      <span class="sr-only" id=${descriptionId}>${this._i18n.t.sheet.openDetail}</span>
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

  /** Colour of a CO₂ / PM2.5 number: white, orange from the warning limit, red from the critical one; grey without a fresh value. */
  private airColor(reading: Reading, warning: number, critical: number): string {
    if (reading.value === undefined || reading.stale) {
      return COLORS.label;
    }
    return reading.value >= critical ? COLORS.alert : reading.value >= warning ? COLORS.warning : COLORS.white;
  }

  /**
   * CO₂ and PM2.5 are one touch target over both rows (52 px). It opens the room history with the CO₂ curve
   * and PM2.5 as the weaker dashed line (without a CO₂ sensor the PM2.5 curve is the main one). A sensor the room
   * does not have (`carbon_dioxide: false`) has no row; without both the place stays empty, so the rows below
   * keep their position (CURRENT_SPEC.md, Room Card).
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
    const descriptionId = `air-description-${index}`;

    // Like the HVAC button: the accessible name is the visible text (WCAG 2.5.3 Label in Name);
    // the room, the quantity names, the trend and the action are the description.
    return html`
      <button
        type="button"
        class="plain-button air-block"
        ?disabled=${!room.carbon_dioxide && !room.pm25}
        aria-haspopup="dialog"
        aria-describedby=${descriptionId}
        @click=${(event: Event) => this.openSheet("history", room, event, "air")}
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
      <span class="sr-only" id=${descriptionId}>${t.airDescription(this.roomLabel(room), description, this.historyPeriod())}</span>
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
          this.roomLabel(room),
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
    const target = this.hvacTarget(room, order, { heating: !heating.unknown && heating.waves > 0, climate: climate.active });
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
      <span class="sr-only" id=${descriptionId}>${t.hvacDescription(this.roomLabel(room), spoken, target)}</span>
    `;
  }

  /** The system the HVAC popup opens: the primary one, or the other when only that is configured. */
  /** The system a tap on the HVAC lines opens: the one that runs (a ventilation started on the air conditioner in winter opens Klimatizace), otherwise the first by the house mode. */
  private hvacTarget(room: Room, order: Array<"heating" | "climate">, active?: { heating: boolean; climate: boolean }): "heating" | "climate" | undefined {
    const configured = (kind: "heating" | "climate") =>
      kind === "heating" ? Boolean(room.heating?.climate) : Boolean(room.air_conditioner);
    const running = order.filter((kind) => configured(kind) && active?.[kind]);
    return running.length === 1 ? running[0] : order.find(configured);
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

  /** One window: open / closed / unknown and, when open, for how many minutes (since the recorder shows it open; a restart does not count). */
  private windowState(entityId: EntityId, now: number): { state: "open" | "closed" | "unknown"; minutesOpen?: number } {
    const entity = this.getState(entityId);
    const state = entity?.state.toLowerCase();
    if (state === undefined || isUnavailable(state)) {
      return { state: "unknown" };
    }
    if (state !== "on") {
      return { state: "closed" };
    }
    const changed = this._starts.of(this.hass, entityId);
    return { state: "open", minutesOpen: changed === undefined ? undefined : Math.max(0, (now - changed) / 60_000) };
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
        aria-haspopup="dialog"
        aria-describedby=${descriptionId}
        @click=${(event: Event) => this.openSheet("history", room, event, "windows")}
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
      <span class="sr-only" id=${descriptionId}>${t.window.description(this.roomLabel(room), spoken, conflict, multiple)}</span>
    `;
  }

  /** Name of a window in the "Okna" popup: from the YAML, otherwise "Okno 1", "Window 1", … */
  private windowName(room: Room, window: WindowConfig): string {
    const named = pickText(window.name, this._i18n.language);
    if (named !== undefined) return named;
    // The only window of a room needs no number: "Okno", not "Okno 1".
    const numbered = this._i18n.t.window.defaultName(room.windows.indexOf(window) + 1);
    return room.windows.length === 1 ? numbered.replace(/\s*1$/, "") : numbered;
  }

  /** The rows of the room detail under its charts: Topení, Klimatizace, every window, the blind and the link of the room. */
  private renderDetailRows(room: Room, now: number): TemplateResult {
    const { t } = this._i18n;
    const heating = room.heating?.climate ? roomHeating(room, (entityId) => this.getState(entityId), this._i18n) : undefined;
    const climate = room.air_conditioner ? climateView(this.getState(room.air_conditioner), this._i18n) : undefined;
    const systemRow = (kind: "heating" | "climate", icon: TemplateResult, view: SystemView) => html`<button
      type="button"
      class="plain-button option list-option detail-row"
      data-system=${kind}
      @click=${() => this.openSystemFromDetail(kind, room)}
    >
      <span class="option-icon" aria-hidden="true">${icon}</span>
      <span class="option-text">
        <span>${t.system[kind]}</span>
        <span class="option-hint detail-state" style=${`color: ${view.active ? view.color : "var(--kd-label)"}`}
          >${view.unknown ? html`<span aria-hidden="true">––</span><span class="sr-only">${t.unknownValue}</span>` : joined([view.label, ...(view.extra ? [view.extra.replace(/^·\s*/, "")] : [])])}</span
        >
      </span>
      <span class="list-chevron" aria-hidden="true">›</span>
    </button>`;
    const link = room.link;
    return html`
      <div class="options list-options detail-list">
        ${heating ? systemRow("heating", renderHeatingWaves(heating.unknown ? 0 : heating.waves, heating.unknown), heating) : nothing}
        ${climate ? systemRow("climate", renderClimateIcon(climate.mode, climate.color, climate.unknown), climate) : nothing}
        ${room.windows.map((window, index) => {
          const { state, minutesOpen } = this.windowState(window.entity, now);
          const unknown = state === "unknown";
          const color = state === "open" ? COLORS.sky : COLORS.label;
          return html`<div class="option list-option window-option" data-part=${index === 0 ? "windows" : nothing}>
            <span class="option-icon" aria-hidden="true">${renderWindowIcon(unknown ? COLORS.off : color, unknown)}</span>
            <span class="option-text">
              <span>${this.windowName(room, window)}</span>
              <span class="option-hint window-state" style=${`color: ${color}`}>
                ${unknown
                  ? html`<span aria-hidden="true">––</span><span class="sr-only">${t.unknownValue}</span>`
                  : joined([state === "open" ? t.window.open : t.window.closed, ...(minutesOpen === undefined ? [] : [formatDuration(minutesOpen)])])}
              </span>
            </span>
          </div>`;
        })}
        ${room.cover ? this.renderDetailCover(room, room.cover) : nothing}
        ${link
          ? html`<button type="button" class="plain-button option list-option detail-row" data-part="link" @click=${() => {
              // The link leaves the card: the sheet closes first.
              this.closeSheet(false);
              this.openLink(link);
            }}>
              <span class="option-text"><span>${link.startsWith("/") ? t.sheet.linkPage : t.sheet.linkWeb}</span></span>
              <span class="list-chevron" aria-hidden="true">›</span>
            </button>`
          : nothing}
      </div>
    `;
  }

  /** The blind in the room detail: its state in words, the presets on one tap and the sliders of the position and of the slats. */
  private renderDetailCover(room: Room, entityId: EntityId): TemplateResult {
    const { t } = this._i18n;
    const entity = this.getState(entityId);
    const state = entity?.state.toLowerCase();
    const available = state !== undefined && !isUnavailable(state);
    const target = this._moving[room.name] === CUSTOM_PRESET ? this._coverTarget[room.name] : undefined;
    const position = target?.position ?? (available ? numberAttribute(entity?.attributes.current_position) : undefined);
    const tilt = target?.tilt ?? (available ? numberAttribute(entity?.attributes.current_tilt_position) : undefined);
    const known = position !== undefined && tilt !== undefined;
    const pendingId = this._moving[room.name];
    const active = room.presets.find((preset) => (pendingId !== undefined ? preset.id === pendingId : blindMatchesPreset(position, tilt, preset, this.tolerance())));
    const text = !available ? t.cover.unavailable : active ? presetName(active, t, this._i18n.language) : known ? t.sheet.coverCustom : t.cover.unknown;
    const slider = (kind: "position" | "tilt", value: number | undefined) => html`<div class="detail-slider">
      <div class="detail-slider-head"><span>${kind === "position" ? t.sheet.coverPosition : t.sheet.coverTilt}</span><span class="detail-slider-value">${value === undefined ? "––" : this._i18n.percent(Math.round(value))}</span></div>
      <kd-slider
        data-cover=${kind}
        .min=${0}
        .max=${100}
        .step=${5}
        .tickStep=${25}
        .value=${Math.round((value ?? 0) / 5) * 5}
        .label=${`${t.sheet.cover}: ${kind === "position" ? t.sheet.coverPosition : t.sheet.coverTilt}`}
        .valueText=${value === undefined ? "" : this._i18n.percent(Math.round(value))}
        .minLabel=${kind === "position" ? t.sheet.coverDown : t.sheet.coverShut}
        .maxLabel=${kind === "position" ? t.sheet.coverUp : t.sheet.coverOpened}
        .disabled=${!known}
        @hdk-input=${(event: Event) => event.stopPropagation()}
        @hdk-change=${(event: CustomEvent<{ value: number }>) => {
          event.stopPropagation();
          if (!known) return;
          void this.moveCover(room, kind === "position" ? event.detail.value : Math.round(position), kind === "tilt" ? event.detail.value : Math.round(tilt));
        }}
      ></kd-slider>
    </div>`;
    return html`<div class="option list-option detail-cover" data-part="cover">
      <div class="detail-cover-head">
        <span class="option-icon" aria-hidden="true">${renderPresetIcon(active?.icon ?? "shade")}</span>
        <span class="option-text">
          <span>${t.sheet.cover}</span>
          <span class="option-hint detail-state">${known && !active ? joined([text, t.cover.position(Math.round(position), Math.round(tilt))]) : text}</span>
        </span>
      </div>
      ${room.presets.length > 0
        ? html`<kd-segmented
            class="detail-presets"
            .label=${t.sheet.coverPreset}
            .options=${room.presets.map((preset) => ({ value: preset.id, label: presetName(preset, t, this._i18n.language) }))}
            .value=${active?.id ?? ""}
            .disabled=${!available}
            .pending=${pendingId !== undefined && pendingId !== CUSTOM_PRESET}
            @hdk-select=${(event: CustomEvent<{ value: string }>) => {
              event.stopPropagation();
              const preset = room.presets.find((item) => item.id === event.detail.value);
              if (preset) void this.applyPreset(room, preset);
            }}
          ></kd-segmented>`
        : nothing}
      ${slider("position", position)} ${slider("tilt", tilt)}
    </div>`;
  }

  /** A position and tilt from the sliders of the detail go through the same script as the presets. */
  private async moveCover(room: Room, position: number, tilt: number): Promise<void> {
    if (!room.cover) return;
    this._coverTarget = { ...this._coverTarget, [room.name]: { position, tilt } };
    await this.applyPreset(room, { id: CUSTOM_PRESET, icon: "shade", position, tilt });
  }

  // ------------------------------------------------------------ ventilation

  /** The ventilation mode: "on" or "off"; unknown, unavailable or unconfigured is undefined (no chip). */
  private ventilationState(): "on" | "off" | undefined {
    const state = this.entityState(this._config?.ventilationEntity)?.toLowerCase();
    return state === "on" || state === "off" ? state : undefined;
  }

  private ventilationOn(): boolean {
    return this.ventilationState() === "on";
  }

  /** The rooms of the mode: those with a blind, a window and a CO₂ sensor (Obývák with the garden door is not one). */
  private ventilationRooms(): Room[] {
    return (this._config?.rooms ?? []).filter((room) => room.cover && room.windows.length > 0 && room.carbon_dioxide);
  }

  /** The popup of the ventilation mode (it has no room; the first one stands in). */
  private openVentilationSheet(event: Event): void {
    const room = this._config?.rooms[0];
    if (!room) {
      return;
    }
    this._ventilationEnding = false;
    this._announcement = "";
    this.openSheet("ventilation", room, event);
    void this.loadVentilation();
  }

  /**
   * The last run of the mode and, per room, the CO₂ at its start and end and whether a window was
   * open during it: from the history of Home Assistant (the mode over a week, then the CO₂ and the
   * windows over that run). Nothing is stored.
   */
  private async loadVentilation(): Promise<void> {
    const hass = this.hass;
    const modeId = this._config?.ventilationEntity;
    if (!hass || !modeId) {
      return;
    }
    const request = ++this._ventRequest;
    const now = Date.now();
    try {
      const modeHistory = await fetchHistory(hass, [modeId], now - 7 * 24 * HOUR_MS, now);
      const session = lastSession(modeHistory[modeId]);
      if (request !== this._ventRequest) {
        return;
      }
      if (!session) {
        this._vent = { rooms: [] };
        return;
      }
      const rooms = this.ventilationRooms();
      const to = session.end ?? now;
      const ids = rooms.flatMap((room) => [
        room.carbon_dioxide,
        room.temperature,
        room.humidity,
        ...room.windows.map((window) => window.entity),
      ]);
      // The absolute humidity "settles" this long after the end of the run; the history reaches there (or to now).
      const settleMs = (this._config?.ventilationSettleMinutes ?? 25) * 60_000;
      const settledAt = session.end === undefined ? undefined : session.end + settleMs;
      const history = await fetchHistory(
        hass,
        ids.filter((id): id is string => id !== undefined),
        session.start - 30 * 60_000,
        settledAt === undefined ? to : Math.min(now, Math.max(to, settledAt)),
      );
      if (request !== this._ventRequest) {
        return;
      }
      // A quantity at the start, at the end and (once the settling time has passed) that long after the end.
      const settledTime = settledAt !== undefined && settledAt <= now ? settledAt : undefined;
      const triple = (read: (time: number) => number | undefined): VentilationTriple => ({
        before: read(session.start),
        after: session.end === undefined ? undefined : read(session.end),
        settled: settledTime === undefined ? undefined : read(settledTime),
      });
      const recorded = (entityId: string | undefined) => (time: number) =>
        entityId === undefined ? undefined : co2Value(stateAt(history[entityId], time));
      this._vent = {
        session,
        rooms: rooms.map((room) => {
          const co2 = room.carbon_dioxide === undefined ? undefined : triple(recorded(room.carbon_dioxide));
          return {
            name: room.name,
            opened: room.windows.some((window) => openDuring(history[window.entity], session.start, to)),
            start: co2?.before,
            end: co2Value(stateAt(history[room.carbon_dioxide ?? ""], to)),
            co2,
            temperature: room.temperature === undefined ? undefined : triple(recorded(room.temperature)),
            // Absolute humidity (g/m³) from the recorded temperature and relative humidity of the room.
            humidity:
              room.temperature === undefined || room.humidity === undefined
                ? undefined
                : triple((time) => absoluteHumidity(recorded(room.temperature)(time), recorded(room.humidity)(time))),
          };
        }),
      };
    } catch (error) {
      console.error("Klima Dashboard: the ventilation history could not be loaded", error);
      if (request === this._ventRequest) {
        this._vent = { rooms: [], failed: true };
      }
    }
  }

  /**
   * The ventilation popup (CURRENT_SPEC.md, Větrací režim). While the mode runs: how long it has
   * run, the latest end, the rooms with an open window (CO₂ from the start to now and how far to
   * the goal), whether the windows can be closed and an estimate of the minutes left. After it
   * ended: the last run (start–end) with the rooms whose window was open. Nothing is stored; the
   * start values come from the history.
   */
  private renderVentilationBody(now: number): TemplateResult {
    const { t } = this._i18n;
    const text = t.ventilation;
    const config = this._config;
    const running = this.ventilationOn();
    const target = config?.ventilationCo2Target ?? 500;
    const full = config?.ventilationCo2Full ?? 420;
    const data = this._vent;
    const session = data?.session;
    const unknown = html`<span class="no-data" aria-hidden="true">––</span><span class="sr-only">${t.unknownValue}</span>`;
    const error = this._sheetError;

    const timerId = config?.ventilationTimerEntity;
    const timer = this.getState(timerId);
    const finishes =
      timer?.state.toLowerCase() === "active" ? Date.parse(String(timer.attributes.finishes_at ?? "")) : Number.NaN;
    const ends = Number.isNaN(finishes) || finishes <= now ? undefined : finishes;
    const started = this._starts.of(this.hass, config?.ventilationEntity);
    const minutes = started === undefined ? undefined : Math.max(0, (now - started) / 60_000);

    // The rooms of the table: those whose window is open now or was open during this run (a room whose window was closed
    // while the mode runs stays, with a grey ring); running = CO₂ now, ended = CO₂ at the end.
    const rooms = this.ventilationRooms().flatMap((room) => {
      const saved = data?.rooms.find((item) => item.name === room.name);
      const open = openWindows(room, (id) => this.getState(id)).length > 0;
      if (!open && !saved?.opened) {
        return [];
      }
      const entity = this.getState(room.carbon_dioxide);
      const live = running ? co2Value(entity?.state) : saved?.end;
      const startValue = saved?.start;
      const steps = startValue !== undefined && live !== undefined ? progress(startValue, live, target, full) : undefined;
      return [{ room, startValue, live, steps, open }];
    });

    // The columns: before, then now (while the mode runs); after the end before, after and now, or "+N min" once N minutes have passed.
    const settleMinutes = config?.ventilationSettleMinutes ?? 25;
    const settled = session?.end !== undefined && now >= session.end + settleMinutes * 60_000;
    const columns = running ? [text.before, t.chart.now] : [text.before, text.after, settled ? text.settledShort(settleMinutes) : t.chart.now];
    const spokenColumns = running ? columns : [text.before, text.after, settled ? text.settledAfter(settleMinutes) : t.chart.now];

    // One block per room: its name, CO₂, temperature and absolute humidity as lines and, while the mode runs, the progress ring
    // in the place of the third column (green at or below the target, orange before it, grey when the window of the room is closed).
    const roomBlock = (item: (typeof rooms)[number]) => {
      const saved = data?.rooms.find((entry) => entry.name === item.room.name);
      const done = item.steps === undefined ? undefined : Math.min(100, Math.floor(item.steps.done * 100));
      const lines = [
        { label: text.quantity.co2, entity: item.room.carbon_dioxide, triple: saved?.co2, live: co2Value(this.getState(item.room.carbon_dioxide)?.state), digits: false },
        { label: text.quantity.temperature, entity: item.room.temperature, triple: saved?.temperature, live: numberOf(this.getState(item.room.temperature)?.state), digits: true },
        {
          label: text.quantity.humidity,
          entity: item.room.temperature !== undefined && item.room.humidity !== undefined ? item.room.humidity : undefined,
          triple: saved?.humidity,
          live: absoluteHumidity(numberOf(this.getState(item.room.temperature)?.state), numberOf(this.getState(item.room.humidity)?.state)),
          digits: true,
        },
      ]
        .filter((line) => line.entity)
        .map((line) => {
          const values = running
            ? [line.triple?.before, line.live]
            : [line.triple?.before, line.triple?.after, settled ? line.triple?.settled : line.live];
          return {
            label: line.label,
            shown: values.map((value) => (value === undefined ? undefined : line.digits ? this._i18n.one(value) : this._i18n.whole(value))),
          };
        });
      const closable = item.steps?.closable === true;
      const spoken = [
        running && done !== undefined ? `${text.done} ${this._i18n.percent(done)}${closable ? `, ${text.closable}` : ""}` : undefined,
        ...lines.map((line) => text.lineSpoken(line.label, line.shown.map((value, index) => `${spokenColumns[index]} ${value ?? t.unknownValue}`).join(", "))),
      ]
        .filter((part) => part !== undefined)
        .join(". ");
      const ringColor = !item.open ? COLORS.label : closable ? COLORS.fresh : COLORS.warning;
      return html`<div class="vent-room ${running ? "with-ring" : ""}" role="group" aria-label=${text.roomSpoken(this.roomLabel(item.room), spoken)}>
        <div class="vent-room-main" aria-hidden="true">
          <div class="vent-room-head">
            ${this.roomLabel(item.room)}${running && !item.open ? html`<span class="vent-note">${text.windowClosed}</span>` : nothing}
          </div>
          ${lines.map(
            (line) => html`<div class="vent-line">
              <span class="vent-q">${line.label}</span>
              ${line.shown.map((value) => html`<span class="vent-num">${value ?? html`<span class="no-data">––</span>`}</span>`)}
            </div>`,
          )}
        </div>
        ${running
          ? html`<kd-ring
              aria-hidden="true"
              fraction=${(done ?? 0) / 100}
              size="40"
              stroke="6"
              num=${done === undefined ? "––" : String(done)}
              style=${`--hdk-ring-fill: ${done === undefined ? COLORS.label : ringColor}; grid-row: 2 / span ${lines.length}`}
            ></kd-ring>`
          : nothing}
      </div>`;
    };
    const table =
      rooms.length === 0
        ? nothing
        : html`<div class="vent-table" role="group" aria-label=${text.title}>
            <div class="vent-head" aria-hidden="true">
              <span class="vent-q"></span>
              ${columns.map((label) => html`<span class="vent-num">${label}</span>`)}
              ${running ? html`<span class="vent-num ring-head">↓ ${this._i18n.whole(full)}<span class="ring-unit"> ppm</span></span>` : nothing}
            </div>
            ${rooms.map(roomBlock)}
          </div>`;

    let summary: TemplateResult | typeof nothing = nothing;
    if (running) {
      summary = html`
        <div class="static-row vent-summary">
          <span class="option-text">
            <span>
              ${text.running}
              ${minutes === undefined
                ? unknown
                : html`<span aria-hidden="true">${formatDuration(minutes)}</span
                    ><span class="sr-only">${spokenDuration(minutes, t)}</span>`}
            </span>
          </span>
          ${timerId === undefined
            ? nothing
            : html`<span class="list-value vent-ends">${text.endsBy} ${ends === undefined ? unknown : this._i18n.time(ends)}</span>`}
        </div>`;
    } else if (session) {
      summary = html`
        <div class="static-row vent-summary">
          <span class="option-text"><span>${text.last}</span></span>
          <span class="list-value">${new Date(session.start).toDateString() === new Date(now).toDateString() ? nothing : `${this._i18n.day(session.start)} `}${this._i18n.time(session.start)}${session.end === undefined ? nothing : html`–${this._i18n.time(session.end)}`}</span>
        </div>`;
    }
    return html`
      ${!running && !session
        ? nothing
        : html`<div class="static-list" role="group" aria-label=${text.title}>${summary}${table}</div>`}
      ${!running && !session && data !== undefined ? html`<p class="timer-foot">${text.never}</p>` : nothing}
      ${running
        ? html`<button
              type="button"
              class="plain-button vent-end ${error ? "error" : ""}"
              ?disabled=${this._ventilationEnding}
              aria-busy=${this._ventilationEnding ? "true" : "false"}
              @click=${() => void this.switchVentilation("turn_off")}
            >
              ${error ?? (this._ventilationEnding ? text.ending : text.end)}
            </button>
            ${error ? html`<span class="sr-only" role="alert">${error}</span>` : nothing}`
        : data === undefined
          ? nothing
          : html`<button
                type="button"
                class="plain-button vent-end vent-start ${error ? "error" : ""}"
                ?disabled=${this._ventilationEnding}
                aria-busy=${this._ventilationEnding ? "true" : "false"}
                @click=${() => void this.switchVentilation("turn_on")}
              >
                ${error ?? (this._ventilationEnding ? text.starting : text.start)}
              </button>
              ${error ? html`<span class="sr-only" role="alert">${error}</span>` : nothing}`}
    `;
  }

  /** "Ukončit": turns the mode off; Home Assistant switches the fans off and returns the slats (kit, Home Assistant: větrací režim). */
  /** Starts the mode (uživatel 14. 11. 2026: „Q232 A“) or ends it; the popup stays and shows the new state once Home Assistant reports it. */
  private async switchVentilation(service: "turn_on" | "turn_off"): Promise<void> {
    const entityId = this._config?.ventilationEntity;
    if (!entityId || !this.hass || this._ventilationEnding) {
      return;
    }
    this._ventilationEnding = true;
    this._sheetError = undefined;
    try {
      await this.hass.callService(entityId.split(".")[0], service, { entity_id: entityId });
      this.haptic("success");
      // The popup closes when the mode reports off; if it never does, the button works again.
      window.clearTimeout(this._endTimer);
      this._endTimer = window.setTimeout(() => {
        this._ventilationEnding = false;
      }, 10_000);
    } catch (error) {
      console.error("Klima Dashboard: switching the ventilation mode failed", error);
      this._sheetError = this._i18n.t.sheet.commandFailed;
      this._ventilationEnding = false;
      this.haptic("failure");
    }
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
        aria-label=${t.cover.label(this.roomLabel(room), description, moving)}
        aria-haspopup="dialog"
        @click=${(event: Event) => this.openSheet("history", room, event, "cover")}
      >
        <svg
          viewBox="0 0 ${BLIND_WIDTH} ${BLIND_HEIGHT}"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          ${renderBlindShape(position, tilt)}
        </svg>
      </button>
      <div class="presets" role="group" aria-label=${t.cover.presets(this.roomLabel(room))}>
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
    const name = presetName(preset, t, this._i18n.language);
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
          ? `${t.cover.preset(this.roomLabel(room), name, presetDescription(preset, t, this._i18n.language), available)} ${this._hint.text} ${this._hint.spoken}`
          : t.cover.preset(this.roomLabel(room), name, presetDescription(preset, t, this._i18n.language), available)}
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
    this._gesture.start(() => {
      window.clearTimeout(this._hintTimer);
      this._hint = undefined;
      void this.applyPreset(room, preset);
    });
  }

  private pressEnd(room: Room, preset: BlindPreset, available: boolean): void {
    const key = `${room.name}|${preset.id}`;
    if (!available) {
      this.showUnavailable(key);
      return;
    }
    const tap = this._gesture.tap(key, performance.now());
    if (tap === "none") {
      return;
    }
    window.clearTimeout(this._hintTimer);
    if (tap === "double") {
      this._hint = undefined;
      void this.applyPreset(room, preset);
      return;
    }
    // A single tap: when no second tap follows, explain how to send the preset.
    this._hintTimer = window.setTimeout(() => {
      if (this._gesture.pending(key)) {
        this._gesture.forget();
        this.showHint(key, this._i18n.t.cover.hint, "selection");
      }
    }, DOUBLE_TAP_MS);
  }

  private pressCancel(): void {
    this._gesture.cancel();
  }

  private showUnavailable(key: string): void {
    this._gesture.forget();
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
      // The error appears at the button that was pressed, not far above the cards.
      const { cover } = this._i18n.t;
      this.showHint(`${room.name}|${preset.id}`, cover.failedHint, "failure", { spoken: cover.failed(this.roomLabel(room)) });
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

  private renderSheet(isSummer: boolean, modeKnown: boolean, now: number): TemplateResult | typeof nothing {
    const sheet = this._sheet;
    if (!sheet) {
      return nothing;
    }
    const { t } = this._i18n;
    if (sheet.kind === "history") {
      // The room detail: the name of the room and its state, as in the header of its card.
      return this.renderSheetFrame(
        this.roomLabel(sheet.room),
        this.roomStatusLabel(sheet.room, isSummer, modeKnown, now),
        this.renderRoomDetail(sheet.room, isSummer, now),
        "history-sheet",
      );
    }
    if (sheet.kind === "ventilation") {
      return this.renderSheetFrame(t.ventilation.title, undefined, this.renderVentilationBody(Date.now()));
    }
    if (sheet.kind === "outside") {
      return this.renderSheetFrame(t.outside.title, undefined, this.renderOutsideBody());
    }
    const { title, sub } = this.hvacTitle(sheet.kind);
    return this.renderSheetFrame(title, sub, this.renderHvacBody(sheet.room, sheet.kind, isSummer));
  }

  /** The state of a room in words, as its card says it ("Příjemné", "Vydýchaný vzduch"). */
  private roomStatusLabel(room: Room, isSummer: boolean, modeKnown: boolean, now: number): string {
    const stale = room.thresholds.stale_minutes;
    return getRoomStatus(
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
    ).label;
  }

  /**
   * The room detail (CURRENT_SPEC.md, Sjednocení s Energií a Domem, Detail místnosti): the switch of the period, the chart
   * of the temperature with the humidity and the chart of CO₂ with PM2.5 under each other with one pointer of time, and
   * under them the heating, the air conditioner, the windows and the blind of the room.
   */
  private renderRoomDetail(room: Room, isSummer: boolean, now: number): TemplateResult {
    const { t } = this._i18n;
    const base = this._config?.history.hours ?? 24;
    const air: HistoryMetric | undefined = room.hasCo2 ? "co2" : room.hasPm25 ? "pm25" : undefined;
    const period =
      base === WEEK_HOURS
        ? nothing
        : html`<kd-segmented
            class="detail-period"
            .label=${t.sheet.period}
            .options=${[
              { value: String(base), label: t.sheet.hoursShort(base) },
              { value: String(WEEK_HOURS), label: t.sheet.week },
            ]}
            .value=${String(this._historyHours)}
            @hdk-select=${(event: CustomEvent<{ value: string }>) => {
              event.stopPropagation();
              this._historyHours = Number(event.detail.value);
              this._scrubTime = undefined;
              void this.loadRoomHistory(room);
            }}
          ></kd-segmented>`;
    // Loading, an error and a history without any data are said once for both charts, in the place of both.
    const model = this._historyModel;
    const ready = this._historyStatus === "ready" && model !== undefined;
    const empty = ready && !hasChartData(model, "temperature") && (!air || !hasChartData(model, air));
    const charts =
      !ready || empty
        ? html`<section class="detail-chart ${air ? "double" : ""}" data-part="temperature">${this.renderHistoryBody(room, "temperature", isSummer)}</section>`
        : html`<section class="detail-chart" data-part="temperature">${this.renderHistoryBody(room, "temperature", isSummer)}</section>
            ${air ? html`<section class="detail-chart" data-part="air">${this.renderHistoryBody(room, air, isSummer)}</section>` : nothing}`;
    return html`
      ${period} ${charts}
      ${this.renderDetailRows(room, now)}
    `;
  }

  /** From the room detail to the popup Topení / Klimatizace of that room (the sheet stays, its content changes). */
  private openSystemFromDetail(kind: "heating" | "climate", room: Room): void {
    this._historyRequest += 1;
    this._scrubTime = undefined;
    this._sheetError = undefined;
    this._sheet = { kind, room };
    this._hvacSelected = this.hvacSelection(kind);
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
    // The sheet from the bottom of the kit (one look in every card, uživatel 13. 11. 2026: „Preved vsechno na novy vzhled“).
    return html`<kd-sheet
      open
      .heading=${title}
      .sub=${sub ?? ""}
      .closeLabel=${this._i18n.t.sheet.close}
      ?wide=${extraClass === "history-sheet"}
      @hdk-close=${() => this.closeSheet()}
      ><div class="sheet ${extraClass}">${body}</div></kd-sheet
    >`;
  }

  /** Title of the Topení / Klimatizace popup: the system, or both when the switch under it chooses one. */
  private hvacTitle(kind: "heating" | "climate"): { title: string; sub?: string } {
    const rooms = this.sheetRooms();
    const both = rooms.some((room) => room.heating?.climate) && rooms.some((room) => room.air_conditioner);
    return { title: both ? this._i18n.t.sheet.hvac : this._i18n.t.system[kind] };
  }


  /** Topení / Klimatizace controls: the segmented switch on top, then the panel of the chosen system. */
  private renderHvacBody(_room: Room, kind: "heating" | "climate", isSummer: boolean): TemplateResult {
    const rooms = this.sheetRooms();
    const heatRooms = rooms.filter((room) => room.heating?.climate);
    const acRooms = rooms.filter((room) => room.air_conditioner);
    const order: Array<"heating" | "climate"> = isSummer ? ["climate", "heating"] : ["heating", "climate"];
    const both = heatRooms.length > 0 && acRooms.length > 0;
    const { t } = this._i18n;
    const system = kind === "heating" ? "heating" : "cooling";
    const all = (this._config?.rooms ?? []).filter((room) => this.hvacEntity(room, kind));
    // The shared popup of the kit (CURRENT_SPEC.md of the kit, Popup Topení / Klimatizace; uživatel 13. 11. 2026: „Q203 B ale všude“).
    const panel = html`<kd-climate
      .hass=${this.hass}
      .i18n=${this._i18n}
      .texts=${t.climatePopup}
      .system=${system}
      .rooms=${all.map((room) => ({ name: this.roomLabel(room), entity: this.hvacEntity(room, kind)! }))}
      .selected=${this._hvacSelected}
      .delayMs=${(this._config?.sendDelaySeconds ?? 2) * 1000}
      @hdk-select-rooms=${(event: CustomEvent<{ selected: EntityId[] }>) => (this._hvacSelected = event.detail.selected)}
      @hdk-error=${(event: CustomEvent<{ message: string }>) => (this._sheetError = event.detail.message)}
      @hdk-more-info=${async (event: CustomEvent<{ entityId: EntityId }>) => {
        // "Detail a historie" is the room detail of the card, not a dialog of Home Assistant.
        await this.flushClimate();
        const room = all.find((item) => this.hvacEntity(item, kind) === event.detail.entityId);
        if (!room) return;
        this._sheet = { kind: "history", room, focus: "temperature" };
        this._scrubTime = undefined;
        this._historyHours = this._config?.history.hours ?? 24;
        void this.loadRoomHistory(room);
      }}
    ></kd-climate>`;

    // ARIA tabs: arrows / Home / End switch the system, only the selected tab is in the Tab order.
    const switcher = both
      ? html`<div
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
        </div>`
      : nothing;
    return html`${switcher}
      <div class="hvac-panel" role=${both ? "tabpanel" : nothing} id="hvac-panel" aria-labelledby=${both ? `tab-${kind}` : nothing}>
        ${panel}
      </div>`;
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

  /** "Teď" of the air chart is the reading of the room card (CO₂ and PM2.5), so a stale value is grey there too. */
  private liveReading(room: Room, metric: HistoryMetric): LiveReading | undefined {
    if (metric === "temperature") {
      return undefined;
    }
    const now = Date.now();
    const co2 = this.reading(room.carbon_dioxide, room.thresholds.stale_minutes, now);
    const pm25 = this.pm25Reading(room, now);
    const primary = metric === "pm25" ? pm25 : co2;
    return {
      value: primary.value,
      stale: primary.stale === true,
      secondary: metric === "co2" ? { value: pm25.value, stale: pm25.stale === true } : undefined,
    };
  }

  /** „Historie místnosti – 24 h“ with a readout that follows the finger (or the arrow keys). */
  private renderHistoryBody(room: Room, metric: HistoryMetric, isSummer: boolean): TemplateResult {
    const hours = this._historyHours;
    const { t } = this._i18n;
    let body: TemplateResult;
    const model = this._historyModel;
    if (this._historyStatus === "loading") {
      body = html`<p class="sheet-message">${t.sheet.loading}</p>`;
    } else if (this._historyStatus === "error" || !model) {
      body = html`<p class="sheet-message error" role="alert">${t.sheet.historyFailed}</p>`;
    } else if (!hasChartData(model, metric)) {
      body = html`<p class="sheet-message">${t.sheet.noHistory(hours)}</p>`;
    } else {
      body = html`<div
        class="chart-wrap ${metric === "temperature" ? "temperature" : "air"}"
        tabindex="0"
        role="group"
        aria-label=${t.sheet.chart(spokenPeriod(hours * 60, t))}
        @pointerdown=${this.chartPointer}
        @pointermove=${this.chartPointer}
        @pointerup=${this.chartPointerEnd}
        @pointercancel=${this.chartPointerEnd}
        @pointerleave=${this.chartPointerLeave}
        @keydown=${this.chartKeydown}
      >
        ${renderRoomChart(model, metric, this.chartWidth(), this._scrubTime, this._i18n, isSummer, this.liveReading(room, metric))}
      </div>`;
    }
    return body;
  }

  /** The chart is drawn 1:1 in CSS pixels at the inner width of the popup. */
  private chartWidth(): number {
    // On its side the popup is as wide as the phone (the sheet of the kit, `wide`, the same query), otherwise 460 px at most.
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

  /** The history chart is drawn at the popup width; redraw it after rotation or resize. */
  private handleResize = (): void => {
    if (this._sheet?.kind === "history") {
      this.requestUpdate();
    }
  };

  private openSheet(kind: SheetKind, room: Room, event: Event, focus?: DetailFocus): void {
    this._opener = event.currentTarget instanceof HTMLElement ? event.currentTarget : undefined;
    this._sheetError = undefined;
    this._announcement = "";
    this._sheet = { kind, room, focus: kind === "history" ? focus ?? "temperature" : undefined };
    if (kind === "heating" || kind === "climate") this._hvacSelected = this.hvacSelection(kind);
    window.addEventListener("resize", this.handleResize, { passive: true });
    if (kind === "history") {
      this._scrubTime = undefined;
      this._historyHours = this._config?.history.hours ?? 24;
      this._focusPart = focus;
      void this.loadRoomHistory(room);
    }
  }

  /** The name of a room in the language of the card. */
  private roomLabel(room: Room): string {
    return roomLabel(room, this._i18n.language);
  }

  /** Summary chip: the Topení / Klimatizace popup for the rooms the chip names. */
  private openGroupSheet(kind: "heating" | "climate", names: string[], event: Event): void {
    const rooms = (this._config?.rooms ?? []).filter((room) => names.includes(room.name));
    if (rooms.length === 0) {
      return;
    }
    this.openSheet(kind, rooms[0], event);
    this._sheet = { kind, room: rooms[0], rooms };
    this._hvacSelected = this.hvacSelection(kind);
  }

  /** The rooms a Topení / Klimatizace popup sets: one room, or the rooms of a summary chip that have the system. */
  private sheetRooms(): Room[] {
    const sheet = this._sheet;
    if (!sheet) {
      return [];
    }
    return sheet.rooms ?? [sheet.room];
  }

  /** The climate entity of a room for the system of the popup. */
  private hvacEntity(room: Room, kind: "heating" | "climate"): EntityId | undefined {
    return kind === "heating" ? room.heating?.climate : room.air_conditioner;
  }

  /** The rooms the popup opens with: the rooms of the popup that have the system, else the first room that has it. */
  private hvacSelection(kind: "heating" | "climate"): EntityId[] {
    const own = this.sheetRooms().map((room) => this.hvacEntity(room, kind)).filter((id): id is EntityId => Boolean(id));
    if (own.length) return own;
    const first = (this._config?.rooms ?? []).map((room) => this.hvacEntity(room, kind)).find((id): id is EntityId => Boolean(id));
    return first ? [first] : [];
  }

  /** Sends what waits in the popup Topení / Klimatizace at once (it closes or switches the system). */
  private async flushClimate(): Promise<void> {
    await (this.renderRoot.querySelector("kd-climate") as (Element & { flush(): Promise<void> }) | null)?.flush();
  }

  /** Segmented control in the HVAC popup: switch between Topení and Klimatizace. */
  private switchSheet(kind: "heating" | "climate"): void {
    if (this._sheet && this._sheet.kind !== kind) {
      this.flushClimate();
      this._sheetError = undefined;
      this._sheet = { kind, room: this._sheet.room, rooms: this._sheet.rooms };
      this._hvacSelected = this.hvacSelection(kind);
    }
  }

  private closeSheet(restoreFocus = true): void {
    window.removeEventListener("resize", this.handleResize);
    this.flushClimate();
    this._historyRequest += 1;
    this._sheet = undefined;
    this._sheetError = undefined;
    this._ventilationEnding = false;
    this._vent = undefined;
    this._ventRequest += 1;
    window.clearTimeout(this._endTimer);
    this._scrubTime = undefined;
    this._scrubbing = false;
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
      room.carbon_dioxide,
      room.pm25,
      this.ventilationRooms().includes(room) ? this._config?.ventilationEntity : undefined,
      ...room.windows.map((window) => window.entity),
    ].filter((entityId): entityId is EntityId => Boolean(entityId));
    const settings = this._config!.history;
    const endMs = Date.now();
    const startMs = endMs - this._historyHours * HOUR_MS;
    try {
      const history = await fetchHistory(this.hass, ids, startMs, endMs);
      if (request !== this._historyRequest) {
        return;
      }
      this._historyModel = buildRoomChart(history, room, { startMs, endMs }, settings, this.ventilationRooms().includes(room) ? this._config?.ventilationEntity : undefined);
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
}
