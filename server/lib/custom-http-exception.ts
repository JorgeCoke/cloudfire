import { HTTPException } from "hono/http-exception";
import type { StatusCode } from "hono/utils/http-status";

export class HttpException extends HTTPException {
	constructor(error: { status: StatusCode; message: string }) {
		super(error.status, { message: error.message });
	}
}
