import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { createSelectSchema } from "drizzle-zod";
import { nanoid } from "nanoid";
import { ROLE } from "../../../../models/enums";

// Prefix tables with "T"
export const usersT = sqliteTable("users", {
	id: text()
		.primaryKey()
		.$defaultFn(() => nanoid()),
	email: text().unique().notNull(),
	password: text().notNull(),
	enabled: integer({ mode: "boolean" }).notNull().default(true),
	role: text("role", { enum: [ROLE.ADMIN, ROLE.USER] })
		.notNull()
		.default(ROLE.USER),
	lastLogInAt: integer({ mode: "timestamp_ms" }),
	lastLogInTries: integer().notNull().default(0),
	createdAt: integer({ mode: "timestamp_ms" })
		.notNull()
		.default(sql`(unixepoch() * 1000)`),
	updatedAt: integer({ mode: "timestamp_ms" })
		.notNull()
		.default(sql`(unixepoch() * 1000)`)
		.$onUpdateFn(() => new Date()),
});

export const User = createSelectSchema(usersT);
export type User = typeof usersT.$inferSelect;
