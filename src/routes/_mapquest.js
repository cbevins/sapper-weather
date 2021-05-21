/**
 * MapQuest Developer Open Elevation API
 */
import { locationGrid, slopeAspect } from './_slopeAspect.js'

/**
 * Returns elevation, slope, and aspect at a point using MapQuest Developer Open Elevation API
 *
 * @param {number} lat Center cell latitude north (+) or south (-)
 * @param {number} lon  Center cell longitude east (+) or west (-)
 * @param {number} sampleRes Sample resolution in decimal degrees (usually 1/3 arc-second)
 * @param {number} cellWidth Cell width (and height) in sampleRes units
 * @returns {object} {lat, lon, elev, slopeDeg, slopeRatio, aspect, cells, nsMeters, ewMeters, nsDegrees, ewDegrees}
 */
export const mapquestEsa = async (lat0, lon0, sampleRes, cellWidth) => {
  try {
    const url = 'http://open.mapquestapi.com/elevation/v1/profile'
    const key = 'd7ghMP8OtMz17DubWO3qsTPZTzXKfbY1'
    const parms = `?key=${key}&shapeFormat=raw&unit=f&`

    // Get a 3x3 grid of *equi-distant* (meters, not degrees) sample points
    const loc = locationGrid(lat0, lon0, sampleRes, cellWidth)
    // Create query string of cell center [lat,lon] pairs
    let points = 'latLngCollection='
    loc.cells.forEach(cell => { points += `${cell.lat},${cell.lon},` })
    const query = url + parms + points

    const response = await fetch(query, { method: 'GET' })
      .catch((error) => console.error('mapquest.com fetch error: ' + error))
    const json = await response.json()
    // Repackage response
    const elevationGrid = json.elevationProfile.map(e => e.height)

    // Add elevations to the *loc.cells* object array and also center elev, slope, aspect
    const [slope, aspect] = slopeAspect(elevationGrid, 3.2808 * loc.ewMeters, 3.2808 * loc.nsMeters)
    json.elevationProfile.forEach((e, idx) => { loc.cells[idx].elev = e.height })
    loc.lat = lat0
    loc.lon = lon0
    loc.elev = elevationGrid[4]
    loc.slopeDeg = slope
    loc.slopeRatio = Math.tan(slope * Math.PI / 180)
    loc.aspect = aspect
    return loc
  } catch (error) {
    console.log(`mapquest.mjs error`, error)
    throw new Error(`error: ${error}`)
  }
}
