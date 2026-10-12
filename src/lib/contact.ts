import { z } from "zod";
import { SlidingWindowRateLimiter } from "./rate-limit";

const phoneSchema = z
  .string()
  .trim()
  .max(40)
  .refine(
    (value) =>
      /^[+\d\s().-]+$/.test(value) &&
      value.replace(/\D/g, "").length >= 10 &&
      value.replace(/\D/g, "").length <= 15,
    "Enter a phone number with 10–15 digits.",
  );

export const contactSchema = z
  .object({
    fullName: z
      .string()
      .trim()
      .min(2, "Enter your full name.")
      .max(120, "Use 120 characters or fewer."),
    phone: phoneSchema,
    email: z.string().trim().email("Enter a valid email address.").max(254),
    address: z
      .string()
      .trim()
      .min(5, "Enter a service address or ZIP code.")
      .max(250),
    propertyType: z.enum(["residential", "commercial"], {
      message: "Choose a property type.",
    }),
    propertyDetails: z.string().trim().max(150).optional().default(""),
    service: z
      .string()
      .trim()
      .min(1, "Choose a service.")
      .max(80)
      .regex(/^[a-z0-9-]+$/, "Choose a listed service."),
    description: z
      .string()
      .trim()
      .min(
        10,
        "Tell us a little more about your project (at least 10 characters).",
      )
      .max(2000, "Use 2,000 characters or fewer."),
    preferredContact: z.enum(["phone", "email"], {
      message: "Choose how we should contact you.",
    }),
    preferredDate: z
      .string()
      .trim()
      .optional()
      .default("")
      .refine((value) => {
        if (!value) return true;
        if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
        const date = new Date(`${value}T00:00:00Z`);
        return (
          !Number.isNaN(date.getTime()) &&
          date.toISOString().slice(0, 10) === value
        );
      }, "Enter a valid preferred date."),
    consent: z
      .boolean()
      .refine(
        (value) => value,
        "Please consent to being contacted about your request.",
      ),
    website: z.string().max(250).optional().default(""),
  })
  .strict();

export type ContactInput = z.input<typeof contactSchema>;
export type ContactData = z.output<typeof contactSchema>;
export type ContactFieldErrors = Partial<Record<keyof ContactInput, string>>;

export function normalizeContactService(
  requested: string,
  choices: readonly { value: string; label: string; title?: string }[],
): string {
  const normalize = (value: string) =>
    value
      .trim()
      .toLowerCase()
      .replace(/[\s_-]+/g, "");
  const wanted = normalize(requested);
  if (!wanted) return "";
  return (
    choices.find((choice) =>
      [choice.value, choice.label, choice.title ?? ""].some(
        (value) => normalize(value) === wanted,
      ),
    )?.value ?? ""
  );
}

export function contactFieldErrors(error: z.ZodError): ContactFieldErrors {
  const fields: ContactFieldErrors = {};
  for (const issue of error.issues) {
    const key = issue.path[0] as keyof ContactInput | undefined;
    if (key && !fields[key]) fields[key] = issue.message;
  }
  return fields;
}

export type EmailConfig = {
  apiKey: string;
  from: string;
  to: string;
  allowedOrigin?: string;
};

export function getEmailConfig(
  env: Record<string, string | undefined> = process.env,
): EmailConfig | null {
  const apiKey = env.RESEND_API_KEY?.trim();
  const from = env.CONTACT_FROM_EMAIL?.trim();
  const to = env.CONTACT_TO_EMAIL?.trim();
  if (
    !apiKey ||
    !from ||
    !to ||
    !z.string().email().safeParse(from).success ||
    !z.string().email().safeParse(to).success
  )
    return null;
  return { apiKey, from, to };
}

export function escapeHtml(value: string): string {
  return value.replace(
    /[&<>"']/g,
    (character) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        character
      ]!,
  );
}

export function buildContactEmail(data: ContactData) {
  const fields = [
    ["Name", data.fullName],
    ["Phone", data.phone],
    ["Email", data.email],
    ["Service location", data.address],
    ["Property", data.propertyType],
    ["Property details", data.propertyDetails || "Not provided"],
    ["Requested service", data.service],
    ["Preferred contact", data.preferredContact],
    ["Preferred date", data.preferredDate || "Flexible"],
    ["Project description", data.description],
    ["Consent", "Customer consented to contact about this request."],
  ];
  return {
    // User input is excluded from mail headers other than the validated reply-to address.
    subject: "New GreenMan website service inquiry",
    text: fields.map(([label, value]) => `${label}: ${value}`).join("\n\n"),
    html: `<h1>New GreenMan service inquiry</h1><dl>${fields.map(([label, value]) => `<dt><strong>${label}</strong></dt><dd style="white-space:pre-wrap;margin-bottom:16px">${escapeHtml(value)}</dd>`).join("")}</dl><p>Preferred dates are requests and have not been confirmed.</p>`,
  };
}

const MAX_BODY_BYTES = 16_384;

async function readLimitedJson(request: Request): Promise<unknown> {
  const declaredLength = Number(request.headers.get("content-length"));
  if (declaredLength > MAX_BODY_BYTES) throw new Error("body-too-large");
  if (!request.body) throw new Error("invalid-json");
  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let length = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      length += value.byteLength;
      if (length > MAX_BODY_BYTES) {
        await reader.cancel();
        throw new Error("body-too-large");
      }
      chunks.push(value);
    }
  } finally {
    reader.releaseLock();
  }
  const bytes = new Uint8Array(length);
  let offset = 0;
  for (const chunk of chunks) {
    bytes.set(chunk, offset);
    offset += chunk.byteLength;
  }
  return JSON.parse(new TextDecoder("utf-8", { fatal: true }).decode(bytes));
}

function json(
  body: Record<string, unknown>,
  status: number,
  extraHeaders: Record<string, string> = {},
) {
  return Response.json(body, {
    status,
    headers: { "Cache-Control": "no-store", ...extraHeaders },
  });
}

async function hashed(value: string) {
  const bytes = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(value),
  );
  return Array.from(new Uint8Array(bytes), (byte) =>
    byte.toString(16).padStart(2, "0"),
  ).join("");
}

export function createContactHandler(options: {
  getConfig: () => EmailConfig | null;
  limiter: SlidingWindowRateLimiter;
  fetcher?: typeof fetch;
  now?: () => number;
  allowedServices?: readonly string[];
  allowedOrigin?: string;
}) {
  return async function handleContact(request: Request): Promise<Response> {
    const config = options.getConfig();
    const origin = request.headers.get("origin");
    const requestUrl = new URL(request.url);
    const allowedOrigins = new Set([requestUrl.origin]);
    // Next may normalize 127.0.0.1 to localhost in request.url. Browser Host
    // remains the actual destination; never trust arbitrary forwarded-host values.
    const incomingHost = request.headers.get("host");
    if (
      incomingHost &&
      /^(?:[a-z0-9.-]+|\[[a-f0-9:]+\])(?::\d{1,5})?$/i.test(incomingHost)
    ) {
      try {
        allowedOrigins.add(
          new URL(`${requestUrl.protocol}//${incomingHost}`).origin,
        );
      } catch {
        /* Reject malformed host aliases. */
      }
    }
    for (const configuredOrigin of [
      options.allowedOrigin,
      config?.allowedOrigin,
    ]) {
      if (!configuredOrigin) continue;
      try {
        allowedOrigins.add(new URL(configuredOrigin).origin);
      } catch {
        /* Invalid optional URL never broadens allowed origins. */
      }
    }
    if (
      (origin && !allowedOrigins.has(origin)) ||
      request.headers.get("sec-fetch-site") === "cross-site"
    ) {
      return json(
        { error: "Please send your request from the GreenMan website." },
        403,
      );
    }
    if (
      !/^application\/json(?:\s*;|$)/i.test(
        request.headers.get("content-type") ?? "",
      )
    ) {
      return json({ error: "Send the request as JSON." }, 415);
    }

    let raw: unknown;
    try {
      raw = await readLimitedJson(request);
    } catch (error) {
      const tooLarge =
        error instanceof Error && error.message === "body-too-large";
      return json(
        {
          error: tooLarge
            ? "Your request is too large. Please shorten the description."
            : "We could not read your request. Please try again.",
        },
        tooLarge ? 413 : 400,
      );
    }
    const parsed = contactSchema.safeParse(raw);
    if (!parsed.success)
      return json(
        {
          error: "Please check the highlighted fields.",
          fieldErrors: contactFieldErrors(parsed.error),
        },
        400,
      );
    const data = parsed.data;
    if (data.website)
      return json({ error: "We could not process this request." }, 400);
    if (
      options.allowedServices &&
      !options.allowedServices.includes(data.service)
    ) {
      return json(
        {
          error: "Please choose a listed service.",
          fieldErrors: { service: "Choose a listed service." },
        },
        400,
      );
    }
    if (!config)
      return json(
        {
          error:
            "Online requests are awaiting email configuration. Your request has not been sent. Please use the contact options on this page.",
        },
        503,
      );

    const now = options.now?.() ?? Date.now();
    const ip =
      request.headers.get("x-forwarded-for")?.split(",").at(-1)?.trim() ||
      request.headers.get("x-real-ip") ||
      "unavailable";
    const limits: [string, number][] = [
      ["global", 100],
      [`ip:${await hashed(ip)}`, 5],
      [`email:${await hashed(data.email.toLowerCase())}`, 3],
    ];
    for (const [key, maximum] of limits) {
      const result = options.limiter.check(key, maximum, 15 * 60_000, now);
      if (!result.allowed)
        return json(
          {
            error:
              "Too many requests. Please wait before trying again, or contact GreenMan directly.",
          },
          429,
          { "Retry-After": String(result.retryAfterSeconds) },
        );
    }

    try {
      const email = buildContactEmail(data);
      const result = await (options.fetcher ?? fetch)(
        "https://api.resend.com/emails",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${config.apiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: config.from,
            to: [config.to],
            reply_to: data.email,
            ...email,
          }),
          signal: AbortSignal.timeout(10_000),
        },
      );
      if (!result.ok)
        return json(
          {
            error:
              "The email service could not accept your request. It has not been sent. Please try again or contact GreenMan directly.",
          },
          502,
        );
      const receipt = (await result.json()) as { id?: unknown };
      if (typeof receipt.id !== "string" || !receipt.id)
        return json(
          {
            error:
              "We could not confirm that your request was accepted. Please contact GreenMan directly.",
          },
          502,
        );
      return json(
        {
          success: true,
          message:
            "Your request has been accepted by the email service for delivery to GreenMan. Your preferred date is a request; an appointment is confirmed only after GreenMan contacts you.",
        },
        200,
      );
    } catch {
      return json(
        {
          error:
            "The email service is temporarily unavailable. We could not confirm that your request was sent. Please try again or contact GreenMan directly.",
        },
        502,
      );
    }
  };
}
