import sirv from 'sirv'
import express from 'express'
import compression from 'compression'
import * as sapper from '@sapper/server'

const app = express()
const { PORT, NODE_ENV } = process.env
const dev = NODE_ENV === 'development'

console.log ('\n\nserver.js started at: ', Date.now())

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(
		compression({ threshold: 0 }),
		sirv('static', { dev }),
		sapper.middleware()
	)
	.listen(PORT, err => {
		if (err) console.log('app.use() error', err)
	})
