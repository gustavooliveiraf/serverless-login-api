const { Joi } = require('server/utils')
const userController = require('server/controllers/user')
const { userControllerSchema } = require('server/routes/tests/schemas/user')

// ========================= payloads =========================
const payloadCreate = {
  user: {
    name: 'gustavo',
    email: 'gof@cin.ufpe.br',
    password: '123',
    guid: 'Joi.string().max(constant.maxString).required()',
    lastLogin: new Date(),
    token: '123',
    cep: '57041-100',
    lat: -8.0645234,
    lng: -34.8928259,
    updatedAt: new Date(),
    createdAt: new Date()
  }
}

const out = { ...payloadCreate.user }
out.id = 1
out.password = '$2a$10$g.1dtBmr/siSJgMoPW0fyOvZzn0nhDSRW40tW72jkkRYh30ajLz/u'
out.phones = [{
    number: '123455678',
    ddd: '81'
  }, {
    number: '1234556780',
    ddd: '82'
  }
]

const payloadSignIn = {
  in: {
    email: payloadCreate.user.email,
    password: payloadCreate.user.password
  },
  out
}

// ========================= auxiliary functions =========================
const next = (value) => {
  return value
}

const userRepository = {
  create: async (ctx, token) => {
    return [{
        dataValues: payloadCreate.user
      },
      true
    ]
  },
  findByEmail: async (ctx, next, test) => {
    if (test) return false
    return { dataValues: payloadSignIn.out }
  },
  update: async (id, guid) => {
    return {
      token: payloadCreate.user.token,
      lastLogin: new Date()
    }
  }
}

// ========================= start test =========================
describe('user', () => {
  describe('controller', () => {
    describe('Success', () => {
      test('create', async () => {
        const checkPayload = await userController.create(userRepository)({ payload: payloadCreate }, next)

        const { error, value } = Joi.validate(checkPayload, userControllerSchema)

        expect(error).toBeNull();
      })

      test('signIn', async () => {
        const checkPayload = await userController.signIn(userRepository)({ payload: payloadSignIn.in }, next)

        const { error, value } = Joi.validate(checkPayload, userControllerSchema)

        expect(error).toBeNull()
      })
    })

    describe('Error', () => {
      test('create', async () => {
        payloadCreate.user.lat = 'a' // to be false
        const checkPayload = await userController.create(userRepository)({ payload: payloadCreate }, next)

        const { error, value } = Joi.validate(checkPayload, userControllerSchema)

        expect(error).not.toBeNull();
      })

      test('signIn', async () => {

        const checkPayload = await userController.signIn(userRepository)({ payload: payloadSignIn.in }, next, 'teste')

        const { error, value } = Joi.validate(checkPayload, userControllerSchema)

        expect(error).not.toBeNull()
      })
    })
  })
})
