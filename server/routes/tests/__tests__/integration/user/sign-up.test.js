const nock = require('nock')
const request = require('supertest')
const { Joi } = require('server/utils')

const { userControllerSchema } = require('server/routes/tests/schemas/user')

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
describe('user', () => {
  describe('integration', () => {
    describe('Success', () => {
      test('create', async () => {
        try {
          nock.restore()

          const res = await request(app.callback())
            .post('/user/sign-up')
            .send(payload)
            .expect(201)

          nock.activate()

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
          const email = `gof@cin.ufpe.br`
          const res = await request(app.callback())
            .post('/user/sign-up')
            .send({
              name: 'teste',
              email,
              password: '123',
              cep: '50741-100',
              phones: [{
                number: '1234567',
                ddd: '71'
              }, {
                number: '123456790',
                ddd: '81'
              }]
            })
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
