const userRoute = require('./user')
const statusServerRoute = require('./statusServer')
const picture = require('./picture')

module.exports = (app) => {
  app.use(userRoute)
  app.use(statusServerRoute)
  app.use(picture)
}
