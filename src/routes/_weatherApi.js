export const get = async (lat, lon, ndays) => {
  const url = 'https://api.weatherapi.com/v1/forecast.json'
  const key = '43956b1f6760417db1d182743212704'
  const query = `${url}?key=${key}&days=${ndays}&q=${lat},${lon}&aqi=no&alerts=no`
  try {
    const response = await fetch(query, { method: 'GET' })
      .catch((error) => console.error('weatherap.com fetch error: ' + error))
    return await response.json()
  } catch (error) {
    console.log('ERROR _weatherApi.js grab(): ', error)
  }
}
