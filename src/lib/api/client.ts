import createClient from "openapi-fetch";
import type { paths } from "./api.d.ts";

export const eden = (fetcher?: typeof fetch) =>
	createClient<paths>({
		baseUrl: "http://127.0.0.1:5173",
		fetch: fetcher,
	});
