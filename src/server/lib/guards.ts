import { verify } from "hono/jwt";
import type { ROLE } from "../../types/enums";
import type { Context } from "hono";
import type { CfEnv } from "../../types/cf-env";
import type { JwtPayload } from "../../types/controllers/auth-controller.types";
import { HttpException } from "../../types/controllers/shared";

// Check user is logged in
export const hasSessionGuard = async (
	c: Context<{
		Bindings: CfEnv;
	}>,
) => {
	const token = c.req.header("authorization");
	if (!token || token.split("Bearer ").length !== 2) {
		throw new HttpException({ status: 403, message: "Forbidden" });
	}
	const payload = (await verify(
		token.split("Bearer ")[1],
		c.env.AUTH_SESSION_SECRET_KEY,
	).catch(() => {
		throw new HttpException({ status: 403, message: "Forbidden" });
	})) as JwtPayload;
	return payload;
};

// Check user session and user roles
export const hasAnyRoleGuard = async (
	c: Context<{
		Bindings: CfEnv;
	}>,
	roles: ROLE[],
) => {
	const session = await hasSessionGuard(c);
	if (!roles.includes(session.role)) {
		throw new HttpException({ status: 401, message: "Unauthorized" });
	}
	return session;
};
