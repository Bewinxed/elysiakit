import type { ElysiaWithBaseUrl } from "elysia-autoload";
import type Route0 from "/root/dev/elysiakit/src/routes/api/[...catchall]/index";
import type Route1 from "/root/dev/elysiakit/src/routes/api/[...catchall]/groups/[id]";
import type Route2 from "/root/dev/elysiakit/src/routes/api/[...catchall]/ayys/[id]";
import type Route3 from "/root/dev/elysiakit/src/routes/api/[...catchall]/users/[id]/index";

declare global {
    export type Routes = ElysiaWithBaseUrl<"/", ReturnType<typeof Route0>>
              & ElysiaWithBaseUrl<"/groups/:id", ReturnType<typeof Route1>>
              & ElysiaWithBaseUrl<"/ayys/:id", ReturnType<typeof Route2>>
              & ElysiaWithBaseUrl<"/users/:id", ReturnType<typeof Route3>>
}