const HttpStatus = require('http-status-codes');
const CustomError = require('./CustomError');

const resultWarning = (ctx, details, statusCode) => {
  ctx.status = statusCode;
  ctx.body = details;
  return details;
};

const resultError = (ctx, err, statusCode) => {
  // console.log(err); // Logstash?!!
  ctx.status = statusCode;
  ctx.body = err instanceof CustomError ? err.err : err.message;
  return err;
};

const badData = (ctx, err) => resultError(ctx, err, HttpStatus.UNPROCESSABLE_ENTITY);

const internalServerError = (ctx, err) => resultError(ctx, err, HttpStatus.INTERNAL_SERVER_ERROR);

const badRequest = (ctx, details) => resultWarning(ctx, details, HttpStatus.BAD_REQUEST);

const unauthorized = (ctx, details) => resultWarning(ctx, details, HttpStatus.UNAUTHORIZED);

module.exports = {
  badData,
  internalServerError,
  badRequest,
  unauthorized,
};
