<script>
  export let data = null
  let buttonText = 'Get Something'

  const getSomething = async () => {
    buttonText = 'Getting JSONPlaceHolder todos ...'
    try {
      const response = await fetch('getapi')
      data = await response.json()
      buttonText = 'Get Something Else'
    } catch (error) {
      console.log('client: ERROR get.svelte: ', error)
    }
  }
</script>

<svelte:head>
	<title>Get</title>
</svelte:head>

<h1>Get something here</h1>

<button on:click={getSomething}>{buttonText}</button>

{#if data !== null}
  <p>userId {data.userId}, id: {data.id}, title: {data.title}, completed: {data.completed}</p>
{/if}
