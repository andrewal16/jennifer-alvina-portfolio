"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Project } from "@/lib/types";

/* ─────────────────────────────────────────────────────────────
   HERO CAROUSEL — V2
   Landscape-oriented carousel optimized for interior design
   photography with editorial navigation and smooth transitions.
   ───────────────────────────────────────────────────────────── */

const AUTOPLAY_MS = 6000;
const TRANSITION_MS = 800;

export function HeroCarousel({
  projects,
  totalCount,
}: {
  projects: Project[];
  totalCount: number;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [progressKey, setProgressKey] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const count = projects.length;

  /* ── NAVIGATION ── */
  const goTo = useCallback(
    (index: number) => {
      if (isTransitioning || index === activeIndex) return;
      setIsTransitioning(true);
      setActiveIndex(index);
      setProgressKey((k) => k + 1);
      setTimeout(() => setIsTransitioning(false), TRANSITION_MS);
    },
    [activeIndex, isTransitioning]
  );

  const goNext = useCallback(() => {
    goTo((activeIndex + 1) % count);
  }, [activeIndex, count, goTo]);

  const goPrev = useCallback(() => {
    goTo((activeIndex - 1 + count) % count);
  }, [activeIndex, count, goTo]);

  /* ── AUTOPLAY ── */
  useEffect(() => {
    if (isPaused || count <= 1) return;
    timerRef.current = setInterval(goNext, AUTOPLAY_MS);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [goNext, isPaused, count]);

  /* ── KEYBOARD ── */
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    },
    [goNext, goPrev]
  );

  if (!projects.length) return null;

  const current = projects[activeIndex];

  return (
    <div
      className="hero-right-col relative hidden opacity-0 lg:flex lg:flex-col lg:justify-center"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onKeyDown={handleKeyDown}
      role="region"
      aria-roledescription="carousel"
      aria-label="Featured projects"
      tabIndex={0}
    >
      {/* ── TOP BAR: Category + Counter ── */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="block h-px w-5 bg-[var(--color-accent)]/50" />
          <span className="text-[9px] tracking-[0.3em] uppercase text-[var(--color-accent)]">
            {current?.category || "Selected Work"}
          </span>
        </div>
        <span className="font-heading text-[13px] font-light tracking-[0.15em] text-white/30">
          {String(activeIndex + 1).padStart(2, "0")}
          <span className="mx-1 text-[var(--color-accent)]/40">/</span>
          {String(totalCount).padStart(2, "0")}
        </span>
      </div>

      {/* ── CAROUSEL VIEWPORT — 3:2 Landscape ── */}
      <div
        className="hero-carousel-viewport group/viewport relative overflow-hidden"
        style={{ aspectRatio: "3 / 2" }}
      >
        {projects.map((project, index) => {
          const src = project.coverImage?.url ?? null;
          const href = project.slug
            ? `/portfolio/${project.slug}`
            : "/portfolio";
          const isActive = index === activeIndex;

          return (
            <Link
              key={project._id}
              href={href}
              aria-hidden={!isActive}
              tabIndex={isActive ? 0 : -1}
              className={`hero-carousel-slide group absolute inset-0 block overflow-hidden ${
                isActive
                  ? "pointer-events-auto z-[2]"
                  : "pointer-events-none z-[1]"
              }`}
              style={{
                opacity: isActive ? 1 : 0,
                transition: `opacity ${TRANSITION_MS}ms cubic-bezier(0.16, 1, 0.3, 1)`,
              }}
              role="group"
              aria-roledescription="slide"
              aria-label={`${index + 1} of ${count}: ${project.title}`}
            >
              {/* Image layer with hover scale */}
              <div className="absolute inset-0 transition-transform duration-[900ms] ease-out group-hover:scale-[1.05]">
                {src ? (
                  <Image
                    src={src}
                    alt={project.title || "Featured project"}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 0vw, 55vw"
                    priority={index === 0}
                  />
                ) : (
                  <div
                    className="absolute inset-0"
                    style={{
                      background: `
                        linear-gradient(135deg, #1a1208 0%, #2a1e10 30%, #c4a882 60%, #b89a74 100%)`,
                    }}
                  >
                    <div
                      className="absolute inset-0"
                      style={{
                        backgroundImage: `
                          linear-gradient(rgba(197,160,89,0.06) 1px, transparent 1px),
                          linear-gradient(90deg, rgba(197,160,89,0.06) 1px, transparent 1px)`,
                        backgroundSize: "40px 40px",
                      }}
                    />
                  </div>
                )}
              </div>

              {/* Subtle vignette overlay */}
              <div
                className="pointer-events-none absolute inset-0 z-[3]"
                style={{
                  background:
                    "radial-gradient(ellipse at center, transparent 40%, rgba(2,6,23,0.25) 100%)",
                }}
              />

              {/* Bottom gradient for text legibility */}
              <div
                className="pointer-events-none absolute inset-x-0 bottom-0 z-[4] h-2/5"
                style={{
                  background:
                    "linear-gradient(to top, rgba(2,6,23,0.85) 0%, rgba(2,6,23,0.4) 60%, transparent 100%)",
                }}
              />

              {/* Hover light wash */}
              <div className="absolute inset-0 z-[5] bg-white/0 transition-colors duration-700 group-hover:bg-white/[0.02]" />

              {/* Thin accent border */}
              <div className="pointer-events-none absolute inset-0 z-10 border border-white/[0.08] transition-colors duration-500 group-hover:border-[var(--color-accent)]/30" />

              {/* Corner brackets — only two corners for cleaner look */}
              <div className="absolute left-3 top-3 z-10 h-5 w-5 border-l border-t border-[var(--color-accent)]/40 transition-all duration-500 group-hover:h-6 group-hover:w-6 group-hover:border-[var(--color-accent)]/70" />
              <div className="absolute bottom-3 right-3 z-10 h-5 w-5 border-b border-r border-[var(--color-accent)]/40 transition-all duration-500 group-hover:h-6 group-hover:w-6 group-hover:border-[var(--color-accent)]/70" />

              {/* ── Bottom info overlay ── */}
              <div className="absolute bottom-0 left-0 right-0 z-20 flex items-end justify-between px-6 pb-5">
                <div className="translate-y-1 transition-transform duration-500 group-hover:translate-y-0">
                  <h3 className="font-heading text-xl font-light italic leading-tight text-white md:text-2xl">
                    {project.title}
                  </h3>
                  <div className="mt-1.5 flex items-center gap-2">
                    {[project.location, project.year]
                      .filter(Boolean)
                      .map((item, i) => (
                        <span key={i} className="flex items-center gap-2">
                          {i > 0 && (
                            <span className="block h-[3px] w-[3px] rounded-full bg-[var(--color-accent)]/60" />
                          )}
                          <span className="text-[9px] tracking-[0.22em] uppercase text-white/50">
                            {item}
                          </span>
                        </span>
                      ))}
                  </div>
                </div>

                {/* View project hint on hover */}
                <div className="flex items-center gap-2 translate-y-2 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  <span className="text-[9px] tracking-[0.2em] uppercase text-white/40">
                    View
                  </span>
                  <svg
                    className="h-3.5 w-3.5 text-[var(--color-accent)]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* ── BOTTOM CONTROLS ── */}
      {count > 1 && (
        <div className="mt-5 flex items-center justify-between">
          {/* Progress bar — segmented full-width line */}
          <div className="flex flex-1 items-center gap-1.5 pr-6">
            {projects.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Go to project ${i + 1}: ${projects[i]?.title}`}
                className="group/dot relative h-6 flex-1"
              >
                {/* Track */}
                <span className="absolute inset-x-0 top-1/2 block h-[1.5px] -translate-y-1/2 rounded-full bg-white/10 transition-colors duration-300 group-hover/dot:bg-white/20" />

                {/* Active fill with progress animation */}
                {i === activeIndex && (
                  <span
                    key={progressKey}
                    className="absolute left-0 top-1/2 block h-[1.5px] -translate-y-1/2 rounded-full bg-[var(--color-accent)]"
                    style={{
                      animation: isPaused
                        ? "none"
                        : `carousel-progress-full ${AUTOPLAY_MS}ms linear forwards`,
                      width: isPaused ? "100%" : undefined,
                    }}
                  />
                )}

                {/* Completed segments */}
                {i < activeIndex && (
                  <span className="absolute inset-x-0 top-1/2 block h-[1.5px] -translate-y-1/2 rounded-full bg-[var(--color-accent)]/50" />
                )}
              </button>
            ))}
          </div>

          {/* Prev / Next arrows */}
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={goPrev}
              aria-label="Previous project"
              className="grid h-10 w-10 place-items-center border border-white/[0.08] text-white/30 transition-all duration-300 hover:border-[var(--color-accent)]/30 hover:text-[var(--color-accent)]"
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M7 16l-4-4m0 0l4-4m-4 4h18"
                />
              </svg>
            </button>
            <button
              type="button"
              onClick={goNext}
              aria-label="Next project"
              className="grid h-10 w-10 place-items-center border border-white/[0.08] text-white/30 transition-all duration-300 hover:border-[var(--color-accent)]/30 hover:text-[var(--color-accent)]"
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
