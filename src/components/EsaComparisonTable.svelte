<script>
  import { compassDir } from '../routes/_slopeAspect.js'
  import { loc, mel, uel, wwx } from "../routes/_stores";
</script>

{#if $mel !== null && $uel !== null && $wwx !== null}

<div class="card">
  <div class="card-body">
    <h4 class='card-title'>Elevation, Slope, Aspect Service Comparison</h4>
    <h6 class='card-subtitle'>
      {$wwx.location.name}, {$wwx.location.region}, {$wwx.location.country} [{$loc.lat}, {$loc.lon}]
    </h6>

    <div class="table-responsive">
      <table class="table table-sm table-striped table-bordered border-primary">
        <thead class='table-light border-primary'>
          <tr>
            <th scope="col"></th><th scope="col">MapQuest</th><th scope="col">USGS EPQS</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Elevation</td>
            <td>{Math.round($mel.elev)} ft</td>
            <td>{Math.round($uel.elev)} ft</td>
          </tr>
          <tr>
            <td>Slope</td>
            <td>{Math.round(100 * $mel.slopeRatio)} &percnt; ({Math.round($mel.slopeDeg)} &deg;)</td>
            <td>{Math.round(100 * $uel.slopeRatio)} &percnt; ({Math.round($uel.slopeDeg)} &deg;)</td>
          </tr>
          <tr>
            <td>Aspect</td>
            <td>{Math.round($mel.aspect)} &deg; ({compassDir($mel.aspect)})</td>
            <td>{Math.round($uel.aspect)} &deg; ({compassDir($uel.aspect)})</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</div>
{/if}
