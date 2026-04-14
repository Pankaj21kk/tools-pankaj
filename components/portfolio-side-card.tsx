"use client";

import { useState } from "react";

export function PortfolioSideCard() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <aside className="fixed bottom-4 right-4 z-40 hidden sm:block">
      <button
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        aria-expanded={isOpen}
        className="ml-auto flex items-center gap-2 rounded-full border border-black/10 bg-white/95 px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-zinc-700 shadow-[0_10px_24px_rgba(20,20,20,0.12)] backdrop-blur transition hover:border-zinc-400 dark:border-white/10 dark:bg-zinc-900/90 dark:text-zinc-200"
      >
        Portfolio
        <span className="rounded-full bg-zinc-100 px-2 py-0.5 text-[10px] font-bold text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">
          {isOpen ? "Close" : "Open"}
        </span>
      </button>

      <div
        className={`mt-3 w-72 rounded-2xl border border-black/10 bg-white/95 p-4 text-zinc-900 shadow-[0_10px_24px_rgba(20,20,20,0.12)] backdrop-blur transition-all duration-300 dark:border-white/10 dark:bg-zinc-900/95 dark:text-zinc-100 ${
          isOpen ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"
        }`}
      >
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-zinc-500 dark:text-zinc-400">
          Pankaj Portfolio
        </p>
        <h3 className="mt-2 text-lg font-bold text-zinc-900 dark:text-zinc-100">Pankaj</h3>
        <p className="mt-1 text-sm text-zinc-700 dark:text-zinc-300">
          Tools curator, developer, and design-focused builder.
        </p>

        <button
          type="button"
          onClick={() => setIsOpen(false)}
          className="mt-3 inline-flex rounded-full border border-zinc-300 px-3 py-1 text-[11px] font-semibold text-zinc-700 hover:border-zinc-500 dark:border-zinc-700 dark:text-zinc-200"
        >
          Collapse panel
        </button>

        <div className="mt-4 space-y-2 text-sm">
          <a className="block rounded-lg border border-zinc-200 px-3 py-2 text-zinc-800 hover:border-zinc-400 dark:border-zinc-700 dark:text-zinc-200 dark:hover:border-zinc-500" href="https://github.com" target="_blank" rel="noopener noreferrer">GitHub</a>
          <a className="block rounded-lg border border-zinc-200 px-3 py-2 text-zinc-800 hover:border-zinc-400 dark:border-zinc-700 dark:text-zinc-200 dark:hover:border-zinc-500" href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a className="block rounded-lg border border-zinc-200 px-3 py-2 text-zinc-800 hover:border-zinc-400 dark:border-zinc-700 dark:text-zinc-200 dark:hover:border-zinc-500" href="https://x.com" target="_blank" rel="noopener noreferrer">X / Twitter</a>
          <a className="block rounded-lg border border-zinc-200 px-3 py-2 text-zinc-800 hover:border-zinc-400 dark:border-zinc-700 dark:text-zinc-200 dark:hover:border-zinc-500" href="tel:+910000000000">Phone: +91 00000 00000</a>
        </div>
      </div>
    </aside>
  );
}
