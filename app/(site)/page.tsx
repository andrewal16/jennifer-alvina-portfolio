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
      <section className="relative overflow-hidden border-b border-white/10 bg-brand-darkest text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(215,180,106,0.18),_transparent_34%),linear-gradient(135deg,_rgba(14,40,73,0.96)_0%,_rgba(8,24,43,0.98)_50%,_rgba(4,12,24,1)_100%)]" />
        <div className="absolute inset-y-0 right-0 hidden w-[34%] bg-[radial-gradient(circle_at_center,_rgba(112,163,224,0.14),_transparent_65%)] lg:block" />
        <div className="absolute inset-x-0 top-0 h-px bg-white/12" />

        <div className="relative mx-auto grid w-full max-w-6xl gap-12 px-6 py-20 md:px-10 md:py-28 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <div className="space-y-8">
            <div className="space-y-5">
              <p className="text-xs uppercase tracking-[0.24em] text-brand-accent-light">
                {heroEyebrow}
              </p>
              <h1 className="max-w-4xl text-5xl leading-tight text-white md:text-7xl">
                {heroTitle}
              </h1>
              <p className="max-w-2xl text-base leading-8 text-slate-200 md:text-lg">
                {heroSubtitle}
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href={heroPrimaryCtaHref}
                className="inline-flex items-center justify-center rounded-full border border-brand-accent/70 bg-white/0 px-6 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-white shadow-[0_0_0_1px_rgba(255,255,255,0.02)] transition-all hover:-translate-y-0.5 hover:border-brand-accent hover:bg-brand-accent/12"
              >
                {heroPrimaryCtaLabel}
              </Link>
              <Link
                href={heroSecondaryCtaHref}
                className="inline-flex items-center justify-center rounded-full border border-white/30 bg-transparent px-6 py-3 text-sm uppercase tracking-[0.18em] text-slate-100 transition-all hover:-translate-y-0.5 hover:border-white/55 hover:bg-white/8"
              >
                {heroSecondaryCtaLabel}
              </Link>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
            <div className="rounded-2xl border border-white/10 bg-white/6 p-5 backdrop-blur-md">
              <p className="text-xs uppercase tracking-[0.2em] text-brand-accent-light">
                Signature
              </p>
              <p className="mt-3 text-lg leading-7 text-slate-100">
                Calm, editorial interiors with layered warmth and quiet luxury.
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/6 p-5 backdrop-blur-md">
              <p className="text-xs uppercase tracking-[0.2em] text-brand-accent-light">
                Focus
              </p>
              <p className="mt-3 text-lg leading-7 text-slate-100">
                Residential and hospitality spaces shaped by timeless detail.
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/6 p-5 backdrop-blur-md">
              <p className="text-xs uppercase tracking-[0.2em] text-brand-accent-light">
                Approach
              </p>
              <p className="mt-3 text-lg leading-7 text-slate-100">
                Thoughtful planning, refined material choices, and intentional
                atmosphere.
              </p>
            </div>
          </div>
        </div>
      </section>

      {content.showFeaturedProjects !== false ? (
        <section className="mx-auto w-full max-w-6xl px-6 py-16 md:px-10 md:py-20">
          <div className="flex flex-col gap-6 border-b border-brand-secondary/50 pb-8 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <p className="text-xs uppercase tracking-[0.22em] text-brand-accent">
                {featuredEyebrow}
              </p>
              <h2 className="mt-3 text-4xl text-brand-darkest md:text-5xl">
                {featuredTitle}
              </h2>
              <div className="mt-3 h-[3px] w-[60px] rounded-full bg-brand-accent" />
              <p className="mt-4 text-base leading-8 text-[var(--text-body)]">
                {featuredDescription}
              </p>
            </div>

            <div>
              <Link
                href={featuredCtaHref}
                className="inline-flex items-center rounded-full border border-brand-darkest/15 px-5 py-2.5 text-sm uppercase tracking-[0.18em] text-brand-darkest transition-all hover:-translate-y-0.5 hover:border-brand-accent hover:text-brand-dark"
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
          <div className="grid gap-8 rounded-[28px] border border-white/50 bg-white/65 p-8 shadow-[0_24px_60px_rgba(11,29,51,0.08)] backdrop-blur-sm md:grid-cols-[1.1fr_0.9fr] md:p-10 lg:gap-12">
            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-brand-accent">
                {aboutEyebrow}
              </p>
              <h2 className="mt-3 max-w-2xl text-4xl text-brand-darkest md:text-5xl">
                {aboutTitle}
              </h2>
              <div className="mt-3 h-[3px] w-[60px] rounded-full bg-brand-accent" />
            </div>

            <div className="space-y-6">
              <p className="text-base leading-8 text-[var(--text-body)]">{aboutBody}</p>

              <div className="flex flex-wrap gap-3">
                {aboutHighlights.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-brand-secondary/35 bg-white/70 px-3.5 py-2 text-sm text-brand-darkest shadow-sm"
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
          <div className="relative overflow-hidden rounded-[28px] border border-brand-darkest/10 bg-[linear-gradient(135deg,_rgba(11,29,51,0.98)_0%,_rgba(18,48,85,0.96)_100%)] px-8 py-14 text-brand-primary md:px-12 md:py-16">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(215,180,106,0.22),_transparent_32%)]" />
            <div className="relative max-w-3xl">
              <p className="text-xs uppercase tracking-[0.22em] text-brand-accent-light">
                {ctaEyebrow}
              </p>
              <h2 className="mt-3 text-4xl text-white md:text-5xl">
                {ctaTitle}
              </h2>
              <div className="mt-3 h-[3px] w-[60px] rounded-full bg-brand-accent" />
              <p className="mt-4 max-w-2xl text-base leading-8 text-slate-200">
                {ctaBody}
              </p>
              <Link
                href={ctaButtonHref}
                className="mt-8 inline-flex items-center rounded-full border border-brand-accent/70 px-6 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-white transition-all hover:-translate-y-0.5 hover:bg-brand-accent/12"
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
