import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { nanoid } from "nanoid";
import { z } from "zod";
import { ROLE } from "../../../../types/enums";

// Prefix tables with "T"
export const usersT = sqliteTable("user", {
	id: text("id")
		.primaryKey()
		.$defaultFn(() => nanoid()),
	email: text("email").notNull().unique(),
	password: text("password").notNull(),
	enabled: integer("enabled", { mode: "boolean" }).notNull().default(true),
	role: text("role", { enum: [ROLE.ADMIN, ROLE.USER] })
		.notNull()
		.default(ROLE.USER),
	lastLogInAt: integer("last_log_in_at", { mode: "timestamp_ms" }),
	lastLogInTries: integer("last_log_in_tries").notNull().default(0),
	lastResetPasswordRequestAt: integer("last_reset_password_request_at", {
		mode: "timestamp_ms",
	}),
	createdAt: integer("created_at", { mode: "timestamp_ms" })
		.notNull()
		.default(sql`(unixepoch() * 1000)`),
	updatedAt: integer("updated_at", { mode: "timestamp_ms" })
		.notNull()
		.default(sql`(unixepoch() * 1000)`)
		.$onUpdateFn(() => new Date()),
});

export const User = createSelectSchema(usersT, {
	lastResetPasswordRequestAt: (schema) =>
		schema.lastResetPasswordRequestAt.pipe(z.coerce.string()), // Drizzle hack to override Date column types
	lastLogInAt: (schema) => schema.lastLogInAt.pipe(z.coerce.string()), // Drizzle hack to override Date column types
	createdAt: (schema) => schema.createdAt.pipe(z.coerce.string()), // Drizzle hack to override Date column types
	updatedAt: (schema) => schema.updatedAt.pipe(z.coerce.string()), // Drizzle hack to override Date column types
});

export type User = z.infer<typeof User>;
export const InsertUser = createInsertSchema(usersT); // or typeof users.$inferInsert;
export type InsertUser = z.infer<typeof InsertUser>;
