/* eslint-disable global-require */
/* eslint-disable import/no-extraneous-dependencies */
const cors = require('cors');
const bodyParser = require('body-parser');
const { envDevelopment } = require('../../config');
const checkSetContentType = require('./checkSetContentType');

module.exports = (app) => {
  app.use(cors());
  app.use((req, res, next) => checkSetContentType(req, res, next));
  app.use(bodyParser.json());
  if (envDevelopment) app.use(require('morgan')('dev'));
};
