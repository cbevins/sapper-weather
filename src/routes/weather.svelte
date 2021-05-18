<script>
  import Astro from '../components/WeatherApiAstroTable.svelte'
  import Current from '../components/WeatherApiCurrentTable.svelte'
  import Hourly from '../components/WeatherApiHourlyTable.svelte'

  export let wx = null

  // This will be provided by input form
  let lat = 46.859340
  let lon = -113.975528
  let timezone = 'America/Denver'

  // Fixed
  let days = 1
  let hours = 4
  let error = null
  let buttonText = 'Update Weather'

  const getWeather = async () => {
    console.log('client: BEGIN weather.svelte: getWeather()')
    buttonText = 'Getting weather data from weatherapi.com ...'
    try {
      const response = await fetch("weatherapi", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ lat, lon, days, timezone, hours }),
      });
      wx = await response.json()
      buttonText = 'Update Weather'
    } catch (error) {
      console.log('client: ERROR weather.svelte: ', error)
    }
  }
</script>

<svelte:head>
	<title>Weather</title>
</svelte:head>

<h1>Get Weather</h1>
<!-- <input bind:value={parms}> -->
<button on:click={getWeather}>{buttonText}</button>

{#if wx !== null}
  <Current location={wx.location} current={wx.current} />
  {#each wx.forecast.forecastday as day}
    <Astro date={day.date} astro={day.astro} />
    <Hourly date={day.date} hours={day.hour} updated={wx.current.last_updated}/>
  {/each}
{/if}

{#if error !== null}
  <p>{error}</p>
{/if}
