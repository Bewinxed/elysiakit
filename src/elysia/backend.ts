import swagger from "@elysiajs/swagger";
import { Elysia, type RouteBase } from "elysia";
import { autoload, type ElysiaWithBaseUrl } from "elysia-autoload";

const prefix = "/api" as const;
export const app = new Elysia({})

	.use(
		autoload({
			prefix,
			dir: "/root/dev/elysiakit/src/elysia/routes",
			types: {
				output: "/root/dev/elysiakit/src/lib/elysia/route-types.ts",
			},
		}),
	)
	.use(
		swagger({
			path: `${prefix}/docs`,
		}),
	)
	.onRequest(({ request, set }) => {
		// FIX: For elysia-autoload, using swagger and elysia-autoload together causes double prefix, so we remove it
		if (request.url.includes(`${prefix}${prefix}`)) {
			set.redirect = request.url.replace(`${prefix}${prefix}`, prefix);
			return request;
		}
	});

declare global {
	// exclude anything containing the prefix repeated twice
	type Prefix = typeof prefix;
	type ElysiaApp = typeof app;
	// type that takes key of ['schema'] and gets the return type
	// Routes['schema']['/api/users/:id']['get']
	type RouteTypes<
		T extends keyof Routes["schema"],
		U extends keyof Routes["schema"][T],
	> = Routes["schema"][T][U];
	type RouteResponse<
		T extends keyof Routes["schema"],
		U extends keyof Routes["schema"][T],
	> = RouteTypes<T, U>["response"];
}
