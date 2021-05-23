<script>
  import { loc, mel, twx, uel, wwx } from './_stores.js'
  import { mapquestEsa } from './_mapquest.js'
  import { forecast, timezone } from './_weatherApi.js'
  import { timelines } from './_tomorrow.js'
  import { usgsEsa } from './_usgsEpqs.js'
  import LoadingSpinner from '../components/LoadingSpinner.svelte'

  let param = '46.859340,-113.975528' // The 'M'

  let sampleRes = 1 / (60 * 60 * 3) // 1/3 arc-second in decimal degrees
  let cellWidth = 3 // Double sample distance to ensure adjacent cells have different sample

  let search = $loc
  let loadingLocation = false
  let loadingMapquestElev = false
  let loadingTomorrow = false
  let loadingUsgsEpqs = false
  let loadingWeatherApi = false
  let useButtonText = 'Use this Location'
  let useButtonColor = 'btn-outline-primary'

  function applyLocation () {
    $loc = search
    useButtonText = 'Current Location'
    useButtonColor = 'btn-outline-success'
    getMapquestElev()
    getUsgsEpqs()
    getTomorrow()
    getWeatherApi()
  }

  const getLocation = async () => {
    loadingLocation = true
    search = await timezone(param)
    useButtonText = 'Use this Location'
    useButtonColor = 'btn-outline-primary'
    loadingLocation = false
  }

  const getMapquestElev = async () => {
    loadingMapquestElev = true
    $mel = await mapquestEsa($loc.lat, $loc.lon, sampleRes, cellWidth)
    loadingMapquestElev = false
  }

  const getTomorrow = async () => {
    const hours = 72
    loadingTomorrow = true
    $twx = await timelines($loc.lat, $loc.lon, $loc.tz_id, hours)
    loadingTomorrow = false
  }

  const getUsgsEpqs = async () => {
    loadingUsgsEpqs = true
    $uel = await usgsEsa($loc.lat, $loc.lon, sampleRes, cellWidth)
    loadingUsgsEpqs = false
  }

  const getWeatherApi = async () => {
    const days = 3
    loadingWeatherApi = true
    $wwx = await forecast($loc.lat, $loc.lon, days)
    loadingWeatherApi = false
  }
</script>

<svelte:head>
	<title>Location</title>
</svelte:head>

<h1>1: Select a Location</h1>
<div class="row mb-3">
  <div class="col">Search for:</div>
  <div class="col">
    <input  bind:value={param} type="text" class="form-control" aria-label="Search item">
  </div>
  <div class="col">
    <button  on:click={getLocation}
      class="btn btn-outline-primary" type="button" id="button">
        Search
      </button>
    </div>
  <div class="col">
    <button class="btn btn-outline-secondary" type="button" data-bs-toggle="collapse" data-bs-target="#searchExamples" aria-expanded="false" aria-controls="collapseExamples">
      Examples
    </button>
  </div>
</div>

<div class="collapse" id="searchExamples">
  <div class="card card-body">
    <ul>
      <li>lat,lon decimal degrees e.g: <code>46.859340,-113.975528</code></li>
      <li>city name e.g.: <code>Missoula</code></li>
      <li>US zip e.g.: <code>59801</code></li>
      <li>UK postcode e.g: <code>SW1</code></li>
      <li>Canada postal code e.g: <code>G2J</code></li>
      <li>metar:&lt;metar code&gt; e.g: <code>metar:EGLL</code></li>
      <li>iata:&lt;digit airport code&gt; e.g: <code>iata:MSO</code></li>
      <li>auto:ip IP lookup e.g: <code>auto:ip</code></li>
      <li>IP address (IPv4 and IPv6 supported) e.g: <code>100.0.0.1</code></li>
    </ul>
  </div>
</div>

{#if loadingLocation}
  <LoadingSpinner msg='Fetching location data from WeatherApi.com ...' />'
{/if}

{#if loadingMapquestElev}
  <LoadingSpinner msg='Fetching elevation data from MapQuest.com ...' />'
{/if}

{#if loadingTomorrow}
  <LoadingSpinner msg='Fetching weather data from Toimorrow.io ...' />'
{/if}

{#if loadingUsgsEpqs}
  <LoadingSpinner msg='Fetching elevation data from USGS.gov ...' />'
{/if}

{#if loadingWeatherApi}
  <LoadingSpinner msg='Fetching weather data from WeatherAPI.com ...' />'
{/if}

{#if search !== null}
  <div class="card">
    <div class="card-body">
      <div class="row mb-3">
        <div class='col card-title'><strong>Search Results</strong></div>
        <div class="col">
          <button on:click={applyLocation} class="btn {useButtonColor}">
            {useButtonText}
          </button>
        </div>
      </div>

      <div class="table-responsive">
        <table class="table table-sm table-striped table-bordered border-primary">
          <tbody>
            <tr><td>Search</td><td>{search.query}</td></tr>
            <tr><td>Results</td><td>{search.error.message}</td></tr>
            <tr><td>Name</td><td>{search.name}</td></tr>
            <tr><td>Region</td><td>{search.region}</td></tr>
            <tr><td>Country</td><td>{search.country}</td></tr>
            <tr><td>Latitude</td><td>{search.lat}</td></tr>
            <tr><td>Longitude</td><td>{search.lon}</td></tr>
            <tr><td>Time Zone</td><td>{search.tz_id}</td></tr>
            <tr><td>Local Time</td><td>{search.localtime}</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
{/if}
