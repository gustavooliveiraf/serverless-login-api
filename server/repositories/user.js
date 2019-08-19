const UserModel = require('db/models').User
const PhoneModel = require('db/models').Phone
const { message, errors, jwt, hash, constant } = require('server/utils')

const create = async (ctx, token) => {
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

const list = async ctx => {
  try {
    return await UserModel.findAll()
  } catch (err) {
    throw new Error()
  }
}

const update = async (id, guid) => {
  const token = jwt.generate(guid)
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

const findOne = async ctx => {
  try {
    return await UserModel.findOne({
      where: {
        guid: ctx.params.guid
      },
      include: [{
        model: PhoneModel,
        as: 'phones'
      }]
    })
  } catch (err) {
    throw err
  }
}

const signIn = async ctx => {
  try {
    const user = await UserModel.findOne({
      where: {
        email: ctx.payload.email
      },
      include: [{
        model: PhoneModel,
        as: 'phones'
      }]
    })

    if (!user) {
      return errors.notAcceptable(ctx, message.invalidUser)
    } else if (user && hash.compare(ctx.payload.password, user.password)) {
      const payload = await update(user.id, user.guid)
      user.dataValues.lastLogin = payload.lastLogin
      user.dataValues.token = payload.token
      delete user.dataValues.id
      delete user.dataValues.password

      formatFieldDate(user.dataValues)

      ctx.status = 200
      ctx.body = user
    } else {
      return errors.unauthorized(ctx, message.invalidUser)
    }
  } catch (err) {
    return errors.InternalServerError(ctx, err)
  }
}

const search = async ctx => {
  try {
    const user = await UserModel.findOne({
      where: {
        guid: ctx.params.guid
      }, attributes: {
        exclude: ['password']
      },
      include: [{
        model: PhoneModel,
        as: 'phones'
      }]
    })
    delete user.dataValues.id

    if (user && hash.compare(ctx.headers.authentication, user.token)) {
      if ((Date.now() - user.dataValues.createdAt.valueOf())/constant.msInMinute < constant.limLastLogin) {
        formatFieldDate(user.dataValues)
        
        ctx.status = 200
        ctx.body = user
      } else {
        return errors.unauthorized(ctx, message.invalidSession)
      }
    } else {
      return errors.unauthorized(ctx, message.unauthorized)
    }
  } catch (err) {
    return errors.InternalServerError(ctx, err)
  }
}

module.exports = {
  create,
  signIn,
  search,
  list,
  findOne
}
