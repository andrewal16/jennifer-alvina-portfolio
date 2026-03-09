import Link from "next/link";
import { ProjectCard } from "@/components/project-card";
import { getFeaturedProjects } from "@/lib/projects";

export default async function Home() {
  const projects = await getFeaturedProjects();

  return (
    <main>
      <section className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 py-20 md:px-10 md:py-28">
        <p className="text-xs uppercase tracking-[0.22em] text-stone-500">Interior Designer</p>
        <h1 className="max-w-4xl text-5xl leading-tight md:text-7xl">
          Creating elegant spaces that feel deeply personal and quietly luxurious.
        </h1>
        <p className="max-w-2xl text-lg text-stone-700">
          Jennifer Alvina crafts modern, minimalist interiors with an editorial perspective—balancing materiality,
          function, and emotion in every detail.
        </p>
        <div>
          <Link href="/portfolio" className="inline-block border border-stone-900 px-6 py-3 text-sm uppercase tracking-[0.18em]">
            View Portfolio
          </Link>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl space-y-10 px-6 py-12 md:px-10">
        <div className="flex items-end justify-between">
          <h2 className="text-4xl">Featured Projects</h2>
          <Link href="/portfolio" className="text-sm uppercase tracking-[0.16em] text-stone-600">
            See all
          </Link>
        </div>
        <div className="grid gap-10 md:grid-cols-2">
          {projects.map((project) => (
            <ProjectCard key={project._id} project={project} />
          ))}
        </div>
      </section>

      <section className="mx-auto my-16 w-full max-w-6xl bg-stone-900 px-6 py-16 text-stone-100 md:px-10">
        <p className="text-xs uppercase tracking-[0.2em] text-stone-300">Let&apos;s collaborate</p>
        <h2 className="mt-3 text-4xl">Designing spaces that elevate daily living.</h2>
        <p className="mt-4 max-w-2xl text-stone-300">
          Share your project vision and we&apos;ll create a tailored concept with thoughtful planning and premium details.
        </p>
        <Link href="/contact" className="mt-8 inline-block border border-stone-100 px-6 py-3 text-sm uppercase tracking-[0.18em]">
          Start a Project
        </Link>
      </section>
    </main>
  );
}
