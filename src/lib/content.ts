import { getCollection } from 'astro:content';

export async function allArticles() {
  const guides = (await getCollection('guides')).map((e) => ({ ...e, path: `/guides/${e.id}/`, kind: 'guide' as const }));
  const forms = (await getCollection('forms')).map((e) => ({ ...e, path: `/forms/${e.id}/`, kind: 'form' as const }));
  return [...forms, ...guides];
}

export async function relatedLinks(paths: string[], self: string) {
  const all = await allArticles();
  const byPath = new Map(all.map((a) => [a.path, a.data.h1]));
  const extra: Record<string, string> = { '/calendar/': '10-Q and 10-K due-date calendar', '/': "This week's filings docket", '/companies/': 'Company filing records', '/methodology/': 'How the docket is built' };
  return paths.filter((p) => p !== self).map((p) => ({ href: p, title: byPath.get(p) ?? extra[p] ?? p }));
}
