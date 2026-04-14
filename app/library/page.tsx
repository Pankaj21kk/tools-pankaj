import type { Metadata } from "next";

import { LibraryClient } from "@/components/library-client";

export const metadata: Metadata = {
  title: "Favorites and Saved | Pankaj Tools",
  description: "Manage your favorite and saved tools with quick copy and open actions.",
  alternates: { canonical: "/library" },
};

interface LibraryPageProps {
  searchParams: Promise<{ tab?: string }>;
}

export default async function LibraryPage({ searchParams }: LibraryPageProps) {
  const { tab } = await searchParams;
  const initialTab = tab === "saved" ? "saved" : "favorites";

  return <LibraryClient initialTab={initialTab} />;
}