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

export function ProjectCard({ project }: { project: Project }) {
  const image = getPrimaryImage(project);
  const metaItems = getMetaItems(project);

  return (
    <article className="group overflow-hidden rounded-[28px] border border-stone-200/80 bg-white/80 shadow-[0_20px_60px_rgba(28,25,23,0.06)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_28px_80px_rgba(28,25,23,0.1)]">
      <Link href={`/portfolio/${project.slug}`} className="block">
        <div className="relative aspect-4/3 overflow-hidden bg-stone-200">
          {image ? (
            <>
              <Image
                src={image}
                alt={project.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
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
            {project.status ? (
              <span className="rounded-full border border-white/20 bg-stone-950/55 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-white backdrop-blur">
                {project.status}
              </span>
            ) : null}
          </div>

          <div className="absolute inset-x-0 bottom-0 p-5">
            <div className="translate-y-3 transition-transform duration-500 group-hover:translate-y-0">
              {metaItems.length ? (
                <div className="mb-3 flex flex-wrap gap-2">
                  {metaItems.map((item) => (
                    <span
                      key={item}
                      className="rounded-full bg-white/15 px-3 py-1 text-[11px] uppercase tracking-[0.16em] text-white backdrop-blur"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              ) : null}

              <div className="flex items-center justify-between gap-4">
                <h3 className="max-w-[80%] text-2xl text-white md:text-[1.75rem]">
                  {project.title}
                </h3>
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white transition-transform duration-500 group-hover:translate-x-1">
                  →
                </span>
              </div>
            </div>
          </div>
        </div>
      </Link>

      <div className="space-y-4 p-6">
        <p className="line-clamp-3 text-sm leading-6 text-stone-700">
          {project.summary}
        </p>

        {project.highlights?.length ? (
          <ul className="flex flex-wrap gap-2">
            {project.highlights.slice(0, 3).map((highlight) => (
              <li
                key={highlight}
                className="rounded-full border border-stone-200 bg-stone-50 px-3 py-1 text-[11px] uppercase tracking-[0.16em] text-stone-600"
              >
                {highlight}
              </li>
            ))}
          </ul>
        ) : null}

        <div className="flex items-center justify-between border-t border-stone-200 pt-4">
          <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs uppercase tracking-[0.16em] text-stone-500">
            {project.styleConcept ? <span>{project.styleConcept}</span> : null}
            {project.duration ? <span>{project.duration}</span> : null}
          </div>

          <Link
            href={`/portfolio/${project.slug}`}
            className="text-xs uppercase tracking-[0.18em] text-stone-900 transition-opacity hover:opacity-70"
          >
            View Project
          </Link>
        </div>
      </div>
    </article>
  );
}
