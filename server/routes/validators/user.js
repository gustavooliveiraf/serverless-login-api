const {
  Joi, uuid, hash, errors, CustomError,
} = require('server/utils');
const schema = require('./schemas/user');

const create = async (req, res, next) => {
  try {
    const { phones, ...payload } = req.body;

    const { error, value } = Joi.validate(payload, schema.userBody);

    if (error === null) {
      value.guid = uuid();
      value.password = hash.generate(value.password);
      value.lastLogin = new Date();

      req.payload = {};
      req.payload.user = value;

      return next(payload.value);
    }

    throw new CustomError(error.details);
  } catch (err) {
    return errors.badData(res, err);
  }
};

const signIn = async (req, res, next) => {
  const payload = req.body;
  const { error, value } = Joi.validate(payload, schema.signIn);

  try {
    if (error === null) {
      req.payload = value;
      return next();
    }
    throw new CustomError(error.details);
  } catch (err) {
    return errors.badData(res, err);
  }
};

module.exports = {
  create,
  signIn,
};
