import { defineCollection, z } from 'astro:content';

const caseStudies = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    client: z.string(),
    summary: z.string(),
    date: z.string(),
    techStack: z.array(z.string()),
    featureImage: z.string().optional(),
    featured: z.boolean().default(false),
  }),
});

export const collections = { 'case-studies': caseStudies };
