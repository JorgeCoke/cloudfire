import { HTTPException } from "hono/http-exception";
import type { StatusCode } from "hono/utils/http-status";
import type { ROLE } from "../../types/enums";
import type { Env } from "./env";
import type { Context } from "hono";
import { verify } from "hono/jwt";
import type { JwtPayload } from "../../types/controllers/auth-controller.types";

export class HttpException extends HTTPException {
	constructor(error: { status: StatusCode; message: string }) {
		super(error.status, { message: error.message });
	}
}

// Check user session and user roles from context
export const hasAnyRoleGuard = async (
	c: Context<{
		Bindings: Env;
	}>,
	roles: ROLE[],
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
	if (!roles.includes(payload.role)) {
		throw new HttpException({ status: 401, message: "Unauthorized" });
	}
	return payload;
};
