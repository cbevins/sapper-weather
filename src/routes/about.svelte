<script>
  console.log('about.svelte')
</script>

<svelte:head>
	<title>About</title>
</svelte:head>

<h1>About Fire Forecast</h1>

<p>Fire Forecast is produced and sponsored by Systems for Environmental Management.</p>
<figure>
	<img alt="SEM" src="./SemBirdBg.jpg">
</figure>

<style>
	h1, figure, p {
		text-align: center;
		margin: 0 auto;
	}

	h1 {
		font-size: 2.0em;
		text-transform: uppercase;
		font-weight: 500;
		margin: 0 0 0.5em 0;
	}

	figure {
		margin: 0 0 1em 0;
	}

	img {
		width: 100%;
		max-width: 400px;
		margin: 0 0 1em 0;
	}

	p {
		margin: 1em auto;
	}

	@media (min-width: 480px) {
		h1 {
			font-size: 4em;
		}
	}
</style>
