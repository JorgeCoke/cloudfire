import { z } from "@hono/zod-openapi";
import { User } from "../../server/lib/db/schemas/users.table";
import { Query } from "../query.types";

// TODO: Get Keys from User & Add test for every type: string, number & "number", boolean & "bolean", enum, timestamp & "timestamp" & "IsoDate", null, notnull
export const SearchUsersFilter = z
	.object({
		id: Query,
		email: Query,
		role: Query,
		enabled: Query,
		lastLogInTries: Query,
		lastResetPasswordRequest: Query,
		lastLogIn: Query,
		createdAt: Query,
		updatedAt: Query,
	})
	.partial()
	.strict();
export type SearchUsersFilter = z.infer<typeof SearchUsersFilter>;

export const PostSearchUsersBody = z
	.object({
		filter: SearchUsersFilter.optional(),
		limit: z.number(),
		offset: z.number(),
		orderBy: z
			.object({
				param: User.pick({
					id: true,
					email: true,
					enabled: true,
					role: true,
					createdAt: true,
					updatedAt: true,
				}).keyof(),
				sort: z.enum(["asc", "desc"]),
			})
			.optional(),
	})
	.strict()
	.openapi("PostSearchUsersBody");
export type PostSearchUsersBody = z.infer<typeof PostSearchUsersBody>;
export const PostSearchUsersResponse = z
	.object({
		items: z.array(User),
		total: z.number(),
	})
	.openapi("PostSearchUsersResponse");
export type PostSearchUsersResponse = z.infer<typeof PostSearchUsersResponse>;
