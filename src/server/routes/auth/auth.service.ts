import bcryptjs from "bcryptjs";
import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/d1";
import { sign } from "hono/jwt";
import type { JwtPayload } from "../../../models/types/jwt-payload";
import { getSession } from "../../lib/auth";
import { usersT } from "../../lib/db/schemas/users";
import {
	type AppRouteHandler,
	HttpException,
} from "../../lib/zod-to-json-openapi";
import {
	AuthErrors,
	type GetMeRoute,
	type PostLoginRoute,
	type PostSignupRoute,
} from "./auth.controller";
const { hashSync, compareSync } = bcryptjs;

export const PostLoginHandler: AppRouteHandler<typeof PostLoginRoute> = async (
	c,
) => {
	const db = drizzle(c.env.DB);
	const body = c.req.valid("json");
	const [user] = await db
		.select()
		.from(usersT)
		.limit(1)
		.where(eq(usersT.email, body.email));
	if (!user || !user.enabled) {
		throw new HttpException(AuthErrors.USER_NOT_FOUND);
	}
	const success = compareSync(body.password, user.password);
	if (!success) {
		// Increment lastLogInTries and disable user in case anomalous login tries
		await db
			.update(usersT)
			.set({
				lastLogInTries: user.lastLogInTries + 1,
				enabled: user.lastLogInTries < 99,
			})
			.where(eq(usersT.id, user.id));
		throw new HttpException(AuthErrors.USER_NOT_FOUND);
	}
	const jwtPayload: JwtPayload = {
		userId: user.id,
		exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24, // 24h expiration
		role: user.role,
	};
	const jwt = await sign(jwtPayload, c.env.AUTH_SESSION_SECRET_KEY);
	// Update lastLogInAt and reset lastLogInTries
	await db
		.update(usersT)
		.set({ lastLogInAt: new Date(), lastLogInTries: 0 })
		.where(eq(usersT.id, user.id));
	return c.json({ jwt }, 200);
};

export const PostSignupHandler: AppRouteHandler<
	typeof PostSignupRoute
> = async (c) => {
	const db = drizzle(c.env.DB);
	const body = c.req.valid("json");
	const [user] = await db
		.select()
		.from(usersT)
		.limit(1)
		.where(eq(usersT.email, body.email));
	if (user) {
		throw new HttpException(AuthErrors.ERROR_SIGN_UP);
	}
	const result = await db.insert(usersT).values({
		email: body.email,
		password: hashSync(body.password, 10),
	});
	return c.json({ success: !!result }, 200);
};

export const GetMeHandler: AppRouteHandler<typeof GetMeRoute> = async (c) => {
	const db = drizzle(c.env.DB);
	const session = await getSession(c);
	const [user] = await db
		.select()
		.from(usersT)
		.limit(1)
		.where(eq(usersT.id, session.userId));
	if (!user) {
		throw new HttpException(AuthErrors.USER_NOT_FOUND);
	}
	return c.json({ user }, 200);
};
