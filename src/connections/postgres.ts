// import { neon, neonConfig } from "@neondatabase/serverless";
import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import { DATABASE_URL } from "../constants";
import logger from "../utils/logger";

function createDBConnection() {
  try {
    const pool = new Pool({
      connectionString: DATABASE_URL,
    });
    const db = drizzle(pool);
    logger.info("🚀 [postgres]: connected");
    return db;
  } catch (error) {
    logger.error("❌ [postgres]: failed to connect");
    console.log(error);
  }
}
export const db = createDBConnection();
