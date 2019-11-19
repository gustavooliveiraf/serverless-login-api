const router = require('express').Router();

require('./sign-up')(router);
// require('./sign-in')(router);
require('./search')(router);

module.exports = router;
