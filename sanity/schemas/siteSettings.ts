export const siteSettingsType = {
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    { name: "siteTitle", title: "Site Title", type: "string" },
    { name: "brandStatement", title: "Brand Statement", type: "text", rows: 3 },
    { name: "contactEmail", title: "Contact Email", type: "string" },
  ],
};
