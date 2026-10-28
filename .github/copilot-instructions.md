# Copilot Instructions

## Project scope and sources of truth

- This repository builds a Home Assistant Lovelace **custom frontend card** distributed through HACS. It is not a Home Assistant integration, automation package, or backend service. Keep card implementation changes in `src/` unless the request requires another surface.
- Before changing product behavior, read `CURRENT_SPEC.md` and the relevant parts of `ENTITY_MAP.md`. `CURRENT_SPEC.md` defines intended behavior; `ENTITY_MAP.md` records which entity IDs are confirmed. `README.md` describes installation and the current implementation. The example YAML demonstrates card configuration but does not override the spec.
- `DESIGN_HISTORY.md`, `MEMORY_SUMMARIZED.md`, are historical context only. Prefer the current spec over older decisions or existing code when they disagree.
- Do not invent entity IDs, attributes, units, or configuration keys. An entity marked “not found” or “not mapped” is unconfirmed: leave it optional or absent until the user confirms it.
- The spec includes features that are not implemented yet. Treat it as the product contract, but implement only the requested scope; do not claim a specified feature already exists just because it is documented.
- For edits to `.github/skills/`, `.github/evals/`, or their validation scripts, also follow the applicable guidance in `CLAUDE.md`. Do not change those plugin resources as part of unrelated card work.

## Product behavior to preserve

- The dashboard is mobile-first, designed primarily for iPhone 14 Pro, and must not require horizontal scrolling. Keep room order: Ložnice, Pracovna, Maxík, Mikuláš, Obývák.
- Room temperature, humidity, CO₂, and PM2.5 come from the configured room entities; Tado temperature is not a substitute. IKEA MYGGBETT is the window source. Topení is the heating source; Klimatizace is the cooling and other climate-mode source.
- Missing, `unknown`, `unavailable`, invalid, or unconfigured readings are not alarms. Keep the row/icon visible and show `––` in a neutral style. If any required room measurement or the house mode is missing, the room status is `Bez dat`; never report `Příjemné` from partial data.
- Preserve room-status precedence from `CURRENT_SPEC.md`: missing required data; PM2.5 ≥ critical; CO₂ ≥ critical; CO₂ ≥ warning; humidity too high; humidity too low; temperature too high; temperature too low; otherwise comfortable. PM2.5 in its warning range changes only the value color, not the room status. Threshold defaults are defined in the spec and implementation.
- `input_select.house_mode` values Zima/Léto select comfort thresholds and the primary order of the HVAC rows; they must not turn either system on or off. Keep both rows present. Preserve Topení schedule/manual/off meanings, heating-wave bands, Klimatizace off/unavailable handling, and the rule that WindFree is shown only while cooling.
- Cover position is 0% closed/down and 100% open/up; tilt is 0% closed slats and 100% open slats. Cover configuration is optional, including for Obývák. Unknown position or tilt must remain visibly unknown rather than being treated as zero.
- The card speaks Czech, Swedish and English, chosen by the Home Assistant language (Czech, Swedish, otherwise English; `language` in the YAML forces one). Every user-facing text, including screen-reader text, comes from `src/translations/` (Czech `cs.ts` is the source; `sv.ts` and `en.ts` must have the same keys or the build fails), never from a string in a component. **Every change that adds or alters a text updates all three languages in the same change.** Texts from the YAML (title, room, window and preset names) are not translated. Numbers follow the card language (`20,4 °C` / `20.4 °C`, see CURRENT_SPEC.md, Jazyky). Do not change thresholds, color semantics, entity mappings, or card interactions based on guesswork; ask when the spec leaves a material behavior decision open.

## Shared kit

- Everything this card shares with `ha-energie-dashboard` lives in the repository `michal-madle/ha-dashboard-kit` (a dependency pinned to a commit in `package.json`): language and number/percent/time/date formats (`ha-dashboard-kit/i18n`), entity reading (`entities`), configuration rules (`config`), the hold / double-tap gesture (`gesture`), the controls (`controls`), tsconfig, Vite and copy-build, and the Playwright test infrastructure. Its `README.md` and `CURRENT_SPEC.md` say what belongs where.
- Code or a rule that both cards need is created in the kit, never copied into this card "for now". Never edit the kit inside `node_modules`: change the kit (with its tests and spec), then raise the commit in `package.json` here and in the other card. Rooms, blinds, heating, history, texts, colours and the layout of this card stay here.
- Browser specs must not import card modules that use the kit (Playwright does not transpile `node_modules`); they read only `src/translations/`.

## Implementation conventions

- The card is implemented in strict TypeScript and split by responsibility: `src/index.ts` registers the element and card metadata; `src/ha-klima-dashboard.ts` contains the main `LitElement`; `src/types.ts` defines shared types; `src/config.ts` validates and normalizes config; `src/styles.ts` contains card styles; `src/i18n.ts` wraps the language and number formats of the kit around the texts in `src/translations/` (`cs.ts`, `sv.ts`, `en.ts`); and `src/utils.ts` contains pure helpers. There is currently no card editor. Keep configuration fields optional where the current YAML contract allows omission.
- Keep `hass` as a Lit property with `@property({ attribute: false })`; use `@state()` only for internal reactive state. Filter updates so unrelated entity changes do not rerender the card. Keep `render()` free of side effects and clean up any listeners, timers, or subscriptions added outside Lit's declarative event bindings.
- Keep entity-state handling defensive. Treat Home Assistant state strings and attributes as runtime data; validate configuration at `setConfig`, avoid unchecked assumptions, and do not hide errors behind broad catches or success-shaped defaults.
- Render dynamic values with Lit `html` templates and property/event bindings. Do not interpolate entity-provided values into `innerHTML` or construct executable markup from state data.
- Keep styles scoped to the card and responsive. Prefer Home Assistant CSS variables where suitable; do not add card-mod, button-card, or another runtime dependency unless the user asks or the requirement cannot reasonably be met by this standalone card.
- Preserve keyboard operation, visible focus, meaningful accessible labels, and touch-friendly interactions. Keep Home Assistant events composed and bubbling when they need to cross the card's shadow boundary.
- Keep custom-element and `window.customCards` registration idempotent. Preserve the public card type `custom:ha-klima-dashboard` and its HACS module-resource contract.
- Do not edit Home Assistant `.storage` files or a live instance's dashboard configuration from this code task. Update source/config examples in the repository instead.

## Change and verification workflow

- Make the smallest complete change that satisfies the request. Preserve existing behavior outside the requested change.
- If a change adds or alters public card configuration, update the relevant YAML example and README documentation. Update `CURRENT_SPEC.md` only when the product requirement itself changes; update `ENTITY_MAP.md` only with confirmed mappings.
- Do not hand-edit generated `ha-klima-dashboard.js`; regenerate it with `npm run build` from the repository root. The root `package.json` runs `tsc --noEmit`, `vite build` (configuration `cardBuild` from the kit) and the kit's `build/copy-build.mjs`. Vite uses `src/index.ts` as its library entry and writes the single ES-module bundle to `dist/ha-klima-dashboard.js`, then the copy script updates the root `ha-klima-dashboard.js` used for distribution. Preserve this build workflow and module-resource contract.
- The package currently defines only `build` and `dev` scripts; there are no configured test or lint scripts. Run available, relevant checks; if a check cannot run, say why. Never report a build, test, or visual check as passing unless it was actually run.
- When browser access is available, inspect the rendered card at mobile widths and verify that loading, unavailable entities, and optional configuration remain readable. If browser/HA access is unavailable, state that visual behavior was not verified rather than guessing.
