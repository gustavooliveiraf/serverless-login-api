const {
  Joi, uuid, hash, errors, CustomError,
} = require('server/utils');
const schema = require('./schemas/user');

const create = async (ctx, next) => {
  try {
    const { phones, ...payload } = ctx.request.body;

    const { error, value } = Joi.validate(payload, schema.userBody);

    if (error === null) {
      value.guid = uuid();
      value.password = hash.generate(value.password);
      value.lastLogin = new Date();

      ctx.payload = {};
      ctx.payload.user = value;

      return await next(payload.value);
    }

    throw new CustomError(error.details);
  } catch (err) {
    return errors.badData(ctx, err);
  }
};

const signIn = async (ctx, next) => {
  const payload = ctx.request.body;
  const { error, value } = Joi.validate(payload, schema.signIn);

  try {
    if (error === null) {
      ctx.payload = value;
      return await next(value);
    }
    throw new CustomError(error.details);
  } catch (err) {
    return errors.badData(ctx, err);
  }
};

module.exports = {
  create,
  signIn,
};
