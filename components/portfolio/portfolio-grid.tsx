"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ProjectCard } from "@/components/project-card";
import { SkeletonCard } from "@/components/skeleton-card";
import type { Project } from "@/lib/types";

/* ─────────────────────────────────────────────────────────────
   PORTFOLIO GRID — Editorial Layout
   Two-column grid with staggered scroll entrance, infinite
   scroll, and refined spacing for interior design projects.
   ───────────────────────────────────────────────────────────── */

type PortfolioGridProps = {
  initialProjects: Project[];
  initialHasMore: boolean;
};

const PAGE_SIZE = 12;

export function PortfolioGrid({
  initialProjects,
  initialHasMore,
}: PortfolioGridProps) {
  const [projects, setProjects] = useState(initialProjects);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(initialHasMore);
  const [isLoading, setIsLoading] = useState(false);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  const loadMoreProjects = useCallback(async () => {
    if (!hasMore || isLoading) return;

    setIsLoading(true);
    try {
      const response = await fetch(
        `/api/projects?page=${page}&pageSize=${PAGE_SIZE}`
      );
      const result = (await response.json()) as {
        projects: Project[];
        hasMore: boolean;
      };

      setProjects((current) => [...current, ...result.projects]);
      setPage((current) => current + 1);
      setHasMore(result.hasMore);
    } finally {
      setIsLoading(false);
    }
  }, [hasMore, isLoading, page]);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel || !hasMore) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          void loadMoreProjects();
        }
      },
      { rootMargin: "200px" }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [hasMore, loadMoreProjects]);

  return (
    <>
      {/* ═══ EDITORIAL TWO-COLUMN GRID ═══
          Offset second column for an editorial staggered feel.
          Gap tuned for breathing room between interior shots. */}
      <div className="portfolio-grid grid gap-x-8 gap-y-10 md:grid-cols-2 md:gap-x-10 md:gap-y-14 lg:gap-x-12 lg:gap-y-16">
        {projects.map((project, index) => (
          <div key={project._id} className={index % 2 === 1 ? "md:mt-16" : ""}>
            <ProjectCard project={project} priority={index < 2} index={index} />
          </div>
        ))}

        {isLoading
          ? Array.from({ length: 4 }).map((_, index) => (
              <div
                key={`skeleton-${index}`}
                className={index % 2 === 1 ? "md:mt-16" : ""}
              >
                <SkeletonCard aspectRatio="4 / 3" />
              </div>
            ))
          : null}
      </div>

      {/* Sentinel for infinite scroll */}
      <div ref={sentinelRef} className="h-10" />

      {/* End state */}
      {!hasMore && projects.length > 0 && (
        <div className="mt-20 flex items-center justify-center gap-4">
          <span className="block h-px w-12 bg-[var(--color-accent)]/30" />
          <span className="text-[9px] tracking-[0.3em] uppercase text-[var(--text-muted)]">
            All projects loaded
          </span>
          <span className="block h-px w-12 bg-[var(--color-accent)]/30" />
        </div>
      )}
    </>
  );
}
