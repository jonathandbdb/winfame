import { getCollection, type CollectionEntry } from "astro:content";

export type Product = CollectionEntry<"products">;
export type Category = CollectionEntry<"categories">;

export async function getCategories() {
  return (await getCollection("categories")).sort((a, b) => a.data.order - b.data.order);
}

export async function getProducts(categoryId?: string) {
  const all = await getCollection("products", (p) => !categoryId || p.data.category.id === categoryId);
  const categoryOrder = Object.fromEntries((await getCategories()).map((c) => [c.id, c.data.order]));
  return all.sort(
    (a, b) =>
      categoryOrder[a.data.category.id] - categoryOrder[b.data.category.id] ||
      a.data.order - b.data.order ||
      a.data.title.localeCompare(b.data.title),
  );
}

export const productUrl = (p: Product) => p.data.link ?? `/products/${p.data.category.id}/${p.id}`;

// Text indexed by the client-side catalog search (model numbers included).
export const searchText = (p: Product) =>
  [p.data.title, p.data.summary, p.data.design, ...p.data.tags, ...p.data.variants.map((v) => v.model)]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
