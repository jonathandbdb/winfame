import { defineCollection, reference, z } from "astro:content";
import { glob } from "astro/loaders";

// Technical line drawings used until real product photos are available.
export const illustrations = [
  "round-blade",
  "double-edge",
  "clear-cornea",
  "double-lancet",
  "straight-lancet",
  "trapezoid",
  "lri-knife",
  "forceps",
  "scissors",
  "needle-holder",
  "scalpel",
  "ultrasound",
  "vr-headset",
] as const;

const categories = defineCollection({
  loader: glob({ pattern: "**/*.yaml", base: "./src/content/categories" }),
  schema: z.object({
    title: z.string(),
    order: z.number(),
    summary: z.string(),
    illustration: z.enum(illustrations),
  }),
});

const products = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/products" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      category: reference("categories"),
      summary: z.string(),
      order: z.number().default(100),
      featured: z.boolean().default(false),
      // Placeholder products show a "catalog in preparation" notice.
      placeholder: z.boolean().default(false),
      illustration: z.enum(illustrations),
      images: z.array(image()).default([]),
      series: z.string().optional(),
      design: z.string().optional(),
      variants: z
        .array(
          z.object({
            model: z.string(),
            spec: z.string(),
            notes: z.string().optional(),
          }),
        )
        .default([]),
      specs: z.record(z.string(), z.string()).default({}),
      tags: z.array(z.string()).default([]),
      // External page that replaces the product detail (e.g. IOL Simulator).
      link: z.string().optional(),
    }),
});

export const collections = { categories, products };
