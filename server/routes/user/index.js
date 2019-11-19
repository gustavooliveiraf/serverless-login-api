const router = require('express').Router();

require('./sign-up')(router);
require('./search')(router);

module.exports = router;
