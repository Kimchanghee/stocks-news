# Design references: The Filings Docket (stockmarketnews.online)

## Metaphor
A court docket / wire-room register of official documents. The page is a paper register: numbered entries,
inked horizontal rules, rubber-stamp form codes (8-K, 10-Q, 4), "In re:" captions on company records and
a double-rule masthead. Nothing is a card; hierarchy comes from rules, type weight, numbering and density.

## Tokens (src/styles/docket.css)
| Token | Value | Use |
|---|---|---|
| `--paper` / `--paper-2` | `#f4f1e8` / `#ebe6d8` | register paper, alternate band |
| `--ink` / `--ink-2` / `--ink-3` | `#16140f` / `#3f3a31` / `#5e574a` | text, secondary, meta (all AA on paper) |
| `--rule` / `--hair` | `#16140f` / `#c9c1ad` | heavy docket rules / hairline row rules |
| `--stamp` / `--stamp-bg` | `#9b1c1c` / `#f6e6df` | rubber-stamp form codes, stale notices |
| `--marker` | `#efe1a6` | highlighter for the direct answer |
| `--link` | `#14306b` | links (underlined, AA) |
| `--focus` | `#0b57d0` | 3 px focus outline |

Type: Source Serif 4 (variable, OFL, self-hosted via @fontsource) for reading text and headings;
IBM Plex Mono (OFL, self-hosted) for dates, CIKs, accession numbers, counts and stamps (tabular numerals).
Scale 1.2 ratio from a 17 px base (`--t-xs` 0.78rem ... `--t-xxl` 2.75rem). Measure 68ch. Max column 1240 px.

## Layout and components
- Masthead: mono dateline strip + serif wordmark + text nav, closed by a double rule.
- Caption block (kicker / H1 / dated meta on the right) like a case caption; direct answer set on a marker band.
- Register: day-grouped numbered entries with stamp, company, plain-English meaning and SEC links.
- Native radio filter (fieldset/legend) with live status text; native search input on the calendar.
- Lag charts: build-time inline SVG, fixed aspect ratio (no CLS), text table equivalent.
- Ad slots reserved with fixed min-height and an "Advertisement" label.

## Principles borrowed (no code copied)
- GOV.UK Design System, "Make it accessible / do the hard work to make it simple" principles and focus-state
  guidance: https://design-system.service.gov.uk/ (MIT for code, OGL v3 for content). Used: visible 3 px focus,
  plain-language labels, native controls.
- U.S. Web Design System typography guidance on measure and line height: https://designsystem.digital.gov/components/typography/
  (public domain, CC0). Used: 45–75 character measure, 1.5+ line height for body text.
- Fonts: Source Serif 4 (SIL OFL 1.1, https://github.com/adobe-fonts/source-serif), IBM Plex Mono
  (SIL OFL 1.1, https://github.com/IBM/plex).

## Deliberately avoided
Gradient hero, glass blur, neon, rounded cards, pill chips, decorative metric tiles, hover-lift, stock imagery,
fake testimonials. Motion is limited to none; `prefers-reduced-motion` is respected by default.
