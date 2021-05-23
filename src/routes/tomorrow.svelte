<script>
  import { gel, loc, mel, uel, twx } from './_stores.js'
  import { get } from './_tomorrow.js'
  import LatLonForm from '../components/LatLonForm.svelte'
  import LoadingSpinner from '../components/LoadingSpinner.svelte'
  import Forecast from '../components/TomorrowHourlyTable.svelte'

  let hours = 72
  let sampleRes = 1 / (60 * 60 * 3) // 1/3 arc-second in decimal degrees
  let cellWidth = 2 // Double sample distance to ensure adjacent cells have different sample

  let loadingGmapElev = false
  let loadingMapquestElev = false
  let loadingUsgsEpqs = false
  let loadingTomorrow = false

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

  const getTomorrow = async () => {
    loadingTomorrow = true
    $twx = await get($loc.lat, $loc.lon, $loc.tz, hours)
    loadingTomorrow = false
  }

  const getWeather = () => {
    getTomorrow()
    getMapquestElev()
    getUsgsEpqs()
    getGmapElev()
  }
</script>

<svelte:head>
	<title>Weather</title>
</svelte:head>

<h1>Weather Forecast</h1>
<LatLonForm callback={getWeather} />

{#if loadingTomorrow }
  <LoadingSpinner msg='Fetching forecast data from Tomorrow.io ...' />'
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

<Forecast twx={$twx}/>
