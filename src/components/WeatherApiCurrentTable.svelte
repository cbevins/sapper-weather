<script>
  export let current
  export let location
  export let uom

  function dist (v) { return (uom === 'si') ? 1.60934 * v : v } // mi or km
  function press (v) { return (uom === 'si') ? 33.863886666667 * v : v } // in Hg or hectoPascal
  function rain (v) { return (uom === 'si') ? 25.4 * v : v } // in or mm
  function temp (v) { return (uom === 'si') ? (5 * (v-32) / 9) : v } // oF or oC
  function wind (v) { return (uom === 'si') ? 1.60934 * v : v } // mi/h or km/h
</script>

<div class="card">
  <div class="card-body">
    <h4 class='card-title'>
      {location.name}, {location.region}, {location.country} [{location.lat}, {location.lon}]
    </h4>

    <h4 class="card-title">
      Current Conditions
      <img alt='{current.condition.text}' src='{current.condition.icon}'>
      at {current.last_updated}
    </h4>

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
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{current.last_updated.substr(11,5)}</td>
            <td>{Math.round(temp(current.temp_f))}</td>
            <td>{current.humidity}</td>
            <td>NA</td>
            <td>{Math.round(temp(current.feelslike_f))}</td>
            <td><img alt='{current.condition.text}' src='{current.condition.icon}' style="width:40px;height:40px;"></td>
            <td>{current.condition.text}</td>
            <td>{Math.round(wind(current.wind_mph))}</td>
            <td>{Math.round(wind(current.gust_mph))}</td>
            <td>{Math.round(current.wind_degree)}</td>
            <td>{current.wind_dir}</td>
            <td>NA</td>
            <td>{rain(current.precip_in).toFixed(2)}</td>
            <td>{Math.round(current.cloud)}</td>
            <td>{Math.round(dist(current.vis_miles))}</td>
            <td>{press(current.pressure_in).toFixed(2)}</td>
            <td>{current.uv}</td>
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
