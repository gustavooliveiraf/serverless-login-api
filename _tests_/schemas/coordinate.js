const { Joi } = require('../../server/utils');

const coordinate = Joi.object().keys({
  lat: Joi.number().required(),
  lng: Joi.number().required(),
});

module.exports = coordinate;
