const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;

const apiVersion = "2025-01-01";
const baseUrl =
  projectId && dataset
    ? `https://${projectId}.api.sanity.io/v${apiVersion}/data/query/${dataset}`
    : null;

type SanityQueryResponse<T> = {
  result: T;
};

function buildQueryUrl(query: string, params?: Record<string, unknown>) {
  if (!baseUrl) return null;

  const searchParams = new URLSearchParams({
    query,
  });

  if (params) {
    for (const [key, value] of Object.entries(params)) {
      searchParams.set(`$${key}`, JSON.stringify(value));
    }
  }

  return `${baseUrl}?${searchParams.toString()}`;
}

async function fetchSanity<T>(
  query: string,
  params?: Record<string, unknown>,
): Promise<T | null> {
  const url = buildQueryUrl(query, params);
  if (!url) return null;

  const response = await fetch(url, {
    next: { revalidate: 60 },
    headers: {
      Accept: "application/json",
    },
  });

  if (!response.ok) return null;

  const data = (await response.json()) as SanityQueryResponse<T>;
  return data.result;
}

export async function sanityQuery<T>(
  query: string,
  params?: Record<string, unknown>,
): Promise<T | null> {
  return fetchSanity<T>(query, params);
}

function parseAssetRef(assetRef: string) {
  const match = assetRef.match(
    /^(image|file)-([a-zA-Z0-9]+)-(\d+x\d+)-([a-z0-9]+)$/,
  );

  if (!match) return null;

  const [, type, id, dimensions, format] = match;
  return { type, id, dimensions, format };
}

export function urlForImage(assetRef?: string): string | undefined {
  if (!assetRef || !projectId || !dataset) return undefined;

  const parsed = parseAssetRef(assetRef);
  if (!parsed || parsed.type !== "image") return undefined;

  return `https://cdn.sanity.io/images/${projectId}/${dataset}/${parsed.id}-${parsed.dimensions}.${parsed.format}`;
}
