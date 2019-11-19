const {
  message, errors, jwtGenerate, hash,
} = require('../utils');

const formatUser = (user, token, lastLogin) => {
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
  delete userContext.id;

  if (token) userContext.token = token;
  if (lastLogin) userContext.lastLogin = lastLogin;

  return userContext;
};

const create = (userRepository) => async (req, res) => {
  try {
    const token = jwtGenerate(req.payload.user.email);

    const userNotExist = await userRepository.findOrCreate(req.payload.user, token);

    if (userNotExist) {
      const user = formatUser(req.payload.user, token, Date.now());
      return res.status(201).send(user);
    }

    return errors.badRequest(res, message.emailAlreadyExists);
  } catch (err) {
    return errors.internalServerError(res, err);
  }
};

const search = (userRepository) => async (req, res) => {
  try {
    const user = await userRepository.findOne(req.params.guid);
    if (user && hash.compare(req.headers.authentication, user.token)) {
      return res.status(200).send(user);
    }

    return errors.unauthorized(res, message.unauthorized);
  } catch (err) {
    return errors.internalServerError(res, err);
  }
};

module.exports = {
  create,
  search,
};
