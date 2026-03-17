import Link from "next/link";
import { ProjectCard } from "@/components/project-card";
import { getHomePageContent } from "@/lib/content";
import { getFeaturedProjects } from "@/lib/projects";

export default async function Home() {
  const content = await getHomePageContent();
  const featuredProjects = await getFeaturedProjects(
    content.featuredProjectsLimit ?? 3,
  );

  const heroEyebrow = content.heroEyebrow || "Interior Atelier";
  const heroTitle =
    content.heroTitle ||
    "Creating elegant spaces that feel deeply personal and quietly luxurious.";
  const heroSubtitle =
    content.heroSubtitle ||
    "Jennifer Atelier crafts modern, minimalist interiors with an editorial perspective—balancing materiality, function, and emotion in every detail.";
  const heroPrimaryCtaLabel = content.heroPrimaryCtaLabel || "View Portfolio";
  const heroPrimaryCtaHref = content.heroPrimaryCtaHref || "/portfolio";
  const heroSecondaryCtaLabel =
    content.heroSecondaryCtaLabel || "Start a Project";
  const heroSecondaryCtaHref = content.heroSecondaryCtaHref || "/contact";

  const featuredEyebrow = content.featuredSectionEyebrow || "Selected Works";
  const featuredTitle = content.featuredSectionTitle || "Featured Projects";
  const featuredDescription =
    content.featuredSectionDescription ||
    "A curated collection of spaces shaped by warm materiality, thoughtful planning, and timeless restraint.";
  const featuredCtaLabel = content.featuredSectionCtaLabel || "See all";
  const featuredCtaHref = content.featuredSectionCtaHref || "/portfolio";

  const aboutEyebrow = content.aboutSectionEyebrow || "About the Studio";
  const aboutTitle =
    content.aboutSectionTitle ||
    "Thoughtful design shaped by calm luxury and lasting function.";
  const aboutBody =
    content.aboutSectionBody ||
    "Each project is approached with clarity, sensitivity, and a deep focus on how people live within a space. The result is an atmosphere that feels refined, personal, and enduring.";
  const aboutHighlights = content.aboutHighlights?.length
    ? content.aboutHighlights
    : [
        "Residential Interiors",
        "Hospitality Design",
        "Space Planning",
        "Material Styling",
      ];

  const ctaEyebrow = content.ctaSectionEyebrow || "Let's collaborate";
  const ctaTitle =
    content.ctaSectionTitle || "Designing spaces that elevate daily living.";
  const ctaBody =
    content.ctaSectionBody ||
    "Share your project vision and we’ll create a tailored concept with thoughtful planning and premium details.";
  const ctaButtonLabel = content.ctaButtonLabel || "Start a Project";
  const ctaButtonHref = content.ctaButtonHref || "/contact";

  return (
    <main>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,#000E1F_0%,#002147_50%,#003366_100%)]" />
        <div className="absolute inset-x-0 top-0 h-px bg-white/10" />
        <div className="relative mx-auto grid w-full max-w-6xl gap-12 px-6 py-20 md:px-10 md:py-28 lg:grid-cols-[1.3fr_0.7fr] lg:items-end">
          <div className="space-y-8">
            <div className="space-y-5">
              <p className="text-xs uppercase tracking-[0.24em] text-accent-500">
                {heroEyebrow}
              </p>
              <h1 className="max-w-4xl text-5xl leading-tight text-white md:text-7xl">
                {heroTitle}
              </h1>
              <p className="max-w-2xl text-base leading-8 text-slate-300 md:text-lg">
                {heroSubtitle}
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href={heroPrimaryCtaHref}
                className="inline-flex items-center justify-center border bg-accent-500 border-accent-500 px-6 py-3 text-sm uppercase tracking-[0.18em] text-primary-950 font-semibold transition-colors hover:bg-accent-400"
              >
                {heroPrimaryCtaLabel}
              </Link>
              <Link
                href={heroSecondaryCtaHref}
                className="inline-flex items-center justify-center border border-white/70 bg-transparent px-6 py-3 text-sm uppercase tracking-[0.18em] text-white transition-colors hover:bg-white/10"
              >
                {heroSecondaryCtaLabel}
              </Link>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
            <div className="border border-white/15 bg-white/10 p-5 backdrop-blur">
              <p className="text-xs uppercase tracking-[0.2em] text-accent-500">
                Signature
              </p>
              <p className="mt-3 text-lg leading-7 text-white">
                Calm, editorial interiors with layered warmth and quiet luxury.
              </p>
            </div>
            <div className="border border-white/15 bg-white/10 p-5 backdrop-blur">
              <p className="text-xs uppercase tracking-[0.2em] text-accent-500">
                Focus
              </p>
              <p className="mt-3 text-lg leading-7 text-white">
                Residential and hospitality spaces shaped by timeless detail.
              </p>
            </div>
            <div className="border border-white/15 bg-white/10 p-5 backdrop-blur">
              <p className="text-xs uppercase tracking-[0.2em] text-accent-500">
                Approach
              </p>
              <p className="mt-3 text-lg leading-7 text-white">
                Thoughtful planning, refined material choices, and intentional
                atmosphere.
              </p>
            </div>
          </div>
        </div>
      </section>

      {content.showFeaturedProjects !== false ? (
        <section className="mx-auto w-full max-w-6xl px-6 py-16 md:px-10 md:py-20">
          <div className="flex flex-col gap-6 border-b border-slate-200 pb-8 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <p className="text-xs uppercase tracking-[0.22em] text-accent-500">
                {featuredEyebrow}
              </p>
              <h2 className="mt-3 text-4xl text-slate-950 md:text-5xl">
                {featuredTitle}
              </h2>
              <div className="mt-3 h-[3px] w-[60px] bg-accent-500" />
              <p className="mt-4 text-base leading-8 text-slate-600">
                {featuredDescription}
              </p>
            </div>

            <div>
              <Link
                href={featuredCtaHref}
                className="inline-flex items-center text-sm uppercase tracking-[0.18em] text-primary-600 transition-colors hover:text-primary-900"
              >
                {featuredCtaLabel}
              </Link>
            </div>
          </div>

          <div className="mt-10 grid gap-10 md:grid-cols-2">
            {featuredProjects.map((project) => (
              <ProjectCard key={project._id} project={project} />
            ))}
          </div>
        </section>
      ) : null}

      {content.showAboutSection !== false ? (
        <section className="mx-auto w-full max-w-6xl px-6 py-8 md:px-10 md:py-12">
          <div className="grid gap-8 border border-slate-200 bg-slate-100 p-8 md:grid-cols-[1.1fr_0.9fr] md:p-10 lg:gap-12">
            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-accent-500">
                {aboutEyebrow}
              </p>
              <h2 className="mt-3 max-w-2xl text-4xl text-slate-950 md:text-5xl">
                {aboutTitle}
              </h2>
              <div className="mt-3 h-[3px] w-[60px] bg-accent-500" />
            </div>

            <div className="space-y-6">
              <p className="text-base leading-8 text-slate-600">{aboutBody}</p>

              <div className="flex flex-wrap gap-3">
                {aboutHighlights.map((item) => (
                  <span
                    key={item}
                    className="rounded-md border border-primary-200 bg-primary-50 px-3 py-1.5 text-sm text-primary-800 hover:bg-primary-100"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>
      ) : null}

      {content.showBottomCtaSection !== false ? (
        <section className="mx-auto my-16 w-full max-w-6xl px-6 md:px-10">
          <div className="relative overflow-hidden bg-primary-900 px-8 py-14 text-slate-100 md:px-12 md:py-16">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.16),transparent_35%)]" />
            <div className="relative max-w-3xl">
              <p className="text-xs uppercase tracking-[0.22em] text-slate-300">
                {ctaEyebrow}
              </p>
              <h2 className="mt-3 text-4xl text-white md:text-5xl">
                {ctaTitle}
              </h2>
              <div className="mt-3 h-[3px] w-[60px] bg-accent-500" />
              <p className="mt-4 max-w-2xl text-base leading-8 text-slate-300">
                {ctaBody}
              </p>
              <Link
                href={ctaButtonHref}
                className="mt-8 inline-flex items-center rounded-lg bg-accent-500 px-6 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-primary-950 hover:bg-accent-400"
              >
                {ctaButtonLabel}
              </Link>
            </div>
          </div>
        </section>
      ) : null}
    </main>
  );
}
