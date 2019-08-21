const { Joi } = require('server/utils')
const userController = require('server/controllers/user')
const { userControllerSchema } = require('../../schemas/user')

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
  describe('controller', () => {
    describe('Success', () => {
      test('create', async () => {
        const checkPayload = await userController.create(userRepository)({ payload }, next)

        const { error, value } = Joi.validate(checkPayload, userControllerSchema)

        expect(error).toBeNull();
      })
    })
  })
})
