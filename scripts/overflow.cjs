// Find elements wider than the viewport: node scripts/overflow.cjs <url> [width]
const path = require('node:path');
const fs = require('node:fs');
const { chromium } = require(path.resolve(__dirname, '..', '..', '_qa-tools', 'node_modules', 'playwright'));
(async () => {
  const [url, w = '390'] = process.argv.slice(2);
  const pw = path.resolve(__dirname, '..', '..', '_pw-browsers');
  const browser = await chromium.launch(fs.existsSync(pw) ? {} : { channel: 'chrome' });
  const page = await browser.newPage({ viewport: { width: +w, height: 844 } });
  await page.goto(url);
  const r = await page.evaluate(() => {
    const vw = document.documentElement.clientWidth;
    return [...document.querySelectorAll('body *')].filter((e) => e.getBoundingClientRect().right > vw + 1)
      .slice(0, 15).map((e) => `${e.tagName.toLowerCase()}.${e.className} right=${Math.round(e.getBoundingClientRect().right)} text=${(e.textContent || '').trim().slice(0, 50)}`);
  });
  console.log(r.join('\n') || 'none');
  await browser.close();
})();
