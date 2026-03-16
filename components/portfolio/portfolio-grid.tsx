"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ProjectCard } from "@/components/project-card";
import { SkeletonCard } from "@/components/skeleton-card";
import type { Project } from "@/lib/types";

type PortfolioGridProps = {
  initialProjects: Project[];
  initialHasMore: boolean;
};

const PAGE_SIZE = 12;

export function PortfolioGrid({ initialProjects, initialHasMore }: PortfolioGridProps) {
  const [projects, setProjects] = useState(initialProjects);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(initialHasMore);
  const [isLoading, setIsLoading] = useState(false);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  const loadMoreProjects = useCallback(async () => {
    if (!hasMore || isLoading) return;

    setIsLoading(true);
    try {
      const response = await fetch(`/api/projects?page=${page}&pageSize=${PAGE_SIZE}`);
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

    // Performance: intersection observer progressively fetches only when needed.
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          void loadMoreProjects();
        }
      },
      { rootMargin: "200px" },
    );

    observer.observe(sentinel);

    return () => observer.disconnect();
  }, [hasMore, loadMoreProjects]);

  return (
    <>
      <div className="grid gap-x-10 gap-y-14 md:grid-cols-2">
        {projects.map((project, index) => (
          <ProjectCard key={project._id} project={project} priority={index === 0} />
        ))}

        {isLoading
          ? Array.from({ length: 4 }).map((_, index) => (
              <SkeletonCard key={`skeleton-${index}`} aspectRatio="4 / 3" />
            ))
          : null}
      </div>

      <div ref={sentinelRef} className="h-10" />
    </>
  );
}
