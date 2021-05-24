<script>
  import { loc, twx, uom } from './_stores.js'
  import Forecast from '../components/TomorrowHourlyTable.svelte'
</script>

<svelte:head><title>Tomorrow.io Forecast</title></svelte:head>

{#if $loc === null || $twx === null}
  <p>You must first <a href='1location'>select and use a location</a></p>
{:else}
  <Forecast twx={$twx} uom={$uom}/>
{/if}
