const checkSetContentType = async (ctx, next) => {
  ctx.type = 'application/json'

  if (ctx.method !== 'GET' && !ctx.is('application/json')) { // ctx.accepts('json', 'text') -> evaluate/parser
    ctx.body = 'Content-Type deve ser application/json'
  } else {
    await next()
  }
}

module.exports = checkSetContentType
