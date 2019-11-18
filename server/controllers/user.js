const {
  message, errors, jwtGenerate, hash, constant, formatDate,
} = require('../utils');

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

const create = (userRepository) => async (req, res, next) => {
  try {
    const token = jwtGenerate(req.payload.user.email);
    let user = await userRepository.findOrCreate(req.payload.user, token);

    return res.status(200).send(user)

    if (user[1]) {
      user = user[0].dataValues;
      req.payload.user = user;

      req.payload.user = formatUser(req.payload.user, false, token);

      return next();
    }
    return errors.badRequest(res, message.emailAlreadyExists);
  } catch (err) {
    return errors.internalServerError(res, err);
  }
};

const signIn = (userRepository) => async (req, res) => {
  try {
    let user = await userRepository.findOne('email', req.payload.email);

    if (!user) {
      return errors.badData(res, message.invalidUser);
    } if (user && hash.compare(req.payload.password, user.dataValues.password)) {
      user = user.dataValues;

      const payload = await userRepository.update(user.id, user.guid);

      user = formatUser(user, true, payload.token, payload.lastLogin);

      return res.status(200).send(user);
    }
    return errors.unauthorized(res, message.invalidUser);
  } catch (err) {
    return errors.internalServerError(res, err);
  }
};

const search = (userRepository) => async (req, res) => {
  try {
    let user = await userRepository.findOne('guid', req.params.guid);
    if (user && hash.compare(req.headers.authentication, user.dataValues.token)) {
      user = user.dataValues;
      if ((Date.now() - user.createdAt.valueOf()) / constant.msInMinute < constant.limLastLogin) {
        user = formatUser(user, true);
        return res.status(200).send(user);
      }
      return errors.unauthorized(res, message.invalidSession);
    }
    return errors.unauthorized(res, message.unauthorized);
  } catch (err) {
    return errors.internalServerError(res, err);
  }
};

module.exports = {
  create,
  signIn,
  search,
};
