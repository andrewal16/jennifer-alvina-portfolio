import { schema } from "./sanity/schemas";

const sanityConfig = {
  name: "default",
  title: "Jennifer Alvina Portfolio",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  schema,
};

export default sanityConfig;
