import type { ViteDevServer } from "vite";
import { exec } from "child_process";

type PluginConfig = {
	openApiJsonUrl?: string;
	outputPath?: string;
	pollInterval?: number;
};

export default function openapiTypescriptPlugin(config: PluginConfig = {}) {
	let process: ReturnType<typeof exec> | null = null;
	let previousContent: string | null = null;

	return {
		name: "openapi-typescript",
		configureServer(server: ViteDevServer) {
			const {
				openApiJsonUrl = "/api/docs/json",
				outputPath = "./src/lib/api/api.d.ts",
				pollInterval = 5000, // Poll every 5 seconds by default
			} = config;

			const checkForChanges = async () => {
				try {
					const response = await fetch(
						`http://${server.config.server.host}:${server.config.server.port}${openApiJsonUrl}`,
					);
					const content = await response.text();

					if (content !== previousContent) {
						previousContent = content;

						if (process) {
							process.kill();
						}

						process = exec(
							`bunx openapi-typescript http://${server.config.server.host}:${server.config.server.port}${openApiJsonUrl} -o ${outputPath}`,
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
				} catch (error) {
					console.error(`Error fetching OpenAPI JSON: ${error}`);
				}
			};

			// Start polling for changes
			const intervalId = setInterval(checkForChanges, pollInterval);

			// Clean up the interval when the server is closed
			server.httpServer?.on("close", () => {
				clearInterval(intervalId);
			});
		},
	};
}
