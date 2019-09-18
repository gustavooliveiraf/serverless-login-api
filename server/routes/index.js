const userRoute = require('./user');
const statusServerRoute = require('./statusServer');
const routeNotFound = require('./routeNotFound');

module.exports = (app) => {
  app.use(userRoute);
  app.use(statusServerRoute);
  app.use(routeNotFound);
};
