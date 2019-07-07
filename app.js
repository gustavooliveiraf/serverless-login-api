const app = require('express')()
const port = require('config').port
const middlewares = require('server/utils/middlewares')
const routes = require('server/routes')

middlewares(app)
routes(app)

app.listen(port)
