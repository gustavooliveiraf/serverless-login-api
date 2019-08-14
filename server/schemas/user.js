const { Joi, constant, minDomainSegments } = require('server/utils')

module.exports = {
  signUp: Joi.object().keys({
    name: Joi.string().max(constant.maxString).required(),
    email: Joi.string().email({ minDomainSegments }).lowercase().required(),
    password: Joi.string().max(constant.maxString).required(),
    guid: Joi.string().max(constant.maxString).required(),
    lastLogin: Joi.date().required(),
    token: Joi.string().max(constant.maxString).required(),
    cep: Joi.string().max(constant.maxString).required()
  }),
  signIn: Joi.object().keys({
    email: Joi.string().email({ minDomainSegments }).lowercase().required(),
    password: Joi.string().max(constant.maxString).required(),
  })
}
