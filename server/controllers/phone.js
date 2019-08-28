const { errors } = require('server/utils');

const create = (phoneRepository) => async (ctx) => {
  try {
    const phones = await Promise.all(ctx.payload.phones.map(async (elem) => {
      const phone = await phoneRepository.create(ctx, elem);

      const { number, ddd } = phone.dataValues;

      return { number, ddd };
    }));
    delete ctx.payload.user.id;

    ctx.status = 201;
    ctx.body = { ...ctx.payload.user, phones };

    return ctx.body;
  } catch (err) {
    return errors.internalServerError(ctx, err);
  }
};

module.exports = {
  create,
};
