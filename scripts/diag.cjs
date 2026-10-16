// Layout diagnostics: node scripts/diag.cjs <path> <width>  -> overflowing leaf elements + layout-shift sources
const path = require('node:path');
const fs = require('node:fs');
const { chromium } = require(path.resolve(__dirname, '..', '..', '_qa-tools', 'node_modules', 'playwright'));
(async () => {
  const [p, w = '390'] = process.argv.slice(2);
  const server = await require('./serve.cjs').start(4339);
  const pw = path.resolve(__dirname, '..', '..', '_pw-browsers');
  const browser = await chromium.launch(fs.existsSync(pw) ? {} : { channel: 'chrome' });
  const page = await browser.newPage({ viewport: { width: +w, height: 900 } });
  await page.addInitScript(() => {
    window.__shifts = [];
    new PerformanceObserver((l) => { for (const e of l.getEntries()) window.__shifts.push({ v: e.value, src: (e.sources || []).map((s) => (s.node && s.node.nodeName ? s.node.nodeName + '.' + (s.node.className || '') : '?') + ` ${JSON.stringify(s.previousRect)}->${JSON.stringify(s.currentRect)}`) }); }).observe({ type: 'layout-shift', buffered: true });
  });
  await page.goto('http://127.0.0.1:4339' + p, { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);
  const r = await page.evaluate(() => {
    const vw = document.documentElement.clientWidth;
    const over = [...document.querySelectorAll('body *')].filter((e) => e.getBoundingClientRect().right > vw + 1 && ![...e.children].some((c) => c.getBoundingClientRect().right > vw + 1))
      .filter((e) => !e.closest('.nav')).slice(0, 10)
      .map((e) => `${e.tagName.toLowerCase()}.${typeof e.className === 'string' ? e.className : ''} right=${Math.round(e.getBoundingClientRect().right)} parent=${e.parentElement.tagName.toLowerCase()}.${e.parentElement.className} text=${(e.textContent || '').trim().slice(0, 60)}`);
    return { over, shifts: window.__shifts };
  });
  console.log(JSON.stringify(r, null, 1));
  await browser.close();
  server.close();
})();
