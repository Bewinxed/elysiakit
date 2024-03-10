<script lang="ts">
	import { edenFetch } from '@elysiajs/eden';
	import Icon from '@iconify/svelte'
	const eden = edenFetch<Routes>('http://127.0.0.1:5173', {
		fetcher: fetch
	})
	let result: Routes['schema']['/api/users/:id']
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Sveltekit + ElysiaJS + Tailwind + MeltUI Scaffold" />
</svelte:head>

<section class="container place-items-center place-content-center m-auto flex flex-col gap-2">
	<div class="flex gap-2 place-items-center">
		<figure class="w-48 aspect-square">
			<img src="https://elysiajs.com/assets/elysia.svg" alt="">
		</figure>
		<Icon icon="carbon:add"/>
		<figure class="w-48 aspect-square p-4">
			<img src="https://upload.wikimedia.org/wikipedia/commons/1/1b/Svelte_Logo.svg" alt="Sveltekit Logo">
		</figure>
	</div>
	<h1 class="text-xl font-bold text-center">
		
		<!-- link to sveltekit and elysiajs -->
		<strong>TRUE</strong> End-To-End type safety with <a href="https://svelte.dev" target="_blank" class="text-red-500" rel="noopener noreferrer">SvelteKit</a> and <a href="https://elysiajs.com" target="_blank" rel="noopener noreferrer" class="text-gray-500">ElysiaJS</a>
		<!-- to your new<br />SvelteKit app -->
	</h1>
	<!-- <Counter /> -->
	<button class="btn btn-primary" on:click={() => eden('/api/groups/:id', {
		method: 'PATCH',
		params: {
			id: 1
		},
		body: {
			name: 'new name'
		}
	})}>Fetch</button>

</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 0.6;
	}

	h1 {
		width: 100%;
	}

	.welcome {
		display: block;
		position: relative;
		width: 100%;
		height: 0;
		padding: 0 0 calc(100% * 495 / 2048) 0;
	}

	.welcome img {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		display: block;
	}
</style>
