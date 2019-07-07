const router = require('express').Router()
const { jwt } = require('server/utils')

const userValidator = require('server/validators/user')
const userController = require('server/controllers/user')
const phoneValidator = require('server/validators/phone')
const phoneController = require('server/controllers/phone')

router.post('/user/sign-up', userValidator.create, phoneValidator.create, userController.create, phoneController.create)
      .get('/user/sign-in', userValidator.signIn, userController.signIn)

router.get('/user/search/:userId', jwt.auth, userController.search)

module.exports = router
