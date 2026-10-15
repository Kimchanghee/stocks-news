---
title: "How to Search SEC EDGAR: Company, Form and Full-Text Search"
description: "A practical walkthrough of SEC EDGAR search: finding a company by name, ticker or CIK, filtering by form type and date, full-text search and the free data APIs."
h1: "How do you search SEC EDGAR for a company's filings?"
question: "How do you search SEC EDGAR?"
answer: "Start at sec.gov/edgar/search: type a company name, ticker or CIK to open its filing list, then filter by form type and date. For words inside documents, use EDGAR full-text search, which covers filings from 2001 onward. Programmers can use the free JSON APIs on data.sec.gov."
data_asof: "2026-10-15"
published: "2026-10-15"
updated: "2026-10-15"
order: 10
sources:
  - title: "SEC, EDGAR Full Text Search"
    url: "https://www.sec.gov/edgar/search/"
  - title: "SEC, EDGAR Application Programming Interfaces (data.sec.gov)"
    url: "https://www.sec.gov/search-filings/edgar-application-programming-interfaces"
  - title: "SEC, Accessing EDGAR Data (fair access and user-agent policy)"
    url: "https://www.sec.gov/os/accessing-edgar-data"
  - title: "SEC, Company ticker to CIK mapping file (JSON)"
    url: "https://www.sec.gov/files/company_tickers.json"
faq:
  - q: "Is SEC EDGAR free to use?"
    a: "Yes. Searching, reading and downloading filings on sec.gov is free and needs no account. Automated access must follow the SEC's fair-access policy, including a request-rate limit and a descriptive User-Agent header."
  - q: "How far back does EDGAR full-text search go?"
    a: "EDGAR full-text search covers electronic filings from 2001 onward. Older electronic filings, back to the mid-1990s, can still be found through the company filing lists."
  - q: "Why can't I find a company on EDGAR?"
    a: "It may file under a different legal name, file through a parent company, or not be an SEC registrant at all. Foreign companies often file Form 20-F or 40-F rather than 10-K, and private companies generally do not file periodic reports."
related: ["/guides/what-is-a-cik-and-accession-number/", "/guides/how-to-read-a-10-k/", "/forms/10-k/", "/companies/"]
---

EDGAR, the SEC's Electronic Data Gathering, Analysis and Retrieval system, holds the official filings of every U.S. public company and many other registrants. Everything on it is free. The hard part is knowing which of its several search tools to use for a given question. This guide walks through each one.

## Step 1: Find the company

Go to the **EDGAR search page** at sec.gov/edgar/search. The single search box accepts:

- a **company name** (partial names work, and suggestions appear as you type);
- a **ticker symbol**; or
- a **CIK**, the Central Index Key that EDGAR assigns to every filer.

Choosing a suggestion opens the company's filing page. That page lists recent filings newest first, with the form type, a short description, the filing date and links to the documents. It also shows the company's state of incorporation, fiscal year end, SIC industry code and business address. If the name you searched for does not appear, try the legal name: EDGAR uses the registrant's name, which may differ from the brand.

Each company page in our [companies index](/companies/) shows the company's CIK, the key that EDGAR uses for every lookup.

## Step 2: Filter by form type and date

On a company page you can narrow the list. Useful filters:

- **10-K** and **10-Q** for annual and quarterly reports;
- **8-K** for current reports of specific events;
- **DEF 14A** for the annual proxy statement;
- **4** for insider transactions by directors and officers;
- **SC 13D** and **SC 13G** (shown as SCHEDULE 13D/13G for newer filings) for large shareholders.

You can also filter by date range. To see everything a company filed in a particular week, set the dates and leave the form type blank.

## Step 3: Open the right document

Each filing has an **index page** listing every document in it: the main form, exhibits and, for financial reports, XBRL data files. The main document is usually first. For an 8-K, the press release is typically Exhibit 99.1. For a 10-K, look for exhibits such as 21 (subsidiaries) and the certifications labeled 31 and 32.

Many recent filings open in the **Inline XBRL viewer**, which lets you click a reported number to see its tagged concept and period. You can switch to the plain HTML version from the viewer menu.

## Step 4: Use full-text search for words inside filings

When the question is "which filings mention X?", use **EDGAR full-text search**, at the same sec.gov/edgar/search address. It searches the text of filings and exhibits from **2001** onward. You can:

- search an exact phrase by putting it in quotation marks;
- filter by form category, filer name or CIK, and filing date range;
- filter by the location of the company's principal office or state of incorporation.

Full-text search is how researchers find, for example, every 8-K that mentions a particular supplier or every risk-factor section that mentions a specific regulation. Results link straight to the matching document.

## Step 5: For data, use the APIs

The SEC publishes free JSON interfaces on **data.sec.gov**, with no API key:

- **Submissions** (`/submissions/CIK##########.json`): a company's identifying information and its recent filing history. The Filings Docket is built from this endpoint.
- **Company facts** and **company concept**: XBRL financial data reported across all of a company's filings.
- **Frames**: one reported concept for all companies for a given period.

The SEC also publishes a mapping file of tickers to CIKs. The SEC's fair-access policy asks automated users to stay at or below **10 requests per second** and to declare a **User-Agent** that identifies the requester with contact information. Requests that ignore the policy can be blocked.

## Common pitfalls

- **Filing date versus period.** A 10-Q filed in November covers a quarter that ended earlier. Check "period of report".
- **Amendments.** Forms ending in "/A" amend an earlier filing; read both.
- **Ticker changes.** Tickers can change or be reused; the CIK stays with the registrant.
- **Filer agents.** Some filings are submitted by agents; the accession number then begins with the agent's CIK. See our guide to [CIKs and accession numbers](/guides/what-is-a-cik-and-accession-number/).

## What EDGAR is not

EDGAR shows what companies filed, as filed. The SEC does not vouch for the accuracy of filings by publishing them. For analysis, read the [10-K](/guides/how-to-read-a-10-k/) itself, and remember that our plain-English summaries are a reading aid, not a substitute for the documents.
