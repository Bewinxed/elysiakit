import type { ElysiaWithBaseUrl } from "elysia-autoload";
import type Route0 from "../../routes/api/[...catchall]/index";
import type Route1 from "../../routes/api/[...catchall]/groups/[id]";
import type Route2 from "../../routes/api/[...catchall]/users/[id]/index";

declare global {
    export type Routes = ElysiaWithBaseUrl<"/api/", ReturnType<typeof Route0>>
              & ElysiaWithBaseUrl<"/api/groups/:id", ReturnType<typeof Route1>>
              & ElysiaWithBaseUrl<"/api/users/:id", ReturnType<typeof Route2>>
}