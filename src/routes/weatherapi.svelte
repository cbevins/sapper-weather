<script>
  import { location } from './_stores.js'
  import { get } from './_weatherApi.js'
  import Astro from '../components/WeatherApiAstroTable.svelte'
  import Current from '../components/WeatherApiCurrentTable.svelte'
  import Hourly from '../components/WeatherApiHourlyTable.svelte'

  export let wx = null

  // These are fixed
  let prev
  let days = 3
  let buttonText = 'Update Weather'

  const getWeather = async () => {
    buttonText = 'Getting weather data from weatherapi.com ...'
    wx = await get($location.lat, $location.lon, days)
    buttonText = 'Update Weather'
  }
</script>

<svelte:head>
	<title>Weather</title>
</svelte:head>

<h1>
  Get Weather Forecast
</h1>
<!-- <input bind:value={parms}> -->
<button on:click={getWeather}>
  <img src='//cdn.weatherapi.com/v4/images/weatherapi_logo.png' alt="Weather data by WeatherAPI.com" border="0">
  {buttonText}
</button>

{#if wx !== null}
  <Current location={wx.location} current={wx.current} />
  {#each wx.forecast.forecastday as day}
    {#if day.date !== prev}
      <h1>{day.date}</h1>
    {:else}
      {prev = day.date}
    {/if}
    <Astro date={day.date} astro={day.astro} />
    <Hourly date={day.date} hours={day.hour} updated={wx.current.last_updated}/>
  {/each}
{/if}
