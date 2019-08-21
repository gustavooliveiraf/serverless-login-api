const request = require('supertest')
const { Joi } = require('server/utils')

const { userControllerSchema } = require('../../schemas/user')

const app = require('app.js')

// ========================= payloads =========================
const payload = {}
payload.user = {
  name: 'gustavo',
  email: 'gof@cin.ufpe.br',
  password: '123',
  guid: 'Joi.string().max(constant.maxString).required()',
  lastLogin: new Date(),
  token: '$2a$10$6BFyE2FjJWU4Jg/F7XVLTOo8BguFXlMOHyEyZtyAhwSDuFqFWJfba',
  cep: '57041-100',
  lat: -8.0645234,
  lng: -34.8928259,
  updatedAt: new Date(),
  createdAt: new Date()
}

// ========================= auxiliary functions =========================
const next = (value) => {
  return value
}

const userRepository = {
  create: async (ctx, token) => {
    return [{
        dataValues: payload.user
      },
      true
    ]
  }
}

// ========================= start test =========================
describe('user', () => {
  describe('integration', () => {
    describe('Success', () => {
      test('create', async () => {
        try {
          const email = `${Date.now()}@cin.ufpe.br`
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
