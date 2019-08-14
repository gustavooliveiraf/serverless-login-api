const bcrypt = require('bcryptjs')

module.exports = {
  generate: str => {
    if (str) {
      const salt = bcrypt.genSaltSync()
      const hash = bcrypt.hashSync(str, salt)

      return hash
    } else {
      return false
    }
  },
  compare: (str, hash) => bcrypt.compareSync(str, hash)
}