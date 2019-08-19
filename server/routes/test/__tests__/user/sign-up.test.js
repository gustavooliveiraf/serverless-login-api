const nock = require('nock')
const fetch = require('node-fetch')

const { Joi } = require('server/utils')
const schema = require('../../schemas/user')

const userValidator = require('server/validators/user')
const phoneValidator = require('server/validators/phone')

// ========================= payloads =========================
const payload = {}
payload.request = {}
payload.request.body = {
  name: 'gustavo',
  email: 'gof@cin.ufpe.br',
  password: '123',
  cep: '57041-100'
}

payload.request.body.phones = [{
    number: '123455678',
    ddd: '81'
  }, {
    number: '1234556780',
    ddd: '82'
  }
]

// ========================= auxiliary functions =========================
const next = (value) => {
  return value
}

const testUserValidator = async (payload) => {
  return await userValidator.create(payload, next)
}

const testPhoneValidator = async (payload) => {
  return await phoneValidator.create(payload, next)
}

// ========================= start test =========================
describe('/user', () => {
  describe('/sign-up', () => {
    describe('Success', () => {
      test('userValidator.create', async () => {
        const check = await testUserValidator(payload)

        let error
        if (check) {
          const result = Joi.validate(undefined, schema.userModel)
          error = result.error
        } else {
          error = true
        }

        expect(error).toBeNull();
      })

      test('phoneValidator.create', async () => {
        const check = await testPhoneValidator(payload)

        let error
        if (check) {
          const result = Joi.validate(undefined, schema.userModel)
          error = result.error
        } else {
          error = true
        }

        expect(error).toBeNull();
      })
    })

    describe('Error', () => {
      test('userValidator.create', async () => {
        payload.request.body.password = 123 // to be false
        const check = await testUserValidator(payload)

        let error
        if (check) {
          const result = Joi.validate(undefined, schema.userModel)
          error = result.error
        } else {
          error = true
        }

        expect(error).not.toBeNull();
      })

      test('phoneValidator.create', async () => {
        payload.request.body.phones[0].ddd = '811' // to be false
        const check = await testPhoneValidator(payload)

        let error
        if (check) {
          const result = Joi.validate(undefined, schema.userModel)
          error = result.error
        } else {
          error = true
        }

        expect(error).not.toBeNull();
      })
    })
  })
})