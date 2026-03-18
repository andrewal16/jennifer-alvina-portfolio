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
    <>
      {/* COLOR PALETTE UPDATE */}
      <main>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-brand-darkest" />
        <div className="absolute inset-x-0 top-0 h-px bg-brand-primary/15" />
        <div className="relative mx-auto grid w-full max-w-6xl gap-12 px-6 py-20 md:px-10 md:py-28 lg:grid-cols-[1.3fr_0.7fr] lg:items-end">
          <div className="space-y-8">
            <div className="space-y-5">
              <p className="text-xs uppercase tracking-[0.24em] text-brand-accent">
                {heroEyebrow}
              </p>
              <h1 className="max-w-4xl text-5xl leading-tight text-brand-primary md:text-7xl">
                {heroTitle}
              </h1>
              <p className="max-w-2xl text-base leading-8 text-brand-primary-light md:text-lg">
                {heroSubtitle}
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href={heroPrimaryCtaHref}
                className="inline-flex items-center justify-center border border-brand-accent bg-brand-accent px-6 py-3 text-sm uppercase tracking-[0.18em] text-brand-darkest font-semibold transition-colors hover:bg-brand-accent-hover"
              >
                {heroPrimaryCtaLabel}
              </Link>
              <Link
                href={heroSecondaryCtaHref}
                className="inline-flex items-center justify-center border border-brand-primary/70 bg-transparent px-6 py-3 text-sm uppercase tracking-[0.18em] text-brand-primary transition-colors hover:bg-brand-primary/15"
              >
                {heroSecondaryCtaLabel}
              </Link>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
            <div className="border border-brand-secondary/60 bg-brand-primary/15 p-5 backdrop-blur">
              <p className="text-xs uppercase tracking-[0.2em] text-brand-accent">
                Signature
              </p>
              <p className="mt-3 text-lg leading-7 text-brand-primary">
                Calm, editorial interiors with layered warmth and quiet luxury.
              </p>
            </div>
            <div className="border border-brand-secondary/60 bg-brand-primary/15 p-5 backdrop-blur">
              <p className="text-xs uppercase tracking-[0.2em] text-brand-accent">
                Focus
              </p>
              <p className="mt-3 text-lg leading-7 text-brand-primary">
                Residential and hospitality spaces shaped by timeless detail.
              </p>
            </div>
            <div className="border border-brand-secondary/60 bg-brand-primary/15 p-5 backdrop-blur">
              <p className="text-xs uppercase tracking-[0.2em] text-brand-accent">
                Approach
              </p>
              <p className="mt-3 text-lg leading-7 text-brand-primary">
                Thoughtful planning, refined material choices, and intentional
                atmosphere.
              </p>
            </div>
          </div>
        </div>
      </section>

      {content.showFeaturedProjects !== false ? (
        <section className="mx-auto w-full max-w-6xl px-6 py-16 md:px-10 md:py-20">
          <div className="flex flex-col gap-6 border-b border-brand-secondary pb-8 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <p className="text-xs uppercase tracking-[0.22em] text-brand-accent">
                {featuredEyebrow}
              </p>
              <h2 className="mt-3 text-4xl text-brand-darkest md:text-5xl">
                {featuredTitle}
              </h2>
              <div className="mt-3 h-[3px] w-[60px] bg-brand-accent" />
              <p className="mt-4 text-base leading-8 text-brand-darkest">
                {featuredDescription}
              </p>
            </div>

            <div>
              <Link
                href={featuredCtaHref}
                className="inline-flex items-center text-sm uppercase tracking-[0.18em] text-brand-accent transition-colors hover:text-brand-dark"
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
          <div className="grid gap-8 border border-brand-secondary bg-brand-primary-light p-8 md:grid-cols-[1.1fr_0.9fr] md:p-10 lg:gap-12">
            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-brand-accent">
                {aboutEyebrow}
              </p>
              <h2 className="mt-3 max-w-2xl text-4xl text-brand-darkest md:text-5xl">
                {aboutTitle}
              </h2>
              <div className="mt-3 h-[3px] w-[60px] bg-brand-accent" />
            </div>

            <div className="space-y-6">
              <p className="text-base leading-8 text-brand-darkest">{aboutBody}</p>

              <div className="flex flex-wrap gap-3">
                {aboutHighlights.map((item) => (
                  <span
                    key={item}
                    className="rounded-md border border-brand-secondary bg-brand-primary px-3 py-1.5 text-sm text-brand-darkest hover:bg-brand-primary-dark"
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
          <div className="relative overflow-hidden bg-brand-dark px-8 py-14 text-brand-primary md:px-12 md:py-16">
            <div className="absolute inset-0 bg-brand-primary/20" />
            <div className="relative max-w-3xl">
              <p className="text-xs uppercase tracking-[0.22em] text-brand-primary-light">
                {ctaEyebrow}
              </p>
              <h2 className="mt-3 text-4xl text-brand-primary md:text-5xl">
                {ctaTitle}
              </h2>
              <div className="mt-3 h-[3px] w-[60px] bg-brand-accent" />
              <p className="mt-4 max-w-2xl text-base leading-8 text-brand-primary-light">
                {ctaBody}
              </p>
              <Link
                href={ctaButtonHref}
                className="mt-8 inline-flex items-center rounded-lg bg-brand-accent px-6 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-brand-darkest hover:bg-brand-accent-hover"
              >
                {ctaButtonLabel}
              </Link>
            </div>
          </div>
        </section>
      ) : null}
      </main>
    </>
  );
}
