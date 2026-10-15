---
title: "Form 4 Explained: Insider Trades, Codes and the 2-Day Rule"
description: "What a Form 4 insider filing reports, who files it within two business days, how to read codes like P, S, A, M and F, and what the 10b5-1 checkbox means."
h1: "What does a Form 4 insider filing tell you?"
question: "What is a Form 4 filing?"
answer: "A Form 4 reports a change in a company insider's ownership of the company's stock. Directors, officers and holders of more than 10% must file it within two business days of most transactions, and each line uses a code that shows whether the shares were bought, sold, granted, exercised or withheld for tax."
data_asof: "2026-10-15"
published: "2026-10-15"
updated: "2026-10-15"
form: "Form 4"
match: "^(3|4|5|144)(/A)?$"
order: 6
sources:
  - title: "SEC, Form 4 and General Instructions (PDF)"
    url: "https://www.sec.gov/files/form4.pdf"
  - title: "SEC, Investor Bulletin: Insider Transactions and Forms 3, 4, and 5 (PDF)"
    url: "https://www.sec.gov/files/forms-3-4-5.pdf"
  - title: "SEC press release 2022-222: Rule 10b5-1 amendments"
    url: "https://www.sec.gov/newsroom/press-releases/2022-222"
  - title: "SEC, Form 144 (PDF)"
    url: "https://www.sec.gov/files/form144.pdf"
faq:
  - q: "Who has to file a Form 4?"
    a: "Officers and directors of the company and beneficial owners of more than 10% of a class of its registered equity securities, under Section 16 of the Securities Exchange Act."
  - q: "Does a Form 4 sale mean the insider is bearish?"
    a: "Not necessarily. Many sales are made under pre-arranged Rule 10b5-1 plans or to cover taxes on vesting stock awards (code F). The transaction code and the 10b5-1 checkbox give context."
  - q: "What is the difference between Form 4 and Form 144?"
    a: "Form 4 reports a completed change in an insider's holdings. Form 144 is a notice of a proposed sale of restricted or control securities by an affiliate, filed when sales exceed 5,000 shares or $50,000 in three months."
related: ["/guides/rule-10b5-1-plans-and-insider-sales/", "/forms/schedule-13d-13g/", "/guides/how-to-search-sec-edgar/", "/forms/8-k/"]
---

Section 16 of the Securities Exchange Act of 1934 requires a company's insiders to report their holdings and trades publicly. "Insiders" here has a specific meaning: directors, officers (as defined in Rule 16a-1(f)) and anyone who beneficially owns more than 10% of a class of the company's registered equity securities. They use three forms: Form 3 when they become an insider, Form 4 when their holdings change, and Form 5 for an annual catch-up of certain exempt transactions.

## How fast is a Form 4 filed?

Since the Sarbanes-Oxley Act of 2002, most changes in beneficial ownership must be reported on Form 4 **before the end of the second business day** after the transaction. Form 3 is due within 10 days of becoming an insider, and Form 5 within 45 days after the company's fiscal year end. Because filings are this fast, Form 4s are the most frequent filings for many large companies; on our [home docket](/) they are grouped by company and day so they do not bury other filings.

## How do you read the table?

A Form 4 has two tables. **Table I** covers non-derivative securities, mainly common stock. **Table II** covers derivative securities such as options and restricted stock units. Each row has a transaction date, a transaction code, the number of shares, whether they were acquired (A) or disposed of (D), the price, and the amount owned after the transaction.

The transaction code is the key to interpretation:

| Code | Meaning |
|---|---|
| P | Open-market or private purchase |
| S | Open-market or private sale |
| A | Grant or award from the company |
| M | Exercise or conversion of a derivative security, such as an option |
| F | Shares withheld or delivered to pay the exercise price or tax on vesting |
| G | Gift |
| D | Disposition to the company |
| C | Conversion of a derivative security |
| J | Other acquisition or disposition, explained in a footnote |

A cluster of code P purchases by several directors is the kind of signal investors watch for. Code F rows are mechanical: when restricted stock vests, the company withholds shares to cover tax, and that shows up as a disposition even though the insider made no decision to sell.

## What is the 10b5-1 checkbox?

Rule 10b5-1 lets insiders set up a written trading plan in advance, while they do not hold material non-public information, so later trades can proceed on schedule. The SEC's December 2022 amendments (press release 2022-222) added a cooling-off period before trades can start under a new plan and a checkbox on Forms 4 and 5 that the filer ticks when a reported transaction was made under a plan intended to satisfy Rule 10b5-1(c). Our guide to [10b5-1 plans and insider sales](/guides/rule-10b5-1-plans-and-insider-sales/) explains the cooling-off periods in detail.

## Where does Form 144 fit?

Form 144 is a notice, not a report of a completed trade. An affiliate who plans to sell restricted or control securities under Rule 144 must file it when the sale exceeds 5,000 shares or $50,000 in aggregate sale price within three months. Form 144 filings have been submitted electronically on EDGAR since April 2023, which is why they now appear on company filing lists. A Form 144 is often followed by the related Form 4 once the sale is executed.

## Reading insider activity sensibly

Count purchases and sales separately, check the codes, and read the footnotes, which often state that a sale was made under a 10b5-1 plan adopted on a specific date. Compare the size of a sale with the insider's remaining holdings in the "amount owned following" column. For a broader picture of who owns large stakes, see [Schedules 13D and 13G](/forms/schedule-13d-13g/).
