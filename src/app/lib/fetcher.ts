import { type FetchOptions, ofetch } from "ofetch";

export const fetcher = <T>(url: string, options: FetchOptions<"json"> = {}) => {
	options.headers = {
		...options.headers,
		...(localStorage.getItem("jwt") != null && {
			authorization: `Bearer ${localStorage.getItem("jwt")}`,
		}),
	};
	return ofetch<T>(url, options);
};
