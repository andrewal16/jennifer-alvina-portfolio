"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

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
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="sticky top-0 z-50 px-4 pt-4 md:px-6"
    >
      <div
        className={`mx-auto w-full max-w-7xl rounded-2xl transition-all duration-500 ease-out ${
          isScrolled
            ? "mt-2 border border-black/10 bg-white/90 shadow-[0_16px_32px_-10px_rgba(0,0,0,0.06)] backdrop-blur-xl"
            : "mt-4 border border-black/[0.04] bg-white/60 shadow-[0_4px_20px_-5px_rgba(0,0,0,0.02)] backdrop-blur-md"
        }`}
      >
        <nav
          aria-label="Primary navigation"
          className="flex items-center justify-between gap-4 px-5 py-4 md:px-8"
        >
          <div className="min-w-0 shrink-0">
            <Link href="/" className="group inline-block">
              <span className="block font-heading text-[1.25rem] font-normal tracking-[0.06em] text-slate-900 md:text-[1.45rem]">
                {brandName}
              </span>
              <span className="mt-1 block text-[10px] uppercase tracking-[0.26em] text-slate-500 transition-colors duration-300 group-hover:text-slate-900">
                {brandTagline}
              </span>
            </Link>
          </div>

          <div className="hidden items-center gap-8 md:flex">
            <ul className="flex items-center gap-2 rounded-full border border-black/5 bg-white/70 px-2 py-2 backdrop-blur-md">
              {navLinks.map((link) => {
                const active = pathname === link.href;

                return (
                  <li key={link.href} className="relative">
                    {active && (
                      <motion.div
                        layoutId="active-nav"
                        className="absolute inset-0 rounded-full bg-slate-900"
                        transition={{
                          type: "spring",
                          stiffness: 380,
                          damping: 30,
                        }}
                      />
                    )}
                    <Link
                      href={link.href}
                      aria-current={active ? "page" : undefined}
                      className={`relative z-10 inline-flex items-center rounded-full px-4 py-2 text-sm font-medium transition-colors duration-300 ${
                        active
                          ? "text-white"
                          : "text-slate-600 hover:text-slate-900"
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
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-slate-900 px-6 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-white transition-all duration-500 hover:bg-white hover:text-slate-900 hover:shadow-[0_10px_30px_rgba(15,23,42,0.15)]"
            >
              <span className="relative z-10">{primaryCtaLabel}</span>
              <span
                className="relative z-10 transition-transform duration-300 group-hover:translate-x-1"
                aria-hidden="true"
              >
                ↗
              </span>
              <div className="absolute inset-0 -z-0 origin-left scale-x-0 rounded-full border border-slate-200 bg-white opacity-0 transition-all duration-500 group-hover:scale-x-100 group-hover:opacity-100" />
            </Link>
          </div>

          <button
            type="button"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-black/10 bg-white/80 text-slate-900 backdrop-blur transition-all duration-300 hover:bg-white md:hidden"
          >
            <span className="relative block h-4 w-5">
              <span
                className={`absolute left-0 top-0 h-[1.5px] w-5 bg-current transition-all duration-300 ${
                  isMenuOpen ? "translate-y-[7px] rotate-45" : ""
                }`}
              />
              <span
                className={`absolute left-0 top-[7px] h-[1.5px] w-5 bg-current transition-all duration-300 ${
                  isMenuOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`absolute left-0 top-[14px] h-[1.5px] w-5 bg-current transition-all duration-300 ${
                  isMenuOpen ? "-translate-y-[7px] -rotate-45" : ""
                }`}
              />
            </span>
          </button>
        </nav>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden md:hidden"
            >
              <div className="px-5 pb-4">
                <div className="rounded-2xl border border-black/5 bg-white/90 p-3 shadow-sm backdrop-blur-xl">
                  <ul className="space-y-1">
                    {navLinks.map((link) => {
                      const active = pathname === link.href;

                      return (
                        <li key={link.href}>
                          <Link
                            href={link.href}
                            aria-current={active ? "page" : undefined}
                            onClick={() => setIsMenuOpen(false)}
                            className={`flex items-center justify-between rounded-xl px-4 py-3 text-sm transition-all duration-300 ${
                              active
                                ? "bg-slate-900 text-white"
                                : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                            }`}
                          >
                            <span>{link.label}</span>
                            {active ? <span aria-hidden="true">•</span> : null}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>

                  <Link
                    href={primaryCtaHref}
                    onClick={() => setIsMenuOpen(false)}
                    className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-white transition-all duration-300 hover:bg-slate-800"
                  >
                    <span>{primaryCtaLabel}</span>
                    <span aria-hidden="true">↗</span>
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}
