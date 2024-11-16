import bcryptjs from "bcryptjs";
import { drizzle } from "drizzle-orm/d1";
import type { Context } from "hono";
import { ROLE } from "../../../models/enums";
import type { CfEnv } from "../../env";
import { usersT } from "./schemas/users";
const { hashSync } = bcryptjs;

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
