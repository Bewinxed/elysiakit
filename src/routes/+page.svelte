<script lang="ts">
    import Icon from '@iconify/svelte'
    import { eden } from 'src/lib/api/client'
    const client = eden(fetch)
    let result: RouteTypes<'/api/users/:id', 'get'>['response']
</script>

<svelte:head>
    <title>Home</title>
    <meta
        name="description"
        content="Sveltekit + ElysiaJS + Tailwind + MeltUI Scaffold" />
</svelte:head>

<svelte:body class="bg-[#F1EFE7]" style="background-color: #F1EFE7;" />

<main class="container flex flex-col mx-auto gap-4 px-4 py-12 sm:px-6 lg:px-8">
    <section class="flex flex-col gap-8">
        <div
            class="flex flex-wrap place-items-center place-content-center gap-4">
            <figure class="w-16 aspect-square sm:w-24">
                <img
                    src="https://elysiajs.com/assets/elysia.svg"
                    alt="ElysiaJS Logo" />
            </figure>
            <Icon icon="carbon:add" class="text-4xl text-gray-400" />
            <figure class="w-16 aspect-square sm:w-24">
                <img
                    src="https://upload.wikimedia.org/wikipedia/commons/1/1b/Svelte_Logo.svg"
                    alt="Sveltekit Logo" />
            </figure>
        </div>
        <h1 class="text-5xl font-black font-mono">ElysiaKit</h1>
        <h2 class="inline font-mono">A Sveltekit/ElysiaJS Scaffold</h2>
        <h1 class="text-left text-3xl">
            <strong>TRUE</strong> End-To-End Type Safety with
            <a
                class="link text-red-500"
                href="https://svelte.dev"
                target="_blank"
                rel="noopener noreferrer">SvelteKit</a>
            and
            <a
                class="link text-indigo-400"
                href="https://elysiajs.com"
                target="_blank"
                rel="noopener noreferrer">ElysiaJS</a>
        </h1>
        <!-- github and npm links -->
        <div class="flex gap-4">
            <a
                href="https://www.github.com/Bewinxed/elysiakit"
                target="_blank"
                rel="noopener noreferrer"
                class="btn btn-outline border-2">
                <Icon icon="akar-icons:github-fill" class="w-6 h-6" />
                Github
            </a>
            <a
                href="https://www.npmjs.com/package/elysiakit"
                target="_blank"
                rel="noopener noreferrer"
                class="btn btn-outline border-2 hover:bg-red-500 hover-text-">
                <Icon icon="akar-icons:npm-fill" class="w-6 h-6" />
                NPM
            </a>
        </div>
        <!-- get started! code block with git clone for above github link -->
        <div
            class="mockup-code w-full max-w-sm sm:max-w-full bg-transparent border-2 text-black border-black">
            <pre data-prefix="$"><code
                    >git clone https://www.github.com/Bewinxed/elysiakit</code></pre>
            <pre data-prefix="$"><code>cd elysiakit</code></pre>
            <pre data-prefix="$"><code>bun i</code></pre>
        </div>
    </section>
    <section>
        <h1 class="text-3xl font-bold">Why ElysiaKit?</h1>
        <div class="mx-auto max-w-3xl space-y-4 text-left text-lg">
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
                    class="link"
                    href="https://svetch-dev.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer">Svetch</a>
                solves this to some extent, but it still leaves room for improvement.
                That's where
                <a
                    class="link text-indigo-400"
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
                    const response = client.PATCH('/api/teams/{id}', {
                        params: {
                            path: {
                                id: 1,
                            },
                        },
                    })
                }}">Fetch</button>
        </div>
    </section>
    <section class="flex flex-col place-content-start place-items-start gap-2">
        <!-- #features -->
        <h1 class="text-3xl font-bold">Features</h1>
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

<style>
    :global(body) {
        background-color: #f1efe7;
    }
</style>
