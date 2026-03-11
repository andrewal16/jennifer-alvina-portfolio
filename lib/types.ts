export type ProjectImage = {
  url: string;
  alt?: string;
  caption?: string;
};

export type ProjectTestimonial = {
  quote: string;
  author?: string;
  role?: string;
};

export type ProjectBeforeAfterItem = {
  label?: string;
  beforeImage?: ProjectImage;
  afterImage?: ProjectImage;
};

export type Project = {
  _id: string;
  title: string;
  slug: string;
  coverImage?: string;
  summary: string;
  description?: string;
  challenge?: string;
  solution?: string;
  category?: string;
  status?: string;
  location?: string;
  year?: number;
  duration?: string;
  client?: string;
  area?: string;
  styleConcept?: string;
  services?: string[];
  materialsUsed?: string[];
  gallery?: string[];
  floorPlanImages?: string[];
  beforeAfterGallery?: ProjectBeforeAfterItem[];
  testimonial?: ProjectTestimonial;
  highlights?: string[];
  featured?: boolean;
  seoTitle?: string;
  seoDescription?: string;
};

export type HomePageContent = {
  heroEyebrow?: string;
  heroTitle?: string;
  heroSubtitle?: string;
  heroPrimaryCtaLabel?: string;
  heroPrimaryCtaHref?: string;
  heroSecondaryCtaLabel?: string;
  heroSecondaryCtaHref?: string;
  featuredSectionEyebrow?: string;
  featuredSectionTitle?: string;
  featuredSectionDescription?: string;
  featuredSectionCtaLabel?: string;
  featuredSectionCtaHref?: string;
  featuredProjectsLimit?: number;
  showFeaturedProjects?: boolean;
  aboutSectionEyebrow?: string;
  aboutSectionTitle?: string;
  aboutSectionBody?: string;
  aboutHighlights?: string[];
  showAboutSection?: boolean;
  ctaSectionEyebrow?: string;
  ctaSectionTitle?: string;
  ctaSectionBody?: string;
  ctaButtonLabel?: string;
  ctaButtonHref?: string;
  showBottomCtaSection?: boolean;
  seoTitle?: string;
  seoDescription?: string;
};

export type SiteSettings = {
  siteTitle?: string;
  siteTagline?: string;
  brandStatement?: string;
  heroEyebrow?: string;
  heroTitle?: string;
  heroSubtitle?: string;
  primaryCtaLabel?: string;
  primaryCtaHref?: string;
  secondaryCtaLabel?: string;
  secondaryCtaHref?: string;
  contactEmail?: string;
  contactPhone?: string;
  whatsappNumber?: string;
  studioLocation?: string;
  footerLocationLabel?: string;
  instagramUrl?: string;
  behanceUrl?: string;
  linkedinUrl?: string;
  seoDescription?: string;
};

export type ContactCard = {
  label: string;
  value: string;
  href?: string;
};

export type SocialLink = {
  platform: string;
  url?: string;
};

export type ContactInfo = {
  pageEyebrow?: string;
  pageTitle?: string;
  pageDescription?: string;
  contactCards?: ContactCard[];
  socialLinks?: SocialLink[];
  ctaTitle?: string;
  ctaDescription?: string;
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

export type ContactSubmissionRequest = ContactSubmissionInput & {
  turnstileToken: string;
};
