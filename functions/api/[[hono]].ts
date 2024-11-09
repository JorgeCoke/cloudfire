import { handle } from "hono/cloudflare-pages";
import server from "../../src/server/main";

export const onRequest = handle(server);
