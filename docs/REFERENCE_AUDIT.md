# Reference research and page inventory

Research date: 12 October 2026. This document separates attempted live research from the structure specified in the owner-supplied [project brief](PROJECT_BRIEF.md). It does not represent an inspection of pages that the environment could not retrieve.

## Live access evidence

| Exact destination requested | Method | Observed result | Consequence |
|---|---|---|---|
| `https://www.conservairrigation.com/` | Python `urllib.request`, normal TLS verification, desktop browser user agent | `Tunnel connection failed: 403 Forbidden` | HTTPS proxy rejected CONNECT before upstream HTML could be obtained. |
| `https://www.conservairrigation.com/` | `curl --head`, normal TLS verification | Exit 56, `CONNECT tunnel failed, response 403`; response server `envoy` | Independent client confirms an outbound proxy restriction, not a website render or repository failure. |
| `https://conservairrigation.com/` | Python `urllib.request` | `Tunnel connection failed: 403 Forbidden` | Bare-host alternative is restricted too. |
| `http://www.conservairrigation.com/` | Python `urllib.request` | HTTP 403 | No fallback page content obtained; HTTPS/TLS verification was not disabled. |
| `https://www.facebook.com/p/GreenMan-Irrigation-Inc-100054579468900/` | Python `urllib.request` | `Tunnel connection failed: 403 Forbidden` | The live Facebook page was not reviewed. This failure does not establish that Facebook itself requires login. |
| `https://www.tiktok.com/@greenman_52` | Python `urllib.request` | `Tunnel connection failed: 403 Forbidden` | The live TikTok page was not reviewed. Supplied extracted stills remain usable for private implementation review. |

The read-only environment configuration draft reports a restricted network policy, the package-manager preset, and an empty custom egress-rule list. The destinations above are absent from the declared allowed hosts. No network configuration was changed during this audit. Reading the configuration does not prove the current runtime policy; the actual proxy responses provide the runtime evidence.

Required research destination additions are `www.conservairrigation.com`, `conservairrigation.com`, `www.facebook.com`, and `www.tiktok.com`. If these are allowed later, follow actual redirects and add only the genuinely required destination hosts. Preserve existing package-manager and repository access. Do not guess CDN hosts or replace an unknown allowlist.

No external browsing/search connector was callable during the audit. Browser screenshots cannot provide useful reference evidence while the initial HTML request is rejected. No Conserva text, photography, logos, scripts, stylesheets, or source code was downloaded or copied.

## What remains unobserved

Because the reference homepage is unavailable, its current navigation destinations cannot be discovered reliably. The following properties remain **unverified**, rather than inferred as live Conserva behavior:

- Desktop/tablet/mobile header geometry and exact dropdown contents.
- Actual hero imagery, crops, overlay strengths, typography, font families, line heights, spacing, and colors.
- Current section sequence and responsive breakpoints.
- Hover, sticky-header, scrolling, animation, tab, accordion, and keyboard behavior.
- Actual fields, validation, consent wording, submission endpoints, rate limits, and success states on forms.
- Current package names, pricing, service availability, review presentation, footer composition, and internal link destinations.

No guessed Conserva service URLs are presented as visited pages. “Blocked by parent host” below means page discovery could not proceed because the provided reference entry point was blocked; it does not mean each unknown child path was requested individually.

## Required reference page inventory and GreenMan counterparts

All page topics below come from the supplied brief's phase-one audit list. The proposed GreenMan hierarchy is an implementation decision grounded in that brief, not a report of observed Conserva content.

| Required reference topic | Live review status | GreenMan counterpart | Original hierarchy and conversion treatment |
|---|---|---|---|
| Homepage | Exact provided URL requested; proxy 403 | `/` | Utility/header navigation, portrait photo mosaic, two primary actions, three core service cards, local/family introduction, inspection topics, benefit cards, irrigation education, deeper services, authentic-feedback invitation, process, final inquiry CTA, footer. |
| Residential irrigation | Blocked by parent host; navigation URL undiscovered | `/residential` | Homeowner-focused introduction, original residential imagery, common watering/repair needs, service links, assessment process, FAQ, residential inquiry form. |
| Commercial irrigation | Blocked by parent host; navigation URL undiscovered | `/commercial` | Image-neutral property-manager introduction, property types, system-management needs, maintenance coordination, inquiry form with property type/location/contact preference. Residential stills must not imply verified commercial work. |
| All irrigation services | Blocked by parent host; navigation URL undiscovered | `/services` | Service-directory introduction, grouped linked cards, residential/commercial pathways, seasonal care and landscaping links, help choosing a service, estimate CTA. |
| Irrigation installation | Blocked by parent host; navigation URL undiscovered | `/services/irrigation-installation` | Installation discussion, property considerations, sprinkler/groundwork illustrations with accurate captions, assessment-to-care process, FAQs, inquiry CTA. |
| Sprinkler repairs | Blocked by parent host; navigation URL undiscovered | `/services/sprinkler-repair` | Symptoms customers can recognize, diagnostic considerations, operating-head illustration, next-step information, repair-specific inquiry. Photos do not prove a repair was performed. |
| Drip irrigation | Blocked by parent host; navigation URL undiscovered | `/services/drip-irrigation` | Planting-bed watering considerations, emitter/controller discussion, project assessment, irrigation/landscaping coordination, FAQs and inquiry. |
| Seasonal spring startups | Blocked by parent host; navigation URL undiscovered | `/services/spring-startup` | Massachusetts seasonal context without fixed guarantees, activation/checklist discussion, customer preparation, seasonal-care links, request-service CTA. |
| Mid-season inspections | Blocked by parent host; navigation URL undiscovered | `/services/mid-season-inspection` | Changing weather/planting needs, coverage/controller review, concerns to report, FAQs, inspection inquiry. |
| Winterization | Blocked by parent host; navigation URL undiscovered | `/services/winterization` | Freeze-risk explanation, professional system preparation, scheduling guidance without invented appointments, seasonal-care links, inquiry CTA. |
| Drainage solutions | Blocked by parent host; navigation URL undiscovered | `/services/drainage-solutions` | Owner-review service scope, site assessment and water-management concerns, restrictions/next steps, inquiry. Wet parking-area frames must not imply drainage remediation. |
| Backflow testing | Blocked by parent host; navigation URL undiscovered | `/services/backflow-testing` | Owner-review specialty availability and qualification status, plain educational content, confirmation-first request CTA. No invented licensing or legal guarantees. |
| Sprinkler inspections | Blocked by parent host; navigation URL undiscovered | `/services/system-inspections` | Heads/valves/pipes, zones/coverage, controller schedules and system performance, inspection process, FAQs, inquiry CTA. |
| Seasonal maintenance packages | Blocked by parent host; navigation URL undiscovered | `/maintenance-plans`, `/services/maintenance` | Side-by-side configurable care concepts, spring/midseason/fall timeline, inquiry action. Proposed inclusions/prices require owner approval; no invented discounts. |
| About Us | Blocked by parent host; navigation URL undiscovered | `/about` | Family-owned local identity, hands-on approach, original behind-the-scenes montage, values/customer commitment, editable missing biography details, estimate CTA. |
| Reviews/testimonials | Blocked by parent host; navigation URL undiscovered | `/reviews` | Genuine-feedback invitation and maintainable approved-review data. No fabricated carousel entries, customers, star ratings, or review-profile links. |
| Contact/request service | Blocked by parent host; navigation URL undiscovered | `/contact` | Name/phone/email/location/property type/service/description/preference/date fields, consent/privacy link, validation, truthful delivery states and alternative contact once verified. |
| Educational resources/FAQs | Blocked by parent host; navigation URL undiscovered | `/faq` | Search/filter and accessible disclosure controls, original Massachusetts seasonal/system answers, related service links, useful request CTA. |

Additional brief-required routes complement this inventory: `/landscaping`, `/gallery`, `/service-areas`, `/privacy`, and `/services/smart-irrigation`. They serve this single-location business; no franchise locator, unsupported local-office network, or duplicate city doorway pages are needed.

## Implementation patterns taken from the supplied requirements

### Navigation and page composition

Use a two-level header with business context above primary navigation. Group the long service list in an accessible dropdown or mega menu, while keeping Landscaping, Residential, Commercial, About, Gallery, and Contact discoverable. Provide an obvious estimate action and a mobile menu with the same useful destinations. Internal links should lead to substantial pages, rather than changing only the page title. Link seasonal details to maintenance concepts, landscape illustrations to the gallery, and contact forms back to appropriate services.

For desktop heroes, pair readable original GreenMan copy with two or three narrow source images. The supplied 512 × 910 stills should remain portrait-oriented; one source should not become an enlarged widescreen billboard. Supporting service sections can use medium-width portrait images, balanced split layouts, cards, and a deliberately image-neutral treatment for unsupported commercial/specialty claims. On smaller widths, stack sections and keep the primary inquiry action visible.

### Conversion and forms

Use “Request an Estimate” as the main site-wide action and service exploration as the secondary action. Place contextual request actions after service explanations, inspection content, and the final page section. Scheduling means requesting service until an actual appointment provider is configured. Never imply live appointment availability, free inspections, approved packages, or successful email delivery without evidence.

Contact, residential, commercial, and maintenance inquiries should share a validated backend while setting relevant service/property defaults. Delivery credentials and sender/recipient bindings remain environment settings. Success must be contingent on actual delivery acknowledgment; missing integration should yield a helpful failure state. Use accessible labels, mobile-appropriate inputs, spam protection, consent/privacy information, and clear loading/error states.

### Interactive and accessible behavior

Use keyboard-operable menus, disclosures and gallery controls. Gallery categories come from the supplied asset manifest and describe the scene rather than proving service work. The lightbox needs previous/next, Escape, focus handling and visible captions. FAQ search and disclosures should work at keyboard and touch sizes. Respect reduced motion and maintain sufficient text/button contrast. Include a custom 404, privacy route, route-specific metadata, and sitemap links.

### Editorial and business research limits

The brief supplies provisional business contact information and image provenance. It does not independently verify the public directory address/phone, contact email, full service area, specialties/certifications, company history, customer reviews, social destination ownership, or footage publication rights. Preserve those uncertainties in editable business/approval configuration. The supplied source frames support accurate scene descriptions; they do not identify customers or prove completed installations, commercial work, repairs, seasonal services, roofing work, or before/after pairings.

## Follow-up audit after network access becomes available

1. Retry the exact supplied homepage and follow its real navigation, recording actual URLs and response status for every topic above.
2. Capture the homepage and representative service/contact pages at 1440, 768, and 390 pixels; preserve screenshots outside public website assets.
3. Record actual hierarchy, menus, responsive changes, typography, section transitions, component spacing, CTA placement, form fields, accessible interactions and footer treatment.
4. Compare the implemented GreenMan pages for design quality, information density, service discovery, and ease of making a request. Refine original GreenMan layouts without importing Conserva copy/assets/code.
5. Retry Facebook/TikTok separately. Distinguish proxy rejection, actual login/interstitial restrictions, and accessible public content. Use only authorized imagery and independently verified business claims.

Live reference comparison is an outstanding research limitation. It does not block implementation or testing of the original website from the complete supplied brief and actual local asset package.
