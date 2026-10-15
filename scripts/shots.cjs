// QA screenshots: node scripts/shots.cjs <baseUrl> <outDir> <path1> <path2> ...
// Uses the shared Playwright install in ../_qa-tools (no browser download).
const path = require('node:path');
const fs = require('node:fs');
const qa = path.resolve(__dirname, '..', '..', '_qa-tools', 'node_modules', 'playwright');
const pwBrowsers = path.resolve(__dirname, '..', '..', '_pw-browsers');
if (!process.env.PLAYWRIGHT_BROWSERS_PATH && fs.existsSync(pwBrowsers)) process.env.PLAYWRIGHT_BROWSERS_PATH = pwBrowsers;
const { chromium } = require(qa);

(async () => {
  const [base, out, ...paths] = process.argv.slice(2);
  fs.mkdirSync(out, { recursive: true });
  const server = base.includes(':4331') ? await require('./serve.cjs').start(4331) : null;
  const browser = await chromium.launch(fs.existsSync(pwBrowsers) ? {} : { channel: 'chrome' });
  const report = [];
  for (const width of [1440, 390]) {
    const ctx = await browser.newContext({ viewport: { width, height: width === 390 ? 844 : 900 }, deviceScaleFactor: 1 });
    const page = await ctx.newPage();
    for (const p of paths) {
      await page.goto(base + p, { waitUntil: 'networkidle' }).catch(() => page.goto(base + p));
      await page.evaluate(() => {
        window.__cls = 0;
        new PerformanceObserver((l) => { for (const e of l.getEntries()) if (!e.hadRecentInput) window.__cls += e.value; }).observe({ type: 'layout-shift', buffered: true });
      });
      await page.waitForTimeout(800);
      const m = await page.evaluate(() => ({
        overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
        cls: Math.round(window.__cls * 1000) / 1000,
        h1: document.querySelector('h1')?.textContent?.trim().slice(0, 80),
      }));
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      const focus = await page.evaluate(() => {
        const el = document.activeElement;
        if (!el || el === document.body) return 'none';
        const cs = getComputedStyle(el);
        return `${el.tagName.toLowerCase()} outline=${cs.outlineStyle}/${cs.outlineWidth}`;
      });
      const name = (p.replace(/\//g, '_') || '_') + `-${width}.png`;
      await page.screenshot({ path: path.join(out, name), fullPage: true });
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.screenshot({ path: path.join(out, name.replace('.png', '-top.png')) });
      report.push({ path: p, width, ...m, focus, file: name });
    }
    await ctx.close();
  }
  await browser.close();
  if (server) server.close();
  fs.writeFileSync(path.join(out, 'report.json'), JSON.stringify(report, null, 2));
  console.log(JSON.stringify(report, null, 1));
})().catch((e) => { console.error(e); process.exit(1); });
