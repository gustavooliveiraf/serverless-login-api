/* eslint-disable max-len */
const userRepository = require('../../repositories/rds/user');
const userController = require('../../controllers/user');

const jwtAuth = require('../../middlewares/jwtAuth');

module.exports = (router) => {
  /**
   * @swagger
   * /user/search/{guid}:
   *   get:
   *     tags:
   *       - Users
   *     name: Find user
   *     summary: Finds a user
   *     consumes:
   *       - application/json
   *     produces:
   *       - application/json
   *     parameters:
   *       - in: header
   *         name: authentication
   *         schema:
   *           type: string
   *           format: token
   *           example: bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjoiZ29mMjVAY2luLnVmcGUuYnIiLCJpYXQiOjE1Njk4MDEyNTd9.Xj7v_u517hJeVHqQ3P54S4Czf1QKT2Y5puslJ63SYDU
   *         required: true
   *         description: Token of the user to get
   *       - in: path
   *         name: guid
   *         schema:
   *           type: string
   *           format: uuid
   *           example: 72ccdb70-e314-11e9-91f0-0d4015924fba
   *         required: true
   *         description: UID of the user to get
   *     responses:
   *       '200':
   *         description: Ok
   *       '400':
   *         description: Bad Request
   *       '401':
   *         description: Unauthorized
   */
  router.get('/user/search/:guid', jwtAuth, userController.search(userRepository));
};
