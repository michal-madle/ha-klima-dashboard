import { expect, test } from "@playwright/test";
import type { CDPSession, Page } from "@playwright/test";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";

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
  test("scénář „real“ používá stejná ID entit jako examples/domov_prototyp_loznice.yaml", async ({ page }) => {
    const yaml = readFileSync(new URL("../examples/domov_prototyp_loznice.yaml", import.meta.url), "utf8")
      .split("\n")
      .filter((line) => !line.trim().startsWith("#"))
      .join("\n");
    const fromExample = new Set(yaml.match(/\b(?:sensor|binary_sensor|cover|climate|input_select)\.[a-z0-9_]+/g));
    await open(page, "real");
    const fromScenario = await page.evaluate(() => {
      const ids = new Set<string>();
      const walk = (value: unknown): void => {
        if (typeof value === "string" && /^[a-z_]+\.[a-z0-9_]+$/.test(value) && !value.startsWith("custom")) ids.add(value);
        else if (value && typeof value === "object") Object.values(value).forEach(walk);
      };
      // @ts-expect-error test hook
      walk(window.__test.config);
      return [...ids].sort();
    });
    expect(fromScenario).toEqual([...fromExample].sort());
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
    await expect(page.locator(".air-options")).toBeVisible();
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
        const by = (fill: string) => slats.filter((slat) => slat.getAttribute("fill") === fill).map((slat) => +slat.getAttribute("height")!);
        return { count: slats.length, blind: by("#E8D9B5"), window: by("#64D2FF") };
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
          .filter((rect) => rect.getAttribute("fill") === "rgb(0 0 0 / 30%)")
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
    const options = page.locator(".air-option");
    await expect(options).toHaveCount(2);
    await expect(options.nth(0)).toContainText("CO₂");
    await expect(options.nth(0).locator(".air-value")).toHaveText("656 ppm");
    await expect(options.nth(1).locator(".air-value")).toHaveText("2 µg/m³");
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

  test("doba otevření se vejde i na 320 px s tečkou konfliktu a nic se neořízne", async ({ page }) => {
    await open(page, "alarm", 320);
    const rows = await page.locator(".slot-window").evaluateAll((items) =>
      items.map((item) => {
        const label = item.querySelector(".row-label")!;
        const text = item.querySelector(".row-text")!;
        return { cut: label.scrollWidth > label.clientWidth + 0.5 || text.scrollWidth > text.clientWidth + 0.5, text: item.textContent?.replace(/\s+/g, " ").trim() };
      }),
    );
    expect(rows.filter((row) => row.cut)).toEqual([]);
    expect(rows[0].text).toMatch(/Otevřeno · 3 min/);
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
