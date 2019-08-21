const { Joi } = require('server/utils')
const phonesModel = require('../../schemas/phone')

const phoneValidator = require('server/validators/phone')

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
payload.payload = {}

payload.request = {}
payload.request.body = body
payload.request.body.phones = phones

payload.user = body

// ========================= auxiliary functions =========================
const next = (value) => {
  return value
}

const testPhoneValidator = async (payload) => {
  return await phoneValidator.create(payload, next)
}

// ========================= start test =========================
describe('phone', () => {
  describe('validator', () => {
    describe('Success', () => {
      test('create', async () => {
        const checkPayload = await testPhoneValidator(payload)

        const { error, value } = Joi.validate(checkPayload, phonesModel)

        expect(error).toBeNull();
      })
    })

    describe('Error', () => {
      test('create', async () => {
        payload.request.body.phones[0].ddd = '811' // to be fcoordinateSchema
        const checkPayload = await testPhoneValidator(payload)

        const { error, value } = Joi.validate(checkPayload, phonesModel)

        expect(error).not.toBeNull();
      })
    })
  })
})
