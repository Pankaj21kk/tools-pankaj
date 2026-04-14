import type { Metadata, Viewport } from "next";
import { JetBrains_Mono, Space_Grotesk } from "next/font/google";
import { AppSidebar } from "@/components/app-sidebar";
import { DecorativeBackground } from "@/components/decorative-background";
import { PortfolioSideCard } from "@/components/portfolio-side-card";
import { SiteFooter } from "@/components/site-footer";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-sans",
  subsets: ["latin"],
});

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://pankaj-tools-portfolio.vercel.app"),
  title: "Pankaj Portfolio | Professional Tools Directory",
  description:
    "A detailed tools portfolio for video editors, UI/UX designers, software developers, researchers, and game developers with AI tool recommendations.",
  applicationName: "Pankaj Portfolio Toolkit",
  keywords: [
    "tools portfolio",
    "developer tools",
    "ui ux tools",
    "video editing tools",
    "ai tools",
    "game development tools",
  ],
  authors: [{ name: "Pankaj" }],
  creator: "Pankaj",
  category: "technology",
  manifest: "/manifest.webmanifest",
  icons: {
    icon: [
      { url: "/icon?size=192", sizes: "192x192", type: "image/png" },
      { url: "/icon?size=512", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-icon", sizes: "180x180", type: "image/png" }],
  },
  appleWebApp: {
    capable: true,
    title: "Pankaj Toolkit",
    statusBarStyle: "black-translucent",
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Pankaj Portfolio | Professional Tools Directory",
    description:
      "Discover categorized software and AI tools for creators, designers, developers, researchers, and game builders.",
    url: "/",
    siteName: "Pankaj Portfolio Toolkit",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/og",
        width: 1200,
        height: 630,
        alt: "Pankaj Portfolio tools directory preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pankaj Portfolio | Professional Tools Directory",
    description:
      "A complete categorized toolstack with software and AI tools for modern digital workflows.",
    images: ["/og"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#E0FBFC" },
    { media: "(prefers-color-scheme: dark)", color: "#09090b" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${jetBrainsMono.variable} h-full antialiased`}
    >
      <body className="relative min-h-full overflow-x-hidden flex flex-col bg-(--brand-50) text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100">
        <DecorativeBackground />

        <div className="relative z-10 min-h-full flex flex-col">
          <AppSidebar />
          <PortfolioSideCard />
          <div className="flex-1 md:pl-18">
            {children}
            <SiteFooter />
          </div>
        </div>
      </body>
    </html>
  );
}
