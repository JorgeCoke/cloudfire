import { Env } from "../../env";
import { usersT } from "./schemas/users";
import { ROLE } from "../../../models/enums";
import { Context } from "hono";
import { drizzle } from "drizzle-orm/d1";
import bcryptjs from "bcryptjs";
const { hashSync } = bcryptjs;

export const seed = async (
  c: Context<{
    Bindings: Env;
  }>
) => {
  const db = drizzle(c.env.DB);
  await db.insert(usersT).values({
    email: c.env.ADMIN_USER,
    password: hashSync(c.env.ADMIN_PASSWORD, 10),
    role: ROLE.ADMIN,
  });
};
