"use client";

import { useEffect, useMemo, useState } from "react";
import { ArrowUpRight, Bookmark, BookmarkCheck, Copy, Search, Share2, TrendingUp } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Marquee } from "@/components/ui/marquee";

import type { ToolCategory } from "@/lib/tool-data";
import { getOfficialUrl } from "@/lib/tool-data";

export function CategoryDetailClient({ category }: { category: ToolCategory }) {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [savedTools, setSavedTools] = useState<string[]>([]);
  const [search, setSearch] = useState("");
  const [sortMode, setSortMode] = useState<"default" | "az" | "za" | "free-first" | "paid-first">("default");
  const [pricingMode, setPricingMode] = useState<"all" | "free" | "paid">("all");
  const [hydrated, setHydrated] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  useEffect(() => {
    try {
      const rawFavorites = localStorage.getItem("tool-favorites");
      const rawSaved = localStorage.getItem("tool-saved");
      setFavorites(rawFavorites ? (JSON.parse(rawFavorites) as string[]) : []);
      setSavedTools(rawSaved ? (JSON.parse(rawSaved) as string[]) : []);
    } catch {
      setFavorites([]);
      setSavedTools([]);
    } finally {
      setHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!hydrated) return;

    localStorage.setItem("tool-favorites", JSON.stringify(favorites));
    localStorage.setItem("tool-saved", JSON.stringify(savedTools));
    window.dispatchEvent(
      new CustomEvent("tool-stats-updated", {
        detail: { favorites: favorites.length, saved: savedTools.length },
      })
    );
  }, [favorites, savedTools, hydrated]);

  const freeTools = useMemo(
    () =>
      category.softwareTools.filter((tool) =>
        /^(visual studio code|git|github|docker|figma|node\.js|react|next\.js|firebase|blender|obs studio|jira|postman|kubernetes|github copilot|chatgpt)$/i.test(
          tool
        )
      ),
    [category.softwareTools]
  );

  const paidTools = useMemo(
    () => category.softwareTools.filter((tool) => !freeTools.includes(tool)),
    [category.softwareTools, freeTools]
  );

  const toggleFavorite = (tool: string) => {
    setFavorites((current) => {
      const next = current.includes(tool) ? current.filter((item) => item !== tool) : [...current, tool];
      setFeedback(next.includes(tool) ? `${tool} added to favorites` : `${tool} removed from favorites`);
      return next;
    });
  };

  const toggleSaved = (tool: string) => {
    setSavedTools((current) => {
      const next = current.includes(tool) ? current.filter((item) => item !== tool) : [...current, tool];
      setFeedback(next.includes(tool) ? `${tool} saved` : `${tool} removed from saved`);
      return next;
    });
  };

  const copyToolLink = async (tool: string) => {
    await navigator.clipboard.writeText(getOfficialUrl(tool));
    setFeedback(`${tool} copied`);
  };

  const shareToolLink = async (tool: string) => {
    const url = getOfficialUrl(tool);
    if (typeof navigator.share === "function") {
      try {
        await navigator.share({ title: tool, url });
        return;
      } catch {
        // fallback
      }
    }
    await navigator.clipboard.writeText(url);
  };

  const visibleSoftwareTools =
    pricingMode === "all"
      ? category.softwareTools
      : pricingMode === "free"
        ? freeTools
        : paidTools;

  const popularTools = useMemo(
    () =>
      Array.from(
        new Set([
          ...category.softwareTools.slice(0, 6),
          ...category.aiTools.slice(0, 6),
        ])
      ).slice(0, 8),
    [category.aiTools, category.softwareTools]
  );

  const visibleSoftwareToolsWithSearch = useMemo(() => {
    const query = search.trim().toLowerCase();
    const base = query
      ? visibleSoftwareTools.filter((tool) => tool.toLowerCase().includes(query))
      : visibleSoftwareTools;

    const sorted = [...base];
    if (sortMode === "az") {
      sorted.sort((first, second) => first.localeCompare(second));
    }
    if (sortMode === "za") {
      sorted.sort((first, second) => second.localeCompare(first));
    }
    if (sortMode === "free-first") {
      sorted.sort((first, second) => Number(freeTools.includes(second)) - Number(freeTools.includes(first)));
    }
    if (sortMode === "paid-first") {
      sorted.sort((first, second) => Number(freeTools.includes(first)) - Number(freeTools.includes(second)));
    }
    return sorted;
  }, [freeTools, search, sortMode, visibleSoftwareTools]);

  const visibleAiTools = useMemo(() => {
    const query = search.trim().toLowerCase();
    const base = query
      ? category.aiTools.filter((tool) => tool.toLowerCase().includes(query))
      : category.aiTools;

    if (sortMode === "az") {
      return [...base].sort((first, second) => first.localeCompare(second));
    }
    if (sortMode === "za") {
      return [...base].sort((first, second) => second.localeCompare(first));
    }
    return base;
  }, [category.aiTools, search, sortMode]);

  const categoryToolPool = useMemo(
    () => new Set([...category.softwareTools, ...category.aiTools]),
    [category.softwareTools, category.aiTools]
  );

  const categoryFavorites = useMemo(
    () => favorites.filter((tool) => categoryToolPool.has(tool)),
    [favorites, categoryToolPool]
  );

  const categorySaved = useMemo(
    () => savedTools.filter((tool) => categoryToolPool.has(tool)),
    [savedTools, categoryToolPool]
  );

  useEffect(() => {
    if (!feedback) return;
    const timer = window.setTimeout(() => setFeedback(null), 1800);
    return () => window.clearTimeout(timer);
  }, [feedback]);

  return (
    <main className="mx-auto w-full max-w-6xl bg-zinc-50 px-4 py-8 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100 sm:px-6 lg:px-8">
      {feedback ? (
        <div className="fixed right-4 top-4 z-50 rounded-full border border-zinc-300 bg-white px-4 py-2 text-xs font-semibold text-zinc-700 shadow-[0_12px_28px_rgba(20,20,20,0.12)] dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100">
          {feedback}
        </div>
      ) : null}

      <div className="rounded-3xl border border-zinc-300 bg-linear-to-br from-white via-zinc-50 to-zinc-100 p-6 shadow-[0_12px_30px_rgba(20,20,20,0.08)] dark:border-zinc-700 dark:from-zinc-900 dark:via-zinc-900 dark:to-zinc-800">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-zinc-500 dark:text-zinc-400">
          Category Detail
        </p>
        <h1 className="mt-2 text-3xl font-bold text-zinc-900 sm:text-4xl dark:text-zinc-100">{category.title}</h1>
        <p className="mt-3 text-zinc-700 dark:text-zinc-300">{category.usedFor}</p>
        <div className="mt-4 rounded-xl border border-zinc-200 bg-linear-to-br from-zinc-100 to-zinc-200 p-4 text-center text-sm font-semibold text-zinc-700 dark:border-zinc-700 dark:from-zinc-900 dark:to-zinc-800 dark:text-zinc-200">
          {category.visual}
        </div>
      </div>

      <section className="mt-6 rounded-3xl border border-zinc-300 bg-linear-to-br from-white via-zinc-50 to-zinc-100 p-5 shadow-[0_10px_22px_rgba(20,20,20,0.08)] dark:border-zinc-700 dark:from-zinc-900 dark:via-zinc-900 dark:to-zinc-800">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-zinc-500 dark:text-zinc-400">
            Category tools search
          </p>
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Find tools in this category</h2>
        </div>

        <label className="mt-4 flex items-center gap-2 rounded-xl border border-zinc-300 bg-zinc-50 px-3 py-2 dark:border-zinc-700 dark:bg-zinc-950">
          <Search className="size-4 text-zinc-500 dark:text-zinc-400" />
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder={`Search in ${category.title} tools...`}
            className="w-full bg-transparent text-sm text-zinc-900 outline-none placeholder:text-zinc-500 dark:text-zinc-100 dark:placeholder:text-zinc-400"
          />
        </label>

        <div className="mt-3 rounded-xl border border-zinc-200 bg-zinc-50 p-3 dark:border-zinc-700 dark:bg-zinc-950">
          <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-zinc-700 dark:text-zinc-200">
            <TrendingUp className="size-4 text-zinc-500 dark:text-zinc-300" /> Popular tools
          </div>
          <Marquee pauseOnHover className="[--duration:22s]">
            {popularTools.map((tool) => (
              <a
                key={tool}
                href={getOfficialUrl(tool)}
                target="_blank"
                rel="noopener noreferrer"
                className="mr-2 rounded-full border border-zinc-300 bg-white px-3 py-1 text-xs font-semibold text-zinc-700 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200"
              >
                {tool}
              </a>
            ))}
          </Marquee>
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold uppercase tracking-[0.14em] text-zinc-500">Sort by</span>
          <Button type="button" size="sm" variant={sortMode === "default" ? "default" : "outline"} onClick={() => setSortMode("default")} className={`rounded-full ${sortMode === "default" ? "bg-zinc-900 text-white hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900" : ""}`}>
            Default
          </Button>
          <Button type="button" size="sm" variant={sortMode === "az" ? "default" : "outline"} onClick={() => setSortMode("az")} className={`rounded-full ${sortMode === "az" ? "bg-zinc-900 text-white hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900" : ""}`}>
            A-Z
          </Button>
          <Button type="button" size="sm" variant={sortMode === "za" ? "default" : "outline"} onClick={() => setSortMode("za")} className={`rounded-full ${sortMode === "za" ? "bg-zinc-900 text-white hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900" : ""}`}>
            Z-A
          </Button>
          <Button type="button" size="sm" variant={sortMode === "free-first" ? "default" : "outline"} onClick={() => setSortMode("free-first")} className={`rounded-full ${sortMode === "free-first" ? "bg-zinc-900 text-white hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900" : ""}`}>
            Free first
          </Button>
          <Button type="button" size="sm" variant={sortMode === "paid-first" ? "default" : "outline"} onClick={() => setSortMode("paid-first")} className={`rounded-full ${sortMode === "paid-first" ? "bg-zinc-900 text-white hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900" : ""}`}>
            Paid first
          </Button>
        </div>
      </section>

      <section className="mt-6 flex flex-wrap gap-2">
          <Button
            type="button"
            size="sm"
            variant={pricingMode === "all" ? "default" : "outline"}
            onClick={() => setPricingMode("all")}
            className={`rounded-full ${pricingMode === "all" ? "bg-zinc-900 text-white hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900" : ""}`}
          >
          All
          </Button>
          <Button
            type="button"
            size="sm"
            variant={pricingMode === "free" ? "default" : "outline"}
            onClick={() => setPricingMode("free")}
            className={`rounded-full ${pricingMode === "free" ? "bg-zinc-800 text-white hover:bg-zinc-700 dark:bg-zinc-200 dark:text-zinc-900" : ""}`}
          >
          Free
          </Button>
          <Button
            type="button"
            size="sm"
            variant={pricingMode === "paid" ? "default" : "outline"}
            onClick={() => setPricingMode("paid")}
            className={`rounded-full ${pricingMode === "paid" ? "bg-zinc-700 text-white hover:bg-zinc-600 dark:bg-zinc-300 dark:text-zinc-900" : ""}`}
          >
          Paid
          </Button>
      </section>

      <section className="mt-6 rounded-3xl border border-zinc-300 bg-linear-to-br from-white via-zinc-50 to-zinc-100 p-5 shadow-[0_10px_22px_rgba(20,20,20,0.08)] dark:border-zinc-700 dark:from-zinc-900 dark:via-zinc-900 dark:to-zinc-800">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Added in this category</h2>
          <a
            href="/library?tab=favorites"
            className="rounded-full border border-zinc-300 bg-white px-3 py-1 text-xs font-semibold text-zinc-700 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200"
          >
            Open full library
          </a>
        </div>

        <div className="mt-3 grid gap-3 md:grid-cols-2">
          <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-3 dark:border-zinc-700 dark:bg-zinc-950">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-zinc-500 dark:text-zinc-400">Favorites ({categoryFavorites.length})</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {categoryFavorites.length === 0 ? (
                <span className="text-xs text-zinc-500 dark:text-zinc-400">No favorite tools added yet.</span>
              ) : (
                categoryFavorites.map((tool) => (
                  <a key={`fav-${tool}`} href={getOfficialUrl(tool)} target="_blank" rel="noopener noreferrer" className="rounded-full border border-zinc-300 bg-white px-2.5 py-1 text-xs font-semibold text-zinc-700 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200">
                    {tool}
                  </a>
                ))
              )}
            </div>
          </div>

          <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-3 dark:border-zinc-700 dark:bg-zinc-950">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-zinc-500 dark:text-zinc-400">Saved ({categorySaved.length})</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {categorySaved.length === 0 ? (
                <span className="text-xs text-zinc-500 dark:text-zinc-400">No saved tools added yet.</span>
              ) : (
                categorySaved.map((tool) => (
                  <a key={`saved-${tool}`} href={getOfficialUrl(tool)} target="_blank" rel="noopener noreferrer" className="rounded-full border border-zinc-300 bg-white px-2.5 py-1 text-xs font-semibold text-zinc-700 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200">
                    {tool}
                  </a>
                ))
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="mt-6 grid gap-6 lg:grid-cols-2">
        <article className="rounded-3xl border border-zinc-300 bg-linear-to-br from-white via-zinc-50 to-zinc-100 p-6 dark:border-zinc-700 dark:from-zinc-900 dark:via-zinc-900 dark:to-zinc-800">
          <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100">Software Tools</h2>
          <div className="mt-3 flex flex-wrap gap-2 text-xs font-semibold">
            <span className="rounded-full bg-zinc-100 px-3 py-1 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200">Free {freeTools.length}</span>
            <span className="rounded-full bg-[#fde68a] px-3 py-1 text-[#92400e] dark:bg-zinc-700 dark:text-zinc-200">Paid {paidTools.length}</span>
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {visibleSoftwareToolsWithSearch.map((tool) => {
              const isFree = freeTools.includes(tool);
              return (
                <div key={tool} className="rounded-2xl border border-zinc-200 bg-white/85 p-4 text-base font-medium text-zinc-800 shadow-sm transition dark:border-zinc-700 dark:bg-zinc-900/85 dark:text-zinc-100">
                  <div className="flex items-start justify-between gap-2">
                    <a href={getOfficialUrl(tool)} target="_blank" rel="noopener noreferrer" className="font-semibold hover:underline">
                      {tool}
                    </a>
                    <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ${isFree ? "bg-[#dcfce7] text-[#166534]" : "bg-[#fef3c7] text-[#92400e]"}`}>
                      {isFree ? "Free" : "Paid"}
                    </span>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2 text-[11px] font-semibold">
                    <button type="button" onClick={() => copyToolLink(tool)} className="rounded-full border border-zinc-300 px-2 py-1 transition active:scale-[0.96] hover:border-[#2563eb] hover:text-[#1d4ed8] dark:border-zinc-600">
                      <Copy className="mr-1 inline size-3" />Copy
                    </button>
                    <a href={getOfficialUrl(tool)} target="_blank" rel="noopener noreferrer" className="rounded-full border border-zinc-300 px-2 py-1 dark:border-zinc-600">
                      <ArrowUpRight className="mr-1 inline size-3" />Link
                    </a>
                    <button type="button" onClick={() => shareToolLink(tool)} className="rounded-full border border-zinc-300 px-2 py-1 dark:border-zinc-600">
                      <Share2 className="mr-1 inline size-3" />Share
                    </button>
                    <button type="button" onClick={() => toggleFavorite(tool)} className={`rounded-full border px-2 py-1 transition active:scale-[0.96] ${favorites.includes(tool) ? "border-[#dc2626] bg-[#dc2626]/10 text-[#b91c1c]" : "border-zinc-300 hover:border-[#dc2626] hover:text-[#b91c1c] dark:border-zinc-600"}`}>
                      {favorites.includes(tool) ? <BookmarkCheck className="mr-1 inline size-3" /> : <Bookmark className="mr-1 inline size-3" />}
                      Favorite
                    </button>
                    <button type="button" onClick={() => toggleSaved(tool)} className={`rounded-full border px-2 py-1 transition active:scale-[0.96] ${savedTools.includes(tool) ? "border-[#2563eb] bg-[#2563eb]/10 text-[#1d4ed8]" : "border-zinc-300 hover:border-[#2563eb] hover:text-[#1d4ed8] dark:border-zinc-600"}`}>
                      Saved
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </article>

        <article className="rounded-3xl border border-zinc-300 bg-linear-to-br from-white via-zinc-50 to-zinc-100 p-6 dark:border-zinc-700 dark:from-zinc-900 dark:via-zinc-900 dark:to-zinc-800">
          <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100">AI Tools</h2>
          {visibleAiTools.length === 0 ? (
            <p className="mt-4 text-sm text-zinc-600 dark:text-zinc-300">No dedicated AI tools listed for this category yet.</p>
          ) : (
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {visibleAiTools.map((tool) => (
                <div key={tool} className="rounded-2xl border border-zinc-200 bg-white/85 p-4 text-base font-medium text-zinc-900 shadow-sm transition dark:border-zinc-700 dark:bg-zinc-900/85 dark:text-zinc-100">
                  <div className="flex items-start justify-between gap-2">
                    <a href={getOfficialUrl(tool)} target="_blank" rel="noopener noreferrer" className="font-semibold hover:underline">
                      {tool}
                    </a>
                    <span className="rounded-full bg-[#e0e7ff] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-[#3730a3]">
                      AI
                    </span>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2 text-[11px] font-semibold">
                    <button type="button" onClick={() => copyToolLink(tool)} className="rounded-full border border-zinc-300 px-2 py-1 transition active:scale-[0.96] hover:border-[#2563eb] hover:text-[#1d4ed8] dark:border-zinc-600">
                      <Copy className="mr-1 inline size-3" />Copy
                    </button>
                    <a href={getOfficialUrl(tool)} target="_blank" rel="noopener noreferrer" className="rounded-full border border-zinc-300 px-2 py-1 dark:border-zinc-600">
                      <ArrowUpRight className="mr-1 inline size-3" />Link
                    </a>
                    <button type="button" onClick={() => shareToolLink(tool)} className="rounded-full border border-zinc-300 px-2 py-1 dark:border-zinc-600">
                      <Share2 className="mr-1 inline size-3" />Share
                    </button>
                    <button type="button" onClick={() => toggleFavorite(tool)} className={`rounded-full border px-2 py-1 transition active:scale-[0.96] ${favorites.includes(tool) ? "border-[#dc2626] bg-[#dc2626]/10 text-[#b91c1c]" : "border-zinc-300 hover:border-[#dc2626] hover:text-[#b91c1c] dark:border-zinc-600"}`}>
                      {favorites.includes(tool) ? <BookmarkCheck className="mr-1 inline size-3" /> : <Bookmark className="mr-1 inline size-3" />}
                      Favorite
                    </button>
                    <button type="button" onClick={() => toggleSaved(tool)} className={`rounded-full border px-2 py-1 transition active:scale-[0.96] ${savedTools.includes(tool) ? "border-[#2563eb] bg-[#2563eb]/10 text-[#1d4ed8]" : "border-zinc-300 hover:border-[#2563eb] hover:text-[#1d4ed8] dark:border-zinc-600"}`}>
                      Saved
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </article>
      </section>

    </main>
  );
}
