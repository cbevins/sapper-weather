import fetch from 'node-fetch'
import moment from 'moment'
import { getTimelines } from './routes/_forecast/_wxQuery-tomorrow.mjs'

async function thisThrows() {
    const now = moment.utc()
    const startTime = moment.utc(now).startOf('hour').toISOString() // "2019-03-20T14:09:50Z"
    const endTime = moment.utc(now).add(4, 'hours').toISOString()
    let _wx = getTimelines(47, -114, startTime, endTime, 'America/Denver')
    const wx = await _wx
    return wx
    // throw new Error("Thrown from thisThrows()");
}

async function myFunctionThatCatches() {
  try {
    //  Must use 'await', here, otherwise thisThrows() returns a rejected Promise on failure, and not a catchable error
    const result = await thisThrows(); // <-- Notice we added here the "await" keyword.
    console.log('myFunctionThatCatches() will return: ', result)
    return result
    // Because we 'await'ed, any rejected Promise will be caught by the catch()
  } catch (e) {
    console.log('myFunctionThatCatches() catch')
   console.error(e)
  } finally {
    console.log('myFunctionThatCatches() finally')
  }
  return "Nothing found";
}

async function run() {
    const myValue = await myFunctionThatCatches()
    console.log(myValue)
}

run()

// function checkError(response) {
//    if (response.status >= 200 && response.status <= 299) {
//     return response // or, return response.json()
//   } else {
//     // will be handled by catch()
//     throw Error(`'${response.url}' responded with status ${response.status}: '${response.statusText}'`)
//   }
// }
// const url = 'http://www.fire.org'
// fetch(url)
//   .then(checkError)
//   .then((jsonResponse) => {
//     // do whatever you want with the JSON response
//   })
//   .catch((error) => {
//   console.log(error)
// })

// Outptut:
// Error: Thrown from thisThrows()
//   ...stacktrace
// We do cleanup here
// Nothing found