import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getProjectBySlug, getProjects } from "@/lib/projects";

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
    title: project.title,
    description: project.summary,
  };
}

export default async function PortfolioDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) notFound();

  return (
    <main className="mx-auto w-full max-w-5xl px-6 py-16 md:px-10">
      <p className="text-xs uppercase tracking-[0.18em] text-stone-500">{project.category}</p>
      <h1 className="mt-2 text-5xl">{project.title}</h1>
      <p className="mt-4 max-w-3xl text-lg text-stone-700">{project.summary}</p>

      {project.coverImage ? (
        <div className="relative mt-10 aspect-[16/10] overflow-hidden bg-stone-200">
          <Image src={project.coverImage} alt={project.title} fill className="object-cover" sizes="100vw" priority />
        </div>
      ) : null}

      <section className="mt-10 grid gap-6 md:grid-cols-2">
        <div className="space-y-2 text-sm text-stone-700">
          <p><span className="text-stone-500">Location:</span> {project.location}</p>
          <p><span className="text-stone-500">Year:</span> {project.year}</p>
          <p><span className="text-stone-500">Area:</span> {project.area}</p>
          <p><span className="text-stone-500">Style:</span> {project.styleConcept}</p>
        </div>
        <div>
          <h2 className="text-2xl">Project Overview</h2>
          <p className="mt-3 text-stone-700">{project.description}</p>
        </div>
      </section>

      {project.materialsUsed?.length ? (
        <section className="mt-10">
          <h3 className="text-2xl">Materials</h3>
          <ul className="mt-3 flex flex-wrap gap-2">
            {project.materialsUsed.map((material) => (
              <li key={material} className="border border-stone-300 px-3 py-1 text-sm text-stone-700">{material}</li>
            ))}
          </ul>
        </section>
      ) : null}

      {project.gallery?.length ? (
        <section className="mt-10">
          <h3 className="text-2xl">Gallery</h3>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {project.gallery.map((image, index) => (
              <div key={`${image}-${index}`} className="relative aspect-[4/3] bg-stone-200">
                <Image src={image} alt={`${project.title} gallery ${index + 1}`} fill className="object-cover" sizes="50vw" />
              </div>
            ))}
          </div>
        </section>
      ) : null}

      {project.testimonial ? (
        <blockquote className="mt-12 border-l-2 border-stone-400 pl-6 text-xl italic text-stone-700">
          “{project.testimonial.quote}”
          {project.testimonial.author ? <footer className="mt-2 text-sm not-italic text-stone-500">— {project.testimonial.author}</footer> : null}
        </blockquote>
      ) : null}
    </main>
  );
}
