import { z } from "@hono/zod-openapi";

export const GetHealthResponseDto = z.object({
	status: z.string(),
});
export type GetHealthResponseDto = z.infer<typeof GetHealthResponseDto>;
