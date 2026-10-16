// Publish gate (fire-your-seo-agency Phase 5). Run after `pnpm build`. Exits 1 on any failure.
import fs from 'node:fs';
import path from 'node:path';

const SITE = process.env.SITE_URL || 'https://stockmarketnews.online';
const DIST = path.resolve('dist');
const SOURCE_RE = /https:\/\/(www|data|efts)\.sec\.gov\//;
// Pages that must cite primary sources in <main> (data pages, articles, method).
const NEEDS_SOURCES = (p) => p === '/' || /^\/(guides|forms|company|calendar|companies|methodology)\//.test(p);
const PLACEHOLDER = /lorem ipsum|\bTODO\b|\bTBD\b|\bFIXME\b|\[object Object\]|>\s*undefined\s*<|>\s*NaN\s*<|\{\{|example\.com/i;

function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, out); else if (e.name.endsWith('.html')) out.push(p);
  }
  return out;
}
const decode = (s) => s.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"')
  .replace(/&#39;|&#x27;/g, "'").replace(/&nbsp;/g, ' ').replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(+n));
const text = (html) => decode(html.replace(/<script[\s\S]*?<\/script>/gi, ' ').replace(/<style[\s\S]*?<\/style>/gi, ' ').replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ').trim();
const norm = (s) => decode(String(s)).replace(/[\u2018\u2019]/g, "'").replace(/[\u201c\u201d]/g, '"').replace(/\s+/g, ' ').trim().toLowerCase();
const attr = (html, re) => { const m = html.match(re); return m ? decode(m[1]) : undefined; };

if (!fs.existsSync(path.join(DIST, 'sitemap-index.xml'))) { console.error('gate: dist/sitemap-index.xml missing; run pnpm build'); process.exit(1); }
const sitemapUrls = new Set();
for (const f of fs.readdirSync(DIST).filter((f) => /^sitemap-.*\.xml$/.test(f) && f !== 'sitemap-index.xml')) {
  for (const m of fs.readFileSync(path.join(DIST, f), 'utf8').matchAll(/<loc>([^<]+)<\/loc>/g)) sitemapUrls.add(m[1]);
}

const failures = [];
let checked = 0;
for (const f of walk(DIST)) {
  const rel = '/' + path.relative(DIST, f).replace(/\\/g, '/');
  if (rel === '/404.html') continue;
  const p = rel.replace(/index\.html$/, '');
  const html = fs.readFileSync(f, 'utf8');
  const body = html.replace(/<head[\s\S]*?<\/head>/i, '');
  const errs = [];
  const title = attr(html, /<title>([^<]*)<\/title>/);
  const desc = attr(html, /<meta name="description" content="([^"]*)"/);
  if (!title || title.length < 50 || title.length > 60) errs.push(`title length ${title?.length}: ${title}`);
  if (!desc || desc.length < 150 || desc.length > 160) errs.push(`description length ${desc?.length}: ${desc}`);
  const canonical = attr(html, /<link rel="canonical" href="([^"]+)"/);
  if (canonical !== `${SITE}${p}`) errs.push(`canonical ${canonical} != ${SITE}${p}`);
  if (/noindex/i.test((html.match(/<meta[^>]+robots[^>]*>/gi) || []).join(' '))) errs.push('noindex present');
  if (!sitemapUrls.has(`${SITE}${p}`)) errs.push('not in sitemap');
  if (!/<meta property="article:modified_time" content="\d{4}-\d{2}-\d{2}/.test(html)) errs.push('no modified date (sitemap lastmod)');
  const og = attr(html, /<meta property="og:image" content="([^"]+)"/);
  if (!og || !og.startsWith(SITE) || !fs.existsSync(path.join(DIST, decodeURIComponent(new URL(og).pathname)))) errs.push(`og:image file missing ${og}`);
  const mainHtml = (html.match(/<main[\s\S]*<\/main>/i) || [body])[0];
  const visible = norm(text(body));
  const ans = html.match(/<(p|div)[^>]*data-answer[^>]*>([\s\S]*?)<\/\1>/i);
  const ansWords = ans ? text(ans[2]).split(' ').length : 0;
  if (ansWords < 20) errs.push(`direct answer missing/short (${ansWords} words)`);
  const h1 = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
  if (!h1) errs.push('no h1');
  const internal = new Set([...mainHtml.matchAll(/<a [^>]*href="([^"#]+)"/g)].map((m) => m[1])
    .filter((h) => h.startsWith('/') || h.startsWith(SITE)).filter((h) => h !== p));
  if (internal.size < 2) errs.push(`internal links in main: ${internal.size}`);
  if (NEEDS_SOURCES(p) && !SOURCE_RE.test(mainHtml)) errs.push('no primary-source link in main');
  if (PLACEHOLDER.test(text(body)) || PLACEHOLDER.test(title || '')) errs.push('placeholder text');
  const blocks = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((m) => m[1]);
  if (!blocks.length) errs.push('no JSON-LD');
  for (const b of blocks) {
    let j; try { j = JSON.parse(b); } catch (e) { errs.push('LD parse error ' + e.message); continue; }
    for (const n of j['@graph'] || [j]) {
      const t = n['@type'];
      if (['Review', 'AggregateRating', 'Offer'].includes(t)) errs.push(`forbidden LD type ${t}`);
      if (t === 'FAQPage') for (const q of n.mainEntity || []) {
        if (!visible.includes(norm(q.name))) errs.push(`FAQ question not visible: ${q.name}`);
        if (!visible.includes(norm(q.acceptedAnswer?.text || ''))) errs.push(`FAQ answer not visible: ${q.name}`);
      }
      if ((t === 'Article' || t === 'TechArticle') && h1 && norm(text(h1[1])) !== norm(n.headline)) errs.push('Article headline != h1');
      if ((t === 'Article' || t === 'TechArticle') && !n.dateModified) errs.push('Article without dateModified');
      if (t === 'BreadcrumbList') for (const it of n.itemListElement || []) if (!visible.includes(norm(it.name))) errs.push(`breadcrumb not visible: ${it.name}`);
      if (t && /Page$/.test(t) && t !== 'FAQPage' && n.name && !visible.includes(norm(n.name))) errs.push(`${t} name not visible: ${n.name}`);
      if (t === 'Dataset' && !n.dateModified && !n.temporalCoverage) errs.push('Dataset without date');
    }
  }
  checked++;
  if (errs.length) failures.push({ page: p, errs });
}
for (const f of ['robots.txt', 'ads.txt', 'llms.txt', 'feed.xml', '404.html']) if (!fs.existsSync(path.join(DIST, f))) failures.push({ page: '/' + f, errs: ['missing'] });
const robots = fs.existsSync(path.join(DIST, 'robots.txt')) ? fs.readFileSync(path.join(DIST, 'robots.txt'), 'utf8') : '';
if (!robots.includes(`Sitemap: ${SITE}/sitemap-index.xml`) || /^Disallow:\s*\/\s*$/m.test(robots)) failures.push({ page: '/robots.txt', errs: ['bad robots'] });
const cfg = fs.readFileSync(path.resolve('src/site.config.ts'), 'utf8');
const key = (cfg.match(/indexNowKey:\s*'([^']+)'/) || [])[1];
if (!key || !fs.existsSync(path.join(DIST, key + '.txt'))) failures.push({ page: '/<indexnow>.txt', errs: ['IndexNow key file missing'] });
const ads = fs.existsSync(path.join(DIST, 'ads.txt')) ? fs.readFileSync(path.join(DIST, 'ads.txt'), 'utf8').trim() : '';
if (ads !== 'google.com, pub-4490818204529253, DIRECT, f08c47fec0942fa0') failures.push({ page: '/ads.txt', errs: ['ads.txt content'] });

// Ads gate: AdSense loader must be absent unless PUBLIC_ADS_ENABLED=true; verification meta and ads.txt stay regardless.
{
  const adsOn = process.env.PUBLIC_ADS_ENABLED === 'true';
  for (const f of walk(DIST).filter((f) => f.endsWith('.html'))) {
    const h = fs.readFileSync(f, 'utf8');
    const loader = /pagead2\.googlesyndication\.com\/pagead\/js\/adsbygoogle\.js/.test(h) || /class="adsbygoogle"/.test(h);
    const rel = f.slice(DIST.length);
    if (!adsOn && loader) failures.push({ page: rel, errs: ['AdSense loader/ad unit present while PUBLIC_ADS_ENABLED is not true'] });
    if (adsOn && !/pagead2\.googlesyndication\.com\/pagead\/js\/adsbygoogle\.js\?client=ca-pub-4490818204529253/.test(h)) failures.push({ page: rel, errs: ['ads enabled but AdSense loader missing'] });
  }
}

for (const f of failures) console.log(`FAIL ${f.page}\n  - ${f.errs.join('\n  - ')}`);
console.log(`gate: ${checked} pages checked, ${sitemapUrls.size} sitemap URLs, ${failures.length} failing`);
process.exit(failures.length ? 1 : 0);
