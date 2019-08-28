const bodyParser = require('koa-bodyparser');
const { envDevelopment } = require('config');
const checkSetContentType = require('./checkSetContentType');

module.exports = (app) => {
  app.use((ctx, next) => checkSetContentType(ctx, next));

  app.use(bodyParser());

  // eslint-disable-next-line global-require
  if (envDevelopment) app.use(require('koa-logger')());
};
