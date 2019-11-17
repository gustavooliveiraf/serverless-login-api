const jwt = require('jsonwebtoken');

const { secret } = require('../../config');
const message = require('../utils/staticMessages');
const errors = require('../utils/errors');

const offset = 'Bearer'.length + 1;

const auth = async (req, res, next) => {
  try {
    req.headers.authentication = req.headers.authentication.substr(offset);
    jwt.verify(req.headers.authentication, secret);

    return next();
  } catch (err) {
    return errors.unauthorized(res, message.unauthorized);
  }
};

module.exports = auth;
