"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Bookmark, Heart, Home, Search } from "lucide-react";

import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

const links = [
  {
    label: "Home",
    href: "/",
    icon: <Home className="h-4 w-4 text-zinc-700 dark:text-zinc-200" />,
  },
  {
    label: "Search Results",
    href: "/#search-results",
    icon: <Search className="h-4 w-4 text-zinc-700 dark:text-zinc-200" />,
  },
];

export function AppSidebar() {
  const [favoriteCount, setFavoriteCount] = useState(0);
  const [savedCount, setSavedCount] = useState(0);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const readCounts = () => {
      try {
        const favoriteRaw = localStorage.getItem("tool-favorites");
        const savedRaw = localStorage.getItem("tool-saved");

        const nextFavorites = favoriteRaw ? (JSON.parse(favoriteRaw) as string[]).length : 0;
        const nextSaved = savedRaw ? (JSON.parse(savedRaw) as string[]).length : 0;

        setFavoriteCount(nextFavorites);
        setSavedCount(nextSaved);
      } catch {
        setFavoriteCount(0);
        setSavedCount(0);
      }
    };

    const onStatsUpdated = (event: Event) => {
      const custom = event as CustomEvent<{ favorites: number; saved: number }>;
      if (custom.detail) {
        setFavoriteCount(custom.detail.favorites);
        setSavedCount(custom.detail.saved);
        return;
      }
      readCounts();
    };

    readCounts();
    window.addEventListener("tool-stats-updated", onStatsUpdated);
    window.addEventListener("storage", readCounts);

    return () => {
      window.removeEventListener("tool-stats-updated", onStatsUpdated);
      window.removeEventListener("storage", readCounts);
    };
  }, []);

  return (
    <Sidebar animate open={open} setOpen={setOpen}>
      <SidebarBody className="fixed inset-y-0 left-0 z-40 border-r border-zinc-300 bg-white/95 backdrop-blur dark:border-zinc-700 dark:bg-zinc-900/95">
        <div className="flex h-full flex-1 flex-col justify-between gap-6 overflow-x-hidden">
          <div>
            <Link href="/" className={cn("mb-6 mt-1 flex items-center", open ? "gap-2" : "justify-center")}>
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-300 bg-zinc-100 text-xs font-bold text-zinc-700 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100">
                PT
              </span>
              <span
                className={cn(
                  "text-xs font-semibold uppercase tracking-[0.14em] text-zinc-700 dark:text-zinc-200",
                  open ? "inline-block" : "hidden"
                )}
              >
                Pankaj Toolkit
              </span>
            </Link>

            <nav className="space-y-1">
              {links.map((link) => (
                <SidebarLink
                  key={link.label}
                  link={link}
                  className="rounded-xl px-2 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                />
              ))}
            </nav>

            <div className="mt-4 space-y-2">
              <Link
                href="/library?tab=favorites"
                className={cn(
                  "flex rounded-xl border border-zinc-300 bg-white py-2 text-xs font-semibold text-zinc-700 hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800",
                  open ? "items-center justify-between px-2.5" : "items-center justify-center"
                )}
              >
                <span className={cn("inline-flex items-center", open ? "gap-1.5" : "justify-center")}>
                  <Heart className="h-3.5 w-3.5" />
                  <span className={cn(open ? "inline" : "hidden")}>Favorites</span>
                </span>
                <span className={cn("rounded-full bg-zinc-200 px-1.5 py-0.5 text-[10px] font-bold text-zinc-700 dark:bg-zinc-700 dark:text-zinc-100", open ? "ml-2" : "ml-1")}>{favoriteCount}</span>
              </Link>
              <Link
                href="/library?tab=saved"
                className={cn(
                  "flex rounded-xl border border-zinc-300 bg-white py-2 text-xs font-semibold text-zinc-700 hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800",
                  open ? "items-center justify-between px-2.5" : "items-center justify-center"
                )}
              >
                <span className={cn("inline-flex items-center", open ? "gap-1.5" : "justify-center")}>
                  <Bookmark className="h-3.5 w-3.5" />
                  <span className={cn(open ? "inline" : "hidden")}>Saved</span>
                </span>
                <span className={cn("rounded-full bg-zinc-200 px-1.5 py-0.5 text-[10px] font-bold text-zinc-700 dark:bg-zinc-700 dark:text-zinc-100", open ? "ml-2" : "ml-1")}>{savedCount}</span>
              </Link>
            </div>
          </div>

          <div className="rounded-xl border border-zinc-300 bg-zinc-50 p-2 dark:border-zinc-700 dark:bg-zinc-950">
            <div className={cn("flex items-center", open ? "justify-between" : "justify-center")}>
              <span className={cn("text-xs font-semibold uppercase tracking-[0.14em] text-zinc-500 dark:text-zinc-400", open ? "inline" : "hidden")}>
                Theme
              </span>
              <AnimatedThemeToggler className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-zinc-300 bg-white text-zinc-700 hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:bg-zinc-800" />
            </div>
          </div>
        </div>
      </SidebarBody>
    </Sidebar>
  );
}