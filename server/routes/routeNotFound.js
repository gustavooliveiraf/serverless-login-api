const router = require('express').Router();

router.all('*', (_, res) => res.status(404).send({ res: 'Route not found!' }));

module.exports = router;
