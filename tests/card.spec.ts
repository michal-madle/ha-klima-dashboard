import { expect, test } from "@playwright/test";
import type { CDPSession, Page } from "@playwright/test";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { parse } from "yaml";

// Browser tests of the Klima Dashboard card against tests/harness.html (fake hass data).
// Every case names the spec section or TODO item it guards. `npm test` builds the card first.

const require = createRequire(import.meta.url);
const AXE = require.resolve("axe-core/axe.min.js");
const WIDTHS = [320, 360, 375, 393, 430, 768];

async function open(page: Page, scenario = "full", width = 393, height = 852): Promise<void> {
  await page.setViewportSize({ width, height });
  await page.goto(`/tests/harness.html?s=${scenario}`);
  await page.locator(".room").first().waitFor();
  // Wait for the first micro-trend history (the dotted placeholder disappears).
  await expect(page.locator(".spark.loading")).toHaveCount(0);
}

const statuses = (page: Page) => page.locator(".status-line").allInnerTexts();
const tidy = (texts: string[]) => texts.map((text) => text.replace(/\s+/g, " ").trim());

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

/** Rooms whose illustration overlaps the humidity value or the room name (browser side). */
async function sceneOverlaps(page: Page): Promise<string[]> {
  return page.evaluate(() => {
    const card = document.querySelector("ha-klima-dashboard")!.shadowRoot!;
    const hit = (a: DOMRect, b: DOMRect) => a.left < b.right && b.left < a.right && a.top < b.bottom && b.top < a.bottom;
    return [...card.querySelectorAll(".room")].flatMap((room) => {
      const scene = room.querySelector(".scene svg")?.getBoundingClientRect();
      if (!scene) return [];
      const range = document.createRange();
      range.selectNodeContents(room.querySelector(".room-title")!);
      const problems: string[] = [];
      if (hit(scene, room.querySelector(".humidity")!.getBoundingClientRect())) problems.push("vlhkost");
      if (hit(scene, range.getBoundingClientRect())) problems.push("název");
      return problems.map((problem) => `${room.getAttribute("aria-label")}: ${problem}`);
    });
  });
}

test.describe("konfigurace", () => {
  const example = () => parse(readFileSync(new URL("../examples/domov_prototyp_loznice.yaml", import.meta.url), "utf8"));

  test("scénář „real“ je přímo examples/domov_prototyp_loznice.yaml a karta ho přijme", async ({ page }) => {
    await open(page, "real");
    // @ts-expect-error test hook
    expect(await page.evaluate(() => window.__test.config)).toEqual(example());
    await expect(page.locator(".room")).toHaveCount(5);
    // Obývák has no CO₂ / PM2.5 sensor (false): no rows; the others without IDs keep "––".
    await expect(page.locator(".room").nth(4).locator(".air-block")).toHaveCount(0);
    await expect(page.locator(".room").nth(3).locator(".air-block")).toHaveCount(1);
  });

  test("příklad YAML obsahuje úplně všechna nastavení (CURRENT_SPEC.md, Konfigurace)", async () => {
    // Every key of the configuration contract as a path; "[]" is an item of a list.
    const all = [
      "type", "title", "theme", "house_mode_entity", "house_modes.winter", "house_modes.summer",
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

  test("příklad YAML projde kontrolou a vypisuje přesně výchozí hodnoty (CURRENT_SPEC.md, Konfigurace)", async ({ page }) => {
    await open(page, "full");
    const [explicit, implicit] = await page.evaluate((config) => {
      const normalized = (value: unknown) => {
        const card = document.createElement("ha-klima-dashboard") as unknown as { setConfig(value: unknown): void; _config: unknown };
        card.setConfig(value);
        return JSON.stringify(card._config);
      };
      // The same card without the listed defaults and without the pictures chosen by name.
      const bare = structuredClone(config);
      for (const key of ["theme", "house_modes", "thresholds", "trends", "history", "covers"]) delete bare[key];
      for (const room of bare.rooms) delete room.image;
      return [normalized(config), normalized(bare)];
    }, example());
    expect(explicit).toEqual(implicit);
  });
});

test.describe("rozložení (Room Card, Dashboard Domov)", () => {
  for (const scenario of ["real", "full", "summer", "alarm", "longnames", "stale"]) {
    test(`${scenario}: bez vodorovného posouvání na šířkách 320–768 px`, async ({ page }) => {
      for (const width of WIDTHS) {
        await open(page, scenario, width);
        const scroll = await page.evaluate(() => document.documentElement.scrollWidth);
        expect(scroll, `šířka ${width}`).toBeLessThanOrEqual(width);
      }
    });
  }

  test("ilustrace nepřekrývá vlhkost ani název od 320 px (TODO P2.12)", async ({ page }) => {
    for (const width of [320, 360, 375, 393, 430]) {
      await open(page, "longnames", width);
      expect(await sceneOverlaps(page), `šířka ${width}`).toEqual([]);
    }
  });

  test("na 320 px zůstane jednotka na jednom řádku s hodnotou CO₂ a PM2.5, nic se neořízne (TODO P2.12)", async ({ page }) => {
    for (const scenario of ["real", "full", "alarm", "longnames", "stale"]) {
      await open(page, scenario, 320);
      const rows = await page.evaluate(() => {
        const card = document.querySelector("ha-klima-dashboard")!.shadowRoot!;
        return [...card.querySelectorAll(".air-row")].flatMap((row) => {
          const label = row.querySelector(".row-label");
          const unit = row.querySelector(".row-unit");
          if (!label || !unit) {
            return [];
          }
          const [a, b] = [label.getBoundingClientRect(), unit.getBoundingClientRect()];
          return [{ sameLine: Math.abs(a.top - b.top) < 3, cut: label.scrollWidth > label.clientWidth + 0.5, text: row.textContent?.trim() }];
        });
      });
      expect(rows.length, scenario).toBeGreaterThan(0);
      expect(rows.filter((row) => !row.sameLine || row.cut), scenario).toEqual([]);
    }
  });

  test("mikrotrend navazuje přímo na hodnotu: začíná pod koncem čísla a jednotky (TODO P1.10.1)", async ({ page }) => {
    for (const width of [320, 393, 430]) {
      await open(page, "alarm", width);
      const gaps = await page.evaluate(() => {
        const card = document.querySelector("ha-klima-dashboard")!.shadowRoot!;
        return [...card.querySelectorAll(".room")].flatMap((room) =>
          [".slot-co2", ".slot-pm25"].flatMap((slot) => {
            const text = room.querySelector(`${slot} .row-text`);
            const spark = room.querySelector(`${slot} .spark`);
            if (!text || !spark) {
              return [];
            }
            const range = document.createRange();
            range.selectNodeContents(text);
            return [{ slot, gap: spark.getBoundingClientRect().left - range.getBoundingClientRect().right }];
          }),
        );
      });
      expect(gaps.length, `šířka ${width}`).toBeGreaterThan(4);
      // A negative gap means the (faded) trend begins under the end of the text; none is a hole.
      expect(gaps.filter((item) => item.gap > 0), `šířka ${width}`).toEqual([]);
    }
  });

  test("Topení + Klimatizace: jeden cíl ≥ 44 px, aspoň přes celý levý sloupec (TODO P1.5)", async ({ page }) => {
    for (const width of [375, 393, 430, 768]) {
      await open(page, "full", width);
      const sizes = await page.evaluate(() => {
        const card = document.querySelector("ha-klima-dashboard")!.shadowRoot!;
        return [...card.querySelectorAll(".room")].map((room) => {
          const info = room.querySelector(".info")!.getBoundingClientRect();
          const hvac = room.querySelector(".hvac")!.getBoundingClientRect();
          return { height: hvac.height, short: (info.width - 6) / 2 - hvac.width };
        });
      });
      for (const size of sizes) {
        expect(size.height, `šířka ${width}`).toBeGreaterThanOrEqual(44);
        expect(size.short, `šířka ${width}`).toBeLessThanOrEqual(0.5);
      }
    }
  });

  /**
   * Measures the real touch target of every button of the card by hit-testing a grid around it:
   * the invisible ::before/::after extensions count, a neighbour that covers the area does not.
   */
  const hitAreas = (page: Page, scope = "") =>
    page.evaluate((prefix) => {
      const root = document.querySelector("ha-klima-dashboard")!.shadowRoot!;
      const selector = ["button", "[role='button']", "a[href]", "[tabindex='0']"].map((item) => `${prefix} ${item}`.trim()).join(", ");
      const targets = [...root.querySelectorAll<HTMLElement>(selector)].filter(
        (element) => !(element as HTMLButtonElement).disabled && element.getBoundingClientRect().width > 0,
      );
      const hits = (element: HTMLElement, x: number, y: number) => {
        const hit = x < 0 || y < 0 || x >= innerWidth || y >= innerHeight ? null : root.elementFromPoint(x, y);
        return Boolean(hit && (hit === element || element.contains(hit)));
      };
      // Extent of the target along one line through its centre (1 px steps, 40 px beyond the box).
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
        return {
          name: `${element.className.toString().replace(/\s+/g, ".")}${element.getAttribute("data-room") ? `[${element.getAttribute("data-room")}]` : ""}`,
          width: extent(element, true),
          height: extent(element, false),
          visible: box.top >= 0 && box.bottom <= innerHeight,
        };
      });
    }, scope);

  const tooSmall = async (page: Page, label: string, scope = "") => {
    const areas = (await hitAreas(page, scope)).filter((area) => area.visible);
    expect(areas.length, label).toBeGreaterThan(0);
    return areas.filter((area) => area.width < 43.5 || area.height < 43.5).map((area) => `${label}: ${JSON.stringify(area)}`);
  };

  test("všechny klikací prvky mají cíl aspoň 44 × 44 px (TODO P1.2)", async ({ page }) => {
    for (const width of [320, 393, 430]) {
      await open(page, "full", width, 3200);
      expect(await tooSmall(page, `karta ${width}`)).toEqual([]);
    }
    // Open windows with the time and the conflict dot, and the two-column layout.
    await open(page, "alarm", 393, 3200);
    expect(await tooSmall(page, "alarm")).toEqual([]);
    await open(page, "full", 734, 3200);
    expect(await tooSmall(page, "dva sloupce")).toEqual([]);
    // Room link, two presets, two windows (CURRENT_SPEC.md, Konfigurace).
    for (const width of [320, 393]) {
      await open(page, "config", width, 3200);
      expect(await tooSmall(page, `konfigurace ${width}`)).toEqual([]);
    }
  });

  test("klikací prvky v oknech (Topení, Kvalita vzduchu, Historie) mají cíl aspoň 44 px (TODO P1.2)", async ({ page }) => {
    await open(page, "full", 393, 852);
    for (const trigger of [".slot-hvac", ".air-block", ".trend-button"]) {
      await page.locator(".room").first().locator(trigger).click();
      await expect(page.locator(".sheet")).toBeVisible();
      await settle(page);
      expect(await tooSmall(page, trigger, ".sheet")).toEqual([]);
      await page.keyboard.press("Escape");
      await expect(page.locator(".sheet")).toHaveCount(0);
    }
  });

  test("text HVAC smí přesáhnout do trendu: WindFree · 22 °C je celé na 393 px (TODO P1.1)", async ({ page }) => {
    await open(page, "summer");
    const row = page.locator(".room").nth(1).locator(".hvac .system-row").first();
    await expect(row).toContainText("WindFree");
    const hidden = await row.evaluate((element) => {
      const label = element.querySelector(".row-label")!.getBoundingClientRect();
      const unit = element.querySelector(".row-unit")!.getBoundingClientRect();
      return unit.top - label.top > 2;
    });
    expect(hidden).toBe(false);
  });
});

test.describe("dva sloupce na šířku (Room Card)", () => {
  // The harness adds 16 px of body margin, so the card is `viewport − 16` px wide: 635 → 619 px
  // (one column), 636 → 620 px (two columns).
  const layout = (page: Page) =>
    page.evaluate(() => {
      const card = document.querySelector("ha-klima-dashboard")!.shadowRoot!;
      const rooms = [...card.querySelectorAll(".room-cell")].map((cell) => {
        const box = cell.getBoundingClientRect();
        return { left: Math.round(box.left), top: Math.round(box.top), width: Math.round(box.width) };
      });
      return {
        dashboard: Math.round(card.querySelector(".dashboard")!.getBoundingClientRect().width),
        columns: new Set(rooms.map((room) => room.left)).size,
        rooms,
      };
    });

  test("jeden sloupec do 619 px šířky karty, od 620 px dva, nikdy víc", async ({ page }) => {
    for (const [width, columns] of [[320, 1], [393, 1], [430, 1], [600, 1], [635, 1], [636, 2], [734, 2], [852, 2], [1200, 2], [1600, 2]] as const) {
      await open(page, "full", width);
      const { dashboard, columns: actual } = await layout(page);
      expect(actual, `viewport ${width}, karta ${dashboard} px`).toBe(columns);
    }
  });

  test("ve dvou sloupcích: stejně široké místnosti, řádky shora dolů a zleva doprava, pátá vlevo sama", async ({ page }) => {
    for (const width of [636, 734, 852]) {
      await open(page, "full", width);
      const { rooms, dashboard } = await layout(page);
      expect(rooms, `viewport ${width}`).toHaveLength(5);
      const widths = new Set(rooms.map((room) => room.width));
      expect(widths.size, `viewport ${width}: šířky ${[...widths]}`).toBe(1);
      for (const [left, right] of [[0, 1], [2, 3]]) {
        expect(rooms[left].top, `řádek ${left}/${right}`).toBe(rooms[right].top);
        expect(rooms[left].left).toBeLessThan(rooms[right].left);
      }
      expect(rooms[2].top).toBeGreaterThan(rooms[0].top);
      expect(rooms[4].top).toBeGreaterThan(rooms[2].top);
      expect(rooms[4].left, "pátá místnost je ve sloupci vlevo").toBe(rooms[0].left);
      expect(rooms[1].left + rooms[1].width, "pravý okraj nepřesahuje kartu").toBeLessThanOrEqual(rooms[0].left + dashboard);
    }
  });

  test("proměnné úzké karty se řídí šířkou místnosti, ne displeje", async ({ page }) => {
    const column = (page: Page) =>
      page.evaluate(() => {
        const room = document.querySelector("ha-klima-dashboard")!.shadowRoot!.querySelector(".room")!;
        return { col: getComputedStyle(room).getPropertyValue("--col").trim(), width: Math.round(room.getBoundingClientRect().width) };
      });
    // Portrait: 360 → room 344 px (narrow), 393 → room 377 px (normal).
    await open(page, "full", 360);
    expect(await column(page)).toMatchObject({ col: "52px" });
    await open(page, "full", 393);
    expect(await column(page)).toMatchObject({ col: "60px" });
    // Two columns: 720 → room ≈ 346 px (narrow even though the display is wide), 852 → ≈ 412 px.
    await open(page, "full", 720);
    const narrow = await column(page);
    expect(narrow.col, `místnost ${narrow.width} px`).toBe("52px");
    await open(page, "full", 852);
    const normal = await column(page);
    expect(normal.col, `místnost ${normal.width} px`).toBe("60px");
  });

  test("ilustrace nepřekrývá vlhkost ani název ani ve dvou sloupcích", async ({ page }) => {
    for (const width of [636, 734, 852]) {
      await open(page, "longnames", width);
      const { rooms } = await layout(page);
      expect(await sceneOverlaps(page), `viewport ${width}, místnost ${rooms[0].width} px`).toEqual([]);
    }
  });

  test("iPhone 14 Pro na šířku (852 × 393): bez vodorovného posouvání, popupy se vejdou na výšku", async ({ page }) => {
    for (const scenario of ["real", "full", "longnames", "alarm"]) {
      await open(page, scenario, 852, 393);
      expect(await page.evaluate(() => document.documentElement.scrollWidth), scenario).toBeLessThanOrEqual(852);
    }
    await open(page, "full", 852, 393);
    for (const [trigger, name] of [[".hvac", "Topení / Klimatizace"], [".room .temperature", "historie"]] as const) {
      await page.locator(trigger).first().click();
      await expect(page.locator(".sheet")).toBeVisible();
      await settle(page);
      const box = await page.locator(".sheet").boundingBox();
      expect(box!.y, `${name}: začátek popupu`).toBeGreaterThanOrEqual(0);
      expect(box!.y + box!.height, `${name}: konec popupu`).toBeLessThanOrEqual(393);
      await page.keyboard.press("Escape");
      await expect(page.locator(".sheet")).toHaveCount(0);
    }
  });
});

test.describe("stav místnosti a souhrn (Stavový systém, Chybějící data)", () => {
  test("bez režimu domu a senzorů: Bez dat s důvodem", async ({ page }) => {
    await open(page, "real");
    expect(tidy(await statuses(page))).toEqual([
      "Bez dat · režim domu",
      "Bez dat · CO₂",
      "Bez dat · teplota",
      "Bez dat · teplota",
      "Bez dat · teplota",
    ]);
  });

  test("plná data v Zimě: Příjemné", async ({ page }) => {
    await open(page, "full");
    expect(tidy(await statuses(page))).toEqual(Array(5).fill("Příjemné"));
  });

  test("poplach: stavy, barvy čísel a souhrn", async ({ page }) => {
    await open(page, "alarm");
    const list = tidy(await statuses(page));
    expect(list.slice(0, 3)).toEqual(["Silně vydýchaný vzduch", "Znečištěný vzduch", "Vlhko"]);
    // Conflicts (open window while heating) come first, then the usual house summary (TODO P2.14).
    const chips = tidy(await page.locator(".summary .chip").allInnerTexts());
    expect(chips[0]).toMatch(/^Okno otevřené · topí se: /);
    expect(chips.slice(1)).toEqual(["5 oken otevřených", "Ručně: 5 místností", "Topí 3 místnosti"]);
    const co2 = page.locator(".room").first().locator(".slot-co2 .row-label");
    await expect(co2).toHaveCSS("color", "rgb(255, 69, 58)");
  });

  test("Léto: pořadí řádků, Chladno a souhrn klimatizace", async ({ page }) => {
    await open(page, "summer");
    expect(tidy(await statuses(page))[1]).toBe("Chladno");
    await expect(page.locator(".room").first().locator(".hvac .system-row").first()).toContainText("WindFree Sleep");
    await expect(page.locator(".summary .chip").last()).toHaveText("Klimatizace: Ložnice, Pracovna");
  });

  test("zastaralá data: šedá hodnota a důvod ve stavu (TODO P2.3)", async ({ page }) => {
    await open(page, "stale");
    const list = tidy(await statuses(page));
    expect(list[0]).toBe("Bez dat · PM2.5 (před 3 h)");
    expect(list[1]).toBe("Bez dat · teplota (před 3 h)");
    await expect(page.locator(".room").nth(1).locator(".temperature")).toHaveClass(/stale/);
    await expect(page.locator(".room").first().locator(".slot-pm25")).toHaveAttribute("title", "Naposledy před 3 h");
  });

  test("bez odpovědi REST se nic neoznačí jako zastaralé", async ({ page }) => {
    await open(page, "rest-error");
    expect(tidy(await statuses(page))).toEqual(Array(5).fill("Příjemné"));
  });

  test("vše nedostupné: ikony zůstanou, panel žaluzie přerušovaný", async ({ page }) => {
    await open(page, "unavailable");
    expect(tidy(await statuses(page))).toEqual(Array(5).fill("Bez dat · teplota"));
    await expect(page.locator(".room").first().locator('.cover-panel rect[stroke-dasharray="3 3"]')).toHaveCount(1);
  });
});

test.describe("přístupnost", () => {
  test("axe: karta, popup Topení / Klimatizace a historie bez porušení", async ({ page }) => {
    await open(page, "full");
    expect(await axeViolations(page)).toEqual([]);
    await page.locator(".hvac").first().click();
    expect(await axeViolations(page)).toEqual([]);
    await page.keyboard.press("Escape");
    await page.locator(".room .temperature").first().click();
    await expect(page.locator(".readout")).toBeVisible();
    expect(await axeViolations(page)).toEqual([]);
  });

  test("axe: popup Kvalita vzduchu a otevřené okno s dobou otevření bez porušení", async ({ page }) => {
    await open(page, "alarm");
    expect(await axeViolations(page)).toEqual([]);
    await page.locator(".air-block").first().click();
    await expect(page.locator(".list-options")).toBeVisible();
    expect(await axeViolations(page)).toEqual([]);
  });

  test("název bloku CO₂ / PM2.5 = viditelný text, kontext v popisu (TODO P1.2, P1.6)", async ({ page }) => {
    await open(page, "full");
    const block = page.locator(".air-block").first();
    await expect(block).toHaveAccessibleName(/^656\s+ppm\s+2\s+µg\/m³$/);
    await expect(block).toHaveAccessibleDescription(/^Ložnice: kvalita vzduchu, CO₂ 656 ppm, za 2 hodiny .*; PM2\.5 2 µg\/m³.*Otevře detaily\.$/);
  });

  test("název tlačítka Topení / Klimatizace = viditelný text, kontext v popisu (TODO P1.6)", async ({ page }) => {
    await open(page, "full");
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
    await page.keyboard.press("Escape");
    await expect(page.locator(".sheet")).toHaveCount(0);
    await expect(hvac).toBeFocused();
  });
});

test.describe("panel a předvolby žaluzií (Žaluzie)", () => {
  test("předvolby jsou vpravo od panelu, stejně vysoké, shora dolů Den, Stín, Tma", async ({ page }) => {
    for (const width of [320, 393, 768]) {
      await open(page, "full", width);
      const layout = await page.evaluate(() => {
        const room = document.querySelector("ha-klima-dashboard")!.shadowRoot!.querySelector(".room")!;
        const panel = room.querySelector(".cover-panel")!.getBoundingClientRect();
        const presets = room.querySelector(".presets")!.getBoundingClientRect();
        return {
          gap: presets.left - panel.right,
          top: presets.top - panel.top,
          bottom: presets.bottom - panel.bottom,
          titles: [...room.querySelectorAll(".preset")].map((preset) => preset.getAttribute("title")),
        };
      });
      expect(layout.gap, `šířka ${width}`).toBeGreaterThanOrEqual(0);
      expect(Math.abs(layout.top) + Math.abs(layout.bottom), `šířka ${width}`).toBeLessThan(1);
      expect(layout.titles).toEqual(["Den", "Stín", "Tma"]);
    }
  });

  test("11 lamel; okno má stálou tloušťku lamel, žaluzie ji mění s naklopením", async ({ page }) => {
    await open(page, "full");
    const heights = await page.evaluate(() =>
      [...document.querySelector("ha-klima-dashboard")!.shadowRoot!.querySelectorAll(".room")].slice(0, 3).map((room) => {
        const slats = [...room.querySelectorAll(".cover-panel rect:not(.rail)")];
        // The colour is a CSS variable in the style (dark theme: champagne blind, sky window).
        const by = (colour: string) =>
          slats.filter((slat) => getComputedStyle(slat).fill === colour).map((slat) => +slat.getAttribute("height")!);
        return { count: slats.length, blind: by("rgb(232, 217, 181)"), window: by("rgb(100, 210, 255)") };
      }),
    );
    // Ložnice 0 / 0: all 11 lowered, nearly solid.
    expect(heights[0].count).toBe(11);
    expect(heights[0].blind).toHaveLength(11);
    expect(Math.min(...heights[0].blind)).toBeGreaterThan(11);
    // Pracovna 100 / 100: all 11 are the window, 2 px lines (twice the former minimum).
    expect(heights[1].window).toEqual(Array(11).fill(2));
    // Maxík 40 / 60: 7 lowered slats of the same tilt, 4 window slats still 2 px.
    expect(heights[2].blind).toHaveLength(7);
    expect(new Set(heights[2].blind).size).toBe(1);
    expect(heights[2].blind[0]).toBeGreaterThan(5);
    expect(heights[2].window).toEqual(Array(4).fill(2));
  });

  test("ikony předvoleb jsou tlumené; ta, která odpovídá stavu žaluzie (Den, Stín i Tma), jen změní barvu, bez podbarvení", async ({ page }) => {
    await open(page, "full");
    // The icon colour fades (a CSS transition), so wait until it has settled before reading it.
    const looks = async () => {
      await settle(page);
      return page.evaluate(() =>
        [...document.querySelector("ha-klima-dashboard")!.shadowRoot!.querySelectorAll(".room")].slice(0, 4).map((room) =>
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
      await page.evaluate(([id, v, p, t]) => window.__test.cover(id, v, p, t), ["cover.loznice_zaluzie_loznice", value, position, tilt] as const);
      state = await looks();
      expect(state[0], `${value} ${position}/${tilt}`).toEqual([dim, lit, dim]);
    }
    // Beyond the tolerance no preset is lit (a custom position).
    await page.evaluate(([id]) => window.__test.cover(id, "open", 6, 100), ["cover.loznice_zaluzie_loznice"] as const);
    expect((await looks())[0]).toEqual([dim, dim, dim]);
  });

  test("žaluzie sjede do Tmy (0 / 0) a po otevření lamel (4 / 100) se rozsvítí Stín místo Tmy", async ({ page }) => {
    await open(page, "full");
    const lit = (index: number) => page.locator(".room").nth(index).locator('.preset[aria-pressed="true"]').evaluateAll((items) => items.map((item) => item.getAttribute("title")));
    await page.evaluate(([id]) => window.__test.cover(id, "closed", 0, 0), ["cover.loznice_zaluzie_loznice"] as const);
    expect(await lit(0)).toEqual(["Tma"]);
    await page.evaluate(([id]) => window.__test.cover(id, "open", 4, 100), ["cover.loznice_zaluzie_loznice"] as const);
    expect(await lit(0)).toEqual(["Stín"]);
  });

  test("kontrast ikon předvoleb: šedá aspoň 3:1 na pozadí karty, svítící není čistě bílá", async ({ page }) => {
    await open(page, "full");
    const [idle, on] = [[111, 111, 116], [201, 192, 168]];
    const luminance = ([r, g, b]: number[]) => {
      const [lr, lg, lb] = [r, g, b].map((v) => ((v / 255 + 0.055) / 1.055) ** 2.4);
      return 0.2126 * lr + 0.7152 * lg + 0.0722 * lb;
    };
    const ratio = (rgb: number[]) => (luminance(rgb) + 0.05) / (luminance([28, 28, 30]) + 0.05);
    expect(ratio(idle)).toBeGreaterThanOrEqual(3);
    expect(ratio(on)).toBeGreaterThan(ratio(idle));
    expect(on).not.toEqual([255, 255, 255]);
  });

  test("konec mikrotrendu je od panelu 1,5× mezery panel–předvolba", async ({ page }) => {
    for (const width of [320, 375, 393, 430, 768]) {
      await open(page, "full", width);
      const gaps = await page.evaluate(() => {
        const room = document.querySelector("ha-klima-dashboard")!.shadowRoot!.querySelector(".room")!;
        const panel = room.querySelector(".cover-panel")!.getBoundingClientRect();
        const dot = room.querySelector(".slot-co2 .spark-dot")!.getBoundingClientRect();
        const rail = room.querySelector(".preset svg rect")!.getBoundingClientRect();
        return { trend: panel.left - dot.right, preset: rail.left - panel.right };
      });
      expect(Math.abs(gaps.trend - 1.5 * gaps.preset), `šířka ${width}: ${JSON.stringify(gaps)}`).toBeLessThan(0.7);
    }
  });

  test("CO₂ a PM2.5 mají různou barvu ikony i mikrotrendu", async ({ page }) => {
    await open(page, "full");
    const colours = await page.evaluate(() => {
      const room = document.querySelector("ha-klima-dashboard")!.shadowRoot!.querySelector(".room")!;
      const colour = (selector: string) => getComputedStyle(room.querySelector(selector)!).color;
      return {
        co2: [colour(".slot-co2 .row-icon"), colour(".slot-co2 .spark")],
        pm25: [colour(".slot-pm25 .row-icon"), colour(".slot-pm25 .spark")],
      };
    });
    expect(colours.co2[0]).toBe(colours.co2[1]);
    expect(colours.pm25[0]).toBe(colours.pm25[1]);
    expect(colours.co2[0]).not.toBe(colours.pm25[0]);
  });

  test("barvy CO₂ a PM2.5 jsou tlumené (sytost do 40 %), ale čitelné (kontrast aspoň 6 : 1)", async ({ page }) => {
    await open(page, "full");
    const colours = await page.evaluate(() => {
      const room = document.querySelector("ha-klima-dashboard")!.shadowRoot!.querySelector(".room")!;
      return [".slot-co2 .row-icon", ".slot-pm25 .row-icon"].map((selector) => getComputedStyle(room.querySelector(selector)!).color);
    });
    const luminance = ([r, g, b]: number[]) => {
      const f = (c: number) => (c / 255 <= 0.03928 ? c / 255 / 12.92 : ((c / 255 + 0.055) / 1.055) ** 2.4);
      return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
    };
    const card = luminance([28, 28, 30]);
    for (const colour of colours) {
      const rgb = colour.match(/\d+/g)!.map(Number);
      const max = Math.max(...rgb) / 255;
      const min = Math.min(...rgb) / 255;
      const lightness = (max + min) / 2;
      const saturation = max === min ? 0 : (max - min) / (1 - Math.abs(2 * lightness - 1));
      expect(saturation, colour).toBeLessThanOrEqual(0.4);
      expect((luminance(rgb) + 0.05) / (card + 0.05), colour).toBeGreaterThanOrEqual(6);
    }
  });

  test("ilustrace končí nad panelem žaluzie", async ({ page }) => {
    for (const width of [375, 393, 430]) {
      await open(page, "full", width);
      const gap = await page.evaluate(() =>
        [...document.querySelector("ha-klima-dashboard")!.shadowRoot!.querySelectorAll(".room")].map((room) => {
          const drawing = room.querySelector(".scene svg")!.getBoundingClientRect();
          const panel = room.querySelector(".cover-panel")?.getBoundingClientRect();
          // The drawing sits in the upper part of its 112 px box; measure to the lowest stroke.
          const lowest = Math.max(...[...room.querySelectorAll(".scene svg *")].map((node) => (node as SVGGraphicsElement).getBoundingClientRect().bottom));
          return panel && panel.height > 0 ? panel.top - Math.min(lowest, drawing.bottom) : 99;
        }),
      );
      for (const value of gap) expect(value, `šířka ${width}`).toBeGreaterThanOrEqual(22);
    }
  });
});

test.describe("předvolba na cestě (Žaluzie)", () => {
  const COVER = "cover.loznice_zaluzie_loznice";

  test("po odeslání pulzuje cílová ikona, ostatní zhasnou; po dojezdu svítí natrvalo", async ({ page }) => {
    await open(page, "full");
    const room = page.locator(".room").first();
    const den = room.locator(".preset").nth(0);
    await den.dblclick();
    await expect(den).toHaveClass(/pending/);
    await expect(den).toHaveAttribute("aria-busy", "true");
    // Tma (the state before sending) is no longer lit; only the target pulses.
    await expect(room.locator('.preset[aria-pressed="true"]')).toHaveCount(0);
    expect(await den.evaluate((element) => getComputedStyle(element).animationName)).toBe("preset-tint");
    // The blind is moving: still pulsing.
    await page.evaluate((id) => window.__test.cover(id, "opening", 55, 60), COVER);
    await expect(den).toHaveClass(/pending/);
    // Arrived: no pulsing, steady lit colour.
    await page.evaluate((id) => window.__test.cover(id, "open", 100, 100), COVER);
    await expect(den).not.toHaveClass(/pending/);
    await expect(den).toHaveAttribute("aria-pressed", "true");
    await expect(den).not.toHaveAttribute("aria-busy", "true");
    await expect.poll(() => den.evaluate((element) => getComputedStyle(element).color)).toBe("rgb(201, 192, 168)");
  });

  test("zastaví-li se změna na 5 s, pulzování skončí; každá změna odpočet obnoví", async ({ page }) => {
    await page.clock.install({ time: new Date("2026-10-24T10:00:00Z") });
    await open(page, "full");
    await page.clock.pauseAt(new Date("2026-10-24T10:01:00Z"));
    const room = page.locator(".room").first();
    const den = room.locator(".preset").nth(0);
    await den.dblclick();
    await expect(den).toHaveClass(/pending/);
    await page.clock.runFor(3_000);
    await expect(den).toHaveClass(/pending/);
    // The blind moves: the countdown starts again, so 6 s after sending it still pulses.
    await page.evaluate((id) => window.__test.cover(id, "opening", 20, 0), COVER);
    await page.clock.runFor(3_000);
    await expect(den).toHaveClass(/pending/);
    // Nothing changes for 5 s (stopped somewhere else): the pulsing ends, nothing is lit.
    await page.clock.runFor(2_500);
    await expect(den).not.toHaveClass(/pending/);
    await expect(room.locator('.preset[aria-pressed="true"]')).toHaveCount(0);
  });

  test("blind už v poloze předvolby: nic nepulzuje; chyba skriptu pulzování ukončí", async ({ page }) => {
    await open(page, "full");
    const room = page.locator(".room").first();
    // Ložnice is already in Tma.
    await room.locator(".preset").nth(2).dblclick();
    await expect.poll(() => page.evaluate(() => window.__test.services.length)).toBe(1);
    await expect(room.locator(".preset.pending")).toHaveCount(0);
    await expect(room.locator(".preset").nth(2)).toHaveAttribute("aria-pressed", "true");
    // A failing script: the pulse ends, failure haptic and a notice.
    await page.evaluate(() => {
      window.__test.failNext = true;
    });
    await room.locator(".preset").nth(0).dblclick();
    await expect(page.locator(".notice")).toContainText("skript žaluzií se nepodařilo spustit");
    await expect(room.locator(".preset.pending")).toHaveCount(0);
    expect(await page.evaluate(() => window.__test.haptics)).toContain("failure");
  });
});

test.describe("předvolby žaluzií (Žaluzie)", () => {
  test("myš: klepnutí ukáže nápovědu, dvojklik odešle skript", async ({ page }) => {
    await open(page, "full");
    const preset = page.locator(".preset").nth(1);
    await preset.click();
    await expect(page.locator(".preset-hint")).toHaveText("Podržte nebo klepněte dvakrát");
    // @ts-expect-error test hook
    expect(await page.evaluate(() => [window.__test.haptics, window.__test.services.length])).toEqual([["selection"], 0]);
    await page.waitForTimeout(1_700);
    await preset.dblclick();
    // @ts-expect-error test hook
    await expect.poll(() => page.evaluate(() => window.__test.services)).toEqual([
      ["script", "zaluzie_posun", { entity: "cover.loznice_zaluzie_loznice", pos: 0, tilt: 100 }],
    ]);
    // @ts-expect-error test hook
    expect(await page.evaluate(() => window.__test.haptics)).toEqual(["selection", "success"]);
  });

  test("dotyk: dlouhý stisk odešle skript i při pohybu prstu", async ({ browser }) => {
    const context = await browser.newContext({ viewport: { width: 393, height: 852 }, hasTouch: true, isMobile: true });
    const page = await context.newPage();
    await open(page, "full");
    const cdp = await context.newCDPSession(page);
    const [x, y] = await centre(page, ".preset", 0);
    await touch(cdp, "touchStart", x, y);
    await page.waitForTimeout(200);
    await touch(cdp, "touchMove", x + 6, y + 4);
    await page.waitForTimeout(500);
    await touch(cdp, "touchEnd");
    // The first (top) preset is Den: raised, slats open.
    // @ts-expect-error test hook
    await expect.poll(() => page.evaluate(() => window.__test.services)).toEqual([
      ["script", "zaluzie_posun", { entity: "cover.loznice_zaluzie_loznice", pos: 100, tilt: 100 }],
    ]);
    await context.close();
  });

  test("nedostupná žaluzie: předvolby šedé, nic neodešlou, vysvětlí proč (TODO P2.17)", async ({ page }) => {
    await open(page, "cover-unavailable");
    const presets = page.locator(".room").first().locator(".preset");
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
    // @ts-expect-error test hook
    expect(await page.evaluate(() => window.__test.services.length)).toBe(0);
    // @ts-expect-error test hook
    expect(await page.evaluate(() => window.__test.haptics)).toContain("warning");
  });

  test("pohyb žaluzie: kolejnice pulzuje (TODO P2.6)", async ({ page }) => {
    await open(page, "moving");
    await expect(page.locator(".room").first().locator(".cover-panel")).toHaveClass(/moving/);
  });
});

test.describe("historie místnosti (Historie a grafy)", () => {
  test("otevření, prohlížení myší a klávesnicí", async ({ page }) => {
    await open(page, "full");
    await page.locator(".room .temperature").first().click();
    await expect(page.locator("#sheet-title")).toHaveText("Historie místnosti – 24 h");
    await expect(page.locator(".readout-time")).toHaveText("Teď");
    const chart = page.locator("svg.chart");
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
  });

  test("graf se po otočení / změně šířky překreslí (TODO P3.10)", async ({ page }) => {
    await open(page, "full");
    await page.locator(".room .temperature").first().click();
    await expect(page.locator("svg.chart")).toHaveAttribute("width", "361");
    await page.setViewportSize({ width: 700, height: 852 });
    await expect(page.locator("svg.chart")).toHaveAttribute("width", "428");
  });

  test("popup se zavře tažením dolů (TODO P2.11)", async ({ page }) => {
    await open(page, "full");
    await page.locator(".hvac").first().click();
    const [x, y] = await centre(page, ".sheet-top");
    await page.mouse.move(x, y);
    await page.mouse.down();
    await page.mouse.move(x, y + 60, { steps: 5 });
    await page.mouse.move(x, y + 200, { steps: 5 });
    await page.mouse.up();
    await expect(page.locator(".sheet")).toHaveCount(0);
  });

  test("osa teploty se řídí naměřenou teplotou: křivka vyplní výšku grafu, cíl mimo rozsah ji nesmáčkne", async ({ page }) => {
    await open(page, "full");
    // 24 h of 20,2–22,0 °C; the heating target is 18 °C for a while, far below the curve.
    await page.evaluate(() => {
      // @ts-expect-error test hook
      const test = window.__test;
      const now = Date.now() / 1000;
      const hours = (ago: number) => now - ago * 3600;
      const temperature = test.config.rooms[0].temperature;
      const target = test.config.rooms[0].heating.target;
      test.historyFor = (id: string) => {
        if (id === temperature) {
          return [20.2, 20.9, 21.4, 21.9, 22.0, 21.6, 21.9].map((value, i) => ({ s: String(value), lu: hours(24 - i * 4) }));
        }
        if (id === target) {
          return [21, 18, 21].map((value, i) => ({ s: String(value), lu: hours(24 - i * 8) }));
        }
        return undefined;
      };
    });
    await page.locator(".room .temperature").first().click();
    await expect(page.locator("svg.chart")).toBeVisible();
    const chart = await page.evaluate(() => {
      const svg = document.querySelector("ha-klima-dashboard")!.shadowRoot!.querySelector("svg.chart")!;
      const ys = (path: Element) => [...(path.getAttribute("d") ?? "").matchAll(/[ML]([\d.]+) ([\d.]+)/g)].map((m) => Number(m[2]));
      const curve = [...svg.querySelectorAll("path")].find((path) => path.getAttribute("stroke-width") === "2")!;
      const target = [...svg.querySelectorAll("path")].find((path) => path.getAttribute("stroke-dasharray") === "3 3")!;
      const labels = [...svg.querySelectorAll("text")].map((text) => text.textContent ?? "").filter((text) => text.endsWith("°"));
      const plot = svg.querySelector("clipPath#history-plot rect")!;
      return {
        curveTop: Math.min(...ys(curve)),
        curveBottom: Math.max(...ys(curve)),
        top: Number(plot.getAttribute("y")),
        height: Number(plot.getAttribute("height")),
        labels,
        targetClipped: target.getAttribute("clip-path"),
        targetBottom: Math.max(...ys(target)),
      };
    });
    // The curve covers at least 85 % of the plot height (it was a thin line at the top before).
    expect((chart.curveBottom - chart.curveTop) / chart.height).toBeGreaterThan(0.85);
    expect(chart.curveTop).toBeGreaterThanOrEqual(chart.top);
    expect(chart.curveBottom).toBeLessThanOrEqual(chart.top + chart.height);
    // Labels lie within the measured range, in cs-CZ with half degrees: 20,5° … 22°, nothing like 4°.
    expect(chart.labels).toEqual(["20,5°", "21°", "21,5°", "22°"]);
    // The 18 °C target is below the axis: the line is clipped to the plot instead of stretching it.
    expect(chart.targetClipped).toBe("url(#history-plot)");
    expect(chart.targetBottom).toBeGreaterThan(chart.top + chart.height);
  });

  test("Vypnuto má přednost před cílem: 5 °C při vypnutém topení se v grafu nekreslí ani na přechodu", async ({ page }) => {
    await open(page, "full");
    // Off from 17 h to 14 h ago. The target entity flips 3 s before / after the mode entity,
    // so for 3 s the mode is still Plán while the target is already 5 °C (and the other way round).
    await page.evaluate(() => {
      // @ts-expect-error test hook
      const test = window.__test;
      const now = Date.now() / 1000;
      const hours = (ago: number) => now - ago * 3600;
      const heating = test.config.rooms[0].heating;
      const temperature = test.config.rooms[0].temperature;
      test.historyFor = (id: string) => {
        if (id === temperature) {
          return [20.2, 20.9, 21.4, 21.9, 22.0, 21.6, 21.9].map((value, i) => ({ s: String(value), lu: hours(24 - i * 4) }));
        }
        if (id === heating.climate) {
          return [{ s: "auto", lu: hours(24) }, { s: "off", lu: hours(17) }, { s: "auto", lu: hours(14) }];
        }
        if (id === heating.overlay) return [{ s: "Schedule", lu: hours(24) }];
        if (id === heating.target) {
          return [
            { s: "21", lu: hours(24) },
            { s: "5", lu: hours(17) - 3 },
            { s: "21", lu: hours(14) + 3 },
          ];
        }
        return undefined;
      };
    });
    await page.locator(".room .temperature").first().click();
    await expect(page.locator("svg.chart")).toBeVisible();
    const target = await page.evaluate(() => {
      const svg = document.querySelector("ha-klima-dashboard")!.shadowRoot!.querySelector("svg.chart")!;
      const path = [...svg.querySelectorAll("path")].find((p) => p.getAttribute("stroke-dasharray") === "3 3")!;
      const d = path.getAttribute("d") ?? "";
      const ys = [...d.matchAll(/[ML]([\d.]+) ([\d.]+)/g)].map((m) => Number(m[2]));
      return { ys, moves: (d.match(/M/g) ?? []).length };
    });
    // One level only (21 °C, two pieces around the off period), no step down to 5 °C.
    expect(new Set(target.ys.map((y) => Math.round(y))).size).toBe(1);
    expect(target.moves).toBe(2);
  });

  test("osa teploty: ploché měření se nenatahuje na šum, aspoň 1,5 °C", async ({ page }) => {
    await open(page, "full");
    await page.evaluate(() => {
      // @ts-expect-error test hook
      const test = window.__test;
      const now = Date.now() / 1000;
      const temperature = test.config.rooms[0].temperature;
      test.historyFor = (id: string) =>
        id === temperature
          ? [21.0, 21.1, 21.0, 21.1, 21.0].map((value, i) => ({ s: String(value), lu: now - (24 - i * 6) * 3600 }))
          : undefined;
    });
    await page.locator(".room .temperature").first().click();
    await expect(page.locator("svg.chart")).toBeVisible();
    const share = await page.evaluate(() => {
      const svg = document.querySelector("ha-klima-dashboard")!.shadowRoot!.querySelector("svg.chart")!;
      const curve = [...svg.querySelectorAll("path")].find((path) => path.getAttribute("stroke-width") === "2")!;
      const ys = [...(curve.getAttribute("d") ?? "").matchAll(/[ML]([\d.]+) ([\d.]+)/g)].map((m) => Number(m[2]));
      return (Math.max(...ys) - Math.min(...ys)) / 150;
    });
    expect(share).toBeLessThan(0.15);
  });

  test("den změny času 25. 10.: noc 22–6 h je 9 h, popisky v celých hodinách", async ({ page }) => {
    const measure = async (when: string) => {
      await page.clock.setFixedTime(new Date(when));
      await open(page, "full");
      await page.locator(".room .temperature").first().click();
      await expect(page.locator("svg.chart")).toBeVisible();
      return page.evaluate(() => {
        const chart = document.querySelector("ha-klima-dashboard")!.shadowRoot!.querySelector("svg.chart")!;
        const ticks = [...chart.querySelectorAll("text")].map((text) => text.textContent ?? "").filter((text) => text.includes(":"));
        const nights = [...chart.querySelectorAll("rect")]
          .filter((rect) => rect.classList.contains("night"))
          .map((rect) => Number(rect.getAttribute("width")));
        return { ticks, nights };
      });
    };
    const shifted = await measure("2026-10-25T10:00:00+01:00");
    const normal = await measure("2026-10-24T10:00:00+02:00");
    expect(shifted.ticks).toEqual(["12:00", "18:00", "00:00", "06:00"]);
    expect(normal.ticks).toEqual(["12:00", "18:00", "00:00", "06:00"]);
    expect(shifted.nights[0] / normal.nights[0]).toBeCloseTo(9 / 8, 1);
  });
});

test.describe("příčina stavu, konflikty a kvalita vzduchu (TODO P2.14, P2.15, P1.2)", () => {
  const colours = (page: Page) =>
    page.evaluate(() =>
      [...document.querySelector("ha-klima-dashboard")!.shadowRoot!.querySelectorAll("article.room")].map((room) => ({
        temperature: getComputedStyle(room.querySelector(".temperature")!).color,
        humidity: getComputedStyle(room.querySelector(".humidity")!).color,
        status: getComputedStyle(room.querySelector(".status-line span:last-child")!).color,
      })),
    );

  test("hodnota, která mění Příjemné na jiný stav, má barvu stavu; ostatní zůstávají neutrální", async ({ page }) => {
    await open(page, "alarm");
    const rooms = await colours(page);
    const neutral = rooms[3]; // Mikuláš is calm
    expect(neutral.temperature).not.toBe(neutral.status);
    // Maxík: humidity 76 % -> "Vlhko": the humidity takes the status colour, the temperature stays neutral.
    expect(rooms[2].humidity).toBe(rooms[2].status);
    expect(rooms[2].humidity).not.toBe(neutral.humidity);
    expect(rooms[2].temperature).toBe(neutral.temperature);
    // Ložnice / Pracovna: the cause is CO₂ / PM2.5, so temperature and humidity stay neutral.
    for (const index of [0, 1]) {
      expect(rooms[index].temperature).toBe(neutral.temperature);
      expect(rooms[index].humidity).toBe(neutral.humidity);
    }
    await open(page, "summer");
    const summer = await colours(page);
    // Pracovna is "Chladno": the temperature takes the status colour.
    expect(summer[1].temperature).toBe(summer[1].status);
    expect(summer[1].humidity).toBe(summer[3].humidity);
  });

  test("konflikty: tečka u okna a věty v souhrnu (otevřené okno při topení či chlazení)", async ({ page }) => {
    await open(page, "alarm");
    // Ložnice, Maxík and Obývák heat with the window open.
    await expect(page.locator(".conflict-dot")).toHaveCount(3);
    await expect(page.locator(".slot-window").first()).toHaveAccessibleDescription(/konflikt: otevřené okno při topení/);
    await expect(page.locator(".summary .chip").first()).toContainText("Okno otevřené · topí se");
    await open(page, "summer");
    const chips = tidy(await page.locator(".summary .chip").allInnerTexts());
    // An open window with cooling is reported once; with the window closed it is "cooling although cold".
    expect(chips).toContain("Okno otevřené · chladí se: Pracovna");
    expect(chips.join("|")).not.toContain("i když je chladno");
    await page.evaluate(() => {
      // @ts-expect-error test hook
      const { states, update } = window.__test;
      update({ "binary_sensor.pracovna_okno_pracovna": { ...states["binary_sensor.pracovna_okno_pracovna"], state: "off" } });
    });
    await expect(page.locator(".summary .chip").first()).toHaveText(/Chladí se, i když je chladno: Pracovna/);
    await open(page, "stale");
    await expect(page.locator(".conflict-dot")).toHaveCount(0);
  });

  test("blok CO₂ / PM2.5 otevře popup Kvalita vzduchu a z něj detail každé veličiny", async ({ page }) => {
    await open(page, "full");
    await page.locator(".room").first().locator(".air-block").click();
    const options = page.locator(".list-option");
    await expect(options).toHaveCount(2);
    await expect(options.nth(0)).toContainText("CO₂");
    await expect(options.nth(0).locator(".list-value")).toHaveText("656 ppm");
    await expect(options.nth(1).locator(".list-value")).toHaveText("2 µg/m³");
    await options.nth(0).click();
    await expect(page.locator(".sheet")).toHaveCount(0);
    expect(await page.evaluate(() => window.__test.moreInfo)).toEqual(["sensor.loznice_teplomer_loznice_carbon_dioxide"]);
  });

  test("s jediným čidlem otevře blok rovnou jeho detail, bez čidel je neaktivní", async ({ page }) => {
    await open(page, "real");
    // "real": Ložnice has both sensors, Pracovna none of them.
    await expect(page.locator(".room").nth(1).locator(".air-block")).toBeDisabled();
    await page.evaluate(() => {
      // @ts-expect-error test hook
      const { card, config } = window.__test;
      const rooms = config.rooms.map((room: Record<string, unknown>, index: number) =>
        index === 0 ? { ...room, pm25: undefined } : room,
      );
      card.setConfig({ ...config, rooms });
    });
    await page.locator(".room").first().locator(".air-block").click();
    await expect(page.locator(".sheet")).toHaveCount(0);
    expect(await page.evaluate(() => window.__test.moreInfo)).toEqual(["sensor.loznice_teplomer_loznice_carbon_dioxide"]);
  });
});

test.describe("doba otevření okna, písmo hodnot a hlavička (TODO P1.10, P3.11)", () => {
  const windowRow = (page: Page, index = 1) => page.locator(".room").nth(index).locator(".slot-window");

  test("otevřené okno ukáže slabě, jak dlouho je otevřené; zavřené nic", async ({ page }) => {
    await open(page, "full");
    // Pracovna: window open for 3 minutes (the scenario's default age); the others are closed.
    await expect(windowRow(page)).toContainText(/Otevřeno\s*·\s*3 min/);
    await expect(windowRow(page)).toHaveAccessibleName(/^Otevřeno\s*·\s*3 min$/);
    await expect(windowRow(page)).toHaveAccessibleDescription(/^Pracovna: okno otevřené, otevřené 3 minuty\. Otevře detail a historii\.$/);
    await expect(windowRow(page, 0)).toHaveText(/^\s*Zavřeno\s*$/);
    // Faint: the duration is in the secondary grey and regular weight, the label stays the sky colour.
    const look = await windowRow(page).evaluate((row) => {
      const label = getComputedStyle(row.querySelector(".row-label")!);
      const duration = getComputedStyle(row.querySelector(".window-duration")!);
      return { label: label.color, duration: duration.color, weight: duration.fontWeight };
    });
    expect(look.duration).not.toBe(look.label);
    expect(look.duration).toBe("rgb(154, 154, 160)");
    expect(look.weight).toBe("400");
  });

  test("doba otevření se po půl minutě sama posouvá a mění jednotky (< 1 min, min, h, d)", async ({ page }) => {
    await page.clock.install();
    await open(page, "full");
    await expect(windowRow(page)).toContainText("3 min");
    await page.clock.fastForward("01:02:00");
    await expect(windowRow(page)).toContainText(/Otevřeno\s*·\s*1 h 5 min/);
    await expect(windowRow(page)).toHaveAccessibleDescription(/otevřené 1 hodina 5 minut/);
    await page.clock.fastForward("23:00:00");
    await expect(windowRow(page)).toContainText(/Otevřeno\s*·\s*1 d\s*$/);
    // Closing and opening again starts from zero.
    await page.evaluate(() => {
      // @ts-expect-error test hook
      const { states, update } = window.__test;
      const id = "binary_sensor.pracovna_okno_pracovna";
      update({ [id]: { ...states[id], state: "off" } });
    });
    await expect(windowRow(page)).toHaveText(/^\s*Zavřeno\s*$/);
    await page.evaluate(() => {
      // @ts-expect-error test hook
      const { states, update } = window.__test;
      const id = "binary_sensor.pracovna_okno_pracovna";
      update({ [id]: { ...states[id], state: "on" } });
    });
    await expect(windowRow(page)).toContainText(/Otevřeno\s*·\s*< 1 min/);
  });

  /** Window rows: is anything cut, and is the conflict dot on the visible (first) line of the row. */
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

  test("doba otevření se vejde i na 320 px s tečkou konfliktu a nic se neořízne", async ({ page }) => {
    await open(page, "alarm", 320);
    const rows = await windowRows(page);
    expect(rows.filter((row) => row.cut || row.dotHidden)).toEqual([]);
    // With a conflict the dot stands right after the label, in place of the "·" before the time.
    expect(rows[0]).toMatchObject({ dot: true, text: "Otevřeno 3 min" });
    expect(rows.find((row) => !row.dot)?.text).toBe("Otevřeno · 3 min");
    // Two open windows and a conflict on the narrowest card: the time may give way, the dot never.
    await open(page, "config", 320);
    await page.evaluate(() => {
      // @ts-expect-error test hook
      const { states, update } = window.__test;
      update({
        "binary_sensor.loznice_okno_loznice": { ...states["binary_sensor.loznice_okno_loznice"], state: "on" },
        "binary_sensor.loznice_okno_balkon": { ...states["binary_sensor.loznice_okno_balkon"], state: "on" },
      });
    });
    await expect(page.locator(".room").first().locator(".slot-window .row-label")).toHaveText("Otevřena 2");
    const narrow = await windowRows(page);
    expect(narrow[0]).toMatchObject({ cut: false, dot: true, dotHidden: false });
  });

  test("hodnoty CO₂ a PM2.5 mají stejné písmo jako Plán (polotučné, jednotka běžná)", async ({ page }) => {
    await open(page, "full");
    const weights = await page.locator(".room").first().evaluate((room) => {
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

  test("title: \"\" vynechá nadpis; bez štítků a venkovních podmínek zmizí celá hlavička", async ({ page }) => {
    await open(page, "full");
    const setTitle = (rooms: string[] | undefined) =>
      page.evaluate((names) => {
        // @ts-expect-error test hook
        const { card, config } = window.__test;
        const kept = names ? config.rooms.filter((room: { name: string }) => names.includes(room.name)) : config.rooms;
        card.setConfig({ ...config, title: "", rooms: kept });
      }, rooms);
    // "full" has summary chips (an open window, heating): the heading goes, the chips stay.
    await setTitle(undefined);
    await expect(page.locator("h1")).toHaveCount(0);
    await expect(page.locator(".summary .chip").first()).toBeVisible();
    // Mikuláš alone: nothing differs from a quiet house, so there is no header at all.
    await setTitle(["Mikuláš"]);
    await expect(page.locator(".room")).toHaveCount(1);
    await expect(page.locator(".dashboard-header")).toHaveCount(0);
    // The default title is still "Domov".
    await page.evaluate(() => {
      // @ts-expect-error test hook
      const { card, config } = window.__test;
      card.setConfig({ ...config, title: undefined });
    });
    await expect(page.locator("h1")).toHaveText("Domov");
  });
});

test.describe("konfigurace karty (Konfigurace)", () => {
  /** setConfig of a copy of the scenario config with `patch` on the top level and `roomPatch` on Ložnice; "" = accepted. */
  const configError = (page: Page, patch: Record<string, unknown>, roomPatch: Record<string, unknown> = {}) =>
    page.evaluate(
      ([top, room]) => {
        // @ts-expect-error test hook
        const config = structuredClone(window.__test.config);
        Object.assign(config, top);
        Object.assign(config.rooms[0], room);
        try {
          (document.createElement("ha-klima-dashboard") as unknown as { setConfig(value: unknown): void }).setConfig(config);
          return "";
        } catch (error) {
          return (error as Error).message;
        }
      },
      [patch, roomPatch] as const,
    );

  test("chybná hodnota zastaví kartu srozumitelnou chybou s názvem klíče; dosavadní konfigurace projde", async ({ page }) => {
    await open(page, "full");
    const preset = (extra: Record<string, unknown>) => [{ name: "X", position: 10, tilt: 0, ...extra }];
    const cases: Array<[Record<string, unknown>, Record<string, unknown>, RegExp]> = [
      [{ thresholds: { co2_warning: 1600 } }, {}, /co2_warning \(1600\) must be below co2_critical \(1500\)/],
      [{ thresholds: { co2_warnig: 900 } }, {}, /thresholds: unknown key "co2_warnig"/],
      [{ thresholds: { heating_waves_2: 70 } }, {}, /heating_waves_2 \(70\) must be below heating_waves_3 \(68\)/],
      [{ trends: { minutes: 5 } }, {}, /trends\.minutes must be a whole number from 10 to 1440/],
      [{ history: { hours: 0 } }, {}, /history\.hours must be a whole number from 1 to 168/],
      [{ theme: "blue" }, {}, /theme must be one of auto, dark, light/],
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
      expect(await configError(page, top, room), JSON.stringify([top, room])).toMatch(message);
    }
    // Accepted: the older `scene`, one window as a text, `false` for a missing sensor, empty title.
    for (const [top, room] of [
      [{}, { scene: "office" }],
      [{}, { window: "binary_sensor.loznice_okno_loznice" }],
      [{}, { carbon_dioxide: false, pm25: false }],
      [{ title: "", theme: "light", trends: { minutes: 60 } }, { image: "/local/obrazky/loznice.jpg", link: "https://example.com" }],
      // A key without a value (null in YAML) is the default, as in the example.
      [{ title: null, theme: null, trends: { minutes: null }, covers: { presets: null, script: null }, outside: { pm25: null } },
        { link: null, cover_presets: null, thresholds: null, heating: null, image: null, scene: "office", carbon_dioxide: null }],
    ] as Array<[Record<string, unknown>, Record<string, unknown>]>) {
      expect(await configError(page, top, room), JSON.stringify([top, room])).toBe("");
    }
  });

  test("prahy, vlny topení a režim domu z konfigurace; prahy místnosti přepíšou společné", async ({ page }) => {
    await open(page, "config");
    // Maxík (22,4 °C) has winter_min 23 of its own: Chladno, and the temperature is blue; the others keep 20–24 °C.
    expect(tidy(await statuses(page))).toEqual(["Příjemné", "Příjemné", "Chladno", "Příjemné", "Příjemné"]);
    const wavesLit = () =>
      page.locator(".room").first().locator(".hvac .row-icon").first().evaluate((icon) =>
        [...icon.querySelectorAll("path")].filter((path) => getComputedStyle(path).stroke === "rgb(255, 159, 10)").length,
      );
    expect(await wavesLit()).toBe(1); // Ložnice 20 %: one wave by the default bands.
    await page.evaluate(() => {
      // @ts-expect-error test hook
      const { card, config } = window.__test;
      card.setConfig({ ...config, thresholds: { heating_waves_2: 10, heating_waves_3: 15 }, house_modes: { winter: "Topná sezóna", summer: "Chladicí sezóna" } });
    });
    expect(await wavesLit()).toBe(3);
    // The house mode now has other names: "Zima" is unknown (Bez dat), "Chladicí sezóna" is summer (Klimatizace first).
    await expect(page.locator(".status-line").first()).toContainText("Bez dat · režim domu");
    await page.evaluate(() => {
      // @ts-expect-error test hook
      const { states, update } = window.__test;
      update({ "input_select.house_mode": { ...states["input_select.house_mode"], state: "Chladicí sezóna" } });
    });
    await expect(page.locator(".room").first().locator(".hvac .system-row").first()).toContainText("Vypnuto");
    await expect(page.locator(".room").first().locator(".hvac .system-row").nth(1)).toContainText("Plán");
  });

  test("místnost bez CO₂ a PM2.5 (false): bez řádků a bez „Bez dat“, ostatní řádky na stejném místě", async ({ page }) => {
    await open(page, "config");
    const pracovna = page.locator(".room").nth(1);
    await expect(pracovna.locator(".air-block")).toHaveCount(0);
    await expect(pracovna.locator(".status-line")).toContainText("Příjemné");
    // The rows below stay where they are in a room with both sensors (the same layout).
    const offsets = await page.locator(".room").evaluateAll((rooms) =>
      rooms.slice(0, 2).map((room) => {
        const lower = room.querySelector(".lower")!.getBoundingClientRect().top;
        return {
          hvac: room.querySelector(".hvac")!.getBoundingClientRect().top - lower,
          window: room.querySelector(".slot-window")!.getBoundingClientRect().top - lower,
          panel: room.querySelector(".cover-panel")!.getBoundingClientRect().height,
        };
      }),
    );
    expect(offsets[1]).toEqual(offsets[0]);
    // A sensor that is only missing from the configuration (key left out) still means Bez dat.
    await open(page, "real");
    await expect(page.locator(".room").nth(1).locator(".status-line")).toContainText("Bez dat · CO₂");
  });

  test("dvě okna: jeden řádek, „Otevřena 2“, nejdéle otevřené, neznámé „––“, popup Okna a souhrn počítá okna", async ({ page }) => {
    await page.clock.install();
    await open(page, "config");
    const row = page.locator(".room").first().locator(".slot-window");
    const set = (id: string, state: string) =>
      page.evaluate(
        ([entity, value]) => {
          // @ts-expect-error test hook
          const { states, update } = window.__test;
          update({ [entity]: { ...states[entity], state: value } });
        },
        [id, state] as const,
      );
    const okno = "binary_sensor.loznice_okno_loznice";
    const balkon = "binary_sensor.loznice_okno_balkon";
    await expect(row).toHaveText(/^\s*Zavřeno\s*$/);
    await expect(row).toHaveAccessibleDescription("Ložnice: všechna okna zavřená. Otevře přehled oken.");
    await set(balkon, "on");
    await page.clock.fastForward("05:00");
    // Ložnice heats (one wave): the conflict dot stands in place of the "·".
    await expect(row).toContainText(/^\s*Otevřeno\s*5 min/);
    await expect(row.locator(".conflict-dot")).toHaveCount(1);
    await expect(row).toHaveAccessibleDescription(/okno Balkon otevřené 5 minut; konflikt: otevřené okno při topení/);
    await set(okno, "on");
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
    // @ts-expect-error test hook
    expect(await page.evaluate(() => window.__test.moreInfo)).toEqual([balkon]);
    // Unknown is never taken as closed: none open and one unavailable is "––".
    await set(okno, "off");
    await set(balkon, "unavailable");
    await expect(row).toHaveText(/^\s*––\s*$/);
    await expect(row).toHaveAccessibleDescription(/stav oken neznámý/);
  });

  test("vlastní předvolby místnosti, tolerance a skript z konfigurace", async ({ page }) => {
    await open(page, "config");
    const presets = page.locator(".room").first().locator(".preset");
    await expect(presets).toHaveCount(2);
    await expect(presets.nth(0)).toHaveAttribute("title", "Ráno");
    await expect(presets.nth(1)).toHaveAccessibleName(/žaluzie Polostín, poloha 50 %, naklopení 60 %/);
    // Two presets share the height of the panel; each stays at least 44 px.
    const heights = await presets.evaluateAll((items) => items.map((item) => item.getBoundingClientRect().height));
    expect(Math.min(...heights)).toBeGreaterThanOrEqual(44);
    // covers.tolerance: 3 → 52 / 62 is still Polostín (50 / 60), 54 / 60 is not.
    const cover = (position: number, tilt: number) =>
      page.evaluate(
        ([p, t]) => {
          // @ts-expect-error test hook
          window.__test.cover("cover.loznice_zaluzie_loznice", "open", p, t);
        },
        [position, tilt] as const,
      );
    await cover(52, 62);
    await expect(presets.nth(1)).toHaveAttribute("aria-pressed", "true");
    await cover(54, 60);
    await expect(presets.nth(1)).toHaveAttribute("aria-pressed", "false");
    // covers.script: a different script gets the same fields.
    await page.evaluate(() => {
      // @ts-expect-error test hook
      const { card, config } = window.__test;
      card.setConfig({ ...config, covers: { script: "script.moje_zaluzie" } });
    });
    await presets.nth(0).focus();
    await page.keyboard.press("Enter");
    // @ts-expect-error test hook
    expect(await page.evaluate(() => window.__test.services)).toEqual([
      ["script", "moje_zaluzie", { entity: "cover.loznice_zaluzie_loznice", pos: 100, tilt: 100 }],
    ]);
  });

  test("vlastní obrázek místnosti a odkaz z názvu místnosti", async ({ page }) => {
    await open(page, "config");
    const maxik = page.locator(".room").nth(2);
    await expect(maxik.locator(".scene.photo img")).toHaveAttribute("src", /^data:image\/svg\+xml,/);
    await expect(maxik.locator(".scene.photo img")).toHaveAttribute("alt", "");
    await expect(maxik.locator(".scene")).toHaveAttribute("aria-hidden", "true");
    // The picture fades out like the illustration and does not cover the values.
    expect(await sceneOverlaps(page)).toEqual([]);
    const link = page.locator(".room").first().locator(".room-link");
    await expect(link).toHaveAccessibleName("Ložnice");
    await expect(link).toHaveAccessibleDescription("Otevře stránku místnosti.");
    await link.click();
    // @ts-expect-error test hook
    expect(await page.evaluate(() => window.__test.actions)).toEqual([
      { config: { tap_action: { action: "navigate", navigation_path: "/lovelace/loznice" } }, action: "tap" },
    ]);
    // The link does not move the status line: the header is as tall as in a room without one.
    const statusTops = await page.locator(".room").evaluateAll((rooms) =>
      rooms.slice(0, 2).map((room) => room.querySelector(".status-line")!.getBoundingClientRect().top - room.getBoundingClientRect().top),
    );
    expect(statusTops[0]).toBeCloseTo(statusTops[1], 0);
  });

  test("délka mikrotrendů a historie, noc a texty pro čtečku podle konfigurace", async ({ page }) => {
    await open(page, "config");
    // trends: 60 min, 7 samples.
    const points = await page.locator(".room").first().locator(".slot-co2 polyline").getAttribute("points");
    expect(points?.trim().split(/\s+/)).toHaveLength(7);
    await expect(page.locator(".room").first().locator(".trend-button")).toHaveAccessibleName(
      /teplota za 1 hodinu (stoupá|klesá|stabilní), historie místnosti za 12 hodin/,
    );
    // history: 12 h, night 23–7 h.
    await page.locator(".room .temperature").first().click();
    await expect(page.locator("#sheet-title")).toHaveText("Historie místnosti – 12 h");
    await expect(page.locator(".legend").first()).toContainText("Noc 23–7 h");
    await expect(page.locator(".chart-wrap")).toHaveAccessibleName(/^Graf za 12 hodin\./);
  });
});

test.describe("světlý a tmavý režim (Barvy)", () => {
  const theme = (page: Page) => page.locator("ha-klima-dashboard").getAttribute("data-theme");
  const roomLook = (page: Page) =>
    page.locator(".room").first().evaluate((room) => ({ background: getComputedStyle(room).backgroundColor, color: getComputedStyle(room).color }));

  test("auto podle Home Assistantu (bez obnovení stránky), dark / light vynutí, bez údaje podle systému", async ({ page }) => {
    await open(page, "full");
    expect(await theme(page)).toBe("dark");
    // The dark theme is the existing palette, unchanged.
    expect(await roomLook(page)).toEqual({ background: "rgba(0, 0, 0, 0)", color: "rgb(255, 255, 255)" });
    await page.evaluate(() => {
      // @ts-expect-error test hook
      window.__test.setDarkMode(false);
    });
    await expect(page.locator("ha-klima-dashboard")).toHaveAttribute("data-theme", "light");
    expect(await roomLook(page)).toEqual({ background: "rgb(255, 255, 255)", color: "rgb(28, 28, 30)" });
    // theme: dark wins over a light Home Assistant.
    await page.evaluate(() => {
      // @ts-expect-error test hook
      const { card, config } = window.__test;
      card.setConfig({ ...config, theme: "dark" });
    });
    await expect(page.locator("ha-klima-dashboard")).toHaveAttribute("data-theme", "dark");
    // Without the dark mode from Home Assistant: the system colour scheme, live.
    await page.evaluate(() => {
      // @ts-expect-error test hook
      const { card, config, dropThemes } = window.__test;
      card.setConfig({ ...config, theme: "auto" });
      dropThemes();
    });
    await page.emulateMedia({ colorScheme: "light" });
    await expect(page.locator("ha-klima-dashboard")).toHaveAttribute("data-theme", "light");
    await page.emulateMedia({ colorScheme: "dark" });
    await expect(page.locator("ha-klima-dashboard")).toHaveAttribute("data-theme", "dark");
  });

  test("axe ve světlém režimu: karta a všechny popupy bez porušení (kontrast textu 4,5 : 1)", async ({ page }) => {
    await page.setViewportSize({ width: 393, height: 852 });
    for (const scenario of ["alarm", "config"]) {
      await page.goto(`/tests/harness.html?s=${scenario}&theme=light`);
      await expect(page.locator("ha-klima-dashboard")).toHaveAttribute("data-theme", "light");
      await expect(page.locator(".spark.loading")).toHaveCount(0);
      expect(await axeViolations(page), scenario).toEqual([]);
    }
    for (const trigger of [".air-block", ".hvac", ".temperature", ".slot-window"]) {
      await page.locator(".room").first().locator(trigger).click();
      await expect(page.locator(".sheet")).toBeVisible();
      expect(await axeViolations(page), trigger).toEqual([]);
      await page.keyboard.press("Escape");
      await expect(page.locator(".sheet")).toHaveCount(0);
    }
    // The error notice after a failed blind script.
    await page.evaluate(() => {
      // @ts-expect-error test hook
      window.__test.failNext = true;
    });
    await page.locator(".room").first().locator(".preset").first().focus();
    await page.keyboard.press("Enter");
    await expect(page.locator(".notice")).toBeVisible();
    expect(await axeViolations(page), "hláška").toEqual([]);
  });

  test("světlý režim: ikony předvoleb a čáry aspoň 3 : 1 na bílé, svítící předvolba se liší", async ({ page }) => {
    await page.goto(`/tests/harness.html?s=full&theme=light`);
    await expect(page.locator(".room").first()).toBeVisible();
    const colours = await page.locator(".room").first().evaluate((room) => {
      const presets = [...room.querySelectorAll(".preset")].map((preset) => ({
        on: preset.getAttribute("aria-pressed") === "true",
        color: getComputedStyle(preset).color,
      }));
      const icon = (selector: string) => getComputedStyle(room.querySelector(selector)!).color;
      return { presets, co2: icon(".slot-co2 .row-icon"), pm25: icon(".slot-pm25 .row-icon") };
    });
    const channels = (colour: string) => colour.match(/\d+(\.\d+)?/g)!.slice(0, 3).map(Number);
    const luminance = (colour: string) => {
      const [r, g, b] = channels(colour).map((value) => {
        const c = value / 255;
        return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
      });
      return 0.2126 * r + 0.7152 * g + 0.0722 * b;
    };
    const onWhite = (colour: string) => 1.05 / (luminance(colour) + 0.05);
    for (const preset of colours.presets) {
      expect(onWhite(preset.color), JSON.stringify(preset)).toBeGreaterThanOrEqual(3);
    }
    const lit = colours.presets.filter((preset) => preset.on).map((preset) => preset.color);
    const idle = colours.presets.filter((preset) => !preset.on).map((preset) => preset.color);
    expect(lit).toHaveLength(1);
    expect(idle).not.toContain(lit[0]);
    expect(onWhite(colours.co2)).toBeGreaterThanOrEqual(4.5);
    expect(onWhite(colours.pm25)).toBeGreaterThanOrEqual(4.5);
  });
});

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
