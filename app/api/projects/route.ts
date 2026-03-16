import { NextResponse } from "next/server";
import { getProjectsPage } from "@/lib/projects";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = Number(searchParams.get("page") ?? "0");
  const pageSize = Number(searchParams.get("pageSize") ?? "12");

  const safePage = Number.isFinite(page) && page >= 0 ? page : 0;
  const safePageSize =
    Number.isFinite(pageSize) && pageSize >= 1 && pageSize <= 24 ? pageSize : 12;

  const result = await getProjectsPage(safePage, safePageSize);

  return NextResponse.json(result, {
    headers: {
      // Performance: cache paginated list responses while allowing background refresh.
      "Cache-Control": "s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
