const Router = require('koa-router')
const router = new Router()
const jwtAuth = require('server/middlewares/jwtAuth')

const userValidator = require('server/validators/user')
const userController = require('server/controllers/user')
const phoneValidator = require('server/validators/phone')
const phoneController = require('server/controllers/phone')
const getCoordinate = require('server/middlewares/getCoordinate')

const userRepository = require('server/repositories/user')
const phoneRepository = require('../repositories/phone')

router.post('/user/sign-up', userValidator.create, phoneValidator.create, getCoordinate,
                             userController.create(userRepository), phoneController.create(phoneRepository))
      .post('/user/sign-in', userValidator.signIn, userController.signIn(userRepository))

router.get('/user/search/:guid', jwtAuth, userController.search(userRepository))

module.exports = router
