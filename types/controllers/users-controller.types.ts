import type { z } from "@hono/zod-openapi";
import { User } from "../../server/lib/db/schemas/users.table";
import { BuildGenericSearchResult } from "./_shared";

export const PostSearchUsersResponse = BuildGenericSearchResult(
	User.omit({ password: true }),
).openapi("PostSearchUsersResponse");
export type PostSearchUsersResponse = z.infer<typeof PostSearchUsersResponse>;
