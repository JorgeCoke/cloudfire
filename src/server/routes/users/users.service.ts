import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/d1";
import { ROLE } from "../../../models/enums";
import { getSession } from "../../lib/auth";
import { usersT } from "../../lib/db/schemas/users";
import {
	type AppRouteHandler,
	HttpException,
} from "../../lib/zod-to-json-openapi";
import { type GetUserByIdRoute, UsersErrors } from "./users.controller";

export const GetUserByIdHandler: AppRouteHandler<
	typeof GetUserByIdRoute
> = async (c) => {
	const db = drizzle(c.env.DB);
	const params = c.req.valid("param");
	const session = await getSession(c);
	if (session.role !== ROLE.ADMIN && params.id !== session.userId) {
		throw new HttpException({ status: 403, message: "Forbidden" });
	}
	const [user] = await db
		.select()
		.from(usersT)
		.where(eq(usersT.id, params.id))
		.limit(1);
	user.password = "";
	if (!user) {
		throw new HttpException(UsersErrors.USER_NOT_FOUND);
	}
	return c.json({ user }, 200);
};
