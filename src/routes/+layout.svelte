<script>
	import "../app.css";
	import "@fontsource/fira-mono"
	import "@fontsource/spectral"

</script>


	<main>
		<slot />
	</main>

	<style>
		/* set mono font to fira */
		:global(:root) {
			--font-mono: 'Fira Mono', monospace;
			--font-serif: 'Spectral', serif;
		}
	</style>