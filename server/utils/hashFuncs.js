const bcrypt = require('bcryptjs')

module.exports = {
  generate: str => {
    let salt = bcrypt.genSaltSync()
    let hash = bcrypt.hashSync(str, salt)

    return hash
  },
  compare: (str, hash) => bcrypt.compareSync(str, hash)
}
