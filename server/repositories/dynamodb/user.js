const dynamoDb = require('../../../db/dynamodb');
const { hash } = require('../../utils');

const { USERS_TABLE } = process.env;

const findOrCreate = async (user, token) => {
  try {
    // let params = {
    //   TableName: USERS_TABLE,
    //   Key: {
    //     email: user.email,
    //   },
    // };

    // console.log(user)
    // const getUser = await dynamoDb.get(params).promise();
    // if (Object.keys(getUser).length > 0) return false;

    params = {
      TableName: USERS_TABLE,
      Item: {
        ...user,
        token: hash.generate(token),
      },
    };

    await dynamoDb.put(params).promise();

    return true;
  } catch (err) {
    // log(err)
    console.log(err)
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

    console.log(user)

    return user.Item;
  } catch (err) {
    // log(err)
    console.log(err)
    return false;
  }
};

module.exports = {
  findOrCreate,
  findOne,
};
