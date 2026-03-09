export type SanityImage = {
  asset?: {
    url?: string;
  };
  alt?: string;
};

export type Project = {
  _id: string;
  title: string;
  slug: string;
  coverImage?: SanityImage;
  summary: string;
  description?: string;
  category?: string;
  location?: string;
  year?: number;
  areaSize?: string;
  styleConcept?: string;
  materialsUsed?: string[];
  galleryImages?: SanityImage[];
  additionalImages?: SanityImage[];
  testimonial?: {
    quote: string;
    author?: string;
  };
  highlights?: string[];
  featured?: boolean;
};

export type HomeContent = {
  heroEyebrow?: string;
  heroTitle: string;
  heroSubtitle: string;
  ctaLabel?: string;
};

export type ContactInfo = {
  email?: string;
  phone?: string;
  location?: string;
};

export type ContactSubmissionInput = {
  fullName: string;
  email: string;
  phone?: string;
  projectType: string;
  message: string;
};
