"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import type { Project } from "@/lib/types";

/* ─────────────────────────────────────────────────────────────
   PROJECT CARD — Editorial Luxury
   Premium hover: card expands, accent line draws in, image
   does parallax zoom, content reveals progressively.
   ───────────────────────────────────────────────────────────── */

function getPrimaryImage(project: Project) {
  return project.coverImage ?? project.gallery?.[0];
}

export function ProjectCard({
  project,
  priority = false,
  index = 0,
}: {
  project: Project;
  priority?: boolean;
  index?: number;
}) {
  const image = getPrimaryImage(project);
  const cardRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  const metaItems = [
    project.location,
    project.year ? String(project.year) : undefined,
    project.area,
  ].filter(Boolean) as string[];

  /* ── Scroll-triggered entrance ── */
  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "40px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <article
      ref={cardRef}
      className="project-card group relative"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(40px)",
        transition: `opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.12}s, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.12}s`,
      }}
    >
      <Link
        href={`/portfolio/${project.slug}`}
        className="block overflow-hidden bg-[var(--bg-card)]"
      >
        {/* ═══ IMAGE CONTAINER ═══ */}
        <div
          className="relative overflow-hidden bg-[var(--color-dark)]"
          style={{ aspectRatio: "4 / 3" }}
        >
          {image ? (
            <>
              <Image
                src={image.url}
                alt={image.alt || project.title}
                fill
                priority={priority}
                fetchPriority={priority ? "high" : "auto"}
                placeholder={image.lqip ? "blur" : "empty"}
                blurDataURL={image.lqip}
                className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110 group-hover:-translate-y-[2%]"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-black/5 transition-opacity duration-700 group-hover:opacity-90" />
            </>
          ) : (
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(135deg, var(--color-dark) 0%, var(--color-secondary) 100%)",
              }}
            />
          )}

          {/* Category badge — architectural left-edge style */}
          {project.category && (
            <div className="absolute left-0 top-5 z-10">
              <span className="inline-block border-r border-[var(--color-accent)]/60 bg-[var(--color-darkest)]/80 px-4 py-1.5 text-[9px] font-medium tracking-[0.25em] uppercase text-[var(--color-accent)] backdrop-blur-sm transition-all duration-500 group-hover:bg-[var(--color-darkest)]/90 group-hover:px-5">
                {project.category}
              </span>
            </div>
          )}

          {/* Bottom overlay content */}
          <div className="absolute inset-x-0 bottom-0 z-10 p-6">
            {/* Meta — slides up on hover */}
            {metaItems.length > 0 && (
              <div className="mb-3 flex items-center gap-3 translate-y-3 opacity-0 transition-all duration-500 delay-75 group-hover:translate-y-0 group-hover:opacity-100">
                {metaItems.map((item, i) => (
                  <span key={item} className="flex items-center gap-3">
                    {i > 0 && (
                      <span className="block h-[3px] w-[3px] rounded-full bg-[var(--color-accent)]/50" />
                    )}
                    <span className="text-[9px] tracking-[0.2em] uppercase text-white/60">
                      {item}
                    </span>
                  </span>
                ))}
              </div>
            )}

            {/* Title + arrow */}
            <div className="flex items-end justify-between gap-4">
              <h3 className="max-w-[85%] font-heading text-[1.5rem] font-light italic leading-tight text-white transition-transform duration-500 group-hover:translate-x-1 md:text-[1.65rem]">
                {project.title}
              </h3>

              <span className="inline-flex h-10 w-10 flex-shrink-0 items-center justify-center border border-white/20 bg-white/5 text-white/70 transition-all duration-500 group-hover:h-11 group-hover:w-11 group-hover:border-[var(--color-accent)]/50 group-hover:bg-[var(--color-accent)]/10 group-hover:text-[var(--color-accent)]">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  className="transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M7 17L17 7M17 7H7M17 7V17"
                  />
                </svg>
              </span>
            </div>
          </div>
        </div>

        {/* ═══ CONTENT — EXPANDS ON HOVER ═══ */}
        <div className="relative overflow-hidden">
          {/* Accent line draws from left on hover */}
          <div className="absolute left-0 top-0 h-[2px] w-0 bg-[var(--color-accent)] transition-all duration-700 ease-out group-hover:w-full" />

          <div className="px-6 py-5 transition-all duration-500 group-hover:py-6">
            <p className="line-clamp-2 text-[13px] leading-[1.8] text-[var(--text-muted)] transition-all duration-500 group-hover:line-clamp-none group-hover:text-[var(--text-body)]">
              {project.summary}
            </p>

            {/* "View project" CTA — grows from zero height on hover */}
            <div className="mt-0 max-h-0 overflow-hidden opacity-0 transition-all duration-500 ease-out group-hover:mt-4 group-hover:max-h-[40px] group-hover:opacity-100">
              <span className="inline-flex items-center gap-2 text-[9px] font-medium tracking-[0.22em] uppercase text-[var(--color-accent)]">
                <span className="block h-px w-4 bg-[var(--color-accent)] transition-all duration-500 group-hover:w-6" />
                View Project
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </span>
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
}
