import { test, expect, type Page } from "@playwright/test";
import { readdir, mkdir } from "node:fs/promises";
import path from "node:path";

const serviceSlugs = [
  "irrigation-installation",
  "sprinkler-repair",
  "drip-irrigation",
  "spring-startup",
  "mid-season-inspection",
  "winterization",
  "drainage-solutions",
  "backflow-testing",
  "smart-irrigation",
  "system-inspections",
  "maintenance",
];
const routes = [
  "/",
  "/services",
  "/irrigation",
  "/landscaping",
  "/residential",
  "/commercial",
  "/maintenance-plans",
  "/about",
  "/gallery",
  "/reviews",
  "/faq",
  "/service-areas",
  "/contact",
  "/privacy",
  ...serviceSlugs.map((slug) => `/services/${slug}`),
];
const expectedCounts = {
  "All Work": 22,
  Irrigation: 8,
  Landscaping: 6,
  "Site Preparation": 5,
  Operations: 3,
};
const capturedErrors = new WeakMap<Page, string[]>();

test.beforeEach(async ({ page }) => {
  const errors: string[] = [];
  capturedErrors.set(page, errors);
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => {
    // Missing-email configuration is intentionally exercised. The cloud dev server
    // cannot upgrade its HMR WebSocket; production validation has no HMR endpoint.
    const expectedInfrastructure =
      message.text().includes("503 (Service Unavailable)") ||
      (message.text().includes("/_next/hmr") &&
        message.text().includes("WebSocket connection")) ||
      (message.text().includes("404") &&
        message.location().url.includes("/this-page-does-not-exist"));
    if (message.type() === "error" && !expectedInfrastructure)
      errors.push(message.text());
  });
  page.on("response", (response) => {
    if (
      response.status() >= 400 &&
      /\.(webp|jpe?g|png)(?:\?|$)|\/_next\/image/.test(response.url())
    ) {
      errors.push(`Broken image: ${response.status()} ${response.url()}`);
    }
  });
});

test.afterEach(async ({ page }) => {
  expect(
    capturedErrors.get(page) ?? [],
    "No browser exceptions, unexpected console errors, or broken image requests",
  ).toEqual([]);
});

async function loadVisibleImages(page: Page) {
  const images = page.locator("main img");
  for (let i = 0; i < (await images.count()); i++) {
    const image = images.nth(i);
    if (!(await image.isVisible())) continue;
    await image.scrollIntoViewIfNeeded();
    await expect
      .poll(() =>
        image.evaluate(
          (element: HTMLImageElement) =>
            element.complete && element.naturalWidth > 0,
        ),
      )
      .toBe(true);
    await expect(image).toHaveAttribute("alt", /\S/);
  }
}

test("all 25 pages render unique GreenMan metadata, valid headings, working local links and images", async ({
  page,
  request,
}) => {
  test.setTimeout(180_000);
  const titles = new Set<string>();
  const headings = new Set<string>();
  const links = new Set<string>();
  await page.setViewportSize({ width: 1440, height: 1000 });
  for (const route of routes) {
    const response = await page.goto(route);
    expect(response?.status(), route).toBe(200);
    await expect(page.locator("main h1")).toHaveCount(1);
    const title = await page.title();
    expect(title, route).toContain("GreenMan");
    expect(titles.has(title), `Unique title at ${route}`).toBe(false);
    titles.add(title);
    const heading = await page.locator("main h1").innerText();
    expect(headings.has(heading), `Unique h1 at ${route}`).toBe(false);
    headings.add(heading);
    await expect(page.locator('head meta[name="description"]')).toHaveAttribute(
      "content",
      /\S.{30,}/,
    );
    await expect(page.locator('head link[rel="canonical"]')).toHaveAttribute(
      "href",
      /^https:\/\/greenmanirrigationinc\.com/,
    );
    expect(
      new URL(
        (await page
          .locator('head link[rel="canonical"]')
          .getAttribute("href"))!,
      ).pathname,
    ).toBe(route);
    expect(await page.locator("main").innerText()).not.toMatch(
      /lorem ipsum|conserva irrigation/i,
    );
    await loadVisibleImages(page);
    for (const href of await page
      .locator('a[href^="/"]')
      .evaluateAll((elements) =>
        elements.map((element) => element.getAttribute("href")!),
      ))
      links.add(href);
  }
  expect(titles.size).toBe(25);
  for (const href of links) {
    const response = await request.get(href);
    expect(response.status(), `Local link ${href}`).toBe(200);
  }
});

test("all 22 original WebP paths and optimized gallery images load", async ({
  page,
  request,
}) => {
  const filenames = (
    await readdir(path.resolve("public/images/greenman"))
  ).filter((filename) => filename.endsWith(".webp"));
  expect(filenames).toHaveLength(22);
  for (const filename of filenames) {
    const response = await request.get(`/images/greenman/${filename}`);
    expect(response.status(), filename).toBe(200);
    expect(response.headers()["content-type"]).toContain("image/webp");
    expect((await response.body()).length).toBeGreaterThan(1000);
  }
  await page.goto("/gallery");
  await expect(page.locator(".gallery-card")).toHaveCount(22);
  await loadVisibleImages(page);
  expect(
    await page
      .locator(".gallery-card img")
      .evaluateAll((elements: HTMLImageElement[]) =>
        elements.every((image) => image.complete && image.naturalWidth > 0),
      ),
  ).toBe(true);
});

test("gallery filters count actual categories, query initialization and lightbox keyboard/focus work", async ({
  page,
}) => {
  await page.goto("/gallery?category=Landscaping");
  const filters = page.getByRole("group", {
    name: "Filter project photographs",
  });
  await expect(page.locator(".gallery-card")).toHaveCount(6);
  await expect(
    filters.getByRole("button", { name: /^Landscaping/ }),
  ).toHaveAttribute("aria-pressed", "true");
  for (const [category, count] of Object.entries(expectedCounts)) {
    const button = filters.getByRole("button", {
      name: new RegExp(`^${category}`),
    });
    await button.click();
    await expect(button).toHaveAttribute("aria-pressed", "true");
    await expect(page.locator(".gallery-card")).toHaveCount(count);
    await expect(page.locator(".gallery-result-count")).toHaveText(
      `${count} photographs · ${category}`,
    );
  }
  await filters.getByRole("button", { name: /^All Work/ }).click();
  const opener = page.getByRole("button", { name: /^Open image:/ }).first();
  await opener.click();
  const dialog = page.locator("dialog.lightbox");
  await expect(dialog).toBeVisible();
  await expect(
    dialog.getByRole("button", { name: "Close image viewer" }),
  ).toBeFocused();
  await expect(dialog.locator(".lightbox-controls p")).toHaveText(
    "Irrigation · 1 of 22",
  );
  await page.keyboard.press("ArrowRight");
  await expect(dialog.locator(".lightbox-controls p")).toHaveText(
    "Irrigation · 2 of 22",
  );
  await page.keyboard.press("ArrowLeft");
  await expect(dialog.locator(".lightbox-controls p")).toHaveText(
    "Irrigation · 1 of 22",
  );
  await page.keyboard.press("ArrowLeft");
  await expect(dialog.locator(".lightbox-controls p")).toHaveText(
    "Irrigation · 22 of 22",
  );
  await expect(dialog.locator(".photo-source")).toContainText(
    /\.mp4 · \d+\.\d{2} seconds/,
  );
  await dialog.getByRole("button", { name: "Next image" }).focus();
  await page.keyboard.press("Tab");
  await expect(
    dialog.getByRole("button", { name: "Close image viewer" }),
  ).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(dialog).not.toBeVisible();
  await expect(opener).toBeFocused();
});

test("desktop dropdowns expose every service and close after navigation", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/");
  const nav = page.getByRole("navigation", {
    name: "Main navigation",
    exact: true,
  });
  await nav.locator("summary", { hasText: "Services" }).click();
  const serviceMenu = nav.locator("details").first();
  await expect(serviceMenu).toHaveAttribute("open", "");
  for (const slug of serviceSlugs)
    await expect(
      serviceMenu.locator(`a[href="/services/${slug}"]`),
    ).toBeVisible();
  await serviceMenu.locator('a[href="/services/winterization"]').click();
  await expect(page).toHaveURL(/\/services\/winterization$/);
  await expect(serviceMenu).not.toHaveAttribute("open", "");
  await nav.locator("summary", { hasText: "About" }).click();
  await nav
    .getByRole("link", { name: "Frequently Asked Questions", exact: true })
    .click();
  await expect(page).toHaveURL(/\/faq$/);
});

test("mobile menu supports service navigation, Escape and focus return", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  const toggle = page.getByRole("button", { name: "Open navigation" });
  await toggle.click();
  const dialog = page.getByRole("dialog", { name: "Website navigation" });
  await expect(dialog).toBeVisible();
  await expect(
    dialog
      .getByRole("navigation", { name: "Mobile navigation" })
      .getByRole("link"),
  ).toHaveCount(13);
  await dialog.getByRole("link", { name: "Landscaping", exact: true }).click();
  await expect(page).toHaveURL(/\/landscaping$/);
  await expect(dialog).not.toBeVisible();
  await toggle.click();
  await page.keyboard.press("Escape");
  await expect(dialog).not.toBeVisible();
  await expect(toggle).toBeFocused();
});

test("FAQ search, empty results and keyboard disclosure work", async ({
  page,
}) => {
  await page.goto("/faq");
  const search = page.getByRole("searchbox", {
    name: "Search frequently asked questions",
  });
  await search.fill("smart irrigation controllers");
  await expect(page.locator(".faq-item")).toHaveCount(1);
  const summary = page.locator(".faq-item summary");
  await summary.focus();
  await page.keyboard.press("Enter");
  await expect(page.locator(".faq-answer")).toBeVisible();
  await page.keyboard.press("Enter");
  await expect(page.locator(".faq-answer")).not.toBeVisible();
  await search.fill("xyz-no-matching-answer");
  await expect(page.locator(".faq-item")).toHaveCount(0);
  await expect(
    page.getByText("No answers match your search.", { exact: false }),
  ).toBeVisible();
  await search.fill("");
  await expect(page.locator(".faq-item")).toHaveCount(14);
});

test("system education tabs use arrow, Home and End keys with visible panels", async ({
  page,
}) => {
  await page.goto("/");
  const tabs = page
    .getByRole("tablist", { name: "Explore your irrigation system" })
    .getByRole("tab");
  await expect(tabs).toHaveCount(6);
  await tabs.first().focus();
  await page.keyboard.press("ArrowRight");
  await expect(tabs.nth(1)).toBeFocused();
  await expect(tabs.nth(1)).toHaveAttribute("aria-selected", "true");
  await expect(page.getByRole("tabpanel")).toHaveCount(1);
  await expect(page.getByRole("tabpanel")).toContainText(
    "Good coverage begins with a thoughtful plan.",
  );
  await page.keyboard.press("End");
  await expect(tabs.last()).toBeFocused();
  await page.keyboard.press("ArrowRight");
  await expect(tabs.first()).toBeFocused();
  await page.keyboard.press("Home");
  await expect(tabs.first()).toHaveAttribute("aria-selected", "true");
});

test("inquiry forms validate locally and honestly report unconfigured email without sending", async ({
  page,
  request,
}) => {
  // These assertions depend on the reviewed development server having no email credentials.
  test.skip(
    Boolean(process.env.RESEND_API_KEY),
    "Run this integration check only against an email-disabled local server. Provider delivery is exercised with injected mocks in the unit tests.",
  );
  // First confirm that invalid input is rejected without triggering any delivery attempt.
  const invalid = await request.post("/api/contact", { data: {} });
  expect(invalid.status()).toBe(400);
  const fieldErrors = await invalid.json();
  expect(fieldErrors.fieldErrors).toHaveProperty("fullName");
  await page.goto("/contact?service=Landscaping+inquiry");
  const form = page.getByRole("form", { name: "Request GreenMan service" });
  await expect(form.getByLabel("What can we help with?")).toHaveValue(
    "landscaping",
  );
  await form.getByRole("button", { name: "Send service request" }).click();
  await expect(form.getByLabel("Full name")).toBeFocused();
  await expect(form.getByLabel("Full name")).toHaveAttribute(
    "aria-invalid",
    "true",
  );
  await expect(form.getByRole("status")).toContainText(
    "Please check the highlighted fields",
  );
  await form.getByLabel("Full name").fill("Browser Validation");
  await form.getByLabel("Phone number").fill("9785550123");
  await form.getByLabel("Email address").fill("browser-validation@example.com");
  await form.getByLabel("Service address or ZIP code").fill("01902");
  await form
    .getByLabel("Tell us about your issue or project")
    .fill("Private website validation; no real service is requested.");
  await form.getByRole("checkbox").check();
  const responsePromise = page.waitForResponse(
    (response) =>
      response.url().endsWith("/api/contact") &&
      response.request().method() === "POST",
  );
  await form.getByRole("button", { name: "Send service request" }).click();
  expect((await responsePromise).status()).toBe(503);
  await expect(form.getByRole("status")).toContainText(
    "Your request has not been sent",
  );
  await expect(form.getByLabel("Full name")).toHaveValue("Browser Validation");
  await expect(form.locator(".notice-success")).toHaveCount(0);
  await page.goto("/commercial");
  await expect(page.getByLabel("Property type")).toHaveValue("commercial");
  await page.goto("/residential");
  await expect(page.getByLabel("Property type")).toHaveValue("residential");
});

for (const width of [1440, 1024, 768, 390, 360]) {
  test(`every route fits viewport at ${width}px without horizontal overflow`, async ({
    page,
  }) => {
    test.setTimeout(120_000);
    await page.setViewportSize({ width, height: width < 768 ? 844 : 1000 });
    for (const route of routes) {
      await page.goto(route);
      await expect(page.locator("main h1")).toBeVisible();
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= window.innerWidth + 1,
        ),
        `${route} at ${width}px`,
      ).toBe(true);
    }
  });
}

test("404, gallery alias, sitemap, robots and security headers are correct", async ({
  page,
  request,
}) => {
  const home = await request.get("/");
  const headers = home.headers();
  expect(headers["x-content-type-options"]).toBe("nosniff");
  expect(headers["x-frame-options"]).toBe("DENY");
  expect(headers["content-security-policy"]).toContain(
    "frame-ancestors 'none'",
  );
  expect(headers["x-powered-by"]).toBeUndefined();
  const response = await page.goto("/this-page-does-not-exist");
  expect(response?.status()).toBe(404);
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await expect(page.getByRole("link", { name: /home/i }).first()).toBeVisible();
  await page.goto("/our-work");
  await expect(page).toHaveURL(/\/gallery$/);
  const sitemap = await request.get("/sitemap.xml");
  expect(sitemap.status()).toBe(200);
  const xml = await sitemap.text();
  expect(xml).toContain("https://greenmanirrigationinc.com/landscaping");
  expect(xml).toContain(
    "https://greenmanirrigationinc.com/services/backflow-testing",
  );
  const robots = await request.get("/robots.txt");
  expect(robots.status()).toBe(200);
  expect(await robots.text()).toContain("Disallow: /");
});

test("capture landscaping desktop/mobile and gallery mobile after image loading", async ({
  page,
}) => {
  test.setTimeout(120_000);
  await mkdir(path.resolve("docs/screenshots"), { recursive: true });
  for (const [name, width, height, route] of [
    ["landscaping-desktop", 1440, 1000, "/landscaping"],
    ["landscaping-mobile", 390, 844, "/landscaping"],
    ["gallery-mobile", 390, 844, "/gallery"],
  ] as const) {
    await page.setViewportSize({ width, height });
    await page.goto(route);
    await loadVisibleImages(page);
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.screenshot({
      path: `docs/screenshots/${name}.png`,
      fullPage: true,
      animations: "disabled",
    });
  }
});
