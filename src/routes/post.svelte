<script>
  console.log('client: BEGIN post.svelte <script>')
  let data = 'yum'
  function postSomething() {
    console.log('client: BEGIN post.svelte postSomething()')
    fetch('postapi', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({data})
    })
    console.log('client: END post.svelte postSomething()')
  }
  console.log('client: END post.svelte <script>')
</script>

<svelte:head>
	<title>Post</title>
</svelte:head>

<h1>Post something here</h1>
<input bind:value={data}>
<button on:click={postSomething}>Post!</button>