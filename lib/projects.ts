import { sanityFetch } from "@/lib/sanity";
import type { ContactInfo, HomeContent, Project } from "@/lib/types";

const projectProjection = `{
  _id,
  title,
  "slug": slug.current,
  coverImage{asset->{url}, alt},
  summary,
  description,
  category,
  location,
  year,
  areaSize,
  styleConcept,
  materialsUsed,
  galleryImages[]{asset->{url}, alt},
  additionalImages[]{asset->{url}, alt},
  testimonial,
  highlights,
  featured
}`;

const fallbackHome: HomeContent = {
  heroEyebrow: "Interior Designer",
  heroTitle: "Refined interiors that balance elegance, emotion, and functionality.",
  heroSubtitle:
    "Jennifer Alvina creates high-end residential and hospitality spaces with a minimalist editorial approach and timeless materiality.",
  ctaLabel: "Start a Project",
};

const fallbackContact: ContactInfo = {
  email: "hello@jenniferalvina.com",
  phone: "+62 812-3456-7890",
  location: "Jakarta, Indonesia",
};

const fallbackProjects: Project[] = [
  {
    _id: "p1",
    title: "Serene Penthouse Residence",
    slug: "serene-penthouse-residence",
    summary: "A warm minimalist residence with curated textures and soft architectural lighting.",
    category: "Residential",
    location: "Jakarta",
    year: 2024,
    areaSize: "240 sqm",
    styleConcept: "Warm Minimalism",
    materialsUsed: ["Travertine", "Oak", "Linen", "Brushed Brass"],
    featured: true,
    coverImage: {
      asset: {
        url: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1600&q=80",
      },
      alt: "Warm minimalist living room",
    },
    galleryImages: [
      {
        asset: {
          url: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb3?auto=format&fit=crop&w=1600&q=80",
        },
        alt: "Minimal dining area",
      },
    ],
  },
];

export async function getHomeContent() {
  const query = `*[_type == "homePage"][0]{heroEyebrow,heroTitle,heroSubtitle,ctaLabel}`;
  const content = await sanityFetch<HomeContent>(query);
  return content ?? fallbackHome;
}

export async function getContactInfo() {
  const query = `*[_type == "contactInfo"][0]{email,phone,location}`;
  const content = await sanityFetch<ContactInfo>(query);
  return content ?? fallbackContact;
}

export async function getProjects() {
  const query = `*[_type == "project"] | order(year desc, _createdAt desc) ${projectProjection}`;
  const projects = await sanityFetch<Project[]>(query);
  return projects?.length ? projects : fallbackProjects;
}

export async function getFeaturedProjects() {
  const projects = await getProjects();
  return projects.filter((project) => project.featured).slice(0, 3);
}

export async function getProjectBySlug(slug: string) {
  const query = `*[_type == "project" && slug.current == $slug][0] ${projectProjection}`;
  const project = await sanityFetch<Project>(query.replace("$slug", `"${slug}"`));
  if (project) return project;
  const projects = await getProjects();
  return projects.find((item) => item.slug === slug);
}
