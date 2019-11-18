const dynamoDb = require('../../../db/dynamodb');
const { jwtGenerate, hash } = require('../../utils');

const USERS_TABLE = process.env.USERS_TABLE;

const findOrCreate = async (user, token) => {
  const params = {
    TableName: USERS_TABLE,
    Item: {
      ...user,
      token: hash.generate(token),
    },
  };

  dynamoDb.put(params, (error) => {
    if (error) {
      console.log(error);
      res.status(400).json(USERS_TABLE);
    }
    res.json(params);
  });

  return { ...user, teste: USERS_TABLE };
}

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
