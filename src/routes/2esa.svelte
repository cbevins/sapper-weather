<script>
  import { esa, esaSource, gel, loc, mel, uel } from './_stores.js'
  import EsaGrid from '../components/ElevSlopeAspectGrid.svelte'

  $: $esa = ($esaSource === 'MapQuest') ? $mel : $uel

  function showEsa (obj) {
    const e = `elevation ${Math.round(obj.elev)} ft, `
    const s = `slope ${Math.round(100 * obj.slopeRatio)}% (${Math.round(obj.slopeDeg)}\u00B0), and `
    const a = `aspect ${Math.round(obj.aspect)}\u00B0 (${obj.aspectDir})`
    return e+s+a
  }
</script>

<svelte:head><title>Step 2: Elevation, Slope, Aspect</title></svelte:head>

<h1>Step 2: Select Elevation, Slope, Aspect Source</h1>

{#if $loc === null || $mel === null}
  <p>You must first <a href='1location'>select a location to use</a></p>
{:else}
  <div class="form-check form-check-inline">
    <input bind:group={$esaSource}
      class="form-check-input" type="radio" name="MapQuest" id="MapQuest" value='MapQuest' checked>
    <label class="form-check-label" for="MapQuest">
      MapQuest reports {showEsa($mel)}
    </label>
  </div>
  <div class="form-check form-check-inline">
    <input bind:group={$esaSource}
      class="form-check-input" type="radio" name="USGS" id="USGS" value='USGS'>
    <label class="form-check-label" for="USGS">
      USGS reports {showEsa($uel)}
    </label>
  </div>
  <hr>
  <h4>{$loc.name}, {$loc.region}, {$loc.country} [{$loc.lat}, {$loc.lon}]</h4>
  <h5>(Currently using {showEsa($esa)})</h5>
  <hr>
  <EsaGrid esa={$mel} source='MapQuest.com'/>
  <EsaGrid esa={$uel} source='USGS EPQS'/>
{/if}