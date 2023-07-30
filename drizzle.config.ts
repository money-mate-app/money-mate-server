//drizzle.config.ts
import type { Config } from "drizzle-kit";
import "dotenv/config";

if (!process.env.DATABASE_URL) {
  throw new Error("Database url not found");
}

export default {
  schema: "src/models/**/schema.ts",
  out: "src/models/migrations",
  driver: "pg",
  breakpoints: false,
  dbCredentials: {
    connectionString: process.env.DATABASE_URL,
  },
} satisfies Config;
