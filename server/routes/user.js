const Router = require('koa-router');
const router = new Router();
const { jwt } = require('server/utils')

const userValidator = require('server/validators/user')
const userController = require('server/controllers/user')
const phoneValidator = require('server/validators/phone')
const phoneController = require('server/controllers/phone')
const getCoordinate = require('server/middlewares/getCoordinate')

router.post('/user/sign-up', userValidator.create, phoneValidator.create, getCoordinate, 
                             userController.create, phoneController.create)
      .post('/user/sign-in', userValidator.signIn, userController.signIn)

router.get('/user/search/:userId', jwt.auth, userController.search)

router.get('/user/list', userController.list) // tests

module.exports = router
