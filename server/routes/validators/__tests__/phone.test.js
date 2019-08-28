const { Joi } = require('server/utils');

const phoneValidator = require('server/routes/validators/phone');
const phonesValidatorSchema = require('_tests_/schemas/phone');

// ========================= payloads =========================
const payload = {
  payload: {},
  request: {
    body: {
      phones: [{
        number: '123455678',
        ddd: '81',
      }, {
        number: '1234556780',
        ddd: '82',
      },
      ],
    },
  },
};

// ========================= auxiliary functions =========================
const next = (value) => value;

const create = async (payloadArg) => phoneValidator.create(payloadArg, next);

// ========================= start test =========================
describe('phone', () => {
  describe('validator', () => {
    describe('Success', () => {
      test('create', async () => {
        const checkPayload = await create(payload);

        const { error } = Joi.validate(checkPayload, phonesValidatorSchema);

        expect(error).toBeNull();
      });
    });

    describe('Error', () => {
      test('create', async () => {
        payload.request.body.phones[0].ddd = '811'; // to be false
        const checkPayload = await create(payload);

        const { error } = Joi.validate(checkPayload, phonesValidatorSchema);

        expect(error).not.toBeNull();
      });
    });
  });
});
