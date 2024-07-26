import { OpenAPIHono, createRoute } from "@hono/zod-openapi";
import { HTTPException } from "hono/http-exception";
import {
	PostLogInBody,
	PostLogInResponse,
} from "../../types/auth.controller.types";
import {
	openApiErrors,
	openApiRequest,
	openApiResponse,
} from "../utils/zod-to-json-openapi";

export const AuthErrors = {
	USER_NOT_FOUND: {
		status: 404,
		message: "User not found",
	},
} as const;

const basePath = "/auth";

const AuthController = new OpenAPIHono().openapi(
	createRoute({
		tags: [basePath],
		method: "post",
		path: `${basePath}/log-in`,
		request: openApiRequest(PostLogInBody),
		responses: {
			...openApiResponse(PostLogInResponse, 200, "JWT Session"),
			...openApiErrors([AuthErrors.USER_NOT_FOUND]),
		},
	}),
	async (c) => {
		const body = c.req.valid("json");
		if (body.password !== "password") {
			throw new HTTPException(AuthErrors.USER_NOT_FOUND.status, {
				message: AuthErrors.USER_NOT_FOUND.message,
			});
		}
		return c.json({ success: true }, 200);
	},
);

export default AuthController;
