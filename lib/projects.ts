import { sanityQuery, urlForImage } from "@/lib/sanity";
import type { Project } from "@/lib/types";

const fallbackProjects: Project[] = [
  {
    _id: "1",
    title: "Serene Penthouse Residence",
    slug: "serene-penthouse-residence",
    summary: "A calm, light-filled penthouse blending warm stone, oak, and sculptural lighting.",
    description:
      "This project reimagines a compact penthouse into a serene retreat with layered textures and quiet detailing.",
    category: "Residential",
    location: "Jakarta, Indonesia",
    year: 2024,
    area: "240 sqm",
    styleConcept: "Warm Minimalism",
    materialsUsed: ["Travertine", "White Oak", "Limewash", "Brass"],
    gallery: ["https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1400&q=80"],
    highlights: ["Custom kitchen island", "Built-in display wall", "Soft ambient lighting"],
    featured: true,
  },
  {
    _id: "2",
    title: "Editorial Living Loft",
    slug: "editorial-living-loft",
    summary: "A modern loft with gallery-like composition, rich neutrals, and curated forms.",
    category: "Residential",
    location: "Bandung, Indonesia",
    year: 2023,
    area: "180 sqm",
    styleConcept: "Contemporary Editorial",
    gallery: ["https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1400&q=80"],
    featured: true,
  },
];

type SanityProject = Omit<Project, "coverImage" | "gallery" | "floorPlanImages" | "slug"> & {
  slug: { current: string };
  coverImage?: { asset?: { _ref?: string } };
  gallery?: { asset?: { _ref?: string } }[];
  floorPlanImages?: { asset?: { _ref?: string } }[];
};

const projectQuery = `*[_type == "project"] | order(year desc, _createdAt desc) {
  _id,
  title,
  slug,
  summary,
  description,
  category,
  location,
  year,
  area,
  styleConcept,
  materialsUsed,
  gallery,
  floorPlanImages,
  testimonial,
  highlights,
  featured,
  coverImage
}`;

function mapProject(project: SanityProject): Project {
  return {
    ...project,
    slug: project.slug.current,
    coverImage: urlForImage(project.coverImage?.asset?._ref),
    gallery: project.gallery?.map((img) => urlForImage(img.asset?._ref)).filter(Boolean) as string[] | undefined,
    floorPlanImages: project.floorPlanImages
      ?.map((img) => urlForImage(img.asset?._ref))
      .filter(Boolean) as string[] | undefined,
  };
}

export async function getProjects(): Promise<Project[]> {
  const projects = await sanityQuery<SanityProject[]>(projectQuery);
  if (!projects?.length) return fallbackProjects;
  return projects.map(mapProject);
}

export async function getFeaturedProjects(): Promise<Project[]> {
  const projects = await getProjects();
  return projects.filter((project) => project.featured).slice(0, 3);
}

export async function getProjectBySlug(slug: string): Promise<Project | undefined> {
  const projects = await getProjects();
  return projects.find((project) => project.slug === slug);
}
