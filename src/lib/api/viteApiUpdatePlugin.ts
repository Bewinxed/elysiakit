import type { ViteDevServer } from "vite";
import { exec } from "child_process";

type PluginConfig = {
	openApiJsonUrl?: string;
	outputPath?: string;
};

export default function openapiTypescriptPlugin(config: PluginConfig = {}) {
	let process: ReturnType<typeof exec> | null = null;

	return {
		name: "openapi-typescript",
		configureServer(server: ViteDevServer) {
			const {
				openApiJsonUrl = "/api/docs/json",
				outputPath = "./src/lib/api.d.ts",
			} = config;

			server.watcher.add(openApiJsonUrl);
			server.watcher.on("change", (file) => {
				if (file === openApiJsonUrl) {
					if (process) {
						process.kill();
					}
					process = exec(
						`bunx openapi-typescript http://localhost:${server.config.server.port}/api/docs/json -o ${outputPath}`,
						(error, stdout, stderr) => {
							if (error) {
								console.error(`exec error: ${error}`);
								return;
							}
							console.log(`openapi-typescript output: ${stdout}`);
							if (stderr) {
								console.error(`openapi-typescript error: ${stderr}`);
							}
						},
					);
				}
			});
		},
	};
}
