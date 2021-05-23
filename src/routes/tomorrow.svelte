<script>
  import { loc, twx } from './_stores.js'
  import Forecast from '../components/TomorrowHourlyTable.svelte'
</script>

<svelte:head><title>Tomorrow.io Forecast</title></svelte:head>

{#if $loc === null || $twx === null}
  <p>You must first <a href='1location'>select and use a location</a></p>
{:else}
  <h1>Tomorrow.io Weather Forecast</h1>
  <Forecast loc={$loc} twx={$twx}/>
{/if}
