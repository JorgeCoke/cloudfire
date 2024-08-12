import { handle } from "hono/cloudflare-pages";
import { server } from "../../src/server/server";

export const onRequest = handle(server);
