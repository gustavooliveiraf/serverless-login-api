const nock = require('nock')

const { Joi } = require('server/utils')
const coordinateSchema = require('_tests_/schemas/coordinate')

const getCoordinate = require('server/middlewares/getCoordinate')

const { keyMaps, linkDomMaps, linkApiMaps } = require('config')

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
      try {
        nock(linkDomMaps)
          .get(linkApiMaps)
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

        const checkPayload = await getCoordinate({payload }, next)

        const { error, value } = Joi.validate(checkPayload, coordinateSchema)

        expect(error).toBeNull()
      } catch (err) {
        expect(1).toBeNull()
      }
    })
  })

  describe('Error', () => {
    test('getCoordinate', async () => {
      try {
        payload.user.cep = '50741-hdghgdg100' // to be false
        nock(linkDomMaps)
          .get(linkApiMaps)
          .query({ address: payload.user.cep, key: keyMaps })
          .reply(200, { results: [] })

        const checkPayload = await getCoordinate( { payload }, next)

        const { error, value } = Joi.validate(checkPayload, coordinateSchema)

        expect(error).not.toBeNull()
      } catch (err) {
        expect(1).toBeNull()
      }
    })
  })
})
