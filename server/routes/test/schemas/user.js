const { Joi, constant, minDomainSegments } = require('server/utils')

module.exports = {
  userModel: Joi.object().keys({
    name: Joi.string().max(constant.maxString).required(),
    email: Joi.string().email({ minDomainSegments }).lowercase().required(),
    password: Joi.string().max(constant.maxString).required(),
    guid: Joi.string().max(constant.maxString).required(),
    lastLogin: Joi.date().required(),
    cep: Joi.string().max(constant.maxString).required()
  })
}
