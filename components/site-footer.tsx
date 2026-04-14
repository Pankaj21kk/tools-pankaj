import Link from "next/link";
import {
  IconBrandGithub,
  IconBrandInstagram,
  IconBrandLinkedin,
  IconBrandX,
} from "@tabler/icons-react";

const footerLinks = [
  { label: "Products", href: "/#catalog" },
  { label: "Studio", href: "/categories" },
  { label: "Clients", href: "/#search-results" },
  { label: "Pricing", href: "/categories" },
  { label: "Blog", href: "/categories" },
  { label: "Privacy", href: "/categories" },
  { label: "Terms", href: "/categories" },
];

const socialLinks = [
  { label: "Twitter", href: "https://x.com", icon: IconBrandX },
  { label: "LinkedIn", href: "https://linkedin.com", icon: IconBrandLinkedin },
  { label: "GitHub", href: "https://github.com", icon: IconBrandGithub },
  { label: "Instagram", href: "https://instagram.com", icon: IconBrandInstagram },
];

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-zinc-300 bg-zinc-100 px-4 py-14 text-zinc-700 transition-colors dark:border-zinc-800 dark:bg-black dark:text-zinc-300 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <div className="h-px w-full bg-zinc-300 dark:bg-zinc-800" />

        <div className="py-10 text-center">
          <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-zinc-300 bg-white px-3 py-2 dark:border-zinc-700 dark:bg-zinc-900">
            <span className="inline-flex h-5 w-5 items-center justify-center rounded border border-zinc-300 bg-zinc-100 text-xs font-bold text-zinc-700 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100">
              P
            </span>
            <span className="text-base font-semibold text-zinc-900 dark:text-white">Pankaj Tools</span>
          </div>

          <p className="mx-auto mt-4 max-w-2xl text-sm text-zinc-600 dark:text-zinc-400">
            Personal tools portfolio by Pankaj. Curated software and AI tools for video editing,
            UI/UX design, software development, research workflows, and game development.
          </p>

          <div className="mt-7 flex flex-wrap items-center justify-center gap-x-5 gap-y-3 text-sm">
            {footerLinks.map((link) => (
              <Link key={link.label} href={link.href} className="text-zinc-700 transition hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-white">
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="h-px w-full border-t border-dashed border-zinc-300 dark:border-zinc-800" />

        <div className="flex flex-col items-start justify-between gap-5 pt-8 text-sm text-zinc-600 dark:text-zinc-400 sm:flex-row sm:items-center">
          <div>
            <p>© {new Date().getFullYear()} Pankaj Tools. All rights reserved.</p>
            <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-500">Built and maintained by Pankaj for modern creator and engineering workflows.</p>
          </div>

          <div className="flex items-center gap-4">
            {socialLinks.map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.label}
                  className="rounded-full border border-zinc-300 p-2 text-zinc-600 transition hover:border-zinc-500 hover:text-zinc-900 dark:border-zinc-700 dark:text-zinc-400 dark:hover:border-zinc-500 dark:hover:text-white"
                >
                  <Icon className="h-4 w-4" />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
}
