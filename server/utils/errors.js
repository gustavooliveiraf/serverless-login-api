const HttpStatus = require('http-status-codes')
const CustomError = require('./CustomError')

const badData = (ctx, err) => {
  return resultError(ctx, err, HttpStatus.UNPROCESSABLE_ENTITY)
}

const InternalServerError = (ctx, err) => {
  return resultError(ctx, err, HttpStatus.INTERNAL_SERVER_ERROR)
}

const notAcceptable = (ctx, details) => {
  return resultWarning(ctx, details, HttpStatus.NOT_ACCEPTABLE)
}

const badRequest = (ctx, details) => {
  return resultWarning(ctx, details, HttpStatus.BAD_REQUEST)
}

const unauthorized = (ctx, details) => {
  return resultWarning(ctx, details, HttpStatus.UNAUTHORIZED)
}

const resultWarning = (ctx, details, statusCode) => {
  ctx.status = statusCode
  ctx.body   = details
  return details
}

const resultError = (ctx, err, statusCode) => {
  console.log(err) // Logstash?!!
  ctx.status = statusCode
  ctx.body   = err instanceof CustomError ? err.err : err.message
  return err
}

module.exports = {
  badData,
  InternalServerError,
  notAcceptable,
  badRequest,
  unauthorized
}
