<script>
  export let date
  export let hours
  export let updated
</script>

<div class="card">
  <div class="card-body">
    <h3 class="card-title">WeatherApi.com Hourly Forecast for {date}</h3>

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
            <th scope="col">Prob</th><th scope="col">in</th>
            <th scope="col">Cover</th>
            <th scope="col">mi</th>
            <th scope="col">Idx</th>
            <th scope="col">in Hg</th>
          </tr>
        </thead>
        <tbody>
          {#each hours as hour}
            {#if hour.time > updated}
              <tr>
                <td>{hour.time.substr(10)}</td>
                <td>{Math.round(hour.temp_f)}</td>
                <td>{hour.humidity}</td>
                <td>{Math.round(hour.dewpoint_f)}</td>
                <td>{Math.round(hour.feelslike_f)}</td>
                <td><img alt='{hour.condition.text}' src='{hour.condition.icon}' style="width:40px;height:40px;"></td>
                <td>{hour.condition.text}</td>
                <td>{hour.wind_mph}</td>
                <td>{hour.gust_mph}</td>
                <td>{hour.wind_degree}</td>
                <td>{hour.wind_dir}</td>
                <td>{hour.chance_of_rain}</td>
                <td>{hour.precip_in}</td>
                <td>{hour.cloud}</td>
                <td>{hour.vis_miles}</td>
                <td>{hour.uv}</td>
                <td>{hour.pressure_in}</td>
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
