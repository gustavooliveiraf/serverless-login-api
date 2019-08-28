const Router = require('koa-router');

const router = new Router();

router.all('*', (ctx) => {
  ctx.status = 200;
  ctx.body = { res: 'Route not found!' };
});

module.exports = router;
