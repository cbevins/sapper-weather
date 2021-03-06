/**
 * USGS Elevation Point Query Service
 */
import axios from 'axios'
import { esaFinish } from './_esaFinish.js'
import { locationGrid, slopeAspect } from './_slopeAspect.js'

/**
 * Returns elevation, slope, and aspect at a point using Elevation Point Query Service
 *
 * @param {number} lat Center cell latitude north (+) or south (-)
 * @param {number} lon  Center cell longitude east (+) or west (-)
 * @param {number} sampleRes Sample resolution in decimal degrees (usually 1/3 arc-second)
 * @param {number} cellWidth Cell width (and height) in sampleRes units
 * @returns { lat, lon, sampleRes, cellWidth, cell, nsMeters, ewMeters, nsDegrees, ewDegrees,
 *  slopeDeg, slopeRatio, aspect }
 */
export const usgsEsa = async (lat0, lon0, sampleRes, cellWidth) => {
  try {
    const url = 'https://nationalmap.gov/epqs/pqs.php?units=Feet&output=json&'

    // Get a 3x3 grid of *equi-distant* (meters, not degrees) sample points
    // loc = { lat, lon, sampleRes, cellWidth, cell[], nsMeters, ewMeters, nsDegrees, ewDegrees }
    const loc = locationGrid(lat0, lon0, sampleRes, cellWidth)

    // Create query string of cell center [lat,lon] pairs
    const requests = []
    loc.cells.forEach(cell => {
      requests.push(axios.get(url + `x=${cell.lon}&y=${cell.lat}`))
    })

    // Make the request and await all the responses
    const responses = await axios.all(requests)

    // Repackage response into 3x3 elevation grid in meters
    const elevationGrid = []
    responses.forEach((res, idx) => {
      const data = res.data.USGS_Elevation_Point_Query_Service.Elevation_Query
      elevationGrid.push(data.Elevation)
      loc.cells[idx].elev = data.Elevation // add individual cell elevations
    })

    // Add elevations to the *loc.cells* object array and also center cell's elev, slope, aspect
    esaFinish(loc, elevationGrid)
    return loc
  } catch (error) {
    console.error('_usgsEpqs.js error: ' + error)
    throw new Error(error)
  }
}
