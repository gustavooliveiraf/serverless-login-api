const router = require('express').Router();

router.get('/', (_, res) => res.status(200).send({ res: `Service running - ${new Date()}.` }));
router.get('/status', (_, res) => res.status(200).send({ res: `Service running - ${new Date()}.` }));

module.exports = router;
