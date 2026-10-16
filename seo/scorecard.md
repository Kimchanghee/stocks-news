# Phase 0 scorecard: stockmarketnews.online

## BEFORE: live domain, 2026-10-16 00:22 UTC (curl, no JS)
```
$ curl -sI https://stockmarketnews.online/
HTTP/1.1 402 Payment Required
Server: Vercel
X-Vercel-Error: DEPLOYMENT_DISABLED
Content-Length: 78
$ curl -s -o /dev/null -w '%{http_code}' https://stockmarketnews.online/{robots.txt,sitemap.xml,llms.txt}
402 402 402
```

| Lane | Status | Evidence |
|---|---|---|
| SEO | ❌ | Every URL returns 402 (Vercel deployment disabled): no HTML, robots.txt or sitemap reachable |
| AEO | ❌ | No content, no structured data reachable |
| GEO | ❌ | No llms.txt, no citable pages |
| LLMO | ❌ | No entity description reachable; old app was an AI-written news feed |
| NEO | n/a | English site (Naver lane not applicable) |
| Content ops | ❌ | No feed, no question mapping, no publishing reachable |

## AFTER: local build served like Cloudflare assets (scripts/serve.cjs on 127.0.0.1:4331), 2026-10-16 (curl, no JS)
Full output: `qa/crawl.txt` (regenerate with `pwsh scripts/crawlcheck.ps1`).
```
200 / | h1=1 | title(56)=SEC Filings Today: 8-K, 10-Q & 10-K Docket Explained | desc(157) | canonical=https://stockmarketnews.online/ | robots=index, follow, max-image-preview:large | LD types=Organization,WebSite,Dataset
200 /company/aapl/ | h1=1 | title(56) | desc(154) | canonical=https://stockmarketnews.online/company/aapl/ | LD types=Organization,WebSite,BreadcrumbList,Dataset
200 /calendar/ | h1=1 | title(51) | desc(154) | LD types=Organization,WebSite,BreadcrumbList,Dataset
200 /guides/how-to-read-an-8-k/ | h1=1 | title(55) | desc(158) | LD types=Organization,WebSite,BreadcrumbList,Article,FAQPage
200 /forms/8-k/ | h1=1 | title(51) | desc(152) | LD types=Organization,WebSite,BreadcrumbList,TechArticle,FAQPage
200 /sitemap-index.xml  (3 shards: companies, articles, pages; 129 URLs; lastmod 2026-10-15/16)
200 /robots.txt  (User-agent: * / Allow: / / Sitemap: https://stockmarketnews.online/sitemap-index.xml; no AI-crawler blocks)
200 /llms.txt (16 KB)   200 /llms-full.txt (111 KB)   200 /feed.xml (RSS, 18 items)   200 /ads.txt
404 /no-such-page/      404 /company/zzzz/
noindex occurrences in home HTML: 0; X-Robots-Tag header: none
```

| Lane | Status | Evidence |
|---|---|---|
| SEO | ✅ | All content in server HTML; titles 50–60 / descriptions 150–160 on all 129 pages (`pnpm gate`); absolute canonicals; OG/Twitter 1200x630 PNG per page; sharded sitemaps with real lastmod; real 404 status |
| AEO | ✅ | Question-shaped H1s; `data-answer` direct answer first on every page; FAQPage only where FAQ is visible (gate verifies Q and A text are visible); Breadcrumb, Article/TechArticle with dateModified, Dataset on data pages |
| GEO | ✅ | llms.txt + llms-full.txt; citable sentences with numbers + date + SEC source link (docket answer, company next-report answer); methodology page; stable ticker URLs |
| LLMO | ⚠️ | Consistent entity "The Filings Docket at stockmarketnews.online" across About, Organization LD, llms.txt, footer. No `sameAs` surfaces exist yet (no social/GitHub profile for the brand) |
| NEO | n/a | English site |
| Content ops | ✅ | Content collection with question/answer/data_asof/sources/faq/updated frontmatter driving render + LD; `content/backlog.md`; `scripts/gate.mjs` publish gate (0 failing); RSS; IndexNow key file |

Not measured here (post-deploy, parent-owned): indexing, impressions, AI citations. See `seo/measure.md`.
