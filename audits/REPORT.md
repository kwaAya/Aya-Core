# Aya Core Studios Brief 02 Report

Date: 2026-08-21

## Verification

- `npm run build`: PASS after the final edit.
- Local browser checks: PASS for Home, About, Lab, and Matatiele case study.
- Home featured cards: PASS, DOM count is 4 at 1440px and 390px.
- `/lab`: PASS, real page with 2 entries and no horizontal overflow.
- Matatiele case study: PASS, no TODO/outcome text; status is `Live`.
- About order and caption: PASS, Philosophy precedes Off Duty; the caption is a `figcaption` inside a `figure`.
- 1440px and 390px overflow checks: PASS on Home and Lab; About also passed without overflow.
- Lighthouse before/after: BLOCKED. No deployed-site runner or baseline is available here.
- axe before/after: BLOCKED. No axe runner is available here.
- External live URL and retired-domain redirect checks: BLOCKED by lack of dashboard/network control.

## Brief 02 status

| Task | Status | Evidence or blocker |
|---|---|---|
| A1-A4 case-study corrections | Done | Status replaces Outcome; roles and Matatiele story corrected; no rendered TODO remains |
| A5-A6 platform count and featured work | Done | `PLATFORM_COUNT` is 4; Home DOM renders 4 cards |
| A7 Kokstad origin story | Done | About links the named Kokstad case study |
| B1-B2 brand title and metadata | Done | Creative-technologist hero, shared description source, and static metadata aligned |
| B3 Lab | Done | `/lab` route, nav entry, two entries, sitemap entry |
| B4 About stack | Done | Three honest groups; learning group links to Lab |
| C1-C6 copy and About cleanup | Partial | Copy, movements, principles, tag volume, caption, and Services voice updated; full visual review remains |
| D1 logo payload | Done | Header/footer use `aya-core-symbol.svg` at 1,319 bytes; old 291 KB PNG removed |
| D2 social card | Partial | 1200x630 SVG card added; raster compatibility still owner question |
| D3 image stability | Partial | Logo dimensions and About CSS ratios added; full site-wide intrinsic audit remains |
| D4-D6 accessibility | Partial | Dedicated accent token and decorative SVG handling improved; axe and full heading audit blocked |
| D7 retired deployments | Blocked | Exact redirect instructions remain in `DOMAIN-MIGRATION.md`; dashboards unavailable |
| D8 performance | Partial | Route and WebGL lazy chunks verified in build; font self-hosting and full performance audit remain |
| E verification/reporting | Partial | Local checks recorded; Lighthouse/axe and external checks blocked |

## Owner questions

All remaining owner-only follow-ups are collected in `audits/OPEN-QUESTIONS.md` and are not rendered in the site. Availability remains as written, project outcomes remain intentionally omitted, the founder is credited only as “my uncle,” and age wording is confirmed as 20. Chris-Hani-District-Tourism is live but still in progress and is intentionally excluded from the four shipped-platform count. The uncle's name was not added to the product copy.
