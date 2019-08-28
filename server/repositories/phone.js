const PhoneModel = require('db/models').Phone;

const create = async (ctx, elem) => {
  const phoneModel = await PhoneModel.create({
    userId: ctx.payload.user.id,
    ...elem,
  });

  return phoneModel;
};

module.exports = {
  create,
};
