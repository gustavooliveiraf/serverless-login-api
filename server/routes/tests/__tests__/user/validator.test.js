const { Joi } = require('server/utils')

const userValidator = require('server/validators/user')
const { userValidatorSchema } = require('../../schemas/user')

// ========================= payloads =========================
const body = {
  name: 'gustavo',
  email: 'gof@cin.ufpe.br',
  password: '123',
  cep: '57041-100'
}

const phones = [{
    number: '123455678',
    ddd: '81'
  }, {
    number: '1234556780',
    ddd: '82'
  }
]

const payload = {}

payload.request = {}
payload.request.body = body
payload.request.body.phones = phones

payload.user = body

// ========================= auxiliary functions =========================
const next = (value) => {
  return value
}

const testUserValidator = async (payload) => {
  return await userValidator.create(payload, next)
}

// ========================= start test =========================
describe('user', () => {
  describe('validator', () => {
    describe('Success', () => {
      test('create', async () => {
        const checkPayload = await testUserValidator(payload)

        const { error, value } = Joi.validate(checkPayload, userValidatorSchema)

        expect(error).toBeNull();
      })
    })

    describe('Error', () => {
      test('userValidator.create', async () => {
        payload.request.body.password = 123 // to be false
        const checkPayload = await testUserValidator(payload)

        const { error, value } = Joi.validate(checkPayload, userValidatorSchema)

        expect(error).not.toBeNull();
      })
    })
  })
})
