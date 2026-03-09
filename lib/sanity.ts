const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;

const baseUrl = projectId && dataset ? `https://${projectId}.api.sanity.io/v2025-01-01/data/query/${dataset}` : null;

async function fetchSanity<T>(query: string): Promise<T | null> {
  if (!baseUrl) return null;

  const url = `${baseUrl}?query=${encodeURIComponent(query)}`;
  const response = await fetch(url, { next: { revalidate: 60 } });
  if (!response.ok) return null;
  const data = (await response.json()) as { result: T };
  return data.result;
}

export async function sanityQuery<T>(query: string): Promise<T | null> {
  return fetchSanity<T>(query);
}

export function urlForImage(assetRef?: string): string | undefined {
  if (!assetRef || !projectId || !dataset) return undefined;
  const [, id, dimensions, format] = assetRef.split("-");
  if (!id || !dimensions || !format) return undefined;
  return `https://cdn.sanity.io/images/${projectId}/${dataset}/${id}-${dimensions}.${format}`;
}
