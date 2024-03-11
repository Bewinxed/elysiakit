<script lang="ts">
    import { edenFetch } from '@elysiajs/eden'
    import Icon from '@iconify/svelte'
    const eden = edenFetch<Routes>('http://127.0.0.1:5173', {
        fetcher: fetch,
    })
    let result: RouteTypes<'/api/', 'get'>['response']
</script>

<svelte:head>
    <title>Home</title>
    <meta
        name="description"
        content="Sveltekit + ElysiaJS + Tailwind + MeltUI Scaffold" />
</svelte:head>

<main class="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
    <section class="flex flex-col items-center gap-8">
        <div class="flex items-center gap-4">
            <figure class="w-16 sm:w-24">
                <img
                    src="https://elysiajs.com/assets/elysia.svg"
                    alt="ElysiaJS Logo" />
            </figure>
            <Icon icon="carbon:add" class="text-4xl text-gray-400" />
            <figure class="w-16 sm:w-24">
                <img
                    src="https://upload.wikimedia.org/wikipedia/commons/1/1b/Svelte_Logo.svg"
                    alt="Sveltekit Logo" />
            </figure>
        </div>
        <h1 class="text-center text-3xl sm:text-4xl">
            <strong>TRUE</strong> End-To-End Type Safety with
            <a
                href="https://svelte.dev"
                target="_blank"
                rel="noopener noreferrer">SvelteKit</a>
            and
            <a
                href="https://elysiajs.com"
                target="_blank"
                rel="noopener noreferrer">ElysiaJS</a>
        </h1>
        <div class="mx-auto max-w-3xl space-y-4 text-center text-lg">
            <p>
                People keep saying SvelteKit is end-to-end typesafe, which might
                be true when relying on simple Server Actions and having some
                type safety in components. However, anyone doing real work knows
                that interactions with the backend can get messy, especially
                since Svelte doesn't offer a GraphQL API or Typed fetch client
                out of the box.
            </p>
            <p>
                <a
                    href="https://svetch-dev.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer">Svetch</a>
                solves this to some extent, but it still leaves room for improvement.
                That's where
                <a
                    href="https://elysiajs.com"
                    target="_blank"
                    rel="noopener noreferrer">ElysiaJS</a>
                comes in - it provides a more elaborate backend handling solution
                that can be used with SvelteKit, along with an
                <strong>Automatically Typed Fetch Client</strong>
                via <a href="https://elysiajs.com/eden/treaty">Eden Treaty</a>!
            </p>
            <button
                class="btn btn-primary"
                on:click="{() => {
                    const response = eden('/api/groups/:id', {
                        method: 'PATCH',
                        params: {
                            id: 1,
                        },
                        body: {
                            name: 'new name',
                        },
                    })
                }}">Fetch</button>
        </div>
    </section>
    <div class="divider my-0"></div>
    <section class="flex flex-col place-content-start place-items-start gap-2">
        <!-- #features -->
        <h2 class="text-center text-2xl font-bold">Features</h2>
        <ul class="w-full list-inside list-disc space-y-2">
            <li class="list-item">
                📖 Automatic API Docs via <a href="/api/docs" class="font-bold"
                    >Swagger <Icon icon="carbon:external" /></a>
            </li>
            <iframe
                src="/api/docs"
                class="h-96 w-full max-w-sm rounded-lg border shadow sm:max-w-full"
                frameborder="0"
                title="API Docs"></iframe>
            <li>🤝 Typesafe Inference using simple fetch</li>
            <div class="mockup-code w-full max-w-sm sm:max-w-full">
                <pre><code
                        ><span class="text-green-500"
                            >const</span> eden = edenFetch&lt;Routes&gt;
        ('http://127.0.0.1:5173');
        <pre><code
                                ><span class="text-green-500"
                                    >const</span> response = eden(
          '/api/groups/:id',&#123;
          params: &#123;
            id: 1
          &#125;,
        &#125;</code></pre>
        <pre><code
                                >typeof response : <span class="text-blue-500"
                                    >type</span> Response = &#123;
          <span class="text-blue-500">id</span>: <span class="text-blue-500"
                                    >number</span
                                >;
          <span class="text-blue-500">name</span>: <span class="text-blue-500"
                                    >string</span
                                >;
          <span class="text-blue-500">description</span>: <span
                                    class="text-blue-500">string</span
                                >;
        &#125;
        </code></pre></code></pre>
            </div>
        </ul>
    </section>
</main>
