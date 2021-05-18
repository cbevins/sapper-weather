<script>
  export let astro
  export let date
</script>

<div class="card">
  <div class="card-body">
    <h3 class='card-title'>Sun - Moon Times for {date}</h3>
    <div class="table-responsive">
      <table class="table table-sm table-striped table-bordered border-primary">
        <thead class='table-light border-primary'>
          <tr>
            <th scope="col">Sun Rise</th>
            <th scope="col">Sun Set</th>
            <th scope="col">Moon Rise</th>
            <th scope="col">Moon Set</th>
            <th scope="col">Moon Phase</th>
            <th scope="col">Illumin</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{astro.sunrise}</td>
            <td>{astro.sunset}</td>
            <td>{astro.moonrise}</td>
            <td>{astro.moonset}</td>
            <td>{astro.moon_phase}</td>
            <td>{astro.moon_illumination}</td>
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