const { Joi, uuid, jwt, hash, errors } = require('server/utils')
const schema = require('server/schemas/user')

const create = async (ctx, next) => {
  const { password, phones, ...payload } = ctx.request.body
  const token = jwt.generate(payload.guid)

  payload.guid = uuid()
  payload.token = hash.generate(token)
  payload.password = hash.generate(password)
  payload.lastLogin = new Date()

  const { error, value } = Joi.validate(payload, schema.signUp)

  if ( error === null ) {
    ctx.token = token
    ctx.payload = {}
    ctx.payload.user = value

    await next()
  } else {
    return errors.badData(ctx, error.details)
  }
}

const signIn = (ctx, next) => {
  const payload = ctx.request.body
  const { error, value } = Joi.validate(payload, schema.signIn)

  if ( error === null ) {
    ctx.payload = value
    next()
  } else {
    return errors.badData(ctx, error.details)
  }
}

module.exports = {
  create,
  signIn
}
