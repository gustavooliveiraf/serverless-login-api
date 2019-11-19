const getCoordinate = require('../../middlewares/getCoordinate');

const userValidator = require('../validators/user');
const userController = require('../../controllers/user');

const userRepository = require('../../repositories/dynamodb/user');
// const userRepository = require('../../repositories/rds/user');

module.exports = (router) => {
  /**
   * @swagger
   * /user/sign-up:
   *   post:
   *     tags:
   *       - Users
   *     name: Sign-up
   *     summary: Register a new user
   *     consumes:
   *       - application/json
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: payload
   *         in: body
   *         schema:
   *           type: object
   *           $ref: '#/definitions/User'
   *     responses:
   *       '201':
   *         description: User created
   *       '400':
   *         description: Username or email already taken
   */

  router.post('/user/sign-up', userValidator.create, getCoordinate,
    userController.create(userRepository));
};
