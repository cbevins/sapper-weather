<script>
  import { loc, twx } from './_stores.js'
  import { get } from './_tomorrow.js'
  import LatLonForm from '../components/LatLonForm.svelte'
  import Hourly from '../components/TomorrowHourlyTable.svelte'

  let hours = 72
  let loading = false
  const getWeather = async () => {
    loading = true
    $twx = await get($loc.lat, $loc.lon, $loc.tz, hours)
    loading = false
  }
</script>

<svelte:head>
	<title>Weather</title>
</svelte:head>

<h1>Weather Forecast</h1>
<LatLonForm callback={getWeather} />

{#if loading}
  <h1>Fetching forecast from tomorrow.io ...</h1>
{/if}

{#if $twx !== null}
  {#if $twx.status !== 200}
    <h1>{$twx.status} {$twx.statusText}</h1>
  {/if}
  <Hourly hours={$twx.data.timelines[0].intervals}/>
{/if}
