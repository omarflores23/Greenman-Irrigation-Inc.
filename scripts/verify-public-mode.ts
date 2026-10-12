import assert from "node:assert/strict";
import { chromium } from "@playwright/test";
import { greenmanGallery } from "../src/data/greenmanGallery";
import { services } from "../src/data/services";

async function main() {
  // Read-only local checks. This script never submits a contact request or sends email.
  const base = process.env.PUBLIC_TEST_BASE_URL || "http://127.0.0.1:3001";
  const origin = new URL(base);
  assert(
    ["localhost", "127.0.0.1"].includes(origin.hostname),
    "Use a local test server, not a live deployment.",
  );
  for (const photo of greenmanGallery) {
    const expected = photo.publicationStatus === "approved" ? 200 : 404;
    const original = await fetch(new URL(photo.src, base));
    assert.equal(original.status, expected, photo.src);
    const optimized = await fetch(
      new URL(
        `/_next/image?url=${encodeURIComponent(photo.src)}&w=384&q=75`,
        base,
      ),
    );
    assert.equal(optimized.status, expected, `Optimized ${photo.src}`);
  }
  for (const service of services) {
    const response = await fetch(new URL(`/services/${service.slug}`, base));
    assert.equal(
      response.status,
      service.approval === "approved" ? 200 : 404,
      service.slug,
    );
  }
  const robots = await (await fetch(new URL("/robots.txt", base))).text();
  assert(
    robots.includes("Allow: /"),
    "This server must be built and started in public mode.",
  );
  const sitemap = await (await fetch(new URL("/sitemap.xml", base))).text();
  for (const s of services)
    if (s.approval !== "approved")
      assert(!sitemap.includes(`/services/${s.slug}`));

  const browser = await chromium.launch({
    executablePath: process.env.CHROMIUM_PATH || "/usr/bin/chromium",
    headless: true,
    args: ["--no-sandbox"],
  });
  try {
    const page = await browser.newPage();
    await page.goto(base);
    assert.equal(await page.locator(".review-banner").count(), 0);
    await page.goto(new URL("/gallery", base).href);
    const approved = greenmanGallery.filter(
      (photo) => photo.publicationStatus === "approved",
    );
    assert.equal(await page.locator(".gallery-card").count(), approved.length);
    await page.goto(new URL("/contact", base).href);
    const options = await page
      .locator("select[name=service] option")
      .evaluateAll((elements) =>
        elements.map((e) => (e as HTMLOptionElement).value),
      );
    for (const s of services)
      if (s.approval !== "approved") assert(!options.includes(s.slug));
    assert(options.includes("general-inquiry"));
    if (approved.length === 0)
      assert.equal(await page.locator("main img").count(), 0);
  } finally {
    await browser.close();
  }
  console.log(
    `Public-mode checks passed: ${greenmanGallery.length} original and optimized image approval gates, ${services.length} offering gates, sitemap/robots, gallery, and form choices. No email sent.`,
  );
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
