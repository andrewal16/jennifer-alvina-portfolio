"use client";

import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { StudioLogo } from "@/sanity/components/studio-logo";
import { StudioNavbar } from "@/sanity/components/studio-navbar";
import { schema } from "@/sanity/schemas";
import { singletonActions, singletonTypes } from "@/sanity/singletons";
import { structure } from "@/sanity/structure";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";

export default defineConfig({
  name: "default",
  title: "Jennifer Alvina CMS",
  basePath: "/studio",
  projectId,
  dataset,
  plugins: [structureTool({ structure }), visionTool()],
  studio: {
    components: {
      logo: StudioLogo,
      navbar: StudioNavbar,
    },
  },
  document: {
    actions: (previousActions, context) =>
      singletonTypes.has(context.schemaType)
        ? previousActions.filter(
            (action) => action.action && singletonActions.has(action.action),
          )
        : previousActions,
    newDocumentOptions: (previousOptions, context) =>
      context.creationContext.type === "global"
        ? previousOptions.filter(
            (templateItem) => !singletonTypes.has(templateItem.templateId),
          )
        : previousOptions,
  },
  schema,
});
