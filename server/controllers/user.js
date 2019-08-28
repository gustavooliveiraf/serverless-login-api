const {
  message, errors, jwtGenerate, hash, constant, formatDate,
} = require('server/utils');

const formatFieldDate = (user) => {
  const userContext = { ...user };

  userContext.createdAt = formatDate(userContext.createdAt);
  userContext.updatedAt = formatDate(userContext.updatedAt);
  userContext.lastLogin = formatDate(userContext.lastLogin);

  return userContext;
};

const formatUser = (user, id, token, lastLogin) => {
  const userContext = { ...user };

  userContext.geolocation = {
    type: 'Point',
    coordinates: [
      userContext.lat,
      userContext.lng,
    ],
  };

  delete userContext.lat;
  delete userContext.lng;
  delete userContext.password;
  if (id) delete userContext.id;
  if (token) userContext.token = token;
  if (lastLogin) userContext.lastLogin = lastLogin;

  return formatFieldDate(userContext);
};

const create = (userRepository) => async (ctx, next) => {
  try {
    const token = jwtGenerate(ctx.payload.user.email);
    let user = await userRepository.findOrCreate(ctx, token);

    if (user[1]) {
      user = user[0].dataValues;
      ctx.payload.user = user;

      ctx.payload.user = formatUser(ctx.payload.user, false, token);

      return await next(ctx.payload.user);
    }
    return errors.badRequest(ctx, message.emailAlreadyExists);
  } catch (err) {
    return errors.internalServerError(ctx, err);
  }
};

const signIn = (userRepository) => async (ctx) => {
  try {
    let user = await userRepository.findOne('email', ctx.payload.email);

    if (!user) {
      return errors.badData(ctx, message.invalidUser);
    } if (user && hash.compare(ctx.payload.password, user.dataValues.password)) {
      user = user.dataValues;

      const payload = await userRepository.update(user.id, user.guid);

      user = formatUser(user, true, payload.token, payload.lastLogin);

      ctx.status = 200;
      ctx.body = user;

      return ctx.body;
    }
    return errors.unauthorized(ctx, message.invalidUser);
  } catch (err) {
    return errors.internalServerError(ctx, err);
  }
};

const search = (userRepository) => async (ctx) => {
  try {
    let user = await userRepository.findOne('guid', ctx.params.guid);
    if (user && hash.compare(ctx.headers.authentication, user.dataValues.token)) {
      user = user.dataValues;
      if ((Date.now() - user.createdAt.valueOf()) / constant.msInMinute < constant.limLastLogin) {
        user = formatUser(user, true);
        ctx.status = 200;
        ctx.body = user;

        return ctx.body;
      }
      return errors.unauthorized(ctx, message.invalidSession);
    }
    return errors.unauthorized(ctx, message.unauthorized);
  } catch (err) {
    return errors.internalServerError(ctx, err);
  }
};

module.exports = {
  create,
  signIn,
  search,
};
