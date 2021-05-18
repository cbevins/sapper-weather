import moment from 'moment'
import { getTimelines } from './_models/wxQuery-tomorrow.mjs'

export async function post (req, res, next) {
  console.log('server: BEGIN post()')
  try {
    const {lat, lon, timezone, hours} = req.body
    const now = moment.utc()
    const startTime = moment.utc(now).startOf('hour').toISOString() // "2019-03-20T14:09:50Z"
    const endTime = moment.utc(now).add(hours, 'hours').toISOString()
    let _wx = getTimelines(lat, lon, startTime, endTime, timezone)
    const wx = await _wx

    if (typeof wx.error !== "undefined") {
      console.log(wx.error)
      throw new Error(wx.error);
    }

    res.writeHead(200, {
      'Content-Type': 'application/json'
    });
    res.end(JSON.stringify(wx));
  } catch (error) {
    console.log(error.message)
    res.end(JSON.stringify({ error: error.message }));
  }
}
