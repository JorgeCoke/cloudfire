import { count } from "drizzle-orm";
import { drizzle } from "drizzle-orm/d1";
import { createMiddleware } from "hono/factory";
import type { CfEnv } from "../env";
import { usersT } from "./db/schemas/users";
import { seed } from "./db/seed";
import { UnauthorizedException } from "./http-exceptions";

export const SwaggerSpecBasicAuthMiddleare = createMiddleware<{
	Bindings: CfEnv;
}>(async (c, next) => {
	// Add basic auth to swagger openapi specification
	const b64auth = (c.req.header("authorization") || "").split(" ")[1] || "";
	const [login, password] = atob(b64auth).toString().split(":");
	if (login === c.env.DOCS_USER && password === c.env.DOCS_PASSWORD) {
		// Run seed if no users found
		const db = drizzle(c.env.DB);
		const [users] = await db.select({ count: count() }).from(usersT);
		if (users.count === 0) {
			await seed(c);
		}
		return next();
	}
	c.header("WWW-Authenticate", `Basic realm="${c.env.DOCS_REALM}"`);
	throw new UnauthorizedException();
});
