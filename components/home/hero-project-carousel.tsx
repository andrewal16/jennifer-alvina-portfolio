"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import type { Project } from "@/lib/types";

type HeroProjectCarouselProps = {
  projects: Project[];
};

const AUTO_PLAY_MS = 5000;

export function HeroProjectCarousel({ projects }: HeroProjectCarouselProps) {
  const items = useMemo(
    () => projects.filter((project) => project.slug && project.title),
    [projects],
  );
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (items.length <= 1) return undefined;

    const intervalId = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % items.length);
    }, AUTO_PLAY_MS);

    return () => window.clearInterval(intervalId);
  }, [items.length]);

  if (!items.length) return null;

  const safeActiveIndex = activeIndex % items.length;
  const activeProject = items[safeActiveIndex];
  const activeHref = activeProject.slug
    ? `/portfolio/${activeProject.slug}`
    : "/portfolio";

  const metaItems = [activeProject.category, activeProject.location, activeProject.year]
    .filter(Boolean)
    .join(" · ");

  return (
    <div className="hero-right-col relative opacity-0">
      <div className="hero-corner absolute -left-5 -top-5 z-20 border border-[var(--color-accent)]/20 bg-[#0a0f1e]/90 px-4 py-3 opacity-0 backdrop-blur-sm">
        <span className="block text-[9px] tracking-[0.3em] uppercase text-[var(--color-accent)]">
          Selected Works
        </span>
        <span className="mt-0.5 block text-[9px] tracking-[0.12em] text-slate-500">
          Rotating project showcase
        </span>
      </div>

      <div className="relative overflow-hidden rounded-[30px] border border-white/10 bg-white/[0.04] p-3 shadow-[0_30px_80px_rgba(2,6,23,0.45)] backdrop-blur-sm sm:p-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeProject._id}
            initial={{ opacity: 0, y: 24, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -18, scale: 0.985 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            <Link
              href={activeHref}
              className="group relative block overflow-hidden rounded-[24px] bg-[#0b1324] transition-transform duration-500 hover:-translate-y-1"
            >
              <div className="relative aspect-[6/5] overflow-hidden">
                {activeProject.coverImage?.url ? (
                  <Image
                    src={activeProject.coverImage.url}
                    alt={activeProject.coverImage.alt || activeProject.title}
                    fill
                    priority={activeIndex === 0}
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.07]"
                    sizes="(max-width: 767px) 88vw, (max-width: 1279px) 78vw, 42vw"
                  />
                ) : (
                  <div
                    className="absolute inset-0"
                    style={{
                      background: `
                        linear-gradient(135deg, rgba(255,255,255,0.06) 0%, transparent 38%),
                        linear-gradient(160deg, #151b2f 0%, #26314d 35%, #c3a173 100%)
                      `,
                    }}
                  />
                )}

                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.16),transparent_34%),linear-gradient(to_top,rgba(2,6,23,0.82),rgba(2,6,23,0.18)_45%,transparent_70%)]" />
                <div className="absolute inset-0 ring-1 ring-inset ring-white/10 transition-all duration-500 group-hover:ring-[var(--color-accent)]/35" />

                <div className="absolute left-4 top-4 flex items-center gap-3 rounded-full border border-white/10 bg-[#020617]/60 px-4 py-2 backdrop-blur-md">
                  <span className="h-2 w-2 rounded-full bg-[var(--color-accent)] shadow-[0_0_16px_rgba(197,160,89,0.8)]" />
                  <span className="text-[10px] tracking-[0.28em] uppercase text-white/70">
                    {String(safeActiveIndex + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
                  </span>
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6">
                  <div className="max-w-lg rounded-[22px] border border-white/10 bg-[#020617]/72 p-5 shadow-[0_20px_60px_rgba(2,6,23,0.35)] backdrop-blur-md transition-transform duration-500 group-hover:scale-[1.02]">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-[10px] tracking-[0.3em] uppercase text-[var(--color-accent)]/90">
                          {activeProject.category || "Interior Project"}
                        </p>
                        <h2 className="mt-3 font-heading text-2xl font-light leading-tight text-white sm:text-[2rem]">
                          {activeProject.title}
                        </h2>
                      </div>

                      <span className="mt-1 inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/70 transition-all duration-500 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:border-[var(--color-accent)]/50 group-hover:text-[var(--color-accent)]">
                        <svg
                          className="h-4 w-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={1.6}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M7 17L17 7M17 7H8M17 7v9"
                          />
                        </svg>
                      </span>
                    </div>

                    {activeProject.summary ? (
                      <p className="mt-4 max-w-xl text-sm leading-7 text-slate-300 sm:text-[15px]">
                        {activeProject.summary}
                      </p>
                    ) : null}

                    {metaItems ? (
                      <p className="mt-5 text-[10px] tracking-[0.24em] uppercase text-white/45">
                        {metaItems}
                      </p>
                    ) : null}
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        </AnimatePresence>

        {items.length > 1 ? (
          <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="grid grid-cols-3 gap-3 lg:grid-cols-4">
              {items.map((project, index) => {
                const isActive = index === safeActiveIndex;

                return (
                  <button
                    key={project._id}
                    type="button"
                    onClick={() => setActiveIndex(index)}
                    className={`group/thumb relative overflow-hidden rounded-[18px] border p-1.5 text-left transition-all duration-300 ${
                      isActive
                        ? "border-[var(--color-accent)]/60 bg-white/[0.08]"
                        : "border-white/8 bg-white/[0.03] hover:border-white/20 hover:bg-white/[0.06]"
                    }`}
                    aria-label={`Show project ${project.title}`}
                    aria-pressed={isActive}
                  >
                    <div className="relative aspect-[4/3] overflow-hidden rounded-[14px] bg-[#0b1324]">
                      {project.coverImage?.url ? (
                        <Image
                          src={project.coverImage.url}
                          alt={project.coverImage.alt || project.title}
                          fill
                          className={`object-cover transition-transform duration-500 ${
                            isActive
                              ? "scale-105"
                              : "group-hover/thumb:scale-105"
                          }`}
                          sizes="(max-width: 767px) 28vw, 14vw"
                        />
                      ) : (
                        <div className="absolute inset-0 bg-[linear-gradient(135deg,#151b2f_0%,#26314d_40%,#c3a173_100%)]" />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#020617]/80 via-transparent to-transparent" />
                    </div>
                    <div className="px-1 pb-1 pt-3">
                      <p className="line-clamp-1 text-[10px] tracking-[0.22em] uppercase text-white/40">
                        {project.category || "Project"}
                      </p>
                      <p className="mt-1 line-clamp-2 text-sm leading-5 text-white/88">
                        {project.title}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="flex items-center gap-2 self-end sm:self-auto">
              <button
                type="button"
                onClick={() =>
                  setActiveIndex((current) =>
                    current === 0 ? items.length - 1 : current - 1,
                  )
                }
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/12 bg-white/[0.04] text-white/70 transition-all duration-300 hover:border-[var(--color-accent)]/50 hover:bg-white/[0.08] hover:text-[var(--color-accent)]"
                aria-label="Previous project"
              >
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.6}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <button
                type="button"
                onClick={() => setActiveIndex((current) => (current + 1) % items.length)}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/12 bg-white/[0.04] text-white/70 transition-all duration-300 hover:border-[var(--color-accent)]/50 hover:bg-white/[0.08] hover:text-[var(--color-accent)]"
                aria-label="Next project"
              >
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.6}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          </div>
        ) : null}
      </div>

      <span
        className="absolute -right-14 top-1/2 hidden -translate-y-1/2 rotate-90 whitespace-nowrap text-[9px] tracking-[0.35em] uppercase text-[var(--color-accent)]/35 xl:block"
        aria-hidden="true"
      >
        Interior Design Studio — Since 2024
      </span>
    </div>
  );
}
