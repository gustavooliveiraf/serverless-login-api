const nock = require('nock')

const { Joi } = require('server/utils')
const userModel = require('../../schemas/user')
const phonesModel = require('../../schemas/phone')
const coordinateSchema = require('../../schemas/coordinate')

const userValidator = require('server/validators/user')
const phoneValidator = require('server/validators/phone')
const getCoordinate = require('server/middlewares/getCoordinate')

const { keyMaps } = require('config')

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

const testPhoneValidator = async (payload) => {
  return await phoneValidator.create(payload, next)
}

// ========================= start test =========================
describe('/user', () => {
  describe('/sign-up', () => {
    describe('Success', () => {
      test('userValidator.create', async () => {
        const checkPayload = await testUserValidator(payload)

        const { error, value } = Joi.validate(checkPayload, userModel)

        expect(error).toBeNull();
      })

      test('phoneValidator.create', async () => {
        const checkPayload = await testPhoneValidator(payload)

        const { error, value } = Joi.validate(checkPayload, phonesModel)

        expect(error).toBeNull();
      })

      test('getCoordinate', async () => {
        nock('https://maps.googleapis.com')
          .get('/maps/api/geocode/json')
          .query({address: payload.user.cep, key: keyMaps})
          .reply(200, {
            results: [{
              geometry: {
                location: {
                  lat: 1,
                  lng: 2
                }
              }
            }]
          })

        const checkPayload = await getCoordinate( { payload }, next)

        const { error, value } = Joi.validate(checkPayload, coordinateSchema)

        expect(error).toBeNull();
      })
    })

    describe('Error', () => {
      test('userValidator.create', async () => {
        payload.request.body.password = 123 // to be false
        const checkPayload = await testUserValidator(payload)

        const { error, value } = Joi.validate(checkPayload, userModel)

        expect(error).not.toBeNull();
      })

      test('phoneValidator.create', async () => {
        payload.request.body.phones[0].ddd = '811' // to be fcoordinateSchema
        const checkPayload = await testPhoneValidator(payload)

        const { error, value } = Joi.validate(checkPayload, phonesModel)

        expect(error).not.toBeNull();
      })

      test('getCoordinate', async () => {
        nock('https://maps.googleapis.com') // to be false
          .get('/maps/api/geocode/json')
          .query({address: payload.user.cep, key: keyMaps})
          .reply(200, { results: [] })

        const checkPayload = await getCoordinate( { payload }, next)

        const { error, value } = Joi.validate(checkPayload, coordinateSchema)

        expect(error).not.toBeNull();
      })
    })
  })
})
