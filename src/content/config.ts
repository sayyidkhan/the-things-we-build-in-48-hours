import { defineCollection, z } from "astro:content";

const hackathons = defineCollection({
  type: "content",
  schema: z.object({
    number: z.number(),
    title: z.string(),
    event: z.string(),
    date: z.string(),
    result: z.string(),
    project: z.string(),
    stack: z.array(z.string()),
    lesson: z.string(),
    demoUrl: z.string().optional(),
    githubUrl: z.string().optional(),
    coverImage: z.string().optional(),
  }),
});

const essays = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    date: z.string(),
    description: z.string(),
  }),
});

export const collections = { hackathons, essays };
