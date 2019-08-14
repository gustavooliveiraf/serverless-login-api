const userRoute = require('./user')
const statusServerRoute = require('./statusServer')

module.exports = (app) => {
  app.use(userRoute.routes())
  app.use(statusServerRoute.routes())
}
