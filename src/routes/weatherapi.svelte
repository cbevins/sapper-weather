<script>
  import Astro from '../components/WeatherApiAstroTable.svelte'
  import Current from '../components/WeatherApiCurrentTable.svelte'
  import Hourly from '../components/WeatherApiHourlyTable.svelte'

  export let wx = null

  // This will be provided by input form
  let lat = 46.859340
  let lon = -113.975528
  let timezone = 'America/Denver'

  // These are fixed
  let days = 1
  let hours = 4
  let error = null
  let buttonText = 'Update Weather'

  const getWeather = async () => {
    console.log('client: BEGIN weather.svelte: getWeather()')
    buttonText = 'Getting weather data from weatherapi.com ...'
    const url = 'http://api.weatherapi.com/v1/forecast.json'
    const key = '43956b1f6760417db1d182743212704'
    const query = `${url}?key=${key}&days=${days}&q=${lat},${lon}&aqi=no&alerts=no`
    try {
      let promise = await fetch(query, { method: 'GET' })
        .catch((error) => console.error('weatherapi forecast error: ' + error))
      wx = await promise.json()
      console.log(wx)
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
