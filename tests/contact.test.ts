import test from "node:test";
import assert from "node:assert/strict";
import {
  buildContactEmail,
  contactSchema,
  createContactHandler,
  getEmailConfig,
  normalizeContactService,
  type ContactInput,
  type EmailConfig,
} from "../src/lib/contact";
import { SlidingWindowRateLimiter } from "../src/lib/rate-limit";

const input: ContactInput = {
  fullName: "Casey Example",
  phone: "(978) 555-0123",
  email: "casey@example.com",
  address: "01902",
  propertyType: "residential",
  propertyDetails: "Single-family home",
  service: "general-inquiry",
  description: "One sprinkler zone is not watering evenly.",
  preferredContact: "email",
  preferredDate: "2030-04-15",
  consent: true,
  website: "",
};
const config: EmailConfig = {
  apiKey: "test-provider-key",
  from: "website@example.com",
  to: "owner@example.com",
};
function request(body: unknown = input, headers: Record<string, string> = {}) {
  return new Request("https://greenman.example/api/contact", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      origin: "https://greenman.example",
      ...headers,
    },
    body: typeof body === "string" ? body : JSON.stringify(body),
  });
}
function handler(
  overrides: Partial<Parameters<typeof createContactHandler>[0]> = {},
) {
  return createContactHandler({
    getConfig: () => config,
    limiter: new SlidingWindowRateLimiter(),
    fetcher: async () => Response.json({ id: "provider-receipt" }),
    allowedServices: ["general-inquiry"],
    ...overrides,
  });
}

test("service links normalize slugs, titles and inquiry labels while respecting available choices", () => {
  const choices = [
    {
      value: "system-inspections",
      title: "Irrigation System Inspections",
      label: "Irrigation System Inspections inquiry",
    },
    {
      value: "maintenance",
      title: "Seasonal Irrigation Maintenance",
      label: "Seasonal Irrigation Maintenance inquiry",
    },
    { value: "maintenance-plan", label: "Seasonal care inquiry" },
    { value: "landscaping", label: "Landscaping inquiry" },
    {
      value: "general-inquiry",
      label: "General inquiry / help choosing a service",
    },
  ];
  assert.equal(
    normalizeContactService("  System Inspections ", choices),
    "system-inspections",
  );
  assert.equal(
    normalizeContactService("IRRIGATION SYSTEM INSPECTIONS", choices),
    "system-inspections",
  );
  assert.equal(
    normalizeContactService("SYSTEM-INSPECTIONS", choices),
    "system-inspections",
  );
  assert.equal(
    normalizeContactService("Seasonal Irrigation Maintenance", choices),
    "maintenance",
  );
  assert.equal(
    normalizeContactService("seasonal CARE inquiry", choices),
    "maintenance-plan",
  );
  assert.equal(
    normalizeContactService("LANDSCAPING inquiry", choices),
    "landscaping",
  );
  assert.equal(
    normalizeContactService("General inquiry", choices),
    "general-inquiry",
  );
  assert.equal(
    normalizeContactService(
      "System Inspections",
      choices.filter((choice) => choice.value === "general-inquiry"),
    ),
    "",
  );
  assert.equal(normalizeContactService("unknown service", choices), "");
});

test("required consent, valid contact data, description and calendar date are validated", () => {
  assert.equal(contactSchema.safeParse(input).success, true);
  for (const modification of [
    { consent: false },
    { email: "invalid" },
    { phone: "123" },
    { description: "brief" },
    { address: "" },
    { preferredDate: "2030-02-30" },
    { preferredContact: "sms" },
  ])
    assert.equal(
      contactSchema.safeParse({ ...input, ...modification }).success,
      false,
    );
  assert.equal(
    contactSchema.safeParse({ ...input, preferredDate: "" }).success,
    true,
  );
});

test("HTML email escapes submitted content and does not put it in mail headers", () => {
  const data = contactSchema.parse({
    ...input,
    fullName: '<script>alert("x")</script>',
    description: "Text <img src=x onerror='attack'> & more",
  });
  const email = buildContactEmail(data);
  assert.doesNotMatch(email.html, /<script>|<img/);
  assert.match(email.html, /&lt;script&gt;/);
  assert.match(email.html, /&amp;/);
  assert.equal(email.subject, "New GreenMan website service inquiry");
  assert.match(email.text, /Text <img/);
});

test("missing or malformed sender configuration never fabricates delivery", async () => {
  assert.equal(getEmailConfig({}), null);
  assert.equal(
    getEmailConfig({
      RESEND_API_KEY: "key",
      CONTACT_FROM_EMAIL: "invalid",
      CONTACT_TO_EMAIL: "owner@example.com",
    }),
    null,
  );
  let called = false;
  const result = await handler({
    getConfig: () => null,
    fetcher: async () => {
      called = true;
      return Response.json({ id: "unused" });
    },
  })(request());
  assert.equal(result.status, 503);
  assert.equal(called, false);
  assert.match((await result.json()).error, /not been sent/);
});

test("invalid fields return actionable errors before invoking provider", async () => {
  let called = false;
  const result = await handler({
    fetcher: async () => {
      called = true;
      return Response.json({ id: "unused" });
    },
  })(request({ ...input, consent: false, email: "bad" }));
  assert.equal(result.status, 400);
  const body = await result.json();
  assert.ok(body.fieldErrors.consent);
  assert.ok(body.fieldErrors.email);
  assert.equal(called, false);
});

test("successful provider acceptance returns an honest success and correct private email envelope", async () => {
  let sent: RequestInit | undefined;
  let destination: string | undefined;
  const result = await handler({
    fetcher: async (url, init) => {
      destination = String(url);
      sent = init;
      return Response.json({ id: "actual-provider-receipt" });
    },
  })(request());
  assert.equal(result.status, 200);
  assert.equal(destination, "https://api.resend.com/emails");
  assert.equal(result.headers.get("cache-control"), "no-store");
  const envelope = JSON.parse(String(sent?.body));
  assert.deepEqual(envelope.to, [config.to]);
  assert.equal(envelope.from, config.from);
  assert.equal(envelope.reply_to, input.email);
  const body = await result.json();
  assert.equal(body.success, true);
  assert.match(body.message, /accepted by the email service for delivery/);
  assert.match(body.message, /appointment is confirmed only after/);
  assert.equal(body.id, undefined);
});

test("provider rejection, malformed acknowledgment and network failure never produce success", async (t) => {
  for (const [name, fetcher] of [
    [
      "rejection",
      async () =>
        Response.json({ message: "private diagnostic" }, { status: 403 }),
    ],
    ["missing receipt", async () => Response.json({})],
    [
      "network failure",
      async () => {
        throw new Error("private diagnostic");
      },
    ],
  ] as const) {
    await t.test(name, async () => {
      const result = await handler({ fetcher })(request());
      assert.equal(result.status, 502);
      const body = await result.json();
      assert.equal(body.success, undefined);
      assert.doesNotMatch(body.error, /private diagnostic/);
    });
  }
});

test("cross-origin requests and cross-site fetch metadata are rejected", async () => {
  assert.equal(
    (await handler()(request(input, { origin: "https://attacker.example" })))
      .status,
    403,
  );
  assert.equal(
    (await handler()(request(input, { "sec-fetch-site": "cross-site" })))
      .status,
    403,
  );
});

test("Next localhost normalization accepts the actual browser Host without accepting foreign origins", async () => {
  const normalizedRequest = (origin: string) =>
    new Request("http://localhost:3000/api/contact", {
      method: "POST",
      headers: {
        host: "127.0.0.1:3000",
        origin,
        "content-type": "application/json",
      },
      body: JSON.stringify(input),
    });
  const send = handler({ getConfig: () => null });
  assert.equal(
    (await send(normalizedRequest("http://127.0.0.1:3000"))).status,
    503,
  );
  assert.equal(
    (await send(normalizedRequest("https://attacker.example"))).status,
    403,
  );
});

test("explicit trusted proxy origin works without email bindings and forwarded-host cannot authorize an attacker", async () => {
  const send = handler({
    getConfig: () => null,
    allowedOrigin: "https://approved.example",
  });
  assert.equal(
    (await send(request(input, { origin: "https://approved.example" }))).status,
    503,
  );
  assert.equal(
    (
      await send(
        request(input, {
          origin: "https://attacker.example",
          "x-forwarded-host": "attacker.example",
        }),
      )
    ).status,
    403,
  );
});

test("explicitly configured site origin can submit from behind a proxy", async () => {
  const result = await handler({
    getConfig: () => ({ ...config, allowedOrigin: "https://approved.example" }),
  })(request(input, { origin: "https://approved.example" }));
  assert.equal(result.status, 200);
});

test("unsupported content type and malformed JSON are rejected", async () => {
  assert.equal(
    (await handler()(request(input, { "content-type": "text/plain" }))).status,
    415,
  );
  assert.equal((await handler()(request("{incomplete"))).status, 400);
});

test("declared and streamed oversized bodies are rejected", async () => {
  assert.equal(
    (await handler()(request(input, { "content-length": "20000" }))).status,
    413,
  );
  assert.equal(
    (await handler()(request({ ...input, description: "x".repeat(20_000) })))
      .status,
    413,
  );
});

test("honeypot and unlisted service requests are rejected without delivery", async () => {
  assert.equal(
    (await handler()(request({ ...input, website: "https://bot.example" })))
      .status,
    400,
  );
  const result = await handler()(
    request({ ...input, service: "invented-service" }),
  );
  assert.equal(result.status, 400);
  assert.ok((await result.json()).fieldErrors.service);
});

test("repeated email requests are rate limited even when IP address changes", async () => {
  const send = handler({ now: () => 100_000 });
  for (let index = 0; index < 3; index++) {
    assert.equal(
      (
        await send(
          request(input, { "x-forwarded-for": `192.0.2.${index + 1}` }),
        )
      ).status,
      200,
    );
  }
  const result = await send(
    request(input, { "x-forwarded-for": "192.0.2.200" }),
  );
  assert.equal(result.status, 429);
  assert.equal(result.headers.get("retry-after"), "900");
});

test("sliding-window limit expires correctly and bounded storage refuses flooding", () => {
  const limiter = new SlidingWindowRateLimiter(2);
  assert.equal(limiter.check("one", 1, 1000, 1000).allowed, true);
  assert.deepEqual(limiter.check("one", 1, 1000, 1500), {
    allowed: false,
    retryAfterSeconds: 1,
  });
  assert.equal(limiter.check("two", 1, 1000, 1500).allowed, true);
  assert.equal(limiter.check("three", 1, 1000, 1500).allowed, false);
  assert.equal(limiter.check("three", 1, 1000, 2500).allowed, true);
  assert.equal(limiter.check("one", 1, 1000, 2500).allowed, true);
});
