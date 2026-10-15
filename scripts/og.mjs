// Build-time Open Graph images (1200x630 PNG) rendered from SVG with resvg.
// Writes to public/og/ (gitignored); runs before `astro build`.
import { readFile, writeFile, mkdir, readdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { Resvg } from '@resvg/resvg-js';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUT = path.join(ROOT, 'public', 'og');
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

function wrap(text, max) {
  const words = String(text).split(/\s+/);
  const lines = [];
  let cur = '';
  for (const w of words) {
    if ((cur + ' ' + w).trim().length > max) { if (cur) lines.push(cur); cur = w; } else cur = (cur + ' ' + w).trim();
  }
  if (cur) lines.push(cur);
  return lines;
}

function svg({ kicker, title, stamp, meta }) {
  const lines = wrap(title, 30).slice(0, 4);
  const size = lines.length > 3 ? 58 : 66;
  const titleSvg = lines.map((l, i) => `<text x="80" y="${250 + i * (size + 12)}" font-family="Georgia, 'DejaVu Serif', serif" font-weight="700" font-size="${size}" fill="#16140f">${esc(l)}</text>`).join('');
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#f4f1e8"/>
  <rect x="40" y="40" width="1120" height="550" fill="none" stroke="#16140f" stroke-width="2"/>
  <line x1="80" y1="128" x2="1120" y2="128" stroke="#16140f" stroke-width="2"/>
  <line x1="80" y1="134" x2="1120" y2="134" stroke="#16140f" stroke-width="2"/>
  <text x="80" y="108" font-family="Consolas, 'DejaVu Sans Mono', monospace" font-size="24" letter-spacing="3" fill="#16140f">THE FILINGS DOCKET · STOCKMARKETNEWS.ONLINE</text>
  <text x="80" y="182" font-family="Consolas, 'DejaVu Sans Mono', monospace" font-size="24" letter-spacing="2" fill="#9b1c1c">${esc(kicker.toUpperCase())}</text>
  ${titleSvg}
  ${stamp ? `<rect x="${1120 - 30 - stamp.length * 22}" y="470" width="${30 + stamp.length * 22}" height="64" fill="#f6e6df" stroke="#9b1c1c" stroke-width="3"/>
  <text x="${1120 - 15 - stamp.length * 22 / 1}" y="514" font-family="Consolas, 'DejaVu Sans Mono', monospace" font-weight="700" font-size="36" fill="#9b1c1c">${esc(stamp)}</text>` : ''}
  <line x1="80" y1="556" x2="1120" y2="556" stroke="#c9c1ad" stroke-width="1"/>
  <text x="80" y="580" font-family="Consolas, 'DejaVu Sans Mono', monospace" font-size="20" fill="#3f3a31">${esc(meta)}</text>
</svg>`;
}

async function frontmatterTitles(dir) {
  const out = [];
  let files = [];
  try { files = await readdir(dir); } catch { return out; }
  for (const f of files.filter((x) => x.endsWith('.md'))) {
    const src = await readFile(path.join(dir, f), 'utf8');
    const fm = src.split('---')[1] ?? '';
    const get = (k) => (fm.match(new RegExp(`^${k}:\\s*["']?(.+?)["']?\\s*$`, 'm')) ?? [])[1] ?? '';
    out.push({ slug: f.replace(/\.md$/, ''), title: get('h1') || get('title'), form: get('form') });
  }
  return out;
}

async function main() {
  await mkdir(path.join(OUT, 'company'), { recursive: true });
  await mkdir(path.join(OUT, 'guides'), { recursive: true });
  await mkdir(path.join(OUT, 'forms'), { recursive: true });
  const data = JSON.parse(await readFile(path.join(ROOT, 'src', 'data', 'companies.json'), 'utf8'));
  const asOf = data.asOf;
  const jobs = [
    { file: 'home.png', kicker: `Docket as of ${asOf}`, title: 'What did large U.S. companies file with the SEC this week?', stamp: '8-K', meta: 'SEC EDGAR filings from 100 companies, explained in plain English' },
    { file: 'calendar.png', kicker: `Projected from filings as of ${asOf}`, title: 'When are the next 10-Q and 10-K reports due?', stamp: '10-Q', meta: 'Due dates computed from SEC deadlines and each company\'s own filing history' },
    { file: 'companies.png', kicker: 'Watchlist', title: '100 large U.S. companies and their SEC filing records', stamp: 'CIK', meta: 'Recent filings, cadence and next expected report' },
    { file: 'forms.png', kicker: 'Form explainers', title: 'What each SEC form means, in plain English', stamp: 'FORM', meta: '8-K, 10-K, 10-Q, S-1, 13D/13G, Form 4, DEF 14A' },
    { file: 'guides.png', kicker: 'Guides', title: 'How to read corporate filings, sourced to SEC.gov', stamp: 'SEC', meta: 'Plain-English guides with dated sources' },
    { file: 'site.png', kicker: 'stockmarketnews.online', title: 'Corporate filings, explained', stamp: 'EDGAR', meta: 'Independent; not affiliated with the SEC. Not investment advice.' },
  ];
  for (const c of data.companies) {
    const slug = c.ticker.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    jobs.push({ file: `company/${slug}.png`, kicker: `${c.ticker} · CIK ${c.cik}`, title: `${c.name}: SEC filings and next report window`, stamp: c.ticker, meta: `EDGAR snapshot ${asOf}` });
  }
  for (const g of await frontmatterTitles(path.join(ROOT, 'src', 'content', 'guides'))) {
    jobs.push({ file: `guides/${g.slug}.png`, kicker: 'Guide', title: g.title, stamp: '', meta: 'Sourced to SEC.gov · stockmarketnews.online' });
  }
  for (const g of await frontmatterTitles(path.join(ROOT, 'src', 'content', 'forms'))) {
    jobs.push({ file: `forms/${g.slug}.png`, kicker: 'Form explainer', title: g.title, stamp: g.form || '', meta: 'Sourced to SEC.gov · stockmarketnews.online' });
  }
  for (const j of jobs) {
    const png = new Resvg(svg(j), { fitTo: { mode: 'width', value: 1200 }, font: { loadSystemFonts: true, defaultFontFamily: 'Georgia' } }).render().asPng();
    await writeFile(path.join(OUT, j.file), png);
  }
  console.log(`[og] ${jobs.length} images`);
}
main().catch((e) => { console.error('[og] failed', e); process.exit(1); });
