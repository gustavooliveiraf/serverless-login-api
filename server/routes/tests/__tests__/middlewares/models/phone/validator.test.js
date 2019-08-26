const { Joi } = require('server/utils')

const phoneValidator = require('server/validators/phone')
const phonesValidatorSchema = require('server/routes/tests/schemas/phone')

// ========================= payloads =========================
const payload = {
  payload: {},
  request: {
    body: {
      phones: [{
          number: '123455678',
          ddd: '81'
        }, {
          number: '1234556780',
          ddd: '82'
        }
      ]
    }
  }
}

// ========================= auxiliary functions =========================
const next = (value) => {
  return value
}

const create = async (payload) => {
  return await phoneValidator.create(payload, next)
}

// ========================= start test =========================
describe('phone', () => {
  describe('validator', () => {
    describe('Success', () => {
      test('create', async () => {
        const checkPayload = await create(payload)

        const { error, value } = Joi.validate(checkPayload, phonesValidatorSchema)

        expect(error).toBeNull()
      })
    })

    describe('Error', () => {
      test('create', async () => {
        payload.request.body.phones[0].ddd = '811' // to be false
        const checkPayload = await create(payload)

        const { error, value } = Joi.validate(checkPayload, phonesValidatorSchema)

        expect(error).not.toBeNull()
      })
    })
  })
})
