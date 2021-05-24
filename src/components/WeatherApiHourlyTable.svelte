<script>
  import { relativeTimeRounding } from 'moment'
import Astro from './WeatherApiAstroTable.svelte'
  export let astro
  export let date
  export let hours
  export let uom
  export let updated

  function dist (v) { return (uom === 'si') ? 1.60934 * v : v } // mi or km
  function press (v) { return (uom === 'si') ? 33.863886666667 * v : v } // in Hg or hectoPascal
  function rain (v) { return (uom === 'si') ? 25.4 * v : v } // in or mm
  function temp (v) { return (uom === 'si') ? (5 * (v-32) / 9) : v } // oF or oC
  function wind (v) { return (uom === 'si') ? 1.60934 * v : v } // mi/h or km/h
</script>

<div class="card">
  <div class="card-body">
    <h3 class="card-title">WeatherApi.com Hourly Forecast for {date}</h3>
    <Astro astro={astro} />

    <div class="table-responsive">
      <table class="table table-sm table-striped table-bordered border-primary">
        <thead class='table-light border-primary'>
          <tr>
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
            <th></th>
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
          {#each hours as hour}
            {#if hour.time > updated}
              <tr>
                <td>{hour.time.substr(10)}</td>
                <td>{Math.round(temp(hour.temp_f))}</td>
                <td>{hour.humidity}</td>
                <td>{Math.round(temp(hour.dewpoint_f))}</td>
                <td>{Math.round(temp(hour.feelslike_f))}</td>
                <td><img alt='{hour.condition.text}' src='{hour.condition.icon}' style="width:40px;height:40px;"></td>
                <td>{hour.condition.text}</td>
                <td>{Math.round(wind(hour.wind_mph))}</td>
                <td>{Math.round(wind(hour.gust_mph))}</td>
                <td>{Math.round(hour.wind_degree)}</td>
                <td>{hour.wind_dir}</td>
                <td>{hour.chance_of_rain}</td>
                <td>{rain(hour.precip_in).toFixed(2)}</td>
                <td>{Math.round(hour.cloud)}</td>
                <td>{Math.round(dist(hour.vis_miles))}</td>
                <td>{press(hour.pressure_in).toFixed(2)}</td>
                <td>{hour.uv}</td>
                <td>{hour.fire.input.month}</td>
                <td>{hour.fire.input.hour}</td>
                <td>{Math.round(hour.fire.input.dryBulb)}</td>
                <td>{(hour.fire.input.humidity).toFixed(2)}</td>
                <td>{Math.round(hour.fire.input.windAt10m)}</td>
                <td>{Math.round(hour.fire.input.windGust)}</td>
                <td>{Math.round(hour.fire.input.windFrom)}</td>
                <td>{(hour.fire.input.shading).toFixed(2)}</td>
              </tr>
            {/if}
          {/each}
        </tbody>
      </table>
    </div>
  </div>
</div>

<style>
td {
  text-align: center;
}
th {
  text-align: center;
}
</style>
