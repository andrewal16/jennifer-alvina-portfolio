import Image from "next/image";
import Link from "next/link";
import { imageUrl } from "@/lib/sanity";
import type { Project } from "@/lib/types";

export function ProjectCard({ project }: { project: Project }) {
  const cover = imageUrl(project.coverImage) ?? imageUrl(project.galleryImages?.[0]);

  return (
    <article className="group space-y-4">
      <Link href={`/portfolio/${project.slug}`} className="block overflow-hidden rounded-sm">
        <div className="relative aspect-[4/3] bg-stone-200">
          {cover ? (
            <Image
              src={cover}
              alt={project.coverImage?.alt || project.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          ) : null}
        </div>
      </Link>
      <div className="space-y-1">
        <p className="text-xs uppercase tracking-[0.18em] text-stone-500">{project.category || "Project"}</p>
        <h3 className="text-2xl">{project.title}</h3>
        <p className="text-sm text-stone-700">{project.summary}</p>
      </div>
    </article>
  );
}
