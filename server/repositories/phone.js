const PhoneModel = require('db/models').Phone

const create = async (ctx, elem) => {
  try {
    return await PhoneModel.create({
      userId: ctx.payload.user.id,
      ...elem
    })
  } catch (err) {
    throw err
  }
}

module.exports = {
  create
}
