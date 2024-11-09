import { nanoquery } from "@nanostores/query";
import { http } from "./http";

export const [
  createFetcherStore,
  createMutatorStore,
  { invalidateKeys, revalidateKeys, mutateCache },
] = nanoquery({
  fetcher: (...keys) => http(keys.join("")),
});
