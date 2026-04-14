"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { Bookmark, Copy, ExternalLink, Heart, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { getOfficialUrl } from "@/lib/tool-data";

type ActiveTab = "favorites" | "saved";

export function LibraryClient({ initialTab = "favorites" }: { initialTab?: ActiveTab }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState<ActiveTab>(initialTab);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [saved, setSaved] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  useEffect(() => {
    try {
      const rawFavorites = localStorage.getItem("tool-favorites");
      const rawSaved = localStorage.getItem("tool-saved");
      setFavorites(rawFavorites ? (JSON.parse(rawFavorites) as string[]) : []);
      setSaved(rawSaved ? (JSON.parse(rawSaved) as string[]) : []);
    } catch {
      setFavorites([]);
      setSaved([]);
    } finally {
      setHydrated(true);
    }
  }, []);

  useEffect(() => {
    const tabParam = searchParams.get("tab");
    const nextTab: ActiveTab = tabParam === "saved" ? "saved" : "favorites";
    setActiveTab(nextTab);
  }, [searchParams]);

  useEffect(() => {
    if (!hydrated) return;

    localStorage.setItem("tool-favorites", JSON.stringify(favorites));
    localStorage.setItem("tool-saved", JSON.stringify(saved));
    window.dispatchEvent(
      new CustomEvent("tool-stats-updated", {
        detail: { favorites: favorites.length, saved: saved.length },
      })
    );
  }, [favorites, saved, hydrated]);

  const currentList = useMemo(
    () => (activeTab === "favorites" ? favorites : saved),
    [activeTab, favorites, saved]
  );

  const copyName = async (name: string) => {
    await navigator.clipboard.writeText(name);
    setFeedback(`${name} copied`);
  };

  const removeItem = (name: string, source: ActiveTab) => {
    if (source === "favorites") {
      setFavorites((current) => current.filter((item) => item !== name));
      setFeedback(`${name} removed from favorites`);
      return;
    }
    setSaved((current) => current.filter((item) => item !== name));
    setFeedback(`${name} removed from saved`);
  };

  const clearCurrent = () => {
    if (activeTab === "favorites") {
      setFavorites([]);
      return;
    }
    setSaved([]);
  };

  useEffect(() => {
    if (!feedback) return;
    const timer = window.setTimeout(() => setFeedback(null), 1800);
    return () => window.clearTimeout(timer);
  }, [feedback]);

  return (
    <main className="mx-auto w-full max-w-6xl bg-zinc-50 px-4 py-8 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100 sm:px-6 lg:px-8">
      <section className="rounded-3xl border border-zinc-300 bg-white p-6 shadow-[0_12px_30px_rgba(20,20,20,0.08)] dark:border-zinc-700 dark:bg-zinc-900">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-zinc-500 dark:text-zinc-400">
          My Library
        </p>
        <h1 className="mt-2 text-3xl font-bold">Favorites and Saved Tools</h1>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">
          Open tool links, copy names, and manage your personal shortlist.
        </p>

        <div className="mt-5 flex flex-wrap gap-2">
          <Button
            size="sm"
            variant={activeTab === "favorites" ? "default" : "outline"}
            className={`rounded-full ${activeTab === "favorites" ? "bg-zinc-900 text-white hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900" : ""}`}
            onClick={() => {
              setActiveTab("favorites");
              router.replace("/library?tab=favorites");
            }}
          >
            <Heart className="h-4 w-4" /> Favorites ({favorites.length})
          </Button>
          <Button
            size="sm"
            variant={activeTab === "saved" ? "default" : "outline"}
            className={`rounded-full ${activeTab === "saved" ? "bg-zinc-900 text-white hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900" : ""}`}
            onClick={() => {
              setActiveTab("saved");
              router.replace("/library?tab=saved");
            }}
          >
            <Bookmark className="h-4 w-4" /> Saved ({saved.length})
          </Button>

          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={clearCurrent}
            className="rounded-full"
          >
            <Trash2 className="h-4 w-4" /> Clear {activeTab}
          </Button>
        </div>

        {feedback ? (
          <div className="fixed right-4 top-4 z-50 rounded-full border border-zinc-300 bg-white px-4 py-2 text-xs font-semibold text-zinc-700 shadow-[0_12px_28px_rgba(20,20,20,0.12)] dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100">
            {feedback}
          </div>
        ) : null}
      </section>

      <section className="mt-6 grid gap-3">
        {activeTab === "saved" && saved.length > 0 ? (
          <article className="rounded-2xl border border-zinc-300 bg-white p-4 dark:border-zinc-700 dark:bg-zinc-900">
            <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-zinc-500 dark:text-zinc-400">
              Saved Tools Links
            </h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {saved.map((tool) => (
                <div
                  key={`saved-link-${tool}`}
                  className="inline-flex items-center gap-1 rounded-full border border-zinc-300 bg-zinc-50 px-2 py-1 text-xs font-semibold text-zinc-700 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-200"
                >
                  <a
                    href={getOfficialUrl(tool)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full px-1 py-0.5 hover:underline"
                  >
                    {tool}
                  </a>
                  <button
                    type="button"
                    onClick={() => removeItem(tool, "saved")}
                    className="rounded-full px-1.5 py-0.5 text-[10px] font-bold text-zinc-500 transition hover:bg-[#fef2f2] hover:text-[#b91c1c] dark:text-zinc-300"
                    aria-label={`Remove ${tool} from saved`}
                  >
                    x
                  </button>
                </div>
              ))}
            </div>
          </article>
        ) : null}

        {currentList.length === 0 ? (
          <article className="rounded-2xl border border-zinc-300 bg-white p-6 text-center dark:border-zinc-700 dark:bg-zinc-900">
            <h2 className="text-lg font-semibold">No tools in {activeTab}</h2>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">
              Go to Home or Category pages and add tools first.
            </p>
            <div className="mt-4">
              <Link
                href="/"
                className="inline-flex rounded-full bg-zinc-900 px-4 py-2 text-sm font-semibold text-white dark:bg-zinc-100 dark:text-zinc-900"
              >
                Back to Home
              </Link>
            </div>
          </article>
        ) : (
          currentList.map((tool) => (
            <article
              key={tool}
              className="rounded-2xl border border-zinc-300 bg-white p-4 dark:border-zinc-700 dark:bg-zinc-900"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{tool}</h3>
                <div className="flex flex-wrap gap-2">
                  <Button
                    type="button"
                    size="xs"
                    variant="outline"
                    onClick={() => copyName(tool)}
                    className="rounded-full border-[#d4d4d8] bg-white text-zinc-700 transition active:scale-[0.96] hover:border-[#2563eb] hover:bg-[#eff6ff] hover:text-[#1d4ed8] dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200"
                  >
                    <Copy className="h-3.5 w-3.5" /> Copy
                  </Button>
                  <a
                    href={getOfficialUrl(tool)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 rounded-full border border-zinc-300 bg-white px-3 py-1 text-xs font-semibold text-zinc-700 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200"
                  >
                    <ExternalLink className="h-3.5 w-3.5" /> Open
                  </a>
                  <Button
                    type="button"
                    size="xs"
                    variant="outline"
                    onClick={() => removeItem(tool, activeTab)}
                    className="rounded-full border-[#d4d4d8] bg-white text-zinc-700 transition active:scale-[0.96] hover:border-[#dc2626] hover:bg-[#fef2f2] hover:text-[#b91c1c] dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200"
                  >
                    <Trash2 className="h-3.5 w-3.5" /> Remove
                  </Button>
                </div>
              </div>
            </article>
          ))
        )}
      </section>
    </main>
  );
}