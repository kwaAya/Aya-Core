# Aya Core Studios — Engineering & Content Brief

**Target repo/site:** `https://ayacorestudios.netlify.app/` (React + Vite SPA, Three.js, Playfair Display / Poppins / Inter / Fira Code)
**Role you are playing:** senior front-end engineer + content editor. You have full permission to edit markup, styles, copy, assets, and config.
**Non-negotiable constraints:**
- Do NOT redesign the visual identity. The dark palette, magenta accent, Playfair headline face, mono chips, and orbit motif stay. Every change below is surgical.
- Do NOT invent facts, metrics, testimonials, client names, or numbers. Where copy needs a real number I don't have, insert a clearly marked `TODO(unako): …` placeholder and list it in your final report. Never ship a fabricated statistic.
- Work in small, reviewable commits, one per numbered task below, using the task title as the commit message.
- After each phase, run the site locally and confirm nothing regressed visually at 1440px and 390px widths.

---

## Phase 0 — Establish a baseline (do this first)

1. Run Lighthouse (mobile preset) against the deployed URL and save the JSON report to `/audits/lighthouse-before.json`. Record the four category scores in your final report.
2. Run `axe-core` against the rendered homepage, `/work`, and one case-study page. Save results to `/audits/axe-before.json`.
3. Report the current gzipped/brotli size of the main JS bundle and the total weight of `/public/brand/*`.

Do not skip this. Every claim you make at the end must be a before/after comparison against these files.

---

## Phase 1 — Critical: the site is fragmented across three domains

This is the highest-priority work. Three deployments are live at once and the metadata all points at the wrong one.

4. **Fix canonical and social metadata in `index.html`.** Every one of these currently hardcodes the OLD domain `ayacore.netlify.app`:
   - `<link rel="canonical">` → must be the chosen canonical domain
   - `og:url`, `og:image`, `twitter:image`
   As written, you are telling Google that the old deployment is the authoritative version of every page, which suppresses the new one in search. Replace all of them.
   Better: read the base URL from a single constant (e.g. `VITE_SITE_URL` in `.env`, defaulting to the production domain) and inject it, so this can never drift again.
5. **Fix `sitemap.xml`.** All 10 `<loc>` entries point to `https://ayacore.netlify.app/...`. Rewrite them to the canonical domain. Generate the sitemap at build time from the router's route table rather than maintaining it by hand — a hand-maintained sitemap is what caused this.
6. **Confirm `robots.txt`** references the corrected sitemap URL.
7. **Set up redirects.** Add a `_redirects` file (or `netlify.toml`) on the two retired deployments so `ayacore.netlify.app/*` and `ayacreativestudios.netlify.app/*` issue a **301** to the same path on the canonical domain. `ayacreativestudios.netlify.app` currently serves a ~600-byte blank page with an unbuilt Vite dev entry point — it must not stay live in that state. If you cannot access those Netlify sites, write the exact files and steps into `/audits/DOMAIN-MIGRATION.md` for Unako to apply manually, and say so in your report.
8. **Add a `TODO(unako)` note** in `/audits/DOMAIN-MIGRATION.md` covering the off-repo fixes only he can do: update the website/blog field on the GitHub profile (`kwaAya`) and the LinkedIn profile link, both of which currently point at the dead `ayacreativestudios.netlify.app`.

---

## Phase 2 — Performance

Current bundle is already improved (~182 KB brotli, down from ~390 KB). Images are now the problem.

9. **Kill the 291 KB logo.** `/brand/aya-core-logo.png` and `/brand/aya-core-symbol.png` are both 512×512 PNGs at 291,296 bytes each — byte-identical, so you are shipping the same quarter-megabyte file twice. It renders at 64px in the header and ~62px in the footer.
   - Produce an inline SVG for the mark if the geometry allows it (preferred — infinitely scalable, ~2 KB).
   - Otherwise export `aya-core-symbol` at 128×128 as WebP with a PNG fallback via `<picture>`, and dedupe so one asset serves both header and footer.
   - Target: under 15 KB combined.
10. **Add explicit `width` and `height`** (or a CSS `aspect-ratio`) to every `<img>`. CLS is currently 0 but there is nothing preventing regression.
11. **Lazy-load below-the-fold images** with `loading="lazy"` and `decoding="async"` — specifically the project card thumbnails and case-study screenshots. The hero/logo must stay eager.
12. **Audit the Three.js orbit animation.** Confirm it: (a) only mounts on routes that display it, (b) pauses via `IntersectionObserver` when scrolled out of view, (c) pauses on `document.visibilitychange` when the tab is backgrounded, and (d) respects `prefers-reduced-motion: reduce` by rendering a single static frame. A `requestAnimationFrame` loop running forever on every route is the main-thread cost behind the poor Total Blocking Time.
13. **Code-split per route.** Wrap each route component in `React.lazy` + `Suspense` with a lightweight skeleton, and move Three.js into its own dynamically imported chunk so `/about` and `/contact` never download the WebGL code.
14. **Self-host the fonts.** Four Google Font families (Playfair Display, Poppins, Inter, Fira Code) are loaded from a render-blocking `<link>`. Subset to the weights actually used, self-host as `woff2`, and add `font-display: swap`. Drop any family that appears fewer than three times in the CSS.

---

## Phase 3 — Accessibility (fix all of these to WCAG AA)

15. **Contrast failures** — five elements fail. Fix by adjusting the token values, not by removing the elements:
   - Background "CORE" watermark: `#4c1336` on `#131316` = 1.28:1. Either raise it to at least 3:1 or mark it `aria-hidden="true"` and treat it as pure decoration — see also task 22, which changes it anyway.
   - Eyebrow / label text: `#c60e77` on black = 3.73:1, needs 4.5:1. Lighten the magenta for text use; keep the original hex for borders and fills where contrast rules don't apply. Introduce a separate `--accent-text` token so you don't dull the brand accent everywhere.
   - Small meta text (project counters, timestamps): `#737373` on black = 4.42:1, marginally failing. Move to roughly `#8a8a8a` or above.
16. **`nested-interactive` violation.** Each home-page project flip-card is a `<button>` containing another focusable element (the details link). Refactor to a single interactive element per card, or use a non-interactive container with one `<button>` for the flip and one `<a>` as siblings. Preserve the existing flip behaviour and the `aria-label="Flip card to show details for …"` pattern, which is good.
17. **Unlabeled GitHub icon.** The footer GitHub SVG has no accessible name — no `aria-label`, no `<title>`. The Instagram icon does it correctly; copy that pattern. Then sweep every icon-only control site-wide for the same gap.
18. **Verify the flip-card interaction is keyboard-operable**, announces its state (`aria-pressed` or `aria-expanded`), and that flipping does not trap focus.
19. **Add a "Skip to content" link** as the first focusable element, visually hidden until focused.
20. **Honour `prefers-reduced-motion` globally** — scroll reveals, the orbit, and any parallax should degrade to static content, not to invisible content. Test this: with reduced motion on, no section may remain hidden.

---

## Phase 4 — UI/UX fixes (specific, observed issues)

21. **Rename the nav back to plain language.** "Shipped / Behind the Core / Build With Me" is charming but costs scannability — a recruiter with 20 seconds cannot tell which one is the About page. Use `Work / About / Services / Contact` as the labels, and keep the personality in the section headings on those pages instead. The mono `$ let's talk` CTA can stay; it reads clearly.
22. **Resolve the hero collision.** The giant "CORE" watermark currently overlaps the headline, and "Built for" sits directly on top of the letterforms. Either move the watermark fully clear of the text column, drop its opacity so it never competes at any breakpoint, or scale it down. Legibility of the headline wins over the effect.
23. **Fix the headline spacing.** The `<h1>` renders with visibly uneven word gaps ("Built␠␠for") and breaks across four lines with "scale." orphaned. Remove any `text-align: justify`, `word-spacing`, or letter-spacing hack on the h1; reduce the clamp maximum so it sets in two or three lines on desktop; and use non-breaking spaces or explicit `<br>` to control the break points so no line ends on a single short word.
24. **Fill or tighten the right half of the hero.** Roughly 50% of above-the-fold is near-empty — the orbit sphere renders as a very faint outline, so the space reads as empty rather than atmospheric. Either raise the orbit's visibility/scale so it earns the space, or narrow the hero to a single centred column.
25. **Add a scroll affordance** at the bottom of the hero (a small chevron, a "the core, in three movements" label, or a peeking section edge). The hero fills the entire viewport with no cue that more exists.
26. **Fix the large blank vertical gaps** between scroll-triggered sections on `/`, `/work`, and every case-study page. Sections are reserving far more vertical space than their visible content, which reads as a broken page to anyone scrolling fast. Have reveal animations animate opacity/transform without inflating layout height.
27. **Promote the availability line into the hero.** "Currently booking Q4 builds — one rescue-and-rebuild slot and one platform build left this quarter" is the strongest trust and urgency signal on the entire site and it is buried on `/contact`. Render it as a small pill directly beneath the hero CTAs. Drive it from a single config constant (`src/config/availability.ts`) so it can be updated in one place — and add a `TODO(unako)` reminder that a stale quarter reference is worse than none.
28. **Fix the soft-404.** A mistyped project slug (e.g. `/work/digital-break-v2-1` instead of `/work/digital-break`) currently renders the `/work` list page with HTTP 200 and the wrong title. Add an explicit catch-all inside `/work/:slug` that renders the real 404 ("LOST IN ORBIT") when the slug matches no project, and add a prerendered 404 status where the host supports it. Keep the existing 404 design — it is good.
29. **Add per-page `<title>` and meta description via a head manager** if not already dynamic, and give each case study its own `og:image` (the project screenshot) so a shared project link previews that project rather than the generic logo.

---

## Phase 5 — Content and positioning

**Read this before touching any copy.** The site currently presents five projects as paid freelance client work, including an "est. project value" figure in Rand on each. This is inaccurate and must be corrected. The true situation:

- **Route 56 Adventures** is a business registered in early 2026 by Unako's uncle. It is not an external client.
- **kokstadtourism.co.za** and **matatiele.co.za** — Unako built these. Primary work, his.
- **route56adventures.co.za** — his uncle built the bulk of it. Unako audited and patched it. He is NOT the author of this platform.
- **Ngejane Dental** — his uncle had started it; Unako largely rebuilt the front end and did substantial back-end work. The end client is a friend of the family, also listed in the Kokstad business directory.
- **Digital Break V2.1** — self-directed, no client.
- **Total revenue earned across all of it: zero.** He has never been paid for any of this work.

Every task in this phase serves accuracy first. Do not invent metrics, quotes, clients, or figures. Where a real number or quote is needed and unavailable, insert `TODO(unako): …` and list it in your final report.

30. **Remove every "est. project value" figure from all five case studies.** This is the highest-priority content task in the brief. Displaying R27,000–R67,500 next to live client-facing URLs on a site that also sells services implies these were paid engagements. They were not. Delete the field and its styling entirely.
   Optional replacement, only if Unako confirms the scope wording per project: a neutral `SCOPE` field stating what he actually did — e.g. `Built end to end`, `Front end rebuilt + back-end work`, `Audit & patch`. This preserves the visual rhythm of the template without making a financial claim. Add a `TODO(unako)` to confirm the scope wording for each of the five.

30a. **Create a proper share card.** `og:image` and `twitter:image` currently point at a 512×512 square logo while `twitter:card` is declared `summary_large_image`, which expects ~1200×630. Every share on X, LinkedIn, Slack, and iMessage currently renders as a small logo in a padded box. Produce a 1200×630 landscape card in the existing visual language: wordmark, the new headline from task 31, and the magenta-on-near-black palette. Do this after task 31 so the card and the hero say the same thing.
31. **Replace the hero copy.** Current copy sells a mood, and its "Engineered for scale" claim is unsupported by anything on the site. Ship exactly this:
   - Eyebrow: `FULL-STACK DEVELOPER · PHP · MYSQL · REACT · SOUTH AFRICA`
   - Headline: `Small towns deserve software that works.`
   - Sub-line: "I'm Unako 'Aya' Mtumtum, a self-taught developer in Bloemfontein. I build tourism directories, booking systems, and clinic platforms for Route 56 Adventures — a business serving real towns along the R56. Two platforms I built, one I rebuilt, one I audited. All four live in production."
   Notes for implementation: the headline carries a point of view rather than atmosphere, and the hard stack list in the eyebrow is load-bearing — it stops the headline reading as non-profit or charity work. The "two I built, one I rebuilt, one I audited" construction is deliberately precise about scope and must not be smoothed into a rounder claim like "four platforms built."
   Keep the two existing CTAs ("Explore the work" / "Let's collaborate") and the STRATEGY · UX SYSTEMS · PRODUCT DESIGN chips, but replace those chip labels with the actual stack or service areas, since "UX SYSTEMS" and "STRATEGY" overstate the current body of work.
   Record in your report, but do not ship, these two alternates: (a) headline "Built for communities. Shipped to production."; (b) headline "Production software for places the internet skipped."
32. **Add a `MY ROLE` section to the case-study template**, applied to all five projects, using this exact wording — it is accurate and pre-confirmed, so do not soften or embellish it:
   - Matatiele Online — "Built by me, end to end, for Route 56 Adventures."
   - Kokstad Tourism — "Built by me, end to end, for Route 56 Adventures."
   - Route 56 Adventures — "Not my build. Founded and largely built by Nkosi Mtumtum; I came in to audit the platform and patch what was breaking." (Add `TODO(unako)`: confirm his uncle's name and preferred credit before publishing.)
   - Ngejane Dental — "Started by Route 56 Adventures; I rebuilt the front end and did substantial back-end work, including the OTP flow, Yoco payment integration, and POPIA-shaped data modelling."
   - Digital Break V2.1 — "Self-directed. No client, no brief, no framework."
   Route 56 in particular must not read as his own build. Under-claiming here is the entire point: precise scope reads as senior, over-claiming reads as junior.
33. **Add a context line clarifying the Route 56 relationship**, placed once on `/work` and once on `/about` rather than repeated per project. Suggested wording, to be confirmed with `TODO(unako)`: "Most of this work was built with Route 56 Adventures, a South African tourism venture founded by my uncle in 2026. I'm the developer on it." Disclosing the family relationship plainly is the correct move — a reader who discovers it independently will discount everything else on the site, whereas a reader who is told upfront simply registers it as context.
34. **Add an `OUTCOME` section** to the case-study template with one concrete result per project. Insert `TODO(unako): outcome — e.g. accommodation listings live, monthly visits, bookings handled, search ranking for "[town] accommodation"` on each. Not one of the five currently states a result; this remains the largest credibility gap. Note in your report that a September 2026 tourism conference featuring Route 56 Adventures is upcoming, which may generate citable traction — leave the section structurally ready for it.
35. **Add a testimonial slot** to the case-study template, rendered only when populated, placed immediately after `OUTCOME`. Structure: quote, name, role, organisation. Leave all five empty with `TODO(unako): request two sentences from Nkosi Mtumtum (founder, Route 56 Adventures) confirming scope of work; attribute with full name and title, do not conceal the relationship.`
36. **Remove or replace "Engineered for scale" wherever it persists** outside the hero — including the meta description and `og:description`, which currently read "building platforms for communities, engineered for scale." Nothing on the site substantiates a scale claim: no traffic, load, uptime, concurrency, or listing counts. "16 towns, 765km" is geographic reach, not technical scale. Replace with a description matching the new hero positioning.
37. **Audit the `/services` page and the About page's terminology against reality.** Flag for Unako, do not unilaterally rewrite: `/services` advertises fixed engagement lengths and an availability slot count, and `/about` uses "lead digital architect" and "shipped: 5 platforms (only professionally)." Given zero revenue to date and the collaboration structure above, "professionally" and "lead digital architect" are both overstated. Propose replacement wording in your report — "developer" and "platforms shipped to production" are accurate and lose nothing.
38. **Link the source repo from each case study** where a public repo exists (`matatieletourism`, `Route-56-Adventures`, `Ngejane-Dental`, `Digital-Break-V2.1`). Free verifiability. Add a `TODO(unako)` to give each of those repos a one-line GitHub description — they currently all show none.
39. **Pull Digital Break V2.1 out of the case-study template entirely.** It is the only fully self-directed project on the site, and its actual strength — a canvas game loop built by hand with no engine or framework — currently reads as a weaker client project because it shares a template with commercial work and has no value figure. Give it its own layout: label it `SELF-DIRECTED · CRAFT`, replace the story section with a short technical breakdown (game loop architecture, collision detection, state management, why no engine), embed or link a playable build, and place it in a separate `/work` section headed something like "Built for no one but me." This is the clearest evidence of raw ability on the site and should be presented as such rather than buried as project 05 of 5.
40. **Trim the About page.** Keep "Self-taught. Systems-minded. Building on purpose.", keep the uncle/half-finished-tourism-site origin story, keep the OFF DUTY section — all genuinely good. Move "forever 19 (actually 20)" out of the professional bio and into OFF DUTY where the tone fits — on a page meant to establish technical credibility, a self-deprecating age joke undercuts it. Also reconcile the stated age with the GitHub and LinkedIn bios, which say 19 — pick one and use it everywhere. Add a `TODO(unako)` for that.
41. **Reconcile the project count.** The site claims five platforms; GitHub has a sixth, `Chris-Hani-District-Tourism`, with no live URL found. Either add it as a case study if it shipped, or leave it off and add a `TODO(unako)` to mark the repo as in-progress so the gap isn't visible to anyone browsing GitHub.

---

## Phase 6 — Verify and report

42. Re-run Lighthouse and axe-core, save to `/audits/lighthouse-after.json` and `/audits/axe-after.json`.
43. Manually verify, and state each result explicitly:
   - No "est. project value" figure, or any other monetary claim, appears anywhere in the codebase or rendered output.
   - No case study implies authorship of `route56adventures.co.za`.
   - The phrase "engineered for scale" appears nowhere in markup, meta tags, or copy.
   - All five live project links still return 200.
   - `canonical`, `og:url`, `og:image`, and every `sitemap.xml` entry resolve to the canonical domain, and none reference `ayacore.netlify.app` or `ayacreativestudios.netlify.app`.
   - A mistyped `/work/<slug>` renders the 404 page.
   - Keyboard-only pass through the homepage: skip link, nav, hero CTAs, flip cards, footer links — all reachable with a visible focus ring, no traps.
   - Reduced-motion pass: no section is invisible or empty.
   - 390px and 1440px: no horizontal overflow, no clipped text, no oversized blank gaps.
44. **Write `/audits/REPORT.md`** containing: before/after scores, a table of every task with status (done / partial / blocked and why), the complete list of every `TODO(unako)` you inserted with its file and line, and anything you chose to deviate from with your reasoning.

**Do not report a task as complete without a verification step behind it.** If something is blocked — no access to the Netlify dashboard, an asset you cannot regenerate, a fact you cannot confirm — say so plainly rather than working around it silently.
