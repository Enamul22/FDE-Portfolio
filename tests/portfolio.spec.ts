import { test, expect } from "@playwright/test";
import { projects } from "../content/projects";
import { sections, profile } from "../content/profile";
import { credentials } from "../content/credentials";
import { productionOrigin } from "../content/site";
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
  if (productionOrigin) {
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      "href",
      productionOrigin,
    );
    await expect(
      page.locator('meta[property="og:image"]').first(),
    ).toHaveAttribute("content", `${productionOrigin}/social-preview.png`);
    const sitemap = await page.request.get("/sitemap.xml");
    expect(sitemap.status()).toBe(200);
    expect((await sitemap.text()).match(/<loc>/g)).toHaveLength(7);
    expect(await sitemap.text()).not.toContain("localhost");
    const robots = await page.request.get("/robots.txt");
    expect(await robots.text()).toContain(`${productionOrigin}/sitemap.xml`);
  }
  expect(await page.locator("body").ariaSnapshot()).not.toContain(
    "Download CV",
  );
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
  expect(projects.map((p) => p.slug)).toEqual([
    "fleetpulse",
    "fleetcare",
    "serviceplan",
    "fatal-figures",
    "onboarddesk",
    "cashpilot",
  ]);
  await expect(page.locator(".project-card")).toHaveCount(6);
  await expect(page.locator(".credential-card")).toHaveCount(4);
  expect(credentials.map((c) => c.id)).toEqual([
    "f4zh5c5phk8q",
    "v93rk4vv64bs",
    "wayfps4ag8q3",
    "sjwm7wg7jxys",
  ]);
  for (const [index, credential] of credentials.entries()) {
    const card = page.locator(".credential-card").nth(index);
    await expect(card).toContainText(credential.title);
    await expect(card.locator(".credential-description")).toHaveText(
      credential.description,
    );
    await expect(card.locator("time")).toHaveAttribute(
      "datetime",
      credential.completed,
    );
    await expect(card.locator(".credential-id")).toHaveText(
      `Credential ID: ${credential.id}`,
    );
    await expect(
      card.getByRole("link", { name: /Verify credential/ }),
    ).toHaveAttribute("href", credential.url);
  }
  expect(credentials.map((c) => c.completed)).toEqual(
    credentials
      .map((c) => c.completed)
      .toSorted()
      .toReversed(),
  );
  await expect(page.locator("#certifications")).not.toContainText("Contour");
  await expect(page.locator(".wordmark")).toHaveText("Enamul Haque");
  expect(
    await page.locator("#hero-title > span").evaluate((statement) => {
      const size = (element: Element) =>
        parseFloat(getComputedStyle(element).fontSize);
      return size(statement) < size(statement.parentElement!);
    }),
  ).toBe(true);
  await expect(
    page.getByRole("link", { name: "Independent portfolio work" }),
  ).toHaveAttribute("href", "https://github.com/Enamul22/FDE-Portfolio");
  const actions = await page.locator(".project-actions").all();
  for (const [index, project] of projects.entries()) {
    const links = actions[index].getByRole("link");
    await expect(links).toHaveText([/^Case Study/, /^Live Demo/, /^GitHub/]);
    expect(
      await links.evaluateAll((elements) =>
        elements.map((el) => el.getAttribute("href")),
      ),
    ).toEqual([`/projects/${project.slug}`, project.live, project.github]);
    const colors = await links.evaluateAll((elements) =>
      elements.map((el) => getComputedStyle(el).color),
    );
    expect(new Set(colors).size).toBe(3);
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
  for (const index of [4, 5]) {
    await page.locator(".project-card").nth(index).scrollIntoViewIfNeeded();
    await page.screenshot({
      path: path.join(
        dir,
        `${info.project.name}-${projects[index].slug}-card.png`,
      ),
      fullPage: false,
      animations: "disabled",
    });
  }
  await page.locator(".credential-card").first().scrollIntoViewIfNeeded();
  await page.screenshot({
    path: path.join(dir, `${info.project.name}-credentials.png`),
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
  for (const [index, p] of projects.entries()) {
    const response = await page.goto(`/projects/${p.slug}`);
    expect(response?.status()).toBe(200);
    await expect(page.locator("h1")).toContainText(p.name);
    await expect(page.locator(".workflow-diagram li")).toHaveCount(5);
    await expect(page.locator(".gallery-image")).toHaveCount(2);
    const nav = page.getByRole("navigation", {
      name: "Project navigation",
      exact: true,
    });
    await expect(nav.getByRole("link", { name: /Previous:/ })).toHaveAttribute(
      "href",
      `/projects/${projects[(index - 1 + projects.length) % projects.length].slug}`,
    );
    await expect(nav.getByRole("link", { name: /Next:/ })).toHaveAttribute(
      "href",
      `/projects/${projects[(index + 1) % projects.length].slug}`,
    );
    for (const evidence of p.evidence) {
      await expect(
        page.locator("#validation").getByRole("link", { name: evidence.label }),
      ).toHaveAttribute("href", `${p.github}/blob/main/${evidence.href}`);
    }
    const image = page.locator(".case-image img");
    await expect(image).toHaveAttribute("alt", p.imageAlt);
    await expect
      .poll(() =>
        image.evaluate(
          (i: HTMLImageElement) => i.complete && i.naturalWidth > 0,
        ),
      )
      .toBe(true);
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
