const PhoneModel = require('db/models').Phone
const { errors, formatDate } = require('server/utils')

const create = async (req, res) => {
  try {
    let phones = []
    for (var i of req.payload.phones) {
      let phone = await PhoneModel.create({
        userId: req.payload.user.id,
        ...i
      })

      formatFieldDate(phone.dataValues)
      phones.push(phone)
    }

    return res.status(201).send({ ...req.payload.user.dataValues, phones })
  } catch (err) {
    return errors.InternalServerError(res, err)
  }
}

const formatFieldDate = (user) => {
  user.createdAt = formatDate(user.createdAt)
  user.updatedAt = formatDate(user.updatedAt)
}

module.exports = {
  create
}
