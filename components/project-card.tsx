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
    <>
      {/* COLOR PALETTE UPDATE */}
      <article className="group overflow-hidden rounded-xl border border-brand-secondary bg-[var(--bg-card)] shadow-md transition-all duration-500 hover:-translate-y-1 hover:shadow-xl">
      <Link href={`/portfolio/${project.slug}`} className="block">
        <div className="relative overflow-hidden bg-brand-primary-dark" style={{ aspectRatio: image?.aspectRatio ? `${image.aspectRatio}` : "4 / 3" }}>
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
              <div className="absolute inset-0 bg-gradient-to-t from-brand-darkest/55 via-brand-darkest/20 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-100" />
            </>
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-brand-primary-dark to-brand-secondary" />
          )}

          <div className="absolute left-5 top-5 flex flex-wrap gap-2">
            {project.category ? (
              <span className="rounded-full border border-brand-secondary bg-brand-primary px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-brand-darkest">
                {project.category}
              </span>
            ) : null}
          </div>

          <div className="absolute inset-x-0 bottom-0 p-5">
            <div className="translate-y-3 transition-transform duration-500 group-hover:translate-y-0">
              {metaItems.length ? (
                <div className="mb-3 flex flex-wrap gap-2">
                  {metaItems.map((item) => (
                    <span key={item} className="rounded-full bg-brand-primary/20 px-3 py-1 text-[11px] uppercase tracking-[0.16em] text-brand-primary backdrop-blur">
                      {item}
                    </span>
                  ))}
                </div>
              ) : null}

              <div className="flex items-center justify-between gap-4">
                <h3 className="max-w-[80%] text-2xl text-brand-primary md:text-[1.75rem]">{project.title}</h3>
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-brand-primary/35 bg-brand-primary/15 text-brand-primary transition-transform duration-500 group-hover:translate-x-1">
                  →
                </span>
              </div>
            </div>
          </div>
        </div>
      </Link>

      <div className="space-y-4 p-6">
        <p className="line-clamp-3 text-sm leading-6 text-brand-darkest">{project.summary}</p>
      </div>
      </article>
    </>
  );
}
