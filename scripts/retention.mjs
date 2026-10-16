// Pure retention policy. No I/O, clocks, fabricated filings, or listing-status inference.
const clone = value => structuredClone(value);
const reject = message => { const error = new Error(message); error.retention = true; throw error; };

export function selectedCandidates(previous, tickerRows, limit = 170) {
  if (previous) {
    if (!Array.isArray(previous.companies) || !previous.companies.length) reject('Invalid prior selected universe');
    const seen = new Set();
    return previous.companies.map(c => {
      if (!/^\d{10}$/.test(c.cik) || seen.has(c.cik) || !c.ticker) reject('Invalid prior company identity');
      seen.add(c.cik);
      return { cik_str: c.cik, ticker: c.ticker, selectedRank: c.rank };
    });
  }
  const seen = new Set();
  return tickerRows.filter(t => {
    const cik = String(t.cik_str).padStart(10, '0');
    if (seen.has(cik)) return false;
    seen.add(cik); return true;
  }).slice(0, limit);
}

export function mergeCompany(previous, fetched) {
  if (!previous) return clone(fetched);
  if (previous.cik !== fetched.cik || previous.ticker !== fetched.ticker) reject('Selected CIK/ticker migration requires review');
  // Do not falsely describe a renamed/delisted ticker as freshly confirmed by EDGAR.
  if (!Array.isArray(fetched.tickers) || previous.tickers.some(t => !fetched.tickers.includes(t))) reject('Selected ticker no longer confirmed; identity migration requires review');
  const byAcc = new Map();
  for (const f of fetched.filings) {
    if (!f.acc || byAcc.has(f.acc)) reject('Duplicate/empty fetched accession');
    byAcc.set(f.acc, clone(f));
  }
  const oldAcc = new Set();
  for (const f of previous.filings) {
    if (!f.acc || oldAcc.has(f.acc)) reject('Duplicate/empty retained accession');
    oldAcc.add(f.acc);
    // Keep the original document URL, report period and source timestamps together.
    // A changed historical primaryDocument needs a separately reviewed archive migration.
    byAcc.set(f.acc, clone(f));
  }
  return {
    ...clone(fetched), cik: previous.cik, ticker: previous.ticker,
    tickers: clone(previous.tickers), rank: previous.rank,
    filings: [...byAcc.values()].sort((a,b) => b.filed.localeCompare(a.filed) || b.accepted.localeCompare(a.accepted) || a.acc.localeCompare(b.acc)),
  };
}
