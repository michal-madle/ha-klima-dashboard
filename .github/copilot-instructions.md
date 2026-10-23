# Copilot Instructions

## Project scope and sources of truth

- This repository builds a Home Assistant Lovelace **custom frontend card** distributed through HACS. It is not a Home Assistant integration, automation package, or backend service. Keep card implementation changes in `src/` unless the request requires another surface.
- Before changing product behavior, read `CURRENT_SPEC.md` and the relevant parts of `ENTITY_MAP.md`. `CURRENT_SPEC.md` defines intended behavior; `ENTITY_MAP.md` records which entity IDs are confirmed. `README.md` describes installation and the current implementation. The example YAML demonstrates card configuration but does not override the spec.
- `DESIGN_HISTORY.md`, `MEMORY_SUMMARIZED.md`, and files under `memories/` are historical context only. Prefer the current spec over older decisions or existing code when they disagree.
- Do not invent entity IDs, attributes, units, or configuration keys. An entity marked “not found” or “not mapped” is unconfirmed: leave it optional or absent until the user confirms it.
- The spec includes features that are not implemented yet. Treat it as the product contract, but implement only the requested scope; do not claim a specified feature already exists just because it is documented.
- For edits to `.github/skills/`, `.github/evals/`, or their validation scripts, also follow the applicable guidance in `CLAUDE.md`. Do not change those plugin resources as part of unrelated card work.

## Product behavior to preserve

- The dashboard is mobile-first, designed primarily for iPhone 14 Pro, and must not require horizontal scrolling. Keep room order: Ložnice, Pracovna, Maxík, Mikuláš, Obývací pokoj.
- Room temperature, humidity, CO₂, and PM2.5 come from the configured room entities; Tado temperature is not a substitute. IKEA MYGGBETT is the window source. Tado CE is the heating source; Samsung is the cooling and other climate-mode source.
- Missing, `unknown`, `unavailable`, invalid, or unconfigured readings are not alarms. Keep the row/icon visible and show `––` in a neutral style. If any required room measurement or the house mode is missing, the room status is `Bez dat`; never report `Příjemné` from partial data.
- Preserve room-status precedence from `CURRENT_SPEC.md`: missing required data; PM2.5 ≥ critical; CO₂ ≥ critical; CO₂ ≥ warning; humidity too high; humidity too low; temperature too high; temperature too low; otherwise comfortable. PM2.5 in its warning range changes only the value color, not the room status. Threshold defaults are defined in the spec and implementation.
- `input_select.house_mode` values Zima/Léto select comfort thresholds and the primary order of the Tado/Samsung rows; they must not turn either system on or off. Keep both rows present. Preserve Tado schedule/manual/off meanings, heating-wave bands, Samsung off/unavailable handling, and the rule that WindFree is shown only while cooling.
- Cover position is 0% closed/down and 100% open/up; tilt is 0% closed slats and 100% open slats. Cover configuration is optional, including for Obývací pokoj. Unknown position or tilt must remain visibly unknown rather than being treated as zero.
- Preserve Czech user-facing labels and `cs-CZ` number formatting. Do not change thresholds, color semantics, entity mappings, or card interactions based on guesswork; ask when the spec leaves a material behavior decision open.

## Implementation conventions

- The card is a strict TypeScript `LitElement` in `src/ha-klima-dashboard.ts`. Follow its existing types, helpers, and rendering patterns; keep configuration fields optional where the current YAML contract allows omission.
- Keep entity-state handling defensive. Treat Home Assistant state strings and attributes as runtime data; validate configuration at `setConfig`, avoid unchecked assumptions, and do not hide errors behind broad catches or success-shaped defaults.
- Render dynamic values with Lit `html` templates and property/event bindings. Do not interpolate entity-provided values into `innerHTML` or construct executable markup from state data.
- Keep styles scoped to the card and responsive. Prefer Home Assistant CSS variables where suitable; do not add card-mod, button-card, or another runtime dependency unless the user asks or the requirement cannot reasonably be met by this standalone card.
- Preserve keyboard operation, visible focus, meaningful accessible labels, and touch-friendly interactions. Keep Home Assistant events composed and bubbling when they need to cross the card's shadow boundary.
- Keep custom-element and `window.customCards` registration idempotent. Preserve the public card type `custom:ha-klima-dashboard` and its HACS module-resource contract.
- Do not edit Home Assistant `.storage` files or a live instance's dashboard configuration from this code task. Update source/config examples in the repository instead.

## Change and verification workflow

- Make the smallest complete change that satisfies the request. Preserve existing behavior outside the requested change.
- If a change adds or alters public card configuration, update the relevant YAML example and README documentation. Update `CURRENT_SPEC.md` only when the product requirement itself changes; update `ENTITY_MAP.md` only with confirmed mappings.
- Do not hand-edit generated `ha-klima-dashboard.js`; regenerate it using the repository's actual build workflow when required. Check the package manifest and working directory before running build commands: the README documents `npm run build`, but the manifest is currently under `.github/` while the TypeScript/Vite configuration is at the repository root. Do not assume a command works or move files to make it work without an explicit request.
- No test or lint scripts are currently documented. Run the available, relevant checks; if a check cannot run, say why. Never report a build, test, or visual check as passing unless it was actually run.
- When browser access is available, inspect the rendered card at mobile widths and verify that loading, unavailable entities, and optional configuration remain readable. If browser/HA access is unavailable, state that visual behavior was not verified rather than guessing.
