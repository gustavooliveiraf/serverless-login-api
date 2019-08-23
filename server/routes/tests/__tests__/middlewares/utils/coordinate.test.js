const nock = require('nock')

const { Joi } = require('server/utils')
const coordinateSchema = require('server/routes/tests/schemas/coordinate')

const getCoordinate = require('server/middlewares/getCoordinate')

const { keyMaps } = require('config')

// ========================= payloads =========================
const payload = {
  user: {
    name: 'gustavo',
    email: 'gof@cin.ufpe.br',
    password: '123',
    cep: '57041-100'
  }
}

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

        nock.cleanAll()

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
