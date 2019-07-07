const cors = require('cors')
const bodyParser = require('body-parser')
const { envDevelopment } = require('config')

module.exports = (app) => {
  app.use(cors())
  app.use(bodyParser.json())
  if (envDevelopment) app.use(require('morgan')('dev'))
}
