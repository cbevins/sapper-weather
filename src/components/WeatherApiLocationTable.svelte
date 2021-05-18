<script>
  export let location
</script>

<div class="card">
  <div class="card-body">
    <h3 class='card-title'>Location</h3>
    <div class="table-responsive">
      <table class="table table-sm table-striped table-bordered border-primary">
        <thead class='table-light border-primary'>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Region</th>
            <th scope="col">Country</th>
            <th scope="col">Latitude</th>
            <th scope="col">Longitude</th>
            <th scope="col">Local Time</th>
            <th scope="col">Time Zone</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{location.name}</td>
            <td>{location.region}</td>
            <td>{location.country}</td>
            <td>{location.lat}</td>
            <td>{location.lon}</td>
            <td>{location.localtime}</td>
            <td>{location.tz_id}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</div>
