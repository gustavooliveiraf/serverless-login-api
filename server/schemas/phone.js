const { Joi } = require('server/utils')

let phone = Joi.object().keys({
  numero: Joi.number().integer().required(),
  ddd: Joi.number().integer().min(10).max(99).required(),
})

let phones = Joi.array().items(phone)

module.exports = phones
