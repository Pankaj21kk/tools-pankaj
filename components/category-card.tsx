"use client";

import Link from "next/link";

import { OrbitingCircles } from "@/components/ui/orbiting-circles";
import { Marquee } from "@/components/ui/marquee";
import { NumberTicker } from "@/components/ui/number-ticker";
import { RetroGrid } from "@/components/ui/retro-grid";
import { ScrollVelocityRow } from "@/components/ui/scroll-based-velocity";
import type { ToolCategory } from "@/lib/tool-data";

const categoryBorderMap: Record<string, string> = {
  "video-editing": "border-zinc-400",
  "ui-ux": "border-zinc-500",
  "software-development": "border-zinc-300",
  researcher: "border-zinc-400",
  "game-development": "border-zinc-500",
  games: "border-zinc-300",
};

function getCategoryBorder(categoryId: string) {
  return categoryBorderMap[categoryId] ?? "border-zinc-400";
}

function CategoryPreview({ category }: { category: ToolCategory }) {
  const count = category.softwareTools.length + category.aiTools.length;

  if (category.id === "game-development") {
    return (
      <div className={`relative flex h-full min-h-45 items-center justify-center overflow-hidden rounded-2xl border-2 ${getCategoryBorder(category.id)} bg-white dark:bg-zinc-900`}>
        <OrbitingCircles radius={58} iconSize={24} duration={18}>
          <span className="rounded-full bg-white/85 px-2 py-1 text-[11px] font-semibold text-zinc-800 shadow-sm dark:bg-zinc-900/85 dark:text-zinc-100">Game</span>
          <span className="rounded-full bg-white/85 px-2 py-1 text-[11px] font-semibold text-zinc-800 shadow-sm dark:bg-zinc-900/85 dark:text-zinc-100">Dev</span>
          <span className="rounded-full bg-white/85 px-2 py-1 text-[11px] font-semibold text-zinc-800 shadow-sm dark:bg-zinc-900/85 dark:text-zinc-100">AI</span>
          <span className="rounded-full bg-white/85 px-2 py-1 text-[11px] font-semibold text-zinc-800 shadow-sm dark:bg-zinc-900/85 dark:text-zinc-100">Play</span>
        </OrbitingCircles>
        <div className="relative z-10 rounded-full border border-white/60 bg-white/85 px-4 py-2 text-sm font-semibold text-zinc-800 shadow-sm dark:border-white/10 dark:bg-zinc-950/85 dark:text-zinc-100">
          {category.visual}
        </div>
      </div>
    );
  }

  if (category.id === "video-editing" || category.id === "mechanical-engineering") {
    return (
      <div className={`rounded-2xl border-2 ${getCategoryBorder(category.id)} bg-white p-3 dark:bg-zinc-900`}>
        <Marquee pauseOnHover className="[--duration:18s]">
          {category.softwareTools.slice(0, 6).map((tool) => (
            <div
              key={tool}
              className="mr-2 rounded-full border border-white/60 bg-white/85 px-3 py-1 text-xs font-semibold text-zinc-700 shadow-sm dark:border-white/10 dark:bg-zinc-950/85 dark:text-zinc-100"
            >
              {tool}
            </div>
          ))}
        </Marquee>
        <p className="mt-3 text-center text-sm font-semibold text-zinc-700 dark:text-zinc-200">
          {category.visual}
        </p>
      </div>
    );
  }

  if (category.id === "software-development" || category.id === "cs-software-engineering") {
    return (
      <div className={`rounded-2xl border-2 ${getCategoryBorder(category.id)} bg-white p-3 dark:bg-zinc-900`}>
        <ScrollVelocityRow baseVelocity={8} className="text-xs font-semibold uppercase tracking-[0.12em] text-zinc-500 dark:text-zinc-400">
          {category.softwareTools.slice(0, 5).map((tool) => (
            <span key={tool} className="mr-4 rounded-full border border-white/60 bg-white/85 px-3 py-1 text-zinc-700 shadow-sm dark:border-white/10 dark:bg-zinc-950/85 dark:text-zinc-100">
              {tool}
            </span>
          ))}
        </ScrollVelocityRow>
        <div className="mt-3 flex items-end justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-zinc-500 dark:text-zinc-400">
              Tool Count
            </p>
            <NumberTicker value={count} className="mt-1 text-4xl font-bold text-zinc-900 dark:text-zinc-100" />
          </div>
          <p className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-semibold text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200">
            {category.visual}
          </p>
        </div>
      </div>
    );
  }

  if (category.id === "ui-ux" || category.id === "researcher" || category.id === "civil-engineering") {
    return (
      <div className={`relative overflow-hidden rounded-2xl border-2 ${getCategoryBorder(category.id)} bg-white p-4 dark:bg-zinc-900`}>
        <RetroGrid className="opacity-20" />
        <div className="relative z-10 flex h-full flex-col justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-zinc-600 dark:text-zinc-300">
              Total Tools
            </p>
            <NumberTicker value={count} className="mt-1 text-4xl font-bold text-zinc-900 dark:text-zinc-100" />
          </div>
          <div className="rounded-2xl border border-white/60 bg-white/80 p-3 text-sm font-semibold text-zinc-700 shadow-sm dark:border-white/10 dark:bg-zinc-950/80 dark:text-zinc-200">
            {category.visual}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`rounded-2xl border-2 ${getCategoryBorder(category.id)} bg-white p-4 dark:bg-zinc-900`}>
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-zinc-500 dark:text-zinc-400">
        Total Tools
      </p>
      <NumberTicker value={count} className="mt-1 text-4xl font-bold text-zinc-900 dark:text-zinc-100" />
      <p className="mt-3 rounded-full bg-white/85 px-3 py-1 text-sm font-semibold text-zinc-700 shadow-sm dark:bg-zinc-950/85 dark:text-zinc-200">
        {category.visual}
      </p>
    </div>
  );
}

export function CategoryCard({ category }: { category: ToolCategory }) {
  return (
    <Link
      href={`/categories/${category.id}`}
      className="group block w-full rounded-3xl border border-zinc-300 bg-white p-4 shadow-[0_12px_30px_rgba(20,20,20,0.08)] transition hover:-translate-y-1 hover:border-zinc-500 hover:shadow-[0_16px_34px_rgba(20,20,20,0.12)] sm:p-5 dark:border-zinc-700 dark:bg-zinc-900 dark:hover:border-zinc-400"
    >
      <div className={`grid gap-4 rounded-lg border-2 ${getCategoryBorder(category.id)} bg-white p-3 shadow-sm sm:gap-5 sm:p-4 lg:grid-cols-[1fr_260px] lg:items-center dark:bg-zinc-900`}>
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-zinc-500 dark:text-zinc-400">
            {category.softwareTools.length + category.aiTools.length} tools
          </p>
          <h2 className="mt-2 text-xl font-bold text-zinc-900 sm:text-2xl dark:text-zinc-100">
            {category.title}
          </h2>
          <p className="mt-2 text-sm leading-6 text-zinc-700 sm:leading-7 dark:text-zinc-300">
            {category.usedFor}
          </p>
          <p className="mt-3 text-sm font-semibold text-zinc-700 group-hover:underline dark:text-zinc-300">
            View category tools
          </p>
        </div>

        <div className="min-h-40 sm:min-h-48">
          <CategoryPreview category={category} />
        </div>
      </div>
    </Link>
  );
}
