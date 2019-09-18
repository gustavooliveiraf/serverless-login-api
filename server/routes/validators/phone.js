const { Joi, errors, CustomError } = require('server/utils');
const schema = require('./schemas/phone');

const create = async (req, res, next) => {
  try {
    const payload = req.body.phones;

    const { error, value } = Joi.validate(payload, schema);

    if (error === null) {
      req.payload.phones = value || [];
      return next();
    }
    throw new CustomError(error.details);
  } catch (err) {
    return errors.badData(res, err);
  }
};

module.exports = {
  create,
};
