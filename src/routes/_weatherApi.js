export const get = async (lat, lon, ndays) => {
  const url = 'https://api.weatherapi.com/v1/forecast.json'
  const key = '43956b1f6760417db1d182743212704'
  const query = `${url}?key=${key}&days=${ndays}&q=${lat},${lon}&aqi=no&alerts=no`
  try {
    const response = await fetch(query, { method: 'GET' })
      .catch((error) => console.error('weatherap.com fetch error: ' + error))
    const json = await response.json()
    return addFireWeather(json)
  } catch (error) {
    console.log('ERROR _weatherApi.js grab(): ', error)
  }
}

// Repackages the WeatherApi.com json response into an array FireWeather objects with 15 properties
function addFireWeather (json) {
  json.fire = []
  json.forecast.forecastday.forEach(d => {
    // Note that this service has d.astro.sunrise, .sunset, .moonrise, .moonset, .moon_phase, and .moon_illumination
    d.hour.forEach(h => {
      json.fire.push({
        date: d.date,
        time: h.time.substr(11, 5),
        dryBulb: h.temp_f, // oF
        humidity: h.humidity, // relative humidity (%)
        dewPoint: h.dewpoint_f, // dewpoint temperature (oF)
        windSpeed: h.wind_mph, // wind speed at ??? (mi/h)
        windGust: h.gust_mph,
        windFrom: h.wind_degree, // direction from which the wind originates, degrees clockwise from north
        precipRate: h.precip_in, // in/hr
        precipProb: parseFloat(h.chance_of_rain), // % NOTE: chance_of_rain is a numeric string
        cloudCover: h.cloud, // %
        visibility: h.vis_miles, // mi
        wthrCode: h.condition.code, // code
        feelsLike: h.feelslike_f, // apparent temperature at 2-m (oF)
        atmSurface: h.pressure_in, // weight of the air above the surface (at the surface level) (in/Hg)

        // Items below here are unique to this service
        // icon: h.condition.icon,
        // text: h.condition.text,
        // heatIndex: h.heatindex_f,
        // windChill: h.windchill_f,
        // uv: h.uv,
        // snowProb: parseFloat(h.chance_of_snow) // % NOTE: chance_of_snow is a numeric string
      })
    })
  })
  return json
}
