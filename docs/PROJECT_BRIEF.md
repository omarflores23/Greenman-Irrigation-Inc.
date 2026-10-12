# PROJECT: BUILD THE COMPLETE GREENMAN IRRIGATION, INC. WEBSITE

> **Codex execution package — updated 12 October 2026.** This prompt retains the complete original GreenMan website brief and integrates an authentic 22-image asset library extracted from eight owner-supplied TikTok videos. Run it together with `GreenMan_Website_Assets/` from the accompanying ZIP. The folder must be present in the Codex workspace or copied into the repository before implementation. **A file referenced in this chat is not automatically available to Codex.**

## START HERE — MANDATORY IMAGE ASSET INTEGRATION

This is **not** a request for a generic site or a site built from stock imagery. The accompanying ZIP contains actual GreenMan-associated project footage stills. Use them deliberately throughout the website and cite each via a real local asset path. Do not use a placeholder string or a nonexistent remote URL.

**Package input locations:**

```text
GreenMan_Website_Assets/
├── README.md
├── asset_manifest.csv
├── Contact_Sheet_1.jpg
├── Contact_Sheet_2.jpg
├── Codex_Integration_Instructions.md
└── images/
    ├── GM_01_residential-lawn-sprinkler.webp
    ├── GM_05_landscape-rock-garden.webp
    └── ... (22 WebP + 22 JPG images total)
```

**Required first actions in Codex:**

1. List repository files and locate `GreenMan_Website_Assets/images/`. If the ZIP has not been placed in the workspace, **stop and clearly request that the user upload/extract the ZIP into the repository**. Do not fabricate images and do not silently substitute stock photography.
2. Read `GreenMan_Website_Assets/asset_manifest.csv` and `README.md`; inspect both contact sheets.
3. Copy all 22 **WebP** stills into `public/images/greenman/` (or the existing framework's public asset directory). Keep filenames unchanged. Preserve the JPG originals as optional fallbacks or in a non-public originals folder if useful; avoid unnecessarily publishing duplicates.
4. Create a typed image manifest (e.g. `src/data/greenmanGallery.ts`) containing `src`, `alt`, `category`, `featured`, `sourceVideo`, `timestampSeconds`, `placement`, and `publicationStatus` based on actual manifest data. Categories: `Irrigation`, `Landscaping`, `Site Preparation`, `Operations`.
5. Use `<Image>` or appropriate responsive image rendering with width=512 and height=910 where uncropped, `sizes` and `object-fit: cover` for cards, and careful subject-aware `object-position`. Do not stretch narrow source images onto widescreen spaces.
6. Show the photos on the homepage, service pages, new Landscaping page, and filtered gallery. Actually verify the files load in the browser/build. Report which filenames are used at which route/section.
7. Seek permission/owner sign-off before publishing photos and project claims. Keep original creator/watermark marks and do not remove or misrepresent them. Images come from user-supplied videos; possession does not itself establish rights or prove all visible work was done by GreenMan.

**Visual hierarchy:** Use authentic project footage prominently on service cards, split-layout sections, project gallery, and narrow-screen visuals. For the large desktop homepage hero, use a visually pleasing portrait mosaic/three-panel montage made from these photos (with overlay and legible text), or reserve a clearly marked photo slot for a genuine high-resolution landscape original. Since these files are 512×910, do not enlarge one to a full-width desktop billboard or falsely call it a high-resolution hero. Original photos provided later should take precedence.

---

## YOUR ROLE

You are an expert full-stack web developer, senior UI/UX designer, website conversion strategist, and local service business marketing specialist.

Your mission is to build a production-quality, fully functional, multi-page website for **GreenMan Irrigation, Inc.**, a family-owned irrigation service business based in Lynn, Massachusetts.

The website must closely recreate the overall visual experience, sophistication, website architecture, navigation patterns, responsive behavior, and functionality of Conserva Irrigation's website, but must be completely rebranded for GreenMan Irrigation.

This is an actual business website, not a fictional demonstration, simple landing page, or static mockup.

**Primary reference website:**
https://www.conservairrigation.com/

**GreenMan's intended production domain:**
https://greenmanirrigationinc.com/

**GreenMan's existing Facebook page:**
https://www.facebook.com/p/GreenMan-Irrigation-Inc-100054579468900/

IMPORTANT: Recreate the reference site's overall page structure, interaction patterns, design quality, and conversion strategy as faithfully as possible. Use original GreenMan code, imagery, logos, copy, and branding. Do not copy Conserva's copyrighted text, proprietary assets, trademarks, or source code.

---

## PHASE 1 — COMPLETE REFERENCE WEBSITE AUDIT

Before building, thoroughly inspect Conserva Irrigation's website.

Study its desktop, tablet, and mobile experiences.

Inspect the homepage and every relevant service-related page accessible from the main navigation, including:

1. Homepage
2. Residential irrigation services
3. Commercial irrigation services
4. All irrigation services
5. Irrigation installation
6. Sprinkler repairs
7. Drip irrigation
8. Seasonal spring startups
9. Mid-season inspections
10. Winterization
11. Drainage solutions
12. Backflow testing
13. Sprinkler inspections
14. Seasonal maintenance packages
15. About Us
16. Reviews and testimonials
17. Contact and request service
18. Educational resources and FAQs

For each page, analyze:

- Overall page composition and content hierarchy
- Header and navigation layout
- Desktop dropdown menus and mobile navigation
- Hero photography, cropping, and overlays
- Typography, font weights, and spacing
- Color treatment and button hierarchy
- Section ordering and transitions
- Cards, backgrounds, borders, and shadows
- Service descriptions and CTA positioning
- Accordions, tabs, interactive elements, and forms
- Footer composition
- Responsive breakpoints
- Hover states, scroll behavior, and animations
- Internal linking and page navigation
- Lead-generation and conversion strategies

Capture reference screenshots at approximately 1440px, 768px, and 390px widths if browser tooling permits.

Create an internal page-by-page reference inventory and implement a corresponding GreenMan page wherever it is relevant to this single-location business.

**Do not stop after reviewing the homepage.**

The final GreenMan website must feel as polished and complete as the reference, not like a simplified interpretation.

---

## PHASE 2 — RESEARCH GREENMAN IRRIGATION

Use GreenMan's Facebook page, publicly accessible business information, and any original photographs or documents made available in the repository.

The business information currently available is:

- Business name: GreenMan Irrigation, Inc.
- Business type: Family-owned irrigation service contractor
- Reported business location: Lynn, Massachusetts
- Public directory address: 181 Henry Ave, Lynn, MA 01902
- Public directory phone: (978) 798-5474
- Intended website: greenmanirrigationinc.com
- Facebook: https://www.facebook.com/p/GreenMan-Irrigation-Inc-100054579468900/
- TikTok: https://www.tiktok.com/@greenman_52
- Public Facebook screenshot shows the slogan: "If you can dream it! You can do it!"
- Public Facebook screenshot lists email: luismeono@yahoo.com (ask the owner whether this remains the business contact inbox and whether it should be displayed publicly)
- The Facebook screenshot shows buttons for WhatsApp and Messenger; these channels must link to verified destination URLs, not guessed phone-number links.
- Uploaded user-supplied TikTok videos have already been processed into the accompanying `GreenMan_Website_Assets/` image package, so **use those files even when TikTok/Facebook pages are inaccessible**.

The owner must confirm the address, phone number, email, working WhatsApp/Messenger contact endpoints, service areas, and publishing rights before production deployment. Any screenshot-provided values are provisional until confirmed.

Research the business's actual services, jobsite photographs, equipment, work history, service area, branding, customer reviews, and differentiators.

If Facebook or TikTok is inaccessible due to login restrictions, DO NOT pretend that the live page was reviewed. You DO have a user-provided Facebook screenshot and an actual image package extracted from eight user-uploaded TikTok clips: use those verified inputs. Build an editable photo gallery and testimonial system, retaining placeholders only for genuinely missing items.

Do not confuse this Massachusetts business with similarly named companies in other states.

Do not invent:

- Years in business
- Number of customers
- Customer ratings
- Industry certifications
- Licensing or insurance claims
- Guarantees or warranties
- Staff biographies
- Promotional offers
- Prices
- Water savings percentages
- Partnerships
- Franchise relationships

Any facts awaiting confirmation must be clearly identified in an editable business configuration file.

---

## PHASE 2A — ASSET INDEX AND EXACT PAGE PLACEMENT (REQUIRED)

### Photo source, limitations, and asset use policy

The accompanying `GreenMan_Website_Assets` folder contains **22 unique portrait frames, each in `.webp` and `.jpg` (44 files)**. They come from eight videos supplied in this conversation. Each measures **512 × 910 px**. There are also two contact sheet preview images. `GM_01` through `GM_08` refer to different source videos, not sequential project IDs or confirmed job names.

**Editorial truth standards:** Images show actions/locations, not independently verified customer identities, contractual scope, before-and-after status, service credentials, or exact locations. Use descriptive alt text based solely on visible scenes. Do not claim a photo documents a specific GreenMan installation, commercial client, backflow test, roof installation, or completed project without approval. Do not use a supposed before/after slider unless both photos are confirmed to depict the same site at different dates. Frame images with baked-in TikTok marks require a publication review.

### Required image placement matrix

| Page/section | Local WebP filename | Presentation/use |
|---|---|---|
| Homepage main visual / hero photo mosaic | `GM_01_residential-estate-green-lawn.webp` + `GM_01_active-sprinklers-residential.webp` | Side-by-side portrait collage with strong text contrast; not a stretched solo fullscreen background |
| Homepage Irrigation service card | `GM_01_residential-lawn-sprinkler.webp` | Real sprinkler operation; portrait card |
| Homepage Landscaping service card | `GM_05_landscape-rock-garden.webp` | Decorative landscaped rock/plant bed |
| Homepage Seasonal Care / additional feature | `GM_03_garden-irrigation-watering.webp` | Irrigation visual only; do not label it spring startup or winterization evidence |
| Homepage About / Our Process split section | `GM_06_residential-yard-preparation.webp` | Visible yard and site preparation; avoid claims about worker identity |
| Homepage Featured Work strip | `GM_05_stone-and-plant-border.webp`, `GM_08_sprinkler-watering-new-site.webp` | Responsive original-project imagery |
| `/services` overview | `GM_08_sprinkler-operating-closeup.webp` | Sprinkler-focused service introduction |
| `/services/irrigation-installation` | `GM_08_yard-irrigation-and-site.webp` + `GM_07_trench-and-groundwork.webp` | Irrigation / soil groundwork scenes; scope not independently established |
| `/services/sprinkler-repair` | `GM_08_sprinkler-operating-closeup.webp` | Illustration of an operating head, **not** proven repair footage |
| `/residential` | `GM_01_residential-estate-green-lawn.webp` + `GM_01_active-sprinklers-residential.webp` | Residential lawn context |
| `/commercial` | Relevant original imagery **only after verifying commercial nature**; otherwise tasteful generic environment or image-neutral design | Never mislabel residential shots as commercial projects |
| `/landscaping` | `GM_05_stone-and-plant-border.webp`, `GM_05_landscape-rock-garden.webp`, `GM_03_landscape-garden-beds.webp` | Landscaped planting borders/rock beds |
| `/landscaping` special projects area | `GM_05_rooftop-green-surface.webp` | Display as rooftop surface seen in video; do not advertise a certified green-roof service without approval |
| `/gallery` or `/our-work` | **All 22** WebP assets, filtered from manifest | Actual visual inventory; descriptive captions only |
| `/about` operations collage | `GM_04_equipment-trailer-evening.webp`, `GM_06_crew-construction-materials.webp` | Behind-the-scenes/equipment content, if approved and clear |
| `/contact` supporting image | `GM_05_finished-property-landscape.webp` | Attractive landscaping photo alongside service inquiry |

**When not visually appropriate:** Do not use `GM_02_water-system-parking-area.webp` or `GM_02_work-vehicle-and-water.webp` to suggest drainage, flooding restoration, or plumbing services. Include them in an optional, correctly labeled Operations gallery only after publication review. Do not reuse photos as proof of specialty service offerings when the media does not depict them.

### Full image inventory — authoritative files to use

The table below lists all 22 extracted stills. Confirm that each exists in `GreenMan_Website_Assets/images/` before copying, and maintain links to the original filename and source video timestamp through the gallery metadata.

| Category | WebP filename | Accurate visible-scene description |
|---|---|---|
| Irrigation | `GM_01_residential-estate-green-lawn.webp` | Large home with green lawn and exterior landscaping |
| Irrigation | `GM_01_residential-lawn-sprinkler.webp` | Active sprinklers watering front residential lawn |
| Irrigation | `GM_01_active-sprinklers-residential.webp` | Residential lawn with several active sprinkler sprays |
| Operations | `GM_02_water-system-parking-area.webp` | Water visible near paved parking area; activity not confirmed |
| Operations | `GM_02_work-vehicle-and-water.webp` | Work vehicles and equipment near a wet paved area |
| Irrigation | `GM_03_garden-irrigation-watering.webp` | Water sprays onto an established landscaped planting bed |
| Irrigation | `GM_03_lawn-edge-watering.webp` | Watering equipment and hose at edge of a lawn |
| Landscaping | `GM_03_landscape-garden-beds.webp` | Decorative rock and planting beds adjacent to a lawn |
| Operations | `GM_04_equipment-trailer-evening.webp` | Truck and work trailer photographed in low light |
| Landscaping | `GM_05_rooftop-landscape-team.webp` | Workers preparing landscaped rooftop surface |
| Landscaping | `GM_05_rooftop-green-surface.webp` | Rooftop surface showing green turf or planted covering |
| Landscaping | `GM_05_stone-and-plant-border.webp` | Decorative stone bed and planted border next to green turf |
| Landscaping | `GM_05_landscape-rock-garden.webp` | Completed decorative stone landscaping and planting |
| Landscaping | `GM_05_finished-property-landscape.webp` | Landscaped lawn and green outdoor areas near buildings |
| Site Preparation | `GM_06_residential-yard-preparation.webp` | Fenced residential yard before landscape completion |
| Site Preparation | `GM_06_crew-construction-materials.webp` | Work materials and site preparation near residential construction |
| Site Preparation | `GM_07_trench-and-groundwork.webp` | Close view of soil trench and ground work |
| Site Preparation | `GM_07_new-home-ground-prep.webp` | Large residential property with graded soil in front of home |
| Site Preparation | `GM_07_residential-project-wide.webp` | Wide view of new residential landscaping work area |
| Irrigation | `GM_08_sprinkler-operating-closeup.webp` | Active lawn sprinkler spraying onto bare soil |
| Irrigation | `GM_08_sprinkler-watering-new-site.webp` | Sprinkler irrigation visible across newly prepared ground |
| Irrigation | `GM_08_yard-irrigation-and-site.webp` | Water spraying across newly prepared yard adjacent to home |

### Image and media quality rules

- Implement blur placeholders or consistent neutral-color backgrounds while images load; do not introduce missing asset requests.
- Do not enlarge 512px frames to huge backgrounds. At desktop dimensions, use 2–3-column image compositions or medium-width service cards.
- On mobile, prioritize the portrait originals; preserve portrait cropping and avoid cutting off the visible sprinkler spray/work scene.
- Keep a migration path so verified high-resolution GreenMan originals can replace frame images by updating only the centralized metadata.
- Avoid image overlays covering TikTok watermarks or adding false brand/source metadata.
- If rights/approval are pending, keep unapproved image entries disabled in production via `publicationStatus` but available for development review. Do not claim all 22 are automatically cleared.
- Gallery filter controls must update the grid, all image paths must resolve, lightbox keyboard controls must function, and captions must reflect exactly what is visible.
- Prefer authentic footage over filler across homepage and pages where scene matches the topic; a neutral design is better than a misleading photo.

---

## PHASE 3 — GREENMAN BRAND IDENTITY

GreenMan should look like an established, trustworthy, premium local irrigation company while retaining the approachable character of a family-owned business.

### Brand positioning

GreenMan Irrigation specializes in professional irrigation solutions for homeowners and commercial property owners.

Present the business as a practical, knowledgeable local partner focused on:

- Healthy lawns and landscapes
- Reliable irrigation systems
- Quality craftsmanship
- Efficient water management
- Long-term customer relationships
- Professional property care
- Personal, family-owned service

### Visual identity

Create a polished GreenMan identity with:

- Deep forest green: #174D36
- Fresh leaf green: #78B843
- Light sage green: #E7F0E2
- Warm off-white: #F8FAF6
- Dark charcoal: #202A23
- White: #FFFFFF

These are starting values and may be refined based on GreenMan's actual existing logo.

Use bold, highly legible typography, premium landscape photography, clean white space, and professional iconography.

The Facebook screenshot includes a green superhero/Hulk-like mascot. Do NOT reproduce that character or use it as the site logo without clearance. Create an original GreenMan wordmark or original nature/irrigation mascot, and replace it with an owner-approved official logo if supplied. The Facebook slogan may be proposed as secondary brand copy only after owner approval.

Do not substitute Conserva's logo or brand mark.

### Original marketing headlines

Use these as starting copy:

**Main hero headline:**

"Beautiful Lawns Start with Better Irrigation."

**Hero subheading:**

"Family-owned irrigation installation, repair, and maintenance serving Lynn, Massachusetts and surrounding communities."

**Primary CTA:**
"Request an Estimate"

**Secondary CTA:**
"Explore Our Services"

Additional copy ideas:

"Your Landscape Deserves Reliable Irrigation."

"Local Expertise. Quality Work. Greener Results."

"From New Installations to Seasonal Care, GreenMan Has You Covered."

"Good Irrigation Is About More Than Sprinklers."

Use friendly, authentic, professional language. Avoid generic corporate jargon and exaggerated claims.

---

## PHASE 4 — DEVELOP THE COMPLETE WEBSITE

### PAGE 1 — HOMEPAGE

Build a visually impressive homepage with the same general section sequence and visual sophistication as Conserva's homepage.

**SECTION A — Header and navigation**

Create a two-level or similarly sophisticated navigation system.

Top utility bar:
- Family-Owned & Locally Operated
- Lynn, Massachusetts
- Clickable phone number
- Facebook icon
- Verified TikTok social link
- Verified Messenger/WhatsApp shortcuts if owner-approved
- Request Estimate button

Main navigation:
- Home
- Services
- Irrigation
- Landscaping
- Residential
- Commercial
- Seasonal Maintenance
- About Us
- Our Work
- Reviews
- Contact

Use dropdown or mega-menu navigation where it improves usability.

Make the navigation sticky on scroll if appropriate.

Implement an accessible mobile menu with working links and a visible request-estimate CTA.

**SECTION B — Full-width photographic hero**

Use an authentic GreenMan photo composition from `GM_01_residential-estate-green-lawn.webp` and `GM_01_active-sprinklers-residential.webp`. Because both images are 512×910 portrait frames, implement a high-quality responsive multi-panel/photo-mosaic hero on desktop and a single portrait/stacked treatment on mobile. If an owner-approved high-resolution landscape photo is later supplied, prefer that for a classic full-bleed hero. Do not present the current frames as high-resolution widescreen photographs.

Apply a subtle dark/green gradient overlay to preserve text readability.

Create a strong left-aligned headline, supporting text, and two CTA buttons.

Optional visual details:
- Gentle fade-in animation
- Background-image scaling effect
- Decorative green accent
- Scroll indicator

On mobile, preserve a clear readable headline and visible call-to-action buttons without horizontal overflow.

**SECTION C — Three primary service cards**

Use the same general three-card navigation concept as the reference website.

Cards:

1. Irrigation Services (real photo: `GM_01_residential-lawn-sprinkler.webp`)
2. Landscaping (real photo: `GM_05_landscape-rock-garden.webp`)
3. Seasonal Maintenance (real photo: `GM_03_garden-irrigation-watering.webp`; seasonal operation not specifically depicted)

Retain residential and commercial irrigation options in the primary navigation and as deeper service links.

Each should include:
- Professional irrigation photograph
- Service title
- Short description
- Learn More link
- Hover effect
- Responsive layout

**SECTION D — About GreenMan**

Create a split-layout section combining real GreenMan-associated fieldwork imagery (`GM_06_residential-yard-preparation.webp` or `GM_07_new-home-ground-prep.webp`) with compelling written content. Use authentic captions without asserting whose property or which company completed a specific task.

Heading:

"Family-Owned Irrigation Services Built on Trust."

Explain that customers receive hands-on service, clear communication, and irrigation solutions tailored to their property's needs.

Include an About Us CTA.

**SECTION E — System Inspection**

Create a prominent inspection or estimate section inspired by Conserva's inspection presentation.

Suggested heading:

"Know What Your Irrigation System Needs."

Show four inspection focus areas:

- Sprinkler heads, valves, and pipes
- Water coverage and zoning
- Controllers and watering schedules
- Lawn health and system performance

Include a "Schedule an Inspection" CTA.

Do not advertise free inspections until confirmed by GreenMan.

**SECTION F — Why Choose GreenMan**

Create four visually consistent benefit cards:

1. Family-Owned Service
2. Professional Irrigation Solutions
3. Respect for Your Property
4. Long-Term System Care

Provide original descriptions.

**SECTION G — Irrigation Systems Explained**

Create an interactive section educating customers about:

- Smart controllers and timers
- System layout and design
- Sprinkler heads and valves
- Water pressure and coverage
- Drainage and water management
- Repairs and preventative maintenance

Use expandable panels, images, tabs, or accordions.

Ensure all controls function.

**SECTION H — Featured Services**

Display visually polished service cards covering:

- Irrigation Installation
- Sprinkler Repair
- Spring Start-Up
- Winterization
- Drip Irrigation
- Smart Irrigation Upgrades
- Landscaping (link to the new `/landscaping` route; show `GM_05_stone-and-plant-border.webp`)

Each card links to its own complete page.

**SECTION I — Customer Reviews**

Create a testimonial carousel or grid with space for genuine GreenMan customer reviews.

Only display reviews that are authentic, verified, and approved for publication.

If reviews are unavailable, use a professionally designed section inviting customers to share their experiences rather than inventing testimonials.

**SECTION J — Our Process**

Build a five-step visual timeline inspired by Conserva's customer education approach, with original GreenMan wording:

1. Tell Us What You Need
2. Inspect and Assess the Property
3. Recommend the Right Solution
4. Complete the Work
5. Provide Ongoing Support

Each step must include an icon, short explanation, and suitable visual layout.

**SECTION K — Final CTA**

Large full-width CTA section with a visually balanced multi-image composition using `GM_05_finished-property-landscape.webp` and `GM_01_residential-estate-green-lawn.webp`, with a green overlay. Avoid stretching either portrait asset across the entire page.

Headline:

"Ready for a Greener, Healthier Lawn?"

Buttons:
- Request an Estimate
- Call GreenMan

**SECTION L — Footer**

Include:
- GreenMan logo
- Company description
- Service links
- Service area information
- Phone and contact information
- Facebook link
- Privacy Policy
- Copyright
- All important internal website links

---

### PAGE 2 — ALL IRRIGATION SERVICES

Create a complete service-directory landing page at `/services`.

Use a professional hero, introductory text, and individual service cards.

Provide navigation to every service page.

Each service must have its own SEO-friendly page with:
- Distinct hero
- Original service description
- Benefits
- Common customer problems
- How the service works
- Relevant photographs
- FAQs
- Contact CTA

Build the following pages:

`/services/irrigation-installation`

`/services/sprinkler-repair`

`/services/drip-irrigation`

`/services/spring-startup`

`/services/mid-season-inspection`

`/services/winterization`

`/services/drainage-solutions`

`/services/backflow-testing`

`/services/smart-irrigation`

`/services/system-inspections`

`/services/maintenance`

The owner states that GreenMan provides the irrigation services offered by Conserva. Prepare pages for this range, but mark any specialty service requiring confirmation or certification before public promotion.

Do not automatically claim licensed backflow testing or engineering capabilities.

---

### PAGE 3 — RESIDENTIAL IRRIGATION

Route: `/residential`

Develop a full landing page dedicated to homeowners.

Cover:
- New home irrigation installations
- Existing sprinkler repairs
- Controller upgrades
- Spring irrigation activation
- Winterization and freeze protection
- Seasonal performance checks
- Garden and planting-bed irrigation
- Troubleshooting leaks and uneven watering

Emphasize convenience, lawn health, property protection, and ongoing relationships.

Include a residential service inquiry form.

---

### PAGE 4 — COMMERCIAL IRRIGATION

Route: `/commercial`

Create a professional business-to-business page targeting:

- Commercial property owners
- Property managers
- Condominiums and HOA communities
- Apartment complexes
- Retail and office properties
- General contractors
- Landscape management companies

Present irrigation installation, troubleshooting, routine maintenance, seasonal preparation, and system management solutions.

Use original content.

Include a commercial quote form collecting property type, location, project needs, and preferred contact method.

Do not claim past commercial projects unless documented.

---

### ADDITIONAL REQUIRED PAGE — LANDSCAPING

Route: `/landscaping`

The authentic user-supplied videos clearly show decorative landscaping, garden beds, rock borders, yard/site preparation, and a rooftop green surface. **Build a dedicated, complete Landscaping page**, not only an irrigation-focused site, while allowing the owner to confirm the actual list of landscaping services sold.

- Hero and introduction: introduce GreenMan's landscaping capabilities in owner-approved language.
- Hero supporting visuals: `GM_05_stone-and-plant-border.webp`, `GM_05_landscape-rock-garden.webp`.
- Gallery cards: `GM_03_landscape-garden-beds.webp`, `GM_05_finished-property-landscape.webp`, `GM_06_residential-yard-preparation.webp`, `GM_07_new-home-ground-prep.webp`.
- Provide editable sections for **landscape preparation**, **planting-bed and decorative-stone work**, **lawn and landscape enhancements**, and **special projects**, but do not claim those are guaranteed services until the owner confirms.
- Show `GM_05_rooftop-green-surface.webp` in a visual portfolio context only, rather than claiming an approved commercial green-roof installation service.
- Explain that irrigation and landscaping can be coordinated as complementary projects, without inventing bundle prices or guarantees.
- Include a gallery teaser and quote-request CTA.
- Provide `/landscaping` in desktop and mobile navigation, homepage cards, internal linking and sitemap.
- Add service-specific subpages only after the actual supported services are confirmed.

---

### PAGE 5 — SEASONAL MAINTENANCE

Route: `/maintenance-plans`

Create a dedicated landing page describing ongoing care.

Model the page organization on Conserva's maintenance-package experience.

Build two editable service-plan concepts:

**Seasonal Essentials**
- Spring system start-up
- Fall winterization
- Basic system condition review

**Complete Season Care**
- Spring system start-up
- Fall winterization
- Mid-season system check
- Controller scheduling adjustments
- Maintenance recommendations

These are suggested packages, not confirmed existing GreenMan offers.

Display them as configurable concepts pending owner approval. Do not publish prices, discounts, or inclusions as guaranteed until verified.

Allow customers to inquire about a plan.

---

### PAGE 6 — ABOUT GREENMAN

Route: `/about`

Create a dedicated family-owned business story page.

Emphasize:
- Local business identity
- Family ownership
- Hands-on craftsmanship
- Customer relationships
- Quality work
- Responsible irrigation practices

Build sections for:
- Company introduction
- Family-owned values
- Team photography
- Why customers choose GreenMan
- Customer commitment
- Request Estimate CTA

Use editable placeholders for owner names, founding date, family history, and team profiles.

Do not invent a company founding story.

---

### PAGE 7 — OUR WORK / PROJECT GALLERY

Route: `/gallery`

Build a modern portfolio showcasing completed GreenMan jobs.

Gallery filter categories based on actual asset metadata:
- All Work
- Irrigation
- Landscaping
- Site Preparation
- Operations

Potential additional **confirmed-project** categories may be introduced later (New Installations, Sprinkler Repairs, Residential, Commercial, Seasonal Maintenance), but do not categorize any existing photo as proven repair/winterization/commercial/finished installation without evidence.

Include:
- Grid and masonry-style presentation where appropriate
- Image lightbox
- Previous/next image controls
- Category filters
- Mobile-friendly image viewing
- Project details when available
- Before-and-after comparison support

Use the 22 supplied GreenMan-associated video stills from `GreenMan_Website_Assets/` right now, subject to owner sign-off on publication. Each item must display via its actual local filename. Load descriptions, category, source filename and timestamps from `asset_manifest.csv` into maintainable gallery data.

If additional Facebook or TikTok photographs are accessible and their usage authorized, allow them to be imported into the project asset library. Do not automatically copy third-party images. Do not label unrelated frames as before/after pairs.

---

### PAGE 8 — REVIEWS

Route: `/reviews`

Design a professional review section with approved customer feedback.

Include links to GreenMan's genuine review profiles if their URLs can be verified.

No invented customers, star ratings, review dates, or quotations.

---

### PAGE 9 — FAQ

Route: `/faq`

Build a searchable or accordion-based FAQ area.

Include original answers to common questions:

- How do I know if my sprinkler system needs repairs?
- Why does one part of my lawn receive more water than another?
- When should I turn on my sprinkler system in Massachusetts?
- When should irrigation systems be winterized?
- What happens if I don't winterize my system?
- Can an existing sprinkler system be upgraded?
- What are smart irrigation controllers?
- How often should my irrigation system be inspected?
- What happens during an irrigation installation?
- How do I request a GreenMan service appointment?

Tailor seasonal guidance to northeastern Massachusetts.

Avoid making absolute claims about pricing, timing, or local legal requirements.

---

### PAGE 10 — SERVICE AREAS

Route: `/service-areas`

Focus local search visibility on Lynn, Massachusetts.

The wider service area must be confirmed with the owner before publishing town-specific claims.

Build the architecture to support surrounding communities and future location-specific pages.

Do not invent additional business offices or a national franchise network.

If service-area coverage is confirmed, support localized pages such as `/service-areas/[city]`.

Each city page must provide genuinely useful localized information rather than duplicate generic SEO text.

---

### PAGE 11 — CONTACT AND REQUEST ESTIMATE

Route: `/contact`

This is one of the most important pages.

Create an excellent quote-request experience.

Collect:

- Full name
- Phone number
- Email address
- Service address or ZIP code
- Residential or commercial property
- Service requested
- Description of the issue or project
- Preferred contact method
- Optional preferred appointment date
- Optional photographs, if secure upload storage is configured

Services offered in the dropdown should include all confirmed offerings.

Include client-side and server-side validation.

Provide an explicit privacy notice and consent checkbox where appropriate.

Implement:
- Working backend form submission
- Secure email notification to an owner-configured business email
- Spam and bot protection
- Rate limiting
- Clear success and error states
- Mobile input optimization
- Click-to-call alternative

Store secrets and email API credentials in environment variables.

Do not display a success message if the request has not actually been delivered.

The publicly listed business number is (978) 798-5474, subject to owner confirmation.

---

## PHASE 5 — IMPORTANT WEBSITE FUNCTIONALITY

All website controls must actually work.

Implement:

1. Responsive navigation and dropdowns
2. Mobile hamburger menu
3. Clickable phone numbers
4. Working internal links and routes
5. Functional inquiry forms
6. Form submission validation
7. Service selection
8. Project photo gallery and lightbox
9. Testimonial carousel where appropriate
10. Interactive FAQ accordions
11. Sticky or floating mobile contact CTA
12. Smooth and accessible page transitions
13. Loading, success, and failure states
14. Accessible keyboard navigation
15. Facebook external link
16. Custom 404 page

Avoid decorative controls that do nothing.

For scheduling, use an actual configured scheduling service or a service-request form. Do not display fictitious available appointments.

---

## PHASE 6 — DESIGN AND RESPONSIVENESS

The website should look polished at:

- 1440px desktop
- 1024px tablet landscape
- 768px tablet
- 390px mobile
- 360px smaller mobile devices

Prioritize:
- Carefully composed original GreenMan portrait imagery (512×910); reserve landscape-wide hero slots for higher-resolution owner assets
- Strong visual hierarchy
- Consistent section widths
- Visually striking headlines
- Balanced green-and-white branding
- Professional service-card design
- Consistent CTA colors
- Subtle motion and hover states
- Excellent readability
- Sufficient color contrast
- Touch-friendly mobile controls

Use modern spacing and proportions.

Do not build a plain Bootstrap-style business template.

Visually compare the finished GreenMan homepage against the Conserva reference to ensure comparable design quality, section density, and overall professionalism.

---

## PHASE 7 — TECHNOLOGY STACK

First inspect the existing repository.

If a working framework or codebase exists, use it and preserve relevant infrastructure.

If starting from scratch, preferred stack:

- Next.js with App Router
- TypeScript
- Tailwind CSS
- Reusable React components
- Lucide icons
- Next.js Image optimization
- Server-side API for service requests
- Resend or equivalent email delivery integration
- Zod for validation
- Accessible UI components

Use a maintainable project architecture.

Create reusable components such as:

- Header
- Footer
- Hero
- Button
- ServiceCard
- SectionHeading
- TestimonialCard
- ContactForm
- CTASection
- FAQAccordion
- ProjectGallery
- AuthenticPhotoMosaic
- PhotoAssetCard
- GalleryFilter
- MaintenancePackageCard
- ServicePageLayout

Keep navigation, contact information, service lists, brand colors, business details, and the 22-image asset manifest in centralized configuration. Expose publishability/approval status on each image and unverified service.

Create an easy way for the owners to update photographs, services, and site copy without changing dozens of files.

A lightweight CMS is optional if compatible with the repository and deployment environment.

---

## PHASE 8 — SEARCH ENGINE OPTIMIZATION

Optimize for irrigation service searches near Lynn, Massachusetts.

Target appropriate phrases including:

- Irrigation services Lynn MA
- Sprinkler repair Lynn MA
- Irrigation installation Lynn MA
- Sprinkler winterization Lynn MA
- Lawn sprinkler repair North Shore MA
- Residential irrigation Massachusetts
- Commercial irrigation services Massachusetts

Implement:

- Unique page titles and meta descriptions
- Proper heading hierarchy
- Canonical URLs
- Sitemap.xml
- Robots.txt
- Open Graph metadata
- Optimized image alt text
- Descriptive URLs
- Internal linking
- LocalBusiness structured data with verified details
- Service structured data where applicable
- Fast-loading mobile pages
- Optimized images
- Clear content relevance and user intent

Do not create doorway pages or falsely suggest that GreenMan has an office in every target town.

---

## PHASE 9 — PERFORMANCE AND SECURITY

The site must be production ready.

Implement:

- Lazy-loaded imagery
- WebP/AVIF where appropriate
- Font optimization
- Minimal unnecessary JavaScript
- Semantic HTML
- Accessible forms
- Keyboard navigation
- Responsive images
- Secure server-side input validation
- Rate-limited forms
- Secret management using environment variables
- Protection against spam submissions
- Appropriate security headers
- Reasonable error handling

Aim for strong Lighthouse scores in performance, accessibility, SEO, and best practices, especially on mobile.

Do not sacrifice design quality for superficial benchmark scores.

---

## PHASE 10 — TESTING AND QUALITY ASSURANCE

Before declaring the website complete:

1. Run the application successfully.
2. Check every navigation link.
3. Confirm every page renders correctly.
4. Verify desktop and mobile layouts.
5. Test all dropdown menus.
6. Test working image galleries.
7. Validate form inputs.
8. Test form success and error handling.
9. Confirm no broken images.
10. Confirm no placeholder lorem ipsum.
11. Check the site for references to Conserva.
12. Remove all unintended references to other irrigation businesses.
13. Confirm metadata and page titles reflect GreenMan.
14. Verify accessibility basics.
15. Run build and lint/type checks.
16. Confirm real contact details before deployment.
17. Review screenshots for layout defects, clipped text, and horizontal overflow.
18. Programmatically verify that all 22 `.webp` image paths exist and are reachable.
19. Verify the new `/landscaping` route on desktop and mobile.
20. Verify responsive hero photo mosaic and actual footage placement.
21. Verify gallery filter counts, lightbox accessibility, captions and alt text.
22. Confirm that no stock images replaced a matching authentic source frame.
23. Document any photos excluded from production pending permission review.

All pages should be substantial, polished, and interconnected.

---

## PHASE 11 — DEPLOYMENT

Prepare the completed site for deployment to:

https://greenmanirrigationinc.com/

Do not assume access to GreenMan's domain registrar, DNS records, or hosting.

Provide a deployment guide for the existing repository and hosting environment.

Include DNS configuration instructions appropriate to the chosen host, HTTPS setup, environment variables, and any email-service verification requirements.

Do not change live DNS or publish the website without explicit authorization.

---

## FINAL DELIVERABLES

Deliver:

1. A complete multi-page GreenMan website implemented in the repository.
2. Original, consistent GreenMan branding.
3. Every relevant service page.
4. Working navigation and responsive layout.
5. Functional service request system.
6. Editable project photo gallery built from all 22 authentic provided stills, subject to permissions, with category filters and working lightbox.
7. Separate Landscaping page and navigation, illustrated by the user-provided landscape scenes.
8. About, Reviews, FAQ, and Contact pages.
9. Search-engine-friendly metadata.
10. Mobile optimization.
11. README with setup and deployment instructions.
12. `.env.example` for required configuration.
13. List of business information requiring owner verification.
14. Final route and feature checklist.
15. Screenshots of desktop and mobile implementations, if tools permit.

## NONNEGOTIABLE PROJECT RULES

- Do not build only a homepage.
- Do not produce an unfinished visual mockup.
- Do not leave dead buttons or broken navigation.
- Do not invent business credentials, customer reviews, or quantitative claims.
- Do not use Conserva logos, copyrighted photography, or proprietary copy.
- Do not present GreenMan as a Conserva franchise.
- Do not substitute unrelated stock imagery for actual GreenMan-associated jobsite work when authentic assets match the topic.
- Do not omit the 22 authentic image stills simply because they are not yet in the repository: request that the provided ZIP be extracted first.
- Do not misrepresent video stills as verified completed projects, and do not claim permission without owner approval.
- Do not use a lookalike Marvel/Hulk graphic as GreenMan branding without rights clearance.
- Do not pretend Facebook content was reviewed if access was blocked.
- Do not claim that contact forms work without actual integration testing.
- Do not mark unverified services or special offers as approved.
- Do not deploy without owner approval.

## EXECUTION INSTRUCTIONS

First, inspect the repository and confirm the extracted `GreenMan_Website_Assets/` directory exists. Read its manifest, and then research the provided reference websites.

Then create an implementation plan, organize components, and begin building the entire application.

Work iteratively through the full website, not merely the first screen.

After implementation, run tests, correct errors, and report completed pages, working features, known limitations, which of the 22 images are used on each route, any excluded images, and the exact information needed from GreenMan's owner.

**THE FINAL OBJECTIVE:**

Create a website that delivers the professionalism, comprehensive service presentation, design quality, and ease of requesting service demonstrated by Conserva Irrigation, while giving GreenMan Irrigation, Inc. its own authentic identity as a family-owned Massachusetts irrigation business.

The finished experience should make customers confident enough to contact GreenMan for their next irrigation installation, repair, or maintenance project.

---

## EXECUTION CHECKLIST FOR IMAGE INTEGRATION — REQUIRED REPORT FORMAT

At the end of the implementation, produce a concise report with:

1. **Asset verification:** count of image files found (expect 22 WebP, 22 JPG), copied, and loaded successfully.
2. **Placement log:** each page/section mapped to exact local filenames, including homepage hero/mosaic, Irrigation, Landscaping, Gallery, and About.
3. **Gallery behavior:** actual filter categories, results per filter and lightbox testing status.
4. **Publication status:** approvals outstanding for image usage, any watermark concerns, and services the owner must confirm.
5. **Quality assurance:** build status, routes checked, broken images, mobile breakpoints, form-delivery status, and deployment readiness.
6. **Remaining inputs requested from owner:** an original approved logo, original high-resolution landscape photos, verified contact channels, verified service area, exact service list, genuine testimonials, approvals to publish user-supplied footage, and real project captions.

**Do not mark this task complete if the asset files are absent or only described in a prompt. The images must be present in the Codex workspace and actually rendered on website pages in the working application.**
