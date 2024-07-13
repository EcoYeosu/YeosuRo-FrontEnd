import HttpClient from "./httpClient";

export const api = HttpClient({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});
