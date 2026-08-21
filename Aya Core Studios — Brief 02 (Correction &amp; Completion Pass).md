# Aya Core Studios — Brief 02 (Correction & Completion Pass)

**Target:** `https://ayacorestudios.netlify.app/` — React + Vite SPA, Three.js, Playfair Display / Poppins / Inter / Fira Code
**Context:** Brief 01 has been substantially implemented. This brief covers (a) factual corrections that are wrong on the live site right now, (b) items from Brief 01 not yet done, (c) new issues introduced by the last pass. Verified live against the deployed site immediately before this brief was written.

**Rules:**
- Do NOT redesign the visual identity. Dark palette, magenta accent, Playfair headlines, mono chips, orbit motif all stay.
- **Do NOT write `TODO(...)` text into any component that renders.** Last pass shipped visible TODO placeholders to production. If a value is unknown, the section must not render at all. Collect open questions in `/audits/OPEN-QUESTIONS.md` instead.
- Do not invent metrics, testimonials, clients, or figures.
- One commit per numbered task, using the task title as the message.
- After each phase, verify at 1440px and 390px.

---

## Phase A — Live inaccuracies (do these first)

### A1. Strip every rendered `TODO` from production

Currently visible to any visitor on `/work/matatiele-online` and `/work/route-56-adventures`: *"TODO(unako): outcome — e.g. accommodation listings live, monthly visits, bookings handled, search ranking for…"*

Remove the `OUTCOME` section from the case-study template entirely — do not leave it empty, do not leave placeholder copy. Then grep the whole repo for `TODO(unako` and confirm zero matches inside any rendered string. There are no outcome metrics available for any project, so the section has no reason to exist yet.

### A2. Replace `OUTCOME` with `STATUS`

A factual field requiring no metrics. Use exactly these values:

| Project | STATUS |
|---|---|
| Kokstad Tourism | `Live` |
| Matatiele Online | `Live` |
| Route 56 Adventures | `Live` |
| Ngejane Dental | `Live — not yet in active use` |

The Ngejane value is important and must not be softened. The build is deployed but not finished and is not yet handling real patients. The current site describes it as "Healthcare booking & payments," which implies an operational clinic system. Keep that descriptor but let `STATUS` qualify it.

### A3. Correct `MY ROLE` on all five projects

The real sequence, confirmed: his uncle handed him **Kokstad Tourism** first as a test. Once it had structure and was working, he was given **Matatiele Online**. Then **Ngejane Dental**. Then asked to patch **Route 56 Adventures**, which was already in good shape. Ship this wording:

- **Kokstad Tourism** — "The first one. My uncle handed it over half-finished as a test; I completed the build and gave it the structure and visual identity it didn't have."
- **Matatiele Online** — "Built by me for Route 56 Adventures — handed to me after Kokstad proved the approach worked."
- **Ngejane Dental** — "Started by Route 56 Adventures. I rebuilt the front end and did substantial back-end work, including the OTP flow, Yoco payment integration, and POPIA-shaped data modelling. Still being finished."
- **Route 56 Adventures** — "Not my build. Founded and built by my uncle; the platform was already solid. I updated the content and the UI."
- **Digital Break V2.1** — "Self-directed. No client, no brief, no framework."

Route 56 currently says *"I came in to audit the platform and patch what was breaking,"* which overstates it — it implies the platform was broken. The corrected line is deliberately more modest. Do not talk it back up.

### A4. Delete the pasted paragraph from the Matatiele case study

`/work/matatiele-online` → `THE STORY` currently contains two conflicting accounts in two different voices. Keep the first, editorial paragraph ("Matatiele needed to exist online the way it exists on the ground — as a full town, not a single hotel's landing page…"). **Delete the second half entirely**, beginning at "I co-developed and significantly enhanced the Matatiele Tourism website (matatiele.co.za), a comprehensive platform promoting tourism in the Eastern Cape…" through to "…showcasing the region's unique appeal to a global audience."

Two reasons: it directly contradicts `MY ROLE`, and its register (résumé/LinkedIn boilerplate) is nothing like the rest of the site's writing. Audit the other four case studies for the same pasted-blurb pattern and remove any others.

### A5. Fix the platform count — it is four, not five

Digital Break is not a live platform. Currently inconsistent across the site:

- Home stats strip: `5 / LIVE PLATFORMS` → **`4`**
- `/about` terminal card: `shipped: 5 platforms shipped to production` → **`4 platforms shipped to production`**
- `/services` build log: `$status --all-platforms` → `>5 platforms, 16 towns covered` → **`4 platforms, 16 towns covered`**
- Home featured section eyebrow: `05 / FEATURED PROJECTS` → must match the number of cards actually rendered (see A6)

`/work` is already correct ("Four platforms for real places. One built for the craft." / `04 / 04`). Make everything else agree with `/work`. Source the number from one constant so it cannot drift again.

### A6. Home page renders only two featured projects

The home featured section is labelled `05 FEATURED PROJECTS` but renders only **Kokstad Tourism** and **Ngejane Dental**. Matatiele Online and Route 56 Adventures do not appear. Determine whether this is a scroll-reveal bug or an incomplete data array, then either render all four with a matching count or set the count to what actually renders. Verify by counting rendered cards in the DOM, not by eye.

### A7. Name Kokstad in the origin story

`/about` → `HOW THIS STARTED` says "My uncle handed me a half-finished tourism site as a test." That site was Kokstad Tourism. Name it and link to the case study. A specific claim you can click is worth more than an anonymous one, and it ties the origin story to A3's role line.

---

## Phase B — Restore the brand title and give it evidence

### B1. Put "Creative Technologist" back in the hero

The last pass shipped `FULL-STACK DEVELOPER · PHP · MYSQL · REACT · SOUTH AFRICA` — a superseded recommendation. The `<title>` and `og:title` still say "Creative Technologist," so the page currently contradicts its own metadata. Ship:

- **Eyebrow:** `CREATIVE TECHNOLOGIST · SOUTH AFRICA`
  **Do not change this to a job title on any future pass.** It is a deliberate long-term brand decision. B3 is what substantiates it.
- **Headline:** `Small towns deserve software that works.` (unchanged — it works)
- **Sub-line:** "I'm Unako 'Aya' Mtumtum, a self-taught creative technologist in Bloemfontein. Right now that means tourism directories, booking systems, and clinic platforms for Route 56 Adventures — four live in production. Next it means [OWNER INPUT REQUIRED]."

The `Right now that means… / Next it means…` structure is the entire point: it lets an aspirational title coexist with an honest present tense. Preserve it. The final clause needs the owner's own words — leave the sentence out of the build rather than inventing it, and log it in `/audits/OPEN-QUESTIONS.md`.

The stack now lives in the chips directly below the CTAs (`PHP` · `MYSQL` · `REACT`), which already render. Add `THREE.JS` since the site itself uses it.

### B2. Align the metadata to the restored title

`<meta name="description">` and `og:description` currently read "Full-stack developer building tourism directories, booking systems, and clinic platforms for real towns along South Africa's R56." Rewrite to lead with creative technologist while keeping the concrete second half. Apply to `description`, `og:description`, and `twitter:description` from a single source.

### B3. Build `/lab` — currently a 404

This is what makes the title defensible. The site claims "creative technologist" and then shows four PHP/MySQL business platforms; the label needs a surface pointing at the direction.

- Create `/lab`, nav label "Lab". Framing: `/work` is what shipped for other people; `/lab` is what got built to find out if it could be.
- **Entry 1 — Digital Break V2.1.** Move it here from `/work`. It already has the `SELF-DIRECTED · CRAFT` treatment and a technical breakdown (game loop architecture, collision detection, state management) — that content moves as-is. Leave a card on `/work` linking across so it isn't lost.
- **Entry 2 — the orbit system on this site.** Write up the Three.js sphere: scene setup, the animation loop, and the performance decisions from C7 below. Building the thing the portfolio renders in is legitimate creative-technologist work and currently goes uncredited.
- Each entry: title, one-paragraph technical breakdown, stack, live/playable link where one exists, repo link. No client framing, no status field, no metrics.
- Add `/lab` and its entries to the sitemap generator.

### B4. One canonical tech stack section on `/about`

The stack is currently stated in three places that disagree: hero chips say PHP/MySQL/React, the `/about` terminal card says `react · node · sql`, project tags say PHP/MySQL/SEO/Yoco/OTP/POPIA/Maps. Nothing lists it completely, so a recruiter cannot answer "what does this person know."

Add one grouped section and delete the competing partial lists (keep the hero chips and per-project tags — those serve different jobs). **Do not build an icon grid of logos.** Group by honesty:

- **Ship with daily** — PHP, MySQL, JavaScript, CSS, HTML5, React
- **Shipped in production** — Yoco payments, OTP auth, POPIA-shaped data modelling, SEO architecture, Canvas rendering & game loops
- **Currently learning** — Three.js, Node, TypeScript, C#

Update the `/about` terminal card's `stack:` line to match rather than contradicting it. The "Currently learning" group is load-bearing — it is where the creative-technologist trajectory becomes visible, and it should link to `/lab`.

---

## Phase C — Copy and craft

### C1. Rewrite the site-wide footer blurb

Every page currently ends with: *"Design, strategy, and product thinking for brands ready to feel sharper, richer, and more memorable."* This is template boilerplate. It is not the site's voice, and it says "brands" on a site whose entire thesis is small towns and communities. Rewrite in first person, referencing towns/communities and production software. Also reconsider the `SELECT COLLABORATIONS` label sitting above the footer — it is vague and unattached to anything.

### C2. Fix broken grammar on the home page

`THE CORE, IN THREE MOVEMENTS` subhead reads *"A studio told the way its work is built."* Not a sentence. Rewrite.

### C3. Tighten the three movements

Keep the section — it is the most distinctive thing on the site. But cut each beat from a paragraph to two sharp lines, and make beats I and II concrete. Beat III already works because it names real things ("Tourism boards, clinics, players"); I and II do not. Specifically, delete "ritual" from *"Rings of architecture emerge — data, interface, ritual, culture"* — it is doing no work. Replace abstractions with the actual nouns of the work: schema, interface, content model, the people maintaining it.

### C4. Cut the philosophy principles from four to two

`PHILOSOPHY` on `/about`. Keep the "Aya Core" triple-meaning paragraph as-is. Of the four principles, keep:
- **Feeling in, structure out** — "The things I care about get the architecture." Best line on the site. Keep verbatim.
- **Balanced maximalism** — "More going on, never more going wrong. Rich, not cluttered."

Cut **Systems thinking** ("every screen is a node in a larger graph") and **Cultural authenticity** ("grounded in South African context, not generic templates") — both are generic enough that anyone could write them, and both are already expressed elsewhere on the page. Two strong principles read better than four uneven ones. Rebalance the layout for two items rather than leaving a two-up grid with holes.

### C5. Trim OFF DUTY by roughly half and move it last

The section works and should stay, but at ~30 music tags plus fandom, culture, currently-into and used-to-be-into rows, the volume turns personality into a list. Cut each row to about eight items. Protect these, which are the ones actually landing: "Gqom (very important)", "Being a Hater Professionally", "Dropshipping (it failed *sigh)", "Claude 🫦", "Trevor Noah!!", "Chrome & Metallic Everything".

Also reorder `/about` so `PHILOSOPHY` comes **before** `OFF DUTY`. Currently the page runs professional → personal → philosophy, which strands the philosophy section below the fun. Personal content should close the page.

The image caption *"this one's giving Steve Lacy's album cover, on some, oh yeah? lmaoo"* is correct and stays — confirm it is programmatically associated with its image (`<figcaption>` inside a `<figure>`), so it never renders orphaned.

### C6. Fix voice inconsistency on `/services`

The Rescue & rebuild card reads *"Aya rebuilds it without losing what already works"* — third person, while the entire rest of the site is first person. Change to "I rebuild it…" and sweep both other service cards for the same slip.

---

## Phase D — Technical debt still outstanding from Brief 01

Verified as **not yet done** on the live site.

### D1. The 291 KB logo (still unfixed)

`/brand/aya-core-symbol.png` is still exactly 291,296 bytes — a 512×512 PNG rendering at 64px in the header and ~62px in the footer. Convert the mark to inline SVG if the geometry allows, otherwise export at 128×128 as WebP with a PNG fallback via `<picture>`. Target under 15 KB. This is the largest single performance cost on the site.

### D2. Social share image (still unfixed)

`og:image` and `twitter:image` both point at `aya-core-symbol.png`, a 512×512 square, while `twitter:card` is `summary_large_image` (expects ~1200×630). Every share on X, LinkedIn, Slack and iMessage renders as a small logo in a padded box. Produce a 1200×630 landscape card in the existing visual language: wordmark, the "Small towns deserve software that works." headline, magenta on near-black. Give each case study its own `og:image` using its project screenshot.

### D3. Image dimensions (still unfixed)

Eight images on the home page alone have no `width`/`height`: `aya-core-symbol.png` (×2), `projects/kokstad-tourism.jpg`, `projects/ngejane-dental.jpg`, `brand/logos/kokstad-tourism.png` (×2), `brand/logos/ngejane-dental.png` (×2). Add explicit dimensions or CSS `aspect-ratio` to every `<img>` site-wide. Add `loading="lazy"` and `decoding="async"` to everything below the fold; hero and logo stay eager.

### D4. Colour contrast — five failures, one of them new

axe-core, WCAG 2 AA, home page:
- **`#a7034b` on `#000000` = 2.75** at 27pt. This is new since the last pass and is the worst of the set. Needs 3:1 minimum at that size.
- **`#4c1336` on `#131316` = 1.28** — the giant background "CORE" watermark, 156pt. Either raise to 3:1 or mark `aria-hidden="true"` and treat as pure decoration.
- **`#c60e77` on `#000000` = 3.73** at 7.5pt — eyebrow/label text, needs 4.5:1.

Introduce a dedicated `--accent-text` token, lightened for text use, and keep the existing magenta for borders, fills and glows where contrast rules don't apply. Do not dull the brand accent globally to fix text.

### D5. Two unlabelled SVGs remain

`svg-img-alt`, 2 nodes on the home page. The three social icons are now correctly labelled (GitHub, LinkedIn, Instagram all have `aria-label`) — these are different SVGs. Find them: if decorative, add `aria-hidden="true"` and `focusable="false"`; if meaningful, add an accessible name. Then sweep every page, not just home.

### D6. Duplicated headings in the DOM

Every major heading renders twice — "Small towns deserve software that works." ×2, "Self-taught. Systems-minded. Building on purpose." ×2, "Four platforms for real places." ×2, and so on across all pages. Presumably a layered motion effect. Screen readers announce each heading twice. Mark the decorative copy `aria-hidden="true"` and ensure only one instance is a real heading element in the accessibility tree.

### D7. Retire the two old deployments

`ayacore.netlify.app` and `ayacreativestudios.netlify.app` both still return **HTTP 200 with no redirect**. The second serves a blank page from an unbuilt Vite dev entry point. Add `_redirects` or `netlify.toml` on both issuing a **301** to the same path on `ayacorestudios.netlify.app`. If the Netlify dashboards aren't accessible, write the exact files and steps to `/audits/DOMAIN-MIGRATION.md` and say so in the report.

Also log in `/audits/OPEN-QUESTIONS.md`, as owner-only actions: the GitHub profile (`kwaAya`) website field and the LinkedIn profile link both still point at the dead `ayacreativestudios.netlify.app`; the Instagram bio link routes through Linktree rather than the site.

### D8. Performance work not yet started

- **Code-split per route.** `React.lazy` + `Suspense` per route, with Three.js in its own dynamic chunk so `/about` and `/contact` never download WebGL.
- **Self-host the fonts.** Four Google families load from a render-blocking `<link>`. Subset to the weights actually used, serve `woff2` locally, `font-display: swap`. Drop any family appearing fewer than three times in the CSS.
- **Gate the orbit animation.** Confirm it mounts only on routes that show it, pauses via `IntersectionObserver` when scrolled out of view, pauses on `visibilitychange`, and renders a single static frame under `prefers-reduced-motion: reduce`.

### D9. Confirmed fixed — do not regress

Verified working; leave alone and re-check at the end: `nested-interactive` (0 nested interactive elements), the `/work/<bad-slug>` soft-404 (now renders "LOST IN ORBIT" correctly), social icon `aria-label`s, skip-to-content link, canonical + `og:url` + all 10 sitemap entries on the correct domain, and every "est. project value" figure removed.

Note: the 404 route returns HTTP 200 because it's a client-rendered SPA. Acceptable, but if Netlify prerendering or a status-aware fallback is available, return a real 404 status.

---

## Phase E — Verify and report

Re-run Lighthouse (mobile) and axe-core on `/`, `/work`, `/about`, `/lab`, and two case-study pages. Save before/after to `/audits/`.

State each of these explicitly as pass/fail:

1. `grep -r "TODO(unako"` returns zero matches in rendered source.
2. No `OUTCOME` section renders anywhere; `STATUS` renders on all four platform case studies with the exact A2 values.
3. Ngejane Dental is described as not yet in active use.
4. Route 56 Adventures does not imply authorship or that the platform was broken.
5. The Matatiele case study contains no résumé-voice paragraph and no claim conflicting with `MY ROLE`.
6. The platform count reads 4 everywhere, sourced from one constant.
7. Home featured project cards rendered == the number in the section eyebrow.
8. Hero eyebrow reads `CREATIVE TECHNOLOGIST · SOUTH AFRICA`; `<title>`, `og:title` and hero agree.
9. `/lab` returns a real page with two entries and appears in the sitemap.
10. axe-core: zero `color-contrast` and zero `svg-img-alt` violations on all tested pages.
11. Each heading appears exactly once in the accessibility tree.
12. `aya-core-symbol` asset is under 15 KB; `og:image` is 1200×630.
13. `curl -I https://ayacore.netlify.app/` returns 301 — or the blocker is documented.
14. Reduced-motion pass: no section is invisible or empty.
15. 390px and 1440px: no horizontal overflow, no clipped text, no oversized blank gaps.

Then write `/audits/REPORT-02.md`: before/after scores, every task with status (done / partial / blocked and why), and anything deviated from with reasoning. Put every owner-only question in `/audits/OPEN-QUESTIONS.md` — not in the rendered site.

**Do not mark a task complete without a verification step behind it.** If something is blocked, say so plainly rather than working around it silently.
