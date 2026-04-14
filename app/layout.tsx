import type { Metadata, Viewport } from "next";
import { JetBrains_Mono, Space_Grotesk } from "next/font/google";
import { AppSidebar } from "@/components/app-sidebar";
import { PortfolioSideCard } from "@/components/portfolio-side-card";
import { SiteFooter } from "@/components/site-footer";
import { Globe } from "@/components/ui/globe";
import { MacbookScroll } from "@/components/ui/macbook-scroll";
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
      <body className="relative min-h-full overflow-x-hidden flex flex-col bg-[var(--brand-50)] text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100">
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden opacity-[0.14] dark:opacity-[0.18]">
          <div className="absolute left-1/2 top-24 hidden -translate-x-1/2 md:block">
            <Globe className="h-150 w-150 opacity-80" />
          </div>
          <div className="absolute inset-x-0 top-10 hidden md:block">
            <MacbookScroll
              src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1800&q=80"
              title={<span className="text-zinc-900 dark:text-zinc-100">Pankaj Tools</span>}
              showGradient={false}
            />
          </div>
          <div className="absolute inset-0 bg-linear-to-b from-transparent via-white/10 to-transparent dark:via-white/5 md:hidden" />
        </div>

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
