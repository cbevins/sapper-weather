<script>
  import { compassDir } from '../routes/_slopeAspect.js'
  // export let loc
  export let twx
  let hours
  $: hours = (twx === null) ? null : twx.data.timelines[0].intervals

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
            <th scope='row'>Time</th>
            <th scope="col">Temp</th><th scope="col">Rel Hum</th><th>Dew Pt</th><th scope="col">Feels</th>
            <th colspan='2' scope="col">State of Weather</th>
            <th colspan='4' scope="col">Wind</th>
            <th colspan='2' scope="col">Precip</th>
            <th scope="col">Cloud</th>
            <th scope="col">Visib</th>
            <th scope="col">UV</th>
            <th scope="col">Press</th>
          </tr>
          <tr>
            <th></th>
            <th scope="col">oF</th><th scope="col">%</th><th scope="col">oF</th><th scope="col">Like</th>
            <th scope="col">Code</th><th scope="col">Text</th>
            <th scope="col">mi/h</th><th scope="col">Gust</th><th scope="col">From</th><th scope="col">Dir</th>
            <th scope="col">Prob</th>
            <th scope="col">in</th>
            <th scope="col">Cover</th>
            <th scope="col">mi</th>
            <th scope="col">Idx</th>
            <th scope="col">in Hg</th>
          </tr>
        </thead>
        <tbody>
          {#each hours as h}
            <tr>
              <td>{h.startTime.substr(11, 5)}</td>
              <td>{Math.round(h.values.temperature)}</td>
              <td>{Math.round(h.values.humidity)}</td>
              <td>{Math.round(h.values.dewPoint)}</td>
              <td>{Math.round(h.values.temperatureApparent)}</td>
              <td>{h.values.weatherCode}</td>
              <td>{SowText.get(h.values.weatherCode.toString())}</td>
              <td>{Math.round(h.values.windSpeed)}</td>
              <td>{Math.round(h.values.windGust)}</td>
              <td>{Math.round(h.values.windDirection)}</td>
              <td>{compassDir(h.values.windDirection)}</td>
              <td>{h.values.precipitationProbability}</td>
              <td>{h.values.precipitationIntensity}</td>
              <td>{Math.round(h.values.cloudCover)}</td>
              <td>{Math.round(h.values.visibility)}</td>
              <td>UV</td>
              <td>{h.values.pressureSurfaceLevel}</td>

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
