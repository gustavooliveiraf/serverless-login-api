const { Joi } = require('server/utils')

const phone = Joi.object().keys({
  number: Joi.number().integer().min(10000).max(999999999999).required(),
  ddd: Joi.number().integer().min(10).max(99).required()
})

const phones = Joi.array().items(phone)

module.exports = phones
