# Aya Core Studios: Remaining Brief Work

Continue work in `C:\Aya Core` against `Aya Core Studios — Engineering & Content Brief.md`.
Do not undo existing changes. Preserve the dark black/chrome/magenta identity, Playfair headlines, mono labels, and orbit motif. Make small focused edits and validate each slice with `npm run build` plus browser checks at 1440px and 390px.

## Already completed and verified

- Hero positioning and requested hero copy are implemented.
- Navigation uses Work / About / Services / Contact.
- Availability line is centralized in `src/config/availability.ts`.
- Monetary project value/rate fields were removed.
- Case studies have precise `role` and `outcome` fields.
- Invalid `/work/<unknown-slug>` routes to the real 404.
- Skip link exists.
- Canonical host is `https://ayacorestudios.netlify.app` in `index.html`, `public/sitemap.xml`, and `public/robots.txt`.
- External retired-domain instructions are in `audits/DOMAIN-MIGRATION.md`.
- Route 56 disclosure is visible on Work and About.
- Four named GitHub source links are present in case studies.
- Project-specific OG/Twitter images are set by `DocumentTitle` in `src/App.tsx`.
- Project card nested-interactive structure was refactored, although `ProjectCard` is currently unused.
- Orbit now pauses with `IntersectionObserver`, pauses on `visibilitychange`, and uses a static frame for reduced motion.
- Below-fold images use `decoding="async"`; existing stable aspect-ratio containers remain in place.
- Digital Break was removed from the main reel and now has a separate Work section and technical detail layout.
- Latest `npm run build` passes.
- Duplicate logo payload removed: `aya-core-logo.png` was byte-identical to the shared symbol and is no longer shipped.

## Finish these items

1. **Baseline and final audits**
   - Run Lighthouse mobile against the deployed canonical URL and save `audits/lighthouse-before.json` only if a genuine before run can still be established; otherwise document that it is unavailable.
   - Run axe against `/`, `/work`, and one case study; save before/after JSON in `audits/`.
   - Record bundle Brotli/gzip size and total `public/brand/*` weight.
   - Write `audits/REPORT.md` with task statuses, test evidence, blockers, and every TODO(unako).
   - Do not invent scores or claim checks that were not run.

2. **Image dimensions**
   - Complete the image audit. Add exact `width` and `height` only after verifying dimensions, or add explicit CSS aspect ratios where intrinsic dimensions are unavailable.
   - Include logos, About images, project screenshots, gallery images, and lightbox images.

4. **Accessibility**
   - Run axe and fix remaining WCAG issues, especially contrast tokens and any icon-only controls.
   - Introduce a separate accessible accent-text token if needed; preserve the vivid accent for decorative borders/fills.
   - Verify keyboard focus through skip link, nav, hero CTAs, work controls, case-study gallery/lightbox, and footer.
   - Verify reduced motion leaves all content visible.

5. **Content accuracy follow-ups**
   - Remove or revise any remaining unsupported phrases such as `lead digital architect`, `shipped: 5 platforms (only professionally)`, or fixed service claims after checking the current About and Services copy against the brief.
   - Keep outcome placeholders until Unako supplies real outcomes; do not invent them.
   - Add empty testimonial slots only when populated, with the requested attribution prompt documented in source/audit notes rather than rendered as visitor copy.
   - Confirm the Route 56 founder credit and age wording before publishing; existing reminders are in `audits/DOMAIN-MIGRATION.md`.
   - Decide whether `Chris-Hani-District-Tourism` shipped; if not, document the in-progress GitHub status TODO.

6. **Domain and deployment**
   - Apply the 301 redirects from both retired Netlify deployments in their dashboards or deployed `_redirects` files. This workspace cannot access those external deployments.
   - Verify all live URLs and canonical metadata from the deployed site, not only localhost.

7. **Performance details**
   - Replace the deprecated `THREE.Clock` usage if it is produced by the project code or dependency path; do not change unrelated dependency internals.
   - Confirm the orbit does not mount on non-orbit routes, and inspect the production chunks to ensure Three.js stays route-lazy.
   - Consider self-hosting/subsetting fonts only if the available assets and build setup support it without inventing font files.

## Required final verification

- `npm run build` passes.
- Lighthouse and axe reports are saved or explicitly marked blocked.
- No monetary claims, `engineered for scale`, or old domains appear in source or rendered output.
- `/work` has four main reel projects plus the separate Digital Break section.
- Mistyped `/work/<slug>` shows the 404.
- Case studies show accurate role, outcome placeholder, live link, and source link where available.
- Test at 1440px and 390px for horizontal overflow, clipped text, blank gaps, and broken images.
- Report every unverified external action plainly; do not call blocked tasks complete.
