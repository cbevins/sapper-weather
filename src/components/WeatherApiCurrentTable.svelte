<script>
  import { compassDir } from '../routes/_slopeAspect.js'
  export let current
  export let location
  export let esa
</script>

<div class="card">
  <div class="card-body">
    <h4 class='card-title'>
      {location.name}, {location.region}, {location.country} [{location.lat}, {location.lon}]
    </h4>

    {#if esa !== null}
    <h6>Elevation {Math.round(esa.elev)} ft,
      Slope {Math.round(100 * esa.slopeRatio)} &percnt; ({Math.round(esa.slopeDeg)} &deg;),
      Aspect {Math.round(esa.aspect)} ({compassDir(esa.aspect)})</h6>
    {/if}

    <h4 class="card-title">
      Current Conditions
      <img alt='{current.condition.text}' src='{current.condition.icon}'>
      at {current.last_updated}
    </h4>

    <div class="table-responsive">
      <table class="table table-sm table-striped table-bordered border-primary">
        <thead class='table-light border-primary'>
          <tr>
            <th scope="col">Temp</th><th scope="col">Rel Hum</th><th scope="col">Feels</th>
            <th colspan='2' scope="col">State of Weather</th>
            <th colspan='4' scope="col">Wind</th>
            <th scope="col">Precip</th>
            <th scope="col">Cloud</th>
            <th scope="col">Visib</th>
            <th scope="col">UV</th>
            <th scope="col">Press</th>
          </tr>
          <tr>
            <th scope="col">oF</th><th scope="col">%</th><th scope="col">Like</th>
            <th scope="col">Code</th><th scope="col">Text</th>
            <th scope="col">mi/h</th><th scope="col">Gust</th><th scope="col">From</th><th scope="col">Dir</th>
            <th scope="col">in</th>
            <th scope="col">Cover</th>
            <th scope="col">mi</th>
            <th scope="col">Idx</th>
            <th scope="col">in Hg</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{current.temp_f}</td>
            <td>{current.humidity}</td>
            <td>{current.feelslike_f}</td>
            <td>{current.condition.code}</td>
            <td>{current.condition.text}</td>
            <td>{current.wind_mph}</td>
            <td>{current.gust_mph}</td>
            <td>{current.wind_degree}</td>
            <td>{current.wind_dir}</td>
            <td>{current.precip_in}</td>
            <td>{current.cloud}</td>
            <td>{current.vis_miles}</td>
            <td>{current.uv}</td>
            <td>{current.pressure_in}</td>
          </tr>
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
