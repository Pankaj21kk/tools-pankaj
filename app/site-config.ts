import type { MetadataRoute } from "next";

export const BASE_URL = "https://pankaj-tools-portfolio.vercel.app";

export type SitemapItem = Omit<MetadataRoute.Sitemap[number], "url"> & {
  path: string;
};

// Add new page routes here as your app grows.
export const SITE_ROUTES: SitemapItem[] = [
  {
    path: "/",
    changeFrequency: "weekly",
    priority: 1,
  },
  {
    path: "/categories",
    changeFrequency: "weekly",
    priority: 0.9,
  },
];
