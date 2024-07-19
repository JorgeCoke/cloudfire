import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";
import { logger } from "hono/logger";
import AuthController from "./controllers/auth.controller";
import HealthController from "./controllers/health.controller";

// TODO: Add swagger + basic auth
const server = new Hono().basePath("/api");
server.use(logger()); // TODO: Add other generic middlewares
const routes = server.route("/", AuthController).route("/", HealthController);

server.notFound(() => {
	throw new HTTPException(404, { message: "Not found" });
});
server.onError((err, c) => {
	console.error(`${err}`);
	return err instanceof HTTPException
		? c.json({ message: err.message }, err.status)
		: c.json({ message: `${err}` }, 500); // TODO: Return unhandled errors info in DEV environments only, return "Internal Server Error" message otherwise (PROD)
});

export default server;
export type ServerType = typeof routes;
