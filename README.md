# GreenMan Irrigation, Inc.

An original GreenMan website built with Next.js 16, React 19, TypeScript, Tailwind CSS, and Lucide icons. It includes 25 pages and all 22 supplied GreenMan-associated video stills. **The website has not been deployed; publication requires the owner's approval.**

## Local setup

The implementation environment uses Node **24.19.0** and npm **11.9.0**. Next.js 16 requires Node **20.9 or newer**; Node 24 is recommended.

```bash
cd /workspace/Greenman-Irrigation-Inc.
npm ci
npm run dev
```

Use a local browser at `http://localhost:3000` for development. The server listens on `0.0.0.0`; loopback addresses are not public preview links. Cloud tasks already have isolated checkouts: use the existing checkout rather than creating a separate Git worktree. Environment snapshots preserve installed files, not running server processes; start the application again in a new task.

For a local production build, run `npm run build` followed by `npm run start`.

## Open the draft in GitHub Codespaces

The complete draft is on branch `greenman-website-draft`. In the terminal of an existing Codespace for this repository, run:

```bash
git fetch origin
git switch greenman-website-draft
bash scripts/codespaces-preview.sh
```

The script selects Node 24 through the existing nvm installation where available, installs locked dependencies, verifies all 22 supplied images, builds in review mode, and starts port 3000. It also configures the exact Codespaces forwarded form origin. Once the terminal says **Ready**, open **Ports**, keep **3000 Private**, and select **Open in Browser**. Leave the terminal running. No ZIP upload is needed. If switching branches reports existing local changes, preserve them before switching; do not reset or overwrite them.

This uses a production runtime for a private review preview, avoiding forwarded development-resource restrictions. It does not deploy the public domain or approve facts, services, or media for the final website. Online email remains unconfigured. Optional overrides: `GREENMAN_PREVIEW_PORT` and `GREENMAN_NPM_CACHE`.

## Pages and features

| Area | Routes |
| --- | --- |
| Homepage | `/` |
| Service overviews | `/services`, `/irrigation`, `/landscaping` |
| Property-specific inquiries | `/residential`, `/commercial` |
| Seasonal care | `/maintenance-plans` |
| Company and projects | `/about`, `/gallery`, `/reviews` |
| Help and contact | `/faq`, `/service-areas`, `/contact`, `/privacy` |
| Service details | `/services/irrigation-installation`, `/services/sprinkler-repair`, `/services/drip-irrigation`, `/services/spring-startup`, `/services/mid-season-inspection`, `/services/winterization`, `/services/drainage-solutions`, `/services/backflow-testing`, `/services/smart-irrigation`, `/services/system-inspections`, `/services/maintenance` |

These are 25 review pages. `/our-work` redirects to `/gallery`. The app also includes a custom 404, `/sitemap.xml`, `/robots.txt`, Open Graph artwork, and `/api/contact`.

Features include desktop service menus, mobile navigation, portrait photo mosaics, irrigation education tabs, searchable FAQ disclosures, and a keyboard-accessible gallery lightbox. Gallery counts: **22 total; Irrigation 8, Landscaping 6, Site Preparation 5, Operations 3**. Residential and commercial inquiries share the validated contact backend.

No fabricated reviews, ratings, biographies, credentials, or commercial project claims are displayed. Before/after support requires approved matching-site pairs; none are active. Photo uploads remain unavailable until secure storage is configured.

## Configuration and editing

If `.env.local` does not exist, copy `.env.example` to it and fill bindings securely. Preserve existing local settings. Real `.env` files are ignored by Git; never commit credentials.

| Setting | Purpose |
| --- | --- |
| `RESEND_API_KEY` | Server-only Resend sending credential. |
| `CONTACT_FROM_EMAIL` | Plain sender address on a Resend-verified domain. |
| `CONTACT_TO_EMAIL` | Plain, owner-approved destination inbox. |
| `CONTACT_SITE_ORIGIN` | Optional exact external origin for a trusted reverse proxy; normally leave empty. The request origin, actual incoming Host, and centralized canonical domain are supported. |
| `SITE_PUBLICATION_MODE` | `review` by default; `public` filters content by approval. Set consistently during build and startup. |

Email credentials and sender/recipient bindings are **absent** in the implementation environment. Valid requests currently receive HTTP 503 and an explicit “not sent” message. Provider tests are mocked and do not establish real inbox delivery. With configuration, success means Resend accepted the message for delivery; an appointment still needs confirmation. JavaScript is required for validated form submission. Without hydration, the form posts to the endpoint rather than placing personal details in a URL, and shows a notice to enable JavaScript or use another approved contact option.

| Source | Editable content |
| --- | --- |
| `src/data/business.ts` | Identity, canonical domain, contact approval, social links, service areas, team, reviews, care plans, and before/after pairs. |
| `src/data/services.ts` | Eleven service descriptions, FAQs, image associations, specialty status, and offering approval. |
| `src/data/greenmanGallery.ts` | Exact image paths, alt text, source video/timestamp, placement, cropping, and publication approval. |
| `src/data/faqs.ts` | General educational questions and answers. |
| `src/app/[page]/page.tsx` | General-page sections and privacy wording. |
| `src/app/globals.css` | Brand colors, typography, responsive layouts, and styling. |

Default **review** mode shows pending photos, proposed offerings, and provisional facts with search indexing disabled. It is not access protection: keep any externally shared review instance behind host access controls. All 22 images and all 11 offerings currently await owner approval. **Public mode does not approve them**: it hides pending photos/service pages, filters form choices, and blocks unapproved raw and optimized image paths. Set approval flags only after verification, then **rebuild** with the chosen publication mode. See [owner review](docs/OWNER_REVIEW.md) and [deployment instructions](docs/DEPLOYMENT.md).

## Checks and browser tests

```bash
npm run typecheck
npm run lint
npm test
npm run verify:assets
npm run build
```

Asset verification checks all 22 public WebP images and 22 non-public JPEG originals, exact SHA-256 copies, 512 × 910 dimensions, manifest provenance, alt text, and category counts. Contact tests cover validation, consent, preselection, email escaping, origin/body guards, honeypot rejection, rate limiting, missing configuration, and mocked provider responses. The final local build, type, lint, 19 unit checks, and 16 browser checks pass; see the [image and QA report](docs/IMAGE_PLACEMENT_REPORT.md) for coverage and limits. A separate `npm run verify:public` checks a local public-mode server at port 3001 (or `PUBLIC_TEST_BASE_URL`) for media/offering approval enforcement.

The Playwright suite requires a running **review-mode server without real email bindings**. Start `npm run dev` in another terminal, then run `npm run test:e2e`. Its missing-configuration tests intentionally expect 503; do not run it against an inbox-connected live deployment.

Playwright currently defaults to `/usr/bin/chromium`. Set `CHROMIUM_PATH` to another installed executable when needed. To install Playwright's browser and override that default:

```bash
npm exec -- playwright install chromium
CHROMIUM_PATH="$(node -p "require('@playwright/test').chromium.executablePath()")" npm run test:e2e
```

Set `TEST_BASE_URL` for a different local test origin. The suite covers all 25 pages/links, original and optimized images, navigation, gallery/lightbox, FAQs, tabs, form errors, metadata, security headers, and overflow at 1440/1024/768/390/360px.

## Assets and review documents

`public/images/greenman/` contains 22 unchanged WebP frames. `assets/` preserves the 22 JPEG originals, CSV, asset README, integration notes, and two contact sheets outside the public directory. The uploaded ZIP contains no original videos or Facebook screenshot; CSV video names document provenance only.

Live Conserva, Facebook, and TikTok research was blocked by the environment's HTTPS proxy. Those live pages were not reviewed. The implementation follows the supplied structure/UX requirements using original GreenMan code, copy, branding, and imagery; the audit records exact access limitations.

- [Page-by-page image placement and QA](docs/IMAGE_PLACEMENT_REPORT.md)
- [Final validation and route checklist](docs/QA_REPORT.md)
- [Owner facts, services, and media approval](docs/OWNER_REVIEW.md)
- [Reference audit](docs/REFERENCE_AUDIT.md)
- [Deployment guide](docs/DEPLOYMENT.md)
- [Original brief](docs/PROJECT_BRIEF.md)
- [Desktop homepage screenshot](docs/screenshots/home-desktop.png)
- [Mobile homepage screenshot](docs/screenshots/home-mobile.png)
- [All screenshots](docs/screenshots/)

Before publication, confirm media rights, service scope, contact channels, privacy contact/retention terms, and actual email receipt. The rate limiter is process-local: **serverless hosting or multiple replicas requires a shared persistent adapter**. An approved official logo and higher-resolution originals are optional presentation improvements; the 22 supplied images already support review. No DNS or live website changes have been made.

## Reusable cloud environment configuration

The cloud draft saves `install_script` and `start_skill`, email variable requirements (`CONTACT_FROM_EMAIL`, `CONTACT_TO_EMAIL`, `SITE_PUBLICATION_MODE=review`), and the `RESEND_API_KEY` secret requirement for `api.resend.com`. Custom network additions include that API plus `www.conservairrigation.com`, `conservairrigation.com`, `www.facebook.com`, and `www.tiktok.com`; package-manager presets are preserved. Saving the draft does not inject values, apply networking, restart processes, or publish a snapshot. Review and save settings, then publish the cloud environment snapshot to activate them. This is separate from deployment of the website, which still needs explicit approval. Fresh-task restoration and real email delivery have not been verified.
