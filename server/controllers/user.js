const { message, errors, jwtGenerate, hash, constant, formatDate } = require('server/utils')

const create = userRepository => {
  return async (ctx, next) => {
    try {
      const token = jwtGenerate(ctx.payload.user.email)
      let user = await userRepository.findOrCreate(ctx, token)

      if (user[1]) {
        user = user[0].dataValues
        ctx.payload.user = user

        formatUser(ctx.payload.user, false, token)

        return await next(ctx.payload.user)
      } else {
        return errors.badRequest(ctx, message.emailAlreadyExists)
      }
    } catch (err) {
      return errors.InternalServerError(ctx, err)
    }
  }
}

const signIn = userRepository => {
  return async (ctx, next) => {
    try {
      let user = await userRepository.findOne('email', ctx.payload.email)

      if (!user) {
        return errors.badData(ctx, message.invalidUser)
      } else if (user && hash.compare(ctx.payload.password, user.dataValues.password)) {
        user = user.dataValues

        const payload = await userRepository.update(user.id, user.guid)

        formatUser(user, true, payload.token, payload.lastLogin)

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

const search = userRepository => {
  return async (ctx, next) => {
    try {
      let user = await userRepository.findOne('guid', ctx.params.guid)

      if (user && hash.compare(ctx.headers.authentication, user.dataValues.token)) {
        user = user.dataValues
        if ((Date.now() - user.createdAt.valueOf())/constant.msInMinute < constant.limLastLogin) {
          formatUser(user, true)
          
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
}

const formatUser = (user, id, token, lastLogin) => {
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
  id ? ( delete user.id ) : null
  token ? ( user.token = token ) : null
  lastLogin ? ( user.lastLogin = lastLogin ) : null

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
  search
}
