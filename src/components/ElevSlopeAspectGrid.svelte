<script>
  export let esa
  export let source
</script>

<div class="card">
  <div class="card-body">
    <h3 class='card-title'>{source}</h3>
    <h3 class='card-title'>
      Elevation {Math.round(esa.elev)} ft,
      Slope {Math.round(100 * esa.slopeRatio)} &percnt; ({Math.round(esa.slopeDeg)} &deg;)
      Aspect {Math.round(esa.aspect)} ({esa.aspectDir})
    </h3>
    <div class="table-responsive">
      <table class="table table-sm table-striped table-bordered border-primary">
        <thead class='table-light border-primary'>
        </thead>
        <tbody>
          <tr>
            {#each [0,1,2] as idx}
              <td>{Math.round(esa.cells[idx].elev)}</td>
            {/each}
          </tr><tr>
            {#each [3,4,5] as idx}
              <td>{Math.round(esa.cells[idx].elev)}</td>
            {/each}
            </tr><tr>
            {#each [6,7,8] as idx}
              <td>{Math.round(esa.cells[idx].elev)}</td>
            {/each}
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</div>

