import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// One source of truth per article: frontmatter drives the visible answer, FAQ block, sources list and JSON-LD.
const article = z.object({
  title: z.string().min(50).max(60),
  description: z.string().min(150).max(160),
  h1: z.string(),
  question: z.string(),
  answer: z.string().min(80),
  data_asof: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  published: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  updated: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  sources: z.array(z.object({ title: z.string(), url: z.string().url() })).min(1),
  faq: z.array(z.object({ q: z.string(), a: z.string() })).default([]),
  related: z.array(z.string()).default([]),
  form: z.string().optional(),
  match: z.string().optional(),
  order: z.number().default(100),
});

export const collections = {
  guides: defineCollection({ loader: glob({ pattern: '*.md', base: './src/content/guides' }), schema: article }),
  forms: defineCollection({ loader: glob({ pattern: '*.md', base: './src/content/forms' }), schema: article }),
};
