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

// Adds fire behavior input values to each hourly forecast
function addFireWeather (json) {
  json.forecast.forecastday.forEach(d => {
    d.hour.forEach(h => {
      h.fire = {
        input: {
          month: +(h.time).substr(5, 2),
          hour: +(h.time).substr(11, 2),
          dryBulb: h.temp_f,
          humidity: 0.01 * h.humidity,
          shading: 0.01 * h.cloud,
          windAt10m: 88 * h.wind_mph,
          windGust: 88 * h.gust_mph,
          windFrom: h.wind_degree
        },
        output: {}
      }
    })
  })
  return json
}

// // Converts a Current object into an Hour object
// function asHour (c) {
//   return {
//   time_epoch: c.last_updated_epoch, //	int	Time as epoch
//   time: c.last_updated, // string	Date and time
//   temp_c:	c.temp_c, // decimal	Temperature in celsius
//   temp_f: c.temp_f, // decimal	Temperature in fahrenheit
//   condition: {
//     text: c.condition.text, // string	Weather condition text
//     icon: c.condition.icon, // string	Weather condition icon
//     code: c.condition.code, // int	Temperature in code
//   },
//   wind_mph: c.wind_mph, // decimal	Maximum wind speed in miles per hour
//   wind_kph: c.wind_kph, // decimal	Maximum wind speed in kilometer per hour
//   wind_degree: c.wind_degree, // int	Wind direction in degrees
//   wind_dir: c.wind_dir, // string	Wind direction as 16 point compass. e.g.: NSW
//   pressure_mb: c.pressure_mb, // decimal	Pressure in millibars
//   pressure_in: c.pressure_in, // decimal	Pressure in inches
//   precip_mm: c.precip_mm, // decimal	Precipitation amount in millimeters
//   precip_in: c.precip_in, // decimal	Precipitation amount in inches
//   humidity: c.humidity, //		int	Humidity as percentage
//   cloud: c.cloud, //		int	Cloud cover as percentage
//   feelslike_c: c.feelslike_c, //		decimal	Feels like temperature as celcius
//   feelslike_f: c.feelslike_f, //		decimal	Feels like temperature as fahrenheit
//   windchill_c: null, //		decimal	Windchill temperature in celcius
//   windchill_f: null, //		decimal	Windchill temperature in fahrenheit
//   heatindex_c: null, //		decimal	Heat index in celcius
//   heatindex_f: null, //		decimal	Heat index in fahrenheit
//   dewpoint_c: null, //		decimal	Dew point in celcius
//   dewpoint_f: null, //		decimal	Dew point in fahrenheit
//   will_it_rain: null, //		int	1 = Yes 0 = No
//   will_it_snow: null, //		int	1 = Yes 0 = No
//   is_day: null, //		int	1 = Yes 0 = No Whether to show day condition icon or night icon
//   vis_km: null, //		decimal	Visibility in kilometer
//   vis_miles: null, //		decimal	Visibility in miles
//   chance_of_rain: null, //		int	Chance of rain as percentage
//   chance_of_snow: null, //		int	Chance of snow as percentage
//   gust_mph: c.gust_mph, //		decimal	Wind gust in miles per hour
//   gust_kph: c.gust_kph, //
//   }
// }
