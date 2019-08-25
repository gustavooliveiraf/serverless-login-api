const UserModel = require('db/models').User
const PhoneModel = require('db/models').Phone
const { message, errors, jwtGenerate, hash, constant } = require('server/utils')

const findOrCreate = async (ctx, token) => {
  try {
    const user = await UserModel.findOrCreate({
      where: {
        email: ctx.payload.user.email
      }, defaults: {
        ...ctx.payload.user,
        token: hash.generate(token)
      }
    })

    return user
  } catch (err) {
    throw err
  }
}

const update = async (id, guid) => {
  const token = jwtGenerate(guid)
  const payload = {
    token: hash.generate(token),
    lastLogin: new Date()
  }

  await UserModel.update({
    ...payload
  }, {
    where: {
      id
    }
  })

  return  {
    token,
    lastLogin: payload.lastLogin
  }
}

const findOne = async (field, value) => {
  try {
    return await UserModel.findOne({
      where: {
        [field]: value
      },
      include: [{
        model: PhoneModel,
        as: 'phones',
        attributes: ['number', 'ddd']
      }]
    })
  } catch (err) {
    throw err
  }
}

module.exports = {
  findOrCreate,
  update,
  findOne
}
