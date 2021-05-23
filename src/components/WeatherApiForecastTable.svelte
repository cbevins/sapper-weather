<script>
  import Astro from './WeatherApiAstroTable.svelte'
  import Current from './WeatherApiCurrentTable.svelte'
  import Hourly from './WeatherApiHourlyTable.svelte'

  export let wx
  export let location
  let prev // used to break forecast array into daily chunks
</script>

{#if wx !== null}
  <Current location={location} current={wx.current} />
  {#each wx.forecast.forecastday as day}
    {#if day.date !== prev}
      <h1>{day.date}</h1>
    {:else}
      {prev = day.date}
    {/if}
    <Astro date={day.date} astro={day.astro} />
    <Hourly date={day.date} hours={day.hour} updated={wx.current.last_updated}/>
  {/each}
{/if}
