const router = require('express').Router()

router.get('/status', function (req, res) {
  res.status(200).send("Service running.")
})

module.exports = router
