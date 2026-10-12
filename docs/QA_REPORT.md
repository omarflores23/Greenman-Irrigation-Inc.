# GreenMan local implementation and validation

The repository contains the implemented website. No website deployment, DNS change, or real email delivery took place. Tests use the actual local Next.js server and supplied assets; email-provider acceptance/rejection tests use mocks.

## Verified workflow

Node 24.19.0, npm 11.9.0, Next.js 16.4.0, TypeScript, and Chromium were used. `npm ci` reproduced the installed dependencies from `package-lock.json`. Optimized builds succeeded with both `SITE_PUBLICATION_MODE=review` and `SITE_PUBLICATION_MODE=public`. Review mode is restored for local owner inspection.

| Verification | Result |
|---|---|
| `npm run build` | Passed; app pages, API, image optimization, original Open Graph PNG, sitemap, robots, and proxy compile. |
| `npm run typecheck` | Passed. |
| `npm run lint` | Passed, no errors or warnings. |
| `npm test` | 19 passed, zero failed/skipped; includes mocked provider success/failure and origin regression checks. |
| `npm run verify:assets` | Passed: 22 WebP and 22 original JPEG files, exact SHA-256 source matches, 512 × 910, manifest correspondence. |
| `npm run test:e2e` | 16 browser tests passed; 15 whole-site tests and one mocked UI success-state test. |
| `npm run verify:public` | Passed against separate local public-mode build: 22 raw + 22 optimized approval gates, 11 service gates, gallery, form choices, sitemap, robots. |
| Development startup | Gallery filtering and invalid-form validation hydrated correctly; zero page exceptions after the documented development-origin fix. |

Public-mode checks perform read-only local requests. All images and offerings currently await approval, so public-mode image URLs and offering pages return 404; approved entries can later be enabled individually. This test is a configuration check, not a publication.

## Page and feature checklist

All 25 review pages returned 200, had one visible `h1`, distinct GreenMan titles/headings, descriptions and canonicals, working internal links, and loaded appropriate imagery. None contains placeholder lorem ipsum or unintended reference-business copy.

| Route | Verified content/features |
|---|---|
| `/` | Two-portrait hero, three service cards, About split, four inspection areas, four values, six education tabs, featured services, feedback invitation, five-step process, imagery strip, final CTA. |
| `/services` | Full eleven-service directory and sprinkler introduction image. |
| `/irrigation` | Irrigation overview, residential/commercial links, full service grid and FAQ. |
| `/landscaping` | Portrait hero, preparation/stone/planting discussions, four-image gallery, accurately labeled rooftop visual, inquiry CTA. |
| `/residential` | Residential visuals, homeowners' topics, services and preselected residential inquiry form. |
| `/commercial` | Image-neutral commercial content, managed-property topics and preselected commercial inquiry form; no claimed commercial case study. |
| `/maintenance-plans` | Seasonal guidance, two clearly labeled discussion concepts, seasonal FAQ and inquiries. |
| `/about` | Family-owned values, equipment/preparation collage; no invented founding history, identities or biographies. |
| `/gallery` | All 22 frames, categories/counts, query initialization, descriptive captions and source timestamps, native modal lightbox. |
| `/reviews` | Honest feedback invitation; no fake testimonials or ratings. |
| `/faq` | Fourteen searchable questions, empty results and keyboard-operable disclosures. |
| `/service-areas` | Lynn identity and availability inquiry; no invented surrounding-town coverage or offices. |
| `/contact` | Validated inquiry form, privacy consent, location/phone review status, supporting landscape photograph. |
| `/privacy` | Actual inquiry/provider handling and owner-review requirements. |
| `/services/irrigation-installation` | Original introduction, distinct benefits/problems/steps/FAQ, two context photos. |
| `/services/sprinkler-repair` | Original repair topics and operating-head context, not claimed repair evidence. |
| `/services/drip-irrigation` | Planting-bed context, original benefits/problems/steps/FAQ. |
| `/services/spring-startup` | Seasonal activation topics, general watering illustration. |
| `/services/mid-season-inspection` | Coverage/performance topics and irrigation context. |
| `/services/winterization` | Seasonal freeze preparation content, image-neutral service hero. |
| `/services/drainage-solutions` | Specialty confirmation, image-neutral hero, no wet-parking photo claim. |
| `/services/backflow-testing` | Specialty/credential confirmation, image-neutral hero, no invented qualification. |
| `/services/smart-irrigation` | Controller/compatibility guidance; watering photo is not labeled controller evidence. |
| `/services/system-inspections` | Inspection topics and irrigation context. |
| `/services/maintenance` | Ongoing care topics and watering-equipment illustration. |

Every service detail page also has original FAQs, linked inquiries and the shared final CTA. `/our-work` redirects to `/gallery`; unknown paths return the custom 404. Footer links, desktop dropdowns, mobile menu/Escape/focus return, phone URI, FAQ disclosures, education-tab arrows/Home/End, sitemap/robots, and security headers were exercised.

## Images and responsive evidence

All 22 direct WebP paths returned 200 with actual image bodies in review mode. All 22 optimized gallery images completed loading with positive natural dimensions. Gallery category results were 22 total, 8 Irrigation, 6 Landscaping, 5 Site Preparation, and 3 Operations. Lightbox next/previous wraparound, arrow keys, Escape, Tab trap, opener focus restoration, captions, source filenames and timestamps passed.

All 25 pages were checked at widths 1440, 1024, 768, 390 and 360 pixels without horizontal overflow. Saved screenshots include homepage desktop/mobile and hero details, Landscaping desktop/mobile, Gallery mobile, and Contact mobile. Lazy images were scrolled into view and loaded before the full-page homepage, Landscaping and Gallery screenshots were captured. The portrait frames and baked source marks remain intact; no unrelated stock image is used. No Lighthouse score is claimed.

See [exact image placements](IMAGE_PLACEMENT_REPORT.md) and [screenshots](screenshots/).

## Form evidence and limits

Browser tests verified invalid-field focus/messages, preselected service/property types, preserved inputs on error, and valid submission reaching the actual local endpoint. With absent email settings, that endpoint returns HTTP 503 and explicitly states that the request was not sent. A separate intercepted response tests the client success state/reset only. Unit tests exercise the real handler with a mocked HTTPS provider, including acceptance, rejection, missing acknowledgment and network failure. **Neither proves real Resend delivery or inbox receipt.**

The endpoint enforces JSON/body limits, schema validation, consent, honeypot rejection, known choices, origin checks, and bounded process-local rate limits, then escapes email content. The form uses POST and a no-script notice, avoiding personal details in query strings if hydration fails. Photo uploads remain unavailable because secure storage is not configured. A preferred date requests contact; it does not book an appointment. Distributed/serverless hosting needs a shared rate limiter before enabling public inquiries.

Two browser-discovered issues were fixed: Next development resource access through `127.0.0.1`, and legitimate local form-origin rejection after Next host normalization. Regression tests preserve foreign-origin rejection while accepting the actual destination/canonical origin.

## Remaining external prerequisites

- Configure `RESEND_API_KEY`, a verified `CONTACT_FROM_EMAIL`, and an owner-approved `CONTACT_TO_EMAIL` securely, allow `api.resend.com`, and validate actual receipt after the owner directs a delivery test.
- Complete [owner review](OWNER_REVIEW.md): contact facts, offering scope, media permission, specialty qualifications, service area, genuine testimonials and approved project captions.
- Live Conserva/Facebook/TikTok audit remains blocked by proxy CONNECT 403. Supplied structure requirements were implemented; live page inspection/screenshots or visual equivalence are not claimed. See [reference access evidence](REFERENCE_AUDIT.md).
- The package includes 22 stills plus originals/contact sheets, but no playable videos or Facebook screenshot.
- The cloud draft saves installation/startup instructions, email variable/secret requirements and required domains. Saving it does not apply bindings or publish anything. Review/save settings and publish the cloud environment snapshot to activate it; website deployment still needs separate explicit approval.

No final claim of live form readiness or public-release readiness is made while these prerequisites are outstanding.
