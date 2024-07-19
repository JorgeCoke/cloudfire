import { hc } from "hono/client";
import type { ServerType } from "../../server/server";

// NOTE: See https://hono.dev/docs/guides/rpc
export const rpc = hc<ServerType>("/");
