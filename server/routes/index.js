const userRoute = require('./user')
const statusServerRoute = require('./statusServer')

module.exports = (app) => {
  app.use(userRoute)
  app.use(statusServerRoute)
}
