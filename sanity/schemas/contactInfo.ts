type ValidationRule = {
  required: () => ValidationRule;
  max: (length: number) => ValidationRule;
  uri: (config: { allowRelative: boolean; scheme: string[] }) => ValidationRule;
};

export const contactInfoType = {
  name: "contactInfo",
  title: "Contact Info",
  type: "document",
  fields: [
    {
      name: "pageEyebrow",
      title: "Page Eyebrow",
      type: "string",
      initialValue: "Contact",
      validation: (Rule: ValidationRule) => Rule.max(50),
    },
    {
      name: "pageTitle",
      title: "Page Title",
      type: "string",
      initialValue: "Start Your Project",
      validation: (Rule: ValidationRule) => Rule.required().max(100),
    },
    {
      name: "pageDescription",
      title: "Page Description",
      type: "text",
      rows: 4,
      initialValue:
        "For residential, hospitality, or commercial interior design projects, please send your brief and preferred timeline.",
      validation: (Rule: ValidationRule) => Rule.required().max(400),
    },
    {
      name: "email",
      title: "Primary Email",
      type: "string",
      initialValue: "jenniferatelier@gmail.com",
      validation: (Rule: ValidationRule) => Rule.required().max(120),
    },
    {
      name: "phone",
      title: "Phone",
      type: "string",
      initialValue: "+62 812 3456 7890",
      validation: (Rule: ValidationRule) => Rule.max(40),
    },
    {
      name: "location",
      title: "Location",
      type: "string",
      initialValue: "Jakarta, Indonesia",
      validation: (Rule: ValidationRule) => Rule.max(120),
    },
    {
      name: "contactCards",
      title: "Contact Cards",
      type: "array",
      of: [
        {
          type: "object",
          name: "contactCard",
          title: "Contact Card",
          fields: [
            {
              name: "label",
              title: "Label",
              type: "string",
              validation: (Rule: ValidationRule) => Rule.required(),
            },
            {
              name: "value",
              title: "Value",
              type: "string",
              validation: (Rule: ValidationRule) => Rule.required(),
            },
            {
              name: "href",
              title: "Link URL",
              type: "string",
              description:
                "Optional. Use formats like mailto:hello@example.com, tel:+628123456789, or https://example.com",
            },
          ],
          preview: {
            select: {
              title: "label",
              subtitle: "value",
            },
          },
        },
      ],
      initialValue: [
        {
          _type: "contactCard",
          label: "Email",
          value: "jenniferatelier@gmail.com",
          href: "mailto:jenniferatelier@gmail.com",
        },
        {
          _type: "contactCard",
          label: "Studio",
          value: "Jakarta, Indonesia",
        },
      ],
    },
    {
      name: "socialLinks",
      title: "Social Links",
      type: "array",
      of: [
        {
          type: "object",
          name: "socialLink",
          title: "Social Link",
          fields: [
            {
              name: "platform",
              title: "Platform",
              type: "string",
              validation: (Rule: ValidationRule) => Rule.required(),
            },
            {
              name: "url",
              title: "URL",
              type: "url",
              validation: (Rule: ValidationRule) =>
                Rule.uri({ allowRelative: false, scheme: ["http", "https"] }),
            },
          ],
          preview: {
            select: {
              title: "platform",
              subtitle: "url",
            },
          },
        },
      ],
      initialValue: [
        {
          _type: "socialLink",
          platform: "Instagram",
          url: "https://instagram.com/jenniferatelier_",
        },
      ],
    },
    {
      name: "ctaTitle",
      title: "CTA Title",
      type: "string",
      initialValue: "Tell us about your vision",
      validation: (Rule: ValidationRule) => Rule.max(120),
    },
    {
      name: "ctaDescription",
      title: "CTA Description",
      type: "text",
      rows: 3,
      initialValue:
        "Share your goals, preferred timeline, and any inspirations so the studio can better understand your project.",
      validation: (Rule: ValidationRule) => Rule.max(300),
    },
  ],
  preview: {
    prepare() {
      return {
        title: "Contact Page Content",
        subtitle:
          "Manage contact details, direct info, social links, and CTA copy",
      };
    },
  },
};
