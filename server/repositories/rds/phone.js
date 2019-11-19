const PhoneModel = require('../../../db/rds/models').Phone;
const { errors } = require('../../utils');

const phoneRepository = {
  create: async (userId, elem) => PhoneModel.create({
    userId,
    ...elem,
  }),
};

const create = async (userId, phones) => {
  try {
    return Promise.all(phones.map(async (elem) => phoneRepository.create(userId, elem)));
  } catch (err) {
    return errors.internalServerError({}, err);
  }
};

module.exports = {
  create,
};
