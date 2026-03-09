import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { imageUrl } from "@/lib/sanity";
import { getProjectBySlug, getProjects } from "@/lib/projects";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return { title: "Project" };
  return { title: project.title, description: project.summary };
}

export default async function PortfolioDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) notFound();

  const cover = imageUrl(project.coverImage);

  return (
    <main className="mx-auto w-full max-w-5xl px-6 py-16 md:px-10">
      <p className="text-xs uppercase tracking-[0.18em] text-stone-500">{project.category || "Project"}</p>
      <h1 className="mt-2 text-5xl">{project.title}</h1>
      <p className="mt-4 max-w-3xl text-lg text-stone-700">{project.summary}</p>

      {cover ? (
        <div className="relative mt-10 aspect-[16/10] overflow-hidden bg-stone-200">
          <Image src={cover} alt={project.coverImage?.alt || project.title} fill className="object-cover" sizes="100vw" priority />
        </div>
      ) : null}

      <section className="mt-10 grid gap-6 md:grid-cols-2">
        <div className="space-y-2 text-sm text-stone-700">
          <p><span className="text-stone-500">Location:</span> {project.location || "-"}</p>
          <p><span className="text-stone-500">Year:</span> {project.year || "-"}</p>
          <p><span className="text-stone-500">Area Size:</span> {project.areaSize || "-"}</p>
          <p><span className="text-stone-500">Style:</span> {project.styleConcept || "-"}</p>
        </div>
        <div>
          <h2 className="text-2xl">Project Overview</h2>
          <p className="mt-3 text-stone-700">{project.description || ""}</p>
        </div>
      </section>

      {project.materialsUsed?.length ? (
        <section className="mt-10">
          <h3 className="text-2xl">Materials Used</h3>
          <ul className="mt-3 flex flex-wrap gap-2">
            {project.materialsUsed.map((material) => (
              <li key={material} className="border border-stone-300 px-3 py-1 text-sm text-stone-700">{material}</li>
            ))}
          </ul>
        </section>
      ) : null}

      {project.highlights?.length ? (
        <section className="mt-10">
          <h3 className="text-2xl">Highlights</h3>
          <ul className="mt-3 list-disc space-y-1 pl-5 text-stone-700">
            {project.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}
          </ul>
        </section>
      ) : null}

      {project.galleryImages?.length ? (
        <section className="mt-10">
          <h3 className="text-2xl">Gallery</h3>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {project.galleryImages.map((image, index) => {
              const src = imageUrl(image);
              if (!src) return null;
              return (
                <div key={`${src}-${index}`} className="relative aspect-[4/3] bg-stone-200">
                  <Image src={src} alt={image.alt || `${project.title} gallery ${index + 1}`} fill className="object-cover" sizes="50vw" />
                </div>
              );
            })}
          </div>
        </section>
      ) : null}

      {project.additionalImages?.length ? (
        <section className="mt-10">
          <h3 className="text-2xl">Additional Project Images</h3>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {project.additionalImages.map((image, index) => {
              const src = imageUrl(image);
              if (!src) return null;
              return (
                <div key={`${src}-${index}`} className="relative aspect-[4/3] bg-stone-200">
                  <Image src={src} alt={image.alt || `${project.title} additional image ${index + 1}`} fill className="object-cover" sizes="50vw" />
                </div>
              );
            })}
          </div>
        </section>
      ) : null}

      {project.testimonial?.quote ? (
        <blockquote className="mt-12 border-l-2 border-stone-400 pl-6 text-xl italic text-stone-700">
          “{project.testimonial.quote}”
          {project.testimonial.author ? <footer className="mt-2 text-sm not-italic text-stone-500">— {project.testimonial.author}</footer> : null}
        </blockquote>
      ) : null}
    </main>
  );
}
