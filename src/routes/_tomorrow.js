import moment from 'moment'
import queryString from 'query-string'

export const timelines = async (lat, lon, timezone, hours) => {
  try {
    let json
    const url = 'https://api.tomorrow.io/v4/timelines'
    const apikey = 'Vp91CwZKe0rPFd8ZDry5hKyVyOp2I4aC'
    // set the Timelines GET endpoint as the target URL
    const location = [lat, lon] // pick the location, as a lat, lon pair
    const units = 'imperial' // choose the unit system, either 'metric' or 'imperial'
    const timesteps = ['1h'] // set the timesteps, like "current", "1h" and "1d"
    const now = moment.utc()
    const startTime = moment.utc(now).startOf('hour').toISOString() // "2019-03-20T14:09:50Z"
    const endTime = moment.utc(now).add(hours, 'hours').toISOString()
    // requested fields
    const fields = [
      'temperature', // dry bulb temperature at 2-m (oF)
      'temperatureApparent', // apparent temperature at 2-m (oF)
      'humidity', // relative humidity (%)
      'dewPoint', // dewpoint temperature at 2-m (oF)
      'windSpeed', // wind speed at 10-m (mi/h)
      'windGust', // maximum brief increase in wind speed at 10-m, usually less than 20 seconds (mi/h)
      'windDirection', // direction from which the wind originates, degrees clockwise from north
      'precipitationIntensity', // in/hr
      'precipitationProbability', // %
      'precipitationType', // 0=N/A 1=Rain 2=Snow 3=Freezing Rain 4=Ice Pellets
      'pressureSurfaceLevel', // weight of the air above the surface (at the surface level) (in/Hg)
      'pressureSeaLevel', // weight of the air above the surface (at mean sea level) (in/Hg)
      'cloudCover', // %
      'visibility', // mi
      'cloudBase', // mi
      'cloudCeiling', // mi
      'weatherCode', // code
      'fireIndex', // Fosberg Fire Weather Index
      'snowAccumulation', // The trailing amount of new snowfall that has or will have occurred over the last hour of the requested time (in)
      'iceAccumulation', // The trailing amount of ice that has or will have occurred over the last hour of the requested time (in)
      'soilMoistureVolumetric0To10', // % at 0-10 cm
      'soilTemperature0To10', // oF
      // 'moonPhase', // not allowed for 1-h timelines
      // 'sunriseTime', // not allowed for 1-h timelines
      // 'sunsetTime', // not allowed for 1-h timelines
      'solarGHI', // Btu/ft2  (total amount of shortwave radiation received from above by a surface horizontal to the ground)
      'solarDNI', // Btu/ft2 (diffuse (i.e., scattered) component of GHI reaching the surface of the earth at each point)
      'solarDHI' // Btu/ft2 (direct component of GHI reaching the surface of the earth at each point)
    ]

    // request the timelines with all the query string parameters as options
    // DO NOT CHANGE PROPERTY NAMES!!
    const parms = queryString.stringify({
      apikey,
      location,
      fields,
      units,
      timesteps,
      startTime,
      endTime,
      timezone
    }, { arrayFormat: 'comma' })

    const response = await fetch(url + '?' + parms, { method: 'GET' })
      .catch((error) => console.error('Tomorrow.io query error: ' + error))
    if (response.status >= 200 && response.status <= 299) {
      json = await response.json()
    } else if (response.status === 429) { // 'Too Many Requests' 3/sec, 25/hr, 500/day
      console.log(`Tomorrow request limit exceeded: ${res.status}, ${res.statusText}`)
    } else {
      console.log(`Tomorrow request error: ${res.status}, ${res.statusText}`)
    }
    json.status = response.status
    json.statusText = response.statusText
    return addFireWeather(json)
  } catch (error) {
    const msg = `Unable to access api end pount at ${url}`
    throw new Error(msg)
  }
}

// Adds fire behavior input values to each hourly forecast
function addFireWeather (json) {
  const intervals = json.data.timelines[0].intervals // this is the '1h' timeline
  intervals.forEach(interval => {
    const wx = interval.values
    wx.fire = {
      input: {
        month: +(interval.startTime.substr(5, 2)),
        hour: +(interval.startTime.substr(11, 2)),
        dryBulb: wx.temperature,
        humidity: 0.01 * wx.humidity,
        shading: 0.01 * wx.cloudCover,
        windAt10m: 88 * wx.windSpeed,
        windGust: 88 * wx.windGust,
        windFrom: wx.windDirection
      },
      output: {}
    }
  })
  return json
}
