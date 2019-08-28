const Router = require('koa-router');

const router = new Router();

router.get('/status', (ctx) => {
  ctx.status = 200;
  ctx.body = { res: 'Service running.' };
});

module.exports = router;
