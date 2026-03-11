import { neon } from "@neondatabase/serverless";
import type { ContactSubmissionInput } from "@/lib/types";

const databaseUrl = process.env.DATABASE_URL;
const legacyNeonHttpUrl = process.env.NEON_HTTP_SQL_URL;
const legacyNeonToken = process.env.NEON_HTTP_SQL_TOKEN;

function getNeonSqlClient() {
  if (databaseUrl) {
    return neon(databaseUrl);
  }

  if (legacyNeonHttpUrl || legacyNeonToken) {
    throw new Error(
      "DATABASE_URL is missing. The current NEON_HTTP_SQL_* variables are not compatible with this app configuration.",
    );
  }

  throw new Error("DATABASE_URL is not configured.");
}

export async function insertContactSubmission(payload: ContactSubmissionInput) {
  const sql = getNeonSqlClient();

  await sql`
    INSERT INTO contact_submissions (full_name, email, phone, project_type, message)
    VALUES (
      ${payload.fullName},
      ${payload.email},
      ${payload.phone ?? null},
      ${payload.projectType},
      ${payload.message}
    )
    RETURNING id;
  `;
}
