type ValidationRule = {
  required: () => ValidationRule;
  min: (value: number) => ValidationRule;
  max: (value: number) => ValidationRule;
};

export const projectType = {
  name: "project",
  title: "Project",
  type: "document",
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "details", title: "Project Details" },
    { name: "media", title: "Media & Gallery" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    {
      name: "title",
      title: "Project Title",
      type: "string",
      group: "content",
      validation: (Rule: ValidationRule) => Rule.required().min(3),
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      group: "content",
      options: { source: "title", maxLength: 96 },
      validation: (Rule: ValidationRule) => Rule.required(),
    },
    {
      name: "featured",
      title: "Featured on Home",
      type: "boolean",
      group: "content",
      initialValue: false,
    },
    {
      name: "category",
      title: "Project Category",
      type: "string",
      group: "content",
      options: {
        list: [
          { title: "Residential", value: "Residential" },
          { title: "Hospitality", value: "Hospitality" },
          { title: "Commercial", value: "Commercial" },
          { title: "Retail", value: "Retail" },
          { title: "Office", value: "Office" },
          { title: "Other", value: "Other" },
        ],
        layout: "dropdown",
      },
    },
    {
      name: "status",
      title: "Project Status",
      type: "string",
      group: "details",
      initialValue: "Completed",
      options: {
        list: [
          { title: "Completed", value: "Completed" },
          { title: "In Progress", value: "In Progress" },
          { title: "Concept", value: "Concept" },
          { title: "On Hold", value: "On Hold" },
        ],
        layout: "radio",
      },
    },
    {
      name: "summary",
      title: "Short Summary",
      type: "text",
      rows: 3,
      group: "content",
      validation: (Rule: ValidationRule) => Rule.required().min(20),
    },
    {
      name: "description",
      title: "Full Description",
      type: "text",
      rows: 8,
      group: "content",
    },
    {
      name: "challenge",
      title: "Design Challenge",
      type: "text",
      rows: 5,
      group: "content",
    },
    {
      name: "solution",
      title: "Design Solution",
      type: "text",
      rows: 5,
      group: "content",
    },
    {
      name: "location",
      title: "Location",
      type: "string",
      group: "details",
    },
    {
      name: "year",
      title: "Year",
      type: "number",
      group: "details",
    },
    {
      name: "duration",
      title: "Project Duration",
      type: "string",
      group: "details",
      description: "Example: 4 months",
    },
    {
      name: "client",
      title: "Client",
      type: "string",
      group: "details",
    },
    {
      name: "area",
      title: "Area / Size",
      type: "string",
      group: "details",
    },
    {
      name: "styleConcept",
      title: "Style / Concept",
      type: "string",
      group: "details",
    },
    {
      name: "services",
      title: "Services",
      type: "array",
      group: "details",
      of: [{ type: "string" }],
      options: {
        layout: "tags",
      },
    },
    {
      name: "materialsUsed",
      title: "Materials Used",
      type: "array",
      group: "details",
      of: [{ type: "string" }],
      options: {
        layout: "tags",
      },
    },
    {
      name: "highlights",
      title: "Project Highlights",
      type: "array",
      group: "details",
      of: [{ type: "string" }],
      options: {
        layout: "tags",
      },
    },
    {
      name: "coverImage",
      title: "Cover Image",
      type: "image",
      group: "media",
      options: { hotspot: true },
      fields: [
        {
          name: "alt",
          title: "Alt Text",
          type: "string",
          validation: (Rule: ValidationRule) => Rule.required(),
        },
      ],
      validation: (Rule: ValidationRule) => Rule.required(),
    },
    {
      name: "gallery",
      title: "Project Gallery",
      type: "array",
      group: "media",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            { name: "alt", title: "Alt Text", type: "string" },
            { name: "caption", title: "Caption", type: "string" },
          ],
        },
      ],
      description:
        "Upload multiple project images for the detail page gallery.",
    },
    {
      name: "floorPlanImages",
      title: "Floor Plans / Supporting Images",
      type: "array",
      group: "media",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            { name: "alt", title: "Alt Text", type: "string" },
            { name: "caption", title: "Caption", type: "string" },
          ],
        },
      ],
    },
    {
      name: "beforeAfterGallery",
      title: "Before / After Gallery",
      type: "array",
      group: "media",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "beforeImage",
              title: "Before Image",
              type: "image",
              options: { hotspot: true },
              fields: [{ name: "alt", title: "Alt Text", type: "string" }],
            },
            {
              name: "afterImage",
              title: "After Image",
              type: "image",
              options: { hotspot: true },
              fields: [{ name: "alt", title: "Alt Text", type: "string" }],
            },
            {
              name: "label",
              title: "Section Label",
              type: "string",
            },
          ],
          preview: {
            select: {
              title: "label",
              media: "afterImage",
            },
            prepare(selection: { title?: string; media?: unknown }) {
              return {
                title: selection.title || "Before / After",
                media: selection.media,
              };
            },
          },
        },
      ],
    },
    {
      name: "testimonial",
      title: "Client Testimonial",
      type: "object",
      group: "content",
      fields: [
        { name: "quote", title: "Quote", type: "text", rows: 4 },
        { name: "author", title: "Author", type: "string" },
        { name: "role", title: "Role / Company", type: "string" },
      ],
    },
    {
      name: "seoTitle",
      title: "SEO Title",
      type: "string",
      group: "seo",
      description: "Optional custom title for search engines.",
    },
    {
      name: "seoDescription",
      title: "SEO Description",
      type: "text",
      rows: 3,
      group: "seo",
      description: "Optional custom meta description.",
    },
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "category",
      media: "coverImage",
    },
  },
};
