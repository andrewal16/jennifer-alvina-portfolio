import type { Metadata } from "next";
import { ProjectCard } from "@/components/project-card";
import { getProjects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Selected interior design projects by Jennifer Alvina.",
};

export default async function PortfolioPage() {
  const projects = await getProjects();

  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-16 md:px-10">
      <h1 className="text-5xl">Portfolio</h1>
      <p className="mt-3 max-w-2xl text-stone-700">
        A curated collection of residential and hospitality interiors designed with timeless elegance.
      </p>
      <div className="mt-12 grid gap-10 md:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard key={project._id} project={project} />
        ))}
      </div>
    </main>
  );
}
