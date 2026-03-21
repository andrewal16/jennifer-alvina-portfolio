import { sanityQuery } from "@/lib/sanity";
import type { ContactInfo, HomePageContent, SiteSettings } from "@/lib/types";

const homePageQuery = `*[_type == "homePage"][0]{
  heroEyebrow,
  heroTitle,
  heroSubtitle,
  heroPrimaryCtaLabel,
  heroPrimaryCtaHref,
  heroSecondaryCtaLabel,
  heroSecondaryCtaHref,
  featuredSectionEyebrow,
  featuredSectionTitle,
  featuredSectionDescription,
  featuredSectionCtaLabel,
  featuredSectionCtaHref,
  featuredProjectsLimit,
  showFeaturedProjects,
  aboutSectionEyebrow,
  aboutSectionTitle,
  aboutSectionBody,
  aboutHighlights,
  showAboutSection,
  ctaSectionEyebrow,
  ctaSectionTitle,
  ctaSectionBody,
  ctaButtonLabel,
  ctaButtonHref,
  showBottomCtaSection,
  seoTitle,
  seoDescription
}`;

const siteSettingsQuery = `*[_type == "siteSettings"][0]{
  siteTitle,
  siteTagline,
  brandStatement,
  heroEyebrow,
  heroTitle,
  heroSubtitle,
  primaryCtaLabel,
  primaryCtaHref,
  secondaryCtaLabel,
  secondaryCtaHref,
  contactEmail,
  contactPhone,
  whatsappNumber,
  studioLocation,
  footerLocationLabel,
  instagramUrl,
  behanceUrl,
  linkedinUrl,
  seoDescription
}`;

const contactInfoQuery = `*[_type == "contactInfo"][0]{
  pageEyebrow,
  pageTitle,
  pageDescription,
  contactCards[]{
    label,
    value,
    href
  },
  socialLinks[]{
    platform,
    url
  },
  ctaTitle,
  ctaDescription,
  email,
  phone,
  location
}`;

type HomePageCmsContent = HomePageContent;

type SiteSettingsCmsContent = SiteSettings;

type ContactInfoCmsContent = ContactInfo;

const homePageFallback: HomePageCmsContent = {
  heroEyebrow: "Interior Atelier",
  heroTitle:
    "Creating elegant spaces that feel deeply personal and quietly luxurious.",
  heroSubtitle:
    "Jennifer Atelier crafts modern, minimalist interiors with an editorial perspective—balancing materiality, function, and emotion in every detail.",
  heroPrimaryCtaLabel: "View Portfolio",
  heroPrimaryCtaHref: "/portfolio",
  heroSecondaryCtaLabel: "Start a Project",
  heroSecondaryCtaHref: "/contact",
  featuredSectionEyebrow: "Selected Works",
  featuredSectionTitle: "Featured Projects",
  featuredSectionDescription:
    "Highlight your most important interior design projects here to guide visitors toward your strongest portfolio pieces.",
  featuredSectionCtaLabel: "See all",
  featuredSectionCtaHref: "/portfolio",
  featuredProjectsLimit: 3,
  showFeaturedProjects: true,
  aboutSectionEyebrow: "About the Studio",
  aboutSectionTitle:
    "Thoughtful design shaped by calm luxury and lasting function.",
  aboutSectionBody:
    "Use this section to introduce your design philosophy, your signature approach, and the value clients can expect when working with your studio.",
  aboutHighlights: [
    "Residential Interiors",
    "Hospitality Design",
    "Space Planning",
    "Material Styling",
  ],
  showAboutSection: true,
  ctaSectionEyebrow: "Let's collaborate",
  ctaSectionTitle: "Designing spaces that elevate daily living.",
  ctaSectionBody:
    "Share your project vision and we'll create a tailored concept with thoughtful planning and premium details.",
  ctaButtonLabel: "Start a Project",
  ctaButtonHref: "/contact",
  showBottomCtaSection: true,
};

const siteSettingsFallback: SiteSettingsCmsContent = {
  siteTitle: "Jennifer Atelier",
  siteTagline: "Design and Build",
  brandStatement:
    "Elegant interior design portfolio for Jennifer Atelier, showcasing premium residential and hospitality projects.",
  contactEmail: "jenniferatelier@gmail.com",
  studioLocation: "Jakarta, Indonesia",
  footerLocationLabel: "Jennifer Atelier · Jakarta",
  instagramUrl: "https://instagram.com/jenniferatelier_",
};

const contactInfoFallback: ContactInfoCmsContent = {
  email: "jenniferatelier@gmail.com",
  location: "Jakarta, Indonesia",
  pageEyebrow: "Contact",
  pageTitle: "Start Your Project",
  pageDescription:
    "For residential, hospitality, or commercial interior design projects, please send your brief and preferred timeline.",
  contactCards: [
    {
      label: "Email",
      value: "jenniferatelier@gmail.com",
      href: "mailto:jenniferatelier@gmail.com",
    },
    {
      label: "Studio",
      value: "Jakarta, Indonesia",
    },
  ],
  socialLinks: [
    {
      platform: "Instagram",
      url: "https://instagram.com/jenniferatelier_",
    },
  ],
  ctaTitle: "Tell us about your vision",
  ctaDescription:
    "Share your goals, preferred timeline, and any inspirations so the studio can better understand your project.",
};

export async function getHomePageContent(): Promise<HomePageCmsContent> {
  const content = await sanityQuery<HomePageCmsContent>(homePageQuery);

  return {
    ...homePageFallback,
    ...content,
    aboutHighlights: content?.aboutHighlights?.length
      ? content.aboutHighlights
      : homePageFallback.aboutHighlights,
  };
}

export async function getSiteSettings(): Promise<SiteSettingsCmsContent> {
  const content = await sanityQuery<SiteSettingsCmsContent>(siteSettingsQuery);

  return {
    ...siteSettingsFallback,
    ...content,
  };
}

export async function getContactInfo(): Promise<ContactInfoCmsContent> {
  const content = await sanityQuery<ContactInfoCmsContent>(contactInfoQuery);

  return {
    ...contactInfoFallback,
    ...content,
    email:
      content?.email ??
      content?.contactCards?.find((card) =>
        card.label.toLowerCase().includes("email"),
      )?.value ??
      contactInfoFallback.email,
    phone: content?.phone ?? contactInfoFallback.phone,
    location:
      content?.location ??
      content?.contactCards?.find((card) =>
        card.label.toLowerCase().includes("studio"),
      )?.value ??
      contactInfoFallback.location,
    contactCards: content?.contactCards?.length
      ? content.contactCards
      : contactInfoFallback.contactCards,
    socialLinks: content?.socialLinks?.length
      ? content.socialLinks
      : contactInfoFallback.socialLinks,
  };
}
