import { http } from "../lib/http";
import { createFetcherStore, createMutatorStore } from "../lib/nanoquery";

export const $getMessage = createFetcherStore<{ message: string }>([
  "/api/foo",
]);

export const $addMessage = createMutatorStore<{ message: string }>(
  async ({ data }) => http("/api/foo", { method: "POST", body: data })
);
