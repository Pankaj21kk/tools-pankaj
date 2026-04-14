import type { MetadataRoute } from "next";
import { BASE_URL, SITE_ROUTES } from "./site-config";
import { categories } from "@/lib/tool-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = SITE_ROUTES.map((route) => ({
    url: `${BASE_URL}${route.path}`,
    lastModified: route.lastModified ?? new Date(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  const categoryRoutes = categories.map((category) => ({
    url: `${BASE_URL}/categories/${category.id}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [...staticRoutes, ...categoryRoutes];
}
