import fs from "node:fs";
import path from "node:path";
import { neon } from "@neondatabase/serverless";

function parseEnvFile(filePath) {
  const text = fs.readFileSync(filePath, "utf8");
  const env = {};

  for (const rawLine of text.split(/\r?\n/)) {
    const line = rawLine.trim();

    if (!line || line.startsWith("#")) continue;

    const separatorIndex = line.indexOf("=");
    if (separatorIndex === -1) continue;

    const key = line.slice(0, separatorIndex).trim();
    let value = line.slice(separatorIndex + 1).trim();

    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    env[key] = value;
  }

  return env;
}

const envPath = path.join(process.cwd(), ".env.local");

if (!fs.existsSync(envPath)) {
  throw new Error(".env.local was not found.");
}

const env = parseEnvFile(envPath);
const databaseUrl = env.DATABASE_URL || process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error("DATABASE_URL is not configured.");
}

const schemaPath = path.join(process.cwd(), "db", "schema.sql");
const schemaSql = fs.readFileSync(schemaPath, "utf8");
const statements = schemaSql
  .split(";")
  .map((statement) => statement.trim())
  .filter(Boolean);

const sql = neon(databaseUrl);

for (const statement of statements) {
  await sql.query(statement);
}

console.log("Contact database schema initialized successfully.");
