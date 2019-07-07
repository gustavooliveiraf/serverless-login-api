const { Joi } = require('server/utils')
const schema = require('server/schemas/phone')

const create = (req, res, next) => {
  let payload = req.body.phones

  const { error, value } = Joi.validate(payload, schema)

  if ( error === null ) {
    req.payload.phones = value
    next()
  } else {
    return errors.badData(res, error.details)
  }
}

module.exports = {
  create,
}
