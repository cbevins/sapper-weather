<script context="module">
  // console.log('client: BEGIN blog/index.svelte context="module"')
	export function preload() {
    console.log('client: blog/index.svelte preload()')
		return this.fetch(`blog.json`).then(r => r.json()).then(posts => {
			return { posts };
		});
	}
  // console.log('client: END blog/index.svelte context="module"')
</script>

<script>
  // console.log('client: BEGIN blog/index.svelte')
	export let posts;
  // console.log('client: END blog/index.svelte')
</script>

<style>
	ul {
		margin: 0 0 1em 0;
		line-height: 1.5;
	}
</style>

<svelte:head>
	<title>Blog</title>
</svelte:head>

<h1>Recent posts</h1>

<ul>
	{#each posts as post}
		<!-- we're using the non-standard `rel=prefetch` attribute to
				tell Sapper to load the data for the page as soon as
				the user hovers over the link or taps it, instead of
				waiting for the 'click' event -->
		<li><a rel="prefetch" href="blog/{post.slug}">{post.title}</a></li>
	{/each}
</ul>
