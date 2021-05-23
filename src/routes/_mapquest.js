/**
 * MapQuest Developer Open Elevation API
 */
import { esaFinish } from './_esaFinish.js'
import { locationGrid } from './_slopeAspect.js'

/**
 * Returns elevation, slope, and aspect at a point using MapQuest Developer Open Elevation API
 *
 * @param {number} lat Center cell latitude north (+) or south (-)
 * @param {number} lon  Center cell longitude east (+) or west (-)
 * @param {number} sampleRes Sample resolution in decimal degrees (usually 1/3 arc-second)
 * @param {number} cellWidth Cell width (and height) in sampleRes units
 * @returns { lat, lon, sampleRes, cellWidth, cell, nsMeters, ewMeters, nsDegrees, ewDegrees,
 *  slopeDeg, slopeRatio, aspect }
 */
export const mapquestEsa = async (lat0, lon0, sampleRes, cellWidth) => {
  try {
    const url = 'https://open.mapquestapi.com/elevation/v1/profile'
    const key = 'd7ghMP8OtMz17DubWO3qsTPZTzXKfbY1'
    const parms = `?key=${key}&shapeFormat=raw&unit=f&`

    // Get a 3x3 grid of *equi-distant* (meters, not degrees) sample points
    // loc = { lat, lon, sampleRes, cellWidth, cell[], nsMeters, ewMeters, nsDegrees, ewDegrees }
    const loc = locationGrid(lat0, lon0, sampleRes, cellWidth)

    // Create query string of cell center [lat,lon] pairs
    let points = 'latLngCollection='
    loc.cells.forEach(cell => { points += `${cell.lat},${cell.lon},` })
    const query = url + parms + points

    // Make the request and await the response
    const response = await fetch(query, { method: 'GET' })
      .catch((error) => console.error('mapquest.com fetch error: ' + error))
    const json = await response.json()

    // Repackage response into 3x3 elevation grid in meters
    const elevationGrid = []
    json.elevationProfile.forEach((e, idx) => {
      elevationGrid.push(e.height)
      loc.cells[idx].elev = e.height // add individual cell elevations
    })

    // Add elevations to the *loc.cells* object array and also center cell's elev, slope, aspect
    esaFinish(loc, elevationGrid)
    return loc
  } catch (error) {
    console.log(`mapquest.mjs error`, error)
    throw new Error(`error: ${error}`)
  }
}
