// migrate.ts
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import { DATABASE_URL } from "../constants";

const databaseUrl = drizzle(
  postgres(`${DATABASE_URL}`, { ssl: "require", max: 1 })
);

const main = async () => {
  try {
    console.log("Migration started");
    await migrate(databaseUrl, { migrationsFolder: "src/models/migrations" });
    console.log("Migration completed");
  } catch (error) {
    console.log(error);
  }
  process.exit(0);
};
main();
