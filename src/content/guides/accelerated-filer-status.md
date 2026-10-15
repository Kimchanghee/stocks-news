---
title: "Large Accelerated Filer Status: Thresholds and SEC Deadlines"
description: "How the SEC sorts companies into large accelerated, accelerated and non-accelerated filers by public float and revenue, and how that sets 10-K and 10-Q dates."
h1: "What is a large accelerated filer, and why does it matter?"
question: "What is a large accelerated filer?"
answer: "A large accelerated filer is a U.S. reporting company with a public float of $700 million or more, measured on the last business day of its second fiscal quarter, that has reported for at least 12 months. It must file its 10-K within 60 days of year end and each 10-Q within 40 days."
data_asof: "2026-10-15"
published: "2026-10-15"
updated: "2026-10-15"
order: 9
sources:
  - title: "eCFR, 17 CFR 240.12b-2 Definitions (accelerated filer and large accelerated filer)"
    url: "https://www.ecfr.gov/current/title-17/section-240.12b-2"
  - title: "SEC, Final Rule: Accelerated Filer and Large Accelerated Filer Definitions, Release No. 34-88365 (PDF)"
    url: "https://www.sec.gov/files/rules/final/2020/34-88365.pdf"
  - title: "SEC, Form 10-K General Instructions (PDF)"
    url: "https://www.sec.gov/files/form10-k.pdf"
  - title: "SEC, Form 10-Q General Instructions (PDF)"
    url: "https://www.sec.gov/files/form10-q.pdf"
faq:
  - q: "What is public float?"
    a: "The aggregate market value of a company's voting and non-voting common equity held by non-affiliates, meaning shareholders other than officers, directors and controlling holders. Companies report it on the 10-K cover."
  - q: "Where can I see a company's filer status?"
    a: "On the cover page of its 10-K or 10-Q, where it checks one box: large accelerated filer, accelerated filer, non-accelerated filer, and separately smaller reporting company or emerging growth company."
  - q: "Does filer status affect the audit?"
    a: "Yes. Accelerated and large accelerated filers need an auditor's attestation report on internal control over financial reporting under Section 404(b) of the Sarbanes-Oxley Act. Non-accelerated filers do not."
related: ["/guides/10-q-10-k-filing-deadlines/", "/calendar/", "/forms/10-k/", "/forms/10-q/"]
---

Every 10-K and 10-Q cover page contains a row of check boxes that most readers skip: large accelerated filer, accelerated filer, non-accelerated filer, smaller reporting company, emerging growth company. That one box decides how many days the company has to file, whether its auditor must test internal controls, and how our [due-date calendar](/calendar/) projects its next report.

## How does the SEC define each status?

The definitions are in **Rule 12b-2** under the Securities Exchange Act. Both accelerated categories require that, at the end of its fiscal year, the company:

- has been subject to Exchange Act reporting (Section 13(a) or 15(d)) for at least **12 calendar months**;
- has filed at least **one annual report**; and
- is **not eligible** to use the smaller-reporting-company **revenue test** (explained below).

Within that group, the split is by **public float**, measured as of the **last business day of the most recently completed second fiscal quarter**:

| Status | Public float | 10-K due | 10-Q due |
| --- | --- | --- | --- |
| Large accelerated filer | $700 million or more | 60 days | 40 days |
| Accelerated filer | $75 million to under $700 million | 75 days | 40 days |
| Non-accelerated filer | Everyone else | 90 days | 45 days |

Deadlines are counted in calendar days after the fiscal year or quarter end. When a deadline lands on a weekend or federal holiday, it moves to the next business day.

## What is the revenue test?

In 2020 the SEC amended the definitions (Release No. 34-88365) so that a company eligible to be a smaller reporting company under the **revenue test**, broadly one with annual revenues of less than **$100 million** and a public float below **$700 million**, is excluded from the accelerated filer categories. Many small biotechnology companies, for example, have floats above $75 million but little revenue, and the amendment moved them to non-accelerated status, removing the auditor attestation requirement on internal controls.

## How does a company move between categories?

Status is reassessed at the end of each fiscal year, but the thresholds for leaving a category are lower than for entering it, to avoid companies flipping back and forth:

- A large accelerated filer stays one unless its public float falls **below $560 million**.
- An accelerated filer stays in the accelerated categories unless its float falls **below $60 million**, or it becomes eligible under the SRC revenue test.

The change takes effect for the annual report for that fiscal year, so the 10-K cover reflects the newly determined status.

## Why does filer status matter to readers?

**Timing.** For a calendar-year large accelerated filer, the 10-K is typically due around March 1 (60 days after December 31, or the next business day). A non-accelerated filer with the same year end has until about March 31. If you are waiting for a company's annual report, check its status first.

**Auditor attestation on internal control.** Section 404(b) of the Sarbanes-Oxley Act requires accelerated and large accelerated filers to include an auditor's report on the effectiveness of internal control over financial reporting. Non-accelerated filers include management's own assessment under Section 404(a) but not the auditor's attestation.

**Other privileges.** Large accelerated filers that are "well-known seasoned issuers" (a separate test under Rule 405) get automatic shelf registration. That status is related but not identical.

## How we use filer status on the docket

The 100 companies on the docket are taken from the top of the SEC's published ticker list, keeping domestic operating companies that file 10-K reports. For each, our [company pages](/companies/) read the filer category from the SEC's own submissions data and apply the matching deadline (60/40, 75/40 or 90/45 days), then roll the date forward past weekends and federal holidays. The projected window is a calculation from public rules and past filing dates, not a company announcement; companies routinely file before the deadline, and our lag charts show how far ahead each one usually is.

If a company misses a deadline, look for a [late filing notice](/guides/nt-10-k-late-filing-notice/) on Form 12b-25.
