<script>
  import { loc, twx } from './_stores.js'
  import { get } from './_tomorrow.js'
  import Hourly from '../components/TomorrowHourlyTable.svelte'

  let hours = 72
  let buttonText = 'Update Weather'
  const getWeather = async () => {
    buttonText = 'Getting weather data from tomorrow.io ...'
    $twx = await get($loc.lat, $loc.lon, $loc.tz, hours)
    buttonText = 'Update Weather'
  }
</script>

<svelte:head>
	<title>Weather</title>
</svelte:head>

<h1>Weather Forecast</h1>
<input bind:value={$loc.lat}>
<input bind:value={$loc.lon}>
<button on:click={getWeather}>
  {buttonText}
</button>

{#if $twx !== null}
  {#if $twx.status !== 200}
    <h1>{$twx.status} {$twx.statusText}</h1>
  {/if}
  <Hourly hours={$twx.data.timelines[0].intervals}/>
{/if}
