const phoneRepository = require('./phone');

const UserModel = require('../../../db/rds/models').User;
const PhoneModel = require('../../../db/rds/models').Phone;
const { jwtGenerate, hash } = require('../../utils');

const findOrCreate = async (user, token) => {
  const { phones, ...userContext } = user;

  const userTemp = await UserModel.findOrCreate({
    where: {
      email: userContext.email,
    },
    defaults: {
      ...userContext,
      token: hash.generate(token),
    },
  });

  if (userTemp[1]) {
    await phoneRepository.create(userTemp[0].id, user.phones);

    return true;
  }

  return false;
};

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

const findOne = async (guid) => UserModel.findOne({
  where: {
    guid,
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
