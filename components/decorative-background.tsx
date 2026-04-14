"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const Globe = dynamic(() => import("@/components/ui/globe").then((module) => module.Globe), {
  ssr: false,
});

export function DecorativeBackground() {
  const [showGlobe, setShowGlobe] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 1024px)");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!media.matches || reduceMotion.matches) return;

    const idleCallback =
      "requestIdleCallback" in window
        ? (window as Window & { requestIdleCallback: (cb: () => void, opts?: { timeout: number }) => number }).requestIdleCallback
        : null;

    if (idleCallback) {
      const id = idleCallback(() => setShowGlobe(true), { timeout: 1500 });
      return () => {
        if ("cancelIdleCallback" in window) {
          (window as Window & { cancelIdleCallback: (handle: number) => void }).cancelIdleCallback(id);
        }
      };
    }

    const timer = window.setTimeout(() => setShowGlobe(true), 900);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      <div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-[#48CAE4]/25 blur-3xl" />
      <div className="absolute right-0 top-40 h-80 w-80 rounded-full bg-[#00B4D8]/20 blur-3xl" />
      <div className="absolute inset-0 bg-linear-to-b from-transparent via-white/10 to-transparent dark:via-white/5" />

      {showGlobe ? (
        <div className="absolute left-1/2 top-28 hidden -translate-x-1/2 lg:block opacity-[0.12] dark:opacity-[0.16]">
          <Globe
            className="h-120 w-120"
            config={{
              width: 680,
              height: 680,
              devicePixelRatio: 1.25,
              mapSamples: 5000,
              dark: 1,
            }}
          />
        </div>
      ) : null}
    </div>
  );
}
