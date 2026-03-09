export const projectType = {
  name: "project",
  title: "Project",
  type: "document",
  groups: [
    { name: "basic", title: "Basic Info", default: true },
    { name: "details", title: "Project Details" },
    { name: "media", title: "Media" },
    { name: "extras", title: "Extras" },
  ],
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      group: "basic",
      validation: (Rule: { required: () => unknown }) => Rule.required(),
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      group: "basic",
      options: { source: "title", maxLength: 96 },
      validation: (Rule: { required: () => unknown }) => Rule.required(),
      description: "Auto-generated from title. Keep short and URL-friendly.",
    },
    {
      name: "summary",
      title: "Short Summary",
      type: "text",
      rows: 3,
      group: "basic",
      validation: (Rule: { required: () => unknown }) => Rule.required(),
    },
    {
      name: "featured",
      title: "Featured Project",
      type: "boolean",
      group: "basic",
      initialValue: false,
      description: "If enabled, this project can appear in Home > Featured Projects.",
    },

    { name: "description", title: "Full Description", type: "text", rows: 8, group: "details" },
    {
      name: "category",
      title: "Category",
      type: "string",
      group: "details",
      options: {
        list: ["Residential", "Hospitality", "Commercial", "Other"],
        layout: "dropdown",
      },
    },
    { name: "location", title: "Location", type: "string", group: "details" },
    { name: "year", title: "Year", type: "number", group: "details" },
    { name: "areaSize", title: "Area Size", type: "string", group: "details" },
    { name: "styleConcept", title: "Style / Concept", type: "string", group: "details" },
    { name: "materialsUsed", title: "Materials Used", type: "array", of: [{ type: "string" }], group: "details" },

    {
      name: "coverImage",
      title: "Cover Image",
      type: "image",
      group: "media",
      options: { hotspot: true },
      fields: [{ name: "alt", type: "string", title: "Alt text" }],
    },
    {
      name: "galleryImages",
      title: "Gallery Images",
      type: "array",
      group: "media",
      of: [{ type: "image", options: { hotspot: true }, fields: [{ name: "alt", type: "string", title: "Alt text" }] }],
    },
    {
      name: "additionalImages",
      title: "Additional Project Images",
      type: "array",
      group: "media",
      of: [{ type: "image", options: { hotspot: true }, fields: [{ name: "alt", type: "string", title: "Alt text" }] }],
    },

    {
      name: "testimonial",
      title: "Testimonial",
      type: "object",
      group: "extras",
      fields: [
        { name: "quote", title: "Quote", type: "text" },
        { name: "author", title: "Author", type: "string" },
      ],
    },
    { name: "highlights", title: "Highlights", type: "array", of: [{ type: "string" }], group: "extras" },
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "category",
      media: "coverImage",
    },
  },
};
