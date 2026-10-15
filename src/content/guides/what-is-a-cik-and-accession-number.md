---
title: "What Is a CIK and an Accession Number on SEC EDGAR?"
description: "How EDGAR identifies every filer and every filing: the 10-digit CIK, the 18-digit accession number, what each part means and how to build a filing URL from them."
h1: "What are a CIK and an accession number?"
question: "What is a CIK number and an accession number?"
answer: "A CIK, or Central Index Key, is the permanent number EDGAR assigns to each filer, shown as up to ten digits. An accession number identifies one filing, in the form 0000320193-26-000020: the submitter's CIK, a two-digit year and a sequence number. Together they locate any filing on sec.gov."
data_asof: "2026-10-15"
published: "2026-10-15"
updated: "2026-10-15"
order: 11
sources:
  - title: "SEC, Accessing EDGAR Data"
    url: "https://www.sec.gov/os/accessing-edgar-data"
  - title: "SEC, EDGAR Application Programming Interfaces (data.sec.gov)"
    url: "https://www.sec.gov/search-filings/edgar-application-programming-interfaces"
  - title: "SEC, Company ticker to CIK mapping file (JSON)"
    url: "https://www.sec.gov/files/company_tickers.json"
  - title: "SEC, EDGAR Full Text Search"
    url: "https://www.sec.gov/edgar/search/"
faq:
  - q: "Does a company's CIK ever change?"
    a: "No. A CIK stays with the registrant even if it changes its name, ticker or exchange. That is why the CIK, not the ticker, is the reliable key for EDGAR research."
  - q: "Why does an accession number start with a different company's CIK?"
    a: "The first ten digits identify the entity that submitted the filing. When a filing agent submits on the company's behalf, those digits are the agent's CIK, not the company's."
  - q: "How do I find a company's CIK?"
    a: "Search the company on sec.gov/edgar/search; the CIK appears on its filing page. The SEC also publishes a JSON file mapping tickers to CIKs."
related: ["/guides/how-to-search-sec-edgar/", "/forms/10-k/", "/companies/", "/forms/8-k/"]
---

Every document on EDGAR can be found with two numbers: the **CIK** of the company and the **accession number** of the filing. Both appear on every filing index page, in every API response and in every URL under sec.gov/Archives. Learning to read them makes EDGAR much faster to navigate.

## What is a CIK?

The **Central Index Key** is a unique number the SEC assigns to each person or entity that files on EDGAR: companies, funds, individual insiders filing Form 4, filing agents and others. Key properties:

- **It is permanent.** A company keeps its CIK when it changes name, ticker or listing venue.
- **It is not a ticker.** Tickers belong to exchanges and can be reassigned; the CIK belongs to the filer.
- **It is up to ten digits.** EDGAR pages often show it without leading zeros (Apple Inc. is 320193), while the data APIs use the zero-padded ten-digit form (0000320193).

Individuals get CIKs too. A director filing a Form 4 has their own CIK, and the Form 4 appears under both the person and the company.

## How do you find a CIK?

Three easy ways:

1. Search the company on **sec.gov/edgar/search**. The CIK is shown on its filing page.
2. Use the SEC's **ticker-to-CIK JSON file**, which maps current tickers to CIKs and company names.
3. Read it off any filing: the cover page of most reports and the filing index both show it.

On the Filings Docket, every [company page](/companies/) shows the CIK beside the company name.

## What is an accession number?

Each submission accepted by EDGAR receives an **accession number**, an 18-digit identifier usually written with two dashes, for example `0000320193-26-000020`. It has three parts:

| Part | Example | Meaning |
| --- | --- | --- |
| First 10 digits | 0000320193 | CIK of the entity that **submitted** the filing |
| Next 2 digits | 26 | Year of the submission |
| Last 6 digits | 000020 | Sequence number of that submitter's filings in the year |

The first part is the **submitter**, which is not always the company the filing is about. Many companies use filing agents, and their filings carry the agent's CIK. In our October 2026 snapshot, for example, Apple's 10-Q filed July 31, 2026 carries accession 0000320193-26-000020, beginning with Apple's own CIK, while recent Form 4 filings about Apple insiders begin with 0001140361, the CIK of the agent that submitted them. A Form 4 filed by a company's staff on behalf of a director often carries the company's CIK even though the reporting person is the director.

## How do you build a filing URL?

Filings are stored under the EDGAR archives path:

```
https://www.sec.gov/Archives/edgar/data/{CIK without leading zeros}/{accession number without dashes}/
```

The **filing index page** for the example above would be:

```
https://www.sec.gov/Archives/edgar/data/320193/000032019326000020/0000320193-26-000020-index.htm
```

That index lists every document in the submission. The main document's file name comes from the filer, so you read it from the index or from the `primaryDocument` field in the submissions API.

The Filings Docket builds every "view on SEC.gov" link this way, from the CIK and accession number in the SEC's own data, so each link goes to the original record.

## Where do these numbers appear in the data API?

The submissions endpoint at `data.sec.gov/submissions/CIK##########.json` returns a company's identifying details and a `filings.recent` block with parallel arrays: `accessionNumber`, `filingDate`, `reportDate`, `form`, `items` (for 8-Ks), `primaryDocument` and others. Each index across the arrays is one filing. The SEC asks automated users to declare a descriptive User-Agent and to stay within its fair-access rate limit.

## Why this matters for readers

- **Citing a filing precisely.** An accession number points to one specific submission, which is more exact than "Apple's 10-K".
- **Spotting amendments.** An amended filing such as a 10-K/A has its own accession number; compare both.
- **Avoiding ticker mix-ups.** When two companies have had the same ticker at different times, the CIK resolves the ambiguity.

For a broader walkthrough, see [how to search SEC EDGAR](/guides/how-to-search-sec-edgar/).
