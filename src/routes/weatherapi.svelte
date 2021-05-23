<script>
  import { gel, loc, mel, uel, wwx } from './_stores.js'
  import { gmapEsa } from './_gmapElev.js'
  import { mapquestEsa } from './_mapquest.js'
  import { usgsEsa } from './_usgsEpqs.js'
  import { forecast } from './_weatherApi.js'

  import LatLonForm from '../components/LatLonForm.svelte'
  import LoadingSpinner from '../components/LoadingSpinner.svelte'
  import Forecast from '../components/WeatherApiForecastTable.svelte'

  let days = 3
  let sampleRes = 1 / (60 * 60 * 3) // 1/3 arc-second in decimal degrees
  let cellWidth = 2 // Double sample distance to ensure adjacent cells have different sample

  let loadingGmapElev = false
  let loadingMapquestElev = false
  let loadingUsgsEpqs = false
  let loadingWeatherApi = false

  const getGmapElev = async () => {
    loadingGmapElev = true
    $gel = await gmapEsa($loc.lat, $loc.lon, sampleRes, cellWidth)
    loadingGmapElev = false
  }

  const getMapquestElev = async () => {
    loadingMapquestElev = true
    $mel = await mapquestEsa($loc.lat, $loc.lon, sampleRes, cellWidth)
    loadingMapquestElev = false
  }

  const getUsgsEpqs = async () => {
    loadingUsgsEpqs = true
    $uel = await usgsEsa($loc.lat, $loc.lon, sampleRes, cellWidth)
    loadingUsgsEpqs = false
  }

  const getWeatherApi = async () => {
    loadingWeatherApi = true
    $wwx = await forecast($loc.lat, $loc.lon, days)
    loadingWeatherApi = false
  }

  const getWeather = () => {
    getWeatherApi()
    getMapquestElev()
    getUsgsEpqs()
    getGmapElev()
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

{#if loadingWeatherApi}
  <LoadingSpinner msg='Fetching forecast data from WeatherApi.com ...' />'
{/if}

{#if loadingGmapElev }
  <LoadingSpinner msg='Fetching elevation from Google Map Elevation Services ...' />'
{/if}

{#if loadingMapquestElev}
  <LoadingSpinner msg='Fetching elevation from MapQuest.com ...' />'
{/if}

{#if loadingUsgsEpqs}
  <LoadingSpinner msg='Fetching elevation from USGS.gov ...' />'
{/if}

<Forecast esa={$mel} wx={$wwx}/>
