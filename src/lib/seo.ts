// Title/description fitting. Pure functions (no imports) so tests can load them directly.

export const TITLE_MIN = 50, TITLE_MAX = 60, DESC_MIN = 150, DESC_MAX = 160;

/** Pick the first candidate whose length is within [min,max]; otherwise the closest one (gate will flag it). */
export function pickLength(candidates: string[], min: number, max: number): string {
  const clean = candidates.map((c) => c.replace(/\s+/g, ' ').trim()).filter(Boolean);
  const ok = clean.find((c) => c.length >= min && c.length <= max);
  if (ok) return ok;
  const dist = (c: string) => (c.length < min ? min - c.length : c.length > max ? c.length - max : 0);
  return [...clean].sort((a, b) => dist(a) - dist(b))[0] ?? '';
}

/**
 * Build a description from ordered sentence fragments: keep adding fragments while <= max,
 * so the result is factual text only (no filler). Returns the first prefix that reaches min.
 */
export function buildDescription(fragments: string[], min = DESC_MIN, max = DESC_MAX): string {
  let out = '';
  for (const f of fragments) {
    const next = (out ? out + ' ' : '') + f.trim();
    if (next.length > max) continue;
    out = next;
    if (out.length >= min) return out;
  }
  return out;
}

export const titleOk = (t: string) => t.length >= TITLE_MIN && t.length <= TITLE_MAX;
export const descOk = (d: string) => d.length >= DESC_MIN && d.length <= DESC_MAX;
