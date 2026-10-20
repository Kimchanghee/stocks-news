# Measurement plan: stockmarketnews.online (fire-your-seo-agency Phase 6)

## Baseline (record on deploy day, before any traffic)
- Live domain before rebuild: HTTP 402 (Vercel paused), so GSC/GA baseline is effectively zero. Record the
  deploy date and the GSC "Pages > Indexed" count on that day (expected 0 for the new URLs).
- Sitemaps to submit in GSC and Bing Webmaster Tools: `https://stockmarketnews.online/sitemap-index.xml`.
- IndexNow: ping `https://api.indexnow.org/indexnow?url=<url>&key=6f1c3a9e2b7d4e58a0c94f17d2b8e3a1` for home,
  /calendar/, /companies/, /forms/, /guides/ after deploy (parent-owned).

## Re-measure at deploy + 14 days (exclude the latest 2-3 days)
| Metric | Where | Expected direction |
|---|---|---|
| Indexed pages vs 129 sitemap URLs | GSC > Pages, Sitemaps | rising; investigate "Crawled - not indexed" company pages |
| Impressions / clicks by group (/, /company/, /guides/, /forms/, /calendar/) | GSC > Performance, page filter regex | impressions first, clicks later |
| Queries with impressions but no dedicated page | GSC > Queries | feed `content/backlog.md` |
| Rich result eligibility (Breadcrumb, FAQ, Article, Dataset) | GSC > Enhancements / Rich Results Test | no errors |
| GA4 events: `tool_used` (calendar_search, docket_filter), `outbound_click` to sec.gov | GA4 > Events (needs PUBLIC_GA4_ID) | non-zero after launch |
| AI crawler hits (GPTBot, OAI-SearchBot, ClaudeBot, PerplexityBot) | Cloudflare > Security/Analytics bot breakdown | crawls precede citations |
| Data freshness: snapshot asOf vs build date | site masthead / `src/data/companies.json` | asOf within 1 day; stale banner otherwise |

## AI citation check (O/X), at +14 and +90 days
1. "When is Apple's next 10-Q due?"
2. "What does 8-K Item 1.05 mean?"
3. "What is the 10-Q deadline for a large accelerated filer?"
4. "What is an NT 10-K?"
5. "How do I read an 8-K?"
6. "What is a Rule 10b5-1 plan?"
7. "What did large companies file with the SEC this week?"
8. "What is a CIK number?"
Ask in ChatGPT (search on), Perplexity and Google AI Overviews; record whether stockmarketnews.online is cited.

## Report line (fill in at re-measure)
```
[Baseline]   deploy day: 402 before rebuild, 0 indexed, AI citations 0/8
[Change]     v2 static rebuild: 129 indexable URLs, llms.txt, JSON-LD, RSS
[Re-measure] deploy + 14 days
[Result]     ...
```

## 2026-10-20 five-lane pass
- Re-measure date: 2026-11-03 (+14 days from this source release).
- Numeric baseline: pending console data (GSC/Bing exports are owner-held). Values are unknown, not zero.
- Citation probes (record engine, date, answer, cited URL as O/X): What does 8-K Item 5.02 (officer departure) mean? / What is Form 144 and does it mean an insider sold? / What is a 10-K/A or 10-Q/A and why is one filed? / Which of the 100 companies filed an 8-K this week? / What is The Filings Docket?
- Leading indicator: AI-crawler visits (GPTBot, OAI-SearchBot, ClaudeBot, Claude-SearchBot, PerplexityBot, Perplexity-User) in Cloudflare analytics where available.
