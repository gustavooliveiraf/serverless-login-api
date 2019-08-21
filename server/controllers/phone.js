const phoneRepository = require('../repositories/phone')
const { errors } = require('server/utils')

const create = async ctx => {
  try {
    const phones = await Promise.all(ctx.payload.phones.map( async elem => {
      const phone = await phoneRepository.create(ctx, elem)

      delete phone.dataValues.id
      delete phone.dataValues.userId
      delete phone.dataValues.updatedAt
      delete phone.dataValues.createdAt

      return phone
    }))

    ctx.status = 201
    ctx.body = { ...ctx.payload.user, phones }
  } catch (err) {
    return errors.InternalServerError(ctx, err)
  }
}

module.exports = {
  create
}
