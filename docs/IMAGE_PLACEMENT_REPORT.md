# GreenMan image placement and publication report

This report describes the implemented private review website. The supplied frames are visible-scene illustrations, not independently verified completed GreenMan projects. Build and browser validation results are recorded below.

## Asset verification

The extracted `GreenMan_Codex_Complete_Package.zip` contains 22 unique portrait stills in both WebP and JPEG formats: **22 WebP + 22 JPEG**, plus two contact sheets. All 22 WebP images were copied to `public/images/greenman/`. All 22 JPEG originals are retained outside the public directory in `assets/originals/`. The original CSV is preserved at `assets/asset_manifest.csv`; the typed registry is `src/data/greenmanGallery.ts`.

`npm run verify:assets` passed. It checks the exact inventory, all 22 local paths, unique IDs, descriptive alt text, categories, source video filenames, timestamps, featured status, dimensions, and valid publication status against the source manifest. It also verifies that **all 44 image files are SHA-256 exact copies of the supplied originals** and remain **512 × 910 pixels**. Hash verification is reproducible in `scripts/verify-assets.ts`.

No video file is included in the ZIP or the two uploaded attachments. The eight `.mp4` source names below are provenance recorded in the CSV, not playable files present in the package. No fabricated video player or nonexistent video URL is used.

## Page and section placement

Every filename below resolves under `/images/greenman/`. The table records actual component references, not a proposed placement list. The shared final CTA is described separately to keep repeated filenames clear.

| Route / section | Exact WebP filenames | Treatment |
|---|---|---|
| `/` — hero mosaic | `GM_01_residential-estate-green-lawn.webp`; `GM_01_active-sprinklers-residential.webp` | Two separate portrait frames; no single stretched widescreen background. |
| `/` — Irrigation card | `GM_01_residential-lawn-sprinkler.webp` | Active residential watering illustration. |
| `/` — Landscaping card | `GM_05_landscape-rock-garden.webp` | Decorative stone and planting illustration. |
| `/` — Seasonal Care card | `GM_03_garden-irrigation-watering.webp` | General watering scene; does not claim spring startup or winterization footage. |
| `/` — family-owned / About split section | `GM_06_residential-yard-preparation.webp` | Visible yard preparation, with descriptive caption. |
| `/` — Landscaping feature | `GM_05_stone-and-plant-border.webp` | Decorative border scene linking to Landscaping. |
| `/` — Featured Work strip | `GM_05_stone-and-plant-border.webp`; `GM_08_sprinkler-watering-new-site.webp` | Descriptive scenes linking to filtered gallery views. |
| `/services` — introduction | `GM_08_sprinkler-operating-closeup.webp` | Operating sprinkler illustration. |
| `/irrigation` — hero | `GM_08_sprinkler-operating-closeup.webp`; `GM_03_garden-irrigation-watering.webp` | Sprinkler and planted-bed watering context. |
| `/services/irrigation-installation` — hero | `GM_08_yard-irrigation-and-site.webp`; `GM_07_trench-and-groundwork.webp` | Irrigation and soil groundwork context; contractual scope is not claimed. |
| `/services/sprinkler-repair` — hero | `GM_08_sprinkler-operating-closeup.webp` | Operating head, explicitly not proof of repair work. |
| `/services/drip-irrigation` — hero | `GM_03_landscape-garden-beds.webp`; `GM_03_garden-irrigation-watering.webp` | Planting-bed context, not proof of a drip installation. |
| `/services/spring-startup` — hero | `GM_03_garden-irrigation-watering.webp` | Watering illustration, not confirmed startup footage. |
| `/services/mid-season-inspection` — hero | `GM_01_active-sprinklers-residential.webp` | Residential watering context, not proof of an inspection. |
| `/services/winterization` — hero | None | Image-neutral; supplied media does not depict winterization. |
| `/services/drainage-solutions` — hero | None | Image-neutral specialty page. Wet parking-area frames are not used to imply drainage work. |
| `/services/backflow-testing` — hero | None | Image-neutral specialty page. No photo or credential claim implies certified testing. |
| `/services/smart-irrigation` — hero | `GM_01_residential-lawn-sprinkler.webp` | Watering context; no claim that a smart controller is visible. |
| `/services/system-inspections` — hero | `GM_08_sprinkler-watering-new-site.webp` | Visible irrigation context; no claim that an inspection is documented. |
| `/services/maintenance` — hero | `GM_03_lawn-edge-watering.webp` | Watering-equipment context. |
| `/residential` — hero | `GM_01_residential-estate-green-lawn.webp`; `GM_01_active-sprinklers-residential.webp` | Residential lawn context. |
| `/commercial` — hero / commercial sections | None | Image-neutral; no supplied still has been verified as commercial work. |
| `/landscaping` — hero | `GM_05_stone-and-plant-border.webp`; `GM_05_landscape-rock-garden.webp` | Planted border and decorative stone context. |
| `/landscaping` — supporting gallery | `GM_03_landscape-garden-beds.webp`; `GM_05_finished-property-landscape.webp`; `GM_06_residential-yard-preparation.webp`; `GM_07_new-home-ground-prep.webp` | Captioned landscape and preparation scenes. |
| `/landscaping` — special spaces | `GM_05_rooftop-green-surface.webp` | Visual portfolio context only; no green-roof service or certification claim. |
| `/maintenance-plans` — hero | `GM_03_garden-irrigation-watering.webp` | General watering scene; plan concepts remain pending approval. |
| `/about` — operations collage | `GM_04_equipment-trailer-evening.webp`; `GM_06_crew-construction-materials.webp` | Equipment and preparation context; worker identity is not asserted. |
| `/gallery` — filterable grid and lightbox | All 22 filenames listed below | Actual supplied inventory, descriptive captions, source filenames, and timestamps. |
| `/contact` — inquiry support | `GM_05_finished-property-landscape.webp` | Landscape illustration beside the inquiry form. |
| `/reviews`, `/faq`, `/service-areas` — page-specific content | None | Original text and functional controls; no invented testimonial photography or local-project claims. |
| `/privacy` and custom 404 | None | Image-neutral legal/help content. |

**Shared final CTA:** `GM_05_finished-property-landscape.webp` and `GM_01_residential-estate-green-lawn.webp` appear in a two-portrait composition on `/`, `/services`, `/irrigation`, `/residential`, `/commercial`, `/landscaping`, `/maintenance-plans`, `/about`, `/gallery`, `/reviews`, `/faq`, `/service-areas`, and all 11 service detail routes. These repeated general landscape visuals are not presented as commercial project evidence or evidence of a specialty service. `/contact` uses its supporting landscape image instead of this CTA.

## Complete gallery inventory

Review-mode filter totals are **All Work 22; Irrigation 8; Landscaping 6; Site Preparation 5; Operations 3**. The initial URL category is supported, and controls change the displayed grid. Public-mode totals currently equal zero because no photograph is approved.

| Exact filename | Category | Source video | Timestamp (seconds) |
|---|---|---|---:|
| `GM_01_residential-estate-green-lawn.webp` | Irrigation | `v12044gd0000csnocjnog65tp02f3pv0.mp4` | 2.72 |
| `GM_01_residential-lawn-sprinkler.webp` | Irrigation | `v12044gd0000csnocjnog65tp02f3pv0.mp4` | 9.86 |
| `GM_01_active-sprinklers-residential.webp` | Irrigation | `v12044gd0000csnocjnog65tp02f3pv0.mp4` | 28.92 |
| `GM_02_water-system-parking-area.webp` | Operations | `v15044gf0000d3n6lrvog65g25aapu0g.mp4` | 8.84 |
| `GM_02_work-vehicle-and-water.webp` | Operations | `v15044gf0000d3n6lrvog65g25aapu0g.mp4` | 12.02 |
| `GM_03_garden-irrigation-watering.webp` | Irrigation | `v15044gf0000d3vtluvog65togmad8c0.mp4` | 3.86 |
| `GM_03_lawn-edge-watering.webp` | Irrigation | `v15044gf0000d3vtluvog65togmad8c0.mp4` | 24.92 |
| `GM_03_landscape-garden-beds.webp` | Landscaping | `v15044gf0000d3vtluvog65togmad8c0.mp4` | 35.96 |
| `GM_04_equipment-trailer-evening.webp` | Operations | `v15044gf0000d40vkanog65j0lstg8lg.mp4` | 3.86 |
| `GM_05_rooftop-landscape-team.webp` | Landscaping | `v15044gf0000d98qe6vog65jmitr4p40.mp4` | 3.58 |
| `GM_05_rooftop-green-surface.webp` | Landscaping | `v15044gf0000d98qe6vog65jmitr4p40.mp4` | 14.26 |
| `GM_05_stone-and-plant-border.webp` | Landscaping | `v15044gf0000d98qe6vog65jmitr4p40.mp4` | 25.46 |
| `GM_05_landscape-rock-garden.webp` | Landscaping | `v15044gf0000d98qe6vog65jmitr4p40.mp4` | 31.34 |
| `GM_05_finished-property-landscape.webp` | Landscaping | `v15044gf0000d98qe6vog65jmitr4p40.mp4` | 40.60 |
| `GM_06_residential-yard-preparation.webp` | Site Preparation | `v15044gf0000damlqpvog65vooljld50.mp4` | 1.86 |
| `GM_06_crew-construction-materials.webp` | Site Preparation | `v15044gf0000damlqpvog65vooljld50.mp4` | 7.56 |
| `GM_07_trench-and-groundwork.webp` | Site Preparation | `v15044gf0000daq7cvfog65t6vpa5ceg.mp4` | 3.02 |
| `GM_07_new-home-ground-prep.webp` | Site Preparation | `v15044gf0000daq7cvfog65t6vpa5ceg.mp4` | 14.64 |
| `GM_07_residential-project-wide.webp` | Site Preparation | `v15044gf0000daq7cvfog65t6vpa5ceg.mp4` | 23.66 |
| `GM_08_sprinkler-operating-closeup.webp` | Irrigation | `v15044gf0000davtsunog65is0dt02ag.mp4` | 1.88 |
| `GM_08_sprinkler-watering-new-site.webp` | Irrigation | `v15044gf0000davtsunog65is0dt02ag.mp4` | 9.24 |
| `GM_08_yard-irrigation-and-site.webp` | Irrigation | `v15044gf0000davtsunog65is0dt02ag.mp4` | 15.16 |

The gallery implements a native-dialog lightbox, previous/next controls, arrow-key navigation, Escape handling, focus management, and mobile viewing. Browser verification passed for all category counts, URL initialization, previous/next wraparound, arrow keys, Escape, focus trapping/restoration, and full-image loading. Before/after support is implemented but has **no active pair**; unrelated frames are not represented as one property's transformation.

## Publication status and source marks

All 22 typed image entries currently have `publicationStatus: 'pending'`; **zero are approved**. All supplied images are available for local review and none is yet cleared for public publication. Setting `SITE_PUBLICATION_MODE=public` filters pending entries out of visual components and the gallery; the image proxy also rejects direct and Next image-optimization requests for unapproved GreenMan images. Default review mode includes `noindex` metadata and disallows crawling in `robots.txt`. Those controls do not make a publicly accessible review server private; use hosting access protection if sharing a review link later.

Original creator, TikTok, and player markings baked into the frames have not been edited out: SHA-256 matching verifies that the stored files are unchanged. Rendering keeps the complete 512:910 portrait frame, with `object-fit: contain` where specified, rather than cropping source marks away. The lightbox shows the complete frame. Owner rights review must address creator marks, identifiable people, properties, and permission to publish. No stock image replaces a matching supplied scene.

## QA and remaining approvals

| Check | Verified outcome |
|---|---|
| Frozen install | `npm ci` completed from the unchanged lockfile after initial installation. |
| Build | Next.js optimized builds completed in both review and public publication modes; review mode is restored for local inspection. |
| Type and lint | `npm run typecheck` and `npm run lint` passed. |
| Contact unit checks | 19 tests passed, including validation/consent, origin normalization and rejection, body limits, honeypot, rate limits, escaped email, and mocked provider acceptance/rejection/network failure. |
| Browser checks | 16 tests passed: 15 whole-site checks plus one explicitly mocked client success-state check. No tests skipped or disabled. |
| Routes and links | All 25 review pages returned 200 with distinct headings/titles and GreenMan metadata; internal links, gallery alias, and custom 404 verified. |
| Images | All 22 direct WebP URLs returned 200 with image content; all 22 optimized gallery images completed browser loading. All 44 stored files match source SHA-256 checksums. No broken image requests observed. |
| Responsive layouts | All 25 routes checked at 1440, 1024, 768, 390, and 360 pixels; no horizontal overflow. Homepage/Landscaping desktop and mobile screenshots inspected. |
| Interactions | Desktop dropdowns, native mobile menu/Escape/focus return, searchable FAQ disclosures, six education tabs/keyboard controls, and gallery filters/lightbox verified. |
| Contact browser behavior | Invalid data keeps focus on actionable errors. Valid local requests reach the API and return an honest 503 with a not-sent state because bindings are absent. Mocked client acknowledgment exercises reset/success UI only. |
| Real email delivery | **Not tested or configured.** No real email sent; provider mocks do not establish inbox delivery. Requires Resend credential, verified sender, approved destination inbox, network access, and owner-directed delivery test. |
| Publication enforcement | Separate local public build verified all 22 pending raw and optimized image requests return 404, all 11 pending offering routes return 404, no pending photos appear in gallery/contact, and form/sitemap omit pending offerings. Public robots allows crawling; review mode disallows it. |
| SEO/security | Canonicals, descriptions, headings, sitemap, robots, original Open Graph artwork, no invented review schema, and configured security headers checked. No Lighthouse score or live external profile verification claimed. |
| Development startup | After setting documented `allowedDevOrigins`, development gallery filtering and form validation hydrated successfully with zero page exceptions. |

Two issues found by browser testing were corrected: development resource access through `127.0.0.1`, and the API's host normalization rejecting a legitimate same-origin request. They are resolved in current code; regression tests cover the form-origin correction.

Screenshots are in `docs/screenshots/`. See `QA_REPORT.md` for commands, route inventory, and remaining external prerequisites.

Live Conserva, Facebook, and TikTok access was blocked by the environment's HTTPS proxy with a CONNECT 403; details are documented in `REFERENCE_AUDIT.md`. A live visual comparison has not been claimed. There is no Facebook screenshot in the uploaded ZIP or independently visible as a chat attachment: its described phone, address, email, slogan, and channels remain provisional brief-provided information.

Before publication, obtain the inputs and approvals listed in `OWNER_REVIEW.md`. No deployment or DNS change has been authorized or performed.
