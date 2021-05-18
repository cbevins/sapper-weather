/**
 * fireForecast.js is an example of using the FireBehaviorForecaster in Node.js
 *
 * Usage: node fireForecast.js lat=46.85934 lon=-113.975528 fuel=gs1 cured=50 liv=50
 *
 * Produces an hourly weather and fire forecast table
 * using world-wide weather forecast data from two alternate sources:
 * - tomorrow.oi
 * - weatherapi.com
 */
import { FireBehaviorForecaster } from './_FireBehaviorForecaster.mjs'
import { getForecastTable } from './_forecastTable.mjs'

const M = { name: 'The "M"', lat: 46.859340, lon: -113.975528 }
// const Home = { name: 'Home', lat: 46.85714, lon: -114.00730 }
const loc = M
const parms = {
  name: loc.name,
  lat: loc.lat,
  lon: loc.lon,
  timezone: 'America/Denver',
  hours: 4,
  fuel: 'gs1', // fuel model key
  waf: 0.4, // wind speed adjustment factor from 20-ft to midflame height
  cured: 0, // herb cured fraction (%)
  live: 200, // live herb and stem fuel moisture (%)
  elevdiff: 0
}

async function showForecast (forecaster, parms) {
  try {
    console.log('server: BEGIN fireForecast.mjs showForecast()')
    const forecast = await forecaster.getForecast(parms)
    const table = getForecastTable(forecast)
    console.log(table)
    return forecast
  } catch (error) {
    console.log(`_fireForecast error`, error)
    throw new Error(`error: ${error}`)
  }
}

console.log('Running fireForecast.mjs')
const forecaster = new FireBehaviorForecaster()
showForecast(forecaster, parms)
console.log('Getting elevation and weather data ...')
