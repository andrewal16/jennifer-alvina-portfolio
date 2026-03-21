import Link from "next/link";
import Image from "next/image";
import { ProjectCard } from "@/components/project-card";
import { getHomePageContent } from "@/lib/content";
import { getFeaturedProjects } from "@/lib/projects";

export default async function Home() {
  const content = await getHomePageContent();
  const featuredProjects = await getFeaturedProjects(
    content.featuredProjectsLimit ?? 3
  );

  // ── HERO FEATURED PROJECT (first featured project) ──
  const heroProject = featuredProjects?.[0] ?? null;

  // HERO VARIABLES
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

  // FEATURED VARIABLES
  const featuredEyebrow = content.featuredSectionEyebrow || "Selected Works";
  const featuredTitle = content.featuredSectionTitle || "Featured Projects";
  const featuredDescription =
    content.featuredSectionDescription ||
    "A curated collection of spaces shaped by warm materiality, thoughtful planning, and timeless restraint.";
  const featuredCtaLabel = content.featuredSectionCtaLabel || "See all";
  const featuredCtaHref = content.featuredSectionCtaHref || "/portfolio";

  // ABOUT VARIABLES
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
  const heroImageSrc = heroProject?.coverImage?.url ?? null;
  const heroProjectHref = heroProject?.slug
    ? `/portfolio/${heroProject.slug}`
    : "/portfolio";
  // CTA VARIABLES
  const ctaEyebrow = content.ctaSectionEyebrow || "Let's collaborate";
  const ctaTitle =
    content.ctaSectionTitle || "Designing spaces that elevate daily living.";
  const ctaBody =
    content.ctaSectionBody ||
    "Share your project vision and we'll create a tailored concept with thoughtful planning and premium details.";
  const ctaButtonLabel = content.ctaButtonLabel || "Start a Project";
  const ctaButtonHref = content.ctaButtonHref || "/contact";

  return (
    <main>
      {/* ═══════════════════════════════════════════════════════════════
          HERO SECTION
          ═══════════════════════════════════════════════════════════════ */}
      <section className="hero-section relative mx-4 my-4 flex min-h-[calc(100vh-2rem)] flex-col overflow-hidden rounded-[28px] bg-[#020617] md:mx-6 lg:mx-8">
        {/* ── AMBIENT BACKGROUND LAYERS ── */}
        <div className="pointer-events-none absolute inset-0 z-0">
          {/* Soft radial glow */}
          <div
            className="absolute -left-[10%] top-[30%] h-[70vw] w-[70vw] max-h-[900px] max-w-[900px] rounded-full"
            style={{
              background:
                "radial-gradient(ellipse, rgba(197,160,89,0.055) 0%, transparent 65%)",
            }}
          />
          {/* Left vertical rule */}
          <div className="absolute bottom-0 left-[6%] top-0 w-px bg-gradient-to-b from-transparent via-[var(--color-accent)]/15 to-transparent" />
          {/* Right vertical rule */}
          <div className="absolute bottom-0 right-[6%] top-0 w-px bg-gradient-to-b from-transparent via-[var(--color-accent)]/10 to-transparent" />
        </div>

        {/* Watermark background text */}
        <div
          className="hero-watermark pointer-events-none absolute bottom-[-2%] left-[-1%] z-0 select-none font-heading text-[clamp(160px,25vw,340px)] font-light leading-none tracking-[-0.05em] opacity-0"
          style={{ color: "rgba(197,160,89,0.04)" }}
          aria-hidden="true"
        >
          Atelier
        </div>

        {/* ═══ MAIN CONTENT GRID ═══ */}
        <div className="relative z-10 mx-auto grid w-full max-w-[1400px] flex-1 grid-cols-1 items-center gap-16 px-[6%] py-20 lg:grid-cols-[1fr_0.75fr] lg:gap-8 lg:py-0">
          {/* ── LEFT COLUMN ── */}
          <div className="max-w-2xl">
            {/* Eyebrow row */}
            <div className="hero-eyebrow mb-10 flex items-center gap-4 opacity-0">
              <span className="block h-px w-9 flex-shrink-0 bg-[var(--color-accent)]" />
            </div>

            {/* Main heading */}
            <h1 className="mb-10 font-heading text-[clamp(3rem,6vw,6.5rem)] font-light leading-[1.05] tracking-[-0.01em]">
              <span className="hero-title-line block overflow-hidden opacity-0">
                <span className="block text-white">Crafting spaces</span>
              </span>
              <span className="hero-title-line block overflow-hidden opacity-0">
                <span className="block italic text-white">
                  that <em className="text-[var(--color-accent)]">feel</em> as
                </span>
              </span>
              <span className="hero-title-line block overflow-hidden opacity-0">
                <span className="block text-white">
                  beautiful as they look.
                </span>
              </span>
            </h1>

            {/* Accent bar */}
            <div className="hero-accent-bar mb-8 h-px w-0 bg-gradient-to-r from-[var(--color-accent)] to-transparent" />

            {/* Subtitle */}
            <p className="hero-subtitle mb-14 max-w-[420px] text-[15px] font-light leading-[1.9] text-slate-400 opacity-0">
              {heroSubtitle}
            </p>

            {/* CTAs */}
            <div className="hero-ctas flex flex-col items-start gap-5 opacity-0 sm:flex-row sm:items-center">
              <Link
                href={heroPrimaryCtaHref}
                className="group relative inline-flex items-center gap-3 bg-[var(--color-accent)] px-9 py-4 text-[10px] font-medium tracking-[0.22em] uppercase text-[#020617] transition-all duration-300 hover:bg-[var(--color-accent-light)] hover:shadow-[0_0_40px_rgba(197,160,89,0.2)]"
              >
                {heroPrimaryCtaLabel}
                <svg
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </Link>

              <Link
                href={heroSecondaryCtaHref}
                className="group inline-flex items-center gap-3 text-[10px] font-normal tracking-[0.22em] uppercase text-white/60 transition-colors hover:text-[var(--color-accent)]"
              >
                <span className="grid h-10 w-10 place-items-center border border-white/15 transition-colors group-hover:border-[var(--color-accent)]/40">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                </span>
                {heroSecondaryCtaLabel}
              </Link>
            </div>
          </div>

          {/* ══════════════════════════════════════════════════════════
              RIGHT COLUMN: Dynamic Featured Project Panel
              ══════════════════════════════════════════════════════════ */}
          {heroProject && (
            <div className="hero-right-col relative hidden opacity-0 lg:block">
              <div className="hero-corner absolute -left-5 -top-5 z-20 border border-[var(--color-accent)]/20 bg-[#0a0f1e] px-4 py-3 opacity-0">
                <span className="block text-[9px] tracking-[0.3em] uppercase text-[var(--color-accent)]">
                  Selected Work
                </span>
                <span className="mt-0.5 block text-[9px] tracking-[0.12em] text-slate-600">
                  {heroProject.category || heroProject.title}
                </span>
              </div>

              <Link
                href={heroProjectHref}
                className="group relative block overflow-hidden transition-transform duration-700 hover:scale-[1.01]"
                style={{ aspectRatio: "3/4", maxHeight: "72vh" }}
              >
                {heroImageSrc ? (
                  <Image
                    src={heroImageSrc}
                    alt={heroProject.title || "Featured project"}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 1024px) 0vw, 40vw"
                    priority
                  />
                ) : (
                  <div
                    className="absolute inset-0"
                    style={{
                      background: `
              linear-gradient(120deg, rgba(255,255,255,0.04) 0%, transparent 40%),
              linear-gradient(to bottom,
                #1a1208 0%, #2a1e10 15%, #3d2d1a 30%,
                #c4a882 50%, #d4bc98 65%, #b89a74 80%, #9a7e58 100%
              )
            `,
                    }}
                  >
                    <div
                      className="absolute inset-0"
                      style={{
                        backgroundImage: `
                linear-gradient(rgba(197,160,89,0.07) 1px, transparent 1px),
                linear-gradient(90deg, rgba(197,160,89,0.07) 1px, transparent 1px)
              `,
                        backgroundSize: "48px 48px",
                      }}
                    />
                    <div
                      className="absolute inset-0"
                      style={{
                        background: `
                radial-gradient(ellipse at 30% 60%, rgba(197,160,89,0.12) 0%, transparent 60%),
                linear-gradient(to bottom, rgba(2,6,23,0.4) 0%, transparent 30%, rgba(2,6,23,0.5) 100%)
              `,
                      }}
                    />
                  </div>
                )}

                <div className="absolute inset-0 z-[5] bg-gradient-to-t from-transparent via-white/0 to-white/0 transition-all duration-700 group-hover:via-white/[0.03]" />

                <div className="pointer-events-none absolute inset-[-1px] z-10 border border-[var(--color-accent)]/35 transition-colors duration-500 group-hover:border-[var(--color-accent)]/60" />

                <div className="absolute left-2 top-2 z-10 h-4 w-4 border-l border-t border-[var(--color-accent)] transition-all duration-500 group-hover:h-5 group-hover:w-5" />
                <div className="absolute right-2 top-2 z-10 h-4 w-4 border-r border-t border-[var(--color-accent)] transition-all duration-500 group-hover:h-5 group-hover:w-5" />
                <div className="absolute bottom-2 left-2 z-10 h-4 w-4 border-b border-l border-[var(--color-accent)] transition-all duration-500 group-hover:h-5 group-hover:w-5" />
                <div className="absolute bottom-2 right-2 z-10 h-4 w-4 border-b border-r border-[var(--color-accent)] transition-all duration-500 group-hover:h-5 group-hover:w-5" />

                <div
                  className="absolute bottom-0 left-0 right-0 z-20 flex items-end justify-between px-7 pb-7 pt-16"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(2,6,23,0.88) 50%, transparent)",
                  }}
                >
                  <div>
                    <div className="font-heading text-lg font-light italic text-white">
                      {heroProject.title}
                    </div>
                    <div className="mt-1 text-[9px] tracking-[0.25em] uppercase text-[var(--color-accent)]">
                      {[heroProject.location, heroProject.year]
                        .filter(Boolean)
                        .join(" · ")}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 font-heading text-[13px] font-light tracking-[0.1em] text-slate-400">
                    <span>
                      01 / {String(featuredProjects.length).padStart(2, "0")}
                    </span>
                    <svg
                      className="h-4 w-4 -translate-x-1 opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </div>
                </div>
              </Link>

              <span
                className="absolute -right-14 top-1/2 hidden -translate-y-1/2 rotate-90 whitespace-nowrap text-[9px] tracking-[0.35em] uppercase text-[var(--color-accent)]/35 xl:block"
                aria-hidden="true"
              >
                Interior Design Studio — Since 2024
              </span>
            </div>
          )}
        </div>

        {/* ═══ STATS BAR ═══ */}
        <div className="hero-stats relative z-10 border-t border-white/5 opacity-0">
          <div className="mx-auto flex max-w-[1400px] divide-x divide-white/5">
            {[
              { num: "3", sup: "+", label: "Years of Experience" },
              { num: "20", sup: "+", label: "Projects Delivered" },
              { num: "5", sup: "★", label: "Client Satisfaction" },
              { num: "Jakarta", sup: "", label: "Based In" },
            ].map(({ num, sup, label }) => (
              <div
                key={label}
                className="flex flex-1 items-center gap-4 px-[6%] py-6"
              >
                <span className="font-heading text-[2.5rem] font-light leading-none tracking-tight text-white/85">
                  {num}
                  {sup && (
                    <sup className="text-[1.1rem] text-[var(--color-accent)]">
                      {sup}
                    </sup>
                  )}
                </span>
                <div>
                  <div className="text-[9px] tracking-[0.28em] uppercase text-slate-600">
                    {label}
                  </div>
                  <div className="mt-1 h-px w-7 bg-[var(--color-accent)] opacity-50" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── SCROLL INDICATOR ── */}
        <div className="absolute bottom-28 left-[6%] z-10 flex items-center gap-3">
          <div className="relative h-12 w-px overflow-hidden bg-white/10">
            <div className="absolute left-0 top-0 h-full w-full animate-scroll-line bg-gradient-to-b from-[var(--color-accent)] to-transparent" />
          </div>
          <span
            className="text-[9px] tracking-[0.32em] uppercase text-slate-600"
            style={{ writingMode: "vertical-rl" }}
          >
            Scroll
          </span>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          FEATURED PROJECTS SECTION
          ═══════════════════════════════════════════════════════════════ */}
      {content.showFeaturedProjects !== false ? (
        <section className="mx-auto w-full max-w-7xl px-6 py-24 md:px-10 md:py-32">
          <div className="flex flex-col gap-8 border-b border-brand-dark/10 pb-16 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-accent">
                {featuredEyebrow}
              </p>
              <h2 className="mt-4 text-4xl text-brand-darkest md:text-5xl lg:text-6xl">
                {featuredTitle}
              </h2>
              <div className="mt-6 h-px w-[60px] bg-brand-accent" />
            </div>
            <p className="max-w-xl text-base leading-8 text-slate-700">
              {featuredDescription}
            </p>
          </div>

          <div className="mt-20 grid gap-12 md:grid-cols-2 lg:grid-cols-3">
            {featuredProjects.map((project) => (
              <ProjectCard key={project._id} project={project} />
            ))}
          </div>

          <div className="mt-20 text-center">
            <Link
              href={featuredCtaHref}
              className="inline-flex items-center border border-brand-darkest/20 px-10 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-brand-darkest transition-all hover:bg-brand-darkest hover:text-white"
            >
              {featuredCtaLabel}
            </Link>
          </div>
        </section>
      ) : null}

      {/* ═══════════════════════════════════════════════════════════════
          ABOUT SECTION
          ═══════════════════════════════════════════════════════════════ */}
      {content.showAboutSection !== false ? (
        <section className="mx-auto w-full max-w-7xl px-6 py-16 md:px-10 md:py-24 bg-white shadow-inner">
          <div className="grid gap-16 p-8 md:grid-cols-[1.1fr_0.9fr] md:p-16 lg:gap-24">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-accent">
                {aboutEyebrow}
              </p>
              <h2 className="mt-4 max-w-2xl text-4xl text-brand-darkest md:text-5xl lg:text-6xl">
                {aboutTitle}
              </h2>
              <div className="mt-6 h-px w-[60px] bg-brand-accent" />
            </div>

            <div className="flex flex-col justify-center space-y-12">
              <p className="text-base leading-8 text-slate-700">{aboutBody}</p>

              <div className="flex flex-wrap gap-4 pt-4">
                {aboutHighlights.map((item) => (
                  <span
                    key={item}
                    className="rounded-sm border border-brand-secondary/30 bg-transparent px-5 py-2.5 text-xs font-medium uppercase tracking-wider text-brand-darkest"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>
      ) : null}

      {/* ═══════════════════════════════════════════════════════════════
          BOTTOM CTA SECTION
          ═══════════════════════════════════════════════════════════════ */}
      {content.showBottomCtaSection !== false ? (
        <section className="mx-auto my-24 w-full max-w-6xl px-6 md:px-10">
          <div className="relative overflow-hidden bg-brand-darkest px-8 py-24 text-center shadow-xl md:px-16 md:py-32">
            <div className="absolute inset-0 bg-gradient-to-br from-[#020617] to-[#0f172a]" />
            <div className="relative mx-auto max-w-3xl">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-accent">
                {ctaEyebrow}
              </p>
              <h2 className="mt-6 text-4xl font-light leading-tight !text-white md:text-5xl lg:text-6xl">
                {ctaTitle}
              </h2>
              <div className="mx-auto mt-6 h-px w-[60px] bg-brand-accent" />
              <p className="mx-auto mt-8 max-w-2xl text-base font-light leading-8 text-slate-300">
                {ctaBody}
              </p>
              <Link
                href={ctaButtonHref}
                className="mt-12 inline-flex items-center border border-brand-accent bg-transparent px-10 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-brand-accent transition-all duration-300 hover:bg-brand-accent hover:text-brand-darkest"
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
