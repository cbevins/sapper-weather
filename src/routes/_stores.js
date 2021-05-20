import { writable } from 'svelte/store';

export const loc = writable({
  lat: 46.859340,
  lon: -113.975528,
  tz: 'America/Denver',
  name: 'The "M"'
})

// Google elevation data store
export const gel = writable(null)

// MapQuest elevation data store
export const mel = writable(null)

// Tomorrow.io data store
export const twx = writable(null)

// USGS elevation data store
export const uel = writable(null)

// WeatherApi.com data store
export const wwx = writable(null)
