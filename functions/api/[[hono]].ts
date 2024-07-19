import { handle } from "hono/cloudflare-pages";
import server from "../../server/server";

export const onRequest = handle(server);
