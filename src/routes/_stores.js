import { writable } from 'svelte/store';

// WeatherAPI Location object returned by current, forecast, and timezone services
// Set by 1location.svelte
export const loc = writable(null)

// Elevation, slope, aspect object
// Set euqal to gel, mel, or uel by 2esa.svelte
export const esa = writable(null)

export const esaSource = writable('MapQuest')

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
