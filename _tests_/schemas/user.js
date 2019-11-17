const { Joi, constant, minDomainSegments } = require('../../server/utils');
const phones = require('./phone');

const userValidatorSchema = Joi.object().keys({
  name: Joi.string().max(constant.maxString).required(),
  email: Joi.string().email({ minDomainSegments }).lowercase().required(),
  password: Joi.string().max(constant.maxString).required(),
  guid: Joi.string().max(constant.maxString).required(),
  lastLogin: Joi.date().required(),
  cep: Joi.string().max(constant.maxString).required(),
});

const userControllerSchema = Joi.object().keys({
  name: Joi.string().max(constant.maxString).required(),
  email: Joi.string().email({ minDomainSegments }).lowercase().required(),
  guid: Joi.string().max(constant.maxString).required(),
  lastLogin: Joi.date().required(),
  token: Joi.string().max(constant.maxString).required(),
  cep: Joi.string().max(constant.maxString).required(),
  updatedAt: Joi.string().max(constant.maxString).required(),
  createdAt: Joi.string().max(constant.maxString).required(),
  geolocation: Joi.object().keys({
    type: Joi.string().max(constant.maxString).required(),
    coordinates: Joi.array().items(Joi.number()),
  }),
  phones,
});

const userValidatorSchemaSignIn = Joi.object().keys({
  email: Joi.string().email({ minDomainSegments }).lowercase().required(),
  password: Joi.string().max(constant.maxString).required(),
});

module.exports = {
  userValidatorSchema,
  userControllerSchema,
  userValidatorSchemaSignIn,
};
