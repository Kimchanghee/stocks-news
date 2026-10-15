// Pure helpers for SEC filing data. No imports so node:test can load this file directly.

export type Filing = {
  acc: string; form: string; filed: string; period: string; accepted: string;
  items: string; doc: string; desc: string;
};
export type Company = {
  cik: string; rank: number; ticker: string; tickers: string[]; exchanges: string[]; name: string;
  sic: string; sicDescription: string; category: string; fiscalYearEnd: string; stateOfIncorporation: string;
  fetchedAt: string; counts45: Record<string, number>; filings: Filing[]; stale?: boolean;
};

/** Current Form 8-K items (Form 8-K General Instructions, sec.gov/files/form8-k.pdf). */
export const EIGHT_K_ITEMS: Record<string, { title: string; plain: string }> = {
  '1.01': { title: 'Entry into a Material Definitive Agreement', plain: 'signed a material contract' },
  '1.02': { title: 'Termination of a Material Definitive Agreement', plain: 'ended a material contract' },
  '1.03': { title: 'Bankruptcy or Receivership', plain: 'bankruptcy or receivership' },
  '1.04': { title: 'Mine Safety - Reporting of Shutdowns and Patterns of Violations', plain: 'mine-safety order' },
  '1.05': { title: 'Material Cybersecurity Incidents', plain: 'material cybersecurity incident' },
  '2.01': { title: 'Completion of Acquisition or Disposition of Assets', plain: 'closed an acquisition or sale of assets' },
  '2.02': { title: 'Results of Operations and Financial Condition', plain: 'released earnings or financial results' },
  '2.03': { title: 'Creation of a Direct Financial Obligation or an Obligation under an Off-Balance Sheet Arrangement', plain: 'took on new debt or a similar obligation' },
  '2.04': { title: 'Triggering Events That Accelerate or Increase a Direct Financial Obligation', plain: 'an event accelerated or increased a debt obligation' },
  '2.05': { title: 'Costs Associated with Exit or Disposal Activities', plain: 'restructuring, exit or layoff costs' },
  '2.06': { title: 'Material Impairments', plain: 'wrote down the value of assets' },
  '3.01': { title: 'Notice of Delisting or Failure to Satisfy a Continued Listing Rule or Standard; Transfer of Listing', plain: 'a listing problem or listing transfer' },
  '3.02': { title: 'Unregistered Sales of Equity Securities', plain: 'sold shares without SEC registration' },
  '3.03': { title: 'Material Modification to Rights of Security Holders', plain: "changed shareholders' rights" },
  '4.01': { title: "Changes in Registrant's Certifying Accountant", plain: 'changed its outside auditor' },
  '4.02': { title: 'Non-Reliance on Previously Issued Financial Statements or a Related Audit Report or Completed Interim Review', plain: 'past financial statements should no longer be relied on' },
  '5.01': { title: 'Changes in Control of Registrant', plain: 'a change in control' },
  '5.02': { title: 'Departure of Directors or Certain Officers; Election of Directors; Appointment of Certain Officers; Compensatory Arrangements of Certain Officers', plain: 'executive or board change, or executive pay arrangement' },
  '5.03': { title: 'Amendments to Articles of Incorporation or Bylaws; Change in Fiscal Year', plain: 'changed its charter, bylaws or fiscal year' },
  '5.04': { title: "Temporary Suspension of Trading Under Registrant's Employee Benefit Plans", plain: 'blackout period in an employee benefit plan' },
  '5.05': { title: "Amendment to Registrant's Code of Ethics, or Waiver of a Provision of the Code of Ethics", plain: 'changed or waived its code of ethics' },
  '5.06': { title: 'Change in Shell Company Status', plain: 'change in shell-company status' },
  '5.07': { title: 'Submission of Matters to a Vote of Security Holders', plain: 'reported shareholder vote results' },
  '5.08': { title: 'Shareholder Director Nominations', plain: 'shareholder director-nomination deadline' },
  '6.01': { title: 'ABS Informational and Computational Material', plain: 'asset-backed securities material' },
  '6.02': { title: 'Change of Servicer or Trustee', plain: 'asset-backed securities servicer change' },
  '6.03': { title: 'Change in Credit Enhancement or Other External Support', plain: 'asset-backed securities credit support change' },
  '6.04': { title: 'Failure to Make a Required Distribution', plain: 'asset-backed securities missed distribution' },
  '6.05': { title: 'Securities Act Updating Disclosure', plain: 'asset-backed securities update' },
  '7.01': { title: 'Regulation FD Disclosure', plain: 'information shared under Regulation FD' },
  '8.01': { title: 'Other Events', plain: 'other events the company chose to report' },
  '9.01': { title: 'Financial Statements and Exhibits', plain: 'exhibits attached' },
};

export const FORM_MEANING: Record<string, string> = {
  '10-K': 'Annual report with audited financial statements',
  '10-K/A': 'Amendment to an annual report',
  '10-KT': 'Transition report after a fiscal-year change',
  '10-Q': 'Quarterly report with unaudited financial statements',
  '10-Q/A': 'Amendment to a quarterly report',
  '8-K': 'Current report of a material event',
  '8-K/A': 'Amendment to a current report',
  'DEF 14A': 'Definitive proxy statement for a shareholder meeting',
  'DEFA14A': 'Additional proxy soliciting materials',
  'PRE 14A': 'Preliminary proxy statement',
  'ARS': 'Annual report delivered to shareholders',
  'S-1': 'Registration statement for a public offering',
  'S-1/A': 'Amendment to an offering registration statement',
  'S-3': 'Short-form shelf registration statement',
  'S-3ASR': 'Automatic shelf registration (well-known seasoned issuer)',
  'S-4': 'Registration of shares issued in a merger or exchange offer',
  'S-8': 'Registration of shares for employee benefit plans',
  '11-K': 'Annual report of an employee stock purchase or savings plan',
  'SD': 'Specialized disclosure (conflict minerals / resource payments)',
  'SCHEDULE 13D': 'Ownership above 5% by an investor who may seek influence',
  'SCHEDULE 13D/A': 'Amendment to an active-ownership (13D) report',
  'SCHEDULE 13G': 'Ownership above 5% by a passive or institutional investor',
  'SCHEDULE 13G/A': 'Amendment to a passive-ownership (13G) report',
  'SC 13D': 'Ownership above 5% by an investor who may seek influence',
  'SC 13D/A': 'Amendment to an active-ownership (13D) report',
  'SC 13G': 'Ownership above 5% by a passive or institutional investor',
  'SC 13G/A': 'Amendment to a passive-ownership (13G) report',
  '3': 'Initial statement of insider ownership',
  '3/A': 'Amendment to an initial insider ownership statement',
  '4': 'Change in insider ownership (insider trade)',
  '4/A': 'Amendment to an insider trade report',
  '5': 'Annual statement of insider ownership changes',
  '144': 'Notice of proposed sale of restricted or control securities',
  '25-NSE': 'Exchange notice removing a security from listing',
  '425': 'Communication about a business combination',
  'NT 10-K': 'Notice that an annual report will be late',
  'NT 10-Q': 'Notice that a quarterly report will be late',
  '15-12B': 'Notice ending registration of a class of securities',
  'CERT': 'Exchange certification that a security is approved for listing',
  'N-PX': 'Annual report of proxy votes cast',
  '424B2': 'Prospectus supplement (often structured notes)',
  'FWP': 'Free writing prospectus',
};

export const formMeaning = (form: string): string => FORM_MEANING[form] ?? 'Other SEC filing';

/** Docket groupings used for the home-page filter. */
export function formGroup(form: string): 'periodic' | 'current' | 'proxy' | 'ownership' | 'insider' | 'offering' | 'other' {
  if (/^10-(K|Q|KT)/.test(form) || form.startsWith('NT 10') || form === '11-K' || form === 'ARS') return 'periodic';
  if (form.startsWith('8-K')) return 'current';
  if (/14A$/.test(form) || form === 'N-PX') return 'proxy';
  if (/13[DG]/.test(form)) return 'ownership';
  if (/^(3|4|5)(\/A)?$/.test(form) || form === '144') return 'insider';
  if (/^(S-|424|FWP|425)/.test(form)) return 'offering';
  return 'other';
}

export function describe8K(items: string): string[] {
  return items.split(',').map((s) => s.trim()).filter(Boolean)
    .map((code) => (EIGHT_K_ITEMS[code] ? `Item ${code}: ${EIGHT_K_ITEMS[code].plain}` : `Item ${code}`));
}

/** Plain-English one-liner for a docket entry. */
export function plainEnglish(f: Pick<Filing, 'form' | 'items' | 'period'>): string {
  if (f.form.startsWith('8-K') && f.items) {
    const parts = f.items.split(',').map((s) => s.trim()).filter((c) => c && c !== '9.01');
    const plains = parts.map((c) => EIGHT_K_ITEMS[c]?.plain ?? `item ${c}`);
    if (plains.length === 0) return 'Filed exhibits only (Item 9.01)';
    const s = plains.join('; ');
    return s.charAt(0).toUpperCase() + s.slice(1);
  }
  const base = formMeaning(f.form);
  if ((f.form === '10-Q' || f.form === '10-K') && f.period) return `${base} for the period ended ${fmtDate(f.period)}`;
  return base;
}

// ---------- dates ----------
/** US federal holidays (observed) 2026-2028, per OPM. EDGAR does not accept filings on these days. */
export const FEDERAL_HOLIDAYS = new Set([
  '2026-01-01', '2026-01-19', '2026-02-16', '2026-05-25', '2026-06-19', '2026-07-03', '2026-09-07', '2026-10-12', '2026-11-11', '2026-11-26', '2026-12-25',
  '2027-01-01', '2027-01-18', '2027-02-15', '2027-05-31', '2027-06-18', '2027-07-05', '2027-09-06', '2027-10-11', '2027-11-11', '2027-11-25', '2027-12-24', '2027-12-31',
  '2028-01-17', '2028-02-21', '2028-05-29', '2028-06-19', '2028-07-04', '2028-09-04', '2028-10-09', '2028-11-10', '2028-11-23', '2028-12-25',
]);

const DAY = 86400000;
export const toMs = (d: string) => Date.parse(d + 'T00:00:00Z');
export const fromMs = (ms: number) => new Date(ms).toISOString().slice(0, 10);
export const addDays = (d: string, n: number) => fromMs(toMs(d) + n * DAY);
export const diffDays = (a: string, b: string) => Math.round((toMs(b) - toMs(a)) / DAY);

export function isBusinessDay(d: string): boolean {
  const wd = new Date(toMs(d)).getUTCDay();
  return wd !== 0 && wd !== 6 && !FEDERAL_HOLIDAYS.has(d);
}
/** Exchange Act Rule 0-3: a due date on a weekend or federal holiday moves to the next business day. */
export function rollForward(d: string): string {
  let x = d;
  while (!isBusinessDay(x)) x = addDays(x, 1);
  return x;
}

const MONTHS = ['Jan.', 'Feb.', 'March', 'April', 'May', 'June', 'July', 'Aug.', 'Sept.', 'Oct.', 'Nov.', 'Dec.'];
export function fmtDate(d: string): string {
  if (!d) return '';
  const [y, m, day] = d.split('-').map(Number);
  return `${MONTHS[m - 1]} ${day}, ${y}`;
}
export function fmtShort(d: string): string {
  if (!d) return '';
  const [, m, day] = d.split('-').map(Number);
  return `${MONTHS[m - 1]} ${day}`;
}

function lastDayOfMonth(y: number, m0: number): number { return new Date(Date.UTC(y, m0 + 1, 0)).getUTCDate(); }
export function isMonthEnd(d: string): boolean {
  const [y, m, day] = d.split('-').map(Number);
  return day === lastDayOfMonth(y, m - 1);
}
/** Estimate the next fiscal-quarter end: calendar month-ends advance 3 months; 52/53-week calendars advance 13 weeks. */
export function nextQuarterEnd(period: string): string {
  if (isMonthEnd(period)) {
    const [y, m] = period.split('-').map(Number);
    const m0 = m - 1 + 3;
    const ny = y + Math.floor(m0 / 12);
    const nm = m0 % 12;
    return `${ny}-${String(nm + 1).padStart(2, '0')}-${String(lastDayOfMonth(ny, nm)).padStart(2, '0')}`;
  }
  return addDays(period, 91);
}

// ---------- deadlines ----------
export type FilerStatus = 'large accelerated' | 'accelerated' | 'non-accelerated';
export function filerStatus(category: string): FilerStatus {
  const c = category.toLowerCase();
  if (c.includes('large accelerated')) return 'large accelerated';
  if (c.includes('non-accelerated')) return 'non-accelerated';
  if (c.includes('accelerated')) return 'accelerated';
  return 'non-accelerated';
}
/** Days after period end (Form 10-K General Instruction A; Form 10-Q General Instruction A.1). */
export function deadlineDays(form: '10-K' | '10-Q', status: FilerStatus): number {
  if (form === '10-K') return status === 'large accelerated' ? 60 : status === 'accelerated' ? 75 : 90;
  return status === 'non-accelerated' ? 45 : 40;
}
export function dueDate(periodEnd: string, form: '10-K' | '10-Q', status: FilerStatus): string {
  return rollForward(addDays(periodEnd, deadlineDays(form, status)));
}

/** Is a period end (YYYY-MM-DD) the fiscal year end (MMDD), allowing +/-7 days for 52/53-week years? */
export function isFiscalYearEnd(period: string, fiscalYearEnd: string): boolean {
  if (!fiscalYearEnd || fiscalYearEnd.length !== 4) return false;
  const y = Number(period.slice(0, 4));
  const candidates = [y - 1, y, y + 1].map((yy) => `${yy}-${fiscalYearEnd.slice(0, 2)}-${fiscalYearEnd.slice(2)}`);
  return candidates.some((c) => {
    const ms = Date.parse(c + 'T00:00:00Z');
    return !Number.isNaN(ms) && Math.abs(diffDays(c, period)) <= 7;
  });
}

export type LagStats = { n: number; min: number; max: number; median: number; lags: { period: string; filed: string; days: number }[] };
export function lagStats(filings: Filing[], form: '10-K' | '10-Q', limit: number): LagStats | null {
  const rows = filings.filter((f) => f.form === form && f.period)
    .sort((a, b) => (a.filed < b.filed ? 1 : -1)).slice(0, limit)
    .map((f) => ({ period: f.period, filed: f.filed, days: diffDays(f.period, f.filed) }))
    .filter((r) => r.days > 0 && r.days < 200);
  if (rows.length === 0) return null;
  const d = rows.map((r) => r.days).sort((a, b) => a - b);
  const mid = Math.floor(d.length / 2);
  const median = d.length % 2 ? d[mid] : Math.round((d[mid - 1] + d[mid]) / 2);
  return { n: rows.length, min: d[0], max: d[d.length - 1], median, lags: rows };
}

export type NextReport = {
  form: '10-K' | '10-Q';
  periodEnd: string;
  periodEstimated: boolean;
  due: string;
  windowStart: string;
  windowEnd: string;
  expected: string;
  status: 'upcoming' | 'period-closed' | 'later-than-usual' | 'past-due';
  basis: LagStats | null;
  lastPeriodic: Filing | null;
};

/** Project the next periodic report from the company's own filing history. */
export function projectNextReport(c: Pick<Company, 'filings' | 'fiscalYearEnd' | 'category'>, asOf: string): NextReport | null {
  const periodic = c.filings.filter((f) => (f.form === '10-K' || f.form === '10-Q') && f.period)
    .sort((a, b) => (a.period < b.period ? 1 : -1));
  const lastP = periodic[0];
  if (!lastP) return null;
  const periodEnd = nextQuarterEnd(lastP.period);
  const form: '10-K' | '10-Q' = isFiscalYearEnd(periodEnd, c.fiscalYearEnd) ? '10-K' : '10-Q';
  const fstatus = filerStatus(c.category);
  const due = dueDate(periodEnd, form, fstatus);
  const basis = lagStats(c.filings, form, form === '10-K' ? 3 : 8);
  const dueDaysAfter = diffDays(periodEnd, due);
  const lo = basis ? Math.min(basis.min, dueDaysAfter) : Math.max(1, dueDaysAfter - 14);
  const hi = basis ? Math.min(basis.max, dueDaysAfter) : dueDaysAfter;
  const med = basis ? Math.min(basis.median, dueDaysAfter) : dueDaysAfter;
  const st: NextReport['status'] = asOf > due ? 'past-due' : asOf > periodEnd ? 'period-closed' : 'upcoming';
  const cap = (d: string) => (d > due ? due : d);
  const windowStart = cap(rollForward(addDays(periodEnd, lo)));
  const windowEnd = cap(rollForward(addDays(periodEnd, hi)));
  const status: NextReport['status'] = st === 'period-closed' && asOf > windowEnd ? 'later-than-usual' : st;
  return {
    form, periodEnd, periodEstimated: true, due,
    windowStart, windowEnd, expected: cap(rollForward(addDays(periodEnd, med))),
    status, basis, lastPeriodic: lastP,
  };
}

// ---------- URLs ----------
export const cikInt = (cik: string) => String(Number(cik));
export const accPath = (acc: string) => acc.replace(/-/g, '');
export const filingIndexUrl = (cik: string, acc: string) => `https://www.sec.gov/Archives/edgar/data/${cikInt(cik)}/${accPath(acc)}/${acc}-index.htm`;
export const filingDocUrl = (cik: string, acc: string, doc: string) =>
  doc ? `https://www.sec.gov/Archives/edgar/data/${cikInt(cik)}/${accPath(acc)}/${doc}` : filingIndexUrl(cik, acc);
export const edgarCompanyUrl = (cik: string) => `https://www.sec.gov/edgar/browse/?CIK=${cik}`;
export const slugTicker = (t: string) => t.toLowerCase().replace(/[^a-z0-9]+/g, '-');

const NAME_FIX: Record<string, string> = {
  'Jpmorgan Chase & Co': 'JPMorgan Chase & Co.', 'Mcdonalds Corp.': "McDonald's Corp.", 'Conocophillips': 'ConocoPhillips',
  'Pepsico Inc.': 'PepsiCo Inc.', 'Nextera Energy Inc.': 'NextEra Energy Inc.', 'Amazon Com Inc.': 'Amazon.com Inc.',
  'Coca Cola Co': 'Coca-Cola Co.', 'Unitedhealth Group Inc.': 'UnitedHealth Group Inc.', 'Schwab Charles Corp.': 'Charles Schwab Corp.',
  'Nvidia Corp.': 'NVIDIA Corp.', 'Eli Lilly & Co': 'Eli Lilly & Co.', 'Procter & Gamble Co': 'Procter & Gamble Co.',
  'Wells Fargo & Company': 'Wells Fargo & Co.', 'Rtx Corp': 'RTX Corp.', 'Tjx Companies Inc.': 'TJX Companies Inc.',
};
const ACRONYMS = new Set(['AMD', 'IBM', 'UPS', 'CVS', 'HCA', 'AES', 'NXP', 'KLA', 'GE', 'TJX', 'RTX', 'AT&T', 'US', 'USA', 'PNC', 'CSX', 'EOG', 'MSCI', 'DTE', 'PPG', 'AIG', 'HP', 'II', 'III']);
/** Readable version of an SEC conformed name ("MICROSOFT CORP" -> "Microsoft Corp."). Display only; the SEC name is shown alongside. */
export function displayName(name: string): string {
  let s = name.replace(/\s*\/\s*[A-Za-z]{2,3}\s*\/?\s*$/, '').replace(/\/$/, '').trim();
  s = s.split(/(\s+)/).map((w) => {
    if (/^\s+$/.test(w)) return w;
    const bare = w.replace(/[.,]/g, '');
    if (ACRONYMS.has(bare.toUpperCase()) && bare === bare.toUpperCase()) return w;
    if (bare.length > 1 && bare === bare.toUpperCase() && /[A-Z]/.test(bare)) return w.charAt(0) + w.slice(1).toLowerCase();
    return w;
  }).join('');
  s = s.replace(/\b(Corp|Inc)\b(?!\.)/g, '$1.').replace(/\.\.$/, '.');
  return NAME_FIX[s] ?? s;
}
/** Fit text into [min,max] chars: trims at a word boundary, never pads with filler. */
export function clampText(s: string, max: number): string {
  if (s.length <= max) return s;
  const cut = s.slice(0, max - 1);
  return cut.slice(0, cut.lastIndexOf(' ')).replace(/[,;:\s]+$/, '') + '…';
}
