const router = require('express').Router()
const multer  = require('multer')
const storage = require('server/utils/methodsStorage')

router.post('/picture/:userGuid', multer().single('image'), storage.postObject)
router.get ('/picture/:userGuid', storage.getObject)

module.exports = router
