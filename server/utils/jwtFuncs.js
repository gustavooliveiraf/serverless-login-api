const jwt  = require('jsonwebtoken')

const { secret } = require('config')
const message = require('./staticMessages')
const errors = require('./errors')

const generate = (guid) => {
  return jwt.sign(
    { guid },
    secret
    // { expiresIn: constant.msInMinute * constant.limLastLogin }
  )
}

const auth = async (req, res, next) => {
  try {
    let offset = 'Bearer'.length + 1
    req.headers.authentication = req.headers.authentication.substr(offset)
    jwt.verify(req.headers.authentication, secret)

    next()
  } catch (err) {
    return errors.unauthorized(res, message.unauthorized)
  }
}

module.exports = {
  generate,
  auth
}
