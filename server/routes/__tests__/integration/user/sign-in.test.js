const request = require('supertest');
const { Joi } = require('../../../../utils');

const { userControllerSchema } = require('../../../../../_tests_/schemas/user');

const app = require('../../../../../app.js');

// ========================= payloads =========================
const payload = {
  email: 'gof@cin.ufpe.br',
  password: '123',
};

// ========================= start test =========================
describe('user', () => {
  describe('/sign-in integration', () => {
    describe('Success', () => {
      test('create', async () => {
        try {
          const res = await request(app.callback())
            .post('/user/sign-in')
            .send(payload)
            .expect(200);

          const { error } = Joi.validate(res.body, userControllerSchema);

          expect(error).toBeNull();
        } catch (err) {
          expect(1).toBeNull();
        }
      });
    });

    describe('Error', () => {
      test('create', async () => {
        try {
          const email = `${Date.now()}@cin.ufpe.br`;
          payload.email = email;
          const res = await request(app.callback())
            .post('/user/sign-up')
            .send(payload)
            .expect(200);

          const { error } = Joi.validate(res.body, userControllerSchema);

          expect(error).not.toBeNull();
        } catch (err) {
          expect(null).toBeNull();
        }
      });
    });
  });
});
