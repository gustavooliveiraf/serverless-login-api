const { Joi, uuid, jwt, hash, errors } = require('server/utils')
const schema = require('server/schemas/user')

const create = (req, res, next) => {
  let { password, phones, ...payload } = req.body
  let token = jwt.generate(payload.guid)

  payload.guid = uuid()
  payload.token = hash.generate(token)
  payload.password = hash.generate(password)
  payload.lastLogin = new Date()

  const { error, value } = Joi.validate(payload, schema.signUp)

  if ( error === null ) {
    req.token = token
    req.payload = {}
    req.payload.user = value

    next()
  } else {
    return errors.badData(res, error.details)
  }
}

const signIn = (req, res, next) => {
  const payload = req.query
  const { error, value } = Joi.validate(payload, schema.signIn)

  if ( error === null ) {
    req.payload = value
    next()
  } else {
    return errors.badData(res, error.details)
  }
}

module.exports = {
  create,
  signIn
}
