const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const { envDevelopment } = require('../../config');

module.exports = (app) => {
  if (envDevelopment) {
    const swaggerDefinition = {
      info: {
        title: 'Login API',
        version: '1.0.0',
      },
      host: 'localhost:3000',
      basePath: '/',
    };

    const options = {
      swaggerDefinition,
      apis: ['./server/routes/**/*.js', './db/models/*.js'],
    };

    const swaggerSpec = swaggerJSDoc(options);

    app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  }
};
