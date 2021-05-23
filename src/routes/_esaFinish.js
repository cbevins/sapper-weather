// Finishes the data object for _gmapElev.js, _mapQuest.js, and _usgsEpqs.js
import { compassDir, slopeAspect } from './_slopeAspect.js'

export function esaFinish (loc, egrid) {
  const [slope, aspect] = slopeAspect(egrid, 3.2808 * loc.ewMeters, 3.2808 * loc.nsMeters)
  loc.elev = egrid[4]
  loc.slopeDeg = slope
  loc.slopeRatio = Math.tan(slope * Math.PI / 180)
  loc.aspect = aspect
  loc.aspectDir = compassDir(aspect)
}