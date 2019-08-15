const userRoute = require('./user')
const statusServerRoute = require('./statusServer')
const routeNotFound = require('./routeNotFound')

module.exports = (app) => {
  app.use(userRoute.routes())
  app.use(statusServerRoute.routes())
  app.use(routeNotFound.routes())
}
