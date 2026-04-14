import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Pankaj Portfolio Toolkit",
    short_name: "PankajTools",
    description:
      "Professional tools directory for creators, UI/UX designers, developers, researchers, and game builders.",
    start_url: "/",
    display: "standalone",
    background_color: "#fefcf7",
    theme_color: "#111111",
    orientation: "portrait",
    categories: ["productivity", "developer", "design", "education"],
    lang: "en",
    icons: [
      {
        src: "/icon?size=192",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon?size=512",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/icon?size=512",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/apple-icon",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}
