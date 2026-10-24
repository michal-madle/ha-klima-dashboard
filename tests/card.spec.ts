import { expect, test } from "@playwright/test";
import type { CDPSession, Page } from "@playwright/test";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";

// Browser tests of the Klima Dashboard card against tests/harness.html (fake hass data).
// Every case names the spec section or TODO item it guards. `npm test` builds the card first.

const require = createRequire(import.meta.url);
const AXE = require.resolve("axe-core/axe.min.js");
const WIDTHS = [320, 360, 375, 393, 430, 768];

async function open(page: Page, scenario = "full", width = 393): Promise<void> {
  await page.setViewportSize({ width, height: 852 });
  await page.goto(`/tests/harness.html?s=${scenario}`);
  await page.locator(".room").first().waitFor();
  // Wait for the first micro-trend history (the dotted placeholder disappears).
  await expect(page.locator(".spark.loading")).toHaveCount(0);
}

const statuses = (page: Page) => page.locator(".status-line").allInnerTexts();
const tidy = (texts: string[]) => texts.map((text) => text.replace(/\s+/g, " ").trim());

async function axeViolations(page: Page): Promise<string[]> {
  await page.addScriptTag({ path: AXE });
  return page.evaluate(async () => {
    // @ts-expect-error axe is injected above
    const result = await window.axe.run(document, { resultTypes: ["violations"] });
    return result.violations.map(
      (violation: { id: string; nodes: Array<{ target: string[] }> }) =>
        `${violation.id}: ${violation.nodes.map((node) => node.target.join(" > ")).join(" | ")}`,
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

  test("ilustrace nepřekrývá vlhkost ani název od 360 px", async ({ page }) => {
    for (const width of [360, 375, 393, 430]) {
      await open(page, "longnames", width);
      const overlaps = await page.evaluate(() => {
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
      if (width >= 375) expect(overlaps, `šířka ${width}`).toEqual([]);
      else expect(overlaps.filter((item) => item.endsWith("vlhkost")), `šířka ${width}`).toEqual([]);
    }
  });

  test.fixme("ilustrace nepřekrývá text ani na 320 px (TODO P2.12)", async () => {});

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

  test.fixme("všechny klikací prvky mají cíl aspoň 44 × 44 px (TODO P1.2)", async () => {});

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
    await expect(page.locator(".summary .chip")).toHaveText(["5 oken otevřených", "Ručně: 5 místností", "Topí 3 místnosti"]);
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
    // @ts-expect-error test hook
    await expect.poll(() => page.evaluate(() => window.__test.services.length)).toBe(1);
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
