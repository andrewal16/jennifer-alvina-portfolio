const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const apiVersion = "2025-01-01";

const sanityBaseUrl =
  projectId && dataset
    ? `https://${projectId}.api.sanity.io/v${apiVersion}/data/query/${dataset}`
    : undefined;

export async function sanityFetch<T>(query: string): Promise<T | null> {
  if (!sanityBaseUrl) return null;

  try {
    const response = await fetch(`${sanityBaseUrl}?query=${encodeURIComponent(query)}`, {
      next: { revalidate: 60 },
    });

    if (!response.ok) return null;
    const json = (await response.json()) as { result: T };
    return json.result;
  } catch {
    return null;
  }
}

export function imageUrl(image?: { asset?: { url?: string } }) {
  return image?.asset?.url;
}
