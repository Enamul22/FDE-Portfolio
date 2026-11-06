import { test, expect } from "@playwright/test";
import { projects } from "../content/projects";
import { sections, profile } from "../content/profile";
import { mkdir } from "node:fs/promises";
import path from "node:path";

test("approved content, project order, responsive grids and assets", async ({
  page,
}, info) => {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto("/");
  await expect(page).toHaveTitle(
    "Enamul Haque | Data & Application Engineering",
  );
  expect(
    await page
      .locator("main>section[id]")
      .evaluateAll((els) => els.map((el) => el.id)),
  ).toEqual(sections.map(([id]) => id));
  await expect(page.locator(".skill-card")).toHaveCount(6);
  expect(
    await page.locator(".project-card .eyebrow").allTextContents(),
  ).toEqual(
    projects.map((p, i) => `${String(i + 1).padStart(2, "0")} / ${p.name}`),
  );
  await expect(page.getByRole("link", { name: /Download CV/i })).toHaveCount(0);
  await expect(page.locator("[download]")).toHaveCount(0);
  await expect(
    page.getByText("May 2024–Present", { exact: true }),
  ).toBeVisible();
  await expect(
    page.getByText("October 2022–April 2024", { exact: true }),
  ).toBeVisible();
  await expect(page.locator(".impact")).toHaveCount(2);
  await expect(page.locator(".impact").first()).toContainText("more than 50%");
  await expect(page.locator(".credential-card")).toContainText(
    "Speedrun: Your First End-to-End Workflow",
  );
  await expect(page.locator(".credential-card")).toContainText("v93rk4vv64bs");
  await expect(
    page.getByRole("link", { name: /Verify credential/ }),
  ).toHaveAttribute("href", "https://verify.skilljar.com/c/v93rk4vv64bs");
  for (const p of projects) {
    await expect(
      page.getByRole("link", {
        name: `${p.slug === "fatal-figures" ? "Play Game" : "Live Demo"}: ${p.name}`,
        exact: true,
      }),
    ).toHaveAttribute("href", p.live);
  }
  for (const l of profile.links)
    expect(
      await page.getByRole("link", { name: new RegExp(`^${l.label}`) }).count(),
    ).toBe(2);
  const width = page.viewportSize()!.width;
  const expectedProjects = width >= 1380 ? 4 : width >= 700 ? 2 : 1;
  const expectedSkills = width > 1080 ? 3 : width >= 700 ? 2 : 1;
  const columns = async (selector: string) =>
    page
      .locator(selector)
      .evaluate(
        (el) => getComputedStyle(el).gridTemplateColumns.split(" ").length,
      );
  expect(await columns(".project-grid")).toBe(expectedProjects);
  expect(await columns(".skills-grid")).toBe(expectedSkills);
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth,
    ),
  ).toBe(true);
  await expect(page.locator(".portrait-frame img")).toBeVisible();
  await expect
    .poll(() =>
      page
        .locator(".portrait-frame img")
        .evaluate((i: HTMLImageElement) => i.complete && i.naturalWidth > 0),
    )
    .toBe(true);
  await page.locator("#projects").scrollIntoViewIfNeeded();
  for (const image of await page.locator(".project-preview img").all())
    await expect
      .poll(() =>
        image.evaluate(
          (i: HTMLImageElement) => i.complete && i.naturalWidth > 0,
        ),
      )
      .toBe(true);
  expect(errors).toEqual([]);
  const dir = process.env.REVIEW_DIR ?? "../review/implementation";
  await mkdir(dir, { recursive: true });
  await page.screenshot({
    path: path.join(dir, `${info.project.name}-projects.png`),
    fullPage: false,
    animations: "disabled",
  });
  await page.goto("/");
  await page.screenshot({
    path: path.join(dir, `${info.project.name}-home.png`),
    fullPage: false,
    animations: "disabled",
  });
});

test("section navigation and keyboard-accessible mobile menu", async ({
  page,
}, info) => {
  await page.goto("/");
  await page.keyboard.press("Tab");
  await expect(
    page.getByRole("link", { name: "Skip to content" }),
  ).toBeFocused();
  if (
    await page.getByRole("button", { name: "Menu", exact: false }).isVisible()
  ) {
    const menu = page.getByRole("button", { name: "Menu", exact: false });
    await menu.click();
    await expect(menu).toHaveAttribute("aria-expanded", "true");
    await page.keyboard.press("Escape");
    await expect(menu).toHaveAttribute("aria-expanded", "false");
    await expect(menu).toBeFocused();
    await menu.click();
  }
  await page
    .getByRole("navigation", { name: "Main navigation" })
    .getByRole("link", { name: "Projects", exact: true })
    .click();
  await expect(page).toHaveURL(/#projects$/);
  await expect(page.locator('#main-nav a[href="/#projects"]')).toHaveAttribute(
    "aria-current",
    "location",
  );
  if (info.project.name.includes("phone"))
    await expect(
      page.getByRole("button", { name: "Menu", exact: false }),
    ).toHaveAttribute("aria-expanded", "false");
  if (info.project.name.includes("phone"))
    expect(
      await page.evaluate(
        () => getComputedStyle(document.documentElement).scrollBehavior,
      ),
    ).toBe("auto");
});

test("all case studies load directly, refresh and expose evidence", async ({
  page,
}, info) => {
  for (const p of projects) {
    const response = await page.goto(`/projects/${p.slug}`);
    expect(response?.status()).toBe(200);
    await expect(page.locator("h1")).toContainText(p.name);
    await expect(page.locator(".workflow-diagram li")).toHaveCount(5);
    await expect(page.locator(".gallery-image")).toHaveCount(2);
    await expect(page.getByRole("link", { name: /Download CV/ })).toHaveCount(
      0,
    );
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
    ).toBe(true);
    await page.reload();
    await expect(page.locator("h1")).toContainText(p.title);
  }
  const dir = process.env.REVIEW_DIR ?? "../review/implementation";
  await mkdir(dir, { recursive: true });
  await page.screenshot({
    path: path.join(dir, `${info.project.name}-case-study.png`),
    fullPage: false,
    animations: "disabled",
  });
  expect((await page.goto("/projects/not-a-project"))?.status()).toBe(404);
});
