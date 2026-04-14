import type { Metadata } from "next";

import { CategoryCard } from "@/components/category-card";
import { categories } from "@/lib/tool-data";

export const metadata: Metadata = {
  title: "All Tool Categories | Pankaj Portfolio",
  description: "Browse all professional tool categories.",
  alternates: { canonical: "/categories" },
  openGraph: {
    title: "All Tool Categories | Pankaj Portfolio",
    description: "Browse all professional tool categories with software and AI tools.",
    url: "/categories",
    type: "website",
    images: [{ url: "/og", width: 1200, height: 630, alt: "Pankaj tools categories" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "All Tool Categories | Pankaj Portfolio",
    description: "Browse all professional tool categories with software and AI tools.",
    images: ["/og"],
  },
};

export default function CategoriesPage() {
  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-zinc-900 sm:text-4xl dark:text-zinc-100">All Categories</h1>
      <p className="mt-2 text-zinc-700 dark:text-zinc-300">
        Open a category to see complete tool cards and official links.
      </p>

      <section className="mt-6 grid gap-4">
        {categories.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </section>
    </main>
  );
}
