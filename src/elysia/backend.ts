//src/elysia/backend.ts
import swagger from "@elysiajs/swagger";
import { Elysia, type RouteBase } from "elysia";
import { autoload, type ElysiaWithBaseUrl } from "elysia-autoload";
import path from "node:path";

export const app = new Elysia({
	prefix: "/api",
})
	.use(
		autoload({
			// anything that is an index.ts or [something].ts (string arg)
			pattern: "**/{index.ts,[[]*[]].ts}",
			dir: path.resolve(process.cwd(), "src/routes/api/[...catchall]"),

			types: {
				output: path.resolve(process.cwd(), "src/elysia/elysia-types.ts"),
			},
		}),
	)
	.use(
		swagger({
			path: "/docs",
		}),
	);

declare global {
	type ElysiaApp = typeof app;
	// type that takes key of ['schema'] and gets the return type
	// Routes['schema']['/api/users/:id']['get']
	type RouteTypes<
		T extends keyof Routes["schema"],
		U extends keyof Routes["schema"][T],
	> = Routes["schema"][T][U];
}
