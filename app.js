const express = require('express');

const middlewares = require('server/middlewares/main');
const routes = require('server/routes');

const app = express();

middlewares(app);
routes(app);

module.exports = app;
