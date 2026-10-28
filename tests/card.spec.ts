import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { parse } from "yaml";
import { cs } from "../src/translations/cs";
import { en } from "../src/translations/en";
import { sv } from "../src/translations/sv";
import { expect, test } from "./fixtures";
import type { CDPSession, Locator, Page } from "./fixtures";

// Browser tests of the Klima Dashboard card against tests/harness.html (fake hass data).
// Every case names the spec section or TODO item it guards. `npm test` builds the card first;
// `npm run coverage` shows which code of src/ the tests execute.

const require = createRequire(import.meta.url);
const AXE = require.resolve("axe-core/axe.min.js");
const WIDTHS = [320, 360, 375, 393, 430, 768];
const COVER = "cover.loznice_zaluzie_loznice";
const CO2 = "sensor.loznice_teplomer_loznice_carbon_dioxide";

// ------------------------------------------------------------------ helpers

/**
 * Opens a scenario of the harness. `language` is the language of Home Assistant: Czech by
 * default, "" for a frontend that reports none.
 */
async function open(
  page: Page,
  scenario = "full",
  width = 393,
  height = 852,
  theme: "dark" | "light" = "dark",
  language = "cs",
): Promise<void> {
  await page.setViewportSize({ width, height });
  const query = `s=${scenario}${theme === "light" ? "&theme=light" : ""}${language === "cs" ? "" : `&lang=${language}`}`;
  await page.goto(`/tests/harness.html?${query}`);
  await page.locator(".room").first().waitFor();
  // Wait for the first micro-trend history (the dotted placeholder disappears).
  await expect(page.locator(".spark.loading")).toHaveCount(0);
}

const rooms = (page: Page) => page.locator(".room");
const statuses = (page: Page) => page.locator(".status-line").allInnerTexts();
const tidy = (texts: string[]) => texts.map((text) => text.replace(/\s+/g, " ").trim());
const example = () => parse(readFileSync(new URL("../examples/domov_prototyp_loznice.yaml", import.meta.url), "utf8"));

/** Test hooks of tests/scenarios.js (window.__test). */
const hook = <T>(page: Page, name: "services" | "scripts" | "haptics" | "moreInfo" | "actions" | "config") =>
  // @ts-expect-error test hook
  page.evaluate((key) => window.__test[key], name) as Promise<T>;

/** Entity states as Home Assistant pushes them (new objects, last_changed = now). */
const setStates = (page: Page, changes: Record<string, string>) =>
  page.evaluate((values) => {
    // @ts-expect-error test hook
    const { states, update } = window.__test;
    update(Object.fromEntries(Object.entries(values).map(([id, state]) => [id, { ...states[id], state }])));
  }, changes);

/** The Ložnice blind reporting its state, position and tilt. */
const cover = (page: Page, value: string, position: number, tilt: number, entityId = COVER) =>
  page.evaluate(
    ([id, v, p, t]) => {
      // @ts-expect-error test hook
      window.__test.cover(id, v, p, t);
    },
    [entityId, value, position, tilt] as const,
  );

/** setConfig of the scenario config with `top` over the card keys and `roomPatches` over rooms (by index). */
const reconfigure = (page: Page, top: Record<string, unknown>, roomPatches: Record<number, Record<string, unknown>> = {}) =>
  page.evaluate(
    ([patch, perRoom]) => {
      // @ts-expect-error test hook
      const { card, config } = window.__test;
      card.setConfig({
        ...config,
        ...patch,
        rooms: config.rooms.map((room: object, index: number) => ({ ...room, ...(perRoom[index] ?? {}) })),
      });
    },
    [top, roomPatches] as const,
  );

/** Waits until every finite animation (also inside shadow roots) has finished, e.g. a popup sliding in. */
async function settle(page: Page): Promise<void> {
  await page.evaluate(async () => {
    const roots = [document, ...[...document.querySelectorAll("*")].flatMap((node) => (node.shadowRoot ? [node.shadowRoot] : []))];
    const finite = roots.flatMap((root) => root.getAnimations()).filter((a) => a.effect?.getComputedTiming().iterations !== Infinity);
    await Promise.all(finite.map((a) => a.finished.catch(() => undefined)));
  });
}

async function axeViolations(page: Page): Promise<string[]> {
  await page.addScriptTag({ path: AXE });
  // A popup that is still sliding in is partly transparent and fails the contrast check.
  await settle(page);
  return page.evaluate(async () => {
    // @ts-expect-error axe is injected above
    const result = await window.axe.run(document, { resultTypes: ["violations"] });
    return result.violations.map(
      (violation: { id: string; nodes: Array<{ target: string[]; any: Array<{ data?: unknown }> }> }) =>
        `${violation.id}: ${violation.nodes
          .map((node) => `${node.target.join(" > ")} ${JSON.stringify(node.any[0]?.data ?? {})}`)
          .join(" | ")}`,
    );
  });
}

async function touch(cdp: CDPSession, type: "touchStart" | "touchMove" | "touchEnd", x = 0, y = 0): Promise<void> {
  await cdp.send("Input.dispatchTouchEvent", { type, touchPoints: type === "touchEnd" ? [] : [{ x, y }] });
}

async function centre(page: Page, selector: string, index = 0): Promise<[number, number]> {
  const box = await page.locator(selector).nth(index).boundingBox();
  if (!box) throw new Error(`No box for ${selector}`);
  return [box.x + box.width / 2, box.y + box.height / 2];
}

/** Opens a popup of the first room (or `roomIndex`) and waits until it has slid in. */
async function openPopup(page: Page, trigger: string, roomIndex = 0): Promise<void> {
  await rooms(page).nth(roomIndex).locator(trigger).click();
  await expect(page.locator(".sheet")).toBeVisible();
  await settle(page);
}

async function closePopup(page: Page): Promise<void> {
  await page.keyboard.press("Escape");
  await expect(page.locator(".sheet")).toHaveCount(0);
}

/** WCAG colours: "rgb(r, g, b)" → contrast ratio and HSL saturation. */
const channels = (colour: string) => colour.match(/\d+(\.\d+)?/g)!.slice(0, 3).map(Number);
const luminance = (colour: string) => {
  const [r, g, b] = channels(colour).map((value) => {
    const c = value / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
const contrast = (colour: string, ground: string) => {
  const [light, dark] = [luminance(colour), luminance(ground)].sort((a, b) => b - a);
  return (light + 0.05) / (dark + 0.05);
};
const saturation = (colour: string) => {
  const rgb = channels(colour).map((value) => value / 255);
  const [max, min] = [Math.max(...rgb), Math.min(...rgb)];
  const lightness = (max + min) / 2;
  return max === min ? 0 : (max - min) / (1 - Math.abs(2 * lightness - 1));
};

/**
 * All geometry of the room cards the layout checks need, measured in one pass (browser side):
 * page scroll width, the room cells, and per room the HVAC target, presets beside the panel, the
 * end of the CO₂ trend, the illustration against the panel, the values and their units, the start
 * of the CO₂ / PM2.5 trends and what the illustration overlaps.
 */
const measureLayout = (page: Page) =>
  page.evaluate(() => {
    const card = document.querySelector("ha-klima-dashboard")!.shadowRoot!;
    const box = (element: Element | null | undefined) => element?.getBoundingClientRect();
    const textBox = (element: Element) => {
      const range = document.createRange();
      range.selectNodeContents(element);
      return range.getBoundingClientRect();
    };
    const hit = (a: DOMRect, b: DOMRect) => a.left < b.right && b.left < a.right && a.top < b.bottom && b.top < a.bottom;
    const roomFacts = [...card.querySelectorAll(".room")].map((room) => {
      const info = box(room.querySelector(".info"))!;
      const hvac = box(room.querySelector(".hvac"))!;
      const panel = box(room.querySelector(".cover-panel"));
      const presets = box(room.querySelector(".presets"));
      const drawing = box(room.querySelector(".scene svg"));
      const dot = box(room.querySelector(".slot-co2 .spark-dot"));
      const rail = box(room.querySelector(".preset svg rect"));
      // The drawing sits in the upper part of its 112 px box; measure to the lowest stroke.
      const lowest = Math.max(...[...room.querySelectorAll(".scene svg *")].map((node) => node.getBoundingClientRect().bottom));
      return {
        name: room.getAttribute("aria-label"),
        width: Math.round(box(room)!.width),
        col: getComputedStyle(room).getPropertyValue("--col").trim(),
        hvac: { height: hvac.height, short: (info.width - 6) / 2 - hvac.width },
        presets:
          panel && presets
            ? {
                gap: presets.left - panel.right,
                top: presets.top - panel.top,
                bottom: presets.bottom - panel.bottom,
                titles: [...room.querySelectorAll(".preset")].map((preset) => preset.getAttribute("title")),
              }
            : undefined,
        trendEnd: panel && dot && rail ? { trend: panel.left - dot.right, preset: rail.left - panel.right } : undefined,
        drawingAbovePanel: drawing && panel && panel.height > 0 ? panel.top - Math.min(lowest, drawing.bottom) : undefined,
        overlaps: drawing
          ? [
              hit(drawing, box(room.querySelector(".humidity"))!) ? "vlhkost" : "",
              hit(drawing, textBox(room.querySelector(".room-title")!)) ? "název" : "",
            ].filter(Boolean)
          : [],
        airRows: [...room.querySelectorAll(".air-row")].flatMap((row) => {
          const label = row.querySelector(".row-label");
          const unit = row.querySelector(".row-unit");
          if (!label || !unit) return [];
          const [a, b] = [label.getBoundingClientRect(), unit.getBoundingClientRect()];
          return [{ sameLine: Math.abs(a.top - b.top) < 3, cut: label.scrollWidth > label.clientWidth + 0.5, text: row.textContent?.trim() }];
        }),
        trendStarts: [".slot-co2", ".slot-pm25"].flatMap((slot) => {
          const text = room.querySelector(`${slot} .row-text`);
          const spark = room.querySelector(`${slot} .spark`);
          return text && spark ? [{ slot, gap: spark.getBoundingClientRect().left - textBox(text).right }] : [];
        }),
      };
    });
    const cells = [...card.querySelectorAll(".room-cell")].map((cell) => {
      const b = cell.getBoundingClientRect();
      return { left: Math.round(b.left), top: Math.round(b.top), width: Math.round(b.width) };
    });
    return {
      scrollWidth: document.documentElement.scrollWidth,
      dashboard: Math.round(card.querySelector(".dashboard")!.getBoundingClientRect().width),
      cells,
      rooms: roomFacts,
    };
  });

/**
 * Measures the real touch target of every button by hit-testing a line through it (1 px steps,
 * 40 px beyond the box): the invisible ::before/::after extensions count, a neighbour that
 * covers the area does not.
 */
const tooSmall = async (page: Page, label: string, scope = "") => {
  const areas = await page.evaluate((prefix) => {
    const root = document.querySelector("ha-klima-dashboard")!.shadowRoot!;
    const selector = ["button", "[role='button']", "a[href]", "[tabindex='0']"].map((item) => `${prefix} ${item}`.trim()).join(", ");
    const targets = [...root.querySelectorAll<HTMLElement>(selector)].filter(
      (element) =>
        !(element as HTMLButtonElement).disabled &&
        // A dimmed control (timer in Plán) is inert: nobody can touch it.
        !element.closest("[inert]") &&
        element.getBoundingClientRect().width > 0,
    );
    const hits = (element: HTMLElement, x: number, y: number) => {
      const hit = x < 0 || y < 0 || x >= innerWidth || y >= innerHeight ? null : root.elementFromPoint(x, y);
      return Boolean(hit && (hit === element || element.contains(hit)));
    };
    const extent = (element: HTMLElement, horizontal: boolean) => {
      const box = element.getBoundingClientRect();
      const [from, to] = horizontal ? [box.left - 40, box.right + 40] : [box.top - 40, box.bottom + 40];
      const fixed = horizontal ? box.top + box.height / 2 : box.left + box.width / 2;
      let [low, high] = [Infinity, -Infinity];
      for (let at = Math.floor(from); at <= Math.ceil(to); at += 1) {
        if (horizontal ? hits(element, at, fixed) : hits(element, fixed, at)) {
          low = Math.min(low, at);
          high = Math.max(high, at + 1);
        }
      }
      return high - low;
    };
    return targets.map((element) => {
      const box = element.getBoundingClientRect();
      const room = element.getAttribute("data-room");
      return {
        name: `${element.className.toString().replace(/\s+/g, ".")}${room ? `[${room}]` : ""}`,
        width: extent(element, true),
        height: extent(element, false),
        visible: box.top >= 0 && box.bottom <= innerHeight,
      };
    });
  }, scope);
  const visible = areas.filter((area) => area.visible);
  expect(visible.length, label).toBeGreaterThan(0);
  return visible.filter((area) => area.width < 43.5 || area.height < 43.5).map((area) => `${label}: ${JSON.stringify(area)}`);
};

/** Window rows: anything cut, and is the conflict dot on the visible (first) line of the row. */
const windowRows = (page: Page) =>
  page.locator(".slot-window").evaluateAll((items) =>
    items.map((item) => {
      const label = item.querySelector(".row-label")!;
      const text = item.querySelector(".row-text")!;
      const dot = item.querySelector(".conflict-dot")?.getBoundingClientRect();
      const line = text.getBoundingClientRect();
      return {
        cut: label.scrollWidth > label.clientWidth + 0.5 || text.scrollWidth > text.clientWidth + 0.5,
        dotHidden: dot ? dot.top >= line.bottom || dot.right > line.right + 0.5 : false,
        dot: Boolean(dot),
        text: item.textContent?.replace(/\s+/g, " ").trim(),
      };
    }),
  );

/** Colours of the temperature, the humidity and the status of every room (cause colouring). */
const causeColours = (page: Page) =>
  rooms(page).evaluateAll((items) =>
    items.map((room) => ({
      temperature: getComputedStyle(room.querySelector(".temperature")!).color,
      humidity: getComputedStyle(room.querySelector(".humidity")!).color,
      status: getComputedStyle(room.querySelector(".status-line span:last-child")!).color,
    })),
  );

/** History of the first room for the room history popup: [hours ago, state] per entity of the room. */
type History = Partial<Record<"temperature" | "climate" | "overlay" | "target", Array<[number, number | string]>>>;

/**
 * Opens the room history of Ložnice with `history` and reads the chart: the y of the temperature
 * curve and of the target line, how many pieces the target line has, its clipping, the axis
 * labels and the plot area.
 */
async function historyChart(page: Page, history: History) {
  await page.evaluate((samples) => {
    // @ts-expect-error test hook
    const test = window.__test;
    const now = Date.now() / 1000;
    const room = test.config.rooms[0];
    const ids: Record<string, string> = {
      temperature: room.temperature,
      climate: room.heating.climate,
      overlay: room.heating.overlay,
      target: room.heating.target,
    };
    test.historyFor = (id: string) => {
      const key = Object.keys(ids).find((name) => ids[name] === id);
      const list = key ? samples[key as keyof typeof samples] : undefined;
      return list?.map(([hoursAgo, state]) => ({ s: String(state), lu: now - hoursAgo * 3600 }));
    };
  }, history);
  await rooms(page).first().locator(".temperature").click();
  await expect(page.locator("svg.chart")).toBeVisible();
  const chart = await page.evaluate(() => {
    const svg = document.querySelector("ha-klima-dashboard")!.shadowRoot!.querySelector("svg.chart")!;
    const ys = (path: Element | undefined) => [...(path?.getAttribute("d") ?? "").matchAll(/[ML]([\d.]+) ([\d.]+)/g)].map((m) => Number(m[2]));
    const curve = [...svg.querySelectorAll("path")].find((path) => path.getAttribute("stroke-width") === "2");
    const target = [...svg.querySelectorAll("path")].find((path) => path.getAttribute("stroke-dasharray") === "3 3");
    const plot = svg.querySelector("clipPath#history-plot rect")!;
    return {
      curve: ys(curve),
      target: ys(target),
      targetPieces: (target?.getAttribute("d")?.match(/M/g) ?? []).length,
      targetClip: target?.getAttribute("clip-path"),
      labels: [...svg.querySelectorAll("text")].map((text) => text.textContent ?? "").filter((text) => text.endsWith("°")),
      top: Number(plot.getAttribute("y")),
      height: Number(plot.getAttribute("height")),
    };
  });
  expect(chart.curve.length, "křivka teploty").toBeGreaterThan(1);
  return chart;
}

// ------------------------------------------------------------- configuration

test.describe("konfigurace (CURRENT_SPEC.md, Konfigurace)", () => {
  test("příklad YAML obsahuje úplně všechna nastavení", async () => {
    // Every key of the configuration contract as a path; "[]" is an item of a list.
    const all = [
      "type", "title", "theme", "language", "house_mode_entity", "house_modes.winter", "house_modes.summer",
      ...["temperature", "minimum", "maximum", "rain_probability", "pm25"].map((key) => `outside.${key}`),
      ...["humidity_min", "humidity_max", "co2_warning", "co2_critical", "pm25_warning", "pm25_critical", "winter_min",
        "winter_max", "summer_min", "summer_max", "stale_minutes", "heating_waves_2", "heating_waves_3"].map((key) => `thresholds.${key}`),
      ...["minutes", "samples", "temperature_step", "co2_step", "pm25_step"].map((key) => `trends.${key}`),
      ...["hours", "night_start", "night_end", "min_temperature_span"].map((key) => `history.${key}`),
      "covers.script", "covers.tolerance", "covers.stall_seconds",
      ...["name", "icon", "position", "tilt", "description"].map((key) => `covers.presets[].${key}`),
      ...["name", "image", "link", "temperature", "humidity", "carbon_dioxide", "pm25", "window[].entity", "window[].name",
        "cover", "cover_presets", "thresholds", "heating.climate", "heating.overlay", "heating.target", "heating.intensity",
        "air_conditioner"].map((key) => `rooms[].${key}`),
    ];
    const leaves = (value: unknown, path = ""): string[] => {
      if (Array.isArray(value)) return value.flatMap((item) => leaves(item, `${path}[]`));
      if (value && typeof value === "object") {
        return Object.entries(value).flatMap(([key, item]) => leaves(item, path ? `${path}.${key}` : key));
      }
      return [path];
    };
    const found = new Set(leaves(example()));
    expect(all.filter((key) => !found.has(key)), "chybí v příkladu").toEqual([]);
    expect([...found].filter((key) => !all.includes(key)), "neznámé klíče").toEqual([]);
    // Every room lists every room key (an empty value is the default).
    for (const room of example().rooms as Array<Record<string, unknown>>) {
      expect(Object.keys(room), room.name as string).toEqual([
        "name", "image", "link", "temperature", "humidity", "carbon_dioxide", "pm25", "window", "cover",
        "cover_presets", "thresholds", "heating", "air_conditioner",
      ]);
    }
  });

  test("příklad YAML projde kontrolou a vypisuje přesně výchozí hodnoty", async ({ page }) => {
    await open(page, "full");
    const [explicit, implicit] = await page.evaluate((config) => {
      const normalized = (value: unknown) => {
        const card = document.createElement("ha-klima-dashboard") as unknown as { setConfig(value: unknown): void; _config: unknown };
        card.setConfig(value);
        return JSON.stringify(card._config);
      };
      // The same card without the listed defaults and without the pictures chosen by name.
      const bare = structuredClone(config);
      for (const key of ["theme", "language", "house_modes", "thresholds", "trends", "history", "covers"]) delete bare[key];
      for (const room of bare.rooms) delete room.image;
      return [normalized(config), normalized(bare)];
    }, example());
    expect(explicit).toEqual(implicit);
  });

  test("chybná hodnota zastaví kartu srozumitelnou chybou s názvem klíče; dosavadní konfigurace projde", async ({ page }) => {
    await open(page, "full");
    /** setConfig of a copy of the scenario config with `top` and `room` (Ložnice) patched; "" = accepted. */
    const configError = (top: Record<string, unknown>, room: Record<string, unknown>) =>
      page.evaluate(
        ([patch, roomPatch]) => {
          // @ts-expect-error test hook
          const config = structuredClone(window.__test.config);
          Object.assign(config, patch);
          Object.assign(config.rooms[0], roomPatch);
          try {
            (document.createElement("ha-klima-dashboard") as unknown as { setConfig(value: unknown): void }).setConfig(config);
            return "";
          } catch (error) {
            return (error as Error).message;
          }
        },
        [top, room] as const,
      );
    const preset = (extra: Record<string, unknown>) => [{ name: "X", position: 10, tilt: 0, ...extra }];
    const cases: Array<[Record<string, unknown>, Record<string, unknown>, RegExp]> = [
      [{ thresholds: { co2_warning: 1600 } }, {}, /co2_warning \(1600\) must be below co2_critical \(1500\)/],
      [{ thresholds: { co2_warnig: 900 } }, {}, /thresholds: unknown key "co2_warnig"/],
      [{ thresholds: { heating_waves_2: 70 } }, {}, /heating_waves_2 \(70\) must be below heating_waves_3 \(68\)/],
      [{ trends: { minutes: 5 } }, {}, /trends\.minutes must be a whole number from 10 to 1440/],
      [{ history: { hours: 0 } }, {}, /history\.hours must be a whole number from 1 to 168/],
      [{ theme: "blue" }, {}, /theme must be one of auto, dark, light/],
      [{ language: "de" }, {}, /language must be one of auto, cs, en, sv/],
      [{ house_modes: { winter: "Léto", summer: "leto" } }, {}, /must differ/],
      [{ covers: { presets: [...preset({}), ...preset({}), ...preset({}), ...preset({})] } }, {}, /covers\.presets must be a list of 1 to 3 presets/],
      [{ covers: { script: "zaluzie_posun" } }, {}, /covers\.script must be a script entity/],
      [{}, { cover_presets: preset({ position: 120 }) }, /cover_presets\[1\]\.position must be a number from 0 to 100/],
      [{}, { cover_presets: preset({ icon: "moon" }) }, /cover_presets\[1\]\.icon must be one of open, shade, dark/],
      [{}, { window: [] }, /window must not be an empty list/],
      [{}, { window: ["binary_sensor.a", "binary_sensor.a"] }, /lists binary_sensor\.a twice/],
      [{}, { windows: ["binary_sensor.a"] }, /the key is "window"/],
      [{}, { image: "javascript:alert(1)" }, /image must be one of bedroom, office, kids, living, none or an image address/],
      [{}, { image: "bedroom", scene: "office" }, /either image or scene/],
      [{}, { link: "lovelace/loznice" }, /link must be a Home Assistant path/],
      [{}, { carbon_dioxide: true }, /carbon_dioxide must be an entity ID/],
      [{}, { thresholds: { winter_min: 25 } }, /room "Ložnice"\.thresholds: winter_min \(25\) must be at most winter_max \(24\)/],
      [{}, { pocet_oken: 2 }, /room "Ložnice": unknown key "pocet_oken"/],
      [{}, { name: "Pracovna" }, /room name "Pracovna" is used twice/],
    ];
    for (const [top, room, message] of cases) {
      expect(await configError(top, room), JSON.stringify([top, room])).toMatch(message);
    }
    // Accepted: the older `scene`, one window as a text, `false` for a missing sensor, empty title,
    // a preset without a name (named after its icon in the card language), and a key without a
    // value (null in YAML), which is the default as in the example.
    const accepted: Array<[Record<string, unknown>, Record<string, unknown>]> = [
      [{}, { scene: "office" }],
      [{ language: "sv" }, { cover_presets: [{ position: 10, tilt: 0, icon: null }] }],
      [{}, { window: "binary_sensor.loznice_okno_loznice" }],
      [{}, { carbon_dioxide: false, pm25: false }],
      [{ title: "", theme: "light", trends: { minutes: 60 } }, { image: "/local/obrazky/loznice.jpg", link: "https://example.com" }],
      [{ title: null, theme: null, language: null, trends: { minutes: null }, covers: { presets: null, script: null }, outside: { pm25: null } },
        { link: null, cover_presets: null, thresholds: null, heating: null, image: null, scene: "office", carbon_dioxide: null }],
    ];
    for (const [top, room] of accepted) {
      expect(await configError(top, room), JSON.stringify([top, room])).toBe("");
    }
  });

  test("prahy, vlny topení a režim domu z konfigurace; prahy místnosti přepíšou společné", async ({ page }) => {
    await open(page, "config");
    // Maxík (22,4 °C) has winter_min 23 of its own: Chladno, and the temperature is blue; the others keep 20–24 °C.
    expect(tidy(await statuses(page))).toEqual(["Příjemné", "Příjemné", "Chladno", "Příjemné", "Příjemné"]);
    const wavesLit = () =>
      rooms(page).first().locator(".hvac .row-icon").first().evaluate((icon) =>
        [...icon.querySelectorAll("path")].filter((path) => getComputedStyle(path).stroke === "rgb(255, 159, 10)").length,
      );
    expect(await wavesLit()).toBe(1); // Ložnice 20 %: one wave by the default bands.
    await reconfigure(page, { thresholds: { heating_waves_2: 10, heating_waves_3: 15 }, house_modes: { winter: "Topná sezóna", summer: "Chladicí sezóna" } });
    expect(await wavesLit()).toBe(3);
    // The house mode now has other names: "Zima" is unknown (Bez dat), "Chladicí sezóna" is summer (Klimatizace first).
    await expect(page.locator(".status-line").first()).toContainText("Bez dat · režim domu");
    await setStates(page, { "input_select.house_mode": "Chladicí sezóna" });
    await expect(rooms(page).first().locator(".hvac .system-row").first()).toContainText("Vypnuto");
    await expect(rooms(page).first().locator(".hvac .system-row").nth(1)).toContainText("Plán");
  });

  test("místnost bez CO₂ a PM2.5 (false): bez řádků a bez „Bez dat“, ostatní řádky na stejném místě", async ({ page }) => {
    await open(page, "config");
    const pracovna = rooms(page).nth(1);
    await expect(pracovna.locator(".air-block")).toHaveCount(0);
    await expect(pracovna.locator(".status-line")).toContainText("Příjemné");
    // The rows below stay where they are in a room with both sensors (the same layout).
    const offsets = await rooms(page).evaluateAll((items) =>
      items.slice(0, 2).map((room) => {
        const lower = room.querySelector(".lower")!.getBoundingClientRect().top;
        return {
          hvac: room.querySelector(".hvac")!.getBoundingClientRect().top - lower,
          window: room.querySelector(".slot-window")!.getBoundingClientRect().top - lower,
          panel: room.querySelector(".cover-panel")!.getBoundingClientRect().height,
        };
      }),
    );
    expect(offsets[1]).toEqual(offsets[0]);
  });

  test("dvě okna: jeden řádek, „Otevřena 2“, nejdéle otevřené, neznámé „––“, popup Okna a souhrn počítá okna", async ({ page }) => {
    await page.clock.install();
    await open(page, "config");
    const row = rooms(page).first().locator(".slot-window");
    const okno = "binary_sensor.loznice_okno_loznice";
    const balkon = "binary_sensor.loznice_okno_balkon";
    await expect(row).toHaveText(/^\s*Zavřeno\s*$/);
    await expect(row).toHaveAccessibleDescription("Ložnice: všechna okna zavřená. Otevře přehled oken.");
    await setStates(page, { [balkon]: "on" });
    await page.clock.fastForward("05:00");
    // Ložnice heats (one wave): the conflict dot stands in place of the "·".
    await expect(row).toContainText(/^\s*Otevřeno\s*5 min/);
    await expect(row.locator(".conflict-dot")).toHaveCount(1);
    await expect(row).toHaveAccessibleDescription(/okno Balkon otevřené 5 minut; konflikt: otevřené okno při topení/);
    await setStates(page, { [okno]: "on" });
    // Two open: the count, and the time of the one open longest (Balkon).
    await expect(row).toContainText(/Otevřena\s2\s*5 min/);
    await expect(row).toHaveAccessibleDescription(/otevřená okna Okno, Balkon, nejdéle 5 minut/);
    // House summary counts windows, not rooms: 2 in Ložnice + 1 in Pracovna.
    const windowsChip = page.locator(".summary .chip").filter({ hasText: "okna otevřená" });
    await expect(windowsChip).toHaveText(/3 okna otevřená/);
    await expect(windowsChip).toHaveAttribute("aria-label", "Otevřená okna: Ložnice (2), Pracovna");
    // The popup lists both windows with their state; a row opens the window's own detail.
    await row.click();
    await expect(page.locator("#sheet-title")).toHaveText("Okna");
    const options = page.locator(".window-option");
    await expect(options).toHaveCount(2);
    await expect(options.nth(0)).toContainText(/Okno.*Otevřeno\s*·\s*< 1 min/s);
    await expect(options.nth(1)).toContainText(/Balkon.*Otevřeno\s*·\s*5 min/s);
    await options.nth(1).click();
    await expect(page.locator(".sheet")).toHaveCount(0);
    expect(await hook(page, "moreInfo")).toEqual([balkon]);
    // Unknown is never taken as closed: none open and one unavailable is "––".
    await setStates(page, { [okno]: "off", [balkon]: "unavailable" });
    await expect(row).toHaveText(/^\s*––\s*$/);
    await expect(row).toHaveAccessibleDescription(/stav oken neznámý/);
  });

  test("vlastní předvolby místnosti, tolerance a skript z konfigurace", async ({ page }) => {
    await open(page, "config");
    const presets = rooms(page).first().locator(".preset");
    await expect(presets).toHaveCount(2);
    await expect(presets.nth(0)).toHaveAttribute("title", "Ráno");
    await expect(presets.nth(1)).toHaveAccessibleName(/žaluzie Polostín, poloha 50 %, naklopení 60 %/);
    // Two presets share the height of the panel; each stays at least 44 px.
    const heights = await presets.evaluateAll((items) => items.map((item) => item.getBoundingClientRect().height));
    expect(Math.min(...heights)).toBeGreaterThanOrEqual(44);
    // covers.tolerance: 3 → 52 / 62 is still Polostín (50 / 60), 54 / 60 is not.
    await cover(page, "open", 52, 62);
    await expect(presets.nth(1)).toHaveAttribute("aria-pressed", "true");
    await cover(page, "open", 54, 60);
    await expect(presets.nth(1)).toHaveAttribute("aria-pressed", "false");
    // covers.script: a different script gets the same fields.
    await reconfigure(page, { covers: { script: "script.moje_zaluzie" } });
    await presets.nth(0).focus();
    await page.keyboard.press("Enter");
    expect(await hook(page, "services")).toEqual([["script", "moje_zaluzie", { entity: COVER, pos: 100, tilt: 100 }]]);
  });

  test("vlastní obrázek místnosti, odkaz z názvu, délka mikrotrendů a historie z konfigurace", async ({ page }) => {
    // A fixed morning: the last 12 h then hold the night 23–7 h (from 19 to 23 h they hold none).
    await page.clock.setFixedTime(new Date("2026-10-24T09:00:00+02:00"));
    await open(page, "config");
    const maxik = rooms(page).nth(2);
    await expect(maxik.locator(".scene.photo img")).toHaveAttribute("src", /^data:image\/svg\+xml,/);
    await expect(maxik.locator(".scene.photo img")).toHaveAttribute("alt", "");
    await expect(maxik.locator(".scene")).toHaveAttribute("aria-hidden", "true");
    // The picture fades out like the illustration and does not cover the values.
    expect((await measureLayout(page)).rooms.flatMap((room) => room.overlaps.map((what) => `${room.name}: ${what}`))).toEqual([]);
    // trends: 60 min, 7 samples; history 12 h (texts for screen readers too).
    const points = await rooms(page).first().locator(".slot-co2 polyline").getAttribute("points");
    expect(points?.trim().split(/\s+/)).toHaveLength(7);
    await expect(rooms(page).first().locator(".trend-button")).toHaveAccessibleName(
      /teplota za 1 hodinu (stoupá|klesá|stabilní), historie místnosti za 12 hodin/,
    );
    // The link does not move the status line: the header is as tall as in a room without one.
    const statusTops = await rooms(page).evaluateAll((items) =>
      items.slice(0, 2).map((room) => room.querySelector(".status-line")!.getBoundingClientRect().top - room.getBoundingClientRect().top),
    );
    expect(statusTops[0]).toBeCloseTo(statusTops[1], 0);
    const link = rooms(page).first().locator(".room-link");
    await expect(link).toHaveAccessibleName("Ložnice");
    await expect(link).toHaveAccessibleDescription("Otevře stránku místnosti.");
    await link.click();
    expect(await hook(page, "actions")).toEqual([
      { config: { tap_action: { action: "navigate", navigation_path: "/lovelace/loznice" } }, action: "tap" },
    ]);
    // history: 12 h, night 23–7 h.
    await rooms(page).first().locator(".temperature").click();
    await expect(page.locator("#sheet-title")).toHaveText("Historie místnosti – 12 h");
    await expect(page.locator(".chart .night")).toHaveCount(1);
    await expect(page.locator(".chart-wrap")).toHaveAccessibleName(/^Graf za 12 hodin\./);
    // In the evening the last 12 h hold no night.
    await page.clock.setFixedTime(new Date("2026-10-24T21:00:00+02:00"));
    await open(page, "config");
    await rooms(page).first().locator(".temperature").click();
    await expect(page.locator(".chart .temperature-curve")).toHaveCount(1);
    await expect(page.locator(".chart .night")).toHaveCount(0);
    // The chart has no legend under it (TODO P1.9.3): the values are in the readout above.
    await expect(page.locator(".legend")).toHaveCount(0);
  });
});

// -------------------------------------------------------------------- layout

test.describe("rozložení na všech šířkách (Room Card, Dashboard Domov)", () => {
  // [width, height]; the harness adds 16 px of body margin, so the card is `width − 16` px wide:
  // one column up to 619 px of card width, two from 620 px, three from 1000 px, four from 1400 px
  // (the card is no wider than 2300 px).
  const phones = WIDTHS.map((width) => [width, 852] as const);
  const landscape = [852, 393] as const;
  const SIZES: Record<string, ReadonlyArray<readonly [number, number]>> = {
    real: [...phones, landscape],
    full: [
      ...phones,
      ...[600, 635, 636, 720, 734, 852, 1015, 1016, 1200, 1415, 1416, 1600, 2000, 2560].map((width) => [width, 852] as const),
      landscape,
    ],
    summer: phones,
    alarm: [...phones, landscape],
    longnames: [...phones, ...[636, 734, 852].map((width) => [width, 852] as const), landscape],
    stale: phones,
  };

  for (const [scenario, sizes] of Object.entries(SIZES)) {
    test(`${scenario}: bez vodorovného posouvání, sloupce, úzký režim, cíle, trendy, ilustrace`, async ({ page }) => {
      for (const [width, height] of sizes) {
        await open(page, scenario, width, height);
        const layout = await measureLayout(page);
        const at = `${scenario} ${width} × ${height}`;
        expect(layout.scrollWidth, at).toBeLessThanOrEqual(width);
        // One column below 620 px of card width, two from 620 px, three from 1000 px, four from 1400 px.
        const columns = new Set(layout.cells.map((cell) => cell.left)).size;
        const expected = layout.dashboard >= 1400 ? 4 : layout.dashboard >= 1000 ? 3 : layout.dashboard >= 620 ? 2 : 1;
        expect(columns, `${at}, karta ${layout.dashboard} px`).toBe(expected);
        expect(layout.dashboard, `${at}: nejvýš 2300 px`).toBeLessThanOrEqual(2300);
        if (columns > 1) {
          // Equally wide rooms (no wider than 570 px), rows from left to right and top to bottom, the last row starts on the left.
          const cells = layout.cells;
          expect(cells, at).toHaveLength(5);
          expect(new Set(cells.map((cell) => cell.width)).size, `${at}: šířky`).toBe(1);
          expect(cells[0].width, `${at}: šířka místnosti`).toBeLessThanOrEqual(570);
          cells.forEach((cell, index) => {
            const first = cells[index - (index % columns)];
            expect(cell.top, `${at}: řádek místnosti ${index}`).toBe(first.top);
            expect(cell.left, `${at}: sloupec místnosti ${index}`).toBe(cells[index % columns].left);
            if (index >= columns) {
              expect(cell.top).toBeGreaterThan(cells[index - columns].top);
            }
          });
          const lastColumn = cells[columns - 1];
          expect(lastColumn.left + lastColumn.width, "pravý okraj nepřesahuje kartu (zaokrouhlení na px)").toBeLessThanOrEqual(cells[0].left + layout.dashboard + 1);
        }
        // The narrow variables follow the width of the room, not of the display.
        const first = layout.rooms[0];
        expect(first.col, `${at}: místnost ${first.width} px`).toBe(first.width <= 364 ? "52px" : "60px");
        // The illustration never covers the humidity or the room name (TODO P2.12).
        expect(layout.rooms.flatMap((room) => room.overlaps.map((what) => `${room.name}: ${what}`)), at).toEqual([]);
        // Values and units of CO₂ / PM2.5 stay on one line, nothing is cut (TODO P2.12).
        if (width === 320) {
          const rows = layout.rooms.flatMap((room) => room.airRows);
          if (scenario !== "summer") expect(rows.length, at).toBeGreaterThan(0);
          expect(rows.filter((row) => !row.sameLine || row.cut), at).toEqual([]);
        }
        // The CO₂ / PM2.5 trend begins under the end of the value and its unit, never with a hole (TODO P1.10.1).
        if (scenario === "alarm") {
          const starts = layout.rooms.flatMap((room) => room.trendStarts);
          expect(starts.length, at).toBeGreaterThan(4);
          expect(starts.filter((item) => item.gap > 0), at).toEqual([]);
        }
        if (scenario === "full") {
          for (const room of layout.rooms) {
            // Topení + Klimatizace: one target ≥ 44 px over at least the whole left column (TODO P1.5).
            expect(room.hvac.height, `${at}: ${room.name}`).toBeGreaterThanOrEqual(44);
            expect(room.hvac.short, `${at}: ${room.name}`).toBeLessThanOrEqual(0.5);
            // The illustration ends at least 22 px above the blind panel.
            if (room.drawingAbovePanel !== undefined) expect(room.drawingAbovePanel, `${at}: ${room.name}`).toBeGreaterThanOrEqual(22);
          }
          // Presets right of the panel, as tall as it, top to bottom Den, Stín, Tma.
          expect(first.presets!.gap, at).toBeGreaterThanOrEqual(0);
          expect(Math.abs(first.presets!.top) + Math.abs(first.presets!.bottom), at).toBeLessThan(1);
          expect(first.presets!.titles).toEqual(["Den", "Stín", "Tma"]);
          // The end of the trend is 1,5 × the panel–preset gap away from the panel.
          const { trend, preset } = first.trendEnd!;
          expect(Math.abs(trend - 1.5 * preset), `${at}: ${JSON.stringify(first.trendEnd)}`).toBeLessThan(0.7);
        }
      }
    });
  }

  test("iPhone 14 Pro na šířku (852 × 393): popupy Topení / Klimatizace a historie se vejdou na výšku", async ({ page }) => {
    await open(page, "full", 852, 393);
    for (const [trigger, name] of [[".hvac", "Topení / Klimatizace"], [".temperature", "historie"]] as const) {
      await openPopup(page, trigger);
      const box = await page.locator(".sheet").boundingBox();
      expect(box!.y, `${name}: začátek popupu`).toBeGreaterThanOrEqual(0);
      expect(box!.y + box!.height, `${name}: konec popupu`).toBeLessThanOrEqual(393);
      await closePopup(page);
    }
  });

  test("všechny klikací prvky karty i popupů mají cíl aspoň 44 × 44 px (TODO P1.2)", async ({ page }) => {
    // Cards: narrow to wide, open windows with the time and the conflict dot, two columns, and the
    // room link, two presets and two windows of the configuration scenario.
    for (const [scenario, width] of [["full", 320], ["full", 393], ["full", 430], ["alarm", 393], ["full", 734], ["config", 320], ["config", 393]] as const) {
      await open(page, scenario, width, 3200);
      expect(await tooSmall(page, `${scenario} ${width}`)).toEqual([]);
    }
    // Popups: Topení / Klimatizace, Kvalita vzduchu, Historie, and Okna of the two windows.
    for (const [scenario, triggers] of [["full", [".slot-hvac", ".air-block", ".trend-button"]], ["config", [".slot-window"]]] as const) {
      await open(page, scenario, 393, 852);
      for (const trigger of triggers) {
        await openPopup(page, trigger);
        expect(await tooSmall(page, trigger, ".sheet")).toEqual([]);
        await closePopup(page);
      }
    }
  });
});

// ---------------------------------------------------------------- scenarios

test.describe("scénáře: stav místnosti, souhrn, barvy a konflikty (Stavový systém, Chybějící data, Konflikty)", () => {
  test("real: přímo příklad YAML, Bez dat s důvodem, CO₂ / PM2.5 podle čidel", async ({ page }) => {
    await open(page, "real");
    expect(await hook(page, "config")).toEqual(example());
    await expect(rooms(page)).toHaveCount(5);
    expect(tidy(await statuses(page))).toEqual([
      "Bez dat · režim domu",
      "Bez dat · CO₂",
      "Bez dat · teplota",
      "Bez dat · teplota",
      "Bez dat · teplota",
    ]);
    // Obývák has no CO₂ / PM2.5 sensor (false): no rows; a sensor only missing from the
    // configuration keeps its rows ("––"), and without any entity the block is inactive.
    await expect(rooms(page).nth(4).locator(".air-block")).toHaveCount(0);
    await expect(rooms(page).nth(3).locator(".air-block")).toHaveCount(1);
    await expect(rooms(page).nth(1).locator(".air-block")).toBeDisabled();
    // With a single sensor the block opens its detail at once (no popup).
    await reconfigure(page, {}, { 0: { pm25: undefined } });
    await rooms(page).first().locator(".air-block").click();
    await expect(page.locator(".sheet")).toHaveCount(0);
    expect(await hook(page, "moreInfo")).toEqual([CO2]);
  });

  test("full: Příjemné, 11 lamel podle polohy a naklopení, písmo hodnot", async ({ page }) => {
    await open(page, "full");
    expect(tidy(await statuses(page))).toEqual(Array(5).fill("Příjemné"));
    const slats = await rooms(page).evaluateAll((items) =>
      items.slice(0, 3).map((room) => {
        const rects = [...room.querySelectorAll(".cover-panel rect:not(.rail)")];
        // The colour is a CSS variable in the style (dark theme: champagne blind, sky window).
        const by = (colour: string) =>
          rects.filter((slat) => getComputedStyle(slat).fill === colour).map((slat) => +slat.getAttribute("height")!);
        return { count: rects.length, blind: by("rgb(232, 217, 181)"), window: by("rgb(100, 210, 255)") };
      }),
    );
    // Ložnice 0 / 0: all 11 lowered, nearly solid.
    expect(slats[0].count).toBe(11);
    expect(slats[0].blind).toHaveLength(11);
    expect(Math.min(...slats[0].blind)).toBeGreaterThan(11);
    // Pracovna 100 / 100: all 11 are the window, 2 px lines.
    expect(slats[1].window).toEqual(Array(11).fill(2));
    // Maxík 40 / 60: 7 lowered slats of the same tilt, 4 window slats still 2 px.
    expect(slats[2].blind).toHaveLength(7);
    expect(new Set(slats[2].blind).size).toBe(1);
    expect(slats[2].blind[0]).toBeGreaterThan(5);
    expect(slats[2].window).toEqual(Array(4).fill(2));
    // CO₂ and PM2.5 numbers are as heavy as "Plán" (500), the unit stays regular.
    const weights = await rooms(page).first().evaluate((room) => {
      const weight = (selector: string) => getComputedStyle(room.querySelector(selector)!).fontWeight;
      return {
        co2: weight(".slot-co2 .row-label"),
        pm25: weight(".slot-pm25 .row-label"),
        plan: weight(".hvac .system-row.strong .row-label"),
        unit: weight(".slot-co2 .row-unit"),
      };
    });
    expect(weights).toEqual({ co2: "500", pm25: "500", plan: "500", unit: "400" });
  });

  test("alarm: stavy, souhrn s konflikty na začátku, barva čísel a hodnot, které určily stav", async ({ page }) => {
    await open(page, "alarm");
    expect(tidy(await statuses(page)).slice(0, 3)).toEqual(["Silně vydýchaný vzduch", "Znečištěný vzduch", "Vlhko"]);
    // Conflicts (open window while heating) come first, then the usual house summary (TODO P2.14).
    const chips = tidy(await page.locator(".summary .chip").allInnerTexts());
    expect(chips[0]).toMatch(/^Okno otevřené · topí se: /);
    expect(chips.slice(1)).toEqual(["5 oken otevřených", "Ručně: 5 místností", "Topí 3 místnosti"]);
    // Ložnice, Maxík and Obývák heat with the window open: a dot at the window, "konflikt" for the screen reader.
    await expect(page.locator(".conflict-dot")).toHaveCount(3);
    await expect(page.locator(".slot-window").first()).toHaveAccessibleDescription(/konflikt: otevřené okno při topení/);
    await expect(rooms(page).first().locator(".slot-co2 .row-label")).toHaveCSS("color", "rgb(255, 69, 58)");
    // The value that turned Příjemné into another status takes its colour (TODO P2.15).
    const colours = await causeColours(page);
    const neutral = colours[3]; // Mikuláš is calm
    expect(neutral.temperature).not.toBe(neutral.status);
    // Maxík: humidity 76 % -> "Vlhko": the humidity takes the status colour, the temperature stays neutral.
    expect(colours[2].humidity).toBe(colours[2].status);
    expect(colours[2].humidity).not.toBe(neutral.humidity);
    expect(colours[2].temperature).toBe(neutral.temperature);
    // Ložnice / Pracovna: the cause is CO₂ / PM2.5, so temperature and humidity stay neutral.
    for (const index of [0, 1]) {
      expect(colours[index].temperature).toBe(neutral.temperature);
      expect(colours[index].humidity).toBe(neutral.humidity);
    }
  });

  test("summer: pořadí řádků, Chladno, souhrn klimatizace a konflikty chlazení", async ({ page }) => {
    await open(page, "summer");
    expect(tidy(await statuses(page))[1]).toBe("Chladno");
    await expect(rooms(page).first().locator(".hvac .system-row").first()).toContainText("WindFree Sleep");
    await expect(page.locator(".summary .chip").last()).toHaveText("Klimatizace: Ložnice, Pracovna");
    // Pracovna is "Chladno": the temperature takes the status colour, the humidity stays neutral.
    const colours = await causeColours(page);
    expect(colours[1].temperature).toBe(colours[1].status);
    expect(colours[1].humidity).toBe(colours[3].humidity);
    // The HVAC text may run into the trend: "WindFree · 22 °C" stays whole on 393 px (TODO P1.1).
    const row = rooms(page).nth(1).locator(".hvac .system-row").first();
    await expect(row).toContainText("WindFree");
    expect(
      await row.evaluate((element) => element.querySelector(".row-unit")!.getBoundingClientRect().top - element.querySelector(".row-label")!.getBoundingClientRect().top > 2),
    ).toBe(false);
    // An open window with cooling is reported once; with the window closed it is "cooling although cold".
    const chips = tidy(await page.locator(".summary .chip").allInnerTexts());
    expect(chips).toContain("Okno otevřené · chladí se: Pracovna");
    expect(chips.join("|")).not.toContain("i když je chladno");
    await setStates(page, { "binary_sensor.pracovna_okno_pracovna": "off" });
    await expect(page.locator(".summary .chip").first()).toHaveText(/Chladí se, i když je chladno: Pracovna/);
  });

  test("PM2.5 se hlásí jen při změně: čerstvé CO₂ ze stejného čidla drží PM2.5 čerstvé, bez něj zastarává", async ({ page }) => {
    await open(page, "stale");
    // Ložnice: PM2.5 unchanged for 3 h, CO₂ fresh → no "Bez dat", no clock, in the card and in the popup "Kvalita vzduchu".
    await expect(rooms(page).first().locator(".status-line")).not.toContainText("Bez dat");
    await expect(rooms(page).first().locator(".slot-pm25 .stale-mark")).toHaveCount(0);
    await rooms(page).first().locator(".air-block").click();
    await expect(page.locator(".list-option").nth(1).locator(".stale-mark, .sr-only")).toHaveCount(0);
    await closePopup(page);
    // The same Ložnice without a CO₂ sensor has no device to vouch for the PM2.5, which is stale after 30 minutes.
    await reconfigure(page, {}, { 0: { carbon_dioxide: false } });
    expect(tidy(await statuses(page))[0]).toBe("Bez dat · PM2.5 (před 3 h)");
    await expect(rooms(page).first().locator(".slot-pm25 .stale-mark")).toHaveCount(1);
  });

  test("stale: šedá hodnota a důvod ve stavu, bez konfliktu (TODO P2.3)", async ({ page }) => {
    await open(page, "stale");
    const list = tidy(await statuses(page));
    // Ložnice: PM2.5 has not changed for 3 h, but the CO₂ of the same ALPSTUGA reports: the device is alive, nothing is stale.
    expect(list[0]).not.toMatch(/Bez dat/);
    expect(list[1]).toBe("Bez dat · teplota (před 3 h)");
    await expect(rooms(page).nth(1).locator(".temperature")).toHaveClass(/stale/);
    expect(await rooms(page).first().locator(".slot-pm25").evaluate((row) => row.hasAttribute("title"))).toBe(false);
    await expect(rooms(page).first().locator(".slot-pm25 .row-label")).not.toHaveText("––");
    await expect(page.locator(".conflict-dot")).toHaveCount(0);
    // A small grey clock at every stale value (TODO P2.21): none in Ložnice (fresh CO₂ keeps the PM2.5 fresh), Pracovna at all four
    // (there the CO₂ is stale too).
    await expect(rooms(page).first().locator(".stale-mark")).toHaveCount(0);
    await expect(rooms(page).nth(1).locator(".slot-pm25")).toHaveAttribute("title", "Naposledy před 3 h");
    const pracovna = rooms(page).nth(1);
    for (const where of [".temperature", ".humidity", ".slot-co2", ".slot-pm25"]) {
      await expect(pracovna.locator(`${where} .stale-mark`), where).toHaveCount(1);
    }
    await expect(pracovna.locator(".stale-mark").first()).toHaveAttribute("aria-hidden", "true");
    // The clock takes no room: the number and the humidity stay where they are (the picture keeps its place).
    const clockBox = await pracovna.locator(".temperature .stale-mark").boundingBox();
    const valueBox = await pracovna.locator(".temperature").boundingBox();
    expect(clockBox!.x + clockBox!.width, "hodiny uvnitř tlačítka teploty").toBeLessThanOrEqual(valueBox!.x + valueBox!.width + 0.5);
    // Maxík measures 0 µg/m³ (clean air) and has not reported for 3 h: that is neither "Bez dat" nor stale.
    expect(list[2]).toBe("Příjemné");
    const maxik = rooms(page).nth(2);
    await expect(maxik.locator(".slot-pm25 .row-label")).toHaveText("0");
    await expect(maxik.locator(".stale-mark")).toHaveCount(0);
    expect(await maxik.locator(".slot-pm25").evaluate((row) => row.hasAttribute("title"))).toBe(false);
    expect(await maxik.locator(".slot-pm25 .row-label").evaluate((label) => getComputedStyle(label).color)).not.toBe(
      await pracovna.locator(".slot-pm25 .row-label").evaluate((label) => getComputedStyle(label).color),
    );
  });

  test("rest-error, unavailable, moving: bez REST nic zastaralého, nedostupné ikony zůstanou, kolejnice pulzuje", async ({ page }) => {
    await open(page, "rest-error");
    expect(tidy(await statuses(page))).toEqual(Array(5).fill("Příjemné"));
    await open(page, "unavailable");
    expect(tidy(await statuses(page))).toEqual(Array(5).fill("Bez dat · teplota"));
    await expect(rooms(page).first().locator('.cover-panel rect[stroke-dasharray="3 3"]')).toHaveCount(1);
    // A blind on the move: its top rail pulses (TODO P2.6).
    await open(page, "moving");
    await expect(rooms(page).first().locator(".cover-panel")).toHaveClass(/moving/);
  });
});

// ------------------------------------------------------------ accessibility

test.describe("přístupnost", () => {
  /** What each popup shows once it is ready. */
  const POPUP_CONTENT: Record<string, string> = {
    ".air-block": ".list-options",
    ".hvac": ".hvac-panel",
    ".temperature": ".readout",
    ".slot-window": ".list-options",
  };

  for (const theme of ["dark", "light"] as const) {
    test(`axe (${theme}): karta, všechny popupy a hláška bez porušení (kontrast textu 4,5 : 1)`, async ({ page }) => {
      for (const scenario of ["full", "alarm", "config"]) {
        await open(page, scenario, 393, 852, theme);
        await expect(page.locator("ha-klima-dashboard")).toHaveAttribute("data-theme", theme);
        expect(await axeViolations(page), `${scenario}`).toEqual([]);
        if (scenario === "full") continue;
        // Popups of Ložnice: red values on the lighter popup ground (alarm), Plán and the two windows (config).
        for (const trigger of [".air-block", ".hvac", ".temperature", ...(scenario === "config" ? [".slot-window"] : [])]) {
          await openPopup(page, trigger);
          // Check the loaded content, not the placeholder (the history chart loads asynchronously).
          await expect(page.locator(POPUP_CONTENT[trigger])).toBeVisible();
          expect(await axeViolations(page), `${scenario} ${trigger}`).toEqual([]);
          await closePopup(page);
        }
      }
      // The error at the button after a failed blind script.
      await page.evaluate(() => {
        // @ts-expect-error test hook
        window.__test.failNext = true;
      });
      await rooms(page).first().locator(".preset").first().focus();
      await page.keyboard.press("Enter");
      await expect(page.locator(".preset-hint.error")).toBeVisible();
      expect(await axeViolations(page), "chyba u tlačítka").toEqual([]);
    });
  }

  test("název bloku CO₂ / PM2.5 a tlačítka Topení / Klimatizace = viditelný text, kontext v popisu (TODO P1.2, P1.6)", async ({ page }) => {
    await open(page, "full");
    const block = page.locator(".air-block").first();
    await expect(block).toHaveAccessibleName(/^656\s+ppm\s+2\s+µg\/m³$/);
    await expect(block).toHaveAccessibleDescription(/^Ložnice: kvalita vzduchu, CO₂ 656 ppm, za 2 hodiny .*; PM2\.5 2 µg\/m³.*Otevře detaily\.$/);
    const hvac = page.locator(".hvac").first();
    await expect(hvac).toHaveAccessibleName(/^Plán · 21 °C\s+Vypnuto$/);
    await expect(hvac).toHaveAccessibleDescription("Ložnice: Topení Plán 21 °C, Klimatizace Vypnuto. Otevře ovládání Topení.");
  });

  test("klávesnice: popup, šipky v přepínači, past na Tab a návrat fokusu (TODO P3.8)", async ({ page }) => {
    await open(page, "full");
    const hvac = page.locator(".hvac").first();
    await hvac.focus();
    await page.keyboard.press("Enter");
    await expect(page.locator(".sheet .option[aria-pressed='true']")).toBeFocused();
    await page.locator('.segment[data-system="heating"]').focus();
    await page.keyboard.press("ArrowRight");
    await expect(page.locator('.segment[data-system="climate"]')).toBeFocused();
    await expect(page.locator('.segment[data-system="climate"]')).toHaveAttribute("aria-selected", "true");
    await expect(page.locator(".hvac-panel")).toHaveAttribute("aria-labelledby", "tab-climate");
    await page.keyboard.press("Home");
    await expect(page.locator('.segment[data-system="heating"]')).toBeFocused();
    for (let i = 0; i < 12; i += 1) {
      await page.keyboard.press("Tab");
      const inside = await page.evaluate(() => {
        const card = document.querySelector("ha-klima-dashboard")!.shadowRoot!;
        return Boolean(card.activeElement?.closest(".sheet"));
      });
      expect(inside).toBe(true);
    }
    await closePopup(page);
    await expect(hvac).toBeFocused();
  });
});

// ------------------------------------------------------------------- colours

test.describe("světlý a tmavý režim, barvy (Barvy)", () => {
  test("auto podle Home Assistantu (bez obnovení stránky), dark / light vynutí, bez údaje podle systému", async ({ page }) => {
    const theme = () => page.locator("ha-klima-dashboard");
    const roomLook = () =>
      rooms(page).first().evaluate((room) => ({ background: getComputedStyle(room).backgroundColor, color: getComputedStyle(room).color }));
    await open(page, "full");
    await expect(theme()).toHaveAttribute("data-theme", "dark");
    // The dark theme is the existing palette, unchanged.
    expect(await roomLook()).toEqual({ background: "rgba(0, 0, 0, 0)", color: "rgb(255, 255, 255)" });
    await page.evaluate(() => {
      // @ts-expect-error test hook
      window.__test.setDarkMode(false);
    });
    await expect(theme()).toHaveAttribute("data-theme", "light");
    expect(await roomLook()).toEqual({ background: "rgb(255, 255, 255)", color: "rgb(28, 28, 30)" });
    // theme: dark wins over a light Home Assistant.
    await reconfigure(page, { theme: "dark" });
    await expect(theme()).toHaveAttribute("data-theme", "dark");
    // Without the dark mode from Home Assistant: the system colour scheme, live.
    await reconfigure(page, { theme: "auto" });
    await page.evaluate(() => {
      // @ts-expect-error test hook
      window.__test.dropThemes();
    });
    await page.emulateMedia({ colorScheme: "light" });
    await expect(theme()).toHaveAttribute("data-theme", "light");
    await page.emulateMedia({ colorScheme: "dark" });
    await expect(theme()).toHaveAttribute("data-theme", "dark");
  });

  for (const [theme, ground, airContrast] of [["dark", "rgb(28, 28, 30)", 6], ["light", "rgb(255, 255, 255)", 4.5]] as const) {
    test(`${theme}: ikony předvoleb aspoň 3 : 1, svítící se liší; CO₂ a PM2.5 tlumené, čitelné a každá jinou barvou`, async ({ page }) => {
      await open(page, "full", 393, 852, theme);
      const colours = await rooms(page).first().evaluate((room) => {
        const colour = (selector: string) => getComputedStyle(room.querySelector(selector)!).color;
        return {
          presets: [...room.querySelectorAll(".preset")].map((preset) => ({
            on: preset.getAttribute("aria-pressed") === "true",
            color: getComputedStyle(preset).color,
          })),
          co2: [colour(".slot-co2 .row-icon"), colour(".slot-co2 .spark")],
          pm25: [colour(".slot-pm25 .row-icon"), colour(".slot-pm25 .spark")],
        };
      });
      // Ložnice 0 / 0: exactly one preset (Tma) is lit; it differs from the others and is no pure white.
      const lit = colours.presets.filter((preset) => preset.on).map((preset) => preset.color);
      const idle = colours.presets.filter((preset) => !preset.on).map((preset) => preset.color);
      expect(lit).toHaveLength(1);
      expect(idle).not.toContain(lit[0]);
      expect(lit[0]).not.toBe("rgb(255, 255, 255)");
      for (const preset of colours.presets) {
        expect(contrast(preset.color, ground), JSON.stringify(preset)).toBeGreaterThanOrEqual(3);
      }
      if (theme === "dark") expect(contrast(lit[0], ground)).toBeGreaterThan(contrast(idle[0], ground));
      // CO₂ and PM2.5: the icon and the trend in the same colour, different from each other,
      // muted (saturation up to 40 %) and readable.
      expect(colours.co2[0]).toBe(colours.co2[1]);
      expect(colours.pm25[0]).toBe(colours.pm25[1]);
      expect(colours.co2[0]).not.toBe(colours.pm25[0]);
      for (const colour of [colours.co2[0], colours.pm25[0]]) {
        expect(saturation(colour), colour).toBeLessThanOrEqual(0.4);
        expect(contrast(colour, ground), colour).toBeGreaterThanOrEqual(airContrast);
      }
    });
  }
});

// ------------------------------------------------------------------- blinds

test.describe("předvolby žaluzií (Žaluzie)", () => {
  test("ikony předvoleb jsou tlumené; ta, která odpovídá stavu žaluzie (Den, Stín i Tma, tolerance ±5 %), jen změní barvu", async ({ page }) => {
    await open(page, "full");
    // The icon colour fades (a CSS transition), so wait until it has settled before reading it.
    const looks = async () => {
      await settle(page);
      return rooms(page).evaluateAll((items) =>
        items.slice(0, 4).map((room) =>
          [...room.querySelectorAll(".preset")].map((preset) => {
            const style = getComputedStyle(preset);
            const before = getComputedStyle(preset, "::before");
            // Colour, state, and nothing painted behind or around the icon (the ::before is only
            // the invisible touch-area extension).
            return `${style.color}|${preset.getAttribute("aria-pressed")}|${style.backgroundColor}|${style.borderTopWidth}|${before.backgroundColor}|${before.boxShadow}|${before.borderTopWidth}`;
          }),
        ),
      );
    };
    const plain = "rgba(0, 0, 0, 0)|0px|rgba(0, 0, 0, 0)|none|0px";
    const lit = `rgb(201, 192, 168)|true|${plain}`;
    const dim = `rgb(111, 111, 116)|false|${plain}`;
    let state = await looks();
    expect(state[0]).toEqual([dim, dim, lit]); // Ložnice 0 / 0 = Tma
    expect(state[1]).toEqual([lit, dim, dim]); // Pracovna 100 / 100 = Den
    expect(state[2]).toEqual([dim, dim, dim]); // Maxík 40 / 60: žádná předvolba
    expect(state[3]).toEqual([dim, lit, dim]); // Mikuláš 0 / 100 = Stín
    // Stín also when the blind reports "closed" (position 0, slats open) and within the 5 % tolerance:
    // the real blind rises 3-4 % when its slats open (0 / 0, then 4 / 100).
    for (const [value, position, tilt] of [["closed", 0, 100], ["open", 0, 100], ["closed", 2, 98], ["open", 4, 100], ["open", 5, 95]] as const) {
      await cover(page, value, position, tilt);
      state = await looks();
      expect(state[0], `${value} ${position}/${tilt}`).toEqual([dim, lit, dim]);
    }
    // Beyond the tolerance no preset is lit (a custom position).
    await cover(page, "open", 6, 100);
    expect((await looks())[0]).toEqual([dim, dim, dim]);
  });

  test("po odeslání pulzuje cílová ikona, ostatní zhasnou; po dojezdu svítí natrvalo", async ({ page }) => {
    await open(page, "full");
    const room = rooms(page).first();
    const den = room.locator(".preset").nth(0);
    await den.dblclick();
    await expect(den).toHaveClass(/pending/);
    await expect(den).toHaveAttribute("aria-busy", "true");
    // Tma (the state before sending) is no longer lit; only the target pulses.
    await expect(room.locator('.preset[aria-pressed="true"]')).toHaveCount(0);
    expect(await den.evaluate((element) => getComputedStyle(element).animationName)).toBe("preset-tint");
    // The blind is moving: still pulsing.
    await cover(page, "opening", 55, 60);
    await expect(den).toHaveClass(/pending/);
    // Arrived: no pulsing, steady lit colour.
    await cover(page, "open", 100, 100);
    await expect(den).not.toHaveClass(/pending/);
    await expect(den).toHaveAttribute("aria-pressed", "true");
    await expect(den).not.toHaveAttribute("aria-busy", "true");
    await expect.poll(() => den.evaluate((element) => getComputedStyle(element).color)).toBe("rgb(201, 192, 168)");
  });

  test("zastaví-li se změna na 5 s, pulzování skončí; každá změna odpočet obnoví", async ({ page }) => {
    await page.clock.install({ time: new Date("2026-10-24T10:00:00Z") });
    await open(page, "full");
    await page.clock.pauseAt(new Date("2026-10-24T10:01:00Z"));
    const room = rooms(page).first();
    const den = room.locator(".preset").nth(0);
    await den.dblclick();
    await expect(den).toHaveClass(/pending/);
    await page.clock.runFor(3_000);
    await expect(den).toHaveClass(/pending/);
    // The blind moves: the countdown starts again, so 6 s after sending it still pulses.
    await cover(page, "opening", 20, 0);
    await page.clock.runFor(3_000);
    await expect(den).toHaveClass(/pending/);
    // Nothing changes for 5 s (stopped somewhere else): the pulsing ends, nothing is lit.
    await page.clock.runFor(2_500);
    await expect(den).not.toHaveClass(/pending/);
    await expect(room.locator('.preset[aria-pressed="true"]')).toHaveCount(0);
  });

  test("žaluzie už v poloze předvolby: nic nepulzuje; chyba skriptu pulzování ukončí", async ({ page }) => {
    await open(page, "full");
    const room = rooms(page).first();
    // Ložnice is already in Tma.
    await room.locator(".preset").nth(2).dblclick();
    await expect.poll(async () => (await hook<unknown[]>(page, "services")).length).toBe(1);
    await expect(room.locator(".preset.pending")).toHaveCount(0);
    await expect(room.locator(".preset").nth(2)).toHaveAttribute("aria-pressed", "true");
    // A failing script: the pulse ends, failure haptic, the error at the pressed button (TODO P2.18).
    await page.evaluate(() => {
      // @ts-expect-error test hook
      window.__test.failNext = true;
    });
    await room.locator(".preset").nth(0).dblclick();
    const failed = room.locator(".preset").nth(0);
    await expect(failed).toHaveClass(/failed/);
    await expect(failed.locator(".preset-hint.error")).toHaveText(/Nepodařilo se odeslat/);
    await expect(failed.locator(".preset-hint.error")).toHaveAttribute("role", "alert");
    await expect(failed.locator(".preset-hint.error .sr-only")).toHaveText("Ložnice: skript žaluzií se nepodařilo spustit.");
    // Only that button is marked; nothing appears above the cards any more.
    await expect(page.locator(".preset.failed")).toHaveCount(1);
    await expect(page.locator(".notice")).toHaveCount(0);
    await expect(room.locator(".preset.pending")).toHaveCount(0);
    expect(await hook(page, "haptics")).toContain("failure");
    // The red ring is a visible border of the button.
    expect(await failed.evaluate((element) => getComputedStyle(element).boxShadow)).not.toBe("none");
  });

  test("myš: klepnutí ukáže nápovědu, dvojklik odešle skript", async ({ page }) => {
    await open(page, "full");
    const preset = page.locator(".preset").nth(1);
    await preset.click();
    await expect(page.locator(".preset-hint")).toHaveText("Podržte nebo klepněte dvakrát");
    expect([await hook(page, "haptics"), (await hook<unknown[]>(page, "services")).length]).toEqual([["selection"], 0]);
    await page.waitForTimeout(1_700);
    await preset.dblclick();
    await expect.poll(() => hook(page, "services")).toEqual([["script", "zaluzie_posun", { entity: COVER, pos: 0, tilt: 100 }]]);
    expect(await hook(page, "haptics")).toEqual(["selection", "success"]);
  });

  test.describe("dotyk", () => {
    test.use({ hasTouch: true, isMobile: true });

    test("dlouhý stisk odešle skript i při pohybu prstu", async ({ page, context }) => {
      await open(page, "full");
      const cdp = await context.newCDPSession(page);
      const [x, y] = await centre(page, ".preset", 0);
      await touch(cdp, "touchStart", x, y);
      await page.waitForTimeout(200);
      await touch(cdp, "touchMove", x + 6, y + 4);
      await page.waitForTimeout(500);
      await touch(cdp, "touchEnd");
      // The first (top) preset is Den: raised, slats open.
      await expect.poll(() => hook(page, "services")).toEqual([["script", "zaluzie_posun", { entity: COVER, pos: 100, tilt: 100 }]]);
    });
  });

  test("nedostupná žaluzie: předvolby šedé, nic neodešlou, vysvětlí proč (TODO P2.17)", async ({ page }) => {
    await open(page, "cover-unavailable");
    const presets = rooms(page).first().locator(".preset");
    await expect(presets).toHaveCount(3);
    for (let i = 0; i < 3; i += 1) {
      await expect(presets.nth(i)).toHaveAttribute("aria-disabled", "true");
      await expect(presets.nth(i)).toHaveClass(/unavailable/);
    }
    // aria-disabled keeps the button tappable (a finger can tap it); Playwright needs force.
    await presets.nth(0).dblclick({ force: true });
    await expect(page.locator(".preset-hint")).toHaveText("Žaluzie je nedostupná");
    await presets.nth(2).focus();
    await page.keyboard.press("Enter");
    expect(await hook<unknown[]>(page, "services")).toHaveLength(0);
    expect(await hook(page, "haptics")).toContain("warning");
  });
});

// ------------------------------------------------------------------ history

test.describe("historie místnosti (Historie a grafy)", () => {
  test("otevření, prohlížení myší a klávesnicí, překreslení po otočení (TODO P3.10)", async ({ page }) => {
    await open(page, "full");
    await rooms(page).first().locator(".temperature").click();
    await expect(page.locator("#sheet-title")).toHaveText("Historie místnosti – 24 h");
    await expect(page.locator(".readout-time")).toHaveText("Teď");
    const chart = page.locator("svg.chart");
    await expect(chart).toHaveAttribute("width", "361");
    const box = (await chart.boundingBox())!;
    await page.mouse.move(box.x + box.width * 0.5, box.y + 60);
    await expect(page.locator(".readout-time")).not.toHaveText("Teď");
    await page.mouse.move(box.x + box.width * 0.5, box.y - 200);
    await expect(page.locator(".readout-time")).toHaveText("Teď");
    await page.locator(".chart-wrap").focus();
    await page.keyboard.press("ArrowLeft");
    await expect(page.locator(".readout-time")).not.toHaveText("Teď");
    await page.keyboard.press("End");
    await expect(page.locator(".readout-time")).toHaveText("Teď");
    // The chart is drawn at the popup width and follows a rotation or a resize.
    await page.setViewportSize({ width: 700, height: 852 });
    await expect(chart).toHaveAttribute("width", "428");
  });

  test("popup se zavře tažením dolů (TODO P2.11)", async ({ page }) => {
    await open(page, "full");
    await rooms(page).first().locator(".hvac").click();
    const [x, y] = await centre(page, ".sheet-top");
    await page.mouse.move(x, y);
    await page.mouse.down();
    await page.mouse.move(x, y + 60, { steps: 5 });
    await page.mouse.move(x, y + 200, { steps: 5 });
    await page.mouse.up();
    await expect(page.locator(".sheet")).toHaveCount(0);
  });

  test("osa teploty podle naměřené teploty, ne cíle; plochá křivka aspoň 1,5 °C; cíl 5 °C při Vypnuto se nekreslí", async ({ page }) => {
    await open(page, "full");
    const day: Array<[number, number]> = [20.2, 20.9, 21.4, 21.9, 22.0, 21.6, 21.9].map((value, i) => [24 - i * 4, value]);
    // 20,2–22,0 °C with the target at 18 °C for a while: the curve fills the plot, the target is clipped.
    let chart = await historyChart(page, { temperature: day, target: [[24, 21], [16, 18], [8, 21]] });
    expect((Math.max(...chart.curve) - Math.min(...chart.curve)) / chart.height).toBeGreaterThan(0.85);
    expect(Math.min(...chart.curve)).toBeGreaterThanOrEqual(chart.top);
    expect(Math.max(...chart.curve)).toBeLessThanOrEqual(chart.top + chart.height);
    // Labels lie within the measured range, in cs-CZ with half degrees: 20,5° … 22°, nothing like 4°.
    expect(chart.labels).toEqual(["20,5°", "21°", "21,5°", "22°"]);
    expect(chart.targetClip).toBe("url(#history-plot)");
    expect(Math.max(...chart.target)).toBeGreaterThan(chart.top + chart.height);
    await closePopup(page);
    // A flat measurement is not stretched to noise: the axis spans at least 1,5 °C.
    chart = await historyChart(page, { temperature: [21.0, 21.1, 21.0, 21.1, 21.0].map((value, i) => [24 - i * 6, value]) });
    expect((Math.max(...chart.curve) - Math.min(...chart.curve)) / chart.height).toBeLessThan(0.15);
    await closePopup(page);
    // Off from 17 h to 14 h ago; the target entity flips 3 s before / after the mode entity, so for
    // 3 s the mode is still Plán while the target is already 5 °C (and the other way round).
    const seconds = 1 / 3600;
    chart = await historyChart(page, {
      temperature: day,
      climate: [[24, "auto"], [17, "off"], [14, "auto"]],
      overlay: [[24, "Schedule"]],
      target: [[24, 21], [17 + 3 * seconds, 5], [14 - 3 * seconds, 21]],
    });
    // One level only (21 °C, two pieces around the off period), no step down to 5 °C.
    expect(new Set(chart.target.map((y) => Math.round(y))).size).toBe(1);
    expect(chart.targetPieces).toBe(2);
  });

  test("den změny času 25. 10.: noc 22–6 h je 9 h, popisky v celých hodinách", async ({ page }) => {
    const measure = async (when: string) => {
      await page.clock.setFixedTime(new Date(when));
      await open(page, "full");
      await rooms(page).first().locator(".temperature").click();
      await expect(page.locator("svg.chart")).toBeVisible();
      return page.locator("svg.chart").evaluate((chart) => ({
        ticks: [...chart.querySelectorAll("text")].map((text) => text.textContent ?? "").filter((text) => text.includes(":")),
        nights: [...chart.querySelectorAll("rect.night")].map((rect) => Number(rect.getAttribute("width"))),
      }));
    };
    const shifted = await measure("2026-10-25T10:00:00+01:00");
    const normal = await measure("2026-10-24T10:00:00+02:00");
    expect(shifted.ticks).toEqual(["12:00", "18:00", "00:00", "06:00"]);
    expect(normal.ticks).toEqual(["12:00", "18:00", "00:00", "06:00"]);
    expect(shifted.nights[0] / normal.nights[0]).toBeCloseTo(9 / 8, 1);
  });
});

// ---------------------------------------------------------- air and window

test.describe("kvalita vzduchu, okno a hlavička (Room Card, Vizuální pravidla, Dashboard Domov)", () => {
  test("blok CO₂ / PM2.5 otevře popup Kvalita vzduchu a z něj detail každé veličiny", async ({ page }) => {
    await open(page, "full");
    await rooms(page).first().locator(".air-block").click();
    const options = page.locator(".list-option");
    await expect(options).toHaveCount(2);
    await expect(options.nth(0)).toContainText("CO₂");
    await expect(options.nth(0).locator(".list-value")).toHaveText("656 ppm");
    await expect(options.nth(1).locator(".list-value")).toHaveText("2 µg/m³");
    await options.nth(0).click();
    await expect(page.locator(".sheet")).toHaveCount(0);
    expect(await hook(page, "moreInfo")).toEqual([CO2]);
  });

  test("doba otevření okna: slabě za popiskem, sama se posouvá a mění jednotky, po zavření od nuly", async ({ page }) => {
    await page.clock.install();
    await open(page, "full");
    const row = (index = 1) => rooms(page).nth(index).locator(".slot-window");
    // Pracovna: window open for 3 minutes (the scenario's default age); the others are closed.
    await expect(row()).toContainText(/Otevřeno\s*·\s*3 min/);
    await expect(row()).toHaveAccessibleName(/^Otevřeno\s*·\s*3 min$/);
    await expect(row()).toHaveAccessibleDescription(/^Pracovna: okno otevřené, otevřené 3 minuty\. Otevře detail a historii\.$/);
    await expect(row(0)).toHaveText(/^\s*Zavřeno\s*$/);
    // Faint: the duration is in the secondary grey and regular weight, the label stays the sky colour.
    const look = await row().evaluate((element) => {
      const label = getComputedStyle(element.querySelector(".row-label")!);
      const duration = getComputedStyle(element.querySelector(".window-duration")!);
      return { label: label.color, duration: duration.color, weight: duration.fontWeight };
    });
    expect(look.duration).not.toBe(look.label);
    expect(look.duration).toBe("rgb(154, 154, 160)");
    expect(look.weight).toBe("400");
    // Every half minute the time moves on and changes its units.
    await page.clock.fastForward("01:02:00");
    await expect(row()).toContainText(/Otevřeno\s*·\s*1 h 5 min/);
    await expect(row()).toHaveAccessibleDescription(/otevřené 1 hodina 5 minut/);
    await page.clock.fastForward("23:00:00");
    await expect(row()).toContainText(/Otevřeno\s*·\s*1 d\s*$/);
    // Closing and opening again starts from zero.
    await setStates(page, { "binary_sensor.pracovna_okno_pracovna": "off" });
    await expect(row()).toHaveText(/^\s*Zavřeno\s*$/);
    await setStates(page, { "binary_sensor.pracovna_okno_pracovna": "on" });
    await expect(row()).toContainText(/Otevřeno\s*·\s*< 1 min/);
  });

  test("doba otevření se vejde i na 320 px s tečkou konfliktu a nic se neořízne", async ({ page }) => {
    await open(page, "alarm", 320);
    const rows = await windowRows(page);
    expect(rows.filter((row) => row.cut || row.dotHidden)).toEqual([]);
    // With a conflict the dot stands right after the label, in place of the "·" before the time.
    expect(rows[0]).toMatchObject({ dot: true, text: "Otevřeno 3 min" });
    expect(rows.find((row) => !row.dot)?.text).toBe("Otevřeno · 3 min");
    // Two open windows and a conflict on the narrowest card: the time may give way, the dot never.
    await open(page, "config", 320);
    await setStates(page, { "binary_sensor.loznice_okno_loznice": "on", "binary_sensor.loznice_okno_balkon": "on" });
    await expect(rooms(page).first().locator(".slot-window .row-label")).toHaveText("Otevřena 2");
    expect((await windowRows(page))[0]).toMatchObject({ cut: false, dot: true, dotHidden: false });
  });

  test("title: \"\" vynechá nadpis; bez štítků a venkovních podmínek zmizí celá hlavička (TODO P3.11)", async ({ page }) => {
    await open(page, "full");
    const setTitle = (names: string[] | undefined) =>
      page.evaluate((kept) => {
        // @ts-expect-error test hook
        const { card, config } = window.__test;
        const list = kept ? config.rooms.filter((room: { name: string }) => kept.includes(room.name)) : config.rooms;
        card.setConfig({ ...config, title: "", rooms: list });
      }, names);
    // "full" has summary chips (an open window, heating): the heading goes, the chips stay.
    await setTitle(undefined);
    await expect(page.locator("h1")).toHaveCount(0);
    await expect(page.locator(".summary .chip").first()).toBeVisible();
    // Mikuláš alone: nothing differs from a quiet house, so there is no header at all.
    await setTitle(["Mikuláš"]);
    await expect(rooms(page)).toHaveCount(1);
    await expect(page.locator(".dashboard-header")).toHaveCount(0);
    // The default title is still "Domov".
    await reconfigure(page, { title: undefined });
    await expect(page.locator("h1")).toHaveText("Domov");
  });
});

// ---------------------------------------------------------------- languages

/**
 * Arguments the dictionary functions are called with: every plural form, both flags, every state
 * and system they choose by. Texts are digits, so an echoed argument adds no word.
 */
const SAMPLES: unknown[][] = [
  [1, 1, 1, 1],
  [2, 2, 2, 2],
  [5, 5, 5, 5],
  ["1", undefined, undefined, undefined],
  ["1", "2", "3", true],
  ["open", "2", "heating", false],
  ["closed", "2", "climate", true],
  ["unknown", undefined, undefined, false],
];
/** Words that only echo a sample argument, also glued to a unit ("°Cheating"). */
const ECHO = /undefined|true|false|open|closed|unknown|heating|climate/;

/** Every word a dictionary can produce: its texts, and its functions called with the samples. */
function dictionaryWords(dictionary: object): Set<string> {
  const words = new Set<string>();
  const walk = (value: unknown): void => {
    if (typeof value === "string") {
      for (const word of value.toLowerCase().match(/\p{L}+/gu) ?? []) {
        if (word.length > 1 && !ECHO.test(word)) words.add(word);
      }
    } else if (typeof value === "function") {
      for (const args of SAMPLES) walk((value as (...args: unknown[]) => unknown)(...args));
    } else if (value && typeof value === "object") {
      Object.values(value).forEach(walk);
    }
  };
  walk(dictionary);
  return words;
}

/** Words that are the same in Czech and in English or Swedish (checked by hand). */
const SHARED_WORDS = new Set(["auto", "boost", "ce", "co", "data", "den", "end", "konflikt", "minut", "pm", "tado", "windfree"]);

/** Czech words: none of them may appear on a Swedish or English card. */
const CZECH_ONLY = [...dictionaryWords(cs)].filter((word) => !SHARED_WORDS.has(word));

/** Czech words and letters in a text of the card (the Swedish å, ä and ö are not among them). */
function czech(text: string): string[] {
  const words = new Set(text.toLowerCase().match(/\p{L}+/gu) ?? []);
  return [...CZECH_ONLY.filter((word) => words.has(word)), ...new Set(text.match(/[ěščřžůúýáíéťďň]/giu) ?? [])];
}

/** Everything the card shows or says: its text, aria-label, title and alt, an open popup included. */
const cardText = (page: Page) =>
  page.evaluate(() => {
    const root = document.querySelector("ha-klima-dashboard")!.shadowRoot!;
    const parts: string[] = [];
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT);
    for (let node = walker.nextNode(); node; node = walker.nextNode()) {
      if (node instanceof Text) {
        if (node.parentElement?.tagName !== "STYLE") parts.push(node.data);
      } else {
        for (const name of ["aria-label", "title", "alt"]) {
          const value = (node as Element).getAttribute(name);
          if (value) parts.push(value);
        }
      }
    }
    return parts.join(" | ");
  });

/**
 * The scenario with neutral names (R1 …, windows and presets without names, no title) and the
 * outdoor conditions on, so every text on the card comes from the card itself.
 */
async function neutralCard(page: Page): Promise<void> {
  await page.evaluate(() => {
    // @ts-expect-error test hook
    const { card, config } = window.__test;
    const rooms = config.rooms.map((room: Record<string, unknown>, index: number) => ({
      ...room,
      name: `R${index + 1}`,
      window: [room.window].flat().map((window) => (typeof window === "string" ? window : (window as { entity: string }).entity)),
      cover_presets: (room.cover_presets as Array<Record<string, unknown>> | undefined)?.map(
        ({ name: _name, description: _description, ...preset }) => preset,
      ),
    }));
    const sensor = (slug: string, kind: string) => `sensor.${slug}_teplomer_${slug}_${kind}`;
    card.setConfig({
      ...config,
      title: undefined,
      rooms,
      outside: {
        temperature: sensor("loznice", "temperature"),
        minimum: sensor("pracovna", "temperature"),
        maximum: sensor("obyvak", "temperature"),
        rain_probability: sensor("loznice", "humidity"),
        pm25: sensor("pracovna", "pm2_5"),
      },
    });
  });
  await expect(page.locator(".spark.loading")).toHaveCount(0);
}

test.describe("jazyky (CURRENT_SPEC.md, Jazyky)", () => {
  test("slovníky: angličtina a švédština nemají žádné české slovo ani prázdný text", async () => {
    const empty = (value: unknown, path: string): string[] =>
      typeof value === "string"
        ? value.trim() || path.endsWith("percentSpace") ? [] : [path]
        : value && typeof value === "object"
          ? Object.entries(value).flatMap(([key, item]) => empty(item, `${path}.${key}`))
          : [];
    for (const [name, dictionary] of [["en", en], ["sv", sv]] as const) {
      const words = dictionaryWords(dictionary);
      expect(CZECH_ONLY.filter((word) => words.has(word)), name).toEqual([]);
      expect(empty(dictionary, name), name).toEqual([]);
    }
  });

  test("jazyk podle Home Assistantu: čeština, švédština, jinak angličtina; language v YAML ho vynutí; přepne se bez obnovení", async ({ page }) => {
    const look = async () => [
      await page.locator("ha-klima-dashboard").getAttribute("lang"),
      await page.locator("h1").textContent(),
      tidy(await statuses(page))[0],
    ];
    // A frontend that reports no language: English.
    await open(page, "full", 393, 852, "dark", "");
    expect(await look()).toEqual(["en", "Home", "Comfortable"]);
    // The user switches the language in the profile: the card follows without a reload.
    for (const [tag, expected] of [
      ["sv", ["sv", "Hem", "Behagligt"]],
      ["de", ["en", "Home", "Comfortable"]],
      ["en-GB", ["en", "Home", "Comfortable"]],
      ["cs", ["cs", "Domov", "Příjemné"]],
    ] as const) {
      await page.evaluate((language) => {
        // @ts-expect-error test hook
        window.__test.setLanguage(language);
      }, tag);
      await expect.poll(look, tag).toEqual(expected);
    }
    // `language` in the YAML wins over Home Assistant (now Czech); `auto` follows it again.
    await reconfigure(page, { language: "sv" });
    await expect.poll(look).toEqual(["sv", "Hem", "Behagligt"]);
    await reconfigure(page, { language: "auto" });
    await expect.poll(look).toEqual(["cs", "Domov", "Příjemné"]);
  });

  const EXPECTED = {
    sv: {
      title: "Hem",
      status: "Behagligt",
      temperature: "21,3 °C",
      humidity: "52 %",
      outside: ["21 °C · 20–23 °C · ☂ 52 %", "Utomhusluft: bra"],
      heating: "Schema · 21 °C",
      window: "Öppet · 3 min",
      presets: ["Dag", "Skugga", "Mörker"],
      hvac: "R1: Värme Schema 21 °C, Luftkonditionering Av. Öppnar styrningen av värmen.",
      windowDescription: "R2: fönstret öppet i 3 minuter. Öppnar detaljer och historik.",
      systems: ["Värme", "Luftkonditionering"],
      air: "Luftkvalitet",
      history: "Rumshistorik – 24 h",
      now: "Nu",
      windows: ["Fönster 1", "Fönster 2"],
      openCount: "2 öppna",
      bothOpen: /^R1: fönstren Fönster 1, Fönster 2 öppna, längst i mindre än en minut; konflikt: öppet fönster under uppvärmning\. Öppnar fönsteröversikten\.$/,
    },
    en: {
      title: "Home",
      status: "Comfortable",
      temperature: "21.3 °C",
      humidity: "52%",
      outside: ["21 °C · 20–23 °C · ☂ 52%", "Outdoor air: good"],
      heating: "Schedule · 21 °C",
      window: "Open · 3 min",
      presets: ["Day", "Shade", "Dark"],
      hvac: "R1: Heating Schedule 21 °C, Air conditioning Off. Opens the heating controls.",
      windowDescription: "R2: window open for 3 minutes. Opens details and history.",
      systems: ["Heating", "Air conditioning"],
      air: "Air quality",
      history: "Room history – 24 h",
      now: "Now",
      windows: ["Window 1", "Window 2"],
      openCount: "2 open",
      bothOpen: /^R1: windows Window 1, Window 2 open, the longest for less than a minute; conflict: window open while heating\. Opens the window overview\.$/,
    },
  };

  for (const language of ["sv", "en"] as const) {
    test(`${language}: karta a všechny popupy přeložené, čísla podle jazyka, žádný český text`, async ({ page }) => {
      const expected = EXPECTED[language];
      /** No Czech word or letter in what the card shows and says right now. */
      const noCzech = async (where: string) => expect(czech(await cardText(page)), `${language}, ${where}`).toEqual([]);
      const load = async (scenario: string) => {
        await open(page, scenario, 393, 852, "dark", language);
        await neutralCard(page);
      };

      // The card: title, header, statuses, values in the number format of the language, rows, presets.
      await load("full");
      const first = rooms(page).first();
      await expect(page.locator("h1")).toHaveText(expected.title);
      expect(tidy(await page.locator(".outside > div").allInnerTexts())).toEqual(expected.outside);
      expect(tidy(await statuses(page))).toEqual(Array(5).fill(expected.status));
      await expect(first.locator(".temperature")).toHaveText(expected.temperature);
      await expect(first.locator(".humidity")).toHaveText(expected.humidity);
      await expect(first.locator(".hvac .system-row").first()).toHaveText(expected.heating);
      await expect(first.locator(".hvac")).toHaveAccessibleDescription(expected.hvac);
      await expect(rooms(page).nth(1).locator(".slot-window")).toHaveText(expected.window);
      await expect(rooms(page).nth(1).locator(".slot-window")).toHaveAccessibleDescription(expected.windowDescription);
      expect(await first.locator(".preset").evaluateAll((items) => items.map((item) => item.getAttribute("title")))).toEqual(
        expected.presets,
      );
      await noCzech("karta");

      // Popups: Topení and Klimatizace, air quality, room history (also yesterday, no data, an error).
      await openPopup(page, ".hvac");
      expect(tidy(await page.locator(".segment").allInnerTexts())).toEqual(expected.systems);
      await noCzech("Topení");
      await page.locator(".option").nth(2).click();
      await expect(page.locator(".timer-card")).toBeVisible();
      await noCzech("Topení: teplota a doba");
      await page.locator(".segment").nth(1).click();
      await noCzech("Klimatizace");
      await closePopup(page);
      await openPopup(page, ".air-block");
      await expect(page.locator("#sheet-title")).toHaveText(expected.air);
      await noCzech("Kvalita vzduchu");
      await closePopup(page);
      await openPopup(page, ".temperature");
      await expect(page.locator("#sheet-title")).toHaveText(expected.history);
      await expect(page.locator(".readout-time")).toHaveText(expected.now);
      await expect(page.locator(".legend")).toHaveCount(0);
      await page.locator(".chart-wrap").focus();
      await page.keyboard.press("Home");
      await expect(page.locator(".readout-time")).not.toHaveText(expected.now);
      await noCzech("Historie místnosti");
      await closePopup(page);
      for (const history of ["empty", "error"]) {
        await page.evaluate((kind) => {
          // @ts-expect-error test hook
          window.__test.historyFor = () => {
            if (kind === "error") throw new Error("history failed");
            return [];
          };
        }, history);
        await openPopup(page, ".temperature");
        await expect(page.locator(".sheet-message")).toBeVisible();
        await noCzech(`historie: ${history}`);
        await closePopup(page);
      }
      // The hint after a single tap on a preset, and the error at the button after a failed blind script.
      await first.locator(".preset").first().click();
      await expect(page.locator(".preset-hint")).toBeVisible();
      await noCzech("nápověda předvolby");
      await page.evaluate(() => {
        // @ts-expect-error test hook
        window.__test.failNext = true;
      });
      await first.locator(".preset").first().focus();
      await page.keyboard.press("Enter");
      await expect(page.locator(".preset-hint.error")).toBeVisible();
      await noCzech("chyba předvolby");

      // The other scenarios: alarm values and conflicts, summer, stale and unavailable data.
      await load("alarm");
      await noCzech("poplach");
      await openPopup(page, ".air-block");
      await noCzech("poplach: Kvalita vzduchu");
      await closePopup(page);
      await load("summer");
      await noCzech("léto");
      await openPopup(page, ".hvac");
      await noCzech("léto: Klimatizace");
      await closePopup(page);
      await load("stale");
      await expect(page.locator(".temperature.stale")).toHaveCount(1);
      await noCzech("zastaralá data");
      await load("unavailable");
      await noCzech("nedostupné");
      await openPopup(page, ".hvac");
      await noCzech("nedostupné: Topení");
      await closePopup(page);
      await rooms(page).first().locator(".preset").first().click({ force: true });
      await expect(page.locator(".preset-hint")).toBeVisible();
      await noCzech("nedostupná žaluzie");
      // Two windows without names and presets without names (config).
      await load("config");
      await noCzech("konfigurace");
      await openPopup(page, ".slot-window");
      expect(tidy(await page.locator(".window-option .option-text > span:first-child").allInnerTexts())).toEqual(expected.windows);
      await noCzech("Okna");
      await closePopup(page);
      // Both windows open: the count on the row, the names and the longest time in its description.
      await setStates(page, { "binary_sensor.loznice_okno_loznice": "on", "binary_sensor.loznice_okno_balkon": "on" });
      const windowRow = rooms(page).first().locator(".slot-window");
      await expect(windowRow.locator(".row-label")).toHaveText(expected.openCount);
      await expect(windowRow).toHaveAccessibleDescription(expected.bothOpen);
      await noCzech("dvě otevřená okna");
    });
  }

  for (const [language, theme] of [["sv", "dark"], ["en", "light"]] as const) {
    test(`${language}: delší texty se vejdou na všech šířkách, axe bez porušení (${theme})`, async ({ page }) => {
      const sizes = [
        ["full", 320, 852], ["full", 393, 852], ["full", 852, 393], ["summer", 320, 852], ["summer", 393, 852],
        ["alarm", 320, 852], ["longnames", 320, 852], ["config", 320, 852],
      ] as const;
      for (const [scenario, width, height] of sizes) {
        await open(page, scenario, width, height, theme, language);
        const at = `${language} ${scenario} ${width} × ${height}`;
        const layout = await measureLayout(page);
        expect(layout.scrollWidth, at).toBeLessThanOrEqual(width);
        expect(layout.rooms.flatMap((room) => room.overlaps.map((what) => `${room.name}: ${what}`)), at).toEqual([]);
        expect(layout.rooms.flatMap((room) => room.airRows).filter((row) => !row.sameLine || row.cut), at).toEqual([]);
        expect((await windowRows(page)).filter((row) => row.cut || row.dotHidden), at).toEqual([]);
        // A summary chip wider than the card wraps its text instead of sticking out.
        const outside = await page.locator(".summary .chip").evaluateAll((chips) =>
          chips
            .filter((chip) => {
              const card = chip.closest(".dashboard")!.getBoundingClientRect();
              const box = chip.getBoundingClientRect();
              return box.left < card.left - 0.5 || box.right > card.right + 0.5;
            })
            .map((chip) => chip.textContent?.trim()),
        );
        expect(outside, at).toEqual([]);
      }
      // Popups on the narrowest phone: the switch, the options, the readout fit.
      await open(page, "full", 320, 852, theme, language);
      expect(await axeViolations(page), language).toEqual([]);
      for (const trigger of [".hvac", ".temperature"]) {
        await openPopup(page, trigger);
        await expect(page.locator(trigger === ".hvac" ? ".hvac-panel" : ".readout")).toBeVisible();
        const cut = await page.evaluate(() => {
          const sheet = document.querySelector("ha-klima-dashboard")!.shadowRoot!.querySelector(".sheet")!;
          const right = sheet.getBoundingClientRect().right;
          return [...sheet.querySelectorAll<HTMLElement>("h2, .segment, .option, .readout-system, .sheet-link")]
            .filter((element) => element.scrollWidth > element.clientWidth + 0.5 || element.getBoundingClientRect().right > right + 0.5)
            .map((element) => element.textContent?.trim());
        });
        expect(cut, `${language} ${trigger}`).toEqual([]);
        expect(await axeViolations(page), `${language} ${trigger}`).toEqual([]);
        await closePopup(page);
      }
    });
  }
});

// ---------------------------------------------- summary, compact room, formats

test.describe("souhrn a zkrácená místnost (Dashboard Domov, Room Card)", () => {
  /** Lit waves of the heating icon in the "Topí" chip and in the first row of every room. */
  const litWaves = (page: Page) =>
    page.evaluate(() => {
      const root = document.querySelector("ha-klima-dashboard")!.shadowRoot!;
      const chip = [...root.querySelectorAll<HTMLElement>(".chip")].find((item) => /Topí/.test(item.textContent ?? ""));
      if (!chip) return undefined;
      const probe = document.createElement("span");
      probe.style.color = chip.style.getPropertyValue("--chip-color");
      // The colour is a variable of the card (var(--kd-warning)): resolve it inside the card.
      root.querySelector(".dashboard")!.append(probe);
      const warning = getComputedStyle(probe).color;
      probe.remove();
      const lit = (icon: Element | null) =>
        [...(icon?.querySelectorAll("path") ?? [])].filter((path) => getComputedStyle(path).stroke === warning).length;
      return {
        chip: lit(chip.querySelector(".chip-icon svg")),
        text: chip.textContent?.replace(/\s+/g, " ").trim(),
        rooms: [...root.querySelectorAll(".room")].map((room) => lit(room.querySelector(".hvac .row-icon svg"))),
      };
    });

  test("ikona souhrnu Topí ukazuje nejsilnější topení ze všech místností, text počet místností (TODO P2.16)", async ({ page }) => {
    await open(page, "full");
    // The harness heats Ložnice at 20 %, Maxík at 60 % and Obývák at 90 %: 1, 2 and 3 waves.
    expect(await litWaves(page)).toEqual({ chip: 3, text: "Topí 3 místnosti", rooms: [1, 0, 2, 0, 3] });
    const heating = (slug: string, value: number) => ({
      [`sensor.${slug}_tado_ce_${slug}_heating`]: { state: String(value), attributes: {} },
    });
    const update = (changes: Record<string, unknown>) =>
      page.evaluate((next) => {
        // @ts-expect-error test hook
        window.__test.update(next);
      }, changes);
    // The strongest room cools down to 2 waves: the chip follows, still three rooms heating.
    await update(heating("obyvak", 40));
    await expect.poll(() => litWaves(page).then((facts) => facts?.chip)).toBe(2);
    expect((await litWaves(page))?.text).toBe("Topí 3 místnosti");
    // Everywhere one wave: one wave in the chip.
    await update({ ...heating("maxik", 10), ...heating("obyvak", 10) });
    await expect.poll(() => litWaves(page).then((facts) => facts?.chip)).toBe(1);
    // One room with two waves and another with one: two waves, two rooms.
    await update({ ...heating("loznice", 0), ...heating("maxik", 50), ...heating("obyvak", 0) });
    await expect.poll(() => litWaves(page)).toEqual({ chip: 2, text: "Topí 1 místnost", rooms: [0, 0, 2, 0, 0] });
    await update({ ...heating("obyvak", 20) });
    await expect.poll(() => litWaves(page)).toEqual({ chip: 2, text: "Topí 2 místnosti", rooms: [0, 0, 2, 0, 1] });
  });

  test("místnost bez žaluzie, CO₂ a PM2.5 je o 64 px kratší; v řádku s jinými je stejně vysoká (TODO P1.10.8)", async ({ page }) => {
    const measure = () =>
      rooms(page).evaluateAll((items) =>
        items.map((item) => ({ compact: item.classList.contains("compact"), height: Math.round(item.getBoundingClientRect().height), top: Math.round(item.getBoundingClientRect().top) })),
      );
    // One column: Obývák (no blind, no CO₂, no PM2.5) is 64 px shorter; Pracovna has a blind and no air rows: not shortened.
    await open(page, "config", 393, 852);
    let heights = await measure();
    expect(heights.map((room) => room.compact)).toEqual([false, false, false, false, true]);
    expect(heights[3].height - heights[4].height).toBe(64);
    expect(heights[1].height, "Pracovna s žaluzií zůstává stejně vysoká").toBe(heights[3].height);
    await expect(rooms(page).nth(4).locator(".air-block")).toHaveCount(0);
    // The Topení, Klimatizace and window rows move up by the three empty rows.
    const rowTops = await rooms(page).evaluateAll((items) =>
      items.map((item) => Math.round(item.querySelector(".hvac")!.getBoundingClientRect().top - item.getBoundingClientRect().top)),
    );
    expect(rowTops[3] - rowTops[4]).toBe(64);
    // Three columns: Mikuláš and Obývák are one row, the short one stretches to the height of its neighbour.
    await open(page, "config", 1100, 852);
    heights = await measure();
    expect(heights[3].top).toBe(heights[4].top);
    expect(heights[4].height).toBe(heights[3].height);
  });
});

test.describe("formáty čísel, času a data z profilu Home Assistantu (TODO P1.10.13)", () => {
  const setLocale = (page: Page, changes: Record<string, string>) =>
    page.evaluate((next) => {
      // @ts-expect-error test hook
      window.__test.setLocale(next);
    }, changes);
  const clean = (text: string | null) => (text ?? "").replace(/\s+/g, " ").trim();
  const temperature = async (page: Page) => clean(await rooms(page).first().locator(".temperature").textContent());
  const humidity = async (page: Page) => clean(await rooms(page).first().locator(".humidity").textContent());

  test("formát čísel: jazyk, pevné formáty, systém a žádný; procenta podle jazyka; CO₂ s oddělovačem tisíců", async ({ page }) => {
    await open(page, "alarm");
    const co2 = async () => clean(await rooms(page).first().locator(".slot-co2 .row-label").textContent());
    // "language" (the default): Czech writes a comma and a space before %, and a space between thousands.
    expect([await temperature(page), await humidity(page), await co2()]).toEqual(["21,3 °C", "52 %", "1 640"]);
    for (const [format, expected] of [
      ["comma_decimal", ["21.3 °C", "52 %", "1,640"]],
      ["decimal_comma", ["21,3 °C", "52 %", "1.640"]],
      ["space_comma", ["21,3 °C", "52 %", "1 640"]],
      ["quote_decimal", ["21.3 °C", "52 %", "1'640"]],
      ["none", ["21.3 °C", "52 %", "1640"]],
    ] as const) {
      await setLocale(page, { number_format: format });
      await expect.poll(async () => [await temperature(page), await humidity(page), await co2()], format).toEqual(expected);
    }
    // The card follows a change of the profile without a reload; back to the language.
    await setLocale(page, { number_format: "language" });
    await expect.poll(() => temperature(page)).toBe("21,3 °C");
    // English: a point, no space before %; German (texts in English): a comma and a space, as Home Assistant writes it.
    await open(page, "alarm", 393, 852, "dark", "en");
    expect([await temperature(page), await humidity(page), await co2()]).toEqual(["21.3 °C", "52%", "1,640"]);
    await setLocale(page, { number_format: "decimal_comma" });
    await expect.poll(async () => [await temperature(page), await humidity(page)]).toEqual(["21,3 °C", "52%"]);
    await page.evaluate(() => {
      // @ts-expect-error test hook
      window.__test.setLocale({ number_format: "language" });
      // @ts-expect-error test hook
      window.__test.setLanguage("de");
    });
    await expect.poll(async () => [await temperature(page), await humidity(page), await co2()]).toEqual(["21,3 °C", "52 %", "1.640"]);
    await expect(page.locator("h1")).toHaveText("Home");
  });

  test("formát času: 12 / 24 h z profilu i z jazyka; osa grafu má celé hodiny", async ({ page }) => {
    await page.clock.setFixedTime(new Date("2026-10-24T09:00:00+02:00"));
    const axis = async () => (await page.locator(".chart .tick").allTextContents()).map(clean);
    const readout = async () => {
      await page.locator(".chart-wrap").focus();
      await page.keyboard.press("Home");
      return clean(await page.locator(".readout-time").textContent());
    };
    // English writes AM / PM by default.
    await open(page, "full", 393, 852, "dark", "en");
    await rooms(page).first().locator(".temperature").click();
    await expect(page.locator(".chart")).toBeVisible();
    expect((await axis()).every((label) => /^\d{1,2} [AP]M$/.test(label)), (await axis()).join("|")).toBe(true);
    expect(await readout()).toMatch(/^[\p{L}]+ \d{1,2}:\d{2} [AP]M$/u);
    // 24 h from the profile: 18:00 and "yesterday 09:00".
    await setLocale(page, { time_format: "24" });
    await expect.poll(axis).toEqual(["12:00", "18:00", "00:00", "06:00"]);
    // 12 h from the profile in Czech.
    await setLocale(page, { time_format: "12" });
    await expect.poll(async () => (await axis()).some((label) => /:/.test(label))).toBe(false);
    // System: the browser of the test is Czech, i.e. 24 h although the card speaks English.
    await setLocale(page, { time_format: "system" });
    await expect.poll(axis).toEqual(["12:00", "18:00", "00:00", "06:00"]);
    // Language (the default): English → 12 h; the same Czech card → 24 h.
    await setLocale(page, { time_format: "language" });
    await expect.poll(async () => (await axis()).every((label) => /[AP]M$/i.test(label))).toBe(true);
    await page.keyboard.press("Escape");
    await open(page, "full", 393, 852, "dark", "cs");
    await rooms(page).first().locator(".temperature").click();
    await expect.poll(axis).toEqual(["12:00", "18:00", "00:00", "06:00"]);
  });

  test("pořadí dne a měsíce: z jazyka, DMY, MDY, YMD", async ({ page }) => {
    await page.clock.setFixedTime(new Date("2026-10-24T09:00:00+02:00"));
    await open(page, "full");
    // Three days of history: the axis shows dates at midnight.
    await reconfigure(page, { history: { hours: 72 } });
    await rooms(page).first().locator(".temperature").click();
    await expect(page.locator(".chart")).toBeVisible();
    const first = async () => clean((await page.locator(".chart .tick").allTextContents())[0]);
    // Czech writes the day first ("22. 10."); the month 10 is the second number.
    await expect.poll(first).toMatch(/^\d{1,2}\. 10\.$/);
    for (const [format, monthFirst] of [["MDY", true], ["YMD", true], ["DMY", false], ["language", false]] as const) {
      await setLocale(page, { date_format: format });
      await expect.poll(first, format).toMatch(monthFirst ? /^10\. \d{1,2}\.$/ : /^\d{1,2}\. 10\.$/);
    }
  });
});

// ------------------------------------------------- popup and the page below

test.describe("popup: stránka pod ním se neposouvá (TODO P1.9.3, P1.9.9)", () => {
  test.use({ hasTouch: true, isMobile: true });

  /** A finger drag of `distance` px (negative: upwards) through the real touch input of the browser. */
  const drag = async (page: Page, x: number, y: number, distance: number) => {
    const cdp = await page.context().newCDPSession(page);
    await cdp.send("Input.dispatchTouchEvent", { type: "touchStart", touchPoints: [{ x, y }] });
    for (let step = 1; step <= 10; step += 1) {
      await cdp.send("Input.dispatchTouchEvent", { type: "touchMove", touchPoints: [{ x, y: y + (distance * step) / 10 }] });
    }
    await cdp.send("Input.dispatchTouchEvent", { type: "touchEnd", touchPoints: [] });
    await cdp.detach();
    await page.waitForTimeout(400);
  };
  const scrollY = (page: Page) => page.evaluate(() => Math.round(window.scrollY));

  test("tažení prstem mimo popup i v něm nehýbe dashboardem; bez popupu ho posune", async ({ page }) => {
    await open(page, "full", 393, 852);
    await page.evaluate(() => window.scrollTo(0, 300));
    // Control: without a popup the same drag scrolls the page, so the test would notice a leak.
    await drag(page, 196, 500, -150);
    expect(await scrollY(page)).toBeGreaterThan(330);

    for (const [name, trigger] of [["Topení", ".hvac"], ["Kvalita vzduchu", ".air-block"]] as const) {
      await page.evaluate(() => window.scrollTo(0, 300));
      await rooms(page).nth(0).locator(trigger).evaluate((button) => (button as HTMLElement).click());
      await expect(page.locator(".sheet")).toBeVisible();
      await settle(page);
      const sheet = (await page.locator(".sheet").boundingBox())!;
      const spots: Array<[string, number, number]> = [
        ["mimo popup", 196, 120],
        ["v popupu", 196, sheet.y + 150],
      ];
      for (const [place, x, y] of spots) {
        for (const distance of [-150, 150]) {
          await drag(page, x, y, distance);
          expect(await scrollY(page), `${name}, ${place}, tah ${distance}`).toBe(300);
        }
      }
      // The wheel of a mouse over the dimmed area and over a popup that does not scroll.
      await page.mouse.move(196, 120);
      await page.mouse.wheel(0, 300);
      await page.mouse.move(196, sheet.y + 150);
      await page.mouse.wheel(0, -300);
      await page.waitForTimeout(300);
      expect(await scrollY(page), `${name}, kolečko`).toBe(300);
      await closePopup(page);
    }
  });

  test("telefon na šířku: historie je přes celou šířku telefonu a posouvá se jen uvnitř", async ({ page }) => {
    await open(page, "full", 852, 393);
    await openPopup(page, ".temperature");
    await expect(page.locator(".chart")).toBeVisible();
    const sizes = await page.evaluate(() => {
      const root = document.querySelector("ha-klima-dashboard")!.shadowRoot!;
      const sheet = root.querySelector<HTMLElement>(".sheet")!;
      const chart = root.querySelector("svg.chart")!.getBoundingClientRect();
      const box = sheet.getBoundingClientRect();
      return { sheet: box.width, sheetHeight: box.height, chart: chart.width, scrolls: sheet.scrollHeight > sheet.clientHeight, screen: innerWidth };
    });
    // The whole width of the phone (bar the 16 px padding), not the 460 px of a popup on its end.
    expect(sizes.sheet).toBeGreaterThanOrEqual(sizes.screen - 4);
    expect(sizes.chart).toBeGreaterThanOrEqual(sizes.screen - 40);
    expect(sizes.sheetHeight).toBeLessThanOrEqual(393);
    // What does not fit scrolls inside the popup; the page below stays.
    await page.evaluate(() => window.scrollTo(0, 120));
    const before = await scrollY(page);
    await drag(page, 400, 200, -120);
    await drag(page, 400, 200, 240);
    expect(await scrollY(page)).toBe(before);
    // Upright again: 460 px popup, chart 428 px.
    await closePopup(page);
    await open(page, "full", 393, 852);
    await openPopup(page, ".temperature");
    await expect(page.locator(".chart")).toBeVisible();
    expect(await page.locator("svg.chart").evaluate((chart) => Math.round(chart.getBoundingClientRect().width))).toBeLessThanOrEqual(393 - 32);
    // A wide window that is tall enough keeps the 460 px popup.
    await open(page, "full", 1200, 852);
    await openPopup(page, ".temperature");
    await expect(page.locator(".chart")).toBeVisible();
    expect(await page.locator(".sheet").evaluate((sheet) => Math.round(sheet.getBoundingClientRect().width))).toBe(460);
  });
});

// -------------------------------------------------------------- performance

test.describe("výkon", () => {
  test("změna nesouvisející entity kartu nepřekreslí, související jednou", async ({ page }) => {
    await open(page, "full");
    const renders = await page.evaluate(async () => {
      // @ts-expect-error test hook
      const card = window.__test.card;
      let count = 0;
      const original = card.render.bind(card);
      card.render = () => {
        count += 1;
        return original();
      };
      const update = (states: Record<string, unknown>) => ({ ...card.hass, states });
      card.hass = update({ ...card.hass.states, "sensor.nesouvisi": { state: "1", attributes: {} } });
      await card.updateComplete;
      const unrelated = count;
      const id = "sensor.loznice_teplomer_loznice_temperature";
      card.hass = update({ ...card.hass.states, [id]: { ...card.hass.states[id], state: "21.4", last_updated: new Date().toISOString() } });
      await card.updateComplete;
      return { unrelated, related: count - unrelated };
    });
    expect(renders).toEqual({ unrelated: 0, related: 1 });
  });
});

// ------------------------------------------------- Topení: teplota a doba trvání

test.describe("Topení: Ručně s teplotou, Boost 25 °C a doba trvání (Ovládání Topení)", () => {
  const heatingEntity = async (page: Page, room = 0) =>
    (await hook<{ rooms: Array<{ heating: { climate: string; overlay: string; target: string } }> }>(page, "config")).rooms[room].heating;
  const option = (page: Page, name: string) => page.locator(".sheet .option", { hasText: name });
  const services = (page: Page) => hook<unknown[]>(page, "services");
  /** The state Tado CE reports: mode of the climate entity, its target and the overlay sensor. */
  const push = async (page: Page, hvac: string, temperature: number, overlayState: string, remaining?: number, room = 0) => {
    const ids = await heatingEntity(page, room);
    await page.evaluate(
      ([entities, mode, value, overlay, seconds]) => {
        // @ts-expect-error test hook
        const { states, update } = window.__test;
        update({
          [entities.climate]: { ...states[entities.climate], state: mode, attributes: { ...states[entities.climate].attributes, temperature: value } },
          [entities.overlay]: { state: overlay, attributes: seconds ? { overlay_remaining_seconds: seconds } : {} },
          [entities.target]: { ...states[entities.target], state: String(value) },
        });
      },
      [ids, hvac, temperature, overlayState, remaining] as const,
    );
  };

  const timer = (page: Page) => page.locator(".sheet .timer-slider");
  const dial = (page: Page) => page.locator(".sheet .dial-ring");
  /** Slider position (0 = plán, 1–10 = 15 min … 8 h, 11 = ∞) by the keyboard. */
  const slot = async (page: Page, target: number) => {
    await timer(page).focus();
    await page.keyboard.press("Home");
    for (let i = 0; i < target; i += 1) await page.keyboard.press("ArrowRight");
  };

  test("Ručně: kruh s teplotou po celých stupních, výchozí doba „do další změny plánu“, odešle se až při zavření popupu", async ({ page }) => {
    await open(page);
    const { climate } = await heatingEntity(page);
    await openPopup(page, ".hvac");
    await expect(page.locator(".sheet .timer-card")).toHaveClass(/dim/);
    await option(page, "Ručně").click();
    await expect(dial(page)).toHaveAttribute("role", "slider");
    await expect(dial(page)).toHaveAttribute("aria-valuenow", "21");
    await expect(timer(page)).toHaveAttribute("aria-valuenow", "0");
    await expect(page.locator(".timer-read")).toHaveText("Do další změny plánu");
    await expect(page.locator(".heat-note")).toHaveText("Použije se po zavření okna");
    await dial(page).focus();
    for (let i = 0; i < 2; i += 1) await page.keyboard.press("ArrowUp");
    await expect(page.locator(".dial-big")).toHaveText("23°");
    // Nothing is sent while the popup is open.
    await page.waitForTimeout(2_500);
    expect(await services(page)).toEqual([]);
    await closePopup(page);
    await expect.poll(() => services(page)).toEqual([
      ["tado_ce", "set_climate_timer", { entity_id: climate, temperature: 23, overlay: "next_time_block" }],
    ]);
  });

  test("Boost: pevných 25 °C bez posuvné teploty, výchozí doba 30 min, time_period 00:30:00", async ({ page }) => {
    await open(page);
    const { climate } = await heatingEntity(page);
    await openPopup(page, ".hvac");
    await option(page, "Boost").click();
    await expect(dial(page)).toHaveAttribute("role", "img");
    await expect(page.locator(".dial-big")).toHaveText("25°");
    await expect(timer(page)).toHaveAttribute("aria-valuenow", "2");
    await expect(page.locator(".timer-read")).toContainText("30 min");
    await expect(page.locator(".timer-read")).toContainText(/do \d{1,2}:\d{2}/);
    await closePopup(page);
    await expect.poll(() => services(page)).toEqual([
      ["tado_ce", "set_climate_timer", { entity_id: climate, temperature: 25, time_period: "00:30:00" }],
    ]);
  });

  test("Vypnuto: výchozí „dokud neobnovíte plán“ = off; s dobou je to časovač 5 °C", async ({ page }) => {
    await open(page);
    const { climate } = await heatingEntity(page);
    await openPopup(page, ".hvac");
    await option(page, "Vypnuto").click();
    await expect(timer(page)).toHaveAttribute("aria-valuenow", "11");
    await expect(page.locator(".timer-read")).toHaveText("Dokud neobnovíte plán");
    await expect(dial(page)).toHaveAttribute("role", "img");
    await closePopup(page);
    await expect.poll(() => services(page)).toEqual([["climate", "set_hvac_mode", { entity_id: climate, hvac_mode: "off" }]]);

    await open(page);
    await openPopup(page, ".hvac");
    await option(page, "Vypnuto").click();
    await slot(page, 4);
    await expect(page.locator(".timer-read")).toContainText("1 h");
    await expect(page.locator(".after-row")).toHaveClass(/away/);
    await closePopup(page);
    await expect.poll(() => services(page)).toEqual([
      ["tado_ce", "set_climate_timer", { entity_id: climate, temperature: 5, time_period: "01:00:00" }],
    ]);
  });

  test("poslední zarážka ∞ u Ručně = overlay manual; ikona ∞ a plánu na koncích osy", async ({ page }) => {
    await open(page);
    const { climate } = await heatingEntity(page);
    await openPopup(page, ".hvac");
    await option(page, "Ručně").click();
    await page.locator(".sheet .end-button").nth(1).click();
    await expect(page.locator(".timer-read")).toHaveText("Dokud neobnovíte plán");
    await expect(page.locator(".timer-ticks")).toContainText("Plán");
    await expect(page.locator(".timer-ticks")).toContainText("∞");
    await closePopup(page);
    await expect.poll(() => services(page)).toEqual([
      ["tado_ce", "set_climate_timer", { entity_id: climate, temperature: 21, overlay: "manual" }],
    ]);
  });

  test("Po skončení: Plán nebo Vypnuto; Vypnuto naplánuje vypnutí v Home Assistantu, volba se pamatuje", async ({ page }) => {
    await open(page);
    const { climate } = await heatingEntity(page);
    await openPopup(page, ".hvac");
    await option(page, "Ručně").click();
    // Without a time limit there is nothing to follow (the row keeps its place, hidden).
    await expect(page.locator(".after-row")).toHaveClass(/away/);
    await slot(page, 4);
    const after = page.locator(".after-row .mini-segment");
    await expect(after.nth(0)).toHaveAttribute("aria-pressed", "true");
    await expect(page.locator(".timer-foot")).toContainText("potom přejde do Plánu");
    await after.nth(1).click();
    await expect(page.locator(".timer-foot")).toContainText("potom se topení vypne");
    await closePopup(page);
    await expect.poll(() => services(page)).toEqual([
      ["tado_ce", "set_climate_timer", { entity_id: climate, temperature: 21, time_period: "01:00:00" }],
    ]);
    const scripts = await hook<Array<{ type: string; sequence: Array<Record<string, unknown>> }>>(page, "scripts");
    expect(scripts).toHaveLength(1);
    expect(scripts[0].type).toBe("execute_script");
    expect(scripts[0].sequence[0]).toEqual({ delay: { hours: 1, minutes: 0, seconds: 15 } });
    expect(scripts[0].sequence.at(-1)).toEqual({
      action: "climate.set_hvac_mode",
      target: { entity_id: climate },
      data: { hvac_mode: "off" },
    });
    // The choice is remembered for the next time.
    await openPopup(page, ".hvac");
    await option(page, "Boost").click();
    await expect(page.locator(".after-row .mini-segment").nth(1)).toHaveAttribute("aria-pressed", "true");
  });

  test("otevřený popup ukáže kruh aktivního režimu; beze změny se nic neodešle; Plán se použije až při zavření", async ({ page }) => {
    await open(page);
    const { climate } = await heatingEntity(page);
    await push(page, "heat", 22, "Manual");
    await openPopup(page, ".hvac");
    await expect(dial(page)).toHaveAttribute("aria-valuenow", "22");
    await expect(option(page, "Ručně")).toHaveAttribute("aria-pressed", "true");
    await closePopup(page);
    await page.waitForTimeout(300);
    expect(await services(page)).toEqual([]);

    await openPopup(page, ".hvac");
    await option(page, "Plán").click();
    await expect(page.locator(".sheet .timer-card")).toHaveClass(/dim/);
    await expect(option(page, "Plán")).toHaveAttribute("aria-pressed", "true");
    expect(await services(page)).toEqual([]);
    await closePopup(page);
    await expect.poll(() => services(page)).toEqual([["climate", "set_hvac_mode", { entity_id: climate, hvac_mode: "auto" }]]);

    // Choosing what the entity already has again drops the change.
    await open(page);
    await openPopup(page, ".hvac");
    await option(page, "Boost").click();
    await option(page, "Plán").click();
    await expect(page.locator(".heat-note")).not.toHaveText("Použije se po zavření okna");
    await closePopup(page);
    await page.waitForTimeout(300);
    expect(await services(page)).toHaveLength(0);
  });

  test("přepínač Topení | Klimatizace je nahoře, čtyři ikony v jedné řadě; volby se při změně režimu nehýbou", async ({ page }) => {
    await open(page);
    await openPopup(page, ".hvac");
    const options = page.locator(".sheet .icon-options .option");
    await expect(options).toHaveCount(4);
    const rects = async () => Promise.all([0, 1, 2, 3].map((index) => options.nth(index).boundingBox()));
    const before = await rects();
    expect(new Set(before.map((box) => Math.round(box!.y))).size).toBe(1);
    const switcher = await page.locator(".segmented").boundingBox();
    expect(switcher!.y + switcher!.height).toBeLessThan(before[0]!.y);
    await option(page, "Ručně").click();
    await expect(dial(page)).toHaveAttribute("role", "slider");
    for (const [name, index] of [["Vypnuto", 0], ["Plán", 1], ["Ručně", 2], ["Boost", 3]] as const) {
      await option(page, name).click();
      const after = await rects();
      expect(Math.round(after[index]!.x), `${name}: vodorovně`).toBe(Math.round(before[index]!.x));
      expect(after[index]!.height, `${name}: výška`).toBe(before[index]!.height);
    }
    await option(page, "Plán").click();
    await expect(page.locator(".sheet .timer-card")).toHaveClass(/dim/);
  });

  test("Plán nikdy neukáže 5 °C z Vypnuto ani ruční cíl; v plánu je kruh oranžový", async ({ page }) => {
    await open(page);
    await openPopup(page, ".hvac");
    await expect(page.locator(".sheet .dial")).toHaveCSS("--tone", /.+/);
    const tone = await page.locator(".sheet .dial-value").evaluate((path) => getComputedStyle(path).stroke);
    const orange = await page.locator(".sheet .option", { hasText: "Ručně" }).evaluate((node) => getComputedStyle(node.querySelector("svg")!).stroke);
    expect(tone).toBe(orange);
    await closePopup(page);
    // Tado reports 5 °C while the heating is off, and the manual value while it is overridden.
    await push(page, "off", 5, "Off");
    await openPopup(page, ".hvac");
    await option(page, "Ručně").click();
    await option(page, "Plán").click();
    await expect(page.locator(".dial-big")).toHaveText("––");
    await option(page, "Vypnuto").click();
    await option(page, "Plán").click();
    await expect(page.locator(".dial-big")).toHaveText("––");
    await closePopup(page);
    await push(page, "auto", 20, "Schedule");
    await openPopup(page, ".hvac");
    await expect(page.locator(".dial-big")).toHaveText("20°");
  });

  test("chyba příkazu po zavření: haptika „failure“ místo hlášky v popupu", async ({ page }) => {
    await open(page);
    await openPopup(page, ".hvac");
    await option(page, "Boost").click();
    await page.evaluate(() => {
      // @ts-expect-error test hook
      window.__test.failNext = true;
    });
    await closePopup(page);
    await expect.poll(() => hook<string[]>(page, "haptics")).toContain("failure");
  });

  test("bez akce tado_ce.set_climate_timer: Boost nedostupný, Ručně jen teplota přes climate.set_temperature, Vypnuto bez doby", async ({ page }) => {
    await open(page, "full&timer=none");
    const { climate } = await heatingEntity(page);
    await openPopup(page, ".hvac");
    await expect(option(page, "Boost")).toBeDisabled();
    await expect(page.locator(".heat-note")).toHaveText("Boost: entita nenabízí");
    await option(page, "Ručně").click();
    await expect(timer(page)).toHaveCount(0);
    await expect(page.locator(".sheet-message")).toContainText("Dobu nelze nastavit");
    await dial(page).focus();
    await page.keyboard.press("ArrowUp");
    await closePopup(page);
    await expect.poll(() => services(page)).toEqual([["climate", "set_temperature", { entity_id: climate, temperature: 22 }]]);

    await open(page, "full&timer=none");
    await openPopup(page, ".hvac");
    await option(page, "Vypnuto").click();
    await expect(timer(page)).toHaveCount(0);
    await closePopup(page);
    await expect.poll(() => services(page)).toEqual([["climate", "set_hvac_mode", { entity_id: climate, hvac_mode: "off" }]]);
  });

  test("stav z Tada: ruční 25 °C je Boost, ruční 5 °C je Vypnuto; zbývající čas", async ({ page }) => {
    await open(page);
    await push(page, "heat", 25, "Manual", 1_500);
    await openPopup(page, ".hvac");
    await expect(option(page, "Boost")).toHaveAttribute("aria-pressed", "true");
    await expect(option(page, "Ručně")).toHaveAttribute("aria-pressed", "false");
    await expect(page.locator(".heat-note")).toHaveText("Zbývá 25 min");
    await closePopup(page);
    await push(page, "heat", 5, "Manual", 5_400);
    await expect(rooms(page).first().locator(".hvac .system-row").first()).toContainText("Vypnuto");
    await openPopup(page, ".hvac");
    await expect(option(page, "Vypnuto")).toHaveAttribute("aria-pressed", "true");
    await expect(option(page, "Ručně")).toHaveAttribute("aria-pressed", "false");
    await expect(page.locator(".heat-note")).toHaveText("Zbývá 1\u00a0h 30\u00a0min");
  });

  test("horní štítky: Ručně a Boost zvlášť s ikonou režimu, u názvu místnosti žádná ikona, Plán a Vypnuto bez štítku", async ({ page }) => {
    await open(page);
    const chips = async () => tidy(await page.locator(".summary .chip").allInnerTexts());
    await expect(page.locator(".room-override")).toHaveCount(0);
    expect((await chips()).some((text) => /^(Ručně|Boost):/.test(text))).toBe(false);
    await push(page, "heat", 22, "Manual");
    await expect.poll(chips).toContain("Ručně: Ložnice");
    await push(page, "heat", 25, "Manual", undefined, 1);
    await expect.poll(chips).toEqual(expect.arrayContaining(["Ručně: Ložnice", "Boost: Pracovna"]));
    // The icon of the chip is the mode icon (not three waves).
    const icons = await page.locator(".summary .chip").evaluateAll((items) =>
      items.map((item) => [item.textContent?.trim(), item.querySelectorAll("path, circle").length]),
    );
    expect(icons.find(([text]) => String(text).startsWith("Ručně"))![1]).toBeGreaterThan(0);
    await push(page, "off", 5, "Off");
    await push(page, "auto", 21, "Schedule", undefined, 1);
    await expect.poll(async () => (await chips()).some((text) => /^(Ručně|Boost):/.test(text))).toBe(false);
    await expect(page.locator(".room-override")).toHaveCount(0);
  });

  test("stav určuje climate entita: po Plánu starý senzor přepisu „Manual“ neukáže Ručně (a naopak)", async ({ page }) => {
    await open(page);
    const row = rooms(page).first().locator(".hvac .system-row").first();
    await push(page, "auto", 21, "Manual");
    await expect(row).toContainText("Plán");
    await expect.poll(async () => (await page.locator(".summary .chip").allInnerTexts()).join()).not.toContain("Ručně");
    await push(page, "heat", 22, "Schedule");
    await expect(row).toContainText("Ručně");
    await push(page, "auto", 21, "Off");
    await expect(row).toContainText("Plán");
  });

  test("axe a cíle 44 px: ovládání Topení ve tmavém i světlém vzhledu", async ({ page }) => {
    for (const theme of ["dark", "light"] as const) {
      await open(page, "full", 393, 852, theme);
      await openPopup(page, ".hvac");
      await option(page, "Ručně").click();
      await expect(dial(page)).toHaveAttribute("role", "slider");
      expect(await axeViolations(page), `${theme} Ručně`).toEqual([]);
      await option(page, "Boost").click();
      await expect(dial(page)).toHaveAttribute("role", "img");
      expect(await axeViolations(page), `${theme} Boost`).toEqual([]);
      const slider = await timer(page).boundingBox();
      expect(slider!.height).toBeGreaterThanOrEqual(44);
      expect(slider!.width).toBeLessThanOrEqual(393);
      await closePopup(page);
    }
  });
});

test.describe("Topení: posuvníky prstem (dotykový tah)", () => {
  test.use({ hasTouch: true, isMobile: true });

  /** A finger drag from (x, y) to (x + dx, y) through the real touch input of the browser. */
  const swipe = async (page: Page, x: number, y: number, dx: number) => {
    const cdp = await page.context().newCDPSession(page);
    await cdp.send("Input.dispatchTouchEvent", { type: "touchStart", touchPoints: [{ x, y }] });
    for (let step = 1; step <= 10; step += 1) {
      await cdp.send("Input.dispatchTouchEvent", { type: "touchMove", touchPoints: [{ x: x + (dx * step) / 10, y }] });
    }
    await cdp.send("Input.dispatchTouchEvent", { type: "touchEnd", touchPoints: [] });
    await cdp.detach();
  };

  test("tah prstem po časovači mění dobu a nehýbe stránkou", async ({ page }) => {
    await open(page, "full", 393, 852);
    await page.evaluate(() => window.scrollTo(0, 300));
    await rooms(page).first().locator(".hvac").evaluate((button) => (button as HTMLElement).click());
    await expect(page.locator(".sheet")).toBeVisible();
    await settle(page);
    await page.locator(".sheet .option", { hasText: "Ručně" }).click();
    const slider = page.locator(".sheet .timer-slider");
    const before = Number(await slider.getAttribute("aria-valuenow"));
    const box = (await slider.boundingBox())!;
    await swipe(page, box.x + 4, box.y + box.height / 2, 100);
    const after = Number(await slider.getAttribute("aria-valuenow"));
    expect(after - before, `${before} → ${after}`).toBeGreaterThan(0);
    expect(await page.evaluate(() => Math.round(window.scrollY))).toBe(300);
  });
});

test.describe("Hromadné nastavení a Klimatizace (Ovládání Topení a Klimatizace)", () => {
  const services = (page: Page) => hook<unknown[]>(page, "services");
  const option = (page: Page, name: string) => page.locator(".sheet .option", { hasText: name });
  const config = async (page: Page) =>
    hook<{ rooms: Array<{ name: string; heating: { climate: string }; air_conditioner: string }> }>(page, "config");

  test("štítek „Topí 3 místnosti“ otevře popup se všemi třemi, volba se pošle každé; ikona HVAC v místnosti jen té jedné", async ({ page }) => {
    await open(page);
    const { rooms: all } = await config(page);
    const chip = page.locator(".summary .chip-open", { hasText: "Topí" });
    await expect(chip).toBeVisible();
    await chip.click();
    await expect(page.locator("#sheet-title")).toHaveText("Ložnice, Maxík, Obývák");
    await option(page, "Boost").click();
    // No detail link for a group (it has no single entity).
    await expect(page.locator(".sheet-link")).toHaveCount(0);
    await closePopup(page);
    const heating = (name: string) => all.find((room) => room.name === name)!.heating.climate;
    await expect.poll(() => services(page)).toEqual(
      ["Ložnice", "Maxík", "Obývák"].map((name) => [
        "tado_ce",
        "set_climate_timer",
        { entity_id: heating(name), temperature: 25, time_period: "00:30:00" },
      ]),
    );

    await openPopup(page, ".hvac");
    await expect(page.locator("#sheet-title")).toHaveText("Ložnice");
    await expect(page.locator(".sheet-link")).toHaveCount(1);
  });

  test("štítek Klimatizace: režimy ve pořadí návrhu, WindFree jedním klepnutím (chlazení + předvolba), teplota po celých stupních", async ({ page }) => {
    await open(page, "summer");
    const chip = page.locator(".summary .chip-open", { hasText: "Klimatizace" });
    await chip.click();
    await expect(page.locator(".sheet .segment[aria-selected='true']")).toHaveText("Klimatizace");
    expect(tidy(await page.locator(".sheet .climate-options .option").allInnerTexts())).toEqual([
      "Vypnuto",
      "Chlazení",
      "WindFree",
      "Topení",
      "Větrání",
      "Sušení",
      "Auto",
    ]);
    const { rooms: all } = await config(page);
    const names = (await page.locator("#sheet-title").innerText()).split(", ");
    expect(names.length).toBeGreaterThan(0);
    await option(page, "WindFree").click();
    await expect.poll(async () => (await services(page)).length).toBe(2 * names.length);
    const calls = (await services(page)) as Array<[string, string, Record<string, unknown>]>;
    expect(calls.filter((call) => call[1] === "set_hvac_mode").every((call) => call[2].hvac_mode === "cool")).toBe(true);
    expect(calls.filter((call) => call[1] === "set_preset_mode").every((call) => call[2].preset_mode === "wind_free")).toBe(true);
    const ids = new Set(names.map((name) => all.find((room) => room.name === name)!.air_conditioner));
    expect(new Set(calls.map((call) => call[2].entity_id))).toEqual(ids);

    // The ring moves by whole degrees and is sent at once (keyboard) to every room.
    await page.evaluate(() => {
      // @ts-expect-error test hook
      window.__test.services.length = 0;
    });
    const dial = page.locator(".sheet .dial-ring");
    await expect(dial).toHaveAttribute("role", "slider");
    await dial.focus();
    await page.keyboard.press("ArrowUp");
    await expect.poll(async () => (await services(page)).length).toBe(names.length);
    const temperatures = ((await services(page)) as Array<[string, string, Record<string, unknown>]>).map((call) => call[2].temperature);
    expect(new Set(temperatures).size).toBe(1);
    expect(Number.isInteger(temperatures[0])).toBe(true);
  });

  test("Klimatizace: časovač vypnutí naplánuje v Home Assistantu vypnutí; ∞ nic neplánuje", async ({ page }) => {
    await open(page, "summer");
    await openPopup(page, ".hvac");
    await expect(page.locator(".sheet .segment[aria-selected='true']")).toHaveText("Klimatizace");
    const slider = page.locator(".sheet .timer-slider");
    await expect(slider).toHaveAttribute("aria-valuenow", "10");
    await expect(page.locator(".timer-read")).toHaveText("Bez omezení");
    await expect(page.locator(".timer-foot")).toHaveText("Klimatizace běží, dokud ji nevypnete.");
    await slider.focus();
    await page.keyboard.press("Home");
    await page.keyboard.press("ArrowRight");
    await expect(page.locator(".timer-read")).toContainText("30 min");
    await expect(page.locator(".timer-foot")).toContainText("potom se klimatizace vypne");
    await expect(page.locator(".after-row")).toHaveCount(0);
    await closePopup(page);
    const scripts = await hook<Array<{ sequence: Array<Record<string, unknown>> }>>(page, "scripts");
    expect(scripts.length).toBeGreaterThan(0);
    for (const script of scripts) {
      expect(script.sequence[0]).toEqual({ delay: { hours: 0, minutes: 30, seconds: 0 } });
      expect(script.sequence[1]).toMatchObject({ condition: "state", state: "cool" });
      expect(script.sequence[2]).toMatchObject({ action: "climate.set_hvac_mode", data: { hvac_mode: "off" } });
    }

    await openPopup(page, ".hvac");
    await slider.focus();
    await page.keyboard.press("End");
    await closePopup(page);
    expect(await hook<unknown[]>(page, "scripts")).toHaveLength(scripts.length);
  });

  test("světlý i tmavý vzhled: popup Klimatizace bez porušení axe, cíle aspoň 44 px", async ({ page }) => {
    for (const theme of ["dark", "light"] as const) {
      await open(page, "summer", 393, 852, theme);
      await openPopup(page, ".hvac");
      await expect(page.locator(".sheet .dial-ring")).toBeVisible();
      expect(await axeViolations(page), theme).toEqual([]);
      expect(await tooSmall(page, theme, ".sheet")).toEqual([]);
      await closePopup(page);
    }
  });
});

test.describe("historie místnosti: pruhy Topení, Klimatizace a okna pod grafem", () => {
  const openHistory = async (page: Page, scenario = "full") => {
    await open(page, scenario);
    await page.evaluate(() => {
      // @ts-expect-error test hook
      const test = window.__test;
      const now = Date.now() / 1000;
      const id = test.config.rooms[0].window;
      // Open from 6 to 5 hours ago and from 2 to 1 hours ago.
      const samples = [[8, "off"], [6, "on"], [5, "off"], [2, "on"], [1, "off"]] as Array<[number, string]>;
      test.historyFor = (entity: string) => (entity === id ? samples.map(([hoursAgo, s]) => ({ s, lu: now - hoursAgo * 3600 })) : undefined);
    });
    await rooms(page).first().locator(".temperature").click();
    await expect(page.locator("svg.chart")).toBeVisible();
  };

  test("řádky jako na kartě (Topení, Klimatizace, okna; v létě Klimatizace první), bez popisků, s ikonou na začátku a zeslabením kolem ní", async ({ page }) => {
    await openHistory(page);
    const rows = () =>
      page.evaluate(() => {
        const svg = document.querySelector("ha-klima-dashboard")!.shadowRoot!.querySelector("svg.chart")!;
        const rects = (row: Element) => [...row.querySelectorAll(":scope > rect")].map((rect) => ({ y: Number(rect.getAttribute("y")), height: Number(rect.getAttribute("height")) }));
        return {
          order: [...svg.querySelectorAll(".strip-row")].map((row) => row.getAttribute("class")!.replace("strip-row ", "")),
          icons: svg.querySelectorAll(".strip-row .strip-icon").length,
          iconPaint: [...svg.querySelectorAll(".strip-icon")].map((icon) => icon.querySelectorAll("path, rect, circle").length > 0),
          tracks: [...svg.querySelectorAll(".strip-row")].map((row) => rects(row)[0]),
          texts: [...svg.querySelectorAll("text")].map((text) => text.textContent?.trim() ?? ""),
          fade: svg.querySelectorAll("linearGradient stop").length,
        };
      });
    const winter = await rows();
    expect(winter.order).toEqual(["heating", "climate", "windows"]);
    expect(winter.icons).toBe(3);
    expect(winter.iconPaint).toEqual([true, true, true]);
    expect(winter.fade).toBeGreaterThanOrEqual(2);
    // No labels: only the temperatures (°) and the clock times are text.
    expect(winter.texts.filter((text) => !/°$|^\d{1,2}:\d{2}$/.test(text))).toEqual([]);
    // Compact: the gap between the bars is at most 4 px.
    for (let index = 1; index < winter.tracks.length; index += 1) {
      const gap = winter.tracks[index].y - (winter.tracks[index - 1].y + winter.tracks[index - 1].height);
      expect(gap, `mezera ${index}`).toBeGreaterThan(0);
      expect(gap, `mezera ${index}`).toBeLessThanOrEqual(4);
    }
    await closePopup(page);
    await openHistory(page, "summer");
    expect((await rows()).order).toEqual(["climate", "heating", "windows"]);
  });

  test("řádek oken: modré úseky jen kdy bylo okno otevřené, ve správné šířce a ve třetím řádku", async ({ page }) => {
    await openHistory(page);
    await expect(page.locator("svg.chart .window-open")).toHaveCount(2);
    const lines = await page.evaluate(() => {
      const svg = document.querySelector("ha-klima-dashboard")!.shadowRoot!.querySelector("svg.chart")!;
      const num = (element: Element, name: string) => Number(element.getAttribute(name));
      const rowY = (name: string) => num(svg.querySelector(`.strip-row.${name} > rect`)!, "y");
      return {
        windows: [...svg.querySelectorAll(".window-open")].map((rect) => ({ y: num(rect, "y"), width: num(rect, "width"), height: num(rect, "height") })),
        track: rowY("windows"),
        climate: rowY("climate"),
        plotWidth: num(svg.querySelector("clipPath#history-plot rect")!, "width"),
      };
    });
    for (const line of lines.windows) {
      expect(line.y).toBe(lines.track);
      expect(line.y).toBeGreaterThan(lines.climate);
      expect(line.width).toBeCloseTo(lines.plotWidth / 24, 0);
    }
  });

  test("Vypnuto má v historii stejnou barvu u Topení i Klimatizace (tmavší šedá), v tmavém i světlém vzhledu", async ({ page }) => {
    for (const theme of ["dark", "light"] as const) {
      await open(page, "full", 393, 852, theme);
      await page.evaluate(() => {
        // @ts-expect-error test hook
        const test = window.__test;
        const room = test.config.rooms[0];
        const now = Date.now() / 1000;
        const off = [{ s: "off", lu: now - 10 * 3600 }];
        test.historyFor = (entity: string) => (entity === room.heating.climate || entity === room.air_conditioner ? off : undefined);
      });
      await rooms(page).first().locator(".temperature").click();
      await expect(page.locator("svg.chart")).toBeVisible();
      const fills = await page.evaluate(() => {
        const svg = document.querySelector("ha-klima-dashboard")!.shadowRoot!.querySelector("svg.chart")!;
        const fillOf = (row: string) => {
          // Rects of a row: the track, the bars of the periods, the fade around the icon; the last bar is the "off" one.
          const bars = [...svg.querySelectorAll(`.strip-row.${row} > rect`)].slice(1, -1);
          const bar = bars[bars.length - 1];
          return bar ? getComputedStyle(bar).fill : "";
        };
        return { heating: fillOf("heating"), climate: fillOf("climate") };
      });
      expect(fills.heating, `${theme}: Topení Vypnuto`).not.toBe("");
      expect(fills.climate, `${theme}: Klimatizace Vypnuto`).toBe(fills.heating);
      await closePopup(page);
    }
  });

  test("bez otevřeného okna v historii není žádný modrý úsek, bez oken v konfiguraci není řádek oken", async ({ page }) => {
    await open(page);
    await rooms(page).first().locator(".temperature").click();
    await expect(page.locator("svg.chart")).toBeVisible();
    await expect(page.locator("svg.chart .window-open")).toHaveCount(0);
    await expect(page.locator("svg.chart .strip-row.windows")).toHaveCount(1);
    await closePopup(page);
    await reconfigure(page, {}, { 0: { window: undefined } });
    await rooms(page).first().locator(".temperature").click();
    await expect(page.locator("svg.chart")).toBeVisible();
    await expect(page.locator("svg.chart .strip-row")).toHaveCount(2);
  });
});
