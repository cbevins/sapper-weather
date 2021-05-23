const key = '43956b1f6760417db1d182743212704'

export const forecast = async (lat, lon, ndays) => {
  const url = 'https://api.weatherapi.com/v1/forecast.json'
  const query = `${url}?key=${key}&days=${ndays}&q=${lat},${lon}&aqi=no&alerts=no`
  try {
    const response = await fetch(query, { method: 'GET' })
      .catch((error) => console.error('weatherap.com fetch error: ' + error))
    const json = await response.json()
    return addFireWeather(json)
  } catch (error) {
    console.log('ERROR _weatherApi.js forecast(): ', error)
  }
}

/**
 * Fetches location infor from WeatherAPI.com timezone
 *
 * @param {any} q Query parameter based on which data is sent back. It could be following:
 * - Latitude and Longitude (Decimal degree) e.g: q=48.8567,2.3508
 * - city name e.g.: q=Paris
 * - US zip e.g.: q=10001
 * - UK postcode e.g: q=SW1
 * - Canada postal code e.g: q=G2J
 * - metar: <metar code> e.g: q=metar:EGLL
 * - iata: <3 digit airport code> e.g: q=iata:DXB
 * - auto:ip IP lookup e.g: q=auto:ip
 * - IP address (IPv4 and IPv6 supported) e.g: q=100.0.0.1
 * @returns {object} {
    "name": "Missoula",
    "region": "Montana",
    "country": "USA",
    "lat": 46.86,
    "lon": -114.04,
    "tz_id": "America/Denver",
    "localtime_epoch": 1621784749,
    "localtime": "2021-05-23 9:45",
    "query": "search query",
    "error": { code: 0, message: 'Ok'}
  }
 */
export const timezone = async (q) => {
  const url = 'https://api.weatherapi.com/v1/timezone.json'
  const query = `${url}?key=${key}&q=${q}`
  try {
    const response = await fetch(query, { method: 'GET' })
      .catch((error) => console.error('weatherap.com fetch error: ' + error))
    const json = await response.json()
    json.location.query = q
    json.location.error = (json.error !== undefined) ? json.error : {code: 0, message: 'OK'}
    if (q.includes(',')) { // is this a lat,lon query
      const [lat, lon] = q.split(',')
      json.location.lat = parseFloat(lat)
      json.location.lon = parseFloat(lon)
    }
    return json.location
  } catch (error) {
    console.log('ERROR _weatherApi.js timezone(): ', error)
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
