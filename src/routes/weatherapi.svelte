<script>
  import { loc, wwx } from './_stores.js'
  import { get } from './_weatherApi.js'
  import LatLonForm from '../components/LatLonForm.svelte'
  import Forecast from '../components/WeatherApiForecastTable.svelte'

  let days = 3
  let loading = false
  const getWeather = async () => {
    loading = true
    $wwx = await get($loc.lat, $loc.lon, days)
    loading = false
  }
</script>

<svelte:head>
	<title>Weather</title>
</svelte:head>

<h1>
  <img src='//cdn.weatherapi.com/v4/images/weatherapi_logo.png' alt="WeatherAPI.com" border="0">
  Weather Forecast
</h1>

<LatLonForm callback={getWeather} />

{#if loading}
  <h3>Fetching forecast data from WeatherApi.com ...</h3>
{/if}

<Forecast wx={$wwx}/>
