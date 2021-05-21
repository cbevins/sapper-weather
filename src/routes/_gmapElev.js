import { esaFinish } from './_esaFinish.js'
import { locationGrid } from './_slopeAspect.js'

/**
 * Returns elevation, slope, and aspect at a point using Elevation Point Query Service
 *
 * @param {number} lat Center cell latitude north (+) or south (-)
 * @param {number} lon  Center cell longitude east (+) or west (-)
 * @param {number} sampleRes Sample resolution in decimal degrees (usually 1/3 arc-second)
 * @param {number} cellWidth Cell width (and height) in sampleRes units
 * @returns {object} {lat, lon, elev, slopeDeg, slopeRatio, aspect, cells, nsMeters, ewMeters, nsDegrees, ewDegrees}
 */
export const gmapEsa = async (lat0, lon0, sampleRes, cellWidth) => {
  try {
    const url = 'https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/elevation/json'
    const key = 'AIzaSyA3U2TX-TtGBiOpLBG1TIl8E5kRtpaIFUk'

    // Get a 3x3 grid of *equi-distant* (meters, not degrees) sample points
    const loc = locationGrid(lat0, lon0, sampleRes, cellWidth)

    // Create query string of cell center [lat,lon] pairs
    const locations = []
    loc.cells.forEach(cell => { locations.push(`${cell.lon},${cell.lat}`) })
    const query = `${url}?locations=${locations.join('|')}&key=${key}`

    // Make the request and await the response
    const response = await fetch(query, { method: 'GET' })
      .catch((error) => console.error('maps.googleapis.com fetch error: ' + error))
    console.log(response)
    const json = await response.json()
    console.log(json)
    // Repackage response into 3x3 elevation grid (in meters)
    const elevationGrid = []
    if (json.status === 'OK') {
      json.results.forEach((res, idx) => {
        elevationGrid.push(res.elevation)
        loc.cells[idx].elev = res.elevation // add individual cell elevations
      })
    }

    // Add center cell's elev, slope, aspect
    esaFinish(loc, elevationGrid)
    return loc
  } catch (error) {
    console.error('_gmapElev.js error: ' + error)
    throw new Error(error)
  }
}
