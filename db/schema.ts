import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  createdAt: text("timestamp").notNull().default(sql`CURRENT_TIMESTAMP`),
});

export const todos = sqliteTable("todos", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  createdAt: text("timestamp").notNull().default(sql`CURRENT_TIMESTAMP`),
  userId: integer("userId")
    .references(() => users.id)
    .notNull(),
});

export type User = typeof users.$inferSelect;
export type Todo = typeof todos.$inferSelect;
