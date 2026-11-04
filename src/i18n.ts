import { cardLanguage, getI18n as kitGetI18n, hassLanguage, languageOf, pageLanguage } from "ha-dashboard-kit/i18n";
import type { Dictionaries, I18n as KitI18n } from "ha-dashboard-kit/i18n";
import { cs } from "./translations/cs";
import { en } from "./translations/en";
import { sv } from "./translations/sv";
import type { HomeAssistant, Language } from "./types";

/*
 * Translations (CURRENT_SPEC.md, Jazyky). The dictionaries are the card's (src/translations/; Czech
 * is the source and its type is the contract: a key missing in the English or Swedish dictionary,
 * or one they have extra, fails the build). The language of the card and the formats of numbers,
 * percent, time and date come from the kit (ha-dashboard-kit/i18n). Texts from the YAML (title,
 * room, window and preset names) are shown as written.
 */

export type Texts = typeof cs;
export type I18n = KitI18n<Texts>;

const TEXTS: Dictionaries<Texts> = { cs, en, sv };

export { cardLanguage, hassLanguage, languageOf, pageLanguage };

/** Texts of the card language and the formats of the profile of Home Assistant. */
export function getI18n(language: Language, hass?: HomeAssistant): I18n {
  return kitGetI18n(TEXTS, language, hass);
}
