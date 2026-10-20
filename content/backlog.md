# Question backlog (fire-your-seo-agency Phase 5)

Rule: one question = one page. A question moves to "Written" only after `pnpm gate` passes. Re-rank from
GSC queries that have impressions but no dedicated page (first review: +14 days after launch, see `seo/measure.md`).
Every new page needs SEC.gov (or eCFR / Federal Register) primary sources and a dated `data_asof`.

## Question queue (updated 2026-10-20)

| Question | Basis | Type | Status | URL |
|---|---|---|---|---|
| How do you read an 8-K? | SEC.gov / eCFR primary sources | guide | live | https://stockmarketnews.online/guides/how-to-read-an-8-k/ |
| How do you read a 10-K? | SEC.gov / eCFR primary sources | guide | live | https://stockmarketnews.online/guides/how-to-read-a-10-k/ |
| What is the difference between a 10-K and a 10-Q? | SEC.gov / eCFR primary sources | guide | live | https://stockmarketnews.online/guides/10-k-vs-10-q/ |
| When are 10-Q and 10-K reports due? | SEC.gov / eCFR primary sources | guide | live | https://stockmarketnews.online/guides/10-q-10-k-filing-deadlines/ |
| What is accelerated filer status? | SEC.gov / eCFR primary sources | guide | live | https://stockmarketnews.online/guides/accelerated-filer-status/ |
| What does an Item 2.02 earnings 8-K contain? | SEC.gov / eCFR primary sources | guide | live | https://stockmarketnews.online/guides/earnings-8-k-item-2-02/ |
| What must a company disclose under 8-K Item 1.05? | SEC.gov / eCFR primary sources | guide | live | https://stockmarketnews.online/guides/8-k-item-1-05-cybersecurity-incidents/ |
| What is a Rule 10b5-1 plan? | SEC.gov / eCFR primary sources | guide | live | https://stockmarketnews.online/guides/rule-10b5-1-plans-and-insider-sales/ |
| What does an NT 10-K mean? | SEC.gov / eCFR primary sources | guide | live | https://stockmarketnews.online/guides/nt-10-k-late-filing-notice/ |
| How do you search SEC EDGAR? | SEC.gov / eCFR primary sources | guide | live | https://stockmarketnews.online/guides/how-to-search-sec-edgar/ |
| What is a CIK and an accession number? | SEC.gov / eCFR primary sources | guide | live | https://stockmarketnews.online/guides/what-is-a-cik-and-accession-number/ |
| Form explainers: 8-K, 10-K, 10-Q, S-1, 13D/13G, Form 4, DEF 14A | SEC.gov / eCFR primary sources | guide | live | https://stockmarketnews.online/forms/ |
| What does 8-K Item 5.02 (officer departure) mean? | Form 8-K instructions; watchlist 8-K item counts from the EDGAR snapshot | guide | live (2026-10-20 release) | https://stockmarketnews.online/guides/8-k-item-5-02-officer-departure/ |
| What is Form 144 and does it mean an insider sold? | Rule 144 / Form 144; watchlist Form 144 counts from the EDGAR snapshot | guide | live (2026-10-20 release) | https://stockmarketnews.online/guides/form-144-insider-sale-notice/ |
| What is a 10-K/A or 10-Q/A amendment and why is one filed? | SEC.gov / eCFR primary sources (to collect) | guide | queued | - |
| What is an S-3 shelf registration and a 424B prospectus supplement? | SEC.gov / eCFR primary sources (to collect) | guide | queued | - |
| What does 8-K Item 4.02 (non-reliance on financial statements) mean? | SEC.gov / eCFR primary sources (to collect) | guide | queued | - |
| What is Form 8-K Item 7.01 vs 8.01 (Reg FD vs other events)? | SEC.gov / eCFR primary sources (to collect) | guide | queued | - |
| What is a Form 3 and when is it due? | SEC.gov / eCFR primary sources (to collect) | guide | queued | - |
| How do you read a DEF 14A executive pay table (pay versus performance)? | SEC.gov / eCFR primary sources (to collect) | guide | queued | - |
| What is Form 11-K (employee plan annual report)? | SEC.gov / eCFR primary sources (to collect) | guide | queued | - |
| What does "smaller reporting company" change in a 10-K? | SEC.gov / eCFR primary sources (to collect) | guide | queued | - |

Queue order is an editorial hypothesis (expected demand x data advantage), not measured demand.

## Merge policy
- Same-question duplicates: 301 to the canonical page; 410 only as a last resort.
- Change `updated`/dateModified only on a real content change.

## Refresh triggers
- SEC rule change touching a deadline or form item -> update affected guides, bump `updated` and `data_asof`.
- GSC impressions down 30% over 28 days on a page -> rewrite intro answer + title test.
