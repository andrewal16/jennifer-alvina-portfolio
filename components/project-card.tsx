import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/lib/types";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="group space-y-4">
      <Link href={`/portfolio/${project.slug}`} className="block overflow-hidden">
        <div className="relative aspect-[4/3] bg-stone-200">
          {project.coverImage || project.gallery?.[0] ? (
            <Image
              src={project.coverImage ?? project.gallery?.[0] ?? ""}
              alt={project.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          ) : null}
        </div>
      </Link>
      <div className="space-y-1">
        <p className="text-xs uppercase tracking-[0.18em] text-stone-500">{project.category}</p>
        <h3 className="text-2xl">{project.title}</h3>
        <p className="text-sm text-stone-700">{project.summary}</p>
      </div>
    </article>
  );
}
