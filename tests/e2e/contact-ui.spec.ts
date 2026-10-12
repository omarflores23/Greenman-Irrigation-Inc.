import { test, expect } from "@playwright/test";

test("contact UI resets only after a mocked acknowledged success; this does not send email", async ({
  page,
}) => {
  await page.route("**/api/contact", async (route) => {
    expect(route.request().method()).toBe("POST");
    const input = route.request().postDataJSON();
    expect(input.consent).toBe(true);
    expect(input.service).toBe("sprinkler-repair");
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({
        success: true,
        message:
          "TEST ONLY: the email service accepted this request for delivery. No appointment is booked.",
      }),
    });
  });
  await page.goto("/contact?service=Sprinkler+Repair");
  const form = page.getByRole("form", { name: "Request GreenMan service" });
  await expect(form).toHaveAttribute("method", "post");
  await expect(form.getByLabel("What can we help with?")).toHaveValue(
    "sprinkler-repair",
  );
  await form.getByLabel("Full name").fill("UI Test Only");
  await form.getByLabel("Phone number").fill("9785550123");
  await form.getByLabel("Email address").fill("ui-test@example.com");
  await form.getByLabel("Service address or ZIP code").fill("01902");
  await form
    .getByLabel("Tell us about your issue or project")
    .fill("Mocked local UI test. This will not reach an email provider.");
  await form.getByRole("checkbox").check();
  await form.getByRole("button", { name: "Send service request" }).click();
  await expect(form.getByRole("status")).toContainText(
    "TEST ONLY: the email service accepted",
  );
  await expect(form.getByRole("status")).toContainText(
    "No appointment is booked",
  );
  await expect(form.getByLabel("Full name")).toHaveValue("");
  await expect(form.locator(".notice-success")).toHaveCount(1);
  await expect(
    form.getByRole("button", { name: "Send service request" }),
  ).toBeEnabled();
});
