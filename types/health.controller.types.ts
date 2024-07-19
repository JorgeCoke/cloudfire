import { z } from "zod";

export const GetHealthResponse = z.object({
	status: z.union([z.literal("ok"), z.literal("ko")]),
});
export type GetHealthResponse = z.infer<typeof GetHealthResponse>;
