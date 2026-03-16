import { createClient } from "next-sanity";
import { createImageUrlBuilder } from "@sanity/image-url";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const apiVersion = "2025-01-01";

const hasSanityConfig = Boolean(projectId && dataset);

const sanityConfig = {
  projectId: projectId ?? "",
  dataset: dataset ?? "production",
  apiVersion,
};

// Performance: use the Sanity CDN for production reads to reduce latency globally.
const client = hasSanityConfig
  ? createClient({
      ...sanityConfig,
      useCdn: true,
    })
  : null;

const imageBuilder = createImageUrlBuilder(sanityConfig);

export const imagePresets = {
  thumbnail: { width: 400, quality: 60 },
  card: { width: 800, quality: 70 },
  hero: { width: 1920, quality: 80 },
  gallery: { width: 1200, quality: 75 },
  lightbox: { width: 2400, quality: 85 },
} as const;

export type ImagePresetName = keyof typeof imagePresets;

type ImageSource = Parameters<typeof imageBuilder.image>[0];

export function urlFor(source: ImageSource) {
  // Performance: auto format + fit max prevents unnecessary bytes and upscaling.
  return imageBuilder.image(source).auto("format").fit("max").quality(75);
}

export function getOptimizedImageUrl(source: ImageSource, preset: ImagePresetName) {
  const selectedPreset = imagePresets[preset];

  // Performance: each preset caps the rendered width/quality per UI context.
  return urlFor(source)
    .width(selectedPreset.width)
    .quality(selectedPreset.quality)
    .url();
}

export async function sanityQuery<T>(
  query: string,
  params?: Record<string, unknown>,
): Promise<T | null> {
  if (!client) return null;

  try {
    return await client.fetch<T>(query, params ?? {}, {
      next: { revalidate: 3600 },
    });
  } catch {
    return null;
  }
}
