# Deployment guide — owner approval required

The website is implemented for local review. **No deployment, public publication, or DNS change has been performed or authorized.** Prepare a release using this guide, then publish only after the owner's explicit approval.

## Approve the release content

Review the [owner checklist](OWNER_REVIEW.md), [image report](IMAGE_PLACEMENT_REPORT.md), [reference audit](REFERENCE_AUDIT.md), and [screenshots](screenshots/). Confirm business facts, contact channels, service scope, service area, media rights, and privacy wording before changing approval flags.

Set each authorized image's `publicationStatus` to `approved` in `src/data/greenmanGallery.ts`. The 22 supplied frames currently remain pending permission review. Preserve original marks and accurate captions; footage does not establish completed contracts, exact locations, before/after pairs, or credentials. Approval to possess the package does not establish permission to publish every frame.

Set each verified offering's `approval` to `approved` in `src/data/services.ts`. Confirm specialty scope and applicable qualifications for drainage/backflow before promotion. Edit contact/social/service-area/team/review/care-plan approvals in `src/data/business.ts`. Landscaping scope, proposed care-plan inclusions, privacy retention/access, and a working privacy-contact channel need owner confirmation. An approved official logo and higher-resolution photographs can be added later; they do not block review of the supplied 22 images.

Live reference research remains incomplete: HTTPS proxy CONNECT requests to `www.conservairrigation.com`, `conservairrigation.com`, `www.facebook.com`, and `www.tiktok.com` returned 403. If that audit is required for release approval, permit these exact destinations and finish it before launch. The uploaded package contains neither original videos nor the Facebook screenshot mentioned by the brief.

## Choose a host

Use Node 24 for consistency with the implementation environment (24.19.0, npm 11.9.0). Next.js 16 requires Node 20.9 or newer. Install from the lockfile with `npm ci`. This application needs a Node runtime for the contact endpoint and image optimization; a static-only export is unsuitable.

### A single Node process

A managed Node host or VM/container running one `next start` process fits the current rate limiter. Configure the host's process supervisor, HTTPS termination, secret storage, logging controls, and health checks. Keep publication mode consistent at build/runtime and configure the trusted proxy to validate incoming Host headers and preserve the public origin.

The limiter holds bounded, temporary hashed IP/email identifiers in process memory; limits reset on restart. Multiple workers, replicas, containers, or independently scaled instances do not share its state. Add a persistent shared adapter before using those configurations.

### Vercel or other serverless hosting

Next.js can run on Vercel, but replace the contact limiter with a shared persistent implementation before enabling public requests. A reviewed Redis-backed adapter is one option; no such adapter/account is configured by this implementation. Test limits across instances and review storage/privacy arrangements.

After approval, connect the authorized repository/branch using the host's normal Next.js workflow: repository root, `npm ci`, and `npm run build`. Set secrets in secure environment settings. Keep private review instances behind access controls; `noindex` does not make a review deployment private.

## Configure email and origin settings

Use the owner's Resend account and verify a domain the owner controls. Supply these server settings in the host's secret/environment store or an ignored `.env.local`:

| Variable | Requirement |
| --- | --- |
| `RESEND_API_KEY` | Valid sending credential for the configured Resend account/domain. |
| `CONTACT_FROM_EMAIL` | Plain sender address on the verified domain; display-name formatting is not accepted by the validator. |
| `CONTACT_TO_EMAIL` | Plain, owner-approved destination inbox. |
| `CONTACT_SITE_ORIGIN` | Optional exact external origin if a trusted reverse proxy rewrites the request origin. Leave empty for normal request/Host/canonical-domain handling. No wildcard origins. |
| `SITE_PUBLICATION_MODE` | `review` for editorial review; `public` for the approved release. |

Credentials and sender/recipient bindings are absent in the implementation environment, and no real email was sent. Missing configuration returns 503 with an explicit “not sent” message; failures never fabricate delivery. Success means Resend accepted the email for delivery. Actual inbox receipt must be verified separately.

Keep email settings server-only, without `NEXT_PUBLIC_` prefixes. Do not put credentials in Git, source, build logs, or chat. Preserve existing local configuration when copying `.env.example`. Review `/privacy` against actual owner inbox access, provider retention, hosting logs, and privacy-contact arrangements.

The endpoint calls `https://api.resend.com/emails` with normal HTTPS verification. If egress is restricted, allow this required API destination while preserving existing network rules. For sender verification, use the **exact SPF/DKIM records issued by Resend** for the chosen domain/subdomain; configure DMARC according to the approved provider/owner policy. Do not guess values, duplicate an existing SPF policy, or copy another account's records. Confirm verified status before the delivery test.

Secure photo storage is not configured. Keep uploads unavailable until authenticated storage, type/size limits, access/retention rules, and privacy updates are implemented. Form submission requires JavaScript; the no-script notice offers other approved contact options. The explicit POST method prevents absent hydration from putting personal data in query strings, but the endpoint intentionally accepts validated JSON rather than regular browser form encoding.

## Rebuild the approved publication mode

Approval flags and mode affect generated routes and rendering. **Rebuild after changing them**; changing only the startup environment can leave pre-rendered review content stale.

For an owner-approved single-process release:

```bash
npm ci
npm run typecheck
npm run lint
npm test
npm run verify:assets
SITE_PUBLICATION_MODE=public npm run build
SITE_PUBLICATION_MODE=public npm run start
```

These are future release instructions, not a record of deployment. Managed hosts should set `SITE_PUBLICATION_MODE=public` during both build and runtime.

Public mode filters photos by individual approval, returns 404 for pending service-detail pages, filters menus/form choices, and hides unapproved contact facts and plan concepts. The proxy blocks unapproved raw `/images/greenman/` files and their `/_next/image` requests. All current media/offering approvals are pending, so switching modes alone would remove the supplied photos and service offerings. Approve intended release content first.

For read-only local gate verification, start the public-mode build with `SITE_PUBLICATION_MODE=public npm run start -- --port 3001`, then run `npm run verify:public` in another terminal. The script requires a local origin and sends no email.

Verify the rebuilt mode, generated sitemap/indexing metadata, pending raw/optimized image 404s, approved image loading, and host/CDN cache behavior. Ensure caches cannot serve unapproved assets from a prior shared review instance.

## Domain and HTTPS — after approval

The centralized canonical domain is `https://greenmanirrigationinc.com` in `src/data/business.ts`. Confirm domain ownership and the canonical hostname. Add the apex domain and optional `www` to the chosen host; redirect the alternative hostname to the canonical one.

Enter the **exact DNS records issued by that host** at the registrar/DNS provider. Hosts differ in apex A/ALIAS/ANAME records and `www` CNAME targets; no fixed IP or CNAME is assumed. Preserve existing MX and email-authentication records. Verify propagation through the host before confirming its managed TLS certificate.

Use supported HTTPS setup and HTTP-to-HTTPS redirection. Confirm certificate coverage, canonical links, sitemap URLs, and form-origin behavior at the final HTTPS domain. No registrar, DNS, certificate, or live-site settings were changed during implementation.

## Release QA and final approval

The [README](../README.md) documents local validation and Playwright installation. The current browser suite targets a **review-mode instance without real email bindings**, and its form assertions intentionally expect 503. Start that server separately and run `npm run test:e2e`. Override the default `/usr/bin/chromium` with `CHROMIUM_PATH` if needed, and use `TEST_BASE_URL` for another local origin. Do not run this suite against an inbox-connected live deployment.

Final browser/build results are consolidated in the [image and QA report](IMAGE_PLACEMENT_REPORT.md) after the last changes. Mocked provider tests do not verify an external account or mailbox.

Check the rebuilt approved release for:

- Correct approved contacts, offerings, photos, captions, gallery counts, and image provenance.
- Working routes/navigation and readable desktop/tablet/mobile layouts without broken images, overflow, or browser exceptions.
- Keyboard access for menus, lightbox, tabs, FAQ disclosures, and form validation/focus.
- Intended public metadata/sitemap and raw/optimized asset approval enforcement.
- Consent, validation, honeypot, rate limits, provider errors, and real provider acceptance.

Once the owner authorizes a delivery test, send one clearly identified inquiry to the approved inbox. Verify provider acknowledgment, actual inbox receipt, reply-to, escaped content, and text/HTML readability. Confirm failures cannot yield false success. This form requests contact and does not book an appointment. Handle test records under the approved retention policy.

Get explicit approval of the final release and delivery test before launch. Keep the approved source/build and host configuration identifiable so a previous approved release can be restored if needed. Implementation and local tests do not authorize publication.
