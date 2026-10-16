# Final local verification: stockmarketnews.online

2026-10-16 KST. Branch: v2-cloudflare-static. No deployment or account changes.

## Preserved product
The Filings Docket: paper register / court docket, serif reading typography, monospace filing stamps, ink rules. 129 indexable HTML pages: 100 company records, 11 guides, 7 form explainers, 5 core/index pages, 6 trust/legal pages, plus real 404.

SEC submissions snapshot retained: asOf 2026-10-15; fetchedAt 2026-10-15T15:00:04.628Z; 100 fetched, zero reused. Source: https://www.sec.gov/search-filings/edgar-application-programming-interfaces . No fabricated refresh.

## Changes
- Calendar next-seven-day count excludes windows already opened; 15 became 14 on this snapshot. Boundary/invalid-date regression added.
- Crawler now exits nonzero on invalid HTML/JSON-LD, missing files or soft 404.
- Reproducible final QA runner owns/closes its local server/browser; external requests blocked during screenshot QA to avoid ad/analytics traffic.

## Verification
- pnpm build invoked; OG generation completed (124 PNGs), then shared runtime interrupted. Recovered with pnpm exec astro build (130 pages, success) plus node scripts/postbuild.mjs (129 URLs, 3 shards).
- pnpm gate: 129 checked, zero failing. pnpm check: zero errors/warnings, two unused-import hints. pnpm test: 11/11 passing.
- node scripts/final-qa.cjs: success. qa/final-crawl.txt: five HTML routes 200, metadata/LD present; seven machine-readable files 200; two unknown routes 404.
- qa/final-shots/report.json: home, Apple, calendar, 8-K guide at 1440 and 390; all eight have zero horizontal overflow and observed CLS 0, visible solid 3px focus. System Chrome fallback used because shared browser cache absent; no browser download.
- Screenshot inspection: paper/ink docket hierarchy is distinctive, readable body, compact desktop company sidebar. Mobile nav and wide tables intentionally scroll locally; navigation can be more discoverable. Inspected fresh calendar mobile screenshot confirms corrected 14 count.
- Before/after: historical public Vercel 402 vs local crawlable static HTML. seo/scorecard.md and seo/measure.md preserved; this does not establish live indexing or traffic.

## Gaps / parent-owned launch gates
- GA4/GSC IDs, contact mailbox delivery, AdSense approval and Google-certified CMP consent message require account verification. Privacy text assumes a configured CMP: reconcile it with actual account state before launch. Consent defaults alone are not a CMP.
- No deployment, DNS, submissions, IndexNow ping, scheduling or measurement run performed. Re-measure +14 days after actual launch.
- Holiday table covers 2026–2028; extend before later projections. Partial per-company refresh failures should receive additional aggregate freshness QA before scheduled operation.
- 11 guides exist; markdown body-only counts range approximately 674–1116 words (excluding frontmatter answer/FAQ). Several are below the approximate 800-word target; editorial expansion remains a content-review consideration, not an invented pass.
- Existing source citations were inspected structurally, not every SEC document re-fetched in this bounded completion pass. No claim of legal/editorial signoff, AdSense approval or revenue.
