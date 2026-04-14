"use client";

import Link from "next/link";

import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";
import { Button } from "@/components/ui/button";

export function GlobalStickyNav() {
  return (
    <div className="fixed left-1/2 top-3 z-50 w-[calc(100vw-1rem)] max-w-fit -translate-x-1/2 sm:top-4">
      <div className="flex items-center gap-1 overflow-x-auto rounded-full border border-zinc-300 bg-white/95 p-1.5 text-zinc-900 shadow-[0_10px_24px_rgba(20,20,20,0.12)] backdrop-blur dark:border-zinc-700 dark:bg-zinc-900/95 dark:text-zinc-100 sm:gap-2">
        <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-[#2563eb]" />
        <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-[#16a34a]" />
        <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-[#dc2626]" />
        <Button asChild size="xs" variant="default" className="rounded-full bg-zinc-900 text-white hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300 sm:h-7 sm:px-2.5 sm:text-[0.8rem]">
          <Link href="/">Home</Link>
        </Button>
        <Button asChild size="xs" variant="outline" className="rounded-full sm:h-7 sm:px-2.5 sm:text-[0.8rem]">
          <Link href="/categories">All Categories</Link>
        </Button>
        <Button asChild size="xs" variant="outline" className="rounded-full sm:h-7 sm:px-2.5 sm:text-[0.8rem]">
          <Link href="/#catalog">View Catalog</Link>
        </Button>
        <AnimatedThemeToggler
          className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-zinc-300 bg-white text-zinc-700 hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:bg-zinc-800 sm:h-7 sm:w-7"
        />
      </div>
    </div>
  );
}
