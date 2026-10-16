import type { APIRoute } from 'astro';
import { site } from '../site.config';
import { allArticles } from '../lib/content';

export const GET: APIRoute = async () => {
  const arts = await allArticles();
  const parts = [`# ${site.name} (${site.domain}): full text of form explainers and guides`, '', `> ${site.description}`, ''];
  for (const a of arts) {
    parts.push(`---`, '', `# ${a.data.h1}`, '', `URL: ${site.url}${a.path}`, `Updated: ${a.data.updated}. Facts checked: ${a.data.data_asof}.`, '', `Answer: ${a.data.answer}`, '', (a.body ?? '').trim(), '');
    if (a.data.faq.length) { parts.push('## FAQ', ''); for (const f of a.data.faq) parts.push(`Q: ${f.q}`, `A: ${f.a}`, ''); }
    parts.push('Sources:', ...a.data.sources.map((s) => `- ${s.title}: ${s.url}`), '');
  }
  return new Response(parts.join('\n'), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
