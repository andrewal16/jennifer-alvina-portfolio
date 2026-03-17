import {
  getOptimizedImageUrl,
  type ImagePresetName,
  sanityQuery
} from "@/lib/sanity";
import type {
  Project,
  ProjectBeforeAfterItem,
  ProjectImage,
} from "@/lib/types";

const DEFAULT_PAGE_SIZE = 12;

const fallbackProjects: Project[] = [
  {
    _id: "1",
    title: "Serene Penthouse Residence",
    slug: "serene-penthouse-residence",
    coverImage: {
      url: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1600&q=80",
      aspectRatio: 0.8,
    },
    summary:
      "A calm, light-filled penthouse blending warm stone, oak, and sculptural lighting into a refined urban retreat.",
    category: "Residential",
    status: "Completed",
    location: "Jakarta, Indonesia",
    year: 2024,
    featured: true,
    gallery: [
      {
        url: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1400&q=80",
        aspectRatio: 1.33,
      },
    ],
  },
];

type SanityImageAsset = {
  asset?: {
    _ref?: string;
  };
  metadata?: {
    lqip?: string;
    dimensions?: {
      width?: number;
      height?: number;
      aspectRatio?: number;
    };
  };
  alt?: string;
  caption?: string;
  hotspot?: ProjectImage["hotspot"];
  crop?: ProjectImage["crop"];
};

type SanitySlug = {
  current?: string;
};

type SanityBeforeAfterItem = {
  label?: string;
  beforeImage?: SanityImageAsset;
  afterImage?: SanityImageAsset;
};

type SanityProject = Omit<
  Project,
  "slug" | "coverImage" | "gallery" | "floorPlanImages" | "beforeAfterGallery"
> & {
  slug?: SanitySlug;
  coverImage?: SanityImageAsset;
  gallery?: SanityImageAsset[];
  floorPlanImages?: SanityImageAsset[];
  beforeAfterGallery?: SanityBeforeAfterItem[];
};

const imageProjection = `{
  asset,
  "metadata": asset->metadata{
    lqip,
    dimensions
  },
  alt,
  caption,
  "hotspot": hotspot,
  "crop": crop,
}`;

const projectProjection = `{
  _id,
  title,
  slug,
  summary,
  description,
  challenge,
  solution,
  category,
  status,
  location,
  year,
  duration,
  client,
  area,
  styleConcept,
  services,
  materialsUsed,
  gallery[]${imageProjection},
  floorPlanImages[]${imageProjection},
  beforeAfterGallery[]{
    label,
    beforeImage${imageProjection},
    afterImage${imageProjection}
  },
  testimonial,
  highlights,
  featured,
  seoTitle,
  seoDescription,
  coverImage${imageProjection}
}`;

const pagedProjectsQuery = `*[_type == "project"] | order(year desc, _createdAt desc) [$start...$end] ${projectProjection}`;

function mapImage(image: SanityImageAsset | undefined, preset: ImagePresetName): ProjectImage | undefined {
  if (!image?.asset?._ref) return undefined;

  const dimensions = image.metadata?.dimensions;

  return {
    // Performance: context-specific URL presets keep payload sizes aligned with UI layout.
    url: getOptimizedImageUrl(image, preset),
    alt: image.alt,
    caption: image.caption,
    lqip: image.metadata?.lqip,
    width: dimensions?.width,
    height: dimensions?.height,
    aspectRatio: dimensions?.aspectRatio,
    hotspot: image.hotspot,
    crop: image.crop,
  };
}

function mapImageArray(
  images: SanityImageAsset[] | undefined,
  preset: ImagePresetName,
): ProjectImage[] | undefined {
  const mapped = images?.map((image) => mapImage(image, preset)).filter(Boolean) as
    | ProjectImage[]
    | undefined;

  return mapped?.length ? mapped : undefined;
}

function mapBeforeAfterGallery(
  items?: SanityBeforeAfterItem[],
): ProjectBeforeAfterItem[] | undefined {
  const mapped = items
    ?.map((item) => {
      const beforeImage = mapImage(item.beforeImage, "gallery");
      const afterImage = mapImage(item.afterImage, "gallery");

      if (!beforeImage && !afterImage) return null;

      return {
        label: item.label,
        beforeImage,
        afterImage,
      };
    })
    .filter(Boolean) as ProjectBeforeAfterItem[] | undefined;

  return mapped?.length ? mapped : undefined;
}

function mapProject(project: SanityProject): Project {
  const coverImage = mapImage(project.coverImage, "hero");
  const gallery = mapImageArray(project.gallery, "gallery");
  const floorPlanImages = mapImageArray(project.floorPlanImages, "gallery");
  const beforeAfterGallery = mapBeforeAfterGallery(project.beforeAfterGallery);

  return {
    ...project,
    slug: project.slug?.current ?? "",
    // Performance: hero image keeps higher quality for LCP while preserving metadata for placeholders.
    coverImage: coverImage ?? mapImage(project.gallery?.[0], "hero"),
    gallery,
    floorPlanImages,
    beforeAfterGallery,
    seoTitle: project.seoTitle ?? project.title,
    seoDescription: project.seoDescription ?? project.summary,
  };
}

export async function getProjectsPage(
  page = 0,
  pageSize = DEFAULT_PAGE_SIZE,
): Promise<{ projects: Project[]; hasMore: boolean }> {
  const start = page * pageSize;
  const end = start + pageSize + 1;

  const projects = await sanityQuery<SanityProject[]>(pagedProjectsQuery, {
    start,
    end,
  });

  if (!projects?.length) {
    return {
      projects: page === 0 ? fallbackProjects : [],
      hasMore: false,
    };
  }

  const mapped = projects
    .slice(0, pageSize)
    .map(mapProject)
    .filter((project) => project.slug && project.title && project.summary);

  return {
    projects: mapped,
    hasMore: projects.length > pageSize,
  };
}

export async function getProjects(): Promise<Project[]> {
  const batches: Project[] = [];
  let page = 0;
  let hasMore = true;

  while (hasMore && page < 20) {
    const result = await getProjectsPage(page, DEFAULT_PAGE_SIZE);
    batches.push(...result.projects);
    hasMore = result.hasMore;
    page += 1;
  }

  return batches;
}

export async function getFeaturedProjects(limit = 3): Promise<Project[]> {
  const { projects } = await getProjectsPage(0, 24);
  return projects.filter((project) => project.featured).slice(0, limit);
}

export async function getProjectBySlug(
  slug: string,
): Promise<Project | undefined> {
  const query = `*[_type == "project" && slug.current == $slug][0] ${projectProjection}`;
  const project = await sanityQuery<SanityProject>(query, { slug });

  if (!project) {
    return fallbackProjects.find((fallbackProject) => fallbackProject.slug === slug);
  }

  return mapProject(project);
}
