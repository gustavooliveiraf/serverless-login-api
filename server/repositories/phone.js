const PhoneModel = require('../../db/models').Phone;

const create = async (userId, elem) => PhoneModel.create({
  userId,
  ...elem,
});

module.exports = {
  create,
};
