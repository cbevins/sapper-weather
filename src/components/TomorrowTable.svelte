<script>
  export let wx
</script>

{#if wx.length}
<table border='1'>
  <tr>
    <th></th>
    <th></th>
    <th colspan='3'>--Temperature--</th>
    <th>Rel</th>
    <th colspan='3'>----Wind----</th>
    <th colspan='2'>--Precip--</th>
    <th>Cloud</th>
    <th>Visib</th>
    <th>Wthr</th>
    <th>Atm</th>
  </tr>
  <tr>
    <th>Date</th>
    <th>Time</th>
    <th>Actual</th>
    <th>Feel</th>
    <th>DewPt</th>
    <th>Hum</th>
    <th>Speed</th>
    <th>Gust</th>
    <th>From</th>
    <th>Rate</th>
    <th>Prob</th>
    <th>Cover</th>
    <th>ility</th>
    <th>Code</th>
    <th>Press</th>
  </tr>
  {#each wx as w}
    <tr>
      <td>{w.date}</td>
      <td>{w.time}</td>
      <td align='right'>{Math.round(w.dryBulb).toFixed(0)}</td>
      <td align='right'>{Math.round(w.feelsLike).toFixed(0)}</td>
      <td align='right'>{Math.round(w.dewPoint).toFixed(0)}</td>
      <td align='right'>{Math.round(w.humidity).toFixed(0)}</td>
      <td align='right'>{Math.round(w.windSpeed).toFixed(0)}</td>
      <td align='right'>{Math.round(w.windGust).toFixed(0)}</td>
      <td align='right'>{Math.round(w.windFrom).toFixed(0)}</td>
      <td align='right'>{w.precipRate.toFixed(2)}</td>
      <td align='right'>{Math.round(w.precipProb).toFixed(0)}</td>
      <td align='right'>{Math.round(w.cloudCover).toFixed(0)}</td>
      <td align='right'>{Math.round(w.visibility).toFixed(0)}</td>
      <td>{w.wthrCode}</td>
      <td>{w.atmSurface.toFixed(2)}</td>
    </tr>
  {/each}
</table>
{/if}
