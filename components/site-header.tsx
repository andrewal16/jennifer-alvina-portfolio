import Link from "next/link";
import { getSiteSettings } from "@/lib/content";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/contact", label: "Contact" },
];

export async function SiteHeader() {
  const siteSettings = await getSiteSettings();

  const brandName = siteSettings.siteTitle || "Jennifer Atelier";
  const brandTagline = siteSettings.siteTagline || "Interior Atelier";
  const primaryCtaLabel = siteSettings.primaryCtaLabel || "View Portfolio";
  const primaryCtaHref = siteSettings.primaryCtaHref || "/portfolio";

  return (
    <header className="sticky top-0 z-50 border-b border-stone-200/80 bg-stone-50/90 backdrop-blur">
      <nav className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-6 py-4 md:px-10">
        <div className="min-w-0">
          <Link href="/" className="block">
            <span className="block truncate text-lg font-medium uppercase tracking-[0.18em] text-stone-950">
              {brandName}
            </span>
            <span className="mt-1 block truncate text-[11px] uppercase tracking-[0.22em] text-stone-500">
              {brandTagline}
            </span>
          </Link>
        </div>

        <div className="hidden items-center gap-8 md:flex">
          <ul className="flex items-center gap-6 text-sm text-stone-700">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="transition-colors hover:text-stone-950"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <Link
            href={primaryCtaHref}
            className="inline-flex items-center border border-stone-900 px-4 py-2 text-xs uppercase tracking-[0.18em] text-stone-950 transition-colors hover:bg-stone-900 hover:text-stone-50"
          >
            {primaryCtaLabel}
          </Link>
        </div>

        <details className="relative md:hidden">
          <summary className="flex cursor-pointer list-none items-center gap-2 border border-stone-900 px-3 py-2 text-[11px] uppercase tracking-[0.16em] text-stone-950">
            Menu
          </summary>

          <div className="absolute right-0 top-[calc(100%+0.75rem)] w-64 overflow-hidden border border-stone-200 bg-white shadow-lg">
            <div className="border-b border-stone-200 px-4 py-4">
              <p className="text-[11px] uppercase tracking-[0.18em] text-stone-500">
                {brandTagline}
              </p>
              <p className="mt-2 text-sm font-medium text-stone-900">
                {brandName}
              </p>
            </div>

            <ul className="flex flex-col">
              {navLinks.map((link) => (
                <li
                  key={link.href}
                  className="border-b border-stone-100 last:border-b-0"
                >
                  <Link
                    href={link.href}
                    className="block px-4 py-3 text-sm text-stone-700 transition-colors hover:bg-stone-50 hover:text-stone-950"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="border-t border-stone-200 p-4">
              <Link
                href={primaryCtaHref}
                className="inline-flex w-full items-center justify-center border border-stone-900 px-4 py-3 text-[11px] uppercase tracking-[0.16em] text-stone-950 transition-colors hover:bg-stone-900 hover:text-stone-50"
              >
                {primaryCtaLabel}
              </Link>
            </div>
          </div>
        </details>
      </nav>
    </header>
  );
}
