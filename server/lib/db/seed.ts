import type { Context } from "hono";
import type { Env } from "../env";
import { drizzle } from "drizzle-orm/d1";
import { usersT } from "./schemas/users.table";
import { hashSync } from "bcryptjs";

export const seed = async (
	c: Context<{
		Bindings: Env;
	}>,
) => {
	const db = drizzle(c.env.DB);
	await db.insert(usersT).values({
		email: c.env.ADMIN_USER,
		password: hashSync(c.env.ADMIN_PASSWORD, 10),
		role: "ADMIN",
	});
};
