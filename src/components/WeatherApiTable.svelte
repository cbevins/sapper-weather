<script>
  export let wx
</script>

<ul>
  <li>location:
    <ul>
      <li>name: {wx.location.name}</li>
      <li>region: {wx.location.region}</li>
      <li>lat: {wx.location.lat}</li>
      <li>lon: {wx.location.lon}</li>
      <li>tz_id: {wx.location.tz_id}</li>
      <li>localtime_epoch: {wx.location.localtime_epoch}</li>
      <li>localtime: {wx.location.localtime}</li>
    </ul>
  </li>
  <li>current:
    <ul>
      <li>last_updated: {wx.current.last_updated}</li>
      <li>temp_f: {wx.current.temp_f}</li>
      <li>condition:
        <ul>
          <li>text: {wx.current.condition.text} <img alt='x' src='{wx.current.condition.icon}'></li>
          <li>code: {wx.current.condition.code}</li>
        </ul>
      </li>
      <li>wind_mph: {wx.current.wind_mph}</li>
    </ul>
  </li>
  <li>forecast:
    <ul>
      <li>forecastday:
        {#each wx.forecast.forecastday as fday}
        <ul>
          <li>date: {fday.date}</li>
          <li>date_epoch: {fday.date.epoch}</li>
          <li>day:
          </li>
          <li>astro:
            <ul>
              <li>sunrise: {fday.astro.sunrise}</li>
              <li>sunset: {fday.astro.sunset}</li>
              <li>moonrise: {fday.astro.moonrise}</li>
              <li>moonrise: {fday.astro.moonset}</li>
              <li>moonphase: {fday.astro.moonphase}</li>
              <li>moon_illumination: {fday.astro.moon_illumination}</li>
            </ul>
          </li>
          <li>hour:
            {#each fday.hour as hour}
              <ul>
                <li>time: {hour.time}</li>
                <li>temp_f: {hour.temp_f}</li>
              </ul>
            {/each}
          </li>
        </ul>
        {/each}
      </li>
    </ul>
  </li>
</ul>
