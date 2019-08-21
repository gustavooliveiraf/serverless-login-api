const jwt  = require('jsonwebtoken')
const { secret } = require('config')

const generate = (payload) => {
  return jwt.sign(
    { payload },
    secret
    // { expiresIn: constant.msInMinute * constant.limLastLogin }
  )
}

module.exports = generate
