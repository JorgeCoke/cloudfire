import { ofetch } from "ofetch";
import toast from "react-hot-toast";

export const http = ofetch.create({
	retry: 3,
	retryDelay: 1000, // ms
	timeout: 15000, // ms
	ignoreResponseError: true,
	baseURL: "/api/v1",
	async onRequest({ request, options }) {
		const jwt = localStorage.getItem("jwt");
		if (jwt) {
			options.headers.set("Authorization", `Bearer ${jwt}`);
		}
	},
	async onResponse({ request, options, response, error }) {
		if (!response.ok && response._data.message) {
			toast.error(response._data.message);
		}
	},
});
