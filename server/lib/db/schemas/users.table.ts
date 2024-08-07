import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { nanoid } from "nanoid";
import type { z } from "zod";
import { ROLES } from "../../../../types/roles.types";

// Prefix tables with "T"
export const usersT = sqliteTable("user", {
	id: text("id")
		.primaryKey()
		.$defaultFn(() => nanoid()),
	email: text("email").notNull().unique(),
	password: text("password").notNull(),
	role: text("role", { enum: [ROLES.ADMIN, ROLES.USER] })
		.notNull()
		.default(ROLES.USER),
	lastResetPasswordRequest: integer("last_reset_password_request", {
		mode: "timestamp_ms",
	}),
	lastLogIn: integer("last_log_in", { mode: "timestamp_ms" }),
	createdAt: integer("created_at", { mode: "timestamp_ms" })
		.notNull()
		.default(sql`(unixepoch() * 1000)`),
	updatedAt: integer("updated_at", { mode: "timestamp_ms" })
		.notNull()
		.default(sql`(unixepoch() * 1000)`)
		.$onUpdateFn(() => new Date())
		.$type<Date>(),
});

export const User = createSelectSchema(usersT); // or typeof users.$inferSelect;
export type User = z.infer<typeof User>;
export const InsertUser = createInsertSchema(usersT); // or typeof users.$inferInsert;
export type InsertUser = z.infer<typeof InsertUser>;
