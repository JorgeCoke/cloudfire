import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";
import {
	PostLogInBody,
	type PostLogInResponse,
} from "../../types/auth.controller.types";

// TODO: Hide zod validation errors in Production enviroment
const AuthController = new Hono()
	.basePath("/auth")
	.post("/log-in", zValidator("json", PostLogInBody), async (c) => {
		const body = c.req.valid("json");
		if (body.password !== "password") {
			throw new HTTPException(404, { message: "User not found" });
		}
		const response: PostLogInResponse = { success: true };
		return c.json(response);
	});

export default AuthController;
