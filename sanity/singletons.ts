export const singletonDocuments = [
  {
    documentId: "home-page",
    schemaType: "homePage",
    title: "Home Page",
  },
  {
    documentId: "contact-page",
    schemaType: "contactInfo",
    title: "Contact Page",
  },
  {
    documentId: "site-settings",
    schemaType: "siteSettings",
    title: "Site Settings",
  },
] as const;

export const singletonTypes: Set<string> = new Set(
  singletonDocuments.map((document) => document.schemaType),
);

export const singletonActions: Set<string> = new Set([
  "publish",
  "discardChanges",
  "restore",
]);
