<script>
  import { compassDir } from '../routes/_slopeAspect.js'
  export let uom // usc, uss, si

  // export let loc
  export let twx
  let hours
  $: hours = (twx === null) ? null : twx.data.timelines[0].intervals

  function dist (v) { return (uom === 'si') ? 1.60934 * v : v } // mi or km
  function press (v) { return (uom === 'si') ? 33.863886666667 * v : v } // in Hg or hectoPascal
  function rain (v) { return (uom === 'si') ? 25.4 * v : v } // in or mm
  function temp (v) { return (uom === 'si') ? (5 * (v-32) / 9) : v } // oF or oC
  function wind (v) { return (uom === 'si') ? 1.60934 * v : v } // mi/h or km/h

  const SowText = new Map([
    ['0', 'Unknown'],
    ['1000', 'Clear'],
    ['1001',  'Cloudy'],
    ['1100', 'Mostly Clear'],
    ['1101', 'Partly Cloudy'],
    ['1102', 'Mostly Cloudy'],
    ['2000', 'Fog'],
    ['2100', 'Light Fog'],
    ['3000', 'Light Wind'],
    ['3001', 'Wind'],
    ['3002', 'Strong Wind'],
    ['4000', 'Drizzle'],
    ['4001', 'Rain'],
    ['4200', 'Light Rain'],
    ['4201', 'Heavy Rain'],
    ['5000', 'Snow'],
    ['5001', 'Flurries'],
    ['5100', 'Light Snow'],
    ['5101', 'Heavy Snow'],
    ['6000', 'Freezing Drizzle'],
    ['6001', 'Freezing Rain'],
    ['6200', 'Light Freezing Rain'],
    ['6201', 'Heavy Freezing Rain'],
    ['7000', 'Ice Pellets'],
    ['7101', 'Heavy Ice Pellets'],
    ['7102', 'Light Ice Pellets'],
    ['8000', 'Thunderstorm']
  ])
</script>

{#if twx !== null}
  {#if twx.status !== 200}
    <h1>{twx.status} {twx.statusText}</h1>
  {/if}

<div class="card">
  <div class="card-body">
    <h3 class="card-title">Tomorrow.io Hourly Forecast for {(hours[0].startTime).substr(0, 10)}</h3>

    <div class="table-responsive">
      <table class="table table-sm table-striped table-bordered border-primary">
        <thead class='table-light border-primary'>
          <tr>
            <th scope='row'>Date</th>
            <th scope='row'>Time</th>
            <th scope="col">Temp</th>
            <th scope="col">Rel Hum</th>
            <th>Dew Pt</th>
            <th scope="col">Feels Like</th>
            <th colspan='2' scope="col">State of Weather</th>
            <th colspan='4' scope="col">Wind</th>
            <th colspan='2' scope="col">Precip</th>
            <th scope="col">Cloud</th>
            <th scope="col">Visib</th>
            <th scope="col">Press</th>
            <th scope="col">UV</th>
            <th scope="col">Mon</th>
            <th scope="col">Hr</th>
            <th scope="col">Temp</th>
            <th scope="col">RH</th>
            <th scope="col">Wind</th>
            <th scope="col">Gust</th>
            <th scope="col">From</th>
            <th scope="col">Shading</th>
          </tr>
          <tr>
            <th></th><th></th>
            <th scope="col">{uom==='si' ? 'oC' : 'oF'}</th>
            <th scope="col">%</th>
            <th scope="col">{uom==='si' ? 'oC' : 'oF'}</th>
            <th scope="col">{uom==='si' ? 'oC' : 'oF'}</th>
            <th scope="col">Code</th>
            <th scope="col">Text</th>
            <th scope="col">{uom==='si' ? 'km/h' : 'mi/h'}</th>
            <th scope="col">Gust</th>
            <th scope="col">From</th>
            <th scope="col">Dir</th>
            <th scope="col">Prob</th>
            <th scope="col">{uom==='si' ? 'mm/h' : 'in/h'}</th>
            <th scope="col">Cover</th>
            <th scope="col">{uom==='si' ? 'km' : 'mi'}</th>
            <th scope="col">{uom==='si' ? 'hPa' : 'in Hg'}</th>
            <th scope="col">Idx</th>
            <th></th>
            <th></th>
            <th>oF</th>
            <th>ratio</th>
            <th>ft/min</th>
            <th>ft/min</th>
            <th>deg</th>
            <th>ratio</th>
          </tr>
        </thead>
        <tbody>
          {#each hours as h}
            <tr>
              <td>{h.startTime.substr(0, 10)}</td>
              <td>{h.startTime.substr(11, 5)}</td>
              <td>{Math.round(temp(h.values.temperature))}</td>
              <td>{Math.round(h.values.humidity)}</td>
              <td>{Math.round(temp(h.values.dewPoint))}</td>
              <td>{Math.round(temp(h.values.temperatureApparent))}</td>
              <td>{h.values.weatherCode}</td>
              <td>{SowText.get(h.values.weatherCode.toString())}</td>
              <td>{Math.round(wind(h.values.windSpeed))}</td>
              <td>{Math.round(wind(h.values.windGust))}</td>
              <td>{Math.round(h.values.windDirection)}</td>
              <td>{compassDir(h.values.windDirection)}</td>
              <td>{h.values.precipitationProbability}</td>
              <td>{rain(h.values.precipitationIntensity).toFixed(2)}</td>
              <td>{Math.round(h.values.cloudCover)}</td>
              <td>{Math.round(dist(h.values.visibility))}</td>
              <td>{press(h.values.pressureSurfaceLevel).toFixed(2)}</td>
              <td>UV</td>
                <td>{h.values.fire.input.month}</td>
                <td>{h.values.fire.input.hour}</td>
                <td>{Math.round(h.values.fire.input.dryBulb)}</td>
                <td>{(h.values.fire.input.humidity).toFixed(2)}</td>
                <td>{Math.round(h.values.fire.input.windAt10m)}</td>
                <td>{Math.round(h.values.fire.input.windGust)}</td>
                <td>{Math.round(h.values.fire.input.windFrom)}</td>
                <td>{(h.values.fire.input.shading).toFixed(2)}</td>

              <!-- <td>{h.values.precipitationType}</td>
              <td>{h.values.pressureSeaLevel}</td>
              <td>{h.values.cloudBase}</td>
              <td>{h.values.cloudCeiling}</td>
              <td>{h.values.fireIndex}</td>
              <td>{h.values.soilMoistureVolumetric0To10}</td>
              <td>{h.values.soilTemperature0To10}</td>
              <td>{h.values.solarGHI}</td>
              <td>{h.values.solarDNI}</td>
              <td>{h.values.solarDHI}</td>
              <td>{h.values.snowAccumulation}</td>
              <td>{h.values.iceAccumulation}</td> -->
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </div>
</div>
{/if}

<style>
td {
  text-align: center;
}
th {
  text-align: center;
}
</style>
