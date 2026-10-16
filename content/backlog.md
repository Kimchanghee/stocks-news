# Question backlog (fire-your-seo-agency Phase 5)

Rule: one question = one page. A question moves to "Written" only after `pnpm gate` passes. Re-rank from
GSC queries that have impressions but no dedicated page (first review: +14 days after launch, see `seo/measure.md`).
Every new page needs SEC.gov (or eCFR / Federal Register) primary sources and a dated `data_asof`.

## Written (live in src/content)
| Question | URL |
|---|---|
| How do you read an 8-K? | /guides/how-to-read-an-8-k/ |
| How do you read a 10-K? | /guides/how-to-read-a-10-k/ |
| What is the difference between a 10-K and a 10-Q? | /guides/10-k-vs-10-q/ |
| When are 10-Q and 10-K reports due? | /guides/10-q-10-k-filing-deadlines/ |
| What is accelerated filer status? | /guides/accelerated-filer-status/ |
| What does an Item 2.02 earnings 8-K contain? | /guides/earnings-8-k-item-2-02/ |
| What must a company disclose under 8-K Item 1.05? | /guides/8-k-item-1-05-cybersecurity-incidents/ |
| What is a Rule 10b5-1 plan? | /guides/rule-10b5-1-plans-and-insider-sales/ |
| What does an NT 10-K mean? | /guides/nt-10-k-late-filing-notice/ |
| How do you search SEC EDGAR? | /guides/how-to-search-sec-edgar/ |
| What is a CIK and an accession number? | /guides/what-is-a-cik-and-accession-number/ |
| Form explainers: 8-K, 10-K, 10-Q, S-1, 13D/13G, Form 4, DEF 14A | /forms/* |

## Next (ranked by expected search demand x our data advantage)
1. What does 8-K Item 5.02 (officer departure) mean? (data: watchlist 5.02 frequency)
2. What is Form 144 and does it mean an insider sold? (data: 144 counts per company)
3. What is a 10-K/A or 10-Q/A amendment and why is one filed?
4. What is an S-3 shelf registration and a 424B prospectus supplement?
5. What does 8-K Item 4.02 (non-reliance on financial statements) mean?
6. What is Form 8-K Item 7.01 vs 8.01 (Reg FD vs other events)?
7. What is a Form 3 and when is it due?
8. How do you read a DEF 14A executive pay table (pay versus performance)?
9. What is Form 11-K (employee plan annual report)?
10. What does "smaller reporting company" change in a 10-K?

## Refresh triggers
- SEC rule change touching a deadline or form item -> update affected guides, bump `updated` and `data_asof`.
- GSC impressions down 30% over 28 days on a page -> rewrite intro answer + title test.
