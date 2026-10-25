import type { HomeAssistant, Language, LanguageSetting } from "./types";
import { cs } from "./translations/cs";
import { en } from "./translations/en";
import { sv } from "./translations/sv";

/*
 * Translations (CURRENT_SPEC.md, Jazyky). Every text of the card comes from one dictionary per
 * language. The Czech dictionary is the source and its type is the contract: a key missing in
 * the English or Swedish dictionary, or one they have extra, fails the build (`tsc --noEmit`).
 * Texts from the YAML (title, room, window and preset names) are shown as written.
 */

export type Texts = typeof cs;

const TEXTS: Record<Language, Texts> = { cs, en, sv };

export interface I18n {
  language: Language;
  /** Locale of numbers and dates: "cs-CZ", "sv-SE", or the English of Home Assistant ("en", "en-GB"). */
  locale: string;
  t: Texts;
  /** One decimal place: "21,3" / "21.3". */
  one(value: number): string;
  /** Rounded to halves: "21,5", "22". */
  half(value: number): string;
  /** Up to one decimal place, not rounded to halves (axis labels). */
  tick(value: number): string;
  /** Whole number: "8", "−2". */
  whole(value: number): string;
  /** A percentage: "46 %" in Czech and Swedish, "46%" in English (as Home Assistant writes it). */
  percent(value: number | string): string;
  /** Clock time, 24 h in every language: "18:00". */
  time(ms: number): string;
  /** Day and month: "24. 10.", "24/10", "10/24". */
  day(ms: number): string;
}

/** The language Home Assistant shows (user profile), e.g. "cs", "sv", "en-GB"; "" when not known. */
export function hassLanguage(hass: HomeAssistant | undefined): string {
  return (hass?.locale?.language || hass?.language || "").trim();
}

/** "cs", "cs-CZ" → Czech; "sv", "sv-SE" → Swedish; any other language → English. */
export function languageOf(tag: string): Language {
  const primary = tag.toLowerCase().split(/[-_]/)[0];
  return primary === "cs" ? "cs" : primary === "sv" ? "sv" : "en";
}

/**
 * Card language: `language: cs | en | sv` in the YAML forces it; `auto` follows the language of
 * Home Assistant – Czech and Swedish as they are, English for every other language.
 */
export function cardLanguage(setting: LanguageSetting, hass: HomeAssistant | undefined): Language {
  return setting === "auto" ? languageOf(hassLanguage(hass)) : setting;
}

/**
 * Language of the page before the card has `hass` (the card picker): Home Assistant sets
 * `<html lang>` to its language; without it the browser language.
 */
export function pageLanguage(): Language {
  return languageOf(document.documentElement.lang || navigator.language || "");
}

const cache = new Map<string, I18n>();

export function getI18n(language: Language, hass?: HomeAssistant): I18n {
  // English keeps the variant Home Assistant uses (en-GB writes 24/10, en 10/24).
  const tag = hassLanguage(hass).replace("_", "-");
  const locale = language === "cs" ? "cs-CZ" : language === "sv" ? "sv-SE" : /^en(-|$)/i.test(tag) ? tag : "en";
  const key = `${language}|${locale}`;
  let i18n = cache.get(key);
  if (!i18n) {
    i18n = createI18n(language, locale);
    cache.set(key, i18n);
  }
  return i18n;
}

function createI18n(language: Language, requested: string): I18n {
  let locale = requested;
  try {
    new Intl.NumberFormat(locale);
  } catch {
    // A tag the browser does not know: plain English formatting.
    locale = "en";
  }
  const t = TEXTS[language];
  const one = new Intl.NumberFormat(locale, { minimumFractionDigits: 1, maximumFractionDigits: 1 });
  const upToOne = new Intl.NumberFormat(locale, { maximumFractionDigits: 1 });
  const whole = new Intl.NumberFormat(locale, { maximumFractionDigits: 0 });
  const time = new Intl.DateTimeFormat(locale, { hour: "2-digit", minute: "2-digit", hourCycle: "h23" });
  const day = new Intl.DateTimeFormat(locale, { day: "numeric", month: "numeric" });
  return {
    language,
    locale,
    t,
    one: (value) => one.format(value),
    half: (value) => upToOne.format(Math.round(value * 2) / 2),
    tick: (value) => upToOne.format(value),
    whole: (value) => whole.format(value),
    percent: (value) => `${value}${t.percentSpace}%`,
    time: (ms) => time.format(ms),
    day: (ms) => day.format(ms),
  };
}
