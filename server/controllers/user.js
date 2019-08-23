const { message, errors, jwtGenerate, hash, constant, formatDate } = require('server/utils')

const create = userRepository => {
  return async (ctx, next) => {
    try {
      const token = jwtGenerate(ctx.payload.user.email)
      let user = await userRepository.create(ctx, token)

      if (user[1]) {
        user = user[0].dataValues
        ctx.payload.user = user

        formatUser(ctx.payload.user, token)

        return await next(ctx.payload.user)
      } else {
        return errors.badRequest(ctx, message.emailAlreadyExists)
      }
    } catch (err) {
      return errors.InternalServerError(ctx, err)
    }
  }
}

const findAll = userRepository => {
  return async (ctx, next) => {
    const response = await userRepository.findAll()

    ctx.body = response
  }
}

const signIn = userRepository => {
  return async (ctx, next) => {
    try {
      let user = await userRepository.findByEmail(ctx)

      if (!user) {
        return errors.notAcceptable(ctx, message.invalidUser)
      } else if (user && hash.compare(ctx.payload.password, user.dataValues.password)) {
        user = user.dataValues

        const payload = await userRepository.update(user.id, user.guid)

        formatUser(user, payload.token, payload.lastLogin)

        ctx.status = 200
        return ctx.body = user
      } else {
        return errors.unauthorized(ctx, message.invalidUser)
      }
    } catch (err) {
      return errors.InternalServerError(ctx, err)
    }
  }
}

const search = async (ctx, next) => {
  try {
    const user = await userRepository.findByGuid(ctx)
    delete user.dataValues.id

    if (user && hash.compare(ctx.headers.authentication, user.token)) {
      if ((Date.now() - user.dataValues.createdAt.valueOf())/constant.msInMinute < constant.limLastLogin) {
        formatFieldDate(user.dataValues)
        
        ctx.status = 200
        return ctx.body = user
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

const formatUser = (user, token, lastLogin) => {
  user.token = token

  user.geolocation = {
    type: 'Point',
    coordinates: [
      user.lat,
      user.lng
    ]
  }

  delete user.lat
  delete user.lng
  delete user.password

  if (lastLogin) { // signIn
    user.lastLogin = lastLogin
    delete user.id
  }

  formatFieldDate(user)
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
  findAll
}
