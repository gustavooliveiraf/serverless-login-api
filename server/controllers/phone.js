const { errors } = require('server/utils')

const create = phoneRepository => {
  return async ctx => {
    try {
      const phones = await Promise.all(ctx.payload.phones.map( async elem => {
        const phone = await phoneRepository.create(ctx, elem)

        const { number, ddd } = phone.dataValues

        return { number, ddd }
      }))
      delete ctx.payload.user.id

      ctx.status = 201
      return ctx.body = { ...ctx.payload.user, phones }
    } catch (err) {
      return errors.InternalServerError(ctx, err)
    }
  }
}

module.exports = {
  create
}
