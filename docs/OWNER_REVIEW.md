# GreenMan owner review before publication

The website is implemented for private local review. Its source documents include proposed services and provisional business facts; those statements are not independent verification. The user-authorized draft source and supplied asset files are available on the public `greenman-website-draft` GitHub branch for direct Codespaces transfer. Website deployment, domain changes, and approval of the final public website remain pending.

## Information and approvals required

| Item | Current state | Owner input needed |
|---|---|---|
| Business name and identity | GreenMan Irrigation, Inc.; family-owned; based in Lynn, Massachusetts, from the supplied brief and repository description | Confirm spelling, capitalization, business identity, and location wording. |
| Logo | Original GreenMan leaf/irrigation wordmark created for this implementation | Approve the original mark or provide the official logo and permission to use it. A Hulk/Marvel-like mascot was not reproduced. |
| Phone | `(978) 798-5474`, marked unapproved | Confirm that this is the current business number and approve public display and click-to-call use. |
| Street address | `181 Henry Ave, Lynn, MA 01902`, marked unapproved | Confirm the address and whether it is appropriate to publish. No map or additional office claim is inferred. |
| Business email | `luismeono@yahoo.com`, marked unapproved and not displayed as an approved contact inbox | Confirm the actual contact/notification inbox and whether a public email link is wanted. Enter delivery credentials securely in host/environment settings, not in source files or chat. |
| Facebook and TikTok | Exact URLs supplied by the brief; destination ownership has not been independently verified | Confirm ownership, current URLs, and permission to display social links. |
| WhatsApp / Messenger | No guessed destination link is implemented | Provide verified destination URLs if these channels should be added. A phone number alone is not treated as a verified WhatsApp URL. |
| Service area | Lynn is the business location; surrounding-town coverage is not approved | Confirm communities served, any travel limitations, and service availability before town-specific claims or pages are added. |
| Irrigation service scope | All 11 service entries are `approval: 'pending'` | Confirm installation, repairs, drip irrigation, spring startup, mid-season inspections, winterization, smart controls, system inspections, and maintenance scope before promotion. |
| Drainage solutions | Specialty service, pending approval; image-neutral | Confirm supported scope, required design/engineering involvement, permits, discharge responsibilities, and actual availability. No engineering credential is claimed. |
| Backflow testing | Specialty service, pending approval; image-neutral | Confirm applicable tester credentials, jurisdictions/device types supported, reporting responsibilities, and availability. No certification or license has been invented. |
| Commercial services | Inquiry page prepared; no commercial case study is asserted | Confirm supported property types, operational capacity, coordination needs, and any documented projects the owner wishes to publish. Residential stills do not establish commercial work. |
| Landscaping | Preparation, planting-bed/decorative-stone, lawn enhancement, and special-project discussion sections prepared | Confirm the actual landscaping services sold. The rooftop frame is a visual scene, not a certified green-roof offering. |
| Maintenance plans | Seasonal Essentials and Complete Season Care are editable concepts, not approved offers | Confirm names, exact inclusions/exclusions, scheduling, terms, and any approved pricing. No prices, discounts, or guaranteed inclusions are invented. |
| Company story and team | No owner names, founding year, fabricated biography, or unapproved team profiles | Provide the approved company history, owner/team names, biographies, and authorized team portraits if desired. |
| Reviews | No fabricated customers, quotations, ratings, or review dates | Provide genuine reviews, source profile URLs, and permission to display each quotation and attribution. |
| Original footage images | All 22 website-publication flags remain pending; source files were shared on the public draft branch following the user’s transfer instruction | Confirm who owns the supplied footage, permissions from relevant creators, people/property rights where needed, and which exact frames can be published. Preserve original source marks. |
| Project captions | Accurate visible-scene captions from the supplied CSV | Provide confirmed locations, work scope, dates, and project credit only where supported and authorized. Source-video grouping is not a verified project identifier. |
| Before/after pairs | Supported by code; no active pairs | Supply approved photos showing the same site at established different dates with truthful captions and usage permission before enabling a comparison. |
| High-resolution originals | Current supplied frames are 512 × 910 portraits | Provide authorized higher-resolution originals, particularly landscape photos for any future wide hero. Current imagery is composed as portrait panels. |
| Form delivery | Secure delivery integration implemented; production account/sender/recipient approval still needed | Configure the chosen email delivery service, verified sender, recipient, and credentials; validate actual receipt in the owner's inbox before relying on the live form. |
| Privacy and retention | Editable privacy information accompanies inquiry consent | Confirm data handling, retention, who can access inquiries, delivery-provider details, and the published privacy wording. Secure photo uploads are omitted until a storage solution is configured. |
| Hosting and domain | Intended domain is `greenmanirrigationinc.com`; no registrar/hosting access assumed | Select hosting, approve a deployment, verify domain ownership, configure DNS/HTTPS and secure environment variables, then run the public-mode checks before launch. |

## Editable approval locations

- `src/data/business.ts` controls contact facts, social verification, service areas, team/reviews, approved before/after pairs, and maintenance-plan approval.
- `src/data/services.ts` controls service descriptions, image context, individual approval state, and specialty status.
- `src/data/greenmanGallery.ts` controls each original filename, descriptive caption, provenance, placement, and `publicationStatus`.
- `.env.example` describes runtime configuration; real credentials belong only in local ignored settings or the hosting/environment secret store.

Set approval flags only after verification. Public mode hides unapproved photos and pending service-detail pages rather than treating a completed code implementation as business approval. Approve the exact scope and facts before changing those flags. Default review-mode `noindex` is an indexing instruction, not access protection; any future shared review environment should use the host's access controls.

## Research and attachment limits

Both uploaded files were accessible: `GreenMan_Codex_Master_Prompt_Updated.md` and `GreenMan_Codex_Complete_Package.zip`. The ZIP contains the asset README, CSV, integration instructions, two contact sheets, 22 WebP stills, 22 JPEG originals, and the prompt/start instructions. It contains **no original video files and no Facebook screenshot**. The eight video filenames recorded in the manifest describe source provenance only.

Conserva, Facebook, and TikTok requests failed at the environment's HTTPS proxy with CONNECT 403 responses. This is a specific outbound research restriction; it does not establish a failed terminal environment, a website login requirement, or unavailable supplied local media. Live pages were not reviewed. See `REFERENCE_AUDIT.md` for exact requested URLs and observed results.

Any Facebook-screenshot facts mentioned in the supplied brief remain provisional because that screenshot was not uploaded or independently visible. No founding date, customer count, rating, licensing/insurance claim, guarantee, price, water-savings percentage, partnership, or franchise relationship is invented.

## Publication decision

The implementation and local validation do not authorize deployment. Local build and browser checks pass as recorded in `QA_REPORT.md`; real email delivery and owner approvals remain outstanding. Review the page-by-page image log in `IMAGE_PLACEMENT_REPORT.md`, approve the required facts/media/services, complete production configuration, and explicitly approve deployment before any public launch or DNS changes.
