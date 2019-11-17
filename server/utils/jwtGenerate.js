const jwt = require('jsonwebtoken');
const { secret } = require('../../config');

const generate = (payload) => jwt.sign(
  { payload },
  secret,
  // { expiresIn: constant.msInMinute * constant.limLastLogin }
);

module.exports = generate;
