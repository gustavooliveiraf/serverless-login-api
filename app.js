const serverless = require('serverless-http');
const express = require('express');

const swagger = require('./server/utils/swagger');
const middlewares = require('./server/middlewares/main');
const routes = require('./server/routes');

const app = express();

swagger(app);
middlewares(app);
routes(app);

// module.exports = app;
module.exports.lambdaHandler = serverless(app);
