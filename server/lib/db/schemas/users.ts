import { sqliteTable, text } from "drizzle-orm/sqlite-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { nanoid } from "nanoid";
import type { z } from "zod";

export const users = sqliteTable("user", {
	id: text("id")
		.primaryKey()
		.$defaultFn(() => nanoid()),
	email: text("email").notNull().unique(),
	password: text("password").notNull(),
});

export const User = createSelectSchema(users); // or typeof users.$inferSelect;
export type User = z.infer<typeof User>;
export const InsertUser = createInsertSchema(users); // or typeof users.$inferInsert;
export type InsertUser = z.infer<typeof InsertUser>;
