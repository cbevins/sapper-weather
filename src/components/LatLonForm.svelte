<script>
  import {loc} from '../routes/_stores.js'
</script>

<div class="row mb-3">
  <label for="lat" class="col-sm-2 col-form-label">Latitude</label>
  <div class="col-auto">
    <input bind:value={$loc.lat} class="form-control" id="lat"
      type='text' pattern="[0-9/-]" maxlength='12' aria-describedby="latHelp">
  </div>
  <div id="latHelp" class="form-text">Latitude decimal degrees north (+) or south (-) of equator.</div>
</div>
<div class="row mb-3">
  <label for="lon" class="col-sm-2 col-form-label">Longitude</label>
  <div class="col-auto">
    <input bind:value={$loc.lon} class="form-control" id="lon"
      type='text' pattern="[0-9/-]" maxlength='12' aria-describedby="lonHelp">
  </div>
  <div id="lonHelp" class="form-text">Longitude decimal degrees east (+) or west (-) of Greenwich.</div>
</div>
