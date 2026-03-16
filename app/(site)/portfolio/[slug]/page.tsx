import type { Metadata } from "next";
import Image from "next/image";
import dynamic from "next/dynamic";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SkeletonCard } from "@/components/skeleton-card";
import { getProjectBySlug, getProjects } from "@/lib/projects";

const ProjectGallery = dynamic(
  () =>
    import("@/components/portfolio/project-gallery").then(
      (module) => module.ProjectGallery,
    ),
  {
    loading: () => <SkeletonCard aspectRatio="16 / 10" />,
  },
);

export const revalidate = 3600;

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) return { title: "Project" };

  return {
    title: project.seoTitle || project.title,
    description: project.seoDescription || project.summary,
  };
}

export default async function PortfolioDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) notFound();

  const metaTags = [project.category, project.location, project.year]
    .filter(Boolean)
    .map(String);

  const infoItems = [
    { label: "Type", value: project.category },
    { label: "Status", value: project.status },
    { label: "Year", value: project.year ? String(project.year) : undefined },
    { label: "Location", value: project.location },
    { label: "Client", value: project.client },
    { label: "Area", value: project.area },
    { label: "Duration", value: project.duration },
  ].filter((item) => item.value);

  const projectDescription =
    project.description ||
    project.summary ||
    "A refined project shaped through careful planning, premium materials, and a calm editorial sensibility.";

  return (
    <main className="mx-auto w-full max-w-[1200px] px-4 pb-16 pt-6 sm:px-5 md:px-8 md:pt-8 lg:px-10 lg:pb-20">
      <section>
        <Link
          href="/portfolio"
          className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.16em] text-stone-500 transition-colors hover:text-stone-900"
        >
          <span className="text-sm leading-none">/</span>
          Back to Portfolio
        </Link>
      </section>

      {project.coverImage ? (
        <section className="mt-5 md:mt-6">
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl bg-stone-200">
            <Image
              src={project.coverImage.url}
              alt={project.coverImage.alt || project.title}
              fill
              priority
              fetchPriority="high"
              className="object-cover"
              placeholder={project.coverImage.lqip ? "blur" : "empty"}
              blurDataURL={project.coverImage.lqip}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 92vw, 1200px"
            />
          </div>
        </section>
      ) : null}

      {metaTags.length ? (
        <section className="mt-4 border-b border-stone-200 pb-5 md:mt-5 md:pb-6">
          <div className="flex flex-wrap gap-3">
            {metaTags.map((tag) => (
              <span
                key={tag}
                className="rounded-md border border-stone-300 px-3 py-1.5 text-[11px] uppercase tracking-[0.12em] text-stone-600"
              >
                {tag}
              </span>
            ))}
          </div>
        </section>
      ) : null}

      <section className="mt-8 md:mt-10">
        <p className="text-[10px] uppercase tracking-[0.2em] text-stone-500">
          Selected Interior
        </p>
        <h1 className="mt-3 max-w-[600px] break-words text-[clamp(1.75rem,4vw,2.25rem)] leading-[1.25] text-stone-950">
          {project.title}
        </h1>
        <p className="mt-4 max-w-[520px] text-sm leading-7 text-stone-600 md:text-base md:leading-8">
          {projectDescription}
        </p>
      </section>

      {infoItems.length ? (
        <section className="mt-8 md:mt-10">
          <div className="overflow-hidden rounded-xl border border-stone-200 bg-stone-50">
            <div className="grid gap-px bg-stone-200 sm:grid-cols-2 lg:grid-cols-3">
              {infoItems.map((item) => (
                <div key={item.label} className="bg-stone-50 px-4 py-4 md:px-5">
                  <p className="text-[10px] uppercase tracking-[0.18em] text-stone-500">
                    {item.label}
                  </p>
                  <p className="mt-1.5 text-sm font-semibold text-stone-800">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {project.gallery?.length ? (
        <section id="project-gallery" className="mt-10 md:mt-12">
          <p className="text-[11px] uppercase tracking-[0.2em] text-stone-500">
            Project Gallery
          </p>
          <ProjectGallery images={project.gallery} projectTitle={project.title} />
        </section>
      ) : null}
    </main>
  );
}
