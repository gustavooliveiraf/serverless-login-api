const HttpStatus = require('http-status-codes');
const CustomError = require('./CustomError');

const resultError = (res, err, statusCode) => res.status(statusCode)
  .send(err instanceof CustomError ? err.err : err); // Logstash?!!

const resultWarning = (res, details, statusCode) => res.status(statusCode).send(details);

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
