import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/lib/types";

function getPrimaryImage(project: Project) {
  return project.coverImage ?? project.gallery?.[0];
}

function getMetaItems(project: Project) {
  return [
    project.location,
    project.year ? String(project.year) : undefined,
    project.area,
  ].filter(Boolean) as string[];
}

export function ProjectCard({
  project,
  priority = false,
}: {
  project: Project;
  priority?: boolean;
}) {
  const image = getPrimaryImage(project);
  const metaItems = getMetaItems(project);

  return (
    <article className="group overflow-hidden rounded-[28px] border border-stone-200/80 bg-white/80 shadow-[0_20px_60px_rgba(28,25,23,0.06)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_28px_80px_rgba(28,25,23,0.1)]">
      <Link href={`/portfolio/${project.slug}`} className="block">
        <div className="relative overflow-hidden bg-stone-200" style={{ aspectRatio: image?.aspectRatio ? `${image.aspectRatio}` : "4 / 3" }}>
          {image ? (
            <>
              <Image
                src={image.url}
                alt={image.alt || project.title}
                fill
                priority={priority}
                // Performance: render the first card eagerly, lazy-load others.
                fetchPriority={priority ? "high" : "auto"}
                placeholder={image.lqip ? "blur" : "empty"}
                blurDataURL={image.lqip}
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                // Performance: accurate sizes prevents oversized images from being downloaded.
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/45 via-stone-900/10 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-100" />
            </>
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-stone-200 to-stone-300" />
          )}

          <div className="absolute left-5 top-5 flex flex-wrap gap-2">
            {project.category ? (
              <span className="rounded-full border border-white/30 bg-white/85 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-stone-900 backdrop-blur">
                {project.category}
              </span>
            ) : null}
          </div>

          <div className="absolute inset-x-0 bottom-0 p-5">
            <div className="translate-y-3 transition-transform duration-500 group-hover:translate-y-0">
              {metaItems.length ? (
                <div className="mb-3 flex flex-wrap gap-2">
                  {metaItems.map((item) => (
                    <span key={item} className="rounded-full bg-white/15 px-3 py-1 text-[11px] uppercase tracking-[0.16em] text-white backdrop-blur">
                      {item}
                    </span>
                  ))}
                </div>
              ) : null}

              <div className="flex items-center justify-between gap-4">
                <h3 className="max-w-[80%] text-2xl text-white md:text-[1.75rem]">{project.title}</h3>
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white transition-transform duration-500 group-hover:translate-x-1">
                  →
                </span>
              </div>
            </div>
          </div>
        </div>
      </Link>

      <div className="space-y-4 p-6">
        <p className="line-clamp-3 text-sm leading-6 text-stone-700">{project.summary}</p>
      </div>
    </article>
  );
}
