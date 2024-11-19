import type { Context } from "hono";
import { verify } from "hono/jwt";
import { sign } from "hono/jwt";
import type { JwtPayload } from "../../models/types/jwt-payload";
import type { CfEnv } from "../env";
import type { User } from "./db/schemas/users";
import { UnauthorizedException } from "./http-exceptions";

export const getSession = async (
	c: Context<{
		Bindings: CfEnv;
	}>,
) => {
	const header = c.req.header("Authorization") || "";
	const [jwtType, jwt] = header.split(" ");
	if (!jwtType || !jwt || jwtType !== "Bearer") {
		throw new UnauthorizedException();
	}
	const payload = (await verify(jwt, c.env.AUTH_SESSION_SECRET_KEY).catch(
		() => {
			throw new UnauthorizedException();
		},
	)) as JwtPayload;
	return payload;
};

export const generateJwt = async (user: User, key: string) => {
	const jwtPayload: JwtPayload = {
		userId: user.id,
		exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24, // 24h expiration
		role: user.role,
	};
	return await sign(jwtPayload, key);
};
