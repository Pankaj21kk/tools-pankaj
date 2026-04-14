"use client";

import { useMemo, useState } from "react";
import Script from "next/script";
import { Bookmark, Search, Sparkles, TrendingUp } from "lucide-react";

import { CategoryCard } from "@/components/category-card";
import { Button } from "@/components/ui/button";
import { Marquee } from "@/components/ui/marquee";
import { NumberTicker } from "@/components/ui/number-ticker";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import { categories, getOfficialUrl } from "@/lib/tool-data";

const popularCategories = [...categories]
  .map((category) => ({
    ...category,
    total: category.softwareTools.length + category.aiTools.length,
  }))
  .sort((a, b) => b.total - a.total)
  .slice(0, 4);

const popularTools = Array.from(
  new Set(categories.flatMap((category) => [...category.softwareTools, ...category.aiTools]))
)
  .slice(0, 8)
  .map((tool) => ({
    name: tool,
    href: getOfficialUrl(tool),
  }));

export default function Home() {
  const [search, setSearch] = useState("");
  const [sortMode, setSortMode] = useState<"default" | "az" | "popular">("default");
  const [favorites, setFavorites] = useState<string[]>([]);
  const [savedTools, setSavedTools] = useState<string[]>([]);

  const filteredCategories = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return categories;

    return categories.filter((category) => {
      const bucket = [
        category.title,
        category.usedFor,
        ...category.softwareTools,
        ...category.aiTools,
      ]
        .join(" ")
        .toLowerCase();

      return bucket.includes(q);
    });
  }, [search]);

  const suggestedCategories = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return [];
    return categories.filter((category) => {
      const bucket = [category.title, category.usedFor].join(" ").toLowerCase();
      return bucket.includes(q);
    });
  }, [search]);

  const suggestedTools = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return [];

    return categories
      .flatMap((category) => [...category.softwareTools, ...category.aiTools])
      .filter((tool, index, list) => list.indexOf(tool) === index)
      .filter((tool) => tool.toLowerCase().includes(q))
      .slice(0, 12);
  }, [search]);

  const visibleCategories = useMemo(() => {
    const sorted = [...filteredCategories];

    if (sortMode === "az") {
      return sorted.sort((first, second) => first.title.localeCompare(second.title));
    }

    if (sortMode === "popular") {
      return sorted.sort(
        (first, second) =>
          second.softwareTools.length + second.aiTools.length -
          (first.softwareTools.length + first.aiTools.length)
      );
    }

    return sorted;
  }, [filteredCategories, sortMode]);

  const toggleFavorite = (tool: string) => {
    setFavorites((current) =>
      current.includes(tool)
        ? current.filter((item) => item !== tool)
        : [...current, tool]
    );
  };

  const toggleSaved = (tool: string) => {
    setSavedTools((current) =>
      current.includes(tool)
        ? current.filter((item) => item !== tool)
        : [...current, tool]
    );
  };

  const seoJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Pankaj Portfolio Tools Directory",
    description:
      "Category-wise software and AI tools for engineering, design, development, and research.",
    mainEntity: {
      "@type": "ItemList",
      itemListElement: categories.map((category, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: category.title,
      })),
    },
  };

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100">
      <Script
        id="home-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(seoJsonLd) }}
      />
      <ScrollProgress className="h-1 from-zinc-800 via-zinc-500 to-zinc-300 dark:from-zinc-200 dark:via-zinc-500 dark:to-zinc-700" />

      <main className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <section className="rounded-3xl border border-zinc-300 bg-white p-5 shadow-[0_14px_36px_rgba(20,20,20,0.08)] backdrop-blur sm:p-8 dark:border-zinc-700 dark:bg-zinc-900">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="inline-flex rounded-full border border-zinc-300 bg-zinc-100 px-4 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-zinc-800 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200">
              Pankaj Portfolio
            </p>
          </div>

          <h1 className="mt-4 text-3xl font-bold leading-tight sm:text-5xl">
            Explore Professional Tool Categories
          </h1>
          <p className="mt-3 max-w-3xl text-base leading-7 text-zinc-700 dark:text-zinc-300">
            Search by category or tool name. Open each category page to view all tools with links in a clean, mobile and tablet friendly layout.
          </p>

          <div className="mt-5 flex flex-wrap gap-2">
            <Button asChild variant="default" size="sm">
              <a href="#catalog">View catalog sections</a>
            </Button>
            <Button asChild variant="outline" size="sm">
              <a href="#search-results">Jump to results</a>
            </Button>
          </div>

          <label className="mt-5 flex items-center gap-2 rounded-xl border border-zinc-300 bg-white px-3 py-2 dark:border-zinc-700 dark:bg-zinc-900">
            <Search className="size-4 text-zinc-500 dark:text-zinc-400" />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search categories or tools..."
              className="w-full min-w-40 bg-transparent text-sm outline-none placeholder:text-zinc-500 dark:text-zinc-100 dark:placeholder:text-zinc-400"
            />
          </label>

          <div className="mt-4 flex flex-wrap items-center gap-2 text-sm font-semibold text-zinc-700 dark:text-zinc-200">
            <span className="mr-2 text-xs uppercase tracking-[0.14em] text-zinc-500 dark:text-zinc-400">Sort categories</span>
            <button type="button" onClick={() => setSortMode("default")} className={`rounded-full border px-3 py-1.5 ${sortMode === "default" ? "border-zinc-900 bg-zinc-900 text-white dark:border-zinc-100 dark:bg-zinc-100 dark:text-zinc-900" : "border-zinc-300 bg-white text-zinc-700 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200"}`}>
              Default
            </button>
            <button type="button" onClick={() => setSortMode("az")} className={`rounded-full border px-3 py-1.5 ${sortMode === "az" ? "border-zinc-900 bg-zinc-900 text-white dark:border-zinc-100 dark:bg-zinc-100 dark:text-zinc-900" : "border-zinc-300 bg-white text-zinc-700 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200"}`}>
              A-Z
            </button>
            <button type="button" onClick={() => setSortMode("popular")} className={`rounded-full border px-3 py-1.5 ${sortMode === "popular" ? "border-zinc-900 bg-zinc-900 text-white dark:border-zinc-100 dark:bg-zinc-100 dark:text-zinc-900" : "border-zinc-300 bg-white text-zinc-700 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200"}`}>
              Popular
            </button>
          </div>

          {search.trim() ? (
            <div className="mt-4 grid gap-4 lg:grid-cols-[1fr_280px]">
              <div id="search-results" className="rounded-2xl border border-zinc-300 bg-zinc-100 p-4 dark:border-zinc-700 dark:bg-zinc-950">
                <div className="flex items-center gap-2 text-sm font-semibold text-zinc-700 dark:text-zinc-200">
                  <Search className="size-4" /> Live tool results
                </div>
                <div className="mt-3 grid gap-2 sm:grid-cols-2">
                  {suggestedTools.length === 0 ? (
                    <p className="text-sm text-zinc-600 dark:text-zinc-300">No matching tool found.</p>
                  ) : (
                    suggestedTools.map((tool) => (
                      <div key={tool} className="rounded-xl border border-zinc-200 bg-white px-3 py-2 dark:border-zinc-700 dark:bg-zinc-900">
                        <div className="flex items-center justify-between gap-2">
                          <a href={getOfficialUrl(tool)} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-zinc-900 hover:underline dark:text-zinc-100">
                            {tool}
                          </a>
                          <div className="flex items-center gap-1">
                            <button type="button" onClick={() => navigator.clipboard.writeText(tool)} className="rounded-full border border-zinc-300 px-2 py-1 text-[11px] font-semibold text-zinc-700 dark:border-zinc-700 dark:text-zinc-200">
                              Copy
                            </button>
                            <button type="button" onClick={() => toggleFavorite(tool)} className="rounded-full border border-zinc-300 px-2 py-1 text-[11px] font-semibold text-zinc-700 dark:border-zinc-700 dark:text-zinc-200">
                              <Bookmark className="mr-1 inline size-3" />
                              Favorite
                            </button>
                            <button type="button" onClick={() => toggleSaved(tool)} className="rounded-full border border-zinc-300 px-2 py-1 text-[11px] font-semibold text-zinc-700 dark:border-zinc-700 dark:text-zinc-200">
                              Saved
                            </button>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              <div className="space-y-4">
                <div className="rounded-2xl border border-zinc-300 bg-white p-4 dark:border-zinc-700 dark:bg-zinc-900">
                  <div className="flex items-center gap-2 text-sm font-semibold text-zinc-700 dark:text-zinc-200">
                    <Sparkles className="size-4 text-zinc-500 dark:text-zinc-300" /> Matching categories
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {suggestedCategories.length === 0 ? (
                      <p className="text-sm text-zinc-600 dark:text-zinc-300">No matching category.</p>
                    ) : (
                      suggestedCategories.map((category) => (
                        <a key={category.id} href={`/categories/${category.id}`} className="rounded-full border border-zinc-300 px-3 py-1 text-xs font-semibold text-zinc-700 dark:border-zinc-700 dark:text-zinc-200">
                          {category.title}
                        </a>
                      ))
                    )}
                  </div>
                </div>

                <div className="rounded-2xl border border-zinc-300 bg-white p-4 dark:border-zinc-700 dark:bg-zinc-900">
                  <div className="flex items-center gap-2 text-sm font-semibold text-zinc-700 dark:text-zinc-200">
                    <TrendingUp className="size-4 text-zinc-500 dark:text-zinc-300" /> Popular categories
                  </div>
                  <div className="mt-3 space-y-2">
                    {popularCategories.map((category) => (
                      <div key={category.id} className="flex items-center justify-between rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2 dark:border-zinc-700 dark:bg-zinc-950">
                        <a href={`/categories/${category.id}`} className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                          {category.title}
                        </a>
                        <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">{category.total}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : null}

          <div className="mt-5 flex flex-wrap gap-2">
            <span className="inline-flex items-center gap-1 rounded-full border border-zinc-300 bg-white px-3 py-1 text-xs font-semibold text-zinc-700 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200">
              <Bookmark className="size-3" /> Favorites {favorites.length}
            </span>
            <span className="inline-flex items-center gap-1 rounded-full border border-zinc-300 bg-white px-3 py-1 text-xs font-semibold text-zinc-700 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200">
              <Sparkles className="size-3" /> Saved {savedTools.length}
            </span>
          </div>

          <div className="mt-5 rounded-2xl border border-zinc-300 bg-white p-3 dark:border-zinc-700 dark:bg-zinc-900">
            <Marquee pauseOnHover className="[--duration:24s]">
              {popularTools.map((tool) => (
                <a key={tool.name} href={tool.href} target="_blank" rel="noopener noreferrer" className="rounded-full border border-zinc-200 bg-white px-3 py-1 text-xs font-semibold text-zinc-700 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200">
                  {tool.name}
                </a>
              ))}
            </Marquee>
          </div>
        </section>

        <section id="catalog" className="mt-6 grid gap-4 scroll-mt-24">
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-zinc-300 bg-white px-4 py-3 dark:border-zinc-700 dark:bg-zinc-900">
            <div>
              <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Catalog sections</h2>
              <p className="text-sm text-zinc-600 dark:text-zinc-300">Use A-Z or popular sorting, then open a category to view its tools.</p>
            </div>
          </div>

          {visibleCategories.length === 0 ? (
            <article className="rounded-2xl border border-black/10 bg-white/80 p-6 text-center dark:border-white/10 dark:bg-zinc-900/75">
              <h2 className="text-xl font-semibold">No category found</h2>
              <p className="mt-2 text-zinc-600 dark:text-zinc-300">
                Try another keyword.
              </p>
            </article>
          ) : (
            visibleCategories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))
          )}
        </section>
      </main>
    </div>
  );
}
