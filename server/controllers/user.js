const UserModel = require('db/models').User
const { message, errors, hash, constant, formatDate } = require('server/utils')

const create = async (req, res, next) => {
  try {
    let user = await UserModel.findOrCreate({
      where: {
        email: req.payload.user.email
      }, defaults: {
        ...req.payload.user
      }
    })

    if (user[1]) {
      delete user[0].dataValues.password
      req.payload.user = user[0]
      formatFieldDate(req.payload.user.dataValues)

      next()
    } else {
      return errors.notAcceptable(res, message.emailAlreadyExists)
    }
  } catch (err) {
    return errors.InternalServerError(res, err)
  }
}

const update = async (id, lastLogin) => {
  return await UserModel.update({
    lastLogin
  }, {
    where: {
      id
    }
  })
}

const signIn = async (req, res) => {
  try {
    let user = await UserModel.findOne({
      where: {
        email: req.payload.email
      }
    })

    if (!user) {
      return errors.notAcceptable(res, message.invalidUser)
    } else if (user && hash.compare(req.query.password, user.password)) {
      let lastLogin = (new Date()).toISOString()
      await update(user.id, lastLogin)
      user.dataValues.lastLogin = lastLogin

      delete user.dataValues.password
      return res.status(200).send(user)
    } else {
      return errors.unauthorized(res, message.invalidUser)
    }
  } catch (err) {
    return errors.InternalServerError(res, err)
  }
}

const search = async (req, res) => {
  try {
    let user = await UserModel.findOne({
      where: {
        id: req.params.userId
      }, attributes: {
        exclude: ['password']
      }
    })

    if (user.token === req.headers.authentication) {
      if ((Date.now() - user.dataValues.createdAt.valueOf())/constant.msInMinute < constant.limLastLogin) {
        formatFieldDate(user.dataValues)
        return res.status(200).send(user)
      } else {
        return errors.unauthorized(res, message.invalidSession)
      }
    } else {
      return errors.unauthorized(res, message.unauthorized)
    }
  } catch (err) {
    return errors.InternalServerError(res, err)
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
  search
}
