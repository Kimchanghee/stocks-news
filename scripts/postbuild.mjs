// Post-build: write sitemap-index.xml + sharded sitemaps into dist/ from the built HTML.
// lastmod comes from each page's article:modified_time (real content/data date); the gate flags pages without it.
import fs from 'node:fs';
import path from 'node:path';

const SITE = process.env.SITE_URL || 'https://stockmarketnews.online';
const DIST = path.resolve('dist');
const SHARDS = [
  ['companies', (loc) => loc.includes('/company/')],
  ['articles', (loc) => /\/(guides|forms)\//.test(loc)],
  ['pages', () => true],
];

function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, out); else if (e.name.endsWith('.html')) out.push(p);
  }
  return out;
}
const attr = (html, re) => (html.match(re) || [])[1];

const pages = [];
for (const f of walk(DIST)) {
  const html = fs.readFileSync(f, 'utf8');
  const rel = '/' + path.relative(DIST, f).replace(/\\/g, '/');
  if (rel === '/404.html' || rel.startsWith('/404/')) continue;
  if (/<meta[^>]+name="robots"[^>]+noindex/i.test(html)) continue;
  const canonical = attr(html, /<link rel="canonical" href="([^"]+)"/);
  if (!canonical) continue;
  pages.push({ loc: canonical, lastmod: attr(html, /<meta property="article:modified_time" content="([^"]+)"/) });
}
pages.sort((a, b) => a.loc.localeCompare(b.loc));
const used = new Set();
const idx = [];
for (const [name, test] of SHARDS) {
  const list = pages.filter((p) => !used.has(p) && test(p.loc));
  list.forEach((p) => used.add(p));
  if (!list.length) continue;
  const body = list.map((p) => `<url><loc>${p.loc}</loc>${p.lastmod ? `<lastmod>${p.lastmod}</lastmod>` : ''}</url>`).join('\n');
  fs.writeFileSync(path.join(DIST, `sitemap-${name}.xml`), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`);
  const lm = list.map((p) => p.lastmod).filter(Boolean).sort().at(-1);
  idx.push(`<sitemap><loc>${SITE}/sitemap-${name}.xml</loc>${lm ? `<lastmod>${lm}</lastmod>` : ''}</sitemap>`);
}
fs.writeFileSync(path.join(DIST, 'sitemap-index.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${idx.join('\n')}\n</sitemapindex>\n`);
console.log(`sitemaps: ${pages.length} URLs in ${idx.length} shards`);
