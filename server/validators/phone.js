const { Joi, errors, CustomError } = require('server/utils')
const schema = require('server/schemas/phone')

const create = async (ctx, next) => {
  try {
    const payload = ctx.request.body.phones

    const { error, value } = Joi.validate(payload, schema)

    if ( error === null ) {
      ctx.payload.phones = value || []
      return await next(value)
    } else {
      throw new CustomError(error.details)
    }
  } catch (err) {
    return errors.badData(ctx, err)
  }
}

module.exports = {
  create,
}
