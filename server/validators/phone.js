const { Joi, errors } = require('server/utils')
const schema = require('server/schemas/phone')

const create = async (ctx, next) => {
  const payload = ctx.request.body.phones

  const { error, value } = Joi.validate(payload, schema)

  if ( error === null ) {
    ctx.payload.phones = value || []
    await next()
  } else {
    return errors.badData(ctx, error.details)
  }
}

module.exports = {
  create,
}