import fetch from 'node-fetch'
import { key } from './_models/weatherApiKey.js'

export async function post (req, res, next) {
  try {
    console.log('server: BEGIN post()')
    const url = 'http://api.weatherapi.com/v1/forecast.json'
    const {lat, lon, days} = req.body
    // 'q' can be a US Zipcode, UK Postcode, Canada Postalcode, IP address, Latitude/Longitude (decimal degree) or city name.
    const q = `${lat},${lon}` // '46.85714,-114.0073'
    const aqi = 'no' // get air quality?
    const alerts = 'no' // get weather alerts?
    const query = `${url}?key=${key}&days=${days}&q=${q}&aqi=${aqi}&alerts=${alerts}`
    let promise = await fetch(query, { method: 'GET' })
      .catch((error) => console.error('weatherapi forecast error: ' + error))
    const wx = await promise.json()
    // const records = (format === 'fire') ? asFireWeather(json) : asTable(json)
    // return records

    res.writeHead(200, {
      'Content-Type': 'application/json'
    });
    res.end(JSON.stringify(wx));
  } catch (error) {
    console.log(`_wxQuery-weatherapi error`, error)
    throw new Error(`error: ${error}`)
  }
}
