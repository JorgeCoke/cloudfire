import { createRouter } from "@nanostores/router";

const ROUTES = {
  HOME: "/",
  ERROR: "/error/:code",
} as const;

export const router = createRouter(ROUTES);
