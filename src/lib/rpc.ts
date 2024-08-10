import { hc } from "hono/client";
import type { ServerType } from "../../server/server";
import type { ClientResponse } from "hono/client";
import type { HttpExceptionZod } from "../../types/custom-http-exception.types";

// NOTE: See https://hono.dev/docs/guides/rpc
export const rpc = hc<ServerType>("/");

export const fetcher = <T>(
	fn: Promise<ClientResponse<T | { message: string }>>,
) => {
	return fn.then(async (res) => {
		const json = await res.json();
		if (res.ok) {
			return json as T;
		}
		const err: HttpExceptionZod & { status: number } = {
			message: (json as HttpExceptionZod).message,
			status: res.status,
		};
		throw new Error(JSON.stringify(err));
	});
};
