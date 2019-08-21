const nock = require('nock')

const { Joi } = require('server/utils')
const coordinateSchema = require('../../schemas/coordinate')

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

// ========================= start test =========================
describe('utils', () => {
    describe('Success', () => {
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
      test('getCoordinate', async () => {
        payload.user.cep = '50741-hdghgdg100' // to be false
        nock('https://maps.googleapis.com')
          .get('/maps/api/geocode/json')
          .query({ address: payload.user.cep, key: keyMaps })
          .reply(200, { results: [] })

        const checkPayload = await getCoordinate( { payload }, next)

        const { error, value } = Joi.validate(checkPayload, coordinateSchema)

        expect(error).not.toBeNull();
      })
    })
})
