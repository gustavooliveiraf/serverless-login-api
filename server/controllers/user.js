const UserModel = require('db/models').User
const PhoneModel = require('db/models').Phone
const { message, errors, jwt, hash, constant, formatDate } = require('server/utils')

const create = async (ctx, next) => {
  try {
    const user = await UserModel.findOrCreate({
      where: {
        email: ctx.payload.user.email
      }, defaults: {
        ...ctx.payload.user
      }
    })

    if (user[1]) {
      delete user[0].dataValues.password
      ctx.payload.user = user[0]
      ctx.payload.user.dataValues.token = ctx.token
      ctx.payload.user.dataValues.geolocation = {
        type: "Point",
        coordinates: [
          ctx.payload.user.dataValues.lat,
          ctx.payload.user.dataValues.lng
        ]
      }
      delete ctx.payload.user.dataValues.lat
      delete ctx.payload.user.dataValues.lng
      formatFieldDate(ctx.payload.user.dataValues)

      await next()
    } else {
      return errors.badRequest(ctx, message.emailAlreadyExists)
    }
  } catch (err) {
    return errors.InternalServerError(ctx, err)
  }
}

const list = async ctx => {
  const response = await UserModel.findAll()

  ctx.body = response
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

const signIn = async (ctx, next) => {
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
    } else if (user && hash.compare(ctx.body.password, user.password)) {
      const payload = await update(user.id, user.guid)
      user.dataValues.lastLogin = payload.lastLogin
      user.dataValues.token = payload.token
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

const search = async (ctx, next) => {
  try {
    const user = await UserModel.findOne({
      where: {
        id: ctx.params.userId
      }, attributes: {
        exclude: ['password']
      },
      include: [{
        model: PhoneModel,
        as: 'phones'
      }]
    })

    console.log(ctx.headers.authentication)
    console.log(`-----------`)
    console.log(user.dataValues)

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

const getGuid = async (ctx, next) => {
  try {
    const user = await UserModel.findOne({
      where: {
        id: ctx.params.userId
      }, attributes: ['guid']
    })

    ctx.payload = {}
    ctx.payload.guid = user.guid

    next()
  } catch (err) {
    return errors.InternalServerError(ctx, err)
  }
}

const formatFieldDate = (user) => {
  user.createdAt = formatDate(user.createdAt)
  user.updatedAt = formatDate(user.updatedAt)
  user.lastLogin = formatDate(user.lastLogin)
}

module.exports = {
  create,
  signIn,
  search,
  getGuid,
  list
}
