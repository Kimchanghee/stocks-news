import type { APIRoute } from 'astro';
import { site } from '../site.config';
import { allArticles } from '../lib/content';
import { snapshot, companies, companyPath, nameOf, docket } from '../lib/data';
import { fmtDate } from '../lib/sec';

export const GET: APIRoute = async () => {
  const arts = await allArticles();
  const forms = arts.filter((a) => a.kind === 'form');
  const guides = arts.filter((a) => a.kind === 'guide');
  const d = docket(7);
  const lines = [
    `# ${site.name} (${site.domain})`,
    '',
    `> ${site.description}`,
    '',
    `Last updated: ${snapshot.asOf} (EDGAR snapshot date; data as of ${fmtDate(snapshot.asOf)}).`,
    '',
    `Filing data: ${snapshot.source}, snapshot dated ${fmtDate(snapshot.asOf)} (${snapshot.sourceUrl}). ${d.length} docket entries in the 7 days ending ${fmtDate(snapshot.asOf)}. Not investment advice; the SEC document is the authoritative record. Independent, not affiliated with the SEC.`,
    '',
    '## Core pages',
    `- [This week's filings docket](${site.url}/): filings from ${companies.length} large U.S. companies, grouped by day and form, with plain-English meaning and links to SEC.gov`,
    `- [10-Q and 10-K due-date calendar](${site.url}/calendar/): projected next periodic report windows computed from SEC deadline rules and each company's filing history`,
    `- [Company filing records](${site.url}/companies/): ${companies.length} companies with recent filings, filing-lag history and next-report projection`,
    `- [Methodology and sources](${site.url}/methodology/)`,
    `- [About](${site.url}/about/)`,
    '',
    '## Form explainers',
    ...forms.map((a) => `- [${a.data.h1}](${site.url}${a.path}): ${a.data.answer}`),
    '',
    '## Guides',
    ...guides.map((a) => `- [${a.data.h1}](${site.url}${a.path}): ${a.data.answer}`),
    '',
    '## Company records',
    ...companies.map((c) => `- [${nameOf(c)} (${c.ticker})](${site.url}${companyPath(c)})`),
    '',
    '## Optional',
    `- [Full text of guides and explainers](${site.url}/llms-full.txt)`,
    `- [RSS feed](${site.url}/feed.xml)`,
    `- [Contact](${site.url}/contact/): ${site.contactEmail}`,
    '',
  ];
  return new Response(lines.join('\n'), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
