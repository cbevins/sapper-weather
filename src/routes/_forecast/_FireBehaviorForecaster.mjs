/**
 * @file FireBehaviorForecaster.js provides site specific terrain, weather, and fire behavior
 * for a 48-hour period.
 * @copyright 2021 Systems for Environmental Management
 * @author Collin D. Bevins, <cbevins@montana.com>
 * @license MIT
*/
// import { Sim } from '@cbevins/fire-behavior-simulator'
import { Sim } from './_fire-behavior-simulator.mjs'
import moment from 'moment'
import { getForecast as getWeatherapi } from './_wxQuery-weatherapi.mjs'
import { getTimelines as getTomorrow } from './_wxQuery-tomorrow.mjs'
import { mapquestElevSlopeAspect as mapQuest } from './_elevQuery-mapquest.mjs'
import { usgsElevSlopeAspect as usgs } from './_elevQuery-usgs.mjs'

export class FireBehaviorForecaster {
  constructor () {
    this.elevationApi = 'mapquest.com' // or 'usgs.gov'
    this.weatherApi = 'tomorrow.io' // or 'weatherapi.com'
    this.sim = new Sim()
    this.dag = this.sim.createDag('FireForecast')
    this.dag.configure([
      ['configure.fuel.primary', 'catalog'], // The primary fuel is specified by a fuel model catalog key
      ['configure.fuel.secondary', 'none'], // There are no secondary fuels
      ['configure.fuel.moisture', 'fosberg'], // 3 dead moisture classes and a singe live category moisture
      ['configure.fuel.curedHerbFraction', 'input'],
      ['configure.wind.speed', 'at10m'],
      ['configure.wind.direction', 'sourceFromNorth'],
      ['configure.slope.steepness', 'ratio'],
      ['configure.fuel.windSpeedAdjustmentFactor', 'input'],
      ['configure.fire.vector', 'fromHead'],
      ['configure.temperature.humidity', 'humidity'], // enter dry bulb and humidity
      ['configure.fuel.chaparralTotalLoad', 'input'], // unimportant
      ['configure.fire.weightingMethod', 'arithmetic'], // unimportant
      ['configure.fire.effectiveWindSpeedLimit', 'ignored'],
      ['configure.fire.firelineIntensity', 'flameLength'],
      ['configure.fire.lengthToWidthRatio', 'lengthToWidthRatio']
    ])

    this.dag.select([
      'surface.primary.fuel.model.behave.parms.cured.herb.fraction', // ratio
      'surface.primary.fuel.fire.effectiveWindSpeed', // ft/min
      'surface.primary.fuel.fire.flameResidenceTime', // min
      'surface.primary.fuel.fire.heading.fromUpslope', // degrees
      'surface.primary.fuel.fire.heading.fromNorth', // degrees
      'surface.primary.fuel.fire.heatPerUnitArea', // btu/ft2 |
      'surface.primary.fuel.fire.reactionIntensity', // btu/ft2/min
      'surface.fire.ellipse.axis.lengthToWidthRatio', // ratio
      'surface.fire.ellipse.back.firelineIntensity', // Btu/ft/s
      'surface.fire.ellipse.back.flameLength', // ft
      'surface.fire.ellipse.back.scorchHeight', // ft
      'surface.fire.ellipse.back.spreadDistance', // ft
      'surface.fire.ellipse.back.spreadRate', // ft/min
      'surface.fire.ellipse.flank.firelineIntensity',
      'surface.fire.ellipse.flank.flameLength',
      'surface.fire.ellipse.flank.scorchHeight',
      'surface.fire.ellipse.flank.spreadDistance',
      'surface.fire.ellipse.flank.spreadRate',
      'surface.fire.ellipse.head.firelineIntensity',
      'surface.fire.ellipse.head.flameLength',
      'surface.fire.ellipse.head.scorchHeight',
      'surface.fire.ellipse.head.spreadDistance',
      'surface.fire.ellipse.head.spreadRate',
      'surface.fire.ellipse.size.area', // ft2
      'surface.fire.ellipse.size.length', // ft
      'surface.fire.ellipse.size.perimeter', // ft
      'surface.fire.ellipse.size.width', // ft
      'site.moisture.dead.tl1h', // ratio
      'site.moisture.dead.tl10h',
      'site.moisture.dead.tl100h'
    ])
  }

  /**
   * Adds fire behavior to the weather records
   * @param {array} parms Array of input parameters
   * @param {array} wxArray Array of hourly weather forecast objects
   * @returns {array} wxArray with 16 or so fire behavior properties added
   */
  addFireBehavior (parms, wxArray) {
    wxArray.forEach(wx => {
      const input = {
        fuel: parms.fuel,
        curedHerb: 0.01 * parms.cured,
        month: +(wx.date).substr(5, 2),
        hour: +(wx.time).substr(0, 2),
        elevDiff: parms.elevdiff,
        aspect: parms.aspect,
        slope: 0.01 * parms.slope,
        dryBulb: wx.dryBulb,
        humidity: 0.01 * wx.humidity,
        shading: 0.01 * wx.cloudCover,
        liveMoisture: 0.01 * parms.live,
        windAt10m: 88 * wx.windSpeed,
        windGust: 88 * wx.windGust,
        windAdj: parms.waf,
        windFrom: wx.windFrom,
        elapsed: 60
      }
      const output = this.run(input)
      wx.tl1h = 100 * output.moisture.fosberg.tl1h // ratio
      wx.tl10h = 100 * output.moisture.tl10h // ratio
      wx.tl100h = 100 * output.moisture.tl100h // ratio
      wx.spreadRate = output.heading.spreadRate // ft/min
      wx.flameLength = output.heading.flameLength // ft
      wx.scorchHeight = output.heading.scorchHeight // ft
      wx.headingFromNorth = output.fire.headingFromNorth // degrees
      wx.gust = {
        spreadRate: output.heading.gust.spreadRate, // ft/min
        flameLength: output.heading.gust.flameLength, // ft
        scorchHeight: output.heading.gust.scorchHeight, // ft
        headingFromNorth: output.fire.gust.headingFromNorth // degrees
      }
    })
    return wxArray
  }

  /**
   * Gets fire behavior for the supplied inputs
   * @param {array} inp  Array of fire behavior input values
   * @returns {object} Fire behavior object
   */
  run (inp) {
    this.dag.input([
      ['surface.primary.fuel.model.catalogKey', [inp.fuel]],
      ['surface.primary.fuel.model.behave.parms.cured.herb.fraction', [inp.curedHerb]], // fraction
      ['site.date.month', [inp.month]],
      ['site.time.hour', [inp.hour]],
      ['site.location.elevation.diff', [inp.elevDiff]],
      ['site.slope.direction.aspect', [inp.aspect]], // degrees clockwise from north
      ['site.slope.steepness.ratio', [inp.slope]], // vertical rise / horizontal reach
      ['site.temperature.air', [inp.dryBulb]], // oF
      ['site.temperature.relativeHumidity', [inp.humidity]], // oF
      ['site.temperature.shading', [inp.shading]], // oF
      ['site.moisture.live.herb', [inp.liveMoisture]], // fraction of fuel ovendry weight
      ['site.moisture.live.stem', [inp.liveMoisture]], // fraction of fuel ovendry weight
      ['site.wind.speed.at10m', [inp.windAt10m]], // feet per minute (1 mph = 88 ft/min)
      ['site.windSpeedAdjustmentFactor', [inp.windAdj]], // fraction of 10m wind speed
      ['site.wind.direction.source.fromNorth', [inp.windFrom]], // direction of wind origin, degrees clockwise from north
      ['site.fire.time.sinceIgnition', [inp.elapsed]] // minutes
    ]).run()

    const output = {
      fire: {
        effectiveWindSpeed: this.dag.node('surface.primary.fuel.fire.effectiveWindSpeed').value(), // ft/min
        flameResidenceTime: this.dag.node('surface.primary.fuel.fire.flameResidenceTime').value(), // min
        headingFromUpslope: this.dag.node('surface.primary.fuel.fire.heading.fromUpslope').value(), // degrees
        headingFromNorth: this.dag.node('surface.primary.fuel.fire.heading.fromNorth').value(), // degrees
        heatPerUnitArea: this.dag.node('surface.primary.fuel.fire.heatPerUnitArea').value(), // btu/ft2 |
        reactionIntensity: this.dag.node('surface.primary.fuel.fire.reactionIntensity').value() // btu/ft2/min
      },
      moisture: {
        tl1h: this.dag.node('site.moisture.dead.tl1h').value(),
        tl10h: this.dag.node('site.moisture.dead.tl10h').value(),
        tl100h: this.dag.node('site.moisture.dead.tl100h').value(),
        fosberg: {
          reference: this.dag.node('site.moisture.dead.fosberg.reference').value(),
          correction: this.dag.node('site.moisture.dead.fosberg.correction').value(),
          tl1h: this.dag.node('site.moisture.dead.fosberg.tl1h').value(),
          tl10h: this.dag.node('site.moisture.dead.fosberg.tl10h').value(),
          tl100h: this.dag.node('site.moisture.dead.fosberg.tl100h').value()
        }
      },
      ellipse: {
        lwRatio: this.dag.node('surface.fire.ellipse.axis.lengthToWidthRatio').value(), // ratio
        area: this.dag.node('surface.fire.ellipse.size.area').value(), // ft2
        length: this.dag.node('surface.fire.ellipse.size.length').value(), // ft
        perimeter: this.dag.node('surface.fire.ellipse.size.perimeter').value(), // ft
        width: this.dag.node('surface.fire.ellipse.size.width').value() // ft
      },
      backing: {
        firelineIntensity: this.dag.node('surface.fire.ellipse.back.firelineIntensity').value(), // Btu/ft/s
        flameLength: this.dag.node('surface.fire.ellipse.back.flameLength').value(), // ft
        scorchHeight: this.dag.node('surface.fire.ellipse.back.scorchHeight').value(), // ft
        spreadDistance: this.dag.node('surface.fire.ellipse.back.spreadDistance').value(), // ft
        spreadRate: this.dag.node('surface.fire.ellipse.back.spreadRate').value() // ft/min
      },
      flanking: {
        firelineIntensity: this.dag.node('surface.fire.ellipse.flank.firelineIntensity').value(),
        flameLength: this.dag.node('surface.fire.ellipse.flank.flameLength').value(),
        scorchHeight: this.dag.node('surface.fire.ellipse.flank.scorchHeight').value(),
        spreadDistance: this.dag.node('surface.fire.ellipse.flank.spreadDistance').value(),
        spreadRate: this.dag.node('surface.fire.ellipse.flank.spreadRate').value()
      },
      heading: {
        firelineIntensity: this.dag.node('surface.fire.ellipse.head.firelineIntensity').value(),
        flameLength: this.dag.node('surface.fire.ellipse.head.flameLength').value(),
        scorchHeight: this.dag.node('surface.fire.ellipse.head.scorchHeight').value(),
        spreadDistance: this.dag.node('surface.fire.ellipse.head.spreadDistance').value(),
        spreadRate: this.dag.node('surface.fire.ellipse.head.spreadRate').value()
      }
    }

    // Add fire behavior during wind gusts
    this.dag.input([
      ['site.wind.speed.at10m', [inp.windGust]] // feet per minute (1 mph = 88 ft/min)
    ]).run()
    output.heading.gust = {
      firelineIntensity: this.dag.node('surface.fire.ellipse.head.firelineIntensity').value(),
      flameLength: this.dag.node('surface.fire.ellipse.head.flameLength').value(),
      scorchHeight: this.dag.node('surface.fire.ellipse.head.scorchHeight').value(),
      spreadDistance: this.dag.node('surface.fire.ellipse.head.spreadDistance').value(),
      spreadRate: this.dag.node('surface.fire.ellipse.head.spreadRate').value()
    }
    output.fire.gust = {
      headingFromUpslope: this.dag.node('surface.primary.fuel.fire.heading.fromUpslope').value(), // degrees
      headingFromNorth: this.dag.node('surface.primary.fuel.fire.heading.fromNorth').value() // degrees
    }
    return output
  }

  /**
   * Display the required configuration nodes
   */
  showConfigs () {
    const activeConfigs = this.dag.requiredConfigNodes() // returns an array of DagNode references
    console.log('ACTIVE CONFIGS:')
    activeConfigs.forEach(cfg => { console.log(cfg.key(), cfg.value()) })
  }

  /**
   * Display the required input nodes
   */
  showInputs () {
    const requiredInputs = this.dag.requiredInputNodes() // returns an array of DagNode references
    console.log('REQUIRED INPUTS:')
    requiredInputs.forEach(node => { console.log(node.key()) })
  }

  /**
   * Gets the weather and fire forecast - MAIN ENTRY POINT
   *
   * @param {array} parms
   * - name {string} Location name
   * - lat {number} Location latitude north (+) or south (-)
   * - lon {number} Location longitude east (+) or west (-)
   * - timezone {string} Timezone of time values, according to IANA Timezone Names (defaults to 'UTC')
   *    (see https://docs.tomorrow.io/reference/api-formats#timezone)
   * - fuel {string} fuel model key
   * - waf {number} wind speed adjustment factor from 20-ft to midflame height (fraction)
   * - cured {number} herb cured fraction (%)
   * - live {number} live (herb and stem) fuel moisture (%)
   * - elevdiff {number} ELevation difference between forecast location and site (ft)
   *
   * @returns {array} Array of hourly forecast objects
   */
  async getForecast (parms) {
    try {
      // configure the time frame up to 6 hours back and 15 days out
      const now = moment.utc()
      parms.start = moment.utc(now).startOf('hour').toISOString() // "2019-03-20T14:09:50Z"
      parms.end = moment.utc(now).add(4, 'hours').toISOString()

      // First get elevation, slope, and aspect and add it to the parms
      const sampleRes = 1 / (60 * 60 * 3) // 1/3 arc-second in decimal degrees
      const cellWidth = 2 // Double sample distance to ensure adjacent cells have different sample
      let _esa
      if (this.elevationApi === 'usgs.gov') {
        _esa = usgs(parms.lat, parms.lon, sampleRes, cellWidth)
      } else { // mapquest.com
        _esa = mapQuest(parms.lat, parms.lon, sampleRes, cellWidth)
      }

      // Next get weather data from tomorrow.io or weatherapi.com
      let _wx
      if (this.weatherApi === 'weatherapi.com') {
        _wx = getWeatherapi(parms.lat, parms.lon, 1, 'fire')
      } else { // tomorrow.io
        _wx = getTomorrow(parms.lat, parms.lon, parms.start, parms.end, parms.timezone)
      }

      // Run requests in parallel...
      const esa = await _esa
      const wx = await _wx

      parms.elev = esa.elev
      parms.slope = 100 * esa.slopeRatio
      parms.aspect = esa.aspect

      // Add fire behavior to the weather record and return
      this.addFireBehavior(parms, wx)
      return { parms, wx }
    } catch (error) {
      console.log(`_FireBehaviorForecaster error`, error)
      throw new Error(`error: ${error}`)
    }
  }
}
