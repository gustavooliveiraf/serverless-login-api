const userRepository = require('server/repositories/user');
const userController = require('server/controllers/user');
const userValidator = require('../validators/user');

module.exports = (router) => {
  /**
   * @swagger
   * /user/sign-in:
   *   post:
   *     tags:
   *       - Users
   *     name: Sign-in
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
   *           properties:
   *             email:
   *               type: string
   *               example: gof@cin.ufpe.br
   *             password:
   *               type: string
   *               format: password
   *               example: "123"
   *     responses:
   *       '200':
   *         description: Ok
   *       '401':
   *         description: Unauthorized
   *       '422':
   *         description: Unprocessable Entity
   */

  router.post('/user/sign-in', userValidator.signIn, userController.signIn(userRepository));
};
