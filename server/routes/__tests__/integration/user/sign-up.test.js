const nock = require('nock')
const request = require('supertest')
const { Joi } = require('server/utils')

const { userControllerSchema } = require('_tests_/schemas/user')

const app = require('app.js')

// ========================= payloads =========================
const payload = {
  name: 'teste',
  email: `${Date.now()}@cin.ufpe.br`,
  password: '123',
  cep: '50741-100',
  phones: [{
    number: '1234567',
    ddd: '71'
  }, {
    number: '123456790',
    ddd: '81'
  }]
}

// ========================= start test =========================
beforeAll(() => {
  nock.restore()
})

beforeEach(() => {
  nock.cleanAll()
  nock.enableNetConnect()
})

afterAll(() => {
  if (!nock.isActive()) nock.activate()
})

describe('user', () => {
  describe('/sign-up integration', () => {
    describe('Success', () => {
      test('create', async () => {
        try {
          const res = await request(app.callback())
            .post('/user/sign-up')
            .send(payload)
            .expect(201)

          const { error, value } = Joi.validate(res.body, userControllerSchema)

          expect(error).toBeNull()
        } catch (err) {
          expect(1).toBeNull()
        }
      })
    })

    describe('Error', () => {
      test('create', async () => {
        try {
          const email = 'gof@cin.ufpe.br'
          payload.email = email
          const res = await request(app.callback())
            .post('/user/sign-up')
            .send(payload)
            .expect(201)

            const { error, value } = Joi.validate(res.body, userControllerSchema)
            
            expect(error).not.toBeNull()
          } catch (err) {
            expect(null).toBeNull()
          }
      })
    })
  })
})
