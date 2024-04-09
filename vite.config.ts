import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";
import openapiTypescriptPlugin from "./src/lib/api/viteApiUpdatePlugin";

export default defineConfig({
	plugins: [
		sveltekit(),
		openapiTypescriptPlugin({
			openApiJsonUrl: "/api/docs/json",
			outputPath: "./src/lib/api/api.d.ts",
			pollInterval: 1000,
		}),
	],
	server: {
		host: "127.0.0.1",
	},
});
