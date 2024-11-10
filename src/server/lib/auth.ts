import type { Context } from "hono";
import { verify } from "hono/jwt";
import type { JwtPayload } from "../../models/types/jwt-payload";
import type { Env } from "../env";
import { HttpException } from "./zod-to-json-openapi";

export const getSession = async (
	c: Context<{
		Bindings: Env;
	}>,
) => {
	const header = c.req.header("Authorization") || "";
	const [jwtType, jwt] = header.split(" ");
	if (!jwtType || !jwt || jwtType !== "Bearer") {
		throw new HttpException({
			status: 401,
			message: "Authentication required",
		});
	}
	const payload = (await verify(jwt, c.env.AUTH_SESSION_SECRET_KEY).catch(
		() => {
			throw new HttpException({
				status: 401,
				message: "Authentication required",
			});
		},
	)) as JwtPayload;
	return payload;
};
