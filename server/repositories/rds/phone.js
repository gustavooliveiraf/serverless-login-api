const PhoneModel = require('../../../db/rds/models').Phone;

const create = async (userId, elem) => PhoneModel.create({
  userId,
  ...elem,
});

module.exports = {
  create,
};
