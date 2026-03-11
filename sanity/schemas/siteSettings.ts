export const siteSettingsType = {
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    {
      name: "siteTitle",
      title: "Site Title",
      type: "string",
      initialValue: "Jennifer Atelier",
      validation: (Rule: { required: () => unknown }) => Rule.required(),
    },
    {
      name: "siteTagline",
      title: "Site Tagline",
      type: "string",
      initialValue: "Interior Atelier",
    },
    {
      name: "brandStatement",
      title: "Brand Statement",
      type: "text",
      rows: 3,
      initialValue:
        "Elegant interior design portfolio for Jennifer Atelier, showcasing refined residential and hospitality spaces.",
    },
    {
      name: "heroEyebrow",
      title: "Hero Eyebrow",
      type: "string",
    },
    {
      name: "heroTitle",
      title: "Hero Title",
      type: "string",
    },
    {
      name: "heroSubtitle",
      title: "Hero Subtitle",
      type: "text",
      rows: 4,
    },
    {
      name: "primaryCtaLabel",
      title: "Primary CTA Label",
      type: "string",
    },
    {
      name: "primaryCtaHref",
      title: "Primary CTA Link",
      type: "string",
      initialValue: "/portfolio",
    },
    {
      name: "secondaryCtaLabel",
      title: "Secondary CTA Label",
      type: "string",
    },
    {
      name: "secondaryCtaHref",
      title: "Secondary CTA Link",
      type: "string",
      initialValue: "/contact",
    },
    {
      name: "contactEmail",
      title: "Contact Email",
      type: "string",
      initialValue: "jenniferatelier@gmail.com",
    },
    {
      name: "contactPhone",
      title: "Contact Phone",
      type: "string",
    },
    {
      name: "whatsappNumber",
      title: "WhatsApp Number",
      type: "string",
      description: "Use international format, for example: 628123456789",
    },
    {
      name: "studioLocation",
      title: "Studio Location",
      type: "string",
    },
    {
      name: "footerLocationLabel",
      title: "Footer Location Label",
      type: "string",
      initialValue: "Jennifer Atelier · Jakarta",
    },
    {
      name: "instagramUrl",
      title: "Instagram URL",
      type: "url",
      initialValue: "https://instagram.com/jenniferatelier_",
    },
    {
      name: "behanceUrl",
      title: "Behance URL",
      type: "url",
    },
    {
      name: "linkedinUrl",
      title: "LinkedIn URL",
      type: "url",
    },
    {
      name: "seoDescription",
      title: "SEO Description",
      type: "text",
      rows: 3,
    },
  ],
  preview: {
    prepare() {
      return {
        title: "Site Settings",
        subtitle: "Branding, hero, contact, and footer content",
      };
    },
  },
};
