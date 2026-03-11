import { sanityQuery, urlForImage } from "@/lib/sanity";
import type {
  Project,
  ProjectBeforeAfterItem,
  ProjectImage,
} from "@/lib/types";

const fallbackProjects: Project[] = [
  {
    _id: "1",
    title: "Serene Penthouse Residence",
    slug: "serene-penthouse-residence",
    coverImage:
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1600&q=80",
    summary:
      "A calm, light-filled penthouse blending warm stone, oak, and sculptural lighting into a refined urban retreat.",
    description:
      "This project transforms a compact penthouse into a serene residence defined by layered textures, quiet detailing, and a seamless relationship between functionality and atmosphere. The design approach focuses on warm neutrals, natural materials, integrated storage, and carefully balanced lighting to create a home that feels both elevated and deeply personal.",
    challenge:
      "The original layout felt segmented and visually heavy, limiting natural light and making the home feel smaller than its actual footprint.",
    solution:
      "We opened sightlines, used integrated millwork, and introduced a warm restrained palette to create a brighter, more expansive experience without losing intimacy.",
    category: "Residential",
    status: "Completed",
    location: "Jakarta, Indonesia",
    year: 2024,
    duration: "5 months",
    client: "Private Client",
    area: "240 sqm",
    styleConcept: "Warm Minimalism",
    services: [
      "Interior Design",
      "Styling",
      "Material Selection",
      "Custom Joinery",
    ],
    materialsUsed: [
      "Travertine",
      "White Oak",
      "Limewash",
      "Brass",
      "Textured Linen",
    ],
    gallery: [
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1400&q=80",
    ],
    floorPlanImages: [
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1400&q=80",
    ],
    beforeAfterGallery: [
      {
        label: "Living Area",
        beforeImage: {
          url: "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1200&q=80",
          alt: "Living area before renovation",
        },
        afterImage: {
          url: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80",
          alt: "Living area after renovation",
        },
      },
    ],
    testimonial: {
      quote:
        "Jennifer translated our lifestyle into a home that feels sophisticated, peaceful, and incredibly functional.",
      author: "Private Client",
      role: "Homeowner",
    },
    highlights: [
      "Custom kitchen island with stone waterfall edge",
      "Integrated display wall with concealed storage",
      "Layered ambient lighting for day-to-night mood",
      "Calm material palette with tactile finishes",
    ],
    featured: true,
    seoTitle: "Serene Penthouse Residence | Jennifer Atelier",
    seoDescription:
      "A warm minimalist penthouse in Jakarta featuring travertine, white oak, and refined custom detailing.",
  },
  {
    _id: "2",
    title: "Editorial Living Loft",
    slug: "editorial-living-loft",
    coverImage:
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1600&q=80",
    summary:
      "A modern loft with gallery-like composition, rich neutrals, and curated forms designed for expressive city living.",
    description:
      "Designed as a contemporary urban loft, this project embraces bold proportions, sculptural furnishings, and an editorial sensibility. Clean architectural gestures are softened with textured fabrics, moody accents, and curated artwork, creating a space that feels dramatic yet livable.",
    challenge:
      "The client wanted a strong visual identity without compromising comfort or creating a cold, overly styled environment.",
    solution:
      "We balanced bold forms with tactile materials, layered lighting, and curated spatial moments that feel expressive yet warm.",
    category: "Residential",
    status: "Completed",
    location: "Bandung, Indonesia",
    year: 2023,
    duration: "4 months",
    client: "Private Client",
    area: "180 sqm",
    styleConcept: "Contemporary Editorial",
    services: ["Interior Design", "Furniture Curation", "Styling"],
    materialsUsed: ["Microcement", "Smoked Oak", "Blackened Steel", "Bouclé"],
    gallery: [
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1400&q=80",
    ],
    highlights: [
      "Double-height living area styling",
      "Curated furniture composition with bold silhouettes",
      "Gallery-inspired walls and lighting rhythm",
    ],
    featured: true,
    seoTitle: "Editorial Living Loft | Jennifer Atelier",
    seoDescription:
      "A contemporary editorial loft interior with bold forms, layered texture, and gallery-inspired composition.",
  },
  {
    _id: "3",
    title: "Horizon Boutique Stay",
    slug: "horizon-boutique-stay",
    coverImage:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1600&q=80",
    summary:
      "A boutique hospitality concept pairing soft luxury with tactile natural finishes and a welcoming resort mood.",
    description:
      "This hospitality project was developed to deliver an intimate guest experience through calm spatial sequencing, natural textures, and understated elegance. Guest rooms and public areas were designed with cohesive detailing, warm materiality, and a memorable sense of comfort.",
    challenge:
      "The brand needed a distinct interior identity that felt elevated, calm, and operationally practical across multiple guest areas.",
    solution:
      "We created a cohesive hospitality language using tactile natural materials, soft lighting, and repeated custom detailing throughout the property.",
    category: "Hospitality",
    status: "Completed",
    location: "Bali, Indonesia",
    year: 2022,
    duration: "8 months",
    client: "Hospitality Owner",
    area: "620 sqm",
    styleConcept: "Soft Tropical Luxury",
    services: [
      "Interior Design",
      "FF&E Selection",
      "Styling",
      "Guest Experience Design",
    ],
    materialsUsed: [
      "Teak Wood",
      "Natural Stone",
      "Rattan",
      "Linen",
      "Handcrafted Tile",
    ],
    gallery: [
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1400&q=80",
    ],
    testimonial: {
      quote:
        "The interiors gave our property a strong identity while still feeling warm and effortless for guests.",
      author: "Hospitality Owner",
      role: "Founder",
    },
    highlights: [
      "Resort-inspired guest suite palette",
      "Custom headboard and integrated joinery system",
      "Layered textures for a tactile guest experience",
    ],
    featured: true,
    seoTitle: "Horizon Boutique Stay | Jennifer Atelier",
    seoDescription:
      "A boutique hospitality interior in Bali blending tropical softness, natural texture, and understated luxury.",
  },
];

type SanityImageAsset = {
  asset?: {
    _ref?: string;
  };
  alt?: string;
  caption?: string;
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

const projectQuery = `*[_type == "project"] | order(year desc, _createdAt desc) {
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
  gallery[]{
    asset,
    alt,
    caption
  },
  floorPlanImages[]{
    asset,
    alt,
    caption
  },
  beforeAfterGallery[]{
    label,
    beforeImage{
      asset,
      alt
    },
    afterImage{
      asset,
      alt
    }
  },
  testimonial,
  highlights,
  featured,
  seoTitle,
  seoDescription,
  coverImage{
    asset,
    alt,
    caption
  }
}`;

function mapImage(image?: SanityImageAsset): ProjectImage | undefined {
  const url = urlForImage(image?.asset?._ref);
  if (!url) return undefined;

  return {
    url,
    alt: image?.alt,
    caption: image?.caption,
  };
}

function mapImageArray(images?: SanityImageAsset[]): string[] | undefined {
  const mapped = images
    ?.map((image) => urlForImage(image.asset?._ref))
    .filter(Boolean) as string[] | undefined;

  return mapped?.length ? mapped : undefined;
}

function mapBeforeAfterGallery(
  items?: SanityBeforeAfterItem[],
): ProjectBeforeAfterItem[] | undefined {
  const mapped = items
    ?.map((item) => {
      const beforeImage = mapImage(item.beforeImage);
      const afterImage = mapImage(item.afterImage);

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
  const coverImage = urlForImage(project.coverImage?.asset?._ref);
  const gallery = mapImageArray(project.gallery);
  const floorPlanImages = mapImageArray(project.floorPlanImages);
  const beforeAfterGallery = mapBeforeAfterGallery(project.beforeAfterGallery);

  return {
    ...project,
    slug: project.slug?.current ?? "",
    coverImage: coverImage ?? gallery?.[0],
    gallery,
    floorPlanImages,
    beforeAfterGallery,
    seoTitle: project.seoTitle ?? project.title,
    seoDescription: project.seoDescription ?? project.summary,
  };
}

export async function getProjects(): Promise<Project[]> {
  const projects = await sanityQuery<SanityProject[]>(projectQuery);

  if (!projects?.length) {
    return fallbackProjects;
  }

  return projects
    .map(mapProject)
    .filter((project) => project.slug && project.title && project.summary);
}

export async function getFeaturedProjects(limit = 3): Promise<Project[]> {
  const projects = await getProjects();
  return projects.filter((project) => project.featured).slice(0, limit);
}

export async function getProjectBySlug(
  slug: string,
): Promise<Project | undefined> {
  const projects = await getProjects();
  return projects.find((project) => project.slug === slug);
}
