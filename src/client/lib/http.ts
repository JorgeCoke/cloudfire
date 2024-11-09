import { ofetch } from "ofetch";

export const http = ofetch.create({
  retry: 3,
  retryDelay: 1000, // ms
  timeout: 15000, // ms
});
