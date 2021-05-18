<script>
  console.log('client: BEGIN get.svelte <script>')
  function getSomething() {
  console.log('client: BEGIN get.svelte <script> getSomething()')
    fetch('getapi')
  console.log('client: END get.svelte <script> getSomething()')
  }
  console.log('client: END get.svelte <script>')
</script>

<svelte:head>
	<title>Get</title>
</svelte:head>

<h1>Get something here</h1>

<button on:click={getSomething}>Get!</button>