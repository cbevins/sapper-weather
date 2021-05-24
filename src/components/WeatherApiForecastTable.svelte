<script>
  import Current from './WeatherApiCurrentTable.svelte'
  import Hourly from './WeatherApiHourlyTable.svelte'

  export let location
  export let uom
  export let wx
  let prev // used to break forecast array into daily chunks
</script>

{#if wx !== null}
  <Current location={location} current={wx.current} uom={uom}/>
  {#each wx.forecast.forecastday as day}
    {#if day.date !== prev}
      <h1>{day.date}</h1>
    {:else}
      {prev = day.date}
    {/if}
    <Hourly astro={day.astro} date={day.date} hours={day.hour} uom={uom} updated={wx.current.last_updated}/>
  {/each}
{/if}
