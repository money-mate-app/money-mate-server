import { InferModel } from "drizzle-orm";
import { pgTable, uuid, varchar, json, text } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  userId: uuid("user_id").defaultRandom().primaryKey(),
  email: varchar("email").unique(),
  name: varchar("name").notNull(),
  profilePicture: text("profile_picture"),
  provider: json("provider").$type<{
    provider_name: string;
    other: any;
  }>(),
});

export type User = InferModel<typeof users, "select">;
export type NewUser = InferModel<typeof users, "insert">
