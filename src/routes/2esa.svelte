<script>
  import { loc, mel, uel } from './_stores.js'
  import EsaGrid from '../components/ElevSlopeAspectGrid.svelte'
</script>

{#if $loc === null || $mel === null}
  <p>You must first <a href='1location'>select and use a location</a></p>
{:else}
  <h4>{$loc.name}, {$loc.region}, {$loc.country} [{$loc.lat}, {$loc.lon}]</h4>

  <EsaGrid esa={$mel} source='MapQuest.com'/>
  <EsaGrid esa={$uel} source='USGS EPQS'/>
{/if}