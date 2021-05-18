<script context='module'>
  console.log('client: BEGIN forecast/index.svelte <script context="module">')
	export async function preload({ params, session }) {
    console.log(`client: BEGIN forecast/index.svelte preload()`)
		// const res = await this.fetch(`blog/${params.slug}.json`);
		// const data = await res.json();

		// if (res.status === 200) {
    //   console.log(`END: forecast/index.svelte preload(), which returns: ${data} `)
		// 	return { post: data };
		// } else {
		// 	this.error(res.status, data.message);
		// }
  }
  console.log('client: END forecast/index.svelte <script context="module">')
</script>

<script>
  console.log('client: forecast/index.svelte <script>')
  export let weather

  import { onMount } from 'svelte'
  import FireBehaviorForecaster from './_FireBehaviorForecaster.mjs'
  import { getForecastTable } from './_forecastTable.mjs'

  async function showForecast (forecaster, parms) {
    console.log(`client: BEGIN forecast/index.svelte <script> showForecast()`)
    // const forecast = await forecaster.getForecast(parms)
    // const table = getForecastTable(forecast)
    // console.log(`client: END forecast/index.svelte <script> showForecast(), which returns: ${table}`)
    //console.log(table)
    return table
  }

  onMount(() => {
    console.log(`client: BEGIN forecast/index.svelte <script> onMount()`)
    // safe for browser-only code, such as fecth or windows.<property>
    const loc = { name: 'The "M"', lat: 46.859340, lon: -113.975528 }
    // const Home = { name: 'Home', lat: 46.85714, lon: -114.00730 }
    const parms = {
      name: loc.name,
      lat: loc.lat,
      lon: loc.lon,
      timezone: 'America/Denver',
      fuel: 'gs1', // fuel model key
      waf: 0.4, // wind speed adjustment factor from 20-ft to midflame height
      cured: 0, // herb cured fraction (%)
      live: 200, // live herb and stem fuel moisture (%)
      elevdiff: 0
    }
    // const forecaster = new FireBehaviorForecaster()
    // const weather = showForecast(forecaster, parms)
    console.log('client: BEGIN forecast/index.svelte .. Getting elevation and weather data ...')
    console.log(`client: END forecast/index.svelte <script> onMount()`)
    return 'some weather' // weather
  })
  console.log(`client: END forecast/index.svelte <script> onMount()`)
</script>

<svelte:head>
	<title>Fire Forecast</title>
</svelte:head>

<h1>Fire Forecast</h1>

<p>Here is your Fire Forecast for</p>
<p>{weather}</p>