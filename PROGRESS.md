# stockmarketnews.online v2 — progress log (resume from here)

Branch `v2-cloudflare-static` (repo stocks-news). Contract: `../CONTRACT.md`. Brief: `../BRIEFS.md`.
Concept: "The Filings Docket" — SEC EDGAR filings explained in plain English (court docket / wire room).

## Milestones
- [x] M0 Old AI-news app removed (commit "Remove old AI news app for v2 static rebuild"), pushed
- [x] M1 Scaffold (Astro 5 static, wrangler.jsonc, site.config.ts) + refresh script + real data snapshot
- [x] M2 Design system + layout + DESIGN_REFERENCES.md
- [x] M3 Core data/tool pages (home docket, 100 company pages, calendar, companies index)
- [x] M4 Trust/legal pages + 404
- [x] M5 Guides (>=10) + content collection + RSS
- [x] M6 SEO files (sitemap, robots, llms.txt, ads.txt, IndexNow, OG PNGs, JSON-LD)
- [x] M7 gate.mjs + tests + refresh-build.ps1
- [x] M8 QA (build/check/gate, curl crawl, Playwright 1440/390, scorecard, measure.md)
- [ ] M9 Final report

## Log
- 2026-10-15: M0 done.
- M1: Astro 5.18 static scaffold, refresh.mjs (SEC submissions, 100 cos, ~7 req/s), snapshot asOf 2026-10-15, lib/sec.ts (8-K items, deadlines, Rule 0-3 roll, next-report projection), Base layout + docket.css, home docket page builds. NOTE: acceptanceDateTime in submissions API is not true UTC (Apple 10-Q shows 14:01Z for a 06:01 ET filing) -> we show filing dates only.
- M2/M3 (partial): docket.css, home register w/ form filter, /company/[slug]/ x100 (next-report projection + lag SVG + 8-K item table), /calendar/, /companies/. Builds 103 pages. QA screenshots via scripts/shots.cjs (system Chrome; _pw-browsers missing). Next: content collection (forms + guides), legal pages, SEO files, gate.

- 2026-10-16 01:33: 11 guides + 7 form explainers in content collection (all descriptions <=160), build OK 121 pages. Next: /guides/ + /forms/ index pages, RSS, legal pages (about/methodology/contact/privacy/terms/disclaimer) + 404, then M6 SEO files.
- 2026-10-16 09:08 KST: M6 partial: feed.xml, llms.txt, llms-full.txt (Astro endpoints), robots/ads/IndexNow key in public/, scripts/postbuild.mjs (sharded sitemaps from built HTML, lastmod=article:modified_time), scripts/gate.mjs (129 pages, 0 failing). Fixed descriptions + data-answer on data pages. Next: tests, refresh-build.ps1, DESIGN_REFERENCES.md (missing!), content/backlog.md, seo/scorecard.md + measure.md, astro check, QA.
- 09:20: M7 done: tests/sec.test.ts (10 hand-computed cases pass, `pnpm test`), scripts/refresh-build.ps1, DESIGN_REFERENCES.md, content/backlog.md, seo/measure.md; astro check 0 errors (tests excluded from tsconfig). Next: M8 seo/scorecard.md (curl vs preview), Playwright shots, then etfnewsdaily.
- 09:25: M8 done. Fonts now self-defined @font-face font-display:optional + preload (CLS 0 on 8 pages x 2 widths; was up to 0.25), .columns minmax(0,1fr) + sr-only/table-scroll fix (390 overflow 0). seo/scorecard.md before(402)/after. QA evidence qa/shots/report.json, qa/crawl.txt (gitignored). stockmarketnews COMPLETE except final report. Next: etfnewsdaily.
