import type { Config } from "drizzle-kit";

const url = process.env.DATABASE_PATH;

if (!url) throw new Error("DATABASE_PATH is not set");

export default {
  schema: "./db/schema.ts",
  out: "./db/migrations",
  driver: 'better-sqlite',
  dbCredentials: { url },
} satisfies Config;