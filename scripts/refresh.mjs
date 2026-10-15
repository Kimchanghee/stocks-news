// Refresh SEC EDGAR snapshot -> src/data/companies.json
// Fair-access rules: descriptive User-Agent with contact, <= 10 requests/second (we use ~7/s).
// On any failure we keep the last good snapshot (whole file or per-company entry). Values are never invented.
import { readFile, writeFile, rename, mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUT = path.join(ROOT, 'src', 'data', 'companies.json');
const UA = 'stockmarketnews.online filings desk contact@stockmarketnews.online';
const TICKERS_URL = 'https://www.sec.gov/files/company_tickers.json';
const SUB_URL = (cik) => `https://data.sec.gov/submissions/CIK${String(cik).padStart(10, '0')}.json`;
const TARGET = 100;
const MAX_CANDIDATES = 170;
const SPACING_MS = 150;

const MATERIAL = new Set(['10-K', '10-K/A', '10-Q', '10-Q/A', '8-K', '8-K/A', 'DEF 14A', 'DEFA14A', 'PRE 14A', 'S-1', 'S-1/A', 'S-3', 'S-3ASR', 'S-4', 'S-8',
  'SC 13D', 'SC 13D/A', 'SC 13G', 'SC 13G/A', 'SCHEDULE 13D', 'SCHEDULE 13D/A', 'SCHEDULE 13G', 'SCHEDULE 13G/A',
  'NT 10-K', 'NT 10-Q', '11-K', '10-KT', 'ARS', '25-NSE', '15-12B', 'SD']);
const INSIDER = new Set(['3', '4', '5', '3/A', '4/A', '5/A', '144']);
// High-volume debt/structured-note paperwork: counted, not listed individually.
const COUNT_ONLY = /^(424B\d|FWP)$/;

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
let last = 0;
async function get(url, tries = 3) {
  for (let i = 1; i <= tries; i++) {
    const wait = last + SPACING_MS - Date.now();
    if (wait > 0) await sleep(wait);
    last = Date.now();
    try {
      const res = await fetch(url, { headers: { 'User-Agent': UA, Accept: 'application/json' }, signal: AbortSignal.timeout(20000) });
      if (res.status === 429 || res.status >= 500) throw new Error('HTTP ' + res.status);
      if (!res.ok) { const e = new Error('HTTP ' + res.status); e.fatal = true; throw e; }
      return await res.json();
    } catch (e) {
      if (e.fatal || i === tries) throw e;
      await sleep(1000 * i * i);
    }
  }
}

const daysBetween = (a, b) => Math.round((Date.parse(b) - Date.parse(a)) / 86400000);

function trimFilings(recent, asOfDate) {
  const out = [];
  const counts = {};
  for (let i = 0; i < recent.accessionNumber.length; i++) {
    const form = recent.form[i];
    const filed = recent.filingDate[i];
    const age = daysBetween(filed, asOfDate);
    const periodic = ['10-K', '10-Q', '10-K/A', '10-Q/A', '10-KT'].includes(form);
    if (age <= 45) counts[form] = (counts[form] ?? 0) + 1;
    if (COUNT_ONLY.test(form)) continue;
    if (INSIDER.has(form)) { if (age > 45) continue; }
    else if (!(age <= 45 || (periodic && age <= 1200) || (MATERIAL.has(form) && age <= 400))) continue;
    out.push({
      acc: recent.accessionNumber[i], form, filed, period: recent.reportDate[i] || '',
      accepted: recent.acceptanceDateTime[i] || '', items: recent.items[i] || '',
      doc: recent.primaryDocument[i] || '', desc: recent.primaryDocDescription[i] || '',
    });
  }
  return { filings: out, counts45: counts };
}

async function main() {
  let previous = null;
  try { previous = JSON.parse(await readFile(OUT, 'utf8')); } catch { /* first run */ }
  const prevByCik = new Map((previous?.companies ?? []).map((c) => [c.cik, c]));
  const asOfDate = new Date().toISOString().slice(0, 10);

  let tickers;
  try { tickers = Object.values(await get(TICKERS_URL)); }
  catch (e) {
    console.error('[refresh] company_tickers.json failed:', e.message, '- keeping last good snapshot', previous?.asOf ?? '(none)');
    process.exit(previous ? 0 : 1);
  }
  const seen = new Set();
  const candidates = [];
  for (const t of tickers) {
    if (!seen.has(t.cik_str)) { seen.add(t.cik_str); candidates.push(t); }
    if (candidates.length >= MAX_CANDIDATES) break;
  }

  const companies = [];
  let fetched = 0, reused = 0, skipped = 0;
  for (const [rank, t] of candidates.entries()) {
    if (companies.length >= TARGET) break;
    const cik = String(t.cik_str).padStart(10, '0');
    try {
      const sub = await get(SUB_URL(cik));
      const { filings, counts45 } = trimFilings(sub.filings.recent, asOfDate);
      // Watchlist = domestic operating companies that file 10-K reports (foreign private issuers file 20-F instead).
      if (sub.entityType !== 'operating' || !filings.some((f) => f.form === '10-K')) { skipped++; continue; }
      companies.push({
        cik, rank: rank + 1, ticker: t.ticker, tickers: sub.tickers?.length ? sub.tickers : [t.ticker], exchanges: sub.exchanges ?? [],
        name: sub.name, sic: sub.sic ?? '', sicDescription: sub.sicDescription ?? '',
        category: (sub.category ?? '').replace(/<br\s*\/?>/g, '; '),
        fiscalYearEnd: sub.fiscalYearEnd ?? '', stateOfIncorporation: sub.stateOfIncorporationDescription || sub.stateOfIncorporation || '',
        fetchedAt: new Date().toISOString(), counts45, filings,
      });
      fetched++;
    } catch (e) {
      const prev = prevByCik.get(cik);
      if (prev) { companies.push({ ...prev, stale: true }); reused++; console.warn('[refresh] reuse last good', t.ticker, e.message); }
      else console.warn('[refresh] skip', t.ticker, e.message);
    }
  }
  if (companies.length < 50) {
    console.error(`[refresh] only ${companies.length} companies - refusing to overwrite last good snapshot`);
    process.exit(previous ? 0 : 1);
  }
  const latestAccepted = companies.flatMap((c) => c.filings.map((f) => f.accepted)).filter(Boolean).sort().at(-1) ?? '';
  const data = {
    asOf: asOfDate, fetchedAt: new Date().toISOString(), latestAccepted,
    source: 'U.S. Securities and Exchange Commission, EDGAR submissions API',
    sourceUrl: 'https://www.sec.gov/search-filings/edgar-application-programming-interfaces',
    universe: 'First 100 domestic operating companies that file Form 10-K, in the order they appear in the SEC company_tickers.json file',
    universeUrl: TICKERS_URL,
    stats: { fetched, reused, skipped },
    companies,
  };
  await mkdir(path.dirname(OUT), { recursive: true });
  const tmp = OUT + '.tmp';
  await writeFile(tmp, JSON.stringify(data));
  await rename(tmp, OUT);
  console.log(`[refresh] wrote ${companies.length} companies (fetched ${fetched}, reused ${reused}, skipped ${skipped}) asOf ${asOfDate}`);
}
main().catch((e) => { console.error('[refresh] fatal', e); process.exit(1); });
