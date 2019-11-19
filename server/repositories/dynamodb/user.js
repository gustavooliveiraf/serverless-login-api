const dynamoDb = require('../../../db/dynamodb');
const { hash } = require('../../utils');

const { USERS_TABLE } = process.env;

const findOrCreate = async (user, token) => {
  try {
    const paramsGet = {
      TableName: USERS_TABLE,
      IndexName: 'findByEmail',
      KeyConditionExpression: 'email = :email',
      ExpressionAttributeValues: {
        ':email': user.email,
      },
    };

    const getUser = await dynamoDb.query(paramsGet).promise();
    if (Object.keys(getUser.Items).length > 0) return false;

    const paramsPut = {
      TableName: USERS_TABLE,
      Item: {
        ...user,
        token: hash.generate(token),
      },
    };

    await dynamoDb.put(paramsPut).promise();

    return true;
  } catch (err) {
    // log(err)
    console.log(err);
    return false;
  }
};

const findOne = async (guid) => {
  try {
    const params = {
      TableName: USERS_TABLE,
      Key: {
        guid,
      },
    };

    const user = await dynamoDb.get(params).promise();

    return user.Item;
  } catch (err) {
    // log(err)
    console.log(err);
    return false;
  }
};

module.exports = {
  findOrCreate,
  findOne,
};
