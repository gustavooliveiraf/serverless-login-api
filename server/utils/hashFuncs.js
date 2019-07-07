const bcrypt = require('bcryptjs')

module.exports = {
  generate: password => {
    let salt = bcrypt.genSaltSync()
    let hash = bcrypt.hashSync(password, salt)

    return hash
  },
  compare: (queryPassword, dbPassword) => bcrypt.compareSync(queryPassword, dbPassword)
}
