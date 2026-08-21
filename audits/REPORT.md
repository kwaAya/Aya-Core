# Aya Core Studios Brief Report

Date: 2026-08-21

## Verification summary

- `npm run build`: PASS.
- Local browser checks: PASS for `/`, `/work`, `/about`, `/404`, `/work/ngejane-dental`, and `/work/digital-break` after hydration.
- Source audit: PASS for absence of old Netlify domains, `est. project value`, and `engineered for scale` in `src/`, `index.html`, and `public/`.
- Lighthouse before/after: BLOCKED. No deployed-site Lighthouse run was available in this workspace, so no scores are claimed.
- axe before/after: BLOCKED. No axe runner was available in this workspace, so no scores are claimed.

## Task status

| Brief area | Status | Evidence or blocker |
|---|---|---|
| Hero positioning and copy | Done | `src/pages/Home.tsx`; browser checked |
| Plain-language navigation | Done | `src/components/Nav.tsx`, `Footer.tsx` |
| Canonical metadata | Partial | Head, sitemap, and robots corrected; build-time sitemap generation remains |
| Retired-domain redirects | Blocked | Instructions written in `DOMAIN-MIGRATION.md`; Netlify dashboard access unavailable |
| Monetary project claims | Done | Removed from project data and detail rendering; source audit clean |
| Accurate project roles | Done | Added to all five project records and rendered in case studies |
| Outcome sections | Partial | Structure and explicit TODO placeholders added; real outcomes still needed |
| Testimonials | Partial | Data shape supports populated testimonials; no testimonials supplied yet |
| Project source links | Done | Four named repositories linked |
| Digital Break separation | Done | Separate Work section and technical detail route; browser checked |
| Invalid project slug 404 | Done | Explicit `/404` route; browser checked |
| Skip link and motion lifecycle | Done | Skip link, orbit observer, visibility pause, reduced-motion static frame |
| Image loading | Partial | Async decoding added; full intrinsic-dimension audit remains. Duplicate logo removed, saving 291KB |
| Accessibility audit | Partial | Nested interactive card fixed; axe and contrast verification remain blocked |
| Services/About accuracy | Done | Unsupported role, professional, timeline, downtime, and retainer wording tightened |
| Lighthouse/axe reports | Blocked | Tooling/deployed baseline unavailable |
| Final external verification | Blocked | External redirects, live URL status, and profile edits require access outside this workspace |

## TODO(unako) follow-ups

- Update the availability quarter before Q4 becomes stale.
- Confirm Route 56 relationship wording before publishing.
- Confirm Nkosi Mtumtum's preferred name and credit before publishing the Route 56 case study.
- Add one-line GitHub descriptions to the four linked repositories.
- Confirm whether fixed service timelines or an advisory arrangement should be published.
- Supply one concrete outcome for each project.
- Request two sentences from Nkosi Mtumtum confirming scope of work, attributed with full name and title.
- Decide whether `Chris-Hani-District-Tourism` shipped; otherwise mark the repository in progress.
- Update GitHub and LinkedIn profile links away from the retired domain.

## Remaining engineering work

- Complete exact image dimensions or verified CSS aspect-ratio coverage for every image.
- Generate the sitemap from the route table at build time.
- Run and save Lighthouse and axe before/after reports when the required tools and deployed URL are available.
