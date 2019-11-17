const UserModel = require('../../db/models').User;
const PhoneModel = require('../../db/models').Phone;
const { jwtGenerate, hash } = require('../utils');

const findOrCreate = async (user, token) => UserModel.findOrCreate({
  where: {
    email: user.email,
  },
  defaults: {
    ...user,
    token: hash.generate(token),
  },
});

const update = async (id, guid) => {
  const token = jwtGenerate(guid);
  const payload = {
    token: hash.generate(token),
    lastLogin: new Date(),
  };

  await UserModel.update({
    ...payload,
  }, {
    where: {
      id,
    },
  });

  return {
    token,
    lastLogin: payload.lastLogin,
  };
};

const findOne = async (field, value) => UserModel.findOne({
  where: {
    [field]: value,
  },
  include: [{
    model: PhoneModel,
    as: 'phones',
    attributes: ['number', 'ddd'],
  }],
});

module.exports = {
  findOrCreate,
  update,
  findOne,
};
