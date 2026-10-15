---
title: "10-Q and 10-K Filing Deadlines by Filer Status, Explained"
description: "When are 10-Q and 10-K reports due? The 40, 45, 60, 75 and 90-day SEC deadlines by filer status, the weekend and holiday rule, and what a late NT filing means."
h1: "When are 10-Q and 10-K reports due?"
question: "When are 10-Q and 10-K reports due?"
answer: "A 10-Q is due 40 days after quarter end for large accelerated and accelerated filers and 45 days for others. A 10-K is due 60 days after fiscal year end for large accelerated filers, 75 days for accelerated filers and 90 days for everyone else; weekend or holiday deadlines roll to the next business day."
data_asof: "2026-10-15"
published: "2026-10-15"
updated: "2026-10-15"
order: 2
sources:
  - title: "SEC, Form 10-Q General Instruction A.1 (PDF)"
    url: "https://www.sec.gov/files/form10-q.pdf"
  - title: "SEC, Form 10-K General Instruction A (PDF)"
    url: "https://www.sec.gov/files/form10-k.pdf"
  - title: "eCFR, 17 CFR 240.0-3 (filing on weekends and holidays)"
    url: "https://www.ecfr.gov/current/title-17/section-240.0-3"
  - title: "eCFR, 17 CFR 240.12b-25 (notification of late filing)"
    url: "https://www.ecfr.gov/current/title-17/section-240.12b-25"
  - title: "U.S. Office of Personnel Management, federal holidays"
    url: "https://www.opm.gov/policy-data-oversight/pay-leave/federal-holidays/"
faq:
  - q: "Is the 40-day 10-Q deadline counted in calendar days or business days?"
    a: "Calendar days after the end of the fiscal quarter. Only the final due date is moved if it falls on a Saturday, Sunday or federal holiday."
  - q: "When is a calendar-year large company's third-quarter 10-Q due in 2026?"
    a: "Forty days after September 30, 2026 is November 9, 2026, a Monday, so that is the deadline for large accelerated and accelerated filers."
  - q: "What happens if a company misses the deadline?"
    a: "It can file Form 12b-25 (NT 10-Q or NT 10-K) within one business day after the due date to get 5 extra calendar days for a 10-Q or 15 for a 10-K. Missing deadlines can also affect eligibility for short-form registration on Form S-3."
related: ["/calendar/", "/guides/accelerated-filer-status/", "/guides/nt-10-k-late-filing-notice/", "/forms/10-q/"]
---

Periodic report deadlines look simple, but three things change the answer: the company's filer status, the type of report and the calendar. This guide sets out the rules from the SEC's form instructions and shows how our [due-date calendar](/calendar/) applies them to each company we follow.

## The deadline table

| Filer status | Form 10-Q (quarters 1 to 3) | Form 10-K (fiscal year) |
|---|---|---|
| Large accelerated filer | 40 days | 60 days |
| Accelerated filer | 40 days | 75 days |
| Non-accelerated filer | 45 days | 90 days |

The 10-Q deadlines come from General Instruction A.1 of Form 10-Q and the 10-K deadlines from General Instruction A of Form 10-K. Days are counted from the last day of the fiscal period. Filer status is determined once a year from the company's public float; our guide to [filer status](/guides/accelerated-filer-status/) explains the thresholds.

## Weekends and federal holidays

Exchange Act Rule 0-3 provides that when the last day for filing falls on a Saturday, Sunday or federal holiday, the filing may be made on the next business day. EDGAR does not accept filings on those days. Federal holidays are those set by statute and listed by the Office of Personnel Management, including the observed date when a holiday falls on a weekend.

Two worked examples for 2026:

- A large company with a September 30, 2026 quarter end: 40 days later is **November 9, 2026**, a Monday and not a holiday, so the 10-Q is due that day.
- A large company with a fiscal year ending September 26, 2026 (a 52/53-week year, common in technology and retail): 60 days later is **November 25, 2026**, a Wednesday, so the 10-K is due that day.

Our calendar computes these dates in code and rolls them forward past weekends and the federal holidays for 2026 to 2028.

## Why most large companies file early

Deadlines are maximums. Large companies often file their 10-Q within a day or two of their earnings release, which can be weeks before the deadline. Apple, for example, filed its 10-Q for the quarter ended June 27, 2026 on July 31, 2026, 34 days after quarter end and one day after its Item 2.02 earnings 8-K. Patterns like this are stable from quarter to quarter, which is why our calendar uses each company's own recent history to project an expected window, capped at the legal deadline.

Each [company page](/companies/) shows that history as a chart: the bar for each 10-Q or 10-K is the number of days from period end to filing, with the deadline marked.

## What about 52/53-week fiscal years?

Many retailers and technology companies end their fiscal year on the same weekday each year (for example, the last Saturday of September) rather than on a fixed date. Their quarters are usually 13 weeks long, with a 14-week quarter added every five or six years. The deadline is still counted from the actual period end. Because the next period end is not always predictable to the day from outside the company, our calendar marks it as an estimate.

## The fourth quarter

There is no 10-Q for the fourth fiscal quarter. The 10-K covers the full year, so the next report after a company's third-quarter 10-Q is its 10-K, with the longer deadline.

## What if a company cannot file on time?

Rule 12b-25 lets a company file a notification of late filing (Form 12b-25, shown on EDGAR as NT 10-Q or NT 10-K) no later than one business day after the due date. If the company states that the reason for the delay could not be eliminated without unreasonable effort or expense and files the report within the extension, the report is treated as timely: five calendar days for a 10-Q and 15 calendar days for a 10-K. See our guide to [NT late filing notices](/guides/nt-10-k-late-filing-notice/) for what these filings usually signal.

## Other deadlines that interact with periodic reports

- **Proxy statement and Part III.** A 10-K can incorporate Part III (directors, compensation, ownership) from a proxy statement filed within 120 days after fiscal year end.
- **Form 8-K.** Most 8-K items are due within four business days of the event; earnings releases under Item 2.02 often come shortly before the 10-Q.

## Using the calendar

The [10-Q and 10-K due-date calendar](/calendar/) lists the next periodic report for each of the 100 companies on our docket with three dates: the estimated period end, the expected window from the company's own history, and the SEC deadline. When a company has closed a period but its usual window has passed without a filing, the calendar flags it as "later than usual". That is a prompt to check EDGAR, not a conclusion that anything is wrong.
