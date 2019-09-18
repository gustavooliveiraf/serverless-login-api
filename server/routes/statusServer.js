const router = require('express').Router();

router.get('/status', (_, res) => res.status(200).send({ res: `Service running - ${new Date()}.` }));

module.exports = router;
