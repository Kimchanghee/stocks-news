// Hand-computed checks for the deadline / projection math (node:test, Node type stripping).
// Deadlines: Form 10-Q Gen. Instr. A.1 (40/45 days), Form 10-K Gen. Instr. A (60/75/90 days),
// Exchange Act Rule 0-3 (weekend/holiday roll-forward).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  addDays, diffDays, rollForward, isBusinessDay, dueDate, deadlineDays, filerStatus, nextQuarterEnd, isFiscalYearEnd,
  lagStats, projectNextReport, plainEnglish, describe8K, filingIndexUrl, slugTicker, startsWithinDays, type Filing,
} from '../src/lib/sec.ts';
import { pickLength, buildDescription } from '../src/lib/seo.ts';

const f = (form: string, period: string, filed: string, extra: Partial<Filing> = {}): Filing =>
  ({ acc: '0000000000-26-000001', form, filed, period, accepted: filed + 'T12:00:00.000Z', items: '', doc: '', desc: '', ...extra });

test('calendar arithmetic', () => {
  assert.equal(addDays('2026-09-30', 40), '2026-11-09'); // Oct 31 = +31, Nov 9 = +40
  assert.equal(addDays('2026-12-31', 60), '2027-03-01'); // Jan 31 + Feb 28 = 59 -> Mar 1
  assert.equal(diffDays('2026-06-30', '2026-07-30'), 30);
});

test('filer status and deadline days', () => {
  assert.equal(filerStatus('Large Accelerated Filer'), 'large accelerated');
  assert.equal(filerStatus('Non-accelerated Filer'), 'non-accelerated');
  assert.equal(filerStatus('Accelerated Filer'), 'accelerated');
  assert.equal(filerStatus(''), 'non-accelerated');
  assert.deepEqual(['large accelerated', 'accelerated', 'non-accelerated'].map((s) => deadlineDays('10-K', s as never)), [60, 75, 90]);
  assert.deepEqual(['large accelerated', 'accelerated', 'non-accelerated'].map((s) => deadlineDays('10-Q', s as never)), [40, 40, 45]);
});

test('Rule 0-3 roll-forward', () => {
  assert.equal(isBusinessDay('2026-11-09'), true); // Monday
  assert.equal(rollForward('2026-05-10'), '2026-05-11'); // Sunday -> Monday
  assert.equal(rollForward('2026-10-10'), '2026-10-13'); // Sat -> Sun -> Columbus Day Mon -> Tue
  assert.equal(rollForward('2026-11-26'), '2026-11-27'); // Thanksgiving -> Friday
});

test('due dates (hand-computed)', () => {
  assert.equal(dueDate('2026-09-30', '10-Q', 'large accelerated'), '2026-11-09');
  assert.equal(dueDate('2026-12-31', '10-K', 'large accelerated'), '2027-03-01');
  assert.equal(dueDate('2026-06-30', '10-Q', 'non-accelerated'), '2026-08-14'); // Friday
  assert.equal(dueDate('2026-03-31', '10-Q', 'large accelerated'), '2026-05-11'); // May 10 is a Sunday
  assert.equal(dueDate('2026-06-30', '10-K', 'accelerated'), '2026-09-14'); // Sept 13 is a Sunday
});

test('next quarter end', () => {
  assert.equal(nextQuarterEnd('2026-06-30'), '2026-09-30');
  assert.equal(nextQuarterEnd('2026-11-30'), '2027-02-28');
  assert.equal(nextQuarterEnd('2026-09-26'), '2026-12-26'); // 52/53-week calendar: +13 weeks
  assert.equal(isFiscalYearEnd('2026-09-26', '0927'), true);
  assert.equal(isFiscalYearEnd('2026-06-30', '1231'), false);
});

test('lag statistics', () => {
  const s = lagStats([f('10-Q', '2026-06-30', '2026-07-30'), f('10-Q', '2026-03-31', '2026-04-28'), f('10-Q', '2025-09-30', '2025-10-31'), f('10-Q', '2025-06-30', '2025-08-01')], '10-Q', 8)!;
  assert.equal(s.n, 4);
  assert.equal(s.min, 28);
  assert.equal(s.max, 32);
  assert.equal(s.median, 31); // sorted 28,30,31,32 -> (30+31)/2 = 30.5 -> rounds to 31
});

test('next-report projection (hand-computed)', () => {
  const c = {
    fiscalYearEnd: '1231', category: 'Large accelerated filer',
    filings: [f('10-Q', '2026-06-30', '2026-07-30'), f('10-Q', '2026-03-31', '2026-04-28'), f('10-Q', '2025-09-30', '2025-10-31')],
  };
  const n = projectNextReport(c, '2026-10-15')!;
  assert.equal(n.form, '10-Q');
  assert.equal(n.periodEnd, '2026-09-30');
  assert.equal(n.due, '2026-11-09');
  assert.equal(n.windowStart, '2026-10-28'); // +28 days, Wednesday
  assert.equal(n.windowEnd, '2026-11-02'); // +31 = Sat Oct 31 -> Mon Nov 2
  assert.equal(n.expected, '2026-10-30'); // median 30 -> Friday
  assert.equal(n.status, 'period-closed');
  assert.equal(projectNextReport(c, '2026-11-04')!.status, 'later-than-usual');
  assert.equal(projectNextReport(c, '2026-11-10')!.status, 'past-due');
  assert.equal(projectNextReport({ ...c, filings: [] }, '2026-10-15'), null);
});

test('annual report detection and no-history fallback', () => {
  const c = { fiscalYearEnd: '1231', category: 'Non-accelerated filer', filings: [f('10-Q', '2026-09-30', '2026-11-12')] };
  const n = projectNextReport(c, '2026-12-01')!;
  assert.equal(n.form, '10-K');
  assert.equal(n.periodEnd, '2026-12-31');
  assert.equal(n.due, '2027-03-31'); // +90 days = Mar 31, 2027 (Wednesday)
  assert.equal(n.basis, null);
  assert.equal(n.windowEnd, n.due);
});

test('plain English and URLs', () => {
  assert.match(plainEnglish(f('10-Q', '2026-09-30', '2026-10-30')), /quarter/i);
  assert.ok(describe8K('2.02,9.01').length >= 1);
  assert.equal(filingIndexUrl('0000320193', '0000320193-26-000010'), 'https://www.sec.gov/Archives/edgar/data/320193/000032019326000010/0000320193-26-000010-index.htm');
  assert.equal(slugTicker('BRK-B'), 'brk-b');
});

test('SEO length helpers', () => {
  assert.equal(pickLength(['short', 'x'.repeat(55), 'y'.repeat(58)], 50, 60), 'x'.repeat(55));
  const d = buildDescription(['a'.repeat(100) + '.', 'b'.repeat(70) + '.', 'c'.repeat(50) + '.']);
  assert.equal(d.length, 153);
});


test('next-seven-days window excludes past starts and includes both boundaries', () => {
  assert.equal(startsWithinDays('2026-10-14', '2026-10-15', 7), false);
  assert.equal(startsWithinDays('2026-10-15', '2026-10-15', 7), true);
  assert.equal(startsWithinDays('2026-10-22', '2026-10-15', 7), true);
  assert.equal(startsWithinDays('2026-10-23', '2026-10-15', 7), false);
  assert.equal(startsWithinDays('invalid', '2026-10-15', 7), false);
});
