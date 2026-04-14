import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { CategoryDetailClient } from "@/components/category-detail-client";
import { getCategoryById } from "@/lib/tool-data";

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategoryById(slug);

  if (!category) {
    return {};
  }

  return {
    title: `${category.title} Tools | Pankaj Portfolio Toolkit`,
    description: category.usedFor,
    keywords: [category.title, "software tools", "ai tools", "pankaj portfolio"],
    alternates: {
      canonical: `/categories/${slug}`,
    },
    openGraph: {
      title: `${category.title} Tools | Pankaj Portfolio Toolkit`,
      description: category.usedFor,
      url: `/categories/${slug}`,
      type: "article",
      images: [{ url: "/og", width: 1200, height: 630, alt: `${category.title} tools` }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${category.title} Tools | Pankaj Portfolio Toolkit`,
      description: category.usedFor,
      images: ["/og"],
    },
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = getCategoryById(slug);

  if (!category) {
    notFound();
  }

  return <CategoryDetailClient category={category} />;
}
