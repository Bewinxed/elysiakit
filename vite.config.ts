import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";
import openapiTypescriptPlugin from "./src/lib/api/viteApiUpdatePlugin";

export default defineConfig({
	plugins: [sveltekit(), openapiTypescriptPlugin()],
	server: {
		host: "127.0.0.1",
	},
});
