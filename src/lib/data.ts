import raw from '../data/companies.json';
import {
  type Company, type Filing, addDays, diffDays, displayName, formGroup, plainEnglish, projectNextReport, slugTicker,
} from './sec';

export const snapshot = raw as unknown as {
  asOf: string; fetchedAt: string; latestAccepted: string; source: string; sourceUrl: string;
  universe: string; universeUrl: string; stats: { fetched: number; reused: number; skipped: number };
  companies: Company[];
};
export const companies: Company[] = snapshot.companies;
export const asOf = snapshot.asOf;
export const buildDate = new Date().toISOString().slice(0, 10);
export const staleDays = diffDays(asOf, buildDate);
export const isStale = staleDays > 2;

export const companyBySlug = new Map(companies.map((c) => [slugTicker(c.ticker), c]));
export const companyPath = (c: Company) => `/company/${slugTicker(c.ticker)}/`;
export const nameOf = (c: Company) => displayName(c.name);

export type DocketEntry = {
  key: string; company: Company; form: string; filed: string; accepted: string; items: string;
  count: number; filings: Filing[]; group: ReturnType<typeof formGroup>; plain: string;
};

/** Filings from the last `days` calendar days ending at asOf; same company+form+day collapsed into one entry. */
export function docket(days = 7): DocketEntry[] {
  const from = addDays(asOf, -(days - 1));
  const map = new Map<string, DocketEntry>();
  for (const c of companies) {
    for (const f of c.filings) {
      if (f.filed < from || f.filed > asOf) continue;
      const collapse = formGroup(f.form) === 'insider' || /13G/.test(f.form);
      const key = collapse ? `${c.cik}|${f.form}|${f.filed}` : `${c.cik}|${f.acc}`;
      const e = map.get(key);
      if (e) { e.count++; e.filings.push(f); if (f.accepted > e.accepted) e.accepted = f.accepted; continue; }
      map.set(key, {
        key, company: c, form: f.form, filed: f.filed, accepted: f.accepted, items: f.items, count: 1, filings: [f],
        group: formGroup(f.form), plain: plainEnglish(f),
      });
    }
  }
  const rank: Record<string, number> = { current: 0, periodic: 1, proxy: 2, offering: 3, ownership: 4, other: 5, insider: 6 };
  return [...map.values()].sort((a, b) =>
    a.filed !== b.filed ? (a.filed < b.filed ? 1 : -1)
      : rank[a.group] !== rank[b.group] ? rank[a.group] - rank[b.group]
        : a.accepted < b.accepted ? 1 : -1);
}

export function upcoming() {
  return companies
    .map((c) => ({ c, next: projectNextReport(c, asOf) }))
    .filter((x): x is { c: Company; next: NonNullable<ReturnType<typeof projectNextReport>> } => x.next !== null)
    .sort((a, b) => (a.next.expected < b.next.expected ? -1 : a.next.expected > b.next.expected ? 1 : a.c.rank - b.c.rank));
}

export function formCount(filter: (f: Filing) => boolean, days: number): number {
  const from = addDays(asOf, -(days - 1));
  return companies.reduce((n, c) => n + c.filings.filter((f) => f.filed >= from && f.filed <= asOf && filter(f)).length, 0);
}

/** Latest filings of a form family across the watchlist (for form explainer pages). */
export function latestOf(test: (form: string) => boolean, limit = 8) {
  return companies.flatMap((c) => c.filings.filter((f) => test(f.form)).map((f) => ({ c, f })))
    .sort((a, b) => (a.f.filed < b.f.filed ? 1 : a.f.filed > b.f.filed ? -1 : a.f.accepted < b.f.accepted ? 1 : -1))
    .slice(0, limit);
}

/** 8-K item frequency across the watchlist in the last `days` days. */
export function itemFrequency(days = 90) {
  const from = addDays(asOf, -(days - 1));
  const freq = new Map<string, number>();
  let total = 0;
  for (const c of companies) for (const f of c.filings) {
    if (!f.form.startsWith('8-K') || f.filed < from) continue;
    total++;
    for (const it of f.items.split(',').map((s) => s.trim()).filter(Boolean)) freq.set(it, (freq.get(it) ?? 0) + 1);
  }
  return { total, items: [...freq.entries()].sort((a, b) => b[1] - a[1]) };
}
