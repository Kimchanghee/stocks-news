import type { APIRoute } from 'astro';
import { site } from '../site.config';
import { allArticles } from '../lib/content';

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export const GET: APIRoute = async () => {
  const items = (await allArticles()).sort((a, b) => (a.data.updated < b.data.updated ? 1 : -1));
  const last = items[0]?.data.updated ?? site.launched;
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
<title>${esc(site.name)}: guides and form explainers</title>
<link>${site.url}/guides/</link>
<atom:link href="${site.url}/feed.xml" rel="self" type="application/rss+xml" />
<description>${esc(site.description)}</description>
<language>en-us</language>
<lastBuildDate>${new Date(last + 'T00:00:00Z').toUTCString()}</lastBuildDate>
${items.map((a) => `<item>
<title>${esc(a.data.h1)}</title>
<link>${site.url}${a.path}</link>
<guid isPermaLink="true">${site.url}${a.path}</guid>
<pubDate>${new Date(a.data.published + 'T00:00:00Z').toUTCString()}</pubDate>
<description>${esc(a.data.answer)}</description>
</item>`).join('\n')}
</channel>
</rss>
`;
  return new Response(xml, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } });
};
