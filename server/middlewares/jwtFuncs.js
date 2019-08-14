const jwt  = require('jsonwebtoken')

const { secret } = require('config')
const message = require('../utils/staticMessages')
const errors = require('../utils/errors')

const offset = 'Bearer'.length + 1

const generate = (guid) => {
  return jwt.sign(
    { guid },
    secret
    // { expiresIn: constant.msInMinute * constant.limLastLogin }
  )
}

const auth = async (ctx, next) => {
  try {
    ctx.headers.authentication = req.headers.authentication.substr(offset)
    jwt.verify(ctx.headers.authentication, secret)

    next()
  } catch (err) {
    return errors.unauthorized(ctx, message.unauthorized)
  }
}

module.exports = {
  generate,
  auth
}
