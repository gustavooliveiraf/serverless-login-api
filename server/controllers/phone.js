const PhoneModel = require('db/models').Phone
const { errors } = require('server/utils')

const create = async ctx => {
  try {
    const phones = []
    for (var i of ctx.payload.phones) {
      const phone = await PhoneModel.create({
        userId: ctx.payload.user.id,
        ...i
      })

      delete phone.dataValues.id
      delete phone.dataValues.userId
      delete phone.dataValues.updatedAt
      delete phone.dataValues.createdAt

      phones.push(phone)
    }

    ctx.status = 201
    ctx.body = { ...ctx.payload.user.dataValues, phones }
  } catch (err) {
    return errors.InternalServerError(ctx, err)
  }
}

module.exports = {
  create
}
