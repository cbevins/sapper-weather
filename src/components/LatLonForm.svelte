<script>
  import {loc} from '../routes/_stores.js'
  export let callback
</script>

<div class="row mb-1">
  <div class="col-auto">
    <div class="input-group input-group-sm mb-1">

      <span class="input-group-text" id="latHelp">Lat</span>

      <input bind:value={$loc.lat} class="form-control" id="lat"
        type='text' aria-describedby="latHelp">

      <span class="input-group-text" id="lonHelp">Lon</span>

      <input bind:value={$loc.lon} class="form-control" id="lon"
        type='text' aria-describedby="lonHelp">

      <button  on:click={callback}
        class="btn btn-outline-secondary" type="button" id="button">Update</button>

    </div>
  </div>
</div>
