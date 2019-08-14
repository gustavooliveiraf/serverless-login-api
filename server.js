const Koa = require('koa');

const port = require('config').port
const middlewares = require('server/middlewares/main')
const routes = require('server/routes')

const app = new Koa()

middlewares(app)
routes(app)

app.listen(port)
