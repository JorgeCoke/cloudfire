import { z } from "@hono/zod-openapi";
import { HTTPException } from "hono/http-exception";
import type { StatusCode } from "hono/utils/http-status";

export const HttpExceptionSchema = z.object({
	message: z.string(),
});
export type HttpExceptionSchema = z.infer<typeof HttpExceptionSchema>;

export class HttpException extends HTTPException {
	constructor(error: { status: StatusCode; message: string }) {
		super(error.status, { message: error.message });
	}
}

export class UnauthorizedException extends HttpException {
	constructor(message?: string) {
		super({ status: 401, message: message || "Authentication required" });
	}
}

export class ForbiddenException extends HttpException {
	constructor(message?: string) {
		super({ status: 403, message: message || "Forbidden" });
	}
}

export class NotFoundException extends HttpException {
	constructor(message?: string) {
		super({
			status: 404,
			message: message || "Resource, endpoint or method not found",
		});
	}
}
