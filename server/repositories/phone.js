const PhoneModel = require('db/models').Phone

const create = async (ctx, elem) => {
  try {
    const phoneModel = await PhoneModel.create({
      userId: ctx.payload.user.id,
      ...elem
    })

    return phoneModel
  } catch (err) {
    throw err
  }
}

module.exports = {
  create
}
