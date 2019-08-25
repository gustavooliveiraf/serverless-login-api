const Koa = require('koa')

const middlewares = require('server/middlewares/main')
const routes = require('server/routes')

const app = new Koa()

middlewares(app)
routes(app)

module.exports = app
