const { Joi } = require('../../utils');
const userController = require('../../controllers/user');
const { userControllerSchema } = require('../../../_tests_/schemas/user');

// ========================= payloads =========================
const payloadCreate = {
  user: {
    name: 'gustavo',
    email: 'gof@cin.ufpe.br',
    password: '123',
    guid: '$2a$10$g.1dtBmr/siSJgMoPW0fyOvZzn0nhDSRW40tW72jkkRYh30ajLz/u',
    lastLogin: new Date(),
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjoiZ28xMUBjaW4udWZwZS5iciIsImlhdCI6MTU2NjcxNTY0M30.gE-FO-U4nGGEcljRjWYfNapDBL5lZCS-kRmByMckxBs',
    cep: '57041-100',
    lat: -8.0645234,
    lng: -34.8928259,
    updatedAt: new Date(),
    createdAt: new Date(),
  },
};

const payloadOut = {
  ...payloadCreate.user,
  id: 1,
  password: '$2a$10$g.1dtBmr/siSJgMoPW0fyOvZzn0nhDSRW40tW72jkkRYh30ajLz/u',
  token: '$2a$10$lSMaXZlzmufvoENM5quGI.9TVegSn6yBet3VHdvwMbSVphTZUi63S',
  phones: [{
    number: '123455678',
    ddd: '81',
  }, {
    number: '1234556780',
    ddd: '82',
  },
  ],
};

const payloadSignIn = {
  email: payloadCreate.user.email,
  password: payloadCreate.user.password,
};

const payloadSearch = {
  headers: {
    authentication: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjoiZ28xMkBjaW4udWZwZS5iciIsImlhdCI6MTU2NjcxNjEzNX0.DBnyW5XXIvBUlNbytCtB2tM6-11WKbsV2jr0837EcT8',
  },
  params: {
    guid: '3bb8a750-c702-11e9-8525-0972d0e263b7',
  },
  user: { ...payloadOut },
};

// ========================= auxiliary functions =========================
const next = (value) => value;

const userRepository = {
  findOrCreate: async () => [{
    dataValues: payloadCreate.user,
  },
  true,
  ],
  update: async () => ({
    token: payloadCreate.user.token,
    lastLogin: new Date(),
  }),
  findOne: async () => ({ dataValues: { ...payloadOut } }),
};

// ========================= start test =========================
describe('user', () => {
  describe('controller', () => {
    describe('Success', () => {
      test('create', async () => {
        const checkPayload = await userController.create(userRepository)({ payload: payloadCreate },
          next);

        const { error } = Joi.validate(checkPayload, userControllerSchema);

        expect(error).toBeNull();
      });

      test('signIn', async () => {
        const checkPayload = await userController.signIn(userRepository)({ payload: payloadSignIn },
          next);

        const { error } = Joi.validate(checkPayload, userControllerSchema);

        expect(error).toBeNull();
      });

      test('search', async () => {
        const checkPayload = await userController.search(userRepository)(payloadSearch, next);

        const { error } = Joi.validate(checkPayload, userControllerSchema);

        expect(error).toBeNull();
      });
    });

    describe('Error', () => {
      test('create', async () => {
        payloadCreate.user.lat = 'a'; // to be false
        const checkPayload = await userController.create(userRepository)({ payload: payloadCreate },
          next);

        const { error } = Joi.validate(checkPayload, userControllerSchema);

        expect(error).not.toBeNull();
      });

      test('signIn', async () => {
        payloadOut.name = 123;
        const checkPayload = await userController.signIn(userRepository)({ payload: payloadSignIn },
          next);

        const { error } = Joi.validate(checkPayload, userControllerSchema);

        expect(error).not.toBeNull();
      });

      test('search', async () => {
        payloadOut.name = 123;
        const checkPayload = await userController.search(userRepository)(payloadSearch, next);

        const { error } = Joi.validate(checkPayload, userControllerSchema);

        expect(error).not.toBeNull();
      });
    });
  });
});
