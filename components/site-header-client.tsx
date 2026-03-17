"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeaderClient({
  brandName,
  brandTagline,
  primaryCtaLabel,
  primaryCtaHref,
}: {
  brandName: string;
  brandTagline: string;
  primaryCtaLabel: string;
  primaryCtaHref: string;
}) {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 border-b border-slate-200 backdrop-blur ${
        isScrolled ? "bg-white shadow-[0_1px_3px_rgba(0,33,71,0.08)]" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-6 py-4 md:px-10">
        <div className="min-w-0">
          <Link href="/" className="block">
            <span className="block truncate text-lg font-semibold uppercase tracking-[0.18em] text-primary-900">
              {brandName}
            </span>
            <span className="mt-1 block truncate text-[11px] uppercase tracking-[0.22em] text-slate-500">
              {brandTagline}
            </span>
          </Link>
        </div>

        <div className="hidden items-center gap-8 md:flex">
          <ul className="flex items-center gap-6 text-[15px] font-medium text-slate-600">
            {navLinks.map((link) => {
              const active = pathname === link.href;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`border-b-2 pb-1 ${
                      active
                        ? "border-accent-500 text-primary-900"
                        : "border-transparent hover:text-primary-900"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <Link
            href={primaryCtaHref}
            className="inline-flex items-center rounded-lg bg-primary-900 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-white hover:bg-primary-800"
          >
            {primaryCtaLabel}
          </Link>
        </div>
      </nav>
    </header>
  );
}
