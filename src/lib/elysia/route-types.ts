import type { ElysiaWithBaseUrl } from "elysia-autoload";
import type Route0 from "/root/dev/elysiakit/src/elysia/routes/index";
import type Route1 from "/root/dev/elysiakit/src/elysia/routes/groups/[id]";
import type Route2 from "/root/dev/elysiakit/src/elysia/routes/users/[id]/index";

declare global {
    export type Routes = ElysiaWithBaseUrl<"/api/", ReturnType<typeof Route0>>
              & ElysiaWithBaseUrl<"/api/groups/:id", ReturnType<typeof Route1>>
              & ElysiaWithBaseUrl<"/api/users/:id", ReturnType<typeof Route2>>
}