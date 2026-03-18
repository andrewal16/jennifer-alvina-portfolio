import type { Metadata } from "next";
import Link from "next/link";
import { PortfolioGrid } from "@/components/portfolio/portfolio-grid";
import { getProjectsPage } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Selected interior design projects by Jennifer Atelier.",
};

// Performance: ISR keeps portfolio data fresh while avoiding request-time rendering.
export const revalidate = 3600;

export default async function PortfolioPage() {
  const { projects, hasMore } = await getProjectsPage(0, 12);

  return (
    <>
      {/* COLOR PALETTE UPDATE */}
      <main className="pb-20">
      <section className="border-b border-brand-secondary bg-brand-primary-light">
        <div className="mx-auto grid w-full max-w-6xl gap-10 px-6 py-16 md:grid-cols-[1.2fr_0.8fr] md:px-10 md:py-24">
          <div className="space-y-6">
            <p className="text-xs uppercase tracking-[0.22em] text-brand-accent">Portfolio</p>
            <h1 className="max-w-4xl text-5xl leading-tight text-brand-darkest md:text-7xl">A curated body of interiors shaped by calm luxury, detail, and atmosphere.</h1>
          </div>

          <div className="flex flex-col justify-end gap-6 border-l-0 border-brand-secondary pt-2 md:border-l md:pl-10">
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-brand-accent">Selected Works</p>
              <p className="mt-2 text-4xl text-brand-dark">{projects.length.toString().padStart(2, "0")}</p>
            </div>
            <div>
              <Link href="/contact" className="inline-flex items-center rounded-lg bg-brand-dark px-5 py-3 text-xs uppercase tracking-[0.18em] text-brand-primary hover:bg-brand-darkest">
                Start a Project
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-6 py-12 md:px-10 md:py-16">
        <PortfolioGrid initialProjects={projects} initialHasMore={hasMore} />
      </section>
      </main>
    </>
  );
}
