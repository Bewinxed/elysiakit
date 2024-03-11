<script lang="ts">
  import { edenFetch } from '@elysiajs/eden';
  import Icon from '@iconify/svelte';
  const eden = edenFetch<Routes>('http://127.0.0.1:5173', {
    fetcher: fetch
  });
  let result: RouteTypes<'/api/', 'get'>['response'];
</script>

<svelte:head>
  <title>Home</title>
  <meta
    name="description"
    content="Sveltekit + ElysiaJS + Tailwind + MeltUI Scaffold"
  />
</svelte:head>

<main class="container m-auto px-20">
  <section class="place-items-center place-content-center flex flex-col gap-2">
    <div class="flex gap-2 place-items-center">
      <figure class="w-20 md:w-48 aspect-square">
        <img src="https://elysiajs.com/assets/elysia.svg" alt="" />
      </figure>
      <Icon icon="carbon:add" />
      <figure class="w-20 md:w-48 aspect-square">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/1/1b/Svelte_Logo.svg"
          alt="Sveltekit Logo"
        />
      </figure>
    </div>
    <h1 class="text-xl font-bold text-center">
      <!-- link to sveltekit and elysiajs -->
      <strong>TRUE</strong> End-To-End type safety with
      <a
        href="https://svelte.dev"
        target="_blank"
        class="text-red-500"
        rel="noopener noreferrer">SvelteKit</a
      >
      and
      <a
        href="https://elysiajs.com"
        target="_blank"
        rel="noopener noreferrer"
        class="text-gray-500">ElysiaJS</a
      >
      <!-- to your new<br />SvelteKit app -->
    </h1>
    <p>
      People keep saying sveltekit is end-to-end typesafe, this might be true
      when you're relying on simple Server Actions, and it has some type safety
      in components etc.
    </p>
    <p>
      But anyone doing any real work knows that interactions with the backend
      can get really messy, especially since <strong>svelte</strong> doesn't offer
      any kind of GraphQL API or Typed fetch client, this can complicate DX.
    </p>
    <p>
      I've solved this on my side with <a
        href="https://svetch-dev.vercel.app/"
        target="_blank"
        class="text-red-500"
        rel="noopener noreferrer">Svetch</a
      >, however, It leaves a lot to be desired, even though it should work for
      80% of cases
    </p>
    <p>
      I stumbled upon <a
        href="https://elysiajs.com"
        target="_blank"
        rel="noopener noreferrer"
        class="text-gray-500">ElysiaJS</a
      >
      and it provides exactly what I'm looking for, a more elaborate Backend handling
      that can be used with Sveltekit with an
      <strong>Automatically Typed Fetch Client!</strong>
      via
      <a href="https://elysiajs.com/eden/treaty" class="text-gray-500"
        >Eden Treaty!</a
      >
    </p>
    <button
      class="btn btn-primary"
      on:click={() => {
        const response = eden('/api/groups/:id', {
          method: 'PATCH',
          params: {
            id: 1
          },
          body: {
            name: 'new name'
          }
        });
      }}>Fetch</button
    >
  </section>
  <div class="divider my-0" />
  <section class="place-items-start place-content-start flex flex-col gap-2">
    <!-- #features -->
    <h2 class="text-2xl font-bold text-center">Features</h2>
    <ul class="list-disc list-inside space-y-2 w-full">
      <li class="list-item">
        📖 Automatic API Docs via <a href="/api/docs" class="font-bold"
          >Swagger <Icon icon="carbon:external" /></a
        >
      </li>
      <iframe
      src="/api/docs"
      class="h-96 rounded-lg shadow border max-w-sm sm:max-w-full w-full"
      frameborder="0"
      title="API Docs"
    ></iframe>
    <li>🤝 Typesafe Inference using simple fetch</li>
      <div class="mockup-code max-w-sm sm:max-w-full w-full">
        <pre><code
            ><span class="text-green-500">const</span
            > eden = edenFetch&lt;Routes&gt;
        ('http://127.0.0.1:5173');
        <pre><code><span class="text-green-500">const</span> response = eden(
          '/api/groups/:id',&#123;
          params: &#123;
            id: 1
          &#125;,
        &#125;</code></pre>
        <pre><code>typeof response : <span class="text-blue-500">type</span> Response = &#123;
          <span class="text-blue-500">id</span>: <span class="text-blue-500">number</span>;
          <span class="text-blue-500">name</span>: <span class="text-blue-500">string</span>;
          <span class="text-blue-500">description</span>: <span class="text-blue-500">string</span>;
        &#125;
        </code></pre></code></pre></div>
    
    </ul>
  </section>
</main>
