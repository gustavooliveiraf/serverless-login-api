const Boom = require('@hapi/boom')

const badData = (res, details) => {
  return result(res, Boom.badData(), details)
}

const InternalServerError = (res, details) => {
  return result(res, Boom.badImplementation(), details)
}

const notAcceptable = (res, details) => {
  return res.status(Boom.notAcceptable().output.statusCode).json(details)
}

const badRequest = (res, details) => {
  return res.status(Boom.badRequest().output.statusCode).json(details)
}

const unauthorized = (res, details) => {
  return res.status(Boom.unauthorized().output.statusCode).json(details)
}

const result = (res, error, details) => {
  console.log(details)
  return res.status(error.output.statusCode).send({ ...error.output.payload, details })
}

module.exports = {
  badData,
  InternalServerError,
  notAcceptable,
  badRequest,
  unauthorized
}
