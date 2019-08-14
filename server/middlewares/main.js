const bodyParser = require('koa-bodyparser')
const checkSetContentType = require('./checkSetContentType')
const { envDevelopment } = require('config')

module.exports = (app) => {
  app.use((ctx, next) => checkSetContentType(ctx, next))

  app.use(bodyParser())

  if (envDevelopment) app.use(require('koa-logger')())
}
