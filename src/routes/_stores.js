import { derived, writable } from 'svelte/store';

export const location = writable({
  lat: 46.859340,
  lon: -113.975528,
  name: 'The "M"'
})

// export const weather = derived(
//   location,
//   $location => getWeather(location)
// }
