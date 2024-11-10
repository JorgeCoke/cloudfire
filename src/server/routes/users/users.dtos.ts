import { z } from "@hono/zod-openapi";
import { User } from "../../lib/db/schemas/users";

export const GetUserByIdParamsDto = z.object({
	id: z.string().min(1),
});
export type GetUserByIdParamsDto = z.infer<typeof GetUserByIdParamsDto>;

export const GetUserByIdResponseDto = z.object({
	user: User,
});
export type GetUserByIdResponseDto = z.infer<typeof GetUserByIdResponseDto>;
