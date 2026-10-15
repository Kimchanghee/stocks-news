---
title: "How to Read an 8-K Filing in Five Minutes, Step by Step"
description: "A practical method for reading any Form 8-K: decode the item numbers, find the event date, open the right exhibit and spot the rare items that signal real trouble."
h1: "How do you read an 8-K filing quickly?"
question: "How do you read an 8-K?"
answer: "Read an 8-K from the outside in: check the item numbers on the cover to learn what kind of event it is, note the event date, read the short narrative under each item, then open the exhibits listed under Item 9.01, where press releases and agreements carry the detail."
data_asof: "2026-10-15"
published: "2026-10-15"
updated: "2026-10-15"
order: 1
sources:
  - title: "SEC, Investor Bulletin: How to Read an 8-K (PDF)"
    url: "https://www.sec.gov/investor/pubs/readan8k.pdf"
  - title: "SEC, Form 8-K and General Instructions (PDF)"
    url: "https://www.sec.gov/files/form8-k.pdf"
  - title: "SEC, Exchange Act Form 8-K Compliance and Disclosure Interpretations"
    url: "https://www.sec.gov/rules-regulations/staff-guidance/compliance-disclosure-interpretations/exchange-act-form-8-k"
  - title: "SEC EDGAR filing records used in the examples (submissions API)"
    url: "https://www.sec.gov/search-filings/edgar-application-programming-interfaces"
faq:
  - q: "Where is the date of the event on an 8-K?"
    a: "On the cover page, labeled 'Date of Report (Date of earliest event reported)'. Compare it with the filing date to see how quickly the company reported."
  - q: "What is Exhibit 99.1 on an 8-K?"
    a: "Exhibit 99.1 is usually the press release attached to the filing, such as an earnings release under Item 2.02 or an announcement under Item 7.01 or 8.01."
  - q: "What is an 8-K/A?"
    a: "An amendment to a previously filed 8-K. Companies use it to add information that was not available at first, such as financial statements of an acquired business, or to correct the original."
related: ["/forms/8-k/", "/guides/earnings-8-k-item-2-02/", "/guides/8-k-item-1-05-cybersecurity-incidents/", "/"]
---

Form 8-K is the SEC filing most likely to contain news. It is also the filing most often misread, because headlines tend to describe an 8-K without saying which item it was filed under. With a short routine, you can read any 8-K in a few minutes and know whether it matters.

## Step 1: Read the item numbers before anything else

Every 8-K lists one or more item numbers on its cover and as section headings. The item tells you what category of event the company is reporting. EDGAR also stores the item numbers as data, which is how our [filings docket](/) can say "released earnings" or "executive or board change" next to each 8-K without anyone reading it first.

Two examples from the filings in our snapshot show the pattern. Apple's 8-K filed July 30, 2026 listed Items 2.02 and 9.01: a results release with the press release attached as an exhibit. NVIDIA's 8-K filed August 17, 2026 listed Items 1.01, 2.03 and 7.01: a material agreement, a new direct financial obligation, and a Regulation FD disclosure, a combination that typically accompanies a debt offering or credit agreement.

The full list of item meanings is on our [Form 8-K explainer](/forms/8-k/). In practice, three groups cover almost everything:

- **Routine and expected**: 2.02 (results), 5.07 (shareholder vote results), 7.01 (Regulation FD), 9.01 (exhibits).
- **Significant but common**: 1.01 (material agreement), 2.03 (new debt), 5.02 (director or officer changes), 8.01 (other events).
- **Rare and usually serious**: 1.03 (bankruptcy), 1.05 (material cybersecurity incident), 3.01 (listing problems), 4.01 (auditor change), 4.02 (financial statements should not be relied on).

## Step 2: Compare the event date with the filing date

The cover page shows the "Date of Report (Date of earliest event reported)". The filing date is in the EDGAR header. Most items must be filed within four business days of the event, so a gap longer than that deserves a second look, although some items have different triggers. For Item 2.02 the trigger is the public announcement, and for Item 1.05 it is the company's determination that a cyber incident is material.

## Step 3: Read the narrative under each item

The text under each item is usually short, sometimes a single paragraph. It states what happened, when, and the essential terms. For Item 5.02, it names the director or officer and says whether they resigned, retired, were removed or were appointed, and sometimes whether a departure involved a disagreement with the company. For Item 1.01, it summarizes the agreement's parties and key terms.

The SEC's investor bulletin on reading an 8-K points out that companies may voluntarily report events under Item 8.01 that the form does not strictly require. An 8.01 filing is the company's choice to put something on the record, which can itself be informative.

## Step 4: Open the exhibits

Item 9.01 lists the exhibits. The substance is often there rather than in the body:

| Exhibit | Usually contains |
|---|---|
| 99.1 | Press release, such as an earnings announcement |
| 10.x | Material contracts, including employment and credit agreements |
| 4.x | Instruments defining security holders' rights, such as indentures for new notes |
| 3.x | Amended articles of incorporation or bylaws |
| 104 | Cover page interactive data file (inline XBRL) |

For an earnings 8-K, Exhibit 99.1 is where you find the income statement summary, guidance and any non-GAAP reconciliation. Our guide to [earnings releases under Item 2.02](/guides/earnings-8-k-item-2-02/) explains how to read that exhibit against the later 10-Q.

## Step 5: Check for amendments and follow-ups

An 8-K/A amends an earlier 8-K. After an acquisition reported under Item 2.01, for instance, the company may have up to 71 calendar days after the initial report's due date to file the acquired business's financial statements by amendment. A cybersecurity 8-K under Item 1.05 may be followed by an amendment once more information is available. On EDGAR, open the company's filing list and look for 8-K/A entries after the original.

## Common misreadings to avoid

**"Furnished" does not mean less important.** Item 2.02 and Item 7.01 information is furnished rather than filed, which affects legal liability under Section 18 of the Exchange Act, not significance.

**Item 5.02 is not always a departure.** It also covers new appointments and changes to officer compensation arrangements.

**Item 8.01 is not a single topic.** It is a catch-all. Read the text before drawing conclusions.

**An 8-K is not a complete picture.** The 10-Q and 10-K that follow contain the full financial statements and notes. Use the [due-date calendar](/calendar/) to see when the next periodic report for a company is expected.

## A five-minute checklist

1. Item numbers: routine, significant or rare?
2. Event date versus filing date.
3. Narrative under each item.
4. Exhibits under Item 9.01, especially 99.1 and 10.x.
5. Any 8-K/A that follows.

That routine works for a startup's first 8-K and for the dozens filed each week by the [100 companies on our docket](/companies/).
