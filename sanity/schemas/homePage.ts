export const homePageType = {
  name: "homePage",
  title: "Home Page",
  type: "document",
  fields: [
    {
      name: "heroEyebrow",
      title: "Hero Eyebrow",
      type: "string",
      initialValue: "Interior Atelier",
      validation: (Rule: { max: (length: number) => unknown }) => Rule.max(60),
    },
    {
      name: "heroTitle",
      title: "Hero Title",
      type: "string",
      initialValue:
        "Creating elegant spaces that feel deeply personal and quietly luxurious.",
      validation: (Rule: {
        required: () => { max: (length: number) => unknown };
      }) => Rule.required().max(160),
    },
    {
      name: "heroSubtitle",
      title: "Hero Subtitle",
      type: "text",
      rows: 4,
      initialValue:
        "Jennifer Atelier crafts modern, minimalist interiors with an editorial perspective—balancing materiality, function, and emotion in every detail.",
      validation: (Rule: { max: (length: number) => unknown }) => Rule.max(320),
    },
    {
      name: "heroPrimaryCtaLabel",
      title: "Hero Primary CTA Label",
      type: "string",
      initialValue: "View Portfolio",
      validation: (Rule: { max: (length: number) => unknown }) => Rule.max(40),
    },
    {
      name: "heroPrimaryCtaHref",
      title: "Hero Primary CTA Link",
      type: "string",
      initialValue: "/portfolio",
      description: "Use internal paths like /portfolio or /contact.",
      validation: (Rule: { max: (length: number) => unknown }) => Rule.max(120),
    },
    {
      name: "heroSecondaryCtaLabel",
      title: "Hero Secondary CTA Label",
      type: "string",
      initialValue: "Start a Project",
      validation: (Rule: { max: (length: number) => unknown }) => Rule.max(40),
    },
    {
      name: "heroSecondaryCtaHref",
      title: "Hero Secondary CTA Link",
      type: "string",
      initialValue: "/contact",
      description: "Use internal paths like /portfolio or /contact.",
      validation: (Rule: { max: (length: number) => unknown }) => Rule.max(120),
    },
    {
      name: "featuredSectionEyebrow",
      title: "Featured Section Eyebrow",
      type: "string",
      initialValue: "Selected Works",
      validation: (Rule: { max: (length: number) => unknown }) => Rule.max(60),
    },
    {
      name: "featuredSectionTitle",
      title: "Featured Section Title",
      type: "string",
      initialValue: "Featured Projects",
      validation: (Rule: {
        required: () => { max: (length: number) => unknown };
      }) => Rule.required().max(100),
    },
    {
      name: "featuredSectionDescription",
      title: "Featured Section Description",
      type: "text",
      rows: 3,
      initialValue:
        "Highlight your most important interior design projects here to guide visitors toward your strongest portfolio pieces.",
      validation: (Rule: { max: (length: number) => unknown }) => Rule.max(280),
    },
    {
      name: "featuredSectionCtaLabel",
      title: "Featured Section CTA Label",
      type: "string",
      initialValue: "See all",
      validation: (Rule: { max: (length: number) => unknown }) => Rule.max(40),
    },
    {
      name: "featuredSectionCtaHref",
      title: "Featured Section CTA Link",
      type: "string",
      initialValue: "/portfolio",
      validation: (Rule: { max: (length: number) => unknown }) => Rule.max(120),
    },
    {
      name: "featuredProjectsLimit",
      title: "Featured Projects Limit",
      type: "number",
      initialValue: 3,
      description: "How many featured projects should appear on the home page.",
      validation: (Rule: {
        min: (value: number) => { max: (value: number) => unknown };
      }) => Rule.min(1).max(12),
    },
    {
      name: "showFeaturedProjects",
      title: "Show Featured Projects Section",
      type: "boolean",
      initialValue: true,
    },
    {
      name: "aboutSectionEyebrow",
      title: "About Section Eyebrow",
      type: "string",
      initialValue: "About the Studio",
      validation: (Rule: { max: (length: number) => unknown }) => Rule.max(60),
    },
    {
      name: "aboutSectionTitle",
      title: "About Section Title",
      type: "string",
      initialValue:
        "Thoughtful design shaped by calm luxury and lasting function.",
      validation: (Rule: { max: (length: number) => unknown }) => Rule.max(140),
    },
    {
      name: "aboutSectionBody",
      title: "About Section Body",
      type: "text",
      rows: 5,
      initialValue:
        "Use this section to introduce your design philosophy, your signature approach, and the value clients can expect when working with your studio.",
      validation: (Rule: { max: (length: number) => unknown }) => Rule.max(600),
    },
    {
      name: "aboutHighlights",
      title: "About Highlights",
      type: "array",
      of: [{ type: "string" }],
      description:
        "Short value points such as Residential, Hospitality, Turnkey Styling, etc.",
      validation: (Rule: { max: (length: number) => unknown }) => Rule.max(6),
    },
    {
      name: "showAboutSection",
      title: "Show About Section",
      type: "boolean",
      initialValue: true,
    },
    {
      name: "ctaSectionEyebrow",
      title: "Bottom CTA Eyebrow",
      type: "string",
      initialValue: "Let's collaborate",
      validation: (Rule: { max: (length: number) => unknown }) => Rule.max(60),
    },
    {
      name: "ctaSectionTitle",
      title: "Bottom CTA Title",
      type: "string",
      initialValue: "Designing spaces that elevate daily living.",
      validation: (Rule: {
        required: () => { max: (length: number) => unknown };
      }) => Rule.required().max(140),
    },
    {
      name: "ctaSectionBody",
      title: "Bottom CTA Description",
      type: "text",
      rows: 4,
      initialValue:
        "Share your project vision and we'll create a tailored concept with thoughtful planning and premium details.",
      validation: (Rule: { max: (length: number) => unknown }) => Rule.max(320),
    },
    {
      name: "ctaButtonLabel",
      title: "Bottom CTA Button Label",
      type: "string",
      initialValue: "Start a Project",
      validation: (Rule: { max: (length: number) => unknown }) => Rule.max(40),
    },
    {
      name: "ctaButtonHref",
      title: "Bottom CTA Button Link",
      type: "string",
      initialValue: "/contact",
      validation: (Rule: { max: (length: number) => unknown }) => Rule.max(120),
    },
    {
      name: "showBottomCtaSection",
      title: "Show Bottom CTA Section",
      type: "boolean",
      initialValue: true,
    },
    {
      name: "seoTitle",
      title: "SEO Title",
      type: "string",
      description: "Optional custom meta title for the home page.",
      validation: (Rule: { max: (length: number) => unknown }) => Rule.max(70),
    },
    {
      name: "seoDescription",
      title: "SEO Description",
      type: "text",
      rows: 3,
      description: "Optional custom meta description for the home page.",
      validation: (Rule: { max: (length: number) => unknown }) => Rule.max(160),
    },
  ],
  preview: {
    select: {
      title: "heroTitle",
      subtitle: "featuredSectionTitle",
    },
    prepare({ title, subtitle }: { title?: string; subtitle?: string }) {
      return {
        title: title || "Home Page",
        subtitle: subtitle ? `Featured: ${subtitle}` : "Home page content",
      };
    },
  },
};
