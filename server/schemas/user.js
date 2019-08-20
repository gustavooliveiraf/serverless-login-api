const { Joi, constant, minDomainSegments } = require('server/utils')

const userBody = Joi.object().keys({
  name: Joi.string().max(constant.maxString).required(),
  email: Joi.string().email({ minDomainSegments }).lowercase().required(),
  password: Joi.string().max(constant.maxString).required(),
  cep: Joi.string().max(constant.maxString).required()
})

const userModel = Joi.object().keys({
  name: Joi.string().max(constant.maxString).required(),
  email: Joi.string().email({ minDomainSegments }).lowercase().required(),
  password: Joi.string().max(constant.maxString).required(),
  guid: Joi.string().max(constant.maxString).required(),
  lastLogin: Joi.date().required(),
  cep: Joi.string().max(constant.maxString).required()
})

const signIn = Joi.object().keys({
  email: Joi.string().email({ minDomainSegments }).lowercase().required(),
  password: Joi.string().max(constant.maxString).required(),
})

module.exports = {
  userBody,
  userModel,
  signIn
}
