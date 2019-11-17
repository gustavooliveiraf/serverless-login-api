const { Joi } = require('../../utils');
const phonesControllerSchema = require('../../../_tests_/schemas/phone');
const phonesController = require('../phone');

// ========================= payloads =========================
const payload = {
  phones: [{
    number: '123455678',
    ddd: '81',
  }, {
    number: '1234556780',
    ddd: '82',
  },
  ],
  user: {
    id: 1,
  },
};

// ========================= auxiliary functions =========================
const phonesRepository = {
  create: async (ctx, elem) => ({ dataValues: elem }),
};

// ========================= start test =========================
describe('phone', () => {
  describe('controller', () => {
    describe('Success', () => {
      test('create', async () => {
        const checkPayload = await phonesController.create(phonesRepository)({ payload });

        const { error } = Joi.validate(checkPayload.phones, phonesControllerSchema);

        expect(error).toBeNull();
      });
    });

    describe('Error', () => {
      test('create', async () => {
        payload.phones[0].ddd = '811'; // to be false
        const checkPayload = await phonesController.create(phonesRepository)({ payload });

        const { error } = Joi.validate(checkPayload.phones, phonesControllerSchema);

        expect(error).not.toBeNull();
      });
    });
  });
});
