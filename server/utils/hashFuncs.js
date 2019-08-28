const bcrypt = require('bcryptjs');

module.exports = {
  generate: (str) => {
    const salt = bcrypt.genSaltSync();
    const hash = bcrypt.hashSync(str, salt);

    return hash;
  },
  compare: (str, hash) => bcrypt.compareSync(str, hash),
};
