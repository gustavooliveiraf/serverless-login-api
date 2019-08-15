const Boom = require('@hapi/boom')

const badData = (ctx, details) => {
  return result(ctx, Boom.badData(), details)
}

const InternalServerError = (ctx, details) => {
  return result(ctx, Boom.badImplementation(), details)
}

const notAcceptable = (ctx, details) => {
  ctx.status = Boom.notAcceptable().output.statusCode
  ctx.body   = details
}

const badRequest = (ctx, details) => {
  ctx.status = Boom.badRequest().output.statusCode
  ctx.body   = details
}

const unauthorized = (ctx, details) => {
  ctx.status = Boom.unauthorized().output.statusCode
  ctx.body   = details
}

const result = (ctx, error, details) => {
  details = details.message || details
  console.log(details) // Logstash?!!
  ctx.status = error.output.statusCode
  ctx.body   = { ...error.output.payload, details }
}

module.exports = {
  badData,
  InternalServerError,
  notAcceptable,
  badRequest,
  unauthorized
}
