export function post (req, res, next) {
  console.log('server: BEGIN postapi.js post()')
  console.log(`server: Hello from postapi.js: ${(req)}`)
  console.log(`server: req.method: ${req.method}`)
  console.log(`server: req.headers: ${req.headers}`)
  console.log(`server: req.body: ${req.body}`)
  console.log(`server: req.body.data: ${req.body.data}`)
  console.log(`server: req.params: ${req.params}`)
}
