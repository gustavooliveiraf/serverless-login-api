const nock = require('nock')
const fetch = require('node-fetch')

const { Joi } = require('server/utils')
const schema = require('../schemas/user')

const userValidator = require('server/validators/user')

const payload = {}
payload.request = {}
payload.request.body = {
  name: 'gustavo',
  email: 'gof@cin.ufpe.br',
  password: '123',
  cep: '57041-100',
  phones: [{
    number: '123455678',
    ddd: '81'
  }, {
    number: '1234556780',
    ddd: '82'
  }]
}

const next = (value) => {
  return value
}

const testOne = async (payload) => {
  return await userValidator.create(payload, next)
}

test('route/user true', async () => {
  const check = await testOne(payload)

  let error
  if (check) {
    const result = Joi.validate(undefined, schema.userModel)
    error = result.error
  } else {
    error = true
  }

  expect(error).toBe(null);
})

test('route/user false', async () => {
  payload.request.body.password = 123 // to be false
  const check = await testOne(payload)

  let error
  if (check) {
    const result = Joi.validate(undefined, schema.userModel)
    error = result.error
  } else {
    error = true
  }

  expect(error).toBe(null);
})
