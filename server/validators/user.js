const { Joi, uuid, hash, errors, CustomError } = require('server/utils')
const schema = require('server/schemas/user')

const create = async (ctx, next) => {
  try {
    const { phones, ...payload } = ctx.request.body

    let { error, value } = Joi.validate(payload, schema.userBody)

    if ( error === null ) {
      value.guid = uuid()
      value.password = hash.generate(value.password)
      value.lastLogin = new Date()

      const { error, ...payload } = Joi.validate(value, schema.userModel)

      if (error === null) {
        ctx.payload = {}
        ctx.payload.user = payload.value

        return await next(payload.value)
      } else {
        throw new CustomError(error.details)
      }
    } else {
      throw new CustomError(error.details)
    }
  } catch (err) {
    return errors.badData(ctx, err)
  }
}

const signIn = async (ctx, next) => {
  const payload = ctx.request.body
  const { error, value } = Joi.validate(payload, schema.signIn)

  try {
    if ( error === null ) {
      ctx.payload = value
      await next()
    } else {
      throw new CustomError(error.details)
    }
  } catch (err) {
    return errors.badData(ctx, err)
  }
}

module.exports = {
  create,
  signIn
}
