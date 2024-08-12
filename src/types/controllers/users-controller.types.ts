import type { z } from "zod";
import { User } from "../../server/lib/db/schemas/users.table";
import { BuildSearchResult } from "./shared";

export const PostSearchUsersResponse = BuildSearchResult(
	User.omit({ password: true }),
);
export type PostSearchUsersResponse = z.infer<typeof PostSearchUsersResponse>;
