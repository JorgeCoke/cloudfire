import type { Context } from "hono";
import type { CfEnv } from "../../../types/cf-env";
import { drizzle } from "drizzle-orm/d1";
import { usersT } from "./schemas/users.table";
import { hashSync } from "bcryptjs";
import { ROLE } from "../../../types/enums";

export const seed = async (
	c: Context<{
		Bindings: CfEnv;
	}>,
) => {
	const db = drizzle(c.env.DB);
	await db.insert(usersT).values({
		email: c.env.ADMIN_USER,
		password: hashSync(c.env.ADMIN_PASSWORD, 10),
		role: ROLE.ADMIN,
	});
};
