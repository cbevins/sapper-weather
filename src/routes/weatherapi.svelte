<script>
  import { loc, wwx } from './_stores.js'
  import { get } from './_weatherApi.js'
  import Astro from '../components/WeatherApiAstroTable.svelte'
  import Current from '../components/WeatherApiCurrentTable.svelte'
  import Hourly from '../components/WeatherApiHourlyTable.svelte'

  // These are fixed
  let prev // used to break forecast array into daily chunks
  let days = 3
  let buttonText = 'Get Forecast'

  const getWeather = async () => {
    buttonText = 'Getting forecast from weatherapi.com ...'
    $wwx = await get($loc.lat, $loc.lon, days)
    buttonText = 'Update Forecast'
  }
</script>

<svelte:head>
	<title>Weather</title>
</svelte:head>

<h1>
  <img src='//cdn.weatherapi.com/v4/images/weatherapi_logo.png' alt="Weather data by WeatherAPI.com" border="0">
  Weather Forecast
</h1>
<input bind:value={$loc.lat}>
<input bind:value={$loc.lon}>
<button on:click={getWeather}>
  {buttonText}
</button>

{#if $wwx !== null}
  <Current location={$wwx.location} current={$wwx.current} />
  {#each $wwx.forecast.forecastday as day}
    {#if day.date !== prev}
      <h1>{day.date}</h1>
    {:else}
      {prev = day.date}
    {/if}
    <Astro date={day.date} astro={day.astro} />
    <Hourly date={day.date} hours={day.hour} updated={$wwx.current.last_updated}/>
  {/each}
{/if}
