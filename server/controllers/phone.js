const PhoneModel = require('db/models').Phone
const { errors } = require('server/utils')

const create = async (req, res) => {
  try {
    for (var i of req.payload.phones) {
      await PhoneModel.create({
        userId: req.payload.user.id,
        ...i
      })
    }

    return res.status(201).send(req.payload.user)
  } catch (err) {
    return errors.InternalServerError(res, err)
  }
}

module.exports = {
  create
}
