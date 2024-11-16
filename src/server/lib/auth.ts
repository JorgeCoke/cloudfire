import type { Context } from "hono";
import { verify } from "hono/jwt";
import type { JwtPayload } from "../../models/types/jwt-payload";
import type { CfEnv } from "../env";
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
