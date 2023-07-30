// import { neon, neonConfig } from "@neondatabase/serverless";
import { Client } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import { DATABASE_URL } from "../constants";
import logger from "../utils/logger";

async function createDBConnection() {
  try {
    const client = new Client({
      connectionString: DATABASE_URL,
    });
    await client.connect();
    const db = drizzle(client);
    logger.info("🚀 [postgress]: connected");
    return db;
  } catch (error) {
    logger.error("❌ [postgress]: failed to connect");
    console.log(error);
  }
}
export const db = createDBConnection();
