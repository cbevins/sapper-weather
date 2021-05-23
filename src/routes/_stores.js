import { writable } from 'svelte/store';

// WeatherAPI Location object returned by surrent, forecast, and timezone services
export const loc = writable(null)

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
