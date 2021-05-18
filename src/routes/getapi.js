import fetch from 'node-fetch'
export async function get (req, res, next) {
  fetch('https://jsonplaceholder.typicode.com/todos/1', { method: 'GET' })
    .then(response => response.json())
    .then(json => {console.log(json); return json})
    .then(json => {
      res.writeHead(200, {
        'Content-Type': 'application/json'
      });
      res.end(JSON.stringify(json))
    })
}
