<script>
  import { loc, uom, wwx } from './_stores.js'
  import WeatherApiForecastTable from '../components/WeatherApiForecastTable.svelte'
</script>

<svelte:head><title>WeatherApi.com Forecast</title></svelte:head>

{#if $loc === null || $wwx === null}
  <p>You must first <a href='1location'>select and use a location</a></p>
{:else}
<h1>
  <img src='//cdn.weatherapi.com/v4/images/weatherapi_logo.png' alt="WeatherAPI.com" border="0">
  Forecast
</h1>
<WeatherApiForecastTable location={$loc} uom={$uom} wx={$wwx}/>
{/if}
