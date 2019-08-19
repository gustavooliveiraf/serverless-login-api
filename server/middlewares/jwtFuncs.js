const jwt  = require('jsonwebtoken')

const { secret } = require('config')
const message = require('../utils/staticMessages')
const errors = require('../utils/errors')

const offset = 'Bearer'.length + 1

const generate = (payload) => {
  return jwt.sign(
    { payload },
    secret
    // { expiresIn: constant.msInMinute * constant.limLastLogin }
  )
}

const auth = async (ctx, next) => {
  try {
    ctx.headers.authentication = ctx.headers.authentication.substr(offset)
    jwt.verify(ctx.headers.authentication, secret)

    await next()
  } catch (err) {
    return errors.unauthorized(ctx, message.unauthorized)
  }
}

module.exports = {
  generate,
  auth
}
