import { z } from "zod";

export const GetHealthResponse = z.object({
	status: z.string(),
});
export type GetHealthResponse = z.infer<typeof GetHealthResponse>;
