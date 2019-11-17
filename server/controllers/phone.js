const { errors } = require('../utils');

const create = (phoneRepository) => async (req, res) => {
  try {
    const phones = await Promise.all(req.payload.phones.map(async (elem) => {
      const phone = await phoneRepository.create(req.payload.user.id, elem);

      const { number, ddd } = phone.dataValues;

      return { number, ddd };
    }));
    delete req.payload.user.id;

    return res.status(201).send({ ...req.payload.user, phones });
  } catch (err) {
    return errors.internalServerError(res, err);
  }
};

module.exports = {
  create,
};
