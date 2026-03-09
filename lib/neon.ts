import type { ContactSubmissionInput } from "@/lib/types";

const neonHttpUrl = process.env.NEON_HTTP_SQL_URL;
const neonToken = process.env.NEON_HTTP_SQL_TOKEN;

type NeonSqlResponse<T = unknown> = {
  rows?: T[];
};

async function neonQuery<T = unknown>(query: string, params: unknown[] = []) {
  if (!neonHttpUrl || !neonToken) {
    throw new Error("Neon SQL environment variables are not configured.");
  }

  const response = await fetch(neonHttpUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${neonToken}`,
    },
    body: JSON.stringify({ query, params }),
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to execute Neon SQL query.");
  }

  return (await response.json()) as NeonSqlResponse<T>;
}

export async function insertContactSubmission(payload: ContactSubmissionInput) {
  const query = `
    INSERT INTO contact_submissions (full_name, email, phone, project_type, message)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING id;
  `;

  await neonQuery(query, [
    payload.fullName,
    payload.email,
    payload.phone ?? null,
    payload.projectType,
    payload.message,
  ]);
}
