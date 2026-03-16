import type { Metadata } from "next";
import Image from "next/image";
import dynamic from "next/dynamic";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SkeletonCard } from "@/components/skeleton-card";

const ProjectGallery = dynamic(() => import("@/components/portfolio/project-gallery").then((module) => module.ProjectGallery), {
  // Performance: defer heavy lightbox/gallery client JS until this section is reached.
  loading: () => <SkeletonCard aspectRatio="16 / 10" />,
});
import { getProjectBySlug, getProjects } from "@/lib/projects";

export const revalidate = 3600;

type Props = {
  params: Promise<{ slug: string }>;
};

function FactCell({
  label,
  value,
  accent = false,
}: {
  label: string;
  value?: string | number;
  accent?: boolean;
}) {
  if (!value) return null;

  return (
    <div
      className={`flex min-h-28 flex-col justify-between px-5 py-5 md:px-6 ${
        accent ? "bg-stone-900 text-stone-50" : "bg-white text-stone-900"
      }`}
    >
      <p
        className={`text-[11px] uppercase tracking-[0.22em] ${
          accent ? "text-stone-300" : "text-stone-500"
        }`}
      >
        {label}
      </p>
      <p
        className={`mt-5 text-base leading-6 md:text-lg ${
          accent ? "text-stone-50" : "text-stone-900"
        }`}
      >
        {value}
      </p>
    </div>
  );
}

function CollectionCard({
  title,
  items,
  tone = "light",
}: {
  title: string;
  items?: string[];
  tone?: "light" | "dark";
}) {
  if (!items?.length) return null;

  const isDark = tone === "dark";

  return (
    <div
      className={`border p-6 md:p-7 ${
        isDark
          ? "border-stone-800 bg-stone-900 text-stone-100"
          : "border-stone-200 bg-white/75 text-stone-900"
      }`}
    >
      <p
        className={`text-[11px] uppercase tracking-[0.22em] ${
          isDark ? "text-stone-400" : "text-stone-500"
        }`}
      >
        {title}
      </p>
      <div className="mt-5 flex flex-wrap gap-2.5">
        {items.map((item) => (
          <span
            key={item}
            className={`px-3 py-2 text-[11px] uppercase tracking-[0.16em] ${
              isDark
                ? "border border-stone-700 text-stone-200"
                : "border border-stone-300 bg-stone-50 text-stone-700"
            }`}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

function SectionHeading({
  eyebrow,
  title,
  body,
}: {
  eyebrow: string;
  title: string;
  body?: string;
}) {
  return (
    <div className="max-w-2xl">
      <p className="text-[11px] uppercase tracking-[0.24em] text-stone-500">
        {eyebrow}
      </p>
      <h2 className="mt-3 text-3xl leading-tight text-stone-950 md:text-5xl">
        {title}
      </h2>
      {body ? (
        <p className="mt-4 max-w-xl text-sm leading-7 text-stone-600 md:text-base">
          {body}
        </p>
      ) : null}
    </div>
  );
}

function HighlightList({ items }: { items?: string[] }) {
  if (!items?.length) return null;

  return (
    <div className="grid gap-px overflow-hidden border border-stone-200 bg-stone-200 md:grid-cols-2">
      {items.map((item, index) => (
        <div key={item} className="flex gap-4 bg-white px-5 py-5 md:px-6">
          <span className="pt-0.5 text-[11px] uppercase tracking-[0.22em] text-stone-400">
            {(index + 1).toString().padStart(2, "0")}
          </span>
          <p className="text-sm leading-7 text-stone-700">{item}</p>
        </div>
      ))}
    </div>
  );
}

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) return { title: "Project" };

  return {
    title: project.seoTitle || project.title,
    description: project.seoDescription || project.summary,
  };
}

export default async function PortfolioDetailPage({ params }: Props) {
  const { slug } = await params;
  const [project, projects] = await Promise.all([
    getProjectBySlug(slug),
    getProjects(),
  ]);

  if (!project) notFound();

  const currentProjectIndex = projects.findIndex(
    (entry) => entry.slug === project.slug,
  );
  const nextProject =
    currentProjectIndex >= 0 && projects.length > 1
      ? projects[(currentProjectIndex + 1) % projects.length]
      : null;

  const heroFacts = [
    { label: "Category", value: project.category, accent: true },
    { label: "Location", value: project.location },
    { label: "Year", value: project.year },
    { label: "Duration", value: project.duration },
    { label: "Client", value: project.client },
    { label: "Area", value: project.area },
    { label: "Status", value: project.status },
    { label: "Style Concept", value: project.styleConcept },
  ].filter((item) => item.value);

  const heroHighlights = project.highlights?.slice(0, 3);
  const projectStory =
    project.description ||
    project.summary ||
    "A refined project shaped through careful planning, premium materials, and a calm editorial sensibility.";

  return (
    <main className="overflow-hidden pb-24">
      <section className="relative border-b border-stone-200/70 bg-[linear-gradient(180deg,#faf8f5_0%,#f4efe8_52%,#f8f5f1_100%)]">
        <div className="absolute inset-x-0 top-0 h-40 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.85),transparent_60%)]" />
        <div className="absolute right-0 top-24 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(214,211,209,0.45),transparent_72%)] blur-3xl" />

        <div className="relative mx-auto w-full max-w-7xl px-6 pb-16 pt-8 md:px-10 lg:pb-24">
          <div className="flex flex-col gap-4 border-b border-stone-200/70 pb-5 text-[11px] uppercase tracking-[0.2em] text-stone-500 md:flex-row md:items-center md:justify-between">
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-3 text-stone-600 transition-colors hover:text-stone-950"
            >
              <span className="text-base leading-none">/</span>
              Back to Portfolio
            </Link>

            <div className="flex flex-wrap gap-x-6 gap-y-2">
              {project.category ? <span>{project.category}</span> : null}
              {project.location ? <span>{project.location}</span> : null}
              {project.year ? <span>{project.year}</span> : null}
            </div>
          </div>

          <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,0.82fr)_minmax(340px,0.9fr)] lg:items-center xl:gap-14">
            <div className="order-2 lg:order-1 lg:pr-6">
              <p className="text-[11px] uppercase tracking-[0.24em] text-stone-500">
                Selected Interior
              </p>
              <h1 className="mt-4 max-w-4xl text-[clamp(3.4rem,8vw,7rem)] leading-[0.92] text-stone-950">
                {project.title}
              </h1>
              <p className="mt-8 max-w-xl text-lg leading-8 text-stone-700 md:text-xl">
                {project.summary}
              </p>

              {heroHighlights?.length ? (
                <div className="mt-8 flex flex-wrap gap-3">
                  {heroHighlights.map((highlight) => (
                    <span
                      key={highlight}
                      className="border border-stone-300 bg-white/80 px-4 py-2 text-[11px] uppercase tracking-[0.16em] text-stone-700"
                    >
                      {highlight}
                    </span>
                  ))}
                </div>
              ) : null}

              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center border border-stone-950 bg-stone-950 px-6 py-3 text-sm uppercase tracking-[0.18em] text-stone-50 transition-colors hover:bg-stone-800"
                >
                  Start a Similar Project
                </Link>
                <a
                  href="#project-gallery"
                  className="inline-flex items-center justify-center border border-stone-300 bg-white/75 px-6 py-3 text-sm uppercase tracking-[0.18em] text-stone-900 transition-colors hover:border-stone-900"
                >
                  View Gallery
                </a>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <div className="relative">
                <div className="absolute -left-6 -top-6 hidden h-28 w-28 border border-stone-300/80 lg:block" />
                <div className="relative aspect-[4/5] overflow-hidden bg-stone-200 shadow-[0_24px_90px_rgba(28,25,23,0.14)]">
                  {project.coverImage ? (
                    <Image
                      src={project.coverImage.url}
                      alt={project.title}
                      fill
                      priority
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      placeholder={project.coverImage.lqip ? "blur" : "empty"}
                      blurDataURL={project.coverImage.lqip}
                      fetchPriority="high"
                    />
                  ) : null}
                </div>

                <div className="absolute bottom-4 left-4 right-4 border border-white/30 bg-stone-950/78 px-4 py-4 text-stone-100 backdrop-blur md:bottom-6 md:left-6 md:right-auto md:max-w-xs md:px-5">
                  <p className="text-[11px] uppercase tracking-[0.2em] text-stone-400">
                    Project Snapshot
                  </p>
                  <p className="mt-3 text-sm leading-7 text-stone-100">
                    {project.styleConcept ||
                      project.category ||
                      "Editorial interior direction"}
                  </p>
                  {project.status ? (
                    <p className="mt-3 text-[11px] uppercase tracking-[0.18em] text-stone-300">
                      {project.status}
                    </p>
                  ) : null}
                </div>
              </div>
            </div>
          </div>

          {heroFacts.length ? (
            <div className="relative z-10 mt-10 lg:-mt-14 lg:ml-[8%] lg:max-w-5xl">
              <div className="grid gap-px overflow-hidden border border-stone-200 bg-stone-200 sm:grid-cols-2 xl:grid-cols-4">
                {heroFacts.map((item, index) => (
                  <FactCell
                    key={item.label}
                    label={item.label}
                    value={item.value}
                    accent={index === 0}
                  />
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-6 py-16 md:px-10 lg:py-24">
        <div className="grid gap-14 lg:grid-cols-[minmax(260px,0.7fr)_minmax(0,1.3fr)] xl:gap-20">
          <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start">
            <SectionHeading
              eyebrow="Design Narrative"
              title="A composed story of space, material, and atmosphere."
              body="The project details are arranged as an editorial reading experience, with the practical data balanced against the emotional tone of the interior."
            />

            <CollectionCard title="Services" items={project.services} />
            <CollectionCard
              title="Materials"
              items={project.materialsUsed}
              tone="dark"
            />
          </aside>

          <div className="space-y-10">
            <div className="grid gap-8 border border-stone-200 bg-white/75 p-7 shadow-[0_20px_60px_rgba(28,25,23,0.06)] md:p-10">
              <div className="grid gap-8 xl:grid-cols-[1.15fr_0.85fr] xl:gap-10">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.22em] text-stone-500">
                    Overview
                  </p>
                  <p className="mt-4 text-lg leading-9 text-stone-700 md:text-[1.15rem]">
                    {projectStory}
                  </p>
                </div>

                <div className="border-t border-stone-200 pt-6 xl:border-l xl:border-t-0 xl:pl-8 xl:pt-0">
                  <p className="text-[11px] uppercase tracking-[0.22em] text-stone-500">
                    Project Perspective
                  </p>
                  <p className="mt-4 text-sm leading-8 text-stone-600">
                    {project.challenge ||
                      project.solution ||
                      "Every decision in the project was considered through comfort, restraint, and long-term elegance."}
                  </p>
                </div>
              </div>
            </div>

            {(project.challenge || project.solution) && (
              <div className="grid gap-5 lg:grid-cols-2">
                {project.challenge ? (
                  <div className="border border-stone-200 bg-[#f5f0e8] p-7 md:p-8">
                    <p className="text-[11px] uppercase tracking-[0.22em] text-stone-500">
                      Design Challenge
                    </p>
                    <p className="mt-4 text-sm leading-8 text-stone-700 md:text-base">
                      {project.challenge}
                    </p>
                  </div>
                ) : null}

                {project.solution ? (
                  <div className="border border-stone-900 bg-stone-900 p-7 text-stone-100 md:p-8">
                    <p className="text-[11px] uppercase tracking-[0.22em] text-stone-400">
                      Design Solution
                    </p>
                    <p className="mt-4 text-sm leading-8 text-stone-200 md:text-base">
                      {project.solution}
                    </p>
                  </div>
                ) : null}
              </div>
            )}

            <div className="grid gap-8 xl:grid-cols-[0.95fr_1.05fr]">
              {project.coverImage ? (
                <div className="relative min-h-[380px] overflow-hidden bg-stone-200">
                  <Image
                    src={project.coverImage.url}
                    alt={`${project.title} detail composition`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    placeholder={project.coverImage.lqip ? "blur" : "empty"}
                    blurDataURL={project.coverImage.lqip}
                  />
                </div>
              ) : null}

              <div className="space-y-6">
                <SectionHeading
                  eyebrow="Key Highlights"
                  title="Refined details that shape the experience."
                  body="A selection of spatial and material moments that define the overall character of the project."
                />
                <HighlightList items={project.highlights} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {project.gallery?.length ? (
        <section
          id="project-gallery"
          className="border-y border-stone-200/70 bg-white/60 py-16 md:py-20"
        >
          <div className="mx-auto w-full max-w-7xl px-6 md:px-10">
            <SectionHeading
              eyebrow="Project Gallery"
              title="An image-led composition of the finished interior."
              body="The gallery is arranged with a more editorial rhythm, allowing each frame to breathe while keeping the visual balance intentional."
            />

            <ProjectGallery
              images={project.gallery}
              projectTitle={project.title}
            />
          </div>
        </section>
      ) : null}

      {project.floorPlanImages?.length ? (
        <section className="mx-auto w-full max-w-7xl px-6 py-16 md:px-10 lg:py-20">
          <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
            <SectionHeading
              eyebrow="Supporting Visuals"
              title="Plans and references that complete the project story."
              body="Supplementary drawings and visuals help communicate the planning logic behind the final atmosphere."
            />

            <div className="grid gap-5 md:grid-cols-2">
              {project.floorPlanImages.map((image, index) => (
                <div
                  key={`${image.url}-${index}`}
                  className="border border-stone-200 bg-white p-3 shadow-[0_18px_50px_rgba(28,25,23,0.05)]"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-stone-100">
                    <Image
                      src={image.url}
                      alt={`${project.title} supporting visual ${index + 1}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      placeholder={image.lqip ? "blur" : "empty"}
                      blurDataURL={image.lqip}
                    />
                  </div>
                  <p className="px-1 pb-1 pt-4 text-[11px] uppercase tracking-[0.2em] text-stone-500">
                    Supporting Frame {(index + 1).toString().padStart(2, "0")}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {project.beforeAfterGallery?.length ? (
        <section className="bg-stone-900 py-16 text-stone-100 md:py-20">
          <div className="mx-auto w-full max-w-7xl px-6 md:px-10">
            <SectionHeading
              eyebrow="Before & After"
              title="Transformation viewed through contrast and clarity."
              body="The original conditions and final intervention are presented side by side to show the shift in atmosphere, materiality, and spatial flow."
            />

            <div className="mt-10 space-y-10">
              {project.beforeAfterGallery.map((item, index) => (
                <section
                  key={`${item.label ?? "comparison"}-${index}`}
                  className="border border-stone-800 bg-stone-950/70 p-5 md:p-7"
                >
                  {item.label ? (
                    <div className="mb-6 flex items-center justify-between gap-4 border-b border-stone-800 pb-4">
                      <h3 className="text-xl text-white md:text-2xl">
                        {item.label}
                      </h3>
                      <span className="text-[11px] uppercase tracking-[0.22em] text-stone-400">
                        Comparison {(index + 1).toString().padStart(2, "0")}
                      </span>
                    </div>
                  ) : null}

                  <div className="grid gap-5 lg:grid-cols-[1fr_auto_1fr] lg:items-center">
                    {item.beforeImage ? (
                      <div className="space-y-3">
                        <p className="text-[11px] uppercase tracking-[0.22em] text-stone-400">
                          Before
                        </p>
                        <div className="relative aspect-[4/3] overflow-hidden bg-stone-800">
                          <Image
                            src={item.beforeImage.url}
                            alt={
                              item.beforeImage.alt ||
                              `${project.title} before image ${index + 1}`
                            }
                            fill
                            className="object-cover"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            placeholder={item.beforeImage.lqip ? "blur" : "empty"}
                            blurDataURL={item.beforeImage.lqip}
                          />
                        </div>
                      </div>
                    ) : (
                      <div />
                    )}

                    <div className="hidden h-px w-14 bg-stone-700 lg:block" />

                    {item.afterImage ? (
                      <div className="space-y-3">
                        <p className="text-[11px] uppercase tracking-[0.22em] text-stone-400">
                          After
                        </p>
                        <div className="relative aspect-[4/3] overflow-hidden bg-stone-800">
                          <Image
                            src={item.afterImage.url}
                            alt={
                              item.afterImage.alt ||
                              `${project.title} after image ${index + 1}`
                            }
                            fill
                            className="object-cover"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            placeholder={item.afterImage.lqip ? "blur" : "empty"}
                            blurDataURL={item.afterImage.lqip}
                          />
                        </div>
                      </div>
                    ) : (
                      <div />
                    )}
                  </div>
                </section>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {(project.testimonial || nextProject) && (
        <section className="mx-auto w-full max-w-7xl px-6 py-16 md:px-10 lg:py-24">
          <div className="grid gap-8 xl:grid-cols-[1.05fr_0.95fr]">
            {project.testimonial ? (
              <div className="border border-stone-200 bg-[#f4eee6] p-8 md:p-10">
                <p className="text-[11px] uppercase tracking-[0.22em] text-stone-500">
                  Client Reflection
                </p>
                <blockquote className="mt-5 max-w-2xl text-3xl leading-[1.4] text-stone-900 md:text-4xl">
                  &ldquo;{project.testimonial.quote}&rdquo;
                </blockquote>

                {(project.testimonial.author || project.testimonial.role) && (
                  <div className="mt-8 border-t border-stone-300 pt-5 text-sm text-stone-600">
                    {project.testimonial.author ? (
                      <p className="font-medium text-stone-800">
                        {project.testimonial.author}
                      </p>
                    ) : null}
                    {project.testimonial.role ? (
                      <p className="mt-1">{project.testimonial.role}</p>
                    ) : null}
                  </div>
                )}
              </div>
            ) : null}

            {nextProject ? (
              <div className="border border-stone-200 bg-white p-5 shadow-[0_20px_60px_rgba(28,25,23,0.06)] md:p-6">
                <p className="text-[11px] uppercase tracking-[0.22em] text-stone-500">
                  Continue Browsing
                </p>
                <div className="mt-5 grid gap-5 md:grid-cols-[0.95fr_1.05fr] md:items-center">
                  <Link
                    href={`/portfolio/${nextProject.slug}`}
                    className="group relative block aspect-[4/5] overflow-hidden bg-stone-200"
                  >
                    {nextProject.coverImage ? (
                      <Image
                        src={nextProject.coverImage.url}
                        alt={nextProject.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        placeholder={nextProject.coverImage.lqip ? "blur" : "empty"}
                        blurDataURL={nextProject.coverImage.lqip}
                      />
                    ) : null}
                  </Link>

                  <div>
                    <p className="text-[11px] uppercase tracking-[0.22em] text-stone-500">
                      Next Project
                    </p>
                    <h3 className="mt-3 text-3xl leading-tight text-stone-950">
                      {nextProject.title}
                    </h3>
                    <p className="mt-4 text-sm leading-7 text-stone-600">
                      {nextProject.summary}
                    </p>

                    <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                      <Link
                        href={`/portfolio/${nextProject.slug}`}
                        className="inline-flex items-center justify-center border border-stone-950 bg-stone-950 px-5 py-3 text-sm uppercase tracking-[0.18em] text-stone-50 transition-colors hover:bg-stone-800"
                      >
                        View Next Project
                      </Link>
                      <Link
                        href="/contact"
                        className="inline-flex items-center justify-center border border-stone-300 px-5 py-3 text-sm uppercase tracking-[0.18em] text-stone-900 transition-colors hover:border-stone-900"
                      >
                        Start a Project
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </section>
      )}
    </main>
  );
}
