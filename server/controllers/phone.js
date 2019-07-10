const PhoneModel = require('db/models').Phone
const { errors } = require('server/utils')

const create = async (req, res) => {
  try {
    let phones = []
    for (var i of req.payload.phones) {
      let phone = await PhoneModel.create({
        userId: req.payload.user.id,
        ...i
      })

      delete phone.dataValues.id
      delete phone.dataValues.userId
      delete phone.dataValues.updatedAt
      delete phone.dataValues.createdAt

      phones.push(phone)
    }

    return res.status(201).send({ ...req.payload.user.dataValues, phones })
  } catch (err) {
    return errors.InternalServerError(res, err)
  }
}

module.exports = {
  create
}
