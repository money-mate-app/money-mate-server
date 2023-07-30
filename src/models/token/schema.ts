import { pgTable, serial, text, uuid } from "drizzle-orm/pg-core";
import { users } from "../user/schema";
import { relations } from "drizzle-orm";
export const usersRelations = relations(users, ({ one }) => ({
  userTokens: one(userTokens, {
    fields: [users.userId],
    references: [userTokens.userId],
  }),
}));

export const userTokens = pgTable("user_tokens", {
  id: serial("id").primaryKey(),
  userId: uuid("user_id").references(() => users.userId),
  refreshToken: text("refresh_token").notNull(),
  authToken: text("auth_token").notNull(),
});
