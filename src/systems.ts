import type { I18n } from "./i18n";
import type { ClimateMode, DashboardThresholds, HassEntity } from "./types";
import {
  CLIMATE_COLORS,
  COLORS,
  formatPreset,
  heatingWaveCount,
  isUnavailable,
  numberAttribute,
} from "./utils";

const NBSP = " ";

/** What a Topení or Klimatizace row shows (CURRENT_SPEC.md, Topení / Klimatizace). */
export interface SystemView {
  label: string;
  color: string;
  /** The system is running (bold in the primary row, counted in the house summary). */
  active: boolean;
  /** Target as "· 21 °C", or "". */
  extra: string;
  /** No data: the icon is dashed and the label "––". */
  unknown: boolean;
}

export interface HeatingView extends SystemView {
  /** Plán / Ručně / Vypnuto, from the overlay sensor. */
  overlay?: "schedule" | "manual" | "off";
  /** Heating intensity as 0–3 waves. */
  waves: number;
}

export interface ClimateView extends SystemView {
  mode: ClimateMode;
}

function numericState(entity: HassEntity | undefined): number | undefined {
  if (!entity || isUnavailable(entity.state.toLowerCase())) {
    return undefined;
  }
  const value = Number.parseFloat(entity.state);
  return Number.isFinite(value) ? value : undefined;
}

function targetText(target: number | undefined, i18n: I18n): string {
  return target === undefined ? "" : `· ${i18n.half(target)}${NBSP}°C`;
}

/**
 * Topení: climate entity, overlay (Schedule / Manual / Off), target and intensity sensors; the
 * intensity is shown as 0–3 waves by the room's `heating_waves_2` / `heating_waves_3`. Texts are
 * in the card language.
 */
export function heatingView(
  climate: HassEntity | undefined,
  overlayEntity: HassEntity | undefined,
  targetEntity: HassEntity | undefined,
  intensityEntity: HassEntity | undefined,
  bands: Pick<DashboardThresholds, "heating_waves_2" | "heating_waves_3">,
  i18n: I18n,
): HeatingView {
  const labels = i18n.t.heatingMode;
  const climateState = climate?.state.toLowerCase();
  const overlay = overlayEntity?.state.toLowerCase();
  const overlayUnknown = overlay === undefined || isUnavailable(overlay);
  const off = climateState === "off" || overlay === "off";
  const target = numericState(targetEntity);

  if (off) {
    // Vypnuto never shows the 5 °C frost-protection target.
    return { label: labels.off, color: COLORS.off, active: false, extra: "", unknown: false, overlay: "off", waves: 0 };
  }
  if (overlayUnknown || climateState === undefined || isUnavailable(climateState)) {
    return { label: "––", color: COLORS.label, active: false, extra: "", unknown: true, waves: 0 };
  }
  const waves = heatingWaveCount(numericState(intensityEntity), bands);
  if (overlay === "schedule") {
    return { label: labels.schedule, color: COLORS.plan, active: true, extra: targetText(target, i18n), unknown: false, overlay: "schedule", waves };
  }
  if (overlay === "manual") {
    return { label: labels.manual, color: COLORS.warning, active: true, extra: targetText(target, i18n), unknown: false, overlay: "manual", waves };
  }
  return { label: overlayEntity?.state ?? "––", color: COLORS.warning, active: true, extra: "", unknown: false, waves };
}

/** Klimatizace: one climate entity; "off" wins over a preset, wind_free is "WindFree". */
export function climateView(entity: HassEntity | undefined, i18n: I18n): ClimateView {
  let mode: ClimateMode = "unknown";
  let presetLabel: string | undefined;
  let target: number | undefined;

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
    } else if (state === "auto" || state === "heat_cool") {
      mode = "auto";
    }
    // Other presets (sleep, boost, wind_free_sleep, ...) are shown by their own name.
    if (mode !== "off" && mode !== "unknown" && mode !== "wind_free" && preset !== "none" && preset !== "") {
      presetLabel = formatPreset(preset);
    }
    target = numberAttribute(entity.attributes.temperature);
  }

  const hasTarget = ["cool", "wind_free", "dry", "heat", "auto"].includes(mode);
  return {
    mode,
    label: presetLabel ?? i18n.t.climateMode[mode],
    color: CLIMATE_COLORS[mode],
    active: mode !== "off" && mode !== "unknown",
    extra: hasTarget ? targetText(target, i18n) : "",
    unknown: mode === "unknown",
  };
}

/** "Plán 21 °C" for screen readers; "neznámý stav" (in the card language) instead of "––". */
export function spokenSystem(view: SystemView, i18n: I18n): string {
  const label = view.unknown ? i18n.t.unknownState : view.label;
  return view.extra ? `${label} ${view.extra.replace(/^·\s*/, "")}` : label;
}
