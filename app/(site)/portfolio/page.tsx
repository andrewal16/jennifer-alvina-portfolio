import type { Metadata } from "next";
import Link from "next/link";
import { ProjectCard } from "@/components/project-card";
import { getProjects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Selected interior design projects by Jennifer Atelier.",
};

export default async function PortfolioPage() {
  const projects = await getProjects();

  return (
    <main className="pb-20">
      <section className="border-b border-stone-200/70 bg-white/50">
        <div className="mx-auto grid w-full max-w-6xl gap-10 px-6 py-16 md:grid-cols-[1.2fr_0.8fr] md:px-10 md:py-24">
          <div className="space-y-6">
            <p className="text-xs uppercase tracking-[0.22em] text-stone-500">
              Portfolio
            </p>
            <h1 className="max-w-4xl text-5xl leading-tight md:text-7xl">
              A curated body of interiors shaped by calm luxury, detail, and
              atmosphere.
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-stone-700">
              Explore selected residential and hospitality projects designed
              with a refined editorial perspective—balancing material warmth,
              spatial clarity, and timeless elegance.
            </p>
          </div>

          <div className="flex flex-col justify-end gap-6 border-l-0 border-stone-200 pt-2 md:border-l md:pl-10">
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-stone-500">
                Selected Works
              </p>
              <p className="mt-2 text-4xl text-stone-900">
                {projects.length.toString().padStart(2, "0")}
              </p>
            </div>

            <p className="max-w-sm text-sm leading-7 text-stone-600">
              Each project is developed to feel intentional, layered, and deeply
              personal—translating lifestyle, brand, and function into a
              cohesive visual experience.
            </p>

            <div>
              <Link
                href="/contact"
                className="inline-flex items-center border border-stone-900 px-5 py-3 text-xs uppercase tracking-[0.18em] text-stone-950 transition-colors hover:bg-stone-900 hover:text-stone-50"
              >
                Start a Project
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-6 py-12 md:px-10 md:py-16">
        <div className="mb-10 flex flex-col gap-4 border-b border-stone-200/70 pb-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-stone-500">
              All Projects
            </p>
            <h2 className="mt-2 text-3xl md:text-4xl">Recent interiors</h2>
          </div>
          <p className="max-w-xl text-sm leading-7 text-stone-600">
            Browse the collection below to view project details, material
            selections, gallery imagery, and the design story behind each space.
          </p>
        </div>

        <div className="grid gap-x-10 gap-y-14 md:grid-cols-2">
          {projects.map((project) => (
            <ProjectCard key={project._id} project={project} />
          ))}
        </div>
      </section>
    </main>
  );
}
