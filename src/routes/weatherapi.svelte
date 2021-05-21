<script>
  import { loc, mel, uel, wwx } from './_stores.js'
  import { mapquestEsa } from './_mapquest.js'
  import { usgsEsa } from './_usgsEpqs.js'
  import { get } from './_weatherApi.js'

  import EsaComparisonTable from '../components/EsaComparisonTable.svelte'
  import LatLonForm from '../components/LatLonForm.svelte'
  import LoadingSpinner from '../components/LoadingSpinner.svelte'
  import Forecast from '../components/WeatherApiForecastTable.svelte'

  let days = 3
  let sampleRes = 1 / (60 * 60 * 3) // 1/3 arc-second in decimal degrees
  let cellWidth = 2 // Double sample distance to ensure adjacent cells have different sample
  let loading = false

  const getWeather = async () => {
    loading = true
    $wwx = await get($loc.lat, $loc.lon, days)
    $mel = await mapquestEsa($loc.lat, $loc.lon, sampleRes, cellWidth)
    $uel = await usgsEsa($loc.lat, $loc.lon, sampleRes, cellWidth)
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
  <LoadingSpinner msg='Fetching location, site, and forecast data from WeatherApi.com ...' />'
{/if}
<Forecast esa={$mel} wx={$wwx}/>
