const Router = require('koa-router');
const router = new Router();

router.get('/status', ctx => {
  ctx.body = 'Service running.'
})

module.exports = router
