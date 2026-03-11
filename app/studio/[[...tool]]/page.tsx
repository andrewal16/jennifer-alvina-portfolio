import type { Metadata } from "next";
import { NextStudio, metadata as studioMetadata } from "next-sanity/studio";
import config from "../../../sanity.config";

export const dynamic = "force-static";
export { viewport } from "next-sanity/studio";

export const metadata: Metadata = {
  ...studioMetadata,
  title: "Jennifer Atelier CMS",
};

export default function StudioPage() {
  return <NextStudio config={config} />;
}
